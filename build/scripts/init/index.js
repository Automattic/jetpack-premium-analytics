(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // package-external:@wordpress/api-fetch
  var require_api_fetch = __commonJS({
    "package-external:@wordpress/api-fetch"(exports, module) {
      module.exports = window.wp.apiFetch;
    }
  });

  // package-external:@wordpress/data
  var require_data = __commonJS({
    "package-external:@wordpress/data"(exports, module) {
      module.exports = window.wp.data;
    }
  });

  // package-external:@wordpress/primitives
  var require_primitives = __commonJS({
    "package-external:@wordpress/primitives"(exports, module) {
      module.exports = window.wp.primitives;
    }
  });

  // vendor-external:react/jsx-runtime
  var require_jsx_runtime = __commonJS({
    "vendor-external:react/jsx-runtime"(exports, module) {
      module.exports = window.ReactJSXRuntime;
    }
  });

  // ../../js-packages/script-data/src/utils.ts
  function getScriptData() {
    return window.JetpackScriptData;
  }

  // packages/init/build-module/index.mjs
  var import_api_fetch = __toESM(require_api_fetch(), 1);
  var import_boot = __require("@wordpress/boot");
  var import_data = __toESM(require_data(), 1);

  // ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/chart-bar.mjs
  var import_primitives = __toESM(require_primitives(), 1);
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var chart_bar_default = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_primitives.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_primitives.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M11.25 5h1.5v15h-1.5V5zM6 10h1.5v10H6V10zm12 4h-1.5v6H18v-6z" }) });

  // packages/init/build-module/index.mjs
  var authConfigured = false;
  function setupApiFetch() {
    if (authConfigured) {
      return;
    }
    const site = getScriptData()?.site;
    if (site?.rest_root) {
      import_api_fetch.default.use(import_api_fetch.default.createRootURLMiddleware(site.rest_root));
    }
    if (site?.rest_nonce) {
      import_api_fetch.default.use(import_api_fetch.default.createNonceMiddleware(site.rest_nonce));
    }
    if (site?.rest_root || site?.rest_nonce) {
      authConfigured = true;
    }
  }
  async function init() {
    setupApiFetch();
    (0, import_data.dispatch)(import_boot.store).updateMenuItem("dashboard", {
      icon: chart_bar_default
    });
  }
})();
//# sourceMappingURL=index.js.map
