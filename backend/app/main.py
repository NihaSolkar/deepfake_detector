import logging
import shutil
import os
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.utils.gradcam_inference import run_gradcam
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
