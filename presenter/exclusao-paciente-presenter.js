import { OperationStatus } from '../controller/operation-code.js';
import ExclusaoPacienteView from '../view/exclusao-paciente-view.js';

/**
 * Classe responsável pelo exclusão de pacientes
 */
class ExclusaoPacientePresenter {
    #view;
    #controller;

    constructor(controller) {
        // Referencia o controller
        this.#controller = controller;

        // Cria a view
        this.#view = new ExclusaoPacienteView();
    }

    run() {
        // Lê o CPF
        const cpf = this.#view.readCPF();

        // Solicita ao controller a remoção do paciente
        const result = this.#controller.removePaciente(cpf);

        // Verifica se a operação foi bem sucedida ou não
        if (result.status === OperationStatus.SUCCESS) {
            this.#view.process(OperationStatus.SUCCESS);
        } else {
            this.#view.process(OperationStatus.FAILURE, result.errors);
        }
    }
}

export default ExclusaoPacientePresenter;
