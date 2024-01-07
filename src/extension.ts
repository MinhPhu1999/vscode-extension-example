import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Register the command
	let disposable = vscode.commands.registerCommand(
		'helloworld.myCustomCommand',
		() => {
			// Implement the functionality you want to execute when the command is triggered
			vscode.window.showInformationMessage(
				'My Custom Command was executed!',
			);
		},
	);

	let disposableSelectText = vscode.commands.registerCommand(
		'helloworld.selectText',
		() => {
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				const document = editor.document;
				const selection = editor.selection;

				const selectedText = document.getText(selection);

				if (!selectedText) {
					vscode.window.showErrorMessage('Please select text first');
					return;
				}

				try {
					// Parse the selected text as JSON
					const parsedJson = JSON.parse(selectedText);

					// Format the parsed JSON with 2-space indentation
					const formattedJson = JSON.stringify(parsedJson, null, 2);

					// Replace the selected text with the formatted JSON
					editor.edit(editBuilder => {
						editBuilder.replace(selection, formattedJson);
					});

					vscode.window.showInformationMessage(
						'Selected JSON text formatted successfully.',
					);
				} catch (error) {
					vscode.window.showErrorMessage(
						'Failed to format selected text as JSON.',
					);
				}
			} else {
				vscode.window.showErrorMessage('No active text editor found.');
			}
		},
	);

	let disposableFormatFileJson = vscode.commands.registerCommand(
		'helloworld.formatJson',
		() => {
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				const languageFile = editor.document.languageId;

				if (languageFile !== 'json') {
					vscode.window.showErrorMessage(
						'Your file is not JSON file, please open a new file JSON',
					);
					return;
				}

				const document = editor.document;
				const jsonContent = document.getText();
				let formattedJson;

				if (!jsonContent) {
					vscode.window.showErrorMessage(
						'Your file JSON is empty, please select file to format first',
					);
					return;
				}

				try {
					const jsonObject = JSON.parse(jsonContent);
					formattedJson = JSON.stringify(jsonObject, null, 2); // Indent with 2 spaces

					const edit = new vscode.WorkspaceEdit();
					edit.replace(
						document.uri,
						new vscode.Range(0, 0, document.lineCount, 0),
						formattedJson,
					);

					vscode.workspace.applyEdit(edit).then(success => {
						if (success) {
							vscode.window.showInformationMessage(
								'JSON formatted successfully!',
							);
						} else {
							vscode.window.showErrorMessage(
								'Failed to format JSON.',
							);
						}
					});
				} catch (error) {
					vscode.window.showErrorMessage(
						'Failed to format JSON: Invalid JSON content.',
					);
				}
			} else {
				vscode.window.showErrorMessage(
					'Please open a JSON file to format.',
				);
			}
		},
	);

	let disposableChildItem1 = vscode.commands.registerCommand(
		'helloworld.myChild1',
		() => {
			vscode.window.showInformationMessage('disposableChildItem1');
		},
	);

	let disposableChildItem2 = vscode.commands.registerCommand(
		'helloworld.myChild2',
		() => {
			vscode.window.showInformationMessage('disposableChildItem2');
		},
	);

	context.subscriptions.push(
		disposable,
		disposableSelectText,
		disposableFormatFileJson,
		disposableChildItem1,
		disposableChildItem2,
	);
}

export function deactivate() {}
