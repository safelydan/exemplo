import { DateTime } from 'luxon';
import { OperationErrors } from '../controller/operation-code.js';
import { validaCPF } from '../utils/cpf.js';
import Agenda from './agenda.js';

class Paciente {
    #agenda;
    #cpf;
    #nome;
    #dtNascimento;

    constructor(cpf, nome, dtNascimento) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dtNascimento = dtNascimento;
        this.#agenda = new Agenda();
    }

    static create(cpf, nome, dtNascimento) {
        const errors = [];

        // Executa as validações do Paciente
        if (!validaCPF(cpf))
            errors.push(OperationErrors.INVALID_PATIENT_DOCUMENT);

        if (nome.length < 5) errors.push(OperationErrors.INVALID_PATIENT_NAME);

        if (dtNascimento > DateTime.now().minus({ year: 13 }))
            errors.push(OperationErrors.INVALID_PATIENT_BIRTHDATE);

        // Retorna o objeto Paciente ou a lista de erros
        return errors.length === 0
            ? { success: new Paciente(cpf, nome, dtNascimento) }
            : { failure: errors };
    }

    get cpf() {
        return this.#cpf;
    }

    get nome() {
        return this.#nome;
    }

    get dtNascimento() {
        return this.#dtNascimento;
    }

    get agenda() {
        return this.#agenda;
    }

    addAgendamento = (agendamento) => this.#agenda.add(agendamento);

    removeAgendamento(agendamento) {
        const ok = this.#agenda.remove(agendamento);

        if (ok) {
            // Avisa ao agendamento que ele foi removido
            // Isso é importante por causa da referência Agendamento -> Paciente
            agendamento.removed();
        }

        return ok;
    }

    hasAgendamentoFuturo = () => this.#agenda.hasAgendamentoFuturo();

    agendamentoFuturo = () => this.#agenda.agendamentoFuturo();

    equals = (obj) => obj.#cpf && obj.#cpf === this.#cpf;
}

export default Paciente;
