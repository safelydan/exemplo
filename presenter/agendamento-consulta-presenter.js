import { OperationStatus } from '../controller/operation-code.js';
import AgendamentoConsultaView from '../view/agendamento-consulta-view.js';

/**
 * Classe responsável pelo agendamento de consultas
 */
class AgendamentoConsultaPresenter {
    #view;
    #controller;

    constructor(controller) {
        // Referencia o controller
        this.#controller = controller;

        // Cria a view
        this.#view = new AgendamentoConsultaView();
    }

    run() {
        // Lê o CPF
        const cpf = this.#view.readCPF();

        // Verifica se paciente pode agendar consulta
        const result = this.#controller.canAddConsulta(cpf);

        if (result.status !== OperationStatus.SUCCESS) {
            this.#view.process(result.status, result.errors);
        } else {
            // Se pode agendar, então lê o restante dos dados
            const data = this.#view.readData();

            // Solicita ao controller o agendamento da consulta
            const result = this.#controller.addConsulta({ cpf, ...data });

            // Verifica se a operação foi bem sucedida ou não
            if (result.status === OperationStatus.SUCCESS) {
                this.#view.process(OperationStatus.SUCCESS);
            } else {
                this.#view.process(OperationStatus.FAILURE, result.errors);
            }
        }
    }
}

export default AgendamentoConsultaPresenter;
