"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../styles/globals.css");
const react_redux_1 = require("react-redux");
const store_1 = require("../src/app/store");
require("../styles/globals.css");
function App({ Component, pageProps }) {
    return (<react_redux_1.Provider store={store_1.store}>
      <Component {...pageProps}/>
    </react_redux_1.Provider>);
}
exports.default = App;
