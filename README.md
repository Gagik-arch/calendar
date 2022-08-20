# Maintainers Wanted

This project is intended to be consumed for all of type java script projects.

[![Build Status](https://github.com/Gagik-arch/calendar)](https://github.com/Gagik-arch/calendar)
[![npm version](https://www.npmjs.com/package/calendar-npm)](https://www.npmjs.com/package/calendar-npm)
[![Coverage Status](https://coveralls.io/github/Gagik-arch/calendar)](https://coveralls.io/github/Gagik-arch/calendar)

## Table of contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Arguments](#Arguments)
-   [Methods](#Methods)
-   [Built With](#built-with)
-   [Author](#author)
-   [License](#license)

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Installation

```sh
$ npm install calendar-npm
```

## Usage

```sh
 const calendar = new Calendar()
```

#### Arguments

| Type          | Default value | example                                            |
| ------------- | ------------- | -------------------------------------------------- |
| Date {Object} | new Date()    | const calendar = new Calendar(new Date(2022,7,15)) |

#### Methods

| Method      | argument   |
| ----------- | ---------- |
| toDate      | new Date() |
| toPrevMonth | none       |
| toNextMonth | none       |
| toNextYear  | none       |
| toPrevYear  | none       |

toDate(Date {Object})

toPrevMonth()

toNextMonth()

toNextYear()

toPrevYear()

Example:

```js
const calendar = new Calendar();
const btn = document.getElementByTabName("button")[0];

btn.onclick = () => {
    // calendar.toDate(new Date(2025,5,16));
    // calendar.toPrevMonth();
    // calendar.toNextMonth();
    // calendar.toNextYear();
    // calendar.toPrevYear();
};
```

## Built With

-   Gagik-arch

## Author

-   **Gagik** - _Initial work_ - [gagik-arch](https://github.com/Gagik-arch)
