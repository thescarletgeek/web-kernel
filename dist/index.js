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
/* harmony import */ var _types_IKernel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/IKernel */ "./src/types/IKernel.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");


class ProgramHandler {
  constructor() {
    this.programs = new Map();
    this.programState = new Map();
    //
  }
  addProgram(key, program) {
    if (this.programs.has(key)) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.WARNING, `Program ${key} already exists.`);
      return;
    }
    this.programs.set(key, new program());
    this.programState.set(key, _types_IKernel__WEBPACK_IMPORTED_MODULE_0__.ProgramState.IDLE);
  }
  startProgram(key, args = null) {
    const program = this.programs.get(key);
    if (!program) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.WARNING, `Program ${key} not found.`);
      return;
    }
    const status = this.programState.get(key);
    if (status === _types_IKernel__WEBPACK_IMPORTED_MODULE_0__.ProgramState.RUNNING) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.WARNING, `Program ${key} is already running.`);
      return;
    }
    if (typeof program.onStart !== "function") {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.ERROR, `onStart method is not defined in the program ${key}.`);
      return;
    }
    try {
      program.onStart(args);
      this.programState.set(key, _types_IKernel__WEBPACK_IMPORTED_MODULE_0__.ProgramState.RUNNING);
    } catch (error) {
      this.programState.set(key, _types_IKernel__WEBPACK_IMPORTED_MODULE_0__.ProgramState.ERROR);
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.ERROR, `Error occured in program ${key} - `, error);
    }
  }
  endProgram(key) {
    const program = this.programs.get(key);
    if (!program) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.WARNING, `Program ${key} not found.`);
      return;
    }
    if (this.programState.get(key) !== _types_IKernel__WEBPACK_IMPORTED_MODULE_0__.ProgramState.RUNNING) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.WARNING, `Program ${key} is not running.`);
      return;
    }
    if (typeof program.onDestroy !== "function") {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.ERROR, `onDestroy method is not defined in the program ${key}.`);
      return;
    }
    try {
      program.onDestroy();
      this.programState.set(key, _types_IKernel__WEBPACK_IMPORTED_MODULE_0__.ProgramState.STOPPED);
    } catch (error) {
      this.programState.set(key, _types_IKernel__WEBPACK_IMPORTED_MODULE_0__.ProgramState.ERROR);
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.logger)(_utils__WEBPACK_IMPORTED_MODULE_1__.LoggerLevel.ERROR, `Error occured in program ${key} - `, error);
    }
  }
  getProgramsByState(programState) {
    const status = {};
    for (const [key, state] of this.programState) {
      if (state === programState) {
        status[key] = state;
      }
    }
    return status;
  }
  getAllProgramStatus() {
    return this.programState;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgramHandler);

/***/ },

/***/ "./src/RequestHandler.ts"
/*!*******************************!*\
  !*** ./src/RequestHandler.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _request_adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request/adapters */ "./src/request/adapters.ts");
/* harmony import */ var _request_Request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request/Request */ "./src/request/Request.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");



class RequestHandler {
  constructor() {
    this.requests = {};
  }
  addRequest(key, RequestClass) {
    const instance = new RequestClass(_request_adapters__WEBPACK_IMPORTED_MODULE_0__.fetchAdapter);
    if (!(instance instanceof _request_Request__WEBPACK_IMPORTED_MODULE_1__["default"])) {
      throw new Error(`Invalid request "${key}". It must extend kernel Request class.`);
    }
    this.requests[key] = instance;
  }
  startRequest(key) {
    if (!this.requests[key]) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.logger)(_utils__WEBPACK_IMPORTED_MODULE_2__.LoggerLevel.WARNING, "Request not found.");
    }
    if (typeof this.requests[key].send !== "function") {
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.logger)(_utils__WEBPACK_IMPORTED_MODULE_2__.LoggerLevel.ERROR, "Send method not available for the request.");
    }
    this.requests[key].send();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestHandler);

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
/* harmony import */ var _types_IKernel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/IKernel */ "./src/types/IKernel.ts");
/* harmony import */ var _KernelEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./KernelEvents */ "./src/KernelEvents.ts");
/* harmony import */ var _RequestHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RequestHandler */ "./src/RequestHandler.ts");




class Kernel {
  constructor() {
    this.programHandler = new _ProgramHandler__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.eventHandler = new _KernelEvents__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.requestHandler = new _RequestHandler__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.state = _types_IKernel__WEBPACK_IMPORTED_MODULE_1__.KernelState.CREATED;
    this.bootHandlers = [];
  }
  onBoot(callback) {
    if (this.state == _types_IKernel__WEBPACK_IMPORTED_MODULE_1__.KernelState.BOOTED) {
      callback(this);
      return;
    }
    this.bootHandlers.push(callback);
  }
  boot() {
    if (this.state !== _types_IKernel__WEBPACK_IMPORTED_MODULE_1__.KernelState.CREATED) {
      return;
    }
    this.state = _types_IKernel__WEBPACK_IMPORTED_MODULE_1__.KernelState.BOOTING;
    for (const handler of this.bootHandlers) {
      handler(this);
    }
    this.bootHandlers.length = 0;
    this.state = _types_IKernel__WEBPACK_IMPORTED_MODULE_1__.KernelState.BOOTED;
  }
  registerPrograms(programs) {
    if (Object.keys(programs).length) {
      Object.keys(programs).forEach(key => {
        this.programHandler.addProgram(key, programs[key]);
      });
    }
  }
  start(programName, args = null) {
    this.programHandler.startProgram(programName, args);
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
  registerRequests(requests) {
    if (Object.keys(requests).length) {
      Object.keys(requests).forEach(key => {
        this.requestHandler.addRequest(key, requests[key]);
      });
    }
  }
  send(key) {
    this.requestHandler.startRequest(key);
  }
  metrics() {
    const data = {};
    data["programs"] = this.programHandler.getAllProgramStatus();
    console.log(data);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Kernel);

/***/ },

/***/ "./src/request/DataTransformer.ts"
/*!****************************************!*\
  !*** ./src/request/DataTransformer.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class DataTransformer {
  async transform(response) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    }
    if (contentType.includes("text/")) {
      return await response.text();
    }
    return await response.blob();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataTransformer);

/***/ },

