// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { QuickPickItem } from 'vscode';
import { addListener } from 'cluster';
import { SpawnSyncOptionsWithStringEncoding } from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "caress-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.caress-generator', () => {
		// Display a message box to the user
		// const quickpicks = [new vscode.QuickInputButtons()]
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = getQuickPicks();
		quickPick.show();
		quickPick.onDidChangeSelection(() => {
			const selectedItem = quickPick.selectedItems;
			if (selectedItem && selectedItem[0] && selectedItem[0].description) {
				vscode.window.showInputBox({
					prompt: 'Enter the name you want for the new ' + selectedItem[0].description.toLowerCase() + ' above - ',
					placeHolder: 'Give the new ' + selectedItem[0].description.toLowerCase() + ' a name...',
				}).then((name) => {
					if (name) {
						const terminal = getTerminal();
						terminal.sendText(getTerminalCommand(selectedItem[0].description, name, selectedItem[0].detail));
					} else {
						vscode.window.showErrorMessage('No name entered.');
					}
				});
			}
		});
	});

	context.subscriptions.push(disposable);

	function getTerminal() {
		let terminal = vscode.window.activeTerminal;
		if (!terminal) {
			terminal = vscode.window.createTerminal();
		}
		terminal.show();
		return terminal;
	}

	function getTerminalCommand(type?: string, name?: string, path?: string): string {
		let command = '';
		if (type && name && path) {
			command = 'ionic generate ' + type.toLowerCase();
			command += ' ';
			command += path;
			command += name;
		}
		return command;
	}

}

function getQuickPicks(): Array<GeneratorType> {
	let list = [];
	const pageItem: GeneratorType = {
		'description': 'Page',
		'detail': 'pages/',
		'label': 'Generate a page'
	};
	const serviceItem: GeneratorType = {
		'description': 'Service',
		'detail': 'services/',
		'label': 'Generate a service'
	};
	const moduleItem: GeneratorType = {
		'description': 'Module',
		'detail': 'modules/',
		'label': 'Generate a module'
	};
	const sharedModuleItem: GeneratorType = {
		'description': 'Shared module',
		'detail': 'sharedModules/',
		'label': 'Generate a shared module'
	};

	const entityItem: GeneratorType = {
		'description': 'Entity',
		'detail': 'entities/',
		'label': 'Generate an entity'
	};

	list.push(pageItem);
	list.push(serviceItem);
	list.push(moduleItem);
	list.push(sharedModuleItem);
	list.push(entityItem);

	return list;
}

class GeneratorType {
	label: string = '';
	description: string = '';
	detail: string = '';
}

// this method is called when your extension is deactivated
export function deactivate() { }
