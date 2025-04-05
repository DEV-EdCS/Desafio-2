function atualizaNomeArquivo(inputId, textoSelector) {
    // Seleciona o input com base no ID passado como argumento
    const input = document.getElementById(inputId);

    // Adiciona um "ouvinte" de evento: sempre que o usuário mudar o arquivo, executa essa função
    input.addEventListener("change", () => {
        // Recupera o primeiro arquivo selecionado pelo usuário
        const arquivo = input.files[0];

        // Se um arquivo foi selecionado
        if (arquivo) {
            // Seleciona o elemento de texto onde será exibido o nome do arquivo
            const nomeArquivo = document.querySelector(textoSelector);
            // Atualiza o conteúdo de texto com o nome do arquivo
            nomeArquivo.textContent = arquivo.name;
        } else {
            // Se nenhum arquivo foi selecionado (por exemplo, o usuário cancelou), exibe no console
            console.log("Nenhum arquivo selecionado.");
        }
    });
}

// Chamada da função para o input de "residência"
// Sempre que o usuário escolher um arquivo neste campo, o nome será exibido no elemento com a classe .conteudo__formulario__dados__texto
atualizaNomeArquivo("residencia", ".conteudo__formulario__dados__texto");

// Chamada da função para o input de "identidade"
// O nome do arquivo será mostrado no elemento com a classe .conteudo__formulario__dados__texto-identidade
atualizaNomeArquivo("identidade", ".conteudo__formulario__dados__texto-identidade");

/* O que esse código evita?

Ele evita que você tenha que repetir o mesmo bloco de código para cada campo de arquivo. É uma função reutilizável, ideal para quando você tem múltiplos campos de upload (como "residência" e "identidade"). */