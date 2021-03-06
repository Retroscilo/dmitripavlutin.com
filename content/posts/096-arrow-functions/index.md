---
title: "Understanding Arrow Functions in 5 Easy Steps"
description: "Walk 5 easy steps to understand arrow functions in JavaScript: syntax, shortening, this value, arguments, and limitations."
published: "2020-09-08T07:50Z"
modified: "2020-09-08T07:50Z"
thumbnail: "./images/cover.png"
slug: javascript-arrow-functions
tags: ['javascript', 'arrow function', 'function']
recommended: ['differences-between-arrow-and-regular-functions', 'javascript-arrow-functions-best-practices']
type: post
commentsThreadId: javascript-arrow-functions
---

The usual way to define JavaScript functions is using the *function declaration* or *function expression*:

```javascript
// Function declaration
function greet(who) {
  return `Hello, ${who}!`;
}

// Function expression
const greetExpression = function(who) {
  return `Hello, ${who}!`;
};
```

But functions can be further improved. Making the syntax shorter (useful for writing short callbacks) and ease the resolving of `this` created a new type of functions named *arrow functions*.  

I'm going to explain, in 5 easy steps, how to use arrow functions in JavaScript.

```toc
toHeading: 2
```

## Step 1: syntax

> The central symbol of an arrow function is the fat arrow `=>`. On the left side enumerate the parameters `(param1, param2, ..., paramN) ` and on the right side write the body `{ ... }`.

```javascript
(param1, param2, ..., paramN) => { ... }
```

Let's define an arrow function to greet a person:

```javascript
const greet = (who) => {
  return `Hello, ${who}!`;
};

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

`greet` is an arrow function. The symbol `=>` delimits the parameters in parentheses `(who)` and the function body consisting of ``return `Hello, ${who}!` ``.  

`greet('Eric Cartman')` is how you call an arrow function. There's no difference between calling a regular function and an arrow function.  

The arrow function fits well as a callback because of the concise syntax. For example, here's how you could duplicate the numbers of an array:

```javascript
const numbers = [4, 5, 2, 6];

const duplicated = numbers.map((number) => {
  return number * 2;
});

duplicated; // => [8, 10, 4, 12]
```

`(number) => { return number * 2; }` is an arrow function used as a callback of `number.map()` method.  

## Step 2: shortening

In the previous examples, the arrow function had been used in the long form: both parentheses and curly braces were present. But under certain conditions you can omit these, making the arrow function shorter!  

### Omitting parenthesis

> If the arrow function has one parameter, the parentheses around this parameter can be omitted.  

```javascript
(param) => { ... }
// can be simplified to:
param => { ... }
```

For example, the `greet` function has only one parameter `who`. That's good because you can omit the parentheses around the one parameter:

```javascript
const greet = who => {
  return `Hello, ${who}!`;
};

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

Nevertheless, if the arrow function accepts a rest parameter, destructures the parameter or has no parameters, then you have to *keep the parentheses*:

```javascript
const greetObject = ({ name }) => {
  return `Hello, ${name}!`;
}

const greetPeople = (...args) => {
  return `Hello, ${args.join(' and ')}!`;
}

const sayHello = () => {
  return 'Hello!';
}

greetObject({ name: 'Eric' }); // => 'Hello, Eric!'
greetPeople('Eric', 'Stan');   // => 'Hello, Eric and Stan!'
sayHello();                    // => 'Hello!'
```

### Omitting curly braces

> If the arrow function body contains one statement, you can omit the curly braces and the expression is going to be implicitely returned.  

```javascript
(param1, param2, ..., paramN) => { return statement; }
// can be simplified to:
(param1, param2, ..., paramN) => statement
```

Fortunately, `greet` contains one statement, so let's omit the curly braces around the function body:

```javascript
const greet = who => `Hello, ${who}!`;

greet('Eric Cartman'); // => 'Hello, Eric Cartman!'
```

In the arrow function `` who => `Hello, ${who}!` `` the expression `` `Hello, ${who}!` `` is implicitely returned.

To return an object literal, you have to wrap the literal into a pair of parentheses:

```javascript
const greetObject = who => ({ message: `Hello, ${who}!` });

greetObject('Eric Cartman'); // => { message: `Hello, Eric Cartman!` }
```

