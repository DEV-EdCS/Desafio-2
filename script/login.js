const form = document.getElementById("login-form");
const inputUsuario = document.getElementById("loginUsuario");
const inputSenha = document.getElementById("loginSenha");
const mensagemLogin = document.getElementById("mensagemLogin");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuarioDigitado = inputUsuario.value.trim();
    const senhaDigitada = inputSenha.value;

    const dadosSalvos = JSON.parse(localStorage.getItem("cadastro"));

    if (!dadosSalvos) {
        mensagemLogin.textContent = "Nenhum cadastro encontrado.";
        return;
    }

    const cpfOuEmailCadastrado = dadosSalvos.cpf === usuarioDigitado || dadosSalvos.email === usuarioDigitado;
    const senhaCadastrada = dadosSalvos.senha === senhaDigitada;

    if (cpfOuEmailCadastrado && senhaCadastrada) {
        mensagemLogin.textContent = "";
        window.location.href = "./dashboard.html";
    } else {
        mensagemLogin.textContent = "Usuário ou senha inválidos.";
    }
});
