import { OperationStatus } from '../controller/operation-code.js';
import InclusaoPacienteView from '../view/inclusao-paciente-view.js';

/**
 * Classe responsável pelo inclusão de pacientes
 */
class InclusaoPacientePresenter {
    #view;
    #controller;

    constructor(controller) {
        // Referencia o controller
        this.#controller = controller;

        // Cria a view
        this.#view = new InclusaoPacienteView();
    }

    run() {
        // Lê o CPF
        const cpf = this.#view.readCPF();

        // Verifica se pode adicionar um paciente com esse CPF
        let result = this.#controller.canAddPaciente(cpf);

        if (result.status !== OperationStatus.SUCCESS) {
            this.#view.process(result.status, result.errors);
        } else {
            // Se pode adicionar, então lê o restante dos dados
            const data = this.#view.readData();

            // Solicita ao controller a inserção do paciente
            result = this.#controller.addPaciente({ cpf, ...data });

            // Verifica se a operação foi bem sucedida ou não
            if (result.status === OperationStatus.SUCCESS) {
                this.#view.process(OperationStatus.SUCCESS);
            } else {
                this.#view.process(OperationStatus.FAILURE, result.errors);
            }
        }
    }
}

export default InclusaoPacientePresenter;
