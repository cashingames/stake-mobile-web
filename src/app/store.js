"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const reducers_1 = require("../features/auth/reducers");
const counter_1 = require("../features/counter");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        counter: counter_1.counterReducer,
        auth: reducers_1.authReducer,
    },
});
