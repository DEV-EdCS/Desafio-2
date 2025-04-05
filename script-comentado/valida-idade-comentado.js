// Função principal que valida se a pessoa é maior de idade
// Exporta para ser usada em outros arquivos do formulário
export default function ehMaiorDeIdade(campo) {
    // Converte o valor do campo (string de data) para um objeto Date
    const dataNascimento = new Date(campo.value);

    // Se o usuário não for maior de idade, define uma mensagem de erro personalizada
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

// Função auxiliar que verifica se a data recebida representa alguém com 18 anos ou mais
function validaIdade(data) {
    // Cria uma data representando o momento atual
    const dataAtual = new Date();

    // Calcula a data em que o usuário completará 18 anos
    // Soma 18 anos ao ano da data de nascimento
    const dataMais18 = new Date(
        data.getUTCFullYear() + 18, // ano + 18
        data.getUTCMonth(),         // mesmo mês
        data.getUTCDate()           // mesmo dia
    );

    // Compara se a data atual é igual ou posterior à data em que o usuário completa 18
    return dataAtual >= dataMais18;
}

/* O que esse código faz:

Garante que o usuário tenha pelo menos 18 anos com base na data de nascimento digitada.

Usa setCustomValidity() para mostrar uma mensagem de erro se o usuário for menor de idade.

Leva em conta ano, mês e dia para fazer uma verificação precisa, inclusive se o aniversário ainda não chegou no ano atual. */