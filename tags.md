# raccoon

<div align = "center">
    <br>
    <img src="./others/img/logo/logo.png" height=260>
    <br>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](./tags.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./docs/readme/tags_pt.md)

[![Build Status](https://travis-ci.com/Fazendaaa/raccoon.svg?style=flat-square&token=BF94uxZFxQqzoeyPcajX&branch=master)](https://travis-ci.com/Fazendaaa/raccoon)
[![codecov](https://img.shields.io/codecov/c/token/Uj7D7Luago/github/Fazendaaa/raccoon/master.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/raccoon)
[![Codacy Badge](https://img.shields.io/codacy/grade/bd29e1bc8b5c4bf6a5a595f3f59dbaaa.svg?style=flat-square)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Fazendaaa/raccoon&amp;utm_campaign=Badge_Grade)
[![Dependencies](https://david-dm.org/Fazendaaa/raccoon.svg?style=flat-square)](https://codeclimate.com/github/Fazendaaa/raccoon/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/Fazendaa/raccoon/badge.svg?style=flat-square)](https://snyk.io/test/github/Fazendaaa/raccoon)

</div>

## Questions
* [#1](./tags.md###1th)
    * [1st Function](./tags_pt.md###1st_Function)
    * [2nd Function](./tags_pt.md###2nd_Function)
    * [3th Function](./tags_pt.md###3th_Function)
    * [4th Function](./tags_pt.md###4th_Function)
* [#2](./tags.md###2th)
* [#3](./tags.md###3th)
* [Challenge](./tags.md###Challenge)

The following questions use as base the following functions:

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

And the following values as base:

```js
const { productList } = window;

const DOMProducts = document.getElementsByClassName('product');
```

# 1th
## 1st Function
The following code will return only the ids of those items which attribute _available_ is __true__:

```js
const isAvailable = (value) => value.available;

const availableIds = (products) => products.filter(isAvailable).map(fetchId);

console.log(availableIds(productList));
```

## 2nd Function
The following code will only return the ids of the items in which the _category_ attribute contains __smartphone__ in the middle:

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

In the function I've decided to change the string to lower case, avoiding all change that any change on the writing of the word __"smartphone"__ make stop it stop work properly.

## 3th Function
The following code will return only the ids of the items in which the attribute _available_ is __true__:

```js
export const isDivAvailable = (value) => 'true' === value.getAttribute('available');

const DOMAvailableIds = (products) => Array.from(products).filter(isDivAvailable).map(fetchDivId);

console.log(DOMAvailableIds(DOMProducts));
```

## 4th Function
Return an object array of products, where the object is in the following model:

```js
{
    id: String,
    imageURL: String
}
```

Code:

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

# 2nd
Merge the following data of the products from the DOM with those of the __productList__ and return it the array on the following model:

```js
{
    id: String;
    category: String;
    name: String;
    available: Boolean
}
```

Code:

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

Tests were made with the data presented on the website and there's no need to sort them. Anyway, I've ordered it because as the DOM data could be switched and I've decided to address this allowing it to have a consistency to the expected data; this will allow it to work even work properly with cases thar aren't presented.

# 3th
Filling the lack of products info, resulting in a object like:

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

Code:

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

Same answer of ordering as the previously question.

# Challenge
This [article](http://diveintohtml5.info/storage.html) help me out.
