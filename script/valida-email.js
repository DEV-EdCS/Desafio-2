export default function ehUmEmail(campo) {
    const email = campo.value;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
        campo.setCustomValidity('Por favor, preencha um e-mail válido.');
    } else {
        campo.setCustomValidity('');
    }
}
