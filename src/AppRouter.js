import React from 'react';
import { Routes, Route } from "react-router-dom"
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

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-up-profile" element={<SignupProfile />} />
            <Route path="/verify-phone-number" element={<VerifyRegistrationOtp />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/dashboard" element={<DashBoardScreen />} />
        </Routes>
    )
}
export default AppRouter;