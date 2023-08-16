class Campeonato {
  constructor(nombre, numeroEquipos, fechaInicio, fechaFin) {
    this.nombre = nombre;
    this.numeroEquipos = numeroEquipos;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }

  guardarEnLocalStorage() {
    const campeonatosRegistrados =
      JSON.parse(localStorage.getItem("campeonatos")) || [];
    campeonatosRegistrados.push(this);
    localStorage.setItem("campeonatos", JSON.stringify(campeonatosRegistrados));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("login_success"));

  if (!usuarioLogueado) {
    window.location = "pag-principal.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const fechaInicioInput = document.querySelector("#id-fecha-inicio");
  fechaInicioInput.valueAsDate = new Date();
});

// Crear Campeonato
document
  .querySelector("#form-crear-campeonato")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreCampeonato = document.querySelector("#id-nombre").value;

    const fechaInicio = document.querySelector("#id-fecha-inicio").value;
    const fechaFin = document.querySelector("#id-fecha-fin").value;

    if (fechaInicio >= fechaFin) {
      alert("La fecha final no puede ser anterior a la fecha de inicio.");
      return;
    }

    const campeonato = new Campeonato(nombreCampeonato, fechaInicio, fechaFin);
    campeonato.guardarEnLocalStorage();

    window.location.href = "crear-equipos.html";
  });
