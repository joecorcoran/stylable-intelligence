import * as asserters from '../test-kit/asserters';
import { createRange, ProviderRange } from '../src/completion-providers';
import { Completion } from '../src/completion-types';

describe('Custom Selectors', function () {

    describe('Local Selectors', function () {

        const str1 = ':--popo';
        const str2 = ':--pongo';
        const str3 = '::momo';
        const str4 = ':rooroo';
        const str5 = ':state';
        const str6 = ':otherState';
        const createComp = (str: string, rng: ProviderRange, path: string) => asserters.classCompletion(str, rng, true);

        [str1, str2].forEach((str, j, a) => {
            str.split('').forEach((c, i) => {
                let prefix = str.slice(0, i);

                it('should be completed at top level, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(10, 0, 10, 0 + i);
                    return asserters.getCompletions('custom-selectors/local-selector.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, 'custom-selectors/local-selector.st.css'));
                        if (prefix.length <= 5) {
                            exp.push(createComp(a[1 - j], rng, 'custom-selectors/local-selector.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, 'custom-selectors/local-selector.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });

                it('should be completed in complex selectors, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(10, 11, 10, 11 + i);
                    return asserters.getCompletions('custom-selectors/local-selector-complex.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, 'custom-selectors/local-selector-complex.st.css'));
                        if (prefix.length <= 5) {
                            exp.push(createComp(a[1 - j], rng, 'custom-selectors/local-selector-complex.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, 'custom-selectors/local-selector-complex.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });

            });
        });

        [str3, str4].forEach((str, j, a) => {
            str.split('').forEach((c, i) => {
                let prefix = str.slice(0, i);
                it('should have relevant states and pseudo-elements when extending root class, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(16, 8, 16, 8 + i);
                    return asserters.getCompletions('custom-selectors/local-selector-inner-2.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, 'Local file'));
                        if (prefix.length <= 1) {
                            exp.push(createComp(a[1 - j], rng, 'Local file'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, 'Local file'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                })
            });
        });

        [str5, str6].forEach((str, j, a) => {
            str.split('').forEach((c, i) => {
                let prefix = str.slice(0, i);
                it('should have relevant states when extending local class, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(16, 8, 16, 8 + i);
                    return asserters.getCompletions('custom-selectors/local-selector-inner.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, 'Local file'));
                        if (prefix.length <= 1) {
                            exp.push(createComp(a[1 - j], rng, 'Local file'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, 'Local file'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                })
            });
        });

    });

    describe('Local Selectors with imported type', function () {

        const str1 = ':state';
        const str2 = ':otherState';
        const str3 = '::momo';
        const str4 = '::shlomo';


        [str1, str2].forEach((str, j, a) => {
            str.split('').forEach((c, i) => {
                let prefix = str.slice(0, i);
                const createComp = (str: string, rng: ProviderRange, path: string) => asserters.stateCompletion(str.slice(1), rng, path);

                it('should have relevant states, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(10, 8, 10, 8 + i);
                    return asserters.getCompletions('pseudo-elements/custom-selector-local.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './import.st.css'));
                        if (prefix.length <= 1) {
                            exp.push(createComp(a[1 - j], rng, './import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });
            });
        });

        [str3, str4].forEach((str, j, a) => {
            str.split('').forEach((c, i) => {
                const createComp = (str: string, rng: ProviderRange, path: string) => asserters.pseudoElementCompletion(str.slice(2), rng, path);
                let prefix = str.slice(0, i);

                it('should have relevant pseudo-elements, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(10, 8, 10, 8 + i);
                    return asserters.getCompletions('pseudo-elements/custom-selector-local.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './import.st.css'));
                        if (prefix.length <= 2) {
                            exp.push(createComp(a[1 - j], rng, './import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });
            });
        });
    });

    describe('Imported Selectors', function () {

        const str1 = '::mongo';
        const str2 = '::pongo';
        const str3 = ':state';
        const str4 = ':otherState';
        const str5 = '::momo';
        const str6 = '::shlomo';
        const createComp = (str: string, rng: ProviderRange, path: string) => asserters.pseudoElementCompletion(str.slice(2), rng, path);

        [str1, str2].forEach((str, j, a) => {
            str.split('').forEach((c, i) => {
                let prefix = str.slice(0, i);

                it('should be completed at top level after extending class, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 5, 9, 5 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-extended.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './import.st.css'));
                        if (prefix.length <= 2) {
                            exp.push(createComp(a[1 - j], rng, './import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });

                it('should be completed at top level after extending root class, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 5, 9, 5 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-extended-on-root.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './import.st.css'));
                        if (prefix.length <= 2) {
                            exp.push(createComp(a[1 - j], rng, './import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });

                it('should be completed at top level after default import as tag, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 4, 9, 4 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-as-tag.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './import.st.css'));
                        if (prefix.length <= 2) {
                            exp.push(createComp(a[1 - j], rng, './import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                })
            });
        });

        [str3, str4].forEach((str, j, a) => {
            str.split('').forEach((c, i) => {
                let prefix = str.slice(0, i);
                const createComp = (str: string, rng: ProviderRange, path: string) => asserters.stateCompletion(str.slice(1), rng, path);

                it('should have relevant states, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 12, 9, 12 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-inner.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './top-import.st.css'));
                        if (prefix.length <= 1) {
                            exp.push(createComp(a[1 - j], rng, './top-import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './top-import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });

                it('should have relevant states after root, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 12, 9, 12 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-on-root-inner.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './top-import.st.css'));
                        if (prefix.length <= 1) {
                            exp.push(createComp(a[1 - j], rng, './top-import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './top-import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });

                it('should not have states when custom selector is grouped, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 12, 9, 12 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-grouped.st.css', prefix).then((asserter) => {
                        let notExp: Partial<Completion>[] = [];

                        notExp.push(createComp(str3, rng, './top-import.st.css'));
                        notExp.push(createComp(str4, rng, './top-import.st.css'));

                        asserter.notSuggested(notExp);
                    });
                });
            });
        });

        [str5, str6].forEach((str, j, a) => {
            str.split('').forEach((c, i) => {
                const createComp = (str: string, rng: ProviderRange, path: string) => asserters.pseudoElementCompletion(str.slice(2), rng, path);
                let prefix = str.slice(0, i);

                it('should have relevant pseudo-elements, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 12, 9, 12 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-inner.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './top-import.st.css'));
                        if (prefix.length <= 2) {
                            exp.push(createComp(a[1 - j], rng, './top-import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './top-import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });

                it('should have relevant pseudo-elements after root, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 12, 9, 12 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-on-root-inner.st.css', prefix).then((asserter) => {
                        let exp: Partial<Completion>[] = [];
                        let notExp: Partial<Completion>[] = [];

                        exp.push(createComp(a[j], rng, './top-import.st.css'));
                        if (prefix.length <= 2) {
                            exp.push(createComp(a[1 - j], rng, './top-import.st.css'));
                        } else {
                            notExp.push(createComp(a[1 - j], rng, './top-import.st.css'));
                        }

                        asserter.suggested(exp);
                        asserter.notSuggested(notExp);
                    });
                });

                it('should not have pseudo-elements when custom selector is grouped, with prefix ' + prefix + ' ', function () {
                    let rng = createRange(9, 12, 9, 12 + i);
                    return asserters.getCompletions('custom-selectors/imported-selector-grouped.st.css', prefix).then((asserter) => {
                        let notExp: Partial<Completion>[] = [];

                        notExp.push(createComp(str5, rng, './top-import.st.css'));
                        notExp.push(createComp(str6, rng, './top-import.st.css'));

                        asserter.notSuggested(notExp);
                    });
                });

            });
        });
    });

    // describe('Nested Custom Selectors', function () {

    // })
});
