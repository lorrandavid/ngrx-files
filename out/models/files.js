"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_types_1 = require("./../enums/file-types");
const util_1 = require("./../enums/util");
exports.Files = [
    { name: `${util_1.UtilEnum.PLACEHOLDER}.actions.ts`, type: file_types_1.FileTypes.ACTIONS, content: '' },
    { name: `${util_1.UtilEnum.PLACEHOLDER}.reducer.ts`, type: file_types_1.FileTypes.REDUCER, content: '' },
    { name: `${util_1.UtilEnum.PLACEHOLDER}.effects.ts`, type: file_types_1.FileTypes.EFFECTS, content: '' },
    { name: `${util_1.UtilEnum.PLACEHOLDER}.selectors.ts`, type: file_types_1.FileTypes.SELECTORS, content: '' },
    { name: 'index.ts', type: file_types_1.FileTypes.BARREL, content: '' }
];
//# sourceMappingURL=files.js.map