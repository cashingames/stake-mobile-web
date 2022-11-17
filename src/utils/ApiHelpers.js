// import superagentPromise from "superagent-promise";
// import _superagent from "superagent";


// const superagent = superagentPromise(_superagent, global.Promise);
const baseURL = process.env.REACT_APP_API_URL;


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(`${baseURL}/${url}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if (!response.ok) {
        debugger;
        // console.log(response);
        throw new Error(response.json());
    }

    return response.json(); // parses JSON response into native JavaScript objects
}

async function login(data) {
    return postData('auth/login', data)
        .then(response => {
            saveToken(response.data);
            return response;
        });
}

function saveToken(data) {
    window.localStorage.setItem("token", data);
    window.localStorage.setItem("used", "token")
}

export { login, saveToken };
export { postData };