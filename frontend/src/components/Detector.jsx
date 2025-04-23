import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Detector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState('');
  const [overlayImage, setOverlayImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioResult, setAudioResult] = useState('');
  const [audioLoading, setAudioLoading] = useState(false);

  // Initialize the useNavigate hook
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setResult('');
    setOverlayImage(null);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (event) => {
    const file = event.target.files[0];
    setSelectedAudio(file);
    setAudioResult('');
    if (file) {
      setAudioResult(''); // Reset audio result
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      setLoading(true);
      const res = await axios.post('http://127.0.0.1:8000/predict', formData);
      const data = res.data;
      setResult(`Prediction: ${data.prediction}`);
      setOverlayImage(`data:image/png;base64,${data.overlay_image_base64}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      setResult('Error analyzing image.');
    } finally {
      setLoading(false);
    }
  };

  const handleAudioSubmit = async () => {
    if (!selectedAudio) {
      alert('Please select an audio file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedAudio);

    try {
      setAudioLoading(true);
      const res = await axios.post('http://127.0.0.1:8000/predict_audio', formData);
      const data = res.data;
      setAudioResult(`Audio Prediction: ${data.prediction}`);
    } catch (error) {
      console.error('Error uploading audio:', error);
      setAudioResult('Error analyzing audio.');
    } finally {
      setAudioLoading(false);
    }
  };

  // Navigate to CNN Model Info page
  const handleNavigate = () => {
    navigate('/cnn-info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center px-6 py-10 font-sans">
      <h1 className="text-5xl font-bold text-blue-700 mb-4 text-center">Deepfake Detector</h1>
      <p className="text-md text-gray-600 mb-10 text-center">Upload an image or audio and our model will analyze it for authenticity.</p>

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div className="flex flex-col space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`py-3 rounded-lg text-white text-lg font-medium transition duration-200 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Analyzing...' : 'Check Image'}
          </button>

          {result && (
            <div className="text-xl font-semibold text-gray-800 bg-gray-100 p-4 rounded-lg shadow-inner">
              {result}
            </div>
          )}

          {/* Navigation Button to CNN Info */}
          <button
            onClick={handleNavigate}
            className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
          >
            Learn About CNN Model
          </button>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {previewUrl && (
            <div className="w-full">
              <p className="text-sm text-gray-500 mb-1">Uploaded Image:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-xl max-h-72 w-full object-contain border border-gray-200 shadow"
              />
            </div>
          )}

          {overlayImage && (
            <div className="w-full">
              <p className="text-sm text-gray-500 mb-1">Grad-CAM Heatmap:</p>
              <img
                src={overlayImage}
                alt="Grad-CAM Overlay"
                className="rounded-xl max-h-72 w-full object-contain border border-gray-200 shadow"
              />
            </div>
          )}
        </div>
      </div>

      {/* Audio Upload Section */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 mt-10">
        <div className="flex flex-col space-y-4">
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <button
            onClick={handleAudioSubmit}
            disabled={audioLoading}
            className={`py-3 rounded-lg text-white text-lg font-medium transition duration-200 ${
              audioLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {audioLoading ? 'Analyzing Audio...' : 'Check Audio'}
          </button>

          {audioResult && (
            <div className="text-xl font-semibold text-gray-800 bg-gray-100 p-4 rounded-lg shadow-inner">
              {audioResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detector;
