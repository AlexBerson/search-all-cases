// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { camelCase, pascalCase, snakeCase } from 'change-case';

interface IFindInFilesArgs {
	query?: string;
	replace?: string;
	preserveCase?: boolean;
	triggerSearch?: boolean;
	filesToInclude?: string;
	filesToExclude?: string;
	isRegex?: boolean;
	isCaseSensitive?: boolean;
	matchWholeWord?: boolean;
	useExcludeSettingsAndIgnoreFiles?: boolean;
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('search-all-cases.search', () => {
		const editor = vscode.window.activeTextEditor
		const selection = editor?.selection
		const text = editor?.document.getText(selection)
		if (text == undefined) {
			vscode.commands.executeCommand('workbench.action.findInFiles')
			return;
		}
		const searchText = `${text}|${camelCase(text)}|${pascalCase(text)}|${snakeCase(text)}`
		let params: IFindInFilesArgs = {
			query: searchText,
			isRegex: true,
			triggerSearch: true
		}

		vscode.commands.executeCommand('workbench.action.findInFiles', params)
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}
