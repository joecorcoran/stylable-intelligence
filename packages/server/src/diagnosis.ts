import { StylableMeta } from 'stylable/dist/src/stylable-processor';
import { Diagnostic, Range, DiagnosticSeverity } from 'vscode-languageserver-types/lib/main';
import { TextDocument } from 'vscode-languageserver-types/lib/main';
// import {NodeSource} from 'postcss'
import * as path from 'path';
import { safeParse, Diagnostics, process as stylableProcess, StylableTransformer, FileProcessor } from 'stylable';
import { Diagnostic as Report } from 'stylable/src/diagnostics'

export function createDiagnosis(doc: TextDocument, fp: FileProcessor<StylableMeta>): Diagnostic[] {
    if (!doc.uri.endsWith('.st.css')) { return [] };

    let file: string;
    if (process.platform === 'win32') {
        file = doc.uri.replace('file:///', '')
    } else {
        file = doc.uri.replace('file://', '')
    }

    file = decodeURIComponent(file);

    let transformer = new StylableTransformer({
        diagnostics: new Diagnostics(),
        fileProcessor: fp,
        requireModule: () => ({ "default": {} })
    })

    let docPostCSSRoot = safeParse(doc.getText(), { from: path.resolve(file) })
    let meta = stylableProcess(docPostCSSRoot)

    fp.add(file, meta);
    transformer.transform(meta)
    return meta.diagnostics.reports.concat(meta.transformDiagnostics ? meta.transformDiagnostics.reports : [])
        .map(reportToDiagnostic)
}

//stylable diagnostic to protocol diagnostic
function reportToDiagnostic(report: Report) {
    let severity = report.type === 'error' ? DiagnosticSeverity.Error : DiagnosticSeverity.Warning
    let range = createRange(report)
    return Diagnostic.create(range, report.message, severity)
}

function createRange(report: Report) {
    let source = report.node.source
    let start = { line: 0, character: 0 }
    let end = { line: 0, character: 0 }
    if (report.options.word && source) {
        let lines: string[] = (source.input as any).css.split('\n')
        const searchStart = source.start!.line - 1
        const searchEnd = source.end!.line - 1
        for (var i = searchStart; i <= searchEnd; ++i) {
            const wordIndex = lines[i].indexOf(report.options.word!)
            if (!!~wordIndex) {
                start.line = i
                start.character = wordIndex
                end.line = i
                end.character = wordIndex + report.options.word!.length
                break
            }
        }
    } else if (source) {
        start.line = source.start!.line - 1
        start.character = source.start!.column - 1
        end.line = source.end!.line - 1
        end.character = source.end!.column
    }
    return Range.create(start, end)
}
