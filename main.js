const btnNivelFacil = document.getElementById("facil");
const btnNivelMedio = document.getElementById("medio");
const btnNivelDificil = document.getElementById("dificil");
const nickName = document.getElementById("nickname");
const btnIngresarNickname = document.getElementById("ingresarNickname");
imgBandera = document.getElementById("imgBandera");


const BBDD_banderas = {
  facil : {
    bandera1: {
      nombre: "uruguay",
      opciones: ["Argentina", "Honduras", "Escocia", "Uruguay"] 
    },
    bandera2: {
      nombre: "colombia",
      opciones: ["", "", "", ""]
    },
    bandera3: {
      nombre: "chile",
      opciones: ["", "", "", ""] 
    },
    bandera4: {
      nombre: "brasil",
      opciones: ["", "", "", ""] 
    },
    bandera5: {
      nombre: "peru",
      opciones: ["", "", "", ""] 
    },
  },
  medio : {
    bandera1: {
      nombre: "uruguay",
      opciones: ["Argentina", "Honduras", "Escocia", "Uruguay"] 
    },
    bandera2: {
      nombre: "colombia",
      opciones: ["", "", "", ""]
    },
    bandera3: {
      nombre: "chile",
      opciones: ["", "", "", ""] 
    },
    bandera4: {
      nombre: "brasil",
      opciones: ["", "", "", ""] 
    },
    bandera5: {
      nombre: "peru",
      opciones: ["", "", "", ""] 
    },
  },
  dificil : {
    bandera1: {
      nombre: "uruguay",
      opciones: ["Argentina", "Honduras", "Escocia", "Uruguay"] 
    },
    bandera2: {
      nombre: "colombia",
      opciones: ["", "", "", ""]
    },
    bandera3: {
      nombre: "chile",
      opciones: ["", "", "", ""] 
    },
    bandera4: {
      nombre: "brasil",
      opciones: ["", "", "", ""] 
    },
    bandera5: {
      nombre: "peru",
      opciones: ["", "", "", ""] 
    },
  }
}

const vidas = ["❤", "❤", "❤"];
const BBDD_jugadores = [];
const BanderasDelNivel = [];


const crearJugador = (nickname) => {
  const jugador = {
    nombre : nickname,
    puntaje: 0 
  }
  BBDD_jugadores.push(jugador);
}

function actualizarBandera() {
  imgBandera = banderas.nivelFacil.bandera2.src
}


function validarJugadorExistente(nuevoNickname) {

  //const nicknameExiste = BBDD_jugadores.some((e) => e.nombre == nuevoNickname);

  return BBDD_jugadores.some((e) => e.nombre == nuevoNickname);
}

function desactivarCampoObligatorio() {
  nickName.classList.remove("obligatorio");
}

function validarJugador(jugadorNickName) {

  const longitudValida = jugadorNickName.length >= 4 && jugadorNickName.length <= 8;

  if(longitudValida && !validarJugadorExistente(jugadorNickName) ) {
    alert("jugadorNickName agregado")
    crearJugador(jugadorNickName);

    if(nickName.classList.contains("obligatorio")) 
      desactivarCampoObligatorio();

  } else 
      alert("Nickname no válido o ya existente")
  
}

function desactivarPeventDefault(event) {
  event.preventDefault();
}

function ingresarNuevoJugador(e) {
  desactivarPeventDefault(e);

  validarJugador(nickName.value.trim());
}

function activarPantalla() {
  const pantalla = document.getElementById("pantalla")
  const ventanaModal = document.getElementById("ventana-modal")

  if(pantalla.classList.contains("desactivar")) {
    pantalla.classList.remove("desactivar");  
    ventanaModal.classList.add("desactivar");
  } 
  else {
    pantalla.classList.add("desactivar");
    ventanaModal.classList.remove("desactivar");
  }
}

function activarNivelDeJuego(e) {

  const pantalla = document.getElementById("pantalla");
  const ventanaModal = document.getElementById("ventana-modal");

  // if (BBDD_jugadores.length >= 1)
  //   confirm("")

  if(pantalla.classList.contains("desactivar")) {
    pantalla.classList.remove("desactivar");  
    ventanaModal.classList.add("desactivar");
  } else {
    confirm("Esta acción reiniciará el juego.")
    // pantalla.classList.add("desactivar");
    // ventanaModal.classList.remove("desactivar");
  }
}

function comenzarJuego(e) {
  // if(nickName.classList.contains("obligatorio"))
  if(BBDD_jugadores.length == 0)
    alert("Debes Ingersar tu nickname y luego alegir el nivel")
  else 
    activarNivelDeJuego(e);
}

// eventos

btnNivelFacil.addEventListener("click", comenzarJuego);
btnNivelMedio.addEventListener("click", comenzarJuego);
btnNivelDificil.addEventListener("click", comenzarJuego);
btnIngresarNickname.addEventListener("click", ingresarNuevoJugador);

// const BBDD_banderas = {
//   facil : {
//     bandera1: {
//       nombre: "uruguay",
//       src: "./images/uruguay.svg",
//       descripcion: "Bandera de celeste y blanca",
//       opciones: ["Argentina", "Honduras", "Escocia", "Uruguay"] 
//     },
//     bandera2: {
//       src: "./images/canada.svg",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera3: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera4: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera5: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//   },
//   medio : {
//     bandera1: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera2: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera3: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera4: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera5: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//   },
//   dificil : {
//     bandera1: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera2: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera3: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera4: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//     bandera5: {
//       src: "./images/",
//       descripcion: "",
//       nombre: "",
//       opciones: [] 
//     },
//   }
// }