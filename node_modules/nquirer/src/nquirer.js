
import nconfLib from 'nconf';
import inquirer from 'inquirer';

/**
 * @module nquirer
 */

let _questions = [];
let _inquirePromiseCache = null;

/**
 * Reference to nconf instance.
 */
export const nconf = nconfLib;

/**
 * Resolves to nconf configuration.
 * User will be prompted for missing configuration previously specified
 * by the `necessitate` function. Answers automatically set in nconf.
 * @returns {Promise.<nconf>}
 */
export function inquire() {
  if (!_inquirePromiseCache) {

    // find missing questions
    let missingQuestions = [];
    _questions.forEach(question => {
      if (!nconf.get(question.name)) {
        missingQuestions.push(question);
      }
    });

    // no missing questions
    if (missingQuestions.length === 0) {
      _inquirePromiseCache = Promise.resolve(nconf);
    }

    // inquire for missing questions
    else {
      _inquirePromiseCache = inquirer.prompt(missingQuestions).then(answers => {
        for (let key in answers) {
          nconf.set(key, answers[key]);
        }
        return nconf;
      });
    }

  }
  return _inquirePromiseCache;
};

/**
 * Add required configuration options in the form of Inquirer questions.
 * @param {Question[]} questions
 * @see {@link https://github.com/SBoudrias/Inquirer.js/#question|Inquirer Question}
 */
export function necessitate(questions) {
  _questions = [
    ..._questions,
    ...questions.map(question => Object.assign({}, question))
  ];
};

/**
 * Resets nconf configuration and removes all required configuration options.
 */
export function reset() {
  _questions = [];
  _inquirePromiseCache = null;
  nconf.reset();
};

/**
 * Get array of necessary questions.
 * @returns {Question[]}
 */
export function getQuestions() {
  return _questions.map((currentValue) => {
    return Object.assign({}, currentValue);
  });
};
