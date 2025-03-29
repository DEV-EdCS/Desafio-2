export default function ehUmArquivoPDF(campo) {
    const arquivo = campo.files[0];
    if (!arquivo || arquivo.type !== 'application/pdf') {
        campo.setCustomValidity('Por favor, envie um arquivo PDF válido.');
    } else {
        campo.setCustomValidity('');
    }
}
