
# API Node com MongoDB

O projeto auth-node-mongo é uma aplicação Node.js para autenticação de usuários utilizando MongoDB como banco de dados. Esta versão do projeto é a 1.0.0.

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
