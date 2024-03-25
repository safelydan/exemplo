import { OperationStatus } from '../controller/operation-code.js';
import CancelamentoConsultaView from '../view/cancelamento-consulta-view.js';

/**
 * Classe responsável pelo cancelamento de consultas
 */
class CancelamentoConsultaPresenter {
    #view;
    #controller;

    constructor(controller) {
        // Referencia o controller
        this.#controller = controller;

        // Cria a view
        this.#view = new CancelamentoConsultaView();
    }

    run() {
        // Lê o CPF
        const cpf = this.#view.readCPF();

        // Verifica se pode cancelar a consulta desse paciente
        const result = this.#controller.canCancelConsulta(cpf);

        if (result.status !== OperationStatus.SUCCESS) {
            this.#view.process(result.status, result.errors);
        } else {
            // Se pode cancelar, entãolê o restante dos dados
            const data = this.#view.readData();

            // Solicita ao controller o cancelamento da consulta
            const result = this.#controller.cancelConsulta({ cpf, ...data });

            // Verifica se a operação foi bem sucedida ou não
            if (result.status === OperationStatus.SUCCESS) {
                this.#view.process(OperationStatus.SUCCESS);
            } else {
                this.#view.process(OperationStatus.FAILURE, result.errors);
            }
        }
    }
}

export default CancelamentoConsultaPresenter;
