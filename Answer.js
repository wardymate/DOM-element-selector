var $ = function (selector) {
  var elements = [];
  var selectors = [];

  if(selector.includes('.') || selector.includes('#')) {
    var string = selector.replace('.',',.').replace('#',',#');
    selectors = string.split(',').filter(Boolean);
  } else {
    elements = document.getElementsByTagName(selector);
    return elements;
  }
  // console.log(selectors);

  if (selectors.length === 1) {
    var propertyName = selectors[0].slice(1);
    if(selectors[0].includes('#')) {
      elements.push(document.getElementById(propertyName));
    } else {
      elements = document.getElementsByClassName(propertyName);
    }
  } else if (selectors.length === 2) {
    elements = document.getElementsByTagName(selectors[0]);
  } else {
    elements = document.getElementsByTagName(selectors[0]);
    console.log(selector);
  }

  return elements;
};
