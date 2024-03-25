import Consultorio from '../model/consultorio.js';

/**
 * Classe que controla a sessão do usuário
 */
class SessionManager {
    #consultorio;

    constructor() {
        this.#consultorio = new Consultorio();
    }

    get Consultorio() {
        return this.#consultorio;
    }
}

// Singleton: cria uma única instância de SessionManager
const session = new SessionManager();

// Exporta somente o singleton
export default session;
