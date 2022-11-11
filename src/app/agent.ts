import _superagent from "superagent";



const superagentPromise = require('superagent');
const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = process.env.NEXT_PUBLIC_API_URL;


let token: any = null;

const responseBody = (res: any) => {
    // debugger;
    return res.body
};

const tokenPlugin = (req: any) => {
    req.set("Accept", "application/json");
    req.set("X-App-Source", "web");

    if (token) {
        req.set("Authorization", `Bearer ${token}`);
    }

    req.on("response", function (res: any) {
        if (res.status === 401) {
            console.log("here");
        }
    });
}

const requests = {
    del: (url: any) =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: (url: any) =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url: any, body: any) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .then(responseBody),
    post: (url: any, body: any) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .then(responseBody),
};

const agent = requests;
export default agent;



