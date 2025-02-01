import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { DashboardProvider } from "./Contexts/DashboardContext";
import { SearchProvider } from './Contexts/SearchContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DashboardProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </DashboardProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

