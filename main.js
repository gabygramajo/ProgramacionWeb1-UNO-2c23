const easyLvl = document.getElementById("facil");
const midLvl = document.getElementById("medio");
const hardLvl = document.getElementById("dificil");
const nickName = document.getElementById("nickname");
const nicknameInitial = document.getElementById("nicknameInitial");
const entryPoint = document.getElementById("iniciarNickname");
const resetNickname = document.getElementById("ingresarNickname");
const globalContainer = document.getElementById("global-container");
const modal = document.getElementById("ventana-modal");


const BBDD_countries = {
  facil : {
    country1: {
      name: "uruguay",
      op_correct: "uruguay",
      options: ["argentina", "honduras", "escocia", "uruguay"] ,
      tracks: "🥩 🧉 ⚽"
    },
    country2: {
      name: "colombia",
      op_correct: "colombia",
      options: ["hoduras", "colombia", "ucrania", "nigeria"],
      tracks: "☕ 💃🏼 🥑"
    },
    country3: {
      name: "chile",
      op_correct: "chile",
      options: ["chile", "sudán", "venezuela", "canadá"] ,
      tracks: "🍇 🍤 🏔️"
    },
    country4: {
      name: "brazil",
      op_correct: "brasil",
      options: ["nigeria", "francia", "brasil", "rusia"] ,
      tracks: "💃🏼 ⚽ 🏝️ 🎉"
    },
    country5: {
      name: "united States",
      op_correct: "estados unidos",
      options: ["nicaragua", "yemen", "méxico", "estados unidos"] ,
      tracks: "🍔 🗽 🎃 🏈"
    },
  },
  medio : {
    country1: {
      name: "canada",
      op_correct: "canada",
      options: ["ecuador", "canada", "escocia", "rusia"] ,
      tracks: "⛷️ 🏒 🏔️"
    },
    country2: {
      name: "france",
      op_correct: "francia",
      options: ["portugal", "chipre", "francia", "camerú"],
      tracks: "🗼 🎭 💄"
    },
    country3: {
      name: "united kingdom",
      op_correct: "reino unido",
      options: ["reino unido", "bolivia", "costa rica", "noruega"] ,
      tracks: "🏰 👑 💂🏼‍♂️"
    },
    country4: {
      name: "russia",
      op_correct: "rusia",
      options: ["taiwan", "rusia", "rumania", "españa"] ,
      tracks: "🐻"
    },
    country5: {
      name: "italy",
      op_correct: "italia",
      options: ["malasia", "mexico", "irlanda", "italia"] ,
      tracks: "🍕🍝"
    },
  },
  dificil : {
    country1: {
      name: "nigeria",
      op_correct: "nigeria",
      options: ["nigeria", "sudán", "jamaica", "haití"] ,
    },
    country2: {
      name: "portugal",
      op_correct: "portugal",
      options: ["reino unido", "italia", "portugal", "china"],
    },
    country3: {
      name: "switzerland",
      op_correct: "suiza",
      options: ["suiza", "canada", "autria", "polonia"] ,
    },
    country4: {
      name: "greece",
      op_correct: "grecia",
      options: ["paises bajos", "irlanda", "grecia", "suecia"] ,
    },
    country5: {
      name: "estonia",
      op_correct: "estonia",
      options: ["eslovenia", "estonia", "serbia", "lituania"] ,
    },
  }
}

let lives = ["❤", "❤", "❤"];
const BBDD_players = [];
let countriesOfLvl = [];
let count_error = 0;
let cont = 1;

// ------ FUNTIONS -----

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

function reloadGame() {
  location.reload();
}

function resetGame(e) {
  desactivarPeventDefault(e);

  let value = confirm("¿Estás seguro que deseas reiniciar el juego?");

  if(value)
    reloadGame();
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

  console.log("lvl: ",e.id);

  $('.op-a').click(selectedOption);
  $('.op-b').click(selectedOption);
  $('.op-c').click(selectedOption);
  $('.op-d').click(selectedOption);

  if(globalContainer.classList.contains("desactivar")) {
    activateDisplay();
  } 

  countriesOfLvl = Object.values(BBDD_countries[e.id.replace("lvl", "")]);

  const country = countriesOfLvl[0].name;
  updateOptions(countriesOfLvl[0].options);
  requestApi(country);
}

