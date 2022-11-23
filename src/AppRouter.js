import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './features/Auth/LoginScreen/Login';
import Signup from './features/Auth/SignupScreen/Signup';
import SignupProfile from './features/Auth/SignupProfileScreen/SignupProfile';
import PrivacyPolicy from './features/Agreements/PrivacyPolicy';
import TermsAndConditions from './features/Agreements/TermsAndConditions';
import ForgotPassword from './features/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './features/Auth/ResetPassword/ResetPassword';
import VerifyOtp from './features/Auth/VerifyOtp/VerifyOtp';
import VerifyRegistrationOtp from './features/Auth/VerifyRegistrationOtp/VerifyRegistrationOtp';
import DashBoardScreen from './features/DashBoardScreen';
import WalletScreen from './features/WalletScreen/WalletScreen';
import { getToken } from './features/Auth/AuthSlice';
import NotificationScreen from './features/NotificationScreen/NotificationScreen';
import FundWalletScreen from './features/FundWalletScreen/FundWalletScreen';
import TransactionScreen from './features/TransactionScreen/TransactionScreen';

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/" element={<AnonymousRoute redirectTo="/dashboard"><Login /></AnonymousRoute>} />
            <Route path="/sign-up" element={<AnonymousRoute redirectTo="/dashboard"><Signup /></AnonymousRoute>} />
            <Route path="/sign-up-profile" element={<AnonymousRoute redirectTo="/dashboard"><SignupProfile /></AnonymousRoute>} />
            <Route path="/verify-phone-number" element={<AnonymousRoute redirectTo="/dashboard"><VerifyRegistrationOtp /></AnonymousRoute>} />
            <Route path="/forgot-password" element={<AnonymousRoute redirectTo="/dashboard"><ForgotPassword /></AnonymousRoute>} />
            <Route path="/reset-password" element={<AnonymousRoute redirectTo="/dashboard"><ResetPassword /></AnonymousRoute>} />
            <Route path="/verify-otp" element={<AnonymousRoute redirectTo="/dashboard"><VerifyOtp /></AnonymousRoute>} />
            <Route
                path="/dashboard"
                element={<AuthRoute redirectTo="/"><DashBoardScreen /></AuthRoute>} />
            <Route
                path="/wallet"
                element={<AuthRoute redirectTo="/"><WalletScreen /></AuthRoute>} />
            <Route
                path="/notifications"
                element={<AuthRoute redirectTo="/"><NotificationScreen /></AuthRoute>} />
            <Route
                path="/fund-wallet"
                element={<AuthRoute redirectTo="/"><FundWalletScreen /></AuthRoute>} />
            <Route
                path="/transactions"
                element={<AuthRoute redirectTo="/"><TransactionScreen /></AuthRoute>} />
        </Routes>
    )
}



function AuthRoute({ children, redirectTo }) {
    const token = getToken();
    const isAuth = token !== undefined && token !== null;
    return isAuth ? children : <Navigate to={redirectTo} />;
}

function AnonymousRoute({ children, redirectTo }) {
    const token = getToken();
    const isAuth = token !== undefined && token !== null;
    return isAuth ? <Navigate to={redirectTo} /> : children;
}

export default AppRouter;