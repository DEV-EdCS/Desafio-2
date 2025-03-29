export default function ehUmTelefone(campo) {
    const telefone = campo.value.replace(/\D/g, '');
    if (!/^\d{10,11}$/.test(telefone)) {
        campo.setCustomValidity('Por favor, preencha um telefone válido.');
    } else {
        campo.setCustomValidity('');
    }
}
