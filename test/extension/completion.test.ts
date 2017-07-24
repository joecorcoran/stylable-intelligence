//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import {StylableDotCompletionProvider} from '../../src/extension';
import * as path from 'path';
// Defines a Mocha test suite to group tests of similar kind together
function testCompletion(fileName:string,testCases:[vscode.Position, string[]][]){
    const provider = new StylableDotCompletionProvider();

    return vscode.workspace.openTextDocument(path.join(__dirname,'..','..','..','test','extension',fileName)).then((textDocument)=>{
        return vscode.window.showTextDocument(textDocument).then(editor => {
            let promises = testCases.map(([position, expected]) =>
                provider.provideCompletionItems(editor.document, position, null).then(items => {
                    let labels = items.map(x => x.label);
                    for (let entry of expected) {
                        if (labels.indexOf(entry) < 0) {
                            assert.fail('', entry, 'missing expected item in competion list', '');
                        }
                    }
                })
            );
            return Promise.all(promises);
        });
    })
}

suite("Extension Tests", () => {

    test("simple completion", () => {
        const provider = new StylableDotCompletionProvider();
        const testCases: [vscode.Position, string[]][] = [
			[new vscode.Position(0, 0), [':import','.root']]
        ];
        return testCompletion('simple-completion.css',testCases);

    });
    test("advanced completion", () => {
        const provider = new StylableDotCompletionProvider();
        const testCases: [vscode.Position, string[]][] = [
			[new vscode.Position(10, 6), ['shmover','bover']]
		];
        return testCompletion('advanced-completion.css',testCases);
    });
});
