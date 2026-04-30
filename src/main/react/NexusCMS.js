import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import AppLoadingBar from './components/loading/AppLoadingBar';
import { AppLoadingProvider } from './components/loading/AppLoadingProvider';
import RouterNavigationProgress from './components/loading/RouterNavigationProgress';
import AppThemeProvider from './theme/AppThemeProvider';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';

export default function NexusCMSApp() {
    return (
        <AppThemeProvider>
            <AppLoadingProvider>
                <Router>
                    <RouterNavigationProgress />
                    <AppLoadingBar />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Navigate to="/backend/dashboard/overview" replace />} />
                        <Route path="/backend" element={<Navigate to="/backend/dashboard/overview" replace />} />
                        <Route path="/backend/:section/:view" element={<Dashboard />} />
                        <Route path="/backend/:section" element={<Dashboard />} />
                        <Route path="/backend/*" element={<Navigate to="/backend/dashboard/overview" replace />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Router>
            </AppLoadingProvider>
        </AppThemeProvider>
    );
}