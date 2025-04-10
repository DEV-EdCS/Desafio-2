import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
import ehUmNome from "./valida-nome.js";
import ehUmEmail from "./valida-email.js";
import ehUmTelefone from "./valida-telefone.js";
import ehUmArquivoPDF from "./valida-arquivo.js";

const formulario = document.querySelector("[data-formulario]");

function converterArquivoParaBase64(arquivo, callback) {
    const leitor = new FileReader();
    leitor.onload = function (evento) {
        callback(evento.target.result);
    };
    leitor.readAsDataURL(arquivo);
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();  

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "senha": e.target.elements["senha"].value,
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
        "termos": e.target.elements["termos"].checked, // para checkbox
    }
    // Converte os arquivos PDF para Base64
    const identidade = e.target.elements["identidade"].files[0];
    const residencia = e.target.elements["residencia"].files[0];

    if (identidade) {
        converterArquivoParaBase64(identidade, (resultado) => {
            listaRespostas.identidade = resultado;
            if (residencia) {
                converterArquivoParaBase64(residencia, (resultadoResidencia) => {
                    listaRespostas.residencia = resultadoResidencia;
                    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
                    window.location.href = "./confirmacao.html";
                });
            } else {
                localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
                window.location.href = "./confirmacao.html";
            }
        });
    } else {
        localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
        window.location.href = "./confirmacao.html";
    }
});

const camposDoFormulario = document.querySelectorAll("[required]");

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const residenciaInput = document.getElementById("residencia");

residenciaInput.addEventListener("change", () => {
    const arquivo = residenciaInput.files[0];
    if (arquivo) {
        const nomeArquivo = document.querySelector(".conteudo__formulario__dados__texto");
        nomeArquivo.textContent = arquivo.name;
    }
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

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

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }
    if (campo.name == "nome" && campo.value != "") {
        ehUmNome(campo);
    }
    if (campo.name == "telefone" && campo.value != "") {
        ehUmTelefone(campo);
    }
    if (campo.name == "email" && campo.value != "") {
        ehUmEmail(campo);
    }
    if ((campo.name == "identidade" || campo.name == "residencia") && campo.files.length > 0) {
        ehUmArquivoPDF(campo);
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}