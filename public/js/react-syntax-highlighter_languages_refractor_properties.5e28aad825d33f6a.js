"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["react-syntax-highlighter_languages_refractor_properties"],{

/***/ "./node_modules/refractor/lang/properties.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/properties.js ***!
  \***************************************************/
/***/ ((module) => {



module.exports = properties
properties.displayName = 'properties'
properties.aliases = []
function properties(Prism) {
  Prism.languages.properties = {
    comment: /^[ \t]*[#!].*$/m,
    'attr-value': {
      pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
      lookbehind: true
    },
    'attr-name': /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[=:] *| )/m,
    punctuation: /[=:]/
  }
}


/***/ })

}]);