const formulario = document.getElementById("perfil-form");
const dadosSalvos = JSON.parse(localStorage.getItem("cadastro"));

if (dadosSalvos) {
  // Preenche os campos com os dados do localStorage
  Object.keys(dadosSalvos).forEach(chave => {
    const campo = document.querySelector(`[name="${chave}"]`);
    if (campo) {
      campo.value = dadosSalvos[chave];
    }
  });
} else {
  alert("Nenhum dado encontrado. Você precisa se cadastrar primeiro.");
  window.location.href = "./index.html";
}

// Atualiza o localStorage ao salvar
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const novosDados = {};
  const campos = formulario.querySelectorAll("input");

  campos.forEach(campo => {
    novosDados[campo.name] = campo.value;
  });

  localStorage.setItem("cadastro", JSON.stringify(novosDados));

  document.getElementById("mensagemConfirmacao").textContent = "Dados atualizados com sucesso!";
});
