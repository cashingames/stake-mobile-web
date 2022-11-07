"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_app_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/app/hooks */ \"./src/app/hooks.ts\");\n/* harmony import */ var _src_features_counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/features/counter */ \"./src/features/counter/index.ts\");\n\n\n\n\nconst IndexPage = ()=>{\n    const dispatch = (0,_src_app_hooks__WEBPACK_IMPORTED_MODULE_2__.useAppDispatch)();\n    const count = (0,_src_app_hooks__WEBPACK_IMPORTED_MODULE_2__.useAppSelector)(_src_features_counter__WEBPACK_IMPORTED_MODULE_3__.selectCount);\n    const [incrementAmount, setIncrementAmount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Welcome to the greatest app in the world!\"\n            }, void 0, false, {\n                fileName: \"/Users/mac/Documents/projects/mobile-web/pages/index.tsx\",\n                lineNumber: 20,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: [\n                    \"The current number is\",\n                    count\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mac/Documents/projects/mobile-web/pages/index.tsx\",\n                lineNumber: 21,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        value: incrementAmount,\n                        onChange: (e)=>setIncrementAmount(Number(e.target.value)),\n                        type: \"number\"\n                    }, void 0, false, {\n                        fileName: \"/Users/mac/Documents/projects/mobile-web/pages/index.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>dispatch((0,_src_features_counter__WEBPACK_IMPORTED_MODULE_3__.incrementByAmount)(Number(incrementAmount))),\n                        children: \"Increment by amount\"\n                    }, void 0, false, {\n                        fileName: \"/Users/mac/Documents/projects/mobile-web/pages/index.tsx\",\n                        lineNumber: 31,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mac/Documents/projects/mobile-web/pages/index.tsx\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>dispatch((0,_src_features_counter__WEBPACK_IMPORTED_MODULE_3__.decrement)()),\n                        children: \"Decrement by 1\"\n                    }, void 0, false, {\n                        fileName: \"/Users/mac/Documents/projects/mobile-web/pages/index.tsx\",\n                        lineNumber: 38,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>dispatch((0,_src_features_counter__WEBPACK_IMPORTED_MODULE_3__.increment)()),\n                        children: \"Increment by 1\"\n                    }, void 0, false, {\n                        fileName: \"/Users/mac/Documents/projects/mobile-web/pages/index.tsx\",\n                        lineNumber: 39,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/mac/Documents/projects/mobile-web/pages/index.tsx\",\n                lineNumber: 37,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQXdDO0FBSWQ7QUFNTztBQUVqQyxNQUFNUSxZQUFxQixJQUFNO0lBQy9CLE1BQU1DLFdBQVdQLDhEQUFjQTtJQUMvQixNQUFNUSxRQUFRUCw4REFBY0EsQ0FBQ0ksOERBQVdBO0lBQ3hDLE1BQU0sQ0FBQ0ksaUJBQWlCQyxtQkFBbUIsR0FBR1gsK0NBQVFBLENBQVM7SUFFL0QscUJBQ0U7OzBCQUNFLDhEQUFDWTswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDQzs7b0JBQUc7b0JBRURKOzs7Ozs7OzBCQUVILDhEQUFDSzs7a0NBQ0MsOERBQUNDO3dCQUNDQyxPQUFPTjt3QkFDUE8sVUFBVSxDQUFDQyxJQUFNUCxtQkFBbUJRLE9BQU9ELEVBQUVFLE1BQU0sQ0FBQ0osS0FBSzt3QkFDekRLLE1BQUs7Ozs7OztrQ0FFUCw4REFBQ0M7d0JBQ0NDLFNBQVMsSUFBTWYsU0FBU0gsd0VBQWlCQSxDQUFDYyxPQUFPVDtrQ0FDbEQ7Ozs7Ozs7Ozs7OzswQkFJSCw4REFBQ0k7O2tDQUNDLDhEQUFDUTt3QkFBT0MsU0FBUyxJQUFNZixTQUFTTCxnRUFBU0E7a0NBQUs7Ozs7OztrQ0FDOUMsOERBQUNtQjt3QkFBT0MsU0FBUyxJQUFNZixTQUFTSixnRUFBU0E7a0NBQUs7Ozs7Ozs7Ozs7Ozs7O0FBSXREO0FBRUEsaUVBQWVHLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2JpbGUtd2ViLy4vcGFnZXMvaW5kZXgudHN4PzA3ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgdXNlQXBwRGlzcGF0Y2gsXG4gIHVzZUFwcFNlbGVjdG9yLFxufSBmcm9tICcuLi9zcmMvYXBwL2hvb2tzJztcbmltcG9ydCB7XG4gIGRlY3JlbWVudCxcbiAgaW5jcmVtZW50LFxuICBpbmNyZW1lbnRCeUFtb3VudCxcbiAgc2VsZWN0Q291bnQsXG59IGZyb20gJy4uL3NyYy9mZWF0dXJlcy9jb3VudGVyJztcblxuY29uc3QgSW5kZXhQYWdlOlJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZUFwcERpc3BhdGNoKCk7XG4gIGNvbnN0IGNvdW50ID0gdXNlQXBwU2VsZWN0b3Ioc2VsZWN0Q291bnQpO1xuICBjb25zdCBbaW5jcmVtZW50QW1vdW50LCBzZXRJbmNyZW1lbnRBbW91bnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8aDE+V2VsY29tZSB0byB0aGUgZ3JlYXRlc3QgYXBwIGluIHRoZSB3b3JsZCE8L2gxPlxuICAgICAgPGgyPlxuICAgICAgICBUaGUgY3VycmVudCBudW1iZXIgaXNcbiAgICAgICAge2NvdW50fVxuICAgICAgPC9oMj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHZhbHVlPXtpbmNyZW1lbnRBbW91bnR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRJbmNyZW1lbnRBbW91bnQoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChpbmNyZW1lbnRCeUFtb3VudChOdW1iZXIoaW5jcmVtZW50QW1vdW50KSkpfVxuICAgICAgICA+XG4gICAgICAgICAgSW5jcmVtZW50IGJ5IGFtb3VudFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChkZWNyZW1lbnQoKSl9PkRlY3JlbWVudCBieSAxPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gZGlzcGF0Y2goaW5jcmVtZW50KCkpfT5JbmNyZW1lbnQgYnkgMTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmRleFBhZ2U7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VBcHBEaXNwYXRjaCIsInVzZUFwcFNlbGVjdG9yIiwiZGVjcmVtZW50IiwiaW5jcmVtZW50IiwiaW5jcmVtZW50QnlBbW91bnQiLCJzZWxlY3RDb3VudCIsIkluZGV4UGFnZSIsImRpc3BhdGNoIiwiY291bnQiLCJpbmNyZW1lbnRBbW91bnQiLCJzZXRJbmNyZW1lbnRBbW91bnQiLCJoMSIsImgyIiwiZGl2IiwiaW5wdXQiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiZSIsIk51bWJlciIsInRhcmdldCIsInR5cGUiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ }),

