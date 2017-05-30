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

- Can build web sites with HTML & CSS
- Can add behavior to a web site with JavaScript
- Can use jQuery
- Have built other browser games
- Are familiar with the rules of Tetris
- Are interested in making more complex interactive web pages

## Description

Build a [Tetris](https://en.wikipedia.org/wiki/Tetris) game in the browser using HTML, CSS, JavaScript, and the [jQuery][jquery] library.

Fork the the [browser-games repository][browser-games] and use the fork as your project artifact. It is recommended that you follow along with this tutorial: https://github.com/jonhoo/tetris-tutorial/.

Implement the **Tetris** game from the list in the [games.md][games-list] file.

![tetris](https://cloud.githubusercontent.com/assets/709100/25557948/482ba5be-2cd1-11e7-8a3f-1cbc07138dbe.gif)

## Context

This goal will challenge your ability to take a _formal, defined system_ from the real world and replicate it in code. You will start with all of the logic of the system (the rules of the game) and most of the UI already designed.

Your work will be mainly in deciding how to replicate that formal logic and user interface using JavaScript + jQuery, HTML, and CSS.

## Specifications

#### General

- [x] Artifact produced is a fork of the [browser-games][browser-games] repo.
- [x] Variables, functions, files, etc. have appropriate and meaningful names.
- [x] HTML, CSS, and JS files are well formatted with proper spacing and indentation.
- [x] There is a clear separation of game logic code from view/rendering code.
- [x] All major features are added via pull requests with a clear description and concise commit messages.
- [x] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].

#### Tetris

- [x] [User stories](http://searchsoftwarequality.techtarget.com/definition/user-story) and features for the game are added as issues to your repo with the label `feature` or `user-story`
  <br>_You'll have to define these yourself by looking at the rules of the game and coming up with the right user stories & features_
- [x] jQuery is used for DOM manipulation code
- [x] Tetris game can be found at `public/tetris.html`
- [x] Tetris game is playable
- [x] Players have a score
- [x] Game page is linked from `public/index.html`

### Stretch

- [ ] Players can configure the key mapping (e.g. change the "drop" key to the space bar)
- [ ] Game follows object-oriented patterns using ES6 classes

## Resources

- [jQuery Learning Center](https://learn.jquery.com/) #jquery
- Code School: [Try jQuery](https://www.codeschool.com/courses/try-jquery) #jquery #js #dom
- CSS Tricks: [Learn jQuery from Scratch](https://css-tricks.com/lodge/learn-jquery/) #jquery #js #dom
- Tetris Tutorial https://github.com/jonhoo/tetris-tutorial/
- Video series on building tetris: [part 1](https://www.youtube.com/watch?v=Z3wvP27eW98), [part 2](https://www.youtube.com/watch?v=JRcjqwktccc), [part 3](https://www.youtube.com/watch?v=pSPx2JXSRfM), and [part 4](https://www.youtube.com/watch?v=TZrRS14G8Ns)


[browser-games]: https://github.com/GuildCrafts/browser-games
[games-list]: https://github.com/GuildCrafts/browser-games/blob/master/games.md
[mit-license]: https://opensource.org/licenses/MIT

[jquery]: https://jquery.com/

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


# Browser Games (Project Channel #knotty-urial)

A collection of games to play in a web browser. See the full list of games in the [games.md](games.md) file.

Fork the the [browser-games repository][browser-games] and use the fork as your project artifact.

Implement the games **Tic-Tac-Toe** and **Simon** from the list in the [games.md][games-list] file.

You will be using FreeCodeCamp challenges as guides and tutorials for building these games.

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
- Are familiar with games like tic-tac-toe and Simon
- Are interested in making more complex interactive web pages

## Context

This goal will challenge your ability to take a _formal, defined system_ from the real world and replicate it in code. You will start with all of the logic of the system (the rules of the game) and most of the UI already designed.

Your work will be mainly in deciding how to replicate that formal logic and user interface using JavaScript, HTML, and CSS.

## Specifications

- [x] Artifact produced is a fork of the [browser-games][browser-games] repo.
- [x] For **both** of the games Tic-Tac-Toe and Simon, there exists:
  - [x] A playable, complete version of the game at `public/GAME_NAME.html` (e.g. `public/ticTacToe.html`)
  - [x] A link to the game page from `public/index.html`
- [x] The artifact produced is properly licensed, preferably with the [MIT license][mit-license].

## Quality Rubric

**Good code style**
- HTML, CSS, and JS files are well formatted with proper spacing and indentation. [50 points]
- Descriptive, well-named functions, variables, files, CSS classes, etc. [50 points]

**Good project management**
- Commit messages are concise and descriptive. [25 points]
- All features are added via pull requests. [25 points]
- Every pull request has a description summarizing the changes made. [25 points]
- Every pull request has been reviewed by at least one other person. [25 points]

[browser-games]: https://github.com/GuildCrafts/browser-games
[games-list]: https://github.com/GuildCrafts/browser-games/blob/master/games.md
[basic-games]: https://github.com/GuildCrafts/browser-games/blob/master/games.md#basic-graphical-games
[mit-license]: https://opensource.org/licenses/MIT

