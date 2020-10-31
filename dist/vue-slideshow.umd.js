(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-slideshow"] = factory();
	else
		root["vue-slideshow"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "349b");
/******/ })
/************************************************************************/
/******/ ({

/***/ "017d":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var getOwnPropertyDescriptor = __webpack_require__("d266").f;
var createNonEnumerableProperty = __webpack_require__("a1fa");
var redefine = __webpack_require__("49e1");
var setGlobal = __webpack_require__("8668");
var copyConstructorProperties = __webpack_require__("da6b");
var isForced = __webpack_require__("87b1");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "01e3":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "0d63":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "0eb6":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4323");
var requireObjectCoercible = __webpack_require__("e527");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "0f9f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("017d");
var exec = __webpack_require__("f8c5");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "128e":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("eb90");
var uid = __webpack_require__("b198");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "15a3":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");
var isArray = __webpack_require__("3bae");
var wellKnownSymbol = __webpack_require__("1730");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "16c3":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1730":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var shared = __webpack_require__("eb90");
var has = __webpack_require__("aa74");
var uid = __webpack_require__("b198");
var NATIVE_SYMBOL = __webpack_require__("a971");
var USE_SYMBOL_AS_UID = __webpack_require__("5117");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "19cb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("0eb6").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "2195":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("017d");
var parseIntImplementation = __webpack_require__("360b");

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ }),

