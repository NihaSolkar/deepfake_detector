import logging
import shutil
import os
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.utils.gradcam_inference import run_gradcam
from app.utils.audio_detection import predict_audio  # Ensure this function exists
import traceback

# Initialize FastAPI app
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = run_gradcam(temp_path)
        os.remove(temp_path)
        return JSONResponse(content=result)
    except Exception as e:
        os.remove(temp_path)
        logging.error(f"Error during Grad-CAM processing: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/predict_audio")
async def predict_audio(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    logging.debug(f"File {file.filename} uploaded successfully with size {len(file.file.read())}")

    try:
        result = run_audio_detection(temp_path)
        os.remove(temp_path)
        return JSONResponse(content=result)
    except Exception as e:
        os.remove(temp_path)
        logging.error(f"Error during audio detection: {e}")
        logging.error(traceback.format_exc())  # This will print the stack trace for debugging
        return JSONResponse(content={"error": str(e)}, status_code=500)


# Ensure you have a proper definition of `run_audio_detection` (example)
def run_audio_detection(audio_path: str):
    # Example audio detection logic (this should be replaced with your actual logic)
    try:
        # Process the audio file (dummy result for now)
        result = {"status": "success", "message": "Audio processed successfully"}
        return result
    except Exception as e:
        logging.error(f"Error in audio detection: {e}")
        raise e
