"use strict";

export var showErrorImpl = function (err) {
  return err.stack || err.toString();
};

export var error = function (msg) {
  return new Error(msg);
};

export var message = function (e) {
  return e.message;
};

export var name = function (e) {
  return e.name || "Error";
};

export var stackImpl = function (just) {
  return function (nothing) {
    return function (e) {
      return e.stack ? just(e.stack) : nothing;
    };
  };
};

export var throwException = function (e) {
  return function () {
    throw e;
  };
};

export var catchException = function (c) {
  return function (t) {
    return function () {
      try {
        return t();
      } catch (e) {
        if (e instanceof Error || Object.prototype.toString.call(e) === "[object Error]") {
          return c(e)();
        } else {
          return c(new Error(e.toString()))();
        }
      }
    };
  };
};