/***/ "2227":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "243a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("3ac0");
var requireObjectCoercible = __webpack_require__("e527");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "26a7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("7d35").forEach;
var arrayMethodIsStrict = __webpack_require__("ab38");
var arrayMethodUsesToLength = __webpack_require__("2eb8");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "281c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("dd4c");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "2901":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2eb8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var fails = __webpack_require__("dd4c");
var has = __webpack_require__("aa74");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "2fd0":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4323");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "349b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("2227")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10c666c2-vue-loader-template"}!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./vue-slideshow.vue?vue&type=template&id=044c33d6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{style:({'outline-color':'transparent','position':'relative',backgroundColor:_vm.backgroundColor}),attrs:{"tabindex":"-1"}},[_c('div',{staticClass:"container",staticStyle:{"overflow":"hidden"}},[_vm._t("default"),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.nav),expression:"nav"}],style:({zIndex:_vm.contents.length+1, 'left':'10px', 'position':'absolute','top':'0px','bottom':'0px','display':'table','height':'100%'})},[_c('div',{staticStyle:{"display":"table-cell","vertical-align":"middle"}},[_c('a',{style:({color:_vm.navArrow,'border-color':_vm.navBorder,'background-color':_vm.navBackground, 'border':'solid 1px','padding':'5px 9px','cursor':'pointer'}),on:{"click":_vm.previousSlide}},[_vm._t("nav-left",[_vm._v("◀")])],2)])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.nav),expression:"nav"}],style:({zIndex:_vm.contents.length+1, 'right':'10px','position':'absolute','top':'0px','bottom':'0px','display':'table','height':'100%'})},[_c('div',{staticStyle:{"display":"table-cell","vertical-align":"middle"}},[_c('a',{style:({color:_vm.navArrow,'border-color':_vm.navBorder,'background-color':_vm.navBackground,  'border':'solid 1px #fff','padding':'5px 9px','cursor':'pointer'}),on:{"click":_vm.nextSlide}},[_vm._t("nav-right",[_vm._v("▶")])],2)])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.pager),expression:"pager"}],staticClass:"pagination",style:({zIndex:_vm.contents.length+1, 'position':'absolute','bottom':'10px','left':'0px','width':'100%','text-align':'center'})},_vm._l((_vm.contents),function(page,i){return _c('a',{key:'page'+i,style:({'background-color':i==_vm.slideIndex?_vm.pagerBackground:'transparent','display':'inline-block','border':'solid 1px '+_vm.pagerBorder,'border-radius':'12px','height':_vm.pagerSize+'px','width':_vm.pagerSize+'px','margin-left':'2px','margin-right':'2px','cursor':'pointer' }),on:{"click":function($event){return _vm.selectPage(i)}}})}),0),_c('a',{directives:[{name:"show",rawName:"v-show",value:(_vm.fullscreen),expression:"fullscreen"}],staticClass:"fullscreen",style:({zIndex:_vm.contents.length+1,'position':'absolute','top':'20px','right':'20px','color':'#fff','font-size':'21px','cursor':'pointer'}),on:{"click":_vm.fullScreen}},[_vm._t("fullscreen",[_vm._v(" ↗ "),_c('span',{staticStyle:{"position":"absolute","top":"0px","left":"0px"}},[_vm._v("↙")]),_c('span',{staticStyle:{"position":"absolute","top":"1px","left":"-1px","transform":"rotate(-90deg)"}},[_vm._v("↗")]),_c('span',{staticStyle:{"position":"absolute","top":"1px","left":"-1px","transform":"rotate(-90deg)"}},[_vm._v("↙")])])],2)],2),(_vm.thumbs)?_c('div',{staticClass:"thumbnails",style:({'position':'relative','width':'100%','overflow-x':'hidden','height':_vm.params.thumbs.height+'px'})},[_c('table',{staticStyle:{"position":"absolute","top":"0px","left":"0px","border-style":"none","padding":"0","margin":"0","border-spacing":"0","border":"none"}},[_c('tr',_vm._l((_vm.thumb_paths),function(src,index){return _c('td',{key:src,staticStyle:{"padding":"0","margin":"0","box-sizing":"border-box","border-spacing":"0"},attrs:{"cellpadding":"0","cellspacing":"0","data-x":_vm.params.thumbs.height*index,"data-index":index}},[_c('div',{style:({'cursor':'pointer','background-image':'url('+src+')','background-repeat':'no-repeat','background-size':'cover','width':_vm.params.thumbs.width+'px','height':_vm.params.thumbs.height+'px','box-sizing':'border-box','border-style':'solid','border-width':'2px','border-color':index==_vm.slideIndex?_vm.thumbsSelectedBorder:_vm.thumbsBorder}),on:{"click":function($event){return _vm.selectThumb(index)}}})])}),0)])]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./vue-slideshow.vue?vue&type=template&id=044c33d6&

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("6efa");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__("5f5d");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.parse-float.js
var es_parse_float = __webpack_require__("e36a");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.parse-int.js
var es_parse_int = __webpack_require__("2195");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("0f9f");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("6769");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__("a11f");

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/thread-loader/dist/cjs.js!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/babel-loader/lib??ref--12-1!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./vue-slideshow.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var lib_vue_loader_options_vue_slideshowvue_type_script_lang_js_ = ({
  props: {
    params: {
      type: Object,
      "default": function _default() {
        return {
          autoplay: true,
          backgroundColor: '#000',
          imageRatio: 1,
          fullscreen: true,
          animation: 'fade',
          speed: 750,
          timeout: 2500,
          thumbs: {
            visible: true,
            height: 90,
            width: 100
          },
          nav: {
            visible: false,
            borderColor: '#fff',
            backgroundColor: 'transparent',
            arrowColor: '#fff'
          },
          pager: {
            visible: false,
            position: {
              bottom: 10,
              left: 0
            }
          }
        };
      }
    },
    heightResizer: {
      type: Function
    }
  },
  data: function data() {
    return {
      isDragging: false,
      previous_autoplay: false,
      animating: false,
      animating_timeout: 0,
      slideIndex: 0,
      navIndex: 1,
      parent: null,
      contents: [],
      ghost: null,
      width: 0,
      height: 0,
      dragStartX: 0,
      dragStartY: 0,
      dragDiffX: 0,
      dragDiffY: 0,
      isFullScreen: false,
      image_paths: [],
      thumb_paths: [],
      animated_elements: 0 //counter callback functions

    };
  },
  computed: {
    backgroundColor: function backgroundColor() {
      return this.params && this.params.backgroundColor ? this.params.backgroundColor : '#000';
    },
    imageratio: function imageratio() {
      return this.params && this.params.imageRatio ? this.params.imageRatio : 1;
    },
    fullscreen: function fullscreen() {
      return this.params && typeof this.params.fullscreen !== 'undefined' ? this.params.fullscreen : true;
    },
    thumbsSelectedBorder: function thumbsSelectedBorder() {
      return this.params && this.params.thumbs && this.params.thumbs.selectedBorderColor ? this.params.thumbs.selectedBorderColor : '#000';
    },
    thumbsBorder: function thumbsBorder() {
      return this.params && this.params.thumbs && this.params.thumbs.borderColor ? this.params.thumbs.borderColor : '#fff';
    },
    pagerSize: function pagerSize() {
      return this.params && this.params.pager && this.params.pager.size ? this.params.pager.size : 12;
    },
    pagerBorder: function pagerBorder() {
      return this.params && this.params.pager && this.params.pager.borderColor ? this.params.pager.borderColor : '#fff';
    },
    pagerBackground: function pagerBackground() {
      return this.params && this.params.pager && this.params.pager.backgroundColor ? this.params.pager.backgroundColor : '#fff';
    },
    autoplay: function autoplay() {
      return this.params && typeof this.params.autoplay !== 'undefined' ? this.params.autoplay : true;
    },
    timeout: function timeout() {
      return this.params && this.params.timeout ? Math.abs(parseInt(this.params.timeout)) : 2500;
    },
    speed: function speed() {
      return this.params && this.params.speed ? Math.abs(parseInt(this.params.speed)) : 750;
    },
    animation: function animation() {
      return this.params && this.params.animation && this.params.animation == 'slide' ? this.params.animation : 'fade';
    },
    navArrow: function navArrow() {
      return this.params && this.params.nav && this.params.nav.arrowColor ? this.params.nav.arrowColor : '#fff';
    },
    navBorder: function navBorder() {
      return this.params && this.params.nav && this.params.nav.borderColor ? this.params.nav.borderColor : '#fff';
    },
    navBackground: function navBackground() {
      return this.params && this.params.nav && this.params.nav.backgroundColor ? this.params.nav.backgroundColor : 'transparent';
    },
    nav: function nav() {
      return this.params && this.params.nav && this.params.nav.visible ? this.params.nav.visible : false;
    },
    pager: function pager() {
      return this.params && this.params.pager && this.params.pager.visible ? this.params.pager.visible : false;
    },
    thumbs: function thumbs() {
      return this.params && this.params.thumbs && this.params.thumbs.visible ? this.params.thumbs.visible : false;
    },
    correctHeight: function correctHeight() {
      var heighttmp = this.height;

      if (this.params && this.params.maxHeight && this.params.maxHeight < heighttmp) {
        heighttmp = this.params.maxHeight;
      }

      if (this.heightResizer != null) {
        var user_height = this.heightResizer(this);

        if (user_height < heighttmp) {
          heighttmp = user_height;
        }
      }

      if (this.params && this.params.minHeight && this.params.minHeight > heighttmp) {
        heighttmp = this.params.minHeight;
      } //console.log('height',heighttmp);


      return heighttmp;
    }
  },
  methods: {
    slideLeft: function slideLeft(elem, to, _final, done) {
      var _this = this;

      //var distance = 0;
      var nowt = new Date().getTime(); //console.log('final',final);

      var from = parseFloat(elem.style.left.replace('px', ''));

      var tick = function tick() {
        var passedt = new Date().getTime();
        var diff = passedt - nowt;
        var step = _final / _this.speed; ///final;

        elem.style.left = from - step * diff + 'px';

        if (_this.speed > diff) {
          window.requestAnimationFrame && window.requestAnimationFrame(tick) || setTimeout(tick, 16);
        } else {
          //console.log(elem.style.left);
          elem.style.left = to + 'px';
          done();
        }
      };

      tick();
    },
    slideRight: function slideRight(elem, to, _final2, done) {
      var _this2 = this;

      //var distance = 0;
      var nowt = new Date().getTime(); //console.log('final',final);

      var from = parseFloat(elem.style.left.replace('px', ''));

      var tick = function tick() {
        var passedt = new Date().getTime();
        var diff = passedt - nowt;
        var step = _final2 / _this2.speed; ///final;

        elem.style.left = from + step * diff + 'px';

        if (_this2.speed > diff) {
          window.requestAnimationFrame && window.requestAnimationFrame(tick) || setTimeout(tick, 16);
        } else {
          //console.log(elem.style.left);
          elem.style.left = to + 'px';
          done();
        }
      };

      tick();
    },
    fadeIn: function fadeIn(elem, done) {
      var _this3 = this;

      elem.style.left = '0px';
      elem.style.opacity = 0;
      var nowt = new Date().getTime();

      var tick = function tick() {
        var passedt = new Date().getTime();
        var diff = passedt - nowt;
        var left = parseFloat(_this3.speed - diff);

        var opacity = parseFloat(diff / 1000.0) * 1000 / _this3.speed;

        elem.style.opacity = opacity;

        if (opacity < 1) {
          window.requestAnimationFrame && window.requestAnimationFrame(tick) || setTimeout(tick, 16);
        } else {
          elem.style.opacity = 1;
          done();
        }

        return left / 1000;
      };

      tick();
    },
    fadeOut: function fadeOut(elem, done) {
      var _this4 = this;

      elem.style.left = '0px';
      elem.style.opacity = 1;
      var nowt = new Date().getTime();

      var tick = function tick() {
        var passedt = new Date().getTime();
        var diff = passedt - nowt;
        var left = parseFloat(_this4.speed - diff);

        var opacity = parseFloat(left / 1000.0) * 1000 / _this4.speed;

        elem.style.opacity = opacity;

        if (opacity > 0) {
          window.requestAnimationFrame && window.requestAnimationFrame(tick) || setTimeout(tick, 16);
        } else {
          elem.style.opacity = 0;
          done();
        }

        return left / 1000;
      };

      tick();
    },
    animate: function animate(cindex, nindex) {
      if (this.animating) {
        return;
      }

      this.animated_elements = 0;
      this.animating = true;
      var ccontent = this.contents[cindex];
      var ncontent = this.contents[nindex];

      if (this.animation == 'fade') {
        ccontent.style.zIndex = 2;
        ncontent.style.zIndex = 1;
        this.fadeOut(ccontent, this.animate_finished);
        this.fadeIn(ncontent, this.animate_finished);
      } else if (this.animation == 'slide') {
        if (nindex > cindex) {
          var _final3 = this.width;
          var cto = this.width * -1;
          var nto = 0;
          ccontent.style.zIndex = 1;
          ncontent.style.zIndex = 2;
          ccontent.style.left = '0px';
          ncontent.style.left = this.width + 'px';
          ncontent.style.opacity = 1;
          this.slideLeft(ccontent, cto, _final3, this.animate_finished);
          this.slideLeft(ncontent, nto, _final3, this.animate_finished);
        } else {
          ccontent.style.left = '0px';
          ncontent.style.left = this.width * -1 + 'px';
          ncontent.style.opacity = 1;
          this.slideRight(ccontent, this.width, this.width, this.animate_finished);
          this.slideRight(ncontent, 0, this.width, this.animate_finished);
        }
      }
    },
    animate_finished: function animate_finished() {
      var _this5 = this;

      this.animated_elements++;

      if (this.animated_elements == 2) {
        //move to next one
        //this.animated_elements=0;
        this.animating = false;
        var cindex = this.slideIndex;
        var nindex = cindex + 1 > this.contents.length - 1 ? 0 : cindex + 1;

        if (this.autoplay) {
          this.animating_timeout = setTimeout(function () {
            _this5.slideIndex = nindex;

            _this5.animate(cindex, nindex);
          }, this.timeout);
        }
      }
    },
    getDomNode: function getDomNode() {
      return this.$el;
    },
    fullScreen: function fullScreen() {
      if (this.isFullScreen) {
        document.exitFullscreen();
      } else {
        if (this.$el.requestFullscreen) {
          this.$el.requestFullscreen();
        }
      }
    },
    moveTo: function moveTo(index) {
      clearTimeout(this.animating_timeout);
      var cindex = this.slideIndex;
      var nindex = parseInt(index);
      this.slideIndex = nindex;
      this.animate(cindex, nindex);
    },
    selectPage: function selectPage(index) {
      //var content = this.contents[index];
      //alert(content.getAttribute('data-url'));
      if (!this.animating) {
        //alert(index);
        this.moveTo(index);
        this.pageSelected(index);
      }
    },
    selectThumb: function selectThumb(index) {
      if (!this.animating) {
        this.moveTo(index);
        this.thumbSelected(index);
      }
    },
    pageSelected: function pageSelected(i) {
      this.$emit('pageSelected', {
        index: i
      });
    },
    thumbSelected: function thumbSelected(i) {
      this.$emit('thumbSelected', {
        index: i
      });
    },
    getHeight: function getHeight() {
      return this.height;
    },
    getBackgroundHeight: function getBackgroundHeight() {
      return this.maxheight;
    },
    nextSlide: function nextSlide() {
      if (!this.animating) {
        clearTimeout(this.animating_timeout);
        var cindex = this.slideIndex;
        var nindex = cindex + 1 > this.contents.length - 1 ? 0 : cindex + 1;
        this.slideIndex = nindex;
        this.animate(cindex, nindex);
        this.$emit('nextSlide', {});
      }
    },
    previousSlide: function previousSlide() {
      if (!this.animating) {
        clearTimeout(this.animating_timeout);
        var cindex = this.slideIndex;
        var nindex = cindex - 1 < 0 ? this.contents.length - 1 : cindex - 1;
        this.slideIndex = nindex;
        this.animate(cindex, nindex);
        this.$emit('previousSlide', {});
      }
    },
    createGhost: function createGhost() {
      if (this.ghost == null) {
        this.ghost = document.createElement('div');
        this.ghost.style.cssText = 'position:fixed;z-index:-1;top:0px;left:0px;right:0px;bottom:0px;';
        this.$el.appendChild(this.ghost);
      }

      this.width = this.ghost.offsetWidth;
      this.height = this.ghost.offsetHeight;
    },
    resized: function resized() {
      this.width = this.ghost.offsetWidth;
      this.height = this.ghost.offsetHeight;
      this.parent.style.width = this.width + 'px';
      this.parent.style.height = this.correctHeight + 'px';
      this.drag.style.height = this.correctHeight + 'px';
      this.resizeBackgrounds();
    },
    createBackgrounds: function createBackgrounds() {
      for (var i in this.contents) {
        var content = this.contents[i];

        if (content.getAttribute('data-init') == null) {
          this.createBackground(content, i);
        } //this.resizeBackground(content);

      }
    },
    createBackground: function createBackground(content, index) {
      var img = content.querySelector('img:first-child');
      var src = img.src;
      content.removeChild(img);
      content.setAttribute('data-index', index);
      content.style.cssText = 'position:absolute;left:0px;top:0px;z-index:1';
      this.loadImage(content, src, function () {//content.style.setAttribute('data-width',opt.w);
        //content.style.setAttribute('data-height',opt.h);
      });
      content.style.backgroundImage = 'url(' + src + ')';
      content.style.backgroundRepeat = 'no-repeat';
      content.style.backgroundSize = 'cover';
      content.style.backgroundPosition = 'center';
      var tsrc = src;

      if (img.getAttribute('data-thumb') != null) {
        tsrc = img.getAttribute('data-thumb');
      }

      content.setAttribute('data-url', src);
      content.setAttribute('data-thumb', tsrc);
      this.image_paths.push(src);
      this.thumb_paths.push(tsrc);
      content.setAttribute('data-init', 1);
      return content;
    },
    resizeBackground: function resizeBackground(content) {
      content.style.height = this.correctHeight + 'px';
      content.style.width = this.width + 'px';
    },
    resizeBackgrounds: function resizeBackgrounds() {
      for (var i in this.contents) {
        this.resizeBackground(this.contents[i]);
      }
    },
    setupBackgrounds: function setupBackgrounds() {
      for (var i in this.contents) {
        var content = this.contents[i];
        content.style.left = '0px';
        content.style.opacity = 0;
      }
    },
    loadImage: function loadImage(content, src, done) {
      var img = new Image();
      var w = 0;
      var h = 0;
      var me = this;

      img.onload = function () {
        w = img.width;
        h = img.height;
        content.setAttribute('data-width', w);
        content.setAttribute('data-height', h);
        var position = 'horizontal';

        if (w < h) {
          position = 'vertical';
        }

        var index = parseInt(content.getAttribute('data-index')); //console.log('ratio',me.imageratio);

        if (position == 'vertical' && me.imageratio == 1 || me.imageratio == 2) {
          content.style.backgroundSize = 'auto 100%';
        }

        if (index == 0) {
          me.init();
        }

        content.setAttribute('data-type', position);

        if (done) {
          done({
            w: w,
            h: h
          });
        }
      };

      img.src = src;
    },
    createDragHandler: function createDragHandler() {
      this.drag = document.createElement('div');
      this.drag.style.cssText = 'position:absolute;z-index:' + this.contents.length + ';top:0px;left:0px;';
      this.drag.style.width = this.width + 'px';
      this.drag.style.height = this.correctHeight + 'px';
      this.parent.appendChild(this.drag);
      this.drag.addEventListener('mousedown', this.dragStarted);
    },
    dragStarted: function dragStarted() {
      if (this.animating) {
        return;
      }

      this.previous_autoplay = this.autoplay;
      this.params.autoplay = false;
      clearTimeout(this.animating_timeout); //pause animation

      this.dragStartX = event.pageX;
      document.addEventListener('mousemove', this.dragging);
      document.addEventListener('mouseup', this.dragEnded);
    },
    dragging: function dragging() {
      this.dragDiffX = event.pageX - this.dragStartX; //console.log(this.dragDiffX);

      var dragDiffX = Math.abs(this.dragDiffX);

      if (dragDiffX > 20) {
        this.isDragging = true;
        var ccontent = this.contents[this.slideIndex];
        ccontent.style.left = this.dragDiffX + 'px'; //ccontent.style.left = this.dragDiffX+'px';

        if (this.dragDiffX < 0) {
          if (this.slideIndex + 1 <= this.contents.length - 1) {
            var ncontent = this.contents[this.slideIndex + 1];
            ncontent.style.opacity = 1;
            ncontent.style.left = this.width + this.dragDiffX + 'px';
          }
        } else {
          if (this.slideIndex - 1 >= 0) {
            var pcontent = this.contents[this.slideIndex - 1];
            pcontent.style.opacity = 1;
            pcontent.style.left = this.width * -1 + this.dragDiffX + 'px';
          }
        }
      } else {
        this.isDragging = false;
      }
    },
    dragEnded: function dragEnded() {
      var _this6 = this;

      var animated = false;
      this.animated_elements = 0;
      this.params.autoplay = this.previous_autoplay;

      if (this.isDragging) {
        console.log(this.params.autoplay); //this.dragDiffX = event.pageX - this.dragStartX;
        //console.log(this.dragDiffX);

        var moved_enought = Math.abs(this.dragDiffX) > this.width / 4 ? true : false;

        if (moved_enought) {
          //alert(true);
          if (this.dragDiffX < 0) {
            //we need to move left
            var cindex = this.slideIndex;

            if (cindex + 1 <= this.contents.length - 1) {
              animated = true;
              var nindex = cindex + 1;
              var ccontent = this.contents[cindex];
              var ncontent = this.contents[nindex];
              this.slideIndex = nindex;
              this.slideLeft(ccontent, this.width * -1, this.width - Math.abs(this.dragDiffX), this.animate_finished);
              this.slideLeft(ncontent, 0, this.width - Math.abs(this.dragDiffX), this.animate_finished);
            } else {
              animated = true;
              this.slideRight(this.contents[cindex], 0, Math.abs(this.dragDiffX), this.animate_finished);
              this.animate_finished();
            }
          } else if (this.dragDiffX > 0) {
            var cindex2 = this.slideIndex;

            if (cindex2 - 1 >= 0) {
              animated = true;
              var nindex2 = cindex2 - 1;
              var ccontent2 = this.contents[cindex2];
              var ncontent2 = this.contents[nindex2];
              this.slideIndex = nindex2;
              this.slideRight(ccontent2, this.width, this.width - Math.abs(this.dragDiffX), this.animate_finished);
              this.slideRight(ncontent2, 0, this.width - Math.abs(this.dragDiffX), this.animate_finished);
            } else {
              animated = true; //this.slideRight(this.contents[cindex2],0,this.width-Math.abs(this.dragDiffX),this.animate_finished);
              //this.animate_finished();
              //alert(true);

              this.slideLeft(this.contents[cindex2], 0, Math.abs(this.dragDiffX), this.animate_finished);
              this.animate_finished();
            }
          }
        } else {
          //return back
          if (this.dragDiffX < 0) {
            //we need to move right
            var cindex3 = this.slideIndex;

            if (cindex3 + 1 <= this.contents.length - 1) {
              animated = true;
              var nindex3 = cindex3 + 1;
              var ccontent3 = this.contents[cindex3];
              var ncontent3 = this.contents[nindex3]; //this.slideIndex = nindex;

              this.slideRight(ccontent3, 0, Math.abs(this.dragDiffX), this.animate_finished);
              this.slideRight(ncontent3, this.width, Math.abs(this.dragDiffX), this.animate_finished);
            } else {
              animated = true;
              this.slideRight(this.contents[cindex3], 0, Math.abs(this.dragDiffX), this.animate_finished);
              this.animate_finished();
            }
          } else if (this.dragDiffX > 0) {
            var cindex4 = this.slideIndex;

            if (cindex4 - 1 >= 0) {
              animated = true;
              var nindex4 = cindex4 - 1;
              var ccontent4 = this.contents[cindex4];
              var ncontent4 = this.contents[nindex4]; // this.slideIndex = nindex2;

              this.slideLeft(ccontent4, 0, Math.abs(this.dragDiffX), this.animate_finished);
              this.slideLeft(ncontent4, this.width * -1, Math.abs(this.dragDiffX), this.animate_finished);
            } else {
              animated = true;
              this.slideLeft(this.contents[cindex4], 0, Math.abs(this.dragDiffX), this.animate_finished);
              this.animate_finished();
            }
          }
        }
      } else {
        var cindex_1 = this.slideIndex;
        var ccontent_1 = this.contents[cindex_1];
        ccontent_1.style.left = '0px';

        if (this.dragDiffX < 0) {
          if (cindex_1 + 1 <= this.contents.length - 1) {
            this.contents[cindex_1 + 1].style.left = this.width;
          }
        } else if (this.dragDiffX > 0) {
          if (cindex_1 - 1 >= 0) {
            this.contents[cindex_1 - 1].style.left = this.width * -1;
          }
        }
      }

      console.log(animated);

      if (this.autoplay && !animated) {
        this.animating_timeout = setTimeout(function () {
          //this.slideIndex = nindex;
          _this6.animate(cindex, nindex);
        }, this.timeout);
      }

      document.removeEventListener('mousemove', this.dragging);
      document.removeEventListener('mouseup', this.dragEnded);
    },
    fullscreenchange: function fullscreenchange() {
      if (document.fullscreenElement == this.$el) {
        this.isFullScreen = true;
      } else {
        this.isFullScreen = false;
      }
    },
    keyup: function keyup(event) {
      if (event.keyCode == 37) {
        //previousslide
        this.previousSlide();
      } else if (event.keyCode == 39) {
        //nextslide
        this.nextSlide();
      }
    },
    init: function init() {
      var _this7 = this;

      this.fadeIn(this.contents[0], function () {
        //alert('ok')
        //alert(this.autoplay);
        if (_this7.autoplay) {
          // alert(this.timeout);
          _this7.animating_timeout = setTimeout(function () {
            //  alert('in');
            var cindex = _this7.slideIndex;
            var nindex = cindex + 1 > _this7.contents.length - 1 ? 0 : cindex + 1;
            _this7.slideIndex = nindex;

            _this7.animate(cindex, nindex);
          }, _this7.timeout);
        }
      });
      this.$emit('inited', {
        instance: this
      });
    }
  },
  beforeUpdate: function beforeUpdate() {
    //before update will run also
    if (this.$slots["default"] && this.$slots["default"].length > 0) {
      var me = this;
      this.$nextTick(function () {
        var contents = me.$el.querySelectorAll('.content'); //console.log('length',contents.length);

        [].forEach.call(contents, function (elem) {
          //console.log(elem.getAttribute('data-init'));
          if (elem.getAttribute('data-init') == null) {
            //console.log('found',elem);
            me.contents.push(elem);
          }
        });
        me.createBackgrounds();
        me.resizeBackgrounds();
      }); //this.createBackgrounds();
      //this.resizeBackgrounds();
    }
  },
  mounted: function mounted() {
    var _this8 = this;

    //this.$el.style.cssText = 'position:relative';
    this.parent = this.$el.querySelector('div:first-child');
    this.parent.style.cssText = 'position:relative;overflow:hidden';
    var children = this.$el.querySelectorAll('.content');
    [].forEach.call(children, function (elem) {
      _this8.contents.push(elem);
    });
    this.createGhost();
    this.createBackgrounds();
    this.setupBackgrounds();
    this.createDragHandler();
    window.addEventListener('resize', this.resized);
    window.addEventListener('fullscreenchange', this.fullscreenchange);
    this.$el.addEventListener('keyup', this.keyup);
    this.resized(); //this.fadeIn(this.contents[0]);
  },
  destroy: function destroy() {
    window.removeEventListener('resize', this.resized);
    window.removeEventListener('fullscreenchange', this.fullscreenchange);
  }
});
// CONCATENATED MODULE: ./vue-slideshow.vue?vue&type=script&lang=js&
 /* harmony default export */ var vue_slideshowvue_type_script_lang_js_ = (lib_vue_loader_options_vue_slideshowvue_type_script_lang_js_); 
// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./vue-slideshow.vue





/* normalize component */

var component = normalizeComponent(
  vue_slideshowvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_slideshow = (component.exports);
// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vue_slideshow);



/***/ }),

/***/ "35f2":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "360b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var trim = __webpack_require__("4079").trim;
var whitespaces = __webpack_require__("b808");

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "3964":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("985e");
var global = __webpack_require__("55f2");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "3ac0":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");
var classof = __webpack_require__("2901");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "3bae":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("2901");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "4079":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("e527");
var whitespaces = __webpack_require__("b808");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "4323":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "443e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var isObject = __webpack_require__("e556");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "458f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("243a");
var toLength = __webpack_require__("2fd0");
var toAbsoluteIndex = __webpack_require__("ed09");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "49e1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var createNonEnumerableProperty = __webpack_require__("a1fa");
var has = __webpack_require__("aa74");
var setGlobal = __webpack_require__("8668");
var inspectSource = __webpack_require__("8999");
var InternalStateModule = __webpack_require__("58c7");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "5117":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("a971");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "55f2":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("01e3")))

/***/ }),

/***/ "58af":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "58c7":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("dd12");
var global = __webpack_require__("55f2");
var isObject = __webpack_require__("e556");
var createNonEnumerableProperty = __webpack_require__("a1fa");
var objectHas = __webpack_require__("aa74");
var sharedKey = __webpack_require__("128e");
var hiddenKeys = __webpack_require__("8065");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "5f5d":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("49e1");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "6611":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var setGlobal = __webpack_require__("8668");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "6769":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("e22f");
var anObject = __webpack_require__("58af");
var toObject = __webpack_require__("cb70");
var toLength = __webpack_require__("2fd0");
var toInteger = __webpack_require__("4323");
var requireObjectCoercible = __webpack_require__("e527");
var advanceStringIndex = __webpack_require__("19cb");
var regExpExec = __webpack_require__("edfb");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "6c26":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "6efa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("017d");
var forEach = __webpack_require__("26a7");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "7d35":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("ca18");
var IndexedObject = __webpack_require__("3ac0");
var toObject = __webpack_require__("cb70");
var toLength = __webpack_require__("2fd0");
var arraySpeciesCreate = __webpack_require__("15a3");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "7ff3":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("3964");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "8065":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "8668":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var createNonEnumerableProperty = __webpack_require__("a1fa");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "866c":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var IE8_DOM_DEFINE = __webpack_require__("e650");
var anObject = __webpack_require__("58af");
var toPrimitive = __webpack_require__("16c3");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "87b1":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "8999":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("6611");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "9267":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "985e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");

