(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 786:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ App)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(764);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(22);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(184);
// EXTERNAL MODULE: ./src/features/auth/actions.ts + 1 modules
var actions = __webpack_require__(678);
;// CONCATENATED MODULE: ./src/features/auth/reducers.ts


const initialState = {
    token: ""
};
const authReducer = (0,toolkit_.createReducer)(initialState, (builder)=>{
    builder.addCase(actions/* loginUser.fulfilled */.p.fulfilled, (state, { payload  })=>{
        state.token = payload;
        console.log(payload, "reducer");
    });
});

;// CONCATENATED MODULE: ./src/features/counter/actions.ts

const increment = (0,toolkit_.createAction)("counter/increment");
const decrement = (0,toolkit_.createAction)("counter/decrement");
const incrementByAmount = (0,toolkit_.createAction)("counter/incrementByAmount");

;// CONCATENATED MODULE: ./src/features/counter/reducers.ts


const reducers_initialState = {
    value: 0
};
const counterReducer = (0,toolkit_.createReducer)(reducers_initialState, (builder)=>{
    builder.addCase(increment, (state)=>{
        state.value++;
    }).addCase(decrement, (state)=>{
        state.value--;
    }).addCase(incrementByAmount, (state, action)=>{
        state.value += action.payload;
    });
});

;// CONCATENATED MODULE: ./src/features/counter/selectors.ts

const selectCount = (state)=>state.counter.value;
const countSelector = (0,toolkit_.createSelector)(selectCount, (state)=>state);

;// CONCATENATED MODULE: ./src/features/counter/index.ts




;// CONCATENATED MODULE: ./src/app/store.ts



const store = (0,toolkit_.configureStore)({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
});

;// CONCATENATED MODULE: ./pages/_app.tsx





function App({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: store,
        children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        })
    });
}


/***/ }),

/***/ 764:
/***/ (() => {



/***/ }),

/***/ 184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 22:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 824:
/***/ ((module) => {

"use strict";
module.exports = require("superagent");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [678], () => (__webpack_exec__(786)));
module.exports = __webpack_exports__;

})();