// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const superagent_1 = __importDefault(require("superagent"));
// const superagentPromise = require('superagent');
// const superagent = superagentPromise(superagent_1.default, global.Promise);
// const API_ROOT = process.env.NEXT_PUBLIC_API_URL;
// let token = null;
// const responseBody = (res) => {
//     // debugger;
//     return res.body;
// };
// const tokenPlugin = (req) => {
//     req.set("Accept", "application/json");
//     req.set("X-App-Source", "web");
//     if (token) {
//         req.set("Authorization", `Bearer ${token}`);
//     }
//     req.on("response", function (res) {
//         if (res.status === 401) {
//             console.log("here");
//         }
//     });
// };
// const requests = {
//     del: (url) => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
//     get: (url) => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
//     put: (url, body) => superagent
//         .put(`${API_ROOT}${url}`, body)
//         .use(tokenPlugin)
//         .then(responseBody),
//     post: (url, body) => superagent
//         .post(`${API_ROOT}${url}`, body)
//         .use(tokenPlugin)
//         .then(responseBody),
// };
// const agent = requests;
// exports.default = agent;
