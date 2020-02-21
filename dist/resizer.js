(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("RotatableResizer", [], factory);
	else if(typeof exports === 'object')
		exports["RotatableResizer"] = factory();
	else
		root["RotatableResizer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/rotatable-resizer/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1)

var Component = __webpack_require__(7)(
  /* script */
  __webpack_require__(2),
  /* template */
  __webpack_require__(8),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Resizer_vm__ = __webpack_require__(3);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Resizer_vm__["a" /* default */]);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resizer_state__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draggable__ = __webpack_require__(4);


var TYPE_PREFIX = 'rr-ord-';
var HANDLE_SELECTOR = '.rr-handle';
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'rotatable-resizer',
    props: {
        disabled: {
            type: Boolean
        },
        active: {
            type: Boolean,
            default: true
        },
        rotatable: {
            type: Boolean
        },
        dragMode: {
            type: String,
            default: 'content'
        },
        draggable: {
            type: Boolean,
            default: true
        },
        handles: {
            type: String
        },
        left: {
            type: Number
        },
        top: {
            type: Number
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        rotation: {
            type: Number
        },
        fixedRatio: {
            type: Boolean,
            default: false
        },
        autoHeight: {
            type: Boolean,
            default: false,
        }
    },
    data: function () {
        var state = new __WEBPACK_IMPORTED_MODULE_0__resizer_state__["a" /* default */]({
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height
        }, this.rotation, this.fixedRatio, this.autoHeight);
        return {
            state: state,
            dragging: false
        };
    },
    created: function () {
        var _this = this;
        this.$watch('rotatable', function (val) {
            var _this = this;
            if (val) {
                this.$nextTick(function () { return _this.bindRotateEvent(); });
            }
        });
        this.$watch('handles', function () {
            var _this = this;
            this.$nextTick(function () { return _this.bindResizeEvent(); });
        });
        var STATE_PROPS = ['width', 'height', 'rotation', 'left', 'top'];
        STATE_PROPS.forEach(function (prop) {
            _this.$watch(prop, function (val) {
                if (!this.dragging) {
                    this.state[prop] = val;
                }
            });
        });
    },
    mounted: function () {
        this.bindResizeEvent();
        this.bindDragEvent();
        this.bindRotateEvent();
    },
    computed: {
        rectHandles: function () {
            var handles = this.handles || 'n,e,s,w,nw,ne,se,sw';
            return handles.split(',').map(function (handle) { return handle.trim(); });
        },
        value: function () {
            var state = this.state;
            return {
                left: state.left,
                top: state.top,
                width: state.width,
                height: state.height,
                rotation: state.rotation
            };
        }
    },
    watch: {
        autoHeight: function (v) {
            var dom = this.$el;
            if (v) {
                dom.style.height = 'auto';
            }
            else {
                dom.style.height = this.state.height + 'px';
            }
        }
    },
    methods: {
        emitInputEvent: function (rect) {
            this.$emit('input', rect);
        },
        emitChangeEvent: function () {
            this.$emit('change', this.value);
        },
        emitBeforeInputEvent: function () {
            this.$emit('before-input', this.value);
        },
        hasHandle: function (ord) {
            return this.rectHandles.indexOf(ord) !== -1;
        },
        bindRotateEvent: function () {
            var handle = this.$refs.rotateHandle;
            if (!handle)
                return;
            var self = this;
            var el = self.$el;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__draggable__["a" /* default */])(handle, {
                start: function () {
                    if (self.disabled)
                        return false;
                    self.dragging = true;
                    self.emitBeforeInputEvent();
                },
                drag: function (event) {
                    var bounds = el.getBoundingClientRect();
                    var center = {
                        left: bounds.left + bounds.width / 2,
                        top: bounds.top + bounds.height / 2
                    };
                    self.state.rotation = (Math.atan2(event.clientY - center.top, event.clientX - center.left) * 180 / Math.PI + 90) % 360;
                    self.emitInputEvent(self.value);
                },
                end: function () {
                    self.emitChangeEvent();
                    self.dragging = false;
                }
            });
        },
        bindDragEvent: function () {
            var self = this;
            var dom = this.$el;
            var dragState = {};
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__draggable__["a" /* default */])(dom, {
                handle: self.dragMode === 'border' ? '.rr-bar' : null,
                start: function (event) {
                    if (!self.draggable || self.disabled)
                        return false;
                    dragState.startX = event.clientX;
                    dragState.startY = event.clientY;
                    self.dragging = true;
                    self.emitBeforeInputEvent();
                },
                drag: function (event) {
                    var deltaX = event.clientX - dragState.startX;
                    var deltaY = event.clientY - dragState.startY;
                    var rect = self.state.translate(deltaX, deltaY);
                    rect.rotation = self.state.rotation;
                    self.emitInputEvent(rect);
                    dragState.rect = rect;
                    dom.style.left = rect.left + 'px';
                    dom.style.top = rect.top + 'px';
                    dom.style.width = rect.width + 'px';
                    dom.style.height = self.autoHeight ? 'auto' : rect.height + 'px';
                },
                end: function () {
                    if (dragState.rect) {
                        self.state.reset(dragState.rect);
                        self.emitChangeEvent();
                    }
                    self.dragging = false;
                }
            });
        },
        bindResizeEvent: function () {
            var self = this;
            var dom = this.$el;
            var aspectRatio = self.aspectRatio;
            if (typeof aspectRatio !== 'number') {
                aspectRatio = undefined;
            }
            var handles = dom.querySelectorAll(HANDLE_SELECTOR);
            for (var i = 0, j = handles.length; i < j; i++) {
                this.makeHandleResizable(handles[i]);
            }
        },
        makeHandleResizable: function (handle) {
            var self = this;
            var el = this.$el;
            var type = handle.className.split(' ')[1].replace(TYPE_PREFIX, '');
            var resizeState = {};
            var startPoint;
            var startSize = {};
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__draggable__["a" /* default */])(handle, {
                start: function (event) {
                    if (self.disabled)
                        return false;
                    resizeState.startX = event.clientX;
                    resizeState.startY = event.clientY;
                    startPoint = self.state.getPoint(type);
                    startSize = {
                        width: self.state.width,
                        height: self.state.height
                    };
                    self.dragging = true;
                    self.emitBeforeInputEvent();
                },
                drag: function (event) {
                    var deltaX = event.clientX - resizeState.startX;
                    var deltaY = event.clientY - resizeState.startY;
                    var rect = self.state.dragPoint(type, deltaX, deltaY, startPoint, startSize);
                    resizeState.rect = rect;
                    rect.rotation = self.state.rotation;
                    self.emitInputEvent(rect);
                    if (rect.left !== undefined) {
                        el.style.left = rect.left + 'px';
                        el.style.top = rect.top + 'px';
                    }
                    if (rect.width !== undefined) {
                        el.style.width = rect.width + 'px';
                        el.style.height = self.autoHeight ? 'auto' : rect.height + 'px';
                    }
                },
                end: function () {
                    if (resizeState.rect) {
                        self.state.reset(resizeState.rect);
                        self.emitChangeEvent();
                    }
                    self.dragging = false;
                }
            });
        }
    }
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var PREVENT_CLICK_PROP = 'PREVENT_CLICK';
var EVENT_BOUND = 'rr-event-bound';
var isBound = function (el) {
    return !!el[EVENT_BOUND];
};
var markBound = function (el) {
    if (el) {
        el[EVENT_BOUND] = 'DONE';
    }
    else {
        throw new Error('[markBound] element is required!');
    }
};
/* harmony default export */ __webpack_exports__["a"] = (function (element, options) {
    if (isBound(element)) {
        return;
    }
    else {
        markBound(element);
    }
    var isDragging = false;
    options = options || {};
    var minDistance = options.minDistance || 3;
    var preventClick = typeof options.preventClick === 'undefined' ? true : options.preventClick;
    var cancelBubble = typeof options.cancelBubble === 'undefined' ? true : options.cancelBubble;
    var handle = options.handle;
    var cancel = options.cancel;
    var target;
    var disabled = false;
    var dragState = {
        startLeft: null,
        startTop: null
    };
    var start = function (event) {
        if (cancelBubble) {
            event.stopPropagation();
        }
        document.onselectstart = function () { return false; };
        document.ondragstart = function () { return false; };
        if (preventClick) {
            element.setAttribute(PREVENT_CLICK_PROP, 'true');
        }
        var dragFlag = true;
        if (cancel) {
            var cancels = element.querySelectorAll(cancel);
            for (var i = 0, j = cancels.length; i < j; i++) {
                var cancelEl = cancels[i];
                if (target === cancelEl || cancelEl.contains(target)) {
                    dragFlag = false;
                    break;
                }
            }
            if (!dragFlag) {
                disabled = true;
                return;
            }
        }
        dragFlag = false;
        if (handle) {
            var handles = element.querySelectorAll(handle);
            for (var i = 0, j = handles.length; i < j; i++) {
                var handleEl = handles[i];
                if (target === handleEl || handleEl.contains(target)) {
                    dragFlag = true;
                    break;
                }
            }
            if (!dragFlag) {
                disabled = true;
                return;
            }
        }
        if (options.start) {
            var result = options.start(event);
            isDragging = result !== false;
        }
        else {
            isDragging = true;
        }
    };
    var end = function (event) {
        dragState.startLeft = null;
        dragState.startTop = null;
        if (isDragging && options.end) {
            options.end(event);
        }
        isDragging = false;
    };
    var moveFn = function (event) {
        if (disabled)
            return;
        if (!isDragging) {
            var startLeft = dragState.startLeft, startTop = dragState.startTop;
            var deltaLeft = Math.abs(event.clientX - startLeft);
            var deltaTop = Math.abs(event.clientY - startTop);
            if (deltaLeft > minDistance || deltaTop > minDistance) {
                start(event);
            }
        }
        if (isDragging && options.drag) {
            options.drag(event);
        }
    };
    var upFn = function (event) {
        setTimeout(function () {
            if (preventClick && element.getAttribute(PREVENT_CLICK_PROP)) {
                element.removeAttribute(PREVENT_CLICK_PROP);
            }
        }, 0);
        document.removeEventListener('mousemove', moveFn);
        document.removeEventListener('mouseup', upFn);
        document.onselectstart = null;
        document.ondragstart = null;
        disabled = false;
        end(event);
    };
    element.addEventListener('click', function (event) {
        if (preventClick && element.getAttribute(PREVENT_CLICK_PROP)) {
            event.stopPropagation();
            element.removeAttribute(PREVENT_CLICK_PROP);
        }
    });
    element.addEventListener('mousedown', function (event) {
        if (isDragging)
            return;
        target = event.target;
        document.addEventListener('mousemove', moveFn);
        document.addEventListener('mouseup', upFn);
        if (cancelBubble) {
            event.stopPropagation();
        }
        if (minDistance > 0) {
            dragState.startLeft = event.clientX;
            dragState.startTop = event.clientY;
        }
        else {
            start(event);
        }
    });
});
;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var toRadians = function (degree) {
    return degree / 180.0 * Math.PI;
};
var unRotatePoint = function (rotation, point, center) {
    var left = point.left, top = point.top;
    var centerX = center.left;
    var centerY = center.top;
    var sinX = Math.sin(toRadians(rotation));
    var cosX = Math.cos(toRadians(rotation));
    return {
        left: centerX + (cosX * (left - centerX) + sinX * (top - centerY)),
        top: centerY + (-sinX * (left - centerX) + cosX * (top - centerY))
    };
};
var rotatePoint = function (rotation, point, center) {
    return unRotatePoint(-rotation, point, center);
};
var fromP1P3 = function (p1, p3, proportion) {
    var left = Math.min(p1.left, p3.left);
    var top = Math.min(p1.top, p3.top);
    var width = Math.abs(p1.left - p3.left);
    var height = proportion ? (width / proportion) : Math.abs(p1.top - p3.top);
    return {
        left: left, top: top, width: width, height: height
    };
};
var fromP1P3WithRotation = function (p1, p3, rotation, proportion) {
    if (rotation === void 0) { rotation = 0; }
    var center = {
        left: (p1.left + p3.left) / 2,
        top: (p1.top + p3.top) / 2
    };
    return fromP1P3(unRotatePoint(rotation, p1, center), unRotatePoint(rotation, p3, center), proportion);
};
var fromP2P4 = function (p2, p4, proportion) {
    var width = Math.abs(p4.left - p2.left);
    var height = proportion ? (width / proportion) : Math.abs(p4.top - p2.top);
    var left = Math.max(p2.left, p4.left) - width;
    var top = Math.min(p2.top, p4.top);
    return {
        left: left,
        top: top,
        width: width,
        height: height
    };
};
var fromP2P4WithRotation = function (p2, p4, rotation, proportion) {
    if (rotation === void 0) { rotation = 0; }
    var center = {
        left: (p2.left + p4.left) / 2,
        top: (p2.top + p4.top) / 2
    };
    return fromP2P4(unRotatePoint(rotation, p2, center), unRotatePoint(rotation, p4, center), proportion);
};
var fromC12C34WithRotation = function (c12, c34, rotation, width) {
    var center = {
        left: (c12.left + c34.left) / 2,
        top: (c12.top + c34.top) / 2
    };
    var origin12 = unRotatePoint(rotation, c12, center);
    var origin34 = unRotatePoint(rotation, c34, center);
    var height = Math.abs(origin12.top - origin34.top);
    return {
        left: Math.min(origin12.left, origin34.left) - width / 2,
        top: Math.min(origin12.top, origin34.top),
        width: width,
        height: height
    };
};
var fromC14C23WithRotation = function (c14, c23, rotation, height) {
    var center = {
        left: (c14.left + c23.left) / 2,
        top: (c14.top + c23.top) / 2
    };
    var origin12 = unRotatePoint(rotation, c14, center);
    var origin34 = unRotatePoint(rotation, c23, center);
    var width = Math.abs(origin12.left - origin34.left);
    return {
        left: Math.min(origin12.left, origin34.left),
        top: Math.min(origin12.top, origin34.top) - height / 2,
        width: width,
        height: height
    };
};
var TRANSFORM_MAP = {
    'n': { p1y: true },
    'w': { p1x: true },
    'e': { p3x: true },
    's': { p3y: true },
    'nw': { p1x: true, p1y: true },
    'ne': { p1y: true, p3x: true },
    'sw': { p3y: true, p1x: true },
    'se': { p3y: true, p3x: true }
};
var getDeltaOfVector = function (p1, p2, deltaX, deltaY) {
    var vector = {
        x: p1.left - p2.left,
        y: p1.top - p2.top
    };
    var vectorLength = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    var unitVector = {
        x: vector.x / vectorLength,
        y: vector.y / vectorLength
    };
    var factor = deltaX * unitVector.x + deltaY * unitVector.y;
    return {
        left: factor * unitVector.x,
        top: factor * unitVector.y
    };
};
var Rectangle = /** @class */ (function () {
    function Rectangle(rect, rotation, fixedRatio, autoHeight) {
        this.rotation = 0;
        this.rotation = rotation;
        this.fixedRatio = fixedRatio;
        this.autoHeight = autoHeight;
        if (rect) {
            var left = rect.left, top_1 = rect.top, width = rect.width, height = rect.height;
            this.left = left;
            this.top = top_1;
            this.width = width;
            this.height = height;
        }
    }
    Object.defineProperty(Rectangle.prototype, "center", {
        get: function () {
            var _a = this, left = _a.left, top = _a.top, width = _a.width, height = _a.height;
            return {
                left: left + width / 2,
                top: top + height / 2
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "rotated", {
        get: function () {
            return this.rotation !== undefined && this.rotation !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.getPoint = function (type) {
        var _a = this, left = _a.left, top = _a.top, width = _a.width, height = _a.height;
        var result = {
            left: null,
            top: null
        };
        switch (type) {
            case 'nw':
            case 'ne':
            case 'n':
                result.top = top;
                break;
            case 'sw':
            case 's':
            case 'se':
                result.top = top + height;
                break;
            case 'w':
            case 'e':
                result.top = top + height / 2;
                break;
        }
        switch (type) {
            case 'nw':
            case 'sw':
            case 'w':
                result.left = left;
                break;
            case 'ne':
            case 'se':
            case 'e':
                result.left = left + width;
                break;
            case 'n':
            case 's':
                result.left = left + width / 2;
                break;
        }
        var rotation = this.rotation;
        if (rotation !== undefined && rotation !== 0) {
            var center = this.center;
            result = rotatePoint(rotation, result, center);
        }
        return result;
    };
    Rectangle.prototype.translate = function (deltaX, deltaY) {
        if (deltaX === void 0) { deltaX = 0; }
        if (deltaY === void 0) { deltaY = 0; }
        if (!this.rotated) {
            return {
                left: this.left + deltaX,
                top: this.top + deltaY,
                width: this.width,
                height: this.height
            };
        }
        else {
            var p1 = this.getPoint('nw');
            var p2 = this.getPoint('se');
            p1.left += deltaX;
            p1.top += deltaY;
            p2.left += deltaX;
            p2.top += deltaY;
            return fromP1P3WithRotation(p1, p2, this.rotation, null);
        }
    };
    Rectangle.prototype.reset = function (rect) {
        this.left = rect.left;
        this.top = rect.top;
        this.width = rect.width;
        this.height = rect.height;
    };
    Rectangle.prototype.dragPoint = function (type, deltaX, deltaY, startPoint, startSize) {
        if (deltaX === void 0) { deltaX = 0; }
        if (deltaY === void 0) { deltaY = 0; }
        var transformMap = TRANSFORM_MAP[type];
        var p1 = this.getPoint('nw');
        var p3 = this.getPoint('se');
        var rotated = this.rotated;
        var rotation = this.rotation;
        var fixedRatio = this.fixedRatio;
        var proportion = fixedRatio ? (startSize.height ? startSize.width / startSize.height : 0) : null;
        if (rotated) {
            if (type === 's' || type === 'n') {
                var c12 = this.getPoint('n');
                var c34 = this.getPoint('s');
                var delta = getDeltaOfVector(c12, c34, deltaX, deltaY);
                if (type === 's') {
                    c34.left += delta.left;
                    c34.top += delta.top;
                }
                else if (type === 'n') {
                    c12.left += delta.left;
                    c12.top += delta.top;
                }
                return fromC12C34WithRotation(c12, c34, rotation, this.width);
            }
            if (type === 'e' || type === 'w') {
                var c14 = this.getPoint('w');
                var c23 = this.getPoint('e');
                var delta = getDeltaOfVector(c14, c23, deltaX, deltaY);
                if (type === 'e') {
                    c23.left += delta.left;
                    c23.top += delta.top;
                }
                else if (type === 'w') {
                    c14.left += delta.left;
                    c14.top += delta.top;
                }
                return fromC14C23WithRotation(c14, c23, rotation, this.height);
            }
            if (type === 'nw' || type === 'se') {
                var p1_1 = this.getPoint('nw');
                var p3_1 = this.getPoint('se');
                if (type === 'nw') {
                    p1_1.left = startPoint.left + deltaX;
                    p1_1.top = startPoint.top + deltaY;
                }
                else if (type === 'se') {
                    p3_1.left = startPoint.left + deltaX;
                    p3_1.top = startPoint.top + deltaY;
                }
                return fromP1P3WithRotation(p1_1, p3_1, rotation, proportion);
            }
            if (type === 'ne' || type === 'sw') {
                var p2 = this.getPoint('ne');
                var p4 = this.getPoint('sw');
                if (type === 'ne') {
                    p2.left = startPoint.left + deltaX;
                    p2.top = startPoint.top + deltaY;
                }
                else if (type === 'sw') {
                    p4.left = startPoint.left + deltaX;
                    p4.top = startPoint.top + deltaY;
                }
                return fromP2P4WithRotation(p2, p4, rotation, proportion);
            }
        }
        if (fixedRatio) {
            switch (type) {
                case 'n':
                    p1.top = startPoint.top + deltaY;
                    break;
                case 'e':
                    p3.left = startPoint.left + deltaX;
                    break;
                case 's':
                    p3.top = startPoint.top + deltaY;
                    break;
                case 'w':
                    p1.left = startPoint.left + deltaX;
                    break;
                case 'nw':
                    p1.left = startPoint.left + deltaX;
                    p1.top = startPoint.top + deltaX / proportion;
                    break;
                case 'ne':
                    p3.left = startPoint.left + deltaX;
                    p1.top = startPoint.top - deltaX / proportion;
                    break;
                case 'se':
                    p3.left = startPoint.left + deltaX;
                    p3.top = startPoint.top + deltaX / proportion;
                    break;
                case 'sw':
                    p1.left = startPoint.left + deltaX;
                    p3.top = startPoint.top - deltaX / proportion;
                    break;
                default:
                    break;
            }
        }
        else {
            if (transformMap.p1x) {
                p1.left = startPoint.left + deltaX;
            }
            if (transformMap.p3x) {
                p3.left = startPoint.left + deltaX;
            }
            if (transformMap.p1y) {
                p1.top = startPoint.top + deltaY;
            }
            if (transformMap.p3y) {
                p3.top = startPoint.top + deltaY;
            }
        }
        return fromP1P3WithRotation(p1, p3, rotation, null);
    };
    return Rectangle;
}());
/* harmony default export */ __webpack_exports__["a"] = (Rectangle);
;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Resizer_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Resizer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Resizer_vue__);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__components_Resizer_vue___default.a);
function install(Vue) {
    Vue.component(__WEBPACK_IMPORTED_MODULE_0__components_Resizer_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__components_Resizer_vue___default.a);
}
if (typeof window !== 'undefined' && window['Vue']) {
    install(window['Vue']);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "rr-resizer",
    class: {
      'rr-resizer--active': !_vm.disabled && _vm.active,
        'rr-drag-border': _vm.dragMode === 'border'
    },
    style: ({
      transform: 'rotateZ(' + _vm.state.rotation + 'deg)',
      left: _vm.state.left + 'px',
      top: _vm.state.top + 'px',
      width: _vm.state.width + 'px',
      height: _vm.state.autoHeight ? 'auto' : _vm.state.height + 'px'
    })
  }, [_c('div', {
    key: "bar-n",
    staticClass: "rr-bar rr-ord-n"
  }), _vm._v(" "), _c('div', {
    key: "bar-s",
    staticClass: "rr-bar rr-ord-s"
  }), _vm._v(" "), _c('div', {
    key: "bar-e",
    staticClass: "rr-bar rr-ord-e"
  }), _vm._v(" "), _c('div', {
    key: "bar-w",
    staticClass: "rr-bar rr-ord-w"
  }), _vm._v(" "), (_vm.rotatable) ? _c('div', {
    ref: "rotateHandle",
    staticClass: "rr-rotate-handle"
  }) : _vm._e(), _vm._v(" "), (_vm.hasHandle('n')) ? _c('div', {
    key: "ord-n",
    staticClass: "rr-handle rr-ord-n"
  }) : _vm._e(), _vm._v(" "), (_vm.hasHandle('s')) ? _c('div', {
    key: "ord-s",
    staticClass: "rr-handle rr-ord-s"
  }) : _vm._e(), _vm._v(" "), (_vm.hasHandle('e')) ? _c('div', {
    key: "ord-e",
    staticClass: "rr-handle rr-ord-e"
  }) : _vm._e(), _vm._v(" "), (_vm.hasHandle('w')) ? _c('div', {
    key: "ord-w",
    staticClass: "rr-handle rr-ord-w"
  }) : _vm._e(), _vm._v(" "), (_vm.hasHandle('nw')) ? _c('div', {
    key: "ord-nw",
    staticClass: "rr-handle rr-ord-nw"
  }) : _vm._e(), _vm._v(" "), (_vm.hasHandle('ne')) ? _c('div', {
    key: "ord-ne",
    staticClass: "rr-handle rr-ord-ne"
  }) : _vm._e(), _vm._v(" "), (_vm.hasHandle('se')) ? _c('div', {
    key: "ord-se",
    staticClass: "rr-handle rr-ord-se"
  }) : _vm._e(), _vm._v(" "), (_vm.hasHandle('sw')) ? _c('div', {
    key: "ord-sw",
    staticClass: "rr-handle rr-ord-sw"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "rr-content"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ })
/******/ ]);
});