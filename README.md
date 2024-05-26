# Projeto Desafio Jera

Este é um projeto de exemplo desenvolvido com o objetivo de demonstrar habilidades em desenvolvimento backend utilizando NestJS, PostgreSQL e TypeScript.

## Tecnologias Utilizadas

- **NestJS**: Um framework para a construção de aplicativos Node.js escaláveis e eficientes.
- **PostgreSQL**: Um sistema de gerenciamento de banco de dados relacional poderoso e open-source.
- **TypeScript**: Um superconjunto de JavaScript que adiciona tipagem estática opcional.

## Passo a Passo para Rodar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente:

### Clonar o Repositório

Clone o repositório do projeto usando o comando:

```bash
git clone https://github.com/rafaelccorrea/desafio_jera.git
```

### Instalar Dependências

Navegue até o diretório do projeto clonado e instale as dependências usando o Yarn:

```bash
cd desafio_jera
yarn install
```

### Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente com seus respectivos valores:

```plaintext
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
ROUTER_CALLBACK_URL=your_router_callback_url
```

### Rodar o Projeto

Para iniciar o servidor de desenvolvimento, execute o comando:

```bash
yarn dev
```

### Documentação da API
A documentação da API está disponível no Swagger e pode ser acessada através da URL:

```bash
http://localhost:3000/api#
```