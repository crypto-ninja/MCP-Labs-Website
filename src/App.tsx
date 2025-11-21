import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BannerProvider } from './contexts/BannerContext';
import AnnouncementBanner from './components/AnnouncementBanner';
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
      <BannerProvider>
        <BrowserRouter>
          <AnnouncementBanner />
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
      </BannerProvider>
    </AuthProvider>
  );
}

export default App;
