const easyLvl = document.getElementById("facil");
const midLvl = document.getElementById("medio");
const hardLvl = document.getElementById("dificil");
const nickName = document.getElementById("nickname");
const nicknameInitial = document.getElementById("nicknameInitial");
const entryPoint = document.getElementById("comenzarJuego");
const resetNickname = document.getElementById("resetNickname");
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
      options: ["honduras", "colombia", "ucrania", "nigeria"],
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

// Variables Globales

let BBDD_players = [
  {
    name : "Darking",
    score: 180 
  }, {
    name : "Valkiria",
    score: 105 
  }, {
    name : "Trokito",
    score: 75 
  }
];
let currentPlayer = {};
let lives = ["❤", "❤", "❤"];
let countriesOfLvl = [];
let count_error = 0;
let cont = 1;
let currentLvl = "";

// ------ FUNTIONS -----

const createPlayer = (nickname) => {
  const player = {
    name : nickname,
    score: 0 
  }
  currentPlayer = player;
  BBDD_players.push(player);
}


function validateExistingPlayer(newNickname) {
  return BBDD_players.some((e) => e.name == newNickname);
}

function desactivateRequiredField() {
  nicknameInitial.classList.remove("obligatorio");
  nicknameInitial.classList.add("validado");
}
function activateRequiredField() {
  nicknameInitial.classList.remove("validado");
  nicknameInitial.classList.add("obligatorio");
}

