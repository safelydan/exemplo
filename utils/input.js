/**
 * @Module Input
 */

import { DateTime } from 'luxon';
import PromptSync from 'prompt-sync';
import Output from './output.js';

/**
 * Classe que implementa métodos helpers para entrada de dados via console.
 * Utiliza o pacote PromptSync para a entrada de dados.
 *
 * @property {Object} prompt - objeto responsável pela leitura dos dados do console
 * @property {Object} output - objeto responsável pela saída dos dados do console
 *
 * @example Criando um input
 * const input = new Input();
 */
class Input {
    #prompt;
    #output;

    /**
     * @constructor
     */
    constructor() {
        this.#prompt = PromptSync({ sigint: true });
        this.#output = new Output();
    }

    /**
     * Lê uma string do console. Apresenta a mensagem de erro
     * caso a string não esteja nos limites definidos.
     *
     * @example <caption>Lendo um nome com 4 a 50 caracteres</caption>
     * readString("Nome: ", "Nome deve ter de 4 a 50 caracteres", { min: 4, max: 50 })
     *
     * @example <caption>Lendo um endereço com até 50 caracteres</caption>
     * readString("Endereço: ", "Endereço inválido", { max: 50 })
     *
     * @example <caption>Lendo uma string em caixa alta só com vogais</caption>
     * readString("Vogais: ", "Só pode conter vogal", { min: 1, capitalize: true, validChars: "AEIOU" })
     *
     * @param {String} label - Label de entrada
     * @param {String} errorMsg - Mensagem de erro
     * @param {Object} [options] - Opções de validação
     * @param {Number} [options.min=0] - Tamanho mínimo da string
     * @param {Number} [options.max=10000] - Tamanho máximo da string
     * @param {Object} [options.capitalize=false] - Define se converte a string lida em caixa alta
     * @param {String|Array} [options.validChars=null] - String ou Array com os caracteres válidos na string
     * @param {Object} [options.regExp=null] - Expressão regular para validação da string. Se options.validChars for definido ele será executado antes.
     * @param {Object} [options.isValid=null] - Função anônima para validação da string. Se options.validChars ou options.regExp forem definidos eles serão executados antes.
     * @returns {String} A string fornecida pelo usuário
     */
    readString(label, errorMsg, options = {}) {
        const min = options.min || 0;
        const max = options.max || 10000;
        const capitalize = options.capitalize || false;
        const validChars = options.validChars || null;
        const regExp = options.regExp || null;
        const isValid = options.isValid || null;

        for (;;) {
            let data = this.#prompt(label);

            if (capitalize) data = data.toUpperCase();

            if (data.length < min || data.length > max) {
                this.#output.writeLine(errorMsg);
            } else if (
                validChars &&
                [...data].some((c) => !validChars.includes(c))
            ) {
                this.#output.writeLine(errorMsg);
            } else if (regExp && !data.match(regExp)) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(data)) {
                this.#output.writeLine(errorMsg);
            } else {
                return data;
            }
        }
    }

    /**
     * Lê um número inteiro do console. Apresenta a mensagem de erro
     * caso o número informado não esteja nos limites definidos.
     *
     * @example <caption>Lendo uma idade de 0 a 100 anos</caption>
     * readInteger("Idade: ", "Idade inválida", { min: 0, max: 100 })
     *
     * @example <caption>Lendo um código inteiro com 6 dígitos</caption>
     * readInteger("Código: ", "Código inválido", { min: 111111, max: 999999 })
     *
     * @param {String} label - Label de entrada
     * @param {String} errorMsg - Mensagem de erro
     * @param {Object} [options] - Opções de validação
     * @param {Number} [options.min=Number.MIN_SAFE_INTEGER] - Valor mínimo
     * @param {Number} [options.max=Number.MAX_SAFE_INTEGER] - Valor máximo
     * @param {Object} [options.isValid=null] - Função anônima para validação do número. Essa função só será executada se o número estiver dentro dos limites.
     * @returns {Number} Um número inteiro nos limites definidos
     */
    readInteger(label, errorMsg, options = {}) {
        const min = options.min || Number.MIN_SAFE_INTEGER;
        const max = options.max || Number.MAX_SAFE_INTEGER;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);
            const m = data.match(/^([+-]{0,1})\d+$/);
            const num = Number.parseInt(data);

            if (!m || isNaN(num)) {
                this.#output.writeLine(errorMsg);
            } else if (num < min || num > max) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(num)) {
                this.#output.writeLine(errorMsg);
            } else {
                return num;
            }
        }
    }

    /**
     * Lê um número real do console. Apresenta a mensagem de erro
     * caso o número informado não esteja nos limites definidos.
     *
     * @example <caption>Lendo uma nota de 0 a 10 com nenhum ou 1 dígito</caption>
     * readFloat("Nota: ", "Nota inválida", { min: 0, max: 10, maxDecimals: 1 })
     *
     * @example <caption>Lendo um salário de 0.01 a 100000.00 sempre com 2 dígitos</caption>
     * readFloat("Salário: ", "Salário inválido", { min: 0.01, max: 100000, minDecimals: 2, maxDecimals: 2 })
     *
     * @param {String} label - Label da entrada
     * @param {String} errorMsg - Mensagem de erro
     * @param {Object} [options] - Opções de validação
     * @param {Number} [options.min=-Number.MAX_VALUE] - Valor mínimo
     * @param {Number} [options.max=Number.MAX_VALUE] - Valor máximo
     * @param {Number} [options.minDecimals=0] - Quantidade mínima de casas decimais
     * @param {Number} [options.maxDecimals=20] - Quantidade máxima de casas decimais
     * @param {Object} [options.isValid=null] - Função anônima para validação do número. Essa função só será executada se o número estiver dentro dos limites.
     * @returns {Number} Um número real nos limites definidos
     */
    readFloat(label, errorMsg, options = {}) {
        const min = options.min || -Number.MIN_VALUE;
        const max = options.max || Number.MAX_VALUE;
        const minDecimals = options.minDecimals || 0;
        const maxDecimals = options.maxDecimals || 20;
        const isValid = options.isValid || null;

        for (;;) {
            let decimalPlaces = 0;

            const data = this.#prompt(label);

            const m = data.match(/^[+-]{0,1}\d+(?:\.(\d*)){0,1}$/);
            const num = Number.parseFloat(data);

            if (m && m[1]) {
                decimalPlaces = m[1].length;
            }

            if (!m || isNaN(num)) {
                this.#output.writeLine(errorMsg);
            } else if (
                num < min ||
                num > max ||
                decimalPlaces < minDecimals ||
                decimalPlaces > maxDecimals
            ) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(num)) {
                this.#output.writeLine(errorMsg);
            } else {
                return num;
            }
        }
    }

    /**
     * Lê um caracter do console. Apresenta a mensagem de erro
     * caso o caracter não pertença ao conjunto dos caracteres válidos.
     *
     * @example <caption>Lendo um caracter S ou N (sempre converte a entrada para caixa alta)</caption>
     * readChar("Tem certeza (S/N)? ", "Por favor, informe S ou N", { capitalize: true, validChars: "SN" })
     *
     * @example <caption>Lendo um estado civil com C, S, V ou D (caixa alta ou caixa baixa)</caption>
     * readChar("Estado civil: ", "Estado civil inválido", { validChars: "CSVDcsvd" })
     *
     * @param {String} label - Label da entrada
     * @param {String} errorMsg - Mensagem de erro
     * @param {Object} [options] - Opções de validação
     * @param {Boolean} [options.capitalize=false] - Indica se caracter deve ser convertido para caixa alta ou não
     * @param {String} [options.validChars=null] - Conjunto de caracteres válidos
     * @param {Object} [options.isValid=null] - Função anônima para validação do caracter. Se options.validChars for definido, ele será executado antes.
     * @returns {String} Uma string com um único caracter válido
     */
    readChar(label, errorMsg, options = {}) {
        const capitalize = options.capitalize || false;
        const validChars = options.validChars || null;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);

            const char = data
                ? capitalize
                    ? data[0].toUpperCase()
                    : data[0]
                : null;

            if (!char) {
                this.#output.writeLine(errorMsg);
            } else if (validChars && !validChars.includes(char)) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(char)) {
                this.#output.writeLine(errorMsg);
            } else {
                return char;
            }
        }
    }

    /**
     * Lê uma data do console. Apresenta a mensagem de erro
     * caso a data não esteja nos limites definidos.
     * Esse método usa o objeto DateTime para representar uma data ({@link https://moment.github.io/luxon/#/}).
     *
     * @see Luxon {@link https://moment.github.io/luxon/#/}
     *
     * @example <caption>Lendo uma data no formato DDMMYYYY</caption>
     * readDate("Data: ", "Data inválida")
     *
     * @example <caption>Lendo uma data no formato YYYYMMDD</caption>
     * readDate("Data: ", "Data inválida", { mask: "YYYYMMDD" })
     *
     * @example <caption>Lendo uma data de nascimento no formato DDMMYYYY desde 1/1/1900 até hoje-18 anos</caption>
     * readDate("Data de nascimento: ", "Data de nascimento inválida", { min: DateTime.fromObject({ year: 1900, month: 1, day: 1 }), max: DateTime.now().minus({ year: 18 }) })
     *
     * @param {String} label - Label da entrada
     * @param {String} errorMsg - Mensagem de erro
     * @param {Object} [options] - Opções de validação
     * @param {String} [options.mask="ddMMyyyy"] - Máscara de leitura da data
     * @param {Object} [options.min=null] - Data mínima (objeto DateTime)
     * @param {Object} [options.max=null] - Data máxima (objeto DateTime)
     * @param {Object} [options.isValid=null] - Função anônima para validação da data. Essa função só será executada se a data estiver dentro dos limites definidos.
     * @returns {Object} Um objeto DateTime ({@link https://moment.github.io/luxon/#/}) com a data fornecida pelo usuário
     */
    readDate(label, errorMsg, options = {}) {
        const mask = options.mask || 'ddMMyyyy';
        const min = options.min || null;
        const max = options.max || null;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);

            const dt = DateTime.fromFormat(data, mask);

            if (!dt.isValid) {
                this.#output.writeLine(errorMsg);
            } else if ((min && dt < min) || (max && dt > max)) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(dt)) {
                this.#output.writeLine(errorMsg);
            } else {
                return dt;
            }
        }
    }

    /**
     * Lê uma hora do console. Apresenta a mensagem de erro
     * caso a hora não esteja nos limites definidos.
     * Esse método usa o objeto DateTime para representar uma hora ({@link https://moment.github.io/luxon/#/}).
     *
     * @see Luxon {@link https://moment.github.io/luxon/#/}
     *
     * @example <caption>Lendo uma hora no formato HHMM de 0:00 às 23:59</caption>
     * readTime("Hora: ", "Hora inválida")
     *
     * @example <caption>Lendo uma hora no formato HHMM de 08:00 às 17:00</caption>
     * readTime("Hora: ", "Hora inválida", { minHour: 8, minMinute: 0, maxHour: 17, maxMinute: 0 })
     *
     * @param {String} label - Label de entrada
     * @param {String} errorMsg - Mensagem de erro
     * @param {Object} [options] - Opções de validação
     * @param {String} [options.mask="HHmm"] - Máscara de leitura da hora
     * @param {Number} [options.minHour=0] - Hora mínima (0..23)
     * @param {Number} [options.minMinute=0] - Minuto mínimo (0..59)
     * @param {Number} [options.maxHour=23] - Hora máxima (0..23)
     * @param {Number} [options.maxMinute=59] - Minuto máximo (0..59)
     * @param {Object} [options.isValid=null] - Função anônima para validação da hora. Essa função só será executada se a hora estiver dentro dos limites definidos.
     * @returns {Object} Um objeto DateTime ({@link https://moment.github.io/luxon/#/}) com a data atual e a hora fornecida pelo usuário
     */
    readTime(label, errorMsg, options = {}) {
        const mask = options.mask || 'HHmm';
        const minHour = options.minHour || 0;
        const minMinute = options.minMinute || 0;
        const maxHour = options.maxHour || 23;
        const maxMinute = options.maxMinute || 59;
        const isValid = options.isValid || null;

        for (;;) {
            const data = this.#prompt(label);

            const dt = DateTime.fromFormat(data, mask);

            if (!dt.isValid) {
                this.#output.writeLine(errorMsg);
            } else if (
                dt.hour < minHour ||
                dt.hour > maxHour ||
                dt.minute < minMinute ||
                dt.minute > maxMinute
            ) {
                this.#output.writeLine(errorMsg);
            } else if (isValid && !isValid(dt)) {
                this.#output.writeLine(errorMsg);
            } else {
                return dt;
            }
        }
    }
}

/**
 * Classe exportada
 * @type {Input}
 */
export default Input;
