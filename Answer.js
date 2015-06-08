var $ = function (selector) {
  var elements = [];
  var selectors = [];

  if (!String.prototype.includes) {
    addStringInclude();
  }

  if (!Array.prototype.filter) {
    addArrayFilter();
  }

  if (!Array.prototype.indexOf) {
    addArrayIndexOf();
  }

  if (!Document.getElementsByClassName) {
    addDocumentGetElementsByClassName();
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
    shiftAndSort(selectors);
  } else {
    elements = document.getElementsByTagName(selectors[0]);
    shiftAndSort(selectors);
    elements = filterElements(elements, selectors);
  }

  function shiftAndSort(selectors) {
    selectors.shift();
    selectors.sort();
  }

  function filterElements(elements, selectors) {
    var arr = [].slice.call(elements);
    var requiredId = selectors[0].slice(1);
    var requiredClass = selectors[1].slice(1);
    hasId = function(element) {
      return element.id === requiredId;
    };
    hasClass = function(element) {
      return element.className === requiredClass;
    };
    elements = arr.filter(hasId);
    elements.filter(hasClass);
    return elements;
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

addStringInclude = function() {
  String.prototype.includes = function() {'use strict';
      return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
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

addArrayIndexOf = function() {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;
    if (this === null) {
      throw new TypeError('"this" is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
};

addDocumentGetElementsByClassName = function () {
  document.getElementsByClassName = function (className) {
    var result = [];
    var elements = document.getElementsByTagName('*');
    var len = elements.length;
    var i;
    var node;
    for (i = 0; i < len; i += 1) {
      node = elements[i];
      if ((' ' + (node.className || node.getAttribute('class')) + ' ').indexOf(' ' + className + ' ') >= 0) {
        result.push(node);
      }
    }
    return result;
  };
};