"use strict";
exports.id = 678;
exports.ids = [678];
exports.modules = {

/***/ 678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "p": () => (/* binding */ loginUser)
});

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(184);
// EXTERNAL MODULE: external "superagent"
var external_superagent_ = __webpack_require__(824);
var external_superagent_default = /*#__PURE__*/__webpack_require__.n(external_superagent_);
;// CONCATENATED MODULE: ./src/app/agent.ts

const superagentPromise = __webpack_require__(824);
const superagent = superagentPromise((external_superagent_default()), global.Promise);
const API_ROOT = "https://stg-api.cashingames.com/api";
let token = null;
const responseBody = (res)=>{
    // debugger;
    return res.body;
};
const tokenPlugin = (req)=>{
    req.set("Accept", "application/json");
    req.set("X-App-Source", "web");
    if (token) {
        req.set("Authorization", `Bearer ${token}`);
    }
    req.on("response", function(res) {
        if (res.status === 401) {
            console.log("here");
        }
    });
};
const requests = {
    del: (url)=>superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: (url)=>superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body)=>superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body)=>superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};
const agent = requests;
/* harmony default export */ const app_agent = (agent);

;// CONCATENATED MODULE: ./src/features/auth/actions.ts


const loginUser = (0,toolkit_.createAsyncThunk)("auth/loginUser", async ()=>{
    const response = (email, password)=>app_agent.post("/auth/login", {
            email,
            password
        });
    console.log(response, "auth");
    return response.data;
});


/***/ })

};
;