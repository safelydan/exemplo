import ListagemPacienteView from '../view/listagem-paciente-view.js';

/**
 * Classe responsável pela listagem dos pacientes
 */
class ListagemPacientePresenter {
    #view;
    #controller;

    constructor(controller) {
        // Referencia o controller
        this.#controller = controller;

        // Cria a view
        this.#view = new ListagemPacienteView();
    }

    listByCPF() {
        // Solicita ao controller a lista de pacientes ordenada por CPF e a repassa à view
        this.#view.listPacientes(this.#controller.pacientesByCPF);
    }

    listByNome() {
        // Solicita ao controller a lista de pacientes ordenada por Nome e a repassa à view
        this.#view.listPacientes(this.#controller.pacientesByNome);
    }
}

export default ListagemPacientePresenter;
