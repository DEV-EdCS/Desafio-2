# Desafio 3 - Trilhas Inova Maranhão

Este projeto simula um sistema de **cadastro, login e edição de dados de candidatos**, utilizando apenas **HTML, CSS e JavaScript**. Ele foi desenvolvido como parte do **Desafio 3 do programa Trilhas Inova Maranhão**, com foco em boas práticas de desenvolvimento front-end, validação de dados e experiência do usuário.

---

## 1. O que é o projeto

O sistema permite que o candidato:

- Preencha seus dados pessoais de forma segura.
- Veja uma tela de confirmação após o cadastro.
- Faça login utilizando CPF ou email e senha.
- Acesse uma **dashboard** onde pode visualizar e editar seus dados cadastrados.

Este projeto foca em:

- Validação personalizada dos dados.
- Boas práticas de UX/UI.
- Acessibilidade e responsividade.
- Uso do `localStorage` para simular um banco de dados local.

---

## 2. Como rodar localmente

### Pré-requisitos

Você só precisa de um navegador moderno como **Chrome**, **Firefox** ou **Edge**.

### Passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/DEV-EdCS/Desafio-2

2. Acesse a pasta do projeto:
   ```bash
   cd Desafio-2

3. Dê duplo clique no arquivo `index.html` para abrir no navegador **ou** utilize a extensão **Live Server** no VS Code.

---

## 3. Tecnologias utilizadas

- **HTML5** – marcação semântica e acessível
- **CSS3** – estilização com variáveis e responsividade
- **JavaScript (ESModules)** – modularização com `import`/`export`
- **localStorage** – persistência de dados no navegador

---

## 4. Funcionalidades implementadas

### Responsividade e melhorias no UX

- Layout adaptado para diferentes tamanhos de tela.
- Utilização de `rem` e `%` para garantir fluidez.
- Cores de destaque e mensagens visuais durante o uso.
- Inclusão de símbolos e alertas de mensagens para orientar o usuário.

### Cadastro e Validação

- Campos obrigatórios com `required` no HTML.
- Validação completa do CPF (dígitos verificadores e quantidade de caracteres).
- Verificação de formatos de email, telefone e data de nascimento.
- Cada validação foi separada em arquivos individuais e importada via `main.js`.

### Armazenamento local

- Os dados são armazenados localmente utilizando `localStorage`, simulando um pequeno banco de dados.

### Página de Login

- Verifica o ID (CPF ou email) e senha digitados.
- Só permite acesso se o usuário estiver previamente cadastrado.

### Página de Confirmação

- Após o preenchimento do formulário e envio dos dados, redireciona o usuário a uma tela que confirma que o cadastro foi finalizado com sucesso.

### Dashboard do Candidato

- Após login, o usuário acessa uma área onde visualiza seus dados.
- Os campos são editáveis (exceto CPF), com botão para salvar alterações e feedback de sucesso.

### Página Inicial (Index)

- Link para login
- Link para cadastro
- Edital oficial do programa
- Redes sociais do Inova Maranhão

---

## Melhorias futuras sugeridas

- Implementar API de CEP para preenchimento automático de endereço.
- Criar um painel administrativo para gerenciamento dos candidatos.
- Adicionar o sistema para os testes de nivelamento.
- Melhorar a navegação entre páginas e design responsivo avançado.

## Desenvolvido por

**Edlan Carvalho Silva** e **Luis Carlos Costa da Silva**
Projeto criado para o Desafio 3 do **Trilhas Inova Maranhão**.