/***/ "./src/request/Request.ts"
/*!********************************!*\
  !*** ./src/request/Request.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapters */ "./src/request/adapters.ts");
/* harmony import */ var _DataTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataTransformer */ "./src/request/DataTransformer.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interfaces */ "./src/request/interfaces.ts");



class Request {
  constructor(adapter, transformer) {
    if (new.target === Request) {
      throw new Error("Request is abstract");
    }
    this.adapter = adapter ?? _adapters__WEBPACK_IMPORTED_MODULE_0__.fetchAdapter;
    this.transformer = transformer ?? new _DataTransformer__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  get method() {
    return _interfaces__WEBPACK_IMPORTED_MODULE_2__.RequestMethods.GET;
  }
  get headers() {
    return undefined;
  }
  get payload() {
    return null;
  }
  get signal() {
    return undefined;
  }
  async send() {
    try {
      this.onProcessing();
      const response = await this.adapter({
        url: this.url,
        method: this.method,
        headers: this.headers,
        body: this.payload,
        signal: this.signal
      });
      if (!response.ok) {
        throw response;
      }
      const data = await this.transformer.transform(response);
      this.onSuccess(data);
      return data;
    } catch (error) {
      this.onError(error);
      throw error;
    }
  }
  onProcessing() {}
  onSuccess(_response) {}
  onError(_error) {}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Request);

/***/ },

/***/ "./src/request/adapters.ts"
/*!*********************************!*\
  !*** ./src/request/adapters.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAdapter: () => (/* binding */ fetchAdapter)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ "./src/request/interfaces.ts");

function fetchAdapter(config) {
  return fetch(config.url, {
    method: config.method || _interfaces__WEBPACK_IMPORTED_MODULE_0__.RequestMethods.GET,
    headers: config.headers,
    body: config.body ?? null,
    signal: config.signal
  });
}

/***/ },

/***/ "./src/request/interfaces.ts"
/*!***********************************!*\
  !*** ./src/request/interfaces.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestMethods: () => (/* binding */ RequestMethods)
/* harmony export */ });
var RequestMethods;
(function (RequestMethods) {
  RequestMethods["GET"] = "GET";
  RequestMethods["POST"] = "POST";
  RequestMethods["PUT"] = "PUT";
  RequestMethods["PATCH"] = "PATCH";
  RequestMethods["DELETE"] = "DELETE";
})(RequestMethods || (RequestMethods = {}));

/***/ },

/***/ "./src/types/IKernel.ts"
/*!******************************!*\
  !*** ./src/types/IKernel.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KernelState: () => (/* binding */ KernelState),
/* harmony export */   ProgramState: () => (/* binding */ ProgramState)
/* harmony export */ });
var KernelState;
(function (KernelState) {
  KernelState["CREATED"] = "CREATED";
  KernelState["BOOTING"] = "BOOTING";
  KernelState["BOOTED"] = "BOOTED";
})(KernelState || (KernelState = {}));
var ProgramState;
(function (ProgramState) {
  ProgramState["IDLE"] = "IDLE";
  ProgramState["RUNNING"] = "RUNNING";
  ProgramState["STOPPED"] = "STOPPED";
  ProgramState["ERROR"] = "ERROR";
})(ProgramState || (ProgramState = {}));

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
function logger(level, message, data = undefined) {
  if (level == LoggerLevel.ERROR) {
    console.error(LoggerLevel.ERROR, message, data);
  } else if (level == LoggerLevel.WARNING) {
    console.warn(LoggerLevel.WARNING, message, data);
  } else {
    console.log(LoggerLevel.LOG, message, data);
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
/* harmony export */   LoggerLevel: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.LoggerLevel),
/* harmony export */   Request: () => (/* reexport safe */ _request_Request__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _kernel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kernel */ "./src/kernel.ts");
/* harmony import */ var _request_Request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request/Request */ "./src/request/Request.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");




})();

const __webpack_exports__Kernel = __webpack_exports__.Kernel;
const __webpack_exports__LoggerLevel = __webpack_exports__.LoggerLevel;
const __webpack_exports__Request = __webpack_exports__.Request;
export { __webpack_exports__Kernel as Kernel, __webpack_exports__LoggerLevel as LoggerLevel, __webpack_exports__Request as Request };
