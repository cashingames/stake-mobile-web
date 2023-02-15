import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import { getToken } from './features/Auth/AuthSlice'

// un-lazyload dashboard
import DashBoardScreen from './features/Dashboard/DashBoardScreen';
import PrivacyPolicy from './features/Agreements/PrivacyPolicy';
import GameLoading from './features/Games/GameLoading/GameLoading';
import TermsAndConditions from './features/Agreements/TermsAndConditions';
import LandingPage from './features/LandingPageScreen/LandingPage';
import Login from './features/Auth/LoginScreen/Login';
import Signup from './features/Auth/SignupScreen/Signup';
import SignupProfile from './features/Auth/SignupProfileScreen/SignupProfile';
import ForgotPassword from './features/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './features/Auth/ResetPassword/ResetPassword';
import VerifyOtp from './features/Auth/VerifyOtp/VerifyOtp';
import VerifyRegistrationOtp from './features/Auth/VerifyRegistrationOtp/VerifyRegistrationOtp';
import WalletScreen from './features/WalletScreen/WalletScreen';
import NotificationScreen from './features/NotificationScreen/NotificationScreen';
import FundWalletScreen from './features/FundWalletScreen/FundWalletScreen';
import TransactionScreen from './features/TransactionScreen/TransactionScreen';
import SelectGameCategoryScreen from './features/Games/SelectGameCategory/SelectGameCategoryscreen';
import GameStaking from './features/Games/GameStaking/GameStaking';
import UserProfileScreen from './features/Profile/UserProfileScreen';
import EditProfileDetails from './features/Profile/EditProfileDetails/EditProfileDetails';
import ChangePassword from './features/Profile/ChangePasswordScreen/ChangePassword';
import BankDetails from './features/Profile/BankDetails/BankDetails';
import GameInProgress from './features/Games/GameInProgress/GameInProgress';
import GameEnded from './features/Games/GameEnded/GameEnded';
import ReviewStake from './features/Games/ReviewStakeScreen/ReviewStake';
import Store from './features/Store/Store';
import GameBoostPurchaseSuccess from './features/Store/GameBoostPurchaseSuccess/GameBoostPurchaseSuccess';
import GameStorePurchaseFailed from './features/Store/GameStorePurchaseFailed/GameStorePurchaseFailed';
import InviteFriends from './features/InviteFriends/InviteFriends';
import SupportQuestions from './features/Support/SupportQuestions/SupportQuestions';
import SupportAnswer from './features/Support/SupportQuestions/SupportAnswer';
import ContactUs from './features/Support/ContactUs/ContactUs';
import HelpPages from './features/Support/HelpPages/HelpPages';
import AuthContactForm from './components/AuthContactUs/AuthContactUs';
import Authenticate from './features/Auth/Authenticate';

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/authenticate/:token" element={<Authenticate />} />
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
            <Route path="/help-contact" element={<AnonymousRoute redirectTo="/dashboard"><AuthContactForm /></AnonymousRoute>} />

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
                path="/exhibition-staking"
                element={<AuthRoute redirectTo="/"><GameStaking /></AuthRoute>} />
            <Route
                path="/games/staking/play/:gameId"
                element={<AuthRoute redirectTo="/"><GameInProgress /></AuthRoute>} />
            <Route
                path="/game-result"
                element={<AuthRoute redirectTo="/"><GameEnded /></AuthRoute>} />
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
                path="/bank-details"
                element={<AuthRoute redirectTo="/"><BankDetails /></AuthRoute>} />

            <Route
                path="/games/staking/:gameId/review"
                element={<AuthRoute redirectTo="/"><ReviewStake review={true} /></AuthRoute>} />

            <Route
                path="/store"
                element={<AuthRoute redirectTo="/"><Store /></AuthRoute>} />
            <Route
                path="/boost-purchase-successful"
                element={<AuthRoute redirectTo="/"><GameBoostPurchaseSuccess /></AuthRoute>} />

            <Route
                path="/purchase-failed"
                element={<AuthRoute redirectTo="/"><GameStorePurchaseFailed /></AuthRoute>} />

            <Route
                path="/invite-friends"
                element={<AuthRoute redirectTo="/"><InviteFriends /></AuthRoute>} />
            <Route
                path="/help"
                element={<AuthRoute redirectTo="/"><HelpPages /></AuthRoute>} />
            <Route
                path="/support"
                element={<AuthRoute redirectTo="/"><SupportQuestions /></AuthRoute>} />
            <Route
                path="/support-answers"
                element={<AuthRoute redirectTo="/"><SupportAnswer /></AuthRoute>} />
            <Route
                path="/contact-us"
                element={<AuthRoute redirectTo="/"><ContactUs /></AuthRoute>} />
            <Route
                path="/games/staking/loading"
                element={<AuthRoute redirectTo="/"><GameLoading /></AuthRoute>} />
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