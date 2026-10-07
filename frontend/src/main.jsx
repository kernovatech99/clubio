import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import {ThemeInit} from '../.flowbite-react/init';
import {AuthProvider} from './auth/AuthContext.jsx';
import AppLayout from './components/AppLayout.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import './index.css';
import EntryPage from './pages/EntryPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeInit />
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<RequireAuth />}>
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<EntryPage />} />
                            <Route path="/entry" element={<EntryPage />} />
                            <Route path="/book" element={<PlaceholderPage title="Kassen" />} />
                            <Route path="/category" element={<PlaceholderPage title="Konten" />} />
                            <Route path="/unit" element={<PlaceholderPage title="Kostenstellen" />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
);
