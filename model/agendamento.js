import { DateTime } from 'luxon';
import { OperationErrors } from '../controller/operation-code.js';
import session from '../session/session.js';

class Agendamento {
    #paciente;
    #dataHoraInicio;
    #dataHoraFim;

    constructor(paciente, dataHoraInicio, dataHoraFim) {
        this.#paciente = paciente;
        this.#dataHoraInicio = dataHoraInicio;
        this.#dataHoraFim = dataHoraFim;

        paciente.addAgendamento(this);
    }

    static create(paciente, dataHoraInicio, dataHoraFim) {
        const errors = [];

        // Executa as validações do Agendamento
        if (dataHoraInicio < DateTime.now()) {
            errors.push(OperationErrors.SCHEDULE_DATE_IN_THE_PAST);
        } else if (dataHoraInicio >= dataHoraFim) {
            errors.push(OperationErrors.SCHEDULE_INITIAL_DATE_AFTER_END_DATE);
        } else if (
            dataHoraInicio.minute != 0 &&
            dataHoraInicio.minute != 15 &&
            dataHoraInicio.minute != 30 &&
            dataHoraInicio.minute != 45
        ) {
            errors.push(OperationErrors.SCHEDULE_INITIAL_TIME_INCORRECT);
        } else if (
            dataHoraFim.minute != 0 &&
            dataHoraFim.minute != 15 &&
            dataHoraFim.minute != 30 &&
            dataHoraFim.minute != 45
        ) {
            errors.push(OperationErrors.SCHEDULE_END_TIME_INCORRECT);
        } else if (
            dataHoraInicio.hour < 8 ||
            dataHoraFim.hour > 19 ||
            (dataHoraFim.hour == 19 && dataHoraFim.minute > 0)
        ) {
            errors.push(OperationErrors.SCHEDULE_OUTSIDE_OPENING_HOURS);
        } else if (
            session.Consultorio.agenda.hasIntersecao(
                dataHoraInicio,
                dataHoraFim
            )
        ) {
            errors.push(OperationErrors.SCHEDULE_CONFLICT);
        }

        // Retorna o objeto Agendamento ou a lista de erros
        return errors.length === 0
            ? {
                  success: new Agendamento(
                      paciente,
                      dataHoraInicio,
                      dataHoraFim
                  ),
              }
            : { failure: errors };
    }

    get paciente() {
        return this.#paciente;
    }

    get dataHoraInicio() {
        return this.#dataHoraInicio;
    }

    get dataHoraFim() {
        return this.#dataHoraFim;
    }

    removed = () => (this.#paciente = null);

    hasIntersecao = (outroAgendamento) =>
        this.hasIntersecaoHorario(
            outroAgendamento.#dataHoraInicio,
            outroAgendamento.#dataHoraFim
        );

    hasIntersecaoHorario = (dataHoraInicio, dataHoraFim) =>
        (dataHoraFim > this.#dataHoraInicio &&
            dataHoraFim <= this.#dataHoraFim) ||
        (dataHoraInicio >= this.#dataHoraInicio &&
            dataHoraInicio < this.#dataHoraFim) ||
        (dataHoraInicio <= this.#dataHoraInicio &&
            dataHoraFim >= this.#dataHoraFim);

    startAt = (horario) => horario.equals(this.#dataHoraInicio);

    equals = (obj) =>
        obj.#dataHoraInicio && this.#dataHoraInicio.equals(obj.#dataHoraInicio);
}

export default Agendamento;
