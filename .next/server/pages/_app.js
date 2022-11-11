(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_app_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4128);





function App({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_redux__WEBPACK_IMPORTED_MODULE_2__.Provider, {
        store: _src_app_store__WEBPACK_IMPORTED_MODULE_3__/* .store */ .h,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
            ...pageProps
        })
    });
}


/***/ }),

/***/ 4128:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.h = void 0;
const toolkit_1 = __webpack_require__(5184);
const reducers_1 = __webpack_require__(8680);
const counter_1 = __webpack_require__(4642);
exports.h = (0, toolkit_1.configureStore)({
    reducer: {
        counter: counter_1.counterReducer,
        auth: reducers_1.authReducer
    }
});


/***/ }),

/***/ 8680:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.authReducer = void 0;
const toolkit_1 = __webpack_require__(5184);
const actions_1 = __webpack_require__(541);
const initialState = {
    token: ""
};
exports.authReducer = (0, toolkit_1.createReducer)(initialState, (builder)=>{
    builder.addCase(actions_1.loginUser.fulfilled, (state, { payload  })=>{
        state.token = payload;
        console.log(payload, "reducer");
    });
});


/***/ }),

/***/ 1008:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.incrementByAmount = exports.decrement = exports.increment = void 0;
const toolkit_1 = __webpack_require__(5184);
exports.increment = (0, toolkit_1.createAction)("counter/increment");
exports.decrement = (0, toolkit_1.createAction)("counter/decrement");
exports.incrementByAmount = (0, toolkit_1.createAction)("counter/incrementByAmount");


/***/ }),

/***/ 4642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var __createBinding = (void 0) && (void 0).__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = (void 0) && (void 0).__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__exportStar(__webpack_require__(1008), exports);
__exportStar(__webpack_require__(7668), exports);
__exportStar(__webpack_require__(8492), exports);


/***/ }),

/***/ 7668:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.counterReducer = void 0;
const toolkit_1 = __webpack_require__(5184);
const actions_1 = __webpack_require__(1008);
const initialState = {
    value: 0
};
exports.counterReducer = (0, toolkit_1.createReducer)(initialState, (builder)=>{
    builder.addCase(actions_1.increment, (state)=>{
        state.value++;
    }).addCase(actions_1.decrement, (state)=>{
        state.value--;
    }).addCase(actions_1.incrementByAmount, (state, action)=>{
        state.value += action.payload;
    });
});


/***/ }),

/***/ 8492:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.countSelector = exports.selectCount = void 0;
const toolkit_1 = __webpack_require__(5184);
const selectCount = (state)=>state.counter.value;
exports.selectCount = selectCount;
exports.countSelector = (0, toolkit_1.createSelector)(exports.selectCount, (state)=>state);


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [541], () => (__webpack_exec__(3847)));
module.exports = __webpack_exports__;

})();