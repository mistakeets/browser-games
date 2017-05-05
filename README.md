# Browser Games: Generic Platform Game
## Project Team Name: petty-rhinoceros

## Installation and Setup

Clone the repo, install npm dependencies, and start the server:

```shell-session
$ git clone git@github.com:GuildCrafts/browser-games.git
$ cd browser-games
$ npm install

...

$ npm start
...
Starting up http-server, serving ./public
Available on:
  http://127.0.0.1:4321
  http://10.0.1.11:4321
```

Then open `http://localhost:4321/` in your browser of choice and play away!

## Challenge Rating

This goal will likely be within your ZPD if you...

- Can build basic web sites with HTML & CSS
- Can add behavior to a web site with JavaScript
- Are familiar with DOM manipulation
- Are familiar with platform-based games
- Are interested in making more complex interactive web pages

## Description

Implement a simple [platform](https://en.wikipedia.org/wiki/Platform_game) ("run and jump") game with HTML, CSS, and JavaScript.

Follow [this tutorial](http://eloquentjavascript.net/15_game.html) from [Eloquent JavaScript](http://eloquentjavascript.net/).

Fork the the [browser-games repository][browser-games] and use the fork as your project artifact.

Implement the **Platform** game from the list in the [games.md][games-list] file.

![platform-game](http://eloquentjavascript.net/img/darkblue.png)

## Context

This goal will challenge your ability to take a _formal, defined system_ from the real world and replicate it in code. You will start with all of the logic of the system (the rules of the game) and most of the UI already designed.

Your work will be mainly in deciding how to replicate that formal logic and user interface using only JavaScript, HTML, and CSS.

## Specifications

#### General

- [x] Artifact produced is a fork of the [browser-games][browser-games] repo.
- [x] Variables, functions, files, etc. have appropriate and meaningful names.
- [x] HTML, CSS, and JS files are well formatted with proper spacing and indentation.
- [ ] There is a clear separation of game logic code from view/rendering code.
- [x] All major features are added via pull requests with a clear description and concise commit messages.
- [x] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].

#### Generic Platform Game

- [x] Game can be found at `public/platform.html`
- [x] Game is playable by one player
- [x] Game follows rules established in [tutorial](http://eloquentjavascript.net/15_game.html)
- [x] Game page is linked from `public/index.html`

### Stretch

Design and build your own platform-like game. What else can you build with the techniques you came up with in building the Generic Platform Game?

- [ ] Game has its own HTML, CSS, and JS
- [ ] Game is playable
- [ ] Game page is linked from `public/index.html`

## Resources

- MDN: [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) #html #dom #js
- MDN: [Guide to Event Handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers) #dom #js
- Shay Howe: [Learn to Code HTML & CSS](http://learn.shayhowe.com/html-css/) #html #css
- Tutorial: [Project: A Platform Game](http://eloquentjavascript.net/15_game.html) #js #html #dom

[browser-games]: https://github.com/GuildCrafts/browser-games
[games-list]: https://github.com/GuildCrafts/browser-games/blob/master/games.md
[mit-license]: https://opensource.org/licenses/MIT
