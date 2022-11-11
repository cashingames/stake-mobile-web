"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSelector = exports.authSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authSlice = (state) => state.auth;
exports.authSlice = authSlice;
exports.authSelector = (0, toolkit_1.createSelector)(exports.authSlice, state => state);
