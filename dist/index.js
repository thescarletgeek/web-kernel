/******/ var __webpack_modules__ = ({

/***/ "./src/KernelEvents.ts"
/*!*****************************!*\
  !*** ./src/KernelEvents.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class KernelEvents extends EventTarget {
  on(type, handler, options) {
    this.addEventListener(type, handler, options);
    return () => this.off(type, handler);
  }
  once(type, handler) {
    this.addEventListener(type, handler, {
      once: true
    });
  }
  off(type, handler) {
    this.removeEventListener(type, handler);
  }
  emit(type, detail = {}) {
    return this.dispatchEvent(new CustomEvent(type, {
      detail
    }));
  }
  destroy() {
    // this.replaceWith?.(null);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KernelEvents);

/***/ },

/***/ "./src/ProgramHandler.ts"
/*!*******************************!*\
  !*** ./src/ProgramHandler.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");

class ProgramHandler {
  constructor() {
    this.programs = {};
    //
  }
  addProgram(key, program) {
    this.programs[key] = new program();
  }
  startProgram(key) {
    if (!this.programs[key]) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.logger)(_utils__WEBPACK_IMPORTED_MODULE_0__.LoggerLevel.WARNING, "Program not found.");
      return;
    }
    if (typeof this.programs[key].onStart !== "function") {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.logger)(_utils__WEBPACK_IMPORTED_MODULE_0__.LoggerLevel.ERROR, "onStart method is not defined in the program.");
      return;
    }
    this.programs[key].onStart();
  }
  endProgram(key) {
    if (!this.programs[key]) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.logger)(_utils__WEBPACK_IMPORTED_MODULE_0__.LoggerLevel.WARNING, "Program not found.");
      return;
    }
    if (typeof this.programs[key].onDestroy !== "function") {
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.logger)(_utils__WEBPACK_IMPORTED_MODULE_0__.LoggerLevel.ERROR, "onDestroy method is not defined in the program.");
      return;
    }
    this.programs[key].onDestroy();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgramHandler);

/***/ },

/***/ "./src/kernel.ts"
/*!***********************!*\
  !*** ./src/kernel.ts ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProgramHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProgramHandler */ "./src/ProgramHandler.ts");
/* harmony import */ var _KernelEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KernelEvents */ "./src/KernelEvents.ts");


class Kernel {
  constructor() {
    this.programHandler = new _ProgramHandler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.eventHandler = new _KernelEvents__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  registerPrograms(programs) {
    if (Object.keys(programs).length) {
      Object.keys(programs).forEach(key => {
        this.programHandler.addProgram(key, programs[key]);
      });
    }
  }
  start(programName) {
    this.programHandler.startProgram(programName);
  }
  destroy(programName) {
    this.programHandler.endProgram(programName);
  }
  emit(type, detail = {}) {
    this.eventHandler.emit(type, detail);
  }
  on(type, handler, options) {
    return this.eventHandler.on(type, handler, options);
  }
  once(type, handler) {
    this.eventHandler.once(type, handler);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Kernel);

/***/ },

/***/ "./src/utils.ts"
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoggerLevel: () => (/* binding */ LoggerLevel),
/* harmony export */   logger: () => (/* binding */ logger)
/* harmony export */ });
var LoggerLevel;
(function (LoggerLevel) {
  LoggerLevel["LOG"] = "LOG :: ";
  LoggerLevel["ERROR"] = "ERROR :: ";
  LoggerLevel["WARNING"] = "WARNING :: ";
})(LoggerLevel || (LoggerLevel = {}));
function logger(level, message) {
  if (level == LoggerLevel.ERROR) {
    console.error(LoggerLevel.ERROR, message);
  } else if (level == LoggerLevel.WARNING) {
    console.warn(LoggerLevel.WARNING, message);
  } else {
    console.log(LoggerLevel.LOG, message);
  }
}

/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Check if module exists (development only)
/******/ 	if (__webpack_modules__[moduleId] === undefined) {
/******/ 		var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 		e.code = 'MODULE_NOT_FOUND';
/******/ 		throw e;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kernel: () => (/* reexport safe */ _kernel__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   LoggerLevel: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel)
/* harmony export */ });
/* harmony import */ var _kernel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kernel */ "./src/kernel.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");



})();

const __webpack_exports__Kernel = __webpack_exports__.Kernel;
const __webpack_exports__LoggerLevel = __webpack_exports__.LoggerLevel;
export { __webpack_exports__Kernel as Kernel, __webpack_exports__LoggerLevel as LoggerLevel };
