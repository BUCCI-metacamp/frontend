import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Dashboard } from './pages/dashboard.jsx';
import { SideNav } from './components/sideNav.jsx';
import { Product } from '@pages/product.jsx';
import { Login } from './pages/login.jsx';
import { ProductionLog } from './pages/board/productionLog.jsx';
import { GenerateUser } from './pages/generateUser.jsx';

function App() {
  return (
    <BrowserRouter>
    <SideNav/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pages/dashboard" element={<Dashboard />} />
        <Route path="/pages/product" element={<Product />} />
        <Route path="/pages/productionLog" element={<ProductionLog />} />
        <Route path="/pages/generateUser" element={<GenerateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
