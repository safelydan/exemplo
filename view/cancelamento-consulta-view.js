import { DateTime } from 'luxon';
import {
    OperationErrors,
    OperationStatus,
} from '../controller/operation-code.js';
import { validaCPF } from '../utils/cpf.js';
import Input from '../utils/input.js';
import Output from '../utils/output.js';

/**
 * Classe responsável pela interface do cancelamento de consultas
 */
class CancelamentoConsultaView {
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
     * Lê a data/hora da consulta
     * @returns {Object} Objeto com data/hora da consulta
     */
    readData() {
        const hoje = DateTime.now();

        // Data mínima da consulta é zero hora do dia de hoje
        const minDate = DateTime.fromObject({
            year: hoje.year,
            month: hoje.month,
            day: hoje.day,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        });

        const dataConsulta = this.#input.readDate(
            'Data da consulta (DDMMAAAA): ',
            'Data inválida. Deve ser maior ou igual a hoje.',
            { min: minDate }
        );

        const horaInicial = this.#input.readTime(
            'Hora de início da consulta (HHMM): ',
            'Hora inválida. Deve ser maior que a hora atual.',
            { min: minDate }
        );

        // Monta a data/hora inicial combinando a data fornecida
        // com o horário fornecido
        const dataHoraInicio = DateTime.fromObject({
            year: dataConsulta.year,
            month: dataConsulta.month,
            day: dataConsulta.day,
            hour: horaInicial.hour,
            minute: horaInicial.minute,
        });

        return { dataHoraInicio };
    }

    /**
     * Imprime uma mensagem de sucesso ou uma lista de erros
     * @param {OperationStatus} status - status da operação
     * @param {OperationErrors[]} errors - lista de erros
     */
    process(status, errors) {
        if (status === OperationStatus.SUCCESS) {
            this.#output.writeLine('\nConsulta desmarcada com sucesso!');
        } else {
            this.#output.writeLine('\nErro na desmarcação da consulta:');
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
            OperationErrors.SCHEDULE_NOT_REGISTERED,
            '- Agendamento da consulta não encontrado.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_DATE_IN_THE_PAST,
            '- Horário da consulta deve ser um horário no futuro.'
        );
        this.#messages.set(
            OperationErrors.SCHEDULE_NOT_BELONG_PATIENT,
            '- Horário da consulta está marcado para outro paciente.'
        );
    }
}

export default CancelamentoConsultaView;
