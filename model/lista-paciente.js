class ListaPacientes {
    #pacientes;

    constructor() {
        this.#pacientes = [];
    }

    *iterator() {
        for (let p of this.#pacientes) yield p;
    }

    add = (paciente) => this.#pacientes.push(paciente);

    remove = (paciente) => this.#removePacienteWhere((p) => p.equals(paciente));

    getByCPF = (cpf) => this.#pacientes.find((p) => p.cpf === cpf);

    #removePacienteWhere(predicate) {
        const index = this.#pacientes.findIndex(predicate);

        if (index != -1) {
            this.#pacientes.splice(index, 1);
            return true;
        }

        return false;
    }
}

export default ListaPacientes;
