"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pascalfy(str) {
    return str
        .split('-')
        .map(w => w[0].toUpperCase() + w.slice(1))
        .reduce((acc, curr) => `${acc}${curr}`);
}
exports.pascalfy = pascalfy;
function upperfy(str) {
    return str.toUpperCase().replace('-', '_');
}
exports.upperfy = upperfy;
//# sourceMappingURL=utils.js.map