/**
 * @Module Output
 */

/**
 * Classe que implementa métodos helpers para saída de dados via console.
 *
 * @example Criando um output
 * const output = new Output();
 */
class Output {
    /**
     * Imprime um dado no console, mas não pula de linha.
     *
     * @param {*} data - Dado a ser impresso
     *
     * @example
     * write("Alô mundo!!!")
     */
    write(data) {
        // eslint-disable-next-line no-undef
        process.stdout.write(data);
    }

    /**
     * Imprime um dado no console e pula de linha.
     *
     * @param {*} data - Dado a ser impresso
     *
     * @example
     * writeLine("Alô mundo!!!")
     */
    writeLine(data) {
        // eslint-disable-next-line no-undef
        process.stdout.write(`${data}\n`);
    }
}

/**
 * Classe exportada
 * @type {Output}
 */
export default Output;
