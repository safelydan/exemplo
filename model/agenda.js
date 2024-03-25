import { DateTime } from 'luxon';

class Agenda {
    #agendamentos;

    constructor() {
        this.#agendamentos = [];
    }

    add = (agendamento) => this.#agendamentos.push(agendamento);

    remove(agendamento) {
        const index = this.#agendamentos.findIndex((a) =>
            a.equals(agendamento)
        );

        if (index != -1) {
            this.#agendamentos.splice(index, 1);
            return true;
        }

        return false;
    }

    removeHorario(dataHora) {
        const index = this.#agendamentos.findIndex((a) => a.startAt(dataHora));

        if (index != -1) {
            const agendamento = this.#agendamentos[index];
            this.#agendamentos.splice(index, 1);

            return agendamento;
        }

        return null;
    }

    *iterator() {
        for (let a of this.#agendamentos) yield a;
    }

    *iteratorPeriod(inicio, fim) {
        const agendamentos = this.#agendamentos.filter(
            (a) => a.dataHoraInicio >= inicio && a.dataHoraFim <= fim
        );

        for (let a of agendamentos) yield a;
    }

    hasAgendamentoFuturo = () =>
        this.#agendamentos.some((a) => a.dataHoraInicio > DateTime.now());

    agendamentoFuturo = () =>
        this.#agendamentos.find((a) => a.dataHoraInicio > DateTime.now());

    hasIntersecao = (inicial, final) =>
        this.#agendamentos.some((a) => a.hasIntersecaoHorario(inicial, final));
}

export default Agenda;
