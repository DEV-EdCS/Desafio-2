// Exporta a função para que ela possa ser usada em outros arquivos (como no validador principal)
export default function ehUmTelefone(campo) {
    // Remove todos os caracteres que não são dígitos (números)
    // Exemplo: "(11) 91234-5678" vira "11912345678"
    const telefone = campo.value.replace(/\D/g, '');

    // Verifica se o telefone tem entre 10 e 11 dígitos (DDD + número)
    // Formato válido:
    // - 10 dígitos: fixo com DDD (ex: 1134567890)
    // - 11 dígitos: celular com DDD (ex: 11912345678)
    if (!/^\d{10,11}$/.test(telefone)) {
        // Se não tiver o número correto de dígitos ou conter caracteres inválidos, define a mensagem de erro
        campo.setCustomValidity('Por favor, preencha um telefone válido.');
    } else {
        // Se estiver tudo certo, remove qualquer mensagem de erro anterior
        campo.setCustomValidity('');
    }
}

/* O que esse código valida:

Remove automaticamente tudo que não é número.

Só aceita 10 ou 11 dígitos (incluindo DDD).

Usa setCustomValidity() para criar mensagens personalizadas de erro. */