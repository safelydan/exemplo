import {
    OperationErrors,
    OperationStatus,
} from '../controller/operation-code.js';
import session from '../session/session.js';

/**
 * Classe responsável pelo cancelamento de consultas
 */
class CancelamentoConsultaController {
    /**
     * Verifica se a consulta de um paciente pode ser cancelada
     * Não precisa do agendamento porque cada paciente possui
     * apenas um agendamento futuro
     * @param {Number} cpf - CPF do paciente
     * @returns {Boolean} Pode cancelar a consulta ou não
     */
    canCancelConsulta(cpf) {
        // Recupera o paciente pelo CPF
        const paciente = session.Consultorio.getPacienteByCPF(cpf);

        if (!paciente) {
            // Se paciente não existe, então retorna erro
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        } else if (!paciente.hasAgendamentoFuturo()) {
            // Se paciente não tem agendamento futuro,
            // então não há o que cancelar
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.SCHEDULE_NOT_REGISTERED],
            };
        } else {
            return {
                status: OperationStatus.SUCCESS,
            };
        }
    }

    /**
     * Cancela uma consulta previamente agendada
     * @param {Object} agendamento - Agendamento a ser cancelado
     * @returns {Object} Resultado da operação com status e lista de erros
     */
    cancelConsulta(agendamento) {
        const { cpf, dataHoraInicio } = agendamento;

        // Verifica se consulta pode ser cancelada
        let result = this.canCancelConsulta(cpf);

        if (result.status !== OperationStatus.SUCCESS) {
            return { status: result.status, errors: result.errors };
        } else {
            // Recupera o paciente pelo CPF
            const paciente = session.Consultorio.getPacienteByCPF(cpf);

            // Recupera o agendamento futuro do paciente
            const agendamento = paciente.agendamentoFuturo();

            if (!agendamento.dataHoraInicio.equals(dataHoraInicio)) {
                // Se agendamento não bate com os dados fornecidos, então
                // não cancela
                return {
                    status: OperationStatus.FAILURE,
                    errors: [OperationErrors.SCHEDULE_NOT_REGISTERED],
                };
            } else {
                // Remove o agendamento
                session.Consultorio.removeAgendamentoPorHorario(dataHoraInicio);

                return { status: OperationStatus.SUCCESS };
            }
        }
    }
}

export default CancelamentoConsultaController;
