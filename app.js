// New word = ["Word name", "Hint"]
let word = [
  ["Apple", "A fruit that is red or green."],
  ["Banana", "A yellow fruit with a curved shape."],
  ["Carrot", "A long, orange vegetable."],
  ["Dolphin", "An intelligent marine mammal."],
  ["Elephant", "A large, gray animal with a long trunk."],
  ["Giraffe", "A tall, spotted mammal with a long neck."],
  ["Hamburger", "A popular fast-food sandwich."],
  ["Ice Cream", "A frozen dessert made from dairy products."],
  ["Jupiter", "The largest planet in our solar system."],
  ["Kangaroo", "A marsupial that carries its young in a pouch."],
  ["Lion", "A large, carnivorous feline animal."],
  ["Mango", "A tropical fruit with sweet, juicy flesh."],
  ["Nightingale", "A small songbird known for its beautiful voice."],
  ["Octopus", "A sea creature with eight arms."],
  ["Penguin", "A flightless bird that lives in cold regions."],
  ["Quartz", "A mineral often used in jewelry and watches."],
  ["Raspberry", "A small, red fruit often used in desserts."],
  ["Sapphire", "A precious gemstone that is typically blue."],
  ["Tiger", "A large, striped feline predator."],
  ["Umbrella", "A device used for protection from rain."],
  ["Violin", "A musical instrument with four strings."],
  ["Watermelon", "A large, juicy fruit with a green rind and red flesh."],
  ["Xylophone", "A musical instrument with wooden bars struck by mallets."],
  ["Yoga", "A physical and spiritual practice for health and relaxation."],
  ["Zebra", "A black-and-white striped mammal native to Africa."],
  ["Sunflower", "A tall, yellow flower with edible seeds."],
  ["Butterfly", "An insect with colorful wings."],
  ["Dragonfly", "An insect with two pairs of transparent wings."],
  ["Flamingo", "A tall, pink wading bird with long legs and a curved neck."],
  ["Guitar", "A stringed musical instrument played with fingers or a pick."],
  ["Hibiscus", "A flowering plant with large, showy flowers."],
  ["Iguana", "A large, herbivorous lizard native to tropical areas."],
  ["Jasmine", "A fragrant white flower often used in perfumes."],
  ["Koala", "An arboreal marsupial native to Australia."],
  ["Lighthouse", "A tall tower with a bright light to guide ships at sea."],
  ["Mushroom", "A fleshy, spore-bearing fungus."],
  ["Narwhal", "A marine mammal with a long, spiral tusk."],
  ["Orchid", "A beautiful flowering plant known for its exotic blooms."],
  ["Panda", "A bear native to China, known for its black and white fur."],
  ["Quokka", "A small marsupial native to Australia, known for its smile."],
  ["Rainbow", "A colorful arc in the sky caused by sunlight and rain."],
  [
    "Sloth",
    "A slow-moving, tree-dwelling mammal native to Central and South America.",
  ],
  ["Toucan", "A brightly colored bird with a large, colorful beak."],
  ["Umbrella Bird", "A tropical bird with a large, umbrella-like crest."],
  ["Violet", "A small flowering plant with purple or blue flowers."],
  ["Whale", "A large marine mammal, often known for its massive size."],
  [
    "X-ray Fish",
    "A fish with transparent skin that reveals its skeletal structure.",
  ],
  ["Yak", "A large, shaggy-haired mammal native to the Himalayas."],
  ["Zucchini", "A summer squash with a green skin."],
];

// Game keyboard
let tastatur = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Game memory
let select = 0;
let wordLeft = [];
let fail = 0;
const desc = document.querySelector(".desc");
const text = desc.textContent;
desc.textContent = "";

for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  span.textContent = text[i];
  span.style.animationDelay = `${i * 0.1}s`;
  desc.appendChild(span);
}
// Web-page onload
window.onload = function () {
  gId("moveKeybord").addEventListener(
    "touchmove",
    function (e) {
      wH = window.innerHeight;
      tY = e.touches[0].clientY;
      eL = gId("tastatur");
      resY = wH - tY - eL.offsetHeight;
      if (resY < 0) {
        resY = 0;
      } else if (resY > wH / 2) {
        resY = wH / 2;
      }
      eL.style.bottom = resY + "px";
    },
    false
  );
  createTastur();
};

// Start game
let startGame = () => {
  gId("home").className = "h";
  gId("result").className = "h";
  newGame();
};

// New game
let newGame = () => {
  clearTastatur();
  clearPlayer();
  createWord();
};

