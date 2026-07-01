var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
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

// package-external:@wordpress/i18n
var require_i18n = __commonJS({
  "package-external:@wordpress/i18n"(exports, module) {
    module.exports = window.wp.i18n;
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

// widgets/top-posts/widget.ts
var import_i18n = __toESM(require_i18n(), 1);

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/icons/build-module/library/chart-bar.mjs
var import_primitives = __toESM(require_primitives(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var chart_bar_default = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_primitives.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_primitives.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M11.25 5h1.5v15h-1.5V5zM6 10h1.5v10H6V10zm12 4h-1.5v6H18v-6z" }) });

// widgets/top-posts/widget.ts
var widget_default = {
  name: "jpa/stats-top-posts",
  title: (0, import_i18n.__)("Top pages by views", "jetpack-premium-analytics"),
  icon: chart_bar_default,
  attributes: [
    {
      id: "range",
      label: (0, import_i18n.__)("Date range", "jetpack-premium-analytics"),
      type: "text",
      elements: [
        { label: (0, import_i18n.__)("Today", "jetpack-premium-analytics"), value: "today" },
        { label: (0, import_i18n.__)("Last 7 days", "jetpack-premium-analytics"), value: "last-7-days" },
        { label: (0, import_i18n.__)("Last 30 days", "jetpack-premium-analytics"), value: "last-30-days" },
        { label: (0, import_i18n.__)("Last year", "jetpack-premium-analytics"), value: "last-year" }
      ]
    },
    {
      id: "num",
      label: (0, import_i18n.__)("Number of results", "jetpack-premium-analytics"),
      type: "integer"
    },
    {
      id: "postType",
      label: (0, import_i18n.__)("Post type", "jetpack-premium-analytics"),
      type: "text",
      elements: [
        { label: (0, import_i18n.__)("All", "jetpack-premium-analytics"), value: "" },
        { label: (0, import_i18n.__)("Posts", "jetpack-premium-analytics"), value: "post" },
        { label: (0, import_i18n.__)("Pages", "jetpack-premium-analytics"), value: "page" }
      ]
    }
  ],
  example: {
    attributes: {
      range: "last-7-days",
      num: 10
    }
  }
};
export {
  widget_default as default
};
