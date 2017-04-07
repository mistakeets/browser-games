let game = {
  count: 0,
  possibilities: ['#green', '#blue', '#red', '#dark'],
  currentGame: [],
  player: [],
  sound: {
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    dark: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}

function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

function newGame() {
  clearGame();
}

function strict() {
  if (game.strict == false) {
    game.strict = true;
    $('#strict').html('Strict Mode is currently On')
  } else {
    game.strict = false;
    $('#strict').html('Strict Mode is currently Off')
  }

  newGame();
}

function showMoves() {
  let i = 0;
  let moves = setInterval(function() {
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600)

  clearPlayer();
}

function sound(name) {
  switch (name) {
    case '#green':
      game.sound.green.play();
      break;
    case '#blue':
      game.sound.blue.play();
      break;
    case '#red':
      game.sound.red.play();
      break;
    case '#dark':
      game.sound.dark.play();
      break;
  };
}

function playGame(field) {
  $(field).addClass('flash');
  sound(field);
  setTimeout(function() {
    $(field).removeClass('flash');
  }, 300);
}

function clearPlayer() {
  game.player = [];
}

function addToPlayer(id) {
  let field = "#" + id
  console.log(field);
  game.player.push(field);
  playerTurn(field);
}

function playerTurn(x) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    if (game.strict) {
      alert('Try again! ...From scratch!');
      newGame();
    } else {
      alert('Wrong move! Try again!');
      showMoves();
    }
  } else {
    console.log('Good Move!');
    sound(x);
    if (game.player.length === game.currentGame.length) {
      if (game.count == 20) {
        alert('You won! Congrats.');
      } else {
        alert('Next round!');
        nextLevel();
      }
    }
  }
}

function nextLevel() {
  addCount();
}

function generateMove() {
  game.currentGame.push(game.possibilities[(Math.floor(Math.random() * 4))]);
  //alert(game.currentGame.length);
  showMoves();
}

function addCount() {
  game.count++;
  $('#clickNumber').addClass('animated fadeOutDown');

  setTimeout(function() {
    $('#clickNumber').removeClass('fadeOutDown').html(game.count).addClass('fadeInDown');
  }, 200);

  generateMove();
}

//newGame();