function startGame(e) {

  if(BBDD_players.length == 0)
    alert("Debes Ingersar tu nickname y luego alegir el nivel")
  else 
    activateGameLevel(e.target);
}
// jquery & ajax

function requestApi(country){
  
  $.ajax({
    url: `https://restcountries.com/v3.1/name/${country}?fullText=true`
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
  const optionsBtn = document.querySelectorAll(".opciones button");

  optionsBtn.forEach((btn, i) => { 
    if( btn.classList.contains("falso"))
      btn.classList.remove("falso");

    btn.innerText = options[i];
  })

}

function nextCountry (op) {

  const questionCounter = document.querySelector(".contador-de-preguntas");


  if( op.innerText == countriesOfLvl[cont - 1].op_correct) {

    op.classList.add("correcto");
    BBDD_players[0].score += 20;

    if(cont < countriesOfLvl.length) {
        setTimeout(() => {

          requestApi(countriesOfLvl[cont].name);
          updateOptions(countriesOfLvl[cont].options);
          
          cont++;
          questionCounter.innerText = `Pregunta ${cont} de 5.`;
          op.classList.remove("correcto");

      }, "1000");
    } 

    return true;

  } else {

    ++count_error;
    BBDD_players[0].score -= 5;
    op.classList.add("falso");

    if(count_error == 3) {

      lives.pop();
      $("#vidas").text(lives.join(""))

      if(lives.length == 0){

        $("#contenedorBandera")
        .html(`<p> se te acabaron las vidas! vuelve a intentarlo, tu puntaje fué de ${BBDD_players[0].score} pts </p> 
        <button id="reloadGame">Reinciar juego</button>`);

        $('#reloadGame').click(reloadGame);
      }
      
      count_error = 0;
    }
    return false;
  }
}

function levelCompleted() {
  $("#contenedorBandera")
    .html(`
    <nav class="container-fluid">
      <p> Felicidades! hás completado el nivel, lograste ${BBDD_players[0].score} pts. Elige el siguiente Nivel </p>
      <ul>
        <li>
          <button id="lvlfacil" href="#">Fácil</button>
        </li>
        <li>
          <button id="lvlmedio" href="#">Medio</button>
        </li>
        <li>
          <button id="lvldificil" href="#">Díficil</button>
        </li>
      </ul>
    </nav>`);

    
    $('#lvlfacil').click(nextLevel);
    $('#lvlmedio').click(nextLevel);
    $('#lvldificil').click(nextLevel);

    count_error = 0;
    cont = 1;
    countriesOfLvl = [];
}

function nextLevel(e) {
  $("#contenedorBandera")
    .html(`
    <figure>
      <img id="imgBandera" class="img-fluid" src="./images/japan.svg" alt="Bandera de celeste y blanca">
    </figure>
    <h2 class="pregunta">¿A qué país corresponde la bandera? 🤔</h2>
    <div class="opciones">
      <div class="ops-izquierdo">
        <button class="op-a">none</button>
        <button class="op-b">none</button>
      </div>
      <div class="ops-derecho">
        <button class="op-c">none</button>
        <button class="op-d">none</button>
      </div>
    </div>
    `);

  startGame(e);
}

function selectedOption(op) {
  let isCorrect = nextCountry(op.target);
  
  if(cont == 5 && isCorrect) {
    setTimeout(
      levelCompleted
    , 1000);
  }
}


// jquery events



// eventos

easyLvl.addEventListener("click", startGame);
midLvl.addEventListener("click", startGame);
hardLvl.addEventListener("click", startGame);
entryPoint.addEventListener("click", intialPlayer);
resetNickname.addEventListener("click", resetGame);
