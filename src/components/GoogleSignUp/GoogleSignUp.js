"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GoogleSignUp_module_scss_1 = __importDefault(require("./GoogleSignUp.module.scss"));
const GoogleSignUp = ({ buttonText }) => {
    return (<div className={GoogleSignUp_module_scss_1.default.googleButtonContainer}>
            <p className={GoogleSignUp_module_scss_1.default.googleButtonText}>{buttonText} with Google</p>
            <div className={GoogleSignUp_module_scss_1.default.googleButtonImage}>
                <img src="/images/google_icon.png" alt="banner" style={{ width: '.6rem', height: '.6rem' }}/>
            </div>
        </div>);
};
exports.default = GoogleSignUp;
