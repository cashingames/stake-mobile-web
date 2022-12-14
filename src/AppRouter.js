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
import SelectGameCategoryScreen from './features/Games/SelectGameCategory/SelectGameCategoryscreen';
import GameInstructionScreen from './features/Games/GameInstructionScreen/GameInstructionScreen';
import ChallengeSelectPlayer from './features/Games/ChallengeSelectPlayer/ChallengeSelectPlayer';
import LandingPage from './features/LandingPageScreen/LandingPage';
import GameStaking from './features/Games/GameStaking/GameStaking';
import UserProfileScreen from './features/Profile/UserProfileScreen';
import EditProfileDetails from './features/Profile/EditProfileDetails/EditProfileDetails'
import ChangePassword from './features/Profile/ChangePasswordScreen/ChangePassword';
import UserStat from './features/Profile/UserStat/UserStat';
import BankDetails from './features/Profile/BankDetails/BankDetails';
import GameInProgress from './features/Games/GameInProgress/GameInProgress';
import GameEnded from './features/Games/GameEnded/GameEnded';
import ReviewStake from './features/Games/ReviewStakeScreen/ReviewStake';
import Store from './features/Store/Store';

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/" element={<AnonymousRoute redirectTo="/dashboard"><LandingPage /></AnonymousRoute>} />
            <Route path="/login" element={<AnonymousRoute redirectTo="/dashboard"><Login /></AnonymousRoute>} />
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
            <Route
                path="/select-category"
                element={<AuthRoute redirectTo="/"><SelectGameCategoryScreen /></AuthRoute>} />
            <Route
                path="/game-instructions"
                element={<AuthRoute redirectTo="/"><GameInstructionScreen /></AuthRoute>} />
            <Route
                path="/exhibition-staking"
                element={<AuthRoute redirectTo="/"><GameStaking /></AuthRoute>} />
            <Route
                path="/game-board"
                element={<AuthRoute redirectTo="/"><GameInProgress /></AuthRoute>} />
            <Route
                path="/game-result"
                element={<AuthRoute redirectTo="/"><GameEnded /></AuthRoute>} />

            <Route
                path="/select-player"
                element={<AuthRoute redirectTo="/"><ChallengeSelectPlayer /></AuthRoute>} />

            <Route
                path="/profile"
                element={<AuthRoute redirectTo="/"><UserProfileScreen /></AuthRoute>} />
            <Route
                path="/edit-profile"
                element={<AuthRoute redirectTo="/"><EditProfileDetails /></AuthRoute>} />
            <Route
                path="/change-password"
                element={<AuthRoute redirectTo="/"><ChangePassword /></AuthRoute>} />

            <Route
                path="/stat"
                element={<AuthRoute redirectTo="/"><UserStat /></AuthRoute>} />
            <Route
                path="/bank-details"
                element={<AuthRoute redirectTo="/"><BankDetails /></AuthRoute>} />
            <Route
                path="/review-stake"
                element={<AuthRoute redirectTo="/"><ReviewStake /></AuthRoute>} />
            <Route
                path="/store"
                element={<AuthRoute redirectTo="/"><Store /></AuthRoute>} />
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