import {
    OperationErrors,
    OperationStatus,
} from '../controller/operation-code.js';
import { validaCPF } from '../utils/cpf.js';
import Input from '../utils/input.js';
import Output from '../utils/output.js';

/**
 * Classe responsável pela interface da exclusão de pacientes
 */
class ExclusaoPacienteView {
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
     * Imprime uma mensagem de sucesso ou uma lista de erros
     * @param {OperationStatus} status - status da operação
     * @param {OperationErrors[]} errors - lista de erros
     */
    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            this.#output.writeLine('\nPaciente excluído com sucesso!');
        } else {
            this.#output.writeLine('\nErro na exclusão:');
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
            OperationErrors.PATIENT_NOT_REGISTERED,
            '- Paciente não encontrado.'
        );
        this.#messages.set(
            OperationErrors.ALREADY_SCHEDULED,
            '- Paciente possui uma consulta agendada.'
        );
    }
}

export default ExclusaoPacienteView;
