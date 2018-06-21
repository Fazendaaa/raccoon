# raccoon

<div align = "center">
    <br>
    <img src="../../others/img/logo/logo.png" height=260>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](../../README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./README_PT.md)

</div>

## Sobre
Software desenvolvido para um processo seletivo.

### Dev
Comunicação com uma API REST que aceita apenas __GET__ e responde, no formato JSON -- unicode --, logs de softwares para que, desta maneira, desempenhe organização e agregação desses logs através de cálculo de métricas baseados nos dados.

O consumo da API será através de um token no header da requisição:
* Máximo de 30 requisições por minuto;
* 1200 logs a cada requisição ou os que não foram consumidos entre as requisições.

Apresentando:
* Número de mensagens de __Errors__ e __Criticals__ agrupando por hora;
* Os últimos cinco tracebacks;
* Média e desvio padrão do tempo das requisições que conterem logs com campos __response_code__ e __request_duration__.

Atualizar os dados a cada minuto, levando em conta os já consumidos. Como discutido com o recrutador, decidi optar por utilizar o tempo da máquina para rodar a requisição não um minuto em relação a inicialização da aplicação.

#### Dados
O _host_ e a _authorization_ a serem inseridos no header da requisão encontram-se em um arquivo __.env__ no formato:

```bash
HOSTNAME="endpoint-da-api-aqui"
AUTHORIZATION="chave-da-api-aqui"
```

Uma vez que a ideia não é ter o acesso a essas informações mas sim mostrar como foi desenvolvido o projeto.

Após carregado os requests serão feitos da seguinte maneira em um cabeçalho https:

```https
authorization: "chave-da-api-aqui"
cache-control: "no-cache"
user-agent: "Mozilla/5.0"
accept: "*/*"
host: "endpoint-da-api-aqui"
accept-encoding: "gzip, deflate"
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

## Tags

# Como utilizar

Para rodar os programas, antes de tudo, compile os arquivos, uma vez que foram feitos com TypeScript (TS) e devem rodar JS; para tal, abrar seu terminal no diretório raíz deste projeto e digite:

```bash
npm run build
```

## Dev
Uma vez feito isso, caso queira rodar o projeto de Dev basta rodar:

```bash
npm run dev
```

## Tags
Uma vez feito isso, caso queira rodar o projeto de Tags basta rodar:

```bash
npm run tags
```

# Construído com
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Cron](https://www.npmjs.com/package/cron)

## Código
Simples [Typescript](http://typescriptlang.org/) com o padrão de escrita [Microsoft linter standards](https://github.com/Microsoft/tslint-microsoft-contrib).

## Testes
Testes foram escritos com [Jest](https://facebook.github.io/jest/) atavés do pacote [ts-jest](https://www.npmjs.com/package/ts-jest) e há uma integração com [Travis CI](http://travis-ci.org/).

# Contribuindo
Converse comigo através de uma _issue_ sobre isso e analizarei o pedido.

# Versionamento
Não há nenhum sistema de versoinamento a ser utilizado devido a natureza efêmera do projeto e devido a não utilização de bibliotecas com uma alta taxa de atualizações. 

# A fazer
Caso saiba de atualizações ao processo, as farei aqui mesmo; ou em caso de uma segunda fase que utilize esta -- o que alteraria o sistema de versionamento.

# Autores
* Apenas [eu](https://github.com/Fazendaaa).

# Licença
Como muitos projetos open source, a licença MIT é utilizada, mais sobre isso em[LICENSE](https://github.com/Fazendaaa/raccoon/blob/master/LICENSE).
