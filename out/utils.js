"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Transforms string into PascalCase
 * @param str
 */
function pascalfy(str) {
    return str
        .split('-')
        .map(w => w[0].toUpperCase() + w.slice(1))
        .reduce((acc, curr) => `${acc}${curr}`);
}
exports.pascalfy = pascalfy;
/**
 * Transforms string into Uppercase
 * @param str
 */
function upperfy(str) {
    return str.toUpperCase().replace('-', '_');
}
exports.upperfy = upperfy;
//# sourceMappingURL=utils.js.map