exports.id = 927;
exports.ids = [927];
exports.modules = {

/***/ 399:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Home_container__bCOhY",
	"main": "Home_main__nLjiQ",
	"footer": "Home_footer____T7K",
	"title": "Home_title__T09hD",
	"description": "Home_description__41Owk",
	"code": "Home_code__suPER",
	"grid": "Home_grid__GxQ85",
	"card": "Home_card___LpL1",
	"logo": "Home_logo__27_tb"
};


/***/ }),

/***/ 352:
/***/ ((module) => {

// Exports
module.exports = {
	"authHeader": "AuthTitle_authHeader__WSxyf"
};


/***/ }),

/***/ 649:
/***/ ((module) => {

// Exports
module.exports = {
	"login": "Login_login__HC49M",
	"loginBox": "Login_loginBox__vpOhj",
	"password": "Login_password__bQUrQ",
	"socialBtns": "Login_socialBtns___9t2U",
	"forgot": "Login_forgot__dR8YO",
	"singUp": "Login_singUp__w7QMk",
	"signupText": "Login_signupText__txhQV"
};


/***/ }),

/***/ 599:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AuthTitle_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(352);
/* harmony import */ var _AuthTitle_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_AuthTitle_module_scss__WEBPACK_IMPORTED_MODULE_2__);



const AuthTitle = ({ titleText  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
        className: (_AuthTitle_module_scss__WEBPACK_IMPORTED_MODULE_2___default().authHeader),
        children: titleText
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthTitle);


/***/ }),

/***/ 216:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Login_Login)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "react-icons/fa"
var fa_ = __webpack_require__(290);
// EXTERNAL MODULE: external "react-icons/fc"
var fc_ = __webpack_require__(178);
// EXTERNAL MODULE: ./src/components/AuthTitle/AuthTitle.tsx
var AuthTitle = __webpack_require__(599);
// EXTERNAL MODULE: ./src/features/screens/Login/Login.module.scss
var Login_module = __webpack_require__(649);
var Login_module_default = /*#__PURE__*/__webpack_require__.n(Login_module);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(22);
;// CONCATENATED MODULE: ./src/app/hooks.ts

const useAppDispatch = ()=>(0,external_react_redux_.useDispatch)();
const useAppSelector = external_react_redux_.useSelector;

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(184);
;// CONCATENATED MODULE: ./src/features/auth/selectors.ts

const authSlice = (state)=>state.auth;
const authSelector = (0,toolkit_.createSelector)(authSlice, (state)=>state);

// EXTERNAL MODULE: ./src/features/auth/actions.ts + 1 modules
var actions = __webpack_require__(678);
;// CONCATENATED MODULE: ./src/features/screens/Login/Login.tsx









const Login = ()=>{
    const dispatch = useAppDispatch();
    const { token  } = useAppSelector(authSelector);
    const [canLogin, setCanLogin] = (0,external_react_.useState)(false);
    const [email, setEmail] = (0,external_react_.useState)("");
    const [password, setPassword] = (0,external_react_.useState)("");
    const [showPassword, setShowPassword] = (0,external_react_.useState)(false);
    const onSubmit = ()=>{};
    (0,external_react_.useEffect)(()=>{
        const logMeIn = email.length > 4 && password.length > 5;
        setCanLogin(logMeIn);
    }, [
        email,
        password
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Login_module_default()).login,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(AuthTitle/* default */.Z, {
                titleText: "Sign in",
                style: {
                    marginTop: "20px"
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                className: (Login_module_default()).loginBox,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                htmlFor: "email",
                                children: "Email"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                id: "email",
                                type: "email",
                                placeholder: "Enter your email",
                                value: email,
                                required: true,
                                onChange: (event)=>setEmail(event.target.value)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                htmlFor: "password",
                                children: "Password"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (Login_module_default()).password,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        id: "password",
                                        type: showPassword ? "text" : "password",
                                        value: password,
                                        required: true,
                                        onChange: (event)=>setPassword(event.target.value)
                                    }),
                                    password.length > 1 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        onClick: ()=>setShowPassword(!showPassword),
                                        children: [
                                            showPassword ? /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaEye, {}) : /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaEyeSlash, {}),
                                            " "
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: (Login_module_default()).forgot,
                        children: "Forg password?"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "submit",
                        disabled: !canLogin,
                        onClick: ()=>dispatch((0,actions/* loginUser */.p)()),
                        style: {
                            background: canLogin ? "#EF2F55" : "grey",
                            color: "#fff"
                        },
                        children: "Sign in"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: "or sign in using"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (Login_module_default()).socialBtns,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(fc_.FcGoogle, {}),
                                    " Google"
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaFacebookF, {}),
                                    " Facebook"
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(fa_.FaApple, {}),
                                    " Apple"
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Login_module_default()).signUp,
                children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: (Login_module_default()).signupText,
                    children: "Don't have an account ? create one"
                })
            })
        ]
    });
};
/* harmony default export */ const Login_Login = (Login);


/***/ })

};
;