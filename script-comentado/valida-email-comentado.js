// Exporta a função principal para validação de e-mail, usada em um campo de formulário
export default function ehUmEmail(campo) {
    // Captura o valor digitado pelo usuário no campo de e-mail
    const email = campo.value;

    // Expressão regular (regex) para verificar o formato básico de um e-mail
    // - ^[^\s@]+ → início com um ou mais caracteres que não são espaços nem "@"
    // - @ → obrigatório ter um arroba
    // - [^\s@]+ → domínio com um ou mais caracteres (sem espaço e sem "@")
    // - \. → ponto separando domínio e extensão (ex: ".com")
    // - [^\s@]+$ → extensão com um ou mais caracteres
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Se o e-mail não passar na validação, definimos uma mensagem de erro personalizada
    if (!emailValido) {
        campo.setCustomValidity('Por favor, preencha um e-mail válido.');
    } else {
        // Se o e-mail for válido, remove qualquer erro anterior
        campo.setCustomValidity('');
    }
}

/* O que essa função faz:

Verifica se o formato do e-mail é válido com uma regex simples.

Não checa se o e-mail existe, apenas se está no formato usuario@dominio.extensao.

A função é chamada quando o campo perde o foco (blur) ou ao tentar enviar o formulário.

Usa setCustomValidity() para integrar com o sistema nativo de validação do HTML5. */