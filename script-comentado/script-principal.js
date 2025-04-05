// Importa as funções de validação específicas para cada campo, organizadas em módulos separados
import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
import ehUmNome from "./valida-nome.js";
import ehUmEmail from "./valida-email.js";
import ehUmTelefone from "./valida-telefone.js";
import ehUmArquivoPDF from "./valida-arquivo.js";

// Seleciona o formulário com o atributo personalizado data-formulario
const formulario = document.querySelector("[data-formulario]");

/**
 * Função que converte um arquivo (como PDF) para Base64
 * Isso é útil para salvar o conteúdo do arquivo no localStorage ou enviar via API
 */
function converterArquivoParaBase64(arquivo, callback) {
    const leitor = new FileReader(); // Cria um novo leitor de arquivos
    leitor.onload = function (evento) {
        callback(evento.target.result); // Quando a leitura estiver pronta, chama o callback com o resultado
    };
    leitor.readAsDataURL(arquivo); // Lê o arquivo como uma URL codificada em Base64
}

// Adiciona um evento de "submit" ao formulário
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o comportamento padrão de enviar o formulário

    // Cria um objeto com os dados preenchidos no formulário
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "aniversario": e.target.elements["aniversario"].value,
        "cpf": e.target.elements["cpf"].value,
        "genero": e.target.elements["genero"].value,
        "email": e.target.elements["email"].value,
        "telefone": e.target.elements["telefone"].value,
        "cep": e.target.elements["cep"].value,
        "rua": e.target.elements["rua"].value,
        "numero": e.target.elements["casa"].value,
        "cidade": e.target.elements["cidade"].value,
        "estado": e.target.elements["estado"].value,
        "trilha": e.target.elements["trilha"].value,
        "termos": e.target.elements["termos"].checked // Checkbox: retorna true ou false
    }

    // Seleciona os arquivos PDF enviados (identidade e residência)
    const identidade = e.target.elements["identidade"].files[0];
    const residencia = e.target.elements["residencia"].files[0];

    // Se o usuário enviou o arquivo de identidade
    if (identidade) {
        converterArquivoParaBase64(identidade, (resultado) => {
            listaRespostas.identidade = resultado; // Adiciona ao objeto
            if (residencia) {
                // Se também enviou o comprovante de residência
                converterArquivoParaBase64(residencia, (resultadoResidencia) => {
                    listaRespostas.residencia = resultadoResidencia;
                    // Salva no localStorage e redireciona para a página de confirmação
                    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
                    window.location.href = "./confirmacao.html";
                });
            } else {
                // Só identidade foi enviada
                localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
                window.location.href = "./confirmacao.html";
            }
        });
    } else {
        // Nenhum arquivo foi enviado
        localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
        window.location.href = "./confirmacao.html";
    }
});

// Seleciona todos os campos obrigatórios do formulário
const camposDoFormulario = document.querySelectorAll("[required]");

// Para cada campo, adiciona eventos de "blur" (perdeu o foco) e "invalid" (formulário inválido)
camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo)); // Quando sair do campo, executa validação
    campo.addEventListener("invalid", evento => evento.preventDefault()); // Impede a mensagem automática do navegador
});

// Exibe dinamicamente o nome do arquivo enviado no campo de residência
const residenciaInput = document.getElementById("residencia");
residenciaInput.addEventListener("change", () => {
    const arquivo = residenciaInput.files[0];
    if (arquivo) {
        const nomeArquivo = document.querySelector(".conteudo__formulario__dados__texto");
        nomeArquivo.textContent = arquivo.name; // Mostra o nome do arquivo abaixo da área de upload
    }
});

// Lista dos tipos de erro que podem ocorrer nos campos do formulário
const tiposDeErro = [
    'valueMissing', // campo vazio
    'typeMismatch', // tipo incorreto (ex: e-mail com formato inválido)
    'patternMismatch', // expressão regular não bate
    'tooShort', // tamanho mínimo não alcançado
    'customError' // erro personalizado definido no JS
];

// Mensagens personalizadas para cada campo e tipo de erro
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    genero: {
        valueMissing: "O campo de gênero não foi selecionado.",
        typeMismatch: "Por favor, marque uma opção válida.",
        tooShort: "Por favor, marque uma opção válida."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    telefone: {
        valueMissing: 'O campo de telefone não pode estar vazio.',
        patternMismatch: "Por favor, preencha um telefone válido.",
        customError: "O telefone digitado não existe.",
        tooShort: "O campo de telefone não tem caractéres suficientes."
    },
    identidade: {
        valueMissing: 'O arquivo de identidade não foi enviado.',
        typeMismatch: "Por favor, envie um arquivo PDF válido.",
        customError: "O arquivo de identidade deve estar no formato PDF."
    },
    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CEP válido.",
        tooShort: "O campo de CEP não tem caractéres suficientes."
    },
    rua: {
        valueMissing: 'O campo de rua não pode estar vazio.',
        tooShort: "Por favor, preencha uma rua válida."
    },
    casa: {
        valueMissing: 'O campo de número não pode estar vazio.',
        patternMismatch: "Por favor, preencha um número válido.",
        tooShort: "Por favor, preencha um número válido."
    },
    cidade: {
        valueMissing: 'O campo de cidade não pode estar vazio.',
        tooShort: "Por favor, preencha uma cidade válida."
    },
    estado: {
        valueMissing: 'O campo de estado não pode estar vazio.',
        tooShort: "Por favor, preencha um estado válido."
    },
    residencia: {
        valueMissing: 'O arquivo de comprovante de residência não foi enviado.',
        typeMismatch: "Por favor, envie um arquivo PDF válido.",
        customError: "O arquivo de residência deve estar no formato PDF."
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

/**
 * Função que verifica se o campo está válido
 * Aplica validações personalizadas dependendo do tipo do campo
 */
function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity(''); // Limpa qualquer erro anterior

    // Validações personalizadas por campo
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo); // Chama a função que valida o CPF
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo); // Verifica se a pessoa é maior de idade
    }
    if (campo.name == "nome" && campo.value != "") {
        ehUmNome(campo); // Valida nome
    }
    if (campo.name == "telefone" && campo.value != "") {
        ehUmTelefone(campo); // Valida telefone
    }
    if (campo.name == "email" && campo.value != "") {
        ehUmEmail(campo); // Valida e-mail
    }
    if ((campo.name == "identidade" || campo.name == "residencia") && campo.files.length > 0) {
        ehUmArquivoPDF(campo); // Valida se o arquivo enviado é um PDF
    }

    // Percorre a lista de tipos de erro e verifica se algum ocorreu
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]; // Pega a mensagem correspondente
        }
    })

    // Seleciona o elemento de erro (span) que está próximo ao campo
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity(); // Verifica se o campo está válido

    // Exibe ou limpa a mensagem de erro
    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
