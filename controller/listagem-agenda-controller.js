import session from '../session/session.js';

/**
 * Classe responsável pela listagem da agenda
 */
class ListagemAgendaController {
    /**
     * Retorna toda a lista de agendamentos ordenada por data/hora
     * @returns {Agendamento[]} Lista de agendamentos
     */
    agenda = () => this.#getAgenda(session.Consultorio.agenda.iterator());

    /**
     * Retorna toda a lista de agendamentos de um período ordenada por data/hora
     * @param {DateTime} inicio - Data de início do período
     * @param {DateTime} fim - Data fim do período
     * @returns {Agendamento[]} Lista de agendamentos
     */
    agendaPeriod = (inicio, fim) =>
        this.#getAgenda(session.Consultorio.agenda.iteratorPeriod(inicio, fim));

    /**
     * Retorna a lista de agendamentos ordenada por data/hora
     * @param {Object} iterator - Iterador que vai percorrer a agenda
     * @returns {Agendamento[]} Lista de agendamentos
     */
    #getAgenda(iterator) {
        const agendamentos = [];

        // Armazena os agendamentos retornados pelo iterador em um array
        for (const a of iterator) {
            agendamentos.push(a);
        }

        // Ordena o array por data/hora usando o total de milissegundos
        // de cada data/hora para comparação
        agendamentos.sort(
            (a, b) => a.dataHoraInicio.toMillis() - b.dataHoraInicio.toMillis()
        );

        return agendamentos;
    }
}

export default ListagemAgendaController;