module.exports = global;


/***/ }),

/***/ "a11f":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("017d");
var global = __webpack_require__("55f2");
var userAgent = __webpack_require__("7ff3");

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ "a162":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("b7f5");
var enumBugKeys = __webpack_require__("6c26");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "a1fa":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var definePropertyModule = __webpack_require__("866c");
var createPropertyDescriptor = __webpack_require__("a7ed");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "a7ed":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "a971":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "aa74":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "ab38":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("dd4c");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "b148":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "b198":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "b7f5":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("aa74");
var toIndexedObject = __webpack_require__("243a");
var indexOf = __webpack_require__("458f").indexOf;
var hiddenKeys = __webpack_require__("8065");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "b808":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "bb03":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("58af");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "c4e1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var trim = __webpack_require__("4079").trim;
var whitespaces = __webpack_require__("b808");

var $parseFloat = global.parseFloat;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ "c78a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "ca18":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("b148");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "cb70":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("e527");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "d266":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var propertyIsEnumerableModule = __webpack_require__("c78a");
var createPropertyDescriptor = __webpack_require__("a7ed");
var toIndexedObject = __webpack_require__("243a");
var toPrimitive = __webpack_require__("16c3");
var has = __webpack_require__("aa74");
var IE8_DOM_DEFINE = __webpack_require__("e650");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "da6b":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("aa74");
var ownKeys = __webpack_require__("fad0");
var getOwnPropertyDescriptorModule = __webpack_require__("d266");
var definePropertyModule = __webpack_require__("866c");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "dd12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var inspectSource = __webpack_require__("8999");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "dd4c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "e22f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("0f9f");
var redefine = __webpack_require__("49e1");
var fails = __webpack_require__("dd4c");
var wellKnownSymbol = __webpack_require__("1730");
var regexpExec = __webpack_require__("f8c5");
var createNonEnumerableProperty = __webpack_require__("a1fa");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "e36a":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("017d");
var parseFloatImplementation = __webpack_require__("c4e1");

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});


/***/ }),

/***/ "e527":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "e556":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "e650":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var fails = __webpack_require__("dd4c");
var createElement = __webpack_require__("443e");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "eb90":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("35f2");
var store = __webpack_require__("6611");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "ed09":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4323");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "edfb":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("2901");
var regexpExec = __webpack_require__("f8c5");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "f8c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("bb03");
var stickyHelpers = __webpack_require__("281c");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "fad0":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("3964");
var getOwnPropertyNamesModule = __webpack_require__("a162");
var getOwnPropertySymbolsModule = __webpack_require__("0d63");
var anObject = __webpack_require__("58af");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-slideshow.umd.js.map