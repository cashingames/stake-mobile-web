"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AppButton_module_scss_1 = __importDefault(require("./AppButton.module.scss"));
const AppButton = ({ buttonText, onClick, disabled }) => {
    return (<button className={AppButton_module_scss_1.default.buttonContainer} onClick={onClick} disabled={disabled} type="submit">
            <span className={AppButton_module_scss_1.default.buttonText}>{buttonText}</span>
        </button>);
};
exports.default = AppButton;
