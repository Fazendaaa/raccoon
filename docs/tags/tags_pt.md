# raccoon

<div align = "center">
    <br>
    <img src="../../others/img/logo/logo.png" height=260>
    <br>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](../../tags.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./tags_pt.md)

[![Build Status](https://travis-ci.com/Fazendaaa/raccoon.svg?style=flat-square&token=BF94uxZFxQqzoeyPcajX&branch=master)](https://travis-ci.com/Fazendaaa/raccoon)
[![codecov](https://img.shields.io/codecov/c/token/Uj7D7Luago/github/Fazendaaa/raccoon/master.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/raccoon)
[![Codacy Badge](https://img.shields.io/codacy/grade/bd29e1bc8b5c4bf6a5a595f3f59dbaaa.svg?style=flat-square)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Fazendaaa/raccoon&amp;utm_campaign=Badge_Grade)
[![Dependencies](https://david-dm.org/Fazendaaa/raccoon.svg?style=flat-square)](https://codeclimate.com/github/Fazendaaa/raccoon/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/Fazendaa/raccoon/badge.svg?style=flat-square)](https://snyk.io/test/github/Fazendaaa/raccoon)

</div>

## Questões
* [Primeira](./tags_pt.md###Primeira)
    * [Função 1](./tags_pt.md###Função_1)
    * [Função 2](./tags_pt.md###Função_2)
    * [Função 3](./tags_pt.md###Função_3)
    * [Função 4](./tags_pt.md###Função_4)
* [Segunda](./tags_pt.md###Segunda)
* [Terceira](./tags_pt.md###Terceira)
* [Desafio](./tags_pt.md###Desafio)

As questões seguintes utilizam as seguintes funções como base:

```js
const byId = (a, b) => a.id.localeCompare(b.id);

const fetchId = (value) => value.id;

const fetchDivId = (value) => value.dataset.id;

const fetchDivUrl = (value) => value.getElementsByTagName('img').item(0).src;

const fetchDivName = (value) => value.getElementsByTagName('h2').item(0).textContent;

const mergeProducts = (a, b) => {
    return {
        ...a,
        ...b
    };
};

const joiningProducts = (array, elements, divToProduct) => {
    const parsed = Array.from(elements).map(divToProduct).sort(byId);

    return array.sort(byId).map((product, index) => mergeProducts(product, parsed[index]));
};
```

E valores básicos:

```js
const { productList } = window;

const DOMProducts = document.getElementsByClassName('product');
```

# Primeira
## Função 1
O seguinte código irá retornar apenas os ids dos itens nos quais o atributo _available_ é __true__:

```js
const isAvailable = (value) => value.available;

const availableIds = (products) => products.filter(isAvailable).map(fetchId);

console.log(availableIds(productList));
```

## Função 2
O seguinte código irá retornar apenas os ids dos itens nos quais o atributo _category_ contém __smartphone__ no meio:

```js
const isSmartphone = (value) => {
    const matched = value.category.toLocaleLowerCase().match(/smartphone/gm);

    if (null === matched) {
        return false;
    }

    return 0 < matched.length;
};

const smartphonesIds = (products) => products.filter(isSmartphone).map(fetchId);

console.log(smartphonesIds(productList));
```

Nesta função decidi fazer a mudança da string para ficar toda lower case, evitando que qualquer mudança na forma de escrita dele a faça deixar de funionar normalmente.

## Função 3
O seguinte código irá retornar apenas os ids dos itens nos quais o atributo _available_ é __true__:

```js
export const isDivAvailable = (value) => 'true' === value.getAttribute('available');

const DOMAvailableIds = (products) => Array.from(products).filter(isDivAvailable).map(fetchDivId);

console.log(DOMAvailableIds(DOMProducts));
```

## Função 4
Retorne um array dos objetos de produtos, onde cada objeto contendo o seguinte modelo:

```js
{
    id: String,
    imageURL: String
}
```

Código:

```js
const fetchPartialProduct = (value) => {
    return {
        id: fetchDivId(value),
        imageURL: fetchDivUrl(value)
    };
};

const DOMPartialProduct = (products) => Array.from(products).map(fetchPartialProduct);

console.log(DOMPartialProduct(DOMProducts));
```

# Segunda
Juntar os dados dos produtos na DOM com os de __productList__ e retornar o array no formato:

```js
{
    id: String;
    category: String;
    name: String;
    available: Boolean
}
```

Código:

```js
const DivToProduct = (element) => {
    return {
        id: fetchDivId(element),
        name: fetchDivName(element)
    };
};

const joinBaseProducts = (array, elements) => joiningProducts(array, elements, divToProduct);

console.log(joinBaseProducts(productList, DOMProducts));
```

Testes foram realizados com os dados da maneira apresentada no site e não há necessidade de ordená-los. Todavia, os ordenei ainda assim porque como os dados na DOM podem ser alterados resolvi garantir que a função em si possa tratar os dados independentemente da ordem que eles sejam apresentados; isso garantirá que a função funcione normalmente mesmo para casos não apresentados.

# Terceira
Completando as informações dos produtos, resultando em um objeto do tipo:

```js
{
    id: String,
    category: String,
    name: String,
    available: Boolean,
    imageURL: String,
    priceFrom: Number,
    priceTo: Number
}
```

Código:

```js
const fetchDivPrice = (value) => {
    const prices = value.getElementsByTagName('span');

    return {
        priceTo: fetchSpanPrice(prices.item(1)),
        priceFrom: fetchSpanPrice(prices.item(0))
    }
};

const fetchDivUrl = (value) => value.getElementsByTagName('img').item(0).src;

const DivToProduct = (element) => {
    return {
        id: fetchDivId(element),
        ...fetchDivPrice(element),
        name: fetchDivName(element),
        imageURL: fetchDivUrl(element)
    };
};

const joinProducts = (array, elements) => joiningProducts(array, elements, divToProduct);

console.log(joinProducts(productList, DOMProducts));
```

Mesma justificativa do ordernar os dados da questão anterior.

# Desafio
Esta [reportagem](http://diveintohtml5.info/storage.html) me ajudou.
