// Função principal exportada para validar CPF em um campo de formulário
export default function ehUmCPF(campo) {
    // Remove pontos e traço do CPF (ex: 123.456.789-00 vira 12345678900)
    const cpf = campo.value.replace(/\.|-/g, "");

    // Verifica se o CPF é inválido com base em três critérios:
    // 1. Todos os dígitos iguais
    // 2. Dígito verificador 1 inválido
    // 3. Dígito verificador 2 inválido
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse cpf não é válido');
    }
}

function validaNumerosRepetidos(cpf) {
    // Lista de CPFs inválidos com todos os dígitos repetidos
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    // Retorna true se o CPF estiver na lista acima
    return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    // Multiplica os 9 primeiros dígitos por pesos decrescentes de 10 a 2
    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    // Calcula o resto da divisão após multiplicar por 10
    soma = (soma * 10) % 11;

    // Se o resultado for 10 ou 11, o dígito verificador é 0
    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    // Retorna true se o dígito calculado for diferente do dígito real (posição 9)
    return soma != cpf[9];
}

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    // Multiplica os 10 primeiros dígitos por pesos decrescentes de 11 a 2
    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    // Calcula o segundo dígito verificador
    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    // Retorna true se o dígito calculado for diferente do dígito real (posição 10)
    return soma != cpf[10];
}

/* Essa validação verifica se:

O CPF não é uma sequência repetida.

O primeiro dígito verificador está correto.

O segundo dígito verificador também está correto.

Se qualquer uma dessas verificações falhar, o campo recebe um erro com setCustomValidity() e o formulário não será enviado até que o CPF seja corrigido. */