// Clear keyboard
let clearTastatur = () => {
  let e = document.getElementsByClassName("b");
  for (a = 0; a < e.length; a++) {
    e[a].setAttribute("data", "");
  }
};

// Clear player
let clearPlayer = () => {
  fail = 0;
  wordLeft = [];
  gId("g0").setAttribute("data", "false");
  gId("g1").setAttribute("data", "false");
  gId("g2").setAttribute("data", "false");
  gId("g3").setAttribute("data", "false");
  gId("g4").setAttribute("data", "false");
  gId("g5").setAttribute("data", "false");
  gId("g5").setAttribute("r", "false");
  gId("g5").setAttribute("l", "false");
  gId("g6").setAttribute("data", "false");
  gId("g6").setAttribute("l", "false");
  gId("g6").setAttribute("r", "false");
  gId("hintButton").setAttribute("data", "false");
  gId("hint").style.display = "none";
};

// Get new word
let createWord = () => {
  let d = gId("letter");
  d.innerHTML = "";
  select = Math.floor(Math.random() * word.length);
  for (a = 0; a < word[select][0].length; a++) {
    let x = word[select][0][a].toUpperCase();
    let b = document.createElement("span");
    b.className = "l" + (x == " " ? " ls" : "");
    b.innerHTML = "&nbsp";
    b.id = "l" + a;
    d.appendChild(b);

    if (x != " ") {
      if (wordLeft.indexOf(x) == -1) {
        wordLeft.push(x);
      }
    }
  }
};

// Create keyboard
let createTastur = () => {
  let tas = gId("keybord");
  tas.innerHTML = "";
  for (a = 0; a < tastatur.length; a++) {
    let b = document.createElement("span");
    b.className = "b";
    b.innerText = tastatur[a];
    b.setAttribute("data", "");
    b.onclick = function () {
      bTas(this);
    };
    tas.appendChild(b);
  }
};

// Game check, If show next error / game end
let bTas = (a) => {
  if (a.getAttribute("data") == "") {
    let x = isExist(a.innerText);
    a.setAttribute("data", x);
    if (x) {
      if (wordLeft.length == 0) {
        gameEnd(true);
      }
    } else {
      showNextFail();
    }
  }
};

// If letter "X" exist
let isExist = (e) => {
  e = e.toUpperCase();
  let x = wordLeft.indexOf(e);
  if (x != -1) {
    wordLeft.splice(x, 1);
    typeWord(e);
    return true;
  }
  return false;
};

// Show next fail drawing
let showNextFail = () => {
  fail++;
  switch (fail) {
    case 1:
      gId("g0").setAttribute("data", "true");
      break;

    case 2:
      gId("g1").setAttribute("data", "true");
      break;

    case 3:
      gId("g2").setAttribute("data", "true");
      break;

    case 4:
      gId("g3").setAttribute("data", "true");
      gId("hintButton").setAttribute("data", "true");
      break;

    case 5:
      gId("g4").setAttribute("data", "true");
      break;

    case 6:
      gId("g5").setAttribute("data", "true");
      break;

    case 7:
      gId("g5").setAttribute("l", "true");
      break;

    case 8:
      gId("g5").setAttribute("r", "true");
      break;

    case 9:
      gId("g6").setAttribute("data", "true");
      gId("g6").setAttribute("l", "true");
      break;

    case 10:
      gId("g6").setAttribute("r", "true");
      gameEnd(false);
  }
};

let typeWord = (e) => {
  for (a = 0; a < word[select][0].length; a++) {
    if (word[select][0][a].toUpperCase() == e) {
      gId("l" + a).innerText = e;
    }
  }
};

// Game result
let gameEnd = (e) => {
  let d = gId("result");
  d.setAttribute("data", e);
  if (e) {
    gId("rT").innerText = "You Win!";
    gId("rM").innerHTML =
      "Congratulations, you found the word!<br/><br/>Good Job!";
  } else {
    gId("rT").innerText = "You Lose!";
    gId("rM").innerHTML =
      'The word was <br/><br/>"' +
      word[select][0].toUpperCase() +
      '"<br/><br/>Better luck next time.';
  }
  d.className = "";
};

// Show hint
let hint = () => {
  gId("hintText").innerText = word[select][1];
  gId("hint").style.display = "block";
};

// Exit hint
let hintExit = () => {
  gId("hint").style.display = "none";
};

// Get HTML ID element by name
let gId = (a) => {
  return document.getElementById(a);
};
