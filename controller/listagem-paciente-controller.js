import session from '../session/session.js';

/**
 * Classe responsável pela listagem dos pacientes
 */
class ListagemPacienteController {
    /**
     * Retorna toda a lista de pacientes ordenada por CPF
     * @returns {Paciente[]} Lista de pacientes
     */
    get pacientesByCPF() {
        return this.#getPacientes((p1, p2) => p1.cpf - p2.cpf);
    }

    /**
     * Retorna toda a lista de pacientes ordenada por Nome
     * @returns {Paciente[]} Lista de pacientes
     */
    get pacientesByNome() {
        return this.#getPacientes((p1, p2) =>
            p1.nome < p2.nome ? -1 : p1.nome > p2.nome ? 1 : 0
        );
    }

    /**
     * Retorna toda a lista de pacientes ordenada segundo a
     * função de comparação
     * @param {Object} compare - função de comparação do sort
     * @returns {Paciente[]} Lista de pacientes
     */
    #getPacientes(compare) {
        const iterator = session.Consultorio.pacientes.iterator();

        const pacientes = [];

        // Armazena os agendamentos retornados pelo iterador em um array
        for (const p of iterator) {
            pacientes.push(p);
        }

        // Ordena o array de paciente usando a função de ordenação
        pacientes.sort(compare);

        return pacientes;
    }
}

export default ListagemPacienteController;
