
# Auth JWT - Projeto de Autenticação com Token JWT

O projeto Auth JWT é uma aplicação Angular que simula a autenticação com token JWT (JSON Web Token) utilizando o JSON Server como uma API de backend. Ele é construído com o intuito de demonstrar o uso de conceitos como Guards, Services, Interceptors, Local Storage e comunicação com uma API REST.

## Configuração Adicional

Para executar o projeto corretamente, é necessário configurar o ambiente para emular o backend utilizando o JSON Server. Siga as instruções abaixo:

### Passo 1: Instalar o JSON Server

Certifique-se de ter o Node.js instalado em seu sistema. Caso não tenha, você pode fazer o download e instalá-lo a partir do [site oficial do Node.js](https://nodejs.org/).

Abra o terminal na pasta raiz do projeto e execute o seguinte comando para instalar globalmente o JSON Server:

```bash
npm install -g json-server
```

### Passo 2: Executar o JSON Server

No terminal, dentro da pasta raiz do projeto, execute o seguinte comando para iniciar o JSON Server e simular o backend:

```bash
json-server --watch db.json
```

Isso iniciará o JSON Server e utilizará o arquivo `db.json` como fonte de dados para simular as operações da API.

## Executando o Projeto Angular

Após configurar o JSON Server, você pode iniciar a execução do projeto Angular. Certifique-se de ter o Angular CLI instalado. Se não tiver, você pode instalá-lo globalmente com o seguinte comando:

```bash
npm install -g @angular/cli
```

Agora você pode iniciar a aplicação Angular. No terminal, dentro da pasta raiz do projeto, execute os seguintes comandos:

```bash
npm install
ng serve
```

Isso instalará as dependências do projeto e iniciará a aplicação Angular. Você pode acessar a aplicação no seu navegador através da URL [http://localhost:4200/](http://localhost:4200/).

Lembre-se de que a aplicação utilizará o JSON Server como backend emulado, portanto, certifique-se de manter o JSON Server em execução enquanto testa a aplicação.

## Contribuindo

Se você deseja contribuir com este projeto, sinta-se à vontade para criar um fork do repositório, fazer as alterações desejadas e enviar um pull request. Suas contribuições são bem-vindas!

## Contato

Se você tiver alguma dúvida ou sugestão em relação a este projeto, você pode entrar em contato através do [repositório no GitHub](https://github.com/sabiobru/auth-jwt).

**Divirta-se explorando e aprendendo com o projeto Auth JWT!**
```
