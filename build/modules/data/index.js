var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e2) {
    throw err = [e2], e2;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e2) {
    throw mod = 0, e2;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable;
var init_subscribable = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/subscribable.js"() {
    Subscribable = class {
      constructor() {
        this.listeners = /* @__PURE__ */ new Set();
        this.subscribe = this.subscribe.bind(this);
      }
      subscribe(listener) {
        this.listeners.add(listener);
        this.onSubscribe();
        return () => {
          this.listeners.delete(listener);
          this.onUnsubscribe();
        };
      }
      hasListeners() {
        return this.listeners.size > 0;
      }
      onSubscribe() {
      }
      onUnsubscribe() {
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/timeoutManager.js
function systemSetTimeoutZero(callback) {
  setTimeout(callback, 0);
}
var defaultTimeoutProvider, TimeoutManager, timeoutManager;
var init_timeoutManager = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/timeoutManager.js"() {
    defaultTimeoutProvider = {
      // We need the wrapper function syntax below instead of direct references to
      // global setTimeout etc.
      //
      // BAD: `setTimeout: setTimeout`
      // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
      //
      // If we use direct references here, then anything that wants to spy on or
      // replace the global setTimeout (like tests) won't work since we'll already
      // have a hard reference to the original implementation at the time when this
      // file was imported.
      setTimeout: (callback, delay) => setTimeout(callback, delay),
      clearTimeout: (timeoutId) => clearTimeout(timeoutId),
      setInterval: (callback, delay) => setInterval(callback, delay),
      clearInterval: (intervalId) => clearInterval(intervalId)
    };
    TimeoutManager = class {
      // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
      // type at app boot; and if we leave that type, then any new timer provider
      // would need to support ReturnType<typeof setTimeout>, which is infeasible.
      //
      // We settle for type safety for the TimeoutProvider type, and accept that
      // this class is unsafe internally to allow for extension.
      #provider = defaultTimeoutProvider;
      #providerCalled = false;
      setTimeoutProvider(provider) {
        if (true) {
          if (this.#providerCalled && provider !== this.#provider) {
            console.error(
              `[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.`,
              { previous: this.#provider, provider }
            );
          }
        }
        this.#provider = provider;
        if (true) {
          this.#providerCalled = false;
        }
      }
      setTimeout(callback, delay) {
        if (true) {
          this.#providerCalled = true;
        }
        return this.#provider.setTimeout(callback, delay);
      }
      clearTimeout(timeoutId) {
        this.#provider.clearTimeout(timeoutId);
      }
      setInterval(callback, delay) {
        if (true) {
          this.#providerCalled = true;
        }
        return this.#provider.setInterval(callback, delay);
      }
      clearInterval(intervalId) {
        this.#provider.clearInterval(intervalId);
      }
    };
    timeoutManager = new TimeoutManager();
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/utils.js
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive2 = query.isActive();
    if (type === "active" && !isActive2) {
      return false;
    }
    if (type === "inactive" && isActive2) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a2, b) {
  if (a2 === b) {
    return true;
  }
  if (typeof a2 !== typeof b) {
    return false;
  }
  if (a2 && b && typeof a2 === "object" && typeof b === "object") {
    return Object.keys(b).every((key) => partialMatchKey(a2[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a2, b) {
  if (a2 === b) {
    return a2;
  }
  const array = isPlainArray(a2) && isPlainArray(b);
  if (!array && !(isPlainObject(a2) && isPlainObject(b))) return b;
  const aItems = array ? a2 : Object.keys(a2);
  const aSize = aItems.length;
  const bItems = array ? b : Object.keys(b);
  const bSize = bItems.length;
  const copy2 = array ? new Array(bSize) : {};
  let equalItems = 0;
  for (let i2 = 0; i2 < bSize; i2++) {
    const key = array ? i2 : bItems[i2];
    const aItem = a2[key];
    const bItem = b[key];
    if (aItem === bItem) {
      copy2[key] = aItem;
      if (array ? i2 < aSize : hasOwn.call(a2, key)) equalItems++;
      continue;
    }
    if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
      copy2[key] = bItem;
      continue;
    }
    const v = replaceEqualDeep(aItem, bItem);
    copy2[key] = v;
    if (v === aItem) equalItems++;
  }
  return aSize === bSize && equalItems === aSize ? a2 : copy2;
}
function shallowEqualObjects(a2, b) {
  if (!b || Object.keys(a2).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a2) {
    if (a2[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o2) {
  if (!hasObjectPrototype(o2)) {
    return false;
  }
  const ctor = o2.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o2) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o2) {
  return Object.prototype.toString.call(o2) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    timeoutManager.setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (true) {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
        throw error;
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max2 = 0) {
  const newItems = [...items, item];
  return max2 && newItems.length > max2 ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max2 = 0) {
  const newItems = [item, ...items];
  return max2 && newItems.length > max2 ? newItems.slice(0, -1) : newItems;
}
function ensureQueryFn(options, fetchOptions) {
  if (true) {
    if (options.queryFn === skipToken) {
      console.error(
        `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
      );
    }
  }
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
  if (typeof throwOnError === "function") {
    return throwOnError(...params);
  }
  return !!throwOnError;
}
var isServer, hasOwn, skipToken;
var init_utils = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/utils.js"() {
    init_timeoutManager();
    isServer = typeof window === "undefined" || "Deno" in globalThis;
    hasOwn = Object.prototype.hasOwnProperty;
    skipToken = /* @__PURE__ */ Symbol();
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/focusManager.js
var FocusManager, focusManager;
var init_focusManager = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/focusManager.js"() {
    init_subscribable();
    init_utils();
    FocusManager = class extends Subscribable {
      #focused;
      #cleanup;
      #setup;
      constructor() {
        super();
        this.#setup = (onFocus) => {
          if (!isServer && window.addEventListener) {
            const listener = () => onFocus();
            window.addEventListener("visibilitychange", listener, false);
            return () => {
              window.removeEventListener("visibilitychange", listener);
            };
          }
          return;
        };
      }
      onSubscribe() {
        if (!this.#cleanup) {
          this.setEventListener(this.#setup);
        }
      }
      onUnsubscribe() {
        if (!this.hasListeners()) {
          this.#cleanup?.();
          this.#cleanup = void 0;
        }
      }
      setEventListener(setup) {
        this.#setup = setup;
        this.#cleanup?.();
        this.#cleanup = setup((focused) => {
          if (typeof focused === "boolean") {
            this.setFocused(focused);
          } else {
            this.onFocus();
          }
        });
      }
      setFocused(focused) {
        const changed = this.#focused !== focused;
        if (changed) {
          this.#focused = focused;
          this.onFocus();
        }
      }
      onFocus() {
        const isFocused = this.isFocused();
        this.listeners.forEach((listener) => {
          listener(isFocused);
        });
      }
      isFocused() {
        if (typeof this.#focused === "boolean") {
          return this.#focused;
        }
        return globalThis.document?.visibilityState !== "hidden";
      }
    };
    focusManager = new FocusManager();
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}
var init_thenable = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/thenable.js"() {
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/notifyManager.js
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var defaultScheduler, notifyManager;
var init_notifyManager = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/notifyManager.js"() {
    init_timeoutManager();
    defaultScheduler = systemSetTimeoutZero;
    notifyManager = createNotifyManager();
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/onlineManager.js
var OnlineManager, onlineManager;
var init_onlineManager = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/onlineManager.js"() {
    init_subscribable();
    init_utils();
    OnlineManager = class extends Subscribable {
      #online = true;
      #cleanup;
      #setup;
      constructor() {
        super();
        this.#setup = (onOnline) => {
          if (!isServer && window.addEventListener) {
            const onlineListener = () => onOnline(true);
            const offlineListener = () => onOnline(false);
            window.addEventListener("online", onlineListener, false);
            window.addEventListener("offline", offlineListener, false);
            return () => {
              window.removeEventListener("online", onlineListener);
              window.removeEventListener("offline", offlineListener);
            };
          }
          return;
        };
      }
      onSubscribe() {
        if (!this.#cleanup) {
          this.setEventListener(this.#setup);
        }
      }
      onUnsubscribe() {
        if (!this.hasListeners()) {
          this.#cleanup?.();
          this.#cleanup = void 0;
        }
      }
      setEventListener(setup) {
        this.#setup = setup;
        this.#cleanup?.();
        this.#cleanup = setup(this.setOnline.bind(this));
      }
      setOnline(online) {
        const changed = this.#online !== online;
        if (changed) {
          this.#online = online;
          this.listeners.forEach((listener) => {
            listener(online);
          });
        }
      }
      isOnline() {
        return this.#online;
      }
    };
    onlineManager = new OnlineManager();
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let continueFn;
  const thenable = pendingThenable();
  const isResolved = () => thenable.status !== "pending";
  const cancel = (cancelOptions) => {
    if (!isResolved()) {
      const error = new CancelledError(cancelOptions);
      reject(error);
      config.onCancel?.(error);
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved()) {
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved()) {
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved() || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved()) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved()) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved()) {
        return;
      }
      const retry = config.retry ?? (isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    status: () => thenable.status,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}
var CancelledError;
var init_retryer = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/retryer.js"() {
    init_focusManager();
    init_onlineManager();
    init_thenable();
    init_utils();
    CancelledError = class extends Error {
      constructor(options) {
        super("CancelledError");
        this.revert = options?.revert;
        this.silent = options?.silent;
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/removable.js
var Removable;
var init_removable = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/removable.js"() {
    init_timeoutManager();
    init_utils();
    Removable = class {
      #gcTimeout;
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout();
        if (isValidTimeout(this.gcTime)) {
          this.#gcTimeout = timeoutManager.setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime);
        }
      }
      updateGcTime(newGcTime) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
        );
      }
      clearGcTimeout() {
        if (this.#gcTimeout) {
          timeoutManager.clearTimeout(this.#gcTimeout);
          this.#gcTimeout = void 0;
        }
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/query.js
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function successState(data, dataUpdatedAt) {
  return {
    data,
    dataUpdatedAt: dataUpdatedAt ?? Date.now(),
    error: null,
    isInvalidated: false,
    status: "success"
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var Query;
var init_query = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/query.js"() {
    init_utils();
    init_notifyManager();
    init_retryer();
    init_removable();
    Query = class extends Removable {
      #initialState;
      #revertState;
      #cache;
      #client;
      #retryer;
      #defaultOptions;
      #abortSignalConsumed;
      constructor(config) {
        super();
        this.#abortSignalConsumed = false;
        this.#defaultOptions = config.defaultOptions;
        this.setOptions(config.options);
        this.observers = [];
        this.#client = config.client;
        this.#cache = this.#client.getQueryCache();
        this.queryKey = config.queryKey;
        this.queryHash = config.queryHash;
        this.#initialState = getDefaultState(this.options);
        this.state = config.state ?? this.#initialState;
        this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        return this.#retryer?.promise;
      }
      setOptions(options) {
        this.options = { ...this.#defaultOptions, ...options };
        this.updateGcTime(this.options.gcTime);
        if (this.state && this.state.data === void 0) {
          const defaultState = getDefaultState(this.options);
          if (defaultState.data !== void 0) {
            this.setState(
              successState(defaultState.data, defaultState.dataUpdatedAt)
            );
            this.#initialState = defaultState;
          }
        }
      }
      optionalRemove() {
        if (!this.observers.length && this.state.fetchStatus === "idle") {
          this.#cache.remove(this);
        }
      }
      setData(newData, options) {
        const data = replaceData(this.state.data, newData, this.options);
        this.#dispatch({
          data,
          type: "success",
          dataUpdatedAt: options?.updatedAt,
          manual: options?.manual
        });
        return data;
      }
      setState(state, setStateOptions) {
        this.#dispatch({ type: "setState", state, setStateOptions });
      }
      cancel(options) {
        const promise = this.#retryer?.promise;
        this.#retryer?.cancel(options);
        return promise ? promise.then(noop).catch(noop) : Promise.resolve();
      }
      destroy() {
        super.destroy();
        this.cancel({ silent: true });
      }
      reset() {
        this.destroy();
        this.setState(this.#initialState);
      }
      isActive() {
        return this.observers.some(
          (observer) => resolveEnabled(observer.options.enabled, this) !== false
        );
      }
      isDisabled() {
        if (this.getObserversCount() > 0) {
          return !this.isActive();
        }
        return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStatic() {
        if (this.getObserversCount() > 0) {
          return this.observers.some(
            (observer) => resolveStaleTime(observer.options.staleTime, this) === "static"
          );
        }
        return false;
      }
      isStale() {
        if (this.getObserversCount() > 0) {
          return this.observers.some(
            (observer) => observer.getCurrentResult().isStale
          );
        }
        return this.state.data === void 0 || this.state.isInvalidated;
      }
      isStaleByTime(staleTime = 0) {
        if (this.state.data === void 0) {
          return true;
        }
        if (staleTime === "static") {
          return false;
        }
        if (this.state.isInvalidated) {
          return true;
        }
        return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
      }
      onFocus() {
        const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
        observer?.refetch({ cancelRefetch: false });
        this.#retryer?.continue();
      }
      onOnline() {
        const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
        observer?.refetch({ cancelRefetch: false });
        this.#retryer?.continue();
      }
      addObserver(observer) {
        if (!this.observers.includes(observer)) {
          this.observers.push(observer);
          this.clearGcTimeout();
          this.#cache.notify({ type: "observerAdded", query: this, observer });
        }
      }
      removeObserver(observer) {
        if (this.observers.includes(observer)) {
          this.observers = this.observers.filter((x) => x !== observer);
          if (!this.observers.length) {
            if (this.#retryer) {
              if (this.#abortSignalConsumed) {
                this.#retryer.cancel({ revert: true });
              } else {
                this.#retryer.cancelRetry();
              }
            }
            this.scheduleGc();
          }
          this.#cache.notify({ type: "observerRemoved", query: this, observer });
        }
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        if (!this.state.isInvalidated) {
          this.#dispatch({ type: "invalidate" });
        }
      }
      async fetch(options, fetchOptions) {
        if (this.state.fetchStatus !== "idle" && // If the promise in the retyer is already rejected, we have to definitely
        // re-start the fetch; there is a chance that the query is still in a
        // pending state when that happens
        this.#retryer?.status() !== "rejected") {
          if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
            this.cancel({ silent: true });
          } else if (this.#retryer) {
            this.#retryer.continueRetry();
            return this.#retryer.promise;
          }
        }
        if (options) {
          this.setOptions(options);
        }
        if (!this.options.queryFn) {
          const observer = this.observers.find((x) => x.options.queryFn);
          if (observer) {
            this.setOptions(observer.options);
          }
        }
        if (true) {
          if (!Array.isArray(this.options.queryKey)) {
            console.error(
              `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
            );
          }
        }
        const abortController = new AbortController();
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              this.#abortSignalConsumed = true;
              return abortController.signal;
            }
          });
        };
        const fetchFn = () => {
          const queryFn = ensureQueryFn(this.options, fetchOptions);
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: this.#client,
              queryKey: this.queryKey,
              meta: this.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          this.#abortSignalConsumed = false;
          if (this.options.persister) {
            return this.options.persister(
              queryFn,
              queryFnContext,
              this
            );
          }
          return queryFn(queryFnContext);
        };
        const createFetchContext = () => {
          const context2 = {
            fetchOptions,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#client,
            state: this.state,
            fetchFn
          };
          addSignalProperty(context2);
          return context2;
        };
        const context = createFetchContext();
        this.options.behavior?.onFetch(context, this);
        this.#revertState = this.state;
        if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
          this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
        }
        this.#retryer = createRetryer({
          initialPromise: fetchOptions?.initialPromise,
          fn: context.fetchFn,
          onCancel: (error) => {
            if (error instanceof CancelledError && error.revert) {
              this.setState({
                ...this.#revertState,
                fetchStatus: "idle"
              });
            }
            abortController.abort();
          },
          onFail: (failureCount, error) => {
            this.#dispatch({ type: "failed", failureCount, error });
          },
          onPause: () => {
            this.#dispatch({ type: "pause" });
          },
          onContinue: () => {
            this.#dispatch({ type: "continue" });
          },
          retry: context.options.retry,
          retryDelay: context.options.retryDelay,
          networkMode: context.options.networkMode,
          canRun: () => true
        });
        try {
          const data = await this.#retryer.start();
          if (data === void 0) {
            if (true) {
              console.error(
                `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
              );
            }
            throw new Error(`${this.queryHash} data is undefined`);
          }
          this.setData(data);
          this.#cache.config.onSuccess?.(data, this);
          this.#cache.config.onSettled?.(
            data,
            this.state.error,
            this
          );
          return data;
        } catch (error) {
          if (error instanceof CancelledError) {
            if (error.silent) {
              return this.#retryer.promise;
            } else if (error.revert) {
              if (this.state.data === void 0) {
                throw error;
              }
              return this.state.data;
            }
          }
          this.#dispatch({
            type: "error",
            error
          });
          this.#cache.config.onError?.(
            error,
            this
          );
          this.#cache.config.onSettled?.(
            this.state.data,
            error,
            this
          );
          throw error;
        } finally {
          this.scheduleGc();
        }
      }
      #dispatch(action) {
        const reducer = (state) => {
          switch (action.type) {
            case "failed":
              return {
                ...state,
                fetchFailureCount: action.failureCount,
                fetchFailureReason: action.error
              };
            case "pause":
              return {
                ...state,
                fetchStatus: "paused"
              };
            case "continue":
              return {
                ...state,
                fetchStatus: "fetching"
              };
            case "fetch":
              return {
                ...state,
                ...fetchState(state.data, this.options),
                fetchMeta: action.meta ?? null
              };
            case "success":
              const newState = {
                ...state,
                ...successState(action.data, action.dataUpdatedAt),
                dataUpdateCount: state.dataUpdateCount + 1,
                ...!action.manual && {
                  fetchStatus: "idle",
                  fetchFailureCount: 0,
                  fetchFailureReason: null
                }
              };
              this.#revertState = action.manual ? newState : void 0;
              return newState;
            case "error":
              const error = action.error;
              return {
                ...state,
                error,
                errorUpdateCount: state.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: state.fetchFailureCount + 1,
                fetchFailureReason: error,
                fetchStatus: "idle",
                status: "error"
              };
            case "invalidate":
              return {
                ...state,
                isInvalidated: true
              };
            case "setState":
              return {
                ...state,
                ...action.state
              };
          }
        };
        this.state = reducer(this.state);
        notifyManager.batch(() => {
          this.observers.forEach((observer) => {
            observer.onQueryUpdate();
          });
          this.#cache.notify({ query: this, type: "updated", action });
        });
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/queryObserver.js
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var QueryObserver;
var init_queryObserver = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/queryObserver.js"() {
    init_focusManager();
    init_notifyManager();
    init_query();
    init_subscribable();
    init_thenable();
    init_utils();
    init_timeoutManager();
    QueryObserver = class extends Subscribable {
      constructor(client, options) {
        super();
        this.options = options;
        this.#client = client;
        this.#selectError = null;
        this.#currentThenable = pendingThenable();
        this.bindMethods();
        this.setOptions(options);
      }
      #client;
      #currentQuery = void 0;
      #currentQueryInitialState = void 0;
      #currentResult = void 0;
      #currentResultState;
      #currentResultOptions;
      #currentThenable;
      #selectError;
      #selectFn;
      #selectResult;
      // This property keeps track of the last query with defined data.
      // It will be used to pass the previous data and query to the placeholder function between renders.
      #lastQueryWithDefinedData;
      #staleTimeoutId;
      #refetchIntervalId;
      #currentRefetchInterval;
      #trackedProps = /* @__PURE__ */ new Set();
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        if (this.listeners.size === 1) {
          this.#currentQuery.addObserver(this);
          if (shouldFetchOnMount(this.#currentQuery, this.options)) {
            this.#executeFetch();
          } else {
            this.updateResult();
          }
          this.#updateTimers();
        }
      }
      onUnsubscribe() {
        if (!this.hasListeners()) {
          this.destroy();
        }
      }
      shouldFetchOnReconnect() {
        return shouldFetchOn(
          this.#currentQuery,
          this.options,
          this.options.refetchOnReconnect
        );
      }
      shouldFetchOnWindowFocus() {
        return shouldFetchOn(
          this.#currentQuery,
          this.options,
          this.options.refetchOnWindowFocus
        );
      }
      destroy() {
        this.listeners = /* @__PURE__ */ new Set();
        this.#clearStaleTimeout();
        this.#clearRefetchInterval();
        this.#currentQuery.removeObserver(this);
      }
      setOptions(options) {
        const prevOptions = this.options;
        const prevQuery = this.#currentQuery;
        this.options = this.#client.defaultQueryOptions(options);
        if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, this.#currentQuery) !== "boolean") {
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean"
          );
        }
        this.#updateQuery();
        this.#currentQuery.setOptions(this.options);
        if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
          this.#client.getQueryCache().notify({
            type: "observerOptionsUpdated",
            query: this.#currentQuery,
            observer: this
          });
        }
        const mounted = this.hasListeners();
        if (mounted && shouldFetchOptionally(
          this.#currentQuery,
          prevQuery,
          this.options,
          prevOptions
        )) {
          this.#executeFetch();
        }
        this.updateResult();
        if (mounted && (this.#currentQuery !== prevQuery || resolveEnabled(this.options.enabled, this.#currentQuery) !== resolveEnabled(prevOptions.enabled, this.#currentQuery) || resolveStaleTime(this.options.staleTime, this.#currentQuery) !== resolveStaleTime(prevOptions.staleTime, this.#currentQuery))) {
          this.#updateStaleTimeout();
        }
        const nextRefetchInterval = this.#computeRefetchInterval();
        if (mounted && (this.#currentQuery !== prevQuery || resolveEnabled(this.options.enabled, this.#currentQuery) !== resolveEnabled(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
          this.#updateRefetchInterval(nextRefetchInterval);
        }
      }
      getOptimisticResult(options) {
        const query = this.#client.getQueryCache().build(this.#client, options);
        const result = this.createResult(query, options);
        if (shouldAssignObserverCurrentProperties(this, result)) {
          this.#currentResult = result;
          this.#currentResultOptions = this.options;
          this.#currentResultState = this.#currentQuery.state;
        }
        return result;
      }
      getCurrentResult() {
        return this.#currentResult;
      }
      trackResult(result, onPropTracked) {
        return new Proxy(result, {
          get: (target, key) => {
            this.trackProp(key);
            onPropTracked?.(key);
            if (key === "promise") {
              this.trackProp("data");
              if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") {
                this.#currentThenable.reject(
                  new Error(
                    "experimental_prefetchInRender feature flag is not enabled"
                  )
                );
              }
            }
            return Reflect.get(target, key);
          }
        });
      }
      trackProp(key) {
        this.#trackedProps.add(key);
      }
      getCurrentQuery() {
        return this.#currentQuery;
      }
      refetch({ ...options } = {}) {
        return this.fetch({
          ...options
        });
      }
      fetchOptimistic(options) {
        const defaultedOptions = this.#client.defaultQueryOptions(options);
        const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
        return query.fetch().then(() => this.createResult(query, defaultedOptions));
      }
      fetch(fetchOptions) {
        return this.#executeFetch({
          ...fetchOptions,
          cancelRefetch: fetchOptions.cancelRefetch ?? true
        }).then(() => {
          this.updateResult();
          return this.#currentResult;
        });
      }
      #executeFetch(fetchOptions) {
        this.#updateQuery();
        let promise = this.#currentQuery.fetch(
          this.options,
          fetchOptions
        );
        if (!fetchOptions?.throwOnError) {
          promise = promise.catch(noop);
        }
        return promise;
      }
      #updateStaleTimeout() {
        this.#clearStaleTimeout();
        const staleTime = resolveStaleTime(
          this.options.staleTime,
          this.#currentQuery
        );
        if (isServer || this.#currentResult.isStale || !isValidTimeout(staleTime)) {
          return;
        }
        const time = timeUntilStale(this.#currentResult.dataUpdatedAt, staleTime);
        const timeout = time + 1;
        this.#staleTimeoutId = timeoutManager.setTimeout(() => {
          if (!this.#currentResult.isStale) {
            this.updateResult();
          }
        }, timeout);
      }
      #computeRefetchInterval() {
        return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
      }
      #updateRefetchInterval(nextInterval) {
        this.#clearRefetchInterval();
        this.#currentRefetchInterval = nextInterval;
        if (isServer || resolveEnabled(this.options.enabled, this.#currentQuery) === false || !isValidTimeout(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
          return;
        }
        this.#refetchIntervalId = timeoutManager.setInterval(() => {
          if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
            this.#executeFetch();
          }
        }, this.#currentRefetchInterval);
      }
      #updateTimers() {
        this.#updateStaleTimeout();
        this.#updateRefetchInterval(this.#computeRefetchInterval());
      }
      #clearStaleTimeout() {
        if (this.#staleTimeoutId) {
          timeoutManager.clearTimeout(this.#staleTimeoutId);
          this.#staleTimeoutId = void 0;
        }
      }
      #clearRefetchInterval() {
        if (this.#refetchIntervalId) {
          timeoutManager.clearInterval(this.#refetchIntervalId);
          this.#refetchIntervalId = void 0;
        }
      }
      createResult(query, options) {
        const prevQuery = this.#currentQuery;
        const prevOptions = this.options;
        const prevResult = this.#currentResult;
        const prevResultState = this.#currentResultState;
        const prevResultOptions = this.#currentResultOptions;
        const queryChange = query !== prevQuery;
        const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
        const { state } = query;
        let newState = { ...state };
        let isPlaceholderData = false;
        let data;
        if (options._optimisticResults) {
          const mounted = this.hasListeners();
          const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
          const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
          if (fetchOnMount || fetchOptionally) {
            newState = {
              ...newState,
              ...fetchState(state.data, query.options)
            };
          }
          if (options._optimisticResults === "isRestoring") {
            newState.fetchStatus = "idle";
          }
        }
        let { error, errorUpdatedAt, status } = newState;
        data = newState.data;
        let skipSelect = false;
        if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
          let placeholderData;
          if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
            placeholderData = prevResult.data;
            skipSelect = true;
          } else {
            placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
              this.#lastQueryWithDefinedData?.state.data,
              this.#lastQueryWithDefinedData
            ) : options.placeholderData;
          }
          if (placeholderData !== void 0) {
            status = "success";
            data = replaceData(
              prevResult?.data,
              placeholderData,
              options
            );
            isPlaceholderData = true;
          }
        }
        if (options.select && data !== void 0 && !skipSelect) {
          if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
            data = this.#selectResult;
          } else {
            try {
              this.#selectFn = options.select;
              data = options.select(data);
              data = replaceData(prevResult?.data, data, options);
              this.#selectResult = data;
              this.#selectError = null;
            } catch (selectError) {
              this.#selectError = selectError;
            }
          }
        }
        if (this.#selectError) {
          error = this.#selectError;
          data = this.#selectResult;
          errorUpdatedAt = Date.now();
          status = "error";
        }
        const isFetching = newState.fetchStatus === "fetching";
        const isPending = status === "pending";
        const isError2 = status === "error";
        const isLoading = isPending && isFetching;
        const hasData = data !== void 0;
        const result = {
          status,
          fetchStatus: newState.fetchStatus,
          isPending,
          isSuccess: status === "success",
          isError: isError2,
          isInitialLoading: isLoading,
          isLoading,
          data,
          dataUpdatedAt: newState.dataUpdatedAt,
          error,
          errorUpdatedAt,
          failureCount: newState.fetchFailureCount,
          failureReason: newState.fetchFailureReason,
          errorUpdateCount: newState.errorUpdateCount,
          isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
          isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
          isFetching,
          isRefetching: isFetching && !isPending,
          isLoadingError: isError2 && !hasData,
          isPaused: newState.fetchStatus === "paused",
          isPlaceholderData,
          isRefetchError: isError2 && hasData,
          isStale: isStale(query, options),
          refetch: this.refetch,
          promise: this.#currentThenable,
          isEnabled: resolveEnabled(options.enabled, query) !== false
        };
        const nextResult = result;
        if (this.options.experimental_prefetchInRender) {
          const finalizeThenableIfPossible = (thenable) => {
            if (nextResult.status === "error") {
              thenable.reject(nextResult.error);
            } else if (nextResult.data !== void 0) {
              thenable.resolve(nextResult.data);
            }
          };
          const recreateThenable = () => {
            const pending = this.#currentThenable = nextResult.promise = pendingThenable();
            finalizeThenableIfPossible(pending);
          };
          const prevThenable = this.#currentThenable;
          switch (prevThenable.status) {
            case "pending":
              if (query.queryHash === prevQuery.queryHash) {
                finalizeThenableIfPossible(prevThenable);
              }
              break;
            case "fulfilled":
              if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
                recreateThenable();
              }
              break;
            case "rejected":
              if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
                recreateThenable();
              }
              break;
          }
        }
        return nextResult;
      }
      updateResult() {
        const prevResult = this.#currentResult;
        const nextResult = this.createResult(this.#currentQuery, this.options);
        this.#currentResultState = this.#currentQuery.state;
        this.#currentResultOptions = this.options;
        if (this.#currentResultState.data !== void 0) {
          this.#lastQueryWithDefinedData = this.#currentQuery;
        }
        if (shallowEqualObjects(nextResult, prevResult)) {
          return;
        }
        this.#currentResult = nextResult;
        const shouldNotifyListeners = () => {
          if (!prevResult) {
            return true;
          }
          const { notifyOnChangeProps } = this.options;
          const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
          if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
            return true;
          }
          const includedProps = new Set(
            notifyOnChangePropsValue ?? this.#trackedProps
          );
          if (this.options.throwOnError) {
            includedProps.add("error");
          }
          return Object.keys(this.#currentResult).some((key) => {
            const typedKey = key;
            const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
            return changed && includedProps.has(typedKey);
          });
        };
        this.#notify({ listeners: shouldNotifyListeners() });
      }
      #updateQuery() {
        const query = this.#client.getQueryCache().build(this.#client, this.options);
        if (query === this.#currentQuery) {
          return;
        }
        const prevQuery = this.#currentQuery;
        this.#currentQuery = query;
        this.#currentQueryInitialState = query.state;
        if (this.hasListeners()) {
          prevQuery?.removeObserver(this);
          query.addObserver(this);
        }
      }
      onQueryUpdate() {
        this.updateResult();
        if (this.hasListeners()) {
          this.#updateTimers();
        }
      }
      #notify(notifyOptions) {
        notifyManager.batch(() => {
          if (notifyOptions.listeners) {
            this.listeners.forEach((listener) => {
              listener(this.#currentResult);
            });
          }
          this.#client.getQueryCache().notify({
            query: this.#currentQuery,
            type: "observerResultsUpdated"
          });
        });
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = ensureQueryFn(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          const page = await queryFn(queryFnContext);
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
var init_infiniteQueryBehavior = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js"() {
    init_utils();
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/mutation.js
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var Mutation;
var init_mutation = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/mutation.js"() {
    init_notifyManager();
    init_removable();
    init_retryer();
    Mutation = class extends Removable {
      #client;
      #observers;
      #mutationCache;
      #retryer;
      constructor(config) {
        super();
        this.#client = config.client;
        this.mutationId = config.mutationId;
        this.#mutationCache = config.mutationCache;
        this.#observers = [];
        this.state = config.state || getDefaultState2();
        this.setOptions(config.options);
        this.scheduleGc();
      }
      setOptions(options) {
        this.options = options;
        this.updateGcTime(this.options.gcTime);
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(observer) {
        if (!this.#observers.includes(observer)) {
          this.#observers.push(observer);
          this.clearGcTimeout();
          this.#mutationCache.notify({
            type: "observerAdded",
            mutation: this,
            observer
          });
        }
      }
      removeObserver(observer) {
        this.#observers = this.#observers.filter((x) => x !== observer);
        this.scheduleGc();
        this.#mutationCache.notify({
          type: "observerRemoved",
          mutation: this,
          observer
        });
      }
      optionalRemove() {
        if (!this.#observers.length) {
          if (this.state.status === "pending") {
            this.scheduleGc();
          } else {
            this.#mutationCache.remove(this);
          }
        }
      }
      continue() {
        return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
        this.execute(this.state.variables);
      }
      async execute(variables) {
        const onContinue = () => {
          this.#dispatch({ type: "continue" });
        };
        const mutationFnContext = {
          client: this.#client,
          meta: this.options.meta,
          mutationKey: this.options.mutationKey
        };
        this.#retryer = createRetryer({
          fn: () => {
            if (!this.options.mutationFn) {
              return Promise.reject(new Error("No mutationFn found"));
            }
            return this.options.mutationFn(variables, mutationFnContext);
          },
          onFail: (failureCount, error) => {
            this.#dispatch({ type: "failed", failureCount, error });
          },
          onPause: () => {
            this.#dispatch({ type: "pause" });
          },
          onContinue,
          retry: this.options.retry ?? 0,
          retryDelay: this.options.retryDelay,
          networkMode: this.options.networkMode,
          canRun: () => this.#mutationCache.canRun(this)
        });
        const restored = this.state.status === "pending";
        const isPaused = !this.#retryer.canStart();
        try {
          if (restored) {
            onContinue();
          } else {
            this.#dispatch({ type: "pending", variables, isPaused });
            await this.#mutationCache.config.onMutate?.(
              variables,
              this,
              mutationFnContext
            );
            const context = await this.options.onMutate?.(
              variables,
              mutationFnContext
            );
            if (context !== this.state.context) {
              this.#dispatch({
                type: "pending",
                context,
                variables,
                isPaused
              });
            }
          }
          const data = await this.#retryer.start();
          await this.#mutationCache.config.onSuccess?.(
            data,
            variables,
            this.state.context,
            this,
            mutationFnContext
          );
          await this.options.onSuccess?.(
            data,
            variables,
            this.state.context,
            mutationFnContext
          );
          await this.#mutationCache.config.onSettled?.(
            data,
            null,
            this.state.variables,
            this.state.context,
            this,
            mutationFnContext
          );
          await this.options.onSettled?.(
            data,
            null,
            variables,
            this.state.context,
            mutationFnContext
          );
          this.#dispatch({ type: "success", data });
          return data;
        } catch (error) {
          try {
            await this.#mutationCache.config.onError?.(
              error,
              variables,
              this.state.context,
              this,
              mutationFnContext
            );
            await this.options.onError?.(
              error,
              variables,
              this.state.context,
              mutationFnContext
            );
            await this.#mutationCache.config.onSettled?.(
              void 0,
              error,
              this.state.variables,
              this.state.context,
              this,
              mutationFnContext
            );
            await this.options.onSettled?.(
              void 0,
              error,
              variables,
              this.state.context,
              mutationFnContext
            );
            throw error;
          } finally {
            this.#dispatch({ type: "error", error });
          }
        } finally {
          this.#mutationCache.runNext(this);
        }
      }
      #dispatch(action) {
        const reducer = (state) => {
          switch (action.type) {
            case "failed":
              return {
                ...state,
                failureCount: action.failureCount,
                failureReason: action.error
              };
            case "pause":
              return {
                ...state,
                isPaused: true
              };
            case "continue":
              return {
                ...state,
                isPaused: false
              };
            case "pending":
              return {
                ...state,
                context: action.context,
                data: void 0,
                failureCount: 0,
                failureReason: null,
                error: null,
                isPaused: action.isPaused,
                status: "pending",
                variables: action.variables,
                submittedAt: Date.now()
              };
            case "success":
              return {
                ...state,
                data: action.data,
                failureCount: 0,
                failureReason: null,
                error: null,
                status: "success",
                isPaused: false
              };
            case "error":
              return {
                ...state,
                data: void 0,
                error: action.error,
                failureCount: state.failureCount + 1,
                failureReason: action.error,
                isPaused: false,
                status: "error"
              };
          }
        };
        this.state = reducer(this.state);
        notifyManager.batch(() => {
          this.#observers.forEach((observer) => {
            observer.onMutationUpdate(action);
          });
          this.#mutationCache.notify({
            mutation: this,
            type: "updated",
            action
          });
        });
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/mutationCache.js
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}
var MutationCache;
var init_mutationCache = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/mutationCache.js"() {
    init_notifyManager();
    init_mutation();
    init_utils();
    init_subscribable();
    MutationCache = class extends Subscribable {
      constructor(config = {}) {
        super();
        this.config = config;
        this.#mutations = /* @__PURE__ */ new Set();
        this.#scopes = /* @__PURE__ */ new Map();
        this.#mutationId = 0;
      }
      #mutations;
      #scopes;
      #mutationId;
      build(client, options, state) {
        const mutation = new Mutation({
          client,
          mutationCache: this,
          mutationId: ++this.#mutationId,
          options: client.defaultMutationOptions(options),
          state
        });
        this.add(mutation);
        return mutation;
      }
      add(mutation) {
        this.#mutations.add(mutation);
        const scope = scopeFor(mutation);
        if (typeof scope === "string") {
          const scopedMutations = this.#scopes.get(scope);
          if (scopedMutations) {
            scopedMutations.push(mutation);
          } else {
            this.#scopes.set(scope, [mutation]);
          }
        }
        this.notify({ type: "added", mutation });
      }
      remove(mutation) {
        if (this.#mutations.delete(mutation)) {
          const scope = scopeFor(mutation);
          if (typeof scope === "string") {
            const scopedMutations = this.#scopes.get(scope);
            if (scopedMutations) {
              if (scopedMutations.length > 1) {
                const index = scopedMutations.indexOf(mutation);
                if (index !== -1) {
                  scopedMutations.splice(index, 1);
                }
              } else if (scopedMutations[0] === mutation) {
                this.#scopes.delete(scope);
              }
            }
          }
        }
        this.notify({ type: "removed", mutation });
      }
      canRun(mutation) {
        const scope = scopeFor(mutation);
        if (typeof scope === "string") {
          const mutationsWithSameScope = this.#scopes.get(scope);
          const firstPendingMutation = mutationsWithSameScope?.find(
            (m) => m.state.status === "pending"
          );
          return !firstPendingMutation || firstPendingMutation === mutation;
        } else {
          return true;
        }
      }
      runNext(mutation) {
        const scope = scopeFor(mutation);
        if (typeof scope === "string") {
          const foundMutation = this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused);
          return foundMutation?.continue() ?? Promise.resolve();
        } else {
          return Promise.resolve();
        }
      }
      clear() {
        notifyManager.batch(() => {
          this.#mutations.forEach((mutation) => {
            this.notify({ type: "removed", mutation });
          });
          this.#mutations.clear();
          this.#scopes.clear();
        });
      }
      getAll() {
        return Array.from(this.#mutations);
      }
      find(filters) {
        const defaultedFilters = { exact: true, ...filters };
        return this.getAll().find(
          (mutation) => matchMutation(defaultedFilters, mutation)
        );
      }
      findAll(filters = {}) {
        return this.getAll().filter((mutation) => matchMutation(filters, mutation));
      }
      notify(event) {
        notifyManager.batch(() => {
          this.listeners.forEach((listener) => {
            listener(event);
          });
        });
      }
      resumePausedMutations() {
        const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
        return notifyManager.batch(
          () => Promise.all(
            pausedMutations.map((mutation) => mutation.continue().catch(noop))
          )
        );
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/queryCache.js
var QueryCache;
var init_queryCache = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/queryCache.js"() {
    init_utils();
    init_query();
    init_notifyManager();
    init_subscribable();
    QueryCache = class extends Subscribable {
      constructor(config = {}) {
        super();
        this.config = config;
        this.#queries = /* @__PURE__ */ new Map();
      }
      #queries;
      build(client, options, state) {
        const queryKey = options.queryKey;
        const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
        let query = this.get(queryHash);
        if (!query) {
          query = new Query({
            client,
            queryKey,
            queryHash,
            options: client.defaultQueryOptions(options),
            state,
            defaultOptions: client.getQueryDefaults(queryKey)
          });
          this.add(query);
        }
        return query;
      }
      add(query) {
        if (!this.#queries.has(query.queryHash)) {
          this.#queries.set(query.queryHash, query);
          this.notify({
            type: "added",
            query
          });
        }
      }
      remove(query) {
        const queryInMap = this.#queries.get(query.queryHash);
        if (queryInMap) {
          query.destroy();
          if (queryInMap === query) {
            this.#queries.delete(query.queryHash);
          }
          this.notify({ type: "removed", query });
        }
      }
      clear() {
        notifyManager.batch(() => {
          this.getAll().forEach((query) => {
            this.remove(query);
          });
        });
      }
      get(queryHash) {
        return this.#queries.get(queryHash);
      }
      getAll() {
        return [...this.#queries.values()];
      }
      find(filters) {
        const defaultedFilters = { exact: true, ...filters };
        return this.getAll().find(
          (query) => matchQuery(defaultedFilters, query)
        );
      }
      findAll(filters = {}) {
        const queries = this.getAll();
        return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
      }
      notify(event) {
        notifyManager.batch(() => {
          this.listeners.forEach((listener) => {
            listener(event);
          });
        });
      }
      onFocus() {
        notifyManager.batch(() => {
          this.getAll().forEach((query) => {
            query.onFocus();
          });
        });
      }
      onOnline() {
        notifyManager.batch(() => {
          this.getAll().forEach((query) => {
            query.onOnline();
          });
        });
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/queryClient.js
var QueryClient;
var init_queryClient = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/queryClient.js"() {
    init_utils();
    init_queryCache();
    init_mutationCache();
    init_focusManager();
    init_onlineManager();
    init_notifyManager();
    init_infiniteQueryBehavior();
    QueryClient = class {
      #queryCache;
      #mutationCache;
      #defaultOptions;
      #queryDefaults;
      #mutationDefaults;
      #mountCount;
      #unsubscribeFocus;
      #unsubscribeOnline;
      constructor(config = {}) {
        this.#queryCache = config.queryCache || new QueryCache();
        this.#mutationCache = config.mutationCache || new MutationCache();
        this.#defaultOptions = config.defaultOptions || {};
        this.#queryDefaults = /* @__PURE__ */ new Map();
        this.#mutationDefaults = /* @__PURE__ */ new Map();
        this.#mountCount = 0;
      }
      mount() {
        this.#mountCount++;
        if (this.#mountCount !== 1) return;
        this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
          if (focused) {
            await this.resumePausedMutations();
            this.#queryCache.onFocus();
          }
        });
        this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
          if (online) {
            await this.resumePausedMutations();
            this.#queryCache.onOnline();
          }
        });
      }
      unmount() {
        this.#mountCount--;
        if (this.#mountCount !== 0) return;
        this.#unsubscribeFocus?.();
        this.#unsubscribeFocus = void 0;
        this.#unsubscribeOnline?.();
        this.#unsubscribeOnline = void 0;
      }
      isFetching(filters) {
        return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
      }
      isMutating(filters) {
        return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
      }
      /**
       * Imperative (non-reactive) way to retrieve data for a QueryKey.
       * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
       *
       * Hint: Do not use this function inside a component, because it won't receive updates.
       * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
       */
      getQueryData(queryKey) {
        const options = this.defaultQueryOptions({ queryKey });
        return this.#queryCache.get(options.queryHash)?.state.data;
      }
      ensureQueryData(options) {
        const defaultedOptions = this.defaultQueryOptions(options);
        const query = this.#queryCache.build(this, defaultedOptions);
        const cachedData = query.state.data;
        if (cachedData === void 0) {
          return this.fetchQuery(options);
        }
        if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
          void this.prefetchQuery(defaultedOptions);
        }
        return Promise.resolve(cachedData);
      }
      getQueriesData(filters) {
        return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
          const data = state.data;
          return [queryKey, data];
        });
      }
      setQueryData(queryKey, updater, options) {
        const defaultedOptions = this.defaultQueryOptions({ queryKey });
        const query = this.#queryCache.get(
          defaultedOptions.queryHash
        );
        const prevData = query?.state.data;
        const data = functionalUpdate(updater, prevData);
        if (data === void 0) {
          return void 0;
        }
        return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
      }
      setQueriesData(filters, updater, options) {
        return notifyManager.batch(
          () => this.#queryCache.findAll(filters).map(({ queryKey }) => [
            queryKey,
            this.setQueryData(queryKey, updater, options)
          ])
        );
      }
      getQueryState(queryKey) {
        const options = this.defaultQueryOptions({ queryKey });
        return this.#queryCache.get(
          options.queryHash
        )?.state;
      }
      removeQueries(filters) {
        const queryCache2 = this.#queryCache;
        notifyManager.batch(() => {
          queryCache2.findAll(filters).forEach((query) => {
            queryCache2.remove(query);
          });
        });
      }
      resetQueries(filters, options) {
        const queryCache2 = this.#queryCache;
        return notifyManager.batch(() => {
          queryCache2.findAll(filters).forEach((query) => {
            query.reset();
          });
          return this.refetchQueries(
            {
              type: "active",
              ...filters
            },
            options
          );
        });
      }
      cancelQueries(filters, cancelOptions = {}) {
        const defaultedCancelOptions = { revert: true, ...cancelOptions };
        const promises = notifyManager.batch(
          () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
        );
        return Promise.all(promises).then(noop).catch(noop);
      }
      invalidateQueries(filters, options = {}) {
        return notifyManager.batch(() => {
          this.#queryCache.findAll(filters).forEach((query) => {
            query.invalidate();
          });
          if (filters?.refetchType === "none") {
            return Promise.resolve();
          }
          return this.refetchQueries(
            {
              ...filters,
              type: filters?.refetchType ?? filters?.type ?? "active"
            },
            options
          );
        });
      }
      refetchQueries(filters, options = {}) {
        const fetchOptions = {
          ...options,
          cancelRefetch: options.cancelRefetch ?? true
        };
        const promises = notifyManager.batch(
          () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
            let promise = query.fetch(void 0, fetchOptions);
            if (!fetchOptions.throwOnError) {
              promise = promise.catch(noop);
            }
            return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
          })
        );
        return Promise.all(promises).then(noop);
      }
      fetchQuery(options) {
        const defaultedOptions = this.defaultQueryOptions(options);
        if (defaultedOptions.retry === void 0) {
          defaultedOptions.retry = false;
        }
        const query = this.#queryCache.build(this, defaultedOptions);
        return query.isStaleByTime(
          resolveStaleTime(defaultedOptions.staleTime, query)
        ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
      }
      prefetchQuery(options) {
        return this.fetchQuery(options).then(noop).catch(noop);
      }
      fetchInfiniteQuery(options) {
        options.behavior = infiniteQueryBehavior(options.pages);
        return this.fetchQuery(options);
      }
      prefetchInfiniteQuery(options) {
        return this.fetchInfiniteQuery(options).then(noop).catch(noop);
      }
      ensureInfiniteQueryData(options) {
        options.behavior = infiniteQueryBehavior(options.pages);
        return this.ensureQueryData(options);
      }
      resumePausedMutations() {
        if (onlineManager.isOnline()) {
          return this.#mutationCache.resumePausedMutations();
        }
        return Promise.resolve();
      }
      getQueryCache() {
        return this.#queryCache;
      }
      getMutationCache() {
        return this.#mutationCache;
      }
      getDefaultOptions() {
        return this.#defaultOptions;
      }
      setDefaultOptions(options) {
        this.#defaultOptions = options;
      }
      setQueryDefaults(queryKey, options) {
        this.#queryDefaults.set(hashKey(queryKey), {
          queryKey,
          defaultOptions: options
        });
      }
      getQueryDefaults(queryKey) {
        const defaults = [...this.#queryDefaults.values()];
        const result = {};
        defaults.forEach((queryDefault) => {
          if (partialMatchKey(queryKey, queryDefault.queryKey)) {
            Object.assign(result, queryDefault.defaultOptions);
          }
        });
        return result;
      }
      setMutationDefaults(mutationKey, options) {
        this.#mutationDefaults.set(hashKey(mutationKey), {
          mutationKey,
          defaultOptions: options
        });
      }
      getMutationDefaults(mutationKey) {
        const defaults = [...this.#mutationDefaults.values()];
        const result = {};
        defaults.forEach((queryDefault) => {
          if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
            Object.assign(result, queryDefault.defaultOptions);
          }
        });
        return result;
      }
      defaultQueryOptions(options) {
        if (options._defaulted) {
          return options;
        }
        const defaultedOptions = {
          ...this.#defaultOptions.queries,
          ...this.getQueryDefaults(options.queryKey),
          ...options,
          _defaulted: true
        };
        if (!defaultedOptions.queryHash) {
          defaultedOptions.queryHash = hashQueryKeyByOptions(
            defaultedOptions.queryKey,
            defaultedOptions
          );
        }
        if (defaultedOptions.refetchOnReconnect === void 0) {
          defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
        }
        if (defaultedOptions.throwOnError === void 0) {
          defaultedOptions.throwOnError = !!defaultedOptions.suspense;
        }
        if (!defaultedOptions.networkMode && defaultedOptions.persister) {
          defaultedOptions.networkMode = "offlineFirst";
        }
        if (defaultedOptions.queryFn === skipToken) {
          defaultedOptions.enabled = false;
        }
        return defaultedOptions;
      }
      defaultMutationOptions(options) {
        if (options?._defaulted) {
          return options;
        }
        return {
          ...this.#defaultOptions.mutations,
          ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
          ...options,
          _defaulted: true
        };
      }
      clear() {
        this.#queryCache.clear();
        this.#mutationCache.clear();
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/types.js
var init_types = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/types.js"() {
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/index.js
var init_modern = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-core@5.90.8/node_modules/@tanstack/query-core/build/modern/index.js"() {
    init_notifyManager();
    init_onlineManager();
    init_queryCache();
    init_queryClient();
    init_queryObserver();
    init_utils();
    init_types();
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/types.js
var init_types2 = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/types.js"() {
  }
});

// vendor-external:react
var require_react = __commonJS({
  "vendor-external:react"(exports, module) {
    module.exports = window.React;
  }
});

// vendor-external:react/jsx-runtime
var require_jsx_runtime = __commonJS({
  "vendor-external:react/jsx-runtime"(exports, module) {
    module.exports = window.ReactJSXRuntime;
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var React, import_jsx_runtime, QueryClientContext, useQueryClient, QueryClientProvider;
var init_QueryClientProvider = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js"() {
    "use client";
    React = __toESM(require_react(), 1);
    import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
    QueryClientContext = React.createContext(
      void 0
    );
    useQueryClient = (queryClient2) => {
      const client = React.useContext(QueryClientContext);
      if (queryClient2) {
        return queryClient2;
      }
      if (!client) {
        throw new Error("No QueryClient set, use QueryClientProvider to set one");
      }
      return client;
    };
    QueryClientProvider = ({
      client,
      children: children2
    }) => {
      React.useEffect(() => {
        client.mount();
        return () => {
          client.unmount();
        };
      }, [client]);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientContext.Provider, { value: client, children: children2 });
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js
var React2, IsRestoringContext, useIsRestoring, IsRestoringProvider;
var init_IsRestoringProvider = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js"() {
    "use client";
    React2 = __toESM(require_react(), 1);
    IsRestoringContext = React2.createContext(false);
    useIsRestoring = () => React2.useContext(IsRestoringContext);
    IsRestoringProvider = IsRestoringContext.Provider;
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var React3, import_jsx_runtime2, QueryErrorResetBoundaryContext, useQueryErrorResetBoundary;
var init_QueryErrorResetBoundary = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js"() {
    "use client";
    React3 = __toESM(require_react(), 1);
    import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
    QueryErrorResetBoundaryContext = React3.createContext(createValue());
    useQueryErrorResetBoundary = () => React3.useContext(QueryErrorResetBoundaryContext);
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js
var React4, ensurePreventErrorBoundaryRetry, useClearResetErrorBoundary, getHasError;
var init_errorBoundaryUtils = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js"() {
    "use client";
    React4 = __toESM(require_react(), 1);
    init_modern();
    ensurePreventErrorBoundaryRetry = (options, errorResetBoundary) => {
      if (options.suspense || options.throwOnError || options.experimental_prefetchInRender) {
        if (!errorResetBoundary.isReset()) {
          options.retryOnMount = false;
        }
      }
    };
    useClearResetErrorBoundary = (errorResetBoundary) => {
      React4.useEffect(() => {
        errorResetBoundary.clearReset();
      }, [errorResetBoundary]);
    };
    getHasError = ({
      result,
      errorResetBoundary,
      throwOnError,
      query,
      suspense
    }) => {
      return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/suspense.js
var ensureSuspenseTimers, willFetch, shouldSuspend, fetchOptimistic;
var init_suspense = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/suspense.js"() {
    ensureSuspenseTimers = (defaultedOptions) => {
      if (defaultedOptions.suspense) {
        const MIN_SUSPENSE_TIME_MS = 1e3;
        const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
        const originalStaleTime = defaultedOptions.staleTime;
        defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
        if (typeof defaultedOptions.gcTime === "number") {
          defaultedOptions.gcTime = Math.max(
            defaultedOptions.gcTime,
            MIN_SUSPENSE_TIME_MS
          );
        }
      }
    };
    willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
    shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
    fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
      errorResetBoundary.clearReset();
    });
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
function useBaseQuery(options, Observer, queryClient2) {
  if (true) {
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new Error(
        'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
      );
    }
  }
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient(queryClient2);
  const defaultedOptions = client.defaultQueryOptions(options);
  client.getDefaultOptions().queries?._experimental_beforeQuery?.(
    defaultedOptions
  );
  if (true) {
    if (!defaultedOptions.queryFn) {
      console.error(
        `[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`
      );
    }
  }
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = React5.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  React5.useSyncExternalStore(
    React5.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  React5.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query: client.getQueryCache().get(defaultedOptions.queryHash),
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  ;
  client.getDefaultOptions().queries?._experimental_afterQuery?.(
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !isServer && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      client.getQueryCache().get(defaultedOptions.queryHash)?.promise
    );
    promise?.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
var React5;
var init_useBaseQuery = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/useBaseQuery.js"() {
    "use client";
    React5 = __toESM(require_react(), 1);
    init_modern();
    init_QueryClientProvider();
    init_QueryErrorResetBoundary();
    init_errorBoundaryUtils();
    init_IsRestoringProvider();
    init_suspense();
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/useQuery.js
function useQuery(options, queryClient2) {
  return useBaseQuery(options, QueryObserver, queryClient2);
}
var init_useQuery = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/useQuery.js"() {
    "use client";
    init_modern();
    init_useBaseQuery();
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/index.js
var init_modern2 = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query@5.90.8_react@18.3.1/node_modules/@tanstack/react-query/build/modern/index.js"() {
    init_modern();
    init_types2();
    init_useQuery();
    init_QueryClientProvider();
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/chunk/EIDV623S.js
function getContextId(count) {
  const num = String(count), len = num.length - 1;
  return sharedConfig.context.id + (len ? String.fromCharCode(96 + len) : "") + num;
}
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return {
    ...sharedConfig.context,
    id: sharedConfig.getNextContextId(),
    count: 0
  };
}
function createRoot(fn, detachedOwner) {
  const listener = Listener, owner = Owner, unowned = fn.length === 0, current = detachedOwner === void 0 ? owner : detachedOwner, root = unowned ? UNOWNED : {
    owned: null,
    cleanups: null,
    context: current ? current.context : null,
    owner: current
  }, updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
  Owner = root;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createSignal(value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const s2 = {
    value,
    observers: null,
    observerSlots: null,
    comparator: options.equals || void 0
  };
  const setter = (value2) => {
    if (typeof value2 === "function") {
      if (Transition && Transition.running && Transition.sources.has(s2)) value2 = value2(s2.tValue);
      else value2 = value2(s2.value);
    }
    return writeSignal(s2, value2);
  };
  return [readSignal.bind(s2), setter];
}
function createComputed(fn, value, options) {
  const c2 = createComputation(fn, value, true, STALE);
  if (Scheduler && Transition && Transition.running) Updates.push(c2);
  else updateComputation(c2);
}
function createRenderEffect(fn, value, options) {
  const c2 = createComputation(fn, value, false, STALE);
  if (Scheduler && Transition && Transition.running) Updates.push(c2);
  else updateComputation(c2);
}
function createEffect(fn, value, options) {
  runEffects = runUserEffects;
  const c2 = createComputation(fn, value, false, STALE), s2 = SuspenseContext && useContext4(SuspenseContext);
  if (s2) c2.suspense = s2;
  if (!options || !options.render) c2.user = true;
  Effects ? Effects.push(c2) : updateComputation(c2);
}
function createMemo(fn, value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const c2 = createComputation(fn, value, true, 0);
  c2.observers = null;
  c2.observerSlots = null;
  c2.comparator = options.equals || void 0;
  if (Scheduler && Transition && Transition.running) {
    c2.tState = STALE;
    Updates.push(c2);
  } else updateComputation(c2);
  return readSignal.bind(c2);
}
function isPromise(v) {
  return v && typeof v === "object" && "then" in v;
}
function createResource(pSource, pFetcher, pOptions) {
  let source;
  let fetcher;
  let options;
  {
    source = true;
    fetcher = pSource;
    options = {};
  }
  let pr = null, initP = NO_INIT, id = null, loadedUnderTransition = false, scheduled = false, resolved = "initialValue" in options, dynamic = typeof source === "function" && createMemo(source);
  const contexts = /* @__PURE__ */ new Set(), [value, setValue] = (options.storage || createSignal)(options.initialValue), [error, setError] = createSignal(void 0), [track, trigger] = createSignal(void 0, {
    equals: false
  }), [state, setState] = createSignal(resolved ? "ready" : "unresolved");
  if (sharedConfig.context) {
    id = sharedConfig.getNextContextId();
    if (options.ssrLoadFrom === "initial") initP = options.initialValue;
    else if (sharedConfig.load && sharedConfig.has(id)) initP = sharedConfig.load(id);
  }
  function loadEnd(p2, v, error2, key) {
    if (pr === p2) {
      pr = null;
      key !== void 0 && (resolved = true);
      if ((p2 === initP || v === initP) && options.onHydrated) queueMicrotask(() => options.onHydrated(key, {
        value: v
      }));
      initP = NO_INIT;
      if (Transition && p2 && loadedUnderTransition) {
        Transition.promises.delete(p2);
        loadedUnderTransition = false;
        runUpdates(() => {
          Transition.running = true;
          completeLoad(v, error2);
        }, false);
      } else completeLoad(v, error2);
    }
    return v;
  }
  function completeLoad(v, err) {
    runUpdates(() => {
      if (err === void 0) setValue(() => v);
      setState(err !== void 0 ? "errored" : resolved ? "ready" : "unresolved");
      setError(err);
      for (const c2 of contexts.keys()) c2.decrement();
      contexts.clear();
    }, false);
  }
  function read() {
    const c2 = SuspenseContext && useContext4(SuspenseContext), v = value(), err = error();
    if (err !== void 0 && !pr) throw err;
    if (Listener && !Listener.user && c2) {
      createComputed(() => {
        track();
        if (pr) {
          if (c2.resolved && Transition && loadedUnderTransition) Transition.promises.add(pr);
          else if (!contexts.has(c2)) {
            c2.increment();
            contexts.add(c2);
          }
        }
      });
    }
    return v;
  }
  function load(refetching = true) {
    if (refetching !== false && scheduled) return;
    scheduled = false;
    const lookup = dynamic ? dynamic() : source;
    loadedUnderTransition = Transition && Transition.running;
    if (lookup == null || lookup === false) {
      loadEnd(pr, untrack(value));
      return;
    }
    if (Transition && pr) Transition.promises.delete(pr);
    let error2;
    const p2 = initP !== NO_INIT ? initP : untrack(() => {
      try {
        return fetcher(lookup, {
          value: value(),
          refetching
        });
      } catch (fetcherError) {
        error2 = fetcherError;
      }
    });
    if (error2 !== void 0) {
      loadEnd(pr, void 0, castError(error2), lookup);
      return;
    } else if (!isPromise(p2)) {
      loadEnd(pr, p2, void 0, lookup);
      return p2;
    }
    pr = p2;
    if ("v" in p2) {
      if (p2.s === 1) loadEnd(pr, p2.v, void 0, lookup);
      else loadEnd(pr, void 0, castError(p2.v), lookup);
      return p2;
    }
    scheduled = true;
    queueMicrotask(() => scheduled = false);
    runUpdates(() => {
      setState(resolved ? "refreshing" : "pending");
      trigger();
    }, false);
    return p2.then((v) => loadEnd(p2, v, void 0, lookup), (e2) => loadEnd(p2, void 0, castError(e2), lookup));
  }
  Object.defineProperties(read, {
    state: {
      get: () => state()
    },
    error: {
      get: () => error()
    },
    loading: {
      get() {
        const s2 = state();
        return s2 === "pending" || s2 === "refreshing";
      }
    },
    latest: {
      get() {
        if (!resolved) return read();
        const err = error();
        if (err && !pr) throw err;
        return value();
      }
    }
  });
  let owner = Owner;
  if (dynamic) createComputed(() => (owner = Owner, load(false)));
  else load(false);
  return [read, {
    refetch: (info) => runWithOwner(owner, () => load(info)),
    mutate: setValue
  }];
}
function batch(fn) {
  return runUpdates(fn, false);
}
function untrack(fn) {
  if (!ExternalSourceConfig && Listener === null) return fn();
  const listener = Listener;
  Listener = null;
  try {
    if (ExternalSourceConfig) return ExternalSourceConfig.untrack(fn);
    return fn();
  } finally {
    Listener = listener;
  }
}
function on(deps, fn, options) {
  const isArray3 = Array.isArray(deps);
  let prevInput;
  let defer = options && options.defer;
  return (prevValue) => {
    let input;
    if (isArray3) {
      input = Array(deps.length);
      for (let i2 = 0; i2 < deps.length; i2++) input[i2] = deps[i2]();
    } else input = deps();
    if (defer) {
      defer = false;
      return prevValue;
    }
    const result = untrack(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  };
}
function onMount(fn) {
  createEffect(() => untrack(fn));
}
function onCleanup(fn) {
  if (Owner === null) ;
  else if (Owner.cleanups === null) Owner.cleanups = [fn];
  else Owner.cleanups.push(fn);
  return fn;
}
function getOwner() {
  return Owner;
}
function runWithOwner(o2, fn) {
  const prev = Owner;
  const prevListener = Listener;
  Owner = o2;
  Listener = null;
  try {
    return runUpdates(fn, true);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
    Listener = prevListener;
  }
}
function startTransition(fn) {
  if (Transition && Transition.running) {
    fn();
    return Transition.done;
  }
  const l2 = Listener;
  const o2 = Owner;
  return Promise.resolve().then(() => {
    Listener = l2;
    Owner = o2;
    let t2;
    if (Scheduler || SuspenseContext) {
      t2 = Transition || (Transition = {
        sources: /* @__PURE__ */ new Set(),
        effects: [],
        promises: /* @__PURE__ */ new Set(),
        disposed: /* @__PURE__ */ new Set(),
        queue: /* @__PURE__ */ new Set(),
        running: true
      });
      t2.done || (t2.done = new Promise((res) => t2.resolve = res));
      t2.running = true;
    }
    runUpdates(fn, false);
    Listener = Owner = null;
    return t2 ? t2.done : void 0;
  });
}
function useTransition() {
  return [transPending, startTransition];
}
function createContext4(defaultValue, options) {
  const id = /* @__PURE__ */ Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext4(context) {
  let value;
  return Owner && Owner.context && (value = Owner.context[context.id]) !== void 0 ? value : context.defaultValue;
}
function children(fn) {
  const children2 = createMemo(fn);
  const memo2 = createMemo(() => resolveChildren(children2()));
  memo2.toArray = () => {
    const c2 = memo2();
    return Array.isArray(c2) ? c2 : c2 != null ? [c2] : [];
  };
  return memo2;
}
function readSignal() {
  const runningTransition = Transition && Transition.running;
  if (this.sources && (runningTransition ? this.tState : this.state)) {
    if ((runningTransition ? this.tState : this.state) === STALE) updateComputation(this);
    else {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(this), false);
      Updates = updates;
    }
  }
  if (Listener) {
    const sSlot = this.observers ? this.observers.length : 0;
    if (!Listener.sources) {
      Listener.sources = [this];
      Listener.sourceSlots = [sSlot];
    } else {
      Listener.sources.push(this);
      Listener.sourceSlots.push(sSlot);
    }
    if (!this.observers) {
      this.observers = [Listener];
      this.observerSlots = [Listener.sources.length - 1];
    } else {
      this.observers.push(Listener);
      this.observerSlots.push(Listener.sources.length - 1);
    }
  }
  if (runningTransition && Transition.sources.has(this)) return this.tValue;
  return this.value;
}
function writeSignal(node, value, isComp) {
  let current = Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    if (Transition) {
      const TransitionRunning = Transition.running;
      if (TransitionRunning || !isComp && Transition.sources.has(node)) {
        Transition.sources.add(node);
        node.tValue = value;
      }
      if (!TransitionRunning) node.value = value;
    } else node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i2 = 0; i2 < node.observers.length; i2 += 1) {
          const o2 = node.observers[i2];
          const TransitionRunning = Transition && Transition.running;
          if (TransitionRunning && Transition.disposed.has(o2)) continue;
          if (TransitionRunning ? !o2.tState : !o2.state) {
            if (o2.pure) Updates.push(o2);
            else Effects.push(o2);
            if (o2.observers) markDownstream(o2);
          }
          if (!TransitionRunning) o2.state = STALE;
          else o2.tState = STALE;
        }
        if (Updates.length > 1e6) {
          Updates = [];
          if (IS_DEV) ;
          throw new Error();
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn) return;
  cleanNode(node);
  const time = ExecCount;
  runComputation(node, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value, time);
  if (Transition && !Transition.running && Transition.sources.has(node)) {
    queueMicrotask(() => {
      runUpdates(() => {
        Transition && (Transition.running = true);
        Listener = Owner = node;
        runComputation(node, node.tValue, time);
        Listener = Owner = null;
      }, false);
    });
  }
}
function runComputation(node, value, time) {
  let nextValue;
  const owner = Owner, listener = Listener;
  Listener = Owner = node;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      if (Transition && Transition.running) {
        node.tState = STALE;
        node.tOwned && node.tOwned.forEach(cleanNode);
        node.tOwned = void 0;
      } else {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    node.updatedAt = time + 1;
    return handleError(err);
  } finally {
    Listener = listener;
    Owner = owner;
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue, true);
    } else if (Transition && Transition.running && node.pure) {
      Transition.sources.add(node);
      node.tValue = nextValue;
    } else node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init, pure, state = STALE, options) {
  const c2 = {
    fn,
    state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: Owner ? Owner.context : null,
    pure
  };
  if (Transition && Transition.running) {
    c2.state = 0;
    c2.tState = state;
  }
  if (Owner === null) ;
  else if (Owner !== UNOWNED) {
    if (Transition && Transition.running && Owner.pure) {
      if (!Owner.tOwned) Owner.tOwned = [c2];
      else Owner.tOwned.push(c2);
    } else {
      if (!Owner.owned) Owner.owned = [c2];
      else Owner.owned.push(c2);
    }
  }
  if (ExternalSourceConfig && c2.fn) {
    const [track, trigger] = createSignal(void 0, {
      equals: false
    });
    const ordinary = ExternalSourceConfig.factory(c2.fn, trigger);
    onCleanup(() => ordinary.dispose());
    const triggerInTransition = () => startTransition(trigger).then(() => inTransition.dispose());
    const inTransition = ExternalSourceConfig.factory(c2.fn, triggerInTransition);
    c2.fn = (x) => {
      track();
      return Transition && Transition.running ? inTransition.track(x) : ordinary.track(x);
    };
  }
  return c2;
}
function runTop(node) {
  const runningTransition = Transition && Transition.running;
  if ((runningTransition ? node.tState : node.state) === 0) return;
  if ((runningTransition ? node.tState : node.state) === PENDING) return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (runningTransition && Transition.disposed.has(node)) return;
    if (runningTransition ? node.tState : node.state) ancestors.push(node);
  }
  for (let i2 = ancestors.length - 1; i2 >= 0; i2--) {
    node = ancestors[i2];
    if (runningTransition) {
      let top = node, prev = ancestors[i2 + 1];
      while ((top = top.owner) && top !== prev) {
        if (Transition.disposed.has(top)) return;
      }
    }
    if ((runningTransition ? node.tState : node.state) === STALE) {
      updateComputation(node);
    } else if ((runningTransition ? node.tState : node.state) === PENDING) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates) return fn();
  let wait = false;
  if (!init) Updates = [];
  if (Effects) wait = true;
  else Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait) Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    if (Scheduler && Transition && Transition.running) scheduleQueue(Updates);
    else runQueue(Updates);
    Updates = null;
  }
  if (wait) return;
  let res;
  if (Transition) {
    if (!Transition.promises.size && !Transition.queue.size) {
      const sources = Transition.sources;
      const disposed = Transition.disposed;
      Effects.push.apply(Effects, Transition.effects);
      res = Transition.resolve;
      for (const e22 of Effects) {
        "tState" in e22 && (e22.state = e22.tState);
        delete e22.tState;
      }
      Transition = null;
      runUpdates(() => {
        for (const d of disposed) cleanNode(d);
        for (const v of sources) {
          v.value = v.tValue;
          if (v.owned) {
            for (let i2 = 0, len = v.owned.length; i2 < len; i2++) cleanNode(v.owned[i2]);
          }
          if (v.tOwned) v.owned = v.tOwned;
          delete v.tValue;
          delete v.tOwned;
          v.tState = 0;
        }
        setTransPending(false);
      }, false);
    } else if (Transition.running) {
      Transition.running = false;
      Transition.effects.push.apply(Transition.effects, Effects);
      Effects = null;
      setTransPending(true);
      return;
    }
  }
  const e2 = Effects;
  Effects = null;
  if (e2.length) runUpdates(() => runEffects(e2), false);
  if (res) res();
}
function runQueue(queue) {
  for (let i2 = 0; i2 < queue.length; i2++) runTop(queue[i2]);
}
function scheduleQueue(queue) {
  for (let i2 = 0; i2 < queue.length; i2++) {
    const item = queue[i2];
    const tasks = Transition.queue;
    if (!tasks.has(item)) {
      tasks.add(item);
      Scheduler(() => {
        tasks.delete(item);
        runUpdates(() => {
          Transition.running = true;
          runTop(item);
        }, false);
        Transition && (Transition.running = false);
      });
    }
  }
}
function runUserEffects(queue) {
  let i2, userLength = 0;
  for (i2 = 0; i2 < queue.length; i2++) {
    const e2 = queue[i2];
    if (!e2.user) runTop(e2);
    else queue[userLength++] = e2;
  }
  if (sharedConfig.context) {
    if (sharedConfig.count) {
      sharedConfig.effects || (sharedConfig.effects = []);
      sharedConfig.effects.push(...queue.slice(0, userLength));
      return;
    }
    setHydrateContext();
  }
  if (sharedConfig.effects && (sharedConfig.done || !sharedConfig.count)) {
    queue = [...sharedConfig.effects, ...queue];
    userLength += sharedConfig.effects.length;
    delete sharedConfig.effects;
  }
  for (i2 = 0; i2 < userLength; i2++) runTop(queue[i2]);
}
function lookUpstream(node, ignore) {
  const runningTransition = Transition && Transition.running;
  if (runningTransition) node.tState = 0;
  else node.state = 0;
  for (let i2 = 0; i2 < node.sources.length; i2 += 1) {
    const source = node.sources[i2];
    if (source.sources) {
      const state = runningTransition ? source.tState : source.state;
      if (state === STALE) {
        if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
      } else if (state === PENDING) lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  const runningTransition = Transition && Transition.running;
  for (let i2 = 0; i2 < node.observers.length; i2 += 1) {
    const o2 = node.observers[i2];
    if (runningTransition ? !o2.tState : !o2.state) {
      if (runningTransition) o2.tState = PENDING;
      else o2.state = PENDING;
      if (o2.pure) Updates.push(o2);
      else Effects.push(o2);
      o2.observers && markDownstream(o2);
    }
  }
}
function cleanNode(node) {
  let i2;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
      if (obs && obs.length) {
        const n2 = obs.pop(), s2 = source.observerSlots.pop();
        if (index < obs.length) {
          n2.sourceSlots[s2] = index;
          obs[index] = n2;
          source.observerSlots[index] = s2;
        }
      }
    }
  }
  if (node.tOwned) {
    for (i2 = node.tOwned.length - 1; i2 >= 0; i2--) cleanNode(node.tOwned[i2]);
    delete node.tOwned;
  }
  if (Transition && Transition.running && node.pure) {
    reset(node, true);
  } else if (node.owned) {
    for (i2 = node.owned.length - 1; i2 >= 0; i2--) cleanNode(node.owned[i2]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i2 = node.cleanups.length - 1; i2 >= 0; i2--) node.cleanups[i2]();
    node.cleanups = null;
  }
  if (Transition && Transition.running) node.tState = 0;
  else node.state = 0;
}
function reset(node, top) {
  if (!top) {
    node.tState = 0;
    Transition.disposed.add(node);
  }
  if (node.owned) {
    for (let i2 = 0; i2 < node.owned.length; i2++) reset(node.owned[i2]);
  }
}
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function runErrors(err, fns, owner) {
  try {
    for (const f of fns) f(err);
  } catch (e2) {
    handleError(e2, owner && owner.owner || null);
  }
}
function handleError(err, owner = Owner) {
  const fns = ERROR && owner && owner.context && owner.context[ERROR];
  const error = castError(err);
  if (!fns) throw error;
  if (Effects) Effects.push({
    fn() {
      runErrors(error, fns, owner);
    },
    state: STALE
  });
  else runErrors(error, fns, owner);
}
function resolveChildren(children2) {
  if (typeof children2 === "function" && !children2.length) return resolveChildren(children2());
  if (Array.isArray(children2)) {
    const results = [];
    for (let i2 = 0; i2 < children2.length; i2++) {
      const result = resolveChildren(children2[i2]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children2;
}
function createProvider(id, options) {
  return function provider(props) {
    let res;
    createRenderEffect(() => res = untrack(() => {
      Owner.context = {
        ...Owner.context,
        [id]: props.value
      };
      return children(() => props.children);
    }), void 0);
    return res;
  };
}
function dispose(d) {
  for (let i2 = 0; i2 < d.length; i2++) d[i2]();
}
function mapArray(list, mapFn, options = {}) {
  let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
  onCleanup(() => dispose(disposers));
  return () => {
    let newItems = list() || [], newLen = newItems.length, i2, j;
    newItems[$TRACK];
    return untrack(() => {
      let newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          indexes && (indexes = []);
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
      } else if (len === 0) {
        mapped = new Array(newLen);
        for (j = 0; j < newLen; j++) {
          items[j] = newItems[j];
          mapped[j] = createRoot(mapper);
        }
        len = newLen;
      } else {
        temp = new Array(newLen);
        tempdisposers = new Array(newLen);
        indexes && (tempIndexes = new Array(newLen));
        for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++) ;
        for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
          temp[newEnd] = mapped[end];
          tempdisposers[newEnd] = disposers[end];
          indexes && (tempIndexes[newEnd] = indexes[end]);
        }
        newIndices = /* @__PURE__ */ new Map();
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd; j >= start; j--) {
          item = newItems[j];
          i2 = newIndices.get(item);
          newIndicesNext[j] = i2 === void 0 ? -1 : i2;
          newIndices.set(item, j);
        }
        for (i2 = start; i2 <= end; i2++) {
          item = items[i2];
          j = newIndices.get(item);
          if (j !== void 0 && j !== -1) {
            temp[j] = mapped[i2];
            tempdisposers[j] = disposers[i2];
            indexes && (tempIndexes[j] = indexes[i2]);
            j = newIndicesNext[j];
            newIndices.set(item, j);
          } else disposers[i2]();
        }
        for (j = start; j < newLen; j++) {
          if (j in temp) {
            mapped[j] = temp[j];
            disposers[j] = tempdisposers[j];
            if (indexes) {
              indexes[j] = tempIndexes[j];
              indexes[j](j);
            }
          } else mapped[j] = createRoot(mapper);
        }
        mapped = mapped.slice(0, len = newLen);
        items = newItems.slice(0);
      }
      return mapped;
    });
    function mapper(disposer) {
      disposers[j] = disposer;
      if (indexes) {
        const [s2, set] = createSignal(j);
        indexes[j] = set;
        return mapFn(newItems[j], s2);
      }
      return mapFn(newItems[j]);
    }
  };
}
function indexArray(list, mapFn, options = {}) {
  let items = [], mapped = [], disposers = [], signals = [], len = 0, i2;
  onCleanup(() => dispose(disposers));
  return () => {
    const newItems = list() || [], newLen = newItems.length;
    newItems[$TRACK];
    return untrack(() => {
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          signals = [];
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot((disposer) => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
        return mapped;
      }
      if (items[0] === FALLBACK) {
        disposers[0]();
        disposers = [];
        items = [];
        mapped = [];
        len = 0;
      }
      for (i2 = 0; i2 < newLen; i2++) {
        if (i2 < items.length && items[i2] !== newItems[i2]) {
          signals[i2](() => newItems[i2]);
        } else if (i2 >= items.length) {
          mapped[i2] = createRoot(mapper);
        }
      }
      for (; i2 < items.length; i2++) {
        disposers[i2]();
      }
      len = signals.length = disposers.length = newLen;
      items = newItems.slice(0);
      return mapped = mapped.slice(0, len);
    });
    function mapper(disposer) {
      disposers[i2] = disposer;
      const [s2, set] = createSignal(newItems[i2]);
      signals[i2] = set;
      return mapFn(s2, i2);
    }
  };
}
function createComponent(Comp, props) {
  if (hydrationEnabled) {
    if (sharedConfig.context) {
      const c2 = sharedConfig.context;
      setHydrateContext(nextHydrateContext());
      const r2 = untrack(() => Comp(props || {}));
      setHydrateContext(c2);
      return r2;
    }
  }
  return untrack(() => Comp(props || {}));
}
function trueFn() {
  return true;
}
function resolveSource(s2) {
  return !(s2 = typeof s2 === "function" ? s2() : s2) ? {} : s2;
}
function resolveSources() {
  for (let i2 = 0, length = this.length; i2 < length; ++i2) {
    const v = this[i2]();
    if (v !== void 0) return v;
  }
}
function mergeProps(...sources) {
  let proxy = false;
  for (let i2 = 0; i2 < sources.length; i2++) {
    const s2 = sources[i2];
    proxy = proxy || !!s2 && $PROXY in s2;
    sources[i2] = typeof s2 === "function" ? (proxy = true, createMemo(s2)) : s2;
  }
  if (SUPPORTS_PROXY && proxy) {
    return new Proxy({
      get(property) {
        for (let i2 = sources.length - 1; i2 >= 0; i2--) {
          const v = resolveSource(sources[i2])[property];
          if (v !== void 0) return v;
        }
      },
      has(property) {
        for (let i2 = sources.length - 1; i2 >= 0; i2--) {
          if (property in resolveSource(sources[i2])) return true;
        }
        return false;
      },
      keys() {
        const keys = [];
        for (let i2 = 0; i2 < sources.length; i2++) keys.push(...Object.keys(resolveSource(sources[i2])));
        return [...new Set(keys)];
      }
    }, propTraps);
  }
  const sourcesMap = {};
  const defined = /* @__PURE__ */ Object.create(null);
  for (let i2 = sources.length - 1; i2 >= 0; i2--) {
    const source = sources[i2];
    if (!source) continue;
    const sourceKeys = Object.getOwnPropertyNames(source);
    for (let i22 = sourceKeys.length - 1; i22 >= 0; i22--) {
      const key = sourceKeys[i22];
      if (key === "__proto__" || key === "constructor") continue;
      const desc = Object.getOwnPropertyDescriptor(source, key);
      if (!defined[key]) {
        defined[key] = desc.get ? {
          enumerable: true,
          configurable: true,
          get: resolveSources.bind(sourcesMap[key] = [desc.get.bind(source)])
        } : desc.value !== void 0 ? desc : void 0;
      } else {
        const sources2 = sourcesMap[key];
        if (sources2) {
          if (desc.get) sources2.push(desc.get.bind(source));
          else if (desc.value !== void 0) sources2.push(() => desc.value);
        }
      }
    }
  }
  const target = {};
  const definedKeys = Object.keys(defined);
  for (let i2 = definedKeys.length - 1; i2 >= 0; i2--) {
    const key = definedKeys[i2], desc = defined[key];
    if (desc && desc.get) Object.defineProperty(target, key, desc);
    else target[key] = desc ? desc.value : void 0;
  }
  return target;
}
function splitProps(props, ...keys) {
  if (SUPPORTS_PROXY && $PROXY in props) {
    const blocked = new Set(keys.length > 1 ? keys.flat() : keys[0]);
    const res = keys.map((k) => {
      return new Proxy({
        get(property) {
          return k.includes(property) ? props[property] : void 0;
        },
        has(property) {
          return k.includes(property) && property in props;
        },
        keys() {
          return k.filter((property) => property in props);
        }
      }, propTraps);
    });
    res.push(new Proxy({
      get(property) {
        return blocked.has(property) ? void 0 : props[property];
      },
      has(property) {
        return blocked.has(property) ? false : property in props;
      },
      keys() {
        return Object.keys(props).filter((k) => !blocked.has(k));
      }
    }, propTraps));
    return res;
  }
  const otherObject = {};
  const objects = keys.map(() => ({}));
  for (const propName of Object.getOwnPropertyNames(props)) {
    const desc = Object.getOwnPropertyDescriptor(props, propName);
    const isDefaultDesc = !desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable;
    let blocked = false;
    let objectIndex = 0;
    for (const k of keys) {
      if (k.includes(propName)) {
        blocked = true;
        isDefaultDesc ? objects[objectIndex][propName] = desc.value : Object.defineProperty(objects[objectIndex], propName, desc);
      }
      ++objectIndex;
    }
    if (!blocked) {
      isDefaultDesc ? otherObject[propName] = desc.value : Object.defineProperty(otherObject, propName, desc);
    }
  }
  return [...objects, otherObject];
}
function lazy(fn) {
  let comp;
  let p2;
  const wrap = (props) => {
    const ctx = sharedConfig.context;
    if (ctx) {
      const [s2, set] = createSignal();
      sharedConfig.count || (sharedConfig.count = 0);
      sharedConfig.count++;
      (p2 || (p2 = fn())).then((mod) => {
        !sharedConfig.done && setHydrateContext(ctx);
        sharedConfig.count--;
        set(() => mod.default);
        setHydrateContext();
      });
      comp = s2;
    } else if (!comp) {
      const [s2] = createResource(() => (p2 || (p2 = fn())).then((mod) => mod.default));
      comp = s2;
    }
    let Comp;
    return createMemo(() => (Comp = comp()) ? untrack(() => {
      if (IS_DEV) ;
      if (!ctx || sharedConfig.done) return Comp(props);
      const c2 = sharedConfig.context;
      setHydrateContext(ctx);
      const r2 = Comp(props);
      setHydrateContext(c2);
      return r2;
    }) : "");
  };
  wrap.preload = () => p2 || ((p2 = fn()).then((mod) => comp = () => mod.default), p2);
  return wrap;
}
function createUniqueId() {
  const ctx = sharedConfig.context;
  return ctx ? sharedConfig.getNextContextId() : `cl-${counter++}`;
}
function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || void 0));
}
function Index(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(indexArray(() => props.each, props.children, fallback || void 0));
}
function Show(props) {
  const keyed = props.keyed;
  const conditionValue = createMemo(() => props.when, void 0, void 0);
  const condition = keyed ? conditionValue : createMemo(conditionValue, void 0, {
    equals: (a2, b) => !a2 === !b
  });
  return createMemo(() => {
    const c2 = condition();
    if (c2) {
      const child = props.children;
      const fn = typeof child === "function" && child.length > 0;
      return fn ? untrack(() => child(keyed ? c2 : () => {
        if (!untrack(condition)) throw narrowedError("Show");
        return conditionValue();
      })) : child;
    }
    return props.fallback;
  }, void 0, void 0);
}
function Switch(props) {
  const chs = children(() => props.children);
  const switchFunc = createMemo(() => {
    const ch = chs();
    const mps = Array.isArray(ch) ? ch : [ch];
    let func = () => void 0;
    for (let i2 = 0; i2 < mps.length; i2++) {
      const index = i2;
      const mp = mps[i2];
      const prevFunc = func;
      const conditionValue = createMemo(() => prevFunc() ? void 0 : mp.when, void 0, void 0);
      const condition = mp.keyed ? conditionValue : createMemo(conditionValue, void 0, {
        equals: (a2, b) => !a2 === !b
      });
      func = () => prevFunc() || (condition() ? [index, conditionValue, mp] : void 0);
    }
    return func;
  });
  return createMemo(() => {
    const sel = switchFunc()();
    if (!sel) return props.fallback;
    const [index, conditionValue, mp] = sel;
    const child = mp.children;
    const fn = typeof child === "function" && child.length > 0;
    return fn ? untrack(() => child(mp.keyed ? conditionValue() : () => {
      if (untrack(switchFunc)()?.[0] !== index) throw narrowedError("Match");
      return conditionValue();
    })) : child;
  }, void 0, void 0);
}
function Match(props) {
  return props;
}
function getPropAlias(prop, tagName) {
  const a2 = PropAliases[prop];
  return typeof a2 === "object" ? a2[tagName] ? a2["$"] : void 0 : a2;
}
function reconcileArrays(parentNode, a2, b) {
  let bLength = b.length, aEnd = a2.length, bEnd = bLength, aStart = 0, bStart = 0, after = a2[aEnd - 1].nextSibling, map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (a2[aStart] === b[bStart]) {
      aStart++;
      bStart++;
      continue;
    }
    while (a2[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
      while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a2[aStart])) a2[aStart].remove();
        aStart++;
      }
    } else if (a2[aStart] === b[bEnd - 1] && b[bStart] === a2[aEnd - 1]) {
      const node = a2[--aEnd].nextSibling;
      parentNode.insertBefore(b[bStart++], a2[aStart++].nextSibling);
      parentNode.insertBefore(b[--bEnd], node);
      a2[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = /* @__PURE__ */ new Map();
        let i2 = bStart;
        while (i2 < bEnd) map.set(b[i2], i2++);
      }
      const index = map.get(a2[aStart]);
      if (index != null) {
        if (bStart < index && index < bEnd) {
          let i2 = aStart, sequence = 1, t2;
          while (++i2 < aEnd && i2 < bEnd) {
            if ((t2 = map.get(a2[i2])) == null || t2 !== index + sequence) break;
            sequence++;
          }
          if (sequence > index - bStart) {
            const node = a2[aStart];
            while (bStart < index) parentNode.insertBefore(b[bStart++], node);
          } else parentNode.replaceChild(b[bStart++], a2[aStart++]);
        } else aStart++;
      } else a2[aStart++].remove();
    }
  }
}
function render(code, element, init, options = {}) {
  let disposer;
  createRoot((dispose22) => {
    disposer = dispose22;
    element === document ? code() : insert(element, code(), element.firstChild ? null : void 0, init);
  }, options.owner);
  return () => {
    disposer();
    element.textContent = "";
  };
}
function template(html, isImportNode, isSVG, isMathML) {
  let node;
  const create = () => {
    const t2 = isMathML ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
    t2.innerHTML = html;
    return isSVG ? t2.content.firstChild.firstChild : isMathML ? t2.firstChild : t2.content.firstChild;
  };
  const fn = isImportNode ? () => untrack(() => document.importNode(node || (node = create()), true)) : () => (node || (node = create())).cloneNode(true);
  fn.cloneNode = fn;
  return fn;
}
function delegateEvents(eventNames, document2 = window.document) {
  const e2 = document2[$$EVENTS] || (document2[$$EVENTS] = /* @__PURE__ */ new Set());
  for (let i2 = 0, l2 = eventNames.length; i2 < l2; i2++) {
    const name = eventNames[i2];
    if (!e2.has(name)) {
      e2.add(name);
      document2.addEventListener(name, eventHandler);
    }
  }
}
function clearDelegatedEvents(document2 = window.document) {
  if (document2[$$EVENTS]) {
    for (let name of document2[$$EVENTS].keys()) document2.removeEventListener(name, eventHandler);
    delete document2[$$EVENTS];
  }
}
function setAttribute(node, name, value) {
  if (isHydrating(node)) return;
  if (value == null) node.removeAttribute(name);
  else node.setAttribute(name, value);
}
function setAttributeNS(node, namespace, name, value) {
  if (isHydrating(node)) return;
  if (value == null) node.removeAttributeNS(namespace, name);
  else node.setAttributeNS(namespace, name, value);
}
function setBoolAttribute(node, name, value) {
  if (isHydrating(node)) return;
  value ? node.setAttribute(name, "") : node.removeAttribute(name);
}
function className(node, value) {
  if (isHydrating(node)) return;
  if (value == null) node.removeAttribute("class");
  else node.className = value;
}
function addEventListener(node, name, handler, delegate) {
  if (delegate) {
    if (Array.isArray(handler)) {
      node[`$$${name}`] = handler[0];
      node[`$$${name}Data`] = handler[1];
    } else node[`$$${name}`] = handler;
  } else if (Array.isArray(handler)) {
    const handlerFn = handler[0];
    node.addEventListener(name, handler[0] = (e2) => handlerFn.call(node, handler[1], e2));
  } else node.addEventListener(name, handler, typeof handler !== "function" && handler);
}
function classList(node, value, prev = {}) {
  const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
  let i2, len;
  for (i2 = 0, len = prevKeys.length; i2 < len; i2++) {
    const key = prevKeys[i2];
    if (!key || key === "undefined" || value[key]) continue;
    toggleClassKey(node, key, false);
    delete prev[key];
  }
  for (i2 = 0, len = classKeys.length; i2 < len; i2++) {
    const key = classKeys[i2], classValue = !!value[key];
    if (!key || key === "undefined" || prev[key] === classValue || !classValue) continue;
    toggleClassKey(node, key, true);
    prev[key] = classValue;
  }
  return prev;
}
function style(node, value, prev) {
  if (!value) return prev ? setAttribute(node, "style") : value;
  const nodeStyle = node.style;
  if (typeof value === "string") return nodeStyle.cssText = value;
  typeof prev === "string" && (nodeStyle.cssText = prev = void 0);
  prev || (prev = {});
  value || (value = {});
  let v, s2;
  for (s2 in prev) {
    value[s2] == null && nodeStyle.removeProperty(s2);
    delete prev[s2];
  }
  for (s2 in value) {
    v = value[s2];
    if (v !== prev[s2]) {
      nodeStyle.setProperty(s2, v);
      prev[s2] = v;
    }
  }
  return prev;
}
function spread(node, props = {}, isSVG, skipChildren) {
  const prevProps = {};
  if (!skipChildren) {
    createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
  }
  createRenderEffect(() => typeof props.ref === "function" && use(props.ref, node));
  createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
  return prevProps;
}
function use(fn, element, arg) {
  return untrack(() => fn(element, arg));
}
function insert(parent, accessor, marker, initial) {
  if (marker !== void 0 && !initial) initial = [];
  if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
  createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
}
function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
  props || (props = {});
  for (const prop in prevProps) {
    if (!(prop in props)) {
      if (prop === "children") continue;
      prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef, props);
    }
  }
  for (const prop in props) {
    if (prop === "children") {
      continue;
    }
    const value = props[prop];
    prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef, props);
  }
}
function getNextElement(template2) {
  let node, key, hydrating = isHydrating();
  if (!hydrating || !(node = sharedConfig.registry.get(key = getHydrationKey()))) {
    return template2();
  }
  if (sharedConfig.completed) sharedConfig.completed.add(node);
  sharedConfig.registry.delete(key);
  return node;
}
function isHydrating(node) {
  return !!sharedConfig.context && !sharedConfig.done && (!node || node.isConnected);
}
function toPropertyName(name) {
  return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
}
function toggleClassKey(node, key, value) {
  const classNames = key.trim().split(/\s+/);
  for (let i2 = 0, nameLen = classNames.length; i2 < nameLen; i2++) node.classList.toggle(classNames[i2], value);
}
function assignProp(node, prop, value, prev, isSVG, skipRef, props) {
  let isCE, isProp, isChildProp, propAlias, forceProp;
  if (prop === "style") return style(node, value, prev);
  if (prop === "classList") return classList(node, value, prev);
  if (value === prev) return prev;
  if (prop === "ref") {
    if (!skipRef) value(node);
  } else if (prop.slice(0, 3) === "on:") {
    const e2 = prop.slice(3);
    prev && node.removeEventListener(e2, prev, typeof prev !== "function" && prev);
    value && node.addEventListener(e2, value, typeof value !== "function" && value);
  } else if (prop.slice(0, 10) === "oncapture:") {
    const e2 = prop.slice(10);
    prev && node.removeEventListener(e2, prev, true);
    value && node.addEventListener(e2, value, true);
  } else if (prop.slice(0, 2) === "on") {
    const name = prop.slice(2).toLowerCase();
    const delegate = DelegatedEvents.has(name);
    if (!delegate && prev) {
      const h = Array.isArray(prev) ? prev[0] : prev;
      node.removeEventListener(name, h);
    }
    if (delegate || value) {
      addEventListener(node, name, value, delegate);
      delegate && delegateEvents([name]);
    }
  } else if (prop.slice(0, 5) === "attr:") {
    setAttribute(node, prop.slice(5), value);
  } else if (prop.slice(0, 5) === "bool:") {
    setBoolAttribute(node, prop.slice(5), value);
  } else if ((forceProp = prop.slice(0, 5) === "prop:") || (isChildProp = ChildProperties.has(prop)) || !isSVG && ((propAlias = getPropAlias(prop, node.tagName)) || (isProp = Properties.has(prop))) || (isCE = node.nodeName.includes("-") || "is" in props)) {
    if (forceProp) {
      prop = prop.slice(5);
      isProp = true;
    } else if (isHydrating(node)) return value;
    if (prop === "class" || prop === "className") className(node, value);
    else if (isCE && !isProp && !isChildProp) node[toPropertyName(prop)] = value;
    else node[propAlias || prop] = value;
  } else {
    const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
    if (ns) setAttributeNS(node, ns, prop, value);
    else setAttribute(node, Aliases[prop] || prop, value);
  }
  return value;
}
function eventHandler(e2) {
  if (sharedConfig.registry && sharedConfig.events) {
    if (sharedConfig.events.find(([el, ev]) => ev === e2)) return;
  }
  let node = e2.target;
  const key = `$$${e2.type}`;
  const oriTarget = e2.target;
  const oriCurrentTarget = e2.currentTarget;
  const retarget = (value) => Object.defineProperty(e2, "target", {
    configurable: true,
    value
  });
  const handleNode = () => {
    const handler = node[key];
    if (handler && !node.disabled) {
      const data = node[`${key}Data`];
      data !== void 0 ? handler.call(node, data, e2) : handler.call(node, e2);
      if (e2.cancelBubble) return;
    }
    node.host && typeof node.host !== "string" && !node.host._$host && node.contains(e2.target) && retarget(node.host);
    return true;
  };
  const walkUpTree = () => {
    while (handleNode() && (node = node._$host || node.parentNode || node.host)) ;
  };
  Object.defineProperty(e2, "currentTarget", {
    configurable: true,
    get() {
      return node || document;
    }
  });
  if (sharedConfig.registry && !sharedConfig.done) sharedConfig.done = _$HY.done = true;
  if (e2.composedPath) {
    const path = e2.composedPath();
    retarget(path[0]);
    for (let i2 = 0; i2 < path.length - 2; i2++) {
      node = path[i2];
      if (!handleNode()) break;
      if (node._$host) {
        node = node._$host;
        walkUpTree();
        break;
      }
      if (node.parentNode === oriCurrentTarget) {
        break;
      }
    }
  } else walkUpTree();
  retarget(oriTarget);
}
function insertExpression(parent, value, current, marker, unwrapArray) {
  const hydrating = isHydrating(parent);
  if (hydrating) {
    !current && (current = [...parent.childNodes]);
    let cleaned = [];
    for (let i2 = 0; i2 < current.length; i2++) {
      const node = current[i2];
      if (node.nodeType === 8 && node.data.slice(0, 2) === "!$") node.remove();
      else cleaned.push(node);
    }
    current = cleaned;
  }
  while (typeof current === "function") current = current();
  if (value === current) return current;
  const t2 = typeof value, multi = marker !== void 0;
  parent = multi && current[0] && current[0].parentNode || parent;
  if (t2 === "string" || t2 === "number") {
    if (hydrating) return current;
    if (t2 === "number") {
      value = value.toString();
      if (value === current) return current;
    }
    if (multi) {
      let node = current[0];
      if (node && node.nodeType === 3) {
        node.data !== value && (node.data = value);
      } else node = document.createTextNode(value);
      current = cleanChildren(parent, current, marker, node);
    } else {
      if (current !== "" && typeof current === "string") {
        current = parent.firstChild.data = value;
      } else current = parent.textContent = value;
    }
  } else if (value == null || t2 === "boolean") {
    if (hydrating) return current;
    current = cleanChildren(parent, current, marker);
  } else if (t2 === "function") {
    createRenderEffect(() => {
      let v = value();
      while (typeof v === "function") v = v();
      current = insertExpression(parent, v, current, marker);
    });
    return () => current;
  } else if (Array.isArray(value)) {
    const array = [];
    const currentArray = current && Array.isArray(current);
    if (normalizeIncomingArray(array, value, current, unwrapArray)) {
      createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
      return () => current;
    }
    if (hydrating) {
      if (!array.length) return current;
      if (marker === void 0) return current = [...parent.childNodes];
      let node = array[0];
      if (node.parentNode !== parent) return current;
      const nodes = [node];
      while ((node = node.nextSibling) !== marker) nodes.push(node);
      return current = nodes;
    }
    if (array.length === 0) {
      current = cleanChildren(parent, current, marker);
      if (multi) return current;
    } else if (currentArray) {
      if (current.length === 0) {
        appendNodes(parent, array, marker);
      } else reconcileArrays(parent, current, array);
    } else {
      current && cleanChildren(parent);
      appendNodes(parent, array);
    }
    current = array;
  } else if (value.nodeType) {
    if (hydrating && value.parentNode) return current = multi ? [value] : value;
    if (Array.isArray(current)) {
      if (multi) return current = cleanChildren(parent, current, marker, value);
      cleanChildren(parent, current, null, value);
    } else if (current == null || current === "" || !parent.firstChild) {
      parent.appendChild(value);
    } else parent.replaceChild(value, parent.firstChild);
    current = value;
  } else ;
  return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap) {
  let dynamic = false;
  for (let i2 = 0, len = array.length; i2 < len; i2++) {
    let item = array[i2], prev = current && current[normalized.length], t2;
    if (item == null || item === true || item === false) ;
    else if ((t2 = typeof item) === "object" && item.nodeType) {
      normalized.push(item);
    } else if (Array.isArray(item)) {
      dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
    } else if (t2 === "function") {
      if (unwrap) {
        while (typeof item === "function") item = item();
        dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
      } else {
        normalized.push(item);
        dynamic = true;
      }
    } else {
      const value = String(item);
      if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);
      else normalized.push(document.createTextNode(value));
    }
  }
  return dynamic;
}
function appendNodes(parent, array, marker = null) {
  for (let i2 = 0, len = array.length; i2 < len; i2++) parent.insertBefore(array[i2], marker);
}
function cleanChildren(parent, current, marker, replacement) {
  if (marker === void 0) return parent.textContent = "";
  const node = replacement || document.createTextNode("");
  if (current.length) {
    let inserted = false;
    for (let i2 = current.length - 1; i2 >= 0; i2--) {
      const el = current[i2];
      if (node !== el) {
        const isParent = el.parentNode === parent;
        if (!inserted && !i2) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
        else isParent && el.remove();
      } else inserted = true;
    }
  } else parent.insertBefore(node, marker);
  return [node];
}
function getHydrationKey() {
  return sharedConfig.getNextContextId();
}
function createElement(tagName, isSVG = false) {
  return isSVG ? document.createElementNS(SVG_NAMESPACE, tagName) : document.createElement(tagName);
}
function Portal(props) {
  const {
    useShadow
  } = props, marker = document.createTextNode(""), mount = () => props.mount || document.body, owner = getOwner();
  let content;
  let hydrating = !!sharedConfig.context;
  createEffect(() => {
    if (hydrating) getOwner().user = hydrating = false;
    content || (content = runWithOwner(owner, () => createMemo(() => props.children)));
    const el = mount();
    if (el instanceof HTMLHeadElement) {
      const [clean, setClean] = createSignal(false);
      const cleanup = () => setClean(true);
      createRoot((dispose22) => insert(el, () => !clean() ? content() : dispose22(), null));
      onCleanup(cleanup);
    } else {
      const container = createElement(props.isSVG ? "g" : "div", props.isSVG), renderRoot = useShadow && container.attachShadow ? container.attachShadow({
        mode: "open"
      }) : container;
      Object.defineProperty(container, "_$host", {
        get() {
          return marker.parentNode;
        },
        configurable: true
      });
      insert(renderRoot, content);
      el.appendChild(container);
      props.ref && props.ref(container);
      onCleanup(() => el.removeChild(container));
    }
  }, void 0, {
    render: !hydrating
  });
  return marker;
}
function createDynamic(component, props) {
  const cached = createMemo(component);
  return createMemo(() => {
    const component2 = cached();
    switch (typeof component2) {
      case "function":
        return untrack(() => component2(props));
      case "string":
        const isSvg = SVGElements.has(component2);
        const el = sharedConfig.context ? getNextElement() : createElement(component2, isSvg);
        spread(el, props, isSvg);
        return el;
    }
  });
}
function Dynamic(props) {
  const [, others] = splitProps(props, ["component"]);
  return createDynamic(() => props.component, others);
}
function valuesOfObj(record) {
  if ("values" in Object) {
    return Object.values(record);
  }
  const values = [];
  for (const key in record) {
    if (record.hasOwnProperty(key)) {
      values.push(record[key]);
    }
  }
  return values;
}
function find(record, predicate) {
  const values = valuesOfObj(record);
  if ("find" in values) {
    return values.find(predicate);
  }
  const valuesNotNever = values;
  for (let i2 = 0; i2 < valuesNotNever.length; i2++) {
    const value = valuesNotNever[i2];
    if (predicate(value)) {
      return value;
    }
  }
  return void 0;
}
function forEach(record, run) {
  Object.entries(record).forEach(([key, value]) => run(value, key));
}
function includes(arr, value) {
  return arr.indexOf(value) !== -1;
}
function findArr(record, predicate) {
  for (let i2 = 0; i2 < record.length; i2++) {
    const value = record[i2];
    if (predicate(value)) {
      return value;
    }
  }
  return void 0;
}
function simpleTransformation(isApplicable, annotation, transform, untransform) {
  return {
    isApplicable,
    annotation,
    transform,
    untransform
  };
}
function compositeTransformation(isApplicable, annotation, transform, untransform) {
  return {
    isApplicable,
    annotation,
    transform,
    untransform
  };
}
function isInstanceOfRegisteredClass(potentialClass, superJson) {
  if (potentialClass?.constructor) {
    const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
    return isRegistered;
  }
  return false;
}
function validatePath(path) {
  if (includes(path, "__proto__")) {
    throw new Error("__proto__ is not allowed as a property");
  }
  if (includes(path, "prototype")) {
    throw new Error("prototype is not allowed as a property");
  }
  if (includes(path, "constructor")) {
    throw new Error("constructor is not allowed as a property");
  }
}
function traverse(tree, walker2, origin = []) {
  if (!tree) {
    return;
  }
  if (!isArray(tree)) {
    forEach(tree, (subtree, key) => traverse(subtree, walker2, [...origin, ...parsePath(key)]));
    return;
  }
  const [nodeValue, children2] = tree;
  if (children2) {
    forEach(children2, (child, key) => {
      traverse(child, walker2, [...origin, ...parsePath(key)]);
    });
  }
  walker2(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
  traverse(annotations, (type, path) => {
    plain = setDeep(plain, path, (v) => untransformValue(v, type, superJson));
  });
  return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations) {
  function apply(identicalPaths, path) {
    const object = getDeep(plain, parsePath(path));
    identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
      plain = setDeep(plain, identicalObjectPath, () => object);
    });
  }
  if (isArray(annotations)) {
    const [root, other] = annotations;
    root.forEach((identicalPath) => {
      plain = setDeep(plain, parsePath(identicalPath), () => plain);
    });
    if (other) {
      forEach(other, apply);
    }
  } else {
    forEach(annotations, apply);
  }
  return plain;
}
function addIdentity(object, path, identities) {
  const existingSet = identities.get(object);
  if (existingSet) {
    existingSet.push(path);
  } else {
    identities.set(object, [path]);
  }
}
function generateReferentialEqualityAnnotations(identitites, dedupe) {
  const result = {};
  let rootEqualityPaths = void 0;
  identitites.forEach((paths) => {
    if (paths.length <= 1) {
      return;
    }
    if (!dedupe) {
      paths = paths.map((path) => path.map(String)).sort((a2, b) => a2.length - b.length);
    }
    const [representativePath, ...identicalPaths] = paths;
    if (representativePath.length === 0) {
      rootEqualityPaths = identicalPaths.map(stringifyPath);
    } else {
      result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
    }
  });
  if (rootEqualityPaths) {
    if (isEmptyObject(result)) {
      return [rootEqualityPaths];
    } else {
      return [rootEqualityPaths, result];
    }
  } else {
    return isEmptyObject(result) ? void 0 : result;
  }
}
function getType2(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
function isArray2(payload) {
  return getType2(payload) === "Array";
}
function isPlainObject22(payload) {
  if (getType2(payload) !== "Object")
    return false;
  const prototype = Object.getPrototypeOf(payload);
  return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}
function assignProp2(carry, key, newVal, originalObject, includeNonenumerable) {
  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
  if (propType === "enumerable")
    carry[key] = newVal;
  if (includeNonenumerable && propType === "nonenumerable") {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
}
function copy(target, options = {}) {
  if (isArray2(target)) {
    return target.map((item) => copy(item, options));
  }
  if (!isPlainObject22(target)) {
    return target;
  }
  const props = Object.getOwnPropertyNames(target);
  const symbols = Object.getOwnPropertySymbols(target);
  return [...props, ...symbols].reduce((carry, key) => {
    if (isArray2(options.props) && !options.props.includes(key)) {
      return carry;
    }
    const val = target[key];
    const newVal = copy(val, options);
    assignProp2(carry, key, newVal, target, options.nonenumerable);
    return carry;
  }, {});
}
function getQueryStatusLabel(query) {
  return query.state.fetchStatus === "fetching" ? "fetching" : !query.getObserversCount() ? "inactive" : query.state.fetchStatus === "paused" ? "paused" : query.isStale() ? "stale" : "fresh";
}
function getSidedProp(prop, side) {
  return `${prop}${side.charAt(0).toUpperCase() + side.slice(1)}`;
}
function getQueryStatusColor({
  queryState,
  observerCount,
  isStale: isStale2
}) {
  return queryState.fetchStatus === "fetching" ? "blue" : !observerCount ? "gray" : queryState.fetchStatus === "paused" ? "purple" : isStale2 ? "yellow" : "green";
}
function getMutationStatusColor({
  status,
  isPaused
}) {
  return isPaused ? "purple" : status === "error" ? "red" : status === "pending" ? "yellow" : status === "success" ? "green" : "gray";
}
function getQueryStatusColorByLabel(label) {
  return label === "fresh" ? "green" : label === "stale" ? "yellow" : label === "paused" ? "purple" : label === "inactive" ? "gray" : "blue";
}
var sharedConfig, IS_DEV, equalFn, $PROXY, SUPPORTS_PROXY, $TRACK, signalOptions, ERROR, runEffects, STALE, PENDING, UNOWNED, NO_INIT, Owner, Transition, Scheduler, ExternalSourceConfig, Listener, Updates, Effects, ExecCount, transPending, setTransPending, SuspenseContext, FALLBACK, hydrationEnabled, propTraps, counter, narrowedError, DEV, booleans, Properties, ChildProperties, Aliases, PropAliases, DelegatedEvents, SVGElements, SVGNamespace, memo, $$EVENTS, isServer2, SVG_NAMESPACE, DoubleIndexedKV, Registry, ClassRegistry, CustomTransformerRegistry, getType, isUndefined, isNull, isPlainObject2, isEmptyObject, isArray, isString, isNumber, isBoolean, isRegExp, isMap, isSet, isSymbol, isDate, isError, isNaNValue, isPrimitive, isBigint, isInfinite, isTypedArray, isURL, escapeKey, stringifyPath, parsePath, simpleRules, symbolRule, constructorToName, typedArrayRule, classRule, customRule, compositeRules, transformValue, simpleRulesByAnnotation, untransformValue, getNthKey, getDeep, setDeep, isDeep, walker, SuperJSON, serialize, stringify, displayValue, getStatusRank, queryHashSort, dateSort, statusAndDateSort, sortFns, getMutationStatusRank, mutationDateSort, mutationStatusSort, mutationSortFns, convertRemToPixels, getPreferredColorScheme, updateNestedDataByPath, deleteNestedDataByPath, setupStyleSheet;
var init_EIDV623S = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/chunk/EIDV623S.js"() {
    sharedConfig = {
      context: void 0,
      registry: void 0,
      effects: void 0,
      done: false,
      getContextId() {
        return getContextId(this.context.count);
      },
      getNextContextId() {
        return getContextId(this.context.count++);
      }
    };
    IS_DEV = false;
    equalFn = (a2, b) => a2 === b;
    $PROXY = /* @__PURE__ */ Symbol("solid-proxy");
    SUPPORTS_PROXY = typeof Proxy === "function";
    $TRACK = /* @__PURE__ */ Symbol("solid-track");
    signalOptions = {
      equals: equalFn
    };
    ERROR = null;
    runEffects = runQueue;
    STALE = 1;
    PENDING = 2;
    UNOWNED = {
      owned: null,
      cleanups: null,
      context: null,
      owner: null
    };
    NO_INIT = {};
    Owner = null;
    Transition = null;
    Scheduler = null;
    ExternalSourceConfig = null;
    Listener = null;
    Updates = null;
    Effects = null;
    ExecCount = 0;
    [transPending, setTransPending] = /* @__PURE__ */ createSignal(false);
    FALLBACK = /* @__PURE__ */ Symbol("fallback");
    hydrationEnabled = false;
    propTraps = {
      get(_, property, receiver) {
        if (property === $PROXY) return receiver;
        return _.get(property);
      },
      has(_, property) {
        if (property === $PROXY) return true;
        return _.has(property);
      },
      set: trueFn,
      deleteProperty: trueFn,
      getOwnPropertyDescriptor(_, property) {
        return {
          configurable: true,
          enumerable: true,
          get() {
            return _.get(property);
          },
          set: trueFn,
          deleteProperty: trueFn
        };
      },
      ownKeys(_) {
        return _.keys();
      }
    };
    counter = 0;
    narrowedError = (name) => `Stale read from <${name}>.`;
    DEV = void 0;
    booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
    Properties = /* @__PURE__ */ new Set(["className", "value", "readOnly", "noValidate", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
    ChildProperties = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]);
    Aliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
      className: "class",
      htmlFor: "for"
    });
    PropAliases = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
      class: "className",
      novalidate: {
        $: "noValidate",
        FORM: 1
      },
      formnovalidate: {
        $: "formNoValidate",
        BUTTON: 1,
        INPUT: 1
      },
      ismap: {
        $: "isMap",
        IMG: 1
      },
      nomodule: {
        $: "noModule",
        SCRIPT: 1
      },
      playsinline: {
        $: "playsInline",
        VIDEO: 1
      },
      readonly: {
        $: "readOnly",
        INPUT: 1,
        TEXTAREA: 1
      }
    });
    DelegatedEvents = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]);
    SVGElements = /* @__PURE__ */ new Set([
      "altGlyph",
      "altGlyphDef",
      "altGlyphItem",
      "animate",
      "animateColor",
      "animateMotion",
      "animateTransform",
      "circle",
      "clipPath",
      "color-profile",
      "cursor",
      "defs",
      "desc",
      "ellipse",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feDropShadow",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
      "filter",
      "font",
      "font-face",
      "font-face-format",
      "font-face-name",
      "font-face-src",
      "font-face-uri",
      "foreignObject",
      "g",
      "glyph",
      "glyphRef",
      "hkern",
      "image",
      "line",
      "linearGradient",
      "marker",
      "mask",
      "metadata",
      "missing-glyph",
      "mpath",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "set",
      "stop",
      "svg",
      "switch",
      "symbol",
      "text",
      "textPath",
      "tref",
      "tspan",
      "use",
      "view",
      "vkern"
    ]);
    SVGNamespace = {
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace"
    };
    memo = (fn) => createMemo(() => fn());
    $$EVENTS = "_$DX_DELEGATE";
    isServer2 = false;
    SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    DoubleIndexedKV = class {
      constructor() {
        this.keyToValue = /* @__PURE__ */ new Map();
        this.valueToKey = /* @__PURE__ */ new Map();
      }
      set(key, value) {
        this.keyToValue.set(key, value);
        this.valueToKey.set(value, key);
      }
      getByKey(key) {
        return this.keyToValue.get(key);
      }
      getByValue(value) {
        return this.valueToKey.get(value);
      }
      clear() {
        this.keyToValue.clear();
        this.valueToKey.clear();
      }
    };
    Registry = class {
      constructor(generateIdentifier) {
        this.generateIdentifier = generateIdentifier;
        this.kv = new DoubleIndexedKV();
      }
      register(value, identifier) {
        if (this.kv.getByValue(value)) {
          return;
        }
        if (!identifier) {
          identifier = this.generateIdentifier(value);
        }
        this.kv.set(identifier, value);
      }
      clear() {
        this.kv.clear();
      }
      getIdentifier(value) {
        return this.kv.getByValue(value);
      }
      getValue(identifier) {
        return this.kv.getByKey(identifier);
      }
    };
    ClassRegistry = class extends Registry {
      constructor() {
        super((c2) => c2.name);
        this.classToAllowedProps = /* @__PURE__ */ new Map();
      }
      register(value, options) {
        if (typeof options === "object") {
          if (options.allowProps) {
            this.classToAllowedProps.set(value, options.allowProps);
          }
          super.register(value, options.identifier);
        } else {
          super.register(value, options);
        }
      }
      getAllowedProps(value) {
        return this.classToAllowedProps.get(value);
      }
    };
    CustomTransformerRegistry = class {
      constructor() {
        this.transfomers = {};
      }
      register(transformer) {
        this.transfomers[transformer.name] = transformer;
      }
      findApplicable(v) {
        return find(this.transfomers, (transformer) => transformer.isApplicable(v));
      }
      findByName(name) {
        return this.transfomers[name];
      }
    };
    getType = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
    isUndefined = (payload) => typeof payload === "undefined";
    isNull = (payload) => payload === null;
    isPlainObject2 = (payload) => {
      if (typeof payload !== "object" || payload === null)
        return false;
      if (payload === Object.prototype)
        return false;
      if (Object.getPrototypeOf(payload) === null)
        return true;
      return Object.getPrototypeOf(payload) === Object.prototype;
    };
    isEmptyObject = (payload) => isPlainObject2(payload) && Object.keys(payload).length === 0;
    isArray = (payload) => Array.isArray(payload);
    isString = (payload) => typeof payload === "string";
    isNumber = (payload) => typeof payload === "number" && !isNaN(payload);
    isBoolean = (payload) => typeof payload === "boolean";
    isRegExp = (payload) => payload instanceof RegExp;
    isMap = (payload) => payload instanceof Map;
    isSet = (payload) => payload instanceof Set;
    isSymbol = (payload) => getType(payload) === "Symbol";
    isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
    isError = (payload) => payload instanceof Error;
    isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
    isPrimitive = (payload) => isBoolean(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
    isBigint = (payload) => typeof payload === "bigint";
    isInfinite = (payload) => payload === Infinity || payload === -Infinity;
    isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
    isURL = (payload) => payload instanceof URL;
    escapeKey = (key) => key.replace(/\./g, "\\.");
    stringifyPath = (path) => path.map(String).map(escapeKey).join(".");
    parsePath = (string) => {
      const result = [];
      let segment = "";
      for (let i2 = 0; i2 < string.length; i2++) {
        let char = string.charAt(i2);
        const isEscapedDot = char === "\\" && string.charAt(i2 + 1) === ".";
        if (isEscapedDot) {
          segment += ".";
          i2++;
          continue;
        }
        const isEndOfSegment = char === ".";
        if (isEndOfSegment) {
          result.push(segment);
          segment = "";
          continue;
        }
        segment += char;
      }
      const lastSegment = segment;
      result.push(lastSegment);
      return result;
    };
    simpleRules = [
      simpleTransformation(isUndefined, "undefined", () => null, () => void 0),
      simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
        if (typeof BigInt !== "undefined") {
          return BigInt(v);
        }
        return v;
      }),
      simpleTransformation(isDate, "Date", (v) => v.toISOString(), (v) => new Date(v)),
      simpleTransformation(isError, "Error", (v, superJson) => {
        const baseError = {
          name: v.name,
          message: v.message
        };
        superJson.allowedErrorProps.forEach((prop) => {
          baseError[prop] = v[prop];
        });
        return baseError;
      }, (v, superJson) => {
        const e2 = new Error(v.message);
        e2.name = v.name;
        e2.stack = v.stack;
        superJson.allowedErrorProps.forEach((prop) => {
          e2[prop] = v[prop];
        });
        return e2;
      }),
      simpleTransformation(isRegExp, "regexp", (v) => "" + v, (regex) => {
        const body = regex.slice(1, regex.lastIndexOf("/"));
        const flags = regex.slice(regex.lastIndexOf("/") + 1);
        return new RegExp(body, flags);
      }),
      simpleTransformation(
        isSet,
        "set",
        // (sets only exist in es6+)
        // eslint-disable-next-line es5/no-es6-methods
        (v) => [...v.values()],
        (v) => new Set(v)
      ),
      simpleTransformation(isMap, "map", (v) => [...v.entries()], (v) => new Map(v)),
      simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
        if (isNaNValue(v)) {
          return "NaN";
        }
        if (v > 0) {
          return "Infinity";
        } else {
          return "-Infinity";
        }
      }, Number),
      simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
        return "-0";
      }, Number),
      simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
    ];
    symbolRule = compositeTransformation((s2, superJson) => {
      if (isSymbol(s2)) {
        const isRegistered = !!superJson.symbolRegistry.getIdentifier(s2);
        return isRegistered;
      }
      return false;
    }, (s2, superJson) => {
      const identifier = superJson.symbolRegistry.getIdentifier(s2);
      return ["symbol", identifier];
    }, (v) => v.description, (_, a2, superJson) => {
      const value = superJson.symbolRegistry.getValue(a2[1]);
      if (!value) {
        throw new Error("Trying to deserialize unknown symbol");
      }
      return value;
    });
    constructorToName = [
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
      Uint8ClampedArray
    ].reduce((obj, ctor) => {
      obj[ctor.name] = ctor;
      return obj;
    }, {});
    typedArrayRule = compositeTransformation(isTypedArray, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a2) => {
      const ctor = constructorToName[a2[1]];
      if (!ctor) {
        throw new Error("Trying to deserialize unknown typed array");
      }
      return new ctor(v);
    });
    classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
      const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
      return ["class", identifier];
    }, (clazz, superJson) => {
      const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
      if (!allowedProps) {
        return { ...clazz };
      }
      const result = {};
      allowedProps.forEach((prop) => {
        result[prop] = clazz[prop];
      });
      return result;
    }, (v, a2, superJson) => {
      const clazz = superJson.classRegistry.getValue(a2[1]);
      if (!clazz) {
        throw new Error(`Trying to deserialize unknown class '${a2[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
      }
      return Object.assign(Object.create(clazz.prototype), v);
    });
    customRule = compositeTransformation((value, superJson) => {
      return !!superJson.customTransformerRegistry.findApplicable(value);
    }, (value, superJson) => {
      const transformer = superJson.customTransformerRegistry.findApplicable(value);
      return ["custom", transformer.name];
    }, (value, superJson) => {
      const transformer = superJson.customTransformerRegistry.findApplicable(value);
      return transformer.serialize(value);
    }, (v, a2, superJson) => {
      const transformer = superJson.customTransformerRegistry.findByName(a2[1]);
      if (!transformer) {
        throw new Error("Trying to deserialize unknown custom value");
      }
      return transformer.deserialize(v);
    });
    compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
    transformValue = (value, superJson) => {
      const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
      if (applicableCompositeRule) {
        return {
          value: applicableCompositeRule.transform(value, superJson),
          type: applicableCompositeRule.annotation(value, superJson)
        };
      }
      const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
      if (applicableSimpleRule) {
        return {
          value: applicableSimpleRule.transform(value, superJson),
          type: applicableSimpleRule.annotation
        };
      }
      return void 0;
    };
    simpleRulesByAnnotation = {};
    simpleRules.forEach((rule) => {
      simpleRulesByAnnotation[rule.annotation] = rule;
    });
    untransformValue = (json, type, superJson) => {
      if (isArray(type)) {
        switch (type[0]) {
          case "symbol":
            return symbolRule.untransform(json, type, superJson);
          case "class":
            return classRule.untransform(json, type, superJson);
          case "custom":
            return customRule.untransform(json, type, superJson);
          case "typed-array":
            return typedArrayRule.untransform(json, type, superJson);
          default:
            throw new Error("Unknown transformation: " + type);
        }
      } else {
        const transformation = simpleRulesByAnnotation[type];
        if (!transformation) {
          throw new Error("Unknown transformation: " + type);
        }
        return transformation.untransform(json, superJson);
      }
    };
    getNthKey = (value, n2) => {
      if (n2 > value.size)
        throw new Error("index out of bounds");
      const keys = value.keys();
      while (n2 > 0) {
        keys.next();
        n2--;
      }
      return keys.next().value;
    };
    getDeep = (object, path) => {
      validatePath(path);
      for (let i2 = 0; i2 < path.length; i2++) {
        const key = path[i2];
        if (isSet(object)) {
          object = getNthKey(object, +key);
        } else if (isMap(object)) {
          const row = +key;
          const type = +path[++i2] === 0 ? "key" : "value";
          const keyOfRow = getNthKey(object, row);
          switch (type) {
            case "key":
              object = keyOfRow;
              break;
            case "value":
              object = object.get(keyOfRow);
              break;
          }
        } else {
          object = object[key];
        }
      }
      return object;
    };
    setDeep = (object, path, mapper) => {
      validatePath(path);
      if (path.length === 0) {
        return mapper(object);
      }
      let parent = object;
      for (let i2 = 0; i2 < path.length - 1; i2++) {
        const key = path[i2];
        if (isArray(parent)) {
          const index = +key;
          parent = parent[index];
        } else if (isPlainObject2(parent)) {
          parent = parent[key];
        } else if (isSet(parent)) {
          const row = +key;
          parent = getNthKey(parent, row);
        } else if (isMap(parent)) {
          const isEnd = i2 === path.length - 2;
          if (isEnd) {
            break;
          }
          const row = +key;
          const type = +path[++i2] === 0 ? "key" : "value";
          const keyOfRow = getNthKey(parent, row);
          switch (type) {
            case "key":
              parent = keyOfRow;
              break;
            case "value":
              parent = parent.get(keyOfRow);
              break;
          }
        }
      }
      const lastKey = path[path.length - 1];
      if (isArray(parent)) {
        parent[+lastKey] = mapper(parent[+lastKey]);
      } else if (isPlainObject2(parent)) {
        parent[lastKey] = mapper(parent[lastKey]);
      }
      if (isSet(parent)) {
        const oldValue = getNthKey(parent, +lastKey);
        const newValue = mapper(oldValue);
        if (oldValue !== newValue) {
          parent.delete(oldValue);
          parent.add(newValue);
        }
      }
      if (isMap(parent)) {
        const row = +path[path.length - 2];
        const keyToRow = getNthKey(parent, row);
        const type = +lastKey === 0 ? "key" : "value";
        switch (type) {
          case "key": {
            const newKey = mapper(keyToRow);
            parent.set(newKey, parent.get(keyToRow));
            if (newKey !== keyToRow) {
              parent.delete(keyToRow);
            }
            break;
          }
          case "value": {
            parent.set(keyToRow, mapper(parent.get(keyToRow)));
            break;
          }
        }
      }
      return object;
    };
    isDeep = (object, superJson) => isPlainObject2(object) || isArray(object) || isMap(object) || isSet(object) || isInstanceOfRegisteredClass(object, superJson);
    walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map()) => {
      const primitive = isPrimitive(object);
      if (!primitive) {
        addIdentity(object, path, identities);
        const seen = seenObjects.get(object);
        if (seen) {
          return dedupe ? {
            transformedValue: null
          } : seen;
        }
      }
      if (!isDeep(object, superJson)) {
        const transformed2 = transformValue(object, superJson);
        const result2 = transformed2 ? {
          transformedValue: transformed2.value,
          annotations: [transformed2.type]
        } : {
          transformedValue: object
        };
        if (!primitive) {
          seenObjects.set(object, result2);
        }
        return result2;
      }
      if (includes(objectsInThisPath, object)) {
        return {
          transformedValue: null
        };
      }
      const transformationResult = transformValue(object, superJson);
      const transformed = transformationResult?.value ?? object;
      const transformedValue = isArray(transformed) ? [] : {};
      const innerAnnotations = {};
      forEach(transformed, (value, index) => {
        if (index === "__proto__" || index === "constructor" || index === "prototype") {
          throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
        }
        const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
        transformedValue[index] = recursiveResult.transformedValue;
        if (isArray(recursiveResult.annotations)) {
          innerAnnotations[index] = recursiveResult.annotations;
        } else if (isPlainObject2(recursiveResult.annotations)) {
          forEach(recursiveResult.annotations, (tree, key) => {
            innerAnnotations[escapeKey(index) + "." + key] = tree;
          });
        }
      });
      const result = isEmptyObject(innerAnnotations) ? {
        transformedValue,
        annotations: !!transformationResult ? [transformationResult.type] : void 0
      } : {
        transformedValue,
        annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
      };
      if (!primitive) {
        seenObjects.set(object, result);
      }
      return result;
    };
    SuperJSON = class {
      /**
       * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
       */
      constructor({ dedupe = false } = {}) {
        this.classRegistry = new ClassRegistry();
        this.symbolRegistry = new Registry((s2) => s2.description ?? "");
        this.customTransformerRegistry = new CustomTransformerRegistry();
        this.allowedErrorProps = [];
        this.dedupe = dedupe;
      }
      serialize(object) {
        const identities = /* @__PURE__ */ new Map();
        const output = walker(object, identities, this, this.dedupe);
        const res = {
          json: output.transformedValue
        };
        if (output.annotations) {
          res.meta = {
            ...res.meta,
            values: output.annotations
          };
        }
        const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
        if (equalityAnnotations) {
          res.meta = {
            ...res.meta,
            referentialEqualities: equalityAnnotations
          };
        }
        return res;
      }
      deserialize(payload) {
        const { json, meta } = payload;
        let result = copy(json);
        if (meta?.values) {
          result = applyValueAnnotations(result, meta.values, this);
        }
        if (meta?.referentialEqualities) {
          result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
        }
        return result;
      }
      stringify(object) {
        return JSON.stringify(this.serialize(object));
      }
      parse(string) {
        return this.deserialize(JSON.parse(string));
      }
      registerClass(v, options) {
        this.classRegistry.register(v, options);
      }
      registerSymbol(v, identifier) {
        this.symbolRegistry.register(v, identifier);
      }
      registerCustom(transformer, name) {
        this.customTransformerRegistry.register({
          name,
          ...transformer
        });
      }
      allowErrorProps(...props) {
        this.allowedErrorProps.push(...props);
      }
    };
    SuperJSON.defaultInstance = new SuperJSON();
    SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
    SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
    SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
    SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
    SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
    SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
    SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
    SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
    serialize = SuperJSON.serialize;
    SuperJSON.deserialize;
    stringify = SuperJSON.stringify;
    SuperJSON.parse;
    SuperJSON.registerClass;
    SuperJSON.registerCustom;
    SuperJSON.registerSymbol;
    SuperJSON.allowErrorProps;
    displayValue = (value, beautify = false) => {
      const {
        json
      } = serialize(value);
      return JSON.stringify(json, null, beautify ? 2 : void 0);
    };
    getStatusRank = (q) => q.state.fetchStatus !== "idle" ? 0 : !q.getObserversCount() ? 3 : q.isStale() ? 2 : 1;
    queryHashSort = (a2, b) => a2.queryHash.localeCompare(b.queryHash);
    dateSort = (a2, b) => a2.state.dataUpdatedAt < b.state.dataUpdatedAt ? 1 : -1;
    statusAndDateSort = (a2, b) => {
      if (getStatusRank(a2) === getStatusRank(b)) {
        return dateSort(a2, b);
      }
      return getStatusRank(a2) > getStatusRank(b) ? 1 : -1;
    };
    sortFns = {
      status: statusAndDateSort,
      "query hash": queryHashSort,
      "last updated": dateSort
    };
    getMutationStatusRank = (m) => m.state.isPaused ? 0 : m.state.status === "error" ? 2 : m.state.status === "pending" ? 1 : 3;
    mutationDateSort = (a2, b) => a2.state.submittedAt < b.state.submittedAt ? 1 : -1;
    mutationStatusSort = (a2, b) => {
      if (getMutationStatusRank(a2) === getMutationStatusRank(b)) {
        return mutationDateSort(a2, b);
      }
      return getMutationStatusRank(a2) > getMutationStatusRank(b) ? 1 : -1;
    };
    mutationSortFns = {
      status: mutationStatusSort,
      "last updated": mutationDateSort
    };
    convertRemToPixels = (rem) => {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    };
    getPreferredColorScheme = () => {
      const [colorScheme, setColorScheme] = createSignal("dark");
      onMount(() => {
        const query = window.matchMedia("(prefers-color-scheme: dark)");
        setColorScheme(query.matches ? "dark" : "light");
        const listener = (e2) => {
          setColorScheme(e2.matches ? "dark" : "light");
        };
        query.addEventListener("change", listener);
        onCleanup(() => query.removeEventListener("change", listener));
      });
      return colorScheme;
    };
    updateNestedDataByPath = (oldData, updatePath, value) => {
      if (updatePath.length === 0) {
        return value;
      }
      if (oldData instanceof Map) {
        const newData = new Map(oldData);
        if (updatePath.length === 1) {
          newData.set(updatePath[0], value);
          return newData;
        }
        const [head, ...tail] = updatePath;
        newData.set(head, updateNestedDataByPath(newData.get(head), tail, value));
        return newData;
      }
      if (oldData instanceof Set) {
        const setAsArray = updateNestedDataByPath(Array.from(oldData), updatePath, value);
        return new Set(setAsArray);
      }
      if (Array.isArray(oldData)) {
        const newData = [...oldData];
        if (updatePath.length === 1) {
          newData[updatePath[0]] = value;
          return newData;
        }
        const [head, ...tail] = updatePath;
        newData[head] = updateNestedDataByPath(newData[head], tail, value);
        return newData;
      }
      if (oldData instanceof Object) {
        const newData = {
          ...oldData
        };
        if (updatePath.length === 1) {
          newData[updatePath[0]] = value;
          return newData;
        }
        const [head, ...tail] = updatePath;
        newData[head] = updateNestedDataByPath(newData[head], tail, value);
        return newData;
      }
      return oldData;
    };
    deleteNestedDataByPath = (oldData, deletePath) => {
      if (oldData instanceof Map) {
        const newData = new Map(oldData);
        if (deletePath.length === 1) {
          newData.delete(deletePath[0]);
          return newData;
        }
        const [head, ...tail] = deletePath;
        newData.set(head, deleteNestedDataByPath(newData.get(head), tail));
        return newData;
      }
      if (oldData instanceof Set) {
        const setAsArray = deleteNestedDataByPath(Array.from(oldData), deletePath);
        return new Set(setAsArray);
      }
      if (Array.isArray(oldData)) {
        const newData = [...oldData];
        if (deletePath.length === 1) {
          return newData.filter((_, idx) => idx.toString() !== deletePath[0]);
        }
        const [head, ...tail] = deletePath;
        newData[head] = deleteNestedDataByPath(newData[head], tail);
        return newData;
      }
      if (oldData instanceof Object) {
        const newData = {
          ...oldData
        };
        if (deletePath.length === 1) {
          delete newData[deletePath[0]];
          return newData;
        }
        const [head, ...tail] = deletePath;
        newData[head] = deleteNestedDataByPath(newData[head], tail);
        return newData;
      }
      return oldData;
    };
    setupStyleSheet = (nonce, target) => {
      if (!nonce) return;
      const styleExists = document.querySelector("#_goober") || target?.querySelector("#_goober");
      if (styleExists) return;
      const styleTag = document.createElement("style");
      const textNode = document.createTextNode("");
      styleTag.appendChild(textNode);
      styleTag.id = "_goober";
      styleTag.setAttribute("nonce", nonce);
      if (target) {
        target.appendChild(styleTag);
      } else {
        document.head.appendChild(styleTag);
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/chunk/ZDWCUMSJ.js
function chain(callbacks) {
  return (...args) => {
    for (const callback of callbacks)
      callback && callback(...args);
  };
}
function accessWith(valueOrFn, ...args) {
  return typeof valueOrFn === "function" ? valueOrFn(...args) : valueOrFn;
}
function handleDiffArray(current, prev, handleAdded, handleRemoved) {
  const currLength = current.length;
  const prevLength = prev.length;
  let i2 = 0;
  if (!prevLength) {
    for (; i2 < currLength; i2++)
      handleAdded(current[i2]);
    return;
  }
  if (!currLength) {
    for (; i2 < prevLength; i2++)
      handleRemoved(prev[i2]);
    return;
  }
  for (; i2 < prevLength; i2++) {
    if (prev[i2] !== current[i2])
      break;
  }
  let prevEl;
  let currEl;
  prev = prev.slice(i2);
  current = current.slice(i2);
  for (prevEl of prev) {
    if (!current.includes(prevEl))
      handleRemoved(prevEl);
  }
  for (currEl of current) {
    if (!prev.includes(currEl))
      handleAdded(currEl);
  }
}
function createStorage(props) {
  const [error, setError] = createSignal();
  const handleError2 = props?.throw ? (err, fallback) => {
    setError(err instanceof Error ? err : new Error(fallback));
    throw err;
  } : (err, fallback) => {
    setError(err instanceof Error ? err : new Error(fallback));
  };
  const apis = props?.api ? Array.isArray(props.api) ? props.api : [props.api] : [globalThis.localStorage].filter(Boolean);
  const prefix = props?.prefix ? `${props.prefix}.` : "";
  const signals = /* @__PURE__ */ new Map();
  const store = new Proxy(
    {},
    {
      get(_, key) {
        let node = signals.get(key);
        if (!node) {
          node = createSignal(void 0, { equals: false });
          signals.set(key, node);
        }
        node[0]();
        const value = apis.reduce(
          (result, api) => {
            if (result !== null || !api) {
              return result;
            }
            try {
              return api.getItem(`${prefix}${key}`);
            } catch (err) {
              handleError2(err, `Error reading ${prefix}${key} from ${api["name"]}`);
              return null;
            }
          },
          null
        );
        if (value !== null && props?.deserializer) {
          return props.deserializer(value, key, props.options);
        }
        return value;
      }
    }
  );
  const setter = (key, value, options) => {
    const filteredValue = props?.serializer ? props.serializer(value, key, options ?? props.options) : value;
    const apiKey = `${prefix}${key}`;
    apis.forEach((api) => {
      try {
        api.getItem(apiKey) !== filteredValue && api.setItem(apiKey, filteredValue);
      } catch (err) {
        handleError2(err, `Error setting ${prefix}${key} to ${filteredValue} in ${api.name}`);
      }
    });
    const node = signals.get(key);
    node && node[1]();
  };
  const remove = (key) => apis.forEach((api) => {
    try {
      api.removeItem(`${prefix}${key}`);
    } catch (err) {
      handleError2(err, `Error removing ${prefix}${key} from ${api.name}`);
    }
  });
  const clear = () => apis.forEach((api) => {
    try {
      api.clear();
    } catch (err) {
      handleError2(err, `Error clearing ${api.name}`);
    }
  });
  const toJSON = () => {
    const result = {};
    const addValue = (key, value) => {
      if (!result.hasOwnProperty(key)) {
        const filteredValue = value && props?.deserializer ? props.deserializer(value, key, props.options) : value;
        if (filteredValue) {
          result[key] = filteredValue;
        }
      }
    };
    apis.forEach((api) => {
      if (typeof api.getAll === "function") {
        let values;
        try {
          values = api.getAll();
        } catch (err) {
          handleError2(err, `Error getting all values from in ${api.name}`);
        }
        for (const key of values) {
          addValue(key, values[key]);
        }
      } else {
        let index = 0, key;
        try {
          while (key = api.key(index++)) {
            if (!result.hasOwnProperty(key)) {
              addValue(key, api.getItem(key));
            }
          }
        } catch (err) {
          handleError2(err, `Error getting all values from ${api.name}`);
        }
      }
    });
    return result;
  };
  props?.sync !== false && onMount(() => {
    const listener = (ev) => {
      let changed = false;
      apis.forEach((api) => {
        try {
          if (api !== ev.storageArea && ev.key && ev.newValue !== api.getItem(ev.key)) {
            ev.newValue ? api.setItem(ev.key, ev.newValue) : api.removeItem(ev.key);
            changed = true;
          }
        } catch (err) {
          handleError2(
            err,
            `Error synching api ${api.name} from storage event (${ev.key}=${ev.newValue})`
          );
        }
      });
      changed && ev.key && signals.get(ev.key)?.[1]();
    };
    if ("addEventListener" in globalThis) {
      globalThis.addEventListener("storage", listener);
      onCleanup(() => globalThis.removeEventListener("storage", listener));
    } else {
      apis.forEach((api) => api.addEventListener?.("storage", listener));
      onCleanup(() => apis.forEach((api) => api.removeEventListener?.("storage", listener)));
    }
  });
  return [
    store,
    setter,
    {
      clear,
      error,
      remove,
      toJSON
    }
  ];
}
function useQueryDevtoolsContext() {
  return useContext4(QueryDevtoolsContext);
}
function useTheme() {
  return useContext4(ThemeContext);
}
function removeAccents(str) {
  return str.replace(allAccents, (match2) => {
    return characterMap[match2];
  });
}
function rankItem(item, value, options) {
  var _options$threshold;
  options = options || {};
  options.threshold = (_options$threshold = options.threshold) != null ? _options$threshold : rankings.MATCHES;
  if (!options.accessors) {
    const rank = getMatchRanking(item, value, options);
    return {
      // ends up being duplicate of 'item' in matches but consistent
      rankedValue: item,
      rank,
      accessorIndex: -1,
      accessorThreshold: options.threshold,
      passed: rank >= options.threshold
    };
  }
  const valuesToRank = getAllValuesToRank(item, options.accessors);
  const rankingInfo = {
    rankedValue: item,
    rank: rankings.NO_MATCH,
    accessorIndex: -1,
    accessorThreshold: options.threshold,
    passed: false
  };
  for (let i2 = 0; i2 < valuesToRank.length; i2++) {
    const rankValue = valuesToRank[i2];
    let newRank = getMatchRanking(rankValue.itemValue, value, options);
    const {
      minRanking,
      maxRanking,
      threshold = options.threshold
    } = rankValue.attributes;
    if (newRank < minRanking && newRank >= rankings.MATCHES) {
      newRank = minRanking;
    } else if (newRank > maxRanking) {
      newRank = maxRanking;
    }
    newRank = Math.min(newRank, maxRanking);
    if (newRank >= threshold && newRank > rankingInfo.rank) {
      rankingInfo.rank = newRank;
      rankingInfo.passed = true;
      rankingInfo.accessorIndex = i2;
      rankingInfo.accessorThreshold = threshold;
      rankingInfo.rankedValue = rankValue.itemValue;
    }
  }
  return rankingInfo;
}
function getMatchRanking(testString, stringToRank, options) {
  testString = prepareValueForComparison(testString, options);
  stringToRank = prepareValueForComparison(stringToRank, options);
  if (stringToRank.length > testString.length) {
    return rankings.NO_MATCH;
  }
  if (testString === stringToRank) {
    return rankings.CASE_SENSITIVE_EQUAL;
  }
  testString = testString.toLowerCase();
  stringToRank = stringToRank.toLowerCase();
  if (testString === stringToRank) {
    return rankings.EQUAL;
  }
  if (testString.startsWith(stringToRank)) {
    return rankings.STARTS_WITH;
  }
  if (testString.includes(` ${stringToRank}`)) {
    return rankings.WORD_STARTS_WITH;
  }
  if (testString.includes(stringToRank)) {
    return rankings.CONTAINS;
  } else if (stringToRank.length === 1) {
    return rankings.NO_MATCH;
  }
  if (getAcronym(testString).includes(stringToRank)) {
    return rankings.ACRONYM;
  }
  return getClosenessRanking(testString, stringToRank);
}
function getAcronym(string) {
  let acronym = "";
  const wordsInString = string.split(" ");
  wordsInString.forEach((wordInString) => {
    const splitByHyphenWords = wordInString.split("-");
    splitByHyphenWords.forEach((splitByHyphenWord) => {
      acronym += splitByHyphenWord.substr(0, 1);
    });
  });
  return acronym;
}
function getClosenessRanking(testString, stringToRank) {
  let matchingInOrderCharCount = 0;
  let charNumber = 0;
  function findMatchingCharacter(matchChar, string, index) {
    for (let j = index, J = string.length; j < J; j++) {
      const stringChar = string[j];
      if (stringChar === matchChar) {
        matchingInOrderCharCount += 1;
        return j + 1;
      }
    }
    return -1;
  }
  function getRanking(spread3) {
    const spreadPercentage = 1 / spread3;
    const inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
    const ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
    return ranking;
  }
  const firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);
  if (firstIndex < 0) {
    return rankings.NO_MATCH;
  }
  charNumber = firstIndex;
  for (let i2 = 1, I = stringToRank.length; i2 < I; i2++) {
    const matchChar = stringToRank[i2];
    charNumber = findMatchingCharacter(matchChar, testString, charNumber);
    const found = charNumber > -1;
    if (!found) {
      return rankings.NO_MATCH;
    }
  }
  const spread2 = charNumber - firstIndex;
  return getRanking(spread2);
}
function prepareValueForComparison(value, _ref) {
  let {
    keepDiacritics
  } = _ref;
  value = `${value}`;
  if (!keepDiacritics) {
    value = removeAccents(value);
  }
  return value;
}
function getItemValues(item, accessor) {
  let accessorFn = accessor;
  if (typeof accessor === "object") {
    accessorFn = accessor.accessor;
  }
  const value = accessorFn(item);
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [String(value)];
}
function getAllValuesToRank(item, accessors) {
  const allValues = [];
  for (let j = 0, J = accessors.length; j < J; j++) {
    const accessor = accessors[j];
    const attributes = getAccessorAttributes(accessor);
    const itemValues = getItemValues(item, accessor);
    for (let i2 = 0, I = itemValues.length; i2 < I; i2++) {
      allValues.push({
        itemValue: itemValues[i2],
        attributes
      });
    }
  }
  return allValues;
}
function getAccessorAttributes(accessor) {
  if (typeof accessor === "function") {
    return defaultKeyAttributes;
  }
  return {
    ...defaultKeyAttributes,
    ...accessor
  };
}
function u(e2) {
  let r2 = this || {}, l2 = e2.call ? e2(r2.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r2.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r2.p) : t2), {}) : l2, t(r2.target), r2.g, r2.o, r2.k);
}
function r(e2) {
  var t2, f, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
  else if ("object" == typeof e2) if (Array.isArray(e2)) {
    var o2 = e2.length;
    for (t2 = 0; t2 < o2; t2++) e2[t2] && (f = r(e2[t2])) && (n2 && (n2 += " "), n2 += f);
  } else for (f in e2) e2[f] && (n2 && (n2 += " "), n2 += f);
  return n2;
}
function clsx() {
  for (var e2, t2, f = 0, n2 = "", o2 = arguments.length; f < o2; f++) (e2 = arguments[f]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function createListTransition(source, options) {
  const initSource = untrack(source);
  if (isServer2) {
    const copy2 = initSource.slice();
    return () => copy2;
  }
  const { onChange } = options;
  let prevSet = new Set(options.appear ? void 0 : initSource);
  const exiting = /* @__PURE__ */ new WeakSet();
  const [toRemove, setToRemove] = createSignal([], { equals: false });
  const [isTransitionPending] = useTransition();
  const finishRemoved = (els) => {
    setToRemove((p2) => (p2.push.apply(p2, els), p2));
    for (const el of els)
      exiting.delete(el);
  };
  const handleRemoved = (els, el, i2) => els.splice(i2, 0, el);
  return createMemo(
    (prev) => {
      const elsToRemove = toRemove();
      const sourceList = source();
      sourceList[$TRACK];
      if (untrack(isTransitionPending)) {
        isTransitionPending();
        return prev;
      }
      if (elsToRemove.length) {
        const next = prev.filter((e2) => !elsToRemove.includes(e2));
        elsToRemove.length = 0;
        onChange({ list: next, added: [], removed: [], unchanged: next, finishRemoved });
        return next;
      }
      return untrack(() => {
        const nextSet = new Set(sourceList);
        const next = sourceList.slice();
        const added = [];
        const removed = [];
        const unchanged = [];
        for (const el of sourceList) {
          (prevSet.has(el) ? unchanged : added).push(el);
        }
        let nothingChanged = !added.length;
        for (let i2 = 0; i2 < prev.length; i2++) {
          const el = prev[i2];
          if (!nextSet.has(el)) {
            if (!exiting.has(el)) {
              removed.push(el);
              exiting.add(el);
            }
            handleRemoved(next, el, i2);
          }
          if (nothingChanged && el !== next[i2])
            nothingChanged = false;
        }
        if (!removed.length && nothingChanged)
          return prev;
        onChange({ list: next, added, removed, unchanged, finishRemoved });
        prevSet = nextSet;
        return next;
      });
    },
    options.appear ? [] : initSource.slice()
  );
}
function mergeRefs(...refs) {
  return chain(refs);
}
function getResolvedElements(value, predicate) {
  if (predicate(value))
    return value;
  if (typeof value === "function" && !value.length)
    return getResolvedElements(value(), predicate);
  if (Array.isArray(value)) {
    const results = [];
    for (const item of value) {
      const result = getResolvedElements(item, predicate);
      if (result)
        Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results.length ? results : null;
  }
  return null;
}
function resolveElements(fn, predicate = defaultElementPredicate, serverPredicate = defaultElementPredicate) {
  const children2 = createMemo(fn);
  const memo2 = createMemo(
    () => getResolvedElements(children2(), isServer2 ? serverPredicate : predicate)
  );
  memo2.toArray = () => {
    const value = memo2();
    return Array.isArray(value) ? value : value ? [value] : [];
  };
  return memo2;
}
function createClassnames(props) {
  return createMemo(() => {
    const name = props.name || "s";
    return {
      enterActive: (props.enterActiveClass || name + "-enter-active").split(" "),
      enter: (props.enterClass || name + "-enter").split(" "),
      enterTo: (props.enterToClass || name + "-enter-to").split(" "),
      exitActive: (props.exitActiveClass || name + "-exit-active").split(" "),
      exit: (props.exitClass || name + "-exit").split(" "),
      exitTo: (props.exitToClass || name + "-exit-to").split(" "),
      move: (props.moveClass || name + "-move").split(" ")
    };
  });
}
function nextFrame(fn) {
  requestAnimationFrame(() => requestAnimationFrame(fn));
}
function enterTransition(classes, events, el, done) {
  const { onBeforeEnter, onEnter, onAfterEnter } = events;
  onBeforeEnter?.(el);
  el.classList.add(...classes.enter);
  el.classList.add(...classes.enterActive);
  queueMicrotask(() => {
    if (!el.parentNode)
      return done?.();
    onEnter?.(el, () => endTransition());
  });
  nextFrame(() => {
    el.classList.remove(...classes.enter);
    el.classList.add(...classes.enterTo);
    if (!onEnter || onEnter.length < 2) {
      el.addEventListener("transitionend", endTransition);
      el.addEventListener("animationend", endTransition);
    }
  });
  function endTransition(e2) {
    if (!e2 || e2.target === el) {
      el.removeEventListener("transitionend", endTransition);
      el.removeEventListener("animationend", endTransition);
      el.classList.remove(...classes.enterActive);
      el.classList.remove(...classes.enterTo);
      onAfterEnter?.(el);
    }
  }
}
function exitTransition(classes, events, el, done) {
  const { onBeforeExit, onExit, onAfterExit } = events;
  if (!el.parentNode)
    return done?.();
  onBeforeExit?.(el);
  el.classList.add(...classes.exit);
  el.classList.add(...classes.exitActive);
  onExit?.(el, () => endTransition());
  nextFrame(() => {
    el.classList.remove(...classes.exit);
    el.classList.add(...classes.exitTo);
    if (!onExit || onExit.length < 2) {
      el.addEventListener("transitionend", endTransition);
      el.addEventListener("animationend", endTransition);
    }
  });
  function endTransition(e2) {
    if (!e2 || e2.target === el) {
      done?.();
      el.removeEventListener("transitionend", endTransition);
      el.removeEventListener("animationend", endTransition);
      el.classList.remove(...classes.exitActive);
      el.classList.remove(...classes.exitTo);
      onAfterExit?.(el);
    }
  }
}
function dispose2(list) {
  for (const o2 of list)
    o2.dispose();
}
function keyArray(items, keyFn, mapFn, options = {}) {
  if (isServer2) {
    const itemsRef = items();
    let s2 = [];
    if (itemsRef && itemsRef.length) {
      for (let i2 = 0, len = itemsRef.length; i2 < len; i2++)
        s2.push(
          mapFn(
            () => itemsRef[i2],
            () => i2
          )
        );
    } else if (options.fallback)
      s2 = [options.fallback()];
    return () => s2;
  }
  const prev = /* @__PURE__ */ new Map();
  onCleanup(() => dispose2(prev.values()));
  return () => {
    const list = items() || [];
    list[$TRACK];
    return untrack(() => {
      if (!list.length) {
        dispose2(prev.values());
        prev.clear();
        if (!options.fallback)
          return [];
        const fb2 = createRoot((dispose22) => {
          prev.set(FALLBACK2, { dispose: dispose22 });
          return options.fallback();
        });
        return [fb2];
      }
      const result = new Array(list.length);
      const fb = prev.get(FALLBACK2);
      if (!prev.size || fb) {
        fb?.dispose();
        prev.delete(FALLBACK2);
        for (let i2 = 0; i2 < list.length; i2++) {
          const item = list[i2];
          const key = keyFn(item, i2);
          addNewItem(result, item, i2, key);
        }
        return result;
      }
      const prevKeys = new Set(prev.keys());
      for (let i2 = 0; i2 < list.length; i2++) {
        const item = list[i2];
        const key = keyFn(item, i2);
        prevKeys.delete(key);
        const lookup = prev.get(key);
        if (lookup) {
          result[i2] = lookup.mapped;
          lookup.setIndex?.(i2);
          lookup.setItem(() => item);
        } else
          addNewItem(result, item, i2, key);
      }
      for (const key of prevKeys) {
        prev.get(key)?.dispose();
        prev.delete(key);
      }
      return result;
    });
  };
  function addNewItem(list, item, i2, key) {
    createRoot((dispose22) => {
      const [getItem, setItem] = createSignal(item);
      const save = { setItem, dispose: dispose22 };
      if (mapFn.length > 1) {
        const [index, setIndex] = createSignal(i2);
        save.setIndex = setIndex;
        save.mapped = mapFn(getItem, index);
      } else
        save.mapped = mapFn(getItem);
      prev.set(key, save);
      list[i2] = save.mapped;
    });
  }
}
function Key(props) {
  const { by } = props;
  return createMemo(
    keyArray(
      () => props.each,
      typeof by === "function" ? by : (v) => v[by],
      props.children,
      "fallback" in props ? { fallback: () => props.fallback } : void 0
    )
  );
}
function makeEventListener(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return tryOnCleanup(target.removeEventListener.bind(target, type, handler, options));
}
function createEventListener(targets, type, handler, options) {
  if (isServer2)
    return;
  const attachListeners = () => {
    asArray(access(targets)).forEach((el) => {
      if (el)
        asArray(access(type)).forEach((type2) => makeEventListener(el, type2, handler, options));
    });
  };
  if (typeof targets === "function")
    createEffect(attachListeners);
  else
    createRenderEffect(attachListeners);
}
function makeResizeObserver(callback, options) {
  if (isServer2) {
    return { observe: noop2, unobserve: noop2 };
  }
  const observer = new ResizeObserver(callback);
  onCleanup(observer.disconnect.bind(observer));
  return {
    observe: (ref) => observer.observe(ref, options),
    unobserve: observer.unobserve.bind(observer)
  };
}
function createResizeObserver(targets, onResize, options) {
  if (isServer2)
    return;
  const previousMap = /* @__PURE__ */ new WeakMap(), { observe, unobserve } = makeResizeObserver((entries2) => {
    for (const entry of entries2) {
      const { contentRect, target } = entry, width = Math.round(contentRect.width), height = Math.round(contentRect.height), previous = previousMap.get(target);
      if (!previous || previous.width !== width || previous.height !== height) {
        onResize(contentRect, target, entry);
        previousMap.set(target, { width, height });
      }
    }
  }, options);
  createEffect((prev) => {
    const refs = filterNonNullable(asArray(access(targets)));
    handleDiffArray(refs, prev, observe, unobserve);
    return refs;
  }, []);
}
function stringStyleToObject(style2) {
  const object = {};
  let match2;
  while (match2 = extractCSSregex.exec(style2)) {
    object[match2[1]] = match2[2];
  }
  return object;
}
function combineStyle(a2, b2) {
  if (typeof a2 === "string") {
    if (typeof b2 === "string")
      return `${a2};${b2}`;
    a2 = stringStyleToObject(a2);
  } else if (typeof b2 === "string") {
    b2 = stringStyleToObject(b2);
  }
  return { ...a2, ...b2 };
}
function addItemToArray(array, item, index = -1) {
  if (!(index in array)) {
    return [...array, item];
  }
  return [...array.slice(0, index), item, ...array.slice(index)];
}
function removeItemFromArray(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function isNumber2(value) {
  return typeof value === "number";
}
function isString2(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}
function isFunction(value) {
  return typeof value === "function";
}
function createGenerateId(baseId) {
  return (suffix) => `${baseId()}-${suffix}`;
}
function contains(parent, child) {
  if (!parent) {
    return false;
  }
  return parent === child || parent.contains(child);
}
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getDocument(node);
  if (!activeElement?.nodeName) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(activeElement.contentDocument.body, activeDescendant);
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = getDocument(activeElement).getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
function getWindow(node) {
  return getDocument(node).defaultView || window;
}
function getDocument(node) {
  return node ? node.ownerDocument || node : document;
}
function isFrame(element) {
  return element.tagName === "IFRAME";
}
function testPlatform(re2) {
  return typeof window !== "undefined" && window.navigator != null ? (
    // @ts-ignore
    re2.test(window.navigator["userAgentData"]?.platform || window.navigator.platform)
  ) : false;
}
function isMac() {
  return testPlatform(/^Mac/i);
}
function isIPhone() {
  return testPlatform(/^iPhone/i);
}
function isIPad() {
  return testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function isAppleDevice() {
  return isMac() || isIOS();
}
function callHandler(event, handler) {
  if (handler) {
    if (isFunction(handler)) {
      handler(event);
    } else {
      handler[0](handler[1], event);
    }
  }
  return event?.defaultPrevented;
}
function composeEventHandlers(handlers) {
  return (event) => {
    for (const handler of handlers) {
      callHandler(event, handler);
    }
  };
}
function isCtrlKey(e2) {
  if (isMac()) {
    return e2.metaKey && !e2.ctrlKey;
  }
  return e2.ctrlKey && !e2.metaKey;
}
function focusWithoutScrolling(element) {
  if (!element) {
    return;
  }
  if (supportsPreventScroll()) {
    element.focus({ preventScroll: true });
  } else {
    const scrollableElements = getScrollableElements(element);
    element.focus();
    restoreScrollPosition(scrollableElements);
  }
}
function supportsPreventScroll() {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false;
    try {
      const focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          supportsPreventScrollCached = true;
          return true;
        }
      });
    } catch (e2) {
    }
  }
  return supportsPreventScrollCached;
}
function getScrollableElements(element) {
  let parent = element.parentNode;
  const scrollableElements = [];
  const rootScrollingElement = document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    }
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  }
  return scrollableElements;
}
function restoreScrollPosition(scrollableElements) {
  for (const { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}
function getAllTabbableIn(container, includeContainer) {
  const elements = Array.from(container.querySelectorAll(FOCUSABLE_ELEMENT_SELECTOR));
  const tabbableElements2 = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements2.unshift(container);
  }
  tabbableElements2.forEach((element, i2) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(frameBody, false);
      tabbableElements2.splice(i2, 1, ...allFrameTabbable);
    }
  });
  return tabbableElements2;
}
function isTabbable(element) {
  return isFocusable(element) && !hasNegativeTabIndex(element);
}
function isFocusable(element) {
  return element.matches(FOCUSABLE_ELEMENT_SELECTOR) && isElementVisible(element);
}
function hasNegativeTabIndex(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
function isElementVisible(element, childElement) {
  return element.nodeName !== "#comment" && isStyleVisible(element) && isAttributeVisible(element, childElement) && (!element.parentElement || isElementVisible(element.parentElement, element));
}
function isStyleVisible(element) {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
    return false;
  }
  const { display, visibility } = element.style;
  let isVisible = display !== "none" && visibility !== "hidden" && visibility !== "collapse";
  if (isVisible) {
    if (!element.ownerDocument.defaultView) {
      return isVisible;
    }
    const { getComputedStyle: getComputedStyle3 } = element.ownerDocument.defaultView;
    const { display: computedDisplay, visibility: computedVisibility } = getComputedStyle3(element);
    isVisible = computedDisplay !== "none" && computedVisibility !== "hidden" && computedVisibility !== "collapse";
  }
  return isVisible;
}
function isAttributeVisible(element, childElement) {
  return !element.hasAttribute("hidden") && (element.nodeName === "DETAILS" && childElement && childElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true);
}
function getFocusableTreeWalker(root, opts, scope) {
  const selector = opts?.tabbable ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;
  const walker2 = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (opts?.from?.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.matches(selector) && isElementVisible(node) && true && (!opts?.accept || opts.accept(node))) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    }
  });
  if (opts?.from) {
    walker2.currentNode = opts.from;
  }
  return walker2;
}
function getScrollParent(node) {
  while (node && !isScrollable(node)) {
    node = node.parentElement;
  }
  return node || document.scrollingElement || document.documentElement;
}
function isScrollable(node) {
  const style2 = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style2.overflow + style2.overflowX + style2.overflowY);
}
function noop3() {
  return;
}
function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;
  const length = polygon.length;
  for (let l2 = length, i2 = 0, j = l2 - 1; i2 < l2; j = i2++) {
    const [xi, yi] = polygon[i2];
    const [xj, yj] = polygon[j];
    const [, vy] = polygon[j === 0 ? l2 - 1 : j - 1] || [0, 0];
    const where = (yi - yj) * (x - xi) - (xi - xj) * (y - yi);
    if (yj < yi) {
      if (y >= yj && y < yi) {
        if (where === 0)
          return true;
        if (where > 0) {
          if (y === yj) {
            if (y > vy) {
              inside = !inside;
            }
          } else {
            inside = !inside;
          }
        }
      }
    } else if (yi < yj) {
      if (y > yi && y <= yj) {
        if (where === 0)
          return true;
        if (where < 0) {
          if (y === yj) {
            if (y < vy) {
              inside = !inside;
            }
          } else {
            inside = !inside;
          }
        }
      }
    } else if (y == yi && (x >= xj && x <= xi || x >= xi && x <= xj)) {
      return true;
    }
  }
  return inside;
}
function mergeDefaultProps(defaultProps, props) {
  return mergeProps(defaultProps, props);
}
function setupGlobalEvents() {
  if (typeof window === "undefined") {
    return;
  }
  const onTransitionStart = (e2) => {
    if (!e2.target) {
      return;
    }
    let transitions = transitionsByElement.get(e2.target);
    if (!transitions) {
      transitions = /* @__PURE__ */ new Set();
      transitionsByElement.set(e2.target, transitions);
      e2.target.addEventListener("transitioncancel", onTransitionEnd);
    }
    transitions.add(e2.propertyName);
  };
  const onTransitionEnd = (e2) => {
    if (!e2.target) {
      return;
    }
    const properties = transitionsByElement.get(e2.target);
    if (!properties) {
      return;
    }
    properties.delete(e2.propertyName);
    if (properties.size === 0) {
      e2.target.removeEventListener("transitioncancel", onTransitionEnd);
      transitionsByElement.delete(e2.target);
    }
    if (transitionsByElement.size === 0) {
      for (const cb of transitionCallbacks) {
        cb();
      }
      transitionCallbacks.clear();
    }
  };
  document.body.addEventListener("transitionrun", onTransitionStart);
  document.body.addEventListener("transitionend", onTransitionEnd);
}
function scrollIntoView(scrollView, element) {
  const offsetX = relativeOffset(scrollView, element, "left");
  const offsetY = relativeOffset(scrollView, element, "top");
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  let x = scrollView.scrollLeft;
  let y = scrollView.scrollTop;
  const maxX = x + scrollView.offsetWidth;
  const maxY = y + scrollView.offsetHeight;
  if (offsetX <= x) {
    x = offsetX;
  } else if (offsetX + width > maxX) {
    x += offsetX + width - maxX;
  }
  if (offsetY <= y) {
    y = offsetY;
  } else if (offsetY + height > maxY) {
    y += offsetY + height - maxY;
  }
  scrollView.scrollLeft = x;
  scrollView.scrollTop = y;
}
function relativeOffset(ancestor, child, axis) {
  const prop = axis === "left" ? "offsetLeft" : "offsetTop";
  let sum = 0;
  while (child.offsetParent) {
    sum += child[prop];
    if (child.offsetParent === ancestor) {
      break;
    } else if (child.offsetParent.contains(ancestor)) {
      sum -= ancestor[prop];
      break;
    }
    child = child.offsetParent;
  }
  return sum;
}
function scrollIntoViewport(targetElement, opts) {
  if (document.contains(targetElement)) {
    const root = document.scrollingElement || document.documentElement;
    const isScrollPrevented = window.getComputedStyle(root).overflow === "hidden";
    if (!isScrollPrevented) {
      const { left: originalLeft, top: originalTop } = targetElement.getBoundingClientRect();
      targetElement?.scrollIntoView?.({ block: "nearest" });
      const { left: newLeft, top: newTop } = targetElement.getBoundingClientRect();
      if (Math.abs(originalLeft - newLeft) > 1 || Math.abs(originalTop - newTop) > 1) {
        targetElement.scrollIntoView?.({ block: "nearest" });
      }
    } else {
      let scrollParent = getScrollParent(targetElement);
      while (targetElement && scrollParent && targetElement !== root && scrollParent !== root) {
        scrollIntoView(scrollParent, targetElement);
        targetElement = scrollParent;
        scrollParent = getScrollParent(targetElement);
      }
    }
  }
}
function createRegisterId(setter) {
  return (id) => {
    setter(id);
    return () => setter(void 0);
  };
}
function createTagName(ref, fallback) {
  const [tagName, setTagName] = createSignal(stringOrUndefined(fallback?.()));
  createEffect(() => {
    setTagName(ref()?.tagName.toLowerCase() || stringOrUndefined(fallback?.()));
  });
  return tagName;
}
function stringOrUndefined(value) {
  return isString2(value) ? value : void 0;
}
function Polymorphic(props) {
  const [local, others] = splitProps(props, ["as"]);
  if (!local.as) {
    throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");
  }
  return (
    // @ts-ignore: Props are valid but not worth calculating
    createComponent(Dynamic, mergeProps(others, {
      get component() {
        return local.as;
      }
    }))
  );
}
function createFormControl(props) {
  const defaultId = `form-control-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [labelId, setLabelId] = createSignal();
  const [fieldId, setFieldId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [errorMessageId, setErrorMessageId] = createSignal();
  const getAriaLabelledBy = (fieldId2, fieldAriaLabel, fieldAriaLabelledBy) => {
    const hasAriaLabelledBy = fieldAriaLabelledBy != null || labelId() != null;
    return [
      fieldAriaLabelledBy,
      labelId(),
      // If there is both an aria-label and aria-labelledby, add the field itself has an aria-labelledby
      hasAriaLabelledBy && fieldAriaLabel != null ? fieldId2 : void 0
    ].filter(Boolean).join(" ") || void 0;
  };
  const getAriaDescribedBy = (fieldAriaDescribedBy) => {
    return [
      descriptionId(),
      // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA.
      // See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
      errorMessageId(),
      fieldAriaDescribedBy
    ].filter(Boolean).join(" ") || void 0;
  };
  const dataset = createMemo(() => ({
    "data-valid": access(mergedProps.validationState) === "valid" ? "" : void 0,
    "data-invalid": access(mergedProps.validationState) === "invalid" ? "" : void 0,
    "data-required": access(mergedProps.required) ? "" : void 0,
    "data-disabled": access(mergedProps.disabled) ? "" : void 0,
    "data-readonly": access(mergedProps.readOnly) ? "" : void 0
  }));
  const formControlContext = {
    name: () => access(mergedProps.name) ?? access(mergedProps.id),
    dataset,
    validationState: () => access(mergedProps.validationState),
    isRequired: () => access(mergedProps.required),
    isDisabled: () => access(mergedProps.disabled),
    isReadOnly: () => access(mergedProps.readOnly),
    labelId,
    fieldId,
    descriptionId,
    errorMessageId,
    getAriaLabelledBy,
    getAriaDescribedBy,
    generateId: createGenerateId(() => access(mergedProps.id)),
    registerLabel: createRegisterId(setLabelId),
    registerField: createRegisterId(setFieldId),
    registerDescription: createRegisterId(setDescriptionId),
    registerErrorMessage: createRegisterId(setErrorMessageId)
  };
  return {
    formControlContext
  };
}
function useFormControlContext() {
  const context = useContext4(FormControlContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");
  }
  return context;
}
function FormControlDescription(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function FormControlErrorMessage(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("error-message")
  }, props);
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  const isInvalid = () => context.validationState() === "invalid";
  createEffect(() => {
    if (!isInvalid()) {
      return;
    }
    onCleanup(context.registerErrorMessage(others.id));
  });
  return createComponent(Show, {
    get when() {
      return local.forceMount || isInvalid();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div"
      }, () => context.dataset(), others));
    }
  });
}
function FormControlLabel(props) {
  let ref;
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref"]);
  const tagName = createTagName(() => ref, () => "label");
  createEffect(() => onCleanup(context.registerLabel(others.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "label",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get ["for"]() {
      return memo(() => tagName() === "label")() ? context.fieldId() : void 0;
    }
  }, () => context.dataset(), others));
}
function createFormResetListener(element, handler) {
  createEffect(
    on(element, (element2) => {
      if (element2 == null) {
        return;
      }
      const form = getClosestForm(element2);
      if (form == null) {
        return;
      }
      form.addEventListener("reset", handler, { passive: true });
      onCleanup(() => {
        form.removeEventListener("reset", handler);
      });
    })
  );
}
function getClosestForm(element) {
  return isFormElement(element) ? element.form : element.closest("form");
}
function isFormElement(element) {
  return element.matches("textarea, input, select, button");
}
function createControllableSignal(props) {
  const [_value, _setValue] = createSignal(props.defaultValue?.());
  const isControlled = createMemo(() => props.value?.() !== void 0);
  const value = createMemo(() => isControlled() ? props.value?.() : _value());
  const setValue = (next) => {
    untrack(() => {
      const nextValue = accessWith(next, value());
      if (!Object.is(nextValue, value())) {
        if (!isControlled()) {
          _setValue(nextValue);
        }
        props.onChange?.(nextValue);
      }
      return nextValue;
    });
  };
  return [value, setValue];
}
function createControllableBooleanSignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? false;
  return [value, setValue];
}
function createControllableArraySignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? [];
  return [value, setValue];
}
function createToggleState(props = {}) {
  const [isSelected, _setIsSelected] = createControllableBooleanSignal({
    value: () => access(props.isSelected),
    defaultValue: () => !!access(props.defaultIsSelected),
    onChange: (value) => props.onSelectedChange?.(value)
  });
  const setIsSelected = (value) => {
    if (!access(props.isReadOnly) && !access(props.isDisabled)) {
      _setIsSelected(value);
    }
  };
  const toggle = () => {
    if (!access(props.isReadOnly) && !access(props.isDisabled)) {
      _setIsSelected(!isSelected());
    }
  };
  return {
    isSelected,
    setIsSelected,
    toggle
  };
}
function useOptionalDomCollectionContext() {
  return useContext4(DomCollectionContext);
}
function useDomCollectionContext() {
  const context = useOptionalDomCollectionContext();
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component"
    );
  }
  return context;
}
function isElementPreceding(a2, b2) {
  return Boolean(
    b2.compareDocumentPosition(a2) & Node.DOCUMENT_POSITION_PRECEDING
  );
}
function findDOMIndex(items, item) {
  const itemEl = item.ref();
  if (!itemEl) {
    return -1;
  }
  let length = items.length;
  if (!length) {
    return -1;
  }
  while (length--) {
    const currentItemEl = items[length]?.ref();
    if (!currentItemEl) {
      continue;
    }
    if (isElementPreceding(currentItemEl, itemEl)) {
      return length + 1;
    }
  }
  return 0;
}
function sortBasedOnDOMPosition(items) {
  const pairs = items.map((item, index) => [index, item]);
  let isOrderDifferent = false;
  pairs.sort(([indexA, a2], [indexB, b2]) => {
    const elementA = a2.ref();
    const elementB = b2.ref();
    if (elementA === elementB) {
      return 0;
    }
    if (!elementA || !elementB) {
      return 0;
    }
    if (isElementPreceding(elementA, elementB)) {
      if (indexA > indexB) {
        isOrderDifferent = true;
      }
      return -1;
    }
    if (indexA < indexB) {
      isOrderDifferent = true;
    }
    return 1;
  });
  if (isOrderDifferent) {
    return pairs.map(([_, item]) => item);
  }
  return items;
}
function setItemsBasedOnDOMPosition(items, setItems) {
  const sortedItems = sortBasedOnDOMPosition(items);
  if (items !== sortedItems) {
    setItems(sortedItems);
  }
}
function getCommonParent(items) {
  const firstItem = items[0];
  const lastItemEl = items[items.length - 1]?.ref();
  let parentEl = firstItem?.ref()?.parentElement;
  while (parentEl) {
    if (lastItemEl && parentEl.contains(lastItemEl)) {
      return parentEl;
    }
    parentEl = parentEl.parentElement;
  }
  return getDocument(parentEl).body;
}
function createTimeoutObserver(items, setItems) {
  createEffect(() => {
    const timeout = setTimeout(() => {
      setItemsBasedOnDOMPosition(items(), setItems);
    });
    onCleanup(() => clearTimeout(timeout));
  });
}
function createSortBasedOnDOMPosition(items, setItems) {
  if (typeof IntersectionObserver !== "function") {
    createTimeoutObserver(items, setItems);
    return;
  }
  let previousItems = [];
  createEffect(() => {
    const callback = () => {
      const hasPreviousItems = !!previousItems.length;
      previousItems = items();
      if (!hasPreviousItems) {
        return;
      }
      setItemsBasedOnDOMPosition(items(), setItems);
    };
    const root = getCommonParent(items());
    const observer = new IntersectionObserver(callback, { root });
    for (const item of items()) {
      const itemEl = item.ref();
      if (itemEl) {
        observer.observe(itemEl);
      }
    }
    onCleanup(() => observer.disconnect());
  });
}
function createDomCollection(props = {}) {
  const [items, setItems] = createControllableArraySignal({
    value: () => access(props.items),
    onChange: (value) => props.onItemsChange?.(value)
  });
  createSortBasedOnDOMPosition(items, setItems);
  const registerItem = (item) => {
    setItems((prevItems) => {
      const index = findDOMIndex(prevItems, item);
      return addItemToArray(prevItems, item, index);
    });
    return () => {
      setItems((prevItems) => {
        const nextItems = prevItems.filter(
          (prevItem) => prevItem.ref() !== item.ref()
        );
        if (prevItems.length === nextItems.length) {
          return prevItems;
        }
        return nextItems;
      });
    };
  };
  const DomCollectionProvider = (props2) => {
    return createComponent(DomCollectionContext.Provider, {
      value: { registerItem },
      get children() {
        return props2.children;
      }
    });
  };
  return { DomCollectionProvider };
}
function createDomCollectionItem(props) {
  const context = useDomCollectionContext();
  const mergedProps = mergeDefaultProps({ shouldRegisterItem: true }, props);
  createEffect(() => {
    if (!mergedProps.shouldRegisterItem) {
      return;
    }
    const unregister = context.registerItem(mergedProps.getItem());
    onCleanup(unregister);
  });
}
function buildNodes(params) {
  let index = params.startIndex ?? 0;
  const level = params.startLevel ?? 0;
  const nodes = [];
  const getKey = (data) => {
    if (data == null) {
      return "";
    }
    const _getKey = params.getKey ?? "key";
    const dataKey = isString2(_getKey) ? data[_getKey] : _getKey(data);
    return dataKey != null ? String(dataKey) : "";
  };
  const getTextValue = (data) => {
    if (data == null) {
      return "";
    }
    const _getTextValue = params.getTextValue ?? "textValue";
    const dataTextValue = isString2(_getTextValue) ? data[_getTextValue] : _getTextValue(data);
    return dataTextValue != null ? String(dataTextValue) : "";
  };
  const getDisabled = (data) => {
    if (data == null) {
      return false;
    }
    const _getDisabled = params.getDisabled ?? "disabled";
    return (isString2(_getDisabled) ? data[_getDisabled] : _getDisabled(data)) ?? false;
  };
  const getSectionChildren = (data) => {
    if (data == null) {
      return void 0;
    }
    if (isString2(params.getSectionChildren)) {
      return data[params.getSectionChildren];
    }
    return params.getSectionChildren?.(data);
  };
  for (const data of params.dataSource) {
    if (isString2(data) || isNumber2(data)) {
      nodes.push({
        type: "item",
        rawValue: data,
        key: String(data),
        textValue: String(data),
        disabled: getDisabled(data),
        level,
        index
      });
      index++;
      continue;
    }
    if (getSectionChildren(data) != null) {
      nodes.push({
        type: "section",
        rawValue: data,
        key: "",
        // not applicable here
        textValue: "",
        // not applicable here
        disabled: false,
        // not applicable here
        level,
        index
      });
      index++;
      const sectionChildren = getSectionChildren(data) ?? [];
      if (sectionChildren.length > 0) {
        const childNodes = buildNodes({
          dataSource: sectionChildren,
          getKey: params.getKey,
          getTextValue: params.getTextValue,
          getDisabled: params.getDisabled,
          getSectionChildren: params.getSectionChildren,
          startIndex: index,
          startLevel: level + 1
        });
        nodes.push(...childNodes);
        index += childNodes.length;
      }
    } else {
      nodes.push({
        type: "item",
        rawValue: data,
        key: getKey(data),
        textValue: getTextValue(data),
        disabled: getDisabled(data),
        level,
        index
      });
      index++;
    }
  }
  return nodes;
}
function createCollection(props, deps = []) {
  return createMemo(() => {
    const nodes = buildNodes({
      dataSource: access(props.dataSource),
      getKey: access(props.getKey),
      getTextValue: access(props.getTextValue),
      getDisabled: access(props.getDisabled),
      getSectionChildren: access(props.getSectionChildren)
    });
    for (let i2 = 0; i2 < deps.length; i2++)
      deps[i2]();
    return props.factory(nodes);
  });
}
function isRTL(locale) {
  if (Intl.Locale) {
    const script = new Intl.Locale(locale).maximize().script ?? "";
    return RTL_SCRIPTS.has(script);
  }
  const lang = locale.split("-")[0];
  return RTL_LANGS.has(lang);
}
function getReadingDirection(locale) {
  return isRTL(locale) ? "rtl" : "ltr";
}
function getDefaultLocale() {
  let locale = typeof navigator !== "undefined" && // @ts-ignore
  (navigator.language || navigator.userLanguage) || "en-US";
  return {
    locale,
    direction: getReadingDirection(locale)
  };
}
function updateLocale() {
  currentLocale = getDefaultLocale();
  for (const listener of listeners) {
    listener(currentLocale);
  }
}
function createDefaultLocale() {
  const defaultSSRLocale = {
    locale: "en-US",
    direction: "ltr"
  };
  const [defaultClientLocale, setDefaultClientLocale] = createSignal(currentLocale);
  const defaultLocale = createMemo(
    () => isServer2 ? defaultSSRLocale : defaultClientLocale()
  );
  onMount(() => {
    if (listeners.size === 0) {
      window.addEventListener("languagechange", updateLocale);
    }
    listeners.add(setDefaultClientLocale);
    onCleanup(() => {
      listeners.delete(setDefaultClientLocale);
      if (listeners.size === 0) {
        window.removeEventListener("languagechange", updateLocale);
      }
    });
  });
  return {
    locale: () => defaultLocale().locale,
    direction: () => defaultLocale().direction
  };
}
function useLocale() {
  const defaultLocale = createDefaultLocale();
  const context = useContext4(I18nContext);
  return context || defaultLocale;
}
function createCollator(options) {
  const { locale } = useLocale();
  const cacheKey = createMemo(() => {
    return locale() + (options ? Object.entries(options).sort((a2, b2) => a2[0] < b2[0] ? -1 : 1).join() : "");
  });
  return createMemo(() => {
    const key = cacheKey();
    let collator;
    if (cache.has(key)) {
      collator = cache.get(key);
    }
    if (!collator) {
      collator = new Intl.Collator(locale(), options);
      cache.set(key, collator);
    }
    return collator;
  });
}
function createControllableSelectionSignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? new Selection();
  return [value, setValue];
}
function isNonContiguousSelectionModifier(e2) {
  return isAppleDevice() ? e2.altKey : e2.ctrlKey;
}
function isCtrlKeyPressed(e2) {
  if (isMac()) {
    return e2.metaKey;
  }
  return e2.ctrlKey;
}
function convertSelection(selection) {
  return new Selection(selection);
}
function isSameSelection(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }
  for (const item of setA) {
    if (!setB.has(item)) {
      return false;
    }
  }
  return true;
}
function createMultipleSelectionState(props) {
  const mergedProps = mergeDefaultProps(
    {
      selectionMode: "none",
      selectionBehavior: "toggle"
    },
    props
  );
  const [isFocused, setFocused] = createSignal(false);
  const [focusedKey, setFocusedKey] = createSignal();
  const selectedKeysProp = createMemo(() => {
    const selection = access(mergedProps.selectedKeys);
    if (selection != null) {
      return convertSelection(selection);
    }
    return selection;
  });
  const defaultSelectedKeys = createMemo(() => {
    const defaultSelection = access(mergedProps.defaultSelectedKeys);
    if (defaultSelection != null) {
      return convertSelection(defaultSelection);
    }
    return new Selection();
  });
  const [selectedKeys, _setSelectedKeys] = createControllableSelectionSignal({
    value: selectedKeysProp,
    defaultValue: defaultSelectedKeys,
    onChange: (value) => mergedProps.onSelectionChange?.(value)
  });
  const [selectionBehavior, setSelectionBehavior] = createSignal(access(mergedProps.selectionBehavior));
  const selectionMode = () => access(mergedProps.selectionMode);
  const disallowEmptySelection = () => access(mergedProps.disallowEmptySelection) ?? false;
  const setSelectedKeys = (keys2) => {
    if (access(mergedProps.allowDuplicateSelectionEvents) || !isSameSelection(keys2, selectedKeys())) {
      _setSelectedKeys(keys2);
    }
  };
  createEffect(() => {
    const selection = selectedKeys();
    if (access(mergedProps.selectionBehavior) === "replace" && selectionBehavior() === "toggle" && typeof selection === "object" && selection.size === 0) {
      setSelectionBehavior("replace");
    }
  });
  createEffect(() => {
    setSelectionBehavior(access(mergedProps.selectionBehavior) ?? "toggle");
  });
  return {
    selectionMode,
    disallowEmptySelection,
    selectionBehavior,
    setSelectionBehavior,
    isFocused,
    setFocused,
    focusedKey,
    setFocusedKey,
    selectedKeys,
    setSelectedKeys
  };
}
function createTypeSelect(props) {
  const [search, setSearch] = createSignal("");
  const [timeoutId, setTimeoutId] = createSignal(-1);
  const onKeyDown = (e2) => {
    if (access(props.isDisabled)) {
      return;
    }
    const delegate = access(props.keyboardDelegate);
    const manager = access(props.selectionManager);
    if (!delegate.getKeyForSearch) {
      return;
    }
    const character = getStringForKey(e2.key);
    if (!character || e2.ctrlKey || e2.metaKey) {
      return;
    }
    if (character === " " && search().trim().length > 0) {
      e2.preventDefault();
      e2.stopPropagation();
    }
    let newSearch = setSearch((prev) => prev + character);
    let key = delegate.getKeyForSearch(newSearch, manager.focusedKey()) ?? delegate.getKeyForSearch(newSearch);
    if (key == null && isAllSameLetter(newSearch)) {
      newSearch = newSearch[0];
      key = delegate.getKeyForSearch(newSearch, manager.focusedKey()) ?? delegate.getKeyForSearch(newSearch);
    }
    if (key != null) {
      manager.setFocusedKey(key);
      props.onTypeSelect?.(key);
    }
    clearTimeout(timeoutId());
    setTimeoutId(window.setTimeout(() => setSearch(""), 500));
  };
  return {
    typeSelectHandlers: {
      onKeyDown
    }
  };
}
function getStringForKey(key) {
  if (key.length === 1 || !/^[A-Z]/i.test(key)) {
    return key;
  }
  return "";
}
function isAllSameLetter(search) {
  return search.split("").every((letter) => letter === search[0]);
}
function createSelectableCollection(props, ref, scrollRef) {
  const defaultProps = {
    selectOnFocus: () => access(props.selectionManager).selectionBehavior() === "replace"
  };
  const mergedProps = mergeProps(defaultProps, props);
  const finalScrollRef = () => ref();
  const { direction } = useLocale();
  let scrollPos = { top: 0, left: 0 };
  createEventListener(
    () => !access(mergedProps.isVirtualized) ? finalScrollRef() : void 0,
    "scroll",
    () => {
      const scrollEl = finalScrollRef();
      if (!scrollEl) {
        return;
      }
      scrollPos = {
        top: scrollEl.scrollTop,
        left: scrollEl.scrollLeft
      };
    }
  );
  const { typeSelectHandlers } = createTypeSelect({
    isDisabled: () => access(mergedProps.disallowTypeAhead),
    keyboardDelegate: () => access(mergedProps.keyboardDelegate),
    selectionManager: () => access(mergedProps.selectionManager)
  });
  const orientation = () => access(mergedProps.orientation) ?? "vertical";
  const onKeyDown = (e2) => {
    callHandler(e2, typeSelectHandlers.onKeyDown);
    if (e2.altKey && e2.key === "Tab") {
      e2.preventDefault();
    }
    const refEl = ref();
    if (!refEl?.contains(e2.target)) {
      return;
    }
    const manager = access(mergedProps.selectionManager);
    const selectOnFocus = access(mergedProps.selectOnFocus);
    const navigateToKey = (key) => {
      if (key != null) {
        manager.setFocusedKey(key);
        if (e2.shiftKey && manager.selectionMode() === "multiple") {
          manager.extendSelection(key);
        } else if (selectOnFocus && !isNonContiguousSelectionModifier(e2)) {
          manager.replaceSelection(key);
        }
      }
    };
    const delegate = access(mergedProps.keyboardDelegate);
    const shouldFocusWrap = access(mergedProps.shouldFocusWrap);
    const focusedKey = manager.focusedKey();
    switch (e2.key) {
      case (orientation() === "vertical" ? "ArrowDown" : "ArrowRight"): {
        if (delegate.getKeyBelow) {
          e2.preventDefault();
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyBelow(focusedKey);
          } else {
            nextKey = delegate.getFirstKey?.();
          }
          if (nextKey == null && shouldFocusWrap) {
            nextKey = delegate.getFirstKey?.(focusedKey);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowUp" : "ArrowLeft"): {
        if (delegate.getKeyAbove) {
          e2.preventDefault();
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyAbove(focusedKey);
          } else {
            nextKey = delegate.getLastKey?.();
          }
          if (nextKey == null && shouldFocusWrap) {
            nextKey = delegate.getLastKey?.(focusedKey);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowLeft" : "ArrowUp"): {
        if (delegate.getKeyLeftOf) {
          e2.preventDefault();
          const isRTL3 = direction() === "rtl";
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyLeftOf(focusedKey);
          } else {
            nextKey = isRTL3 ? delegate.getFirstKey?.() : delegate.getLastKey?.();
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowRight" : "ArrowDown"): {
        if (delegate.getKeyRightOf) {
          e2.preventDefault();
          const isRTL3 = direction() === "rtl";
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyRightOf(focusedKey);
          } else {
            nextKey = isRTL3 ? delegate.getLastKey?.() : delegate.getFirstKey?.();
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case "Home":
        if (delegate.getFirstKey) {
          e2.preventDefault();
          const firstKey = delegate.getFirstKey(
            focusedKey,
            isCtrlKeyPressed(e2)
          );
          if (firstKey != null) {
            manager.setFocusedKey(firstKey);
            if (isCtrlKeyPressed(e2) && e2.shiftKey && manager.selectionMode() === "multiple") {
              manager.extendSelection(firstKey);
            } else if (selectOnFocus) {
              manager.replaceSelection(firstKey);
            }
          }
        }
        break;
      case "End":
        if (delegate.getLastKey) {
          e2.preventDefault();
          const lastKey = delegate.getLastKey(focusedKey, isCtrlKeyPressed(e2));
          if (lastKey != null) {
            manager.setFocusedKey(lastKey);
            if (isCtrlKeyPressed(e2) && e2.shiftKey && manager.selectionMode() === "multiple") {
              manager.extendSelection(lastKey);
            } else if (selectOnFocus) {
              manager.replaceSelection(lastKey);
            }
          }
        }
        break;
      case "PageDown":
        if (delegate.getKeyPageBelow && focusedKey != null) {
          e2.preventDefault();
          const nextKey = delegate.getKeyPageBelow(focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case "PageUp":
        if (delegate.getKeyPageAbove && focusedKey != null) {
          e2.preventDefault();
          const nextKey = delegate.getKeyPageAbove(focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case "a":
        if (isCtrlKeyPressed(e2) && manager.selectionMode() === "multiple" && access(mergedProps.disallowSelectAll) !== true) {
          e2.preventDefault();
          manager.selectAll();
        }
        break;
      case "Escape":
        if (!e2.defaultPrevented) {
          e2.preventDefault();
          if (!access(mergedProps.disallowEmptySelection)) {
            manager.clearSelection();
          }
        }
        break;
      case "Tab": {
        if (!access(mergedProps.allowsTabNavigation)) {
          if (e2.shiftKey) {
            refEl.focus();
          } else {
            const walker2 = getFocusableTreeWalker(refEl, { tabbable: true });
            let next;
            let last;
            do {
              last = walker2.lastChild();
              if (last) {
                next = last;
              }
            } while (last);
            if (next && !next.contains(document.activeElement)) {
              focusWithoutScrolling(next);
            }
          }
          break;
        }
      }
    }
  };
  const onFocusIn = (e2) => {
    const manager = access(mergedProps.selectionManager);
    const delegate = access(mergedProps.keyboardDelegate);
    const selectOnFocus = access(mergedProps.selectOnFocus);
    if (manager.isFocused()) {
      if (!e2.currentTarget.contains(e2.target)) {
        manager.setFocused(false);
      }
      return;
    }
    if (!e2.currentTarget.contains(e2.target)) {
      return;
    }
    manager.setFocused(true);
    if (manager.focusedKey() == null) {
      const navigateToFirstKey = (key) => {
        if (key == null) {
          return;
        }
        manager.setFocusedKey(key);
        if (selectOnFocus) {
          manager.replaceSelection(key);
        }
      };
      const relatedTarget = e2.relatedTarget;
      if (relatedTarget && e2.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING) {
        navigateToFirstKey(
          manager.lastSelectedKey() ?? delegate.getLastKey?.()
        );
      } else {
        navigateToFirstKey(
          manager.firstSelectedKey() ?? delegate.getFirstKey?.()
        );
      }
    } else if (!access(mergedProps.isVirtualized)) {
      const scrollEl = finalScrollRef();
      if (scrollEl) {
        scrollEl.scrollTop = scrollPos.top;
        scrollEl.scrollLeft = scrollPos.left;
        const element = scrollEl.querySelector(
          `[data-key="${manager.focusedKey()}"]`
        );
        if (element) {
          focusWithoutScrolling(element);
          scrollIntoView(scrollEl, element);
        }
      }
    }
  };
  const onFocusOut = (e2) => {
    const manager = access(mergedProps.selectionManager);
    if (!e2.currentTarget.contains(e2.relatedTarget)) {
      manager.setFocused(false);
    }
  };
  const onMouseDown = (e2) => {
    if (finalScrollRef() === e2.target) {
      e2.preventDefault();
    }
  };
  const tryAutoFocus = () => {
    const autoFocus = access(mergedProps.autoFocus);
    if (!autoFocus) {
      return;
    }
    const manager = access(mergedProps.selectionManager);
    const delegate = access(mergedProps.keyboardDelegate);
    let focusedKey;
    if (autoFocus === "first") {
      focusedKey = delegate.getFirstKey?.();
    }
    if (autoFocus === "last") {
      focusedKey = delegate.getLastKey?.();
    }
    const selectedKeys = manager.selectedKeys();
    if (selectedKeys.size) {
      focusedKey = selectedKeys.values().next().value;
    }
    manager.setFocused(true);
    manager.setFocusedKey(focusedKey);
    const refEl = ref();
    if (refEl && focusedKey == null && !access(mergedProps.shouldUseVirtualFocus)) {
      focusWithoutScrolling(refEl);
    }
  };
  onMount(() => {
    if (mergedProps.deferAutoFocus) {
      setTimeout(tryAutoFocus, 0);
    } else {
      tryAutoFocus();
    }
  });
  createEffect(
    on(
      [
        finalScrollRef,
        () => access(mergedProps.isVirtualized),
        () => access(mergedProps.selectionManager).focusedKey()
      ],
      (newValue) => {
        const [scrollEl, isVirtualized, focusedKey] = newValue;
        if (isVirtualized) {
          focusedKey && mergedProps.scrollToKey?.(focusedKey);
        } else {
          if (focusedKey && scrollEl) {
            const element = scrollEl.querySelector(
              `[data-key="${focusedKey}"]`
            );
            if (element) {
              scrollIntoView(scrollEl, element);
            }
          }
        }
      }
    )
  );
  const tabIndex = createMemo(() => {
    if (access(mergedProps.shouldUseVirtualFocus)) {
      return void 0;
    }
    return access(mergedProps.selectionManager).focusedKey() == null ? 0 : -1;
  });
  return {
    tabIndex,
    onKeyDown,
    onMouseDown,
    onFocusIn,
    onFocusOut
  };
}
function createSelectableItem(props, ref) {
  const manager = () => access(props.selectionManager);
  const key = () => access(props.key);
  const shouldUseVirtualFocus = () => access(props.shouldUseVirtualFocus);
  const onSelect = (e2) => {
    if (manager().selectionMode() === "none") {
      return;
    }
    if (manager().selectionMode() === "single") {
      if (manager().isSelected(key()) && !manager().disallowEmptySelection()) {
        manager().toggleSelection(key());
      } else {
        manager().replaceSelection(key());
      }
    } else if (e2?.shiftKey) {
      manager().extendSelection(key());
    } else if (manager().selectionBehavior() === "toggle" || isCtrlKeyPressed(e2) || "pointerType" in e2 && e2.pointerType === "touch") {
      manager().toggleSelection(key());
    } else {
      manager().replaceSelection(key());
    }
  };
  const isSelected = () => manager().isSelected(key());
  const isDisabled = () => access(props.disabled) || manager().isDisabled(key());
  const allowsSelection = () => !isDisabled() && manager().canSelectItem(key());
  let pointerDownType = null;
  const onPointerDown = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    pointerDownType = e2.pointerType;
    if (e2.pointerType === "mouse" && e2.button === 0 && !access(props.shouldSelectOnPressUp)) {
      onSelect(e2);
    }
  };
  const onPointerUp = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    if (e2.pointerType === "mouse" && e2.button === 0 && access(props.shouldSelectOnPressUp) && access(props.allowsDifferentPressOrigin)) {
      onSelect(e2);
    }
  };
  const onClick = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    if (access(props.shouldSelectOnPressUp) && !access(props.allowsDifferentPressOrigin) || pointerDownType !== "mouse") {
      onSelect(e2);
    }
  };
  const onKeyDown = (e2) => {
    if (!allowsSelection() || !["Enter", " "].includes(e2.key)) {
      return;
    }
    if (isNonContiguousSelectionModifier(e2)) {
      manager().toggleSelection(key());
    } else {
      onSelect(e2);
    }
  };
  const onMouseDown = (e2) => {
    if (isDisabled()) {
      e2.preventDefault();
    }
  };
  const onFocus = (e2) => {
    const refEl = ref();
    if (shouldUseVirtualFocus() || isDisabled() || !refEl) {
      return;
    }
    if (e2.target === refEl) {
      manager().setFocusedKey(key());
    }
  };
  const tabIndex = createMemo(() => {
    if (shouldUseVirtualFocus() || isDisabled()) {
      return void 0;
    }
    return key() === manager().focusedKey() ? 0 : -1;
  });
  const dataKey = createMemo(() => {
    return access(props.virtualized) ? void 0 : key();
  });
  createEffect(
    on(
      [
        ref,
        key,
        shouldUseVirtualFocus,
        () => manager().focusedKey(),
        () => manager().isFocused()
      ],
      ([refEl, key2, shouldUseVirtualFocus2, focusedKey, isFocused]) => {
        if (refEl && key2 === focusedKey && isFocused && !shouldUseVirtualFocus2 && document.activeElement !== refEl) {
          if (props.focus) {
            props.focus();
          } else {
            focusWithoutScrolling(refEl);
          }
        }
      }
    )
  );
  return {
    isSelected,
    isDisabled,
    allowsSelection,
    tabIndex,
    dataKey,
    onPointerDown,
    onPointerUp,
    onClick,
    onKeyDown,
    onMouseDown,
    onFocus
  };
}
function createListState(props) {
  const selectionState = createMultipleSelectionState(props);
  const factory = (nodes) => {
    return props.filter ? new ListCollection(props.filter(nodes)) : new ListCollection(nodes);
  };
  const collection = createCollection(
    {
      dataSource: () => access(props.dataSource),
      getKey: () => access(props.getKey),
      getTextValue: () => access(props.getTextValue),
      getDisabled: () => access(props.getDisabled),
      getSectionChildren: () => access(props.getSectionChildren),
      factory
    },
    [() => props.filter]
  );
  const selectionManager = new SelectionManager(collection, selectionState);
  createComputed(() => {
    const focusedKey = selectionState.focusedKey();
    if (focusedKey != null && !collection().getItem(focusedKey)) {
      selectionState.setFocusedKey(void 0);
    }
  });
  return {
    collection,
    selectionManager: () => selectionManager
  };
}
function indexOf(node) {
  return layers.findIndex((layer) => layer.node === node);
}
function find2(node) {
  return layers[indexOf(node)];
}
function isTopMostLayer(node) {
  return layers[layers.length - 1].node === node;
}
function getPointerBlockingLayers() {
  return layers.filter((layer) => layer.isPointerBlocking);
}
function getTopMostPointerBlockingLayer() {
  return [...getPointerBlockingLayers()].slice(-1)[0];
}
function hasPointerBlockingLayer() {
  return getPointerBlockingLayers().length > 0;
}
function isBelowPointerBlockingLayer(node) {
  const highestBlockingIndex = indexOf(getTopMostPointerBlockingLayer()?.node);
  return indexOf(node) < highestBlockingIndex;
}
function addLayer(layer) {
  layers.push(layer);
}
function removeLayer(node) {
  const index = indexOf(node);
  if (index < 0) {
    return;
  }
  layers.splice(index, 1);
}
function assignPointerEventToLayers() {
  for (const {
    node
  } of layers) {
    node.style.pointerEvents = isBelowPointerBlockingLayer(node) ? "none" : "auto";
  }
}
function disableBodyPointerEvents(node) {
  if (hasPointerBlockingLayer() && !hasDisabledBodyPointerEvents) {
    const ownerDocument = getDocument(node);
    originalBodyPointerEvents = document.body.style.pointerEvents;
    ownerDocument.body.style.pointerEvents = "none";
    hasDisabledBodyPointerEvents = true;
  }
}
function restoreBodyPointerEvents(node) {
  if (hasPointerBlockingLayer()) {
    return;
  }
  const ownerDocument = getDocument(node);
  ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
  if (ownerDocument.body.style.length === 0) {
    ownerDocument.body.removeAttribute("style");
  }
  hasDisabledBodyPointerEvents = false;
}
function isButton(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "button") {
    return true;
  }
  if (tagName === "input" && element.type) {
    return BUTTON_INPUT_TYPES.indexOf(element.type) !== -1;
  }
  return false;
}
function ButtonRoot(props) {
  let ref;
  const mergedProps = mergeDefaultProps({
    type: "button"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "type", "disabled"]);
  const tagName = createTagName(() => ref, () => "button");
  const isNativeButton = createMemo(() => {
    const elementTagName = tagName();
    if (elementTagName == null) {
      return false;
    }
    return isButton({
      tagName: elementTagName,
      type: local.type
    });
  });
  const isNativeInput = createMemo(() => {
    return tagName() === "input";
  });
  const isNativeLink = createMemo(() => {
    return tagName() === "a" && ref?.getAttribute("href") != null;
  });
  return createComponent(Polymorphic, mergeProps({
    as: "button",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get type() {
      return isNativeButton() || isNativeInput() ? local.type : void 0;
    },
    get role() {
      return !isNativeButton() && !isNativeLink() ? "button" : void 0;
    },
    get tabIndex() {
      return !isNativeButton() && !isNativeLink() && !local.disabled ? 0 : void 0;
    },
    get disabled() {
      return isNativeButton() || isNativeInput() ? local.disabled : void 0;
    },
    get ["aria-disabled"]() {
      return !isNativeButton() && !isNativeInput() && local.disabled ? true : void 0;
    },
    get ["data-disabled"]() {
      return local.disabled ? "" : void 0;
    }
  }, others));
}
function clamp2(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow2(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow2(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow2(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow2(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow2(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e2) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow2(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow2(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
function getVisualOffsets(element) {
  const win = getWindow2(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow2(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow2(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow2(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow2(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow2(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache2) {
  const cachedResult = cache2.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache2.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow2(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
function isRTL2(element) {
  return getComputedStyle2(element).direction === "rtl";
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries2) {
      const ratio = entries2[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e2) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
function usePopperContext() {
  const context = useContext4(PopperContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");
  }
  return context;
}
function PopperArrow(props) {
  const context = usePopperContext();
  const mergedProps = mergeDefaultProps({
    size: DEFAULT_SIZE
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "size"]);
  const dir = () => context.currentPlacement().split("-")[0];
  const contentStyle = createComputedStyle(context.contentRef);
  const fill = () => contentStyle()?.getPropertyValue("background-color") || "none";
  const stroke = () => contentStyle()?.getPropertyValue(`border-${dir()}-color`) || "none";
  const borderWidth = () => contentStyle()?.getPropertyValue(`border-${dir()}-width`) || "0px";
  const strokeWidth = () => {
    return Number.parseInt(borderWidth()) * 2 * (DEFAULT_SIZE / local.size);
  };
  const rotate = () => {
    return `rotate(${ROTATION_DEG[dir()]} ${HALF_DEFAULT_SIZE} ${HALF_DEFAULT_SIZE}) translate(0 2)`;
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setArrowRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    "aria-hidden": "true",
    get style() {
      return combineStyle({
        // server side rendering
        position: "absolute",
        "font-size": `${local.size}px`,
        width: "1em",
        height: "1em",
        "pointer-events": "none",
        fill: fill(),
        stroke: stroke(),
        "stroke-width": strokeWidth()
      }, local.style);
    }
  }, others, {
    get children() {
      const _el$ = _tmpl$(), _el$2 = _el$.firstChild;
      createRenderEffect(() => setAttribute(_el$2, "transform", rotate()));
      return _el$;
    }
  }));
}
function createComputedStyle(element) {
  const [style2, setStyle] = createSignal();
  createEffect(() => {
    const el = element();
    el && setStyle(getWindow(el).getComputedStyle(el));
  });
  return style2;
}
function PopperPositioner(props) {
  const context = usePopperContext();
  const [local, others] = splitProps(props, ["ref", "style"]);
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setPositionerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    "data-popper-positioner": "",
    get style() {
      return combineStyle({
        position: "absolute",
        top: 0,
        left: 0,
        "min-width": "max-content"
      }, local.style);
    }
  }, others));
}
function createDOMRect(anchorRect) {
  const { x = 0, y = 0, width = 0, height = 0 } = anchorRect ?? {};
  if (typeof DOMRect === "function") {
    return new DOMRect(x, y, width, height);
  }
  const rect = {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x
  };
  return { ...rect, toJSON: () => rect };
}
function getAnchorElement(anchor, getAnchorRect) {
  const contextElement = anchor;
  return {
    contextElement,
    getBoundingClientRect: () => {
      const anchorRect = getAnchorRect(anchor);
      if (anchorRect) {
        return createDOMRect(anchorRect);
      }
      if (anchor) {
        return anchor.getBoundingClientRect();
      }
      return createDOMRect();
    }
  };
}
function isValidPlacement(flip22) {
  return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(flip22);
}
function getTransformOrigin(placement, readingDirection) {
  const [basePlacement, alignment] = placement.split("-");
  const reversePlacement = REVERSE_BASE_PLACEMENT[basePlacement];
  if (!alignment) {
    return `${reversePlacement} center`;
  }
  if (basePlacement === "left" || basePlacement === "right") {
    return `${reversePlacement} ${alignment === "start" ? "top" : "bottom"}`;
  }
  if (alignment === "start") {
    return `${reversePlacement} ${readingDirection === "rtl" ? "right" : "left"}`;
  }
  return `${reversePlacement} ${readingDirection === "rtl" ? "left" : "right"}`;
}
function PopperRoot(props) {
  const mergedProps = mergeDefaultProps({
    getAnchorRect: (anchor) => anchor?.getBoundingClientRect(),
    placement: "bottom",
    gutter: 0,
    shift: 0,
    flip: true,
    slide: true,
    overlap: false,
    sameWidth: false,
    fitViewport: false,
    hideWhenDetached: false,
    detachedPadding: 0,
    arrowPadding: 4,
    overflowPadding: 8
  }, props);
  const [positionerRef, setPositionerRef] = createSignal();
  const [arrowRef, setArrowRef] = createSignal();
  const [currentPlacement, setCurrentPlacement] = createSignal(mergedProps.placement);
  const anchorRef = () => getAnchorElement(mergedProps.anchorRef?.(), mergedProps.getAnchorRect);
  const {
    direction
  } = useLocale();
  async function updatePosition() {
    const referenceEl = anchorRef();
    const floatingEl = positionerRef();
    const arrowEl = arrowRef();
    if (!referenceEl || !floatingEl) {
      return;
    }
    const arrowOffset = (arrowEl?.clientHeight || 0) / 2;
    const finalGutter = typeof mergedProps.gutter === "number" ? mergedProps.gutter + arrowOffset : mergedProps.gutter ?? arrowOffset;
    floatingEl.style.setProperty("--kb-popper-content-overflow-padding", `${mergedProps.overflowPadding}px`);
    referenceEl.getBoundingClientRect();
    const middleware = [
      // https://floating-ui.com/docs/offset
      offset2(({
        placement
      }) => {
        const hasAlignment = !!placement.split("-")[1];
        return {
          mainAxis: finalGutter,
          crossAxis: !hasAlignment ? mergedProps.shift : void 0,
          alignmentAxis: mergedProps.shift
        };
      })
    ];
    if (mergedProps.flip !== false) {
      const fallbackPlacements = typeof mergedProps.flip === "string" ? mergedProps.flip.split(" ") : void 0;
      if (fallbackPlacements !== void 0 && !fallbackPlacements.every(isValidPlacement)) {
        throw new Error("`flip` expects a spaced-delimited list of placements");
      }
      middleware.push(flip2({
        padding: mergedProps.overflowPadding,
        fallbackPlacements
      }));
    }
    if (mergedProps.slide || mergedProps.overlap) {
      middleware.push(shift2({
        mainAxis: mergedProps.slide,
        crossAxis: mergedProps.overlap,
        padding: mergedProps.overflowPadding
      }));
    }
    middleware.push(size2({
      padding: mergedProps.overflowPadding,
      apply({
        availableWidth,
        availableHeight,
        rects
      }) {
        const referenceWidth = Math.round(rects.reference.width);
        availableWidth = Math.floor(availableWidth);
        availableHeight = Math.floor(availableHeight);
        floatingEl.style.setProperty("--kb-popper-anchor-width", `${referenceWidth}px`);
        floatingEl.style.setProperty("--kb-popper-content-available-width", `${availableWidth}px`);
        floatingEl.style.setProperty("--kb-popper-content-available-height", `${availableHeight}px`);
        if (mergedProps.sameWidth) {
          floatingEl.style.width = `${referenceWidth}px`;
        }
        if (mergedProps.fitViewport) {
          floatingEl.style.maxWidth = `${availableWidth}px`;
          floatingEl.style.maxHeight = `${availableHeight}px`;
        }
      }
    }));
    if (mergedProps.hideWhenDetached) {
      middleware.push(hide2({
        padding: mergedProps.detachedPadding
      }));
    }
    if (arrowEl) {
      middleware.push(arrow2({
        element: arrowEl,
        padding: mergedProps.arrowPadding
      }));
    }
    const pos = await computePosition2(referenceEl, floatingEl, {
      placement: mergedProps.placement,
      strategy: "absolute",
      middleware,
      platform: {
        ...platform,
        isRTL: () => direction() === "rtl"
      }
    });
    setCurrentPlacement(pos.placement);
    mergedProps.onCurrentPlacementChange?.(pos.placement);
    if (!floatingEl) {
      return;
    }
    floatingEl.style.setProperty("--kb-popper-content-transform-origin", getTransformOrigin(pos.placement, direction()));
    const x = Math.round(pos.x);
    const y = Math.round(pos.y);
    let visibility;
    if (mergedProps.hideWhenDetached) {
      visibility = pos.middlewareData.hide?.referenceHidden ? "hidden" : "visible";
    }
    Object.assign(floatingEl.style, {
      top: "0",
      left: "0",
      transform: `translate3d(${x}px, ${y}px, 0)`,
      visibility
    });
    if (arrowEl && pos.middlewareData.arrow) {
      const {
        x: arrowX,
        y: arrowY
      } = pos.middlewareData.arrow;
      const dir = pos.placement.split("-")[0];
      Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        [dir]: "100%"
      });
    }
  }
  createEffect(() => {
    const referenceEl = anchorRef();
    const floatingEl = positionerRef();
    if (!referenceEl || !floatingEl) {
      return;
    }
    const cleanupAutoUpdate = autoUpdate(referenceEl, floatingEl, updatePosition, {
      // JSDOM doesn't support ResizeObserver
      elementResize: typeof ResizeObserver === "function"
    });
    onCleanup(cleanupAutoUpdate);
  });
  createEffect(() => {
    const positioner = positionerRef();
    const content = mergedProps.contentRef?.();
    if (!positioner || !content) {
      return;
    }
    queueMicrotask(() => {
      positioner.style.zIndex = getComputedStyle(content).zIndex;
    });
  });
  const context = {
    currentPlacement,
    contentRef: () => mergedProps.contentRef?.(),
    setPositionerRef,
    setArrowRef
  };
  return createComponent(PopperContext.Provider, {
    value: context,
    get children() {
      return mergedProps.children;
    }
  });
}
function createEscapeKeyDown(props) {
  const handleKeyDown = (event) => {
    if (event.key === EventKey.Escape) {
      props.onEscapeKeyDown?.(event);
    }
  };
  createEffect(() => {
    if (isServer2) {
      return;
    }
    if (access(props.isDisabled)) {
      return;
    }
    const document2 = props.ownerDocument?.() ?? getDocument();
    document2.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document2.removeEventListener("keydown", handleKeyDown);
    });
  });
}
function createInteractOutside(props, ref) {
  let pointerDownTimeoutId;
  let clickHandler = noop3;
  const ownerDocument = () => getDocument(ref());
  const onPointerDownOutside = (e2) => props.onPointerDownOutside?.(e2);
  const onFocusOutside = (e2) => props.onFocusOutside?.(e2);
  const onInteractOutside = (e2) => props.onInteractOutside?.(e2);
  const isEventOutside = (e2) => {
    const target = e2.target;
    if (!(target instanceof HTMLElement)) {
      return false;
    }
    if (target.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
      return false;
    }
    if (!contains(ownerDocument(), target)) {
      return false;
    }
    if (contains(ref(), target)) {
      return false;
    }
    return !props.shouldExcludeElement?.(target);
  };
  const onPointerDown = (e2) => {
    function handler() {
      const container = ref();
      const target = e2.target;
      if (!container || !target || !isEventOutside(e2)) {
        return;
      }
      const handler2 = composeEventHandlers([
        onPointerDownOutside,
        onInteractOutside
      ]);
      target.addEventListener(POINTER_DOWN_OUTSIDE_EVENT, handler2, {
        once: true
      });
      const pointerDownOutsideEvent = new CustomEvent(
        POINTER_DOWN_OUTSIDE_EVENT,
        {
          bubbles: false,
          cancelable: true,
          detail: {
            originalEvent: e2,
            isContextMenu: e2.button === 2 || isCtrlKey(e2) && e2.button === 0
          }
        }
      );
      target.dispatchEvent(pointerDownOutsideEvent);
    }
    if (e2.pointerType === "touch") {
      ownerDocument().removeEventListener("click", handler);
      clickHandler = handler;
      ownerDocument().addEventListener("click", handler, { once: true });
    } else {
      handler();
    }
  };
  const onFocusIn = (e2) => {
    const container = ref();
    const target = e2.target;
    if (!container || !target || !isEventOutside(e2)) {
      return;
    }
    const handler = composeEventHandlers([
      onFocusOutside,
      onInteractOutside
    ]);
    target.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
    const focusOutsideEvent = new CustomEvent(FOCUS_OUTSIDE_EVENT, {
      bubbles: false,
      cancelable: true,
      detail: {
        originalEvent: e2,
        isContextMenu: false
      }
    });
    target.dispatchEvent(focusOutsideEvent);
  };
  createEffect(() => {
    if (isServer2) {
      return;
    }
    if (access(props.isDisabled)) {
      return;
    }
    pointerDownTimeoutId = window.setTimeout(() => {
      ownerDocument().addEventListener("pointerdown", onPointerDown, true);
    }, 0);
    ownerDocument().addEventListener("focusin", onFocusIn, true);
    onCleanup(() => {
      window.clearTimeout(pointerDownTimeoutId);
      ownerDocument().removeEventListener("click", clickHandler);
      ownerDocument().removeEventListener("pointerdown", onPointerDown, true);
      ownerDocument().removeEventListener("focusin", onFocusIn, true);
    });
  });
}
function useOptionalDismissableLayerContext() {
  return useContext4(DismissableLayerContext);
}
function DismissableLayer(props) {
  let ref;
  const parentContext = useOptionalDismissableLayerContext();
  const [local, others] = splitProps(props, ["ref", "disableOutsidePointerEvents", "excludedElements", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside", "onDismiss", "bypassTopMostLayerCheck"]);
  const nestedLayers = /* @__PURE__ */ new Set([]);
  const registerNestedLayer = (element) => {
    nestedLayers.add(element);
    const parentUnregister = parentContext?.registerNestedLayer(element);
    return () => {
      nestedLayers.delete(element);
      parentUnregister?.();
    };
  };
  const shouldExcludeElement = (element) => {
    if (!ref) {
      return false;
    }
    return local.excludedElements?.some((node) => contains(node(), element)) || [...nestedLayers].some((layer) => contains(layer, element));
  };
  const onPointerDownOutside = (e2) => {
    if (!ref || layerStack.isBelowPointerBlockingLayer(ref)) {
      return;
    }
    if (!local.bypassTopMostLayerCheck && !layerStack.isTopMostLayer(ref)) {
      return;
    }
    local.onPointerDownOutside?.(e2);
    local.onInteractOutside?.(e2);
    if (!e2.defaultPrevented) {
      local.onDismiss?.();
    }
  };
  const onFocusOutside = (e2) => {
    local.onFocusOutside?.(e2);
    local.onInteractOutside?.(e2);
    if (!e2.defaultPrevented) {
      local.onDismiss?.();
    }
  };
  createInteractOutside({
    shouldExcludeElement,
    onPointerDownOutside,
    onFocusOutside
  }, () => ref);
  createEscapeKeyDown({
    ownerDocument: () => getDocument(ref),
    onEscapeKeyDown: (e2) => {
      if (!ref || !layerStack.isTopMostLayer(ref)) {
        return;
      }
      local.onEscapeKeyDown?.(e2);
      if (!e2.defaultPrevented && local.onDismiss) {
        e2.preventDefault();
        local.onDismiss();
      }
    }
  });
  onMount(() => {
    if (!ref) {
      return;
    }
    layerStack.addLayer({
      node: ref,
      isPointerBlocking: local.disableOutsidePointerEvents,
      dismiss: local.onDismiss
    });
    const unregisterFromParentLayer = parentContext?.registerNestedLayer(ref);
    layerStack.assignPointerEventToLayers();
    layerStack.disableBodyPointerEvents(ref);
    onCleanup(() => {
      if (!ref) {
        return;
      }
      layerStack.removeLayer(ref);
      unregisterFromParentLayer?.();
      layerStack.assignPointerEventToLayers();
      layerStack.restoreBodyPointerEvents(ref);
    });
  });
  createEffect(on([() => ref, () => local.disableOutsidePointerEvents], ([ref2, disableOutsidePointerEvents]) => {
    if (!ref2) {
      return;
    }
    const layer = layerStack.find(ref2);
    if (layer && layer.isPointerBlocking !== disableOutsidePointerEvents) {
      layer.isPointerBlocking = disableOutsidePointerEvents;
      layerStack.assignPointerEventToLayers();
    }
    if (disableOutsidePointerEvents) {
      layerStack.disableBodyPointerEvents(ref2);
    }
    onCleanup(() => {
      layerStack.restoreBodyPointerEvents(ref2);
    });
  }, {
    defer: true
  }));
  const context = {
    registerNestedLayer
  };
  return createComponent(DismissableLayerContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs((el) => ref = el, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        }
      }, others));
    }
  });
}
function createDisclosureState(props = {}) {
  const [isOpen, setIsOpen] = createControllableBooleanSignal({
    value: () => access(props.open),
    defaultValue: () => !!access(props.defaultOpen),
    onChange: (value) => props.onOpenChange?.(value)
  });
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggle = () => {
    isOpen() ? close() : open();
  };
  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle
  };
}
function useRadioGroupContext() {
  const context = useContext4(RadioGroupContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");
  }
  return context;
}
function useRadioGroupItemContext() {
  const context = useContext4(RadioGroupItemContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");
  }
  return context;
}
function RadioGroupItem(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const defaultId = `${formControlContext.generateId("item")}-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "disabled", "onPointerDown"]);
  const [inputId, setInputId] = createSignal();
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [inputRef, setInputRef] = createSignal();
  const [isFocused, setIsFocused] = createSignal(false);
  const isSelected = createMemo(() => {
    return radioGroupContext.isSelectedValue(local.value);
  });
  const isDisabled = createMemo(() => {
    return local.disabled || formControlContext.isDisabled() || false;
  });
  const onPointerDown = (e2) => {
    callHandler(e2, local.onPointerDown);
    if (isFocused()) {
      e2.preventDefault();
    }
  };
  const dataset = createMemo(() => ({
    ...formControlContext.dataset(),
    "data-disabled": isDisabled() ? "" : void 0,
    "data-checked": isSelected() ? "" : void 0
  }));
  const context = {
    value: () => local.value,
    dataset,
    isSelected,
    isDisabled,
    inputId,
    labelId,
    descriptionId,
    inputRef,
    select: () => radioGroupContext.setSelectedValue(local.value),
    generateId: createGenerateId(() => others.id),
    registerInput: createRegisterId(setInputId),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId),
    setIsFocused,
    setInputRef
  };
  return createComponent(RadioGroupItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        role: "group",
        onPointerDown
      }, dataset, others));
    }
  });
}
function RadioGroupItemControl(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("control")
  }, props);
  const [local, others] = splitProps(mergedProps, ["onClick", "onKeyDown"]);
  const onClick = (e2) => {
    callHandler(e2, local.onClick);
    context.select();
    context.inputRef()?.focus();
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (e2.key === EventKey.Space) {
      context.select();
      context.inputRef()?.focus();
    }
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    onClick,
    onKeyDown
  }, () => context.dataset(), others));
}
function RadioGroupItemDescription(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function RadioGroupItemIndicator(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "forceMount"]);
  const [ref, setRef] = createSignal();
  const {
    present
  } = src_default({
    show: () => local.forceMount || context.isSelected(),
    element: () => ref() ?? null
  });
  return createComponent(Show, {
    get when() {
      return present();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs(setRef, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        }
      }, () => context.dataset(), others));
    }
  });
}
function RadioGroupItemInput(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const radioContext = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: radioContext.generateId("input")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "aria-labelledby", "aria-describedby", "onChange", "onFocus", "onBlur"]);
  const ariaLabelledBy = () => {
    return [
      local["aria-labelledby"],
      radioContext.labelId(),
      // If there is both an aria-label and aria-labelledby, add the input itself has an aria-labelledby
      local["aria-labelledby"] != null && others["aria-label"] != null ? others.id : void 0
    ].filter(Boolean).join(" ") || void 0;
  };
  const ariaDescribedBy = () => {
    return [local["aria-describedby"], radioContext.descriptionId(), radioGroupContext.ariaDescribedBy()].filter(Boolean).join(" ") || void 0;
  };
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
  const onChange = (e2) => {
    callHandler(e2, local.onChange);
    e2.stopPropagation();
    if (!isInternalChangeEvent()) {
      radioGroupContext.setSelectedValue(radioContext.value());
      const target = e2.target;
      target.checked = radioContext.isSelected();
    }
    setIsInternalChangeEvent(false);
  };
  const onFocus = (e2) => {
    callHandler(e2, local.onFocus);
    radioContext.setIsFocused(true);
  };
  const onBlur = (e2) => {
    callHandler(e2, local.onBlur);
    radioContext.setIsFocused(false);
  };
  createEffect(on([() => radioContext.isSelected(), () => radioContext.value()], (c2) => {
    if (!c2[0] && c2[1] === radioContext.value())
      return;
    setIsInternalChangeEvent(true);
    const ref = radioContext.inputRef();
    ref?.dispatchEvent(new Event("input", {
      bubbles: true,
      cancelable: true
    }));
    ref?.dispatchEvent(new Event("change", {
      bubbles: true,
      cancelable: true
    }));
  }, {
    defer: true
  }));
  createEffect(() => onCleanup(radioContext.registerInput(others.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "input",
    ref(r$) {
      const _ref$ = mergeRefs(radioContext.setInputRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    type: "radio",
    get name() {
      return formControlContext.name();
    },
    get value() {
      return radioContext.value();
    },
    get checked() {
      return radioContext.isSelected();
    },
    get required() {
      return formControlContext.isRequired();
    },
    get disabled() {
      return radioContext.isDisabled();
    },
    get readonly() {
      return formControlContext.isReadOnly();
    },
    get style() {
      return combineStyle({
        ...visuallyHiddenStyles
      }, local.style);
    },
    get ["aria-labelledby"]() {
      return ariaLabelledBy();
    },
    get ["aria-describedby"]() {
      return ariaDescribedBy();
    },
    onChange,
    onFocus,
    onBlur
  }, () => radioContext.dataset(), others));
}
function RadioGroupItemLabel(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  createEffect(() => onCleanup(context.registerLabel(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "label",
    get ["for"]() {
      return context.inputId();
    }
  }, () => context.dataset(), mergedProps));
}
function RadioGroupLabel(props) {
  return createComponent(FormControlLabel, mergeProps({
    as: "span"
  }, props));
}
function RadioGroupRoot(props) {
  let ref;
  const defaultId = `radiogroup-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    orientation: "vertical"
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "onChange", "orientation", "aria-labelledby", "aria-describedby"], FORM_CONTROL_PROP_NAMES);
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => local.onChange?.(value)
  });
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(() => ref, () => setSelected(local.defaultValue ?? ""));
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(access(formControlProps.id), others["aria-label"], local["aria-labelledby"]);
  };
  const ariaDescribedBy = () => {
    return formControlContext.getAriaDescribedBy(local["aria-describedby"]);
  };
  const isSelectedValue = (value) => {
    return value === selected();
  };
  const context = {
    ariaDescribedBy,
    isSelectedValue,
    setSelectedValue: (value) => {
      if (formControlContext.isReadOnly() || formControlContext.isDisabled()) {
        return;
      }
      setSelected(value);
      if (ref)
        for (const el of ref.querySelectorAll("[type='radio']")) {
          const radio = el;
          radio.checked = isSelectedValue(radio.value);
        }
    }
  };
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(RadioGroupContext.Provider, {
        value: context,
        get children() {
          return createComponent(Polymorphic, mergeProps({
            as: "div",
            ref(r$) {
              const _ref$ = mergeRefs((el) => ref = el, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            role: "radiogroup",
            get id() {
              return access(formControlProps.id);
            },
            get ["aria-invalid"]() {
              return formControlContext.validationState() === "invalid" || void 0;
            },
            get ["aria-required"]() {
              return formControlContext.isRequired() || void 0;
            },
            get ["aria-disabled"]() {
              return formControlContext.isDisabled() || void 0;
            },
            get ["aria-readonly"]() {
              return formControlContext.isReadOnly() || void 0;
            },
            get ["aria-orientation"]() {
              return local.orientation;
            },
            get ["aria-labelledby"]() {
              return ariaLabelledBy();
            },
            get ["aria-describedby"]() {
              return ariaDescribedBy();
            }
          }, () => formControlContext.dataset(), others));
        }
      });
    }
  });
}
function createSelectableList(props, ref, scrollRef) {
  const collator = createCollator({ usage: "search", sensitivity: "base" });
  const delegate = createMemo(() => {
    const keyboardDelegate = access(props.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(props.collection, ref, collator);
  });
  return createSelectableCollection(
    {
      selectionManager: () => access(props.selectionManager),
      keyboardDelegate: delegate,
      autoFocus: () => access(props.autoFocus),
      deferAutoFocus: () => access(props.deferAutoFocus),
      shouldFocusWrap: () => access(props.shouldFocusWrap),
      disallowEmptySelection: () => access(props.disallowEmptySelection),
      selectOnFocus: () => access(props.selectOnFocus),
      disallowTypeAhead: () => access(props.disallowTypeAhead),
      shouldUseVirtualFocus: () => access(props.shouldUseVirtualFocus),
      allowsTabNavigation: () => access(props.allowsTabNavigation),
      isVirtualized: () => access(props.isVirtualized),
      scrollToKey: (key) => access(props.scrollToKey)?.(key),
      orientation: () => access(props.orientation)
    },
    ref
  );
}
function createFocusScope(props, ref) {
  const [isPaused, setIsPaused] = createSignal(false);
  const focusScope = {
    pause() {
      setIsPaused(true);
    },
    resume() {
      setIsPaused(false);
    }
  };
  let lastFocusedElement = null;
  const onMountAutoFocus = (e2) => props.onMountAutoFocus?.(e2);
  const onUnmountAutoFocus = (e2) => props.onUnmountAutoFocus?.(e2);
  const ownerDocument = () => getDocument(ref());
  const createSentinel = () => {
    const element = ownerDocument().createElement("span");
    element.setAttribute("data-focus-trap", "");
    element.tabIndex = 0;
    Object.assign(element.style, visuallyHiddenStyles);
    return element;
  };
  const tabbables = () => {
    const container = ref();
    if (!container) {
      return [];
    }
    return getAllTabbableIn(container, true).filter((el) => !el.hasAttribute("data-focus-trap"));
  };
  const firstTabbable = () => {
    const items = tabbables();
    return items.length > 0 ? items[0] : null;
  };
  const lastTabbable = () => {
    const items = tabbables();
    return items.length > 0 ? items[items.length - 1] : null;
  };
  const shouldPreventUnmountAutoFocus = () => {
    const container = ref();
    if (!container) {
      return false;
    }
    const activeElement = getActiveElement(container);
    if (!activeElement) {
      return false;
    }
    if (contains(container, activeElement)) {
      return false;
    }
    return isFocusable(activeElement);
  };
  createEffect(() => {
    if (isServer2) {
      return;
    }
    const container = ref();
    if (!container) {
      return;
    }
    focusScopeStack.add(focusScope);
    const previouslyFocusedElement = getActiveElement(container);
    const hasFocusedCandidate = contains(container, previouslyFocusedElement);
    if (!hasFocusedCandidate) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT_EVENT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_MOUNT_EVENT, onMountAutoFocus);
      container.dispatchEvent(mountEvent);
      if (!mountEvent.defaultPrevented) {
        setTimeout(() => {
          focusWithoutScrolling(firstTabbable());
          if (getActiveElement(container) === previouslyFocusedElement) {
            focusWithoutScrolling(container);
          }
        }, 0);
      }
    }
    onCleanup(() => {
      container.removeEventListener(AUTOFOCUS_ON_MOUNT_EVENT, onMountAutoFocus);
      setTimeout(() => {
        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT_EVENT, EVENT_OPTIONS);
        if (shouldPreventUnmountAutoFocus()) {
          unmountEvent.preventDefault();
        }
        container.addEventListener(AUTOFOCUS_ON_UNMOUNT_EVENT, onUnmountAutoFocus);
        container.dispatchEvent(unmountEvent);
        if (!unmountEvent.defaultPrevented) {
          focusWithoutScrolling(previouslyFocusedElement ?? ownerDocument().body);
        }
        container.removeEventListener(AUTOFOCUS_ON_UNMOUNT_EVENT, onUnmountAutoFocus);
        focusScopeStack.remove(focusScope);
      }, 0);
    });
  });
  createEffect(() => {
    if (isServer2) {
      return;
    }
    const container = ref();
    if (!container || !access(props.trapFocus) || isPaused()) {
      return;
    }
    const onFocusIn = (event) => {
      const target = event.target;
      if (target?.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
        return;
      }
      if (contains(container, target)) {
        lastFocusedElement = target;
      } else {
        focusWithoutScrolling(lastFocusedElement);
      }
    };
    const onFocusOut = (event) => {
      const relatedTarget = event.relatedTarget;
      const target = relatedTarget ?? getActiveElement(container);
      if (target?.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
        return;
      }
      if (!contains(container, target)) {
        focusWithoutScrolling(lastFocusedElement);
      }
    };
    ownerDocument().addEventListener("focusin", onFocusIn);
    ownerDocument().addEventListener("focusout", onFocusOut);
    onCleanup(() => {
      ownerDocument().removeEventListener("focusin", onFocusIn);
      ownerDocument().removeEventListener("focusout", onFocusOut);
    });
  });
  createEffect(() => {
    if (isServer2) {
      return;
    }
    const container = ref();
    if (!container || !access(props.trapFocus) || isPaused()) {
      return;
    }
    const startSentinel = createSentinel();
    container.insertAdjacentElement("afterbegin", startSentinel);
    const endSentinel = createSentinel();
    container.insertAdjacentElement("beforeend", endSentinel);
    function onFocus(event) {
      const first = firstTabbable();
      const last = lastTabbable();
      if (event.relatedTarget === first) {
        focusWithoutScrolling(last);
      } else {
        focusWithoutScrolling(first);
      }
    }
    startSentinel.addEventListener("focusin", onFocus);
    endSentinel.addEventListener("focusin", onFocus);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.previousSibling === endSentinel) {
          endSentinel.remove();
          container.insertAdjacentElement("beforeend", endSentinel);
        }
        if (mutation.nextSibling === startSentinel) {
          startSentinel.remove();
          container.insertAdjacentElement("afterbegin", startSentinel);
        }
      }
    });
    observer.observe(container, {
      childList: true,
      subtree: false
    });
    onCleanup(() => {
      startSentinel.removeEventListener("focusin", onFocus);
      endSentinel.removeEventListener("focusin", onFocus);
      startSentinel.remove();
      endSentinel.remove();
      observer.disconnect();
    });
  });
}
function createHideOutside(props) {
  createEffect(() => {
    if (access(props.isDisabled)) {
      return;
    }
    onCleanup(ariaHideOutside(access(props.targets), access(props.root)));
  });
}
function ariaHideOutside(targets, root = document.body) {
  const visibleNodes = new Set(targets);
  const hiddenNodes = /* @__PURE__ */ new Set();
  const walk = (root2) => {
    for (const element of root2.querySelectorAll(
      `[${DATA_LIVE_ANNOUNCER_ATTR}], [${DATA_TOP_LAYER_ATTR}]`
    )) {
      visibleNodes.add(element);
    }
    const acceptNode = (node) => {
      if (visibleNodes.has(node) || node.parentElement && hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row") {
        return NodeFilter.FILTER_REJECT;
      }
      for (const target of visibleNodes) {
        if (node.contains(target)) {
          return NodeFilter.FILTER_SKIP;
        }
      }
      return NodeFilter.FILTER_ACCEPT;
    };
    const walker2 = document.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT, {
      acceptNode
    });
    const acceptRoot = acceptNode(root2);
    if (acceptRoot === NodeFilter.FILTER_ACCEPT) {
      hide3(root2);
    }
    if (acceptRoot !== NodeFilter.FILTER_REJECT) {
      let node = walker2.nextNode();
      while (node != null) {
        hide3(node);
        node = walker2.nextNode();
      }
    }
  };
  const hide3 = (node) => {
    const refCount = refCountMap.get(node) ?? 0;
    if (node.getAttribute("aria-hidden") === "true" && refCount === 0) {
      return;
    }
    if (refCount === 0) {
      node.setAttribute("aria-hidden", "true");
    }
    hiddenNodes.add(node);
    refCountMap.set(node, refCount + 1);
  };
  if (observerStack.length) {
    observerStack[observerStack.length - 1].disconnect();
  }
  walk(root);
  const observer = new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type !== "childList" || change.addedNodes.length === 0) {
        continue;
      }
      if (![...visibleNodes, ...hiddenNodes].some(
        (node) => node.contains(change.target)
      )) {
        for (const node of change.removedNodes) {
          if (node instanceof Element) {
            visibleNodes.delete(node);
            hiddenNodes.delete(node);
          }
        }
        for (const node of change.addedNodes) {
          if ((node instanceof HTMLElement || node instanceof SVGElement) && (node.dataset.liveAnnouncer === "true" || node.dataset.reactAriaTopLayer === "true")) {
            visibleNodes.add(node);
          } else if (node instanceof Element) {
            walk(node);
          }
        }
      }
    }
  });
  observer.observe(root, { childList: true, subtree: true });
  const observerWrapper = {
    observe() {
      observer.observe(root, { childList: true, subtree: true });
    },
    disconnect() {
      observer.disconnect();
    }
  };
  observerStack.push(observerWrapper);
  return () => {
    observer.disconnect();
    for (const node of hiddenNodes) {
      const count = refCountMap.get(node);
      if (count == null) {
        return;
      }
      if (count === 1) {
        node.removeAttribute("aria-hidden");
        refCountMap.delete(node);
      } else {
        refCountMap.set(node, count - 1);
      }
    }
    if (observerWrapper === observerStack[observerStack.length - 1]) {
      observerStack.pop();
      if (observerStack.length) {
        observerStack[observerStack.length - 1].observe();
      }
    } else {
      observerStack.splice(observerStack.indexOf(observerWrapper), 1);
    }
  };
}
function useOptionalMenuContext() {
  return useContext4(MenuContext);
}
function useMenuContext() {
  const context = useOptionalMenuContext();
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");
  }
  return context;
}
function useMenuItemContext() {
  const context = useContext4(MenuItemContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");
  }
  return context;
}
function useMenuRootContext() {
  const context = useContext4(MenuRootContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");
  }
  return context;
}
function MenuItemBase(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const menuContext = useMenuContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`item-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "textValue", "disabled", "closeOnSelect", "checked", "indeterminate", "onSelect", "onPointerMove", "onPointerLeave", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [labelRef, setLabelRef] = createSignal();
  const selectionManager = () => menuContext.listState().selectionManager();
  const key = () => others.id;
  const isHighlighted = () => selectionManager().focusedKey() === key();
  const onSelect = () => {
    local.onSelect?.();
    if (local.closeOnSelect) {
      setTimeout(() => {
        menuContext.close(true);
      });
    }
  };
  createDomCollectionItem({
    getItem: () => ({
      ref: () => ref,
      type: "item",
      key: key(),
      textValue: local.textValue ?? labelRef()?.textContent ?? ref?.textContent ?? "",
      disabled: local.disabled ?? false
    })
  });
  const selectableItem = createSelectableItem({
    key,
    selectionManager,
    shouldSelectOnPressUp: true,
    allowsDifferentPressOrigin: true,
    disabled: () => local.disabled
  }, () => ref);
  const onPointerMove = (e2) => {
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    if (local.disabled) {
      menuContext.onItemLeave(e2);
    } else {
      menuContext.onItemEnter(e2);
      if (!e2.defaultPrevented) {
        focusWithoutScrolling(e2.currentTarget);
        menuContext.listState().selectionManager().setFocused(true);
        menuContext.listState().selectionManager().setFocusedKey(key());
      }
    }
  };
  const onPointerLeave = (e2) => {
    callHandler(e2, local.onPointerLeave);
    if (e2.pointerType !== "mouse") {
      return;
    }
    menuContext.onItemLeave(e2);
  };
  const onPointerUp = (e2) => {
    callHandler(e2, local.onPointerUp);
    if (!local.disabled && e2.button === 0) {
      onSelect();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (e2.repeat) {
      return;
    }
    if (local.disabled) {
      return;
    }
    switch (e2.key) {
      case "Enter":
      case " ":
        onSelect();
        break;
    }
  };
  const ariaChecked = createMemo(() => {
    if (local.indeterminate) {
      return "mixed";
    }
    if (local.checked == null) {
      return void 0;
    }
    return local.checked;
  });
  const dataset = createMemo(() => ({
    "data-indeterminate": local.indeterminate ? "" : void 0,
    "data-checked": local.checked && !local.indeterminate ? "" : void 0,
    "data-disabled": local.disabled ? "" : void 0,
    "data-highlighted": isHighlighted() ? "" : void 0
  }));
  const context = {
    isChecked: () => local.checked,
    dataset,
    setLabelRef,
    generateId: createGenerateId(() => others.id),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId)
  };
  return createComponent(MenuItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs((el) => ref = el, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        },
        get tabIndex() {
          return selectableItem.tabIndex();
        },
        get ["aria-checked"]() {
          return ariaChecked();
        },
        get ["aria-disabled"]() {
          return local.disabled;
        },
        get ["aria-labelledby"]() {
          return labelId();
        },
        get ["aria-describedby"]() {
          return descriptionId();
        },
        get ["data-key"]() {
          return selectableItem.dataKey();
        },
        get onPointerDown() {
          return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
        },
        get onPointerUp() {
          return composeEventHandlers([onPointerUp, selectableItem.onPointerUp]);
        },
        get onClick() {
          return composeEventHandlers([local.onClick, selectableItem.onClick]);
        },
        get onKeyDown() {
          return composeEventHandlers([onKeyDown, selectableItem.onKeyDown]);
        },
        get onMouseDown() {
          return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
        },
        get onFocus() {
          return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
        },
        onPointerMove,
        onPointerLeave
      }, dataset, others));
    }
  });
}
function MenuCheckboxItem(props) {
  const mergedProps = mergeDefaultProps({
    closeOnSelect: false
  }, props);
  const [local, others] = splitProps(mergedProps, ["checked", "defaultChecked", "onChange", "onSelect"]);
  const state = createToggleState({
    isSelected: () => local.checked,
    defaultIsSelected: () => local.defaultChecked,
    onSelectedChange: (checked) => local.onChange?.(checked),
    isDisabled: () => others.disabled
  });
  const onSelect = () => {
    local.onSelect?.();
    state.toggle();
  };
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitemcheckbox",
    get checked() {
      return state.isSelected();
    },
    onSelect
  }, others));
}
function useOptionalMenubarContext() {
  return useContext4(MenubarContext);
}
function MenuTrigger(props) {
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const {
    direction
  } = useLocale();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId("trigger")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "disabled", "onPointerDown", "onClick", "onKeyDown", "onMouseOver", "onFocus"]);
  let key = () => rootContext.value();
  if (optionalMenubarContext !== void 0) {
    key = () => rootContext.value() ?? local.id;
    if (optionalMenubarContext.lastValue() === void 0)
      optionalMenubarContext.setLastValue(key);
  }
  const tagName = createTagName(() => context.triggerRef(), () => "button");
  const isNativeLink = createMemo(() => {
    return tagName() === "a" && context.triggerRef()?.getAttribute("href") != null;
  });
  createEffect(on(() => optionalMenubarContext?.value(), (value) => {
    if (!isNativeLink())
      return;
    if (value === key())
      context.triggerRef()?.focus();
  }));
  const handleClick = () => {
    if (optionalMenubarContext !== void 0) {
      if (!context.isOpen()) {
        if (!optionalMenubarContext.autoFocusMenu()) {
          optionalMenubarContext.setAutoFocusMenu(true);
        }
        context.open(false);
      } else {
        if (optionalMenubarContext.value() === key())
          optionalMenubarContext.closeMenu();
      }
    } else
      context.toggle(true);
  };
  const onPointerDown = (e2) => {
    callHandler(e2, local.onPointerDown);
    e2.currentTarget.dataset.pointerType = e2.pointerType;
    if (!local.disabled && e2.pointerType !== "touch" && e2.button === 0) {
      handleClick();
    }
  };
  const onClick = (e2) => {
    callHandler(e2, local.onClick);
    if (!local.disabled) {
      if (e2.currentTarget.dataset.pointerType === "touch")
        handleClick();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (local.disabled) {
      return;
    }
    if (isNativeLink()) {
      switch (e2.key) {
        case "Enter":
        case " ":
          return;
      }
    }
    switch (e2.key) {
      case "Enter":
      case " ":
      case MENU_KEYS.first(rootContext.orientation()):
        e2.stopPropagation();
        e2.preventDefault();
        scrollIntoViewport(e2.currentTarget);
        context.open("first");
        optionalMenubarContext?.setAutoFocusMenu(true);
        optionalMenubarContext?.setValue(key);
        break;
      case MENU_KEYS.last(rootContext.orientation()):
        e2.stopPropagation();
        e2.preventDefault();
        context.open("last");
        break;
      case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
        if (optionalMenubarContext === void 0)
          break;
        e2.stopPropagation();
        e2.preventDefault();
        optionalMenubarContext.nextMenu();
        break;
      case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
        if (optionalMenubarContext === void 0)
          break;
        e2.stopPropagation();
        e2.preventDefault();
        optionalMenubarContext.previousMenu();
        break;
    }
  };
  const onMouseOver = (e2) => {
    callHandler(e2, local.onMouseOver);
    if (context.triggerRef()?.dataset.pointerType === "touch")
      return;
    if (!local.disabled && optionalMenubarContext !== void 0 && optionalMenubarContext.value() !== void 0) {
      optionalMenubarContext.setValue(key);
    }
  };
  const onFocus = (e2) => {
    callHandler(e2, local.onFocus);
    if (optionalMenubarContext !== void 0 && e2.currentTarget.dataset.pointerType !== "touch")
      optionalMenubarContext.setValue(key);
  };
  createEffect(() => onCleanup(context.registerTriggerId(local.id)));
  return createComponent(ButtonRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setTriggerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get ["data-kb-menu-value-trigger"]() {
      return rootContext.value();
    },
    get id() {
      return local.id;
    },
    get disabled() {
      return local.disabled;
    },
    "aria-haspopup": "true",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return memo(() => !!context.isOpen())() ? context.contentId() : void 0;
    },
    get ["data-highlighted"]() {
      return key() !== void 0 && optionalMenubarContext?.value() === key() ? true : void 0;
    },
    get tabIndex() {
      return optionalMenubarContext !== void 0 ? optionalMenubarContext.value() === key() || optionalMenubarContext.lastValue() === key() ? 0 : -1 : void 0;
    },
    onPointerDown,
    onMouseOver,
    onClick,
    onKeyDown,
    onFocus,
    role: optionalMenubarContext !== void 0 ? "menuitem" : void 0
  }, () => context.dataset(), others));
}
function useOptionalNavigationMenuContext() {
  return useContext4(NavigationMenuContext);
}
function MenuContentBase(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
  const {
    direction
  } = useLocale();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`content-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "style", "onOpenAutoFocus", "onCloseAutoFocus", "onEscapeKeyDown", "onFocusOutside", "onPointerEnter", "onPointerMove", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut"]);
  let lastPointerX = 0;
  const isRootModalContent = () => {
    return context.parentMenuContext() == null && optionalMenubarContext === void 0 && rootContext.isModal();
  };
  const selectableList = createSelectableList({
    selectionManager: context.listState().selectionManager,
    collection: context.listState().collection,
    autoFocus: context.autoFocus,
    deferAutoFocus: true,
    // ensure all menu items are mounted and collection is not empty before trying to autofocus.
    shouldFocusWrap: true,
    disallowTypeAhead: () => !context.listState().selectionManager().isFocused(),
    orientation: () => rootContext.orientation() === "horizontal" ? "vertical" : "horizontal"
  }, () => ref);
  createFocusScope({
    trapFocus: () => isRootModalContent() && context.isOpen(),
    onMountAutoFocus: (event) => {
      if (optionalMenubarContext === void 0)
        local.onOpenAutoFocus?.(event);
    },
    onUnmountAutoFocus: local.onCloseAutoFocus
  }, () => ref);
  const onKeyDown = (e2) => {
    if (!contains(e2.currentTarget, e2.target)) {
      return;
    }
    if (e2.key === "Tab" && context.isOpen()) {
      e2.preventDefault();
    }
    if (optionalMenubarContext !== void 0) {
      if (e2.currentTarget.getAttribute("aria-haspopup") !== "true")
        switch (e2.key) {
          case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
            e2.stopPropagation();
            e2.preventDefault();
            context.close(true);
            optionalMenubarContext.setAutoFocusMenu(true);
            optionalMenubarContext.nextMenu();
            break;
          case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
            if (e2.currentTarget.hasAttribute("data-closed"))
              break;
            e2.stopPropagation();
            e2.preventDefault();
            context.close(true);
            optionalMenubarContext.setAutoFocusMenu(true);
            optionalMenubarContext.previousMenu();
            break;
        }
    }
  };
  const onEscapeKeyDown = (e2) => {
    local.onEscapeKeyDown?.(e2);
    optionalMenubarContext?.setAutoFocusMenu(false);
    context.close(true);
  };
  const onFocusOutside = (e2) => {
    local.onFocusOutside?.(e2);
    if (rootContext.isModal()) {
      e2.preventDefault();
    }
  };
  const onPointerEnter = (e2) => {
    callHandler(e2, local.onPointerEnter);
    if (!context.isOpen()) {
      return;
    }
    context.parentMenuContext()?.listState().selectionManager().setFocused(false);
    context.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0);
  };
  const onPointerMove = (e2) => {
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    const target = e2.target;
    const pointerXHasChanged = lastPointerX !== e2.clientX;
    if (contains(e2.currentTarget, target) && pointerXHasChanged) {
      context.setPointerDir(e2.clientX > lastPointerX ? "right" : "left");
      lastPointerX = e2.clientX;
    }
  };
  createEffect(() => onCleanup(context.registerContentId(local.id)));
  const commonAttributes = {
    ref: mergeRefs((el) => {
      context.setContentRef(el);
      ref = el;
    }, local.ref),
    role: "menu",
    get id() {
      return local.id;
    },
    get tabIndex() {
      return selectableList.tabIndex();
    },
    get "aria-labelledby"() {
      return context.triggerId();
    },
    onKeyDown: composeEventHandlers([local.onKeyDown, selectableList.onKeyDown, onKeyDown]),
    onMouseDown: composeEventHandlers([local.onMouseDown, selectableList.onMouseDown]),
    onFocusIn: composeEventHandlers([local.onFocusIn, selectableList.onFocusIn]),
    onFocusOut: composeEventHandlers([local.onFocusOut, selectableList.onFocusOut]),
    onPointerEnter,
    onPointerMove,
    get "data-orientation"() {
      return rootContext.orientation();
    }
  };
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return optionalNavigationMenuContext === void 0 || context.parentMenuContext() != null;
        },
        get fallback() {
          return createComponent(Polymorphic, mergeProps({
            as: "div"
          }, () => context.dataset(), commonAttributes, others));
        },
        get children() {
          return createComponent(Popper.Positioner, {
            get children() {
              return createComponent(DismissableLayer, mergeProps({
                get disableOutsidePointerEvents() {
                  return memo(() => !!isRootModalContent())() && context.isOpen();
                },
                get excludedElements() {
                  return [context.triggerRef];
                },
                bypassTopMostLayerCheck: true,
                get style() {
                  return combineStyle({
                    "--kb-menu-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                    position: "relative"
                  }, local.style);
                },
                onEscapeKeyDown,
                onFocusOutside,
                get onDismiss() {
                  return context.close;
                }
              }, () => context.dataset(), commonAttributes, others));
            }
          });
        }
      });
    }
  });
}
function MenuContent(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const [local, others] = splitProps(props, ["ref"]);
  src_default2({
    element: () => ref ?? null,
    enabled: () => context.contentPresent() && rootContext.preventScroll()
  });
  return createComponent(MenuContentBase, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs((el) => {
        ref = el;
      }, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    }
  }, others));
}
function useMenuGroupContext() {
  const context = useContext4(MenuGroupContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");
  }
  return context;
}
function MenuGroup(props) {
  const rootContext = useMenuRootContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`group-${createUniqueId()}`)
  }, props);
  const [labelId, setLabelId] = createSignal();
  const context = {
    generateId: createGenerateId(() => mergedProps.id),
    registerLabelId: createRegisterId(setLabelId)
  };
  return createComponent(MenuGroupContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        role: "group",
        get ["aria-labelledby"]() {
          return labelId();
        }
      }, mergedProps));
    }
  });
}
function MenuGroupLabel(props) {
  const context = useMenuGroupContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerLabelId(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    get id() {
      return local.id;
    },
    "aria-hidden": "true"
  }, others));
}
function MenuIcon(props) {
  const context = useMenuContext();
  const mergedProps = mergeDefaultProps({
    children: "\u25BC"
  }, props);
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    "aria-hidden": "true"
  }, () => context.dataset(), mergedProps));
}
function MenuItem(props) {
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitem",
    closeOnSelect: true
  }, props));
}
function MenuItemDescription(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerDescription(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function MenuItemIndicator(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  return createComponent(Show, {
    get when() {
      return local.forceMount || context.isChecked();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div"
      }, () => context.dataset(), others));
    }
  });
}
function MenuItemLabel(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id"]);
  createEffect(() => onCleanup(context.registerLabel(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setLabelRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function MenuPortal(props) {
  const context = useMenuContext();
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Portal, props);
    }
  });
}
function useMenuRadioGroupContext() {
  const context = useContext4(MenuRadioGroupContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");
  }
  return context;
}
function MenuRadioGroup(props) {
  const rootContext = useMenuRootContext();
  const defaultId = rootContext.generateId(`radiogroup-${createUniqueId()}`);
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "defaultValue", "onChange", "disabled"]);
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => local.onChange?.(value)
  });
  const context = {
    isDisabled: () => local.disabled,
    isSelectedValue: (value) => value === selected(),
    setSelectedValue: setSelected
  };
  return createComponent(MenuRadioGroupContext.Provider, {
    value: context,
    get children() {
      return createComponent(MenuGroup, others);
    }
  });
}
function MenuRadioItem(props) {
  const context = useMenuRadioGroupContext();
  const mergedProps = mergeDefaultProps({
    closeOnSelect: false
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "onSelect"]);
  const onSelect = () => {
    local.onSelect?.();
    context.setSelectedValue(local.value);
  };
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitemradio",
    get checked() {
      return context.isSelectedValue(local.value);
    },
    onSelect
  }, others));
}
function getPointerGraceArea(placement, event, contentEl) {
  const basePlacement = placement.split("-")[0];
  const contentRect = contentEl.getBoundingClientRect();
  const polygon = [];
  const pointerX = event.clientX;
  const pointerY = event.clientY;
  switch (basePlacement) {
    case "top":
      polygon.push([pointerX, pointerY + 5]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      break;
    case "right":
      polygon.push([pointerX - 5, pointerY]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      break;
    case "bottom":
      polygon.push([pointerX, pointerY - 5]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      break;
    case "left":
      polygon.push([pointerX + 5, pointerY]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      break;
  }
  return polygon;
}
function isPointerInGraceArea(event, area) {
  if (!area) {
    return false;
  }
  return isPointInPolygon([event.clientX, event.clientY], area);
}
function Menu(props) {
  const rootContext = useMenuRootContext();
  const parentDomCollectionContext = useOptionalDomCollectionContext();
  const parentMenuContext = useOptionalMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
  const mergedProps = mergeDefaultProps({
    placement: rootContext.orientation() === "horizontal" ? "bottom-start" : "right-start"
  }, props);
  const [local, others] = splitProps(mergedProps, ["open", "defaultOpen", "onOpenChange"]);
  let pointerGraceTimeoutId = 0;
  let pointerGraceIntent = null;
  let pointerDir = "right";
  const [triggerId, setTriggerId] = createSignal();
  const [contentId, setContentId] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [focusStrategy, setFocusStrategy] = createSignal(true);
  const [currentPlacement, setCurrentPlacement] = createSignal(others.placement);
  const [nestedMenus, setNestedMenus] = createSignal([]);
  const [items, setItems] = createSignal([]);
  const {
    DomCollectionProvider
  } = createDomCollection({
    items,
    onItemsChange: setItems
  });
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const {
    present: contentPresent
  } = src_default({
    show: () => rootContext.forceMount() || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const listState = createListState({
    selectionMode: "none",
    dataSource: items
  });
  const open = (focusStrategy2) => {
    setFocusStrategy(focusStrategy2);
    disclosureState.open();
  };
  const close = (recursively = false) => {
    disclosureState.close();
    if (recursively && parentMenuContext) {
      parentMenuContext.close(true);
    }
  };
  const toggle = (focusStrategy2) => {
    setFocusStrategy(focusStrategy2);
    disclosureState.toggle();
  };
  const _focusContent = () => {
    const content = contentRef();
    if (content) {
      focusWithoutScrolling(content);
      listState.selectionManager().setFocused(true);
      listState.selectionManager().setFocusedKey(void 0);
    }
  };
  const focusContent = () => {
    if (optionalNavigationMenuContext != null)
      setTimeout(() => _focusContent());
    else
      _focusContent();
  };
  const registerNestedMenu = (element) => {
    setNestedMenus((prev) => [...prev, element]);
    const parentUnregister = parentMenuContext?.registerNestedMenu(element);
    return () => {
      setNestedMenus((prev) => removeItemFromArray(prev, element));
      parentUnregister?.();
    };
  };
  const isPointerMovingToSubmenu = (e2) => {
    const isMovingTowards = pointerDir === pointerGraceIntent?.side;
    return isMovingTowards && isPointerInGraceArea(e2, pointerGraceIntent?.area);
  };
  const onItemEnter = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      e2.preventDefault();
    }
  };
  const onItemLeave = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      return;
    }
    focusContent();
  };
  const onTriggerLeave = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      e2.preventDefault();
    }
  };
  createHideOutside({
    isDisabled: () => {
      return !(parentMenuContext == null && disclosureState.isOpen() && rootContext.isModal());
    },
    targets: () => [contentRef(), ...nestedMenus()].filter(Boolean)
  });
  createEffect(() => {
    const contentEl = contentRef();
    if (!contentEl || !parentMenuContext) {
      return;
    }
    const parentUnregister = parentMenuContext.registerNestedMenu(contentEl);
    onCleanup(() => {
      parentUnregister();
    });
  });
  createEffect(() => {
    if (parentMenuContext !== void 0)
      return;
    optionalMenubarContext?.registerMenu(rootContext.value(), [contentRef(), ...nestedMenus()]);
  });
  createEffect(() => {
    if (parentMenuContext !== void 0 || optionalMenubarContext === void 0)
      return;
    if (optionalMenubarContext.value() === rootContext.value()) {
      triggerRef()?.focus();
      if (optionalMenubarContext.autoFocusMenu())
        open(true);
    } else
      close();
  });
  createEffect(() => {
    if (parentMenuContext !== void 0 || optionalMenubarContext === void 0)
      return;
    if (disclosureState.isOpen())
      optionalMenubarContext.setValue(rootContext.value());
  });
  onCleanup(() => {
    if (parentMenuContext !== void 0)
      return;
    optionalMenubarContext?.unregisterMenu(rootContext.value());
  });
  const dataset = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : void 0,
    "data-closed": !disclosureState.isOpen() ? "" : void 0
  }));
  const context = {
    dataset,
    isOpen: disclosureState.isOpen,
    contentPresent,
    nestedMenus,
    currentPlacement,
    pointerGraceTimeoutId: () => pointerGraceTimeoutId,
    autoFocus: focusStrategy,
    listState: () => listState,
    parentMenuContext: () => parentMenuContext,
    triggerRef,
    contentRef,
    triggerId,
    contentId,
    setTriggerRef,
    setContentRef,
    open,
    close,
    toggle,
    focusContent,
    onItemEnter,
    onItemLeave,
    onTriggerLeave,
    setPointerDir: (dir) => pointerDir = dir,
    setPointerGraceTimeoutId: (id) => pointerGraceTimeoutId = id,
    setPointerGraceIntent: (intent) => pointerGraceIntent = intent,
    registerNestedMenu,
    registerItemToParentDomCollection: parentDomCollectionContext?.registerItem,
    registerTriggerId: createRegisterId(setTriggerId),
    registerContentId: createRegisterId(setContentId)
  };
  return createComponent(DomCollectionProvider, {
    get children() {
      return createComponent(MenuContext.Provider, {
        value: context,
        get children() {
          return createComponent(Show, {
            when: optionalNavigationMenuContext === void 0,
            get fallback() {
              return others.children;
            },
            get children() {
              return createComponent(Popper, mergeProps({
                anchorRef: triggerRef,
                contentRef,
                onCurrentPlacementChange: setCurrentPlacement
              }, others));
            }
          });
        }
      });
    }
  });
}
function MenuSub(props) {
  const {
    direction
  } = useLocale();
  return createComponent(Menu, mergeProps({
    get placement() {
      return direction() === "rtl" ? "left-start" : "right-start";
    },
    flip: true
  }, props));
}
function MenuSubContent(props) {
  const context = useMenuContext();
  const rootContext = useMenuRootContext();
  const [local, others] = splitProps(props, ["onFocusOutside", "onKeyDown"]);
  const {
    direction
  } = useLocale();
  const onOpenAutoFocus = (e2) => {
    e2.preventDefault();
  };
  const onCloseAutoFocus = (e2) => {
    e2.preventDefault();
  };
  const onFocusOutside = (e2) => {
    local.onFocusOutside?.(e2);
    const target = e2.target;
    if (!contains(context.triggerRef(), target)) {
      context.close();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    const isKeyDownInside = contains(e2.currentTarget, e2.target);
    const isCloseKey = SUB_CLOSE_KEYS.close(direction(), rootContext.orientation()).includes(e2.key);
    const isSubMenu = context.parentMenuContext() != null;
    if (isKeyDownInside && isCloseKey && isSubMenu) {
      context.close();
      focusWithoutScrolling(context.triggerRef());
    }
  };
  return createComponent(MenuContentBase, mergeProps({
    onOpenAutoFocus,
    onCloseAutoFocus,
    onFocusOutside,
    onKeyDown
  }, others));
}
function MenuSubTrigger(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`sub-trigger-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "textValue", "disabled", "onPointerMove", "onPointerLeave", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  let openTimeoutId = null;
  const clearOpenTimeout = () => {
    if (isServer2) {
      return;
    }
    if (openTimeoutId) {
      window.clearTimeout(openTimeoutId);
    }
    openTimeoutId = null;
  };
  const {
    direction
  } = useLocale();
  const key = () => local.id;
  const parentSelectionManager = () => {
    const parentMenuContext = context.parentMenuContext();
    if (parentMenuContext == null) {
      throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");
    }
    return parentMenuContext.listState().selectionManager();
  };
  const collection = () => context.listState().collection();
  const isHighlighted = () => parentSelectionManager().focusedKey() === key();
  const selectableItem = createSelectableItem({
    key,
    selectionManager: parentSelectionManager,
    shouldSelectOnPressUp: true,
    allowsDifferentPressOrigin: true,
    disabled: () => local.disabled
  }, () => ref);
  const onClick = (e2) => {
    callHandler(e2, local.onClick);
    if (!context.isOpen() && !local.disabled) {
      context.open(true);
    }
  };
  const onPointerMove = (e2) => {
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    const parentMenuContext = context.parentMenuContext();
    parentMenuContext?.onItemEnter(e2);
    if (e2.defaultPrevented) {
      return;
    }
    if (local.disabled) {
      parentMenuContext?.onItemLeave(e2);
      return;
    }
    if (!context.isOpen() && !openTimeoutId) {
      context.parentMenuContext()?.setPointerGraceIntent(null);
      openTimeoutId = window.setTimeout(() => {
        context.open(false);
        clearOpenTimeout();
      }, 100);
    }
    parentMenuContext?.onItemEnter(e2);
    if (!e2.defaultPrevented) {
      if (context.listState().selectionManager().isFocused()) {
        context.listState().selectionManager().setFocused(false);
        context.listState().selectionManager().setFocusedKey(void 0);
      }
      focusWithoutScrolling(e2.currentTarget);
      parentMenuContext?.listState().selectionManager().setFocused(true);
      parentMenuContext?.listState().selectionManager().setFocusedKey(key());
    }
  };
  const onPointerLeave = (e2) => {
    callHandler(e2, local.onPointerLeave);
    if (e2.pointerType !== "mouse") {
      return;
    }
    clearOpenTimeout();
    const parentMenuContext = context.parentMenuContext();
    const contentEl = context.contentRef();
    if (contentEl) {
      parentMenuContext?.setPointerGraceIntent({
        area: getPointerGraceArea(context.currentPlacement(), e2, contentEl),
        // Safe because sub menu always open "left" or "right".
        side: context.currentPlacement().split("-")[0]
      });
      window.clearTimeout(parentMenuContext?.pointerGraceTimeoutId());
      const pointerGraceTimeoutId = window.setTimeout(() => {
        parentMenuContext?.setPointerGraceIntent(null);
      }, 300);
      parentMenuContext?.setPointerGraceTimeoutId(pointerGraceTimeoutId);
    } else {
      parentMenuContext?.onTriggerLeave(e2);
      if (e2.defaultPrevented) {
        return;
      }
      parentMenuContext?.setPointerGraceIntent(null);
    }
    parentMenuContext?.onItemLeave(e2);
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (e2.repeat) {
      return;
    }
    if (local.disabled) {
      return;
    }
    if (SUB_OPEN_KEYS.open(direction(), rootContext.orientation()).includes(e2.key)) {
      e2.stopPropagation();
      e2.preventDefault();
      parentSelectionManager().setFocused(false);
      parentSelectionManager().setFocusedKey(void 0);
      if (!context.isOpen()) {
        context.open("first");
      }
      context.focusContent();
      context.listState().selectionManager().setFocused(true);
      context.listState().selectionManager().setFocusedKey(collection().getFirstKey());
    }
  };
  createEffect(() => {
    if (context.registerItemToParentDomCollection == null) {
      throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");
    }
    const unregister = context.registerItemToParentDomCollection({
      ref: () => ref,
      type: "item",
      key: key(),
      textValue: local.textValue ?? ref?.textContent ?? "",
      disabled: local.disabled ?? false
    });
    onCleanup(unregister);
  });
  createEffect(on(() => context.parentMenuContext()?.pointerGraceTimeoutId(), (pointerGraceTimer) => {
    onCleanup(() => {
      window.clearTimeout(pointerGraceTimer);
      context.parentMenuContext()?.setPointerGraceIntent(null);
    });
  }));
  createEffect(() => onCleanup(context.registerTriggerId(local.id)));
  onCleanup(() => {
    clearOpenTimeout();
  });
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs((el) => {
        context.setTriggerRef(el);
        ref = el;
      }, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return local.id;
    },
    role: "menuitem",
    get tabIndex() {
      return selectableItem.tabIndex();
    },
    "aria-haspopup": "true",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return memo(() => !!context.isOpen())() ? context.contentId() : void 0;
    },
    get ["aria-disabled"]() {
      return local.disabled;
    },
    get ["data-key"]() {
      return selectableItem.dataKey();
    },
    get ["data-highlighted"]() {
      return isHighlighted() ? "" : void 0;
    },
    get ["data-disabled"]() {
      return local.disabled ? "" : void 0;
    },
    get onPointerDown() {
      return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
    },
    get onPointerUp() {
      return composeEventHandlers([local.onPointerUp, selectableItem.onPointerUp]);
    },
    get onClick() {
      return composeEventHandlers([onClick, selectableItem.onClick]);
    },
    get onKeyDown() {
      return composeEventHandlers([onKeyDown, selectableItem.onKeyDown]);
    },
    get onMouseDown() {
      return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
    },
    get onFocus() {
      return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
    },
    onPointerMove,
    onPointerLeave
  }, () => context.dataset(), others));
}
function MenuRoot(props) {
  const optionalMenubarContext = useOptionalMenubarContext();
  const defaultId = `menu-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    modal: true
  }, props);
  const [local, others] = splitProps(mergedProps, ["id", "modal", "preventScroll", "forceMount", "open", "defaultOpen", "onOpenChange", "value", "orientation"]);
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => local.onOpenChange?.(isOpen)
  });
  const context = {
    isModal: () => local.modal ?? true,
    preventScroll: () => local.preventScroll ?? context.isModal(),
    forceMount: () => local.forceMount ?? false,
    generateId: createGenerateId(() => local.id),
    value: () => local.value,
    orientation: () => local.orientation ?? optionalMenubarContext?.orientation() ?? "horizontal"
  };
  return createComponent(MenuRootContext.Provider, {
    value: context,
    get children() {
      return createComponent(Menu, mergeProps({
        get open() {
          return disclosureState.isOpen();
        },
        get onOpenChange() {
          return disclosureState.setIsOpen;
        }
      }, others));
    }
  });
}
function SeparatorRoot(props) {
  let ref;
  const mergedProps = mergeDefaultProps({
    orientation: "horizontal"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "orientation"]);
  const tagName = createTagName(() => ref, () => "hr");
  return createComponent(Polymorphic, mergeProps({
    as: "hr",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get role() {
      return tagName() !== "hr" ? "separator" : void 0;
    },
    get ["aria-orientation"]() {
      return local.orientation === "vertical" ? "vertical" : void 0;
    },
    get ["data-orientation"]() {
      return local.orientation;
    }
  }, others));
}
function DropdownMenuContent(props) {
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const [local, others] = splitProps(props, ["onCloseAutoFocus", "onInteractOutside"]);
  let hasInteractedOutside = false;
  const onCloseAutoFocus = (e2) => {
    local.onCloseAutoFocus?.(e2);
    if (!hasInteractedOutside) {
      focusWithoutScrolling(context.triggerRef());
    }
    hasInteractedOutside = false;
    e2.preventDefault();
  };
  const onInteractOutside = (e2) => {
    local.onInteractOutside?.(e2);
    if (!rootContext.isModal() || e2.detail.isContextMenu) {
      hasInteractedOutside = true;
    }
  };
  return createComponent(MenuContent, mergeProps({
    onCloseAutoFocus,
    onInteractOutside
  }, others));
}
function DropdownMenuRoot(props) {
  const defaultId = `dropdownmenu-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  return createComponent(MenuRoot, mergedProps);
}
function Search() {
  return _tmpl$2();
}
function Trash() {
  return _tmpl$22();
}
function ChevronDown() {
  return _tmpl$3();
}
function ArrowUp() {
  return _tmpl$4();
}
function ArrowDown() {
  return _tmpl$5();
}
function ArrowLeft() {
  return (() => {
    var _el$6 = _tmpl$5();
    _el$6.style.setProperty("transform", "rotate(90deg)");
    return _el$6;
  })();
}
function ArrowRight() {
  return (() => {
    var _el$7 = _tmpl$5();
    _el$7.style.setProperty("transform", "rotate(-90deg)");
    return _el$7;
  })();
}
function Sun() {
  return _tmpl$6();
}
function Moon() {
  return _tmpl$7();
}
function Monitor() {
  return _tmpl$8();
}
function Wifi() {
  return _tmpl$9();
}
function Offline() {
  return _tmpl$0();
}
function Settings() {
  return _tmpl$1();
}
function PiPIcon() {
  return _tmpl$10();
}
function Copier() {
  return _tmpl$11();
}
function Pencil() {
  return _tmpl$12();
}
function CopiedCopier(props) {
  return (() => {
    var _el$15 = _tmpl$13(), _el$16 = _el$15.firstChild;
    createRenderEffect(() => setAttribute(_el$16, "stroke", props.theme === "dark" ? "#12B76A" : "#027A48"));
    return _el$15;
  })();
}
function ErrorCopier() {
  return _tmpl$14();
}
function List() {
  return _tmpl$15();
}
function Check(props) {
  return [createComponent(Show, {
    get when() {
      return props.checked;
    },
    get children() {
      var _el$19 = _tmpl$13(), _el$20 = _el$19.firstChild;
      createRenderEffect(() => setAttribute(_el$20, "stroke", props.theme === "dark" ? "#9B8AFB" : "#6938EF"));
      return _el$19;
    }
  }), createComponent(Show, {
    get when() {
      return !props.checked;
    },
    get children() {
      var _el$21 = _tmpl$16(), _el$22 = _el$21.firstChild;
      createRenderEffect(() => setAttribute(_el$22, "stroke", props.theme === "dark" ? "#9B8AFB" : "#6938EF"));
      return _el$21;
    }
  })];
}
function CheckCircle() {
  return _tmpl$17();
}
function LoadingCircle() {
  return _tmpl$18();
}
function XCircle() {
  return _tmpl$19();
}
function PauseCircle() {
  return _tmpl$20();
}
function TanstackLogo() {
  const id = createUniqueId();
  return (() => {
    var _el$27 = _tmpl$21(), _el$28 = _el$27.firstChild, _el$29 = _el$28.nextSibling, _el$30 = _el$29.nextSibling, _el$31 = _el$30.firstChild, _el$32 = _el$30.nextSibling, _el$33 = _el$32.firstChild, _el$34 = _el$32.nextSibling, _el$35 = _el$34.nextSibling, _el$36 = _el$35.firstChild, _el$37 = _el$35.nextSibling, _el$38 = _el$37.firstChild, _el$39 = _el$37.nextSibling, _el$40 = _el$39.nextSibling, _el$41 = _el$40.firstChild, _el$42 = _el$40.nextSibling, _el$43 = _el$42.firstChild, _el$44 = _el$42.nextSibling, _el$45 = _el$44.nextSibling, _el$46 = _el$45.firstChild, _el$47 = _el$45.nextSibling, _el$48 = _el$47.firstChild, _el$49 = _el$47.nextSibling, _el$50 = _el$49.nextSibling, _el$51 = _el$50.firstChild, _el$52 = _el$50.nextSibling, _el$53 = _el$52.firstChild, _el$54 = _el$52.nextSibling, _el$55 = _el$54.nextSibling, _el$56 = _el$55.firstChild, _el$57 = _el$55.nextSibling, _el$58 = _el$57.firstChild, _el$59 = _el$57.nextSibling, _el$60 = _el$59.nextSibling, _el$61 = _el$60.firstChild, _el$62 = _el$60.nextSibling, _el$63 = _el$62.firstChild, _el$64 = _el$62.nextSibling, _el$65 = _el$64.firstChild, _el$66 = _el$65.nextSibling, _el$67 = _el$66.nextSibling, _el$68 = _el$67.nextSibling, _el$69 = _el$68.nextSibling, _el$70 = _el$64.nextSibling, _el$71 = _el$70.firstChild, _el$72 = _el$70.nextSibling, _el$73 = _el$72.firstChild, _el$74 = _el$72.nextSibling, _el$75 = _el$74.firstChild, _el$76 = _el$75.nextSibling, _el$77 = _el$76.nextSibling, _el$78 = _el$77.firstChild, _el$79 = _el$78.nextSibling, _el$80 = _el$79.nextSibling, _el$81 = _el$80.nextSibling, _el$82 = _el$81.nextSibling, _el$83 = _el$82.nextSibling, _el$84 = _el$83.nextSibling, _el$85 = _el$84.nextSibling, _el$86 = _el$85.nextSibling, _el$87 = _el$86.nextSibling, _el$88 = _el$87.nextSibling, _el$89 = _el$88.nextSibling, _el$90 = _el$74.nextSibling, _el$91 = _el$90.firstChild, _el$92 = _el$90.nextSibling, _el$93 = _el$92.firstChild, _el$94 = _el$92.nextSibling, _el$95 = _el$94.firstChild, _el$96 = _el$95.nextSibling, _el$97 = _el$94.nextSibling, _el$98 = _el$97.firstChild, _el$99 = _el$97.nextSibling, _el$100 = _el$99.firstChild, _el$101 = _el$99.nextSibling, _el$102 = _el$101.firstChild, _el$103 = _el$102.nextSibling, _el$104 = _el$103.nextSibling, _el$105 = _el$104.nextSibling, _el$106 = _el$105.nextSibling, _el$107 = _el$106.nextSibling, _el$108 = _el$107.nextSibling, _el$109 = _el$108.nextSibling, _el$110 = _el$109.nextSibling, _el$111 = _el$110.nextSibling, _el$112 = _el$111.nextSibling, _el$113 = _el$112.nextSibling, _el$114 = _el$113.nextSibling, _el$115 = _el$114.nextSibling, _el$116 = _el$115.nextSibling, _el$117 = _el$116.nextSibling, _el$118 = _el$117.nextSibling, _el$119 = _el$118.nextSibling;
    setAttribute(_el$28, "id", `a-${id}`);
    setAttribute(_el$29, "fill", `url(#a-${id})`);
    setAttribute(_el$31, "id", `am-${id}`);
    setAttribute(_el$32, "id", `b-${id}`);
    setAttribute(_el$33, "filter", `url(#am-${id})`);
    setAttribute(_el$34, "mask", `url(#b-${id})`);
    setAttribute(_el$36, "id", `ah-${id}`);
    setAttribute(_el$37, "id", `k-${id}`);
    setAttribute(_el$38, "filter", `url(#ah-${id})`);
    setAttribute(_el$39, "mask", `url(#k-${id})`);
    setAttribute(_el$41, "id", `ae-${id}`);
    setAttribute(_el$42, "id", `j-${id}`);
    setAttribute(_el$43, "filter", `url(#ae-${id})`);
    setAttribute(_el$44, "mask", `url(#j-${id})`);
    setAttribute(_el$46, "id", `ai-${id}`);
    setAttribute(_el$47, "id", `i-${id}`);
    setAttribute(_el$48, "filter", `url(#ai-${id})`);
    setAttribute(_el$49, "mask", `url(#i-${id})`);
    setAttribute(_el$51, "id", `aj-${id}`);
    setAttribute(_el$52, "id", `h-${id}`);
    setAttribute(_el$53, "filter", `url(#aj-${id})`);
    setAttribute(_el$54, "mask", `url(#h-${id})`);
    setAttribute(_el$56, "id", `ag-${id}`);
    setAttribute(_el$57, "id", `g-${id}`);
    setAttribute(_el$58, "filter", `url(#ag-${id})`);
    setAttribute(_el$59, "mask", `url(#g-${id})`);
    setAttribute(_el$61, "id", `af-${id}`);
    setAttribute(_el$62, "id", `f-${id}`);
    setAttribute(_el$63, "filter", `url(#af-${id})`);
    setAttribute(_el$64, "mask", `url(#f-${id})`);
    setAttribute(_el$68, "id", `m-${id}`);
    setAttribute(_el$69, "fill", `url(#m-${id})`);
    setAttribute(_el$71, "id", `ak-${id}`);
    setAttribute(_el$72, "id", `e-${id}`);
    setAttribute(_el$73, "filter", `url(#ak-${id})`);
    setAttribute(_el$74, "mask", `url(#e-${id})`);
    setAttribute(_el$75, "id", `n-${id}`);
    setAttribute(_el$76, "fill", `url(#n-${id})`);
    setAttribute(_el$78, "id", `r-${id}`);
    setAttribute(_el$79, "fill", `url(#r-${id})`);
    setAttribute(_el$80, "id", `s-${id}`);
    setAttribute(_el$81, "fill", `url(#s-${id})`);
    setAttribute(_el$82, "id", `q-${id}`);
    setAttribute(_el$83, "fill", `url(#q-${id})`);
    setAttribute(_el$84, "id", `p-${id}`);
    setAttribute(_el$85, "fill", `url(#p-${id})`);
    setAttribute(_el$86, "id", `o-${id}`);
    setAttribute(_el$87, "fill", `url(#o-${id})`);
    setAttribute(_el$88, "id", `l-${id}`);
    setAttribute(_el$89, "fill", `url(#l-${id})`);
    setAttribute(_el$91, "id", `al-${id}`);
    setAttribute(_el$92, "id", `d-${id}`);
    setAttribute(_el$93, "filter", `url(#al-${id})`);
    setAttribute(_el$94, "mask", `url(#d-${id})`);
    setAttribute(_el$95, "id", `u-${id}`);
    setAttribute(_el$96, "fill", `url(#u-${id})`);
    setAttribute(_el$98, "id", `ad-${id}`);
    setAttribute(_el$99, "id", `c-${id}`);
    setAttribute(_el$100, "filter", `url(#ad-${id})`);
    setAttribute(_el$101, "mask", `url(#c-${id})`);
    setAttribute(_el$102, "id", `t-${id}`);
    setAttribute(_el$103, "fill", `url(#t-${id})`);
    setAttribute(_el$104, "id", `v-${id}`);
    setAttribute(_el$105, "stroke", `url(#v-${id})`);
    setAttribute(_el$106, "id", `aa-${id}`);
    setAttribute(_el$107, "stroke", `url(#aa-${id})`);
    setAttribute(_el$108, "id", `w-${id}`);
    setAttribute(_el$109, "stroke", `url(#w-${id})`);
    setAttribute(_el$110, "id", `ac-${id}`);
    setAttribute(_el$111, "stroke", `url(#ac-${id})`);
    setAttribute(_el$112, "id", `ab-${id}`);
    setAttribute(_el$113, "stroke", `url(#ab-${id})`);
    setAttribute(_el$114, "id", `y-${id}`);
    setAttribute(_el$115, "stroke", `url(#y-${id})`);
    setAttribute(_el$116, "id", `x-${id}`);
    setAttribute(_el$117, "stroke", `url(#x-${id})`);
    setAttribute(_el$118, "id", `z-${id}`);
    setAttribute(_el$119, "stroke", `url(#z-${id})`);
    return _el$27;
  })();
}
function chunkArray(array, size3) {
  let i2 = 0;
  const result = [];
  while (i2 < array.length) {
    result.push(array.slice(i2, i2 + size3));
    i2 = i2 + size3;
  }
  return result;
}
function isIterable(x) {
  return Symbol.iterator in x;
}
function Explorer(props) {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient2 = useQueryDevtoolsContext().client;
  const [expanded, setExpanded] = createSignal((props.defaultExpanded || []).includes(props.label));
  const toggleExpanded = () => setExpanded((old) => !old);
  const [expandedPages, setExpandedPages] = createSignal([]);
  const subEntries = createMemo(() => {
    if (Array.isArray(props.value)) {
      return props.value.map((d, i2) => ({
        label: i2.toString(),
        value: d
      }));
    } else if (props.value !== null && typeof props.value === "object" && isIterable(props.value) && typeof props.value[Symbol.iterator] === "function") {
      if (props.value instanceof Map) {
        return Array.from(props.value, ([key, val]) => ({
          label: key,
          value: val
        }));
      }
      return Array.from(props.value, (val, i2) => ({
        label: i2.toString(),
        value: val
      }));
    } else if (typeof props.value === "object" && props.value !== null) {
      return Object.entries(props.value).map(([key, val]) => ({
        label: key,
        value: val
      }));
    }
    return [];
  });
  const type = createMemo(() => {
    if (Array.isArray(props.value)) {
      return "array";
    } else if (props.value !== null && typeof props.value === "object" && isIterable(props.value) && typeof props.value[Symbol.iterator] === "function") {
      return "Iterable";
    } else if (typeof props.value === "object" && props.value !== null) {
      return "object";
    }
    return typeof props.value;
  });
  const subEntryPages = createMemo(() => chunkArray(subEntries(), 100));
  const currentDataPath = props.dataPath ?? [];
  return (() => {
    var _el$6 = _tmpl$72();
    insert(_el$6, createComponent(Show, {
      get when() {
        return subEntryPages().length;
      },
      get children() {
        return [(() => {
          var _el$7 = _tmpl$82(), _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild, _el$0 = _el$9.nextSibling, _el$1 = _el$0.nextSibling, _el$10 = _el$1.nextSibling, _el$11 = _el$10.firstChild;
          _el$8.$$click = () => toggleExpanded();
          insert(_el$8, createComponent(Expander, {
            get expanded() {
              return expanded();
            }
          }), _el$9);
          insert(_el$0, () => props.label);
          insert(_el$10, () => String(type()).toLowerCase() === "iterable" ? "(Iterable) " : "", _el$11);
          insert(_el$10, () => subEntries().length, _el$11);
          insert(_el$10, () => subEntries().length > 1 ? `items` : `item`, null);
          insert(_el$7, createComponent(Show, {
            get when() {
              return props.editable;
            },
            get children() {
              var _el$12 = _tmpl$72();
              insert(_el$12, createComponent(CopyButton, {
                get value() {
                  return props.value;
                }
              }), null);
              insert(_el$12, createComponent(Show, {
                get when() {
                  return props.itemsDeletable && props.activeQuery !== void 0;
                },
                get children() {
                  return createComponent(DeleteItemButton, {
                    get activeQuery() {
                      return props.activeQuery;
                    },
                    dataPath: currentDataPath
                  });
                }
              }), null);
              insert(_el$12, createComponent(Show, {
                get when() {
                  return type() === "array" && props.activeQuery !== void 0;
                },
                get children() {
                  return createComponent(ClearArrayButton, {
                    get activeQuery() {
                      return props.activeQuery;
                    },
                    dataPath: currentDataPath
                  });
                }
              }), null);
              insert(_el$12, createComponent(Show, {
                get when() {
                  return memo(() => !!!!props.onEdit)() && !serialize(props.value).meta;
                },
                get children() {
                  var _el$13 = _tmpl$62();
                  _el$13.$$click = () => {
                    props.onEdit?.();
                  };
                  insert(_el$13, createComponent(Pencil, {}));
                  createRenderEffect(() => className(_el$13, styles().actionButton));
                  return _el$13;
                }
              }), null);
              createRenderEffect(() => className(_el$12, styles().actions));
              return _el$12;
            }
          }), null);
          createRenderEffect((_p$) => {
            var _v$3 = styles().expanderButtonContainer, _v$4 = styles().expanderButton, _v$5 = styles().info;
            _v$3 !== _p$.e && className(_el$7, _p$.e = _v$3);
            _v$4 !== _p$.t && className(_el$8, _p$.t = _v$4);
            _v$5 !== _p$.a && className(_el$10, _p$.a = _v$5);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          });
          return _el$7;
        })(), createComponent(Show, {
          get when() {
            return expanded();
          },
          get children() {
            return [createComponent(Show, {
              get when() {
                return subEntryPages().length === 1;
              },
              get children() {
                var _el$14 = _tmpl$72();
                insert(_el$14, createComponent(Key, {
                  get each() {
                    return subEntries();
                  },
                  by: (item) => item.label,
                  children: (entry) => {
                    return createComponent(Explorer, {
                      get defaultExpanded() {
                        return props.defaultExpanded;
                      },
                      get label() {
                        return entry().label;
                      },
                      get value() {
                        return entry().value;
                      },
                      get editable() {
                        return props.editable;
                      },
                      get dataPath() {
                        return [...currentDataPath, entry().label];
                      },
                      get activeQuery() {
                        return props.activeQuery;
                      },
                      get itemsDeletable() {
                        return type() === "array" || type() === "Iterable" || type() === "object";
                      }
                    });
                  }
                }));
                createRenderEffect(() => className(_el$14, styles().subEntry));
                return _el$14;
              }
            }), createComponent(Show, {
              get when() {
                return subEntryPages().length > 1;
              },
              get children() {
                var _el$15 = _tmpl$72();
                insert(_el$15, createComponent(Index, {
                  get each() {
                    return subEntryPages();
                  },
                  children: (entries2, index) => (() => {
                    var _el$21 = _tmpl$102(), _el$22 = _el$21.firstChild, _el$23 = _el$22.firstChild, _el$24 = _el$23.firstChild, _el$28 = _el$24.nextSibling, _el$26 = _el$28.nextSibling, _el$29 = _el$26.nextSibling;
                    _el$29.nextSibling;
                    _el$23.$$click = () => setExpandedPages((old) => old.includes(index) ? old.filter((d) => d !== index) : [...old, index]);
                    insert(_el$23, createComponent(Expander, {
                      get expanded() {
                        return expandedPages().includes(index);
                      }
                    }), _el$24);
                    insert(_el$23, index * 100, _el$28);
                    insert(_el$23, index * 100 + 100 - 1, _el$29);
                    insert(_el$22, createComponent(Show, {
                      get when() {
                        return expandedPages().includes(index);
                      },
                      get children() {
                        var _el$30 = _tmpl$72();
                        insert(_el$30, createComponent(Key, {
                          get each() {
                            return entries2();
                          },
                          by: (entry) => entry.label,
                          children: (entry) => createComponent(Explorer, {
                            get defaultExpanded() {
                              return props.defaultExpanded;
                            },
                            get label() {
                              return entry().label;
                            },
                            get value() {
                              return entry().value;
                            },
                            get editable() {
                              return props.editable;
                            },
                            get dataPath() {
                              return [...currentDataPath, entry().label];
                            },
                            get activeQuery() {
                              return props.activeQuery;
                            }
                          })
                        }));
                        createRenderEffect(() => className(_el$30, styles().subEntry));
                        return _el$30;
                      }
                    }), null);
                    createRenderEffect((_p$) => {
                      var _v$0 = styles().entry, _v$1 = styles().expanderButton;
                      _v$0 !== _p$.e && className(_el$22, _p$.e = _v$0);
                      _v$1 !== _p$.t && className(_el$23, _p$.t = _v$1);
                      return _p$;
                    }, {
                      e: void 0,
                      t: void 0
                    });
                    return _el$21;
                  })()
                }));
                createRenderEffect(() => className(_el$15, styles().subEntry));
                return _el$15;
              }
            })];
          }
        })];
      }
    }), null);
    insert(_el$6, createComponent(Show, {
      get when() {
        return subEntryPages().length === 0;
      },
      get children() {
        var _el$16 = _tmpl$110(), _el$17 = _el$16.firstChild, _el$18 = _el$17.firstChild;
        insert(_el$17, () => props.label, _el$18);
        insert(_el$16, createComponent(Show, {
          get when() {
            return memo(() => !!(props.editable && props.activeQuery !== void 0))() && (type() === "string" || type() === "number" || type() === "boolean");
          },
          get fallback() {
            return (() => {
              var _el$31 = _tmpl$02();
              insert(_el$31, () => displayValue(props.value));
              createRenderEffect(() => className(_el$31, styles().value));
              return _el$31;
            })();
          },
          get children() {
            return [createComponent(Show, {
              get when() {
                return memo(() => !!(props.editable && props.activeQuery !== void 0))() && (type() === "string" || type() === "number");
              },
              get children() {
                var _el$19 = _tmpl$92();
                _el$19.addEventListener("change", (changeEvent) => {
                  const oldData = props.activeQuery.state.data;
                  const newData = updateNestedDataByPath(oldData, currentDataPath, type() === "number" ? changeEvent.target.valueAsNumber : changeEvent.target.value);
                  queryClient2.setQueryData(props.activeQuery.queryKey, newData);
                });
                createRenderEffect((_p$) => {
                  var _v$6 = type() === "number" ? "number" : "text", _v$7 = clsx(styles().value, styles().editableInput);
                  _v$6 !== _p$.e && setAttribute(_el$19, "type", _p$.e = _v$6);
                  _v$7 !== _p$.t && className(_el$19, _p$.t = _v$7);
                  return _p$;
                }, {
                  e: void 0,
                  t: void 0
                });
                createRenderEffect(() => _el$19.value = props.value);
                return _el$19;
              }
            }), createComponent(Show, {
              get when() {
                return type() === "boolean";
              },
              get children() {
                var _el$20 = _tmpl$02();
                insert(_el$20, createComponent(ToggleValueButton, {
                  get activeQuery() {
                    return props.activeQuery;
                  },
                  dataPath: currentDataPath,
                  get value() {
                    return props.value;
                  }
                }), null);
                insert(_el$20, () => displayValue(props.value), null);
                createRenderEffect(() => className(_el$20, clsx(styles().value, styles().actions, styles().editableInput)));
                return _el$20;
              }
            })];
          }
        }), null);
        insert(_el$16, createComponent(Show, {
          get when() {
            return props.editable && props.itemsDeletable && props.activeQuery !== void 0;
          },
          get children() {
            return createComponent(DeleteItemButton, {
              get activeQuery() {
                return props.activeQuery;
              },
              dataPath: currentDataPath
            });
          }
        }), null);
        createRenderEffect((_p$) => {
          var _v$8 = styles().row, _v$9 = styles().label;
          _v$8 !== _p$.e && className(_el$16, _p$.e = _v$8);
          _v$9 !== _p$.t && className(_el$17, _p$.t = _v$9);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$16;
      }
    }), null);
    createRenderEffect(() => className(_el$6, styles().entry));
    return _el$6;
  })();
}
var isClient, isDev, noop2, isNonNullable, filterNonNullable, access, asArray, tryOnCleanup, createLocalStorage, addClearMethod, serializeCookieOptions, cookieStorage, firstBreakpoint, secondBreakpoint, thirdBreakpoint, BUTTON_POSITION, POSITION, THEME_PREFERENCE, INITIAL_IS_OPEN, DEFAULT_HEIGHT, PIP_DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_SORT_FN_NAME, DEFAULT_SORT_ORDER, DEFAULT_MUTATION_SORT_FN_NAME, QueryDevtoolsContext, PiPContext, PiPProvider, usePiPWindow, ThemeContext, characterMap, chars, allAccents, rankings, defaultKeyAttributes, e, t, l, a, n, o, c, s, i, p, defaultElementPredicate, TransitionGroup, FALLBACK2, extractCSSregex, EventKey, supportsPreventScrollCached, focusableElements, tabbableElements, FOCUSABLE_ELEMENT_SELECTOR, TABBABLE_ELEMENT_SELECTOR, transitionsByElement, transitionCallbacks, visuallyHiddenStyles, FORM_CONTROL_PROP_NAMES, FormControlContext, __defProp2, __export2, DomCollectionContext, RTL_SCRIPTS, RTL_LANGS, currentLocale, listeners, I18nContext, cache, Selection, SelectionManager, ListCollection, access2, createPresence, presence_default, src_default, DATA_TOP_LAYER_ATTR, originalBodyPointerEvents, hasDisabledBodyPointerEvents, layers, layerStack, button_exports, BUTTON_INPUT_TYPES, Button, sides, min, max, round, floor, createCoords, oppositeSideMap, oppositeAlignmentMap, computePosition, arrow, flip, hide, offset, shift, size, noOffsets, getElementRects, platform, offset2, shift2, flip2, size2, hide2, arrow2, computePosition2, PopperContext, _tmpl$, DEFAULT_SIZE, HALF_DEFAULT_SIZE, ROTATION_DEG, REVERSE_BASE_PLACEMENT, Popper, POINTER_DOWN_OUTSIDE_EVENT, FOCUS_OUTSIDE_EVENT, DismissableLayerContext, radio_group_exports, RadioGroupContext, RadioGroupItemContext, RadioGroup, ListKeyboardDelegate, AUTOFOCUS_ON_MOUNT_EVENT, AUTOFOCUS_ON_UNMOUNT_EVENT, EVENT_OPTIONS, focusScopeStack, DATA_LIVE_ANNOUNCER_ATTR, refCountMap, observerStack, activeStyles, createStyle, style_default, getScrollDimensions, isScrollContainer, getScrollAtLocation, preventScrollStack, setPreventScrollStack, isActive, createPreventScroll, getDeltaXY, getTouchXY, wouldScroll, contains2, preventScroll_default, src_default2, MenuContext, MenuItemContext, MenuRootContext, MenubarContext, MENUBAR_KEYS, MENU_KEYS, NavigationMenuContext, MenuGroupContext, MenuRadioGroupContext, SUB_CLOSE_KEYS, SELECTION_KEYS, SUB_OPEN_KEYS, separator_exports, Separator, dropdown_menu_exports, DropdownMenu, tokens, _tmpl$2, _tmpl$22, _tmpl$3, _tmpl$4, _tmpl$5, _tmpl$6, _tmpl$7, _tmpl$8, _tmpl$9, _tmpl$0, _tmpl$1, _tmpl$10, _tmpl$11, _tmpl$12, _tmpl$13, _tmpl$14, _tmpl$15, _tmpl$16, _tmpl$17, _tmpl$18, _tmpl$19, _tmpl$20, _tmpl$21, _tmpl$23, _tmpl$24, _tmpl$32, _tmpl$42, _tmpl$52, _tmpl$62, _tmpl$72, _tmpl$82, _tmpl$92, _tmpl$02, _tmpl$110, _tmpl$102, Expander, CopyButton, ClearArrayButton, DeleteItemButton, ToggleValueButton, stylesFactory, lightStyles, darkStyles, _tmpl$25, _tmpl$26, _tmpl$33, _tmpl$43, _tmpl$53, _tmpl$63, _tmpl$73, _tmpl$83, _tmpl$93, _tmpl$03, _tmpl$111, _tmpl$103, _tmpl$112, _tmpl$122, _tmpl$132, _tmpl$142, _tmpl$152, _tmpl$162, _tmpl$172, _tmpl$182, _tmpl$192, _tmpl$202, _tmpl$212, _tmpl$222, _tmpl$232, _tmpl$242, _tmpl$252, _tmpl$262, _tmpl$27, _tmpl$28, _tmpl$29, _tmpl$30, _tmpl$31, _tmpl$322, _tmpl$332, _tmpl$34, _tmpl$35, _tmpl$36, selectedQueryHash, setSelectedQueryHash, selectedMutationId, setSelectedMutationId, panelWidth, setPanelWidth, offline, setOffline, Devtools, PiPPanel, ParentPanel, DraggablePanel, ContentView, QueryRow, MutationRow, QueryStatusCount, MutationStatusCount, QueryStatus, QueryDetails, MutationDetails, queryCacheMap, setupQueryCacheSubscription, createSubscribeToQueryCacheBatcher, mutationCacheMap, setupMutationCacheSubscription, createSubscribeToMutationCacheBatcher, DEV_TOOLS_EVENT, sendDevToolsEvent, stylesFactory2, lightStyles2, darkStyles2;
var init_ZDWCUMSJ = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/chunk/ZDWCUMSJ.js"() {
    init_EIDV623S();
    isClient = !isServer2;
    isDev = isClient && !!DEV;
    noop2 = () => void 0;
    isNonNullable = (i2) => i2 != null;
    filterNonNullable = (arr) => arr.filter(isNonNullable);
    access = (v) => typeof v === "function" && !v.length ? v() : v;
    asArray = (value) => Array.isArray(value) ? value : value ? [value] : [];
    tryOnCleanup = isDev ? (fn) => getOwner() ? onCleanup(fn) : fn : onCleanup;
    createLocalStorage = createStorage;
    addClearMethod = (storage) => {
      if (typeof storage.clear === "function") {
        return storage;
      }
      storage.clear = () => {
        let key;
        while (key = storage.key(0)) {
          storage.removeItem(key);
        }
      };
      return storage;
    };
    serializeCookieOptions = (options) => {
      if (!options) {
        return "";
      }
      let memo2 = "";
      for (const key in options) {
        if (!options.hasOwnProperty(key)) {
          continue;
        }
        const value = options[key];
        memo2 += value instanceof Date ? `; ${key}=${value.toUTCString()}` : typeof value === "boolean" ? `; ${key}` : `; ${key}=${value}`;
      }
      return memo2;
    };
    cookieStorage = addClearMethod({
      _cookies: [globalThis.document, "cookie"],
      getItem: (key) => cookieStorage._cookies[0][cookieStorage._cookies[1]].match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")?.pop() ?? null,
      setItem: (key, value, options) => {
        const oldValue = cookieStorage.getItem(key);
        cookieStorage._cookies[0][cookieStorage._cookies[1]] = `${key}=${value}${serializeCookieOptions(
          options
        )}`;
        const storageEvent = Object.assign(new Event("storage"), {
          key,
          oldValue,
          newValue: value,
          url: globalThis.document.URL,
          storageArea: cookieStorage
        });
        window.dispatchEvent(storageEvent);
      },
      removeItem: (key) => {
        cookieStorage._cookies[0][cookieStorage._cookies[1]] = `${key}=deleted${serializeCookieOptions({
          expires: /* @__PURE__ */ new Date(0)
        })}`;
      },
      key: (index) => {
        let key = null;
        let count = 0;
        cookieStorage._cookies[0][cookieStorage._cookies[1]].replace(
          /(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,
          (_, found) => {
            if (!key && found && count++ === index) {
              key = found;
            }
            return "";
          }
        );
        return key;
      },
      get length() {
        let length = 0;
        cookieStorage._cookies[0][cookieStorage._cookies[1]].replace(
          /(?:^|;)\s*.+?\s*=\s*[^;]+/g,
          (found) => {
            length += found ? 1 : 0;
            return "";
          }
        );
        return length;
      }
    });
    firstBreakpoint = 1024;
    secondBreakpoint = 796;
    thirdBreakpoint = 700;
    BUTTON_POSITION = "bottom-right";
    POSITION = "bottom";
    THEME_PREFERENCE = "system";
    INITIAL_IS_OPEN = false;
    DEFAULT_HEIGHT = 500;
    PIP_DEFAULT_HEIGHT = 500;
    DEFAULT_WIDTH = 500;
    DEFAULT_SORT_FN_NAME = Object.keys(sortFns)[0];
    DEFAULT_SORT_ORDER = 1;
    DEFAULT_MUTATION_SORT_FN_NAME = Object.keys(mutationSortFns)[0];
    QueryDevtoolsContext = createContext4({
      client: void 0,
      onlineManager: void 0,
      queryFlavor: "",
      version: "",
      shadowDOMTarget: void 0
    });
    PiPContext = createContext4(void 0);
    PiPProvider = (props) => {
      const [pipWindow, setPipWindow] = createSignal(null);
      const closePipWindow = () => {
        const w = pipWindow();
        if (w != null) {
          w.close();
          setPipWindow(null);
        }
      };
      const requestPipWindow = (width, height) => {
        if (pipWindow() != null) {
          return;
        }
        const pip = window.open("", "TSQD-Devtools-Panel", `width=${width},height=${height},popup`);
        if (!pip) {
          throw new Error("Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.");
        }
        pip.document.head.innerHTML = "";
        pip.document.body.innerHTML = "";
        clearDelegatedEvents(pip.document);
        pip.document.title = "TanStack Query Devtools";
        pip.document.body.style.margin = "0";
        pip.addEventListener("pagehide", () => {
          props.setLocalStore("pip_open", "false");
          setPipWindow(null);
        });
        [...(useQueryDevtoolsContext().shadowDOMTarget || document).styleSheets].forEach((styleSheet) => {
          try {
            const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
            const style2 = document.createElement("style");
            const style_node = styleSheet.ownerNode;
            let style_id = "";
            if (style_node && "id" in style_node) {
              style_id = style_node.id;
            }
            if (style_id) {
              style2.setAttribute("id", style_id);
            }
            style2.textContent = cssRules;
            pip.document.head.appendChild(style2);
          } catch (e2) {
            const link = document.createElement("link");
            if (styleSheet.href == null) {
              return;
            }
            link.rel = "stylesheet";
            link.type = styleSheet.type;
            link.media = styleSheet.media.toString();
            link.href = styleSheet.href;
            pip.document.head.appendChild(link);
          }
        });
        delegateEvents(["focusin", "focusout", "pointermove", "keydown", "pointerdown", "pointerup", "click", "mousedown", "input"], pip.document);
        props.setLocalStore("pip_open", "true");
        setPipWindow(pip);
      };
      createEffect(() => {
        const pip_open = props.localStore.pip_open ?? "false";
        if (pip_open === "true" && !props.disabled) {
          requestPipWindow(Number(window.innerWidth), Number(props.localStore.height || PIP_DEFAULT_HEIGHT));
        }
      });
      createEffect(() => {
        const gooberStyles = (useQueryDevtoolsContext().shadowDOMTarget || document).querySelector("#_goober");
        const w = pipWindow();
        if (gooberStyles && w) {
          const observer = new MutationObserver(() => {
            const pip_style = (useQueryDevtoolsContext().shadowDOMTarget || w.document).querySelector("#_goober");
            if (pip_style) {
              pip_style.textContent = gooberStyles.textContent;
            }
          });
          observer.observe(gooberStyles, {
            childList: true,
            // observe direct children
            subtree: true,
            // and lower descendants too
            characterDataOldValue: true
            // pass old data to callback
          });
          onCleanup(() => {
            observer.disconnect();
          });
        }
      });
      const value = createMemo(() => ({
        pipWindow: pipWindow(),
        requestPipWindow,
        closePipWindow,
        disabled: props.disabled ?? false
      }));
      return createComponent(PiPContext.Provider, {
        value,
        get children() {
          return props.children;
        }
      });
    };
    usePiPWindow = () => {
      const context = createMemo(() => {
        const ctx = useContext4(PiPContext);
        if (!ctx) {
          throw new Error("usePiPWindow must be used within a PiPProvider");
        }
        return ctx();
      });
      return context;
    };
    ThemeContext = createContext4(
      () => "dark"
    );
    characterMap = {
      \u00C0: "A",
      \u00C1: "A",
      \u00C2: "A",
      \u00C3: "A",
      \u00C4: "A",
      \u00C5: "A",
      \u1EA4: "A",
      \u1EAE: "A",
      \u1EB2: "A",
      \u1EB4: "A",
      \u1EB6: "A",
      \u00C6: "AE",
      \u1EA6: "A",
      \u1EB0: "A",
      \u0202: "A",
      \u00C7: "C",
      \u1E08: "C",
      \u00C8: "E",
      \u00C9: "E",
      \u00CA: "E",
      \u00CB: "E",
      \u1EBE: "E",
      \u1E16: "E",
      \u1EC0: "E",
      \u1E14: "E",
      \u1E1C: "E",
      \u0206: "E",
      \u00CC: "I",
      \u00CD: "I",
      \u00CE: "I",
      \u00CF: "I",
      \u1E2E: "I",
      \u020A: "I",
      \u00D0: "D",
      \u00D1: "N",
      \u00D2: "O",
      \u00D3: "O",
      \u00D4: "O",
      \u00D5: "O",
      \u00D6: "O",
      \u00D8: "O",
      \u1ED0: "O",
      \u1E4C: "O",
      \u1E52: "O",
      \u020E: "O",
      \u00D9: "U",
      \u00DA: "U",
      \u00DB: "U",
      \u00DC: "U",
      \u00DD: "Y",
      \u00E0: "a",
      \u00E1: "a",
      \u00E2: "a",
      \u00E3: "a",
      \u00E4: "a",
      \u00E5: "a",
      \u1EA5: "a",
      \u1EAF: "a",
      \u1EB3: "a",
      \u1EB5: "a",
      \u1EB7: "a",
      \u00E6: "ae",
      \u1EA7: "a",
      \u1EB1: "a",
      \u0203: "a",
      \u00E7: "c",
      \u1E09: "c",
      \u00E8: "e",
      \u00E9: "e",
      \u00EA: "e",
      \u00EB: "e",
      \u1EBF: "e",
      \u1E17: "e",
      \u1EC1: "e",
      \u1E15: "e",
      \u1E1D: "e",
      \u0207: "e",
      \u00EC: "i",
      \u00ED: "i",
      \u00EE: "i",
      \u00EF: "i",
      \u1E2F: "i",
      \u020B: "i",
      \u00F0: "d",
      \u00F1: "n",
      \u00F2: "o",
      \u00F3: "o",
      \u00F4: "o",
      \u00F5: "o",
      \u00F6: "o",
      \u00F8: "o",
      \u1ED1: "o",
      \u1E4D: "o",
      \u1E53: "o",
      \u020F: "o",
      \u00F9: "u",
      \u00FA: "u",
      \u00FB: "u",
      \u00FC: "u",
      \u00FD: "y",
      \u00FF: "y",
      \u0100: "A",
      \u0101: "a",
      \u0102: "A",
      \u0103: "a",
      \u0104: "A",
      \u0105: "a",
      \u0106: "C",
      \u0107: "c",
      \u0108: "C",
      \u0109: "c",
      \u010A: "C",
      \u010B: "c",
      \u010C: "C",
      \u010D: "c",
      C\u0306: "C",
      c\u0306: "c",
      \u010E: "D",
      \u010F: "d",
      \u0110: "D",
      \u0111: "d",
      \u0112: "E",
      \u0113: "e",
      \u0114: "E",
      \u0115: "e",
      \u0116: "E",
      \u0117: "e",
      \u0118: "E",
      \u0119: "e",
      \u011A: "E",
      \u011B: "e",
      \u011C: "G",
      \u01F4: "G",
      \u011D: "g",
      \u01F5: "g",
      \u011E: "G",
      \u011F: "g",
      \u0120: "G",
      \u0121: "g",
      \u0122: "G",
      \u0123: "g",
      \u0124: "H",
      \u0125: "h",
      \u0126: "H",
      \u0127: "h",
      \u1E2A: "H",
      \u1E2B: "h",
      \u0128: "I",
      \u0129: "i",
      \u012A: "I",
      \u012B: "i",
      \u012C: "I",
      \u012D: "i",
      \u012E: "I",
      \u012F: "i",
      \u0130: "I",
      \u0131: "i",
      \u0132: "IJ",
      \u0133: "ij",
      \u0134: "J",
      \u0135: "j",
      \u0136: "K",
      \u0137: "k",
      \u1E30: "K",
      \u1E31: "k",
      K\u0306: "K",
      k\u0306: "k",
      \u0139: "L",
      \u013A: "l",
      \u013B: "L",
      \u013C: "l",
      \u013D: "L",
      \u013E: "l",
      \u013F: "L",
      \u0140: "l",
      \u0141: "l",
      \u0142: "l",
      \u1E3E: "M",
      \u1E3F: "m",
      M\u0306: "M",
      m\u0306: "m",
      \u0143: "N",
      \u0144: "n",
      \u0145: "N",
      \u0146: "n",
      \u0147: "N",
      \u0148: "n",
      \u0149: "n",
      N\u0306: "N",
      n\u0306: "n",
      \u014C: "O",
      \u014D: "o",
      \u014E: "O",
      \u014F: "o",
      \u0150: "O",
      \u0151: "o",
      \u0152: "OE",
      \u0153: "oe",
      P\u0306: "P",
      p\u0306: "p",
      \u0154: "R",
      \u0155: "r",
      \u0156: "R",
      \u0157: "r",
      \u0158: "R",
      \u0159: "r",
      R\u0306: "R",
      r\u0306: "r",
      \u0212: "R",
      \u0213: "r",
      \u015A: "S",
      \u015B: "s",
      \u015C: "S",
      \u015D: "s",
      \u015E: "S",
      \u0218: "S",
      \u0219: "s",
      \u015F: "s",
      \u0160: "S",
      \u0161: "s",
      \u0162: "T",
      \u0163: "t",
      \u021B: "t",
      \u021A: "T",
      \u0164: "T",
      \u0165: "t",
      \u0166: "T",
      \u0167: "t",
      T\u0306: "T",
      t\u0306: "t",
      \u0168: "U",
      \u0169: "u",
      \u016A: "U",
      \u016B: "u",
      \u016C: "U",
      \u016D: "u",
      \u016E: "U",
      \u016F: "u",
      \u0170: "U",
      \u0171: "u",
      \u0172: "U",
      \u0173: "u",
      \u0216: "U",
      \u0217: "u",
      V\u0306: "V",
      v\u0306: "v",
      \u0174: "W",
      \u0175: "w",
      \u1E82: "W",
      \u1E83: "w",
      X\u0306: "X",
      x\u0306: "x",
      \u0176: "Y",
      \u0177: "y",
      \u0178: "Y",
      Y\u0306: "Y",
      y\u0306: "y",
      \u0179: "Z",
      \u017A: "z",
      \u017B: "Z",
      \u017C: "z",
      \u017D: "Z",
      \u017E: "z",
      \u017F: "s",
      \u0192: "f",
      \u01A0: "O",
      \u01A1: "o",
      \u01AF: "U",
      \u01B0: "u",
      \u01CD: "A",
      \u01CE: "a",
      \u01CF: "I",
      \u01D0: "i",
      \u01D1: "O",
      \u01D2: "o",
      \u01D3: "U",
      \u01D4: "u",
      \u01D5: "U",
      \u01D6: "u",
      \u01D7: "U",
      \u01D8: "u",
      \u01D9: "U",
      \u01DA: "u",
      \u01DB: "U",
      \u01DC: "u",
      \u1EE8: "U",
      \u1EE9: "u",
      \u1E78: "U",
      \u1E79: "u",
      \u01FA: "A",
      \u01FB: "a",
      \u01FC: "AE",
      \u01FD: "ae",
      \u01FE: "O",
      \u01FF: "o",
      \u00DE: "TH",
      \u00FE: "th",
      \u1E54: "P",
      \u1E55: "p",
      \u1E64: "S",
      \u1E65: "s",
      X\u0301: "X",
      x\u0301: "x",
      \u0403: "\u0413",
      \u0453: "\u0433",
      \u040C: "\u041A",
      \u045C: "\u043A",
      A\u030B: "A",
      a\u030B: "a",
      E\u030B: "E",
      e\u030B: "e",
      I\u030B: "I",
      i\u030B: "i",
      \u01F8: "N",
      \u01F9: "n",
      \u1ED2: "O",
      \u1ED3: "o",
      \u1E50: "O",
      \u1E51: "o",
      \u1EEA: "U",
      \u1EEB: "u",
      \u1E80: "W",
      \u1E81: "w",
      \u1EF2: "Y",
      \u1EF3: "y",
      \u0200: "A",
      \u0201: "a",
      \u0204: "E",
      \u0205: "e",
      \u0208: "I",
      \u0209: "i",
      \u020C: "O",
      \u020D: "o",
      \u0210: "R",
      \u0211: "r",
      \u0214: "U",
      \u0215: "u",
      B\u030C: "B",
      b\u030C: "b",
      \u010C\u0323: "C",
      \u010D\u0323: "c",
      \u00CA\u030C: "E",
      \u00EA\u030C: "e",
      F\u030C: "F",
      f\u030C: "f",
      \u01E6: "G",
      \u01E7: "g",
      \u021E: "H",
      \u021F: "h",
      J\u030C: "J",
      \u01F0: "j",
      \u01E8: "K",
      \u01E9: "k",
      M\u030C: "M",
      m\u030C: "m",
      P\u030C: "P",
      p\u030C: "p",
      Q\u030C: "Q",
      q\u030C: "q",
      \u0158\u0329: "R",
      \u0159\u0329: "r",
      \u1E66: "S",
      \u1E67: "s",
      V\u030C: "V",
      v\u030C: "v",
      W\u030C: "W",
      w\u030C: "w",
      X\u030C: "X",
      x\u030C: "x",
      Y\u030C: "Y",
      y\u030C: "y",
      A\u0327: "A",
      a\u0327: "a",
      B\u0327: "B",
      b\u0327: "b",
      \u1E10: "D",
      \u1E11: "d",
      \u0228: "E",
      \u0229: "e",
      \u0190\u0327: "E",
      \u025B\u0327: "e",
      \u1E28: "H",
      \u1E29: "h",
      I\u0327: "I",
      i\u0327: "i",
      \u0197\u0327: "I",
      \u0268\u0327: "i",
      M\u0327: "M",
      m\u0327: "m",
      O\u0327: "O",
      o\u0327: "o",
      Q\u0327: "Q",
      q\u0327: "q",
      U\u0327: "U",
      u\u0327: "u",
      X\u0327: "X",
      x\u0327: "x",
      Z\u0327: "Z",
      z\u0327: "z"
    };
    chars = Object.keys(characterMap).join("|");
    allAccents = new RegExp(chars, "g");
    rankings = {
      CASE_SENSITIVE_EQUAL: 7,
      EQUAL: 6,
      STARTS_WITH: 5,
      WORD_STARTS_WITH: 4,
      CONTAINS: 3,
      ACRONYM: 2,
      MATCHES: 1,
      NO_MATCH: 0
    };
    defaultKeyAttributes = {
      maxRanking: Infinity,
      minRanking: -Infinity
    };
    e = { data: "" };
    t = (t2) => "object" == typeof window ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e;
    l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
    a = /\/\*[^]*?\*\/|  +/g;
    n = /\n+/g;
    o = (e2, t2) => {
      let r2 = "", l2 = "", a2 = "";
      for (let n2 in e2) {
        let c2 = e2[n2];
        "@" == n2[0] ? "i" == n2[1] ? r2 = n2 + " " + c2 + ";" : l2 += "f" == n2[1] ? o(c2, n2) : n2 + "{" + o(c2, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c2 ? l2 += o(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c2 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c2) : n2 + ":" + c2 + ";");
      }
      return r2 + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
    };
    c = {};
    s = (e2) => {
      if ("object" == typeof e2) {
        let t2 = "";
        for (let r2 in e2) t2 += r2 + s(e2[r2]);
        return t2;
      }
      return e2;
    };
    i = (e2, t2, r2, i2, p2) => {
      let u2 = s(e2), d = c[u2] || (c[u2] = ((e3) => {
        let t3 = 0, r3 = 11;
        for (; t3 < e3.length; ) r3 = 101 * r3 + e3.charCodeAt(t3++) >>> 0;
        return "go" + r3;
      })(u2));
      if (!c[d]) {
        let t3 = u2 !== e2 ? e2 : ((e3) => {
          let t4, r3, o2 = [{}];
          for (; t4 = l.exec(e3.replace(a, "")); ) t4[4] ? o2.shift() : t4[3] ? (r3 = t4[3].replace(n, " ").trim(), o2.unshift(o2[0][r3] = o2[0][r3] || {})) : o2[0][t4[1]] = t4[2].replace(n, " ").trim();
          return o2[0];
        })(e2);
        c[d] = o(p2 ? { ["@keyframes " + d]: t3 } : t3, r2 ? "" : "." + d);
      }
      let f = r2 && c.g ? c.g : null;
      return r2 && (c.g = c[d]), ((e3, t3, r3, l2) => {
        l2 ? t3.data = t3.data.replace(l2, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r3 ? e3 + t3.data : t3.data + e3);
      })(c[d], t2, i2, f), d;
    };
    p = (e2, t2, r2) => e2.reduce((e3, l2, a2) => {
      let n2 = t2[a2];
      if (n2 && n2.call) {
        let e4 = n2(r2), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
        n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o(e4, "") : false === e4 ? "" : e4;
      }
      return e3 + l2 + (null == n2 ? "" : n2);
    }, "");
    u.bind({ g: 1 });
    u.bind({ k: 1 });
    defaultElementPredicate = isServer2 ? (item) => item != null && typeof item === "object" && "t" in item : (item) => item instanceof Element;
    TransitionGroup = (props) => {
      const classnames = createClassnames(props);
      return createListTransition(resolveElements(() => props.children).toArray, {
        appear: props.appear,
        onChange({ added, removed, finishRemoved, list }) {
          const classes = classnames();
          for (const el of added) {
            enterTransition(classes, props, el);
          }
          const toMove = [];
          for (const el of list) {
            if (el.isConnected && (el instanceof HTMLElement || el instanceof SVGElement)) {
              toMove.push({ el, rect: el.getBoundingClientRect() });
            }
          }
          queueMicrotask(() => {
            const moved = [];
            for (const { el, rect } of toMove) {
              if (el.isConnected) {
                const newRect = el.getBoundingClientRect(), dX = rect.left - newRect.left, dY = rect.top - newRect.top;
                if (dX || dY) {
                  el.style.transform = `translate(${dX}px, ${dY}px)`;
                  el.style.transitionDuration = "0s";
                  moved.push(el);
                }
              }
            }
            document.body.offsetHeight;
            for (const el of moved) {
              let endTransition2 = function(e2) {
                if (e2.target === el || /transform$/.test(e2.propertyName)) {
                  el.removeEventListener("transitionend", endTransition2);
                  el.classList.remove(...classes.move);
                }
              };
              el.classList.add(...classes.move);
              el.style.transform = el.style.transitionDuration = "";
              el.addEventListener("transitionend", endTransition2);
            }
          });
          for (const el of removed) {
            exitTransition(classes, props, el, () => finishRemoved([el]));
          }
        }
      });
    };
    FALLBACK2 = /* @__PURE__ */ Symbol("fallback");
    extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
    EventKey = /* @__PURE__ */ ((EventKey2) => {
      EventKey2["Escape"] = "Escape";
      EventKey2["Enter"] = "Enter";
      EventKey2["Tab"] = "Tab";
      EventKey2["Space"] = " ";
      EventKey2["ArrowDown"] = "ArrowDown";
      EventKey2["ArrowLeft"] = "ArrowLeft";
      EventKey2["ArrowRight"] = "ArrowRight";
      EventKey2["ArrowUp"] = "ArrowUp";
      EventKey2["End"] = "End";
      EventKey2["Home"] = "Home";
      EventKey2["PageDown"] = "PageDown";
      EventKey2["PageUp"] = "PageUp";
      return EventKey2;
    })(EventKey || {});
    supportsPreventScrollCached = null;
    focusableElements = [
      "input:not([type='hidden']):not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      "area[href]",
      "[tabindex]",
      "iframe",
      "object",
      "embed",
      "audio[controls]",
      "video[controls]",
      "[contenteditable]:not([contenteditable='false'])"
    ];
    tabbableElements = [...focusableElements, '[tabindex]:not([tabindex="-1"]):not([disabled])'];
    FOCUSABLE_ELEMENT_SELECTOR = focusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
    TABBABLE_ELEMENT_SELECTOR = tabbableElements.join(
      ':not([hidden]):not([tabindex="-1"]),'
    );
    transitionsByElement = /* @__PURE__ */ new Map();
    transitionCallbacks = /* @__PURE__ */ new Set();
    if (typeof document !== "undefined") {
      if (document.readyState !== "loading") {
        setupGlobalEvents();
      } else {
        document.addEventListener("DOMContentLoaded", setupGlobalEvents);
      }
    }
    visuallyHiddenStyles = {
      border: "0",
      clip: "rect(0 0 0 0)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "0 -1px -1px 0",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      width: "1px",
      "white-space": "nowrap"
    };
    FORM_CONTROL_PROP_NAMES = ["id", "name", "validationState", "required", "disabled", "readOnly"];
    FormControlContext = createContext4();
    __defProp2 = Object.defineProperty;
    __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    DomCollectionContext = createContext4();
    RTL_SCRIPTS = /* @__PURE__ */ new Set([
      "Avst",
      "Arab",
      "Armi",
      "Syrc",
      "Samr",
      "Mand",
      "Thaa",
      "Mend",
      "Nkoo",
      "Adlm",
      "Rohg",
      "Hebr"
    ]);
    RTL_LANGS = /* @__PURE__ */ new Set([
      "ae",
      "ar",
      "arc",
      "bcc",
      "bqi",
      "ckb",
      "dv",
      "fa",
      "glk",
      "he",
      "ku",
      "mzn",
      "nqo",
      "pnb",
      "ps",
      "sd",
      "ug",
      "ur",
      "yi"
    ]);
    currentLocale = getDefaultLocale();
    listeners = /* @__PURE__ */ new Set();
    I18nContext = createContext4();
    cache = /* @__PURE__ */ new Map();
    Selection = class _Selection extends Set {
      anchorKey;
      currentKey;
      constructor(keys2, anchorKey, currentKey) {
        super(keys2);
        if (keys2 instanceof _Selection) {
          this.anchorKey = anchorKey || keys2.anchorKey;
          this.currentKey = currentKey || keys2.currentKey;
        } else {
          this.anchorKey = anchorKey;
          this.currentKey = currentKey;
        }
      }
    };
    SelectionManager = class {
      collection;
      state;
      constructor(collection, state) {
        this.collection = collection;
        this.state = state;
      }
      /** The type of selection that is allowed in the collection. */
      selectionMode() {
        return this.state.selectionMode();
      }
      /** Whether the collection allows empty selection. */
      disallowEmptySelection() {
        return this.state.disallowEmptySelection();
      }
      /** The selection behavior for the collection. */
      selectionBehavior() {
        return this.state.selectionBehavior();
      }
      /** Sets the selection behavior for the collection. */
      setSelectionBehavior(selectionBehavior) {
        this.state.setSelectionBehavior(selectionBehavior);
      }
      /** Whether the collection is currently focused. */
      isFocused() {
        return this.state.isFocused();
      }
      /** Sets whether the collection is focused. */
      setFocused(isFocused) {
        this.state.setFocused(isFocused);
      }
      /** The current focused key in the collection. */
      focusedKey() {
        return this.state.focusedKey();
      }
      /** Sets the focused key. */
      setFocusedKey(key) {
        if (key == null || this.collection().getItem(key)) {
          this.state.setFocusedKey(key);
        }
      }
      /** The currently selected keys in the collection. */
      selectedKeys() {
        return this.state.selectedKeys();
      }
      /** Returns whether a key is selected. */
      isSelected(key) {
        if (this.state.selectionMode() === "none") {
          return false;
        }
        const retrievedKey = this.getKey(key);
        if (retrievedKey == null) {
          return false;
        }
        return this.state.selectedKeys().has(retrievedKey);
      }
      /** Whether the selection is empty. */
      isEmpty() {
        return this.state.selectedKeys().size === 0;
      }
      /** Whether all items in the collection are selected. */
      isSelectAll() {
        if (this.isEmpty()) {
          return false;
        }
        const selectedKeys = this.state.selectedKeys();
        return this.getAllSelectableKeys().every((k) => selectedKeys.has(k));
      }
      firstSelectedKey() {
        let first;
        for (const key of this.state.selectedKeys()) {
          const item = this.collection().getItem(key);
          const isItemBeforeFirst = item?.index != null && first?.index != null && item.index < first.index;
          if (!first || isItemBeforeFirst) {
            first = item;
          }
        }
        return first?.key;
      }
      lastSelectedKey() {
        let last;
        for (const key of this.state.selectedKeys()) {
          const item = this.collection().getItem(key);
          const isItemAfterLast = item?.index != null && last?.index != null && item.index > last.index;
          if (!last || isItemAfterLast) {
            last = item;
          }
        }
        return last?.key;
      }
      /** Extends the selection to the given key. */
      extendSelection(toKey) {
        if (this.selectionMode() === "none") {
          return;
        }
        if (this.selectionMode() === "single") {
          this.replaceSelection(toKey);
          return;
        }
        const retrievedToKey = this.getKey(toKey);
        if (retrievedToKey == null) {
          return;
        }
        const selectedKeys = this.state.selectedKeys();
        const anchorKey = selectedKeys.anchorKey || retrievedToKey;
        const selection = new Selection(selectedKeys, anchorKey, retrievedToKey);
        for (const key of this.getKeyRange(
          anchorKey,
          selectedKeys.currentKey || retrievedToKey
        )) {
          selection.delete(key);
        }
        for (const key of this.getKeyRange(retrievedToKey, anchorKey)) {
          if (this.canSelectItem(key)) {
            selection.add(key);
          }
        }
        this.state.setSelectedKeys(selection);
      }
      getKeyRange(from, to) {
        const fromItem = this.collection().getItem(from);
        const toItem = this.collection().getItem(to);
        if (fromItem && toItem) {
          if (fromItem.index != null && toItem.index != null && fromItem.index <= toItem.index) {
            return this.getKeyRangeInternal(from, to);
          }
          return this.getKeyRangeInternal(to, from);
        }
        return [];
      }
      getKeyRangeInternal(from, to) {
        const keys2 = [];
        let key = from;
        while (key != null) {
          const item = this.collection().getItem(key);
          if (item && item.type === "item") {
            keys2.push(key);
          }
          if (key === to) {
            return keys2;
          }
          key = this.collection().getKeyAfter(key);
        }
        return [];
      }
      getKey(key) {
        const item = this.collection().getItem(key);
        if (!item) {
          return key;
        }
        if (!item || item.type !== "item") {
          return null;
        }
        return item.key;
      }
      /** Toggles whether the given key is selected. */
      toggleSelection(key) {
        if (this.selectionMode() === "none") {
          return;
        }
        if (this.selectionMode() === "single" && !this.isSelected(key)) {
          this.replaceSelection(key);
          return;
        }
        const retrievedKey = this.getKey(key);
        if (retrievedKey == null) {
          return;
        }
        const keys2 = new Selection(this.state.selectedKeys());
        if (keys2.has(retrievedKey)) {
          keys2.delete(retrievedKey);
        } else if (this.canSelectItem(retrievedKey)) {
          keys2.add(retrievedKey);
          keys2.anchorKey = retrievedKey;
          keys2.currentKey = retrievedKey;
        }
        if (this.disallowEmptySelection() && keys2.size === 0) {
          return;
        }
        this.state.setSelectedKeys(keys2);
      }
      /** Replaces the selection with only the given key. */
      replaceSelection(key) {
        if (this.selectionMode() === "none") {
          return;
        }
        const retrievedKey = this.getKey(key);
        if (retrievedKey == null) {
          return;
        }
        const selection = this.canSelectItem(retrievedKey) ? new Selection([retrievedKey], retrievedKey, retrievedKey) : new Selection();
        this.state.setSelectedKeys(selection);
      }
      /** Replaces the selection with the given keys. */
      setSelectedKeys(keys2) {
        if (this.selectionMode() === "none") {
          return;
        }
        const selection = new Selection();
        for (const key of keys2) {
          const retrievedKey = this.getKey(key);
          if (retrievedKey != null) {
            selection.add(retrievedKey);
            if (this.selectionMode() === "single") {
              break;
            }
          }
        }
        this.state.setSelectedKeys(selection);
      }
      /** Selects all items in the collection. */
      selectAll() {
        if (this.selectionMode() === "multiple") {
          this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()));
        }
      }
      /**
       * Removes all keys from the selection.
       */
      clearSelection() {
        const selectedKeys = this.state.selectedKeys();
        if (!this.disallowEmptySelection() && selectedKeys.size > 0) {
          this.state.setSelectedKeys(new Selection());
        }
      }
      /**
       * Toggles between select all and an empty selection.
       */
      toggleSelectAll() {
        if (this.isSelectAll()) {
          this.clearSelection();
        } else {
          this.selectAll();
        }
      }
      select(key, e2) {
        if (this.selectionMode() === "none") {
          return;
        }
        if (this.selectionMode() === "single") {
          if (this.isSelected(key) && !this.disallowEmptySelection()) {
            this.toggleSelection(key);
          } else {
            this.replaceSelection(key);
          }
        } else if (this.selectionBehavior() === "toggle" || e2 && e2.pointerType === "touch") {
          this.toggleSelection(key);
        } else {
          this.replaceSelection(key);
        }
      }
      /** Returns whether the current selection is equal to the given selection. */
      isSelectionEqual(selection) {
        if (selection === this.state.selectedKeys()) {
          return true;
        }
        const selectedKeys = this.selectedKeys();
        if (selection.size !== selectedKeys.size) {
          return false;
        }
        for (const key of selection) {
          if (!selectedKeys.has(key)) {
            return false;
          }
        }
        for (const key of selectedKeys) {
          if (!selection.has(key)) {
            return false;
          }
        }
        return true;
      }
      canSelectItem(key) {
        if (this.state.selectionMode() === "none") {
          return false;
        }
        const item = this.collection().getItem(key);
        return item != null && !item.disabled;
      }
      isDisabled(key) {
        const item = this.collection().getItem(key);
        return !item || item.disabled;
      }
      getAllSelectableKeys() {
        const keys2 = [];
        const addKeys = (key) => {
          while (key != null) {
            if (this.canSelectItem(key)) {
              const item = this.collection().getItem(key);
              if (!item) {
                continue;
              }
              if (item.type === "item") {
                keys2.push(key);
              }
            }
            key = this.collection().getKeyAfter(key);
          }
        };
        addKeys(this.collection().getFirstKey());
        return keys2;
      }
    };
    ListCollection = class {
      keyMap = /* @__PURE__ */ new Map();
      iterable;
      firstKey;
      lastKey;
      constructor(nodes) {
        this.iterable = nodes;
        for (const node of nodes) {
          this.keyMap.set(node.key, node);
        }
        if (this.keyMap.size === 0) {
          return;
        }
        let last;
        let index = 0;
        for (const [key, node] of this.keyMap) {
          if (last) {
            last.nextKey = key;
            node.prevKey = last.key;
          } else {
            this.firstKey = key;
            node.prevKey = void 0;
          }
          if (node.type === "item") {
            node.index = index++;
          }
          last = node;
          last.nextKey = void 0;
        }
        this.lastKey = last.key;
      }
      *[Symbol.iterator]() {
        yield* this.iterable;
      }
      getSize() {
        return this.keyMap.size;
      }
      getKeys() {
        return this.keyMap.keys();
      }
      getKeyBefore(key) {
        return this.keyMap.get(key)?.prevKey;
      }
      getKeyAfter(key) {
        return this.keyMap.get(key)?.nextKey;
      }
      getFirstKey() {
        return this.firstKey;
      }
      getLastKey() {
        return this.lastKey;
      }
      getItem(key) {
        return this.keyMap.get(key);
      }
      at(idx) {
        const keys2 = [...this.getKeys()];
        return this.getItem(keys2[idx]);
      }
    };
    access2 = (v) => typeof v === "function" ? v() : v;
    createPresence = (props) => {
      const refStyles = createMemo(() => {
        const element = access2(props.element);
        if (!element) return;
        return getComputedStyle(element);
      });
      const getAnimationName = () => {
        return refStyles()?.animationName ?? "none";
      };
      const [presentState, setPresentState] = createSignal(access2(props.show) ? "present" : "hidden");
      let animationName = "none";
      createEffect((prevShow) => {
        const show = access2(props.show);
        untrack(() => {
          if (prevShow === show) return show;
          const prevAnimationName = animationName;
          const currentAnimationName = getAnimationName();
          if (show) {
            setPresentState("present");
          } else if (currentAnimationName === "none" || refStyles()?.display === "none") {
            setPresentState("hidden");
          } else {
            const isAnimating = prevAnimationName !== currentAnimationName;
            if (prevShow === true && isAnimating) {
              setPresentState("hiding");
            } else {
              setPresentState("hidden");
            }
          }
        });
        return show;
      });
      createEffect(() => {
        const element = access2(props.element);
        if (!element) return;
        const handleAnimationStart = (event) => {
          if (event.target === element) {
            animationName = getAnimationName();
          }
        };
        const handleAnimationEnd = (event) => {
          const currentAnimationName = getAnimationName();
          const isCurrentAnimation = currentAnimationName.includes(
            event.animationName
          );
          if (event.target === element && isCurrentAnimation && presentState() === "hiding") {
            setPresentState("hidden");
          }
        };
        element.addEventListener("animationstart", handleAnimationStart);
        element.addEventListener("animationcancel", handleAnimationEnd);
        element.addEventListener("animationend", handleAnimationEnd);
        onCleanup(() => {
          element.removeEventListener("animationstart", handleAnimationStart);
          element.removeEventListener("animationcancel", handleAnimationEnd);
          element.removeEventListener("animationend", handleAnimationEnd);
        });
      });
      return {
        present: () => presentState() === "present" || presentState() === "hiding",
        state: presentState
      };
    };
    presence_default = createPresence;
    src_default = presence_default;
    DATA_TOP_LAYER_ATTR = "data-kb-top-layer";
    hasDisabledBodyPointerEvents = false;
    layers = [];
    layerStack = {
      layers,
      isTopMostLayer,
      hasPointerBlockingLayer,
      isBelowPointerBlockingLayer,
      addLayer,
      removeLayer,
      indexOf,
      find: find2,
      assignPointerEventToLayers,
      disableBodyPointerEvents,
      restoreBodyPointerEvents
    };
    button_exports = {};
    __export2(button_exports, {
      Button: () => Button,
      Root: () => ButtonRoot
    });
    BUTTON_INPUT_TYPES = [
      "button",
      "color",
      "file",
      "image",
      "reset",
      "submit"
    ];
    Button = ButtonRoot;
    sides = ["top", "right", "bottom", "left"];
    min = Math.min;
    max = Math.max;
    round = Math.round;
    floor = Math.floor;
    createCoords = (v) => ({
      x: v,
      y: v
    });
    oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    oppositeAlignmentMap = {
      start: "end",
      end: "start"
    };
    computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
      } = config;
      const validMiddleware = middleware.filter(Boolean);
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
      let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
      });
      let {
        x,
        y
      } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let middlewareData = {};
      let resetCount = 0;
      for (let i2 = 0; i2 < validMiddleware.length; i2++) {
        const {
          name,
          fn
        } = validMiddleware[i2];
        const {
          x: nextX,
          y: nextY,
          data,
          reset: reset2
        } = await fn({
          x,
          y,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform: platform2,
          elements: {
            reference,
            floating
          }
        });
        x = nextX != null ? nextX : x;
        y = nextY != null ? nextY : y;
        middlewareData = {
          ...middlewareData,
          [name]: {
            ...middlewareData[name],
            ...data
          }
        };
        if (reset2 && resetCount <= 50) {
          resetCount++;
          if (typeof reset2 === "object") {
            if (reset2.placement) {
              statefulPlacement = reset2.placement;
            }
            if (reset2.rects) {
              rects = reset2.rects === true ? await platform2.getElementRects({
                reference,
                floating,
                strategy
              }) : reset2.rects;
            }
            ({
              x,
              y
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i2 = -1;
        }
      }
      return {
        x,
        y,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    };
    arrow = (options) => ({
      name: "arrow",
      options,
      async fn(state) {
        const {
          x,
          y,
          placement,
          rects,
          platform: platform2,
          elements,
          middlewareData
        } = state;
        const {
          element,
          padding = 0
        } = evaluate(options, state) || {};
        if (element == null) {
          return {};
        }
        const paddingObject = getPaddingObject(padding);
        const coords = {
          x,
          y
        };
        const axis = getAlignmentAxis(placement);
        const length = getAxisLength(axis);
        const arrowDimensions = await platform2.getDimensions(element);
        const isYAxis = axis === "y";
        const minProp = isYAxis ? "top" : "left";
        const maxProp = isYAxis ? "bottom" : "right";
        const clientProp = isYAxis ? "clientHeight" : "clientWidth";
        const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
        const startDiff = coords[axis] - rects.reference[axis];
        const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
        let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
        if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
          clientSize = elements.floating[clientProp] || rects.floating[length];
        }
        const centerToReference = endDiff / 2 - startDiff / 2;
        const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
        const minPadding = min(paddingObject[minProp], largestPossiblePadding);
        const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
        const min$1 = minPadding;
        const max2 = clientSize - arrowDimensions[length] - maxPadding;
        const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
        const offset3 = clamp2(min$1, center, max2);
        const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
        const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
        return {
          [axis]: coords[axis] + alignmentOffset,
          data: {
            [axis]: offset3,
            centerOffset: center - offset3 - alignmentOffset,
            ...shouldAddOffset && {
              alignmentOffset
            }
          },
          reset: shouldAddOffset
        };
      }
    });
    flip = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "flip",
        options,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options, state);
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const initialSideAxis = getSideAxis(initialPlacement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements2 = [initialPlacement, ...fallbackPlacements];
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides2 = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements2[nextIndex];
            if (nextPlacement) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$filter2;
                  const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement);
                      return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                      // reading directions favoring greater width.
                      currentSideAxis === "y";
                    }
                    return true;
                  }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };
    hide = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "hide",
        options,
        async fn(state) {
          const {
            rects
          } = state;
          const {
            strategy = "referenceHidden",
            ...detectOverflowOptions
          } = evaluate(options, state);
          switch (strategy) {
            case "referenceHidden": {
              const overflow = await detectOverflow(state, {
                ...detectOverflowOptions,
                elementContext: "reference"
              });
              const offsets = getSideOffsets(overflow, rects.reference);
              return {
                data: {
                  referenceHiddenOffsets: offsets,
                  referenceHidden: isAnySideFullyClipped(offsets)
                }
              };
            }
            case "escaped": {
              const overflow = await detectOverflow(state, {
                ...detectOverflowOptions,
                altBoundary: true
              });
              const offsets = getSideOffsets(overflow, rects.floating);
              return {
                data: {
                  escapedOffsets: offsets,
                  escaped: isAnySideFullyClipped(offsets)
                }
              };
            }
            default: {
              return {};
            }
          }
        }
      };
    };
    offset = function(options) {
      if (options === void 0) {
        options = 0;
      }
      return {
        name: "offset",
        options,
        async fn(state) {
          var _middlewareData$offse, _middlewareData$arrow;
          const {
            x,
            y,
            placement,
            middlewareData
          } = state;
          const diffCoords = await convertValueToCoords(state, options);
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x + diffCoords.x,
            y: y + diffCoords.y,
            data: {
              ...diffCoords,
              placement
            }
          };
        }
      };
    };
    shift = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "shift",
        options,
        async fn(state) {
          const {
            x,
            y,
            placement
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x2,
                  y: y2
                } = _ref;
                return {
                  x: x2,
                  y: y2
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const coords = {
            x,
            y
          };
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min2 = mainAxisCoord + overflow[minSide];
            const max2 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp2(min2, mainAxisCoord, max2);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min2 = crossAxisCoord + overflow[minSide];
            const max2 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp2(min2, crossAxisCoord, max2);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x,
              y: limitedCoords.y - y
            }
          };
        }
      };
    };
    size = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "size",
        options,
        async fn(state) {
          const {
            placement,
            rects,
            platform: platform2,
            elements
          } = state;
          const {
            apply = () => {
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const side = getSide(placement);
          const alignment = getAlignment(placement);
          const isYAxis = getSideAxis(placement) === "y";
          const {
            width,
            height
          } = rects.floating;
          let heightSide;
          let widthSide;
          if (side === "top" || side === "bottom") {
            heightSide = side;
            widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
          } else {
            widthSide = side;
            heightSide = alignment === "end" ? "top" : "bottom";
          }
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          const maximumClippingWidth = width - overflow.left - overflow.right;
          const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
          const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
          const noShift = !state.middlewareData.shift;
          let availableHeight = overflowAvailableHeight;
          let availableWidth = overflowAvailableWidth;
          if (isYAxis) {
            availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
          } else {
            availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
          }
          if (noShift && !alignment) {
            const xMin = max(overflow.left, 0);
            const xMax = max(overflow.right, 0);
            const yMin = max(overflow.top, 0);
            const yMax = max(overflow.bottom, 0);
            if (isYAxis) {
              availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
            } else {
              availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
            }
          }
          await apply({
            ...state,
            availableWidth,
            availableHeight
          });
          const nextDimensions = await platform2.getDimensions(elements.floating);
          if (width !== nextDimensions.width || height !== nextDimensions.height) {
            return {
              reset: {
                rects: true
              }
            };
          }
          return {};
        }
      };
    };
    noOffsets = /* @__PURE__ */ createCoords(0);
    getElementRects = async function(data) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = await getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
        }
      };
    };
    platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement,
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement,
      isRTL: isRTL2
    };
    offset2 = offset;
    shift2 = shift;
    flip2 = flip;
    size2 = size;
    hide2 = hide;
    arrow2 = arrow;
    computePosition2 = (reference, floating, options) => {
      const cache2 = /* @__PURE__ */ new Map();
      const mergedOptions = {
        platform,
        ...options
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache2
      };
      return computePosition(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
      });
    };
    PopperContext = createContext4();
    _tmpl$ = /* @__PURE__ */ template(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`);
    DEFAULT_SIZE = 30;
    HALF_DEFAULT_SIZE = DEFAULT_SIZE / 2;
    ROTATION_DEG = {
      top: 180,
      right: -90,
      bottom: 0,
      left: 90
    };
    REVERSE_BASE_PLACEMENT = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right"
    };
    Popper = Object.assign(PopperRoot, {
      Arrow: PopperArrow,
      Context: PopperContext,
      usePopperContext,
      Positioner: PopperPositioner
    });
    POINTER_DOWN_OUTSIDE_EVENT = "interactOutside.pointerDownOutside";
    FOCUS_OUTSIDE_EVENT = "interactOutside.focusOutside";
    DismissableLayerContext = createContext4();
    radio_group_exports = {};
    __export2(radio_group_exports, {
      Description: () => FormControlDescription,
      ErrorMessage: () => FormControlErrorMessage,
      Item: () => RadioGroupItem,
      ItemControl: () => RadioGroupItemControl,
      ItemDescription: () => RadioGroupItemDescription,
      ItemIndicator: () => RadioGroupItemIndicator,
      ItemInput: () => RadioGroupItemInput,
      ItemLabel: () => RadioGroupItemLabel,
      Label: () => RadioGroupLabel,
      RadioGroup: () => RadioGroup,
      Root: () => RadioGroupRoot
    });
    RadioGroupContext = createContext4();
    RadioGroupItemContext = createContext4();
    RadioGroup = Object.assign(RadioGroupRoot, {
      Description: FormControlDescription,
      ErrorMessage: FormControlErrorMessage,
      Item: RadioGroupItem,
      ItemControl: RadioGroupItemControl,
      ItemDescription: RadioGroupItemDescription,
      ItemIndicator: RadioGroupItemIndicator,
      ItemInput: RadioGroupItemInput,
      ItemLabel: RadioGroupItemLabel,
      Label: RadioGroupLabel
    });
    ListKeyboardDelegate = class {
      collection;
      ref;
      collator;
      constructor(collection, ref, collator) {
        this.collection = collection;
        this.ref = ref;
        this.collator = collator;
      }
      getKeyBelow(key) {
        let keyAfter = this.collection().getKeyAfter(key);
        while (keyAfter != null) {
          const item = this.collection().getItem(keyAfter);
          if (item && item.type === "item" && !item.disabled) {
            return keyAfter;
          }
          keyAfter = this.collection().getKeyAfter(keyAfter);
        }
      }
      getKeyAbove(key) {
        let keyBefore = this.collection().getKeyBefore(key);
        while (keyBefore != null) {
          const item = this.collection().getItem(keyBefore);
          if (item && item.type === "item" && !item.disabled) {
            return keyBefore;
          }
          keyBefore = this.collection().getKeyBefore(keyBefore);
        }
      }
      getFirstKey() {
        let key = this.collection().getFirstKey();
        while (key != null) {
          const item = this.collection().getItem(key);
          if (item && item.type === "item" && !item.disabled) {
            return key;
          }
          key = this.collection().getKeyAfter(key);
        }
      }
      getLastKey() {
        let key = this.collection().getLastKey();
        while (key != null) {
          const item = this.collection().getItem(key);
          if (item && item.type === "item" && !item.disabled) {
            return key;
          }
          key = this.collection().getKeyBefore(key);
        }
      }
      getItem(key) {
        return this.ref?.()?.querySelector(`[data-key="${key}"]`) ?? null;
      }
      // TODO: not working correctly
      getKeyPageAbove(key) {
        const menu = this.ref?.();
        let item = this.getItem(key);
        if (!menu || !item) {
          return;
        }
        const pageY = Math.max(
          0,
          item.offsetTop + item.offsetHeight - menu.offsetHeight
        );
        let keyAbove = key;
        while (keyAbove && item && item.offsetTop > pageY) {
          keyAbove = this.getKeyAbove(keyAbove);
          item = keyAbove != null ? this.getItem(keyAbove) : null;
        }
        return keyAbove;
      }
      // TODO: not working correctly
      getKeyPageBelow(key) {
        const menu = this.ref?.();
        let item = this.getItem(key);
        if (!menu || !item) {
          return;
        }
        const pageY = Math.min(
          menu.scrollHeight,
          item.offsetTop - item.offsetHeight + menu.offsetHeight
        );
        let keyBelow = key;
        while (keyBelow && item && item.offsetTop < pageY) {
          keyBelow = this.getKeyBelow(keyBelow);
          item = keyBelow != null ? this.getItem(keyBelow) : null;
        }
        return keyBelow;
      }
      getKeyForSearch(search, fromKey) {
        const collator = this.collator?.();
        if (!collator) {
          return;
        }
        let key = fromKey != null ? this.getKeyBelow(fromKey) : this.getFirstKey();
        while (key != null) {
          const item = this.collection().getItem(key);
          if (item) {
            const substring = item.textValue.slice(0, search.length);
            if (item.textValue && collator.compare(substring, search) === 0) {
              return key;
            }
          }
          key = this.getKeyBelow(key);
        }
      }
    };
    AUTOFOCUS_ON_MOUNT_EVENT = "focusScope.autoFocusOnMount";
    AUTOFOCUS_ON_UNMOUNT_EVENT = "focusScope.autoFocusOnUnmount";
    EVENT_OPTIONS = {
      bubbles: false,
      cancelable: true
    };
    focusScopeStack = {
      /** A stack of focus scopes, with the active one at the top */
      stack: [],
      active() {
        return this.stack[0];
      },
      add(scope) {
        if (scope !== this.active()) {
          this.active()?.pause();
        }
        this.stack = removeItemFromArray(this.stack, scope);
        this.stack.unshift(scope);
      },
      remove(scope) {
        this.stack = removeItemFromArray(this.stack, scope);
        this.active()?.resume();
      }
    };
    DATA_LIVE_ANNOUNCER_ATTR = "data-live-announcer";
    refCountMap = /* @__PURE__ */ new WeakMap();
    observerStack = [];
    activeStyles = /* @__PURE__ */ new Map();
    createStyle = (props) => {
      createEffect(() => {
        const style2 = access2(props.style) ?? {};
        const properties = access2(props.properties) ?? [];
        const originalStyles = {};
        for (const key in style2) {
          originalStyles[key] = props.element.style[key];
        }
        const activeStyle = activeStyles.get(props.key);
        if (activeStyle) {
          activeStyle.activeCount++;
        } else {
          activeStyles.set(props.key, {
            activeCount: 1,
            originalStyles,
            properties: properties.map((property) => property.key)
          });
        }
        Object.assign(props.element.style, props.style);
        for (const property of properties) {
          props.element.style.setProperty(property.key, property.value);
        }
        onCleanup(() => {
          const activeStyle2 = activeStyles.get(props.key);
          if (!activeStyle2) return;
          if (activeStyle2.activeCount !== 1) {
            activeStyle2.activeCount--;
            return;
          }
          activeStyles.delete(props.key);
          for (const [key, value] of Object.entries(activeStyle2.originalStyles)) {
            props.element.style[key] = value;
          }
          for (const property of activeStyle2.properties) {
            props.element.style.removeProperty(property);
          }
          if (props.element.style.length === 0) {
            props.element.removeAttribute("style");
          }
          props.cleanup?.();
        });
      });
    };
    style_default = createStyle;
    getScrollDimensions = (element, axis) => {
      switch (axis) {
        case "x":
          return [element.clientWidth, element.scrollLeft, element.scrollWidth];
        case "y":
          return [element.clientHeight, element.scrollTop, element.scrollHeight];
      }
    };
    isScrollContainer = (element, axis) => {
      const styles = getComputedStyle(element);
      const overflow = axis === "x" ? styles.overflowX : styles.overflowY;
      return overflow === "auto" || overflow === "scroll" || // The HTML element is a scroll container if it has overflow visible
      element.tagName === "HTML" && overflow === "visible";
    };
    getScrollAtLocation = (location, axis, stopAt) => {
      const directionFactor = axis === "x" && window.getComputedStyle(location).direction === "rtl" ? -1 : 1;
      let currentElement = location;
      let availableScroll = 0;
      let availableScrollTop = 0;
      let wrapperReached = false;
      do {
        const [clientSize, scrollOffset, scrollSize] = getScrollDimensions(
          currentElement,
          axis
        );
        const scrolled = scrollSize - clientSize - directionFactor * scrollOffset;
        if ((scrollOffset !== 0 || scrolled !== 0) && isScrollContainer(currentElement, axis)) {
          availableScroll += scrolled;
          availableScrollTop += scrollOffset;
        }
        if (currentElement === (stopAt ?? document.documentElement)) {
          wrapperReached = true;
        } else {
          currentElement = currentElement._$host ?? currentElement.parentElement;
        }
      } while (currentElement && !wrapperReached);
      return [availableScroll, availableScrollTop];
    };
    [preventScrollStack, setPreventScrollStack] = createSignal([]);
    isActive = (id) => preventScrollStack().indexOf(id) === preventScrollStack().length - 1;
    createPreventScroll = (props) => {
      const defaultedProps = mergeProps(
        {
          element: null,
          enabled: true,
          hideScrollbar: true,
          preventScrollbarShift: true,
          preventScrollbarShiftMode: "padding",
          restoreScrollPosition: true,
          allowPinchZoom: false
        },
        props
      );
      const preventScrollId = createUniqueId();
      let currentTouchStart = [0, 0];
      let currentTouchStartAxis = null;
      let currentTouchStartDelta = null;
      createEffect(() => {
        if (!access2(defaultedProps.enabled)) return;
        setPreventScrollStack((stack) => [...stack, preventScrollId]);
        onCleanup(() => {
          setPreventScrollStack(
            (stack) => stack.filter((id) => id !== preventScrollId)
          );
        });
      });
      createEffect(() => {
        if (!access2(defaultedProps.enabled) || !access2(defaultedProps.hideScrollbar))
          return;
        const { body } = document;
        const scrollbarWidth = window.innerWidth - body.offsetWidth;
        if (access2(defaultedProps.preventScrollbarShift)) {
          const style2 = { overflow: "hidden" };
          const properties = [];
          if (scrollbarWidth > 0) {
            if (access2(defaultedProps.preventScrollbarShiftMode) === "padding") {
              style2.paddingRight = `calc(${window.getComputedStyle(body).paddingRight} + ${scrollbarWidth}px)`;
            } else {
              style2.marginRight = `calc(${window.getComputedStyle(body).marginRight} + ${scrollbarWidth}px)`;
            }
            properties.push({
              key: "--scrollbar-width",
              value: `${scrollbarWidth}px`
            });
          }
          const offsetTop = window.scrollY;
          const offsetLeft = window.scrollX;
          style_default({
            key: "prevent-scroll",
            element: body,
            style: style2,
            properties,
            cleanup: () => {
              if (access2(defaultedProps.restoreScrollPosition) && scrollbarWidth > 0) {
                window.scrollTo(offsetLeft, offsetTop);
              }
            }
          });
        } else {
          style_default({
            key: "prevent-scroll",
            element: body,
            style: {
              overflow: "hidden"
            }
          });
        }
      });
      createEffect(() => {
        if (!isActive(preventScrollId) || !access2(defaultedProps.enabled)) return;
        document.addEventListener("wheel", maybePreventWheel, {
          passive: false
        });
        document.addEventListener("touchstart", logTouchStart, {
          passive: false
        });
        document.addEventListener("touchmove", maybePreventTouch, {
          passive: false
        });
        onCleanup(() => {
          document.removeEventListener("wheel", maybePreventWheel);
          document.removeEventListener("touchstart", logTouchStart);
          document.removeEventListener("touchmove", maybePreventTouch);
        });
      });
      const logTouchStart = (event) => {
        currentTouchStart = getTouchXY(event);
        currentTouchStartAxis = null;
        currentTouchStartDelta = null;
      };
      const maybePreventWheel = (event) => {
        const target = event.target;
        const wrapper = access2(defaultedProps.element);
        const delta = getDeltaXY(event);
        const axis = Math.abs(delta[0]) > Math.abs(delta[1]) ? "x" : "y";
        const axisDelta = axis === "x" ? delta[0] : delta[1];
        const resultsInScroll = wouldScroll(target, axis, axisDelta, wrapper);
        let shouldCancel;
        if (wrapper && contains2(wrapper, target)) {
          shouldCancel = !resultsInScroll;
        } else {
          shouldCancel = true;
        }
        if (shouldCancel && event.cancelable) {
          event.preventDefault();
        }
      };
      const maybePreventTouch = (event) => {
        const wrapper = access2(defaultedProps.element);
        const target = event.target;
        let shouldCancel;
        if (event.touches.length === 2) {
          shouldCancel = !access2(defaultedProps.allowPinchZoom);
        } else {
          if (currentTouchStartAxis == null || currentTouchStartDelta === null) {
            const delta = getTouchXY(event).map(
              (touch, i2) => currentTouchStart[i2] - touch
            );
            const axis = Math.abs(delta[0]) > Math.abs(delta[1]) ? "x" : "y";
            currentTouchStartAxis = axis;
            currentTouchStartDelta = axis === "x" ? delta[0] : delta[1];
          }
          if (target.type === "range") {
            shouldCancel = false;
          } else {
            const wouldResultInScroll = wouldScroll(
              target,
              currentTouchStartAxis,
              currentTouchStartDelta,
              wrapper
            );
            if (wrapper && contains2(wrapper, target)) {
              shouldCancel = !wouldResultInScroll;
            } else {
              shouldCancel = true;
            }
          }
        }
        if (shouldCancel && event.cancelable) {
          event.preventDefault();
        }
      };
    };
    getDeltaXY = (event) => [
      event.deltaX,
      event.deltaY
    ];
    getTouchXY = (event) => event.changedTouches[0] ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
    wouldScroll = (target, axis, delta, wrapper) => {
      const targetInWrapper = wrapper !== null && contains2(wrapper, target);
      const [availableScroll, availableScrollTop] = getScrollAtLocation(
        target,
        axis,
        targetInWrapper ? wrapper : void 0
      );
      if (delta > 0 && Math.abs(availableScroll) <= 1) {
        return false;
      }
      if (delta < 0 && Math.abs(availableScrollTop) < 1) {
        return false;
      }
      return true;
    };
    contains2 = (wrapper, target) => {
      if (wrapper.contains(target)) return true;
      let currentElement = target;
      while (currentElement) {
        if (currentElement === wrapper) return true;
        currentElement = currentElement._$host ?? currentElement.parentElement;
      }
      return false;
    };
    preventScroll_default = createPreventScroll;
    src_default2 = preventScroll_default;
    MenuContext = createContext4();
    MenuItemContext = createContext4();
    MenuRootContext = createContext4();
    MenubarContext = createContext4();
    MENUBAR_KEYS = {
      next: (dir, orientation) => dir === "ltr" ? orientation === "horizontal" ? "ArrowRight" : "ArrowDown" : orientation === "horizontal" ? "ArrowLeft" : "ArrowUp",
      previous: (dir, orientation) => MENUBAR_KEYS.next(dir === "ltr" ? "rtl" : "ltr", orientation)
    };
    MENU_KEYS = {
      first: (orientation) => orientation === "horizontal" ? "ArrowDown" : "ArrowRight",
      last: (orientation) => orientation === "horizontal" ? "ArrowUp" : "ArrowLeft"
    };
    NavigationMenuContext = createContext4();
    MenuGroupContext = createContext4();
    MenuRadioGroupContext = createContext4();
    SUB_CLOSE_KEYS = {
      close: (dir, orientation) => {
        if (dir === "ltr") {
          return [orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
        }
        return [orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
      }
    };
    SELECTION_KEYS = ["Enter", " "];
    SUB_OPEN_KEYS = {
      open: (dir, orientation) => {
        if (dir === "ltr") {
          return [...SELECTION_KEYS, orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
        }
        return [...SELECTION_KEYS, orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
      }
    };
    separator_exports = {};
    __export2(separator_exports, {
      Root: () => SeparatorRoot,
      Separator: () => Separator
    });
    Separator = SeparatorRoot;
    dropdown_menu_exports = {};
    __export2(dropdown_menu_exports, {
      Arrow: () => PopperArrow,
      CheckboxItem: () => MenuCheckboxItem,
      Content: () => DropdownMenuContent,
      DropdownMenu: () => DropdownMenu,
      Group: () => MenuGroup,
      GroupLabel: () => MenuGroupLabel,
      Icon: () => MenuIcon,
      Item: () => MenuItem,
      ItemDescription: () => MenuItemDescription,
      ItemIndicator: () => MenuItemIndicator,
      ItemLabel: () => MenuItemLabel,
      Portal: () => MenuPortal,
      RadioGroup: () => MenuRadioGroup,
      RadioItem: () => MenuRadioItem,
      Root: () => DropdownMenuRoot,
      Separator: () => SeparatorRoot,
      Sub: () => MenuSub,
      SubContent: () => MenuSubContent,
      SubTrigger: () => MenuSubTrigger,
      Trigger: () => MenuTrigger
    });
    DropdownMenu = Object.assign(DropdownMenuRoot, {
      Arrow: PopperArrow,
      CheckboxItem: MenuCheckboxItem,
      Content: DropdownMenuContent,
      Group: MenuGroup,
      GroupLabel: MenuGroupLabel,
      Icon: MenuIcon,
      Item: MenuItem,
      ItemDescription: MenuItemDescription,
      ItemIndicator: MenuItemIndicator,
      ItemLabel: MenuItemLabel,
      Portal: MenuPortal,
      RadioGroup: MenuRadioGroup,
      RadioItem: MenuRadioItem,
      Separator: SeparatorRoot,
      Sub: MenuSub,
      SubContent: MenuSubContent,
      SubTrigger: MenuSubTrigger,
      Trigger: MenuTrigger
    });
    tokens = {
      colors: {
        inherit: "inherit",
        current: "currentColor",
        transparent: "transparent",
        black: "#000000",
        white: "#ffffff",
        neutral: {
          50: "#f9fafb",
          100: "#f2f4f7",
          200: "#eaecf0",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#101828"
        },
        darkGray: {
          50: "#525c7a",
          100: "#49536e",
          200: "#414962",
          300: "#394056",
          400: "#313749",
          500: "#292e3d",
          600: "#212530",
          700: "#191c24",
          800: "#111318",
          900: "#0b0d10"
        },
        gray: {
          50: "#f9fafb",
          100: "#f2f4f7",
          200: "#eaecf0",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#101828"
        },
        blue: {
          25: "#F5FAFF",
          50: "#EFF8FF",
          100: "#D1E9FF",
          200: "#B2DDFF",
          300: "#84CAFF",
          400: "#53B1FD",
          500: "#2E90FA",
          600: "#1570EF",
          700: "#175CD3",
          800: "#1849A9",
          900: "#194185"
        },
        green: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
          800: "#05603A",
          900: "#054F31"
        },
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a"
        },
        yellow: {
          25: "#FFFCF5",
          50: "#FFFAEB",
          100: "#FEF0C7",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E"
        },
        purple: {
          25: "#FAFAFF",
          50: "#F4F3FF",
          100: "#EBE9FE",
          200: "#D9D6FE",
          300: "#BDB4FE",
          400: "#9B8AFB",
          500: "#7A5AF8",
          600: "#6938EF",
          700: "#5925DC",
          800: "#4A1FB8",
          900: "#3E1C96"
        },
        teal: {
          25: "#F6FEFC",
          50: "#F0FDF9",
          100: "#CCFBEF",
          200: "#99F6E0",
          300: "#5FE9D0",
          400: "#2ED3B7",
          500: "#15B79E",
          600: "#0E9384",
          700: "#107569",
          800: "#125D56",
          900: "#134E48"
        },
        pink: {
          25: "#fdf2f8",
          50: "#fce7f3",
          100: "#fbcfe8",
          200: "#f9a8d4",
          300: "#f472b6",
          400: "#ec4899",
          500: "#db2777",
          600: "#be185d",
          700: "#9d174d",
          800: "#831843",
          900: "#500724"
        },
        cyan: {
          25: "#ecfeff",
          50: "#cffafe",
          100: "#a5f3fc",
          200: "#67e8f9",
          300: "#22d3ee",
          400: "#06b6d4",
          500: "#0891b2",
          600: "#0e7490",
          700: "#155e75",
          800: "#164e63",
          900: "#083344"
        }
      },
      alpha: {
        100: "ff",
        90: "e5",
        80: "cc",
        70: "b3",
        60: "99",
        50: "80",
        40: "66",
        30: "4d",
        20: "33",
        10: "1a",
        0: "00"
      },
      font: {
        size: {
          "2xs": "calc(var(--tsqd-font-size) * 0.625)",
          xs: "calc(var(--tsqd-font-size) * 0.75)",
          sm: "calc(var(--tsqd-font-size) * 0.875)",
          md: "var(--tsqd-font-size)",
          lg: "calc(var(--tsqd-font-size) * 1.125)",
          xl: "calc(var(--tsqd-font-size) * 1.25)",
          "2xl": "calc(var(--tsqd-font-size) * 1.5)",
          "3xl": "calc(var(--tsqd-font-size) * 1.875)",
          "4xl": "calc(var(--tsqd-font-size) * 2.25)",
          "5xl": "calc(var(--tsqd-font-size) * 3)",
          "6xl": "calc(var(--tsqd-font-size) * 3.75)",
          "7xl": "calc(var(--tsqd-font-size) * 4.5)",
          "8xl": "calc(var(--tsqd-font-size) * 6)",
          "9xl": "calc(var(--tsqd-font-size) * 8)"
        },
        lineHeight: {
          xs: "calc(var(--tsqd-font-size) * 1)",
          sm: "calc(var(--tsqd-font-size) * 1.25)",
          md: "calc(var(--tsqd-font-size) * 1.5)",
          lg: "calc(var(--tsqd-font-size) * 1.75)",
          xl: "calc(var(--tsqd-font-size) * 2)",
          "2xl": "calc(var(--tsqd-font-size) * 2.25)",
          "3xl": "calc(var(--tsqd-font-size) * 2.5)",
          "4xl": "calc(var(--tsqd-font-size) * 2.75)",
          "5xl": "calc(var(--tsqd-font-size) * 3)",
          "6xl": "calc(var(--tsqd-font-size) * 3.25)",
          "7xl": "calc(var(--tsqd-font-size) * 3.5)",
          "8xl": "calc(var(--tsqd-font-size) * 3.75)",
          "9xl": "calc(var(--tsqd-font-size) * 4)"
        },
        weight: {
          thin: "100",
          extralight: "200",
          light: "300",
          normal: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
          extrabold: "800",
          black: "900"
        }
      },
      breakpoints: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      },
      border: {
        radius: {
          none: "0px",
          xs: "calc(var(--tsqd-font-size) * 0.125)",
          sm: "calc(var(--tsqd-font-size) * 0.25)",
          md: "calc(var(--tsqd-font-size) * 0.375)",
          lg: "calc(var(--tsqd-font-size) * 0.5)",
          xl: "calc(var(--tsqd-font-size) * 0.75)",
          "2xl": "calc(var(--tsqd-font-size) * 1)",
          "3xl": "calc(var(--tsqd-font-size) * 1.5)",
          full: "9999px"
        }
      },
      size: {
        0: "0px",
        0.25: "calc(var(--tsqd-font-size) * 0.0625)",
        0.5: "calc(var(--tsqd-font-size) * 0.125)",
        1: "calc(var(--tsqd-font-size) * 0.25)",
        1.5: "calc(var(--tsqd-font-size) * 0.375)",
        2: "calc(var(--tsqd-font-size) * 0.5)",
        2.5: "calc(var(--tsqd-font-size) * 0.625)",
        3: "calc(var(--tsqd-font-size) * 0.75)",
        3.5: "calc(var(--tsqd-font-size) * 0.875)",
        4: "calc(var(--tsqd-font-size) * 1)",
        4.5: "calc(var(--tsqd-font-size) * 1.125)",
        5: "calc(var(--tsqd-font-size) * 1.25)",
        5.5: "calc(var(--tsqd-font-size) * 1.375)",
        6: "calc(var(--tsqd-font-size) * 1.5)",
        6.5: "calc(var(--tsqd-font-size) * 1.625)",
        7: "calc(var(--tsqd-font-size) * 1.75)",
        8: "calc(var(--tsqd-font-size) * 2)",
        9: "calc(var(--tsqd-font-size) * 2.25)",
        10: "calc(var(--tsqd-font-size) * 2.5)",
        11: "calc(var(--tsqd-font-size) * 2.75)",
        12: "calc(var(--tsqd-font-size) * 3)",
        14: "calc(var(--tsqd-font-size) * 3.5)",
        16: "calc(var(--tsqd-font-size) * 4)",
        20: "calc(var(--tsqd-font-size) * 5)",
        24: "calc(var(--tsqd-font-size) * 6)",
        28: "calc(var(--tsqd-font-size) * 7)",
        32: "calc(var(--tsqd-font-size) * 8)",
        36: "calc(var(--tsqd-font-size) * 9)",
        40: "calc(var(--tsqd-font-size) * 10)",
        44: "calc(var(--tsqd-font-size) * 11)",
        48: "calc(var(--tsqd-font-size) * 12)",
        52: "calc(var(--tsqd-font-size) * 13)",
        56: "calc(var(--tsqd-font-size) * 14)",
        60: "calc(var(--tsqd-font-size) * 15)",
        64: "calc(var(--tsqd-font-size) * 16)",
        72: "calc(var(--tsqd-font-size) * 18)",
        80: "calc(var(--tsqd-font-size) * 20)",
        96: "calc(var(--tsqd-font-size) * 24)"
      },
      shadow: {
        xs: (_ = "rgb(0 0 0 / 0.1)") => `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
        sm: (color = "rgb(0 0 0 / 0.1)") => `0 1px 3px 0 ${color}, 0 1px 2px -1px ${color}`,
        md: (color = "rgb(0 0 0 / 0.1)") => `0 4px 6px -1px ${color}, 0 2px 4px -2px ${color}`,
        lg: (color = "rgb(0 0 0 / 0.1)") => `0 10px 15px -3px ${color}, 0 4px 6px -4px ${color}`,
        xl: (color = "rgb(0 0 0 / 0.1)") => `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`,
        "2xl": (color = "rgb(0 0 0 / 0.25)") => `0 25px 50px -12px ${color}`,
        inner: (color = "rgb(0 0 0 / 0.05)") => `inset 0 2px 4px 0 ${color}`,
        none: () => `none`
      },
      zIndices: {
        hide: -1,
        auto: "auto",
        base: 0,
        docked: 10,
        dropdown: 1e3,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800
      }
    };
    _tmpl$2 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$22 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$3 = /* @__PURE__ */ template(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$4 = /* @__PURE__ */ template(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$5 = /* @__PURE__ */ template(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$6 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$7 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$8 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$9 = /* @__PURE__ */ template(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`);
    _tmpl$0 = /* @__PURE__ */ template(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`);
    _tmpl$1 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$10 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$11 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`);
    _tmpl$12 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$13 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$14 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$15 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`);
    _tmpl$16 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$17 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$18 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`);
    _tmpl$19 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$20 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$21 = /* @__PURE__ */ template(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);
    _tmpl$23 = /* @__PURE__ */ template(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
    _tmpl$24 = /* @__PURE__ */ template(`<button title="Copy object to clipboard">`);
    _tmpl$32 = /* @__PURE__ */ template(`<button title="Remove all items"aria-label="Remove all items">`);
    _tmpl$42 = /* @__PURE__ */ template(`<button title="Delete item"aria-label="Delete item">`);
    _tmpl$52 = /* @__PURE__ */ template(`<button title="Toggle value"aria-label="Toggle value">`);
    _tmpl$62 = /* @__PURE__ */ template(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`);
    _tmpl$72 = /* @__PURE__ */ template(`<div>`);
    _tmpl$82 = /* @__PURE__ */ template(`<div><button> <span></span> <span> `);
    _tmpl$92 = /* @__PURE__ */ template(`<input>`);
    _tmpl$02 = /* @__PURE__ */ template(`<span>`);
    _tmpl$110 = /* @__PURE__ */ template(`<div><span>:`);
    _tmpl$102 = /* @__PURE__ */ template(`<div><div><button> [<!>...<!>]`);
    Expander = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles(css) : lightStyles(css);
      });
      return (() => {
        var _el$ = _tmpl$23();
        createRenderEffect(() => className(_el$, clsx(styles().expander, css`
          transform: rotate(${props.expanded ? 90 : 0}deg);
        `, props.expanded && css`
            & svg {
              top: -1px;
            }
          `)));
        return _el$;
      })();
    };
    CopyButton = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles(css) : lightStyles(css);
      });
      const [copyState, setCopyState] = createSignal("NoCopy");
      return (() => {
        var _el$2 = _tmpl$24();
        addEventListener(_el$2, "click", copyState() === "NoCopy" ? () => {
          navigator.clipboard.writeText(stringify(props.value)).then(() => {
            setCopyState("SuccessCopy");
            setTimeout(() => {
              setCopyState("NoCopy");
            }, 1500);
          }, (err) => {
            setCopyState("ErrorCopy");
            setTimeout(() => {
              setCopyState("NoCopy");
            }, 1500);
          });
        } : void 0, true);
        insert(_el$2, createComponent(Switch, {
          get children() {
            return [createComponent(Match, {
              get when() {
                return copyState() === "NoCopy";
              },
              get children() {
                return createComponent(Copier, {});
              }
            }), createComponent(Match, {
              get when() {
                return copyState() === "SuccessCopy";
              },
              get children() {
                return createComponent(CopiedCopier, {
                  get theme() {
                    return theme();
                  }
                });
              }
            }), createComponent(Match, {
              get when() {
                return copyState() === "ErrorCopy";
              },
              get children() {
                return createComponent(ErrorCopier, {});
              }
            })];
          }
        }));
        createRenderEffect((_p$) => {
          var _v$ = styles().actionButton, _v$2 = `${copyState() === "NoCopy" ? "Copy object to clipboard" : copyState() === "SuccessCopy" ? "Object copied to clipboard" : "Error copying object to clipboard"}`;
          _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
          _v$2 !== _p$.t && setAttribute(_el$2, "aria-label", _p$.t = _v$2);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$2;
      })();
    };
    ClearArrayButton = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles(css) : lightStyles(css);
      });
      const queryClient2 = useQueryDevtoolsContext().client;
      return (() => {
        var _el$3 = _tmpl$32();
        _el$3.$$click = () => {
          const oldData = props.activeQuery.state.data;
          const newData = updateNestedDataByPath(oldData, props.dataPath, []);
          queryClient2.setQueryData(props.activeQuery.queryKey, newData);
        };
        insert(_el$3, createComponent(List, {}));
        createRenderEffect(() => className(_el$3, styles().actionButton));
        return _el$3;
      })();
    };
    DeleteItemButton = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles(css) : lightStyles(css);
      });
      const queryClient2 = useQueryDevtoolsContext().client;
      return (() => {
        var _el$4 = _tmpl$42();
        _el$4.$$click = () => {
          const oldData = props.activeQuery.state.data;
          const newData = deleteNestedDataByPath(oldData, props.dataPath);
          queryClient2.setQueryData(props.activeQuery.queryKey, newData);
        };
        insert(_el$4, createComponent(Trash, {}));
        createRenderEffect(() => className(_el$4, clsx(styles().actionButton)));
        return _el$4;
      })();
    };
    ToggleValueButton = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles(css) : lightStyles(css);
      });
      const queryClient2 = useQueryDevtoolsContext().client;
      return (() => {
        var _el$5 = _tmpl$52();
        _el$5.$$click = () => {
          const oldData = props.activeQuery.state.data;
          const newData = updateNestedDataByPath(oldData, props.dataPath, !props.value);
          queryClient2.setQueryData(props.activeQuery.queryKey, newData);
        };
        insert(_el$5, createComponent(Check, {
          get theme() {
            return theme();
          },
          get checked() {
            return props.value;
          }
        }));
        createRenderEffect(() => className(_el$5, clsx(styles().actionButton, css`
          width: ${tokens.size[3.5]};
          height: ${tokens.size[3.5]};
        `)));
        return _el$5;
      })();
    };
    stylesFactory = (theme, css) => {
      const {
        colors,
        font,
        size: size3,
        border
      } = tokens;
      const t2 = (light, dark) => theme === "light" ? light : dark;
      return {
        entry: css`
      & * {
        font-size: ${font.size.xs};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,
        subEntry: css`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${t2(colors.gray[300], colors.darkGray[400])};
      /* outline: 1px solid ${colors.teal[400]}; */
    `,
        expander: css`
      & path {
        stroke: ${colors.gray[400]};
      }
      & svg {
        width: ${size3[3]};
        height: ${size3[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${colors.blue[400]}; */
    `,
        expanderButtonContainer: css`
      display: flex;
      align-items: center;
      line-height: ${size3[4]};
      min-height: ${size3[4]};
      gap: ${size3[2]};
    `,
        expanderButton: css`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${size3[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${size3[1]};
      position: relative;
      /* outline: 1px solid ${colors.green[400]}; */

      &:focus-visible {
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,
        info: css`
      color: ${t2(colors.gray[500], colors.gray[500])};
      font-size: ${font.size.xs};
      margin-left: ${size3[1]};
      /* outline: 1px solid ${colors.yellow[400]}; */
    `,
        label: css`
      color: ${t2(colors.gray[700], colors.gray[300])};
      white-space: nowrap;
    `,
        value: css`
      color: ${t2(colors.purple[600], colors.purple[400])};
      flex-grow: 1;
    `,
        actions: css`
      display: inline-flex;
      gap: ${size3[2]};
      align-items: center;
    `,
        row: css`
      display: inline-flex;
      gap: ${size3[2]};
      width: 100%;
      margin: ${size3[0.25]} 0px;
      line-height: ${size3[4.5]};
      align-items: center;
    `,
        editableInput: css`
      border: none;
      padding: ${size3[0.5]} ${size3[1]} ${size3[0.5]} ${size3[1.5]};
      flex-grow: 1;
      border-radius: ${border.radius.xs};
      background-color: ${t2(colors.gray[200], colors.darkGray[500])};

      &:hover {
        background-color: ${t2(colors.gray[300], colors.darkGray[600])};
      }
    `,
        actionButton: css`
      background-color: transparent;
      color: ${t2(colors.gray[500], colors.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${size3[3]};
      height: ${size3[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
      }

      &:focus-visible {
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
        outline-offset: 2px;
      }
    `
      };
    };
    lightStyles = (css) => stylesFactory("light", css);
    darkStyles = (css) => stylesFactory("dark", css);
    delegateEvents(["click"]);
    _tmpl$25 = /* @__PURE__ */ template(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`);
    _tmpl$26 = /* @__PURE__ */ template(`<div>`);
    _tmpl$33 = /* @__PURE__ */ template(`<aside aria-label="Tanstack query devtools"><div></div><button aria-label="Close tanstack query devtools">`);
    _tmpl$43 = /* @__PURE__ */ template(`<select name=tsqd-queries-filter-sort>`);
    _tmpl$53 = /* @__PURE__ */ template(`<select name=tsqd-mutations-filter-sort>`);
    _tmpl$63 = /* @__PURE__ */ template(`<span>Asc`);
    _tmpl$73 = /* @__PURE__ */ template(`<span>Desc`);
    _tmpl$83 = /* @__PURE__ */ template(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`);
    _tmpl$93 = /* @__PURE__ */ template(`<div>Settings`);
    _tmpl$03 = /* @__PURE__ */ template(`<span>Position`);
    _tmpl$111 = /* @__PURE__ */ template(`<span>Top`);
    _tmpl$103 = /* @__PURE__ */ template(`<span>Bottom`);
    _tmpl$112 = /* @__PURE__ */ template(`<span>Left`);
    _tmpl$122 = /* @__PURE__ */ template(`<span>Right`);
    _tmpl$132 = /* @__PURE__ */ template(`<span>Theme`);
    _tmpl$142 = /* @__PURE__ */ template(`<span>Light`);
    _tmpl$152 = /* @__PURE__ */ template(`<span>Dark`);
    _tmpl$162 = /* @__PURE__ */ template(`<span>System`);
    _tmpl$172 = /* @__PURE__ */ template(`<span>Disabled Queries`);
    _tmpl$182 = /* @__PURE__ */ template(`<span>Show`);
    _tmpl$192 = /* @__PURE__ */ template(`<span>Hide`);
    _tmpl$202 = /* @__PURE__ */ template(`<div><div class=tsqd-queries-container>`);
    _tmpl$212 = /* @__PURE__ */ template(`<div><div class=tsqd-mutations-container>`);
    _tmpl$222 = /* @__PURE__ */ template(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`);
    _tmpl$232 = /* @__PURE__ */ template(`<option>Sort by `);
    _tmpl$242 = /* @__PURE__ */ template(`<div class=tsqd-query-disabled-indicator>disabled`);
    _tmpl$252 = /* @__PURE__ */ template(`<div class=tsqd-query-static-indicator>static`);
    _tmpl$262 = /* @__PURE__ */ template(`<button><div></div><code class=tsqd-query-hash>`);
    _tmpl$27 = /* @__PURE__ */ template(`<div role=tooltip id=tsqd-status-tooltip>`);
    _tmpl$28 = /* @__PURE__ */ template(`<span>`);
    _tmpl$29 = /* @__PURE__ */ template(`<button><span></span><span>`);
    _tmpl$30 = /* @__PURE__ */ template(`<button><span></span> Error`);
    _tmpl$31 = /* @__PURE__ */ template(`<div><span></span>Trigger Error<select><option value=""disabled selected>`);
    _tmpl$322 = /* @__PURE__ */ template(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`);
    _tmpl$332 = /* @__PURE__ */ template(`<form><textarea name=data></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`);
    _tmpl$34 = /* @__PURE__ */ template(`<div><div>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div>Actions</div><div><button><span></span>Refetch</button><button><span></span>Invalidate</button><button><span></span>Reset</button><button><span></span>Remove</button><button><span></span> Loading</button></div><div>Data </div><div>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`);
    _tmpl$35 = /* @__PURE__ */ template(`<option>`);
    _tmpl$36 = /* @__PURE__ */ template(`<div><div>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`);
    [selectedQueryHash, setSelectedQueryHash] = createSignal(null);
    [selectedMutationId, setSelectedMutationId] = createSignal(null);
    [panelWidth, setPanelWidth] = createSignal(0);
    [offline, setOffline] = createSignal(false);
    Devtools = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const onlineManager2 = createMemo(() => useQueryDevtoolsContext().onlineManager);
      onMount(() => {
        const unsubscribe = onlineManager2().subscribe((online) => {
          setOffline(!online);
        });
        onCleanup(() => {
          unsubscribe();
        });
      });
      const pip = usePiPWindow();
      const buttonPosition = createMemo(() => {
        return useQueryDevtoolsContext().buttonPosition || BUTTON_POSITION;
      });
      const isOpen = createMemo(() => {
        return props.localStore.open === "true" ? true : props.localStore.open === "false" ? false : useQueryDevtoolsContext().initialIsOpen || INITIAL_IS_OPEN;
      });
      const position = createMemo(() => {
        return props.localStore.position || useQueryDevtoolsContext().position || POSITION;
      });
      let transitionsContainerRef;
      createEffect(() => {
        const root = transitionsContainerRef.parentElement;
        const height = props.localStore.height || DEFAULT_HEIGHT;
        const width = props.localStore.width || DEFAULT_WIDTH;
        const panelPosition = position();
        root.style.setProperty("--tsqd-panel-height", `${panelPosition === "top" ? "-" : ""}${height}px`);
        root.style.setProperty("--tsqd-panel-width", `${panelPosition === "left" ? "-" : ""}${width}px`);
      });
      onMount(() => {
        const onFocus = () => {
          const root = transitionsContainerRef.parentElement;
          const fontSize = getComputedStyle(root).fontSize;
          root.style.setProperty("--tsqd-font-size", fontSize);
        };
        onFocus();
        window.addEventListener("focus", onFocus);
        onCleanup(() => {
          window.removeEventListener("focus", onFocus);
        });
      });
      const pip_open = createMemo(() => props.localStore.pip_open ?? "false");
      return [createComponent(Show, {
        get when() {
          return memo(() => !!pip().pipWindow)() && pip_open() == "true";
        },
        get children() {
          return createComponent(Portal, {
            get mount() {
              return pip().pipWindow?.document.body;
            },
            get children() {
              return createComponent(PiPPanel, {
                get children() {
                  return createComponent(ContentView, props);
                }
              });
            }
          });
        }
      }), (() => {
        var _el$ = _tmpl$26();
        var _ref$ = transitionsContainerRef;
        typeof _ref$ === "function" ? use(_ref$, _el$) : transitionsContainerRef = _el$;
        insert(_el$, createComponent(TransitionGroup, {
          name: "tsqd-panel-transition",
          get children() {
            return createComponent(Show, {
              get when() {
                return memo(() => !!(isOpen() && !pip().pipWindow))() && pip_open() == "false";
              },
              get children() {
                return createComponent(DraggablePanel, {
                  get localStore() {
                    return props.localStore;
                  },
                  get setLocalStore() {
                    return props.setLocalStore;
                  }
                });
              }
            });
          }
        }), null);
        insert(_el$, createComponent(TransitionGroup, {
          name: "tsqd-button-transition",
          get children() {
            return createComponent(Show, {
              get when() {
                return !isOpen();
              },
              get children() {
                var _el$2 = _tmpl$25(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
                insert(_el$3, createComponent(TanstackLogo, {}));
                _el$4.$$click = () => props.setLocalStore("open", "true");
                insert(_el$4, createComponent(TanstackLogo, {}));
                createRenderEffect(() => className(_el$2, clsx(styles().devtoolsBtn, styles()[`devtoolsBtn-position-${buttonPosition()}`], "tsqd-open-btn-container")));
                return _el$2;
              }
            });
          }
        }), null);
        createRenderEffect(() => className(_el$, clsx(css`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${position() === "top" || position() === "bottom" ? `transform: translateY(var(--tsqd-panel-height));` : `transform: translateX(var(--tsqd-panel-width));`}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${buttonPosition() === "relative" ? `none;` : buttonPosition() === "top-left" ? `translateX(-72px);` : buttonPosition() === "top-right" ? `translateX(72px);` : `translateY(72px);`};
              opacity: 0;
            }
          `, "tsqd-transitions-container")));
        return _el$;
      })()];
    };
    PiPPanel = (props) => {
      const pip = usePiPWindow();
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const getPanelDynamicStyles = () => {
        const {
          colors
        } = tokens;
        const t2 = (light, dark) => theme() === "dark" ? dark : light;
        if (panelWidth() < secondBreakpoint) {
          return css`
        flex-direction: column;
        background-color: ${t2(colors.gray[300], colors.gray[600])};
      `;
        }
        return css`
      flex-direction: row;
      background-color: ${t2(colors.gray[200], colors.darkGray[900])};
    `;
      };
      createEffect(() => {
        const win = pip().pipWindow;
        const resizeCB = () => {
          if (!win) return;
          setPanelWidth(win.innerWidth);
        };
        if (win) {
          win.addEventListener("resize", resizeCB);
          resizeCB();
        }
        onCleanup(() => {
          if (win) {
            win.removeEventListener("resize", resizeCB);
          }
        });
      });
      return (() => {
        var _el$5 = _tmpl$26();
        _el$5.style.setProperty("--tsqd-font-size", "16px");
        _el$5.style.setProperty("max-height", "100vh");
        _el$5.style.setProperty("height", "100vh");
        _el$5.style.setProperty("width", "100vw");
        insert(_el$5, () => props.children);
        createRenderEffect(() => className(_el$5, clsx(styles().panel, getPanelDynamicStyles(), {
          [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint
        }, "tsqd-main-panel")));
        return _el$5;
      })();
    };
    ParentPanel = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      let panelRef;
      onMount(() => {
        createResizeObserver(panelRef, ({
          width
        }, el) => {
          if (el === panelRef) {
            setPanelWidth(width);
          }
        });
      });
      const getPanelDynamicStyles = () => {
        const {
          colors
        } = tokens;
        const t2 = (light, dark) => theme() === "dark" ? dark : light;
        if (panelWidth() < secondBreakpoint) {
          return css`
        flex-direction: column;
        background-color: ${t2(colors.gray[300], colors.gray[600])};
      `;
        }
        return css`
      flex-direction: row;
      background-color: ${t2(colors.gray[200], colors.darkGray[900])};
    `;
      };
      return (() => {
        var _el$6 = _tmpl$26();
        var _ref$2 = panelRef;
        typeof _ref$2 === "function" ? use(_ref$2, _el$6) : panelRef = _el$6;
        _el$6.style.setProperty("--tsqd-font-size", "16px");
        insert(_el$6, () => props.children);
        createRenderEffect(() => className(_el$6, clsx(styles().parentPanel, getPanelDynamicStyles(), {
          [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint
        }, "tsqd-main-panel")));
        return _el$6;
      })();
    };
    DraggablePanel = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const [isResizing, setIsResizing] = createSignal(false);
      const position = createMemo(() => props.localStore.position || useQueryDevtoolsContext().position || POSITION);
      const handleDragStart = (event) => {
        const panelElement = event.currentTarget.parentElement;
        if (!panelElement) return;
        setIsResizing(true);
        const {
          height,
          width
        } = panelElement.getBoundingClientRect();
        const startX = event.clientX;
        const startY = event.clientY;
        let newSize = 0;
        const minHeight = convertRemToPixels(3.5);
        const minWidth = convertRemToPixels(12);
        const runDrag = (moveEvent) => {
          moveEvent.preventDefault();
          if (position() === "left" || position() === "right") {
            const valToAdd = position() === "right" ? startX - moveEvent.clientX : moveEvent.clientX - startX;
            newSize = Math.round(width + valToAdd);
            if (newSize < minWidth) {
              newSize = minWidth;
            }
            props.setLocalStore("width", String(Math.round(newSize)));
            const newWidth = panelElement.getBoundingClientRect().width;
            if (Number(props.localStore.width) < newWidth) {
              props.setLocalStore("width", String(newWidth));
            }
          } else {
            const valToAdd = position() === "bottom" ? startY - moveEvent.clientY : moveEvent.clientY - startY;
            newSize = Math.round(height + valToAdd);
            if (newSize < minHeight) {
              newSize = minHeight;
              setSelectedQueryHash(null);
            }
            props.setLocalStore("height", String(Math.round(newSize)));
          }
        };
        const unsubscribe = () => {
          if (isResizing()) {
            setIsResizing(false);
          }
          document.removeEventListener("mousemove", runDrag, false);
          document.removeEventListener("mouseUp", unsubscribe, false);
        };
        document.addEventListener("mousemove", runDrag, false);
        document.addEventListener("mouseup", unsubscribe, false);
      };
      let panelRef;
      onMount(() => {
        createResizeObserver(panelRef, ({
          width
        }, el) => {
          if (el === panelRef) {
            setPanelWidth(width);
          }
        });
      });
      createEffect(() => {
        const rootContainer = panelRef.parentElement?.parentElement?.parentElement;
        if (!rootContainer) return;
        const currentPosition = props.localStore.position || POSITION;
        const styleProp = getSidedProp("padding", currentPosition);
        const isVertical = props.localStore.position === "left" || props.localStore.position === "right";
        const previousPaddings = (({
          padding,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight
        }) => ({
          padding,
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight
        }))(rootContainer.style);
        rootContainer.style[styleProp] = `${isVertical ? props.localStore.width : props.localStore.height}px`;
        onCleanup(() => {
          Object.entries(previousPaddings).forEach(([property, previousValue]) => {
            rootContainer.style[property] = previousValue;
          });
        });
      });
      const getPanelDynamicStyles = () => {
        const {
          colors
        } = tokens;
        const t2 = (light, dark) => theme() === "dark" ? dark : light;
        if (panelWidth() < secondBreakpoint) {
          return css`
        flex-direction: column;
        background-color: ${t2(colors.gray[300], colors.gray[600])};
      `;
        }
        return css`
      flex-direction: row;
      background-color: ${t2(colors.gray[200], colors.darkGray[900])};
    `;
      };
      return (() => {
        var _el$7 = _tmpl$33(), _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling;
        var _ref$3 = panelRef;
        typeof _ref$3 === "function" ? use(_ref$3, _el$7) : panelRef = _el$7;
        _el$8.$$mousedown = handleDragStart;
        _el$9.$$click = () => props.setLocalStore("open", "false");
        insert(_el$9, createComponent(ChevronDown, {}));
        insert(_el$7, createComponent(ContentView, props), null);
        createRenderEffect((_p$) => {
          var _v$ = clsx(styles().panel, styles()[`panel-position-${position()}`], getPanelDynamicStyles(), {
            [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint && (position() === "right" || position() === "left")
          }, "tsqd-main-panel"), _v$2 = position() === "bottom" || position() === "top" ? `${props.localStore.height || DEFAULT_HEIGHT}px` : "auto", _v$3 = position() === "right" || position() === "left" ? `${props.localStore.width || DEFAULT_WIDTH}px` : "auto", _v$4 = clsx(styles().dragHandle, styles()[`dragHandle-position-${position()}`], "tsqd-drag-handle"), _v$5 = clsx(styles().closeBtn, styles()[`closeBtn-position-${position()}`], "tsqd-minimize-btn");
          _v$ !== _p$.e && className(_el$7, _p$.e = _v$);
          _v$2 !== _p$.t && ((_p$.t = _v$2) != null ? _el$7.style.setProperty("height", _v$2) : _el$7.style.removeProperty("height"));
          _v$3 !== _p$.a && ((_p$.a = _v$3) != null ? _el$7.style.setProperty("width", _v$3) : _el$7.style.removeProperty("width"));
          _v$4 !== _p$.o && className(_el$8, _p$.o = _v$4);
          _v$5 !== _p$.i && className(_el$9, _p$.i = _v$5);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0
        });
        return _el$7;
      })();
    };
    ContentView = (props) => {
      setupQueryCacheSubscription();
      setupMutationCacheSubscription();
      let containerRef;
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const pip = usePiPWindow();
      const [selectedView, setSelectedView] = createSignal("queries");
      const sort = createMemo(() => props.localStore.sort || DEFAULT_SORT_FN_NAME);
      const sortOrder = createMemo(() => Number(props.localStore.sortOrder) || DEFAULT_SORT_ORDER);
      const mutationSort = createMemo(() => props.localStore.mutationSort || DEFAULT_MUTATION_SORT_FN_NAME);
      const mutationSortOrder = createMemo(() => Number(props.localStore.mutationSortOrder) || DEFAULT_SORT_ORDER);
      const sortFn = createMemo(() => sortFns[sort()]);
      const mutationSortFn = createMemo(() => mutationSortFns[mutationSort()]);
      const onlineManager2 = createMemo(() => useQueryDevtoolsContext().onlineManager);
      const query_cache = createMemo(() => {
        return useQueryDevtoolsContext().client.getQueryCache();
      });
      const mutation_cache = createMemo(() => {
        return useQueryDevtoolsContext().client.getMutationCache();
      });
      const queryCount = createSubscribeToQueryCacheBatcher((queryCache2) => {
        return queryCache2().getAll().length;
      }, false);
      const queries = createMemo(on(() => [queryCount(), props.localStore.filter, sort(), sortOrder(), props.localStore.hideDisabledQueries], () => {
        const curr = query_cache().getAll();
        let filtered = props.localStore.filter ? curr.filter((item) => rankItem(item.queryHash, props.localStore.filter || "").passed) : [...curr];
        if (props.localStore.hideDisabledQueries === "true") {
          filtered = filtered.filter((item) => !item.isDisabled());
        }
        const sorted = sortFn() ? filtered.sort((a2, b2) => sortFn()(a2, b2) * sortOrder()) : filtered;
        return sorted;
      }));
      const mutationCount = createSubscribeToMutationCacheBatcher((mutationCache) => {
        return mutationCache().getAll().length;
      }, false);
      const mutations = createMemo(on(() => [mutationCount(), props.localStore.mutationFilter, mutationSort(), mutationSortOrder()], () => {
        const curr = mutation_cache().getAll();
        const filtered = props.localStore.mutationFilter ? curr.filter((item) => {
          const value = `${item.options.mutationKey ? JSON.stringify(item.options.mutationKey) + " - " : ""}${new Date(item.state.submittedAt).toLocaleString()}`;
          return rankItem(value, props.localStore.mutationFilter || "").passed;
        }) : [...curr];
        const sorted = mutationSortFn() ? filtered.sort((a2, b2) => mutationSortFn()(a2, b2) * mutationSortOrder()) : filtered;
        return sorted;
      }));
      const setDevtoolsPosition = (pos) => {
        props.setLocalStore("position", pos);
      };
      const setComputedVariables = (el) => {
        const computedStyle = getComputedStyle(containerRef);
        const variable = computedStyle.getPropertyValue("--tsqd-font-size");
        el.style.setProperty("--tsqd-font-size", variable);
      };
      return [(() => {
        var _el$0 = _tmpl$222(), _el$1 = _el$0.firstChild, _el$10 = _el$1.firstChild, _el$11 = _el$10.firstChild, _el$12 = _el$11.firstChild, _el$13 = _el$12.nextSibling, _el$14 = _el$13.firstChild, _el$15 = _el$1.nextSibling, _el$16 = _el$15.firstChild, _el$17 = _el$16.firstChild, _el$18 = _el$17.firstChild, _el$19 = _el$17.nextSibling, _el$22 = _el$19.nextSibling, _el$25 = _el$16.nextSibling, _el$26 = _el$25.firstChild, _el$27 = _el$26.nextSibling;
        var _ref$4 = containerRef;
        typeof _ref$4 === "function" ? use(_ref$4, _el$0) : containerRef = _el$0;
        _el$11.$$click = () => {
          if (!pip().pipWindow && !props.showPanelViewOnly) {
            props.setLocalStore("open", "false");
            return;
          }
          if (props.onClose) {
            props.onClose();
          }
        };
        insert(_el$13, () => useQueryDevtoolsContext().queryFlavor, _el$14);
        insert(_el$13, () => useQueryDevtoolsContext().version, null);
        insert(_el$10, createComponent(radio_group_exports.Root, {
          get ["class"]() {
            return clsx(styles().viewToggle);
          },
          get value() {
            return selectedView();
          },
          onChange: (value) => {
            setSelectedView(value);
            setSelectedQueryHash(null);
            setSelectedMutationId(null);
          },
          get children() {
            return [createComponent(radio_group_exports.Item, {
              value: "queries",
              "class": "tsqd-radio-toggle",
              get children() {
                return [createComponent(radio_group_exports.ItemInput, {}), createComponent(radio_group_exports.ItemControl, {
                  get children() {
                    return createComponent(radio_group_exports.ItemIndicator, {});
                  }
                }), createComponent(radio_group_exports.ItemLabel, {
                  title: "Toggle Queries View",
                  children: "Queries"
                })];
              }
            }), createComponent(radio_group_exports.Item, {
              value: "mutations",
              "class": "tsqd-radio-toggle",
              get children() {
                return [createComponent(radio_group_exports.ItemInput, {}), createComponent(radio_group_exports.ItemControl, {
                  get children() {
                    return createComponent(radio_group_exports.ItemIndicator, {});
                  }
                }), createComponent(radio_group_exports.ItemLabel, {
                  title: "Toggle Mutations View",
                  children: "Mutations"
                })];
              }
            })];
          }
        }), null);
        insert(_el$1, createComponent(Show, {
          get when() {
            return selectedView() === "queries";
          },
          get children() {
            return createComponent(QueryStatusCount, {});
          }
        }), null);
        insert(_el$1, createComponent(Show, {
          get when() {
            return selectedView() === "mutations";
          },
          get children() {
            return createComponent(MutationStatusCount, {});
          }
        }), null);
        insert(_el$17, createComponent(Search, {}), _el$18);
        _el$18.$$input = (e2) => {
          if (selectedView() === "queries") {
            props.setLocalStore("filter", e2.currentTarget.value);
          } else {
            props.setLocalStore("mutationFilter", e2.currentTarget.value);
          }
        };
        insert(_el$19, createComponent(Show, {
          get when() {
            return selectedView() === "queries";
          },
          get children() {
            var _el$20 = _tmpl$43();
            _el$20.addEventListener("change", (e2) => {
              props.setLocalStore("sort", e2.currentTarget.value);
            });
            insert(_el$20, () => Object.keys(sortFns).map((key) => (() => {
              var _el$46 = _tmpl$232();
              _el$46.firstChild;
              _el$46.value = key;
              insert(_el$46, key, null);
              return _el$46;
            })()));
            createRenderEffect(() => _el$20.value = sort());
            return _el$20;
          }
        }), null);
        insert(_el$19, createComponent(Show, {
          get when() {
            return selectedView() === "mutations";
          },
          get children() {
            var _el$21 = _tmpl$53();
            _el$21.addEventListener("change", (e2) => {
              props.setLocalStore("mutationSort", e2.currentTarget.value);
            });
            insert(_el$21, () => Object.keys(mutationSortFns).map((key) => (() => {
              var _el$48 = _tmpl$232();
              _el$48.firstChild;
              _el$48.value = key;
              insert(_el$48, key, null);
              return _el$48;
            })()));
            createRenderEffect(() => _el$21.value = mutationSort());
            return _el$21;
          }
        }), null);
        insert(_el$19, createComponent(ChevronDown, {}), null);
        _el$22.$$click = () => {
          if (selectedView() === "queries") {
            props.setLocalStore("sortOrder", String(sortOrder() * -1));
          } else {
            props.setLocalStore("mutationSortOrder", String(mutationSortOrder() * -1));
          }
        };
        insert(_el$22, createComponent(Show, {
          get when() {
            return (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === 1;
          },
          get children() {
            return [_tmpl$63(), createComponent(ArrowUp, {})];
          }
        }), null);
        insert(_el$22, createComponent(Show, {
          get when() {
            return (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1;
          },
          get children() {
            return [_tmpl$73(), createComponent(ArrowDown, {})];
          }
        }), null);
        _el$26.$$click = () => {
          if (selectedView() === "queries") {
            sendDevToolsEvent({
              type: "CLEAR_QUERY_CACHE"
            });
            query_cache().clear();
          } else {
            sendDevToolsEvent({
              type: "CLEAR_MUTATION_CACHE"
            });
            mutation_cache().clear();
          }
        };
        insert(_el$26, createComponent(Trash, {}));
        _el$27.$$click = () => {
          onlineManager2().setOnline(!onlineManager2().isOnline());
        };
        insert(_el$27, (() => {
          var _c$ = memo(() => !!offline());
          return () => _c$() ? createComponent(Offline, {}) : createComponent(Wifi, {});
        })());
        insert(_el$25, createComponent(Show, {
          get when() {
            return memo(() => !!!pip().pipWindow)() && !pip().disabled;
          },
          get children() {
            var _el$28 = _tmpl$83();
            _el$28.$$click = () => {
              pip().requestPipWindow(Number(window.innerWidth), Number(props.localStore.height ?? 500));
            };
            insert(_el$28, createComponent(PiPIcon, {}));
            createRenderEffect(() => className(_el$28, clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-open-pip")));
            return _el$28;
          }
        }), null);
        insert(_el$25, createComponent(dropdown_menu_exports.Root, {
          gutter: 4,
          get children() {
            return [createComponent(dropdown_menu_exports.Trigger, {
              get ["class"]() {
                return clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-settings");
              },
              get children() {
                return createComponent(Settings, {});
              }
            }), createComponent(dropdown_menu_exports.Portal, {
              ref: (el) => setComputedVariables(el),
              get mount() {
                return memo(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
              },
              get children() {
                return createComponent(dropdown_menu_exports.Content, {
                  get ["class"]() {
                    return clsx(styles().settingsMenu, "tsqd-settings-menu");
                  },
                  get children() {
                    return [(() => {
                      var _el$29 = _tmpl$93();
                      createRenderEffect(() => className(_el$29, clsx(styles().settingsMenuHeader, "tsqd-settings-menu-header")));
                      return _el$29;
                    })(), createComponent(Show, {
                      get when() {
                        return !props.showPanelViewOnly;
                      },
                      get children() {
                        return createComponent(dropdown_menu_exports.Sub, {
                          overlap: true,
                          gutter: 8,
                          shift: -4,
                          get children() {
                            return [createComponent(dropdown_menu_exports.SubTrigger, {
                              get ["class"]() {
                                return clsx(styles().settingsSubTrigger, "tsqd-settings-menu-sub-trigger", "tsqd-settings-menu-sub-trigger-position");
                              },
                              get children() {
                                return [_tmpl$03(), createComponent(ChevronDown, {})];
                              }
                            }), createComponent(dropdown_menu_exports.Portal, {
                              ref: (el) => setComputedVariables(el),
                              get mount() {
                                return memo(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
                              },
                              get children() {
                                return createComponent(dropdown_menu_exports.SubContent, {
                                  get ["class"]() {
                                    return clsx(styles().settingsMenu, "tsqd-settings-submenu");
                                  },
                                  get children() {
                                    return [createComponent(dropdown_menu_exports.Item, {
                                      onSelect: () => {
                                        setDevtoolsPosition("top");
                                      },
                                      as: "button",
                                      get ["class"]() {
                                        return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-top");
                                      },
                                      get children() {
                                        return [_tmpl$111(), createComponent(ArrowUp, {})];
                                      }
                                    }), createComponent(dropdown_menu_exports.Item, {
                                      onSelect: () => {
                                        setDevtoolsPosition("bottom");
                                      },
                                      as: "button",
                                      get ["class"]() {
                                        return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-bottom");
                                      },
                                      get children() {
                                        return [_tmpl$103(), createComponent(ArrowDown, {})];
                                      }
                                    }), createComponent(dropdown_menu_exports.Item, {
                                      onSelect: () => {
                                        setDevtoolsPosition("left");
                                      },
                                      as: "button",
                                      get ["class"]() {
                                        return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-left");
                                      },
                                      get children() {
                                        return [_tmpl$112(), createComponent(ArrowLeft, {})];
                                      }
                                    }), createComponent(dropdown_menu_exports.Item, {
                                      onSelect: () => {
                                        setDevtoolsPosition("right");
                                      },
                                      as: "button",
                                      get ["class"]() {
                                        return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-right");
                                      },
                                      get children() {
                                        return [_tmpl$122(), createComponent(ArrowRight, {})];
                                      }
                                    })];
                                  }
                                });
                              }
                            })];
                          }
                        });
                      }
                    }), createComponent(dropdown_menu_exports.Sub, {
                      overlap: true,
                      gutter: 8,
                      shift: -4,
                      get children() {
                        return [createComponent(dropdown_menu_exports.SubTrigger, {
                          get ["class"]() {
                            return clsx(styles().settingsSubTrigger, "tsqd-settings-menu-sub-trigger", "tsqd-settings-menu-sub-trigger-position");
                          },
                          get children() {
                            return [_tmpl$132(), createComponent(ChevronDown, {})];
                          }
                        }), createComponent(dropdown_menu_exports.Portal, {
                          ref: (el) => setComputedVariables(el),
                          get mount() {
                            return memo(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
                          },
                          get children() {
                            return createComponent(dropdown_menu_exports.SubContent, {
                              get ["class"]() {
                                return clsx(styles().settingsMenu, "tsqd-settings-submenu");
                              },
                              get children() {
                                return [createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    props.setLocalStore("theme_preference", "light");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, props.localStore.theme_preference === "light" && styles().themeSelectedButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-top");
                                  },
                                  get children() {
                                    return [_tmpl$142(), createComponent(Sun, {})];
                                  }
                                }), createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    props.setLocalStore("theme_preference", "dark");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, props.localStore.theme_preference === "dark" && styles().themeSelectedButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-bottom");
                                  },
                                  get children() {
                                    return [_tmpl$152(), createComponent(Moon, {})];
                                  }
                                }), createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    props.setLocalStore("theme_preference", "system");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, props.localStore.theme_preference === "system" && styles().themeSelectedButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-left");
                                  },
                                  get children() {
                                    return [_tmpl$162(), createComponent(Monitor, {})];
                                  }
                                })];
                              }
                            });
                          }
                        })];
                      }
                    }), createComponent(dropdown_menu_exports.Sub, {
                      overlap: true,
                      gutter: 8,
                      shift: -4,
                      get children() {
                        return [createComponent(dropdown_menu_exports.SubTrigger, {
                          get ["class"]() {
                            return clsx(styles().settingsSubTrigger, "tsqd-settings-menu-sub-trigger", "tsqd-settings-menu-sub-trigger-disabled-queries");
                          },
                          get children() {
                            return [_tmpl$172(), createComponent(ChevronDown, {})];
                          }
                        }), createComponent(dropdown_menu_exports.Portal, {
                          ref: (el) => setComputedVariables(el),
                          get mount() {
                            return memo(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
                          },
                          get children() {
                            return createComponent(dropdown_menu_exports.SubContent, {
                              get ["class"]() {
                                return clsx(styles().settingsMenu, "tsqd-settings-submenu");
                              },
                              get children() {
                                return [createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    props.setLocalStore("hideDisabledQueries", "false");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, props.localStore.hideDisabledQueries !== "true" && styles().themeSelectedButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-show");
                                  },
                                  get children() {
                                    return [_tmpl$182(), createComponent(Show, {
                                      get when() {
                                        return props.localStore.hideDisabledQueries !== "true";
                                      },
                                      get children() {
                                        return createComponent(CheckCircle, {});
                                      }
                                    })];
                                  }
                                }), createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    props.setLocalStore("hideDisabledQueries", "true");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, props.localStore.hideDisabledQueries === "true" && styles().themeSelectedButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-hide");
                                  },
                                  get children() {
                                    return [_tmpl$192(), createComponent(Show, {
                                      get when() {
                                        return props.localStore.hideDisabledQueries === "true";
                                      },
                                      get children() {
                                        return createComponent(CheckCircle, {});
                                      }
                                    })];
                                  }
                                })];
                              }
                            });
                          }
                        })];
                      }
                    })];
                  }
                });
              }
            })];
          }
        }), null);
        insert(_el$0, createComponent(Show, {
          get when() {
            return selectedView() === "queries";
          },
          get children() {
            var _el$42 = _tmpl$202(), _el$43 = _el$42.firstChild;
            insert(_el$43, createComponent(Key, {
              by: (q) => q.queryHash,
              get each() {
                return queries();
              },
              children: (query) => createComponent(QueryRow, {
                get query() {
                  return query();
                }
              })
            }));
            createRenderEffect(() => className(_el$42, clsx(styles().overflowQueryContainer, "tsqd-queries-overflow-container")));
            return _el$42;
          }
        }), null);
        insert(_el$0, createComponent(Show, {
          get when() {
            return selectedView() === "mutations";
          },
          get children() {
            var _el$44 = _tmpl$212(), _el$45 = _el$44.firstChild;
            insert(_el$45, createComponent(Key, {
              by: (m) => m.mutationId,
              get each() {
                return mutations();
              },
              children: (mutation) => createComponent(MutationRow, {
                get mutation() {
                  return mutation();
                }
              })
            }));
            createRenderEffect(() => className(_el$44, clsx(styles().overflowQueryContainer, "tsqd-mutations-overflow-container")));
            return _el$44;
          }
        }), null);
        createRenderEffect((_p$) => {
          var _v$6 = clsx(styles().queriesContainer, panelWidth() < secondBreakpoint && (selectedQueryHash() || selectedMutationId()) && css`
              height: 50%;
              max-height: 50%;
            `, panelWidth() < secondBreakpoint && !(selectedQueryHash() || selectedMutationId()) && css`
              height: 100%;
              max-height: 100%;
            `, "tsqd-queries-container"), _v$7 = clsx(styles().row, "tsqd-header"), _v$8 = styles().logoAndToggleContainer, _v$9 = clsx(styles().logo, "tsqd-text-logo-container"), _v$0 = clsx(styles().tanstackLogo, "tsqd-text-logo-tanstack"), _v$1 = clsx(styles().queryFlavorLogo, "tsqd-text-logo-query-flavor"), _v$10 = clsx(styles().row, "tsqd-filters-actions-container"), _v$11 = clsx(styles().filtersContainer, "tsqd-filters-container"), _v$12 = clsx(styles().filterInput, "tsqd-query-filter-textfield-container"), _v$13 = clsx("tsqd-query-filter-textfield"), _v$14 = clsx(styles().filterSelect, "tsqd-query-filter-sort-container"), _v$15 = `Sort order ${(selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1 ? "descending" : "ascending"}`, _v$16 = (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1, _v$17 = clsx(styles().actionsContainer, "tsqd-actions-container"), _v$18 = clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-clear-cache"), _v$19 = `Clear ${selectedView()} cache`, _v$20 = clsx(styles().actionsBtn, offline() && styles().actionsBtnOffline, "tsqd-actions-btn", "tsqd-action-mock-offline-behavior"), _v$21 = `${offline() ? "Unset offline mocking behavior" : "Mock offline behavior"}`, _v$22 = offline(), _v$23 = `${offline() ? "Unset offline mocking behavior" : "Mock offline behavior"}`;
          _v$6 !== _p$.e && className(_el$0, _p$.e = _v$6);
          _v$7 !== _p$.t && className(_el$1, _p$.t = _v$7);
          _v$8 !== _p$.a && className(_el$10, _p$.a = _v$8);
          _v$9 !== _p$.o && className(_el$11, _p$.o = _v$9);
          _v$0 !== _p$.i && className(_el$12, _p$.i = _v$0);
          _v$1 !== _p$.n && className(_el$13, _p$.n = _v$1);
          _v$10 !== _p$.s && className(_el$15, _p$.s = _v$10);
          _v$11 !== _p$.h && className(_el$16, _p$.h = _v$11);
          _v$12 !== _p$.r && className(_el$17, _p$.r = _v$12);
          _v$13 !== _p$.d && className(_el$18, _p$.d = _v$13);
          _v$14 !== _p$.l && className(_el$19, _p$.l = _v$14);
          _v$15 !== _p$.u && setAttribute(_el$22, "aria-label", _p$.u = _v$15);
          _v$16 !== _p$.c && setAttribute(_el$22, "aria-pressed", _p$.c = _v$16);
          _v$17 !== _p$.w && className(_el$25, _p$.w = _v$17);
          _v$18 !== _p$.m && className(_el$26, _p$.m = _v$18);
          _v$19 !== _p$.f && setAttribute(_el$26, "title", _p$.f = _v$19);
          _v$20 !== _p$.y && className(_el$27, _p$.y = _v$20);
          _v$21 !== _p$.g && setAttribute(_el$27, "aria-label", _p$.g = _v$21);
          _v$22 !== _p$.p && setAttribute(_el$27, "aria-pressed", _p$.p = _v$22);
          _v$23 !== _p$.b && setAttribute(_el$27, "title", _p$.b = _v$23);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
          d: void 0,
          l: void 0,
          u: void 0,
          c: void 0,
          w: void 0,
          m: void 0,
          f: void 0,
          y: void 0,
          g: void 0,
          p: void 0,
          b: void 0
        });
        createRenderEffect(() => _el$18.value = selectedView() === "queries" ? props.localStore.filter || "" : props.localStore.mutationFilter || "");
        return _el$0;
      })(), createComponent(Show, {
        get when() {
          return memo(() => selectedView() === "queries")() && selectedQueryHash();
        },
        get children() {
          return createComponent(QueryDetails, {});
        }
      }), createComponent(Show, {
        get when() {
          return memo(() => selectedView() === "mutations")() && selectedMutationId();
        },
        get children() {
          return createComponent(MutationDetails, {});
        }
      })];
    };
    QueryRow = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const {
        colors,
        alpha
      } = tokens;
      const t2 = (light, dark) => theme() === "dark" ? dark : light;
      const queryState = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().find({
        queryKey: props.query.queryKey
      })?.state, true, (e2) => e2.query.queryHash === props.query.queryHash);
      const isDisabled = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().find({
        queryKey: props.query.queryKey
      })?.isDisabled() ?? false, true, (e2) => e2.query.queryHash === props.query.queryHash);
      const isStatic = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().find({
        queryKey: props.query.queryKey
      })?.isStatic() ?? false, true, (e2) => e2.query.queryHash === props.query.queryHash);
      const isStale2 = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().find({
        queryKey: props.query.queryKey
      })?.isStale() ?? false, true, (e2) => e2.query.queryHash === props.query.queryHash);
      const observers = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().find({
        queryKey: props.query.queryKey
      })?.getObserversCount() ?? 0, true, (e2) => e2.query.queryHash === props.query.queryHash);
      const color = createMemo(() => getQueryStatusColor({
        queryState: queryState(),
        observerCount: observers(),
        isStale: isStale2()
      }));
      const getObserverCountColorStyles = () => {
        if (color() === "gray") {
          return css`
        background-color: ${t2(colors[color()][200], colors[color()][700])};
        color: ${t2(colors[color()][700], colors[color()][300])};
      `;
        }
        return css`
      background-color: ${t2(colors[color()][200] + alpha[80], colors[color()][900])};
      color: ${t2(colors[color()][800], colors[color()][300])};
    `;
      };
      return createComponent(Show, {
        get when() {
          return queryState();
        },
        get children() {
          var _el$50 = _tmpl$262(), _el$51 = _el$50.firstChild, _el$52 = _el$51.nextSibling;
          _el$50.$$click = () => setSelectedQueryHash(props.query.queryHash === selectedQueryHash() ? null : props.query.queryHash);
          insert(_el$51, observers);
          insert(_el$52, () => props.query.queryHash);
          insert(_el$50, createComponent(Show, {
            get when() {
              return isDisabled();
            },
            get children() {
              return _tmpl$242();
            }
          }), null);
          insert(_el$50, createComponent(Show, {
            get when() {
              return isStatic();
            },
            get children() {
              return _tmpl$252();
            }
          }), null);
          createRenderEffect((_p$) => {
            var _v$24 = clsx(styles().queryRow, selectedQueryHash() === props.query.queryHash && styles().selectedQueryRow, "tsqd-query-row"), _v$25 = `Query key ${props.query.queryHash}`, _v$26 = clsx(getObserverCountColorStyles(), "tsqd-query-observer-count");
            _v$24 !== _p$.e && className(_el$50, _p$.e = _v$24);
            _v$25 !== _p$.t && setAttribute(_el$50, "aria-label", _p$.t = _v$25);
            _v$26 !== _p$.a && className(_el$51, _p$.a = _v$26);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          });
          return _el$50;
        }
      });
    };
    MutationRow = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const {
        colors,
        alpha
      } = tokens;
      const t2 = (light, dark) => theme() === "dark" ? dark : light;
      const mutationState = createSubscribeToMutationCacheBatcher((mutationCache) => {
        const mutations = mutationCache().getAll();
        const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
        return mutation?.state;
      });
      const isPaused = createSubscribeToMutationCacheBatcher((mutationCache) => {
        const mutations = mutationCache().getAll();
        const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
        if (!mutation) return false;
        return mutation.state.isPaused;
      });
      const status = createSubscribeToMutationCacheBatcher((mutationCache) => {
        const mutations = mutationCache().getAll();
        const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
        if (!mutation) return "idle";
        return mutation.state.status;
      });
      const color = createMemo(() => getMutationStatusColor({
        isPaused: isPaused(),
        status: status()
      }));
      const getObserverCountColorStyles = () => {
        if (color() === "gray") {
          return css`
        background-color: ${t2(colors[color()][200], colors[color()][700])};
        color: ${t2(colors[color()][700], colors[color()][300])};
      `;
        }
        return css`
      background-color: ${t2(colors[color()][200] + alpha[80], colors[color()][900])};
      color: ${t2(colors[color()][800], colors[color()][300])};
    `;
      };
      return createComponent(Show, {
        get when() {
          return mutationState();
        },
        get children() {
          var _el$55 = _tmpl$262(), _el$56 = _el$55.firstChild, _el$57 = _el$56.nextSibling;
          _el$55.$$click = () => {
            setSelectedMutationId(props.mutation.mutationId === selectedMutationId() ? null : props.mutation.mutationId);
          };
          insert(_el$56, createComponent(Show, {
            get when() {
              return color() === "purple";
            },
            get children() {
              return createComponent(PauseCircle, {});
            }
          }), null);
          insert(_el$56, createComponent(Show, {
            get when() {
              return color() === "green";
            },
            get children() {
              return createComponent(CheckCircle, {});
            }
          }), null);
          insert(_el$56, createComponent(Show, {
            get when() {
              return color() === "red";
            },
            get children() {
              return createComponent(XCircle, {});
            }
          }), null);
          insert(_el$56, createComponent(Show, {
            get when() {
              return color() === "yellow";
            },
            get children() {
              return createComponent(LoadingCircle, {});
            }
          }), null);
          insert(_el$57, createComponent(Show, {
            get when() {
              return props.mutation.options.mutationKey;
            },
            get children() {
              return [memo(() => JSON.stringify(props.mutation.options.mutationKey)), " -", " "];
            }
          }), null);
          insert(_el$57, () => new Date(props.mutation.state.submittedAt).toLocaleString(), null);
          createRenderEffect((_p$) => {
            var _v$27 = clsx(styles().queryRow, selectedMutationId() === props.mutation.mutationId && styles().selectedQueryRow, "tsqd-query-row"), _v$28 = `Mutation submitted at ${new Date(props.mutation.state.submittedAt).toLocaleString()}`, _v$29 = clsx(getObserverCountColorStyles(), "tsqd-query-observer-count");
            _v$27 !== _p$.e && className(_el$55, _p$.e = _v$27);
            _v$28 !== _p$.t && setAttribute(_el$55, "aria-label", _p$.t = _v$28);
            _v$29 !== _p$.a && className(_el$56, _p$.a = _v$29);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          });
          return _el$55;
        }
      });
    };
    QueryStatusCount = () => {
      const stale = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().getAll().filter((q) => getQueryStatusLabel(q) === "stale").length);
      const fresh = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().getAll().filter((q) => getQueryStatusLabel(q) === "fresh").length);
      const fetching = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().getAll().filter((q) => getQueryStatusLabel(q) === "fetching").length);
      const paused = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().getAll().filter((q) => getQueryStatusLabel(q) === "paused").length);
      const inactive = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().getAll().filter((q) => getQueryStatusLabel(q) === "inactive").length);
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      return (() => {
        var _el$58 = _tmpl$26();
        insert(_el$58, createComponent(QueryStatus, {
          label: "Fresh",
          color: "green",
          get count() {
            return fresh();
          }
        }), null);
        insert(_el$58, createComponent(QueryStatus, {
          label: "Fetching",
          color: "blue",
          get count() {
            return fetching();
          }
        }), null);
        insert(_el$58, createComponent(QueryStatus, {
          label: "Paused",
          color: "purple",
          get count() {
            return paused();
          }
        }), null);
        insert(_el$58, createComponent(QueryStatus, {
          label: "Stale",
          color: "yellow",
          get count() {
            return stale();
          }
        }), null);
        insert(_el$58, createComponent(QueryStatus, {
          label: "Inactive",
          color: "gray",
          get count() {
            return inactive();
          }
        }), null);
        createRenderEffect(() => className(_el$58, clsx(styles().queryStatusContainer, "tsqd-query-status-container")));
        return _el$58;
      })();
    };
    MutationStatusCount = () => {
      const success = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
        isPaused: m.state.isPaused,
        status: m.state.status
      }) === "green").length);
      const pending = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
        isPaused: m.state.isPaused,
        status: m.state.status
      }) === "yellow").length);
      const paused = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
        isPaused: m.state.isPaused,
        status: m.state.status
      }) === "purple").length);
      const error = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
        isPaused: m.state.isPaused,
        status: m.state.status
      }) === "red").length);
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      return (() => {
        var _el$59 = _tmpl$26();
        insert(_el$59, createComponent(QueryStatus, {
          label: "Paused",
          color: "purple",
          get count() {
            return paused();
          }
        }), null);
        insert(_el$59, createComponent(QueryStatus, {
          label: "Pending",
          color: "yellow",
          get count() {
            return pending();
          }
        }), null);
        insert(_el$59, createComponent(QueryStatus, {
          label: "Success",
          color: "green",
          get count() {
            return success();
          }
        }), null);
        insert(_el$59, createComponent(QueryStatus, {
          label: "Error",
          color: "red",
          get count() {
            return error();
          }
        }), null);
        createRenderEffect(() => className(_el$59, clsx(styles().queryStatusContainer, "tsqd-query-status-container")));
        return _el$59;
      })();
    };
    QueryStatus = (props) => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const {
        colors,
        alpha
      } = tokens;
      const t2 = (light, dark) => theme() === "dark" ? dark : light;
      let tagRef;
      const [mouseOver, setMouseOver] = createSignal(false);
      const [focused, setFocused] = createSignal(false);
      const showLabel = createMemo(() => {
        if (selectedQueryHash()) {
          if (panelWidth() < firstBreakpoint && panelWidth() > secondBreakpoint) {
            return false;
          }
        }
        if (panelWidth() < secondBreakpoint) {
          return false;
        }
        return true;
      });
      return (() => {
        var _el$60 = _tmpl$29(), _el$62 = _el$60.firstChild, _el$64 = _el$62.nextSibling;
        var _ref$5 = tagRef;
        typeof _ref$5 === "function" ? use(_ref$5, _el$60) : tagRef = _el$60;
        _el$60.addEventListener("mouseleave", () => {
          setMouseOver(false);
          setFocused(false);
        });
        _el$60.addEventListener("mouseenter", () => setMouseOver(true));
        _el$60.addEventListener("blur", () => setFocused(false));
        _el$60.addEventListener("focus", () => setFocused(true));
        spread(_el$60, mergeProps({
          get disabled() {
            return showLabel();
          },
          get ["class"]() {
            return clsx(styles().queryStatusTag, !showLabel() && css`
            cursor: pointer;
            &:hover {
              background: ${t2(colors.gray[200], colors.darkGray[400])}${alpha[80]};
            }
          `, "tsqd-query-status-tag", `tsqd-query-status-tag-${props.label.toLowerCase()}`);
          }
        }, () => mouseOver() || focused() ? {
          "aria-describedby": "tsqd-status-tooltip"
        } : {}), false, true);
        insert(_el$60, createComponent(Show, {
          get when() {
            return memo(() => !!!showLabel())() && (mouseOver() || focused());
          },
          get children() {
            var _el$61 = _tmpl$27();
            insert(_el$61, () => props.label);
            createRenderEffect(() => className(_el$61, clsx(styles().statusTooltip, "tsqd-query-status-tooltip")));
            return _el$61;
          }
        }), _el$62);
        insert(_el$60, createComponent(Show, {
          get when() {
            return showLabel();
          },
          get children() {
            var _el$63 = _tmpl$28();
            insert(_el$63, () => props.label);
            createRenderEffect(() => className(_el$63, clsx(styles().queryStatusTagLabel, "tsqd-query-status-tag-label")));
            return _el$63;
          }
        }), _el$64);
        insert(_el$64, () => props.count);
        createRenderEffect((_p$) => {
          var _v$30 = clsx(css`
            width: ${tokens.size[1.5]};
            height: ${tokens.size[1.5]};
            border-radius: ${tokens.border.radius.full};
            background-color: ${tokens.colors[props.color][500]};
          `, "tsqd-query-status-tag-dot"), _v$31 = clsx(styles().queryStatusCount, props.count > 0 && props.color !== "gray" && css`
              background-color: ${t2(colors[props.color][100], colors[props.color][900])};
              color: ${t2(colors[props.color][700], colors[props.color][300])};
            `, "tsqd-query-status-tag-count");
          _v$30 !== _p$.e && className(_el$62, _p$.e = _v$30);
          _v$31 !== _p$.t && className(_el$64, _p$.t = _v$31);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$60;
      })();
    };
    QueryDetails = () => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const {
        colors
      } = tokens;
      const t2 = (light, dark) => theme() === "dark" ? dark : light;
      const queryClient2 = useQueryDevtoolsContext().client;
      const [restoringLoading, setRestoringLoading] = createSignal(false);
      const [dataMode, setDataMode] = createSignal("view");
      const [dataEditError, setDataEditError] = createSignal(false);
      const errorTypes = createMemo(() => {
        return useQueryDevtoolsContext().errorTypes || [];
      });
      const activeQuery = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().getAll().find((query) => query.queryHash === selectedQueryHash()), false);
      const activeQueryFresh = createSubscribeToQueryCacheBatcher((queryCache2) => {
        return queryCache2().getAll().find((query) => query.queryHash === selectedQueryHash());
      }, false);
      const activeQueryState = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().getAll().find((query) => query.queryHash === selectedQueryHash())?.state, false);
      const activeQueryStateData = createSubscribeToQueryCacheBatcher((queryCache2) => {
        return queryCache2().getAll().find((query) => query.queryHash === selectedQueryHash())?.state.data;
      }, false);
      const statusLabel = createSubscribeToQueryCacheBatcher((queryCache2) => {
        const query = queryCache2().getAll().find((q) => q.queryHash === selectedQueryHash());
        if (!query) return "inactive";
        return getQueryStatusLabel(query);
      });
      const queryStatus = createSubscribeToQueryCacheBatcher((queryCache2) => {
        const query = queryCache2().getAll().find((q) => q.queryHash === selectedQueryHash());
        if (!query) return "pending";
        return query.state.status;
      });
      const observerCount = createSubscribeToQueryCacheBatcher((queryCache2) => queryCache2().getAll().find((query) => query.queryHash === selectedQueryHash())?.getObserversCount() ?? 0);
      const color = createMemo(() => getQueryStatusColorByLabel(statusLabel()));
      const handleRefetch = () => {
        sendDevToolsEvent({
          type: "REFETCH",
          queryHash: activeQuery()?.queryHash
        });
        const promise = activeQuery()?.fetch();
        promise?.catch(() => {
        });
      };
      const triggerError = (errorType) => {
        const activeQueryVal = activeQuery();
        if (!activeQueryVal) return;
        sendDevToolsEvent({
          type: "TRIGGER_ERROR",
          queryHash: activeQueryVal.queryHash,
          metadata: {
            error: errorType?.name
          }
        });
        const error = errorType?.initializer(activeQueryVal) ?? new Error("Unknown error from devtools");
        const __previousQueryOptions = activeQueryVal.options;
        activeQueryVal.setState({
          status: "error",
          error,
          fetchMeta: {
            ...activeQueryVal.state.fetchMeta,
            __previousQueryOptions
          }
        });
      };
      const restoreQueryAfterLoadingOrError = () => {
        const activeQueryVal = activeQuery();
        if (!activeQueryVal) return;
        sendDevToolsEvent({
          type: "RESTORE_LOADING",
          queryHash: activeQueryVal.queryHash
        });
        const previousState = activeQueryVal.state;
        const previousOptions = activeQueryVal.state.fetchMeta ? activeQueryVal.state.fetchMeta.__previousQueryOptions : null;
        activeQueryVal.cancel({
          silent: true
        });
        activeQueryVal.setState({
          ...previousState,
          fetchStatus: "idle",
          fetchMeta: null
        });
        if (previousOptions) {
          activeQueryVal.fetch(previousOptions);
        }
      };
      createEffect(() => {
        if (statusLabel() !== "fetching") {
          setRestoringLoading(false);
        }
      });
      const getQueryStatusColors = () => {
        if (color() === "gray") {
          return css`
        background-color: ${t2(colors[color()][200], colors[color()][700])};
        color: ${t2(colors[color()][700], colors[color()][300])};
        border-color: ${t2(colors[color()][400], colors[color()][600])};
      `;
        }
        return css`
      background-color: ${t2(colors[color()][100], colors[color()][900])};
      color: ${t2(colors[color()][700], colors[color()][300])};
      border-color: ${t2(colors[color()][400], colors[color()][600])};
    `;
      };
      return createComponent(Show, {
        get when() {
          return memo(() => !!activeQuery())() && activeQueryState();
        },
        get children() {
          var _el$65 = _tmpl$34(), _el$66 = _el$65.firstChild, _el$67 = _el$66.nextSibling, _el$68 = _el$67.firstChild, _el$69 = _el$68.firstChild, _el$70 = _el$69.firstChild, _el$71 = _el$69.nextSibling, _el$72 = _el$68.nextSibling, _el$73 = _el$72.firstChild, _el$74 = _el$73.nextSibling, _el$75 = _el$72.nextSibling, _el$76 = _el$75.firstChild, _el$77 = _el$76.nextSibling, _el$78 = _el$67.nextSibling, _el$79 = _el$78.nextSibling, _el$80 = _el$79.firstChild, _el$81 = _el$80.firstChild, _el$82 = _el$80.nextSibling, _el$83 = _el$82.firstChild, _el$84 = _el$82.nextSibling, _el$85 = _el$84.firstChild, _el$86 = _el$84.nextSibling, _el$87 = _el$86.firstChild, _el$88 = _el$86.nextSibling, _el$89 = _el$88.firstChild, _el$90 = _el$89.nextSibling, _el$99 = _el$79.nextSibling;
          _el$99.firstChild;
          var _el$109 = _el$99.nextSibling, _el$110 = _el$109.nextSibling;
          insert(_el$70, () => displayValue(activeQuery().queryKey, true));
          insert(_el$71, statusLabel);
          insert(_el$74, observerCount);
          insert(_el$77, () => new Date(activeQueryState().dataUpdatedAt).toLocaleTimeString());
          _el$80.$$click = handleRefetch;
          _el$82.$$click = () => {
            sendDevToolsEvent({
              type: "INVALIDATE",
              queryHash: activeQuery()?.queryHash
            });
            queryClient2.invalidateQueries(activeQuery());
          };
          _el$84.$$click = () => {
            sendDevToolsEvent({
              type: "RESET",
              queryHash: activeQuery()?.queryHash
            });
            queryClient2.resetQueries(activeQuery());
          };
          _el$86.$$click = () => {
            sendDevToolsEvent({
              type: "REMOVE",
              queryHash: activeQuery()?.queryHash
            });
            queryClient2.removeQueries(activeQuery());
            setSelectedQueryHash(null);
          };
          _el$88.$$click = () => {
            if (activeQuery()?.state.data === void 0) {
              setRestoringLoading(true);
              restoreQueryAfterLoadingOrError();
            } else {
              const activeQueryVal = activeQuery();
              if (!activeQueryVal) return;
              sendDevToolsEvent({
                type: "TRIGGER_LOADING",
                queryHash: activeQueryVal.queryHash
              });
              const __previousQueryOptions = activeQueryVal.options;
              activeQueryVal.fetch({
                ...__previousQueryOptions,
                queryFn: () => {
                  return new Promise(() => {
                  });
                },
                gcTime: -1
              });
              activeQueryVal.setState({
                data: void 0,
                status: "pending",
                fetchMeta: {
                  ...activeQueryVal.state.fetchMeta,
                  __previousQueryOptions
                }
              });
            }
          };
          insert(_el$88, () => queryStatus() === "pending" ? "Restore" : "Trigger", _el$90);
          insert(_el$79, createComponent(Show, {
            get when() {
              return errorTypes().length === 0 || queryStatus() === "error";
            },
            get children() {
              var _el$91 = _tmpl$30(), _el$92 = _el$91.firstChild, _el$93 = _el$92.nextSibling;
              _el$91.$$click = () => {
                if (!activeQuery().state.error) {
                  triggerError();
                } else {
                  sendDevToolsEvent({
                    type: "RESTORE_ERROR",
                    queryHash: activeQuery()?.queryHash
                  });
                  queryClient2.resetQueries(activeQuery());
                }
              };
              insert(_el$91, () => queryStatus() === "error" ? "Restore" : "Trigger", _el$93);
              createRenderEffect((_p$) => {
                var _v$32 = clsx(css`
                  color: ${t2(colors.red[500], colors.red[400])};
                `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-error"), _v$33 = queryStatus() === "pending", _v$34 = css`
                  background-color: ${t2(colors.red[500], colors.red[400])};
                `;
                _v$32 !== _p$.e && className(_el$91, _p$.e = _v$32);
                _v$33 !== _p$.t && (_el$91.disabled = _p$.t = _v$33);
                _v$34 !== _p$.a && className(_el$92, _p$.a = _v$34);
                return _p$;
              }, {
                e: void 0,
                t: void 0,
                a: void 0
              });
              return _el$91;
            }
          }), null);
          insert(_el$79, createComponent(Show, {
            get when() {
              return !(errorTypes().length === 0 || queryStatus() === "error");
            },
            get children() {
              var _el$94 = _tmpl$31(), _el$95 = _el$94.firstChild, _el$96 = _el$95.nextSibling, _el$97 = _el$96.nextSibling;
              _el$97.firstChild;
              _el$97.addEventListener("change", (e2) => {
                const errorType = errorTypes().find((et) => et.name === e2.currentTarget.value);
                triggerError(errorType);
              });
              insert(_el$97, createComponent(For, {
                get each() {
                  return errorTypes();
                },
                children: (errorType) => (() => {
                  var _el$111 = _tmpl$35();
                  insert(_el$111, () => errorType.name);
                  createRenderEffect(() => _el$111.value = errorType.name);
                  return _el$111;
                })()
              }), null);
              insert(_el$94, createComponent(ChevronDown, {}), null);
              createRenderEffect((_p$) => {
                var _v$35 = clsx(styles().actionsSelect, "tsqd-query-details-actions-btn", "tsqd-query-details-action-error-multiple"), _v$36 = css`
                  background-color: ${tokens.colors.red[400]};
                `, _v$37 = queryStatus() === "pending";
                _v$35 !== _p$.e && className(_el$94, _p$.e = _v$35);
                _v$36 !== _p$.t && className(_el$95, _p$.t = _v$36);
                _v$37 !== _p$.a && (_el$97.disabled = _p$.a = _v$37);
                return _p$;
              }, {
                e: void 0,
                t: void 0,
                a: void 0
              });
              return _el$94;
            }
          }), null);
          insert(_el$99, () => dataMode() === "view" ? "Explorer" : "Editor", null);
          insert(_el$65, createComponent(Show, {
            get when() {
              return dataMode() === "view";
            },
            get children() {
              var _el$101 = _tmpl$322();
              insert(_el$101, createComponent(Explorer, {
                label: "Data",
                defaultExpanded: ["Data"],
                get value() {
                  return activeQueryStateData();
                },
                editable: true,
                onEdit: () => setDataMode("edit"),
                get activeQuery() {
                  return activeQuery();
                }
              }));
              createRenderEffect((_$p) => (_$p = tokens.size[2]) != null ? _el$101.style.setProperty("padding", _$p) : _el$101.style.removeProperty("padding"));
              return _el$101;
            }
          }), _el$109);
          insert(_el$65, createComponent(Show, {
            get when() {
              return dataMode() === "edit";
            },
            get children() {
              var _el$102 = _tmpl$332(), _el$103 = _el$102.firstChild, _el$104 = _el$103.nextSibling, _el$105 = _el$104.firstChild, _el$106 = _el$105.nextSibling, _el$107 = _el$106.firstChild, _el$108 = _el$107.nextSibling;
              _el$102.addEventListener("submit", (e2) => {
                e2.preventDefault();
                const formData = new FormData(e2.currentTarget);
                const data = formData.get("data");
                try {
                  const parsedData = JSON.parse(data);
                  activeQuery().setState({
                    ...activeQuery().state,
                    data: parsedData
                  });
                  setDataMode("view");
                } catch (error) {
                  setDataEditError(true);
                }
              });
              _el$103.addEventListener("focus", () => setDataEditError(false));
              insert(_el$105, () => dataEditError() ? "Invalid Value" : "");
              _el$107.$$click = () => setDataMode("view");
              createRenderEffect((_p$) => {
                var _v$38 = clsx(styles().devtoolsEditForm, "tsqd-query-details-data-editor"), _v$39 = styles().devtoolsEditTextarea, _v$40 = dataEditError(), _v$41 = styles().devtoolsEditFormActions, _v$42 = styles().devtoolsEditFormError, _v$43 = styles().devtoolsEditFormActionContainer, _v$44 = clsx(styles().devtoolsEditFormAction, css`
                      color: ${t2(colors.gray[600], colors.gray[300])};
                    `), _v$45 = clsx(styles().devtoolsEditFormAction, css`
                      color: ${t2(colors.blue[600], colors.blue[400])};
                    `);
                _v$38 !== _p$.e && className(_el$102, _p$.e = _v$38);
                _v$39 !== _p$.t && className(_el$103, _p$.t = _v$39);
                _v$40 !== _p$.a && setAttribute(_el$103, "data-error", _p$.a = _v$40);
                _v$41 !== _p$.o && className(_el$104, _p$.o = _v$41);
                _v$42 !== _p$.i && className(_el$105, _p$.i = _v$42);
                _v$43 !== _p$.n && className(_el$106, _p$.n = _v$43);
                _v$44 !== _p$.s && className(_el$107, _p$.s = _v$44);
                _v$45 !== _p$.h && className(_el$108, _p$.h = _v$45);
                return _p$;
              }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0,
                i: void 0,
                n: void 0,
                s: void 0,
                h: void 0
              });
              createRenderEffect(() => _el$103.value = JSON.stringify(activeQueryStateData(), null, 2));
              return _el$102;
            }
          }), _el$109);
          insert(_el$110, createComponent(Explorer, {
            label: "Query",
            defaultExpanded: ["Query", "queryKey"],
            get value() {
              return activeQueryFresh();
            }
          }));
          createRenderEffect((_p$) => {
            var _v$46 = clsx(styles().detailsContainer, "tsqd-query-details-container"), _v$47 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$48 = clsx(styles().detailsBody, "tsqd-query-details-summary-container"), _v$49 = clsx(styles().queryDetailsStatus, getQueryStatusColors()), _v$50 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$51 = clsx(styles().actionsBody, "tsqd-query-details-actions-container"), _v$52 = clsx(css`
                color: ${t2(colors.blue[600], colors.blue[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-refetch"), _v$53 = statusLabel() === "fetching", _v$54 = css`
                background-color: ${t2(colors.blue[600], colors.blue[400])};
              `, _v$55 = clsx(css`
                color: ${t2(colors.yellow[600], colors.yellow[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-invalidate"), _v$56 = queryStatus() === "pending", _v$57 = css`
                background-color: ${t2(colors.yellow[600], colors.yellow[400])};
              `, _v$58 = clsx(css`
                color: ${t2(colors.gray[600], colors.gray[300])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-reset"), _v$59 = queryStatus() === "pending", _v$60 = css`
                background-color: ${t2(colors.gray[600], colors.gray[400])};
              `, _v$61 = clsx(css`
                color: ${t2(colors.pink[500], colors.pink[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-remove"), _v$62 = statusLabel() === "fetching", _v$63 = css`
                background-color: ${t2(colors.pink[500], colors.pink[400])};
              `, _v$64 = clsx(css`
                color: ${t2(colors.cyan[500], colors.cyan[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-loading"), _v$65 = restoringLoading(), _v$66 = css`
                background-color: ${t2(colors.cyan[500], colors.cyan[400])};
              `, _v$67 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$68 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$69 = tokens.size[2];
            _v$46 !== _p$.e && className(_el$65, _p$.e = _v$46);
            _v$47 !== _p$.t && className(_el$66, _p$.t = _v$47);
            _v$48 !== _p$.a && className(_el$67, _p$.a = _v$48);
            _v$49 !== _p$.o && className(_el$71, _p$.o = _v$49);
            _v$50 !== _p$.i && className(_el$78, _p$.i = _v$50);
            _v$51 !== _p$.n && className(_el$79, _p$.n = _v$51);
            _v$52 !== _p$.s && className(_el$80, _p$.s = _v$52);
            _v$53 !== _p$.h && (_el$80.disabled = _p$.h = _v$53);
            _v$54 !== _p$.r && className(_el$81, _p$.r = _v$54);
            _v$55 !== _p$.d && className(_el$82, _p$.d = _v$55);
            _v$56 !== _p$.l && (_el$82.disabled = _p$.l = _v$56);
            _v$57 !== _p$.u && className(_el$83, _p$.u = _v$57);
            _v$58 !== _p$.c && className(_el$84, _p$.c = _v$58);
            _v$59 !== _p$.w && (_el$84.disabled = _p$.w = _v$59);
            _v$60 !== _p$.m && className(_el$85, _p$.m = _v$60);
            _v$61 !== _p$.f && className(_el$86, _p$.f = _v$61);
            _v$62 !== _p$.y && (_el$86.disabled = _p$.y = _v$62);
            _v$63 !== _p$.g && className(_el$87, _p$.g = _v$63);
            _v$64 !== _p$.p && className(_el$88, _p$.p = _v$64);
            _v$65 !== _p$.b && (_el$88.disabled = _p$.b = _v$65);
            _v$66 !== _p$.T && className(_el$89, _p$.T = _v$66);
            _v$67 !== _p$.A && className(_el$99, _p$.A = _v$67);
            _v$68 !== _p$.O && className(_el$109, _p$.O = _v$68);
            _v$69 !== _p$.I && ((_p$.I = _v$69) != null ? _el$110.style.setProperty("padding", _v$69) : _el$110.style.removeProperty("padding"));
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0,
            i: void 0,
            n: void 0,
            s: void 0,
            h: void 0,
            r: void 0,
            d: void 0,
            l: void 0,
            u: void 0,
            c: void 0,
            w: void 0,
            m: void 0,
            f: void 0,
            y: void 0,
            g: void 0,
            p: void 0,
            b: void 0,
            T: void 0,
            A: void 0,
            O: void 0,
            I: void 0
          });
          return _el$65;
        }
      });
    };
    MutationDetails = () => {
      const theme = useTheme();
      const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
        target: useQueryDevtoolsContext().shadowDOMTarget
      }) : u;
      const styles = createMemo(() => {
        return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
      });
      const {
        colors
      } = tokens;
      const t2 = (light, dark) => theme() === "dark" ? dark : light;
      const isPaused = createSubscribeToMutationCacheBatcher((mutationCache) => {
        const mutations = mutationCache().getAll();
        const mutation = mutations.find((m) => m.mutationId === selectedMutationId());
        if (!mutation) return false;
        return mutation.state.isPaused;
      });
      const status = createSubscribeToMutationCacheBatcher((mutationCache) => {
        const mutations = mutationCache().getAll();
        const mutation = mutations.find((m) => m.mutationId === selectedMutationId());
        if (!mutation) return "idle";
        return mutation.state.status;
      });
      const color = createMemo(() => getMutationStatusColor({
        isPaused: isPaused(),
        status: status()
      }));
      const activeMutation = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().find((mutation) => mutation.mutationId === selectedMutationId()), false);
      const getQueryStatusColors = () => {
        if (color() === "gray") {
          return css`
        background-color: ${t2(colors[color()][200], colors[color()][700])};
        color: ${t2(colors[color()][700], colors[color()][300])};
        border-color: ${t2(colors[color()][400], colors[color()][600])};
      `;
        }
        return css`
      background-color: ${t2(colors[color()][100], colors[color()][900])};
      color: ${t2(colors[color()][700], colors[color()][300])};
      border-color: ${t2(colors[color()][400], colors[color()][600])};
    `;
      };
      return createComponent(Show, {
        get when() {
          return activeMutation();
        },
        get children() {
          var _el$112 = _tmpl$36(), _el$113 = _el$112.firstChild, _el$114 = _el$113.nextSibling, _el$115 = _el$114.firstChild, _el$116 = _el$115.firstChild, _el$117 = _el$116.firstChild, _el$118 = _el$116.nextSibling, _el$119 = _el$115.nextSibling, _el$120 = _el$119.firstChild, _el$121 = _el$120.nextSibling, _el$122 = _el$114.nextSibling, _el$123 = _el$122.nextSibling, _el$124 = _el$123.nextSibling, _el$125 = _el$124.nextSibling, _el$126 = _el$125.nextSibling, _el$127 = _el$126.nextSibling, _el$128 = _el$127.nextSibling, _el$129 = _el$128.nextSibling;
          insert(_el$117, createComponent(Show, {
            get when() {
              return activeMutation().options.mutationKey;
            },
            fallback: "No mutationKey found",
            get children() {
              return displayValue(activeMutation().options.mutationKey, true);
            }
          }));
          insert(_el$118, createComponent(Show, {
            get when() {
              return color() === "purple";
            },
            children: "pending"
          }), null);
          insert(_el$118, createComponent(Show, {
            get when() {
              return color() !== "purple";
            },
            get children() {
              return status();
            }
          }), null);
          insert(_el$121, () => new Date(activeMutation().state.submittedAt).toLocaleTimeString());
          insert(_el$123, createComponent(Explorer, {
            label: "Variables",
            defaultExpanded: ["Variables"],
            get value() {
              return activeMutation().state.variables;
            }
          }));
          insert(_el$125, createComponent(Explorer, {
            label: "Context",
            defaultExpanded: ["Context"],
            get value() {
              return activeMutation().state.context;
            }
          }));
          insert(_el$127, createComponent(Explorer, {
            label: "Data",
            defaultExpanded: ["Data"],
            get value() {
              return activeMutation().state.data;
            }
          }));
          insert(_el$129, createComponent(Explorer, {
            label: "Mutation",
            defaultExpanded: ["Mutation"],
            get value() {
              return activeMutation();
            }
          }));
          createRenderEffect((_p$) => {
            var _v$70 = clsx(styles().detailsContainer, "tsqd-query-details-container"), _v$71 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$72 = clsx(styles().detailsBody, "tsqd-query-details-summary-container"), _v$73 = clsx(styles().queryDetailsStatus, getQueryStatusColors()), _v$74 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$75 = tokens.size[2], _v$76 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$77 = tokens.size[2], _v$78 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$79 = tokens.size[2], _v$80 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$81 = tokens.size[2];
            _v$70 !== _p$.e && className(_el$112, _p$.e = _v$70);
            _v$71 !== _p$.t && className(_el$113, _p$.t = _v$71);
            _v$72 !== _p$.a && className(_el$114, _p$.a = _v$72);
            _v$73 !== _p$.o && className(_el$118, _p$.o = _v$73);
            _v$74 !== _p$.i && className(_el$122, _p$.i = _v$74);
            _v$75 !== _p$.n && ((_p$.n = _v$75) != null ? _el$123.style.setProperty("padding", _v$75) : _el$123.style.removeProperty("padding"));
            _v$76 !== _p$.s && className(_el$124, _p$.s = _v$76);
            _v$77 !== _p$.h && ((_p$.h = _v$77) != null ? _el$125.style.setProperty("padding", _v$77) : _el$125.style.removeProperty("padding"));
            _v$78 !== _p$.r && className(_el$126, _p$.r = _v$78);
            _v$79 !== _p$.d && ((_p$.d = _v$79) != null ? _el$127.style.setProperty("padding", _v$79) : _el$127.style.removeProperty("padding"));
            _v$80 !== _p$.l && className(_el$128, _p$.l = _v$80);
            _v$81 !== _p$.u && ((_p$.u = _v$81) != null ? _el$129.style.setProperty("padding", _v$81) : _el$129.style.removeProperty("padding"));
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0,
            i: void 0,
            n: void 0,
            s: void 0,
            h: void 0,
            r: void 0,
            d: void 0,
            l: void 0,
            u: void 0
          });
          return _el$112;
        }
      });
    };
    queryCacheMap = /* @__PURE__ */ new Map();
    setupQueryCacheSubscription = () => {
      const queryCache2 = createMemo(() => {
        const client = useQueryDevtoolsContext().client;
        return client.getQueryCache();
      });
      const unsubscribe = queryCache2().subscribe((q) => {
        batch(() => {
          for (const [callback, value] of queryCacheMap.entries()) {
            if (!value.shouldUpdate(q)) continue;
            value.setter(callback(queryCache2));
          }
        });
      });
      onCleanup(() => {
        queryCacheMap.clear();
        unsubscribe();
      });
      return unsubscribe;
    };
    createSubscribeToQueryCacheBatcher = (callback, equalityCheck = true, shouldUpdate = () => true) => {
      const queryCache2 = createMemo(() => {
        const client = useQueryDevtoolsContext().client;
        return client.getQueryCache();
      });
      const [value, setValue] = createSignal(callback(queryCache2), !equalityCheck ? {
        equals: false
      } : void 0);
      createEffect(() => {
        setValue(callback(queryCache2));
      });
      queryCacheMap.set(callback, {
        setter: setValue,
        shouldUpdate
      });
      onCleanup(() => {
        queryCacheMap.delete(callback);
      });
      return value;
    };
    mutationCacheMap = /* @__PURE__ */ new Map();
    setupMutationCacheSubscription = () => {
      const mutationCache = createMemo(() => {
        const client = useQueryDevtoolsContext().client;
        return client.getMutationCache();
      });
      const unsubscribe = mutationCache().subscribe(() => {
        for (const [callback, setter] of mutationCacheMap.entries()) {
          queueMicrotask(() => {
            setter(callback(mutationCache));
          });
        }
      });
      onCleanup(() => {
        mutationCacheMap.clear();
        unsubscribe();
      });
      return unsubscribe;
    };
    createSubscribeToMutationCacheBatcher = (callback, equalityCheck = true) => {
      const mutationCache = createMemo(() => {
        const client = useQueryDevtoolsContext().client;
        return client.getMutationCache();
      });
      const [value, setValue] = createSignal(callback(mutationCache), !equalityCheck ? {
        equals: false
      } : void 0);
      createEffect(() => {
        setValue(callback(mutationCache));
      });
      mutationCacheMap.set(callback, setValue);
      onCleanup(() => {
        mutationCacheMap.delete(callback);
      });
      return value;
    };
    DEV_TOOLS_EVENT = "@tanstack/query-devtools-event";
    sendDevToolsEvent = ({
      type,
      queryHash,
      metadata
    }) => {
      const event = new CustomEvent(DEV_TOOLS_EVENT, {
        detail: {
          type,
          queryHash,
          metadata
        },
        bubbles: true,
        cancelable: true
      });
      window.dispatchEvent(event);
    };
    stylesFactory2 = (theme, css) => {
      const {
        colors,
        font,
        size: size3,
        alpha,
        shadow,
        border
      } = tokens;
      const t2 = (light, dark) => theme === "light" ? light : dark;
      return {
        devtoolsBtn: css`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${shadow.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${colors.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,
        panel: css`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${tokens.size[0.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${t2(colors.gray[300], colors.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${t2(colors.gray[400], colors.darkGray[300])};
      }
    `,
        parentPanel: css`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${tokens.size[0.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${t2(colors.gray[300], colors.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${t2(colors.gray[400], colors.darkGray[300])};
      }
    `,
        "devtoolsBtn-position-bottom-right": css`
      bottom: 12px;
      right: 12px;
    `,
        "devtoolsBtn-position-bottom-left": css`
      bottom: 12px;
      left: 12px;
    `,
        "devtoolsBtn-position-top-left": css`
      top: 12px;
      left: 12px;
    `,
        "devtoolsBtn-position-top-right": css`
      top: 12px;
      right: 12px;
    `,
        "devtoolsBtn-position-relative": css`
      position: relative;
    `,
        "panel-position-top": css`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${size3[14]};
      border-bottom: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
    `,
        "panel-position-bottom": css`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${size3[14]};
      border-top: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
    `,
        "panel-position-right": css`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      max-width: 90%;
    `,
        "panel-position-left": css`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      max-width: 90%;
    `,
        closeBtn: css`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${t2(colors.gray[50], colors.darkGray[700])};
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${colors.blue[600]};
      }
      & svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
        width: ${size3[2]};
        height: ${size3[2]};
      }
    `,
        "closeBtn-position-top": css`
      bottom: 0;
      right: ${size3[2]};
      transform: translate(0, 100%);
      border-right: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-left: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${border.radius.sm} ${border.radius.sm};
      padding: ${size3[0.5]} ${size3[1.5]} ${size3[1]} ${size3[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${size3[2.5]};
        height: ${size3[1.5]};
        width: calc(100% + ${size3[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,
        "closeBtn-position-bottom": css`
      top: 0;
      right: ${size3[2]};
      transform: translate(0, -100%);
      border-right: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-left: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${border.radius.sm} ${border.radius.sm} 0px 0px;
      padding: ${size3[1]} ${size3[1.5]} ${size3[0.5]} ${size3[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${size3[2.5]};
        height: ${size3[1.5]};
        width: calc(100% + ${size3[5]});
      }
    `,
        "closeBtn-position-right": css`
      bottom: ${size3[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: ${border.radius.sm} 0px 0px ${border.radius.sm};
      padding: ${size3[1.5]} ${size3[0.5]} ${size3[1.5]} ${size3[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${size3[5]});
        width: ${size3[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,
        "closeBtn-position-left": css`
      bottom: ${size3[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: 0px ${border.radius.sm} ${border.radius.sm} 0px;
      padding: ${size3[1.5]} ${size3[1]} ${size3[1.5]} ${size3[0.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${size3[5]});
        width: ${size3[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,
        queriesContainer: css`
      flex: 1 1 700px;
      background-color: ${t2(colors.gray[50], colors.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,
        dragHandle: css`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${colors.purple[400]}${t2("", alpha[90])};
      }
      z-index: 4;
    `,
        "dragHandle-position-top": css`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,
        "dragHandle-position-bottom": css`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,
        "dragHandle-position-right": css`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,
        "dragHandle-position-left": css`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,
        row: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${tokens.size[2]} ${tokens.size[2.5]};
      gap: ${tokens.size[2.5]};
      border-bottom: ${t2(colors.gray[300], colors.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${size3[0.5]};
        flex-direction: column;
      }
    `,
        logoAndToggleContainer: css`
      display: flex;
      gap: ${tokens.size[3]};
      align-items: center;
    `,
        logo: css`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${tokens.size[0.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
        tanstackLogo: css`
      font-size: ${font.size.md};
      font-weight: ${font.weight.bold};
      line-height: ${font.lineHeight.xs};
      white-space: nowrap;
      color: ${t2(colors.gray[600], colors.gray[300])};
    `,
        queryFlavorLogo: css`
      font-weight: ${font.weight.semibold};
      font-size: ${font.size.xs};
      background: linear-gradient(
        to right,
        ${t2("#ea4037, #ff9b11", "#dd524b, #e9a03b")}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,
        queryStatusContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
      height: min-content;
    `,
        queryStatusTag: css`
      display: flex;
      gap: ${tokens.size[1.5]};
      box-sizing: border-box;
      height: ${tokens.size[6.5]};
      background: ${t2(colors.gray[50], colors.darkGray[500])};
      color: ${t2(colors.gray[700], colors.gray[300])};
      border-radius: ${tokens.border.radius.sm};
      font-size: ${font.size.sm};
      padding: ${tokens.size[1]};
      padding-left: ${tokens.size[1.5]};
      align-items: center;
      font-weight: ${font.weight.medium};
      border: ${t2("1px solid " + colors.gray[300], "1px solid transparent")};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
    `,
        queryStatusTagLabel: css`
      font-size: ${font.size.xs};
    `,
        queryStatusCount: css`
      font-size: ${font.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${t2(colors.gray[500], colors.gray[400])};
      background-color: ${t2(colors.gray[200], colors.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${tokens.size[4.5]};
    `,
        statusTooltip: css`
      position: absolute;
      z-index: 1;
      background-color: ${t2(colors.gray[50], colors.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${tokens.size[2]}));
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      border-radius: ${tokens.border.radius.sm};
      font-size: ${font.size.xs};
      border: 1px solid ${t2(colors.gray[400], colors.gray[600])};
      color: ${t2(colors["gray"][600], colors["gray"][300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${t2(colors.gray[400], colors.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${t2(colors.gray[100], colors.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,
        filtersContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
      & > button {
        cursor: pointer;
        padding: ${tokens.size[0.5]} ${tokens.size[1.5]} ${tokens.size[0.5]}
          ${tokens.size[2]};
        border-radius: ${tokens.border.radius.sm};
        background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
        color: ${t2(colors.gray[700], colors.gray[300])};
        font-size: ${font.size.xs};
        display: flex;
        align-items: center;
        line-height: ${font.lineHeight.sm};
        gap: ${tokens.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${border.radius.xs};
          outline: 2px solid ${colors.blue[800]};
        }
        & svg {
          width: ${tokens.size[3]};
          height: ${tokens.size[3]};
          color: ${t2(colors.gray[500], colors.gray[400])};
        }
      }
    `,
        filterInput: css`
      padding: ${size3[0.5]} ${size3[2]};
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t2(colors.gray[100], colors.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${tokens.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      height: min-content;
      color: ${t2(colors.gray[600], colors.gray[400])};
      & > svg {
        width: ${size3[3]};
        height: ${size3[3]};
      }
      & input {
        font-size: ${font.size.xs};
        width: 100%;
        background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${font.lineHeight.sm};
        color: ${t2(colors.gray[700], colors.gray[300])};
        &::placeholder {
          color: ${t2(colors.gray[700], colors.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
        filterSelect: css`
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t2(colors.gray[100], colors.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${tokens.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
      & > select {
        appearance: none;
        color: ${t2(colors.gray[700], colors.gray[300])};
        min-width: 100px;
        line-height: ${font.lineHeight.sm};
        font-size: ${font.size.xs};
        background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
        actionsContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
    `,
        actionsBtn: css`
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t2(colors.gray[100], colors.darkGray[400])};
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      width: ${tokens.size[6.5]};
      height: ${tokens.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${tokens.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      & svg {
        color: ${t2(colors.gray[700], colors.gray[300])};
        width: ${tokens.size[3]};
        height: ${tokens.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
        actionsBtnOffline: css`
      & svg {
        stroke: ${t2(colors.yellow[700], colors.yellow[500])};
        fill: ${t2(colors.yellow[700], colors.yellow[500])};
      }
    `,
        overflowQueryContainer: css`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,
        queryRow: css`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${t2(colors.gray[700], colors.gray[300])};
      background-color: ${t2(colors.gray[50], colors.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${t2(colors.gray[200], colors.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${tokens.size[1]};
        user-select: none;
        min-width: ${tokens.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${font.size.xs};
        font-weight: ${font.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${t2(colors.gray[300], colors.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${font.size.xs};
        display: flex;
        align-items: center;
        min-height: ${tokens.size[6]};
        flex: 1;
        padding: ${tokens.size[1]} ${tokens.size[2]};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${tokens.size[2]};
        color: ${t2(colors.gray[800], colors.gray[300])};
        background-color: ${t2(colors.gray[300], colors.darkGray[600])};
        border-bottom: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
        font-size: ${font.size.xs};
      }

      & .tsqd-query-static-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${tokens.size[2]};
        color: ${t2(colors.teal[800], colors.teal[300])};
        background-color: ${t2(colors.teal[100], colors.teal[900])};
        border-bottom: 1px solid ${t2(colors.teal[300], colors.teal[700])};
        font-size: ${font.size.xs};
      }
    `,
        selectedQueryRow: css`
      background-color: ${t2(colors.gray[200], colors.darkGray[500])};
    `,
        detailsContainer: css`
      flex: 1 1 700px;
      background-color: ${t2(colors.gray[50], colors.darkGray[700])};
      color: ${t2(colors.gray[700], colors.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,
        detailsHeader: css`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${t2(colors.gray[200], colors.darkGray[600])};
      padding: ${tokens.size[1.5]} ${tokens.size[2]};
      font-weight: ${font.weight.medium};
      font-size: ${font.size.xs};
      line-height: ${font.lineHeight.xs};
      text-align: left;
    `,
        detailsBody: css`
      margin: ${tokens.size[1.5]} 0px ${tokens.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${tokens.size[2]};
        line-height: ${font.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${font.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${tokens.size[1.5]};
      }

      & code {
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${font.size.xs};
        line-height: ${font.lineHeight.xs};
        max-width: 100%;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,
        queryDetailsStatus: css`
      border: 1px solid ${colors.darkGray[200]};
      border-radius: ${tokens.border.radius.sm};
      font-weight: ${font.weight.medium};
      padding: ${tokens.size[1]} ${tokens.size[2.5]};
    `,
        actionsBody: css`
      flex-wrap: wrap;
      margin: ${tokens.size[2]} 0px ${tokens.size[2]} 0px;
      display: flex;
      gap: ${tokens.size[2]};
      padding: 0px ${tokens.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${font.size.xs};
        padding: ${tokens.size[1]} ${tokens.size[2]};
        display: flex;
        border-radius: ${tokens.border.radius.sm};
        background-color: ${t2(colors.gray[100], colors.darkGray[600])};
        border: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
        align-items: center;
        gap: ${tokens.size[2]};
        font-weight: ${font.weight.medium};
        line-height: ${font.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${border.radius.xs};
          outline: 2px solid ${colors.blue[800]};
        }
        &:hover {
          background-color: ${t2(colors.gray[200], colors.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${size3[1.5]};
          height: ${size3[1.5]};
          border-radius: ${tokens.border.radius.full};
        }
      }
    `,
        actionsSelect: css`
      font-size: ${font.size.xs};
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      display: flex;
      border-radius: ${tokens.border.radius.sm};
      overflow: hidden;
      background-color: ${t2(colors.gray[100], colors.darkGray[600])};
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
      align-items: center;
      gap: ${tokens.size[2]};
      font-weight: ${font.weight.medium};
      line-height: ${font.lineHeight.sm};
      color: ${t2(colors.red[500], colors.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      & > span {
        width: ${size3[1.5]};
        height: ${size3[1.5]};
        border-radius: ${tokens.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${tokens.colors.red[400]};
      }
      & svg {
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
    `,
        settingsMenu: css`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${size3[0.5]};
      border-radius: ${tokens.border.radius.sm};
      border: 1px solid ${t2(colors.gray[300], colors.gray[700])};
      background-color: ${t2(colors.gray[50], colors.darkGray[600])};
      font-size: ${font.size.xs};
      color: ${t2(colors.gray[700], colors.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${size3[0.5]};
    `,
        settingsSubTrigger: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${tokens.border.radius.xs};
      padding: ${tokens.size[1]} ${tokens.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${t2(colors.gray[700], colors.gray[300])};
      & svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
        transform: rotate(-90deg);
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
        settingsMenuHeader: css`
      padding: ${tokens.size[1]} ${tokens.size[1]};
      font-weight: ${font.weight.medium};
      border-bottom: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
      color: ${t2(colors.gray[500], colors.gray[400])};
      font-size: ${font.size["xs"]};
    `,
        settingsSubButton: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${t2(colors.gray[700], colors.gray[300])};
      font-size: ${font.size["xs"]};
      border-radius: ${tokens.border.radius.xs};
      padding: ${tokens.size[1]} ${tokens.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
      }
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
    `,
        themeSelectedButton: css`
      background-color: ${t2(colors.purple[100], colors.purple[900])};
      color: ${t2(colors.purple[700], colors.purple[300])};
      & svg {
        color: ${t2(colors.purple[700], colors.purple[300])};
      }
      &:hover {
        background-color: ${t2(colors.purple[100], colors.purple[900])};
      }
    `,
        viewToggle: css`
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t2(colors.gray[200], colors.darkGray[600])};
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${font.size.xs};
      color: ${t2(colors.gray[700], colors.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${colors.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${font.lineHeight.md};
        }

        & label:hover {
          background-color: ${t2(colors.gray[100], colors.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        & label:hover {
          background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${tokens.size[1.5]} 0 ${tokens.size[2]};
        }
        border-right: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${tokens.size[2]} 0 ${tokens.size[1.5]};
        }
      }
    `,
        devtoolsEditForm: css`
      padding: ${size3[2]};
      & > [data-error='true'] {
        outline: 2px solid ${t2(colors.red[200], colors.red[800])};
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
      }
    `,
        devtoolsEditTextarea: css`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${font.size.xs};
      border-radius: ${border.radius.sm};
      field-sizing: content;
      padding: ${size3[2]};
      background-color: ${t2(colors.gray[100], colors.darkGray[800])};
      color: ${t2(colors.gray[900], colors.gray[100])};
      border: 1px solid ${t2(colors.gray[200], colors.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${t2(colors.blue[200], colors.blue[800])};
      }
    `,
        devtoolsEditFormActions: css`
      display: flex;
      justify-content: space-between;
      gap: ${size3[2]};
      align-items: center;
      padding-top: ${size3[1]};
      font-size: ${font.size.xs};
    `,
        devtoolsEditFormError: css`
      color: ${t2(colors.red[700], colors.red[500])};
    `,
        devtoolsEditFormActionContainer: css`
      display: flex;
      gap: ${size3[2]};
    `,
        devtoolsEditFormAction: css`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${font.size.xs};
      padding: ${size3[1]} ${tokens.size[2]};
      display: flex;
      border-radius: ${border.radius.sm};
      background-color: ${t2(colors.gray[100], colors.darkGray[600])};
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
      align-items: center;
      gap: ${size3[2]};
      font-weight: ${font.weight.medium};
      line-height: ${font.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `
      };
    };
    lightStyles2 = (css) => stylesFactory2("light", css);
    darkStyles2 = (css) => stylesFactory2("dark", css);
    delegateEvents(["click", "mousedown", "input"]);
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/DevtoolsComponent/NCMVHL6D.js
var NCMVHL6D_exports = {};
__export(NCMVHL6D_exports, {
  default: () => DevtoolsComponent_default
});
var DevtoolsComponent, DevtoolsComponent_default;
var init_NCMVHL6D = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/DevtoolsComponent/NCMVHL6D.js"() {
    init_ZDWCUMSJ();
    init_EIDV623S();
    DevtoolsComponent = (props) => {
      const [localStore, setLocalStore] = createLocalStorage({
        prefix: "TanstackQueryDevtools"
      });
      const colorScheme = getPreferredColorScheme();
      const theme = createMemo(() => {
        const preference = localStore.theme_preference || THEME_PREFERENCE;
        if (preference !== "system") return preference;
        return colorScheme();
      });
      return createComponent(QueryDevtoolsContext.Provider, {
        value: props,
        get children() {
          return createComponent(PiPProvider, {
            localStore,
            setLocalStore,
            get children() {
              return createComponent(ThemeContext.Provider, {
                value: theme,
                get children() {
                  return createComponent(Devtools, {
                    localStore,
                    setLocalStore
                  });
                }
              });
            }
          });
        }
      });
    };
    DevtoolsComponent_default = DevtoolsComponent;
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/DevtoolsPanelComponent/2AITGKQY.js
var AITGKQY_exports = {};
__export(AITGKQY_exports, {
  default: () => DevtoolsPanelComponent_default
});
var DevtoolsPanelComponent, DevtoolsPanelComponent_default;
var init_AITGKQY = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/DevtoolsPanelComponent/2AITGKQY.js"() {
    init_ZDWCUMSJ();
    init_EIDV623S();
    DevtoolsPanelComponent = (props) => {
      const [localStore, setLocalStore] = createLocalStorage({
        prefix: "TanstackQueryDevtools"
      });
      const colorScheme = getPreferredColorScheme();
      const theme = createMemo(() => {
        const preference = localStore.theme_preference || THEME_PREFERENCE;
        if (preference !== "system") return preference;
        return colorScheme();
      });
      return createComponent(QueryDevtoolsContext.Provider, {
        value: props,
        get children() {
          return createComponent(PiPProvider, {
            disabled: true,
            localStore,
            setLocalStore,
            get children() {
              return createComponent(ThemeContext.Provider, {
                value: theme,
                get children() {
                  return createComponent(ParentPanel, {
                    get children() {
                      return createComponent(ContentView, {
                        localStore,
                        setLocalStore,
                        get onClose() {
                          return props.onClose;
                        },
                        showPanelViewOnly: true
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    };
    DevtoolsPanelComponent_default = DevtoolsPanelComponent;
  }
});

// ../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/index.js
var TanstackQueryDevtools, TanstackQueryDevtoolsPanel;
var init_build = __esm({
  "../../../node_modules/.pnpm/@tanstack+query-devtools@5.90.1/node_modules/@tanstack/query-devtools/build/index.js"() {
    init_EIDV623S();
    TanstackQueryDevtools = class {
      #client;
      #onlineManager;
      #queryFlavor;
      #version;
      #isMounted = false;
      #styleNonce;
      #shadowDOMTarget;
      #buttonPosition;
      #position;
      #initialIsOpen;
      #errorTypes;
      #hideDisabledQueries;
      #Component;
      #dispose;
      constructor(config) {
        const {
          client,
          queryFlavor,
          version,
          onlineManager: onlineManager2,
          buttonPosition,
          position,
          initialIsOpen,
          errorTypes,
          styleNonce,
          shadowDOMTarget,
          hideDisabledQueries
        } = config;
        this.#client = createSignal(client);
        this.#queryFlavor = queryFlavor;
        this.#version = version;
        this.#onlineManager = onlineManager2;
        this.#styleNonce = styleNonce;
        this.#shadowDOMTarget = shadowDOMTarget;
        this.#buttonPosition = createSignal(buttonPosition);
        this.#position = createSignal(position);
        this.#initialIsOpen = createSignal(initialIsOpen);
        this.#errorTypes = createSignal(errorTypes);
        this.#hideDisabledQueries = createSignal(hideDisabledQueries);
      }
      setButtonPosition(position) {
        this.#buttonPosition[1](position);
      }
      setPosition(position) {
        this.#position[1](position);
      }
      setInitialIsOpen(isOpen) {
        this.#initialIsOpen[1](isOpen);
      }
      setErrorTypes(errorTypes) {
        this.#errorTypes[1](errorTypes);
      }
      setClient(client) {
        this.#client[1](client);
      }
      mount(el) {
        if (this.#isMounted) {
          throw new Error("Devtools is already mounted");
        }
        const dispose3 = render(() => {
          const _self$ = this;
          const [btnPosition] = this.#buttonPosition;
          const [pos] = this.#position;
          const [isOpen] = this.#initialIsOpen;
          const [errors] = this.#errorTypes;
          const [hideDisabledQueries] = this.#hideDisabledQueries;
          const [queryClient2] = this.#client;
          let Devtools2;
          if (this.#Component) {
            Devtools2 = this.#Component;
          } else {
            Devtools2 = lazy(() => Promise.resolve().then(() => (init_NCMVHL6D(), NCMVHL6D_exports)));
            this.#Component = Devtools2;
          }
          setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget);
          return createComponent(Devtools2, mergeProps({
            get queryFlavor() {
              return _self$.#queryFlavor;
            },
            get version() {
              return _self$.#version;
            },
            get onlineManager() {
              return _self$.#onlineManager;
            },
            get shadowDOMTarget() {
              return _self$.#shadowDOMTarget;
            }
          }, {
            get client() {
              return queryClient2();
            },
            get buttonPosition() {
              return btnPosition();
            },
            get position() {
              return pos();
            },
            get initialIsOpen() {
              return isOpen();
            },
            get errorTypes() {
              return errors();
            },
            get hideDisabledQueries() {
              return hideDisabledQueries();
            }
          }));
        }, el);
        this.#isMounted = true;
        this.#dispose = dispose3;
      }
      unmount() {
        if (!this.#isMounted) {
          throw new Error("Devtools is not mounted");
        }
        this.#dispose?.();
        this.#isMounted = false;
      }
    };
    TanstackQueryDevtoolsPanel = class {
      #client;
      #onlineManager;
      #queryFlavor;
      #version;
      #isMounted = false;
      #styleNonce;
      #shadowDOMTarget;
      #buttonPosition;
      #position;
      #initialIsOpen;
      #errorTypes;
      #hideDisabledQueries;
      #onClose;
      #Component;
      #dispose;
      constructor(config) {
        const {
          client,
          queryFlavor,
          version,
          onlineManager: onlineManager2,
          buttonPosition,
          position,
          initialIsOpen,
          errorTypes,
          styleNonce,
          shadowDOMTarget,
          onClose,
          hideDisabledQueries
        } = config;
        this.#client = createSignal(client);
        this.#queryFlavor = queryFlavor;
        this.#version = version;
        this.#onlineManager = onlineManager2;
        this.#styleNonce = styleNonce;
        this.#shadowDOMTarget = shadowDOMTarget;
        this.#buttonPosition = createSignal(buttonPosition);
        this.#position = createSignal(position);
        this.#initialIsOpen = createSignal(initialIsOpen);
        this.#errorTypes = createSignal(errorTypes);
        this.#hideDisabledQueries = createSignal(hideDisabledQueries);
        this.#onClose = createSignal(onClose);
      }
      setButtonPosition(position) {
        this.#buttonPosition[1](position);
      }
      setPosition(position) {
        this.#position[1](position);
      }
      setInitialIsOpen(isOpen) {
        this.#initialIsOpen[1](isOpen);
      }
      setErrorTypes(errorTypes) {
        this.#errorTypes[1](errorTypes);
      }
      setClient(client) {
        this.#client[1](client);
      }
      setOnClose(onClose) {
        this.#onClose[1](() => onClose);
      }
      mount(el) {
        if (this.#isMounted) {
          throw new Error("Devtools is already mounted");
        }
        const dispose3 = render(() => {
          const _self$ = this;
          const [btnPosition] = this.#buttonPosition;
          const [pos] = this.#position;
          const [isOpen] = this.#initialIsOpen;
          const [errors] = this.#errorTypes;
          const [hideDisabledQueries] = this.#hideDisabledQueries;
          const [queryClient2] = this.#client;
          const [onClose] = this.#onClose;
          let Devtools2;
          if (this.#Component) {
            Devtools2 = this.#Component;
          } else {
            Devtools2 = lazy(() => Promise.resolve().then(() => (init_AITGKQY(), AITGKQY_exports)));
            this.#Component = Devtools2;
          }
          setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget);
          return createComponent(Devtools2, mergeProps({
            get queryFlavor() {
              return _self$.#queryFlavor;
            },
            get version() {
              return _self$.#version;
            },
            get onlineManager() {
              return _self$.#onlineManager;
            },
            get shadowDOMTarget() {
              return _self$.#shadowDOMTarget;
            }
          }, {
            get client() {
              return queryClient2();
            },
            get buttonPosition() {
              return btnPosition();
            },
            get position() {
              return pos();
            },
            get initialIsOpen() {
              return isOpen();
            },
            get errorTypes() {
              return errors();
            },
            get hideDisabledQueries() {
              return hideDisabledQueries();
            },
            get onClose() {
              return onClose();
            }
          }));
        }, el);
        this.#isMounted = true;
        this.#dispose = dispose3;
      }
      unmount() {
        if (!this.#isMounted) {
          throw new Error("Devtools is not mounted");
        }
        this.#dispose?.();
        this.#isMounted = false;
      }
    };
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query-devtools@5.90.2_@tanstack+react-query@5.90.8_react@18.3.1__react@18.3.1/node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools.js
function ReactQueryDevtools(props) {
  const queryClient2 = useQueryClient(props.client);
  const ref = React6.useRef(null);
  const {
    buttonPosition,
    position,
    initialIsOpen,
    errorTypes,
    styleNonce,
    shadowDOMTarget,
    hideDisabledQueries
  } = props;
  const [devtools] = React6.useState(
    new TanstackQueryDevtools({
      client: queryClient2,
      queryFlavor: "React Query",
      version: "5",
      onlineManager,
      buttonPosition,
      position,
      initialIsOpen,
      errorTypes,
      styleNonce,
      shadowDOMTarget,
      hideDisabledQueries
    })
  );
  React6.useEffect(() => {
    devtools.setClient(queryClient2);
  }, [queryClient2, devtools]);
  React6.useEffect(() => {
    if (buttonPosition) {
      devtools.setButtonPosition(buttonPosition);
    }
  }, [buttonPosition, devtools]);
  React6.useEffect(() => {
    if (position) {
      devtools.setPosition(position);
    }
  }, [position, devtools]);
  React6.useEffect(() => {
    devtools.setInitialIsOpen(initialIsOpen || false);
  }, [initialIsOpen, devtools]);
  React6.useEffect(() => {
    devtools.setErrorTypes(errorTypes || []);
  }, [errorTypes, devtools]);
  React6.useEffect(() => {
    if (ref.current) {
      devtools.mount(ref.current);
    }
    return () => {
      devtools.unmount();
    };
  }, [devtools]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { dir: "ltr", className: "tsqd-parent-container", ref });
}
var React6, import_jsx_runtime3;
var init_ReactQueryDevtools = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query-devtools@5.90.2_@tanstack+react-query@5.90.8_react@18.3.1__react@18.3.1/node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools.js"() {
    "use client";
    React6 = __toESM(require_react(), 1);
    init_modern2();
    init_build();
    import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query-devtools@5.90.2_@tanstack+react-query@5.90.8_react@18.3.1__react@18.3.1/node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtoolsPanel.js
function ReactQueryDevtoolsPanel(props) {
  const queryClient2 = useQueryClient(props.client);
  const ref = React7.useRef(null);
  const { errorTypes, styleNonce, shadowDOMTarget, hideDisabledQueries } = props;
  const [devtools] = React7.useState(
    new TanstackQueryDevtoolsPanel({
      client: queryClient2,
      queryFlavor: "React Query",
      version: "5",
      onlineManager,
      buttonPosition: "bottom-left",
      position: "bottom",
      initialIsOpen: true,
      errorTypes,
      styleNonce,
      shadowDOMTarget,
      onClose: props.onClose,
      hideDisabledQueries
    })
  );
  React7.useEffect(() => {
    devtools.setClient(queryClient2);
  }, [queryClient2, devtools]);
  React7.useEffect(() => {
    devtools.setOnClose(props.onClose ?? (() => {
    }));
  }, [props.onClose, devtools]);
  React7.useEffect(() => {
    devtools.setErrorTypes(errorTypes || []);
  }, [errorTypes, devtools]);
  React7.useEffect(() => {
    if (ref.current) {
      devtools.mount(ref.current);
    }
    return () => {
      devtools.unmount();
    };
  }, [devtools]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "div",
    {
      style: { height: "500px", ...props.style },
      className: "tsqd-parent-container",
      ref
    }
  );
}
var React7, import_jsx_runtime4;
var init_ReactQueryDevtoolsPanel = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query-devtools@5.90.2_@tanstack+react-query@5.90.8_react@18.3.1__react@18.3.1/node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtoolsPanel.js"() {
    "use client";
    React7 = __toESM(require_react(), 1);
    init_modern2();
    init_build();
    import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
  }
});

// ../../../node_modules/.pnpm/@tanstack+react-query-devtools@5.90.2_@tanstack+react-query@5.90.8_react@18.3.1__react@18.3.1/node_modules/@tanstack/react-query-devtools/build/modern/index.js
var modern_exports = {};
__export(modern_exports, {
  ReactQueryDevtools: () => ReactQueryDevtools2,
  ReactQueryDevtoolsPanel: () => ReactQueryDevtoolsPanel2
});
var ReactQueryDevtools2, ReactQueryDevtoolsPanel2;
var init_modern3 = __esm({
  "../../../node_modules/.pnpm/@tanstack+react-query-devtools@5.90.2_@tanstack+react-query@5.90.8_react@18.3.1__react@18.3.1/node_modules/@tanstack/react-query-devtools/build/modern/index.js"() {
    "use client";
    init_ReactQueryDevtools();
    init_ReactQueryDevtoolsPanel();
    ReactQueryDevtools2 = false ? function() {
      return null;
    } : ReactQueryDevtools;
    ReactQueryDevtoolsPanel2 = false ? function() {
      return null;
    } : ReactQueryDevtoolsPanel;
  }
});

// package-external:@wordpress/api-fetch
var require_api_fetch = __commonJS({
  "package-external:@wordpress/api-fetch"(exports, module) {
    module.exports = window.wp.apiFetch;
  }
});

// package-external:@wordpress/url
var require_url = __commonJS({
  "package-external:@wordpress/url"(exports, module) {
    module.exports = window.wp.url;
  }
});

// package-external:@wordpress/i18n
var require_i18n = __commonJS({
  "package-external:@wordpress/i18n"(exports, module) {
    module.exports = window.wp.i18n;
  }
});

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

// packages/data/build-module/providers/query-client-provider.mjs
init_modern2();
var import_react = __toESM(require_react(), 1);

// packages/data/build-module/providers/global-error-manager.mjs
var GlobalErrorManager = class {
  error = null;
  listeners = /* @__PURE__ */ new Set();
  getError = () => this.error;
  setError = (error) => {
    if (this.error === error) {
      return;
    }
    this.error = error;
    this.listeners.forEach((listener) => listener());
  };
  clearError = () => this.setError(null);
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
};
var globalErrorManager = new GlobalErrorManager();

// packages/data/build-module/providers/query-client-provider.mjs
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var DEFAULT_STALE_TIME = 5 * 60 * 1e3;
var DEFAULT_GC_TIME = 10 * 60 * 1e3;
var ReactQueryDevtools3 = true ? (0, import_react.lazy)(
  () => Promise.resolve().then(() => (init_modern3(), modern_exports)).then((d) => ({
    default: d.ReactQueryDevtools
  }))
) : null;
function getErrorStatus(error) {
  if (!error || typeof error !== "object") {
    return null;
  }
  const err = error;
  if (typeof err.status === "number") {
    return err.status;
  }
  if (err.data && typeof err.data === "object") {
    const data = err.data;
    if (typeof data.status === "number") {
      return data.status;
    }
  }
  if (err.response && typeof err.response === "object") {
    const response = err.response;
    if (typeof response.status === "number") {
      return response.status;
    }
  }
  return null;
}
var queryCache = new QueryCache({
  onError: (error) => {
    const currentError = globalErrorManager.getError();
    if (currentError === "network") {
      return;
    }
    const status = getErrorStatus(error);
    if (status === 401) {
      if (currentError !== "auth") {
        globalErrorManager.setError("auth");
      }
    } else if (status === 502 || status === 503 || status === 504) {
      if (currentError !== "auth" && currentError !== "server") {
        globalErrorManager.setError("server");
      }
    }
  },
  onSuccess: () => {
    if (globalErrorManager.getError() === "server") {
      globalErrorManager.clearError();
    }
  }
});
var queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      /*
       * Stale time is the time after which the data
       * is considered stale and a new request is made.
       * Stale time: 5 minutes
       */
      staleTime: DEFAULT_STALE_TIME,
      /*
       * GC time is the time after which the data is considered garbage
       * collected and removed from the cache.
       * GC time: 10 minutes
       */
      gcTime: DEFAULT_GC_TIME,
      /**
       * Noop fetcher to prevent react-query errors for empty queries in console.
       */
      queryFn: () => Promise.resolve(void 0)
    }
  }
});
var AnalyticsQueryClientProvider = ({ children: children2 }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: children2 }),
    ReactQueryDevtools3 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react.Suspense, { fallback: null, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ReactQueryDevtools3, { initialIsOpen: false }) })
  ] });
};

// packages/data/build-module/providers/global-error-context.mjs
init_modern2();
var import_react2 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var GlobalErrorContext = (0, import_react2.createContext)(null);
function GlobalErrorProvider({ children: children2 }) {
  const globalError = (0, import_react2.useSyncExternalStore)(
    globalErrorManager.subscribe,
    globalErrorManager.getError,
    globalErrorManager.getError
  );
  (0, import_react2.useEffect)(() => {
    if (!onlineManager.isOnline()) {
      globalErrorManager.setError("network");
    }
    const unsubscribe = onlineManager.subscribe((isOnline) => {
      if (!isOnline) {
        globalErrorManager.setError("network");
      } else if (globalErrorManager.getError() === "network") {
        globalErrorManager.clearError();
      }
    });
    return unsubscribe;
  }, []);
  const contextValue = (0, import_react2.useMemo)(
    () => ({
      globalError,
      setGlobalError: globalErrorManager.setError,
      clearGlobalError: globalErrorManager.clearError,
      isGlobalError: globalError !== null
    }),
    [globalError]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(GlobalErrorContext.Provider, { value: contextValue, children: children2 });
}
var hasWarnedAboutMissingProvider = false;
var defaultContextValue = {
  globalError: null,
  setGlobalError: () => {
  },
  clearGlobalError: () => {
  },
  isGlobalError: false
};
function useGlobalError() {
  const context = (0, import_react2.useContext)(GlobalErrorContext);
  if (context) {
    return context;
  }
  if (!hasWarnedAboutMissingProvider) {
    hasWarnedAboutMissingProvider = true;
    console.warn(
      "useGlobalError was called outside of GlobalErrorProvider. Wrap your component tree with GlobalErrorProvider."
    );
  }
  return defaultContextValue;
}

// packages/data/build-module/api/report-orders-fetch/report-orders-fetch.mjs
var import_api_fetch = __toESM(require_api_fetch(), 1);
var import_url = __toESM(require_url(), 1);

// packages/data/build-module/utils/product-filters.mjs
var PRODUCT_FILTER_KEYS = ["product_type", "virtual", "downloadable"];
function hasProductFilters(filters) {
  if (!filters || !Array.isArray(filters) || filters.length === 0) {
    return false;
  }
  return filters.some((filter) => PRODUCT_FILTER_KEYS.includes(filter.key));
}

// packages/data/build-module/api/constants.mjs
var statsProxyPath = "/jetpack-premium-analytics/v1/proxy";
var reportsPath = `${statsProxyPath}/v2/analytics/reports`;

// packages/data/build-module/api/report-orders-fetch/report-orders-fetch.mjs
async function fetchReportOrders({
  from,
  to,
  interval,
  filters,
  date_type
}) {
  const hasProductFiltersValue = hasProductFilters(filters);
  const apiUrl = hasProductFiltersValue ? `${reportsPath}/orders-by-product-type/by-date` : `${reportsPath}/orders/by-date`;
  const path = (0, import_url.addQueryArgs)(apiUrl, {
    from,
    to,
    interval,
    filters,
    date_type
  });
  return (0, import_api_fetch.default)({ path });
}

// packages/data/build-module/api/report-order-attribution-summary-fetch/report-order-attribution-summary-fetch.mjs
var import_api_fetch2 = __toESM(require_api_fetch(), 1);
var import_url2 = __toESM(require_url(), 1);
var ORDER_ATTRIBUTION_VIEWS = [
  "channel",
  "source",
  "campaign",
  "device",
  "channel-source"
];
async function fetchReportOrderAttributionSummary(params) {
  const { from, to, interval, view, compare_from, compare_to, date_type } = params;
  const queryParams = {
    from,
    to,
    interval,
    view,
    compare_from,
    compare_to,
    date_type
  };
  const path = (0, import_url2.addQueryArgs)(`${reportsPath}/order-attribution/${view}/summary`, queryParams);
  return (0, import_api_fetch2.default)({ path });
}

// packages/data/build-module/api/report-order-attribution-by-product-fetch/report-order-attribution-by-product-fetch.mjs
var import_api_fetch3 = __toESM(require_api_fetch(), 1);
var import_url3 = __toESM(require_url(), 1);
async function fetchReportOrderAttributionByProduct(params) {
  const { from, to, interval, view, filters, date_type } = params;
  const queryParams = {
    from,
    to,
    interval,
    view,
    date_type
  };
  if (filters && filters.length > 0) {
    queryParams.filters = filters;
  }
  const path = (0, import_url3.addQueryArgs)(
    `${reportsPath}/order-attribution-by-product/${view}/summary`,
    queryParams
  );
  return (0, import_api_fetch3.default)({ path });
}

// packages/data/build-module/api/report-coupons-fetch/report-coupons-fetch.mjs
var import_api_fetch4 = __toESM(require_api_fetch(), 1);
var import_url4 = __toESM(require_url(), 1);
async function fetchReportCoupons({
  from,
  to,
  interval,
  filters,
  date_type
}) {
  const path = (0, import_url4.addQueryArgs)(`${reportsPath}/coupons/`, {
    from,
    to,
    interval,
    filters,
    date_type,
    orderby: "total_sales"
  });
  return (0, import_api_fetch4.default)({ path });
}

// packages/data/build-module/api/report-coupons-by-date-fetch/report-coupons-by-date-fetch.mjs
var import_api_fetch5 = __toESM(require_api_fetch(), 1);
var import_url5 = __toESM(require_url(), 1);
async function fetchReportCouponsByDate({
  from,
  to,
  interval,
  filters,
  date_type
}) {
  const path = (0, import_url5.addQueryArgs)(`${reportsPath}/coupons/by-date`, {
    from,
    to,
    interval,
    filters,
    date_type
  });
  return (0, import_api_fetch5.default)({ path });
}

// packages/data/build-module/api/report-customers-fetch/report-customers-fetch.mjs
var import_api_fetch6 = __toESM(require_api_fetch(), 1);
var import_url6 = __toESM(require_url(), 1);
async function fetchReportCustomers({
  from,
  to,
  filters,
  date_type
}) {
  const path = (0, import_url6.addQueryArgs)(`${reportsPath}/customers/new-returning`, {
    from,
    to,
    filters,
    date_type
  });
  return (0, import_api_fetch6.default)({
    path
  });
}

// packages/data/build-module/api/report-products-fetch/report-products-fetch.mjs
var import_api_fetch7 = __toESM(require_api_fetch(), 1);
var import_url7 = __toESM(require_url(), 1);
async function fetchReportProducts(params) {
  const queryArgs = {
    from: params.from,
    to: params.to,
    date_type: params.date_type
  };
  if (params.limit) {
    queryArgs.limit = params.limit;
  }
  if (params.orderby) {
    queryArgs.orderby = params.orderby;
  }
  if (params.order) {
    queryArgs.order = params.order;
  }
  if (params.filters && params.filters.length > 0) {
    queryArgs.filters = params.filters;
  }
  return (0, import_api_fetch7.default)({
    path: (0, import_url7.addQueryArgs)(`${reportsPath}/products`, queryArgs)
  });
}

// packages/data/build-module/api/report-visitors-fetch/report-visitors-fetch.mjs
var import_api_fetch8 = __toESM(require_api_fetch(), 1);
var import_url8 = __toESM(require_url(), 1);
async function fetchReportVisitors({
  from,
  to,
  interval
}) {
  const path = (0, import_url8.addQueryArgs)(`${reportsPath}/sessions/by-date`, {
    from,
    to,
    interval
  });
  return (0, import_api_fetch8.default)({ path });
}

// packages/data/build-module/api/report-visitors-by-location-fetch/report-visitors-by-location-fetch.mjs
var import_api_fetch9 = __toESM(require_api_fetch(), 1);
var import_url9 = __toESM(require_url(), 1);
async function fetchReportVisitorsByLocation({
  from,
  to,
  interval,
  group_by,
  country_code,
  limit
}) {
  const path = (0, import_url9.addQueryArgs)(`${reportsPath}/sessions/by-location`, {
    from,
    to,
    interval,
    group_by,
    country_code,
    limit
  });
  return (0, import_api_fetch9.default)({ path });
}

// packages/data/build-module/api/report-bookings-fetch/report-bookings-fetch.mjs
var import_api_fetch10 = __toESM(require_api_fetch(), 1);
var import_url10 = __toESM(require_url(), 1);
async function fetchReportBookings({
  from,
  to,
  interval,
  filters,
  date_type
}) {
  const apiUrl = `${reportsPath}/bookings/by-date`;
  const path = (0, import_url10.addQueryArgs)(apiUrl, {
    from,
    to,
    interval,
    filters,
    date_type
  });
  return (0, import_api_fetch10.default)({ path });
}

// packages/data/build-module/api/report-sessions-by-device-fetch/report-sessions-by-device-fetch.mjs
var import_api_fetch11 = __toESM(require_api_fetch(), 1);
var import_url11 = __toESM(require_url(), 1);
async function fetchReportSessionsByDevice({
  from,
  to
}) {
  const path = (0, import_url11.addQueryArgs)(`${reportsPath}/sessions/by-device`, {
    from,
    to
  });
  return (0, import_api_fetch11.default)({ path });
}

// packages/data/build-module/api/report-export-fetch/report-export-fetch.mjs
var import_api_fetch12 = __toESM(require_api_fetch(), 1);
async function exportReport(params) {
  const path = "/wc/v3/woocommerce-analytics/reports/csv-export";
  const body = {
    report_type: Array.isArray(params.reportType) ? params.reportType : [params.reportType],
    from: params.from,
    to: params.to,
    interval: params.interval || "day",
    delivery_method: "email",
    ...params.compareFrom && params.compareTo ? {
      compare_from: params.compareFrom,
      compare_to: params.compareTo
    } : {}
  };
  return (0, import_api_fetch12.default)({
    path,
    method: "POST",
    data: body
  });
}

// packages/data/build-module/api/stats-proxy-fetch.mjs
var import_api_fetch13 = __toESM(require_api_fetch(), 1);
var import_url12 = __toESM(require_url(), 1);
function normalizeEndpoint(endpoint) {
  return endpoint.replace(/^\/+/, "");
}
function cleanQueryParams(params) {
  if (!params) {
    return void 0;
  }
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== void 0 && value !== null)
  );
  return Object.keys(cleaned).length ? cleaned : void 0;
}
function getStatsProxyPath({
  version,
  endpoint,
  params
}) {
  const path = `${statsProxyPath}/v${version}/${normalizeEndpoint(endpoint)}`;
  const queryParams = cleanQueryParams(params);
  return queryParams ? (0, import_url12.addQueryArgs)(path, queryParams) : path;
}
async function fetchStatsProxy({
  version,
  endpoint,
  params,
  method = "GET",
  body
}) {
  const path = getStatsProxyPath({ version, endpoint, params });
  return (0, import_api_fetch13.default)({
    path,
    method,
    ...method === "POST" ? { data: body } : {}
  });
}

// packages/data/build-module/utils/parsing.mjs
function safeParseInt(value, fallback = 0) {
  const num = parseInt(String(value), 10);
  return isNaN(num) ? fallback : num;
}
function safeParseFloat(value, fallback = 0) {
  const num = parseFloat(String(value));
  return isNaN(num) ? fallback : num;
}

// packages/data/build-module/processing/orders/index.mjs
function sanitizeOrderItem(item) {
  return {
    ...item,
    average_order_value: safeParseFloat(item.average_order_value),
    avg_items: safeParseFloat(item.avg_items),
    cogs_amount: safeParseFloat(item.cogs_amount),
    coupons: safeParseInt(item.coupons),
    orders_no: safeParseInt(item.orders_no),
    orders_value_gross: safeParseFloat(item.orders_value_gross),
    orders_value_net: safeParseFloat(item.orders_value_net),
    paid_orders_count: safeParseInt(item.paid_orders_count),
    paid_net_sales: safeParseFloat(item.paid_net_sales),
    product_net_revenue: safeParseFloat(item.product_net_revenue),
    profit_margin: safeParseFloat(item.profit_margin),
    refunds: safeParseFloat(item.refunds),
    total_sales: safeParseFloat(item.total_sales),
    unpaid_orders_count: safeParseInt(item.unpaid_orders_count),
    unpaid_net_sales: safeParseFloat(item.unpaid_net_sales)
  };
}
var sanitizeReportOrdersResponse = (response) => {
  return {
    summary: sanitizeOrderItem(response.summary),
    data: response.data.map(sanitizeOrderItem)
  };
};

// packages/data/build-module/queries/report-orders-query.mjs
var getReportOrdersQueryKey = (p2) => [
  "reports",
  "orders",
  p2.from,
  p2.to,
  p2.interval,
  p2.date_type,
  p2.filters || []
];
function reportOrdersQuery(params) {
  return {
    queryKey: getReportOrdersQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportOrders(params);
      return sanitizeReportOrdersResponse(response);
    },
    /**
     * Enable the query only if the from, to, and interval are set.
     */
    enabled: !!(params.from && params.to && params.interval),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/utils.mjs
function sanitizeStringNumber(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

// packages/data/build-module/processing/order-attribution/sanitize-order-attribution-summary-response.mjs
function sanitizeOrderAttributionInterval(interval) {
  return {
    time_interval: interval.time_interval,
    date_start: interval.date_start,
    date_end: interval.date_end,
    net_sales: sanitizeStringNumber(interval.net_sales)
  };
}
function sanitizeOrderAttributionPeriod(period) {
  return {
    value: sanitizeStringNumber(period.value),
    intervals: period.intervals.map(sanitizeOrderAttributionInterval)
  };
}
function sanitizeOrderAttributionSummaryItem(item) {
  return {
    item: item.item,
    current_period: sanitizeOrderAttributionPeriod(item.current_period),
    previous_period: sanitizeOrderAttributionPeriod(item.previous_period)
  };
}
function sanitizeReportOrderAttributionSummaryResponse(response) {
  return {
    view: response.view,
    order_by: response.order_by,
    data: response.data.map(sanitizeOrderAttributionSummaryItem)
  };
}

// packages/data/build-module/processing/order-attribution/normalize-order-attribution-by-product-response.mjs
function normalizeOrderAttributionByProductResponse(currentResponse, previousResponse) {
  const previousDataMap = /* @__PURE__ */ new Map();
  if (previousResponse) {
    previousResponse.data.forEach((item) => {
      previousDataMap.set(item.item, item);
    });
  }
  const normalizedData = currentResponse.data.map((currentItem) => {
    const previousItem = previousDataMap.get(currentItem.item);
    const previousValue = previousItem?.value || currentItem.value;
    const previousIntervals = previousItem?.intervals || currentItem.intervals;
    return {
      item: currentItem.item,
      current_period: {
        value: currentItem.value,
        intervals: currentItem.intervals
      },
      previous_period: {
        value: previousValue,
        intervals: previousIntervals
      }
    };
  });
  if (previousResponse) {
    previousResponse.data.forEach((previousItem) => {
      const existsInCurrent = currentResponse.data.some((item) => item.item === previousItem.item);
      if (!existsInCurrent) {
        normalizedData.push({
          item: previousItem.item,
          current_period: {
            value: "0",
            intervals: previousItem.intervals.map((interval) => ({
              ...interval,
              net_sales: "0"
            }))
          },
          previous_period: {
            value: previousItem.value,
            intervals: previousItem.intervals
          }
        });
      }
    });
  }
  return {
    view: currentResponse.view,
    order_by: currentResponse.order_by,
    data: normalizedData
  };
}

// packages/data/build-module/queries/report-order-attribution-summary-query.mjs
var getReportOrderAttributionQueryKey = (params) => [
  "reports",
  "order-attribution",
  params.view,
  params.from,
  params.to,
  params.interval,
  params.date_type,
  params.compare_from,
  params.compare_to,
  params.filters
];
function reportOrderAttributionSummaryQuery(params) {
  return {
    queryKey: getReportOrderAttributionQueryKey(params),
    queryFn: async () => {
      const hasProductFiltersValue = hasProductFilters(params.filters);
      if (hasProductFiltersValue) {
        const { compare_from, compare_to } = params;
        const shouldFetchComparison = compare_from && compare_to && (compare_from !== params.from || compare_to !== params.to);
        const [currentResponse, previousResponse] = await Promise.all([
          fetchReportOrderAttributionByProduct({
            from: params.from,
            to: params.to,
            interval: params.interval,
            view: params.view,
            filters: params.filters,
            date_type: params.date_type
          }),
          shouldFetchComparison ? fetchReportOrderAttributionByProduct({
            from: compare_from,
            to: compare_to,
            interval: params.interval,
            view: params.view,
            filters: params.filters,
            date_type: params.date_type
          }) : Promise.resolve(void 0)
        ]);
        const normalizedResponse = normalizeOrderAttributionByProductResponse(
          currentResponse,
          previousResponse
        );
        return sanitizeReportOrderAttributionSummaryResponse(normalizedResponse);
      }
      const response = await fetchReportOrderAttributionSummary(params);
      return sanitizeReportOrderAttributionSummaryResponse(response);
    },
    /**
     * Enable the query only when all required parameters are present.
     * The 'view' parameter is required for order attribution queries.
     */
    enabled: !!(params.from && params.to && params.interval && params.view),
    /**
     * Keep previous data while fetching to prevent flash of empty state.
     * This provides a smoother user experience during data refetching.
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/coupons/index.mjs
function sanitizeCouponItem(item) {
  return {
    ...item,
    discount_amount: parseFloat(item.discount_amount),
    total_sales: parseFloat(item.total_sales),
    orders_count: parseInt(item.orders_count, 10)
  };
}
function sanitizeCouponSummary(summary) {
  return {
    ...summary,
    total_sales: parseFloat(summary.total_sales),
    total_discount_amount: parseFloat(summary.total_discount_amount),
    total_orders: parseInt(summary.total_orders, 10)
  };
}
var sanitizeReportCouponsResponse = (response) => {
  return {
    summary: sanitizeCouponSummary(response.summary),
    data: response.data.map(sanitizeCouponItem)
  };
};

// packages/data/build-module/queries/report-coupons-query.mjs
var getReportCouponsQueryKey = (p2) => ["reports", "coupons", p2.from, p2.to, p2.interval, p2.date_type, p2.filters];
function reportCouponsQuery(params) {
  return {
    queryKey: getReportCouponsQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportCoupons(params);
      return sanitizeReportCouponsResponse(response);
    },
    /**
     * Enable the query only if the from, to, and interval are set.
     */
    enabled: !!(params.from && params.to && params.interval),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/coupons-by-date/index.mjs
function sanitizeItem(item) {
  return {
    ...item,
    total_orders: parseInt(item.total_orders, 10),
    orders_with_coupon: parseInt(item.orders_with_coupon, 10),
    orders_without_coupon: parseInt(item.orders_without_coupon, 10),
    total_sales: parseFloat(item.total_sales),
    sales_with_coupon: parseFloat(item.sales_with_coupon),
    sales_without_coupon: parseFloat(item.sales_without_coupon),
    total_discount_amount: parseFloat(item.total_discount_amount),
    net_sales_after_discount: parseFloat(item.net_sales_after_discount),
    coupon_usage_percentage: parseFloat(item.coupon_usage_percentage)
  };
}
function sanitizeSummary(summary) {
  return {
    ...summary,
    total_orders: parseInt(summary.total_orders, 10),
    orders_with_coupon: parseInt(summary.orders_with_coupon, 10),
    orders_without_coupon: parseInt(summary.orders_without_coupon, 10),
    total_sales: parseFloat(summary.total_sales),
    sales_with_coupon: parseFloat(summary.sales_with_coupon),
    sales_without_coupon: parseFloat(summary.sales_without_coupon),
    total_discount_amount: parseFloat(summary.total_discount_amount),
    net_sales_after_discount: parseFloat(summary.net_sales_after_discount),
    coupon_usage_percentage: parseFloat(summary.coupon_usage_percentage)
  };
}
var sanitizeReportCouponsByDateResponse = (response) => {
  return {
    summary: sanitizeSummary(response.summary),
    data: response.data.map(sanitizeItem)
  };
};

// packages/data/build-module/queries/report-coupons-by-date-query.mjs
var getQueryKey = (p2) => ["reports", "couponsByDate", p2.from, p2.to, p2.interval, p2.date_type, p2.filters];
function reportCouponsByDateQuery(params) {
  return {
    queryKey: getQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportCouponsByDate(params);
      return sanitizeReportCouponsByDateResponse(response);
    },
    /**
     * Enable the query only if the from, to, and interval are set.
     */
    enabled: !!(params.from && params.to && params.interval),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/customers/index.mjs
function sanitizeCustomerItem(item) {
  return {
    ...item,
    net_sales: parseFloat(item.net_sales),
    orders_count: parseInt(item.orders_count, 10)
  };
}
function sanitizeCustomerSummary(summary) {
  return {
    ...summary,
    total_net_sales: parseFloat(summary.total_net_sales),
    total_orders: parseInt(summary.total_orders, 10),
    new_customer_sales: parseFloat(summary.new_customer_sales),
    returning_customer_sales: parseFloat(summary.returning_customer_sales)
  };
}
var sanitizeReportCustomersResponse = (response) => {
  return {
    summary: sanitizeCustomerSummary(response.summary),
    data: response.data.map(sanitizeCustomerItem)
  };
};

// packages/data/build-module/queries/report-customers-query.mjs
var getReportCustomersQueryKey = (p2) => [
  "reports",
  "customers",
  "new-returning",
  p2.from,
  p2.to,
  p2.date_type,
  p2.filters
];
function reportCustomersQuery(params) {
  return {
    queryKey: getReportCustomersQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportCustomers(params);
      return sanitizeReportCustomersResponse(response);
    },
    /**
     * Enable the query only if the from and to are set.
     * Note: interval is not required for customers endpoint.
     */
    enabled: !!(params.from && params.to),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/api/report-customers-by-date-fetch/report-customers-by-date-fetch.mjs
var import_api_fetch14 = __toESM(require_api_fetch(), 1);
var import_url13 = __toESM(require_url(), 1);
async function fetchReportCustomersByDate({
  from,
  to,
  interval,
  date_type
}) {
  const path = (0, import_url13.addQueryArgs)(`${reportsPath}/customers/by-date`, {
    from,
    to,
    interval,
    date_type
  });
  return (0, import_api_fetch14.default)({ path });
}

// packages/data/build-module/processing/customers-by-date/index.mjs
function sanitizeCustomerByDateItem(item) {
  const totalCustomers = parseInt(item.total_customers, 10);
  return {
    ...item,
    total_customers: totalCustomers,
    new_customers: parseInt(item.new_customers, 10),
    returning_customers: parseInt(item.returning_customers, 10),
    orders_count: parseInt(item.orders_count, 10),
    new_customer_orders: parseInt(item.new_customer_orders, 10),
    returning_customer_orders: parseInt(item.returning_customer_orders, 10),
    net_sales: parseFloat(item.net_sales),
    new_customer_net_sales: parseFloat(item.new_customer_net_sales),
    returning_customer_net_sales: parseFloat(item.returning_customer_net_sales),
    // Add alias for compatibility with chart builder
    customers: totalCustomers
  };
}
function sanitizeCustomerByDateSummary(summary) {
  const totalCustomers = parseInt(summary.total_customers, 10);
  return {
    ...summary,
    total_net_sales: parseFloat(summary.total_net_sales),
    total_gross_sales: parseFloat(summary.total_gross_sales),
    total_discounts: parseFloat(summary.total_discounts),
    total_refunds: parseFloat(summary.total_refunds),
    total_orders: parseInt(summary.total_orders, 10),
    total_average_order_value: parseFloat(summary.total_average_order_value),
    total_avg_items_per_order: parseFloat(summary.total_avg_items_per_order),
    total_customers: totalCustomers,
    new_customers: parseInt(summary.new_customers, 10),
    returning_customers: parseInt(summary.returning_customers, 10),
    new_customer_sales: parseFloat(summary.new_customer_sales),
    new_customer_gross_sales: parseFloat(summary.new_customer_gross_sales),
    new_customer_discounts: parseFloat(summary.new_customer_discounts),
    new_customer_refunds: parseFloat(summary.new_customer_refunds),
    new_customer_orders: parseInt(summary.new_customer_orders, 10),
    new_customer_avg_order_value: parseFloat(summary.new_customer_avg_order_value),
    new_customer_avg_items_per_order: parseFloat(summary.new_customer_avg_items_per_order),
    returning_customer_sales: parseFloat(summary.returning_customer_sales),
    returning_customer_gross_sales: parseFloat(summary.returning_customer_gross_sales),
    returning_customer_discounts: parseFloat(summary.returning_customer_discounts),
    returning_customer_refunds: parseFloat(summary.returning_customer_refunds),
    returning_customer_orders: parseInt(summary.returning_customer_orders, 10),
    returning_customer_avg_order_value: parseFloat(summary.returning_customer_avg_order_value),
    returning_customer_avg_items_per_order: parseFloat(
      summary.returning_customer_avg_items_per_order
    ),
    // Add alias for compatibility with chart builder
    customers: totalCustomers
  };
}
var sanitizeReportCustomersByDateResponse = (response) => {
  return {
    summary: sanitizeCustomerByDateSummary(response.summary),
    data: response.data.map(sanitizeCustomerByDateItem)
  };
};

// packages/data/build-module/queries/report-customers-by-date-query.mjs
var getReportCustomersByDateQueryKey = (p2) => ["reports", "customers", "by-date", p2.from, p2.to, p2.interval, p2.date_type];
function reportCustomersByDateQuery(params) {
  return {
    queryKey: getReportCustomersByDateQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportCustomersByDate(params);
      return sanitizeReportCustomersByDateResponse(response);
    },
    /**
     * Enable the query only if the from, to, and interval are set.
     */
    enabled: !!(params.from && params.to && params.interval),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/api/report-conversion-rate-fetch/report-conversion-rate-fetch.mjs
var import_api_fetch15 = __toESM(require_api_fetch(), 1);
var import_url14 = __toESM(require_url(), 1);
async function fetchReportConversionRate({
  from,
  to,
  interval,
  filters
}) {
  const path = (0, import_url14.addQueryArgs)(`${reportsPath}/sessions/by-conversion-rate`, {
    from,
    to,
    interval,
    filters
  });
  return (0, import_api_fetch15.default)({
    path
  });
}

// packages/data/build-module/processing/conversion-rate/index.mjs
var import_i18n = __toESM(require_i18n(), 1);
function sanitizeConversionRateItem(item) {
  const activeSessionsNum = safeParseInt(item.active_sessions);
  const visitorsNum = safeParseInt(item.visitors);
  const withCartAdditionNum = safeParseInt(item.with_cart_addition);
  const reachedCheckoutNum = safeParseInt(item.reached_checkout);
  const completedCheckoutNum = safeParseInt(item.completed_checkout);
  const conversionRate = activeSessionsNum > 0 ? completedCheckoutNum / activeSessionsNum : 0;
  return {
    ...item,
    active_sessions: activeSessionsNum,
    visitors: visitorsNum,
    with_cart_addition: withCartAdditionNum,
    reached_checkout: reachedCheckoutNum,
    completed_checkout: completedCheckoutNum,
    conversion_rate: conversionRate
  };
}
var sanitizeReportConversionRateResponse = (response) => {
  const defaultSummary = {
    active_sessions: "0",
    visitors: "0",
    with_cart_addition: "0",
    reached_checkout: "0",
    completed_checkout: "0",
    date_start: "",
    date_end: ""
  };
  const sanitizedSummary = sanitizeConversionRateItem(response?.summary || defaultSummary);
  const steps = [
    {
      id: "sessions",
      label: (0, import_i18n.__)("Sessions", "jetpack-premium-analytics"),
      count: sanitizedSummary.active_sessions,
      rate: 100
      // Starting point
    },
    {
      id: "cart-addition",
      label: (0, import_i18n.__)("Cart", "jetpack-premium-analytics"),
      count: sanitizedSummary.with_cart_addition,
      rate: sanitizedSummary.active_sessions > 0 ? sanitizedSummary.with_cart_addition / sanitizedSummary.active_sessions * 100 : 0
    },
    {
      id: "checkout",
      label: (0, import_i18n.__)("Checkout", "jetpack-premium-analytics"),
      count: sanitizedSummary.reached_checkout,
      rate: sanitizedSummary.active_sessions > 0 ? sanitizedSummary.reached_checkout / sanitizedSummary.active_sessions * 100 : 0
    },
    {
      id: "completed",
      label: (0, import_i18n.__)("Purchase", "jetpack-premium-analytics"),
      count: sanitizedSummary.completed_checkout,
      rate: sanitizedSummary.active_sessions > 0 ? sanitizedSummary.completed_checkout / sanitizedSummary.active_sessions * 100 : 0
    }
  ];
  return {
    summary: sanitizedSummary,
    data: response?.data ? response.data.map(sanitizeConversionRateItem) : [],
    steps,
    overallRate: sanitizedSummary.conversion_rate
  };
};

// packages/data/build-module/queries/report-conversion-rate-query.mjs
var getReportConversionRateQueryKey = (p2) => ["reports", "conversion-rate", p2.from, p2.to, p2.interval, p2.date_type, p2.filters];
function reportConversionRateQuery(params) {
  return {
    queryKey: getReportConversionRateQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportConversionRate(params);
      return sanitizeReportConversionRateResponse(response);
    },
    /**
     * Enable the query only if the from, to, and interval are set.
     */
    enabled: !!(params.from && params.to && params.interval),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/products/index.mjs
function sanitizeProductItem(item) {
  return {
    ...item,
    product_id: parseInt(item.product_id, 10),
    orders_count: parseInt(item.orders_count, 10),
    product_net_revenue: parseFloat(item.product_net_revenue),
    total_quantity: parseInt(item.total_quantity, 10)
  };
}
function sanitizeProductSummary(summary) {
  return {
    ...summary,
    total_orders: parseInt(summary.total_orders, 10),
    total_products: parseInt(summary.total_products, 10),
    total_quantity: parseInt(summary.total_quantity, 10),
    total_revenue: parseFloat(summary.total_revenue)
  };
}
var sanitizeReportProductsResponse = (response) => {
  return {
    summary: sanitizeProductSummary(response.summary),
    data: (response.data || []).map(sanitizeProductItem)
  };
};

// packages/data/build-module/queries/report-products-query.mjs
var getReportProductsQueryKey = (p2) => [
  "reports",
  "products",
  p2.from,
  p2.to,
  p2.date_type,
  p2.limit,
  p2.orderby,
  p2.order,
  p2.filters
];
function reportProductsQuery(params) {
  return {
    queryKey: getReportProductsQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportProducts(params);
      return sanitizeReportProductsResponse(response);
    },
    /**
     * Enable the query only if the from and to are set.
     */
    enabled: !!(params.from && params.to),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/visitors/index.mjs
function sanitizeVisitorsItem(item) {
  return {
    ...item,
    active_sessions: parseInt(item.active_sessions, 10),
    visitors: parseInt(item.visitors, 10)
  };
}
var sanitizeReportVisitorsResponse = (response) => {
  const defaultSummary = {
    active_sessions: "0",
    visitors: "0",
    date_start: "",
    date_end: ""
  };
  return {
    summary: sanitizeVisitorsItem(response?.summary ?? defaultSummary),
    data: response?.data ? response.data.map(sanitizeVisitorsItem) : []
  };
};

// packages/data/build-module/queries/report-visitors-query.mjs
var getReportVisitorsQueryKey = (p2) => ["reports", "visitors", "by-date", p2.from, p2.to, p2.interval, p2.date_type];
function reportVisitorsQuery(params) {
  return {
    queryKey: getReportVisitorsQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportVisitors(params);
      return sanitizeReportVisitorsResponse(response);
    },
    /**
     * Enable the query only if the from, to, and interval are set.
     */
    enabled: !!(params.from && params.to && params.interval),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/visitors-by-location/index.mjs
function sanitizeVisitorsByLocationItem(item) {
  const visitors = Number.parseInt(item.visitors, 10);
  return {
    ...item,
    visitors: Number.isNaN(visitors) ? 0 : visitors
  };
}
function sanitizeVisitorsByLocationSummary(summary) {
  const visitors = Number.parseInt(summary.visitors, 10);
  return {
    ...summary,
    visitors: Number.isNaN(visitors) ? 0 : visitors
  };
}
var sanitizeReportVisitorsByLocationResponse = (response) => {
  const defaultSummary = {
    visitors: "0",
    date_start: "",
    date_end: ""
  };
  return {
    summary: sanitizeVisitorsByLocationSummary(response?.summary ?? defaultSummary),
    data: response?.data ? response.data.map(sanitizeVisitorsByLocationItem) : []
  };
};

// packages/data/build-module/queries/report-visitors-by-location-query.mjs
var getReportVisitorsByLocationQueryKey = (p2) => [
  "reports",
  "visitors",
  "by-location",
  p2.group_by,
  p2.country_code ?? null,
  p2.from,
  p2.to,
  p2.interval,
  p2.limit ?? null
];
function reportVisitorsByLocationQuery(params) {
  return {
    queryKey: getReportVisitorsByLocationQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportVisitorsByLocation(params);
      return sanitizeReportVisitorsByLocationResponse(response);
    },
    enabled: !!(params.from && params.to && params.interval),
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/sessions-by-device/index.mjs
function sanitizeSessionsByDeviceItem(item) {
  return {
    device_type: item.device_type || "",
    active_sessions: parseInt(item.active_sessions, 10) || 0
  };
}
var sanitizeReportSessionsByDeviceResponse = (response) => {
  const items = response?.data ?? [];
  const data = items.filter((item) => item.device_type).map(sanitizeSessionsByDeviceItem);
  const totalSessions = data.reduce((acc, item) => acc + item.active_sessions, 0);
  return {
    summary: {
      total_sessions: totalSessions
    },
    data
  };
};

// packages/data/build-module/queries/report-sessions-by-device-query.mjs
var getReportSessionsByDeviceQueryKey = (p2) => ["reports", "sessions", "by-device", p2.from, p2.to];
function reportSessionsByDeviceQuery(params) {
  return {
    queryKey: getReportSessionsByDeviceQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportSessionsByDevice(params);
      return sanitizeReportSessionsByDeviceResponse(response);
    },
    /**
     * Enable the query only if from and to dates are set.
     * Note: This endpoint doesn't use interval (it's not a time-series).
     */
    enabled: !!(params.from && params.to),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/processing/bookings/index.mjs
function sanitizeBookingItem(item) {
  return {
    ...item,
    status_unpaid: safeParseInt(item.status_unpaid),
    status_pending_confirmation: safeParseInt(item.status_pending_confirmation),
    status_confirmed: safeParseInt(item.status_confirmed),
    status_paid: safeParseInt(item.status_paid),
    status_cancelled: safeParseInt(item.status_cancelled),
    status_complete: safeParseInt(item.status_complete),
    attendance_status_booked: safeParseInt(item.attendance_status_booked),
    attendance_status_no_show: safeParseInt(item.attendance_status_no_show),
    attendance_status_checked_in: safeParseInt(item.attendance_status_checked_in)
  };
}
function sanitizeBookingSummaryItem(item) {
  return {
    ...item,
    status_unpaid: safeParseInt(item.status_unpaid),
    status_pending_confirmation: safeParseInt(item.status_pending_confirmation),
    status_confirmed: safeParseInt(item.status_confirmed),
    status_paid: safeParseInt(item.status_paid),
    status_cancelled: safeParseInt(item.status_cancelled),
    status_complete: safeParseInt(item.status_complete),
    attendance_status_booked: safeParseInt(item.attendance_status_booked),
    attendance_status_no_show: safeParseInt(item.attendance_status_no_show),
    attendance_status_checked_in: safeParseInt(item.attendance_status_checked_in)
  };
}
var sanitizeReportBookingsResponse = (response) => {
  return {
    summary: sanitizeBookingSummaryItem(response.summary),
    data: response.data.map(sanitizeBookingItem)
  };
};

// packages/data/build-module/queries/report-bookings-query.mjs
var getReportBookingsQueryKey = (p2) => ["reports", "bookings", "by-date", p2.from, p2.to, p2.interval, p2.date_type, p2.filters];
function reportBookingsQuery(params) {
  return {
    queryKey: getReportBookingsQueryKey(params),
    queryFn: async () => {
      const response = await fetchReportBookings(params);
      return sanitizeReportBookingsResponse(response);
    },
    /**
     * Enable the query only if the from, to, and interval are set.
     */
    enabled: !!(params.from && params.to && params.interval),
    /**
     * Keep previous data while fetching new data to prevent blank states
     */
    placeholderData: (previousData) => previousData
  };
}

// packages/data/build-module/hooks/use-report.mjs
init_modern2();
var import_react3 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constants.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var millisecondsInHour = 36e5;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;
var constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addDays.js
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
  if (!amount) return _date;
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js
function addMonths(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
  if (!amount) {
    return _date;
  }
  const dayOfMonth = _date.getDate();
  const endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
    return _date;
  }
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
function startOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addWeeks.js
function addWeeks(date, amount, options) {
  return addDays(date, amount * 7, options);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addYears.js
function addYears(date, amount, options) {
  return addMonths(date, amount * 12, options);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
function isDate2(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
function isValid(date) {
  return !(!isDate2(date) && typeof date !== "number" || isNaN(+toDate(date)));
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInDays.js
function differenceInDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const sign = compareLocalAsc(laterDate_, earlierDate_);
  const difference = Math.abs(
    differenceInCalendarDays(laterDate_, earlierDate_)
  );
  laterDate_.setDate(laterDate_.getDate() - sign * difference);
  const isLastDayNotFull = Number(
    compareLocalAsc(laterDate_, earlierDate_) === -sign
  );
  const result = sign * (difference - isLastDayNotFull);
  return result === 0 ? 0 : result;
}
function compareLocalAsc(laterDate, earlierDate) {
  const diff = laterDate.getFullYear() - earlierDate.getFullYear() || laterDate.getMonth() - earlierDate.getMonth() || laterDate.getDate() - earlierDate.getDate() || laterDate.getHours() - earlierDate.getHours() || laterDate.getMinutes() - earlierDate.getMinutes() || laterDate.getSeconds() - earlierDate.getSeconds() || laterDate.getMilliseconds() - earlierDate.getMilliseconds();
  if (diff < 0) return -1;
  if (diff > 0) return 1;
  return diff;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getRoundingMethod.js
function getRoundingMethod(method) {
  return (number) => {
    const round2 = method ? Math[method] : Math.trunc;
    const result = round2(number);
    return result === 0 ? 0 : result;
  };
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInHours.js
function differenceInHours(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const diff = (+laterDate_ - +earlierDate_) / millisecondsInHour;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfDay.js
function endOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfMonth.js
function endOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfMonth.js
function startOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfYear.js
function endOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatLong.js
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/localize.js
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/match.js
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US.js
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDayOfYear.js
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
function startOfWeekYear(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/formatters.js
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }
};
function formatTimezoneShort(offset3, delimiter = "") {
  const sign = offset3 > 0 ? "-" : "+";
  const absOffset = Math.abs(offset3);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset3, delimiter) {
  if (offset3 % 60 === 0) {
    const sign = offset3 > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset3) / 60, 2);
  }
  return formatTimezone(offset3, delimiter);
}
function formatTimezone(offset3, delimiter = "") {
  const sign = offset3 > 0 ? "-" : "+";
  const absOffset = Math.abs(offset3);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/protectedTokens.js
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions2 = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subDays.js
function subDays(date, amount, options) {
  return addDays(date, -amount, options);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subMonths.js
function subMonths(date, amount, options) {
  return addMonths(date, -amount, options);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subWeeks.js
function subWeeks(date, amount, options) {
  return addWeeks(date, -amount, options);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subYears.js
function subYears(date, amount, options) {
  return addYears(date, -amount, options);
}

// packages/datetime/src/get-comparison-range.ts
var COMPARISON_PREVIOUS_PERIOD = "previous-period";
var COMPARISON_PREVIOUS_WEEK = "previous-week";
var COMPARISON_PREVIOUS_MONTH = "previous-month";
var COMPARISON_PREVIOUS_YEAR = "previous-year";
function getComparisonRangeFromPreset(reference, presetId) {
  if (!reference?.from || !reference?.to) {
    return void 0;
  }
  const refFrom = reference.from;
  const refTo = reference.to;
  const clampDayBound = (date, bound) => bound === 1 ? endOfDay(startOfDay(date)) : startOfDay(date);
  if (presetId === COMPARISON_PREVIOUS_PERIOD) {
    const daysInclusive = differenceInDays(refTo, refFrom) + 1;
    return {
      from: clampDayBound(subDays(refFrom, daysInclusive), 0),
      to: clampDayBound(subDays(refTo, daysInclusive), 1)
    };
  }
  if (presetId === COMPARISON_PREVIOUS_WEEK) {
    return {
      from: clampDayBound(subWeeks(refFrom, 1), 0),
      to: clampDayBound(subWeeks(refTo, 1), 1)
    };
  }
  if (presetId === COMPARISON_PREVIOUS_MONTH) {
    return {
      from: clampDayBound(subMonths(refFrom, 1), 0),
      to: clampDayBound(subMonths(refTo, 1), 1)
    };
  }
  if (presetId === COMPARISON_PREVIOUS_YEAR) {
    return {
      from: clampDayBound(subYears(refFrom, 1), 0),
      to: clampDayBound(subYears(refTo, 1), 1)
    };
  }
  return void 0;
}

// ../../../node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzName/index.js
function tzName(timeZone, date, format2 = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone,
    timeZoneName: format2
  }).format(date).split(/\s/g).slice(2).join(" ");
}

// ../../../node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzOffset/index.js
var offsetFormatCache = {};
var offsetCache = {};
function tzOffset(timeZone, date) {
  try {
    const format2 = offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "longOffset"
    }).format;
    const offsetStr = format2(date).split("GMT")[1];
    if (offsetStr in offsetCache) return offsetCache[offsetStr];
    return calcOffset(offsetStr, offsetStr.split(":"));
  } catch {
    if (timeZone in offsetCache) return offsetCache[timeZone];
    const captures = timeZone?.match(offsetRe);
    if (captures) return calcOffset(timeZone, captures.slice(1));
    return NaN;
  }
}
var offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
  const hours = +(values[0] || 0);
  const minutes = +(values[1] || 0);
  const seconds = +(values[2] || 0) / 60;
  return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
}

// ../../../node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/mini.js
var TZDateMini = class _TZDateMini extends Date {
  //#region static
  constructor(...args) {
    super();
    if (args.length > 1 && typeof args[args.length - 1] === "string") {
      this.timeZone = args.pop();
    }
    this.internal = /* @__PURE__ */ new Date();
    if (isNaN(tzOffset(this.timeZone, this))) {
      this.setTime(NaN);
    } else {
      if (!args.length) {
        this.setTime(Date.now());
      } else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) {
        this.setTime(args[0]);
      } else if (typeof args[0] === "string") {
        this.setTime(+new Date(args[0]));
      } else if (args[0] instanceof Date) {
        this.setTime(+args[0]);
      } else {
        this.setTime(+new Date(...args));
        adjustToSystemTZ(this, NaN);
        syncToInternal(this);
      }
    }
  }
  static tz(tz2, ...args) {
    return args.length ? new _TZDateMini(...args, tz2) : new _TZDateMini(Date.now(), tz2);
  }
  //#endregion
  //#region time zone
  withTimeZone(timeZone) {
    return new _TZDateMini(+this, timeZone);
  }
  getTimezoneOffset() {
    const offset3 = -tzOffset(this.timeZone, this);
    return offset3 > 0 ? Math.floor(offset3) : Math.ceil(offset3);
  }
  //#endregion
  //#region time
  setTime(time) {
    Date.prototype.setTime.apply(this, arguments);
    syncToInternal(this);
    return +this;
  }
  //#endregion
  //#region date-fns integration
  [/* @__PURE__ */ Symbol.for("constructDateFrom")](date) {
    return new _TZDateMini(+new Date(date), this.timeZone);
  }
  //#endregion
};
var re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
  if (!re.test(method)) return;
  const utcMethod = method.replace(re, "$1UTC");
  if (!TZDateMini.prototype[utcMethod]) return;
  if (method.startsWith("get")) {
    TZDateMini.prototype[method] = function() {
      return this.internal[utcMethod]();
    };
  } else {
    TZDateMini.prototype[method] = function() {
      Date.prototype[utcMethod].apply(this.internal, arguments);
      syncFromInternal(this);
      return +this;
    };
    TZDateMini.prototype[utcMethod] = function() {
      Date.prototype[utcMethod].apply(this, arguments);
      syncToInternal(this);
      return +this;
    };
  }
});
function syncToInternal(date) {
  date.internal.setTime(+date);
  date.internal.setUTCSeconds(date.internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, date) * 60));
}
function syncFromInternal(date) {
  Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
  Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());
  adjustToSystemTZ(date);
}
function adjustToSystemTZ(date) {
  const baseOffset = tzOffset(date.timeZone, date);
  const offset3 = baseOffset > 0 ? Math.floor(baseOffset) : Math.ceil(baseOffset);
  const prevHour = /* @__PURE__ */ new Date(+date);
  prevHour.setUTCHours(prevHour.getUTCHours() - 1);
  const systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
  const prevHourSystemOffset = -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset();
  const systemDSTChange = systemOffset - prevHourSystemOffset;
  const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();
  if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);
  const offsetDiff = systemOffset - offset3;
  if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
  const systemDate = /* @__PURE__ */ new Date(+date);
  systemDate.setUTCSeconds(0);
  const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60;
  const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
  if (secondsOffset || systemSecondsOffset) {
    date.internal.setUTCSeconds(date.internal.getUTCSeconds() + secondsOffset);
    Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
  }
  const postBaseOffset = tzOffset(date.timeZone, date);
  const postOffset = postBaseOffset > 0 ? Math.floor(postBaseOffset) : Math.ceil(postBaseOffset);
  const postSystemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
  const postOffsetDiff = postSystemOffset - postOffset;
  const offsetChanged = postOffset !== offset3;
  const postDiff = postOffsetDiff - offsetDiff;
  if (offsetChanged && postDiff) {
    Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
    const newBaseOffset = tzOffset(date.timeZone, date);
    const newOffset = newBaseOffset > 0 ? Math.floor(newBaseOffset) : Math.ceil(newBaseOffset);
    const offsetChange = postOffset - newOffset;
    if (offsetChange) {
      date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange);
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
    }
  }
}

// ../../../node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/index.js
var TZDate = class _TZDate extends TZDateMini {
  //#region static
  static tz(tz2, ...args) {
    return args.length ? new _TZDate(...args, tz2) : new _TZDate(Date.now(), tz2);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [sign, hours, minutes] = this.tzComponents();
    const tz2 = `${sign}${hours}:${minutes}`;
    return this.internal.toISOString().slice(0, -1) + tz2;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [day, date, month, year] = this.internal.toUTCString().split(" ");
    return `${day?.slice(0, -1)} ${month} ${date} ${year}`;
  }
  toTimeString() {
    const time = this.internal.toUTCString().split(" ")[4];
    const [sign, hours, minutes] = this.tzComponents();
    return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
  }
  toLocaleString(locales, options) {
    return Date.prototype.toLocaleString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  toLocaleDateString(locales, options) {
    return Date.prototype.toLocaleDateString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  toLocaleTimeString(locales, options) {
    return Date.prototype.toLocaleTimeString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const offset3 = this.getTimezoneOffset();
    const sign = offset3 > 0 ? "-" : "+";
    const hours = String(Math.floor(Math.abs(offset3) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(offset3) % 60).padStart(2, "0");
    return [sign, hours, minutes];
  }
  //#endregion
  withTimeZone(timeZone) {
    return new _TZDate(+this, timeZone);
  }
  //#region date-fns integration
  [/* @__PURE__ */ Symbol.for("constructDateFrom")](date) {
    return new _TZDate(+new Date(date), this.timeZone);
  }
  //#endregion
};

// ../../../node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tz/index.js
var tz = (timeZone) => (value) => TZDate.tz(timeZone, +new Date(value));

// packages/datetime/src/tz.ts
function toLocalTZ(value, timeZone) {
  const tzid = timeZone ?? "+00:00";
  if (value !== void 0) {
    return new TZDateMini(value, tzid);
  }
  return TZDateMini.tz(tzid);
}
function dateToISOStringWithTZ(date, timezone) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
    in: tz(timezone)
  });
}

// packages/datetime/src/presets/types.ts
var PRESET_TODAY = "today";
var PRESET_YESTERDAY = "yesterday";
var PRESET_LAST_7_DAYS = "last-7-days";
var PRESET_LAST_30_DAYS = "last-30-days";
var PRESET_LAST_90_DAYS = "last-90-days";
var PRESET_LAST_365_DAYS = "last-365-days";
var PRESET_LAST_MONTH = "last-month";
var PRESET_LAST_12_MONTHS = "last-12-months";
var PRESET_LAST_YEAR = "last-year";
var SELECTABLE_PRESETS = [
  PRESET_TODAY,
  PRESET_YESTERDAY,
  PRESET_LAST_7_DAYS,
  PRESET_LAST_30_DAYS,
  PRESET_LAST_90_DAYS,
  PRESET_LAST_365_DAYS,
  PRESET_LAST_MONTH,
  PRESET_LAST_12_MONTHS,
  PRESET_LAST_YEAR
];
function isSelectablePreset(value) {
  return typeof value === "string" && SELECTABLE_PRESETS.includes(value);
}

// packages/datetime/src/presets/primary.ts
var import_i18n2 = __toESM(require_i18n(), 1);
var PRESET_DEFINITIONS = [
  {
    id: PRESET_TODAY,
    getLabel: () => (0, import_i18n2.__)("Today", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfToday }) => ({
      from: initOfToday,
      to: endOfToday
    })
  },
  {
    id: PRESET_YESTERDAY,
    getLabel: () => (0, import_i18n2.__)("Yesterday", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 1),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_7_DAYS,
    getLabel: () => (0, import_i18n2.__)("Last 7 days", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 7),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_30_DAYS,
    getLabel: () => (0, import_i18n2.__)("Last 30 days", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 30),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_90_DAYS,
    getLabel: () => (0, import_i18n2.__)("Last 90 days", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 90),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_365_DAYS,
    getLabel: () => (0, import_i18n2.__)("Last 365 days", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 365),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_MONTH,
    getLabel: () => (0, import_i18n2.__)("Last month", "jetpack-premium-analytics"),
    getRange: ({ lastMonth, endOfLastMonth }) => ({
      from: startOfMonth(lastMonth),
      to: endOfLastMonth
    })
  },
  {
    id: PRESET_LAST_12_MONTHS,
    getLabel: () => (0, import_i18n2.__)("Last 12 months", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfLastMonth }) => ({
      from: startOfMonth(subMonths(initOfToday, 12)),
      to: endOfLastMonth
    })
  },
  {
    id: PRESET_LAST_YEAR,
    getLabel: () => (0, import_i18n2.__)("Last year", "jetpack-premium-analytics"),
    getRange: ({ lastYear }) => ({
      from: startOfYear(lastYear),
      to: endOfYear(lastYear)
    })
  }
];
function buildDateContext(timeZone) {
  const nowWithTZ = toLocalTZ(void 0, timeZone);
  const initOfToday = startOfDay(nowWithTZ);
  const endOfToday = endOfDay(nowWithTZ);
  const endOfYesterday = endOfDay(subDays(initOfToday, 1));
  const lastMonth = subMonths(initOfToday, 1);
  const endOfLastMonth = endOfMonth(lastMonth);
  const lastYear = subYears(initOfToday, 1);
  return {
    initOfToday,
    endOfToday,
    endOfYesterday,
    lastMonth,
    endOfLastMonth,
    lastYear
  };
}
function computePrimaryRange(presetId, timeZone) {
  const def = PRESET_DEFINITIONS.find((p2) => p2.id === presetId);
  if (!def) {
    return void 0;
  }
  const ctx = buildDateContext(timeZone);
  return def.getRange(ctx);
}

// packages/data/build-module/utils/date.mjs
var import_core_data = __toESM(require_core_data(), 1);
var import_data = __toESM(require_data(), 1);
var DEFAULT_TIME_ZONE;
try {
  DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "+00:00";
} catch {
  DEFAULT_TIME_ZONE = "+00:00";
}
function formatGmtOffset(offset3) {
  if (!offset3) {
    return DEFAULT_TIME_ZONE;
  }
  const sign = offset3 >= 0 ? "+" : "-";
  const abs = Math.abs(offset3);
  const hours = Math.floor(abs);
  const minutes = Math.floor((abs - hours) * 60 + 1e-6);
  return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}
function getSiteTimezone() {
  const siteSettings = (0, import_data.select)(import_core_data.store).getEntityRecord("root", "site");
  if (!siteSettings) {
    return DEFAULT_TIME_ZONE;
  }
  return siteSettings?.timezone?.length ? siteSettings?.timezone : formatGmtOffset(siteSettings?.gmt_offset) || DEFAULT_TIME_ZONE;
}
function getSiteGmtOffset() {
  const siteSettings = (0, import_data.select)(import_core_data.store).getEntityRecord("root", "site");
  if (!siteSettings) {
    throw new Error("getSiteGmtOffset() called before core settings are ready");
  }
  return formatGmtOffset(siteSettings?.gmt_offset) || DEFAULT_TIME_ZONE;
}
function localTZDate(value, timezone) {
  const tz2 = timezone ?? getSiteTimezone();
  return toLocalTZ(value, tz2);
}
function dateToISOStringWithLocalTZ(date, timezone) {
  const tz2 = timezone ?? getSiteTimezone();
  return dateToISOStringWithTZ(date, tz2);
}

// packages/data/build-module/utils/ensure-core-settings.mjs
var import_core_data2 = __toESM(require_core_data(), 1);
var import_data2 = __toESM(require_data(), 1);
var readyPromise = null;
function ensureCoreSettingsReady() {
  if (!readyPromise) {
    readyPromise = Promise.all([
      (0, import_data2.resolveSelect)(import_core_data2.store).getEntityRecord("root", "site"),
      (0, import_data2.resolveSelect)(import_core_data2.store).getEntityRecord("root", "settings", "general")
    ]).then(() => void 0).catch((err) => {
      readyPromise = null;
      throw err;
    });
  }
  return readyPromise;
}

// packages/data/build-module/utils/interval.mjs
function getDaysBetweenInclusive(from, to) {
  const fromDate = /* @__PURE__ */ new Date(`${from}T00:00:00Z`);
  const toDate2 = /* @__PURE__ */ new Date(`${to}T00:00:00Z`);
  const days = differenceInCalendarDays(toDate2, fromDate);
  if (Number.isNaN(days) || days < 0) {
    return 1;
  }
  return days + 1;
}
function getAllowedIntervalsByRange(from, to) {
  const daysDiff = Math.round(
    Math.abs(differenceInHours(localTZDate(to), localTZDate(from)) / 24)
  );
  if (daysDiff >= 1095) {
    return ["quarter", "year"];
  } else if (daysDiff >= 365) {
    return ["month", "quarter"];
  } else if (daysDiff >= 90) {
    return ["week", "month"];
  } else if (daysDiff >= 28) {
    return ["day", "week"];
  } else if (daysDiff >= 3) {
    return ["day"];
  } else if (daysDiff >= 1) {
    return ["hour", "day"];
  }
  return ["hour", "day"];
}
function getAllowedIntervalsForPeriod(period, from, to) {
  switch (period) {
    case "today":
    case "yesterday":
      return ["hour", "day"];
    case "last-7-days":
      return ["day"];
    case "last-30-days":
    case "last-month":
      return ["day", "week"];
    case "last-90-days":
      return ["week", "month"];
    case "last-12-months":
    case "last-365-days":
    case "last-year":
      return ["month", "quarter"];
    default:
      return getAllowedIntervalsByRange(from, to);
  }
}
function getDefaultIntervalForPeriod(period, from, to) {
  return getAllowedIntervalsForPeriod(period, from, to)?.[0] ?? "day";
}
function getDateFormatFromInterval(period, from, to) {
  const interval = getDefaultIntervalForPeriod(period, from, to);
  switch (interval) {
    case "hour":
      return "HH:mm";
    case "day":
    case "week":
      return "MMM d";
    case "month":
      return "MMM yyyy";
    case "quarter":
      return "qqq yyyy";
    case "year":
      return "yyyy";
    default:
      return "MMM d";
  }
}

// packages/data/build-module/utils/preset-date-range.mjs
function computeDateRangeFromPreset(presetId) {
  const range = computePrimaryRange(presetId, getSiteTimezone());
  if (!range?.from || !range?.to) {
    return void 0;
  }
  return {
    from: dateToISOStringWithLocalTZ(range.from),
    to: dateToISOStringWithLocalTZ(range.to)
  };
}

// packages/data/build-module/defaults/reports.mjs
var DEFAULT_PRESET = "last-30-days";
function getDefaultPreset(launchedDate) {
  if (!launchedDate) {
    return DEFAULT_PRESET;
  }
  const today = startOfDay(localTZDate());
  const launched = startOfDay(localTZDate(launchedDate));
  const daysSinceLaunch = differenceInCalendarDays(today, launched);
  if (daysSinceLaunch <= 0) {
    return "today";
  }
  if (daysSinceLaunch <= 7) {
    return "last-7-days";
  }
  return DEFAULT_PRESET;
}
var getDefaultQueryParams = (withComparison = false, preset = DEFAULT_PRESET) => {
  const range = computeDateRangeFromPreset(preset);
  if (!range) {
    throw new Error(`Unknown preset: ${preset}`);
  }
  const { from: fromString, to: toString } = range;
  const interval = getDefaultIntervalForPeriod(void 0, fromString, toString);
  if (!withComparison) {
    return {
      from: fromString,
      to: toString,
      preset,
      interval
    };
  }
  const from = localTZDate(new Date(fromString));
  const to = localTZDate(new Date(toString));
  const comparisonParams = getComparisonRangeFromPreset(
    {
      from,
      to
    },
    "previous-period"
  );
  return {
    from: fromString,
    to: toString,
    preset,
    interval,
    compare_from: comparisonParams?.from ? dateToISOStringWithLocalTZ(comparisonParams?.from) : void 0,
    compare_to: comparisonParams?.to ? dateToISOStringWithLocalTZ(comparisonParams?.to) : void 0,
    compare_preset: "previous-period",
    comp: "1"
  };
};

// packages/data/build-module/utils/search.mjs
function hasComparisonEnabled(p2) {
  return p2.comp === "1" && !!p2.compare_from?.trim() && !!p2.compare_to?.trim();
}
function normalizeReportParams(search, defaultPreset) {
  const defaults = defaultPreset ? getDefaultQueryParams(true, defaultPreset) : getDefaultQueryParams(true);
  let preset;
  if (search?.preset && isSelectablePreset(search.preset)) {
    preset = search.preset;
  } else if (!search?.from && !search?.to) {
    preset = defaults.preset;
  }
  let presetRange;
  if (preset) {
    presetRange = computeDateRangeFromPreset(preset);
    if (!presetRange) {
      preset = void 0;
    }
  }
  const from = presetRange?.from ?? search?.from ?? defaults.from;
  const to = presetRange?.to ?? search?.to ?? defaults.to;
  const interval = getDefaultIntervalForPeriod(void 0, from, to);
  const normalized = {
    from,
    to,
    interval: interval ?? defaults.interval,
    preset,
    date_type: search?.date_type ?? "created"
  };
  if (search && hasComparisonEnabled(search)) {
    normalized.compare_from = search.compare_from;
    normalized.compare_to = search.compare_to;
    normalized.compare_preset = search.compare_preset;
    normalized.comp = "1";
  } else if (!search?.from && hasComparisonEnabled(defaults)) {
    normalized.compare_from = defaults.compare_from;
    normalized.compare_to = defaults.compare_to;
    normalized.compare_preset = defaults.compare_preset;
    normalized.comp = "1";
  }
  return normalized;
}

// packages/data/build-module/hooks/use-report.mjs
function useReport(queryFactory, params, options) {
  const queryEnabled = options?.enabled ?? true;
  const comparisonEnabled = hasComparisonEnabled(params);
  const primaryParams = { ...params };
  delete primaryParams.compare_from;
  delete primaryParams.compare_to;
  delete primaryParams.compare_preset;
  delete primaryParams.comp;
  const primaryQueryOptions = queryFactory(primaryParams, "primary");
  const comparisonQueryOptions = comparisonEnabled ? queryFactory(
    {
      ...primaryParams,
      from: params.compare_from,
      to: params.compare_to
    },
    "comparison"
  ) : {
    queryKey: options?.disabledComparisonKey ?? ["reports", "__comparison__", "disabled"]
  };
  const primary = useQuery({
    ...primaryQueryOptions,
    enabled: queryEnabled && (primaryQueryOptions.enabled ?? true)
  });
  const comparison = useQuery({
    ...comparisonQueryOptions,
    enabled: queryEnabled && comparisonEnabled && (comparisonQueryOptions.enabled ?? true)
  });
  const isLoading = primary.isLoading || comparison.isLoading;
  const isFetching = primary.isFetching || comparison.isFetching;
  const hasData = Boolean(primary.data?.summary) || Boolean(primary.data?.data?.length) || Boolean(primary.data?.steps?.length) || Boolean(comparison.data?.summary) || Boolean(comparison.data?.data?.length) || Boolean(comparison.data?.steps?.length);
  const primaryRefetch = primary.refetch;
  const comparisonRefetch = comparison.refetch;
  const refetch = (0, import_react3.useCallback)(async () => {
    await Promise.all([
      primaryRefetch(),
      comparisonEnabled ? comparisonRefetch() : Promise.resolve()
    ]);
  }, [comparisonEnabled, primaryRefetch, comparisonRefetch]);
  return {
    primary,
    comparison,
    hasComparison: comparisonEnabled,
    isLoading,
    isFetching,
    hasData,
    // Error handling
    isError: primary.isError || comparison.isError,
    error: primary.error ?? comparison.error,
    refetch
  };
}

// packages/data/build-module/hooks/use-report-orders.mjs
function useReportOrders(params, options) {
  return useReport((p2) => reportOrdersQuery(p2), params, {
    enabled: options?.enabled,
    disabledComparisonKey: ["reports", "orders", "by-date", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/hooks/use-report-order-attribution.mjs
var DISABLED_COMPARISON_KEY = [
  "reports",
  "order-attribution",
  "__comparison__",
  "included-in-primary"
];
function useReportOrderAttribution(params, options) {
  const compareFrom = params.compare_from ?? params.from;
  const compareTo = params.compare_to ?? params.to;
  return useReport(
    (p2, queryType) => {
      if (!params.view) {
        return {
          queryKey: ["reports", "order-attribution", "__disabled__", "no-view-param"],
          enabled: false
        };
      }
      if (queryType === "comparison") {
        return {
          queryKey: DISABLED_COMPARISON_KEY,
          enabled: false
        };
      }
      return reportOrderAttributionSummaryQuery({
        ...p2,
        view: params.view,
        compare_from: compareFrom,
        compare_to: compareTo,
        date_type: params.date_type
      });
    },
    params,
    {
      enabled: options?.enabled,
      disabledComparisonKey: DISABLED_COMPARISON_KEY
    }
  );
}

// packages/data/build-module/hooks/use-report-coupons.mjs
function useReportCoupons(params) {
  return useReport((p2) => reportCouponsQuery(p2), params, {
    disabledComparisonKey: ["reports", "coupons", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/hooks/use-report-coupons-by-date.mjs
function useReportCouponsByDate(params) {
  return useReport((p2) => reportCouponsByDateQuery(p2), params, {
    disabledComparisonKey: ["reports", "couponsByDate", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/hooks/use-report-customers.mjs
function useReportCustomers(params) {
  return useReport((p2) => reportCustomersQuery(p2), params, {
    disabledComparisonKey: [
      "reports",
      "customers",
      "new-returning",
      "__comparison__",
      "disabled"
    ]
  });
}

// packages/data/build-module/hooks/use-report-customers-by-date.mjs
function useReportCustomersByDate(params, options) {
  return useReport((p2) => reportCustomersByDateQuery(p2), params, {
    enabled: options?.enabled,
    disabledComparisonKey: ["reports", "customers", "by-date", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/hooks/use-report-conversion-rate.mjs
function useReportConversionRate(params, options) {
  return useReport((p2) => reportConversionRateQuery(p2), params, {
    enabled: options?.enabled,
    disabledComparisonKey: ["reports", "conversion-rate", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/hooks/use-report-products.mjs
function useReportProducts(params, limit = 5) {
  return useReport((p2) => reportProductsQuery({ ...p2, limit }), params, {
    disabledComparisonKey: ["reports", "products", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/hooks/use-product-images.mjs
init_modern2();
var import_api_fetch16 = __toESM(require_api_fetch(), 1);
var import_url15 = __toESM(require_url(), 1);
async function fetchProductImages(productIds) {
  if (!productIds.length) {
    return [];
  }
  const queryArgs = {
    include: productIds.join(","),
    per_page: productIds.length
  };
  try {
    const response = await (0, import_api_fetch16.default)({
      path: (0, import_url15.addQueryArgs)("/wc/v3/products", queryArgs)
    });
    return response.map((product) => ({
      productId: product.id,
      imageUrl: product.images?.[0]?.src || "",
      imageAlt: product.images?.[0]?.alt || product.name
    }));
  } catch {
    return [];
  }
}
var getProductImagesQueryKey = (params) => (
  // Copy before sorting: `sort()` mutates in place, and this runs during render.
  // The sort makes `[ 1, 2 ]` and `[ 2, 1 ]` share a cache entry.
  ["product-images", [...params.productIds].sort().join(",")]
);
function useProductImages(params) {
  return useQuery({
    queryKey: getProductImagesQueryKey(params),
    queryFn: async () => {
      const images = await fetchProductImages(params.productIds);
      return images.reduce(
        (acc, image) => {
          acc[image.productId] = {
            imageUrl: image.imageUrl,
            imageAlt: image.imageAlt
          };
          return acc;
        },
        {}
      );
    },
    enabled: params.productIds.length > 0
  });
}

// packages/data/build-module/hooks/use-report-visitors.mjs
function useReportVisitors(params, options) {
  return useReport((p2) => reportVisitorsQuery(p2), params, {
    enabled: options?.enabled,
    disabledComparisonKey: ["reports", "visitors", "by-date", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/hooks/use-report-visitors-by-location.mjs
function useReportVisitorsByLocation(params, options) {
  return useReport(
    (p2) => reportVisitorsByLocationQuery({
      ...p2,
      group_by: options?.groupBy ?? "country",
      country_code: options?.countryCode,
      limit: options?.limit
    }),
    params,
    {
      enabled: options?.enabled,
      disabledComparisonKey: ["reports", "visitors", "by-location", "__comparison__", "disabled"]
    }
  );
}

// packages/data/build-module/hooks/use-report-bookings.mjs
function useReportBookings(params) {
  return useReport((p2) => reportBookingsQuery(p2), params, {
    disabledComparisonKey: ["reports", "bookings", "by-date", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/hooks/use-report-sessions-by-device.mjs
function useReportSessionsByDevice(params, options) {
  return useReport((p2) => reportSessionsByDeviceQuery(p2), params, {
    enabled: options?.enabled,
    disabledComparisonKey: ["reports", "sessions", "by-device", "__comparison__", "disabled"]
  });
}

// packages/data/build-module/prefetch/prefetch-report.mjs
async function prefetchReport(reportType = "orders", params) {
  switch (reportType) {
    case "orders":
      return queryClient.ensureQueryData(
        reportOrdersQuery(params)
      );
    case "order-attribution":
      return queryClient.ensureQueryData(
        reportOrderAttributionSummaryQuery(
          params
        )
      );
    case "coupons":
      return queryClient.ensureQueryData(
        reportCouponsQuery(params)
      );
    case "coupons-by-date":
      return queryClient.ensureQueryData(
        reportCouponsByDateQuery(params)
      );
    case "customers":
      return queryClient.ensureQueryData(
        reportCustomersQuery(params)
      );
    case "customers-by-date":
      return queryClient.ensureQueryData(
        reportCustomersByDateQuery(params)
      );
    case "visitors":
      return queryClient.ensureQueryData(
        reportVisitorsQuery(params)
      );
    case "visitors-by-location":
      return queryClient.ensureQueryData(
        reportVisitorsByLocationQuery(params)
      );
    case "sessions-by-device":
      return queryClient.ensureQueryData(
        reportSessionsByDeviceQuery(params)
      );
    case "products":
      return queryClient.ensureQueryData(
        reportProductsQuery(params)
      );
    case "conversion-rate":
      return queryClient.ensureQueryData(
        reportConversionRateQuery(params)
      );
    default:
      throw new Error(`Unsupported report type: ${reportType}`);
  }
}

// packages/data/build-module/utils/stats-params.mjs
var reportOnlyKeys = [
  "from",
  "to",
  "interval",
  "preset",
  "compare_from",
  "compare_to",
  "compare_preset",
  "comp",
  "filters",
  "section",
  "date_type",
  "view",
  "geoMode",
  "utmParams",
  "deviceProperty"
];
function datePart(value) {
  return value?.split("T")[0];
}
function getStatsPeriodFromInterval(interval) {
  switch (interval) {
    case "hour":
      return "hour";
    case "week":
      return "week";
    case "month":
    case "quarter":
      return "month";
    case "year":
      return "year";
    case "day":
    default:
      return "day";
  }
}
function reportParamsToStatsQueryParams(params = {}) {
  const statsParams = { ...params };
  reportOnlyKeys.forEach((key) => {
    delete statsParams[key];
  });
  const from = datePart(params.from);
  const to = datePart(params.to);
  const period = params.period ?? getStatsPeriodFromInterval(params.interval);
  const date = params.date ?? to;
  const startDate = params.start_date ?? from;
  const days = params.days ?? (startDate && date ? getDaysBetweenInclusive(startDate, date) : void 0);
  return {
    ...statsParams,
    period,
    ...date ? { date } : {},
    ...startDate ? { start_date: startDate } : {},
    ...days ? { days } : {}
  };
}
export {
  AnalyticsQueryClientProvider,
  GlobalErrorProvider,
  ORDER_ATTRIBUTION_VIEWS,
  dateToISOStringWithLocalTZ,
  ensureCoreSettingsReady,
  exportReport,
  fetchStatsProxy,
  getDateFormatFromInterval,
  getDefaultIntervalForPeriod,
  getDefaultPreset,
  getDefaultQueryParams,
  getSiteGmtOffset,
  getSiteTimezone,
  getStatsPeriodFromInterval,
  getStatsProxyPath,
  globalErrorManager,
  hasComparisonEnabled,
  hasProductFilters,
  isSelectablePreset,
  localTZDate,
  normalizeReportParams,
  prefetchReport,
  queryClient,
  reportParamsToStatsQueryParams,
  useGlobalError,
  useProductImages,
  useReportBookings,
  useReportConversionRate,
  useReportCoupons,
  useReportCouponsByDate,
  useReportCustomers,
  useReportCustomersByDate,
  useReportOrderAttribution,
  useReportOrders,
  useReportProducts,
  useReportSessionsByDevice,
  useReportVisitors,
  useReportVisitorsByLocation
};
/*! Bundled license information:

@tanstack/query-devtools/build/chunk/ZDWCUMSJ.js:
  (*! Bundled license information:
  
  @tanstack/match-sorter-utils/build/lib/index.mjs:
    (**
       * match-sorter-utils
       *
       * Copyright (c) TanStack
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.md file in the root directory of this source tree.
       *
       * @license MIT
       *)
    (**
     * @name match-sorter
     * @license MIT license.
     * @copyright (c) 2099 Kent C. Dodds
     * @author Kent C. Dodds <me@kentcdodds.com> (https://kentcdodds.com)
     *)
  
  @kobalte/utils/dist/index.js:
    (*!
     * Portions of this file are based on code from ariakit.
     * MIT Licensed, Copyright (c) Diego Haz.
     *
     * Credits to the Ariakit team:
     * https://github.com/ariakit/ariakit/blob/da142672eddefa99365773ced72171facc06fdcb/packages/ariakit-utils/src/array.ts
     *)
    (*!
     * Original code by Chakra UI
     * MIT Licensed, Copyright (c) 2019 Segun Adebayo.
     *
     * Credits to the Chakra UI team:
     * https://github.com/chakra-ui/chakra-ui/blob/main/packages/utils/src/assertion.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/solidjs-community/solid-aria/blob/2c5f54feb5cfea514b1ee0a52d0416878f882351/packages/utils/src/createGlobalListeners.ts
     *)
    (*!
     * Portions of this file are based on code from ariakit.
     * MIT Licensed, Copyright (c) Diego Haz.
     *
     * Credits to the Ariakit team:
     * https://github.com/ariakit/ariakit/blob/232bc79018ec20967fec1e097a9474aba3bb5be7/packages/ariakit-utils/src/dom.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/cf9ab24f3255be1530d0f584061a01aa1e8180e6/packages/@react-aria/utils/src/platform.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/a9dea8a3672179e6c38aafd1429daf44c7ea2ff6/packages/@react-aria/utils/src/focusWithoutScrolling.ts
     *)
    (*!
     * Portions of this file are based on code from ariakit.
     * MIT Licensed, Copyright (c) Diego Haz.
     *
     * Credits to the Ariakit team:
     * https://github.com/ariakit/ariakit/blob/main/packages/ariakit-utils/src/focus.ts
     *
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/isElementVisible.ts
     * https://github.com/adobe/react-spectrum/blob/8f2f2acb3d5850382ebe631f055f88c704aa7d17/packages/@react-aria/focus/src/FocusScope.tsx
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/f6e686fe9d3b983d48650980c1ecfdde320bc62f/packages/@react-aria/focus/src/FocusScope.tsx
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/a9dea8a3672179e6c38aafd1429daf44c7ea2ff6/packages/@react-aria/utils/src/getScrollParent.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/a9dea8a3672179e6c38aafd1429daf44c7ea2ff6/packages/@react-aria/utils/src/isVirtualEvent.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/ff3e690fffc6c54367b8057e28a0e5b9211f37b5/packages/@react-stately/utils/src/number.ts
     *)
    (*!
     * Portions of this file are based on code from ariakit.
     * MIT Licensed, Copyright (c) Diego Haz.
     *
     * Credits to the Ariakit team:
     * https://github.com/ariakit/ariakit/blob/84e97943ad637a582c01c9b56d880cd95f595737/packages/ariakit/src/hovercard/__utils/polygon.ts
     * https://github.com/ariakit/ariakit/blob/f2a96973de523d67e41eec983263936c489ef3e2/packages/ariakit/src/hovercard/__utils/debug-polygon.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/a9dea8a3672179e6c38aafd1429daf44c7ea2ff6/packages/@react-aria/utils/src/runAfterTransition.ts
     *)
    (*!
     * Portions of this file are based on code from react-spectrum.
     * Apache License Version 2.0, Copyright 2020 Adobe.
     *
     * Credits to the React Spectrum team:
     * https://github.com/adobe/react-spectrum/blob/8f2f2acb3d5850382ebe631f055f88c704aa7d17/packages/@react-aria/utils/src/scrollIntoView.ts
     *)
  *)
*/
//# sourceMappingURL=index.js.map