/***/ "./src/app/hooks.ts":
/*!**************************!*\
  !*** ./src/app/hooks.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useAppDispatch\": () => (/* binding */ useAppDispatch),\n/* harmony export */   \"useAppSelector\": () => (/* binding */ useAppSelector)\n/* harmony export */ });\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);\n\nconst useAppDispatch = ()=>(0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();\nconst useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL2hvb2tzLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJdUI7QUFNZCxNQUFNRSxpQkFBaUIsSUFBTUYsd0RBQVdBLEdBQWdCO0FBQ3hELE1BQU1HLGlCQUFrREYsb0RBQVdBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2JpbGUtd2ViLy4vc3JjL2FwcC9ob29rcy50cz8yZDIwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgVHlwZWRVc2VTZWxlY3Rvckhvb2ssXG4gICAgdXNlRGlzcGF0Y2gsXG4gICAgdXNlU2VsZWN0b3IsXG4gIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuICBpbXBvcnQgdHlwZSB7XG4gICAgQXBwRGlzcGF0Y2gsXG4gICAgUm9vdFN0YXRlLFxuICB9IGZyb20gJy4vc3RvcmUnO1xuICBcbiAgZXhwb3J0IGNvbnN0IHVzZUFwcERpc3BhdGNoID0gKCkgPT4gdXNlRGlzcGF0Y2g8QXBwRGlzcGF0Y2g+KCk7XG4gIGV4cG9ydCBjb25zdCB1c2VBcHBTZWxlY3RvcjogVHlwZWRVc2VTZWxlY3Rvckhvb2s8Um9vdFN0YXRlPiA9IHVzZVNlbGVjdG9yOyJdLCJuYW1lcyI6WyJ1c2VEaXNwYXRjaCIsInVzZVNlbGVjdG9yIiwidXNlQXBwRGlzcGF0Y2giLCJ1c2VBcHBTZWxlY3RvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/hooks.ts\n");

