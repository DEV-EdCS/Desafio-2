export default function ehUmArquivoPDF(campo) {
    const arquivo = campo.files[0];
    const tipoArquivo = arquivo ? arquivo.type : "";

    if (!arquivo) {
        campo.setCustomValidity("Por favor, selecione um arquivo.");
        return;
    }

    if (tipoArquivo !== "application/pdf") {
        campo.setCustomValidity("O arquivo selecionado não é um PDF.");
        return;
    }

    campo.setCustomValidity("");
}
