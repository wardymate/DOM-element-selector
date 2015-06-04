var $ = function (selector) {
  var elements = [];
  var selectors = [];

  if (!String.prototype.includes) {
    String.prototype.includes = function() {'use strict';
      return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
  }

  if (!Array.prototype.filter) {
    addArrayFilter();
  }

  if(selectorIncludesClassOrId(selector)) {
    selectors = selector.replace('.',',.').replace('#',',#').split(',').filter(Boolean);
  } else {
    elements = document.getElementsByTagName(selector);
    return elements;
  }

  if (selectors.length === 1) {
    selectIdOrClass(selectors);
  } else if (selectors.length === 2) {
    elements = document.getElementsByTagName(selectors[0]);
  } else {
    elements = document.getElementsByTagName(selectors[0]);
    selectors.shift();
    selectors.sort();
    var arr = [].slice.call(elements);
    var requiredId = selectors[0].slice(1);
    var requiredClass = selectors[1].slice(1);

    hasId = function(element) {
      return element.id === requiredId;
    };

    hasClass = function(element) {
      return element.className === requiredClass;
    };
    elements = arr.filter(hasId).filter(hasClass);
    console.log(elements);
  }

  function selectorIncludesClassOrId(selector) {
    return selector.includes('.') || selector.includes('#');
  }

  function selectIdOrClass(selectors) {
    var propertyName = selectors[0].slice(1);
    selectors[0].includes('#') ? selectId(propertyName) : selectClass(propertyName);
  }

  function selectId(propertyName) {
    elements[0] = document.getElementById(propertyName);
  }

  function selectClass(propertyName) {
    elements = document.getElementsByClassName(propertyName);
  }
  return elements;
};

addArrayFilter = function () {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }
    return res;
  };
};
