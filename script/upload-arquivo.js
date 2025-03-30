function atualizaNomeArquivo(inputId, textoSelector) {
    const input = document.getElementById(inputId);

    input.addEventListener("change", () => {
        const arquivo = input.files[0];
        if (arquivo) {
            const nomeArquivo = document.querySelector(textoSelector);
            nomeArquivo.textContent = arquivo.name;
        }  else {
            console.log("Nenhum arquivo selecionado.");
        }
    });
}

atualizaNomeArquivo("residencia", ".conteudo__formulario__dados__texto");
atualizaNomeArquivo("identidade", ".conteudo__formulario__dados__texto-identidade");
