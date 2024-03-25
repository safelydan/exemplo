import { DateTime } from 'luxon';
import { formataCPF } from '../utils/cpf.js';
import Output from '../utils/output.js';

/**
 * Classe responsável pela interface da listagem de pacientes
 */
class ListagemPacienteView {
    #output;

    constructor() {
        this.#output = new Output();
    }

    /**
     * Apresenta a lista de pacientes
     * @param {Paciente[]} pacientes - Lista de pacientes
     */
    listPacientes(pacientes) {
        if (pacientes.length === 0) {
            this.#output.writeLine('\nNão existem pacientes cadastrados');
        } else {
            this.#output.writeLine(
                '\n----------------------------------------------------------------'
            );
            this.#output.writeLine(
                '     CFP       Nome                           Data de nascimento'
            );
            this.#output.writeLine(
                '----------------------------------------------------------------'
            );
            //   999.999.999-99 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx         99/99/9999

            // Apresenta os pacientes
            pacientes.forEach((p) => {
                this.#output.writeLine(
                    `${formataCPF(p.cpf)} ${p.nome.padEnd(
                        30,
                        ' '
                    )}         ${p.dtNascimento.toLocaleString(
                        DateTime.DATE_SHORT
                    )}`
                );

                // Apresenta os agendamentos do paciente, se existirem
                for (let a of p.agenda.iterator()) {
                    this.#output.writeLine(
                        `               Agendado para ${a.dataHoraInicio.toLocaleString(
                            DateTime.DATE_SHORT
                        )}\n               ${a.dataHoraInicio.toLocaleString(
                            DateTime.TIME_SIMPLE
                        )} às ${a.dataHoraFim.toLocaleString(
                            DateTime.TIME_SIMPLE
                        )}`
                    );
                }
            });

            this.#output.writeLine(
                '----------------------------------------------------------------'
            );
        }
    }
}

export default ListagemPacienteView;
