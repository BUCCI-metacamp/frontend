import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Dashboard from '@pages/dashboard.jsx';
import { SideNav } from '@components/sideNav.jsx';
import { Product } from '@pages/product.jsx';
import { Login } from '@pages/login.jsx';
import { ProductionLog } from './pages/board/productionLog.jsx';
import { GenerateUser } from './pages/generateUser.jsx';
import BoardWrite from './pages/board/boardWrite.jsx';
import BoardRead from './pages/board/boardRead.jsx';


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <SideNav/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/board/productionLog" element={<ProductionLog />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/read" element={<BoardRead />} />
        <Route path="/generateUser" element={<GenerateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
