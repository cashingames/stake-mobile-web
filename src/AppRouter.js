import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import { getToken } from './features/Auth/AuthSlice'

// un-lazyload dashboard
import DashBoardScreen from './features/Dashboard/DashBoardScreen';
import GameLoading from './features/Games/GameLoading/GameLoading';

const Login = React.lazy(() => import('./features/Auth/LoginScreen/Login'));
const Signup = React.lazy(() => import('./features/Auth/SignupScreen/Signup'));
const SignupProfile = React.lazy(() => import('./features/Auth/SignupProfileScreen/SignupProfile'));
const PrivacyPolicy = React.lazy(() => import('./features/Agreements/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./features/Agreements/TermsAndConditions'));
const ForgotPassword = React.lazy(() => import('./features/Auth/ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./features/Auth/ResetPassword/ResetPassword'));
const VerifyOtp = React.lazy(() => import('./features/Auth/VerifyOtp/VerifyOtp'));
const VerifyRegistrationOtp = React.lazy(() => import('./features/Auth/VerifyRegistrationOtp/VerifyRegistrationOtp'));
const WalletScreen = React.lazy(() => import('./features/WalletScreen/WalletScreen'));
const NotificationScreen = React.lazy(() => import('./features/NotificationScreen/NotificationScreen'));
const FundWalletScreen = React.lazy(() => import('./features/FundWalletScreen/FundWalletScreen'));
const TransactionScreen = React.lazy(() => import('./features/TransactionScreen/TransactionScreen'));
const SelectGameCategoryScreen = React.lazy(() => import('./features/Games/SelectGameCategory/SelectGameCategoryscreen'));
const GameInstructionScreen = React.lazy(() => import('./features/Games/GameInstructionScreen/GameInstructionScreen'));
const ChallengeSelectPlayer = React.lazy(() => import('./features/Games/ChallengeSelectPlayer/ChallengeSelectPlayer'));
const LandingPage = React.lazy(() => import('./features/LandingPageScreen/LandingPage'));
const GameStaking = React.lazy(() => import('./features/Games/GameStaking/GameStaking'));
const UserProfileScreen = React.lazy(() => import('./features/Profile/UserProfileScreen'));
const EditProfileDetails = React.lazy(() => import('./features/Profile/EditProfileDetails/EditProfileDetails'))
const ChangePassword = React.lazy(() => import('./features/Profile/ChangePasswordScreen/ChangePassword'));
const UserStat = React.lazy(() => import('./features/Profile/UserStat/UserStat'));
const BankDetails = React.lazy(() => import('./features/Profile/BankDetails/BankDetails'));
const GameInProgress = React.lazy(() => import('./features/Games/GameInProgress/GameInProgress'));
const GameEnded = React.lazy(() => import('./features/Games/GameEnded/GameEnded'));
const ReviewStake = React.lazy(() => import('./features/Games/ReviewStakeScreen/ReviewStake'));
const Store = React.lazy(() => import('./features/Store/Store'));
const GameBoostPurchaseSuccess = React.lazy(() => import('./features/Store/GameBoostPurchaseSuccess/GameBoostPurchaseSuccess'));
const GamePlanPurchaseSuccess = React.lazy(() => import('./features/Store/GamePlanPurchaseSuccessful/GamePlanPurchaseSuccessful'));
const GameStorePurchaseFailed = React.lazy(() => import('./features/Store/GameStorePurchaseFailed/GameStorePurchaseFailed'));
const LiveTriviaLeaderboard = React.lazy(() => import('./features/LiveTrivia/LiveTriviaLeaderboard/LiveTriviaLeaderboard'));
const TriviaInstructions = React.lazy(() => import('./features/LiveTrivia/TriviaInstructions/TriviaInstructions'));
const LiveTrivias = React.lazy(() => import('./features/LiveTrivia/LiveTrivias/LiveTrivias'));
const TriviaEnded = React.lazy(() => import('./features/LiveTrivia/TriviaEnded/TriviaEnded'));
const LiveTriviaStaking = React.lazy(() => import('./features/LiveTrivia/LiveTriviaStaking/LiveTriviaStaking'));
const InviteFriends = React.lazy(() => import('./features/InviteFriends/InviteFriends'));
const SupportQuestions = React.lazy(() => import('./features/Support/SupportQuestions/SupportQuestions'));
const SupportAnswer = React.lazy(() => import('./features/Support/SupportQuestions/SupportAnswer'));
const MyChallengeScreen = React.lazy(() => import('./features/Games/MyChallengeScreen/MyChallengeScreen'));
const MyChallengeScore = React.lazy(() => import('./features/Games/MyChallengeScore/MyChallengeScore'));
const ChallengeGameInProgress = React.lazy(() => import('./features/Games/ChallengeGameInProgress/ChallengeGameInProgress'));
const ChallengeEndGameScreen = React.lazy(() => import('./features/Games/ChallengeEndGameScreen/ChallengeEndGameScreen'));
const ChallengeStaking = React.lazy(() => import('./features/Games/ChallengeStaking/ChallengeStaking'))
const WeeklyLeaderboard = React.lazy(() => import('./features/Leaderboard/WeeklyLeaderboards/WeeklyLeaderboards'))
const ExtendedLeaderBoard = React.lazy(() => import('./features/Leaderboard/ExtendedLeaderBoard/ExtendedLeaderBoard'))
const ContactUs = React.lazy(() => import('./features/Support/ContactUs/ContactUs'))
const HelpPages = React.lazy(() => import('./features/Support/HelpPages/HelpPages'))
const AuthContactForm = React.lazy(() => import('./components/AuthContactUs/AuthContactUs'))

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
                path="/game-instructions"
                element={<AuthRoute redirectTo="/"><GameInstructionScreen /></AuthRoute>} />
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
            <Route
                path="/boost-purchase-successful"
                element={<AuthRoute redirectTo="/"><GameBoostPurchaseSuccess /></AuthRoute>} />
            <Route
                path="/plan-purchase-successful"
                element={<AuthRoute redirectTo="/"><GamePlanPurchaseSuccess /></AuthRoute>} />
            <Route
                path="/purchase-failed"
                element={<AuthRoute redirectTo="/"><GameStorePurchaseFailed /></AuthRoute>} />
            <Route
                path="/live-trivia"
                element={<AuthRoute redirectTo="/"><LiveTrivias /></AuthRoute>} />
            <Route
                path="/live-trivia-instructions"
                element={<AuthRoute redirectTo="/"><TriviaInstructions /></AuthRoute>} />
            <Route
                path="/live-trivia-staking"
                element={<AuthRoute redirectTo="/"><LiveTriviaStaking /></AuthRoute>} />
            <Route
                path="/trivia-ended"
                element={<AuthRoute redirectTo="/"><TriviaEnded /></AuthRoute>} />
            <Route
                path="/trivia-leaderboard/:id"
                element={<AuthRoute redirectTo="/"><LiveTriviaLeaderboard /></AuthRoute>} />
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
                path="/challenges"
                element={<AuthRoute redirectTo="/"><MyChallengeScreen /></AuthRoute>} />
            <Route
                path="/challenge-score/:id"
                element={<AuthRoute redirectTo="/"><MyChallengeScore /></AuthRoute>} />
            <Route
                path="/challenge-game"
                element={<AuthRoute redirectTo="/"><ChallengeGameInProgress /></AuthRoute>} />
            <Route
                path="/challenge-result"
                element={<AuthRoute redirectTo="/"><ChallengeEndGameScreen /></AuthRoute>} />
            <Route
                path="/challenge-staking"
                element={<AuthRoute redirectTo="/"><ChallengeStaking /></AuthRoute>} />
            <Route
                path="/weekly-leaders"
                element={<AuthRoute redirectTo="/"><WeeklyLeaderboard /></AuthRoute>} />
            <Route
                path="/leaderboards"
                element={<AuthRoute redirectTo="/"><ExtendedLeaderBoard /></AuthRoute>} />
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