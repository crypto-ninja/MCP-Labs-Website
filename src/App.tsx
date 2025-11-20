import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import Products from './pages/Products';
import GitHubMCP from './pages/products/GitHubMCP';
import ComingSoon from './pages/products/ComingSoon';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/success" element={<Success />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/github" element={<GitHubMCP />} />
          <Route path="/products/n8n" element={<ComingSoon product="N8N" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
