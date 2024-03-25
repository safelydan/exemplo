import AgendamentoConsultaPresenter from '../presenter/agendamento-consulta-presenter.js';
import CancelamentoConsultaPresenter from '../presenter/cancelamento-consulta-presenter.js';
import ExclusaoPacientePresenter from '../presenter/exclusao-paciente-presenter.js';
import InclusaoPacientePresenter from '../presenter/inclusao-paciente-presenter.js';
import ListagemAgendaPresenter from '../presenter/listagem-agenda-presenter.js';
import ListagemPacientePresenter from '../presenter/listagem-paciente-presenter.js';
import AgendamentoConsultaController from './agendamento-consulta-controller.js';
import CancelamentoConsultaController from './cancelamento-consulta-controller.js';
import ExclusaoPacienteController from './exclusao-paciente-controller.js';
import InclusaoPacienteController from './inclusao-paciente-controller.js';
import ListagemAgendaController from './listagem-agenda-controller.js';
import ListagemPacienteController from './listagem-paciente-controller.js';

/**
 * Classe responsável por coordenar a execução das funcionalidades a partir
 * do item selecionado pelo usuário no menu
 */
class MainController {
    incluirPaciente() {
        // Cria o controller
        const controller = new InclusaoPacienteController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new InclusaoPacientePresenter(controller);

        // Presenter assume a execução
        presenter.run();
    }

    excluirPaciente() {
        // Cria o controller
        const controller = new ExclusaoPacienteController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new ExclusaoPacientePresenter(controller);

        // Presenter assume a execução
        presenter.run();
    }

    listarPacientesCPF() {
        // Cria o controller
        const controller = new ListagemPacienteController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new ListagemPacientePresenter(controller);

        // Presenter assume a execução
        presenter.listByCPF();
    }

    listarPacientesNome() {
        // Cria o controller
        const controller = new ListagemPacienteController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new ListagemPacientePresenter(controller);

        // Presenter assume a execução
        presenter.listByNome();
    }

    agendarConsulta() {
        // Cria o controller
        const controller = new AgendamentoConsultaController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new AgendamentoConsultaPresenter(controller);

        // Presenter assume a execução
        presenter.run();
    }

    cancelarConsulta() {
        // Cria o controller
        const controller = new CancelamentoConsultaController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new CancelamentoConsultaPresenter(controller);

        // Presenter assume a execução
        presenter.run();
    }

    listarAgenda() {
        // Cria o controller
        const controller = new ListagemAgendaController();

        // Cria o Presenter
        // Injeta o controller no Presenter
        const presenter = new ListagemAgendaPresenter(controller);

        // Presenter assume a execução
        presenter.run();
    }
}

export default MainController;
