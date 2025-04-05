// Função que valida se o campo "nome" possui um valor considerado válido
// Exporta essa função para ser usada em outro lugar (como na verificação do formulário)
export default function ehUmNome(campo) {
    // `.trim()` remove espaços em branco no início e no fim da string
    const nome = campo.value.trim();

    // Expressão regular que permite apenas letras (maiúsculas e minúsculas), letras com acento e espaços
    // Também valida se o nome tem pelo menos 3 caracteres
    const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome) && nome.length >= 3;

    // Se o nome for inválido (contém números, símbolos ou for muito curto), exibe mensagem personalizada
    if (!nomeValido) {
        campo.setCustomValidity('Por favor, preencha um nome válido.');
    } else {
        // Se for válido, limpa qualquer erro anterior
        campo.setCustomValidity('');
    }
}

/* O que esse código valida:

Só permite letras (com ou sem acento) e espaços — nada de números ou símbolos.

Exige que o nome tenha pelo menos 3 caracteres.

Usa setCustomValidity() para mostrar uma mensagem personalizada se o nome for inválido. */