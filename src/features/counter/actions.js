"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementByAmount = exports.decrement = exports.increment = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.increment = (0, toolkit_1.createAction)('counter/increment');
exports.decrement = (0, toolkit_1.createAction)('counter/decrement');
exports.incrementByAmount = (0, toolkit_1.createAction)('counter/incrementByAmount');
