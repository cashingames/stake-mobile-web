"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AuthTitle_module_scss_1 = __importDefault(require("./AuthTitle.module.scss"));
const AuthTitle = ({ titleText }) => {
    return (<h1 className={AuthTitle_module_scss_1.default.authHeader}>{titleText}</h1>);
};
exports.default = AuthTitle;
