import { DateTime } from 'luxon';
import Input from '../utils/input.js';
import Output from '../utils/output.js';

/**
 * Classe que define o período da listagem
 */
class Period {
    static get ALL() {
        return 'T';
    }
    static get PARTIAL() {
        return 'P';
    }
}

/**
 * Classe responsável pela interface da listagem da agenda
 */
class ListagemAgendaView {
    #input;
    #output;

    constructor() {
        this.#input = new Input();
        this.#output = new Output();
    }

    /**
     * Lê o período da listagem
     * @returns {String} Caracter que define o período da listagem (T ou P)
     */
    readOption = () =>
        this.#input.readChar(
            'Apresentar a agenda T-Toda ou P-Periodo: ',
            'Digite T ou P',
            { validChars: 'TP', capitalize: true }
        );

    /**
     * Lê a data inicial e final do período da listagem
     * @returns {Object} Data iniciale final do período da listagem
     */
    readPeriod() {
        const dataInicio = this.#input.readDate(
            'Data inicial (DDMMAAAA): ',
            'Data inválida.'
        );

        let dataFim = this.#input.readDate(
            'Data final (DDMMAAAA): ',
            'Data inválida.',
            { min: dataInicio }
        );

        dataFim = DateTime.fromObject({
            year: dataFim.year,
            month: dataFim.month,
            day: dataFim.day,
            hour: 23,
            minute: 59,
            second: 59,
        });

        return { dataInicio, dataFim };
    }

    /**
     * Apresenta a agenda
     * @param {Agendamento[]} agenda - Lista de agendamentos
     */
    listAgenda(agenda) {
        if (agenda.length === 0) {
            this.#output.writeLine('\nNão existem consultas agendadas');
        } else {
            this.#output.writeLine(
                '\n----------------------------------------------------------------------'
            );
            this.#output.writeLine(
                '   Data    H.Ini H.Fim Tempo Nome                             Dt.Nasc.'
            );
            this.#output.writeLine(
                '----------------------------------------------------------------------'
            );
            //   99/99/9999 99:99 99:99 99:99 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 99/99/9999
            agenda.forEach((a) => {
                // Calcula a duraçãoda consulta
                const duracao = a.dataHoraFim.diff(a.dataHoraInicio);

                this.#output.writeLine(
                    `${a.dataHoraInicio.toLocaleString(
                        DateTime.DATE_SHORT
                    )} ${a.dataHoraInicio.toLocaleString(
                        DateTime.TIME_SIMPLE
                    )} ${a.dataHoraFim.toLocaleString(
                        DateTime.TIME_SIMPLE
                    )} ${duracao.toFormat('hh:mm')} ${a.paciente.nome.padEnd(
                        30,
                        ' '
                    )} ${a.paciente.dtNascimento.toLocaleString(
                        DateTime.DATE_SHORT
                    )}`
                );
            });
        }
    }
}

export { ListagemAgendaView, Period };
