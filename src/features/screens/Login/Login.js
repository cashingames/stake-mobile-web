"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const fa_1 = require("react-icons/fa");
const fc_1 = require("react-icons/fc");
const AuthTitle_1 = __importDefault(require("../../../components/AuthTitle/AuthTitle"));
const Login_module_scss_1 = __importDefault(require("./Login.module.scss"));
const hooks_1 = require("../../../app/hooks");
const selectors_1 = require("../../auth/selectors");
const actions_1 = require("../../auth/actions");
const Login = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { token } = (0, hooks_1.useAppSelector)(selectors_1.authSelector);
    const [canLogin, setCanLogin] = (0, react_1.useState)(false);
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const onSubmit = () => {
    };
    (0, react_1.useEffect)(() => {
        const logMeIn = email.length > 4 && password.length > 5;
        setCanLogin(logMeIn);
    }, [email, password]);
    return (<div className={Login_module_scss_1.default.login}>
            <AuthTitle_1.default titleText="Sign in" style={{
            marginTop: '20px'
        }}/>

            <form className={Login_module_scss_1.default.loginBox}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type='email' placeholder="Enter your email" value={email} required onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div className={Login_module_scss_1.default.password}>
                        <input id="password" type={showPassword ? 'text' : 'password'} value={password} required onChange={(event) => setPassword(event.target.value)}/>
                        {password.length > 1 && <span onClick={() => setShowPassword(!showPassword)}>{showPassword ?
                <fa_1.FaEye /> : <fa_1.FaEyeSlash />} </span>}
                    </div>
                </div>
                <p className={Login_module_scss_1.default.forgot}>Forg password?</p>
                <button type="submit" disabled={!canLogin} onClick={() => dispatch((0, actions_1.loginUser)())} style={{
            background: canLogin ? "#EF2F55" : 'grey',
            color: '#fff'
        }}>Sign in</button>
                <p>or sign in using</p>
                <div className={Login_module_scss_1.default.socialBtns}>
                    <button><fc_1.FcGoogle /> Google</button>
                    <button><fa_1.FaFacebookF /> Facebook</button>
                    <button><fa_1.FaApple /> Apple</button>
                </div>
            </form>
            <div className={Login_module_scss_1.default.signUp}>
                <p className={Login_module_scss_1.default.signupText}>Don't have an account ? create one</p>
            </div>
        </div>);
};
exports.default = Login;
