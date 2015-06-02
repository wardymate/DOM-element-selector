var $ = function (selector) {
  var elements = [];
  var selectors = [];

  if(selector.includes('.') || selector.includes('#')) {
    selectors = selector.replace('.',',.').replace('#',',#').split(',').filter(Boolean);
  } else {
    elements = document.getElementsByTagName(selector);
    return elements;
  }

  if (selectors.length === 1) {
    var propertyName = selectors[0].slice(1);
    if(selectors[0].includes('#')) {
      elements.push(document.getElementById(propertyName));
      return elements;
    } else {
      elements = document.getElementsByClassName(propertyName);
      return elements;
    }
  } else if (selectors.length === 2) {
    elements = document.getElementsByTagName(selectors[0]);
  } else {
    elements = document.getElementsByTagName(selectors[0]);
    var arr = [].slice.call(elements);
    console.log(arr);
    hasClass = function(element) {
      return element.className != '';
    };
    elements = arr.filter(hasClass);
  }
  return elements;
};
