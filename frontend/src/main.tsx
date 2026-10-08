import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import {ThemeInit} from '../.flowbite-react/init.tsx';
import {AuthProvider} from './auth/AuthContext.jsx';
import {DialogProvider} from './components/DialogContext.tsx';
import AppLayout from './components/AppLayout.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import './index.css';
import BookPage from './pages/BookPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import EntryPage from './pages/EntryPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UnitPage from './pages/UnitPage.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeInit />
        <AuthProvider>
            <DialogProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route element={<RequireAuth />}>
                            <Route element={<AppLayout />}>
                                <Route path="/" element={<EntryPage />} />
                                <Route path="/entry" element={<EntryPage />} />
                                <Route path="/book" element={<BookPage />} />
                                <Route path="/category" element={<CategoryPage />} />
                                <Route path="/unit" element={<UnitPage />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DialogProvider>
        </AuthProvider>
    </StrictMode>,
);
