export default function ehUmNome(campo) {
    const nome = campo.value.trim();
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome) || nome.length < 3) {
        campo.setCustomValidity('Por favor, preencha um nome válido.');
    } else {
        campo.setCustomValidity('');
    }
}
