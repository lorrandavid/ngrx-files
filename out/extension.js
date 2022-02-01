"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = require("./models/files");
const util_1 = require("./enums/util");
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const Mustache = require("mustache");
const utils = require("./utils");
const slugify_1 = require("slugify");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.scaffoldNgrxFiles', (args) => __awaiter(this, void 0, void 0, function* () {
        const { fsPath } = args;
        const key = yield vscode.window.showInputBox({ placeHolder: 'Ex: user-permissions', prompt: 'Type the name of the new state key' });
        if (key) {
            run(slugify_1.default(key), fsPath);
        }
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
/**
 * Run application
 * @param key
 * @param fsPath
 */
function run(key, fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = updateFilesNameTemplate(key);
        yield generateDirectory(key, fsPath);
        generateFiles(key, fsPath, files);
    });
}
/**
 * Fill name according to value typed by User and render Mustache template assigning all the variables
 * @param key
 */
function updateFilesNameTemplate(key) {
    return files_1.Files.map(file => {
        const variables = { pascalTitle: utils.pascalfy(key), upperTitle: utils.upperfy(key), lowerTitle: utils.camelfy(key) };
        return Object.assign({}, file, {
            name: file.name.replace(util_1.UtilEnum.PLACEHOLDER, key),
            content: Mustache.render(getTemplate(file.type), variables)
        });
    });
}
/**
 * Get template file as a string
 * @param type
 */
function getTemplate(type) {
    const templatesPath = path.join(__dirname, 'templates');
    const filePath = path.join(templatesPath, `${type}.mst`);
    return fs.readFileSync(filePath, 'utf-8');
}
/**
 * Generate directory if it doesn't exist
 * @param key
 * @param fsPath
 */
function generateDirectory(key, fsPath) {
    const desiredPath = path.join(path.normalize(fsPath), key);
    return fs.mkdir(desiredPath, {}, (err) => {
        if (err) {
            vscode.window.showErrorMessage('File(s) could not be created. State already exists in the current directory.');
            throw err;
        }
    });
}
/**
 * Generate actions, reducer, effects, selectors and barrel files for the desired state key
 * @param key
 * @param fsPath
 * @param files
 */
function generateFiles(key, fsPath, files) {
    files.forEach(file => {
        const filePath = path.join(path.normalize(fsPath), key, file.name);
        fs.writeFile(filePath, file.content, (err) => {
            if (err) {
                vscode.window.showErrorMessage('File(s) could not be created.');
                throw err;
            }
            vscode.window.showInformationMessage('File(s) created successfully.');
        });
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map