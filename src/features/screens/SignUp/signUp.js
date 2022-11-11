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
const react_hook_form_1 = require("react-hook-form");
const AuthBanner_1 = __importDefault(require("../../../components/AuthBanner/AuthBanner"));
const AuthTitle_1 = __importDefault(require("../../../components/AuthTitle/AuthTitle"));
const GoogleSignUp_1 = __importDefault(require("../../../components/GoogleSignUp/GoogleSignUp"));
const SignUp_module_scss_1 = __importDefault(require("./SignUp.module.scss"));
const SignUp = () => {
    console.log(process.env.NEXT_PUBLIC_API_URL, 'hhhhhhhh');
    console.log('weeee');
    const { register, formState: { errors }, handleSubmit, clearErrors } = (0, react_hook_form_1.useForm)();
    const [emailError, setEmailError] = (0, react_1.useState)('');
    const [phoneError, setPhoneError] = (0, react_1.useState)('');
    const [passwordError, setPasswordError] = (0, react_1.useState)('');
    const [canSend, setCanSend] = (0, react_1.useState)(true);
    const [passFailed, setPassFailed] = (0, react_1.useState)(false);
    const [emailFailed, setEmailFailed] = (0, react_1.useState)(false);
    const [phoneFailed, setPhoneFailed] = (0, react_1.useState)(false);
    const [confirmPasswordError, setConfirmPasswordError] = (0, react_1.useState)('');
    const [confirmPasswordFailed, setConfirmPasswordFailed] = (0, react_1.useState)(false);
    const [checked, setChecked] = (0, react_1.useState)(false);
    const onChangeEmail = (event) => {
        const email = event.currentTarget.value;
        // eslint-disable-next-line
        const filter = /^([a-zA-Z0-9_/\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; /* eslint-disable-line */
        if (!filter.test(email)) {
            setEmailError("Email address is not valid.");
            setEmailFailed(true);
        }
        else {
            setEmailError("");
            setEmailFailed(false);
        }
    };
    const onChangePhone = (event) => {
        const phone = event.currentTarget.value;
        if (phone.length > 16 || phone.length < 4) {
            setPhoneError("Please input a valid phone number.");
            setPhoneFailed(true);
        }
        else {
            setPhoneError("");
            setPhoneFailed(false);
        }
    };
    const onChangePassword = (event) => {
        const password = event.currentTarget.value;
        // eslint-disable-next-line
        const filter = /^.{8,}$/; /* eslint-disable-line */
        if (!filter.test(password)) {
            setPasswordError("Password must contain at least 8 characters");
            setPassFailed(true);
        }
        else {
            setPasswordError("");
            setPassFailed(false);
        }
    };
    const onChangePasswordConfirmation = (event) => {
        const conFirmpassword = event.currentTarget.value;
        // eslint-disable-next-line
        const filter = /^.{8,}$/; /* eslint-disable-line */
        if (!filter.test(conFirmpassword)) {
            setConfirmPasswordError("Password does not match");
            setConfirmPasswordFailed(true);
        }
        else {
            setConfirmPasswordError("");
            setConfirmPasswordFailed(false);
        }
    };
    (0, react_1.useEffect)(() => {
        const invalid = passFailed || emailFailed || phoneFailed || confirmPasswordFailed;
        setCanSend(!invalid);
    }, [passFailed, emailFailed, phoneFailed]);
    return (<div className={SignUp_module_scss_1.default.signupContainer}>
            <AuthBanner_1.default />
            <AuthTitle_1.default titleText="Creat an account"/>
            <div className={SignUp_module_scss_1.default.socialLinkContainer}>
                <p className={SignUp_module_scss_1.default.socialLinkText}>Use your social link</p>
                <div>
                    <GoogleSignUp_1.default buttonText="S up"/>
                </div>
                <p className={SignUp_module_scss_1.default.socialLinkText}>or</p>
            </div>
            <form>
                <div className={SignUp_module_scss_1.default.inputsContainer}>
                    <div className={SignUp_module_scss_1.default.inputContainer}>
                        <label className={SignUp_module_scss_1.default.inputLabel}>Email</label>
                        <input {...register("email", { required: true })} type="email" name="email" placeholder="johndoe@example.com" className={SignUp_module_scss_1.default.inputBox} onChange={(event) => {
            onChangeEmail(event);
            clearErrors('email');
        }}/>
                        <span className={SignUp_module_scss_1.default.errorLabel}>
                            {errors.email &&
            !emailError &&
            errors.email.type === "required" &&
            " *required."}
                            {emailError && ` *${emailError}`}
                        </span>
                    </div>
                    <div className={SignUp_module_scss_1.default.inputContainer}>
                        <label className={SignUp_module_scss_1.default.inputLabel}>Phone number</label>
                        <input {...register("phone_number", { required: true })} type="number" name="phone_number" placeholder="80xxxxxxxxxx" className={SignUp_module_scss_1.default.inputBox} onChange={(event) => {
            onChangePhone(event);
            clearErrors('phone_number');
        }}/>
                        <span className={SignUp_module_scss_1.default.errorLabel}>
                            {errors.phone_number &&
            !phoneError &&
            errors.phone_number.type === "required" &&
            " *required"}
                            {phoneError && ` *${phoneError}`}
                        </span>
                    </div>
                    <div className={SignUp_module_scss_1.default.inputContainer}>
                        <label className={SignUp_module_scss_1.default.inputLabel}>Password</label>
                        <input {...register("password", { required: true })} type="password" name="password" placeholder="Enter password" className={SignUp_module_scss_1.default.inputBox} onChange={(event) => {
            onChangePassword(event);
            clearErrors('password');
        }}/>
                        <span className={SignUp_module_scss_1.default.errorLabel}>
                            {errors["password"] && "  *password is required"}{" "}
                            {passwordError && ` *${passwordError}`}
                        </span>
                    </div>
                    <div className={SignUp_module_scss_1.default.inputContainer}>
                        <label className={SignUp_module_scss_1.default.inputLabel}>Confirm password</label>
                        <input {...register("password_confirmation", { required: true })} type="password" name="confirmPassword" placeholder="Confirm password" className={SignUp_module_scss_1.default.inputBox} onChange={(event) => {
            onChangePasswordConfirmation(event);
            clearErrors('password_confirmation');
        }}/>
                        <span className={SignUp_module_scss_1.default.errorLabel}>
                            {errors.password_confirmation &&
            errors.password_confirmation.type === "required" &&
            " *required"}
                                {confirmPasswordError && ` *${confirmPasswordError}`}
                        </span>
                    </div>
                </div>
                <div className={SignUp_module_scss_1.default.agreementsContainer}>
                    <input type='checkbox' className={SignUp_module_scss_1.default.agreementsCheckbox} defaultChecked name="agree" required/>
                    <div className={SignUp_module_scss_1.default.agreementsTextContainer}>
                        <span className={SignUp_module_scss_1.default.agreementsText}>I agree to the</span>
                        <a className={SignUp_module_scss_1.default.agreementsLink} href="">terms & conditions</a>
                        <span className={SignUp_module_scss_1.default.agreementsText}>and</span>
                        <a className={SignUp_module_scss_1.default.agreementsLink} href="">privacy policy</a>
                    </div>
                </div>
                <div className={SignUp_module_scss_1.default.appButtonContainer}>
                    {/* <AppButton disabled={!canSend} buttonText="Continue"  /> */}
                    <button className={SignUp_module_scss_1.default.buttonContainer} type="submit" disabled={!canSend}>
                        <span className={SignUp_module_scss_1.default.buttonText}>Continue</span>
                    </button>
                </div>
            </form>
        </div>);
};
exports.default = SignUp;
