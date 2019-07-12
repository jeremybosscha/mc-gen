// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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
		vscode.window.showInformationMessage('Hello World!');
		// const quickpicks = [new vscode.QuickInputButtons()]
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = getQuickPicks();
		quickPick.show();


	});

	context.subscriptions.push(disposable);
}

function getQuickPicks(): Array<vscode.QuickPickItem> {
	let list = [];
	const pageItem: vscode.QuickPickItem = {
		'description': 'Page',
		'detail': 'src/pages/',
		'label': 'Generate a page'
	};
	const serviceItem: vscode.QuickPickItem = {
		'description': 'Service',
		'detail': 'src/services/',
		'label': 'Generate a service'
	};
	const moduleItem: vscode.QuickPickItem = {
		'description': 'Module',
		'detail': 'src/modules/',
		'label': 'Generate a module'
	};
	const sharedModuleItem: vscode.QuickPickItem = {
		'description': 'Shared module',
		'detail': 'src/sharedModules',
		'label': 'Generate a shared module'
	};

	const entityItem: vscode.QuickPickItem = {
		'description': 'Entity',
		'detail': 'src/entities',
		'label': 'Generate an entity'
	};

	list.push(pageItem);
	list.push(serviceItem);
	list.push(moduleItem);
	list.push(sharedModuleItem);
	list.push(entityItem);

	return list;
}

// this method is called when your extension is deactivated
export function deactivate() { }
