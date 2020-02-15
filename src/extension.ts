import { Files } from './models/files';
import { UtilEnum } from './enums/util';

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as utils from './utils';
import slugify from 'slugify';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.scaffoldNgrxFiles', async args => {
		const { fsPath } = args;
		const key = await vscode.window.showInputBox({ placeHolder: 'Ex: user-permissions', prompt: 'Type the name of the new state key' });

		if (key) {
			run(slugify(key), fsPath);
		}
	});

	context.subscriptions.push(disposable);
}

/**
 * Run application
 * @param key 
 * @param fsPath 
 */
async function run(key: string, fsPath: string) {
	const files = updateFilesNameTemplate(key);

	await generateDirectory(key, fsPath);
	await generateFiles(key, fsPath, files);
}

/**
 * Fill name according to value typed by User and render Mustache template assigning all the variables
 * @param key 
 */
function updateFilesNameTemplate(key: string) {
	return Files.map(file => {
		return Object.assign({}, file, {
			name: file.name.replace(UtilEnum.PLACEHOLDER, key),
			content: Mustache.render(getTemplate(file.type), { pascalTitle: utils.pascalfy(key), upperTitle: utils.upperfy(key), lowerTitle: key })
		});
	});
}

/**
 * Get template file as a string
 * @param type 
 */
function getTemplate(type: string) {
	const templatesPath = path.join(__dirname, 'templates');
	const filePath = path.join(templatesPath, `${type}.mst`);

	return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Generate directory if it doesn't exist
 * @param key 
 * @param fsPath 
 */
function generateDirectory(key: string, fsPath: string) {
	const desiredPath = path.join(path.normalize(fsPath), key);

	fs.mkdir(desiredPath, {}, (err) => {
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
function generateFiles(key: string, fsPath: string, files: Array<any>) {
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

export function deactivate() {}