const easyLvl = document.getElementById("facil");
const midLvl = document.getElementById("medio");
const hardLvl = document.getElementById("dificil");
const nickName = document.getElementById("nickname");
const nicknameInitial = document.getElementById("nicknameInitial");
const entryPoint = document.getElementById("iniciarNickname");
const resetNickname = document.getElementById("ingresarNickname");
const optionsBtn = document.querySelectorAll(".opciones button")
const globalContainer = document.getElementById("global-container");
const modal = document.getElementById("ventana-modal");
const msg = document.getElementById("mensaje");


const BBDD_countries = {
  facil : {
    country1: {
      name: "uruguay",
      op_correct: "uruguay",
      options: ["argentina", "honduras", "escocia", "uruguay"] 
    },
    country2: {
      name: "colombia",
      op_correct: "colombia",
      options: ["hoduras", "colombia", "ucrania", "nigeria"]
    },
    country3: {
      name: "chile",
      op_correct: "chile",
      options: ["chile", "sudán", "venezuela", "canadá"] 
    },
    country4: {
      name: "brasil",
      op_correct: "brasil",
      options: ["nigeria", "francia", "brasil", "rusia"] 
    },
    country5: {
      name: "peru",
      op_correct: "peru",
      options: ["nicaragua", "yemen", "méxico", "peru"] 
    },
  },
  medio : {
    country1: {
      name: "canada",
      op_correct: "canada",
      options: ["ecuador", "canada", "escocia", "rusia"] 
    },
    country2: {
      name: "france",
      op_correct: "francia",
      options: ["portugal", "chipre", "francia", "camerú"]
    },
    country3: {
      name: "united kingdom",
      op_correct: "reino unido",
      options: ["reino unido", "bolivia", "costa rica", "noruega"] 
    },
    country4: {
      name: "russia",
      op_correct: "rusia",
      options: ["taiwan", "rusia", "rumania", "españa"] 
    },
    country5: {
      name: "italy",
      op_correct: "italia",
      options: ["malasia", "mexico", "irlanda", "italia"] 
    },
  },
  dificil : {
    country1: {
      name: "nigeria",
      op_correct: "nigeria",
      options: ["nigeria", "sudán", "jamaica", "haití"] 
    },
    country2: {
      name: "portugal",
      op_correct: "portugal",
      options: ["reino unido", "italia", "portugal", "china"]
    },
    country3: {
      name: "switzerland",
      op_correct: "suiza",
      options: ["suiza", "canada", "autria", "polonia"] 
    },
    country4: {
      name: "greece",
      op_correct: "grecia",
      options: ["paises bajos", "irlanda", "grecia", "suecia"] 
    },
    country5: {
      name: "estonia",
      op_correct: "estonia",
      options: ["eslovenia", "estonia", "serbia", "lituania"] 
    },
  }
}

let lives = ["❤", "❤", "❤"];
const BBDD_players = [];
let countriesOfLvl = [];


const createPlayer = (nickname) => {
  const player = {
    name : nickname,
    score: 0 
  }
  BBDD_players.push(player);
}


function validateExistingPlayer(newNickname) {
  return BBDD_players.some((e) => e.name == newNickname);
}

function desactivateRequiredField() {
  nicknameInitial.classList.remove("obligatorio");
}

function validatePlayer(playerNickName) {

  const longitudValida = playerNickName.length >= 4 && playerNickName.length <= 8;

  if(longitudValida && !validateExistingPlayer(playerNickName) ) {
    createPlayer(playerNickName);

    if(nicknameInitial.classList.contains("obligatorio")) 
      desactivateRequiredField();

  } else 
      alert("Nickname no válido o ya existente")
  
}

function desactivarPeventDefault(event) {
  event.preventDefault();
}

function resetGame(e) {
  desactivarPeventDefault(e);

  let value = confirm("¿Estás seguro que deseas reiniciar el juego?");

  if(value)
    location.reload()
}

function intialPlayer(e) {
  desactivarPeventDefault(e);

  validatePlayer(nicknameInitial.value.trim());
  nickName.value = "";
}

function activateDisplay() {

  globalContainer.classList.remove("desactivar");  
  modal.classList.add("desactivar");

}

function activateGameLevel(e) {

  console.log("lvl: ",e.target.id);

  if(globalContainer.classList.contains("desactivar")) {
    activateDisplay();
  } else {
    confirm("Esta acción reiniciará el juego.")
  }

  countriesOfLvl = Object.values(BBDD_countries[e.target.id]);

  const country = countriesOfLvl[0].name;
  updateOptions(countriesOfLvl[0].options);
  requestApi(country);
}

function startGame(e) {

  if(BBDD_players.length == 0)
    alert("Debes Ingersar tu nickname y luego alegir el nivel")
  else 
    activateGameLevel(e);
}
// jquery & ajax

function requestApi(country){
  
  $.ajax({
    url: `https://restcountries.com/v3.1/name/${country}`
  })
  .done(getCountryInfo)
  .fail(requestError);
}

function requestError() {
  alert("Se produjo un error");
}

function getCountryInfo(datos){

  let data = JSON.parse(JSON.stringify(datos))[0];

  let flag = data.flags.svg;
  let flag_alt = data.flags.alt;

  $('#imgBandera' ).attr('src', flag);
  $('#imgBandera' ).attr('alt', flag_alt);
}

function updateOptions (options) {
  console.log(options);
  optionsBtn.forEach((btn, i) => { 
    if( btn.classList.contains("falso"))
      btn.classList.remove("falso");

    btn.innerText = options[i];
  })
}

function nextCountry (op) {

  const quesitonCounter = document.querySelector(".contador-de-preguntas");

  if(cont < countriesOfLvl.length && (op.innerText == countriesOfLvl[cont - 1].op_correct)) {
    op.classList.add("correcto");
    msg.innerText = "Opcion Correcta!"

    setTimeout(() => {
      requestApi(countriesOfLvl[cont].name);
      updateOptions(countriesOfLvl[cont].options);
      cont++;
      quesitonCounter.innerText = `Pregunta ${cont} de 5.`;
      op.classList.remove("correcto");
      msg.innerText = "";
    }, "1500");
    
  } else {
    msg.innerText = "Opcion incorrecta!";
    op.classList.add("falso");
    console.log(op);
  }
}

function selectedOption(op) {
  nextCountry(op.target);
}


// jquery events
let cont = 1;
$('.op-a').click(selectedOption);
$('.op-b').click(selectedOption);
$('.op-c').click(selectedOption);
$('.op-d').click(selectedOption);

// eventos

easyLvl.addEventListener("click", startGame);
midLvl.addEventListener("click", startGame);
hardLvl.addEventListener("click", startGame);
entryPoint.addEventListener("click", intialPlayer);
resetNickname.addEventListener("click", resetGame);
