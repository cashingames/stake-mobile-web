import React, { lazy } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import { getToken } from './features/Auth/AuthSlice'

const DashBoardScreen = lazy(() => import('./features/Dashboard/DashBoardScreen'));

const PrivacyPolicy = lazy(() => import('./features/Agreements/PrivacyPolicy'));
const HelpPages = lazy(() => import('./features/Support/HelpPages/HelpPages'));
const TermsAndConditions = lazy(() => import('./features/Agreements/TermsAndConditions'));


const InviteFriends = lazy(() => import('./features/InviteFriends/InviteFriends'));
const SupportQuestions = lazy(() => import('./features/Support/SupportQuestions/SupportQuestions'));
const SupportAnswer = lazy(() => import('./features/Support/SupportQuestions/SupportAnswer'));
const ContactUs = lazy(() => import('./features/Support/ContactUs/ContactUs'));

const GameLoading = lazy(() => import('./features/Games/GameLoading/GameLoading'));
const LandingPage = lazy(() => import('./features/LandingPageScreen/LandingPage'));
const Login = lazy(() => import('./features/Auth/LoginScreen/Login'));
const Signup = lazy(() => import('./features/Auth/SignupScreen/Signup'));
const ForgotPassword = lazy(() => import('./features/Auth/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('./features/Auth/ResetPassword/ResetPassword'));
const VerifyOtp = lazy(() => import('./features/Auth/VerifyOtp/VerifyOtp'));
const VerifyRegistrationOtp = lazy(() => import('./features/Auth/VerifyRegistrationOtp/VerifyRegistrationOtp'));
const WalletScreen = lazy(() => import('./features/WalletScreen/WalletScreen'));
const NotificationScreen = lazy(() => import('./features/NotificationScreen/NotificationScreen'));
const FundWalletScreen = lazy(() => import('./features/FundWalletScreen/FundWalletScreen'));
const TransactionScreen = lazy(() => import('./features/TransactionScreen/TransactionScreen'));
const SelectGameCategoryScreen = lazy(() => import('./features/Games/SelectGameCategory/SelectGameCategoryscreen'));
const GameStaking = lazy(() => import('./features/Games/GameStaking/GameStaking'));
const UserProfileScreen = lazy(() => import('./features/Profile/UserProfileScreen'));
const EditProfileDetails = lazy(() => import('./features/Profile/EditProfileDetails/EditProfileDetails'));
const ChangePassword = lazy(() => import('./features/Profile/ChangePasswordScreen/ChangePassword'));
const BankDetails = lazy(() => import('./features/Profile/BankDetails/BankDetails'));
const GameInProgress = lazy(() => import('./features/Games/GameInProgress/GameInProgress'));
const GameEnded = lazy(() => import('./features/Games/GameEnded/GameEnded'));
const ReviewStake = lazy(() => import('./features/Games/ReviewStakeScreen/ReviewStake'));
const Store = lazy(() => import('./features/Store/Store'));
const GameBoostPurchaseSuccess = lazy(() => import('./features/Store/GameBoostPurchaseSuccess/GameBoostPurchaseSuccess'));
const GameStorePurchaseFailed = lazy(() => import('./features/Store/GameStorePurchaseFailed/GameStorePurchaseFailed'));
const AuthContactForm = lazy(() => import('./components/AuthContactUs/AuthContactUs'));
const Authenticate = lazy(() => import('./features/Auth/Authenticate'));
const EmailVerification = lazy(() => import('./features/Auth/EmailVerification/EmailVerification'));
const Roulette = lazy(() => import('./features/Games/Roulette'));
const AppRouter = () => {

    return (
        <Routes>
            <Route path="/authenticate/:token" element={<Authenticate />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/" element={<AnonymousRoute redirectTo="/dashboard"><LandingPage /></AnonymousRoute>} />
            <Route path="/login" element={<AnonymousRoute redirectTo="/dashboard"><Login /></AnonymousRoute>} />
            <Route path="/sign-up" element={<AnonymousRoute redirectTo="/dashboard"><Signup /></AnonymousRoute>} />
            {/* <Route path="/sign-up-profile" element={<AnonymousRoute redirectTo="/dashboard"><SignupProfile /></AnonymousRoute>} /> */}
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
             <Route
                path="/email-verification"
                element={<AuthRoute redirectTo="/"><EmailVerification /></AuthRoute>} />

            <Route
                path="/games/roulette"
                element={<AuthRoute redirectTo="/"><Roulette /></AuthRoute>} />

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