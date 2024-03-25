/**
 * Valida o CPF
 * @param {Number} cpf - CPF
 * @returns {Boolean} CPF válido ou não
 */
function validaCPF(cpf) {
    if (!Number.isInteger(cpf) || cpf > 99999999999 || cpf < 111111111)
        return false;
    else {
        let cpf_sem_dv = Math.trunc(cpf / 100);

        let soma = 0;
        for (let valor = 2; valor <= 11; valor++) {
            soma += (cpf_sem_dv % 10) * valor;
            cpf_sem_dv = Math.trunc(cpf_sem_dv / 10);
        }

        let dv1 = 11 - (soma % 11);

        if (dv1 > 9) dv1 = 0;

        cpf_sem_dv = Math.trunc(cpf / 10);

        soma = 0;
        for (let valor = 2; valor <= 12; valor++) {
            soma += (cpf_sem_dv % 10) * valor;
            cpf_sem_dv = Math.trunc(cpf_sem_dv / 10);
        }

        let dv2 = 11 - (soma % 11);

        if (dv2 > 9) dv2 = 0;

        return dv1 === Math.trunc((cpf % 100) / 10) && dv2 === cpf % 10;
    }
}

/**
 * Formata um CPF
 * @param {Number} cpf - CPF
 * @returns {String} String no formato 999.999.999-99
 */
function formataCPF(cpf) {
    if (!validaCPF(cpf)) return cpf.toString();

    const str = cpf.toString().padStart(11, '0');

    return str.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

export { formataCPF, validaCPF };