/***/ }),

/***/ "./src/features/counter/actions.ts":
/*!*****************************************!*\
  !*** ./src/features/counter/actions.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"decrement\": () => (/* binding */ decrement),\n/* harmony export */   \"increment\": () => (/* binding */ increment),\n/* harmony export */   \"incrementByAmount\": () => (/* binding */ incrementByAmount)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n\nconst increment = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)(\"counter/increment\");\nconst decrement = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)(\"counter/decrement\");\nconst incrementByAmount = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAction)(\"counter/incrementByAmount\");\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZmVhdHVyZXMvY291bnRlci9hY3Rpb25zLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQStDO0FBRXhDLE1BQU1DLFlBQVlELDhEQUFZQSxDQUFDLHFCQUFvQjtBQUNuRCxNQUFNRSxZQUFZRiw4REFBWUEsQ0FBQyxxQkFBb0I7QUFDbkQsTUFBTUcsb0JBQW9CSCw4REFBWUEsQ0FBUyw2QkFBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2JpbGUtd2ViLy4vc3JjL2ZlYXR1cmVzL2NvdW50ZXIvYWN0aW9ucy50cz85Nzc2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUFjdGlvbiB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCJcblxuZXhwb3J0IGNvbnN0IGluY3JlbWVudCA9IGNyZWF0ZUFjdGlvbignY291bnRlci9pbmNyZW1lbnQnKVxuZXhwb3J0IGNvbnN0IGRlY3JlbWVudCA9IGNyZWF0ZUFjdGlvbignY291bnRlci9kZWNyZW1lbnQnKVxuZXhwb3J0IGNvbnN0IGluY3JlbWVudEJ5QW1vdW50ID0gY3JlYXRlQWN0aW9uPG51bWJlcj4oJ2NvdW50ZXIvaW5jcmVtZW50QnlBbW91bnQnKSJdLCJuYW1lcyI6WyJjcmVhdGVBY3Rpb24iLCJpbmNyZW1lbnQiLCJkZWNyZW1lbnQiLCJpbmNyZW1lbnRCeUFtb3VudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/features/counter/actions.ts\n");

/***/ }),

/***/ "./src/features/counter/index.ts":
/*!***************************************!*\
  !*** ./src/features/counter/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ \"./src/features/counter/actions.ts\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _actions__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _actions__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ \"./src/features/counter/reducers.ts\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _reducers__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _reducers__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ \"./src/features/counter/selectors.ts\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _selectors__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _selectors__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZmVhdHVyZXMvY291bnRlci9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ0M7QUFDQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vYmlsZS13ZWIvLi9zcmMvZmVhdHVyZXMvY291bnRlci9pbmRleC50cz9jY2ExIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL2FjdGlvbnNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3JlZHVjZXJzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zZWxlY3RvcnNcIjsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/features/counter/index.ts\n");

/***/ }),

