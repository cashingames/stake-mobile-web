import { createAction } from "@reduxjs/toolkit";
import _superagent from "superagent";


export const increment = createAction('counter/increment')
export const decrement = createAction('counter/decrement')
export const incrementByAmount = createAction<number>('counter/incrementByAmount')


