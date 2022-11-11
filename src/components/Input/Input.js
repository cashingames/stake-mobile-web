"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_module_scss_1 = __importDefault(require("./Input.module.scss"));
const Input = ({ inputLabelText, placeholderText, inputType, minLength, maxLength, value, onChange }) => {
    return (<div className={Input_module_scss_1.default.inputContainer}>
            <label className={Input_module_scss_1.default.inputLabel}>{inputLabelText}</label>
            <input className={Input_module_scss_1.default.inputBox} type={inputType} placeholder={placeholderText} minLength={minLength} maxLength={maxLength} value={value} onChange={onChange}/>
        </div>);
};
exports.default = Input;
