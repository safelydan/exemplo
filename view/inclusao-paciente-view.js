import {
    OperationErrors,
    OperationStatus,
} from '../controller/operation-code.js';
import { validaCPF } from '../utils/cpf.js';
import Input from '../utils/input.js';
import Output from '../utils/output.js';

/**
 * Classe responsável pela interface da inclusão de pacientes
 */
class InclusaoPacienteView {
    #input;
    #output;
    #messages;

    constructor() {
        this.#input = new Input();
        this.#output = new Output();
        this.#messages = new Map();

        this.#setupMessages();
    }

    /**
     * Lê o CPF
     * @returns {Number} CPF fornecido
     */
    readCPF = () =>
        this.#input.readInteger('CPF: ', 'CPF inválido', {
            min: 111111111,
            max: 99999999999,
            isValid: validaCPF,
        });

    /**
     * Lê o nome e data de nascimento
     * @returns {Object} Objeto com nome e data de nascimento
     */
    readData() {
        const nome = this.#input.readString(
            'Nome: ',
            'Nome deve ter ao menos 5 caracteres',
            { capitalize: true }
        );

        const dtNascimento = this.#input.readDate(
            'Data de nascimento (DDMMAAAA): ',
            'Data de nascimento inválida'
        );

        return { nome, dtNascimento };
    }

    /**
     * Imprime uma mensagem de sucesso ou uma lista de erros
     * @param {OperationStatus} status - status da operação
     * @param {OperationErrors[]} errors - lista de erros
     */
    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            this.#output.writeLine('\nPaciente cadastrado com sucesso!');
        } else {
            this.#output.writeLine('\nErro no cadastramento:');
            errors.forEach((error) => {
                this.#output.writeLine(this.#messages.get(error));
            });
        }
    }

    /**
     * Monta um mapa com os possíveis códigos de erro e suas respectivas mensagens
     */
    #setupMessages() {
        this.#messages.set(
            OperationErrors.INVALID_PATIENT_DOCUMENT,
            '- CPF inválido.'
        );
        this.#messages.set(
            OperationErrors.INVALID_PATIENT_NAME,
            '- Nome inválido. Deve ter ao menos 5 caracteres.'
        );
        this.#messages.set(
            OperationErrors.INVALID_PATIENT_BIRTHDATE,
            '- Data de nascimento inválida. Paciente deve ter ao menos 13 anos.'
        );
        this.#messages.set(
            OperationErrors.PATIENT_ALREADY_REGISTERED,
            '- Já existe um paciente cadastrado com esse CPF.'
        );
    }
}

export default InclusaoPacienteView;
