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

// package-external:@wordpress/core-data
var require_core_data = __commonJS({
  "package-external:@wordpress/core-data"(exports, module) {
    module.exports = window.wp.coreData;
  }
});

// package-external:@wordpress/data
var require_data = __commonJS({
  "package-external:@wordpress/data"(exports, module) {
    module.exports = window.wp.data;
  }
});

// package-external:@wordpress/i18n
var require_i18n = __commonJS({
  "package-external:@wordpress/i18n"(exports, module) {
    module.exports = window.wp.i18n;
  }
});

// ../../js-packages/script-data/src/utils.ts
function getScriptData() {
  return window.JetpackScriptData;
}

// routes/dashboard/route.ts
var import_core_data = __toESM(require_core_data());
var import_data = __toESM(require_data());
var import_i18n = __toESM(require_i18n());
import { redirect } from "@wordpress/route";

// routes/dashboard/hooks/constants.ts
var DASHBOARD_REST_NAMESPACE = "jetpack/v4";

// routes/dashboard/route.ts
var route = {
  beforeLoad: () => {
    const connectionStatus = getScriptData()?.connection?.connectionStatus;
    if (!connectionStatus?.isRegistered) {
      throw redirect({ to: "/connect" });
    }
    const syncFinished = getScriptData()?.premium_analytics?.initial_full_sync_finished ?? 0;
    if (!syncFinished) {
      throw redirect({ to: "/syncing" });
    }
    const coreSelect = (0, import_data.select)(import_core_data.store);
    if (coreSelect.getEntityConfig("root", "widgetModule")) {
      return;
    }
    const coreDispatch = (0, import_data.dispatch)(import_core_data.store);
    coreDispatch.addEntities([
      {
        name: "widgetModule",
        kind: "root",
        key: "name",
        baseURL: `/${DASHBOARD_REST_NAMESPACE}/widget-modules`,
        plural: "widgetModules",
        label: (0, import_i18n.__)("Widget modules", "jetpack-premium-analytics"),
        supportsPagination: false
      }
    ]);
  }
};
export {
  route
};
