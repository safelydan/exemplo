import Input from '../utils/input.js';
import Output from '../utils/output.js';

/**
 * Códigos retornados de acordo com a opção selecionada:
 * - Primeiro dígito indica o menu:
 *   0 - menu principal
 *   1 - menu de pacientes
 *   2 - menu da agenda
 * - Segundo dígito indica a opção
 */
class MenuOptions {
    static get INCLUIR_PACIENTE() {
        return 11;
    }
    static get EXCLUIR_PACIENTE() {
        return 12;
    }
    static get LISTAR_PACIENTES_CPF() {
        return 13;
    }
    static get LISTAR_PACIENTES_NOME() {
        return 14;
    }
    static get AGENDAR_CONSULTA() {
        return 21;
    }
    static get CANCELAR_AGENDAMENTO() {
        return 22;
    }
    static get LISTAR_AGENDA() {
        return 23;
    }
    static get FIM() {
        return 3;
    }
}

/**
 * Classe responsável por apresentar os menus e ler a opção selecionada pelo usuário.
 * A navegação entre um menu e outro não gera evento para o presenter, somente as
 * opções que definem uma funcionalidade da aplicação
 */
class Menu {
    // Menu ID:
    // 0 (menu principal)
    // 1 (menu de paciente)
    // 2 (menu da agenda)
    #menuId;

    #output;
    #input;

    constructor() {
        this.#menuId = 0;

        this.#output = new Output();
        this.#input = new Input();
    }

    get Option() {
        // Variável que indica a última opção do menu
        // Está associada ao retorno para o menu anterior
        let lastOption;

        for (;;) {
            switch (this.#menuId) {
                case 0:
                    this.#showMainMenu();
                    lastOption = 3;
                    break;

                case 1:
                    this.#showPatientMenu();
                    lastOption = 5;
                    break;

                case 2:
                    this.#showScheduleMenu();
                    lastOption = 4;
                    break;
            }

            let choice = this.#input.readInteger('Opção: ', 'Opção inválida', {
                min: 1,
                max: lastOption,
            });

            if (choice == lastOption) {
                // Escolheu a última opção do menu...
                if (this.#menuId === 0) {
                    // Selecionou FIM no menu principal
                    return MenuOptions.FIM;
                } else {
                    // Estava em algum menu, então volta para o menu principal,
                    // pois só temos um nível de menu
                    this.#menuId = 0;
                }
            } else {
                // Selecioneou outra opção que não é a última
                if (this.#menuId === 0) {
                    // Navega para o outro menu, pois no menu principal só tem submenus
                    this.#menuId = choice;
                } else {
                    // Selecionou alguma funcionalidade
                    // Retorna a opção selecionada
                    return this.#menuId * 10 + choice;
                }
            }
        }
    }

    #showMainMenu() {
        this.#output.writeLine(`
---------------------------
       Menu Principal
---------------------------
  1 - Cadastro de pacientes
  2 - Agenda
  3 - Fim
`);
    }

    #showPatientMenu() {
        this.#output.writeLine(`
------------------------------------------
       Menu do Cadastro de Pacientes
------------------------------------------
  1 - Cadastrar novo paciente
  2 - Excluir paciente
  3 - Listar pacientes(ordenado por CPF)
  4 - Listar pacientes(ordenado por nome)
  5 - Voltar p / menu principal
`);
    }

    #showScheduleMenu() {
        this.#output.writeLine(`
-----------------------------
            Agenda
-----------------------------
  1-Agendar consulta
  2-Cancelar agendamento
  3-Listar agenda
  4-Voltar p/ menu principal
`);
    }
}

export { Menu, MenuOptions };
