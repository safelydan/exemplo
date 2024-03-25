import MainController from './controller/main-controller.js';
import MenuPresenter from './presenter/menu-presenter.js';

/**
 * A App é representada por uma IIFE (Immediately Invoked Function Expression)
 * Ela simplesmente inicializa as classes que vão gerenciar os menus de opções
 */
(function () {
    // Cria o controller
    const controller = new MainController();

    // Cria o Presenter
    // Injeta o controller no Presenter
    const presenter = new MenuPresenter(controller);

    // Presenter assume a execução
    presenter.run();
})();
