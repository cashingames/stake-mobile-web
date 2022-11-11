"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countSelector = exports.selectCount = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const selectCount = (state) => state.counter.value;
exports.selectCount = selectCount;
exports.countSelector = (0, toolkit_1.createSelector)(exports.selectCount, state => state);
