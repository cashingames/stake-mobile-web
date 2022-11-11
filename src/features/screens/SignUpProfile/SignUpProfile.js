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
const SignUpProfile_module_scss_1 = __importDefault(require("./SignUpProfile.module.scss"));
const SignUpProfile = () => {
    const { register, formState: { errors }, handleSubmit, clearErrors } = (0, react_hook_form_1.useForm)();
    const [canSend, setCanSend] = (0, react_1.useState)(true);
    return (<div className={SignUpProfile_module_scss_1.default.signupContainer}>
            <AuthBanner_1.default />
            <AuthTitle_1.default titleText="Let's get to know you"/>
            <div className={SignUpProfile_module_scss_1.default.socialLinkContainer}>
                <p className={SignUpProfile_module_scss_1.default.socialLinkText}>Input your details below</p>
            </div>
            <form>
                <div className={SignUpProfile_module_scss_1.default.inputsContainer}>
                    <div className={SignUpProfile_module_scss_1.default.inputContainer}>
                        <label className={SignUpProfile_module_scss_1.default.inputLabel}>First Name</label>
                        <input {...register("first_name", { required: true })} type="text" name="first_name" placeholder="First Name" className={SignUpProfile_module_scss_1.default.inputBox}/>
                        <span className={SignUpProfile_module_scss_1.default.errorLabel}>
                            {errors.first_name &&
            errors.first_name.type === "required" &&
            " *required"}
                        </span>
                    </div>
                    <div className={SignUpProfile_module_scss_1.default.inputContainer}>
                        <label className={SignUpProfile_module_scss_1.default.inputLabel}>Last Name</label>
                        <input {...register("last_name", { required: true })} type="text" name="last_name" placeholder="Last Name" className={SignUpProfile_module_scss_1.default.inputBox}/>
                        <span className={SignUpProfile_module_scss_1.default.errorLabel}>
                            {errors.last_name &&
            errors.last_name.type === "required" &&
            " *required"}
                        </span>
                    </div>
                    <div className={SignUpProfile_module_scss_1.default.inputContainer}>
                        <label className={SignUpProfile_module_scss_1.default.inputLabel}>Username</label>
                        <input {...register("username", { required: true })} type="text" name="username" placeholder="Username" className={SignUpProfile_module_scss_1.default.inputBox}/>
                        <span className={SignUpProfile_module_scss_1.default.errorLabel}>
                            {" "}
                            {errors.username &&
            errors.username.type === "required" &&
            " *required"}
                        </span>
                    </div>
                    <div className={SignUpProfile_module_scss_1.default.inputContainer}>
                        <label className={SignUpProfile_module_scss_1.default.inputLabel}>Referral Code</label>
                        <input {...register("referrer", { required: false })} type="text" name="referrer" placeholder="Referral Code (optional)" className={SignUpProfile_module_scss_1.default.inputBox}/>
                    </div>
                </div>
                <div className={SignUpProfile_module_scss_1.default.appButtonContainer}>
                    {/* <AppButton disabled={!canSend} buttonText="Continue"  /> */}
                    <button className={SignUpProfile_module_scss_1.default.buttonContainer} type="submit" disabled={!canSend}>
                        <span className={SignUpProfile_module_scss_1.default.buttonText}>Create Account</span>
                    </button>
                </div>
            </form>
        </div>);
};
exports.default = SignUpProfile;
