// Exporta a função como padrão para ser usada em outros arquivos JS
export default function ehUmArquivoPDF(campo) {
    // Pega o primeiro arquivo que foi selecionado no input do tipo "file"
    const arquivo = campo.files[0];

    // Se houver um arquivo, pegamos seu tipo MIME (ex: "application/pdf")
    const tipoArquivo = arquivo ? arquivo.type : "";

    // Verifica se nenhum arquivo foi selecionado
    if (!arquivo) {
        // Define uma mensagem de erro personalizada, que será exibida na validação do formulário
        campo.setCustomValidity("Por favor, selecione um arquivo.");
        return; // Interrompe a execução da função, pois não há mais nada a fazer
    }

    // Verifica se o tipo MIME do arquivo não é PDF
    if (tipoArquivo !== "application/pdf") {
        // Define outra mensagem de erro personalizada informando que o tipo do arquivo está errado
        campo.setCustomValidity("O arquivo selecionado não é um PDF.");
        return; // Encerra a função, pois o arquivo não é válido
    }

    // Se o arquivo estiver correto (for um PDF), "limpa" qualquer erro anterior
    campo.setCustomValidity("");
}

/* O que essa função faz:
Verifica se o usuário selecionou um arquivo.

Confirma se o arquivo é do tipo PDF (application/pdf).

Se não for, impede o envio do formulário com uma mensagem específica de erro.

Se for válido, deixa o campo "ok" para ser enviado. */