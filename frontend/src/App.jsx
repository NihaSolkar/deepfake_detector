import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Detector from './components/Detector';
 // Your CNN info component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Detector />} />
      </Routes>
    </Router>
  );
}

export default App;
