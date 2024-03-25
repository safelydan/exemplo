import {
    OperationErrors,
    OperationStatus,
} from '../controller/operation-code.js';
import Paciente from '../model/paciente.js';
import session from '../session/session.js';
import { validaCPF } from '../utils/cpf.js';

/**
 * Classe responsável pelo inclusão de pacientes
 */
class InclusaoPacienteController {
    /**
     * Verifica se pode adicionar o paciente
     * @param {Number} cpf - CPF do paciente
     * @returns {Boolean} Pode ou bão adicionar o paciente
     */
    canAddPaciente = (cpf) =>
        // Verifica se CPF é valido e se não há outro paciente om o mesmo CPF
        validaCPF(cpf) && !session.Consultorio.hasPaciente(cpf)
            ? { status: OperationStatus.SUCCESS }
            : {
                  status: OperationStatus.FAILURE,
                  errors: [OperationErrors.PATIENT_ALREADY_REGISTERED],
              };

    /**
     * Adiciona um novo paciente
     * @param {Object} paciente - dados do paciente
     * @returns {Object} Resultado da operação com status e lista de erros
     */
    addPaciente(paciente) {
        // Verifica se pode adicionar o paciente
        let result = this.canAddPaciente(paciente.cpf);

        if (result.status !== OperationStatus.SUCCESS) {
            return { status: result.status, errors: result.errors };
        } else {
            //  Cria o paciente
            result = Paciente.create(
                paciente.cpf,
                paciente.nome,
                paciente.dtNascimento
            );

            if (result.success) {
                const paciente = result.success;

                // Adiciona o paciente ao consultório
                session.Consultorio.addPaciente(paciente);

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

export default InclusaoPacienteController;