Otherwise, JavaScript [confuses](/javascript-arrow-functions-best-practices/#4-constructing-plain-objects) the curly braces that delimit the function body with the curly braces of the object literal.  

The form when the curly braces are omitted is named an [inline arrow function](/javascript-arrow-functions-best-practices/#2-inline-when-possible). They're useful for writing short callbacks:

```javascript
const numbers = [4, 5, 2, 6];

const duplicated = numbers.map(number => number * 2);

duplicated; // => [8, 10, 4, 12]
```

## Step 3: *this* value

> The arrow function resolves `this` lexically. 

`this` value inside of an arrow function always equals to `this` from the outer function. In other words, the arrow function doesn't define its own execution context.  

In the following example, an arrow function is defined inside a method:  

```javascript
const object = {
  items: [1, 2],

  method() {
    this === object; // => true
    this.items.forEach(() => {
      this === object; // => true
    });
  }
};

object.method();
```

`myObject.myMethod([1, 2, 3])` is a [method invocation](/gentle-explanation-of-this-in-javascript/#3-method-invocation). `this` value inside the arrow function equals to `this` of the outer `method()` &mdash; `object`.

`this` resolved lexically is a great feature of arrow functions. When using callbacks inside methods you are sure the arrow function doesn't define its own `this`.  

## Step 4: *arguments* object

> The arrow function resolves `arguments` lexically. 

The `arguments` object inside of an arrow function equals to `arguments` of the outer function.  

Let's try to access `arguments` inside of an arrow function:

```javascript
function regularFunction() {
  const arrowFunction = () => {
    arguments; // => { 0: 'A', 1: 'B' }
  }

  arrowFunction('C', 'D');
}

regularFunction('A', 'B');
```

`arrowFunction()` is invoked with the arguments `'C'`, `'D'`. Still, inside of its body, `arguments` object equals to the arguments of `regularFunction()` invocation: `'A'`, `'B'`.  

To access the direct arguments of the arrow function use a [rest parameter](/javascript-function-parameters/#5-rest-parameters) `...args`:

```javascript
function regularFunction() {
  const arrowFunction = (...args) => {
    args; // => ['C', 'D']
  }

  arrowFunction('C', 'D');
}

regularFunction('A', 'B');
```

`...args` rest parameter collects the arguments of the arrow function invocation: `['C', 'D']`.  

## Step 5: Dos and don'ts

### Can be asynchronous

You can make an arrow function asynchornous using the `async/await` syntax: 

```javascript
const fetchMovies = async () => { 
  const response = await fetch('/api/movies');
  const movies = await response.json();
  return movies;
};

fetchMovies().then(movies => {
  // Movies fetched
})
```

### Cannot be a method

A method is a special function attached to an object. Inside of a method, `this` value equals to the object upon which the method was called on.

Let's consider the method `isEmpty()` in the `collection` object:

```javascript
const collection = {
  items: [1, 2, 3],
  isEmpty() {
    this === collection; // => true
    return this.items.length === 0;
  }
};

collection.isEmpty(); // => false
```

`collection.isEmpty()` is a [method invocation](/gentle-explanation-of-this-in-javascript/#3-method-invocation). Inside of the method `isEmpty()`, you can access the special value `this`, which equals to the object upon which the method was called &mdash; `collection`.  

However, from a [previous section](#step-3-this-value) you know that `this` inside of an arrow function equals to `this` value of from the outer scope. That's why you normally cannot use an arrow function as a method:

```javascript
const collection = {
  items: [1, 2, 3],
  isEmpty: () => {
    this === collection; // => false
    this === window;     // => true
    return this.items.length === 0;
  }
};

collection.isEmpty(); // throws "TypeError: this.items is undefined"
```

When performing a method invocation `collection.isEmpty()` JavaScript throws a `"TypeError this.items is undefined"`. All because `this` inside of the arrow function equals to the global object, particularly `window` when running in a browser.  

### Cannot be a constructor

A regular function can be a [constructor](/gentle-explanation-of-this-in-javascript/#4-constructor-invocation) of instances:

```javascript
function User(name) {
  this.name = name;
}

const user = new User('Eric Cartman');
user instanceof User; // => true
```

However, the arrow function cannot be used as a constructor:

```javascript
const User = (name) => {
  this.name = name;
}

const user = new User('Eric Cartman');
// throws "TypeError: User is not a constructor"
```

When `User` is an arrow function, invoking `new User('Eric Cartman')` throws a `TypeError`.  

### Cannot be a generator function

Finally, because arrow functions are meant to be light functions, they cannot be used as generator functions:

```javascript
const getNumbersArrow = *() => {
  yield 1;
  yield 2;
};
// SyntaxError: Unexpected token '*'
```

When using an asterisk `*` to mark an arrow function as a generator, JavaScript throws a syntax error.  

The regular functions, of course, are marked as generators without issues:

```javascript
function *getNumbersRegular() {
  yield 1;
  yield 2;
}

// Works!
const gen = getNumbersRegular();
gen.next(); // => { value: 1, done: false }
gen.next(); // => { value: 2, done: false }
gen.next(); // => { value: undefined, done: true }
```

## Summary

The central symbol of an arrow function is the fat arrow `=>`: on the left side of it enumerate the params, and on the right side write the function body:

```javascript
(param1, param2, ..., paramN) => { ... }
```

The arrow function can be shortened: when it has one parameter you can omit the parentheses `param => { ... }`, and when it has one statement you can omit the curly braces `param => statement`.  

`this` and `arguments` inside of an arrow function are resolved lexically, meaning that they're taken from the outer function scope.  

Finally, the arrow function has a few limitations: you cannot use it as a method on an object, constructor, or generator function.  

Arrow functions are lightweight, inline, and easy to read ([when not being nested too much](/javascript-arrow-functions-best-practices/#5-be-aware-of-excessive-nesting)) &mdash; use them as much as you want in your code.

*What other nuances of arrow functions do you know?*