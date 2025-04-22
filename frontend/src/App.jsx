import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Detector from './components/Detector';
import EfficientNet from './components/EfficientNet'; // Your CNN info component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Detector />} />
        <Route path="/cnn-info" element={<EfficientNet />} />
      </Routes>
    </Router>
  );
}

export default App;
