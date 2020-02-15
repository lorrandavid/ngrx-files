import { FileTypes } from './../enums/file-types';
import { UtilEnum } from './../enums/util';

export const Files = [
    { name: `${UtilEnum.PLACEHOLDER}.actions.ts`, type: FileTypes.ACTIONS, content: '' },
    { name: `${UtilEnum.PLACEHOLDER}.reducer.ts`, type: FileTypes.REDUCER, content: '' },
    { name: `${UtilEnum.PLACEHOLDER}.effects.ts`, type: FileTypes.EFFECTS, content: '' },
    { name: `${UtilEnum.PLACEHOLDER}.selectors.ts`, type: FileTypes.SELECTORS, content: '' },
    { name: 'index.ts', type: FileTypes.BARREL, content: '' }
];