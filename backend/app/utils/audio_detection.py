import torch
import torchaudio
from transformers import Wav2Vec2Processor, Wav2Vec2Model
import torch.nn as nn
import os

# Load pre-trained Wav2Vec2 processor & model
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base")
feature_extractor = Wav2Vec2Model.from_pretrained("facebook/wav2vec2-base")
feature_extractor.eval()

# Dummy classifier (replace with your trained model)
class SimpleClassifier(nn.Module):
    def __init__(self, input_dim=768):
        super().__init__()
        self.fc = nn.Sequential(
            nn.Linear(input_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 2)  # Real (0), Fake (1)
        )

    def forward(self, x):
        return self.fc(x)

classifier = SimpleClassifier()
classifier.eval()

# Load trained weights if you have
# classifier.load_state_dict(torch.load("path/to/your/classifier.pt"))

# Real/Fake prediction
def predict_audio(path):
    if not os.path.exists(path):
        return {"error": "File not found!"}

    # Load and resample audio
    waveform, sample_rate = torchaudio.load(path)
    if sample_rate != 16000:
        resampler = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)
        waveform = resampler(waveform)
    
    # Convert stereo to mono if needed
    if waveform.shape[0] > 1:
        waveform = waveform.mean(dim=0, keepdim=True)

    inputs = processor(waveform.squeeze(0), sampling_rate=16000, return_tensors="pt")
    with torch.no_grad():
        features = feature_extractor(**inputs).last_hidden_state.mean(dim=1)
        logits = classifier(features)
        probs = torch.softmax(logits, dim=1)
        pred = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred].item()

    label = "Real" if pred == 0 else "Fake"
    return {
        "prediction": label,
        "confidence": round(confidence, 4)
    }
