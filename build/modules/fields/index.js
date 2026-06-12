var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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

// vendor-external:react
var require_react = __commonJS({
  "vendor-external:react"(exports, module) {
    module.exports = window.React;
  }
});

// package-external:@wordpress/element
var require_element = __commonJS({
  "package-external:@wordpress/element"(exports, module) {
    module.exports = window.wp.element;
  }
});

// vendor-external:react/jsx-runtime
var require_jsx_runtime = __commonJS({
  "vendor-external:react/jsx-runtime"(exports, module) {
    module.exports = window.ReactJSXRuntime;
  }
});

// packages/fields/build-module/report-params-field/report-params-field.mjs
import {
  getDefaultPreset,
  normalizeReportParams as normalizeReportParams2,
  localTZDate as localTZDate2,
  getSiteTimezone as getSiteTimezone2
} from "@jetpack-premium-analytics/data";

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constants.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInDay = 864e5;
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

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addWeeks.js
function addWeeks(date, amount, options) {
  return addDays(date, amount * 7, options);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addYears.js
function addYears(date, amount, options) {
  return addMonths(date, amount * 12, options);
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

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfDay.js
function endOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(23, 59, 59, 999);
  return _date;
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
    const offset = -tzOffset(this.timeZone, this);
    return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
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
  const offset = baseOffset > 0 ? Math.floor(baseOffset) : Math.ceil(baseOffset);
  const prevHour = /* @__PURE__ */ new Date(+date);
  prevHour.setUTCHours(prevHour.getUTCHours() - 1);
  const systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
  const prevHourSystemOffset = -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset();
  const systemDSTChange = systemOffset - prevHourSystemOffset;
  const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();
  if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);
  const offsetDiff = systemOffset - offset;
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
  const offsetChanged = postOffset !== offset;
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
    const offset = this.getTimezoneOffset();
    const sign = offset > 0 ? "-" : "+";
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
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

// packages/datetime/src/tz.ts
function startOfDayTZ(date, timeZone) {
  const tzDate = new TZDateMini(new Date(date).getTime(), timeZone);
  return startOfDay(tzDate);
}
function endOfDayTZ(date, timeZone) {
  const tzDate = new TZDateMini(new Date(date).getTime(), timeZone);
  return endOfDay(tzDate);
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
var PRESET_CUSTOM = "custom";
function isSelectablePreset(value) {
  return typeof value === "string" && SELECTABLE_PRESETS.includes(value);
}
function isPrimaryPreset(value) {
  return isSelectablePreset(value) || value === PRESET_CUSTOM;
}

// packages/routing/src/search/date-range/date-range.ts
import { localTZDate, dateToISOStringWithLocalTZ } from "@jetpack-premium-analytics/data";
function encodeDateToSearchParam(date, timezone) {
  return date ? dateToISOStringWithLocalTZ(localTZDate(date, timezone)) : void 0;
}

// packages/routing/src/search/comparison/derive-comparison-range.ts
import {
  dateToISOStringWithLocalTZ as dateToISOStringWithLocalTZ2,
  getSiteTimezone
} from "@jetpack-premium-analytics/data";
var toComparisonPresetId = (value) => {
  switch (value) {
    case "previous-period":
    case "previous_period":
      return "previous-period";
    case "previous-week":
    case "previous_week":
      return "previous-week";
    case "previous-month":
    case "previous_month":
      return "previous-month";
    case "previous-year":
    case "previous_year":
      return "previous-year";
    default:
      return void 0;
  }
};
function deriveComparisonRange(opts) {
  const presetId = toComparisonPresetId(opts.compare_preset);
  if (opts.comp !== "1" || !presetId) {
    return void 0;
  }
  if (!opts.from || !opts.to) {
    return void 0;
  }
  const fromInstant = new Date(opts.from);
  const toInstant = new Date(opts.to);
  if (isNaN(fromInstant.getTime()) || isNaN(toInstant.getTime())) {
    return void 0;
  }
  const timezone = getSiteTimezone();
  const reference = {
    from: startOfDayTZ(fromInstant, timezone),
    to: endOfDayTZ(toInstant, timezone)
  };
  const cmp = getComparisonRangeFromPreset(reference, presetId);
  if (!cmp?.from || !cmp?.to) {
    return void 0;
  }
  return {
    compare_from: dateToISOStringWithLocalTZ2(cmp.from),
    compare_to: dateToISOStringWithLocalTZ2(cmp.to)
  };
}

// packages/fields/build-module/report-params-field/report-params-field.mjs
import { DateFiltersPanel } from "@jetpack-premium-analytics/ui";

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useRefWithInit.js
var React = __toESM(require_react(), 1);
var UNINITIALIZED = {};
function useRefWithInit(init, initArg) {
  const ref = React.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/warn.js
var set;
if (true) {
  set = /* @__PURE__ */ new Set();
}
function warn(...messages) {
  if (true) {
    const messageKey = messages.join(" ");
    if (!set.has(messageKey)) {
      set.add(messageKey);
      console.warn(`Base UI: ${messageKey}`);
    }
  }
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useRenderElement.js
var React4 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useMergedRefs.js
function useMergedRefs(a, b, c, d) {
  const forkRef = useRefWithInit(createForkRef).current;
  if (didChange(forkRef, a, b, c, d)) {
    update(forkRef, [a, b, c, d]);
  }
  return forkRef.callback;
}
function useMergedRefsN(refs) {
  const forkRef = useRefWithInit(createForkRef).current;
  if (didChangeN(forkRef, refs)) {
    update(forkRef, refs);
  }
  return forkRef.callback;
}
function createForkRef() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function didChange(forkRef, a, b, c, d) {
  return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
  return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
  forkRef.refs = refs;
  if (refs.every((ref) => ref == null)) {
    forkRef.callback = null;
    return;
  }
  forkRef.callback = (instance) => {
    if (forkRef.cleanup) {
      forkRef.cleanup();
      forkRef.cleanup = null;
    }
    if (instance != null) {
      const cleanupCallbacks = Array(refs.length).fill(null);
      for (let i = 0; i < refs.length; i += 1) {
        const ref = refs[i];
        if (ref == null) {
          continue;
        }
        switch (typeof ref) {
          case "function": {
            const refCleanup = ref(instance);
            if (typeof refCleanup === "function") {
              cleanupCallbacks[i] = refCleanup;
            }
            break;
          }
          case "object": {
            ref.current = instance;
            break;
          }
          default:
        }
      }
      forkRef.cleanup = () => {
        for (let i = 0; i < refs.length; i += 1) {
          const ref = refs[i];
          if (ref == null) {
            continue;
          }
          switch (typeof ref) {
            case "function": {
              const cleanupCallback = cleanupCallbacks[i];
              if (typeof cleanupCallback === "function") {
                cleanupCallback();
              } else {
                ref(null);
              }
              break;
            }
            case "object": {
              ref.current = null;
              break;
            }
            default:
          }
        }
      };
    }
  };
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/getReactElementRef.js
var React3 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/reactVersion.js
var React2 = __toESM(require_react(), 1);
var majorVersion = parseInt(React2.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/getReactElementRef.js
function getReactElementRef(element) {
  if (!/* @__PURE__ */ React3.isValidElement(element)) {
    return null;
  }
  const reactElement = element;
  const propsWithRef = reactElement.props;
  return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/mergeObjects.js
function mergeObjects(a, b) {
  if (a && !b) {
    return a;
  }
  if (!a && b) {
    return b;
  }
  if (a || b) {
    return {
      ...a,
      ...b
    };
  }
  return void 0;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/empty.js
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/getStateAttributesProps.js
function getStateAttributesProps(state, customMapping) {
  const props = {};
  for (const key in state) {
    const value = state[key];
    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key](value);
      if (customProps != null) {
        Object.assign(props, customProps);
      }
      continue;
    }
    if (value === true) {
      props[`data-${key.toLowerCase()}`] = "";
    } else if (value) {
      props[`data-${key.toLowerCase()}`] = value.toString();
    }
  }
  return props;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/resolveClassName.js
function resolveClassName(className, state) {
  return typeof className === "function" ? className(state) : className;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/resolveStyle.js
function resolveStyle(style, state) {
  return typeof style === "function" ? style(state) : style;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/merge-props/mergeProps.js
var EMPTY_PROPS = {};
function mergeProps(a, b, c, d, e) {
  if (!c && !d && !e && !a) {
    return createInitialMergedProps(b);
  }
  let merged = createInitialMergedProps(a);
  if (b) {
    merged = mergeInto(merged, b);
  }
  if (c) {
    merged = mergeInto(merged, c);
  }
  if (d) {
    merged = mergeInto(merged, d);
  }
  if (e) {
    merged = mergeInto(merged, e);
  }
  return merged;
}
function mergePropsN(props) {
  if (props.length === 0) {
    return EMPTY_PROPS;
  }
  if (props.length === 1) {
    return createInitialMergedProps(props[0]);
  }
  let merged = createInitialMergedProps(props[0]);
  for (let i = 1; i < props.length; i += 1) {
    merged = mergeInto(merged, props[i]);
  }
  return merged;
}
function createInitialMergedProps(inputProps) {
  if (isPropsGetter(inputProps)) {
    return {
      ...resolvePropsGetter(inputProps, EMPTY_PROPS)
    };
  }
  return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
  if (isPropsGetter(inputProps)) {
    return resolvePropsGetter(inputProps, merged);
  }
  return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
  const copiedProps = {
    ...inputProps
  };
  for (const propName in copiedProps) {
    const propValue = copiedProps[propName];
    if (isEventHandler(propName, propValue)) {
      copiedProps[propName] = wrapEventHandler(propValue);
    }
  }
  return copiedProps;
}
function mutablyMergeInto(mergedProps, externalProps) {
  if (!externalProps) {
    return mergedProps;
  }
  for (const propName in externalProps) {
    const externalPropValue = externalProps[propName];
    switch (propName) {
      case "style": {
        mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
        break;
      }
      case "className": {
        mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
        break;
      }
      default: {
        if (isEventHandler(propName, externalPropValue)) {
          mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
        } else {
          mergedProps[propName] = externalPropValue;
        }
      }
    }
  }
  return mergedProps;
}
function isEventHandler(key, value) {
  const code0 = key.charCodeAt(0);
  const code1 = key.charCodeAt(1);
  const code2 = key.charCodeAt(2);
  return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
}
function isPropsGetter(inputProps) {
  return typeof inputProps === "function";
}
function resolvePropsGetter(inputProps, previousProps) {
  if (isPropsGetter(inputProps)) {
    return inputProps(previousProps);
  }
  return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
  if (!theirHandler) {
    return ourHandler;
  }
  if (!ourHandler) {
    return wrapEventHandler(theirHandler);
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      const baseUIEvent = event;
      makeEventPreventable(baseUIEvent);
      const result2 = theirHandler(...args);
      if (!baseUIEvent.baseUIHandlerPrevented) {
        ourHandler?.(...args);
      }
      return result2;
    }
    const result = theirHandler(...args);
    ourHandler?.(...args);
    return result;
  };
}
function wrapEventHandler(handler) {
  if (!handler) {
    return handler;
  }
  return (...args) => {
    const event = args[0];
    if (isSyntheticEvent(event)) {
      makeEventPreventable(event);
    }
    return handler(...args);
  };
}
function makeEventPreventable(event) {
  event.preventBaseUIHandler = () => {
    event.baseUIHandlerPrevented = true;
  };
  return event;
}
function mergeClassNames(ourClassName, theirClassName) {
  if (theirClassName) {
    if (ourClassName) {
      return theirClassName + " " + ourClassName;
    }
    return theirClassName;
  }
  return ourClassName;
}
function isSyntheticEvent(event) {
  return event != null && typeof event === "object" && "nativeEvent" in event;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useRenderElement.js
var import_react = __toESM(require_react(), 1);
function useRenderElement(element, componentProps, params = {}) {
  const renderProp = componentProps.render;
  const outProps = useRenderElementProps(componentProps, params);
  if (params.enabled === false) {
    return null;
  }
  const state = params.state ?? EMPTY_OBJECT;
  return evaluateRenderProp(element, renderProp, outProps, state);
}
function useRenderElementProps(componentProps, params = {}) {
  const {
    className: classNameProp,
    style: styleProp,
    render: renderProp
  } = componentProps;
  const {
    state = EMPTY_OBJECT,
    ref,
    props,
    stateAttributesMapping,
    enabled = true
  } = params;
  const className = enabled ? resolveClassName(classNameProp, state) : void 0;
  const style = enabled ? resolveStyle(styleProp, state) : void 0;
  const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping) : EMPTY_OBJECT;
  const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : void 0;
  const outProps = enabled ? mergeObjects(stateProps, resolvedProps) ?? {} : EMPTY_OBJECT;
  if (typeof document !== "undefined") {
    if (!enabled) {
      useMergedRefs(null, null);
    } else if (Array.isArray(ref)) {
      outProps.ref = useMergedRefsN([outProps.ref, getReactElementRef(renderProp), ...ref]);
    } else {
      outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
    }
  }
  if (!enabled) {
    return EMPTY_OBJECT;
  }
  if (className !== void 0) {
    outProps.className = mergeClassNames(outProps.className, className);
  }
  if (style !== void 0) {
    outProps.style = mergeObjects(outProps.style, style);
  }
  return outProps;
}
function resolveRenderFunctionProps(props) {
  if (Array.isArray(props)) {
    return mergePropsN(props);
  }
  return mergeProps(void 0, props);
}
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var COMPONENT_IDENTIFIER_PATTERN = /^[A-Z][A-Za-z0-9$]*$/;
var LOWERCASE_CHARACTER_PATTERN = /[a-z]/;
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === "function") {
      if (true) {
        warnIfRenderPropLooksLikeComponent(render);
      }
      return render(props, state);
    }
    const mergedProps = mergeProps(props, render.props);
    mergedProps.ref = props.ref;
    let newElement = render;
    if (newElement?.$$typeof === REACT_LAZY_TYPE) {
      const children = React4.Children.toArray(render);
      newElement = children[0];
    }
    if (true) {
      if (!/* @__PURE__ */ React4.isValidElement(newElement)) {
        throw new Error(["Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.", "A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.", "https://base-ui.com/r/invalid-render-prop"].join("\n"));
      }
    }
    return /* @__PURE__ */ React4.cloneElement(newElement, mergedProps);
  }
  if (element) {
    if (typeof element === "string") {
      return renderTag(element, props);
    }
  }
  throw new Error(true ? "Base UI: Render element or function are not defined." : formatErrorMessage_default(8));
}
function warnIfRenderPropLooksLikeComponent(renderFn) {
  const functionName = renderFn.name;
  if (functionName.length === 0) {
    return;
  }
  if (!COMPONENT_IDENTIFIER_PATTERN.test(functionName)) {
    return;
  }
  if (!LOWERCASE_CHARACTER_PATTERN.test(functionName)) {
    return;
  }
  warn(`The \`render\` prop received a function named \`${functionName}\` that starts with an uppercase letter.`, "This usually means a React component was passed directly as `render={Component}`.", "Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.", "If this is an intentional render callback, rename it to start with a lowercase letter.", "Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.", "https://base-ui.com/r/invalid-render-prop");
}
function renderTag(Tag, props) {
  if (Tag === "button") {
    return /* @__PURE__ */ (0, import_react.createElement)("button", {
      type: "button",
      ...props,
      key: props.key
    });
  }
  if (Tag === "img") {
    return /* @__PURE__ */ (0, import_react.createElement)("img", {
      alt: "",
      ...props,
      key: props.key
    });
  }
  return /* @__PURE__ */ React4.createElement(Tag, props);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/use-render/useRender.js
function useRender(params) {
  return useRenderElement(params.defaultTagName ?? "div", params, params);
}

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/stack/stack.mjs
var import_element = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
  const globalScope = globalThis;
  if (globalScope.__wpStyleRuntime) {
    return globalScope.__wpStyleRuntime;
  }
  globalScope.__wpStyleRuntime = {
    documents: /* @__PURE__ */ new Map(),
    styles: /* @__PURE__ */ new Map(),
    injectedStyles: /* @__PURE__ */ new WeakMap()
  };
  if (typeof document !== "undefined") {
    registerDocument(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
  const runtime = getRuntime();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle(targetDocument, hash, css);
  }
  return () => {
    const count = runtime.documents.get(targetDocument);
    if (count === void 0) {
      return;
    }
    if (count <= 1) {
      runtime.documents.delete(targetDocument);
      return;
    }
    runtime.documents.set(targetDocument, count - 1);
  };
}
function registerStyle(hash, css) {
  const runtime = getRuntime();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle("b51ff41489", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._19ce0419607e1896__stack{display:flex}}");
}
var style_default = { "stack": "_19ce0419607e1896__stack" };
var gapTokens = {
  xs: "var(--wpds-dimension-gap-xs, 4px)",
  sm: "var(--wpds-dimension-gap-sm, 8px)",
  md: "var(--wpds-dimension-gap-md, 12px)",
  lg: "var(--wpds-dimension-gap-lg, 16px)",
  xl: "var(--wpds-dimension-gap-xl, 24px)",
  "2xl": "var(--wpds-dimension-gap-2xl, 32px)",
  "3xl": "var(--wpds-dimension-gap-3xl, 40px)"
};
var Stack = (0, import_element.forwardRef)(function Stack2({ direction, gap, align, justify, wrap, render, ...props }, ref) {
  const style = {
    gap: gap && gapTokens[gap],
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    flexWrap: wrap
  };
  const element = useRender({
    render,
    ref,
    props: mergeProps(props, { style, className: style_default.stack })
  });
  return element;
});

// packages/fields/build-module/report-params-field/report-params-field.mjs
var import_react3 = __toESM(require_react(), 1);

// packages/fields/build-module/helpers/store-info.mjs
function getStoreInfo() {
  return {};
}

// packages/fields/build-module/report-params-field/report-params-field.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function ReportParamsField({
  data: attributes,
  onChange
}) {
  const [stagedReportParams, setStagedReportParams] = (0, import_react3.useState)(
    attributes?.reportParams
  );
  const { launchedDate } = getStoreInfo();
  const defaultPreset = getDefaultPreset(launchedDate);
  const reportParams = normalizeReportParams2(stagedReportParams, defaultPreset);
  const range = {
    from: localTZDate2(reportParams.from),
    to: localTZDate2(reportParams.to)
  };
  const stageDateRange = (0, import_react3.useCallback)(
    (nextRange, nextPresetId) => {
      const nextReportParams = { ...stagedReportParams };
      if (nextRange?.from && nextRange?.to) {
        nextReportParams.from = encodeDateToSearchParam(nextRange.from);
        nextReportParams.to = encodeDateToSearchParam(endOfDay(nextRange.to));
      }
      if (nextPresetId && isPrimaryPreset(nextPresetId)) {
        nextReportParams.preset = nextPresetId;
      } else if (nextPresetId) {
        delete nextReportParams.preset;
      }
      if (reportParams.comp === "1") {
        const derived = deriveComparisonRange(nextReportParams);
        if (derived) {
          nextReportParams.compare_from = derived.compare_from;
          nextReportParams.compare_to = derived.compare_to;
        }
      }
      setStagedReportParams(nextReportParams);
    },
    [stagedReportParams, reportParams.comp]
  );
  const isDateRangeDirty = (0, import_react3.useMemo)(() => {
    return attributes?.reportParams?.from !== stagedReportParams?.from || attributes?.reportParams?.to !== stagedReportParams?.to || attributes?.reportParams?.preset !== stagedReportParams?.preset;
  }, [
    attributes?.reportParams?.from,
    attributes?.reportParams?.to,
    attributes?.reportParams?.preset,
    stagedReportParams?.from,
    stagedReportParams?.to,
    stagedReportParams?.preset
  ]);
  const commitComparisonRange = (0, import_react3.useCallback)(
    (nextComparisonRange, nextComparisonPresetId) => {
      onChange({
        reportParams: {
          ...reportParams,
          compare_from: encodeDateToSearchParam(nextComparisonRange?.from),
          compare_to: encodeDateToSearchParam(nextComparisonRange?.to),
          compare_preset: nextComparisonPresetId,
          comp: "1"
        }
      });
    },
    [onChange, reportParams]
  );
  const commit = (0, import_react3.useCallback)(() => {
    onChange({ reportParams: stagedReportParams });
  }, [onChange, stagedReportParams]);
  const clear = (0, import_react3.useCallback)(() => {
    setStagedReportParams(attributes?.reportParams);
  }, [setStagedReportParams, attributes]);
  const [containerElement, setContainerElement] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    const node = document.querySelector(".next-admin-layout__surface");
    setContainerElement(node);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, { direction: "column", gap: "sm", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    DateFiltersPanel,
    {
      range,
      presetId: stagedReportParams?.preset ?? reportParams.preset,
      comparisonPresetId: attributes?.reportParams?.compare_preset,
      onChange: stageDateRange,
      onComparisonChange: commitComparisonRange,
      onApply: commit,
      canApply: isDateRangeDirty,
      onCancel: clear,
      timeZone: getSiteTimezone2(),
      containerElement
    }
  ) });
}
export {
  ReportParamsField
};
//# sourceMappingURL=index.js.map