/***/ "./src/features/counter/reducers.ts":
/*!******************************************!*\
  !*** ./src/features/counter/reducers.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"counterReducer\": () => (/* binding */ counterReducer)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ \"./src/features/counter/actions.ts\");\n\n\nconst initialState = {\n    value: 0\n};\nconst counterReducer = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createReducer)(initialState, (builder)=>{\n    builder.addCase(_actions__WEBPACK_IMPORTED_MODULE_1__.increment, (state)=>{\n        state.value++;\n    }).addCase(_actions__WEBPACK_IMPORTED_MODULE_1__.decrement, (state)=>{\n        state.value--;\n    }).addCase(_actions__WEBPACK_IMPORTED_MODULE_1__.incrementByAmount, (state, action)=>{\n        state.value += action.payload;\n    });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZmVhdHVyZXMvY291bnRlci9yZWR1Y2Vycy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWlEO0FBSzlCO0FBTW5CLE1BQU1JLGVBQTZCO0lBQ2pDQyxPQUFPO0FBQ1Q7QUFFTyxNQUFNQyxpQkFBaUJOLCtEQUFhQSxDQUFDSSxjQUFjRyxDQUFBQSxVQUFXO0lBQ25FQSxRQUNHQyxPQUFPLENBQUNOLCtDQUFTQSxFQUFFTyxDQUFBQSxRQUFTO1FBQzNCQSxNQUFNSixLQUFLO0lBQ2IsR0FDQ0csT0FBTyxDQUFDUCwrQ0FBU0EsRUFBRVEsQ0FBQUEsUUFBUztRQUMzQkEsTUFBTUosS0FBSztJQUNiLEdBQ0NHLE9BQU8sQ0FBQ0wsdURBQWlCQSxFQUFFLENBQUNNLE9BQU9DLFNBQVc7UUFDN0NELE1BQU1KLEtBQUssSUFBSUssT0FBT0MsT0FBTztJQUMvQjtBQUNKLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb2JpbGUtd2ViLy4vc3JjL2ZlYXR1cmVzL2NvdW50ZXIvcmVkdWNlcnMudHM/ODI2YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5pbXBvcnQge1xuICBkZWNyZW1lbnQsXG4gIGluY3JlbWVudCxcbiAgaW5jcmVtZW50QnlBbW91bnQsXG59IGZyb20gJy4vYWN0aW9ucyc7XG5cbnR5cGUgQ291bnRlclN0YXRlID0ge1xuICB2YWx1ZTogbnVtYmVyO1xufTtcblxuY29uc3QgaW5pdGlhbFN0YXRlOiBDb3VudGVyU3RhdGUgPSB7XG4gIHZhbHVlOiAwLFxufTtcblxuZXhwb3J0IGNvbnN0IGNvdW50ZXJSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihpbml0aWFsU3RhdGUsIGJ1aWxkZXIgPT4ge1xuICBidWlsZGVyXG4gICAgLmFkZENhc2UoaW5jcmVtZW50LCBzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS52YWx1ZSsrO1xuICAgIH0pXG4gICAgLmFkZENhc2UoZGVjcmVtZW50LCBzdGF0ZSA9PiB7XG4gICAgICBzdGF0ZS52YWx1ZS0tO1xuICAgIH0pXG4gICAgLmFkZENhc2UoaW5jcmVtZW50QnlBbW91bnQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICBzdGF0ZS52YWx1ZSArPSBhY3Rpb24ucGF5bG9hZDtcbiAgICB9KTtcbn0pOyJdLCJuYW1lcyI6WyJjcmVhdGVSZWR1Y2VyIiwiZGVjcmVtZW50IiwiaW5jcmVtZW50IiwiaW5jcmVtZW50QnlBbW91bnQiLCJpbml0aWFsU3RhdGUiLCJ2YWx1ZSIsImNvdW50ZXJSZWR1Y2VyIiwiYnVpbGRlciIsImFkZENhc2UiLCJzdGF0ZSIsImFjdGlvbiIsInBheWxvYWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/features/counter/reducers.ts\n");

/***/ }),

/***/ "./src/features/counter/selectors.ts":
/*!*******************************************!*\
  !*** ./src/features/counter/selectors.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"countSelector\": () => (/* binding */ countSelector),\n/* harmony export */   \"selectCount\": () => (/* binding */ selectCount)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n\nconst selectCount = (state)=>state.counter.value;\nconst countSelector = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectCount, (state)=>state);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZmVhdHVyZXMvY291bnRlci9zZWxlY3RvcnMudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFrRDtBQUczQyxNQUFNQyxjQUFjLENBQUNDLFFBQXFCQSxNQUFNQyxPQUFPLENBQUNDLEtBQUssQ0FBQztBQUU5RCxNQUFNQyxnQkFBZ0JMLGdFQUFjQSxDQUFDQyxhQUFhQyxDQUFBQSxRQUFTQSxPQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9iaWxlLXdlYi8uL3NyYy9mZWF0dXJlcy9jb3VudGVyL3NlbGVjdG9ycy50cz8xMzcwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tICcuLi8uLi9hcHAvc3RvcmUnO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q291bnQgPSAoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gc3RhdGUuY291bnRlci52YWx1ZTtcblxuZXhwb3J0IGNvbnN0IGNvdW50U2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihzZWxlY3RDb3VudCwgc3RhdGUgPT4gc3RhdGUpOyJdLCJuYW1lcyI6WyJjcmVhdGVTZWxlY3RvciIsInNlbGVjdENvdW50Iiwic3RhdGUiLCJjb3VudGVyIiwidmFsdWUiLCJjb3VudFNlbGVjdG9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/features/counter/selectors.ts\n");

/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();