function validateInputNickname(e) {

  if(nicknameInitial.value.length >= 4 && nicknameInitial.value.length <= 8) {
    if(nicknameInitial.classList.contains("obligatorio")) 
      desactivateRequiredField();
  } else {
    if(nicknameInitial.classList.contains("validado")) 
      activateRequiredField();
  }
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

// function intialPlayer(e) {
//   desactivarPeventDefault(e);

//   validatePlayer(nicknameInitial.value.trim());
//   nickName.value = "";
// }

function activateDisplay() {

  globalContainer.classList.remove("desactivar");  
  modal.classList.add("desactivar");

}

function playerInfo() {
  $("#player-info").html(`<p id="player-info__nickname">Jugador: ${currentPlayer.name}</p>
  <p id="player-info__score">Puntaje: ${currentPlayer.score}</p>`)
}

function startGame(e) {

  // validatePlayer(nicknameInitial.value.trim());

  // if(BBDD_players.length == 0 || validateExistingPlayer(playerNickName)) {
  if(validatePlayer(nicknameInitial.value.trim())) {
    $("#nicknameIncorrect").text("tú nickname no es válido o ya existe, por favor ingresa otro.");
  }
  else {
    createPlayer(nicknameInitial.value.trim());
    activateGameLevel(e.target);
  }
}

function validatePlayer(playerNickName) {

  const longitudValida = playerNickName.length >= 4 && playerNickName.length <= 8;

  // if(longitudValida && !validateExistingPlayer(playerNickName) ) 
  //   createPlayer(playerNickName);

  return !longitudValida || validateExistingPlayer(playerNickName);
}

function activateGameLevel(e) {
  playerInfo();
  console.log("lvl: ",e.id);
  currentLvl = e.id.replace("lvl", "");

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
  $( "#state" ).text( "" );

  optionsBtn.forEach((btn, i) => { 
    if( btn.classList.contains("falso"))
      btn.classList.remove("falso");

    btn.innerText = options[i];
  })

}

function selectedOption(op) {

  let isCorrect = nextCountry(op.target);

  updateStateOption(isCorrect)

  playerInfo();

  if(cont == 5 && isCorrect) {
    setTimeout(
      levelCompleted
    , 1000);
  }
}

function nextCountry (op) {

  const questionCounter = document.querySelector(".contador-de-preguntas");

  // console.log(op.innerText.toLowerCase());

  if( op.innerText.toLowerCase() == countriesOfLvl[cont - 1].op_correct) {

    op.classList.add("correcto");
    currentPlayer.score += 15;

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

    currentPlayer.score -= (currentPlayer.score > 5) ? 5 : 0;
    op.classList.add("falso");

    if(count_error == 3) {

      lives.pop();
      $("#vidas").text(lives.join(""))

      if(lives.length == 0){

        $("#contenedorBandera")
        .html(`<p> se te acabaron las vidas! vuelve a intentarlo, tu puntaje fué de ${currentPlayer.score} pts </p> 
        <div class="ranking">${updateRanking()}</div>
        <button id="reloadGame">Reinciar juego</button>`);

        $('#reloadGame').click(reloadGame);
      }
      
      count_error = 0;
    }

    return false;
  }
}

function updateStateOption(value) {
  $("#state").removeAttr("class")

  if(value) 
    updateStateOptionCorrect();
  else
    updateStateOptionIncorrect();
}

function updateStateOptionCorrect() {

  $("#state").addClass(function( index, currentClass ) {
    let addedClass;

    addedClass = "op-correcta";
    $( "#state" ).text( "¡Opción Correcta!" );

    return addedClass;
  });
}

function updateStateOptionIncorrect() {
  $("#state").addClass(function( index, currentClass ) {
    let addedClass;

    addedClass = "op-incorrecta";
    $( "#state" ).text( "¡Opción Incorrecta!" ); 

    return addedClass;
  });
}


function levelCompleted() {
  $("#contenedorBandera")
    .html(`
    <nav class="container-fluid">
      <p> Felicidades! hás completado el nivel ${currentLvl}, lograste ${currentPlayer.score} pts.</p>
      <ul>
        ${nextLevel(currentLvl)}
      </ul>
    </nav>`);

    
    $('#lvlfacil').click(startNextLevel);
    $('#lvlmedio').click(startNextLevel);
    $('#lvldificil').click(startNextLevel);

    count_error = 0;
    cont = 1;
    countriesOfLvl = [];
}

function nextLevel(currentLvl) {

  let createNextLvl = "";

  switch (currentLvl) {
    case "facil":
      createNextLvl = `
        <p>Elige el siguiente Nivel: </p>
        <li>
          <button id="lvlmedio" href="#">Medio</button>
        </li>`;
      break;

    case "medio":
      createNextLvl = `
        <p>Elige el siguiente Nivel: </p>
        <li>
          <button id="lvldificil" href="#">Díficil</button>
        </li>`;
      break;

    case "dificil":
      createNextLvl = 
      `<li>
        <p>🎉🥳¡¡¡Felicidades!!!🥳🎉</p> 
        <p>Has completado el juego.</p>
      </li>
      <div class="ranking">${updateRanking()}</div>
      <button id="reset-game" onclick="reloadGame()" class="btn-game">Reiniciar juego</button>`;

      console.log("HOla");
      break;

    default:
      break;
  }

  return createNextLvl;
}

function startNextLevel(e) {

  $("#contenedorBandera")
    .html(`
    <figure>
      <img id="imgBandera" class="img-fluid" src="./images/fake-flag.webp" alt="Bandera de celeste y blanca">
      <figcaption id="state" class=""></figcaption>
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

    activateGameLevel(e.target);
}

function updateRanking() {
  let ranking = `<p>No lograste entrar en el ranking top 3, vuelve a intentarlo y supérate.</p>`;

  if(currentPlayer.score >= BBDD_players[2].score) {
    BBDD_players.sort((a, b) => b.score - a.score)

    ranking = `
    <h2>Ranking</h2>
    <table>
      <tr>
        <th>Posición</th>
        <th>Nickname</th>
        <th>Puntos</th>
      </tr>

      <tr class="primer-puesto">
        <td>1🥇</td>
        <td>${BBDD_players[0].name}</td>
        <td>${BBDD_players[0].score}</td>
      </tr>

      <tr class="segundo-puesto">
        <td>2🥈</td>
        <td>${BBDD_players[1].name}</td>
        <td>${BBDD_players[1].score}</td>
      </tr>

      <tr class="tercer-puesto">
        <td>3🥉</td>
        <td>${BBDD_players[2].name}</td>
        <td>${BBDD_players[2].score}</td>
      </tr>

    </table>
    `;
  }

  return ranking;
}


// eventos

easyLvl.addEventListener("click", startGame);
// midLvl.addEventListener("click", startGame);
// hardLvl.addEventListener("click", startGame);
resetNickname.addEventListener("click", resetGame);
nicknameInitial.addEventListener('input', validateInputNickname);
// entryPoint.addEventListener("click", intialPlayer);