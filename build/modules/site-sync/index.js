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

// vendor-external:react
var require_react = __commonJS({
  "vendor-external:react"(exports, module) {
    module.exports = window.React;
  }
});

// package-external:@wordpress/api-fetch
var require_api_fetch = __commonJS({
  "package-external:@wordpress/api-fetch"(exports, module) {
    module.exports = window.wp.apiFetch;
  }
});

// ../../js-packages/script-data/src/utils.ts
function getScriptData() {
  return window.JetpackScriptData;
}

// packages/site-sync/build-module/hooks/use-sync-status.mjs
var import_i18n = __toESM(require_i18n(), 1);
var import_react = __toESM(require_react(), 1);

// packages/site-sync/build-module/api/fetch-sync-status.mjs
var import_api_fetch = __toESM(require_api_fetch(), 1);

// packages/site-sync/build-module/constants.mjs
var POLL_INTERVAL = 3e3;
var MAX_POLL_FAILURES = 3;
var SYNC_STATUS_PATH = "/jetpack/v4/sync/status";
var FULL_SYNC_PATH = "/jetpack/v4/sync/full-sync";
var ANALYTICS_SYNC_MODULE = "woocommerce_analytics";

// packages/site-sync/build-module/api/fetch-sync-status.mjs
function fetchSyncStatus() {
  return (0, import_api_fetch.default)({ path: SYNC_STATUS_PATH });
}

// packages/site-sync/build-module/api/trigger-full-sync.mjs
var import_api_fetch2 = __toESM(require_api_fetch(), 1);
function triggerFullSync() {
  return (0, import_api_fetch2.default)({ path: FULL_SYNC_PATH, method: "POST" });
}

// packages/site-sync/build-module/status.mjs
function toSyncStatus(raw, milestone) {
  const started = Boolean(raw.started);
  const finished = Boolean(raw.finished);
  const bucket = raw.progress?.[ANALYTICS_SYNC_MODULE];
  const total = bucket?.total ?? 0;
  const sent = bucket?.sent ?? 0;
  let percentage = 0;
  if (total > 0) {
    percentage = Math.min(100, Math.floor(sent / total * 100));
  } else if (milestone > 0) {
    percentage = 100;
  }
  return {
    isStarted: started,
    isRunning: started && !finished,
    percentage,
    initialFullSyncFinished: milestone
  };
}
function isSyncComplete(status) {
  return status.percentage >= 100 && status.initialFullSyncFinished > 0;
}
function isSyncStalled(status) {
  return status.isStarted && !status.isRunning && !isSyncComplete(status);
}

// packages/site-sync/build-module/hooks/use-sync-status.mjs
function readMilestone() {
  return getScriptData()?.premium_analytics?.initial_full_sync_finished ?? 0;
}
function useSyncStatus() {
  const milestoneRef = (0, import_react.useRef)(readMilestone());
  const [data, setData] = (0, import_react.useState)();
  const [error, setError] = (0, import_react.useState)(null);
  const [isStalled, setIsStalled] = (0, import_react.useState)(false);
  const intervalRef = (0, import_react.useRef)(null);
  const failureCountRef = (0, import_react.useRef)(0);
  const pollRef = (0, import_react.useRef)();
  const clearPolling = (0, import_react.useCallback)(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  const poll = (0, import_react.useCallback)(() => {
    fetchSyncStatus().then((raw) => {
      const live = raw.initial_full_sync_finished ?? 0;
      if (live > milestoneRef.current) {
        milestoneRef.current = live;
      }
      const status = toSyncStatus(raw, milestoneRef.current);
      failureCountRef.current = 0;
      setData(status);
      setError(null);
      setIsStalled(false);
      if (isSyncComplete(status)) {
        clearPolling();
        return;
      }
      if (isSyncStalled(status)) {
        clearPolling();
        setIsStalled(true);
        setError(
          new Error((0, import_i18n.__)("Sync has stalled. Please try again.", "jetpack-premium-analytics"))
        );
      }
    }).catch((e) => {
      const message = e instanceof Error ? e.message : (0, import_i18n.__)("Unable to get sync status.", "jetpack-premium-analytics");
      failureCountRef.current += 1;
      if (failureCountRef.current >= MAX_POLL_FAILURES) {
        clearPolling();
      }
      setError(new Error(message));
    });
  }, [clearPolling]);
  pollRef.current = poll;
  const startPolling = (0, import_react.useCallback)(() => {
    clearPolling();
    failureCountRef.current = 0;
    intervalRef.current = setInterval(() => {
      pollRef.current?.();
    }, POLL_INTERVAL);
  }, [clearPolling]);
  const triggerSync = (0, import_react.useCallback)(async () => {
    clearPolling();
    setError(null);
    setIsStalled(false);
    try {
      await triggerFullSync();
      poll();
      startPolling();
    } catch (e) {
      const message = e instanceof Error ? e.message : (0, import_i18n.__)("Unable to start sync.", "jetpack-premium-analytics");
      setError(new Error(message));
    }
  }, [clearPolling, poll, startPolling]);
  (0, import_react.useEffect)(() => {
    if (milestoneRef.current > 0) {
      setData(toSyncStatus({}, milestoneRef.current));
      return;
    }
    poll();
    startPolling();
    return clearPolling;
  }, [poll, startPolling, clearPolling]);
  const isComplete = data ? isSyncComplete(data) : false;
  const isLoading = !data && !error;
  return { data, error, isLoading, isComplete, isStalled, triggerSync };
}
export {
  useSyncStatus
};
//# sourceMappingURL=index.js.map
