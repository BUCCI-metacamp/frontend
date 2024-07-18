import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Dashboard } from './pages/dashboard.jsx';


function App() {
  return (
    <BrowserRouter>
      <Link to="/pages/dashboard">Dashboard</Link>
      <Routes>
        <Route path="/pages/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
