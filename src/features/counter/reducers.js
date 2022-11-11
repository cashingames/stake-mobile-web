"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterReducer = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const actions_1 = require("./actions");
const initialState = {
    value: 0,
};
exports.counterReducer = (0, toolkit_1.createReducer)(initialState, builder => {
    builder
        .addCase(actions_1.increment, state => {
        state.value++;
    })
        .addCase(actions_1.decrement, state => {
        state.value--;
    })
        .addCase(actions_1.incrementByAmount, (state, action) => {
        state.value += action.payload;
    });
});
