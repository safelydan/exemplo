import { ListagemAgendaView, Period } from '../view/listagem-agenda-view.js';

/**
 * Classe responsável pela listagem da agenda
 */
class ListagemAgendaPresenter {
    #view;
    #controller;

    constructor(controller) {
        // Referencia o controller
        this.#controller = controller;

        // Cria a view
        this.#view = new ListagemAgendaView();
    }

    run() {
        // Lê as opções de listagem
        const option = this.#view.readOption();

        if (option === Period.ALL) {
            // Solicita ao controller toda a agenda e a repassa à view
            this.#view.listAgenda(this.#controller.agenda());
        } else {
            // Lê o período desejado
            const { dataInicio, dataFim } = this.#view.readPeriod();

            // Solicita ao controller a agenda edo período e a repassa à view
            this.#view.listAgenda(
                this.#controller.agendaPeriod(dataInicio, dataFim)
            );
        }
    }
}

export default ListagemAgendaPresenter;
