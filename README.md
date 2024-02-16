
# API Node com MongoDB

O projeto auth-node-mongo é uma aplicação Node.js para autenticação de usuários, registro de projetos e tarefas utilizando MongoDB como banco de dados. Esta versão do projeto é a 1.0.0.

## Funcionalidades Principais:

- **Autenticação de Usuários**: Permite que os usuários se cadastrem e façam login de forma segura.
- **Segurança**: Utiliza bcryptjs para criptografar senhas e jsonwebtoken para autenticação de usuários.
- **Envio de E-mails**: Implementa a funcionalidade de envio de emails para verificação de conta e recuperação de senha.
- **Tratamento de Arquivos**: Implementa a manipulação de arquivos utilizando o módulo fs e path.

## Tecnologias Utilizadas:

- **Express**.js: Framework web para Node.js que simplifica o desenvolvimento de aplicativos.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar dados dos usuários.
- **Mongoose**: Biblioteca para modelagem de objetos MongoDB.
- **Handlebars**: Engine de template para criação de emails personalizados.
- **Nodemailer**: Módulo Node.js para envio de emails.
- **dotenv**: Biblioteca para carregar variáveis de ambiente a partir de um arquivo .env.
- **Cors**: Middleware Express para habilitar o acesso de origens cruzadas (Cross-Origin Resource Sharing).
- **jsonwebtoken**: Implementação de JSON Web Tokens para autenticação de usuários.
- **bcryptjs**: Biblioteca para hash de senhas.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env na raiz do projeto

`mongodb_user`

`mongodb_password`

`mongodb_database`

`mongodb_cluster`


## Outro arquivos a serem criados

#### src/config/auth.json

```http
  // Exemplo de hash md5 para formar o jsonwebtoken
  {
    "secret":"24b73b213851993e900b2ebb45b1c81f"
  }
```

#### src/config/mail.json

```http
  // Credenciais para envio de e-mail (forgot-password)
  {
    "host": "mail.seudominio.com.br",
    "user": "no-reply@seudominio.com.br",
    "pass": "senha-email",
    "port": 465,
    "from": "Nome Remetente <no-reply@seudominio.com.br>"
}
```

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/natanoliveira/auth-node-mongo.git
```

Entre no diretório do projeto

```bash
  cd auth-node-mongo
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```
