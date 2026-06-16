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

// package-external:@wordpress/i18n
var require_i18n = __commonJS({
  "package-external:@wordpress/i18n"(exports, module) {
    module.exports = window.wp.i18n;
  }
});

// package-external:@wordpress/components
var require_components = __commonJS({
  "package-external:@wordpress/components"(exports, module) {
    module.exports = window.wp.components;
  }
});

// package-external:@wordpress/element
var require_element = __commonJS({
  "package-external:@wordpress/element"(exports, module) {
    module.exports = window.wp.element;
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

// vendor-external:react-dom
var require_react_dom = __commonJS({
  "vendor-external:react-dom"(exports, module) {
    module.exports = window.ReactDOM;
  }
});

// package-external:@wordpress/primitives
var require_primitives = __commonJS({
  "package-external:@wordpress/primitives"(exports, module) {
    module.exports = window.wp.primitives;
  }
});

// package-external:@wordpress/compose
var require_compose = __commonJS({
  "package-external:@wordpress/compose"(exports, module) {
    module.exports = window.wp.compose;
  }
});

// package-external:@wordpress/private-apis
var require_private_apis = __commonJS({
  "package-external:@wordpress/private-apis"(exports, module) {
    module.exports = window.wp.privateApis;
  }
});

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constants.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
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

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/max.js
function max(dates, options) {
  let result;
  let context = options?.in;
  dates.forEach((date) => {
    if (!context && typeof date === "object")
      context = constructFrom.bind(null, date);
    const date_ = toDate(date, context);
    if (!result || result < date_ || isNaN(+date_)) result = date_;
  });
  return constructFrom(context, result || NaN);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/min.js
function min(dates, options) {
  let result;
  let context = options?.in;
  dates.forEach((date) => {
    if (!context && typeof date === "object")
      context = constructFrom.bind(null, date);
    const date_ = toDate(date, context);
    if (!result || result > date_ || isNaN(+date_)) result = date_;
  });
  return constructFrom(context, result || NaN);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameDay.js
function isSameDay(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return +startOfDay(dateLeft_) === +startOfDay(dateRight_);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
function isValid(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarMonths.js
function differenceInCalendarMonths(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
  return yearsDiff * 12 + monthsDiff;
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

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfMonth.js
function endOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeInterval.js
function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachMonthOfInterval.js
function eachMonthOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  date.setDate(1);
  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setMonth(date.getMonth() + step);
  }
  return reversed ? dates.reverse() : dates;
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

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachYearOfInterval.js
function eachYearOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  date.setMonth(0, 1);
  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setFullYear(date.getFullYear() + step);
  }
  return reversed ? dates.reverse() : dates;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfWeek.js
function endOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfISOWeek.js
function endOfISOWeek(date, options) {
  return endOfWeek(date, { ...options, weekStartsOn: 1 });
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
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
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

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDaysInMonth.js
function getDaysInMonth(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth = constructFrom(_date, 0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getMonth.js
function getMonth(date, options) {
  return toDate(date, options?.in).getMonth();
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getYear.js
function getYear(date, options) {
  return toDate(date, options?.in).getFullYear();
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isAfter.js
function isAfter(date, dateToCompare) {
  return +toDate(date) > +toDate(dateToCompare);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isBefore.js
function isBefore(date, dateToCompare) {
  return +toDate(date) < +toDate(dateToCompare);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameMonth.js
function isSameMonth(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear() && laterDate_.getMonth() === earlierDate_.getMonth();
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameYear.js
function isSameYear(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear();
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subDays.js
function subDays(date, amount, options) {
  return addDays(date, -amount, options);
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setMonth.js
function setMonth(date, month, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const day = _date.getDate();
  const midMonth = constructFrom(options?.in || date, 0);
  midMonth.setFullYear(year, month, 15);
  midMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(midMonth);
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}

// ../../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setYear.js
function setYear(date, year, options) {
  const date_ = toDate(date, options?.in);
  if (isNaN(+date_)) return constructFrom(options?.in || date, NaN);
  date_.setFullYear(year);
  return date_;
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
var COMPARISON_PRESETS = [
  COMPARISON_PREVIOUS_PERIOD,
  COMPARISON_PREVIOUS_WEEK,
  COMPARISON_PREVIOUS_MONTH,
  COMPARISON_PREVIOUS_YEAR
];
function isComparisonPresetId(value) {
  return typeof value === "string" && COMPARISON_PRESETS.includes(value);
}
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
function createTZDateFromParts([year, month, day, hours, minutes, seconds, milliseconds], timeZone) {
  const tzid = timeZone ?? "+00:00";
  const dateParts = [year, month, day, hours, minutes, seconds, milliseconds];
  const idx = dateParts.indexOf(void 0);
  const datePartsTrimmed = idx === -1 ? dateParts : dateParts.slice(0, idx);
  return new TZDateMini(...datePartsTrimmed, tzid);
}
function toLocalTZ(value, timeZone) {
  const tzid = timeZone ?? "+00:00";
  if (value !== void 0) {
    return new TZDateMini(value, tzid);
  }
  return TZDateMini.tz(tzid);
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

// packages/datetime/src/presets/primary.ts
var import_i18n = __toESM(require_i18n(), 1);
var PRESET_DEFINITIONS = [
  {
    id: PRESET_TODAY,
    getLabel: () => (0, import_i18n.__)("Today", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfToday }) => ({
      from: initOfToday,
      to: endOfToday
    })
  },
  {
    id: PRESET_YESTERDAY,
    getLabel: () => (0, import_i18n.__)("Yesterday", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 1),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_7_DAYS,
    getLabel: () => (0, import_i18n.__)("Last 7 days", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 7),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_30_DAYS,
    getLabel: () => (0, import_i18n.__)("Last 30 days", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 30),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_90_DAYS,
    getLabel: () => (0, import_i18n.__)("Last 90 days", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 90),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_365_DAYS,
    getLabel: () => (0, import_i18n.__)("Last 365 days", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfYesterday }) => ({
      from: subDays(initOfToday, 365),
      to: endOfYesterday
    })
  },
  {
    id: PRESET_LAST_MONTH,
    getLabel: () => (0, import_i18n.__)("Last month", "jetpack-premium-analytics"),
    getRange: ({ lastMonth, endOfLastMonth }) => ({
      from: startOfMonth(lastMonth),
      to: endOfLastMonth
    })
  },
  {
    id: PRESET_LAST_12_MONTHS,
    getLabel: () => (0, import_i18n.__)("Last 12 months", "jetpack-premium-analytics"),
    getRange: ({ initOfToday, endOfLastMonth }) => ({
      from: startOfMonth(subMonths(initOfToday, 12)),
      to: endOfLastMonth
    })
  },
  {
    id: PRESET_LAST_YEAR,
    getLabel: () => (0, import_i18n.__)("Last year", "jetpack-premium-analytics"),
    getRange: ({ lastYear }) => ({
      from: startOfYear(lastYear),
      to: endOfYear(lastYear)
    })
  }
];
function getPresetLabel(id) {
  if (!id || id === PRESET_CUSTOM) {
    return null;
  }
  const preset = PRESET_DEFINITIONS.find((p) => p.id === id);
  return preset?.getLabel() ?? null;
}
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
function getDefaultDateRangePresets(timeZone) {
  const ctx = buildDateContext(timeZone);
  return PRESET_DEFINITIONS.map(({ id, getLabel, getRange }) => ({
    id,
    label: getLabel(),
    range: getRange(ctx)
  }));
}

// packages/datetime/src/presets/comparison.ts
var import_i18n2 = __toESM(require_i18n(), 1);
var COMPARISON_PRESET_LABELS = [
  {
    id: COMPARISON_PREVIOUS_PERIOD,
    getLabel: () => (0, import_i18n2.__)("Previous period", "jetpack-premium-analytics")
  },
  {
    id: COMPARISON_PREVIOUS_WEEK,
    getLabel: () => (0, import_i18n2.__)("Previous week", "jetpack-premium-analytics")
  },
  {
    id: COMPARISON_PREVIOUS_MONTH,
    getLabel: () => (0, import_i18n2.__)("Previous month", "jetpack-premium-analytics")
  },
  {
    id: COMPARISON_PREVIOUS_YEAR,
    getLabel: () => (0, import_i18n2.__)("Previous year", "jetpack-premium-analytics")
  }
];
function getComparisonPresetConfigs() {
  return COMPARISON_PRESET_LABELS.map(({ id, getLabel }) => ({
    id,
    label: getLabel()
  }));
}

// packages/ui/build-module/date-filters-panel/date-filters-panel.mjs
var import_components4 = __toESM(require_components(), 1);

// ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/badge/badge.mjs
var import_element2 = __toESM(require_element(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useControlled.js
var React = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/error.js
var set;
if (true) {
  set = /* @__PURE__ */ new Set();
}
function error(...messages) {
  if (true) {
    const messageKey = messages.join(" ");
    if (!set.has(messageKey)) {
      set.add(messageKey);
      console.error(`Base UI: ${messageKey}`);
    }
  }
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useControlled.js
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React.useRef(controlled !== void 0);
  const [valueState, setValue] = React.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (true) {
    React.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        error([`A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React.useRef(defaultProp);
    React.useEffect(() => {
      if (!isControlled && serializeToDevModeString(defaultValue) !== serializeToDevModeString(defaultProp)) {
        error([`A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [defaultProp]);
  }
  const setValueIfUncontrolled = React.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function serializeToDevModeString(input) {
  let nextId = 0;
  const seen = /* @__PURE__ */ new WeakMap();
  try {
    const result = JSON.stringify(input, function replacer(key, value) {
      if (key === "_owner" && this != null && typeof this === "object" && "$$typeof" in this) {
        return void 0;
      }
      if (typeof value === "bigint") {
        return `__bigint__:${value}`;
      }
      if (value !== null && typeof value === "object") {
        const id = seen.get(value);
        if (id !== void 0) {
          return `__object__:${id}`;
        }
        seen.set(value, nextId);
        nextId += 1;
      }
      return value;
    });
    return result ?? `__top__:${typeof input}`;
  } catch {
    return "__unserializable__";
  }
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/safeReact.js
var React2 = __toESM(require_react(), 1);
var SafeReact = {
  ...React2
};

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useRefWithInit.js
var React3 = __toESM(require_react(), 1);
var UNINITIALIZED = {};
function useRefWithInit(init, initArg) {
  const ref = React3.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useStableCallback.js
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = (
  // React 17 doesn't have useInsertionEffect.
  useInsertionEffect && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  useInsertionEffect !== SafeReact.useLayoutEffect ? useInsertionEffect : (fn) => fn()
);
function useStableCallback(callback) {
  const stable = useRefWithInit(createStableCallback).current;
  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}
function createStableCallback() {
  const stable = {
    next: void 0,
    callback: assertNotCalled,
    trampoline: (...args) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    }
  };
  return stable;
}
function assertNotCalled() {
  if (true) {
    throw (
      /* minify-error-disabled */
      new Error("Base UI: Cannot call an event handler while rendering.")
    );
  }
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js
var React4 = __toESM(require_react(), 1);
var noop = () => {
};
var useIsoLayoutEffect = typeof document !== "undefined" ? React4.useLayoutEffect : noop;

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/warn.js
var set2;
if (true) {
  set2 = /* @__PURE__ */ new Set();
}
function warn(...messages) {
  if (true) {
    const messageKey = messages.join(" ");
    if (!set2.has(messageKey)) {
      set2.add(messageKey);
      console.warn(`Base UI: ${messageKey}`);
    }
  }
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useRenderElement.js
var React7 = __toESM(require_react(), 1);

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
var React6 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/reactVersion.js
var React5 = __toESM(require_react(), 1);
var majorVersion = parseInt(React5.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/getReactElementRef.js
function getReactElementRef(element) {
  if (!/* @__PURE__ */ React6.isValidElement(element)) {
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
function NOOP() {
}
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
    stateAttributesMapping: stateAttributesMapping2,
    enabled = true
  } = params;
  const className = enabled ? resolveClassName(classNameProp, state) : void 0;
  const style = enabled ? resolveStyle(styleProp, state) : void 0;
  const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping2) : EMPTY_OBJECT;
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
      const children = React7.Children.toArray(render);
      newElement = children[0];
    }
    if (true) {
      if (!/* @__PURE__ */ React7.isValidElement(newElement)) {
        throw new Error(["Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.", "A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.", "https://base-ui.com/r/invalid-render-prop"].join("\n"));
      }
    }
    return /* @__PURE__ */ React7.cloneElement(newElement, mergedProps);
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
  return /* @__PURE__ */ React7.createElement(Tag, props);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/reason-parts.js
var reason_parts_exports = {};
__export(reason_parts_exports, {
  cancelOpen: () => cancelOpen,
  chipRemovePress: () => chipRemovePress,
  clearPress: () => clearPress,
  closePress: () => closePress,
  closeWatcher: () => closeWatcher,
  decrementPress: () => decrementPress,
  disabled: () => disabled,
  drag: () => drag,
  escapeKey: () => escapeKey,
  focusOut: () => focusOut,
  imperativeAction: () => imperativeAction,
  incrementPress: () => incrementPress,
  initial: () => initial,
  inputBlur: () => inputBlur,
  inputChange: () => inputChange,
  inputClear: () => inputClear,
  inputPaste: () => inputPaste,
  inputPress: () => inputPress,
  itemPress: () => itemPress,
  keyboard: () => keyboard,
  linkPress: () => linkPress,
  listNavigation: () => listNavigation,
  missing: () => missing,
  none: () => none,
  outsidePress: () => outsidePress,
  pointer: () => pointer,
  scrub: () => scrub,
  siblingOpen: () => siblingOpen,
  swipe: () => swipe,
  trackPress: () => trackPress,
  triggerFocus: () => triggerFocus,
  triggerHover: () => triggerHover,
  triggerPress: () => triggerPress,
  wheel: () => wheel,
  windowResize: () => windowResize
});
var none = "none";
var triggerPress = "trigger-press";
var triggerHover = "trigger-hover";
var triggerFocus = "trigger-focus";
var outsidePress = "outside-press";
var itemPress = "item-press";
var closePress = "close-press";
var linkPress = "link-press";
var clearPress = "clear-press";
var chipRemovePress = "chip-remove-press";
var trackPress = "track-press";
var incrementPress = "increment-press";
var decrementPress = "decrement-press";
var inputChange = "input-change";
var inputClear = "input-clear";
var inputBlur = "input-blur";
var inputPaste = "input-paste";
var inputPress = "input-press";
var focusOut = "focus-out";
var escapeKey = "escape-key";
var closeWatcher = "close-watcher";
var listNavigation = "list-navigation";
var keyboard = "keyboard";
var pointer = "pointer";
var drag = "drag";
var wheel = "wheel";
var scrub = "scrub";
var cancelOpen = "cancel-open";
var siblingOpen = "sibling-open";
var disabled = "disabled";
var missing = "missing";
var initial = "initial";
var imperativeAction = "imperative-action";
var swipe = "swipe";
var windowResize = "window-resize";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/createBaseUIEventDetails.js
function createChangeEventDetails(reason, event, trigger, customProperties) {
  let canceled = false;
  let allowPropagation = false;
  const custom = customProperties ?? EMPTY_OBJECT;
  const details = {
    reason,
    event: event ?? new Event("base-ui"),
    cancel() {
      canceled = true;
    },
    allowPropagation() {
      allowPropagation = true;
    },
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return allowPropagation;
    },
    trigger,
    ...custom
  };
  return details;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useId.js
var React8 = __toESM(require_react(), 1);
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
  const [defaultId, setDefaultId] = React8.useState(idOverride);
  const id = idOverride || defaultId;
  React8.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`${prefix}-${globalId}`);
    }
  }, [defaultId, prefix]);
  return id;
}
var maybeReactUseId = SafeReact.useId;
function useId(idOverride, prefix) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
  }
  return useGlobalId(idOverride, prefix);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useBaseUiId.js
function useBaseUiId(idOverride) {
  return useId(idOverride, "base-ui");
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useTransitionStatus.js
var React10 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useOnMount.js
var React9 = __toESM(require_react(), 1);
var EMPTY = [];
function useOnMount(fn) {
  React9.useEffect(fn, EMPTY);
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useAnimationFrame.js
var EMPTY2 = null;
var LAST_RAF = globalThis.requestAnimationFrame;
var Scheduler = class {
  /* This implementation uses an array as a backing data-structure for frame callbacks.
   * It allows `O(1)` callback cancelling by inserting a `null` in the array, though it
   * never calls the native `cancelAnimationFrame` if there are no frames left. This can
   * be much more efficient if there is a call pattern that alterns as
   * "request-cancel-request-cancel-…".
   * But in the case of "request-request-…-cancel-cancel-…", it leaves the final animation
   * frame to run anyway. We turn that frame into a `O(1)` no-op via `callbacksCount`. */
  callbacks = [];
  callbacksCount = 0;
  nextId = 1;
  startId = 1;
  isScheduled = false;
  tick = (timestamp) => {
    this.isScheduled = false;
    const currentCallbacks = this.callbacks;
    const currentCallbacksCount = this.callbacksCount;
    this.callbacks = [];
    this.callbacksCount = 0;
    this.startId = this.nextId;
    if (currentCallbacksCount > 0) {
      for (let i = 0; i < currentCallbacks.length; i += 1) {
        currentCallbacks[i]?.(timestamp);
      }
    }
  };
  request(fn) {
    const id = this.nextId;
    this.nextId += 1;
    this.callbacks.push(fn);
    this.callbacksCount += 1;
    const didRAFChange = LAST_RAF !== requestAnimationFrame && (LAST_RAF = requestAnimationFrame, true);
    if (!this.isScheduled || didRAFChange) {
      requestAnimationFrame(this.tick);
      this.isScheduled = true;
    }
    return id;
  }
  cancel(id) {
    const index = id - this.startId;
    if (index < 0 || index >= this.callbacks.length) {
      return;
    }
    this.callbacks[index] = null;
    this.callbacksCount -= 1;
  }
};
var scheduler = new Scheduler();
var AnimationFrame = class _AnimationFrame {
  static create() {
    return new _AnimationFrame();
  }
  static request(fn) {
    return scheduler.request(fn);
  }
  static cancel(id) {
    return scheduler.cancel(id);
  }
  currentId = EMPTY2;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(fn) {
    this.cancel();
    this.currentId = scheduler.request(() => {
      this.currentId = EMPTY2;
      fn();
    });
  }
  cancel = () => {
    if (this.currentId !== EMPTY2) {
      scheduler.cancel(this.currentId);
      this.currentId = EMPTY2;
    }
  };
  disposeEffect = () => {
    return this.cancel;
  };
};
function useAnimationFrame() {
  const timeout = useRefWithInit(AnimationFrame.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useTransitionStatus.js
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
  const [transitionStatus, setTransitionStatus] = React10.useState(open && enableIdleState ? "idle" : void 0);
  const [mounted, setMounted] = React10.useState(open);
  if (open && !mounted) {
    setMounted(true);
    setTransitionStatus("starting");
  }
  if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) {
    setTransitionStatus("ending");
  }
  if (!open && !mounted && transitionStatus === "ending") {
    setTransitionStatus(void 0);
  }
  useIsoLayoutEffect(() => {
    if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
      const frame = AnimationFrame.request(() => {
        setTransitionStatus("ending");
      });
      return () => {
        AnimationFrame.cancel(frame);
      };
    }
    return void 0;
  }, [open, mounted, transitionStatus, deferEndingState]);
  useIsoLayoutEffect(() => {
    if (!open || enableIdleState) {
      return void 0;
    }
    const frame = AnimationFrame.request(() => {
      setTransitionStatus(void 0);
    });
    return () => {
      AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open]);
  useIsoLayoutEffect(() => {
    if (!open || !enableIdleState) {
      return void 0;
    }
    if (open && mounted && transitionStatus !== "idle") {
      setTransitionStatus("starting");
    }
    const frame = AnimationFrame.request(() => {
      setTransitionStatus("idle");
    });
    return () => {
      AnimationFrame.cancel(frame);
    };
  }, [enableIdleState, open, mounted, transitionStatus]);
  return {
    mounted,
    setMounted,
    transitionStatus
  };
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/stateAttributesMapping.js
var TransitionStatusDataAttributes = /* @__PURE__ */ (function(TransitionStatusDataAttributes2) {
  TransitionStatusDataAttributes2["startingStyle"] = "data-starting-style";
  TransitionStatusDataAttributes2["endingStyle"] = "data-ending-style";
  return TransitionStatusDataAttributes2;
})({});
var STARTING_HOOK = {
  [TransitionStatusDataAttributes.startingStyle]: ""
};
var ENDING_HOOK = {
  [TransitionStatusDataAttributes.endingStyle]: ""
};
var transitionStatusMapping = {
  transitionStatus(value) {
    if (value === "starting") {
      return STARTING_HOOK;
    }
    if (value === "ending") {
      return ENDING_HOOK;
    }
    return null;
  }
};

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/use-button/useButton.js
var React13 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/composite/root/CompositeRootContext.js
var React11 = __toESM(require_react(), 1);
var CompositeRootContext = /* @__PURE__ */ React11.createContext(void 0);
if (true) CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
  const context = React11.useContext(CompositeRootContext);
  if (context === void 0 && !optional) {
    throw new Error(true ? "Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>." : formatErrorMessage_default(16));
  }
  return context;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/useFocusableWhenDisabled.js
var React12 = __toESM(require_react(), 1);
function useFocusableWhenDisabled(parameters) {
  const {
    focusableWhenDisabled,
    disabled: disabled2,
    composite = false,
    tabIndex: tabIndexProp = 0,
    isNativeButton
  } = parameters;
  const isFocusableComposite = composite && focusableWhenDisabled !== false;
  const isNonFocusableComposite = composite && focusableWhenDisabled === false;
  const props = React12.useMemo(() => {
    const additionalProps = {
      // allow Tabbing away from focusableWhenDisabled elements
      onKeyDown(event) {
        if (disabled2 && focusableWhenDisabled && event.key !== "Tab") {
          event.preventDefault();
        }
      }
    };
    if (!composite) {
      additionalProps.tabIndex = tabIndexProp;
      if (!isNativeButton && disabled2) {
        additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
      }
    }
    if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled2) {
      additionalProps["aria-disabled"] = disabled2;
    }
    if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
      additionalProps.disabled = disabled2;
    }
    return additionalProps;
  }, [composite, disabled2, focusableWhenDisabled, isFocusableComposite, isNonFocusableComposite, isNativeButton, tabIndexProp]);
  return {
    props
  };
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/use-button/useButton.js
function useButton(parameters = {}) {
  const {
    disabled: disabled2 = false,
    focusableWhenDisabled,
    tabIndex = 0,
    native: isNativeButton = true,
    composite: compositeProp
  } = parameters;
  const elementRef = React13.useRef(null);
  const compositeRootContext = useCompositeRootContext(true);
  const isCompositeItem = compositeProp ?? compositeRootContext !== void 0;
  const {
    props: focusableWhenDisabledProps
  } = useFocusableWhenDisabled({
    focusableWhenDisabled,
    disabled: disabled2,
    composite: isCompositeItem,
    tabIndex,
    isNativeButton
  });
  if (true) {
    React13.useEffect(() => {
      if (!elementRef.current) {
        return;
      }
      const isButtonTag = isButtonElement(elementRef.current);
      if (isNativeButton) {
        if (!isButtonTag) {
          const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
          const message2 = "A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Use a real <button> in the `render` prop, or set `nativeButton` to `false`.";
          error(`${message2}${ownerStackMessage}`);
        }
      } else if (isButtonTag) {
        const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
        const message2 = "A component that acts as a button expected a non-<button> because the `nativeButton` prop is false. Rendering a <button> keeps native behavior while Base UI applies non-native attributes and handlers, which can add unintended extra attributes (such as `role` or `aria-disabled`). Use a non-<button> in the `render` prop, or set `nativeButton` to `true`.";
        error(`${message2}${ownerStackMessage}`);
      }
    }, [isNativeButton]);
  }
  const updateDisabled = React13.useCallback(() => {
    const element = elementRef.current;
    if (!isButtonElement(element)) {
      return;
    }
    if (isCompositeItem && disabled2 && focusableWhenDisabledProps.disabled === void 0 && element.disabled) {
      element.disabled = false;
    }
  }, [disabled2, focusableWhenDisabledProps.disabled, isCompositeItem]);
  useIsoLayoutEffect(updateDisabled, [updateDisabled]);
  const getButtonProps = React13.useCallback((externalProps = {}) => {
    const {
      onClick: externalOnClick,
      onMouseDown: externalOnMouseDown,
      onKeyUp: externalOnKeyUp,
      onKeyDown: externalOnKeyDown,
      onPointerDown: externalOnPointerDown,
      ...otherExternalProps
    } = externalProps;
    return mergeProps({
      onClick(event) {
        if (disabled2) {
          event.preventDefault();
          return;
        }
        externalOnClick?.(event);
      },
      onMouseDown(event) {
        if (!disabled2) {
          externalOnMouseDown?.(event);
        }
      },
      onKeyDown(event) {
        if (disabled2) {
          return;
        }
        makeEventPreventable(event);
        externalOnKeyDown?.(event);
        if (event.baseUIHandlerPrevented) {
          return;
        }
        const isCurrentTarget = event.target === event.currentTarget;
        const currentTarget = event.currentTarget;
        const isButton = isButtonElement(currentTarget);
        const isLink = !isNativeButton && isValidLinkElement(currentTarget);
        const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink);
        const isEnterKey = event.key === "Enter";
        const isSpaceKey = event.key === " ";
        const role = currentTarget.getAttribute("role");
        const isTextNavigationRole = role?.startsWith("menuitem") || role === "option" || role === "gridcell";
        if (isCurrentTarget && isCompositeItem && isSpaceKey) {
          if (event.defaultPrevented && isTextNavigationRole) {
            return;
          }
          event.preventDefault();
          if (isLink || isNativeButton && isButton) {
            currentTarget.click();
            event.preventBaseUIHandler();
          } else if (shouldClick) {
            externalOnClick?.(event);
            event.preventBaseUIHandler();
          }
          return;
        }
        if (shouldClick) {
          if (!isNativeButton && (isSpaceKey || isEnterKey)) {
            event.preventDefault();
          }
          if (!isNativeButton && isEnterKey) {
            externalOnClick?.(event);
          }
        }
      },
      onKeyUp(event) {
        if (disabled2) {
          return;
        }
        makeEventPreventable(event);
        externalOnKeyUp?.(event);
        if (event.target === event.currentTarget && isNativeButton && isCompositeItem && isButtonElement(event.currentTarget) && event.key === " ") {
          event.preventDefault();
          return;
        }
        if (event.baseUIHandlerPrevented) {
          return;
        }
        if (event.target === event.currentTarget && !isNativeButton && !isCompositeItem && event.key === " ") {
          externalOnClick?.(event);
        }
      },
      onPointerDown(event) {
        if (disabled2) {
          event.preventDefault();
          return;
        }
        externalOnPointerDown?.(event);
      }
    }, isNativeButton ? {
      type: "button"
    } : {
      role: "button"
    }, focusableWhenDisabledProps, otherExternalProps);
  }, [disabled2, focusableWhenDisabledProps, isCompositeItem, isNativeButton]);
  const buttonRef = useStableCallback((element) => {
    elementRef.current = element;
    updateDisabled();
  });
  return {
    getButtonProps,
    buttonRef
  };
}
function isButtonElement(elem) {
  return isHTMLElement(elem) && elem.tagName === "BUTTON";
}
function isValidLinkElement(elem) {
  return Boolean(elem?.tagName === "A" && elem?.href);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/shadowDom.js
function activeElement(doc) {
  let element = doc.activeElement;
  while (element?.shadowRoot?.activeElement != null) {
    element = element.shadowRoot.activeElement;
  }
  return element;
}
function getTarget(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0];
  }
  return event.target;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/owner.js
function ownerDocument(node) {
  return node?.ownerDocument || document;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useOpenChangeComplete.js
var React14 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useAnimationsFinished.js
var ReactDOM = __toESM(require_react_dom(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/resolveRef.js
function resolveRef(maybeRef) {
  if (maybeRef == null) {
    return maybeRef;
  }
  return "current" in maybeRef ? maybeRef.current : maybeRef;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useAnimationsFinished.js
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, treatAbortedAsFinished = true) {
  const frame = useAnimationFrame();
  return useStableCallback((fnToExecute, signal = null) => {
    frame.cancel();
    const element = resolveRef(elementOrRef);
    if (element == null) {
      return;
    }
    const resolvedElement = element;
    const done = () => {
      ReactDOM.flushSync(fnToExecute);
    };
    if (typeof resolvedElement.getAnimations !== "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      fnToExecute();
      return;
    }
    function exec() {
      Promise.all(resolvedElement.getAnimations().map((animation) => animation.finished)).then(() => {
        if (!signal?.aborted) {
          done();
        }
      }).catch(() => {
        if (treatAbortedAsFinished) {
          if (!signal?.aborted) {
            done();
          }
          return;
        }
        const currentAnimations = resolvedElement.getAnimations();
        if (!signal?.aborted && currentAnimations.length > 0 && currentAnimations.some((animation) => animation.pending || animation.playState !== "finished")) {
          exec();
        }
      });
    }
    if (waitForStartingStyleRemoved) {
      const startingStyleAttribute = TransitionStatusDataAttributes.startingStyle;
      if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
        frame.request(exec);
        return;
      }
      const attributeObserver = new MutationObserver(() => {
        if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
          attributeObserver.disconnect();
          exec();
        }
      });
      attributeObserver.observe(resolvedElement, {
        attributes: true,
        attributeFilter: [startingStyleAttribute]
      });
      signal?.addEventListener("abort", () => attributeObserver.disconnect(), {
        once: true
      });
      return;
    }
    frame.request(exec);
  });
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/useOpenChangeComplete.js
function useOpenChangeComplete(parameters) {
  const {
    enabled = true,
    open,
    ref,
    onComplete: onCompleteParam
  } = parameters;
  const onComplete = useStableCallback(onCompleteParam);
  const runOnceAnimationsFinish = useAnimationsFinished(ref, open, false);
  React14.useEffect(() => {
    if (!enabled) {
      return void 0;
    }
    const abortController = new AbortController();
    runOnceAnimationsFinish(onComplete, abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [enabled, open, onComplete, runOnceAnimationsFinish]);
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useTimeout.js
var EMPTY3 = 0;
var Timeout = class _Timeout {
  static create() {
    return new _Timeout();
  }
  currentId = EMPTY3;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = EMPTY3;
      fn();
    }, delay);
  }
  isStarted() {
    return this.currentId !== EMPTY3;
  }
  clear = () => {
    if (this.currentId !== EMPTY3) {
      clearTimeout(this.currentId);
      this.currentId = EMPTY3;
    }
  };
  disposeEffect = () => {
    return this.clear;
  };
};
function useTimeout() {
  const timeout = useRefWithInit(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/field-root-context/FieldRootContext.js
var React15 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/control/FieldControlDataAttributes.js
var FieldControlDataAttributes = /* @__PURE__ */ (function(FieldControlDataAttributes2) {
  FieldControlDataAttributes2["disabled"] = "data-disabled";
  FieldControlDataAttributes2["valid"] = "data-valid";
  FieldControlDataAttributes2["invalid"] = "data-invalid";
  FieldControlDataAttributes2["touched"] = "data-touched";
  FieldControlDataAttributes2["dirty"] = "data-dirty";
  FieldControlDataAttributes2["filled"] = "data-filled";
  FieldControlDataAttributes2["focused"] = "data-focused";
  return FieldControlDataAttributes2;
})({});

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/field-constants/constants.js
var DEFAULT_VALIDITY_STATE = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};
var DEFAULT_FIELD_STATE_ATTRIBUTES = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
};
var DEFAULT_FIELD_ROOT_STATE = {
  disabled: false,
  ...DEFAULT_FIELD_STATE_ATTRIBUTES
};
var fieldValidityMapping = {
  valid(value) {
    if (value === null) {
      return null;
    }
    if (value) {
      return {
        [FieldControlDataAttributes.valid]: ""
      };
    }
    return {
      [FieldControlDataAttributes.invalid]: ""
    };
  }
};

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/field-root-context/FieldRootContext.js
var DEFAULT_FIELD_ROOT_CONTEXT = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: DEFAULT_VALIDITY_STATE,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: NOOP,
  disabled: void 0,
  touched: DEFAULT_FIELD_STATE_ATTRIBUTES.touched,
  setTouched: NOOP,
  dirty: DEFAULT_FIELD_STATE_ATTRIBUTES.dirty,
  setDirty: NOOP,
  filled: DEFAULT_FIELD_STATE_ATTRIBUTES.filled,
  setFilled: NOOP,
  focused: DEFAULT_FIELD_STATE_ATTRIBUTES.focused,
  setFocused: NOOP,
  validate: () => null,
  validationMode: "onSubmit",
  validationDebounceTime: 0,
  shouldValidateOnChange: () => false,
  state: DEFAULT_FIELD_ROOT_STATE,
  markedDirtyRef: {
    current: false
  },
  registerFieldControl: NOOP,
  validation: {
    getValidationProps: (props = EMPTY_OBJECT) => props,
    getInputValidationProps: (props = EMPTY_OBJECT) => props,
    inputRef: {
      current: null
    },
    commit: async () => {
    }
  }
};
var FieldRootContext = /* @__PURE__ */ React15.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
if (true) FieldRootContext.displayName = "FieldRootContext";
function useFieldRootContext(optional = true) {
  const context = React15.useContext(FieldRootContext);
  if (context.setValidityData === NOOP && !optional) {
    throw new Error(true ? "Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>." : formatErrorMessage_default(28));
  }
  return context;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/field-register-control/useRegisterFieldControl.js
var React16 = __toESM(require_react(), 1);
function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true) {
  const {
    registerFieldControl
  } = useFieldRootContext();
  const sourceRef = React16.useRef(null);
  if (!sourceRef.current) {
    sourceRef.current = /* @__PURE__ */ Symbol();
  }
  useIsoLayoutEffect(() => {
    const source = sourceRef.current;
    if (!source || !enabled) {
      return void 0;
    }
    const registration = {
      controlRef,
      getValue: getFormValueOverride,
      id,
      value
    };
    registerFieldControl(source, registration);
    return () => {
      registerFieldControl(source, void 0);
    };
  }, [controlRef, enabled, getFormValueOverride, id, registerFieldControl, value]);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/form-context/FormContext.js
var React17 = __toESM(require_react(), 1);
var FormContext = /* @__PURE__ */ React17.createContext({
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: NOOP,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: false
  }
});
if (true) FormContext.displayName = "FormContext";
function useFormContext() {
  return React17.useContext(FormContext);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/labelable-provider/useLabelableId.js
var React19 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/labelable-provider/LabelableContext.js
var React18 = __toESM(require_react(), 1);
var LabelableContext = /* @__PURE__ */ React18.createContext({
  controlId: void 0,
  registerControlId: NOOP,
  labelId: void 0,
  setLabelId: NOOP,
  messageIds: [],
  setMessageIds: NOOP,
  getDescriptionProps: (externalProps) => externalProps
});
if (true) LabelableContext.displayName = "LabelableContext";
function useLabelableContext() {
  return React18.useContext(LabelableContext);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/labelable-provider/useLabelableId.js
function useLabelableId(params = {}) {
  const {
    id,
    implicit = false,
    controlRef
  } = params;
  const {
    controlId,
    registerControlId
  } = useLabelableContext();
  const defaultId = useBaseUiId(id);
  const controlIdForEffect = implicit ? controlId : void 0;
  const controlSourceRef = useRefWithInit(() => /* @__PURE__ */ Symbol("labelable-control"));
  const hasRegisteredRef = React19.useRef(false);
  const hadExplicitIdRef = React19.useRef(id != null);
  const unregisterControlId = useStableCallback(() => {
    if (!hasRegisteredRef.current || registerControlId === NOOP) {
      return;
    }
    hasRegisteredRef.current = false;
    registerControlId(controlSourceRef.current, void 0);
  });
  useIsoLayoutEffect(() => {
    if (registerControlId === NOOP) {
      return void 0;
    }
    let nextId;
    if (implicit) {
      const elem = controlRef?.current;
      if (isElement(elem) && elem.closest("label") != null) {
        nextId = id ?? null;
      } else {
        nextId = controlIdForEffect ?? defaultId;
      }
    } else if (id != null) {
      hadExplicitIdRef.current = true;
      nextId = id;
    } else if (hadExplicitIdRef.current) {
      nextId = defaultId;
    } else {
      unregisterControlId();
      return void 0;
    }
    if (nextId === void 0) {
      unregisterControlId();
      return void 0;
    }
    hasRegisteredRef.current = true;
    registerControlId(controlSourceRef.current, nextId);
    return void 0;
  }, [id, controlRef, controlIdForEffect, registerControlId, implicit, defaultId, controlSourceRef, unregisterControlId]);
  React19.useEffect(() => {
    return unregisterControlId;
  }, [unregisterControlId]);
  return controlId ?? defaultId;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/button/Button.js
var React20 = __toESM(require_react(), 1);
var Button = /* @__PURE__ */ React20.forwardRef(function Button2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabled2 = false,
    focusableWhenDisabled = false,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled: disabled2,
    focusableWhenDisabled,
    native: nativeButton
  });
  const state = {
    disabled: disabled2
  };
  return useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [elementProps, getButtonProps]
  });
});
if (true) Button.displayName = "Button";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/item/FieldItemContext.js
var React21 = __toESM(require_react(), 1);
var FieldItemContext = /* @__PURE__ */ React21.createContext({
  disabled: false
});
if (true) FieldItemContext.displayName = "FieldItemContext";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/checkbox-group/CheckboxGroupContext.js
var React22 = __toESM(require_react(), 1);
var CheckboxGroupContext = /* @__PURE__ */ React22.createContext(void 0);
if (true) CheckboxGroupContext.displayName = "CheckboxGroupContext";
function useCheckboxGroupContext(optional = true) {
  const context = React22.useContext(CheckboxGroupContext);
  if (context === void 0 && !optional) {
    throw new Error(true ? "Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>." : formatErrorMessage_default(3));
  }
  return context;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/useRegisteredLabelId.js
function useRegisteredLabelId(idProp, setLabelId) {
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId(void 0);
    };
  }, [id, setLabelId]);
  return id;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/labelable-provider/useLabel.js
function useLabel(params = {}) {
  const {
    id: idProp,
    fallbackControlId,
    native = false,
    setLabelId: setLabelIdProp,
    focusControl: focusControlProp
  } = params;
  const {
    controlId: contextControlId,
    setLabelId: setContextLabelId
  } = useLabelableContext();
  const syncLabelId = useStableCallback((nextLabelId) => {
    setContextLabelId(nextLabelId);
    setLabelIdProp?.(nextLabelId);
  });
  const id = useRegisteredLabelId(idProp, syncLabelId);
  const resolvedControlId = contextControlId ?? fallbackControlId;
  function focusControl(event) {
    if (focusControlProp) {
      focusControlProp(event, resolvedControlId);
      return;
    }
    if (!resolvedControlId) {
      return;
    }
    const controlElement = ownerDocument(event.currentTarget).getElementById(resolvedControlId);
    if (isHTMLElement(controlElement)) {
      focusElementWithVisible(controlElement);
    }
  }
  function handleInteraction(event) {
    const target = getTarget(event.nativeEvent);
    if (target?.closest("button,input,select,textarea")) {
      return;
    }
    if (!event.defaultPrevented && event.detail > 1) {
      event.preventDefault();
    }
    if (native) {
      return;
    }
    focusControl(event);
  }
  return native ? {
    id,
    htmlFor: resolvedControlId ?? void 0,
    onMouseDown: handleInteraction
  } : {
    id,
    onClick: handleInteraction,
    onPointerDown(event) {
      event.preventDefault();
    }
  };
}
function focusElementWithVisible(element) {
  element.focus({
    // Available from Chrome 144+ (January 2026).
    // Safari and Firefox already support it.
    focusVisible: true
  });
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/index.parts.js
var index_parts_exports = {};
__export(index_parts_exports, {
  Control: () => FieldControl,
  Description: () => FieldDescription,
  Error: () => FieldError,
  Item: () => FieldItem,
  Label: () => FieldLabel,
  Root: () => FieldRoot,
  Validity: () => FieldValidity
});

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/root/FieldRoot.js
var React27 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/fieldset/root/FieldsetRootContext.js
var React23 = __toESM(require_react(), 1);
var FieldsetRootContext = /* @__PURE__ */ React23.createContext({
  legendId: void 0,
  setLegendId: () => {
  },
  disabled: void 0
});
if (true) FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
  const context = React23.useContext(FieldsetRootContext);
  if (!context && !optional) {
    throw new Error(true ? "Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>." : formatErrorMessage_default(86));
  }
  return context;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/labelable-provider/LabelableProvider.js
var React24 = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var LabelableProvider = function LabelableProvider2(props) {
  const defaultId = useBaseUiId();
  const initialControlId = props.controlId === void 0 ? defaultId : props.controlId;
  const [controlId, setControlIdState] = React24.useState(initialControlId);
  const [labelId, setLabelId] = React24.useState(props.labelId);
  const [messageIds, setMessageIds] = React24.useState([]);
  const registrationsRef = useRefWithInit(() => /* @__PURE__ */ new Map());
  const {
    messageIds: parentMessageIds
  } = useLabelableContext();
  const registerControlId = useStableCallback((source, nextId) => {
    const registrations = registrationsRef.current;
    if (nextId === void 0) {
      registrations.delete(source);
      return;
    }
    registrations.set(source, nextId);
    setControlIdState((prev) => {
      if (registrations.size === 0) {
        return void 0;
      }
      let nextControlId;
      for (const id of registrations.values()) {
        if (prev !== void 0 && id === prev) {
          return prev;
        }
        if (nextControlId === void 0) {
          nextControlId = id;
        }
      }
      return nextControlId;
    });
  });
  const getDescriptionProps = React24.useCallback((externalProps) => {
    return mergeProps({
      "aria-describedby": parentMessageIds.concat(messageIds).join(" ") || void 0
    }, externalProps);
  }, [parentMessageIds, messageIds]);
  const contextValue = React24.useMemo(() => ({
    controlId,
    registerControlId,
    labelId,
    setLabelId,
    messageIds,
    setMessageIds,
    getDescriptionProps
  }), [controlId, registerControlId, labelId, setLabelId, messageIds, setMessageIds, getDescriptionProps]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelableContext.Provider, {
    value: contextValue,
    children: props.children
  });
};
if (true) LabelableProvider.displayName = "LabelableProvider";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/root/useFieldValidation.js
var React25 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/utils/getCombinedFieldValidityData.js
function getCombinedFieldValidityData(validityData, invalid) {
  return {
    ...validityData,
    state: {
      ...validityData.state,
      valid: !invalid && validityData.state.valid
    }
  };
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/root/useFieldValidation.js
var validityKeys = Object.keys(DEFAULT_VALIDITY_STATE);
function isOnlyValueMissing(state) {
  if (!state || state.valid || !state.valueMissing) {
    return false;
  }
  let onlyValueMissing = false;
  for (const key of validityKeys) {
    if (key === "valid") {
      continue;
    }
    if (key === "valueMissing") {
      onlyValueMissing = state[key];
    }
    if (state[key]) {
      onlyValueMissing = false;
    }
  }
  return onlyValueMissing;
}
function useFieldValidation(params) {
  const {
    formRef,
    clearErrors
  } = useFormContext();
  const {
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid,
    markedDirtyRef,
    state,
    name,
    shouldValidateOnChange,
    getRegisteredFieldId
  } = params;
  const {
    controlId,
    getDescriptionProps
  } = useLabelableContext();
  const timeout = useTimeout();
  const inputRef = React25.useRef(null);
  const commit = useStableCallback(async (value, revalidate = false) => {
    const element = inputRef.current;
    if (!element) {
      return;
    }
    function updateRegisteredFieldValidity(nextValidityData2, externalInvalid = invalid) {
      const fieldId = getRegisteredFieldId() ?? controlId;
      if (fieldId == null) {
        return;
      }
      const currentFieldData = formRef.current.fields.get(fieldId);
      if (!currentFieldData) {
        return;
      }
      const validityDataWithFormErrors = getCombinedFieldValidityData(nextValidityData2, externalInvalid);
      formRef.current.fields.set(fieldId, {
        ...currentFieldData,
        validityData: validityDataWithFormErrors
      });
    }
    if (revalidate) {
      if (state.valid !== false) {
        return;
      }
      const currentNativeValidity = element.validity;
      if (!currentNativeValidity.valueMissing) {
        const nextValidityData2 = {
          value,
          state: {
            ...DEFAULT_VALIDITY_STATE,
            valid: true
          },
          error: "",
          errors: [],
          initialValue: validityData.initialValue
        };
        element.setCustomValidity("");
        updateRegisteredFieldValidity(nextValidityData2, false);
        setValidityData(nextValidityData2);
        return;
      }
      const currentNativeValidityObject = validityKeys.reduce((acc, key) => {
        acc[key] = currentNativeValidity[key];
        return acc;
      }, {});
      if (!currentNativeValidityObject.valid && !isOnlyValueMissing(currentNativeValidityObject)) {
        return;
      }
    }
    function getState(el) {
      const computedState = validityKeys.reduce((acc, key) => {
        acc[key] = el.validity[key];
        return acc;
      }, {});
      let hasOnlyValueMissingError = false;
      for (const key of validityKeys) {
        if (key === "valid") {
          continue;
        }
        if (key === "valueMissing" && computedState[key]) {
          hasOnlyValueMissingError = true;
        } else if (computedState[key]) {
          return computedState;
        }
      }
      if (hasOnlyValueMissingError && !markedDirtyRef.current) {
        computedState.valid = true;
        computedState.valueMissing = false;
      }
      return computedState;
    }
    timeout.clear();
    let result = null;
    let validationErrors = [];
    const nextState = getState(element);
    let defaultValidationMessage;
    const validateOnChange = shouldValidateOnChange();
    if (element.validationMessage && !validateOnChange) {
      defaultValidationMessage = element.validationMessage;
      validationErrors = [element.validationMessage];
    } else {
      const formValues = Array.from(formRef.current.fields.values()).reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.getValue();
        }
        return acc;
      }, {});
      const resultOrPromise = validate(value, formValues);
      if (typeof resultOrPromise === "object" && resultOrPromise !== null && "then" in resultOrPromise) {
        result = await resultOrPromise;
      } else {
        result = resultOrPromise;
      }
      if (result !== null) {
        nextState.valid = false;
        nextState.customError = true;
        if (Array.isArray(result)) {
          validationErrors = result;
          element.setCustomValidity(result.join("\n"));
        } else if (result) {
          validationErrors = [result];
          element.setCustomValidity(result);
        }
      } else if (validateOnChange) {
        element.setCustomValidity("");
        nextState.customError = false;
        if (element.validationMessage) {
          defaultValidationMessage = element.validationMessage;
          validationErrors = [element.validationMessage];
        } else if (element.validity.valid && !nextState.valid) {
          nextState.valid = true;
        }
      }
    }
    const nextValidityData = {
      value,
      state: nextState,
      error: defaultValidationMessage ?? (Array.isArray(result) ? result[0] : result ?? ""),
      errors: validationErrors,
      initialValue: validityData.initialValue
    };
    updateRegisteredFieldValidity(nextValidityData);
    setValidityData(nextValidityData);
  });
  const getValidationProps = React25.useCallback((externalProps = {}) => mergeProps(getDescriptionProps, state.valid === false ? {
    "aria-invalid": true
  } : EMPTY_OBJECT, externalProps), [getDescriptionProps, state.valid]);
  const getInputValidationProps = React25.useCallback((externalProps = {}) => mergeProps({
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      clearErrors(name);
      if (!shouldValidateOnChange()) {
        commit(event.currentTarget.value, true);
        return;
      }
      const element = event.currentTarget;
      if (element.value === "") {
        commit(element.value);
        return;
      }
      timeout.clear();
      if (validationDebounceTime) {
        timeout.start(validationDebounceTime, () => {
          commit(element.value);
        });
      } else {
        commit(element.value);
      }
    }
  }, getValidationProps(externalProps)), [getValidationProps, clearErrors, name, timeout, commit, validationDebounceTime, shouldValidateOnChange]);
  return React25.useMemo(() => ({
    getValidationProps,
    getInputValidationProps,
    inputRef,
    commit
  }), [getValidationProps, getInputValidationProps, commit]);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/internals/field-register-control/useFieldControlRegistration.js
var React26 = __toESM(require_react(), 1);
function useFieldControlRegistration(params) {
  const {
    commit,
    invalid,
    markedDirtyRef,
    name,
    setRegisteredFieldId,
    setValidityData,
    validityData
  } = params;
  const {
    formRef
  } = useFormContext();
  const activeFieldControlSourceRef = React26.useRef(null);
  const registrationRef = React26.useRef(null);
  const fallbackControlRef = React26.useRef(null);
  const getValueForForm = useStableCallback(() => {
    const registration = registrationRef.current;
    if (!registration) {
      return void 0;
    }
    if (registration.getValue) {
      return registration.getValue();
    }
    return registration.value;
  });
  const validate = useStableCallback(() => {
    const registration = registrationRef.current;
    if (!registration) {
      return;
    }
    let nextValue = registration.value;
    if (nextValue === void 0) {
      nextValue = getValueForForm();
    }
    markedDirtyRef.current = true;
    commit(nextValue);
  });
  function refreshRegistration() {
    const registration = registrationRef.current;
    if (!registration || !registration.id) {
      return;
    }
    formRef.current.fields.set(registration.id, {
      getValue: getValueForForm,
      name,
      controlRef: registration.controlRef ?? fallbackControlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid),
      validate
    });
  }
  function deleteRegistration(id = registrationRef.current?.id) {
    if (id) {
      formRef.current.fields.delete(id);
    }
  }
  function syncInitialValue() {
    const registration = registrationRef.current;
    if (!registration) {
      return;
    }
    let initialValue = registration.value;
    if (initialValue === void 0) {
      initialValue = getValueForForm();
    }
    if (validityData.initialValue === null && initialValue !== null) {
      setValidityData((prev) => ({
        ...prev,
        initialValue
      }));
    }
  }
  useIsoLayoutEffect(() => {
    const registration = registrationRef.current;
    if (!registration || !registration.id) {
      return;
    }
    formRef.current.fields.set(registration.id, {
      getValue: getValueForForm,
      name,
      controlRef: registration.controlRef ?? fallbackControlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid),
      validate
    });
  }, [formRef, getValueForForm, invalid, name, validate, validityData]);
  useIsoLayoutEffect(() => {
    const fields = formRef.current.fields;
    return () => {
      const id = registrationRef.current?.id;
      if (id) {
        fields.delete(id);
      }
    };
  }, [formRef]);
  return useStableCallback((source, registration) => {
    if (!registration) {
      if (activeFieldControlSourceRef.current === source) {
        activeFieldControlSourceRef.current = null;
        deleteRegistration();
        registrationRef.current = null;
        setRegisteredFieldId(void 0);
      }
      return;
    }
    const previousId = registrationRef.current?.id;
    activeFieldControlSourceRef.current = source;
    registrationRef.current = registration;
    setRegisteredFieldId(registration.id);
    if (previousId && previousId !== registration.id) {
      deleteRegistration(previousId);
    }
    syncInitialValue();
    refreshRegistration();
  });
}

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/root/FieldRoot.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var FieldRootInner = /* @__PURE__ */ React27.forwardRef(function FieldRootInner2(componentProps, forwardedRef) {
  const {
    errors,
    validationMode: formValidationMode,
    submitAttemptedRef
  } = useFormContext();
  const {
    render,
    className,
    validate: validateProp,
    validationDebounceTime = 0,
    validationMode = formValidationMode,
    name,
    disabled: disabledProp = false,
    invalid: invalidProp,
    dirty: dirtyProp,
    touched: touchedProp,
    actionsRef,
    style,
    ...elementProps
  } = componentProps;
  const {
    disabled: disabledFieldset
  } = useFieldsetRootContext();
  const validate = useStableCallback(validateProp || (() => null));
  const disabled2 = disabledFieldset || disabledProp;
  const [touchedState, setTouchedUnwrapped] = React27.useState(false);
  const [dirtyState, setDirtyUnwrapped] = React27.useState(false);
  const [filled, setFilled] = React27.useState(false);
  const [focused, setFocused] = React27.useState(false);
  const dirty = dirtyProp ?? dirtyState;
  const touched = touchedProp ?? touchedState;
  const markedDirtyRef = React27.useRef(false);
  const registeredFieldIdRef = React27.useRef(void 0);
  const getRegisteredFieldId = React27.useCallback(() => registeredFieldIdRef.current, []);
  const setRegisteredFieldId = React27.useCallback((id) => {
    registeredFieldIdRef.current = id;
  }, []);
  const setDirty = useStableCallback((value) => {
    if (dirtyProp !== void 0) {
      return;
    }
    if (value) {
      markedDirtyRef.current = true;
    }
    setDirtyUnwrapped(value);
  });
  const setTouched = useStableCallback((value) => {
    if (touchedProp !== void 0) {
      return;
    }
    setTouchedUnwrapped(value);
  });
  const shouldValidateOnChange = useStableCallback(() => validationMode === "onChange" || validationMode === "onSubmit" && submitAttemptedRef.current);
  const hasFormError = !!name && Object.hasOwn(errors, name) && errors[name] !== void 0;
  const invalid = invalidProp === true || hasFormError;
  const [validityData, setValidityData] = React27.useState({
    state: DEFAULT_VALIDITY_STATE,
    error: "",
    errors: [],
    value: null,
    initialValue: null
  });
  const valid = !invalid && validityData.state.valid;
  const state = React27.useMemo(() => ({
    disabled: disabled2,
    touched,
    dirty,
    valid,
    filled,
    focused
  }), [disabled2, touched, dirty, valid, filled, focused]);
  const validation = useFieldValidation({
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid,
    markedDirtyRef,
    state,
    name,
    shouldValidateOnChange,
    getRegisteredFieldId
  });
  const validityValue = validityData.value;
  const handleImperativeValidate = React27.useCallback(() => {
    markedDirtyRef.current = true;
    validation.commit(validityValue);
  }, [validation, validityValue]);
  const registerFieldControl = useFieldControlRegistration({
    commit: validation.commit,
    invalid,
    markedDirtyRef,
    name,
    setRegisteredFieldId,
    setValidityData,
    validityData
  });
  React27.useImperativeHandle(actionsRef, () => ({
    validate: handleImperativeValidate
  }), [handleImperativeValidate]);
  const contextValue = React27.useMemo(() => ({
    invalid,
    name,
    validityData,
    setValidityData,
    disabled: disabled2,
    touched,
    setTouched,
    dirty,
    setDirty,
    filled,
    setFilled,
    focused,
    setFocused,
    validate,
    validationMode,
    validationDebounceTime,
    shouldValidateOnChange,
    state,
    markedDirtyRef,
    registerFieldControl,
    validation
  }), [invalid, name, validityData, disabled2, touched, setTouched, dirty, setDirty, filled, setFilled, focused, setFocused, validate, validationMode, validationDebounceTime, shouldValidateOnChange, state, registerFieldControl, validation]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FieldRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true) FieldRootInner.displayName = "FieldRootInner";
var FieldRoot = /* @__PURE__ */ React27.forwardRef(function FieldRoot2(componentProps, forwardedRef) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LabelableProvider, {
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FieldRootInner, {
      ...componentProps,
      ref: forwardedRef
    })
  });
});
if (true) FieldRoot.displayName = "FieldRoot";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/label/FieldLabel.js
var React28 = __toESM(require_react(), 1);
var FieldLabel = /* @__PURE__ */ React28.forwardRef(function FieldLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    nativeLabel = true,
    ...elementProps
  } = componentProps;
  const fieldRootContext = useFieldRootContext(false);
  const {
    labelId
  } = useLabelableContext();
  const labelRef = React28.useRef(null);
  const labelProps = useLabel({
    id: labelId ?? idProp,
    native: nativeLabel
  });
  if (true) {
    React28.useEffect(() => {
      if (!labelRef.current) {
        return;
      }
      const isLabelTag = labelRef.current.tagName === "LABEL";
      if (nativeLabel) {
        if (!isLabelTag) {
          const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
          const message2 = "<Field.Label> expected a <label> element because the `nativeLabel` prop is true. Rendering a non-<label> disables native label association, so `htmlFor` will not work. Use a real <label> in the `render` prop, or set `nativeLabel` to `false`.";
          error(`${message2}${ownerStackMessage}`);
        }
      } else if (isLabelTag) {
        const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
        const message2 = "<Field.Label> expected a non-<label> element because the `nativeLabel` prop is false. Rendering a <label> assumes native label behavior while Base UI treats it as non-native, which can cause unexpected pointer behavior. Use a non-<label> in the `render` prop, or set `nativeLabel` to `true`.";
        error(`${message2}${ownerStackMessage}`);
      }
    }, [nativeLabel]);
  }
  const element = useRenderElement("label", componentProps, {
    ref: [forwardedRef, labelRef],
    state: fieldRootContext.state,
    props: [labelProps, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true) FieldLabel.displayName = "FieldLabel";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/error/FieldError.js
var React29 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var stateAttributesMapping = {
  ...fieldValidityMapping,
  ...transitionStatusMapping
};
var FieldError = /* @__PURE__ */ React29.forwardRef(function FieldError2(componentProps, forwardedRef) {
  const {
    render,
    id: idProp,
    className,
    match: match2,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const {
    validityData,
    state: fieldState,
    name
  } = useFieldRootContext(false);
  const {
    setMessageIds
  } = useLabelableContext();
  const {
    errors
  } = useFormContext();
  const formError = name ? errors[name] : null;
  const hasSpecificMatch = typeof match2 === "string";
  let rendered = false;
  if (match2 === true) {
    rendered = true;
  } else if (hasSpecificMatch) {
    rendered = Boolean(validityData.state[match2]);
  } else {
    rendered = Boolean(formError) || validityData.state.valid === false;
  }
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  useIsoLayoutEffect(() => {
    if (!rendered || !id) {
      return void 0;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [rendered, id, setMessageIds]);
  const errorRef = React29.useRef(null);
  const [lastRenderedMessage, setLastRenderedMessage] = React29.useState(null);
  const [lastRenderedMessageKey, setLastRenderedMessageKey] = React29.useState(null);
  const clientErrorMessage = validityData.errors.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", {
    children: validityData.errors.map((message2) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", {
      children: message2
    }, message2))
  }) : validityData.error;
  const errorMessage = hasSpecificMatch ? clientErrorMessage : formError || clientErrorMessage;
  let errorKey = validityData.error;
  if (formError != null) {
    errorKey = Array.isArray(formError) ? JSON.stringify(formError) : formError;
  } else if (validityData.errors.length > 1) {
    errorKey = JSON.stringify(validityData.errors);
  }
  if (rendered && errorKey !== lastRenderedMessageKey) {
    setLastRenderedMessageKey(errorKey);
    setLastRenderedMessage(errorMessage);
  }
  useOpenChangeComplete({
    open: rendered,
    ref: errorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  const state = {
    ...fieldState,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, errorRef],
    state,
    props: [{
      id,
      children: rendered ? errorMessage : lastRenderedMessage
    }, elementProps],
    stateAttributesMapping,
    enabled: mounted
  });
  if (!mounted) {
    return null;
  }
  return element;
});
if (true) FieldError.displayName = "FieldError";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/description/FieldDescription.js
var React30 = __toESM(require_react(), 1);
var FieldDescription = /* @__PURE__ */ React30.forwardRef(function FieldDescription2(componentProps, forwardedRef) {
  const {
    render,
    id: idProp,
    className,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const fieldRootContext = useFieldRootContext(false);
  const {
    setMessageIds
  } = useLabelableContext();
  useIsoLayoutEffect(() => {
    if (!id) {
      return void 0;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [id, setMessageIds]);
  const element = useRenderElement("p", componentProps, {
    ref: forwardedRef,
    state: fieldRootContext.state,
    props: [{
      id
    }, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true) FieldDescription.displayName = "FieldDescription";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/control/FieldControl.js
var React31 = __toESM(require_react(), 1);
var FieldControl = /* @__PURE__ */ React31.forwardRef(function FieldControl2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    name: nameProp,
    value: valueProp,
    disabled: disabledProp = false,
    onValueChange,
    defaultValue,
    autoFocus = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    name: fieldName,
    disabled: fieldDisabled,
    setTouched,
    setDirty,
    validityData,
    setFocused,
    setFilled,
    validationMode,
    validation
  } = useFieldRootContext();
  const disabled2 = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const state = {
    ...fieldState,
    disabled: disabled2
  };
  const {
    labelId
  } = useLabelableContext();
  const id = useLabelableId({
    id: idProp
  });
  useIsoLayoutEffect(() => {
    const hasExternalValue = valueProp != null;
    if (validation.inputRef.current?.value || hasExternalValue && valueProp !== "") {
      setFilled(true);
    } else if (hasExternalValue && valueProp === "") {
      setFilled(false);
    }
  }, [validation.inputRef, setFilled, valueProp]);
  const inputRef = React31.useRef(null);
  useIsoLayoutEffect(() => {
    if (autoFocus && inputRef.current === activeElement(ownerDocument(inputRef.current))) {
      setFocused(true);
    }
  }, [autoFocus, setFocused]);
  const [valueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "FieldControl",
    state: "value"
  });
  const isControlled = valueProp !== void 0;
  const value = isControlled ? valueUnwrapped : void 0;
  const getValueFromInput = useStableCallback(() => validation.inputRef.current?.value);
  useRegisterFieldControl(validation.inputRef, id, value, getValueFromInput);
  const element = useRenderElement("input", componentProps, {
    ref: [forwardedRef, inputRef],
    state,
    props: [{
      id,
      disabled: disabled2,
      name,
      ref: validation.inputRef,
      "aria-labelledby": labelId,
      autoFocus,
      ...isControlled ? {
        value
      } : {
        defaultValue
      },
      onChange(event) {
        const inputValue = event.currentTarget.value;
        onValueChange?.(inputValue, createChangeEventDetails(reason_parts_exports.none, event.nativeEvent));
        setDirty(inputValue !== validityData.initialValue);
        setFilled(inputValue !== "");
      },
      onFocus() {
        setFocused(true);
      },
      onBlur(event) {
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(event.currentTarget.value);
        }
      },
      onKeyDown(event) {
        if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
          setTouched(true);
          validation.commit(event.currentTarget.value);
        }
      }
    }, validation.getInputValidationProps(), elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true) FieldControl.displayName = "FieldControl";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/validity/FieldValidity.js
var React32 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var FieldValidity = function FieldValidity2(props) {
  const {
    children
  } = props;
  const {
    validityData,
    invalid
  } = useFieldRootContext(false);
  const combinedFieldValidityData = React32.useMemo(() => getCombinedFieldValidityData(validityData, invalid), [validityData, invalid]);
  const isInvalid = combinedFieldValidityData.state.valid === false;
  const {
    transitionStatus
  } = useTransitionStatus(isInvalid);
  const fieldValidityState = React32.useMemo(() => {
    return {
      ...combinedFieldValidityData,
      validity: combinedFieldValidityData.state,
      transitionStatus
    };
  }, [combinedFieldValidityData, transitionStatus]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(React32.Fragment, {
    children: children(fieldValidityState)
  });
};
if (true) FieldValidity.displayName = "FieldValidity";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/field/item/FieldItem.js
var React33 = __toESM(require_react(), 1);
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var FieldItem = /* @__PURE__ */ React33.forwardRef(function FieldItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled: disabledProp = false,
    ...elementProps
  } = componentProps;
  const {
    state,
    disabled: rootDisabled
  } = useFieldRootContext(false);
  const disabled2 = rootDisabled || disabledProp;
  const checkboxGroupContext = useCheckboxGroupContext();
  const hasParentCheckbox = checkboxGroupContext?.allValues !== void 0;
  const controlId = hasParentCheckbox ? checkboxGroupContext?.parent.id : void 0;
  const fieldItemContext = React33.useMemo(() => ({
    disabled: disabled2
  }), [disabled2]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LabelableProvider, {
    controlId,
    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FieldItemContext.Provider, {
      value: fieldItemContext,
      children: element
    })
  });
});
if (true) FieldItem.displayName = "FieldItem";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/input/Input.js
var React34 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var Input = /* @__PURE__ */ React34.forwardRef(function Input2(props, forwardedRef) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(index_parts_exports.Control, {
    ref: forwardedRef,
    ...props
  });
});
if (true) Input.displayName = "Input";

// ../../../node_modules/.pnpm/@base-ui+react@1.5.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/use-render/useRender.js
function useRender(params) {
  return useRenderElement(params.defaultTagName ?? "div", params, params);
}

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/text/text.mjs
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
  registerStyle("0c8601dd83", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._83ed8a8da5dd50ea__text{margin:0}._14437cfb77831647__heading-2xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-p-line-height:var(--wpds-typography-line-height-2xl,40px);font-size:var(--wpds-typography-font-size-2xl,32px);line-height:var(--wpds-typography-line-height-2xl,40px)}._14437cfb77831647__heading-2xl,._3c78b7fa9b4072dd__heading-xl{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-medium,499)}._3c78b7fa9b4072dd__heading-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-md,24px)}.aa58f227716bcde2__heading-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-lg,15px)}.aa58f227716bcde2__heading-lg,.fc4da56d8dfe52c4__heading-md{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wpds-typography-line-height-sm,20px)}.fc4da56d8dfe52c4__heading-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px)}.a9b78c7c82e8dff7__heading-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wpds-typography-line-height-xs,16px);text-transform:uppercase}._305ff559e52180d5__body-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-xl,32px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-xl,32px)}._305ff559e52180d5__body-xl,.ca1aa3fc2029e958__body-lg{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-regular,400)}.ca1aa3fc2029e958__body-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-lg,15px);line-height:var(--wpds-typography-line-height-md,24px)}._131101940be12424__body-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px);line-height:var(--wpds-typography-line-height-sm,20px)}._0e8d87a42c1f75fa__body-sm,._131101940be12424__body-md{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-weight:var(--wpds-typography-font-weight-regular,400)}._0e8d87a42c1f75fa__body-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}');
}
var style_default = { "text": "_83ed8a8da5dd50ea__text", "heading-2xl": "_14437cfb77831647__heading-2xl", "heading-xl": "_3c78b7fa9b4072dd__heading-xl", "heading-lg": "aa58f227716bcde2__heading-lg", "heading-md": "fc4da56d8dfe52c4__heading-md", "heading-sm": "a9b78c7c82e8dff7__heading-sm", "body-xl": "_305ff559e52180d5__body-xl", "body-lg": "ca1aa3fc2029e958__body-lg", "body-md": "_131101940be12424__body-md", "body-sm": "_0e8d87a42c1f75fa__body-sm" };
if (typeof process === "undefined" || true) {
  registerStyle("1fb29d3a3c", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,#0000);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 #0000);color:var(--_gcd-input-color,var(--wpds-color-fg-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,#0000);border-color:var(--_gcd-input-border-color-disabled,#0000);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid #0000)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-fg-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid #0000);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };
var Text = (0, import_element.forwardRef)(function Text2({ variant = "body-md", render, className, ...props }, ref) {
  const element = useRender({
    render,
    defaultTagName: "span",
    ref,
    props: mergeProps(props, {
      className: clsx_default(
        style_default.text,
        global_css_defense_default.heading,
        global_css_defense_default.p,
        style_default[variant],
        className
      )
    })
  });
  return element;
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/badge/badge.mjs
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE2 = "data-wp-hash";
function getRuntime2() {
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
    registerDocument2(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash2(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE2}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE2) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle2(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime2();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash2(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE2, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument2(targetDocument) {
  const runtime = getRuntime2();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle2(targetDocument, hash, css);
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
function registerStyle2(hash, css) {
  const runtime = getRuntime2();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle2(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle2("d6a685e1aa", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._96e6251aad1a6136__badge{border-radius:var(--wpds-border-radius-lg,8px);padding-block:var(--wpds-dimension-padding-xs,4px);padding-inline:var(--wpds-dimension-padding-sm,8px)}._99f7158cb520f750__is-high-intent{background-color:var(--wpds-color-bg-surface-error,#f6e6e3);color:var(--wpds-color-fg-content-error,#470000)}.c20ebef2365bc8b7__is-medium-intent{background-color:var(--wpds-color-bg-surface-warning,#fde6be);color:var(--wpds-color-fg-content-warning,#2e1900)}._365e1626c6202e52__is-low-intent{background-color:var(--wpds-color-bg-surface-caution,#fee995);color:var(--wpds-color-fg-content-caution,#281d00)}._33f8198127ddf4ef__is-stable-intent{background-color:var(--wpds-color-bg-surface-success,#c6f7cd);color:var(--wpds-color-fg-content-success,#002900)}._04c1aca8fc449412__is-informational-intent{background-color:var(--wpds-color-bg-surface-info,#deebfa);color:var(--wpds-color-fg-content-info,#001b4f)}._90726e69d495ec19__is-draft-intent{background-color:var(--wpds-color-bg-surface-neutral-weak,#f4f4f4);color:var(--wpds-color-fg-content-neutral,#1e1e1e)}._898f4a544993bd39__is-none-intent{background-color:var(--wpds-color-bg-surface-neutral-strong,#fff);border:var(--wpds-border-width-xs,1px) solid var(--wpds-color-stroke-surface-neutral,#dbdbdb);color:var(--wpds-color-fg-content-neutral,#1e1e1e);padding-block:calc(var(--wpds-dimension-padding-xs, 4px) - var(--wpds-border-width-xs, 1px));padding-inline:calc(var(--wpds-dimension-padding-sm, 8px) - var(--wpds-border-width-xs, 1px))}}");
}
var style_default2 = { "badge": "_96e6251aad1a6136__badge", "is-high-intent": "_99f7158cb520f750__is-high-intent", "is-medium-intent": "c20ebef2365bc8b7__is-medium-intent", "is-low-intent": "_365e1626c6202e52__is-low-intent", "is-stable-intent": "_33f8198127ddf4ef__is-stable-intent", "is-informational-intent": "_04c1aca8fc449412__is-informational-intent", "is-draft-intent": "_90726e69d495ec19__is-draft-intent", "is-none-intent": "_898f4a544993bd39__is-none-intent" };
var Badge = (0, import_element2.forwardRef)(function Badge2({ intent = "none", className, ...props }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Text,
    {
      ref,
      className: clsx_default(
        style_default2.badge,
        style_default2[`is-${intent}-intent`],
        className
      ),
      ...props,
      variant: "body-sm"
    }
  );
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/button.mjs
var import_element3 = __toESM(require_element(), 1);
var import_i18n3 = __toESM(require_i18n(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
import { speak } from "@wordpress/a11y";
var STYLE_HASH_ATTRIBUTE3 = "data-wp-hash";
function getRuntime3() {
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
    registerDocument3(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash3(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE3}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE3) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle3(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime3();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash3(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE3, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument3(targetDocument) {
  const runtime = getRuntime3();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle3(targetDocument, hash, css);
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
function registerStyle3(hash, css) {
  const runtime = getRuntime3();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle3(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle3("26d90ece4e", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._97b0fc33c028be1a__button,.abbb272e2ce49bd6__is-unstyled{appearance:none;padding:0}._97b0fc33c028be1a__button{--wp-ui-button-font-weight:499;--wp-ui-button-background-color:var(--wpds-color-bg-interactive-brand-strong,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-brand-strong-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 93%,#000));--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-strong-disabled,#e6e6e6);--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-brand-strong,#fff);--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-brand-strong-active,#fff);--wp-ui-button-foreground-color-disabled:var(--wpds-color-fg-interactive-neutral-strong-disabled,#8d8d8d);--wp-ui-button-padding-inline:var(--wpds-dimension-padding-md,12px);--wp-ui-button-height:40px;--wp-ui-button-aspect-ratio:auto;--wp-ui-button-font-size:var(--wpds-typography-font-size-md,13px);--wp-ui-button-min-width:calc(4ch + var(--wp-ui-button-padding-inline)*2);--wp-ui-button-border-color:var(--wp-ui-button-background-color);--wp-ui-button-border-color-active:var(--wp-ui-button-background-color-active);--wp-ui-button-border-color-disabled:var(--wp-ui-button-background-color-disabled);--_gcd-button-font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);--_gcd-button-font-size:var(--wp-ui-button-font-size);--_gcd-button-font-weight:var(--wp-ui-button-font-weight);align-items:center;aspect-ratio:var(--wp-ui-button-aspect-ratio);background-clip:padding-box;background-color:var(--wp-ui-button-background-color);border-color:var(--wp-ui-button-border-color);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:1px;color:var(--wp-ui-button-foreground-color);cursor:var(--wpds-cursor-control,pointer);display:inline-flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wp-ui-button-font-size);font-weight:var(--wp-ui-button-font-weight);gap:var(--wpds-dimension-gap-sm,8px);height:var(--wp-ui-button-height);justify-content:center;line-height:var(--wpds-typography-line-height-sm,20px);min-width:var(--wp-ui-button-min-width);padding-inline:var(--wp-ui-button-padding-inline);position:relative;text-decoration:none;@media not (prefers-reduced-motion){transition:color .1s ease-out;*{transition:opacity .1s ease-out}}&[href]{cursor:pointer}[href]{color:inherit;text-decoration:inherit}&:not([data-disabled]):is(:hover,:active,:focus){background-color:var(--wp-ui-button-background-color-active);border-color:var(--wp-ui-button-border-color-active);color:var(--wp-ui-button-foreground-color-active)}&[data-disabled]:not(._914b42f315c0e580__is-loading){background-color:var(--wp-ui-button-background-color-disabled);border-color:var(--wp-ui-button-border-color-disabled);color:var(--wp-ui-button-foreground-color-disabled);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText;color:GrayText}}&:before{aspect-ratio:1;border:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid;border-block-end-color:#0000;border-block-start-color:var(--wp-ui-button-foreground-color);border-inline-end-color:var(--wp-ui-button-foreground-color);border-inline-start-color:#0000;border-radius:50%;box-sizing:border-box;content:"";display:block;height:var(--wp-ui-button-font-size);inset-inline-start:50%;opacity:0;pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%);@media not (prefers-reduced-motion){transition:opacity .1s ease-out}}}._908205475f9f2a92__is-small{--wp-ui-button-padding-inline:var(--wpds-dimension-padding-sm,8px);--wp-ui-button-height:24px}.dd460c965226cc77__is-brand{&._62d5a778b7b258ee__is-outline,&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-brand,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-brand-active,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-foreground-color-disabled:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-brand-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-brand-weak-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 12%,#fff));--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000);--wp-ui-button-border-color:var(--wpds-color-stroke-interactive-brand,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-border-color-active:var(--wpds-color-stroke-interactive-brand-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 85%,#000));--wp-ui-button-border-color-disabled:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb)}&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-brand-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-brand-weak-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 12%,#fff));--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000)}}.e722a8f96726aa99__is-neutral{&.b50b3358c5fb4d0b__is-solid{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-neutral-strong,#2d2d2d);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-neutral-strong-active,#1e1e1e);--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-strong-disabled,#e6e6e6);--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-neutral-strong,#f0f0f0);--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-neutral-strong-active,#f0f0f0);--wp-ui-button-foreground-color-disabled:var(--wpds-color-fg-interactive-neutral-strong-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline,&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-neutral,#1e1e1e);--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-neutral-active,#1e1e1e);--wp-ui-button-foreground-color-disabled:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-neutral-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-neutral-weak-active,#ededed);--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000);--wp-ui-button-border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);--wp-ui-button-border-color-active:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e);--wp-ui-button-border-color-disabled:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb)}&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-neutral-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-neutral-weak-active,#ededed);--wp-ui-button-background-color-disabled:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000)}}.abbb272e2ce49bd6__is-unstyled{background:none;border:none;min-width:unset}.cf59cf1b69629838__is-compact{--wp-ui-button-height:32px}._914b42f315c0e580__is-loading{color:#0000;&:not([data-disabled]):is(:hover,:active,:focus){color:#0000}*{opacity:0}&:before{opacity:1;transition-delay:.05s;@media not (prefers-reduced-motion){animation:_5a1d53da6f830c8d__loading-animation 1s linear infinite}}}[aria-pressed=true].ad0619a3217c6a5b__is-minimal.e722a8f96726aa99__is-neutral{--wp-ui-button-background-color:var(--wpds-color-bg-interactive-neutral-strong,#2d2d2d);--wp-ui-button-background-color-active:var(--wpds-color-bg-interactive-neutral-strong,#2d2d2d);--wp-ui-button-foreground-color:var(--wpds-color-fg-interactive-neutral-strong,#f0f0f0);--wp-ui-button-foreground-color-active:var(--wpds-color-fg-interactive-neutral-strong,#f0f0f0)}}@keyframes _5a1d53da6f830c8d__loading-animation{0%{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(1turn)}}');
}
var style_default3 = { "button": "_97b0fc33c028be1a__button", "is-unstyled": "abbb272e2ce49bd6__is-unstyled", "is-loading": "_914b42f315c0e580__is-loading", "is-small": "_908205475f9f2a92__is-small", "is-brand": "dd460c965226cc77__is-brand", "is-outline": "_62d5a778b7b258ee__is-outline", "is-minimal": "ad0619a3217c6a5b__is-minimal", "is-neutral": "e722a8f96726aa99__is-neutral", "is-solid": "b50b3358c5fb4d0b__is-solid", "is-compact": "cf59cf1b69629838__is-compact", "loading-animation": "_5a1d53da6f830c8d__loading-animation" };
if (typeof process === "undefined" || true) {
  registerStyle3("e3ae230cea", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}");
}
var resets_default = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
if (typeof process === "undefined" || true) {
  registerStyle3("2a5ab8f3a7", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._08e8a2e44959f892__outset-ring--focus,._970d04df7376df67__outset-ring--focus-within-except-active,.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible,.cd83dfc2126a0846__outset-ring--focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active,.ecadb9e080e2dfa5__outset-ring--focus-parent-visible{@media not (prefers-reduced-motion){--_gcd-a-transition:outline 0.1s ease-out;transition:outline .1s ease-out}outline:0 solid #0000;outline-offset:1px}._08e8a2e44959f892__outset-ring--focus:focus,._970d04df7376df67__outset-ring--focus-within-except-active:focus-within:not(:has(:active)),.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible:focus-within:has(:focus-visible),.cd83dfc2126a0846__outset-ring--focus-within:focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible:focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active:focus:not(:active),:focus-visible .ecadb9e080e2dfa5__outset-ring--focus-parent-visible{--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9))}}");
}
var focus_default = { "outset-ring--focus": "_08e8a2e44959f892__outset-ring--focus", "outset-ring--focus-except-active": "e25b2bdd7aa21721__outset-ring--focus-except-active", "outset-ring--focus-visible": "d0541bc9dd9dc7b6__outset-ring--focus-visible", "outset-ring--focus-within": "cd83dfc2126a0846__outset-ring--focus-within", "outset-ring--focus-within-except-active": "_970d04df7376df67__outset-ring--focus-within-except-active", "outset-ring--focus-within-visible": "c5cb3ee4bddaa8e4__outset-ring--focus-within-visible", "outset-ring--focus-parent-visible": "ecadb9e080e2dfa5__outset-ring--focus-parent-visible" };
if (typeof process === "undefined" || true) {
  registerStyle3("1fb29d3a3c", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,#0000);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 #0000);color:var(--_gcd-input-color,var(--wpds-color-fg-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,#0000);border-color:var(--_gcd-input-border-color-disabled,#0000);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid #0000)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-fg-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid #0000);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default2 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };
var Button3 = (0, import_element3.forwardRef)(
  function Button22({
    tone = "brand",
    variant = "solid",
    size = "default",
    className,
    focusableWhenDisabled = true,
    disabled: disabled2,
    loading,
    loadingAnnouncement = (0, import_i18n3.__)("Loading"),
    children,
    ...props
  }, ref) {
    const mergedClassName = clsx_default(
      global_css_defense_default2.button,
      resets_default["box-sizing"],
      focus_default["outset-ring--focus-except-active"],
      variant !== "unstyled" && style_default3.button,
      style_default3[`is-${tone}`],
      style_default3[`is-${variant}`],
      style_default3[`is-${size}`],
      loading && style_default3["is-loading"],
      className
    );
    (0, import_element3.useEffect)(() => {
      if (loading && loadingAnnouncement) {
        speak(loadingAnnouncement);
      }
    }, [loading, loadingAnnouncement]);
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      Button,
      {
        ref,
        className: mergedClassName,
        focusableWhenDisabled,
        disabled: disabled2 ?? loading,
        ...props,
        children
      }
    );
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/icon.mjs
var import_element5 = __toESM(require_element(), 1);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/icon/icon.mjs
var import_element4 = __toESM(require_element(), 1);
var import_primitives = __toESM(require_primitives(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var Icon = (0, import_element4.forwardRef)(function Icon2({ icon, size = 24, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    import_primitives.SVG,
    {
      ref,
      fill: "currentColor",
      ...icon.props,
      ...restProps,
      width: size,
      height: size
    }
  );
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/icon.mjs
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var ButtonIcon = (0, import_element5.forwardRef)(
  function ButtonIcon2({ icon, ...props }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Icon,
      {
        ref,
        icon,
        viewBox: "4 4 16 16",
        size: 16,
        ...props
      }
    );
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/index.mjs
ButtonIcon.displayName = "Button.Icon";
var Button4 = Object.assign(Button3, {
  /**
   * An icon component specifically designed to work well when rendered inside
   * a `Button` component.
   */
  Icon: ButtonIcon
});

// ../../../node_modules/.pnpm/@wordpress+icons@13.1.0_react@18.3.1/node_modules/@wordpress/icons/build-module/library/calendar.mjs
var import_primitives2 = __toESM(require_primitives(), 1);
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var calendar_default = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_primitives2.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_primitives2.Path, { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm.5 16c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V7h15v12zM9 10H7v2h2v-2zm0 4H7v2h2v-2zm4-4h-2v2h2v-2zm4 0h-2v2h2v-2zm-4 4h-2v2h2v-2zm4 0h-2v2h2v-2z" }) });

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/stack/stack.mjs
var import_element6 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE4 = "data-wp-hash";
function getRuntime4() {
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
    registerDocument4(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash4(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE4}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE4) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle4(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime4();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash4(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE4, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument4(targetDocument) {
  const runtime = getRuntime4();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle4(targetDocument, hash, css);
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
function registerStyle4(hash, css) {
  const runtime = getRuntime4();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle4(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle4("b51ff41489", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._19ce0419607e1896__stack{display:flex}}");
}
var style_default4 = { "stack": "_19ce0419607e1896__stack" };
var gapTokens = {
  xs: "var(--wpds-dimension-gap-xs, 4px)",
  sm: "var(--wpds-dimension-gap-sm, 8px)",
  md: "var(--wpds-dimension-gap-md, 12px)",
  lg: "var(--wpds-dimension-gap-lg, 16px)",
  xl: "var(--wpds-dimension-gap-xl, 24px)",
  "2xl": "var(--wpds-dimension-gap-2xl, 32px)",
  "3xl": "var(--wpds-dimension-gap-3xl, 40px)"
};
var Stack = (0, import_element6.forwardRef)(function Stack2({ direction, gap, align, justify, wrap, render, ...props }, ref) {
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
    props: mergeProps(props, { style, className: style_default4.stack })
  });
  return element;
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/input/input.mjs
var import_element9 = __toESM(require_element(), 1);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/input-layout/input-layout.mjs
var import_element7 = __toESM(require_element(), 1);
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE5 = "data-wp-hash";
function getRuntime5() {
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
    registerDocument5(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash5(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE5}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE5) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle5(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime5();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash5(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE5, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument5(targetDocument) {
  const runtime = getRuntime5();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle5(targetDocument, hash, css);
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
function registerStyle5(hash, css) {
  const runtime = getRuntime5();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle5(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle5("1fb29d3a3c", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,#0000);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 #0000);color:var(--_gcd-input-color,var(--wpds-color-fg-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,#0000);border-color:var(--_gcd-input-border-color-disabled,#0000);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid #0000)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-fg-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid #0000);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default3 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };
if (typeof process === "undefined" || true) {
  registerStyle5("e3ae230cea", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}");
}
var resets_default2 = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
if (typeof process === "undefined" || true) {
  registerStyle5("ea1c360c13", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{.cb2baafdc08746bb__input-layout{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-md,12px);background-color:var(--wpds-color-bg-interactive-neutral-weak,#0000);border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:var(--wpds-border-width-xs,1px);color:var(--wpds-color-fg-interactive-neutral,#1e1e1e);display:flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:max(var(--wpds-typography-font-size-md,13px),16px);height:40px;line-height:1;@media (min-width:600px){font-size:var(--wpds-typography-font-size-md,13px)}&._0c807a84cbb94e0c__is-size-compact{height:32px}&._0c807a84cbb94e0c__is-size-compact,&.ed67cda122dc1e7b__is-size-small{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-sm,8px)}&.ed67cda122dc1e7b__is-size-small{height:24px}&._6fb7104732387680__is-disabled,&:has([data-can-disable-input-layout][data-disabled]){background-color:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000);border-color:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb);color:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText;color:GrayText}}&._8097270636ca6100__is-borderless{border-color:#0000}&:has(._0d7afad74a057888__input-layout-slot:focus-within){outline:none}&:hover:not(._6fb7104732387680__is-disabled,:has([data-can-disable-input-layout][data-disabled]),._8097270636ca6100__is-borderless){border-color:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e)}}.c192b41a12b4387b__slot-wrapper{display:contents}._0d7afad74a057888__input-layout-slot{align-items:center;display:flex;&._0c952682762ca288__is-padding-minimal{--wp-ui-input-layout-prefix-padding-start:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px));--wp-ui-input-layout-suffix-padding-end:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px))}[data-slot-type=prefix] &{padding-inline-start:var(--wp-ui-input-layout-prefix-padding-start,var(--wp-ui-input-layout-padding-inline))}[data-slot-type=suffix] &{padding-inline-end:var(--wp-ui-input-layout-suffix-padding-end,var(--wp-ui-input-layout-padding-inline))}}}');
}
var style_default5 = { "input-layout": "cb2baafdc08746bb__input-layout", "is-size-compact": "_0c807a84cbb94e0c__is-size-compact", "is-size-small": "ed67cda122dc1e7b__is-size-small", "is-disabled": "_6fb7104732387680__is-disabled", "is-borderless": "_8097270636ca6100__is-borderless", "input-layout-slot": "_0d7afad74a057888__input-layout-slot", "slot-wrapper": "c192b41a12b4387b__slot-wrapper", "is-padding-minimal": "_0c952682762ca288__is-padding-minimal" };
var InputLayout = (0, import_element7.forwardRef)(
  function InputLayout2({
    className,
    children,
    visuallyDisabled,
    size = "default",
    isBorderless,
    prefix,
    suffix,
    ...restProps
  }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "div",
      {
        ref,
        className: clsx_default(
          global_css_defense_default3.div,
          resets_default2["box-sizing"],
          style_default5["input-layout"],
          style_default5[`is-size-${size}`],
          visuallyDisabled && style_default5["is-disabled"],
          isBorderless && style_default5["is-borderless"],
          className
        ),
        ...restProps,
        children: [
          import_element7.Children.count(prefix) > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "div",
            {
              className: style_default5["slot-wrapper"],
              "data-slot-type": "prefix",
              children: prefix
            }
          ),
          children,
          import_element7.Children.count(suffix) > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "div",
            {
              className: style_default5["slot-wrapper"],
              "data-slot-type": "suffix",
              children: suffix
            }
          )
        ]
      }
    );
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/input-layout/slot.mjs
var import_element8 = __toESM(require_element(), 1);
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE6 = "data-wp-hash";
function getRuntime6() {
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
    registerDocument6(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash6(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE6}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE6) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle6(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime6();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash6(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE6, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument6(targetDocument) {
  const runtime = getRuntime6();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle6(targetDocument, hash, css);
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
function registerStyle6(hash, css) {
  const runtime = getRuntime6();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle6(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle6("ea1c360c13", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{.cb2baafdc08746bb__input-layout{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-md,12px);background-color:var(--wpds-color-bg-interactive-neutral-weak,#0000);border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:var(--wpds-border-width-xs,1px);color:var(--wpds-color-fg-interactive-neutral,#1e1e1e);display:flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:max(var(--wpds-typography-font-size-md,13px),16px);height:40px;line-height:1;@media (min-width:600px){font-size:var(--wpds-typography-font-size-md,13px)}&._0c807a84cbb94e0c__is-size-compact{height:32px}&._0c807a84cbb94e0c__is-size-compact,&.ed67cda122dc1e7b__is-size-small{--wp-ui-input-layout-padding-inline:var(--wpds-dimension-padding-sm,8px)}&.ed67cda122dc1e7b__is-size-small{height:24px}&._6fb7104732387680__is-disabled,&:has([data-can-disable-input-layout][data-disabled]){background-color:var(--wpds-color-bg-interactive-neutral-weak-disabled,#0000);border-color:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb);color:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText;color:GrayText}}&._8097270636ca6100__is-borderless{border-color:#0000}&:has(._0d7afad74a057888__input-layout-slot:focus-within){outline:none}&:hover:not(._6fb7104732387680__is-disabled,:has([data-can-disable-input-layout][data-disabled]),._8097270636ca6100__is-borderless){border-color:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e)}}.c192b41a12b4387b__slot-wrapper{display:contents}._0d7afad74a057888__input-layout-slot{align-items:center;display:flex;&._0c952682762ca288__is-padding-minimal{--wp-ui-input-layout-prefix-padding-start:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px));--wp-ui-input-layout-suffix-padding-end:calc(var(--wp-ui-input-layout-padding-inline) - var(--wpds-dimension-padding-xs, 4px))}[data-slot-type=prefix] &{padding-inline-start:var(--wp-ui-input-layout-prefix-padding-start,var(--wp-ui-input-layout-padding-inline))}[data-slot-type=suffix] &{padding-inline-end:var(--wp-ui-input-layout-suffix-padding-end,var(--wp-ui-input-layout-padding-inline))}}}');
}
var style_default6 = { "input-layout": "cb2baafdc08746bb__input-layout", "is-size-compact": "_0c807a84cbb94e0c__is-size-compact", "is-size-small": "ed67cda122dc1e7b__is-size-small", "is-disabled": "_6fb7104732387680__is-disabled", "is-borderless": "_8097270636ca6100__is-borderless", "input-layout-slot": "_0d7afad74a057888__input-layout-slot", "slot-wrapper": "c192b41a12b4387b__slot-wrapper", "is-padding-minimal": "_0c952682762ca288__is-padding-minimal" };
var InputLayoutSlot = (0, import_element8.forwardRef)(function InputLayoutSlot2({ padding = "default", className, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      ref,
      className: clsx_default(
        style_default6["input-layout-slot"],
        style_default6[`is-padding-${padding}`],
        className
      ),
      ...restProps
    }
  );
});
InputLayoutSlot.displayName = "InputLayout.Slot";

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/input-layout/index.mjs
var InputLayout3 = Object.assign(InputLayout, {
  Slot: InputLayoutSlot
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/input/input.mjs
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE7 = "data-wp-hash";
function getRuntime7() {
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
    registerDocument7(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash7(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE7}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE7) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle7(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime7();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash7(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE7, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument7(targetDocument) {
  const runtime = getRuntime7();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle7(targetDocument, hash, css);
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
function registerStyle7(hash, css) {
  const runtime = getRuntime7();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle7(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle7("1fb29d3a3c", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,#0000);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 #0000);color:var(--_gcd-input-color,var(--wpds-color-fg-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,#0000);border-color:var(--_gcd-input-border-color-disabled,#0000);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid #0000)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-fg-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid #0000);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default4 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };
if (typeof process === "undefined" || true) {
  registerStyle7("2a5ab8f3a7", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._08e8a2e44959f892__outset-ring--focus,._970d04df7376df67__outset-ring--focus-within-except-active,.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible,.cd83dfc2126a0846__outset-ring--focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active,.ecadb9e080e2dfa5__outset-ring--focus-parent-visible{@media not (prefers-reduced-motion){--_gcd-a-transition:outline 0.1s ease-out;transition:outline .1s ease-out}outline:0 solid #0000;outline-offset:1px}._08e8a2e44959f892__outset-ring--focus:focus,._970d04df7376df67__outset-ring--focus-within-except-active:focus-within:not(:has(:active)),.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible:focus-within:has(:focus-visible),.cd83dfc2126a0846__outset-ring--focus-within:focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible:focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active:focus:not(:active),:focus-visible .ecadb9e080e2dfa5__outset-ring--focus-parent-visible{--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus-brand,var(--wp-admin-theme-color,#3858e9))}}");
}
var focus_default2 = { "outset-ring--focus": "_08e8a2e44959f892__outset-ring--focus", "outset-ring--focus-except-active": "e25b2bdd7aa21721__outset-ring--focus-except-active", "outset-ring--focus-visible": "d0541bc9dd9dc7b6__outset-ring--focus-visible", "outset-ring--focus-within": "cd83dfc2126a0846__outset-ring--focus-within", "outset-ring--focus-within-except-active": "_970d04df7376df67__outset-ring--focus-within-except-active", "outset-ring--focus-within-visible": "c5cb3ee4bddaa8e4__outset-ring--focus-within-visible", "outset-ring--focus-parent-visible": "ecadb9e080e2dfa5__outset-ring--focus-parent-visible" };
if (typeof process === "undefined" || true) {
  registerStyle7("9703c077a9", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._2ae7be2fc1bb17a3__input{--_gcd-input-padding:var(--wp-ui-input-padding-block,0) var(--wp-ui-input-layout-padding-inline,0);background:#0000;border:none;color:var(--wpds-color-fg-interactive-neutral,#1e1e1e);font-family:inherit;font-size:inherit;line-height:inherit;outline:none;padding-block:var(--wp-ui-input-padding-block,0);padding-inline:var(--wp-ui-input-layout-padding-inline,0);width:100%;&::placeholder{color:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d)}&:disabled,&[aria-disabled=true]{color:var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d);@media (forced-colors:active){color:GrayText}}&[type=email],&[type=url]{direction:ltr}}}");
}
var style_default7 = { "input": "_2ae7be2fc1bb17a3__input" };
var Input3 = (0, import_element9.forwardRef)(function Input22({ className, size = "default", prefix, suffix, style, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    InputLayout3,
    {
      className: clsx_default(
        focus_default2["outset-ring--focus-within"],
        className
      ),
      style,
      size,
      visuallyDisabled: restProps.disabled,
      prefix,
      suffix,
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        Input,
        {
          ref,
          className: clsx_default(global_css_defense_default4.input, style_default7.input),
          ...restProps
        }
      )
    }
  );
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/field/index.mjs
var field_exports = {};
__export(field_exports, {
  Control: () => Control,
  Description: () => Description,
  Details: () => Details,
  Item: () => Item,
  Label: () => Label,
  Root: () => Root
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/field/root.mjs
var import_element10 = __toESM(require_element(), 1);
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE8 = "data-wp-hash";
function getRuntime8() {
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
    registerDocument8(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash8(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE8}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE8) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle8(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime8();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash8(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE8, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument8(targetDocument) {
  const runtime = getRuntime8();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle8(targetDocument, hash, css);
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
function registerStyle8(hash, css) {
  const runtime = getRuntime8();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle8(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle8("e3ae230cea", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}");
}
var resets_default3 = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
var DEFAULT_RENDER = (props) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Stack, { ...props, direction: "column", gap: "sm" });
var Root = (0, import_element10.forwardRef)(function Root2({ className, render = DEFAULT_RENDER, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    index_parts_exports.Root,
    {
      ref,
      className: clsx_default(resets_default3["box-sizing"], className),
      render,
      ...restProps
    }
  );
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/field/item.mjs
var import_element11 = __toESM(require_element(), 1);
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var Item = (0, import_element11.forwardRef)(function Item2(props, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(index_parts_exports.Item, { ref, ...props });
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/field/label.mjs
var import_element13 = __toESM(require_element(), 1);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/visually-hidden/visually-hidden.mjs
var import_element12 = __toESM(require_element(), 1);
var STYLE_HASH_ATTRIBUTE9 = "data-wp-hash";
function getRuntime9() {
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
    registerDocument9(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash9(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE9}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE9) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle9(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime9();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash9(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE9, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument9(targetDocument) {
  const runtime = getRuntime9();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle9(targetDocument, hash, css);
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
function registerStyle9(hash, css) {
  const runtime = getRuntime9();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle9(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle9("c46e8cb841", "@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{.f37b9e2e191ebd66__visually-hidden{word-wrap:normal;border:0;clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;word-break:normal}}");
}
var style_default8 = { "visually-hidden": "f37b9e2e191ebd66__visually-hidden" };
var VisuallyHidden = (0, import_element12.forwardRef)(
  function VisuallyHidden2({ render, ...restProps }, ref) {
    const element = useRender({
      render,
      ref,
      props: mergeProps(
        { className: style_default8["visually-hidden"] },
        restProps,
        {
          // @ts-expect-error Arbitrary data-* attributes aren't indexable on the typed div props. Kept hardcoded so consumers can't change or remove it.
          "data-visually-hidden": ""
        }
      )
    });
    return element;
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/field/label.mjs
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE10 = "data-wp-hash";
function getRuntime10() {
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
    registerDocument10(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash10(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE10}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE10) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle10(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime10();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash10(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE10, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument10(targetDocument) {
  const runtime = getRuntime10();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle10(targetDocument, hash, css);
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
function registerStyle10(hash, css) {
  const runtime = getRuntime10();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle10(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle10("f9ecc2af7d", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._2d5ad850b2f90964__label{--wp-ui-field-label-line-height:var(--wpds-typography-line-height-xs,16px);color:var(--wpds-color-fg-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wp-ui-field-label-line-height);text-transform:uppercase;&._17c4214649230bea__is-plain{font-size:var(--wpds-typography-font-size-md,13px);text-transform:none}}._08a3750500e0233f__description{--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);--_gcd-p-margin:0;color:var(--wpds-color-fg-content-neutral-weak,#707070);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}');
}
var field_default = { "label": "_2d5ad850b2f90964__label", "is-plain": "_17c4214649230bea__is-plain", "description": "_08a3750500e0233f__description" };
var Label = (0, import_element13.forwardRef)(
  function Label2({ className, hideFromVision, variant, ...restProps }, ref) {
    const label = /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      index_parts_exports.Label,
      {
        ref,
        className: clsx_default(
          field_default.label,
          variant && field_default[`is-${variant}`],
          className
        ),
        ...restProps
      }
    );
    if (hideFromVision) {
      return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(VisuallyHidden, { render: label });
    }
    return label;
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/field/description.mjs
var import_element14 = __toESM(require_element(), 1);
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE11 = "data-wp-hash";
function getRuntime11() {
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
    registerDocument11(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash11(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE11}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE11) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle11(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime11();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash11(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE11, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument11(targetDocument) {
  const runtime = getRuntime11();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle11(targetDocument, hash, css);
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
function registerStyle11(hash, css) {
  const runtime = getRuntime11();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle11(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle11("1fb29d3a3c", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,#0000);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 #0000);color:var(--_gcd-input-color,var(--wpds-color-fg-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,#0000);border-color:var(--_gcd-input-border-color-disabled,#0000);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-fg-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid #0000)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-fg-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid #0000);transition:var(--_gcd-a-transition,none)}");
}
var global_css_defense_default5 = { "button": "_6defc79820e382c6__button", "input": "d2cff2e5dea83bd1__input", "textarea": "_547d86373d02e108__textarea", "div": "_8c15fd0ed9f28ba4__div", "p": "_43cec3e1eec1066d__p", "heading": "e97669c6d9a38497__heading", "a": "_2c0831b0499dbd6e__a" };
if (typeof process === "undefined" || true) {
  registerStyle11("f9ecc2af7d", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._2d5ad850b2f90964__label{--wp-ui-field-label-line-height:var(--wpds-typography-line-height-xs,16px);color:var(--wpds-color-fg-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wp-ui-field-label-line-height);text-transform:uppercase;&._17c4214649230bea__is-plain{font-size:var(--wpds-typography-font-size-md,13px);text-transform:none}}._08a3750500e0233f__description{--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);--_gcd-p-margin:0;color:var(--wpds-color-fg-content-neutral-weak,#707070);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}');
}
var field_default2 = { "label": "_2d5ad850b2f90964__label", "is-plain": "_17c4214649230bea__is-plain", "description": "_08a3750500e0233f__description" };
var Description = (0, import_element14.forwardRef)(function Description2({ className, ...restProps }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    index_parts_exports.Description,
    {
      ref,
      className: clsx_default(
        global_css_defense_default5.p,
        field_default2.description,
        className
      ),
      ...restProps
    }
  );
});

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/field/details.mjs
var import_element15 = __toESM(require_element(), 1);
var import_i18n4 = __toESM(require_i18n(), 1);
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var STYLE_HASH_ATTRIBUTE12 = "data-wp-hash";
function getRuntime12() {
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
    registerDocument12(document);
  }
  return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash12(targetDocument, hash) {
  if (!targetDocument.head) {
    return false;
  }
  for (const style of targetDocument.head.querySelectorAll(
    `style[${STYLE_HASH_ATTRIBUTE12}]`
  )) {
    if (style.getAttribute(STYLE_HASH_ATTRIBUTE12) === hash) {
      return true;
    }
  }
  return false;
}
function injectStyle12(targetDocument, hash, css) {
  if (!targetDocument.head) {
    return;
  }
  const runtime = getRuntime12();
  let injectedStyles = runtime.injectedStyles.get(targetDocument);
  if (!injectedStyles) {
    injectedStyles = /* @__PURE__ */ new Set();
    runtime.injectedStyles.set(targetDocument, injectedStyles);
  }
  if (injectedStyles.has(hash)) {
    return;
  }
  if (documentContainsStyleHash12(targetDocument, hash)) {
    injectedStyles.add(hash);
    return;
  }
  const style = targetDocument.createElement("style");
  style.setAttribute(STYLE_HASH_ATTRIBUTE12, hash);
  style.appendChild(targetDocument.createTextNode(css));
  targetDocument.head.appendChild(style);
  injectedStyles.add(hash);
}
function registerDocument12(targetDocument) {
  const runtime = getRuntime12();
  runtime.documents.set(
    targetDocument,
    (runtime.documents.get(targetDocument) ?? 0) + 1
  );
  for (const [hash, css] of runtime.styles) {
    injectStyle12(targetDocument, hash, css);
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
function registerStyle12(hash, css) {
  const runtime = getRuntime12();
  runtime.styles.set(hash, css);
  for (const targetDocument of runtime.documents.keys()) {
    injectStyle12(targetDocument, hash, css);
  }
}
if (typeof process === "undefined" || true) {
  registerStyle12("f9ecc2af7d", '@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-utilities{._2d5ad850b2f90964__label{--wp-ui-field-label-line-height:var(--wpds-typography-line-height-xs,16px);color:var(--wpds-color-fg-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wp-ui-field-label-line-height);text-transform:uppercase;&._17c4214649230bea__is-plain{font-size:var(--wpds-typography-font-size-md,13px);text-transform:none}}._08a3750500e0233f__description{--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);--_gcd-p-margin:0;color:var(--wpds-color-fg-content-neutral-weak,#707070);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,"Segoe UI","Roboto","Oxygen-Sans","Ubuntu","Cantarell","Helvetica Neue",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}');
}
var field_default3 = { "label": "_2d5ad850b2f90964__label", "is-plain": "_17c4214649230bea__is-plain", "description": "_08a3750500e0233f__description" };
var Details = (0, import_element15.forwardRef)(
  function Details2({ className, ...restProps }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_jsx_runtime19.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(VisuallyHidden, { render: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(index_parts_exports.Description, {}), children: (0, import_i18n4.__)("More details follow the field.") }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "div",
        {
          ref,
          className: clsx_default(field_default3.description, className),
          ...restProps
        }
      )
    ] });
  }
);

// ../../../node_modules/.pnpm/@wordpress+ui@0.13.0_@date-fns+tz@1.4.1_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/form/primitives/field/control.mjs
var import_element16 = __toESM(require_element(), 1);
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var Control = (0, import_element16.forwardRef)(
  function Control2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(index_parts_exports.Control, { ref, ...props });
  }
);

// packages/ui/build-module/date-filters-panel/date-filters-panel.mjs
var import_react45 = __toESM(require_react(), 1);

// packages/formatters/src/date/format-date.ts
var DATE_FORMATS = {
  short: "MMM d",
  medium: "MMM d, yyyy",
  long: "MMMM d, yyyy",
  full: "EEEE, MMMM d, yyyy",
  day: "d",
  month: "MMM",
  year: "yyyy",
  monthYear: "MMM yyyy",
  numeric: "MM/dd/yyyy",
  iso: "yyyy-MM-dd",
  dateTime: "MMM d, yyyy h:mm a"
};
var formatDate = (date, formatString = "medium") => {
  const formatPattern = Object.hasOwn(DATE_FORMATS, formatString) ? DATE_FORMATS[formatString] : formatString;
  return format(date, formatPattern);
};

// packages/formatters/src/date/format-date-range.ts
var formatDateRange = (range) => {
  if (!range) {
    return "";
  }
  const { from, to } = range;
  if (!from || !to) {
    return "";
  }
  const sameYear = from.getFullYear() === to.getFullYear();
  const sameMonth = sameYear && from.getMonth() === to.getMonth();
  const sameDay = sameMonth && from.getDate() === to.getDate();
  if (sameDay) {
    return formatDate(from, "medium");
  }
  if (sameMonth) {
    return `${formatDate(from, "short")}-${formatDate(to, "d, yyyy")}`;
  }
  if (sameYear) {
    return `${formatDate(from, "short")}-${formatDate(to)}`;
  }
  return `${formatDate(from)}-${formatDate(to)}`;
};

// packages/ui/build-module/date-comparison-dropdown/date-comparison-dropdown.mjs
var import_components2 = __toESM(require_components(), 1);
var import_i18n6 = __toESM(require_i18n(), 1);
var import_react6 = __toESM(require_react(), 1);

// packages/ui/build-module/date-range-presets/date-range-presets.mjs
var import_components = __toESM(require_components(), 1);
var import_i18n5 = __toESM(require_i18n(), 1);
var import_react5 = __toESM(require_react(), 1);

// packages/ui/build-module/lock/unlock.mjs
var import_private_apis = __toESM(require_private_apis(), 1);
var { unlock } = (0, import_private_apis.__dangerousOptInToUnstableAPIsOnlyForCoreModules)(
  "I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.",
  "@wordpress/components"
);

// packages/ui/build-module/date-range-presets/date-range-presets.mjs
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='2a5602b33e']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "2a5602b33e");
  style.appendChild(document.createTextNode(".date-range-presets{max-width:240px}.date-range-presets .date-range-presets__item,.date-range-presets__custom-group .date-range-presets__item{min-height:var(--wpds-typography-line-height-2xl,40px)}.date-range-presets__custom-group .date-range-presets__custom[aria-disabled=true]{color:var(--wpds-color-fg-content-neutral-weak,#707070)}.date-range-presets__custom-group .date-range-presets__custom[aria-checked=true]{color:var(--wpds-color-fg-content-neutral,#1e1e1e)}"));
  document.head.appendChild(style);
}
var { Menu } = unlock(import_components.privateApis);
function DateRangePresets({
  onRangeChange,
  value,
  timeZone,
  presets: presetsProp,
  onClear,
  hideOnClick
}) {
  const defaultPresets = (0, import_react5.useMemo)(() => {
    if (presetsProp) {
      return [];
    }
    if (!timeZone) {
      throw new Error(
        "DateRangePresets: `timeZone` is required when `presets` are not provided."
      );
    }
    return getDefaultDateRangePresets(timeZone);
  }, [presetsProp, timeZone]);
  const presets = (0, import_react5.useMemo)(() => presetsProp || defaultPresets, [presetsProp, defaultPresets]);
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Menu.Group, { className: "date-range-presets", children: presets.map(({ id, label, range: presetRange }) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      Menu.CheckboxItem,
      {
        className: "date-range-presets__item",
        name: "date-preset",
        value: id,
        checked: value === id,
        onChange: () => onRangeChange(presetRange, id),
        hideOnClick,
        children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Menu.ItemLabel, { children: label })
      },
      label
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Menu.Separator, {}),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(Menu.Group, { className: "date-range-presets__custom-group", children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        Menu.CheckboxItem,
        {
          className: "date-range-presets__item date-range-presets__custom",
          name: "date-preset",
          value: PRESET_CUSTOM,
          checked: value === PRESET_CUSTOM,
          disabled: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Menu.ItemLabel, { children: (0, import_i18n5.__)("Custom", "jetpack-premium-analytics") })
        },
        "custom"
      ),
      onClear && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
        Menu.CheckboxItem,
        {
          className: "date-range-presets__item",
          name: "date-preset",
          value: "no-comparison",
          checked: value === null,
          onChange: onClear,
          hideOnClick: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Menu.ItemLabel, { children: (0, import_i18n5.__)("No comparison", "jetpack-premium-analytics") })
        },
        "no-comparison"
      )
    ] })
  ] });
}

// packages/ui/build-module/date-comparison-dropdown/date-comparison-dropdown.mjs
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='4bba10f35a']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "4bba10f35a");
  style.appendChild(document.createTextNode(".date-comparison-dropdown__button,.date-filters-panel-button{background-color:var(--wpds-color-bg-surface-neutral-strong,#fff)}.date-comparison-dropdown__popover{width:235px}@media not (prefers-reduced-motion:reduce){.date-comparison-dropdown__popover{transition:none!important;view-transition-name:jp-premium-analytics--date-comparison-dropdown}}::view-transition-group(jp-premium-analytics--date-comparison-dropdown){z-index:3000}::view-transition-new(jp-premium-analytics--date-comparison-dropdown),::view-transition-old(jp-premium-analytics--date-comparison-dropdown){animation:none}"));
  document.head.appendChild(style);
}
var { Menu: Menu2 } = unlock(import_components2.privateApis);
function DateComparisonDropdown({
  presets,
  enabled,
  presetId,
  removeCompareToPrefix = false,
  onEnable,
  onPresetChange,
  onClear
}) {
  const selectedPreset = (0, import_react6.useMemo)(
    () => presetId ? presets.find((p) => p.id === presetId) : void 0,
    [presets, presetId]
  );
  const comparisonRange = selectedPreset?.range;
  const hasValidPreset = !!comparisonRange;
  const hasPresets = presets.length > 0;
  if (!enabled) {
    return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Menu2, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Menu2.TriggerButton,
        {
          render: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            Button4,
            {
              className: "date-filters-panel-button",
              variant: "outline",
              tone: "neutral",
              size: "compact",
              id: "date-comparison-dropdown-button",
              children: (0, import_i18n6.__)("No comparison", "jetpack-premium-analytics")
            }
          )
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Menu2.Popover, { className: "date-comparison-dropdown__popover", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Menu2.Group, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Menu2.CheckboxItem, { name: "comparison-toggle", value: "no-comparison", checked: true, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Menu2.ItemLabel, { children: (0, import_i18n6.__)("No comparison", "jetpack-premium-analytics") }) }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          Menu2.CheckboxItem,
          {
            name: "comparison-toggle",
            value: "comparison-to-past",
            checked: false,
            onChange: onEnable,
            hideOnClick: true,
            children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Menu2.ItemLabel, { children: (0, import_i18n6.__)("Comparison to past", "jetpack-premium-analytics") })
          }
        )
      ] }) })
    ] });
  }
  let label = (0, import_i18n6.__)("Select comparison", "jetpack-premium-analytics");
  if (hasValidPreset) {
    if (removeCompareToPrefix) {
      label = formatDateRange(comparisonRange);
    } else {
      label = (0, import_i18n6.sprintf)(
        // translators: %s is the comparison range label
        (0, import_i18n6.__)("Compare to: %s", "jetpack-premium-analytics"),
        formatDateRange(comparisonRange)
      );
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Menu2, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      Menu2.TriggerButton,
      {
        render: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          Button4,
          {
            className: "date-comparison-dropdown__button",
            variant: "outline",
            tone: "neutral",
            size: "compact",
            children: label
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Menu2.Popover, { className: "date-comparison-dropdown__popover", children: hasPresets && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      DateRangePresets,
      {
        value: presetId ?? null,
        presets,
        hideOnClick: true,
        onRangeChange: (_range, id) => {
          onPresetChange(id);
        },
        onClear
      }
    ) })
  ] });
}

// ../../../node_modules/.pnpm/@automattic+ui@1.0.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@automattic/ui/dist/index.js
var import_element17 = __toESM(require_element(), 1);
var import_primitives3 = __toESM(require_primitives(), 1);
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var FIVE_WEEKS = 5;
var FOUR_WEEKS = 4;
function getBroadcastWeeksInMonth(month, dateLib) {
  const firstDayOfMonth = dateLib.startOfMonth(month);
  const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
  const broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1);
  const lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
  const numberOfWeeks = dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
  return numberOfWeeks;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function startOfBroadcastWeek(date, dateLib) {
  const firstOfMonth = dateLib.startOfMonth(date);
  const dayOfWeek = firstOfMonth.getDay();
  if (dayOfWeek === 1) {
    return firstOfMonth;
  } else if (dayOfWeek === 0) {
    return dateLib.addDays(firstOfMonth, -1 * 6);
  } else {
    return dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
  }
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function endOfBroadcastWeek(date, dateLib) {
  const startDate = startOfBroadcastWeek(date, dateLib);
  const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
  const endDate = dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
  return endDate;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/locale/en-US.js
var enUS2 = {
  ...enUS,
  labels: {
    labelDayButton: (date, modifiers, options, dateLib) => {
      let formatDate2;
      if (dateLib && typeof dateLib.format === "function") {
        formatDate2 = dateLib.format.bind(dateLib);
      } else {
        formatDate2 = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
      }
      let label = formatDate2(date, "PPPP");
      if (modifiers.today)
        label = `Today, ${label}`;
      if (modifiers.selected)
        label = `${label}, selected`;
      return label;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (date, options, dateLib) => {
      let formatDate2;
      if (dateLib && typeof dateLib.format === "function") {
        formatDate2 = dateLib.format.bind(dateLib);
      } else {
        formatDate2 = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
      }
      return formatDate2(date, "LLLL yyyy");
    },
    labelGridcell: (date, modifiers, options, dateLib) => {
      let formatDate2;
      if (dateLib && typeof dateLib.format === "function") {
        formatDate2 = dateLib.format.bind(dateLib);
      } else {
        formatDate2 = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
      }
      let label = formatDate2(date, "PPPP");
      if (modifiers?.today) {
        label = `Today, ${label}`;
      }
      return label;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (date, options, dateLib) => {
      let formatDate2;
      if (dateLib && typeof dateLib.format === "function") {
        formatDate2 = dateLib.format.bind(dateLib);
      } else {
        formatDate2 = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
      }
      return formatDate2(date, "cccc");
    }
  }
};

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/classes/DateLib.js
var DateLib = class _DateLib {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(options, overrides) {
    this.Date = Date;
    this.today = () => {
      if (this.overrides?.today) {
        return this.overrides.today();
      }
      if (this.options.timeZone) {
        return TZDate.tz(this.options.timeZone);
      }
      return new this.Date();
    };
    this.newDate = (year, monthIndex, date) => {
      if (this.overrides?.newDate) {
        return this.overrides.newDate(year, monthIndex, date);
      }
      if (this.options.timeZone) {
        return new TZDate(year, monthIndex, date, this.options.timeZone);
      }
      return new Date(year, monthIndex, date);
    };
    this.addDays = (date, amount) => {
      return this.overrides?.addDays ? this.overrides.addDays(date, amount) : addDays(date, amount);
    };
    this.addMonths = (date, amount) => {
      return this.overrides?.addMonths ? this.overrides.addMonths(date, amount) : addMonths(date, amount);
    };
    this.addWeeks = (date, amount) => {
      return this.overrides?.addWeeks ? this.overrides.addWeeks(date, amount) : addWeeks(date, amount);
    };
    this.addYears = (date, amount) => {
      return this.overrides?.addYears ? this.overrides.addYears(date, amount) : addYears(date, amount);
    };
    this.differenceInCalendarDays = (dateLeft, dateRight) => {
      return this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : differenceInCalendarDays(dateLeft, dateRight);
    };
    this.differenceInCalendarMonths = (dateLeft, dateRight) => {
      return this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : differenceInCalendarMonths(dateLeft, dateRight);
    };
    this.eachMonthOfInterval = (interval) => {
      return this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(interval) : eachMonthOfInterval(interval);
    };
    this.eachYearOfInterval = (interval) => {
      const years = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(interval) : eachYearOfInterval(interval);
      const uniqueYears = new Set(years.map((d) => this.getYear(d)));
      if (uniqueYears.size === years.length) {
        return years;
      }
      const yearsArray = [];
      uniqueYears.forEach((y) => {
        yearsArray.push(new Date(y, 0, 1));
      });
      return yearsArray;
    };
    this.endOfBroadcastWeek = (date) => {
      return this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this);
    };
    this.endOfISOWeek = (date) => {
      return this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(date) : endOfISOWeek(date);
    };
    this.endOfMonth = (date) => {
      return this.overrides?.endOfMonth ? this.overrides.endOfMonth(date) : endOfMonth(date);
    };
    this.endOfWeek = (date, options2) => {
      return this.overrides?.endOfWeek ? this.overrides.endOfWeek(date, options2) : endOfWeek(date, this.options);
    };
    this.endOfYear = (date) => {
      return this.overrides?.endOfYear ? this.overrides.endOfYear(date) : endOfYear(date);
    };
    this.format = (date, formatStr, _options) => {
      const formatted = this.overrides?.format ? this.overrides.format(date, formatStr, this.options) : format(date, formatStr, this.options);
      if (this.options.numerals && this.options.numerals !== "latn") {
        return this.replaceDigits(formatted);
      }
      return formatted;
    };
    this.getISOWeek = (date) => {
      return this.overrides?.getISOWeek ? this.overrides.getISOWeek(date) : getISOWeek(date);
    };
    this.getMonth = (date, _options) => {
      return this.overrides?.getMonth ? this.overrides.getMonth(date, this.options) : getMonth(date, this.options);
    };
    this.getYear = (date, _options) => {
      return this.overrides?.getYear ? this.overrides.getYear(date, this.options) : getYear(date, this.options);
    };
    this.getWeek = (date, _options) => {
      return this.overrides?.getWeek ? this.overrides.getWeek(date, this.options) : getWeek(date, this.options);
    };
    this.isAfter = (date, dateToCompare) => {
      return this.overrides?.isAfter ? this.overrides.isAfter(date, dateToCompare) : isAfter(date, dateToCompare);
    };
    this.isBefore = (date, dateToCompare) => {
      return this.overrides?.isBefore ? this.overrides.isBefore(date, dateToCompare) : isBefore(date, dateToCompare);
    };
    this.isDate = (value) => {
      return this.overrides?.isDate ? this.overrides.isDate(value) : isDate(value);
    };
    this.isSameDay = (dateLeft, dateRight) => {
      return this.overrides?.isSameDay ? this.overrides.isSameDay(dateLeft, dateRight) : isSameDay(dateLeft, dateRight);
    };
    this.isSameMonth = (dateLeft, dateRight) => {
      return this.overrides?.isSameMonth ? this.overrides.isSameMonth(dateLeft, dateRight) : isSameMonth(dateLeft, dateRight);
    };
    this.isSameYear = (dateLeft, dateRight) => {
      return this.overrides?.isSameYear ? this.overrides.isSameYear(dateLeft, dateRight) : isSameYear(dateLeft, dateRight);
    };
    this.max = (dates) => {
      return this.overrides?.max ? this.overrides.max(dates) : max(dates);
    };
    this.min = (dates) => {
      return this.overrides?.min ? this.overrides.min(dates) : min(dates);
    };
    this.setMonth = (date, month) => {
      return this.overrides?.setMonth ? this.overrides.setMonth(date, month) : setMonth(date, month);
    };
    this.setYear = (date, year) => {
      return this.overrides?.setYear ? this.overrides.setYear(date, year) : setYear(date, year);
    };
    this.startOfBroadcastWeek = (date, _dateLib) => {
      return this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this);
    };
    this.startOfDay = (date) => {
      return this.overrides?.startOfDay ? this.overrides.startOfDay(date) : startOfDay(date);
    };
    this.startOfISOWeek = (date) => {
      return this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(date) : startOfISOWeek(date);
    };
    this.startOfMonth = (date) => {
      return this.overrides?.startOfMonth ? this.overrides.startOfMonth(date) : startOfMonth(date);
    };
    this.startOfWeek = (date, _options) => {
      return this.overrides?.startOfWeek ? this.overrides.startOfWeek(date, this.options) : startOfWeek(date, this.options);
    };
    this.startOfYear = (date) => {
      return this.overrides?.startOfYear ? this.overrides.startOfYear(date) : startOfYear(date);
    };
    this.options = { locale: enUS2, ...options };
    this.overrides = overrides;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals = "latn" } = this.options;
    const formatter = new Intl.NumberFormat("en-US", {
      numberingSystem: numerals
    });
    const digitMap = {};
    for (let i = 0; i < 10; i++) {
      digitMap[i.toString()] = formatter.format(i);
    }
    return digitMap;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(input) {
    const digitMap = this.getDigitMap();
    return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(value) {
    return this.replaceDigits(value.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    const code = this.options.locale?.code;
    if (!code) {
      return "month-first";
    }
    return _DateLib.yearFirstLocales.has(code) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(date) {
    const { locale, timeZone, numerals } = this.options;
    const localeCode = locale?.code;
    if (localeCode && _DateLib.yearFirstLocales.has(localeCode)) {
      try {
        const intl = new Intl.DateTimeFormat(localeCode, {
          month: "long",
          year: "numeric",
          timeZone,
          numberingSystem: numerals
        });
        const formatted = intl.format(date);
        return formatted;
      } catch {
      }
    }
    const pattern = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(date, pattern);
  }
};
DateLib.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
var defaultDateLib = new DateLib();

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/classes/CalendarDay.js
var CalendarDay = class {
  constructor(date, displayMonth, dateLib = defaultDateLib) {
    this.date = date;
    this.displayMonth = displayMonth;
    this.outside = Boolean(displayMonth && !dateLib.isSameMonth(date, displayMonth));
    this.dateLib = dateLib;
    this.isoDate = dateLib.format(date, "yyyy-MM-dd");
    this.displayMonthId = dateLib.format(displayMonth, "yyyy-MM");
    this.dateMonthId = dateLib.format(date, "yyyy-MM");
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(day) {
    return this.dateLib.isSameDay(day.date, this.date) && this.dateLib.isSameMonth(day.displayMonth, this.displayMonth);
  }
};

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/classes/CalendarMonth.js
var CalendarMonth = class {
  constructor(month, weeks) {
    this.date = month;
    this.weeks = weeks;
  }
};

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/classes/CalendarWeek.js
var CalendarWeek = class {
  constructor(weekNumber, days) {
    this.days = days;
    this.weekNumber = weekNumber;
  }
};

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/custom-components.js
var custom_components_exports = {};
__export(custom_components_exports, {
  Button: () => Button5,
  CaptionLabel: () => CaptionLabel,
  Chevron: () => Chevron,
  Day: () => Day,
  DayButton: () => DayButton,
  Dropdown: () => Dropdown,
  DropdownNav: () => DropdownNav,
  Footer: () => Footer,
  Month: () => Month,
  MonthCaption: () => MonthCaption,
  MonthGrid: () => MonthGrid,
  Months: () => Months,
  MonthsDropdown: () => MonthsDropdown,
  Nav: () => Nav,
  NextMonthButton: () => NextMonthButton,
  Option: () => Option,
  PreviousMonthButton: () => PreviousMonthButton,
  Root: () => Root3,
  Select: () => Select,
  Week: () => Week,
  WeekNumber: () => WeekNumber,
  WeekNumberHeader: () => WeekNumberHeader,
  Weekday: () => Weekday,
  Weekdays: () => Weekdays,
  Weeks: () => Weeks,
  YearsDropdown: () => YearsDropdown
});

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Button.js
var import_react7 = __toESM(require_react(), 1);
function Button5(props) {
  return import_react7.default.createElement("button", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
var import_react8 = __toESM(require_react(), 1);
function CaptionLabel(props) {
  return import_react8.default.createElement("span", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Chevron.js
var import_react9 = __toESM(require_react(), 1);
function Chevron(props) {
  const { size = 24, orientation = "left", className } = props;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    import_react9.default.createElement(
      "svg",
      { className, width: size, height: size, viewBox: "0 0 24 24" },
      orientation === "up" && import_react9.default.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      orientation === "down" && import_react9.default.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      orientation === "left" && import_react9.default.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      orientation === "right" && import_react9.default.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Day.js
var import_react10 = __toESM(require_react(), 1);
function Day(props) {
  const { day, modifiers, ...tdProps } = props;
  return import_react10.default.createElement("td", { ...tdProps });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/DayButton.js
var import_react11 = __toESM(require_react(), 1);
function DayButton(props) {
  const { day, modifiers, ...buttonProps } = props;
  const ref = import_react11.default.useRef(null);
  import_react11.default.useEffect(() => {
    if (modifiers.focused)
      ref.current?.focus();
  }, [modifiers.focused]);
  return import_react11.default.createElement("button", { ref, ...buttonProps });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Dropdown.js
var import_react12 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/UI.js
var UI;
(function(UI2) {
  UI2["Root"] = "root";
  UI2["Chevron"] = "chevron";
  UI2["Day"] = "day";
  UI2["DayButton"] = "day_button";
  UI2["CaptionLabel"] = "caption_label";
  UI2["Dropdowns"] = "dropdowns";
  UI2["Dropdown"] = "dropdown";
  UI2["DropdownRoot"] = "dropdown_root";
  UI2["Footer"] = "footer";
  UI2["MonthGrid"] = "month_grid";
  UI2["MonthCaption"] = "month_caption";
  UI2["MonthsDropdown"] = "months_dropdown";
  UI2["Month"] = "month";
  UI2["Months"] = "months";
  UI2["Nav"] = "nav";
  UI2["NextMonthButton"] = "button_next";
  UI2["PreviousMonthButton"] = "button_previous";
  UI2["Week"] = "week";
  UI2["Weeks"] = "weeks";
  UI2["Weekday"] = "weekday";
  UI2["Weekdays"] = "weekdays";
  UI2["WeekNumber"] = "week_number";
  UI2["WeekNumberHeader"] = "week_number_header";
  UI2["YearsDropdown"] = "years_dropdown";
})(UI || (UI = {}));
var DayFlag;
(function(DayFlag2) {
  DayFlag2["disabled"] = "disabled";
  DayFlag2["hidden"] = "hidden";
  DayFlag2["outside"] = "outside";
  DayFlag2["focused"] = "focused";
  DayFlag2["today"] = "today";
})(DayFlag || (DayFlag = {}));
var SelectionState;
(function(SelectionState2) {
  SelectionState2["range_end"] = "range_end";
  SelectionState2["range_middle"] = "range_middle";
  SelectionState2["range_start"] = "range_start";
  SelectionState2["selected"] = "selected";
})(SelectionState || (SelectionState = {}));
var Animation;
(function(Animation2) {
  Animation2["weeks_before_enter"] = "weeks_before_enter";
  Animation2["weeks_before_exit"] = "weeks_before_exit";
  Animation2["weeks_after_enter"] = "weeks_after_enter";
  Animation2["weeks_after_exit"] = "weeks_after_exit";
  Animation2["caption_after_enter"] = "caption_after_enter";
  Animation2["caption_after_exit"] = "caption_after_exit";
  Animation2["caption_before_enter"] = "caption_before_enter";
  Animation2["caption_before_exit"] = "caption_before_exit";
})(Animation || (Animation = {}));

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Dropdown.js
function Dropdown(props) {
  const { options, className, components, classNames, ...selectProps } = props;
  const cssClassSelect = [classNames[UI.Dropdown], className].join(" ");
  const selectedOption = options?.find(({ value }) => value === selectProps.value);
  return import_react12.default.createElement(
    "span",
    { "data-disabled": selectProps.disabled, className: classNames[UI.DropdownRoot] },
    import_react12.default.createElement(components.Select, { className: cssClassSelect, ...selectProps }, options?.map(({ value, label, disabled: disabled2 }) => import_react12.default.createElement(components.Option, { key: value, value, disabled: disabled2 }, label))),
    import_react12.default.createElement(
      "span",
      { className: classNames[UI.CaptionLabel], "aria-hidden": true },
      selectedOption?.label,
      import_react12.default.createElement(components.Chevron, { orientation: "down", size: 18, className: classNames[UI.Chevron] })
    )
  );
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/DropdownNav.js
var import_react13 = __toESM(require_react(), 1);
function DropdownNav(props) {
  return import_react13.default.createElement("div", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Footer.js
var import_react14 = __toESM(require_react(), 1);
function Footer(props) {
  return import_react14.default.createElement("div", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Month.js
var import_react15 = __toESM(require_react(), 1);
function Month(props) {
  const { calendarMonth, displayIndex, ...divProps } = props;
  return import_react15.default.createElement("div", { ...divProps }, props.children);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/MonthCaption.js
var import_react16 = __toESM(require_react(), 1);
function MonthCaption(props) {
  const { calendarMonth, displayIndex, ...divProps } = props;
  return import_react16.default.createElement("div", { ...divProps });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/MonthGrid.js
var import_react17 = __toESM(require_react(), 1);
function MonthGrid(props) {
  return import_react17.default.createElement("table", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Months.js
var import_react18 = __toESM(require_react(), 1);
function Months(props) {
  return import_react18.default.createElement("div", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
var import_react20 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/useDayPicker.js
var import_react19 = __toESM(require_react(), 1);
var dayPickerContext = (0, import_react19.createContext)(void 0);
function useDayPicker() {
  const context = (0, import_react19.useContext)(dayPickerContext);
  if (context === void 0) {
    throw new Error("useDayPicker() must be used within a custom component.");
  }
  return context;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function MonthsDropdown(props) {
  const { components } = useDayPicker();
  return import_react20.default.createElement(components.Dropdown, { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Nav.js
var import_react21 = __toESM(require_react(), 1);
function Nav(props) {
  const { onPreviousClick, onNextClick, previousMonth, nextMonth, ...navProps } = props;
  const { components, classNames, labels: { labelPrevious: labelPrevious2, labelNext: labelNext2 } } = useDayPicker();
  const handleNextClick = (0, import_react21.useCallback)((e) => {
    if (nextMonth) {
      onNextClick?.(e);
    }
  }, [nextMonth, onNextClick]);
  const handlePreviousClick = (0, import_react21.useCallback)((e) => {
    if (previousMonth) {
      onPreviousClick?.(e);
    }
  }, [previousMonth, onPreviousClick]);
  return import_react21.default.createElement(
    "nav",
    { ...navProps },
    import_react21.default.createElement(
      components.PreviousMonthButton,
      { type: "button", className: classNames[UI.PreviousMonthButton], tabIndex: previousMonth ? void 0 : -1, "aria-disabled": previousMonth ? void 0 : true, "aria-label": labelPrevious2(previousMonth), onClick: handlePreviousClick },
      import_react21.default.createElement(components.Chevron, { disabled: previousMonth ? void 0 : true, className: classNames[UI.Chevron], orientation: "left" })
    ),
    import_react21.default.createElement(
      components.NextMonthButton,
      { type: "button", className: classNames[UI.NextMonthButton], tabIndex: nextMonth ? void 0 : -1, "aria-disabled": nextMonth ? void 0 : true, "aria-label": labelNext2(nextMonth), onClick: handleNextClick },
      import_react21.default.createElement(components.Chevron, { disabled: nextMonth ? void 0 : true, orientation: "right", className: classNames[UI.Chevron] })
    )
  );
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
var import_react22 = __toESM(require_react(), 1);
function NextMonthButton(props) {
  const { components } = useDayPicker();
  return import_react22.default.createElement(components.Button, { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Option.js
var import_react23 = __toESM(require_react(), 1);
function Option(props) {
  return import_react23.default.createElement("option", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
var import_react24 = __toESM(require_react(), 1);
function PreviousMonthButton(props) {
  const { components } = useDayPicker();
  return import_react24.default.createElement(components.Button, { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Root.js
var import_react25 = __toESM(require_react(), 1);
function Root3(props) {
  const { rootRef, ...rest } = props;
  return import_react25.default.createElement("div", { ...rest, ref: rootRef });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Select.js
var import_react26 = __toESM(require_react(), 1);
function Select(props) {
  return import_react26.default.createElement("select", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Week.js
var import_react27 = __toESM(require_react(), 1);
function Week(props) {
  const { week, ...trProps } = props;
  return import_react27.default.createElement("tr", { ...trProps });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Weekday.js
var import_react28 = __toESM(require_react(), 1);
function Weekday(props) {
  return import_react28.default.createElement("th", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Weekdays.js
var import_react29 = __toESM(require_react(), 1);
function Weekdays(props) {
  return import_react29.default.createElement(
    "thead",
    { "aria-hidden": true },
    import_react29.default.createElement("tr", { ...props })
  );
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/WeekNumber.js
var import_react30 = __toESM(require_react(), 1);
function WeekNumber(props) {
  const { week, ...thProps } = props;
  return import_react30.default.createElement("th", { ...thProps });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
var import_react31 = __toESM(require_react(), 1);
function WeekNumberHeader(props) {
  return import_react31.default.createElement("th", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/Weeks.js
var import_react32 = __toESM(require_react(), 1);
function Weeks(props) {
  return import_react32.default.createElement("tbody", { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
var import_react33 = __toESM(require_react(), 1);
function YearsDropdown(props) {
  const { components } = useDayPicker();
  return import_react33.default.createElement(components.Dropdown, { ...props });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/DayPicker.js
var import_react38 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function rangeIncludesDate(range, date, excludeEnds = false, dateLib = defaultDateLib) {
  let { from, to } = range;
  const { differenceInCalendarDays: differenceInCalendarDays2, isSameDay: isSameDay2 } = dateLib;
  if (from && to) {
    const isRangeInverted = differenceInCalendarDays2(to, from) < 0;
    if (isRangeInverted) {
      [from, to] = [to, from];
    }
    const isInRange = differenceInCalendarDays2(date, from) >= (excludeEnds ? 1 : 0) && differenceInCalendarDays2(to, date) >= (excludeEnds ? 1 : 0);
    return isInRange;
  }
  if (!excludeEnds && to) {
    return isSameDay2(to, date);
  }
  if (!excludeEnds && from) {
    return isSameDay2(from, date);
  }
  return false;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/typeguards.js
function isDateInterval(matcher) {
  return Boolean(matcher && typeof matcher === "object" && "before" in matcher && "after" in matcher);
}
function isDateRange(value) {
  return Boolean(value && typeof value === "object" && "from" in value);
}
function isDateAfterType(value) {
  return Boolean(value && typeof value === "object" && "after" in value);
}
function isDateBeforeType(value) {
  return Boolean(value && typeof value === "object" && "before" in value);
}
function isDayOfWeekType(value) {
  return Boolean(value && typeof value === "object" && "dayOfWeek" in value);
}
function isDatesArray(value, dateLib) {
  return Array.isArray(value) && value.every(dateLib.isDate);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function dateMatchModifiers(date, matchers, dateLib = defaultDateLib) {
  const matchersArr = !Array.isArray(matchers) ? [matchers] : matchers;
  const { isSameDay: isSameDay2, differenceInCalendarDays: differenceInCalendarDays2, isAfter: isAfter2 } = dateLib;
  return matchersArr.some((matcher) => {
    if (typeof matcher === "boolean") {
      return matcher;
    }
    if (dateLib.isDate(matcher)) {
      return isSameDay2(date, matcher);
    }
    if (isDatesArray(matcher, dateLib)) {
      return matcher.some((matcherDate) => isSameDay2(date, matcherDate));
    }
    if (isDateRange(matcher)) {
      return rangeIncludesDate(matcher, date, false, dateLib);
    }
    if (isDayOfWeekType(matcher)) {
      if (!Array.isArray(matcher.dayOfWeek)) {
        return matcher.dayOfWeek === date.getDay();
      }
      return matcher.dayOfWeek.includes(date.getDay());
    }
    if (isDateInterval(matcher)) {
      const diffBefore = differenceInCalendarDays2(matcher.before, date);
      const diffAfter = differenceInCalendarDays2(matcher.after, date);
      const isDayBefore = diffBefore > 0;
      const isDayAfter = diffAfter < 0;
      const isClosedInterval = isAfter2(matcher.before, matcher.after);
      if (isClosedInterval) {
        return isDayAfter && isDayBefore;
      } else {
        return isDayBefore || isDayAfter;
      }
    }
    if (isDateAfterType(matcher)) {
      return differenceInCalendarDays2(date, matcher.after) > 0;
    }
    if (isDateBeforeType(matcher)) {
      return differenceInCalendarDays2(matcher.before, date) > 0;
    }
    if (typeof matcher === "function") {
      return matcher(date);
    }
    return false;
  });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function createGetModifiers(days, props, navStart, navEnd, dateLib) {
  const { disabled: disabled2, hidden, modifiers, showOutsideDays, broadcastCalendar, today = dateLib.today() } = props;
  const { isSameDay: isSameDay2, isSameMonth: isSameMonth2, startOfMonth: startOfMonth2, isBefore: isBefore2, endOfMonth: endOfMonth2, isAfter: isAfter2 } = dateLib;
  const computedNavStart = navStart && startOfMonth2(navStart);
  const computedNavEnd = navEnd && endOfMonth2(navEnd);
  const internalModifiersMap = {
    [DayFlag.focused]: [],
    [DayFlag.outside]: [],
    [DayFlag.disabled]: [],
    [DayFlag.hidden]: [],
    [DayFlag.today]: []
  };
  const customModifiersMap = {};
  for (const day of days) {
    const { date, displayMonth } = day;
    const isOutside = Boolean(displayMonth && !isSameMonth2(date, displayMonth));
    const isBeforeNavStart = Boolean(computedNavStart && isBefore2(date, computedNavStart));
    const isAfterNavEnd = Boolean(computedNavEnd && isAfter2(date, computedNavEnd));
    const isDisabled = Boolean(disabled2 && dateMatchModifiers(date, disabled2, dateLib));
    const isHidden = Boolean(hidden && dateMatchModifiers(date, hidden, dateLib)) || isBeforeNavStart || isAfterNavEnd || // Broadcast calendar will show outside days as default
    !broadcastCalendar && !showOutsideDays && isOutside || broadcastCalendar && showOutsideDays === false && isOutside;
    const isToday = isSameDay2(date, today);
    if (isOutside)
      internalModifiersMap.outside.push(day);
    if (isDisabled)
      internalModifiersMap.disabled.push(day);
    if (isHidden)
      internalModifiersMap.hidden.push(day);
    if (isToday)
      internalModifiersMap.today.push(day);
    if (modifiers) {
      Object.keys(modifiers).forEach((name) => {
        const modifierValue = modifiers?.[name];
        const isMatch = modifierValue ? dateMatchModifiers(date, modifierValue, dateLib) : false;
        if (!isMatch)
          return;
        if (customModifiersMap[name]) {
          customModifiersMap[name].push(day);
        } else {
          customModifiersMap[name] = [day];
        }
      });
    }
  }
  return (day) => {
    const dayFlags = {
      [DayFlag.focused]: false,
      [DayFlag.disabled]: false,
      [DayFlag.hidden]: false,
      [DayFlag.outside]: false,
      [DayFlag.today]: false
    };
    const customModifiers = {};
    for (const name in internalModifiersMap) {
      const days2 = internalModifiersMap[name];
      dayFlags[name] = days2.some((d) => d === day);
    }
    for (const name in customModifiersMap) {
      customModifiers[name] = customModifiersMap[name].some((d) => d === day);
    }
    return {
      ...dayFlags,
      // custom modifiers should override all the previous ones
      ...customModifiers
    };
  };
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getClassNamesForModifiers.js
function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
  const modifierClassNames = Object.entries(modifiers).filter(([, active]) => active === true).reduce((previousValue, [key]) => {
    if (modifiersClassNames[key]) {
      previousValue.push(modifiersClassNames[key]);
    } else if (classNames[DayFlag[key]]) {
      previousValue.push(classNames[DayFlag[key]]);
    } else if (classNames[SelectionState[key]]) {
      previousValue.push(classNames[SelectionState[key]]);
    }
    return previousValue;
  }, [classNames[UI.Day]]);
  return modifierClassNames;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function getComponents(customComponents) {
  return {
    ...custom_components_exports,
    ...customComponents
  };
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function getDataAttributes(props) {
  const dataAttributes = {
    "data-mode": props.mode ?? void 0,
    "data-required": "required" in props ? props.required : void 0,
    "data-multiple-months": props.numberOfMonths && props.numberOfMonths > 1 || void 0,
    "data-week-numbers": props.showWeekNumber || void 0,
    "data-broadcast-calendar": props.broadcastCalendar || void 0,
    "data-nav-layout": props.navLayout || void 0
  };
  Object.entries(props).forEach(([key, val]) => {
    if (key.startsWith("data-")) {
      dataAttributes[key] = val;
    }
  });
  return dataAttributes;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getDefaultClassNames.js
function getDefaultClassNames() {
  const classNames = {};
  for (const key in UI) {
    classNames[UI[key]] = `rdp-${UI[key]}`;
  }
  for (const key in DayFlag) {
    classNames[DayFlag[key]] = `rdp-${DayFlag[key]}`;
  }
  for (const key in SelectionState) {
    classNames[SelectionState[key]] = `rdp-${SelectionState[key]}`;
  }
  for (const key in Animation) {
    classNames[Animation[key]] = `rdp-${Animation[key]}`;
  }
  return classNames;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/formatters/index.js
var formatters_exports = {};
__export(formatters_exports, {
  formatCaption: () => formatCaption,
  formatDay: () => formatDay,
  formatMonthCaption: () => formatMonthCaption,
  formatMonthDropdown: () => formatMonthDropdown,
  formatWeekNumber: () => formatWeekNumber,
  formatWeekNumberHeader: () => formatWeekNumberHeader,
  formatWeekdayName: () => formatWeekdayName,
  formatYearCaption: () => formatYearCaption,
  formatYearDropdown: () => formatYearDropdown
});

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function formatCaption(month, options, dateLib) {
  const lib = dateLib ?? new DateLib(options);
  return lib.formatMonthYear(month);
}
var formatMonthCaption = formatCaption;

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function formatDay(date, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(date, "d");
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function formatMonthDropdown(month, dateLib = defaultDateLib) {
  return dateLib.format(month, "LLLL");
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function formatWeekdayName(weekday, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(weekday, "cccccc");
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function formatWeekNumber(weekNumber, dateLib = defaultDateLib) {
  if (weekNumber < 10) {
    return dateLib.formatNumber(`0${weekNumber.toLocaleString()}`);
  }
  return dateLib.formatNumber(`${weekNumber.toLocaleString()}`);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function formatWeekNumberHeader() {
  return ``;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function formatYearDropdown(year, dateLib = defaultDateLib) {
  return dateLib.format(year, "yyyy");
}
var formatYearCaption = formatYearDropdown;

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function getFormatters(customFormatters) {
  if (customFormatters?.formatMonthCaption && !customFormatters.formatCaption) {
    customFormatters.formatCaption = customFormatters.formatMonthCaption;
  }
  if (customFormatters?.formatYearCaption && !customFormatters.formatYearDropdown) {
    customFormatters.formatYearDropdown = customFormatters.formatYearCaption;
  }
  return {
    ...formatters_exports,
    ...customFormatters
  };
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/index.js
var labels_exports = {};
__export(labels_exports, {
  labelCaption: () => labelCaption,
  labelDay: () => labelDay,
  labelDayButton: () => labelDayButton,
  labelGrid: () => labelGrid,
  labelGridcell: () => labelGridcell,
  labelMonthDropdown: () => labelMonthDropdown,
  labelNav: () => labelNav,
  labelNext: () => labelNext,
  labelPrevious: () => labelPrevious,
  labelWeekNumber: () => labelWeekNumber,
  labelWeekNumberHeader: () => labelWeekNumberHeader,
  labelWeekday: () => labelWeekday,
  labelYearDropdown: () => labelYearDropdown
});

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function labelDayButton(date, modifiers, options, dateLib) {
  let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
  if (modifiers.today)
    label = `Today, ${label}`;
  if (modifiers.selected)
    label = `${label}, selected`;
  return label;
}
var labelDay = labelDayButton;

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function labelGrid(date, options, dateLib) {
  const lib = dateLib ?? new DateLib(options);
  return lib.formatMonthYear(date);
}
var labelCaption = labelGrid;

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function labelGridcell(date, modifiers, options, dateLib) {
  let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
  if (modifiers?.today) {
    label = `Today, ${label}`;
  }
  return label;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function labelMonthDropdown(_options) {
  return "Choose the Month";
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelNav.js
function labelNav() {
  return "";
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelNext.js
var defaultLabel = "Go to the Next Month";
function labelNext(_month, _options) {
  return defaultLabel;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function labelPrevious(_month) {
  return "Go to the Previous Month";
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function labelWeekday(date, options, dateLib) {
  return (dateLib ?? new DateLib(options)).format(date, "cccc");
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function labelWeekNumber(weekNumber, _options) {
  return `Week ${weekNumber}`;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function labelWeekNumberHeader(_options) {
  return "Week Number";
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function labelYearDropdown(_options) {
  return "Choose the Year";
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getLabels.js
var resolveLabel = (defaultLabel2, customLabel, localeLabel) => {
  if (customLabel)
    return customLabel;
  if (localeLabel) {
    return typeof localeLabel === "function" ? localeLabel : (..._args) => localeLabel;
  }
  return defaultLabel2;
};
function getLabels(customLabels, options) {
  const localeLabels = options.locale?.labels ?? {};
  return {
    ...labels_exports,
    ...customLabels ?? {},
    labelDayButton: resolveLabel(labelDayButton, customLabels?.labelDayButton, localeLabels.labelDayButton),
    labelMonthDropdown: resolveLabel(labelMonthDropdown, customLabels?.labelMonthDropdown, localeLabels.labelMonthDropdown),
    labelNext: resolveLabel(labelNext, customLabels?.labelNext, localeLabels.labelNext),
    labelPrevious: resolveLabel(labelPrevious, customLabels?.labelPrevious, localeLabels.labelPrevious),
    labelWeekNumber: resolveLabel(labelWeekNumber, customLabels?.labelWeekNumber, localeLabels.labelWeekNumber),
    labelYearDropdown: resolveLabel(labelYearDropdown, customLabels?.labelYearDropdown, localeLabels.labelYearDropdown),
    labelGrid: resolveLabel(labelGrid, customLabels?.labelGrid, localeLabels.labelGrid),
    labelGridcell: resolveLabel(labelGridcell, customLabels?.labelGridcell, localeLabels.labelGridcell),
    labelNav: resolveLabel(labelNav, customLabels?.labelNav, localeLabels.labelNav),
    labelWeekNumberHeader: resolveLabel(labelWeekNumberHeader, customLabels?.labelWeekNumberHeader, localeLabels.labelWeekNumberHeader),
    labelWeekday: resolveLabel(labelWeekday, customLabels?.labelWeekday, localeLabels.labelWeekday)
  };
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function getMonthOptions(displayMonth, navStart, navEnd, formatters2, dateLib) {
  const { startOfMonth: startOfMonth2, startOfYear: startOfYear2, endOfYear: endOfYear2, eachMonthOfInterval: eachMonthOfInterval2, getMonth: getMonth2 } = dateLib;
  const months = eachMonthOfInterval2({
    start: startOfYear2(displayMonth),
    end: endOfYear2(displayMonth)
  });
  const options = months.map((month) => {
    const label = formatters2.formatMonthDropdown(month, dateLib);
    const value = getMonth2(month);
    const disabled2 = navStart && month < startOfMonth2(navStart) || navEnd && month > startOfMonth2(navEnd) || false;
    return { value, label, disabled: disabled2 };
  });
  return options;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getStyleForModifiers.js
function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
  let style = { ...styles?.[UI.Day] };
  Object.entries(dayModifiers).filter(([, active]) => active === true).forEach(([modifier]) => {
    style = {
      ...style,
      ...modifiersStyles?.[modifier]
    };
  });
  return style;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function getWeekdays(dateLib, ISOWeek, broadcastCalendar, today) {
  const referenceToday = today ?? dateLib.today();
  const start = broadcastCalendar ? dateLib.startOfBroadcastWeek(referenceToday, dateLib) : ISOWeek ? dateLib.startOfISOWeek(referenceToday) : dateLib.startOfWeek(referenceToday);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = dateLib.addDays(start, i);
    days.push(day);
  }
  return days;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function getYearOptions(navStart, navEnd, formatters2, dateLib, reverse = false) {
  if (!navStart)
    return void 0;
  if (!navEnd)
    return void 0;
  const { startOfYear: startOfYear2, endOfYear: endOfYear2, eachYearOfInterval: eachYearOfInterval2, getYear: getYear2 } = dateLib;
  const firstNavYear = startOfYear2(navStart);
  const lastNavYear = endOfYear2(navEnd);
  const years = eachYearOfInterval2({ start: firstNavYear, end: lastNavYear });
  if (reverse)
    years.reverse();
  return years.map((year) => {
    const label = formatters2.formatYearDropdown(year, dateLib);
    return {
      value: getYear2(year),
      label,
      disabled: false
    };
  });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/noonDateLib.js
function createNoonOverrides(timeZone, options = {}) {
  const { weekStartsOn, locale } = options;
  const fallbackWeekStartsOn = weekStartsOn ?? locale?.options?.weekStartsOn ?? 0;
  const toNoonTZDate = (date) => {
    const normalizedDate = typeof date === "number" || typeof date === "string" ? new Date(date) : date;
    return new TZDate(normalizedDate.getFullYear(), normalizedDate.getMonth(), normalizedDate.getDate(), 12, 0, 0, timeZone);
  };
  const toCalendarDate = (date) => {
    const zoned = toNoonTZDate(date);
    return new Date(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => {
      return toNoonTZDate(TZDate.tz(timeZone));
    },
    newDate: (year, monthIndex, date) => {
      return new TZDate(year, monthIndex, date, 12, 0, 0, timeZone);
    },
    startOfDay: (date) => {
      return toNoonTZDate(date);
    },
    startOfWeek: (date, options2) => {
      const base = toNoonTZDate(date);
      const weekStartsOnValue = options2?.weekStartsOn ?? fallbackWeekStartsOn;
      const diff = (base.getDay() - weekStartsOnValue + 7) % 7;
      base.setDate(base.getDate() - diff);
      return base;
    },
    startOfISOWeek: (date) => {
      const base = toNoonTZDate(date);
      const diff = (base.getDay() - 1 + 7) % 7;
      base.setDate(base.getDate() - diff);
      return base;
    },
    startOfMonth: (date) => {
      const base = toNoonTZDate(date);
      base.setDate(1);
      return base;
    },
    startOfYear: (date) => {
      const base = toNoonTZDate(date);
      base.setMonth(0, 1);
      return base;
    },
    endOfWeek: (date, options2) => {
      const base = toNoonTZDate(date);
      const weekStartsOnValue = options2?.weekStartsOn ?? fallbackWeekStartsOn;
      const endDow = (weekStartsOnValue + 6) % 7;
      const diff = (endDow - base.getDay() + 7) % 7;
      base.setDate(base.getDate() + diff);
      return base;
    },
    endOfISOWeek: (date) => {
      const base = toNoonTZDate(date);
      const diff = (7 - base.getDay()) % 7;
      base.setDate(base.getDate() + diff);
      return base;
    },
    endOfMonth: (date) => {
      const base = toNoonTZDate(date);
      base.setMonth(base.getMonth() + 1, 0);
      return base;
    },
    endOfYear: (date) => {
      const base = toNoonTZDate(date);
      base.setMonth(11, 31);
      return base;
    },
    eachMonthOfInterval: (interval) => {
      const start = toNoonTZDate(interval.start);
      const end = toNoonTZDate(interval.end);
      const result = [];
      const cursor = new TZDate(start.getFullYear(), start.getMonth(), 1, 12, 0, 0, timeZone);
      const endKey = end.getFullYear() * 12 + end.getMonth();
      while (cursor.getFullYear() * 12 + cursor.getMonth() <= endKey) {
        result.push(new TZDate(cursor, timeZone));
        cursor.setMonth(cursor.getMonth() + 1, 1);
      }
      return result;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (date, amount) => {
      const base = toNoonTZDate(date);
      base.setDate(base.getDate() + amount);
      return base;
    },
    addWeeks: (date, amount) => {
      const base = toNoonTZDate(date);
      base.setDate(base.getDate() + amount * 7);
      return base;
    },
    addMonths: (date, amount) => {
      const base = toNoonTZDate(date);
      base.setMonth(base.getMonth() + amount);
      return base;
    },
    addYears: (date, amount) => {
      const base = toNoonTZDate(date);
      base.setFullYear(base.getFullYear() + amount);
      return base;
    },
    eachYearOfInterval: (interval) => {
      const start = toNoonTZDate(interval.start);
      const end = toNoonTZDate(interval.end);
      const years = [];
      const cursor = new TZDate(start.getFullYear(), 0, 1, 12, 0, 0, timeZone);
      while (cursor.getFullYear() <= end.getFullYear()) {
        years.push(new TZDate(cursor, timeZone));
        cursor.setFullYear(cursor.getFullYear() + 1, 0, 1);
      }
      return years;
    },
    getWeek: (date, options2) => {
      const base = toCalendarDate(date);
      return getWeek(base, {
        weekStartsOn: options2?.weekStartsOn ?? fallbackWeekStartsOn,
        firstWeekContainsDate: options2?.firstWeekContainsDate ?? locale?.options?.firstWeekContainsDate ?? 1
      });
    },
    getISOWeek: (date) => {
      const base = toCalendarDate(date);
      return getISOWeek(base);
    },
    differenceInCalendarDays: (dateLeft, dateRight) => {
      const left = toCalendarDate(dateLeft);
      const right = toCalendarDate(dateRight);
      return differenceInCalendarDays(left, right);
    },
    differenceInCalendarMonths: (dateLeft, dateRight) => {
      const left = toCalendarDate(dateLeft);
      const right = toCalendarDate(dateRight);
      return differenceInCalendarMonths(left, right);
    }
  };
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/useAnimation.js
var import_react34 = __toESM(require_react(), 1);
var asHtmlElement = (element) => {
  if (element instanceof HTMLElement)
    return element;
  return null;
};
var queryMonthEls = (element) => [
  ...element.querySelectorAll("[data-animated-month]") ?? []
];
var queryMonthEl = (element) => asHtmlElement(element.querySelector("[data-animated-month]"));
var queryCaptionEl = (element) => asHtmlElement(element.querySelector("[data-animated-caption]"));
var queryWeeksEl = (element) => asHtmlElement(element.querySelector("[data-animated-weeks]"));
var queryNavEl = (element) => asHtmlElement(element.querySelector("[data-animated-nav]"));
var queryWeekdaysEl = (element) => asHtmlElement(element.querySelector("[data-animated-weekdays]"));
function useAnimation(rootElRef, enabled, { classNames, months, focused, dateLib }) {
  const previousRootElSnapshotRef = (0, import_react34.useRef)(null);
  const previousMonthsRef = (0, import_react34.useRef)(months);
  const animatingRef = (0, import_react34.useRef)(false);
  (0, import_react34.useLayoutEffect)(() => {
    const previousMonths = previousMonthsRef.current;
    previousMonthsRef.current = months;
    if (!enabled || !rootElRef.current || // safety check because the ref can be set to anything by consumers
    !(rootElRef.current instanceof HTMLElement) || // validation required for the animation to work as expected
    months.length === 0 || previousMonths.length === 0 || months.length !== previousMonths.length) {
      return;
    }
    const isSameMonth2 = dateLib.isSameMonth(months[0].date, previousMonths[0].date);
    const isAfterPreviousMonth = dateLib.isAfter(months[0].date, previousMonths[0].date);
    const captionAnimationClass = isAfterPreviousMonth ? classNames[Animation.caption_after_enter] : classNames[Animation.caption_before_enter];
    const weeksAnimationClass = isAfterPreviousMonth ? classNames[Animation.weeks_after_enter] : classNames[Animation.weeks_before_enter];
    const previousRootElSnapshot = previousRootElSnapshotRef.current;
    const rootElSnapshot = rootElRef.current.cloneNode(true);
    if (rootElSnapshot instanceof HTMLElement) {
      const currentMonthElsSnapshot = queryMonthEls(rootElSnapshot);
      currentMonthElsSnapshot.forEach((currentMonthElSnapshot) => {
        if (!(currentMonthElSnapshot instanceof HTMLElement))
          return;
        const previousMonthElSnapshot = queryMonthEl(currentMonthElSnapshot);
        if (previousMonthElSnapshot && currentMonthElSnapshot.contains(previousMonthElSnapshot)) {
          currentMonthElSnapshot.removeChild(previousMonthElSnapshot);
        }
        const captionEl = queryCaptionEl(currentMonthElSnapshot);
        if (captionEl) {
          captionEl.classList.remove(captionAnimationClass);
        }
        const weeksEl = queryWeeksEl(currentMonthElSnapshot);
        if (weeksEl) {
          weeksEl.classList.remove(weeksAnimationClass);
        }
      });
      previousRootElSnapshotRef.current = rootElSnapshot;
    } else {
      previousRootElSnapshotRef.current = null;
    }
    if (animatingRef.current || isSameMonth2 || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    focused) {
      return;
    }
    const previousMonthEls = previousRootElSnapshot instanceof HTMLElement ? queryMonthEls(previousRootElSnapshot) : [];
    const currentMonthEls = queryMonthEls(rootElRef.current);
    if (currentMonthEls?.every((el) => el instanceof HTMLElement) && previousMonthEls && previousMonthEls.every((el) => el instanceof HTMLElement)) {
      animatingRef.current = true;
      const cleanUpFunctions = [];
      rootElRef.current.style.isolation = "isolate";
      const navEl = queryNavEl(rootElRef.current);
      if (navEl) {
        navEl.style.zIndex = "1";
      }
      currentMonthEls.forEach((currentMonthEl, index) => {
        const previousMonthEl = previousMonthEls[index];
        if (!previousMonthEl) {
          return;
        }
        currentMonthEl.style.position = "relative";
        currentMonthEl.style.overflow = "hidden";
        const captionEl = queryCaptionEl(currentMonthEl);
        if (captionEl) {
          captionEl.classList.add(captionAnimationClass);
        }
        const weeksEl = queryWeeksEl(currentMonthEl);
        if (weeksEl) {
          weeksEl.classList.add(weeksAnimationClass);
        }
        const cleanUp = () => {
          animatingRef.current = false;
          if (rootElRef.current) {
            rootElRef.current.style.isolation = "";
          }
          if (navEl) {
            navEl.style.zIndex = "";
          }
          if (captionEl) {
            captionEl.classList.remove(captionAnimationClass);
          }
          if (weeksEl) {
            weeksEl.classList.remove(weeksAnimationClass);
          }
          currentMonthEl.style.position = "";
          currentMonthEl.style.overflow = "";
          if (currentMonthEl.contains(previousMonthEl)) {
            currentMonthEl.removeChild(previousMonthEl);
          }
        };
        cleanUpFunctions.push(cleanUp);
        previousMonthEl.style.pointerEvents = "none";
        previousMonthEl.style.position = "absolute";
        previousMonthEl.style.overflow = "hidden";
        previousMonthEl.setAttribute("aria-hidden", "true");
        const previousWeekdaysEl = queryWeekdaysEl(previousMonthEl);
        if (previousWeekdaysEl) {
          previousWeekdaysEl.style.opacity = "0";
        }
        const previousCaptionEl = queryCaptionEl(previousMonthEl);
        if (previousCaptionEl) {
          previousCaptionEl.classList.add(isAfterPreviousMonth ? classNames[Animation.caption_before_exit] : classNames[Animation.caption_after_exit]);
          previousCaptionEl.addEventListener("animationend", cleanUp);
        }
        const previousWeeksEl = queryWeeksEl(previousMonthEl);
        if (previousWeeksEl) {
          previousWeeksEl.classList.add(isAfterPreviousMonth ? classNames[Animation.weeks_before_exit] : classNames[Animation.weeks_after_exit]);
        }
        currentMonthEl.insertBefore(previousMonthEl, currentMonthEl.firstChild);
      });
    }
  });
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/useCalendar.js
var import_react36 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getDates.js
function getDates(displayMonths, maxDate, props, dateLib) {
  const firstMonth = displayMonths[0];
  const lastMonth = displayMonths[displayMonths.length - 1];
  const { ISOWeek, fixedWeeks, broadcastCalendar } = props ?? {};
  const { addDays: addDays2, differenceInCalendarDays: differenceInCalendarDays2, differenceInCalendarMonths: differenceInCalendarMonths2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfMonth: endOfMonth2, endOfWeek: endOfWeek2, isAfter: isAfter2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib;
  const startWeekFirstDate = broadcastCalendar ? startOfBroadcastWeek2(firstMonth, dateLib) : ISOWeek ? startOfISOWeek2(firstMonth) : startOfWeek2(firstMonth);
  const displayMonthsWeekEnd = broadcastCalendar ? endOfBroadcastWeek2(lastMonth) : ISOWeek ? endOfISOWeek2(endOfMonth2(lastMonth)) : endOfWeek2(endOfMonth2(lastMonth));
  const constraintWeekEnd = maxDate && (broadcastCalendar ? endOfBroadcastWeek2(maxDate) : ISOWeek ? endOfISOWeek2(maxDate) : endOfWeek2(maxDate));
  const gridEndDate = constraintWeekEnd && isAfter2(displayMonthsWeekEnd, constraintWeekEnd) ? constraintWeekEnd : displayMonthsWeekEnd;
  const nOfDays = differenceInCalendarDays2(gridEndDate, startWeekFirstDate);
  const nOfMonths = differenceInCalendarMonths2(lastMonth, firstMonth) + 1;
  const dates = [];
  for (let i = 0; i <= nOfDays; i++) {
    const date = addDays2(startWeekFirstDate, i);
    dates.push(date);
  }
  const nrOfDaysWithFixedWeeks = broadcastCalendar ? 35 : 42;
  const extraDates = nrOfDaysWithFixedWeeks * nOfMonths;
  if (fixedWeeks && dates.length < extraDates) {
    const daysToAdd = extraDates - dates.length;
    for (let i = 0; i < daysToAdd; i++) {
      const date = addDays2(dates[dates.length - 1], 1);
      dates.push(date);
    }
  }
  return dates;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getDays.js
function getDays(calendarMonths) {
  const initialDays = [];
  return calendarMonths.reduce((days, month) => {
    const weekDays = month.weeks.reduce((weekDays2, week) => {
      return weekDays2.concat(week.days.slice());
    }, initialDays.slice());
    return days.concat(weekDays.slice());
  }, initialDays.slice());
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function getDisplayMonths(firstDisplayedMonth, calendarEndMonth, props, dateLib) {
  const { numberOfMonths = 1 } = props;
  const months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const month = dateLib.addMonths(firstDisplayedMonth, i);
    if (calendarEndMonth && month > calendarEndMonth) {
      break;
    }
    months.push(month);
  }
  return months;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getInitialMonth.js
function getInitialMonth(props, navStart, navEnd, dateLib) {
  const { month, defaultMonth, today = dateLib.today(), numberOfMonths = 1 } = props;
  let initialMonth = month || defaultMonth || today;
  const { differenceInCalendarMonths: differenceInCalendarMonths2, addMonths: addMonths2, startOfMonth: startOfMonth2 } = dateLib;
  if (navEnd && differenceInCalendarMonths2(navEnd, initialMonth) < numberOfMonths - 1) {
    const offset = -1 * (numberOfMonths - 1);
    initialMonth = addMonths2(navEnd, offset);
  }
  if (navStart && differenceInCalendarMonths2(initialMonth, navStart) < 0) {
    initialMonth = navStart;
  }
  return startOfMonth2(initialMonth);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function getMonths(displayMonths, dates, props, dateLib) {
  const { addDays: addDays2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfMonth: endOfMonth2, endOfWeek: endOfWeek2, getISOWeek: getISOWeek2, getWeek: getWeek2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib;
  const dayPickerMonths = displayMonths.reduce((months, month) => {
    const firstDateOfFirstWeek = props.broadcastCalendar ? startOfBroadcastWeek2(month, dateLib) : props.ISOWeek ? startOfISOWeek2(month) : startOfWeek2(month);
    const lastDateOfLastWeek = props.broadcastCalendar ? endOfBroadcastWeek2(month) : props.ISOWeek ? endOfISOWeek2(endOfMonth2(month)) : endOfWeek2(endOfMonth2(month));
    const monthDates = dates.filter((date) => {
      return date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek;
    });
    const nrOfDaysWithFixedWeeks = props.broadcastCalendar ? 35 : 42;
    if (props.fixedWeeks && monthDates.length < nrOfDaysWithFixedWeeks) {
      const extraDates = dates.filter((date) => {
        const daysToAdd = nrOfDaysWithFixedWeeks - monthDates.length;
        return date > lastDateOfLastWeek && date <= addDays2(lastDateOfLastWeek, daysToAdd);
      });
      monthDates.push(...extraDates);
    }
    const weeks = monthDates.reduce((weeks2, date) => {
      const weekNumber = props.ISOWeek ? getISOWeek2(date) : getWeek2(date);
      const week = weeks2.find((week2) => week2.weekNumber === weekNumber);
      const day = new CalendarDay(date, month, dateLib);
      if (!week) {
        weeks2.push(new CalendarWeek(weekNumber, [day]));
      } else {
        week.days.push(day);
      }
      return weeks2;
    }, []);
    const dayPickerMonth = new CalendarMonth(month, weeks);
    months.push(dayPickerMonth);
    return months;
  }, []);
  if (!props.reverseMonths) {
    return dayPickerMonths;
  } else {
    return dayPickerMonths.reverse();
  }
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function getNavMonths(props, dateLib) {
  let { startMonth, endMonth } = props;
  const { startOfYear: startOfYear2, startOfDay: startOfDay2, startOfMonth: startOfMonth2, endOfMonth: endOfMonth2, addYears: addYears2, endOfYear: endOfYear2, newDate, today } = dateLib;
  const { fromYear, toYear, fromMonth, toMonth } = props;
  if (!startMonth && fromMonth) {
    startMonth = fromMonth;
  }
  if (!startMonth && fromYear) {
    startMonth = dateLib.newDate(fromYear, 0, 1);
  }
  if (!endMonth && toMonth) {
    endMonth = toMonth;
  }
  if (!endMonth && toYear) {
    endMonth = newDate(toYear, 11, 31);
  }
  const hasYearDropdown = props.captionLayout === "dropdown" || props.captionLayout === "dropdown-years";
  if (startMonth) {
    startMonth = startOfMonth2(startMonth);
  } else if (fromYear) {
    startMonth = newDate(fromYear, 0, 1);
  } else if (!startMonth && hasYearDropdown) {
    startMonth = startOfYear2(addYears2(props.today ?? today(), -100));
  }
  if (endMonth) {
    endMonth = endOfMonth2(endMonth);
  } else if (toYear) {
    endMonth = newDate(toYear, 11, 31);
  } else if (!endMonth && hasYearDropdown) {
    endMonth = endOfYear2(props.today ?? today());
  }
  return [
    startMonth ? startOfDay2(startMonth) : startMonth,
    endMonth ? startOfDay2(endMonth) : endMonth
  ];
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function getNextMonth(firstDisplayedMonth, calendarEndMonth, options, dateLib) {
  if (options.disableNavigation) {
    return void 0;
  }
  const { pagedNavigation, numberOfMonths = 1 } = options;
  const { startOfMonth: startOfMonth2, addMonths: addMonths2, differenceInCalendarMonths: differenceInCalendarMonths2 } = dateLib;
  const offset = pagedNavigation ? numberOfMonths : 1;
  const month = startOfMonth2(firstDisplayedMonth);
  if (!calendarEndMonth) {
    return addMonths2(month, offset);
  }
  const monthsDiff = differenceInCalendarMonths2(calendarEndMonth, firstDisplayedMonth);
  if (monthsDiff < numberOfMonths) {
    return void 0;
  }
  return addMonths2(month, offset);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function getPreviousMonth(firstDisplayedMonth, calendarStartMonth, options, dateLib) {
  if (options.disableNavigation) {
    return void 0;
  }
  const { pagedNavigation, numberOfMonths } = options;
  const { startOfMonth: startOfMonth2, addMonths: addMonths2, differenceInCalendarMonths: differenceInCalendarMonths2 } = dateLib;
  const offset = pagedNavigation ? numberOfMonths ?? 1 : 1;
  const month = startOfMonth2(firstDisplayedMonth);
  if (!calendarStartMonth) {
    return addMonths2(month, -offset);
  }
  const monthsDiff = differenceInCalendarMonths2(month, calendarStartMonth);
  if (monthsDiff <= 0) {
    return void 0;
  }
  return addMonths2(month, -offset);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function getWeeks(months) {
  const initialWeeks = [];
  return months.reduce((weeks, month) => {
    return weeks.concat(month.weeks.slice());
  }, initialWeeks.slice());
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
var import_react35 = __toESM(require_react(), 1);
function useControlledValue(defaultValue, controlledValue) {
  const [uncontrolledValue, setValue] = (0, import_react35.useState)(defaultValue);
  const value = controlledValue === void 0 ? uncontrolledValue : controlledValue;
  return [value, setValue];
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/useCalendar.js
function useCalendar(props, dateLib) {
  const [navStart, navEnd] = getNavMonths(props, dateLib);
  const { startOfMonth: startOfMonth2, endOfMonth: endOfMonth2 } = dateLib;
  const initialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
  const [firstMonth, setFirstMonth] = useControlledValue(
    initialMonth,
    // initialMonth is always computed from props.month if provided
    props.month ? initialMonth : void 0
  );
  (0, import_react36.useEffect)(() => {
    const newInitialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
    setFirstMonth(newInitialMonth);
  }, [props.timeZone]);
  const { months, weeks, days, previousMonth, nextMonth } = (0, import_react36.useMemo)(() => {
    const displayMonths = getDisplayMonths(firstMonth, navEnd, { numberOfMonths: props.numberOfMonths }, dateLib);
    const dates = getDates(displayMonths, props.endMonth ? endOfMonth2(props.endMonth) : void 0, {
      ISOWeek: props.ISOWeek,
      fixedWeeks: props.fixedWeeks,
      broadcastCalendar: props.broadcastCalendar
    }, dateLib);
    const months2 = getMonths(displayMonths, dates, {
      broadcastCalendar: props.broadcastCalendar,
      fixedWeeks: props.fixedWeeks,
      ISOWeek: props.ISOWeek,
      reverseMonths: props.reverseMonths
    }, dateLib);
    const weeks2 = getWeeks(months2);
    const days2 = getDays(months2);
    const previousMonth2 = getPreviousMonth(firstMonth, navStart, props, dateLib);
    const nextMonth2 = getNextMonth(firstMonth, navEnd, props, dateLib);
    return {
      months: months2,
      weeks: weeks2,
      days: days2,
      previousMonth: previousMonth2,
      nextMonth: nextMonth2
    };
  }, [
    dateLib,
    firstMonth.getTime(),
    navEnd?.getTime(),
    navStart?.getTime(),
    props.disableNavigation,
    props.broadcastCalendar,
    props.endMonth?.getTime(),
    props.fixedWeeks,
    props.ISOWeek,
    props.numberOfMonths,
    props.pagedNavigation,
    props.reverseMonths
  ]);
  const { disableNavigation, onMonthChange } = props;
  const isDayInCalendar = (day) => weeks.some((week) => week.days.some((d) => d.isEqualTo(day)));
  const goToMonth = (date) => {
    if (disableNavigation) {
      return;
    }
    let newMonth = startOfMonth2(date);
    if (navStart && newMonth < startOfMonth2(navStart)) {
      newMonth = startOfMonth2(navStart);
    }
    if (navEnd && newMonth > startOfMonth2(navEnd)) {
      newMonth = startOfMonth2(navEnd);
    }
    setFirstMonth(newMonth);
    onMonthChange?.(newMonth);
  };
  const goToDay = (day) => {
    if (isDayInCalendar(day)) {
      return;
    }
    goToMonth(day.date);
  };
  const calendar = {
    months,
    weeks,
    days,
    navStart,
    navEnd,
    previousMonth,
    nextMonth,
    goToMonth,
    goToDay
  };
  return calendar;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/useFocus.js
var import_react37 = __toESM(require_react(), 1);

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/calculateFocusTarget.js
var FocusTargetPriority;
(function(FocusTargetPriority2) {
  FocusTargetPriority2[FocusTargetPriority2["Today"] = 0] = "Today";
  FocusTargetPriority2[FocusTargetPriority2["Selected"] = 1] = "Selected";
  FocusTargetPriority2[FocusTargetPriority2["LastFocused"] = 2] = "LastFocused";
  FocusTargetPriority2[FocusTargetPriority2["FocusedModifier"] = 3] = "FocusedModifier";
})(FocusTargetPriority || (FocusTargetPriority = {}));
function isFocusableDay(modifiers) {
  return !modifiers[DayFlag.disabled] && !modifiers[DayFlag.hidden] && !modifiers[DayFlag.outside];
}
function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
  let focusTarget;
  let foundFocusTargetPriority = -1;
  for (const day of days) {
    const modifiers = getModifiers(day);
    if (isFocusableDay(modifiers)) {
      if (modifiers[DayFlag.focused] && foundFocusTargetPriority < FocusTargetPriority.FocusedModifier) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.FocusedModifier;
      } else if (lastFocused?.isEqualTo(day) && foundFocusTargetPriority < FocusTargetPriority.LastFocused) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.LastFocused;
      } else if (isSelected(day.date) && foundFocusTargetPriority < FocusTargetPriority.Selected) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.Selected;
      } else if (modifiers[DayFlag.today] && foundFocusTargetPriority < FocusTargetPriority.Today) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.Today;
      }
    }
  }
  if (!focusTarget) {
    focusTarget = days.find((day) => isFocusableDay(getModifiers(day)));
  }
  return focusTarget;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function getFocusableDate(moveBy, moveDir, refDate, navStart, navEnd, props, dateLib) {
  const { ISOWeek, broadcastCalendar } = props;
  const { addDays: addDays2, addMonths: addMonths2, addWeeks: addWeeks2, addYears: addYears2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfWeek: endOfWeek2, max: max2, min: min2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib;
  const moveFns = {
    day: addDays2,
    week: addWeeks2,
    month: addMonths2,
    year: addYears2,
    startOfWeek: (date) => broadcastCalendar ? startOfBroadcastWeek2(date, dateLib) : ISOWeek ? startOfISOWeek2(date) : startOfWeek2(date),
    endOfWeek: (date) => broadcastCalendar ? endOfBroadcastWeek2(date) : ISOWeek ? endOfISOWeek2(date) : endOfWeek2(date)
  };
  let focusableDate = moveFns[moveBy](refDate, moveDir === "after" ? 1 : -1);
  if (moveDir === "before" && navStart) {
    focusableDate = max2([navStart, focusableDate]);
  } else if (moveDir === "after" && navEnd) {
    focusableDate = min2([navEnd, focusableDate]);
  }
  return focusableDate;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/helpers/getNextFocus.js
function getNextFocus(moveBy, moveDir, refDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt = 0) {
  if (attempt > 365) {
    return void 0;
  }
  const focusableDate = getFocusableDate(moveBy, moveDir, refDay.date, calendarStartMonth, calendarEndMonth, props, dateLib);
  const isDisabled = Boolean(props.disabled && dateMatchModifiers(focusableDate, props.disabled, dateLib));
  const isHidden = Boolean(props.hidden && dateMatchModifiers(focusableDate, props.hidden, dateLib));
  const targetMonth = focusableDate;
  const focusDay = new CalendarDay(focusableDate, targetMonth, dateLib);
  if (!isDisabled && !isHidden) {
    return focusDay;
  }
  return getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt + 1);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/useFocus.js
function useFocus(props, calendar, getModifiers, isSelected, dateLib) {
  const { autoFocus } = props;
  const [lastFocused, setLastFocused] = (0, import_react37.useState)();
  const focusTarget = calculateFocusTarget(calendar.days, getModifiers, isSelected || (() => false), lastFocused);
  const [focusedDay, setFocused] = (0, import_react37.useState)(autoFocus ? focusTarget : void 0);
  const blur = () => {
    setLastFocused(focusedDay);
    setFocused(void 0);
  };
  const moveFocus = (moveBy, moveDir) => {
    if (!focusedDay)
      return;
    const nextFocus = getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib);
    if (!nextFocus)
      return;
    if (props.disableNavigation) {
      const isNextInCalendar = calendar.days.some((day) => day.isEqualTo(nextFocus));
      if (!isNextInCalendar) {
        return;
      }
    }
    calendar.goToDay(nextFocus);
    setFocused(nextFocus);
  };
  const isFocusTarget = (day) => {
    return Boolean(focusTarget?.isEqualTo(day));
  };
  const useFocus2 = {
    isFocusTarget,
    setFocused,
    focused: focusedDay,
    blur,
    moveFocus
  };
  return useFocus2;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/selection/useMulti.js
function useMulti(props, dateLib) {
  const { selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const { isSameDay: isSameDay2 } = dateLib;
  const isSelected = (date) => {
    return selected?.some((d) => isSameDay2(d, date)) ?? false;
  };
  const { min: min2, max: max2 } = props;
  const select = (triggerDate, modifiers, e) => {
    let newDates = [...selected ?? []];
    if (isSelected(triggerDate)) {
      if (selected?.length === min2) {
        return;
      }
      if (required && selected?.length === 1) {
        return;
      }
      newDates = selected?.filter((d) => !isSameDay2(d, triggerDate));
    } else {
      if (selected?.length === max2) {
        newDates = [triggerDate];
      } else {
        newDates = [...newDates, triggerDate];
      }
    }
    if (!onSelect) {
      setSelected(newDates);
    }
    onSelect?.(newDates, triggerDate, modifiers, e);
    return newDates;
  };
  return {
    selected,
    select,
    isSelected
  };
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/addToRange.js
function addToRange(date, initialRange, min2 = 0, max2 = 0, required = false, dateLib = defaultDateLib) {
  const { from, to } = initialRange || {};
  const { isSameDay: isSameDay2, isAfter: isAfter2, isBefore: isBefore2 } = dateLib;
  let range;
  if (!from && !to) {
    range = { from: date, to: min2 > 0 ? void 0 : date };
  } else if (from && !to) {
    if (isSameDay2(from, date)) {
      if (min2 === 0) {
        range = { from, to: date };
      } else if (required) {
        range = { from, to: void 0 };
      } else {
        range = void 0;
      }
    } else if (isBefore2(date, from)) {
      range = { from: date, to: from };
    } else {
      range = { from, to: date };
    }
  } else if (from && to) {
    if (isSameDay2(from, date) && isSameDay2(to, date)) {
      if (required) {
        range = { from, to };
      } else {
        range = void 0;
      }
    } else if (isSameDay2(from, date)) {
      range = { from, to: min2 > 0 ? void 0 : date };
    } else if (isSameDay2(to, date)) {
      range = { from: date, to: min2 > 0 ? void 0 : date };
    } else if (isBefore2(date, from)) {
      range = { from: date, to };
    } else if (isAfter2(date, from)) {
      range = { from, to: date };
    } else if (isAfter2(date, to)) {
      range = { from, to: date };
    } else {
      throw new Error("Invalid range");
    }
  }
  if (range?.from && range?.to) {
    const diff = dateLib.differenceInCalendarDays(range.to, range.from);
    if (max2 > 0 && diff > max2) {
      range = { from: date, to: void 0 };
    } else if (min2 > 1 && diff < min2) {
      range = { from: date, to: void 0 };
    }
  }
  return range;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/rangeContainsDayOfWeek.js
function rangeContainsDayOfWeek(range, dayOfWeek, dateLib = defaultDateLib) {
  const dayOfWeekArr = !Array.isArray(dayOfWeek) ? [dayOfWeek] : dayOfWeek;
  let date = range.from;
  const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
  const totalDaysLimit = Math.min(totalDays, 6);
  for (let i = 0; i <= totalDaysLimit; i++) {
    if (dayOfWeekArr.includes(date.getDay())) {
      return true;
    }
    date = dateLib.addDays(date, 1);
  }
  return false;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function rangeOverlaps(rangeLeft, rangeRight, dateLib = defaultDateLib) {
  return rangeIncludesDate(rangeLeft, rangeRight.from, false, dateLib) || rangeIncludesDate(rangeLeft, rangeRight.to, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.from, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.to, false, dateLib);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function rangeContainsModifiers(range, modifiers, dateLib = defaultDateLib) {
  const matchers = Array.isArray(modifiers) ? modifiers : [modifiers];
  const nonFunctionMatchers = matchers.filter((matcher) => typeof matcher !== "function");
  const nonFunctionMatchersResult = nonFunctionMatchers.some((matcher) => {
    if (typeof matcher === "boolean")
      return matcher;
    if (dateLib.isDate(matcher)) {
      return rangeIncludesDate(range, matcher, false, dateLib);
    }
    if (isDatesArray(matcher, dateLib)) {
      return matcher.some((date) => rangeIncludesDate(range, date, false, dateLib));
    }
    if (isDateRange(matcher)) {
      if (matcher.from && matcher.to) {
        return rangeOverlaps(range, { from: matcher.from, to: matcher.to }, dateLib);
      }
      return false;
    }
    if (isDayOfWeekType(matcher)) {
      return rangeContainsDayOfWeek(range, matcher.dayOfWeek, dateLib);
    }
    if (isDateInterval(matcher)) {
      const isClosedInterval = dateLib.isAfter(matcher.before, matcher.after);
      if (isClosedInterval) {
        return rangeOverlaps(range, {
          from: dateLib.addDays(matcher.after, 1),
          to: dateLib.addDays(matcher.before, -1)
        }, dateLib);
      }
      return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
    }
    if (isDateAfterType(matcher) || isDateBeforeType(matcher)) {
      return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
    }
    return false;
  });
  if (nonFunctionMatchersResult) {
    return true;
  }
  const functionMatchers = matchers.filter((matcher) => typeof matcher === "function");
  if (functionMatchers.length) {
    let date = range.from;
    const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
    for (let i = 0; i <= totalDays; i++) {
      if (functionMatchers.some((matcher) => matcher(date))) {
        return true;
      }
      date = dateLib.addDays(date, 1);
    }
  }
  return false;
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/selection/useRange.js
function useRange(props, dateLib) {
  const { disabled: disabled2, excludeDisabled, resetOnSelect, selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const isSelected = (date) => selected && rangeIncludesDate(selected, date, false, dateLib);
  const select = (triggerDate, modifiers, e) => {
    const { min: min2, max: max2 } = props;
    let newRange;
    if (triggerDate) {
      const selectedFrom = selected?.from;
      const selectedTo = selected?.to;
      const hasFullRange = !!selectedFrom && !!selectedTo;
      const isClickingSingleDayRange = !!selectedFrom && !!selectedTo && dateLib.isSameDay(selectedFrom, selectedTo) && dateLib.isSameDay(triggerDate, selectedFrom);
      if (resetOnSelect && (hasFullRange || !selected?.from)) {
        if (!required && isClickingSingleDayRange) {
          newRange = void 0;
        } else {
          newRange = { from: triggerDate, to: void 0 };
        }
      } else {
        newRange = addToRange(triggerDate, selected, min2, max2, required, dateLib);
      }
    }
    if (excludeDisabled && disabled2 && newRange?.from && newRange.to) {
      if (rangeContainsModifiers({ from: newRange.from, to: newRange.to }, disabled2, dateLib)) {
        newRange.from = triggerDate;
        newRange.to = void 0;
      }
    }
    if (!onSelect) {
      setSelected(newRange);
    }
    onSelect?.(newRange, triggerDate, modifiers, e);
    return newRange;
  };
  return {
    selected,
    select,
    isSelected
  };
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/selection/useSingle.js
function useSingle(props, dateLib) {
  const { selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const { isSameDay: isSameDay2 } = dateLib;
  const isSelected = (compareDate) => {
    return selected ? isSameDay2(selected, compareDate) : false;
  };
  const select = (triggerDate, modifiers, e) => {
    let newDate = triggerDate;
    if (!required && selected && selected && isSameDay2(triggerDate, selected)) {
      newDate = void 0;
    }
    if (!onSelect) {
      setSelected(newDate);
    }
    if (required) {
      onSelect?.(newDate, triggerDate, modifiers, e);
    } else {
      onSelect?.(newDate, triggerDate, modifiers, e);
    }
    return newDate;
  };
  return {
    selected,
    select,
    isSelected
  };
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/useSelection.js
function useSelection(props, dateLib) {
  const single = useSingle(props, dateLib);
  const multi = useMulti(props, dateLib);
  const range = useRange(props, dateLib);
  switch (props.mode) {
    case "single":
      return single;
    case "multiple":
      return multi;
    case "range":
      return range;
    default:
      return void 0;
  }
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function toTimeZone(date, timeZone) {
  if (date instanceof TZDate && date.timeZone === timeZone) {
    return date;
  }
  return new TZDate(date, timeZone);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function toZoneNoon(date, timeZone, noonSafe) {
  if (!noonSafe)
    return toTimeZone(date, timeZone);
  const zoned = toTimeZone(date, timeZone);
  const noonZoned = new TZDate(zoned.getFullYear(), zoned.getMonth(), zoned.getDate(), 12, 0, 0, timeZone);
  return new Date(noonZoned.getTime());
}
function convertMatcher(matcher, timeZone, noonSafe) {
  if (typeof matcher === "boolean" || typeof matcher === "function") {
    return matcher;
  }
  if (matcher instanceof Date) {
    return toZoneNoon(matcher, timeZone, noonSafe);
  }
  if (Array.isArray(matcher)) {
    return matcher.map((value) => value instanceof Date ? toZoneNoon(value, timeZone, noonSafe) : value);
  }
  if (isDateRange(matcher)) {
    return {
      ...matcher,
      from: matcher.from ? toTimeZone(matcher.from, timeZone) : matcher.from,
      to: matcher.to ? toTimeZone(matcher.to, timeZone) : matcher.to
    };
  }
  if (isDateInterval(matcher)) {
    return {
      before: toZoneNoon(matcher.before, timeZone, noonSafe),
      after: toZoneNoon(matcher.after, timeZone, noonSafe)
    };
  }
  if (isDateAfterType(matcher)) {
    return {
      after: toZoneNoon(matcher.after, timeZone, noonSafe)
    };
  }
  if (isDateBeforeType(matcher)) {
    return {
      before: toZoneNoon(matcher.before, timeZone, noonSafe)
    };
  }
  return matcher;
}
function convertMatchersToTimeZone(matchers, timeZone, noonSafe) {
  if (!matchers) {
    return matchers;
  }
  if (Array.isArray(matchers)) {
    return matchers.map((matcher) => convertMatcher(matcher, timeZone, noonSafe));
  }
  return convertMatcher(matchers, timeZone, noonSafe);
}

// ../../../node_modules/.pnpm/react-day-picker@9.14.0_react@18.3.1/node_modules/react-day-picker/dist/esm/DayPicker.js
function DayPicker(initialProps) {
  let props = initialProps;
  const timeZone = props.timeZone;
  if (timeZone) {
    props = {
      ...initialProps,
      timeZone
    };
    if (props.today) {
      props.today = toTimeZone(props.today, timeZone);
    }
    if (props.month) {
      props.month = toTimeZone(props.month, timeZone);
    }
    if (props.defaultMonth) {
      props.defaultMonth = toTimeZone(props.defaultMonth, timeZone);
    }
    if (props.startMonth) {
      props.startMonth = toTimeZone(props.startMonth, timeZone);
    }
    if (props.endMonth) {
      props.endMonth = toTimeZone(props.endMonth, timeZone);
    }
    if (props.mode === "single" && props.selected) {
      props.selected = toTimeZone(props.selected, timeZone);
    } else if (props.mode === "multiple" && props.selected) {
      props.selected = props.selected?.map((date) => toTimeZone(date, timeZone));
    } else if (props.mode === "range" && props.selected) {
      props.selected = {
        from: props.selected.from ? toTimeZone(props.selected.from, timeZone) : props.selected.from,
        to: props.selected.to ? toTimeZone(props.selected.to, timeZone) : props.selected.to
      };
    }
    if (props.disabled !== void 0) {
      props.disabled = convertMatchersToTimeZone(props.disabled, timeZone);
    }
    if (props.hidden !== void 0) {
      props.hidden = convertMatchersToTimeZone(props.hidden, timeZone);
    }
    if (props.modifiers) {
      const nextModifiers = {};
      Object.keys(props.modifiers).forEach((key) => {
        nextModifiers[key] = convertMatchersToTimeZone(props.modifiers?.[key], timeZone);
      });
      props.modifiers = nextModifiers;
    }
  }
  const { components, formatters: formatters2, labels, dateLib, locale, classNames } = (0, import_react38.useMemo)(() => {
    const locale2 = { ...enUS2, ...props.locale };
    const weekStartsOn = props.broadcastCalendar ? 1 : props.weekStartsOn;
    const noonOverrides = props.noonSafe && props.timeZone ? createNoonOverrides(props.timeZone, {
      weekStartsOn,
      locale: locale2
    }) : void 0;
    const overrides = props.dateLib && noonOverrides ? { ...noonOverrides, ...props.dateLib } : props.dateLib ?? noonOverrides;
    const dateLib2 = new DateLib({
      locale: locale2,
      weekStartsOn,
      firstWeekContainsDate: props.firstWeekContainsDate,
      useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
      timeZone: props.timeZone,
      numerals: props.numerals
    }, overrides);
    return {
      dateLib: dateLib2,
      components: getComponents(props.components),
      formatters: getFormatters(props.formatters),
      labels: getLabels(props.labels, dateLib2.options),
      locale: locale2,
      classNames: { ...getDefaultClassNames(), ...props.classNames }
    };
  }, [
    props.locale,
    props.broadcastCalendar,
    props.weekStartsOn,
    props.firstWeekContainsDate,
    props.useAdditionalWeekYearTokens,
    props.useAdditionalDayOfYearTokens,
    props.timeZone,
    props.numerals,
    props.dateLib,
    props.noonSafe,
    props.components,
    props.formatters,
    props.labels,
    props.classNames
  ]);
  if (!props.today) {
    props = { ...props, today: dateLib.today() };
  }
  const { captionLayout, mode, navLayout, numberOfMonths = 1, onDayBlur, onDayClick, onDayFocus, onDayKeyDown, onDayMouseEnter, onDayMouseLeave, onNextClick, onPrevClick, showWeekNumber, styles } = props;
  const { formatCaption: formatCaption2, formatDay: formatDay2, formatMonthDropdown: formatMonthDropdown2, formatWeekNumber: formatWeekNumber2, formatWeekNumberHeader: formatWeekNumberHeader2, formatWeekdayName: formatWeekdayName2, formatYearDropdown: formatYearDropdown2 } = formatters2;
  const calendar = useCalendar(props, dateLib);
  const { days, months, navStart, navEnd, previousMonth, nextMonth, goToMonth } = calendar;
  const getModifiers = createGetModifiers(days, props, navStart, navEnd, dateLib);
  const { isSelected, select, selected: selectedValue } = useSelection(props, dateLib) ?? {};
  const { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus(props, calendar, getModifiers, isSelected ?? (() => false), dateLib);
  const { labelDayButton: labelDayButton2, labelGridcell: labelGridcell2, labelGrid: labelGrid2, labelMonthDropdown: labelMonthDropdown2, labelNav: labelNav2, labelPrevious: labelPrevious2, labelNext: labelNext2, labelWeekday: labelWeekday2, labelWeekNumber: labelWeekNumber2, labelWeekNumberHeader: labelWeekNumberHeader2, labelYearDropdown: labelYearDropdown2 } = labels;
  const weekdays = (0, import_react38.useMemo)(() => getWeekdays(dateLib, props.ISOWeek, props.broadcastCalendar, props.today), [dateLib, props.ISOWeek, props.broadcastCalendar, props.today]);
  const isInteractive = mode !== void 0 || onDayClick !== void 0;
  const handlePreviousClick = (0, import_react38.useCallback)(() => {
    if (!previousMonth)
      return;
    goToMonth(previousMonth);
    onPrevClick?.(previousMonth);
  }, [previousMonth, goToMonth, onPrevClick]);
  const handleNextClick = (0, import_react38.useCallback)(() => {
    if (!nextMonth)
      return;
    goToMonth(nextMonth);
    onNextClick?.(nextMonth);
  }, [goToMonth, nextMonth, onNextClick]);
  const handleDayClick = (0, import_react38.useCallback)((day, m) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFocused(day);
    if (m.disabled) {
      return;
    }
    select?.(day.date, m, e);
    onDayClick?.(day.date, m, e);
  }, [select, onDayClick, setFocused]);
  const handleDayFocus = (0, import_react38.useCallback)((day, m) => (e) => {
    setFocused(day);
    onDayFocus?.(day.date, m, e);
  }, [onDayFocus, setFocused]);
  const handleDayBlur = (0, import_react38.useCallback)((day, m) => (e) => {
    blur();
    onDayBlur?.(day.date, m, e);
  }, [blur, onDayBlur]);
  const handleDayKeyDown = (0, import_react38.useCallback)((day, modifiers) => (e) => {
    const keyMap = {
      ArrowLeft: [
        e.shiftKey ? "month" : "day",
        props.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        e.shiftKey ? "month" : "day",
        props.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [e.shiftKey ? "year" : "week", "after"],
      ArrowUp: [e.shiftKey ? "year" : "week", "before"],
      PageUp: [e.shiftKey ? "year" : "month", "before"],
      PageDown: [e.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (keyMap[e.key]) {
      e.preventDefault();
      e.stopPropagation();
      const [moveBy, moveDir] = keyMap[e.key];
      moveFocus(moveBy, moveDir);
    }
    onDayKeyDown?.(day.date, modifiers, e);
  }, [moveFocus, onDayKeyDown, props.dir]);
  const handleDayMouseEnter = (0, import_react38.useCallback)((day, modifiers) => (e) => {
    onDayMouseEnter?.(day.date, modifiers, e);
  }, [onDayMouseEnter]);
  const handleDayMouseLeave = (0, import_react38.useCallback)((day, modifiers) => (e) => {
    onDayMouseLeave?.(day.date, modifiers, e);
  }, [onDayMouseLeave]);
  const handleMonthChange = (0, import_react38.useCallback)((date) => (e) => {
    const selectedMonth = Number(e.target.value);
    const month = dateLib.setMonth(dateLib.startOfMonth(date), selectedMonth);
    goToMonth(month);
  }, [dateLib, goToMonth]);
  const handleYearChange = (0, import_react38.useCallback)((date) => (e) => {
    const selectedYear = Number(e.target.value);
    const month = dateLib.setYear(dateLib.startOfMonth(date), selectedYear);
    goToMonth(month);
  }, [dateLib, goToMonth]);
  const { className, style } = (0, import_react38.useMemo)(() => ({
    className: [classNames[UI.Root], props.className].filter(Boolean).join(" "),
    style: { ...styles?.[UI.Root], ...props.style }
  }), [classNames, props.className, props.style, styles]);
  const dataAttributes = getDataAttributes(props);
  const rootElRef = (0, import_react38.useRef)(null);
  useAnimation(rootElRef, Boolean(props.animate), {
    classNames,
    months,
    focused,
    dateLib
  });
  const contextValue = {
    dayPickerProps: props,
    selected: selectedValue,
    select,
    isSelected,
    months,
    nextMonth,
    previousMonth,
    goToMonth,
    getModifiers,
    components,
    classNames,
    styles,
    labels,
    formatters: formatters2
  };
  return import_react38.default.createElement(
    dayPickerContext.Provider,
    { value: contextValue },
    import_react38.default.createElement(
      components.Root,
      { rootRef: props.animate ? rootElRef : void 0, className, style, dir: props.dir, id: props.id, lang: props.lang ?? locale.code, nonce: props.nonce, title: props.title, role: props.role, "aria-label": props["aria-label"], "aria-labelledby": props["aria-labelledby"], ...dataAttributes },
      import_react38.default.createElement(
        components.Months,
        { className: classNames[UI.Months], style: styles?.[UI.Months] },
        !props.hideNavigation && !navLayout && import_react38.default.createElement(components.Nav, { "data-animated-nav": props.animate ? "true" : void 0, className: classNames[UI.Nav], style: styles?.[UI.Nav], "aria-label": labelNav2(), onPreviousClick: handlePreviousClick, onNextClick: handleNextClick, previousMonth, nextMonth }),
        months.map((calendarMonth, displayIndex) => {
          return import_react38.default.createElement(
            components.Month,
            {
              "data-animated-month": props.animate ? "true" : void 0,
              className: classNames[UI.Month],
              style: styles?.[UI.Month],
              // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
              key: displayIndex,
              displayIndex,
              calendarMonth
            },
            navLayout === "around" && !props.hideNavigation && displayIndex === 0 && import_react38.default.createElement(
              components.PreviousMonthButton,
              { type: "button", className: classNames[UI.PreviousMonthButton], tabIndex: previousMonth ? void 0 : -1, "aria-disabled": previousMonth ? void 0 : true, "aria-label": labelPrevious2(previousMonth), onClick: handlePreviousClick, "data-animated-button": props.animate ? "true" : void 0 },
              import_react38.default.createElement(components.Chevron, { disabled: previousMonth ? void 0 : true, className: classNames[UI.Chevron], orientation: props.dir === "rtl" ? "right" : "left" })
            ),
            import_react38.default.createElement(components.MonthCaption, { "data-animated-caption": props.animate ? "true" : void 0, className: classNames[UI.MonthCaption], style: styles?.[UI.MonthCaption], calendarMonth, displayIndex }, captionLayout?.startsWith("dropdown") ? import_react38.default.createElement(
              components.DropdownNav,
              { className: classNames[UI.Dropdowns], style: styles?.[UI.Dropdowns] },
              (() => {
                const monthControl = captionLayout === "dropdown" || captionLayout === "dropdown-months" ? import_react38.default.createElement(components.MonthsDropdown, { key: "month", className: classNames[UI.MonthsDropdown], "aria-label": labelMonthDropdown2(), classNames, components, disabled: Boolean(props.disableNavigation), onChange: handleMonthChange(calendarMonth.date), options: getMonthOptions(calendarMonth.date, navStart, navEnd, formatters2, dateLib), style: styles?.[UI.Dropdown], value: dateLib.getMonth(calendarMonth.date) }) : import_react38.default.createElement("span", { key: "month" }, formatMonthDropdown2(calendarMonth.date, dateLib));
                const yearControl = captionLayout === "dropdown" || captionLayout === "dropdown-years" ? import_react38.default.createElement(components.YearsDropdown, { key: "year", className: classNames[UI.YearsDropdown], "aria-label": labelYearDropdown2(dateLib.options), classNames, components, disabled: Boolean(props.disableNavigation), onChange: handleYearChange(calendarMonth.date), options: getYearOptions(navStart, navEnd, formatters2, dateLib, Boolean(props.reverseYears)), style: styles?.[UI.Dropdown], value: dateLib.getYear(calendarMonth.date) }) : import_react38.default.createElement("span", { key: "year" }, formatYearDropdown2(calendarMonth.date, dateLib));
                const controls = dateLib.getMonthYearOrder() === "year-first" ? [yearControl, monthControl] : [monthControl, yearControl];
                return controls;
              })(),
              import_react38.default.createElement("span", { role: "status", "aria-live": "polite", style: {
                border: 0,
                clip: "rect(0 0 0 0)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",
                whiteSpace: "nowrap",
                wordWrap: "normal"
              } }, formatCaption2(calendarMonth.date, dateLib.options, dateLib))
            ) : import_react38.default.createElement(components.CaptionLabel, { className: classNames[UI.CaptionLabel], role: "status", "aria-live": "polite" }, formatCaption2(calendarMonth.date, dateLib.options, dateLib))),
            navLayout === "around" && !props.hideNavigation && displayIndex === numberOfMonths - 1 && import_react38.default.createElement(
              components.NextMonthButton,
              { type: "button", className: classNames[UI.NextMonthButton], tabIndex: nextMonth ? void 0 : -1, "aria-disabled": nextMonth ? void 0 : true, "aria-label": labelNext2(nextMonth), onClick: handleNextClick, "data-animated-button": props.animate ? "true" : void 0 },
              import_react38.default.createElement(components.Chevron, { disabled: nextMonth ? void 0 : true, className: classNames[UI.Chevron], orientation: props.dir === "rtl" ? "left" : "right" })
            ),
            displayIndex === numberOfMonths - 1 && navLayout === "after" && !props.hideNavigation && import_react38.default.createElement(components.Nav, { "data-animated-nav": props.animate ? "true" : void 0, className: classNames[UI.Nav], style: styles?.[UI.Nav], "aria-label": labelNav2(), onPreviousClick: handlePreviousClick, onNextClick: handleNextClick, previousMonth, nextMonth }),
            import_react38.default.createElement(
              components.MonthGrid,
              { role: "grid", "aria-multiselectable": mode === "multiple" || mode === "range", "aria-label": labelGrid2(calendarMonth.date, dateLib.options, dateLib) || void 0, className: classNames[UI.MonthGrid], style: styles?.[UI.MonthGrid] },
              !props.hideWeekdays && import_react38.default.createElement(
                components.Weekdays,
                { "data-animated-weekdays": props.animate ? "true" : void 0, className: classNames[UI.Weekdays], style: styles?.[UI.Weekdays] },
                showWeekNumber && import_react38.default.createElement(components.WeekNumberHeader, { "aria-label": labelWeekNumberHeader2(dateLib.options), className: classNames[UI.WeekNumberHeader], style: styles?.[UI.WeekNumberHeader], scope: "col" }, formatWeekNumberHeader2()),
                weekdays.map((weekday) => import_react38.default.createElement(components.Weekday, { "aria-label": labelWeekday2(weekday, dateLib.options, dateLib), className: classNames[UI.Weekday], key: String(weekday), style: styles?.[UI.Weekday], scope: "col" }, formatWeekdayName2(weekday, dateLib.options, dateLib)))
              ),
              import_react38.default.createElement(components.Weeks, { "data-animated-weeks": props.animate ? "true" : void 0, className: classNames[UI.Weeks], style: styles?.[UI.Weeks] }, calendarMonth.weeks.map((week) => {
                return import_react38.default.createElement(
                  components.Week,
                  { className: classNames[UI.Week], key: week.weekNumber, style: styles?.[UI.Week], week },
                  showWeekNumber && import_react38.default.createElement(components.WeekNumber, { week, style: styles?.[UI.WeekNumber], "aria-label": labelWeekNumber2(week.weekNumber, {
                    locale
                  }), className: classNames[UI.WeekNumber], scope: "row", role: "rowheader" }, formatWeekNumber2(week.weekNumber, dateLib)),
                  week.days.map((day) => {
                    const { date } = day;
                    const modifiers = getModifiers(day);
                    modifiers[DayFlag.focused] = !modifiers.hidden && Boolean(focused?.isEqualTo(day));
                    modifiers[SelectionState.selected] = isSelected?.(date) || modifiers.selected;
                    if (isDateRange(selectedValue)) {
                      const { from, to } = selectedValue;
                      modifiers[SelectionState.range_start] = Boolean(from && to && dateLib.isSameDay(date, from));
                      modifiers[SelectionState.range_end] = Boolean(from && to && dateLib.isSameDay(date, to));
                      modifiers[SelectionState.range_middle] = rangeIncludesDate(selectedValue, date, true, dateLib);
                    }
                    const style2 = getStyleForModifiers(modifiers, styles, props.modifiersStyles);
                    const className2 = getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames);
                    const ariaLabel = !isInteractive && !modifiers.hidden ? labelGridcell2(date, modifiers, dateLib.options, dateLib) : void 0;
                    return import_react38.default.createElement(components.Day, { key: `${day.isoDate}_${day.displayMonthId}`, day, modifiers, className: className2.join(" "), style: style2, role: "gridcell", "aria-selected": modifiers.selected || void 0, "aria-label": ariaLabel, "data-day": day.isoDate, "data-month": day.outside ? day.dateMonthId : void 0, "data-selected": modifiers.selected || void 0, "data-disabled": modifiers.disabled || void 0, "data-hidden": modifiers.hidden || void 0, "data-outside": day.outside || void 0, "data-focused": modifiers.focused || void 0, "data-today": modifiers.today || void 0 }, !modifiers.hidden && isInteractive ? import_react38.default.createElement(components.DayButton, { className: classNames[UI.DayButton], style: styles?.[UI.DayButton], type: "button", day, modifiers, disabled: !modifiers.focused && modifiers.disabled || void 0, "aria-disabled": modifiers.focused && modifiers.disabled || void 0, tabIndex: isFocusTarget(day) ? 0 : -1, "aria-label": labelDayButton2(date, modifiers, dateLib.options, dateLib), onClick: handleDayClick(day, modifiers), onBlur: handleDayBlur(day, modifiers), onFocus: handleDayFocus(day, modifiers), onKeyDown: handleDayKeyDown(day, modifiers), onMouseEnter: handleDayMouseEnter(day, modifiers), onMouseLeave: handleDayMouseLeave(day, modifiers) }, formatDay2(date, dateLib.options, dateLib)) : !modifiers.hidden && formatDay2(day.date, dateLib.options, dateLib));
                  })
                );
              }))
            )
          );
        })
      ),
      props.footer && import_react38.default.createElement(components.Footer, { className: classNames[UI.Footer], style: styles?.[UI.Footer], role: "status", "aria-live": "polite" }, props.footer)
    )
  );
}

// ../../../node_modules/.pnpm/@automattic+ui@1.0.2_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@automattic/ui/dist/index.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
var import_react39 = __toESM(require_react(), 1);
var import_i18n7 = __toESM(require_i18n(), 1);
var import_react40 = __toESM(require_react(), 1);
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
var import_react41 = __toESM(require_react(), 1);
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
var styles_module_default = {
  "calendar": "a8cui-gPJt-U",
  "calendar__day": "a8cui-QCGEeM",
  "calendar__day-button": "a8cui-HDc6At",
  "calendar__caption-label": "a8cui--tMqc-",
  "calendar__button-next": "a8cui-K6-emE",
  "calendar__button-previous": "a8cui-jkKgJ8",
  "calendar__chevron": "a8cui-i7sHUR",
  "calendar__nav": "a8cui-ErX9-L",
  "calendar__month-caption": "a8cui-zh2-ml",
  "calendar__months": "a8cui-uwIn95",
  "calendar__month-grid": "a8cui-qCUnTq",
  "calendar__weekday": "a8cui-4dwCgM",
  "calendar__day--today": "a8cui-OIctzz",
  "calendar__day--selected": "a8cui-Fmweu0",
  "calendar__range-middle": "a8cui-xxeRL-",
  "calendar__day--hidden": "a8cui-hYbR6o",
  "calendar__range-start": "a8cui-QLGSvK",
  "calendar__range-end": "a8cui-yvkr8w",
  "calendar__day--preview": "a8cui-S2KIWp",
  "calendar__weeks-before-enter": "a8cui-EmUC2R",
  "calendar__weeks-before-exit": "a8cui-q2hElq",
  "calendar__weeks-after-enter": "a8cui-EeHaIG",
  "calendar__weeks-after-exit": "a8cui-m-aGE6",
  "calendar__caption-after-enter": "a8cui-IIuJ-M",
  "calendar__caption-after-exit": "a8cui-ADWpzy",
  "calendar__caption-before-enter": "a8cui-KQdZhf",
  "calendar__caption-before-exit": "a8cui--SotkH",
  "slide-in-left": "a8cui-tirChk",
  "slide-out-left": "a8cui-C-6W5i",
  "slide-in-right": "a8cui-xlTpyU",
  "slide-out-right": "a8cui-X-0QGP",
  "fade-in": "a8cui-Dcdew-",
  "fade-out": "a8cui-TmFIT6"
};
var PreviewDashStartAndEnd = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "svg",
    {
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      stroke: "currentColor",
      strokeDasharray: "3.7677",
      strokeDashoffset: "3.2",
      strokeWidth: "1",
      children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M29.5,0.5 h-27 a2,2 0 0 0 -2,2 v27 a2,2 0 0 0 2,2 h27 a2,2 0 0 0 2,-2 v-27 a2,2 0 0 0 -2,-2" })
    }
  );
};
var PreviewDashStart = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "svg",
    {
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      stroke: "currentColor",
      strokeDasharray: "3.84516",
      strokeDashoffset: "1.9226",
      strokeWidth: "1",
      children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M32,0.5 h-29.5 a2,2 0 0 0 -2,2 v27 a2,2 0 0 0 2,2 h30" })
    }
  );
};
var PreviewDashMiddle = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
    "svg",
    {
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      stroke: "currentColor",
      strokeDasharray: "3.9 4",
      strokeDashoffset: "2",
      strokeWidth: "1",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("line", { x1: "0", y1: "0.5", x2: "100", y2: "0.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("line", { x1: "0", y1: "31.5", x2: "100", y2: "31.5" })
      ]
    }
  );
};
var PreviewDashEnd = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "svg",
    {
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      stroke: "currentColor",
      strokeDasharray: "3.84516",
      strokeDashoffset: "1.9226",
      strokeWidth: "1",
      children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("path", { d: "M0,0.5 h29.5 a2,2 0 0 1 2,2 v27 a2,2 0 0 1 -2,2 h-29.5" })
    }
  );
};
function Day2(props) {
  const { day, modifiers, children, ...tdProps } = props;
  let PreviewDash;
  if (modifiers.preview_start && modifiers.preview_end) {
    PreviewDash = PreviewDashStartAndEnd;
  } else if (modifiers.preview_start) {
    PreviewDash = PreviewDashStart;
  } else if (modifiers.preview_end) {
    PreviewDash = PreviewDashEnd;
  } else if (modifiers.preview) {
    PreviewDash = PreviewDashMiddle;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("td", { ...tdProps, children: [
    PreviewDash && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(PreviewDash, {}),
    children
  ] });
}
var CLASSNAMES = {
  root: styles_module_default["calendar"],
  day: styles_module_default["calendar__day"],
  day_button: styles_module_default["calendar__day-button"],
  caption_label: styles_module_default["calendar__caption-label"],
  button_next: styles_module_default["calendar__button-next"],
  button_previous: styles_module_default["calendar__button-previous"],
  chevron: styles_module_default["calendar__chevron"],
  nav: styles_module_default["calendar__nav"],
  month_caption: styles_module_default["calendar__month-caption"],
  months: styles_module_default["calendar__months"],
  month_grid: styles_module_default["calendar__month-grid"],
  weekday: styles_module_default["calendar__weekday"],
  today: styles_module_default["calendar__day--today"],
  selected: styles_module_default["calendar__day--selected"],
  disabled: styles_module_default["calendar__day--disabled"],
  hidden: styles_module_default["calendar__day--hidden"],
  range_start: styles_module_default["calendar__range-start"],
  range_end: styles_module_default["calendar__range-end"],
  range_middle: styles_module_default["calendar__range-middle"],
  weeks_before_enter: styles_module_default["calendar__weeks-before-enter"],
  weeks_before_exit: styles_module_default["calendar__weeks-before-exit"],
  weeks_after_enter: styles_module_default["calendar__weeks-after-enter"],
  weeks_after_exit: styles_module_default["calendar__weeks-after-exit"],
  caption_after_enter: styles_module_default["calendar__caption-after-enter"],
  caption_after_exit: styles_module_default["calendar__caption-after-exit"],
  caption_before_enter: styles_module_default["calendar__caption-before-enter"],
  caption_before_exit: styles_module_default["calendar__caption-before-exit"]
};
var MODIFIER_CLASSNAMES = {
  preview: styles_module_default["calendar__day--preview"],
  preview_start: styles_module_default["calendar__day--preview-start"],
  preview_end: styles_module_default["calendar__day--preview-end"]
};
var COMMON_PROPS = {
  animate: true,
  // Only show days in the current month
  showOutsideDays: false,
  // Hide week number column
  showWeekNumber: false,
  // Show weekdays row
  hideWeekdays: false,
  // Month and year caption are not interactive
  captionLayout: "label",
  // Show a variable number of weeks depending on the month
  fixedWeeks: false,
  // Show navigation buttons
  hideNavigation: false,
  // Class names
  classNames: CLASSNAMES,
  // Default role
  role: "application",
  components: {
    Day: Day2
  }
};
function clampNumberOfMonths(numberOfMonths) {
  return Math.min(3, Math.max(1, numberOfMonths));
}
function useControlledValue2({
  defaultValue,
  onChange,
  value: valueProp
}) {
  const hasValue = typeof valueProp !== "undefined";
  const initialValue = hasValue ? valueProp : defaultValue;
  const [state, setState] = (0, import_react39.useState)(initialValue);
  const value = (hasValue ? valueProp : state) ?? void 0;
  let setValue;
  const uncontrolledSetValue = (0, import_react39.useCallback)(
    (nextValue, ...args) => {
      setState(nextValue);
      onChange?.(nextValue, ...args);
    },
    [setState, onChange]
  );
  if (hasValue && typeof onChange === "function") {
    setValue = onChange;
  } else if (!hasValue && typeof onChange === "function") {
    setValue = uncontrolledSetValue;
  } else {
    setValue = setState;
  }
  return [value, setValue];
}
function isLocaleRTL(localeCode) {
  const localeObj = new Intl.Locale(localeCode);
  if ("getTextInfo" in localeObj) {
    return localeObj.getTextInfo().direction === "rtl";
  }
  return [
    "ar",
    // Arabic
    "he",
    // Hebrew
    "fa",
    // Persian (Farsi)
    "ur",
    // Urdu
    "ps",
    // Pashto
    "syr",
    // Syriac
    "dv",
    // Divehi
    "ku",
    // Kurdish (Sorani)
    "yi"
    // Yiddish
  ].includes(localeObj.language);
}
var useLocalizationProps = ({
  locale,
  timeZone,
  mode
}) => {
  return (0, import_react40.useMemo)(() => {
    const monthNameFormatter = new Intl.DateTimeFormat(locale.code, {
      year: "numeric",
      month: "long",
      timeZone
    });
    const weekdayNarrowFormatter = new Intl.DateTimeFormat(locale.code, {
      weekday: "narrow",
      timeZone
    });
    const weekdayLongFormatter = new Intl.DateTimeFormat(locale.code, {
      weekday: "long",
      timeZone
    });
    const fullDateFormatter = new Intl.DateTimeFormat(locale.code, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone
    });
    return {
      "aria-label": mode === "single" ? (0, import_i18n7.__)("Date calendar") : (0, import_i18n7.__)("Date range calendar"),
      labels: {
        /** The label for the month grid. */
        labelGrid: (date) => monthNameFormatter.format(date),
        /** The label for the gridcell, when the calendar is not interactive. */
        labelGridcell: (date, modifiers) => {
          const formattedDate = fullDateFormatter.format(date);
          let label = formattedDate;
          if (modifiers?.today) {
            label = (0, import_i18n7.sprintf)(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              (0, import_i18n7.__)("Today, %s"),
              formattedDate
            );
          }
          return label;
        },
        /** The label for the "next month" button. */
        labelNext: () => (0, import_i18n7.__)("Go to the Next Month"),
        /** The label for the "previous month" button. */
        labelPrevious: () => (0, import_i18n7.__)("Go to the Previous Month"),
        /** The label for the day button. */
        labelDayButton: (date, modifiers) => {
          const formattedDate = fullDateFormatter.format(date);
          let label = formattedDate;
          if (modifiers?.today) {
            label = (0, import_i18n7.sprintf)(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              (0, import_i18n7.__)("Today, %s"),
              formattedDate
            );
          }
          if (modifiers?.selected) {
            label = (0, import_i18n7.sprintf)(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              (0, import_i18n7.__)("%s, selected"),
              formattedDate
            );
          }
          return label;
        },
        /** The label for the weekday. */
        labelWeekday: (date) => weekdayLongFormatter.format(date)
      },
      locale,
      dir: isLocaleRTL(locale.code) ? "rtl" : "ltr",
      formatters: {
        formatWeekdayName: (date) => {
          return weekdayNarrowFormatter.format(date);
        },
        formatCaption: (date) => {
          return monthNameFormatter.format(date);
        }
      },
      timeZone
    };
  }, [locale, timeZone, mode, import_i18n7.__]);
};
function usePreviewRange({
  selected,
  hoveredDate,
  excludeDisabled,
  min: min2,
  max: max2,
  disabled: disabled2
}) {
  return (0, import_react41.useMemo)(() => {
    if (!hoveredDate || !selected?.from) {
      return;
    }
    let previewHighlight;
    let potentialNewRange;
    if (hoveredDate < selected.from) {
      previewHighlight = {
        from: hoveredDate,
        to: selected.from
      };
      potentialNewRange = {
        from: hoveredDate,
        to: selected.to ?? selected.from
      };
    } else if (selected.to && hoveredDate > selected.from && hoveredDate < selected.to) {
      previewHighlight = {
        from: selected.from,
        to: hoveredDate
      };
      potentialNewRange = {
        from: selected.from,
        to: hoveredDate
      };
    } else if (hoveredDate > selected.from) {
      previewHighlight = {
        from: selected.to ?? selected.from,
        to: hoveredDate
      };
      potentialNewRange = {
        from: selected.from,
        to: hoveredDate
      };
    }
    if (min2 !== void 0 && min2 > 0 && potentialNewRange && differenceInCalendarDays(potentialNewRange.to, potentialNewRange.from) < min2) {
      previewHighlight = {
        from: hoveredDate,
        to: hoveredDate
      };
    }
    if (max2 !== void 0 && max2 > 0 && potentialNewRange && differenceInCalendarDays(potentialNewRange.to, potentialNewRange.from) > max2) {
      previewHighlight = {
        from: hoveredDate,
        to: hoveredDate
      };
    }
    if (excludeDisabled && disabled2 && potentialNewRange && rangeContainsModifiers(potentialNewRange, disabled2)) {
      previewHighlight = {
        from: hoveredDate,
        to: hoveredDate
      };
    }
    return previewHighlight;
  }, [selected, hoveredDate, excludeDisabled, min2, max2, disabled2]);
}
var DateRangeCalendar = ({
  defaultSelected,
  selected: selectedProp,
  onSelect,
  numberOfMonths = 1,
  excludeDisabled,
  min: min2,
  max: max2,
  disabled: disabled2,
  locale = enUS2,
  timeZone,
  ...props
}) => {
  const localizationProps = useLocalizationProps({ locale, timeZone, mode: "range" });
  const [selected, setSelected] = useControlledValue2({
    defaultValue: defaultSelected,
    value: selectedProp,
    onChange: onSelect
  });
  const [hoveredDate, setHoveredDate] = (0, import_react41.useState)(void 0);
  const previewRange = usePreviewRange({
    selected,
    hoveredDate,
    excludeDisabled,
    min: min2,
    max: max2,
    disabled: disabled2
  });
  const modifiers = (0, import_react41.useMemo)(() => {
    return {
      preview: previewRange,
      preview_start: previewRange?.from,
      preview_end: previewRange?.to
    };
  }, [previewRange]);
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    DayPicker,
    {
      ...COMMON_PROPS,
      ...localizationProps,
      ...props,
      mode: "range",
      numberOfMonths: clampNumberOfMonths(numberOfMonths),
      disabled: disabled2,
      excludeDisabled,
      min: min2,
      max: max2,
      selected,
      onSelect: setSelected,
      onDayMouseEnter: (date) => setHoveredDate(date),
      onDayMouseLeave: () => setHoveredDate(void 0),
      modifiers,
      modifiersClassNames: MODIFIER_CLASSNAMES
    }
  );
};

// packages/ui/build-module/date-range-popover/date-range-filter.mjs
var import_components3 = __toESM(require_components(), 1);
var import_compose = __toESM(require_compose(), 1);
var import_i18n9 = __toESM(require_i18n(), 1);
var import_react43 = __toESM(require_react(), 1);

// packages/ui/build-module/date-range-input/date-range-input.mjs
var import_i18n8 = __toESM(require_i18n(), 1);
var import_react42 = __toESM(require_react(), 1);
var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='935fc4ab59']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "935fc4ab59");
  style.appendChild(document.createTextNode(".input-date-control{flex:1;font-size:var(--wpds-typography-font-size-sm,12px)}@supports selector(&::-webkit-calendar-picker-indicator){.input-date-control input[type=date]{appearance:none;-webkit-appearance:none;background:none;font-size:var(--wpds-typography-font-size-md,13px);padding-right:0;width:fit-content}.input-date-control input[type=date]::-webkit-calendar-picker-indicator{display:none}}@supports not selector(&::-webkit-calendar-picker-indicator){.input-date-control input[type=date]{display:flex;margin-inline:auto;min-width:fit-content;padding:0;width:calc(100% - 20px)}}"));
  document.head.appendChild(style);
}
var formatToString = (date) => date ? formatDate(date, "iso") : "";
function parseFromString(dateString, timeZone) {
  const [year, month, day] = dateString.split("-").map((x) => Number(x));
  const parsedDate = createTZDateFromParts([year, month - 1, day], timeZone);
  return !isNaN(parsedDate.getTime()) ? parsedDate : void 0;
}
function DateInput({ label, date, onChange, timeZone }) {
  const [value, setValue] = (0, import_react42.useState)(formatToString(date));
  (0, import_react42.useEffect)(() => {
    setValue(formatToString(date));
  }, [date]);
  const onInputChange = (0, import_react42.useCallback)(
    (event) => {
      const newValue = event.target.value;
      setValue(newValue);
      const newDate = parseFromString(newValue, timeZone);
      if (newDate && newDate.getFullYear() > 2e3) {
        onChange(newDate);
      }
    },
    [onChange, timeZone]
  );
  const onClick = (0, import_react42.useCallback)((e) => {
    e.preventDefault();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(field_exports.Root, { className: "input-date-control", children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(field_exports.Label, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Input3, { type: "date", value, onChange: onInputChange, onClick })
  ] });
}
function DateRangeInput({ range, onChange, timeZone }) {
  const { from, to } = range;
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(Stack, { gap: "sm", justify: "space-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      DateInput,
      {
        label: (0, import_i18n8.__)("From", "jetpack-premium-analytics"),
        date: from,
        timeZone,
        onChange: (nextFrom) => {
          if (nextFrom && to && nextFrom <= to) {
            onChange({ from: nextFrom, to });
          }
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      DateInput,
      {
        label: (0, import_i18n8.__)("To", "jetpack-premium-analytics"),
        date: to,
        timeZone,
        onChange: (nextTo) => {
          if (nextTo && from && from <= nextTo) {
            onChange({ from, to: nextTo });
          }
        }
      }
    )
  ] });
}

// packages/ui/build-module/date-range-popover/date-range-filter.mjs
var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='d7c99ed431']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "d7c99ed431");
  style.appendChild(document.createTextNode('.a8cui-DPKqWs{align-items:center;background-color:color-mix(in srgb,#fff 90%,var(--base-color));border-radius:2px;box-sizing:border-box;color:color-mix(in srgb,#000 50%,var(--base-color));display:inline-flex;font-size:12px;font-weight:400;gap:2px;line-height:20px;max-width:100%;min-height:24px;padding:0 8px}.a8cui-DPKqWs *,.a8cui-DPKqWs :after,.a8cui-DPKqWs :before{box-sizing:inherit}.a8cui-DPKqWs:where(.a8cui-3Ut0Se){background-color:var(--wp-components-color-gray-100,#f0f0f0);color:var(--wp-components-color-gray-800,#2f2f2f)}.a8cui-DPKqWs.a8cui-JRVFdH{padding-inline-start:4px}.a8cui-DPKqWs.a8cui-1y4b5l{--base-color:var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9))}.a8cui-DPKqWs.a8cui-PT-ZdX{--base-color:#f0b849}.a8cui-DPKqWs.a8cui-eTS5AQ{--base-color:#cc1818}.a8cui-DPKqWs.a8cui-A8MMKo{--base-color:#4ab866}.a8cui-fZ9W2S{flex-shrink:0}.a8cui-phpszl{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.a8cui-gPJt-U{--a8c-calendar-outline-focus:1.5px solid var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9));--a8c-calendar-button-height:2rem;--a8c-calendar-button-width:2rem;--a8c-calendar-nav-height:2rem;--a8c-calendar-range-middle-background-color:color-mix(in srgb,var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9)) 4%,transparent);--a8c-calendar-preview-border-color:color-mix(in srgb,var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9)) 16%,transparent);background-color:#fff;color:#1e1e1e;display:inline-block;font-size:13px;font-weight:400;position:relative;z-index:0}.a8cui-gPJt-U,.a8cui-gPJt-U *,.a8cui-gPJt-U :after,.a8cui-gPJt-U :before{box-sizing:border-box}.a8cui-QCGEeM{padding:0;position:relative}.a8cui-QCGEeM:has(.a8cui-HDc6At:disabled){color:#949494}.a8cui-QCGEeM:has(.a8cui-HDc6At:focus-visible),.a8cui-QCGEeM:has(.a8cui-HDc6At:hover:not(:disabled)){color:var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9))}.a8cui-HDc6At{align-items:center;background:none;border:none;border-radius:2px;color:inherit;cursor:pointer;display:flex;font:inherit;font-variant-numeric:tabular-nums;height:var(--a8c-calendar-button-height);justify-content:center;margin:0;padding:0;position:relative;width:var(--a8c-calendar-button-width)}.a8cui-HDc6At:before{border:none;border-radius:2px;content:"";inset:0;position:absolute;z-index:-1}.a8cui-HDc6At:after{content:"";inset:0;pointer-events:none;position:absolute;z-index:1}.a8cui-HDc6At:disabled{cursor:revert}@media (forced-colors:active){.a8cui-HDc6At:disabled{text-decoration:line-through}}.a8cui-HDc6At:focus-visible{outline:var(--a8c-calendar-outline-focus);outline-offset:1px}.a8cui--tMqc-{border:0;text-transform:capitalize;white-space:nowrap;z-index:1}.a8cui--tMqc-,.a8cui-K6-emE,.a8cui-jkKgJ8{align-items:center;display:inline-flex;position:relative}.a8cui-K6-emE,.a8cui-jkKgJ8{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:none;border:none;border-radius:2px;color:inherit;cursor:pointer;height:var(--a8c-calendar-button-height);justify-content:center;margin:0;padding:0;width:var(--a8c-calendar-button-width)}.a8cui-K6-emE:disabled,.a8cui-K6-emE[aria-disabled=true],.a8cui-jkKgJ8:disabled,.a8cui-jkKgJ8[aria-disabled=true]{color:#949494;cursor:revert}.a8cui-K6-emE:focus-visible,.a8cui-jkKgJ8:focus-visible{outline:var(--a8c-calendar-outline-focus)}.a8cui-i7sHUR{display:inline-block;fill:currentColor;height:16px;width:16px}.a8cui-gPJt-U[dir=rtl] .a8cui-ErX9-L .a8cui-i7sHUR{transform:rotate(180deg);transform-origin:50%}.a8cui-zh2-ml{align-content:center;height:var(--a8c-calendar-nav-height);margin-bottom:12px}.a8cui-uwIn95,.a8cui-zh2-ml{display:flex;justify-content:center}.a8cui-uwIn95{flex-wrap:wrap;gap:1rem;max-width:fit-content;position:relative}.a8cui-qCUnTq{border-collapse:separate;border-spacing:0 4px}.a8cui-ErX9-L{align-items:center;display:flex;height:var(--a8c-calendar-nav-height);inset-block-start:0;inset-inline-end:0;inset-inline-start:0;justify-content:space-between;position:absolute}.a8cui-4dwCgM{color:#757575;height:var(--a8c-calendar-button-height);padding:0;text-align:center;text-transform:uppercase;width:var(--a8c-calendar-button-width)}.a8cui-OIctzz:after{border:2px solid;border-radius:50%;content:"";height:0;inset-block-start:2px;inset-inline-end:2px;position:absolute;width:0;z-index:1}.a8cui-Fmweu0:not(.a8cui-xxeRL-):has(.a8cui-HDc6At,.a8cui-HDc6At:hover:not(:disabled)){color:#fff}.a8cui-Fmweu0:not(.a8cui-xxeRL-) .a8cui-HDc6At:before{background-color:#1e1e1e;border:1px solid transparent}.a8cui-Fmweu0:not(.a8cui-xxeRL-) .a8cui-HDc6At:disabled:before{background-color:#949494}.a8cui-Fmweu0:not(.a8cui-xxeRL-) .a8cui-HDc6At:hover:not(:disabled):before{background-color:#2f2f2f}.a8cui-hYbR6o{visibility:hidden}.a8cui-QLGSvK:not(.a8cui-yvkr8w) .a8cui-HDc6At,.a8cui-QLGSvK:not(.a8cui-yvkr8w) .a8cui-HDc6At:before{border-end-end-radius:0;border-start-end-radius:0}.a8cui-xxeRL- .a8cui-HDc6At:before{background-color:var(--a8c-calendar-range-middle-background-color);border-color:transparent;border-radius:0;border-style:solid;border-width:1px 0}.a8cui-yvkr8w:not(.a8cui-QLGSvK) .a8cui-HDc6At,.a8cui-yvkr8w:not(.a8cui-QLGSvK) .a8cui-HDc6At:before{border-end-start-radius:0;border-start-start-radius:0}.a8cui-S2KIWp svg{color:var(--a8c-calendar-preview-border-color);inset:0;pointer-events:none;position:absolute}@media (forced-colors:active){.a8cui-S2KIWp svg{color:inherit}}.a8cui-gPJt-U[dir=rtl] .a8cui-S2KIWp svg{transform:scaleX(-1)}.a8cui-S2KIWp.a8cui-xxeRL- .a8cui-HDc6At:before{border:none}@keyframes a8cui-tirChk{0%{transform:translateX(-100%)}to{transform:translateX(0)}}@keyframes a8cui-xlTpyU{0%{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes a8cui-C-6W5i{0%{transform:translateX(0)}to{transform:translateX(-100%)}}@keyframes a8cui-X-0QGP{0%{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes a8cui-Dcdew-{0%{opacity:0}to{opacity:1}}@keyframes a8cui-TmFIT6{0%{opacity:1}to{opacity:0}}.a8cui--SotkH,.a8cui-ADWpzy,.a8cui-EeHaIG,.a8cui-EmUC2R,.a8cui-IIuJ-M,.a8cui-KQdZhf,.a8cui-m-aGE6,.a8cui-q2hElq{animation-duration:0s;animation-fill-mode:forwards;animation-timing-function:cubic-bezier(.4,0,.2,1)}@media not (prefers-reduced-motion){.a8cui--SotkH,.a8cui-ADWpzy,.a8cui-EeHaIG,.a8cui-EmUC2R,.a8cui-IIuJ-M,.a8cui-KQdZhf,.a8cui-m-aGE6,.a8cui-q2hElq{animation-duration:.3s}}.a8cui-EmUC2R,.a8cui-gPJt-U[dir=rtl] .a8cui-EeHaIG{animation-name:a8cui-tirChk}.a8cui-gPJt-U[dir=rtl] .a8cui-m-aGE6,.a8cui-q2hElq{animation-name:a8cui-C-6W5i}.a8cui-EeHaIG,.a8cui-gPJt-U[dir=rtl] .a8cui-EmUC2R{animation-name:a8cui-xlTpyU}.a8cui-gPJt-U[dir=rtl] .a8cui-q2hElq,.a8cui-m-aGE6{animation-name:a8cui-X-0QGP}.a8cui-IIuJ-M{animation-name:a8cui-Dcdew-}.a8cui-ADWpzy{animation-name:a8cui-TmFIT6}.a8cui-KQdZhf{animation-name:a8cui-Dcdew-}.a8cui--SotkH{animation-name:a8cui-TmFIT6}'));
  document.head.appendChild(style);
}
if (typeof document !== "undefined" && true && !document.head.querySelector("style[data-wp-hash='2cfd3c4dba']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "2cfd3c4dba");
  style.appendChild(document.createTextNode(".date-range-popover-content{--wca-popover-padding:var(--wpds-dimension-padding-lg,16px);--wca-popover-border-color:#ddd;--wca-popover-border-width:1px;background-color:var(--wca-popover-border-color);column-gap:var(--wca-popover-border-width);display:grid;grid-template-columns:auto 1fr;grid-template-rows:1fr auto;row-gap:var(--wca-popover-border-width)}.date-range-popover-content .date-range-calendar{align-items:center;display:flex;justify-content:center}.date-range-popover-content--mobile{background-color:#fff;display:flex;flex-direction:column;gap:var(--wpds-dimension-gap-lg,16px);padding:var(--wca-popover-padding)}.date-range-popover-content--mobile .date-range-calendar{--a8c-calendar-button-width:32px;--a8c-calendar-button-height:32px}.date-range-popover-content--mobile .date-range-popover-actions{padding:0;padding-block-start:var(--wpds-dimension-gap-sm,8px)}.date-range-presets-wrapper{background-color:#fff;display:grid;grid-row:1;grid-template-columns:minmax(0,max-content) 1fr;padding-bottom:var(--wpds-dimension-gap-sm,8px);padding-right:var(--wpds-dimension-padding-sm,8px);width:calc(var(--wpds-dimension-base, 4px)*60)}.date-filters-panel-button{background-color:#fff}.date-range-calendar-wrapper{--wca-calendar-button-width:32px;--wca-calendar-button-height:32px;--wca-calendar-button-gap:1rem;--wca-calendar-padding:var(--wca-popover-padding);--wca-calendar-width:calc(var(--wca-calendar-button-width)*7 + var(--wca-calendar-padding)*2);--wca-calendar-width-wide:calc(var(--wca-calendar-button-width)*14 + var(--wca-calendar-padding)*2 + var(--wca-calendar-button-gap));background-color:#fff;grid-row:1;padding:var(--wca-calendar-padding);width:var(--wca-calendar-width)}.date-range-calendar-wrapper .date-range-calendar{--a8c-calendar-button-width:var(--wca-calendar-button-width);--a8c-calendar-button-height:var(--wca-calendar-button-height)}.date-range-calendar-wrapper__wide{width:var(--wca-calendar-width-wide)}.date-range-popover-actions{background-color:#fff;grid-column:1/-1;padding:calc(var(--wca-popover-padding)/2) var(--wca-popover-padding)}@media not (prefers-reduced-motion:reduce){.date-filters-panel__popover{view-transition-name:jp-premium-analytics--date-range-popover}}::view-transition-group(jp-premium-analytics--date-range-popover){z-index:3000}::view-transition-new(jp-premium-analytics--date-range-popover),::view-transition-old(jp-premium-analytics--date-range-popover){animation:none}"));
  document.head.appendChild(style);
}
var { Menu: Menu3 } = unlock(import_components3.privateApis);
var MOBILE_CONTAINER_WIDTH_THRESHOLD = 480;
function getDisplayedMonth(range) {
  return range?.from ?? /* @__PURE__ */ new Date();
}
function DateRangePopoverActions({
  onCancel,
  onApply,
  canApply
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
    Stack,
    {
      direction: "row",
      gap: "sm",
      align: "end",
      justify: "end",
      className: "date-range-popover-actions",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Button4, { variant: "minimal", size: "compact", onClick: onCancel, children: (0, import_i18n9.__)("Cancel", "jetpack-premium-analytics") }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Button4, { variant: "solid", size: "compact", disabled: !canApply, onClick: onApply, children: (0, import_i18n9.__)("Apply", "jetpack-premium-analytics") })
      ]
    }
  );
}
function DateRangePresetsDropdown({
  value,
  onRangeChange,
  presets: presetsProp,
  timeZone
}) {
  const defaultPresets = (0, import_react43.useMemo)(
    () => presetsProp ? [] : getDefaultDateRangePresets(timeZone),
    [presetsProp, timeZone]
  );
  const presets = presetsProp || defaultPresets;
  const options = (0, import_react43.useMemo)(
    () => [
      ...presets.map(({ id, label }) => ({
        value: id,
        label
      })),
      {
        value: PRESET_CUSTOM,
        label: (0, import_i18n9.__)("Custom range", "jetpack-premium-analytics")
      }
    ],
    [presets]
  );
  const handleChange = (0, import_react43.useCallback)(
    (selectedValue) => {
      const preset = presets.find((p) => p.id === selectedValue);
      if (preset) {
        onRangeChange(preset.range, preset.id);
      }
    },
    [presets, onRangeChange]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    import_components3.SelectControl,
    {
      __next40pxDefaultSize: true,
      value: value ?? PRESET_CUSTOM,
      options,
      onChange: handleChange
    }
  );
}
function DateRangePopoverContent({
  presetId,
  range,
  onChange,
  onApply,
  onCancel,
  canApply,
  isWideScreen = false,
  isMobile = false,
  timeZone
}) {
  const [displayedMonth, setDisplayedMonth] = (0, import_react43.useState)(getDisplayedMonth(range));
  const handleChange = (nextRange, nextPrimaryPresetId) => {
    if (nextRange) {
      setDisplayedMonth(getDisplayedMonth(nextRange));
    }
    const effectivePrimaryPresetId = nextPrimaryPresetId ?? PRESET_CUSTOM;
    onChange(nextRange, effectivePrimaryPresetId);
  };
  if (isMobile) {
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "date-range-popover-content date-range-popover-content--mobile", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
        DateRangePresetsDropdown,
        {
          value: presetId ?? null,
          onRangeChange: handleChange,
          timeZone
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(DateRangeInput, { range, onChange: handleChange, timeZone }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
        DateRangeCalendar,
        {
          className: "date-range-calendar",
          selected: range,
          onSelect: (nextRange) => handleChange(nextRange),
          numberOfMonths: 1,
          month: displayedMonth,
          onMonthChange: setDisplayedMonth,
          timeZone
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(DateRangePopoverActions, { onCancel, onApply, canApply })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "date-range-popover-content", children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "date-range-presets-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Menu3, { open: true, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      DateRangePresets,
      {
        value: presetId ?? null,
        onRangeChange: handleChange,
        timeZone
      }
    ) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
      Stack,
      {
        className: clsx_default("date-range-calendar-wrapper", {
          "date-range-calendar-wrapper__wide": isWideScreen
        }),
        gap: "lg",
        direction: "column",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(DateRangeInput, { range, onChange: handleChange, timeZone }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
            DateRangeCalendar,
            {
              className: "date-range-calendar",
              selected: range,
              onSelect: (nextRange) => handleChange(nextRange),
              numberOfMonths: isWideScreen ? 2 : 1,
              month: displayedMonth,
              onMonthChange: setDisplayedMonth,
              timeZone
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(DateRangePopoverActions, { onCancel, onApply, canApply })
  ] });
}
var WIDE_CONTAINER_THRESHOLD = 780;
function DateRangePopover({
  presetId,
  range,
  onChange,
  onApply,
  onCancel,
  canApply,
  timeZone,
  containerElement
}) {
  const [containerWidth, setContainerWidth] = (0, import_react43.useState)(null);
  const handleResize = (0, import_react43.useCallback)((entries) => {
    const entry = entries[0];
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);
  const setObserverRef = (0, import_compose.useResizeObserver)(handleResize);
  (0, import_react43.useEffect)(() => {
    const element = containerElement ?? document.body;
    setObserverRef(element);
  }, [containerElement, setObserverRef]);
  const isMobile = containerWidth !== null && containerWidth < MOBILE_CONTAINER_WIDTH_THRESHOLD;
  const isWideScreen = containerWidth !== null && containerWidth >= WIDE_CONTAINER_THRESHOLD;
  const presetLabel = getPresetLabel(presetId);
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
    import_components3.Dropdown,
    {
      popoverProps: {
        className: "date-filters-panel__popover"
      },
      renderToggle: ({ onToggle }) => /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
        Button4,
        {
          className: "date-filters-panel-button",
          variant: "outline",
          tone: "neutral",
          onClick: onToggle,
          size: "compact",
          id: "date-range-popover-button",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Button4.Icon, { icon: calendar_default, size: 16 }),
            presetLabel && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Badge, { children: presetLabel }),
            formatDateRange(range)
          ]
        }
      ),
      renderContent: ({ onClose }) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
        DateRangePopoverContent,
        {
          presetId,
          range,
          onChange,
          onApply: () => {
            onApply();
            onClose();
          },
          onCancel: () => {
            onCancel();
            onClose();
          },
          canApply,
          isWideScreen,
          isMobile,
          timeZone
        }
      )
    }
  );
}

// packages/ui/build-module/use-comparison-date-presets/use-comparison-date-presets.mjs
var import_react44 = __toESM(require_react(), 1);
function useComparisonDatePresets(referenceRange) {
  return (0, import_react44.useMemo)(() => {
    if (!referenceRange.from || !referenceRange.to) {
      return [];
    }
    return getComparisonPresetConfigs().map(({ id, label }) => {
      const range = getComparisonRangeFromPreset(referenceRange, id);
      return range ? { id, label, range } : null;
    }).filter((preset) => preset !== null);
  }, [referenceRange]);
}

// packages/ui/build-module/date-filters-panel/date-filters-panel.mjs
var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
function DateFiltersPanel({
  presetId,
  range,
  comparisonPresetId,
  onChange,
  onComparisonChange,
  rangeControlProps = {
    label: null,
    help: null
  },
  comparisonControlProps = {
    label: null,
    help: null
  },
  onApply,
  onCancel,
  canApply = true,
  timeZone,
  containerElement
}) {
  const validatedPresetId = (0, import_react45.useMemo)(() => {
    if (!presetId) {
      return void 0;
    }
    return isPrimaryPreset(presetId) ? presetId : void 0;
  }, [presetId]);
  const validatedComparisonPresetId = (0, import_react45.useMemo)(() => {
    return isComparisonPresetId(comparisonPresetId) ? comparisonPresetId : void 0;
  }, [comparisonPresetId]);
  const comparisonEnabled = !!validatedComparisonPresetId;
  const presets = useComparisonDatePresets(range);
  const defaultPresetId = (0, import_react45.useMemo)(() => {
    return presets.find((p) => p.id === "previous-period")?.id ?? presets.find((p) => p.id === "previous-month")?.id ?? presets[0]?.id;
  }, [presets]);
  const preset = (0, import_react45.useMemo)(() => {
    const id = validatedComparisonPresetId ?? defaultPresetId;
    return id ? presets.find((p) => p.id === id) : void 0;
  }, [presets, validatedComparisonPresetId, defaultPresetId]);
  const presetChange = (0, import_react45.useCallback)(
    (id) => {
      const nextPreset = presets.find((p) => p.id === id);
      onComparisonChange(nextPreset?.range, id);
    },
    [onComparisonChange, presets]
  );
  const clearComparison = (0, import_react45.useCallback)(() => {
    onComparisonChange(void 0, void 0);
  }, [onComparisonChange]);
  const handleEnable = (0, import_react45.useCallback)(() => {
    const presetIdToUse = validatedComparisonPresetId ?? defaultPresetId;
    if (preset?.range && presetIdToUse) {
      onComparisonChange(preset.range, presetIdToUse);
    }
  }, [onComparisonChange, preset, validatedComparisonPresetId, defaultPresetId]);
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(Stack, { gap: "sm", wrap: "wrap", children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      import_components4.BaseControl,
      {
        label: rangeControlProps.label,
        id: "date-range-popover-button",
        help: rangeControlProps.help,
        children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          DateRangePopover,
          {
            presetId: validatedPresetId,
            range,
            onChange,
            onApply,
            onCancel,
            canApply,
            timeZone,
            containerElement
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      import_components4.BaseControl,
      {
        label: comparisonControlProps.label,
        id: "date-comparison-dropdown-button",
        help: comparisonControlProps.help,
        children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          DateComparisonDropdown,
          {
            presets,
            enabled: comparisonEnabled,
            presetId: validatedComparisonPresetId,
            removeCompareToPrefix: !!comparisonControlProps.label,
            onEnable: handleEnable,
            onPresetChange: presetChange,
            onClear: clearComparison
          }
        )
      }
    )
  ] });
}
export {
  DateFiltersPanel
};
//# sourceMappingURL=index.js.map
