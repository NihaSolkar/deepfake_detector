import torch
import torch.nn as nn
from torchvision import models, transforms
import numpy as np
import cv2
from PIL import Image
import base64
import io

def run_gradcam(image_path):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    transform = transforms.Compose([
        transforms.Resize((128, 128)),
        transforms.ToTensor()
    ])

    image = Image.open(image_path).convert("RGB")
    input_tensor = transform(image).unsqueeze(0).to(device)
    input_tensor.requires_grad = True

    use_efficientnet = True
    if use_efficientnet:
        model = models.efficientnet_b0(pretrained=False)
        model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, 2)
        target_layer = model.features[-1]
    else:
        model = models.resnet50(pretrained=False)
        model.fc = nn.Linear(model.fc.in_features, 2)
        target_layer = model.layer4[-1].conv3

    model.load_state_dict(torch.load("app/model/deepfake_detector.pth", map_location=device))
    model = model.to(device)
    model.eval()

    gradients = []
    activation = {}

    def save_gradient(grad):
        gradients.append(grad)

    def forward_hook(module, input, output):
        activation['value'] = output
        output.register_hook(save_gradient)

    hook_handle = target_layer.register_forward_hook(forward_hook)
    output = model(input_tensor)
    pred_class = torch.argmax(output, dim=1).item()
    label_map = {0: "Fake", 1: "Real"}

    model.zero_grad()
    class_score = output[0, pred_class]
    class_score.backward()

    grads_val = gradients[0].squeeze().detach().cpu().numpy()
    activation_maps = activation['value'].squeeze().detach().cpu().numpy()
    weights = np.mean(grads_val, axis=(1, 2))
    cam = np.zeros(activation_maps.shape[1:], dtype=np.float32)

    for i, w in enumerate(weights):
        cam += w * activation_maps[i]

    cam = np.maximum(cam, 0)
    cam = cv2.resize(cam, (128, 128))
    cam = cam - cam.min()
    cam = cam / cam.max()

    img = cv2.cvtColor(np.array(image.resize((128, 128))), cv2.COLOR_RGB2BGR)
    heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(img, 0.6, heatmap, 0.4, 0)

    # Convert overlay to base64
    _, buffer = cv2.imencode('.png', overlay)
    overlay_base64 = base64.b64encode(buffer).decode("utf-8")

    hook_handle.remove()

    return {
        "prediction": label_map[pred_class],
        "overlay_image_base64": overlay_base64
    }