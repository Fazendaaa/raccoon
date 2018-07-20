# raccoon

<div align="center">
    <br>
    <img src="./others/img/logo/logo.png" height=260>
    <br>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](./tags.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./docs/readme/tags_pt.md)

[![Build Status](https://img.shields.io/travis/Fazendaaa/raccoon.svg?style=flat-square)](https://travis-ci.org/Fazendaaa/raccoon)
[![codecov](https://img.shields.io/codecov/c/github/Fazendaaa/raccoon.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/raccoon)
[![Codacy Badge](https://img.shields.io/codacy/grade/bd29e1bc8b5c4bf6a5a595f3f59dbaaa.svg?style=flat-square)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Fazendaaa/raccoon&amp;utm_campaign=Badge_Grade)
[![Dependencies](https://david-dm.org/Fazendaaa/raccoon.svg?style=flat-square)](https://codeclimate.com/github/Fazendaaa/raccoon/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/Fazendaaa/raccoon/badge.svg)](https://snyk.io/test/github/Fazendaaa/raccoon)

</div>

## Questions
- [raccoon](#raccoon)
    - [Questions](#questions)
- [1st](#1st)
    - [1st Function](#1st-function)
    - [2nd Function](#2nd-function)
    - [3th Function](#3th-function)
    - [4th Function](#4th-function)
- [2nd](#2nd)
- [3th](#3th)
- [Challenge](#challenge)

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

# 1st
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
This [article](http://diveintohtml5.info/storage.html) help me out to learn more about __Storage__ and it's a very good website, with a relevant content to understand the "whys" to use it and the how.

Since browsers are _stateless_, one possible solution to the task presented is to use the built-in storage. It's just this solution won't work in non supported browsers that don't implement __localStorage__, which means, won't work in all possibles cases scenarios. To work just inject the following code in the first webpage:

```js
const saveProductsToLocal = (data, local) => {
    if (undefined === local) {
        return false;
    }

    local.setItem('productList', JSON.stringify(data));

    return true;
};

saveProductsToLocal(joinProducts(productList, DOMProducts), localStorage);
```

Once in the second webpage, to fetch this data just run the following code:

```js
const fetchProductsFromLocal = (local) => {
    if (undefined === local) {
        return null;
    }

    return JSON.parse(local.getItem('productList'));
};

window.productList = fetchProductsFromLocal(window.localStorage);
```

The localStorage and productList of presented before are different from those presented in the first part because this are variables from the second page. Because of this, the second page will be populated with the desired data; in case that the browser doesn't allow it, productList will be _null_.
