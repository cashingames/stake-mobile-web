"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authReducer = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const initialState = {
    token: ''
};
exports.authReducer = (0, toolkit_1.createReducer)(initialState, builder => {
    builder
        .addCase(actions_1.loginUser.fulfilled, (state, { payload }) => {
        state.token = payload;
        console.log(payload, 'reducer');
    });
});
