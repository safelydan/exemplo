import {
    OperationErrors,
    OperationStatus,
} from '../controller/operation-code.js';
import Agendamento from '../model/agendamento.js';
import session from '../session/session.js';

/**
 * Classe responsável pelo agendamento de consultas
 */
class AgendamentoConsultaController {
    /**
     * Verifica sepode agendar um consulta para um paciente
     * @param {Number} cpf - CPF do paciente
     * @returns {Boolean} Pode ou nçao agendar uma consulta
     */
    canAddConsulta(cpf) {
        // Recupera o paciente pelo CPF
        const paciente = session.Consultorio.getPacienteByCPF(cpf);

        if (!paciente) {
            // Se paciente não existe, então retorna erro
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        } else if (paciente.hasAgendamentoFuturo()) {
            // Se paciente já tem um agendamento no futuro, então retorna erro
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.ALREADY_SCHEDULED],
            };
        } else {
            return {
                status: OperationStatus.SUCCESS,
            };
        }
    }

    /**
     * Remove um agendamento
     * @param {Object} agendamento - Agendamento a ser removido
     * @returns {Object} Resultado da operação com status e lista de erros
     */
    addConsulta(agendamento) {
        const { cpf, dataHoraInicial, dataHoraFinal } = agendamento;

        // Verifica se pode adicionar a consulta
        let result = this.canAddConsulta(cpf);

        if (result.status !== OperationStatus.SUCCESS) {
            return { status: result.status, errors: result.errors };
        } else {
            // Recupera o paciente pelo CPF
            const paciente = session.Consultorio.getPacienteByCPF(cpf);

            // Cria o agendamento para o paciente
            result = Agendamento.create(
                paciente,
                dataHoraInicial,
                dataHoraFinal
            );

            if (result.success) {
                const agendamento = result.success;

                // Adiciona o mesmo agendamento no consultório
                session.Consultorio.addAgendamento(agendamento);

                return { status: OperationStatus.SUCCESS };
            } else {
                // Se não conseguiu criar, retorna os erros
                return {
                    status: OperationStatus.FAILURE,
                    errors: result.failure,
                };
            }
        }
    }
}

export default AgendamentoConsultaController;
