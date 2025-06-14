# Deepfake Detection System

## Project Overview

The Deepfake Detection System is an advanced AI-based project developed during Semester 6 by Computer Engineering students. This system aims to detect manipulated (deepfake) human face images using a convolutional neural network (CNN). Deepfakes pose a growing threat in today’s digital era, and our solution helps combat misinformation by accurately identifying tampered media. This system is built with a focus on both performance and user-friendliness, suitable for academic as well as real-world deployment.

## Team Members

- Aditya Waradkar  
- Anagha Galagali  
- Shloka Suvarna  
- Niha Solkar  

## Features

- **Upload Interface:** Upload any image for real-time deepfake analysis.
- **CNN-Based Detection:** Model trained on a deepfake dataset to classify real vs fake images.
- **Visualization:** Displays result (Real/Fake) along with prediction probability.
- **Explainability:** Uses Grad-CAM to highlight regions influencing the prediction.
- **Extensible Design:** Can be upgraded for video deepfake detection in future iterations.

## Technologies Used

- **Frontend:** Streamlit (for UI)
- **Modeling:** Python, TensorFlow, Keras
- **Explainability:** Grad-CAM (via OpenCV & Keras utilities)
- **Data Handling:** NumPy, Pandas
- **Preprocessing & Visualization:** OpenCV, Matplotlib
- **Deployment Ready:** The code can be containerized or hosted on web platforms

## Dataset Used

- **Dataset:** DeepFake Detection Challenge Dataset (DFDC) subset
- **Data Size:** ~10,000 labeled face images (real and fake)
- **Split:** 70% training, 15% validation, 15% testing

## Installation and Setup

To run this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/NihaSolkar/deepfake_detector.git
   cd deepfake_detector
