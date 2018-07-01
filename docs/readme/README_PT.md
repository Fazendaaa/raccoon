# raccoon

<div align = "center">
    <br>
    <img src="../../others/img/logo/logo.png" height=260>
    <br>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](../../README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./README_PT.md)

</div>

## Sobre
Software desenvolvido para um processo seletivo.

### Dev
Uma programa de Interface de Linha de Comando (CLI) para mostrar infromações consumidos de alguns projetos. Essas informações são consumidas através de dados provenientes de uma Interface de Programação de Transferência de Dados de Transferência de Estados Representativos (REST API) que aceita apenas __GET__ e responde, no formato JSON -- unicode --, logs de softwares para que, desta maneira, desempenhe organização e agregação desses logs apresentando as seguintes informações:
* Média e desvio padrão do tempo das requisições;
* Últimos cinco tracebacks dentre todos os projetos;
* Contador de erros e mensagens críticas, agrupados por projeto e hora.

O consumo da API possui as seguintes características:
* Máximo de 30 requisições por minuto;
* 1200 logs a cada requisição ou os que não foram consumidos entre as requisições.

Atualizar os dados a cada minuto, levando em conta os já consumidos. Como discutido com o recrutador, decidi optar por utilizar o tempo de inicialização da aplicação como o contador de tempo das requisições.

#### Dados
O _host_ e a _authorization_ a serem inseridos no header da requisão encontram-se em um arquivo __.env__ no formato:

```bash
HOSTNAME="endpoint-da-api-aqui"
AUTHORIZATION="chave-da-api-aqui"
```

Uma vez que a ideia não é ter o acesso a essas informações mas sim mostrar como foi desenvolvido o projeto.

Os requests serão feitos da seguinte maneira em um cabeçalho https:

```https
hostname: "endpoint-da-api-aqui"
authorization: "chave-da-api-aqui"
```

Já a resposta será um array do tipo:

```typescript
{
    timestamp: number;
    level: INFO | DEBUG | ERROR | CRITICAL (string);
    project: string;
    message: string;
    response_code: number;
    traceback: string (opcional);
    request_duration: number (opcional); 
}
```

Como a API será consumida por uma aplicação Node -- e os números são todos _floats_ por causa do JavaScript (JS) em si -- modifiquei o estilo da resposta a ser apresentada aqui porque, para a aplicação, não vai importar se o número será __float__ ou __int__.

#### CLI

## Tags

# Instalação
Os projetos dependem de [Node](https://nodejs.org/) e do [npm](https://www.npmjs.com/) para funcionar, então basta instalar eles e rodar em seguida no diretório contendo os arquivos o seguinte comando no terminal:

```bash
npm install
```

# Como utilizar

Para rodar os programas, antes de tudo, compile os arquivos, uma vez que foram feitos com TypeScript (TS) e devem rodar JS; para tal, abrar seu terminal no diretório raíz deste projeto e digite:

```bash
npm run build
```

## Dev
Caso queira rodar o projeto de Dev basta rodar:

```bash
npm run dev
```

## Tags
Caso queira rodar o projeto de Tags basta rodar:

```bash
npm run tags
```

# Construído com
* [Dotenv](https://www.npmjs.com/package/dotenv)

## Código
Simples [Typescript](http://typescriptlang.org/) com o padrão de escrita [Microsoft](https://github.com/Microsoft/tslint-microsoft-contrib).

Algumas funções possuem _side-effects_, elas possuem **__** no final do nome.

## Testes
Testes foram escritos com [Jest](https://facebook.github.io/jest/) atavés do pacote [ts-jest](https://www.npmjs.com/package/ts-jest) e há uma integração com [Travis CI](http://travis-ci.org/). Para rodar todos os testes basta rodar:

```bash
npm test
```

# Contribuindo
Converse comigo através de uma _issue_ sobre isso e analizarei o pedido.

# Versionamento
Não há nenhum sistema de versionamento a ser utilizado devido a natureza efêmera do projeto e devido a não utilização de bibliotecas com uma alta taxa de atualizações. 

# A fazer
Caso saiba de atualizações ao processo, as farei aqui mesmo; ou em caso de uma segunda fase que utilize esta -- o que alteraria o sistema de versionamento.

# Autores
* Apenas [eu](https://github.com/Fazendaaa).

# Licença
Como muitos projetos open source, a licença MIT é utilizada, mais sobre isso em [LICENSE](https://github.com/Fazendaaa/raccoon/blob/master/LICENSE).
