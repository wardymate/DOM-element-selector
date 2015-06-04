# Dom Element Selection prgramming

### Introduction

The task is to create a JavaScript selection engine i.e. a JavaScript function that will return DOM elements given a CSS selector.
The test contains 3 files
Test.html contains the HTML your function will be tested on
Test.js contains a function which will provide results for your answer in the developer console
Answer.js contains a template function that you should change and submit once you have finished  

Rules
* You should only modify and submit Answer.js
* You may not use any JavaScript libraries
* document.querySelector/document.querySelectorAll may not be used

### Approach and learning

I approached the test by trying to solve each of the tests individually using functions available in the ECMAScript 
Language Specification, Edition 5.1. I also included a function (String.includes()) which is proposed for ECMAScript 6 
as I wished to use it a few times and felt that was more readable than using indexOf. For functions not supported by 
earlier browsers I provided the required functions below the $ function in the same file. I learnt a lot abour functions 
and browser compatability during this process. I then refactored my code into smaller function ensuring that all tests 
continued to pass and making the code as readable as possible.

### Installation and viewing the tests

```sh
$ git clone https://github.com/wardymate/DOM-element-selector
$ cd DOM-element-selector
$ open Test.html
```

On the page that opens you can view the tests in your browsers developer console.
