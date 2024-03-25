import {
    OperationErrors,
    OperationStatus,
} from '../controller/operation-code.js';
import session from '../session/session.js';

/**
 * Classe responsável pelo exclusão de pacientes
 */
class ExclusaoPacienteController {
    /**
     * Remove o paciente pelo CPF
     * @param {Number} cpf - CPF do paciente
     * @returns {Object} Resultado da operação com status e lista de erros
     */
    removePaciente(cpf) {
        // Recupera paciente pelo CPF
        const paciente = session.Consultorio.getPacienteByCPF(cpf);

        if (!paciente) {
            // Se paciente não existe, então retorna erro
            return {
                status: OperationStatus.FAILURE,
                errors: [OperationErrors.PATIENT_NOT_REGISTERED],
            };
        } else {
            if (paciente.hasAgendamentoFuturo()) {
                // Se paciente tem agendamento futuro, então
                // não pode remover
                return {
                    status: OperationStatus.FAILURE,
                    errors: [OperationErrors.ALREADY_SCHEDULED],
                };
            } else {
                // Remove o paciente
                session.Consultorio.removePaciente(paciente);
                return {
                    status: OperationStatus.SUCCESS,
                };
            }
        }
    }
}

export default ExclusaoPacienteController;
