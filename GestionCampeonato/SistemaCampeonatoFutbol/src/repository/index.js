document.addEventListener("DOMContentLoaded", () => {
  const fechaInicioInput = document.querySelector("#id-fecha-inicio");
  fechaInicioInput.valueAsDate = new Date(); // Establece la fecha actual
});

document
  .querySelector("#form-crear-campeonato")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreCampeonato = document.querySelector("#id-nombre").value;
    const numeroEquipos = parseInt(
      document.querySelector("#id-registro-equipo").value
    );
    const fechaInicio = document.querySelector("#id-fecha-inicio").value;
    const fechaFin = document.querySelector("#id-fecha-fin").value;

    if (fechaInicio >= fechaFin) {
      alert("La fecha final no puede ser anterior a la fecha de inicio.");
      return;
    }

    const campeonato = {
      nombre: nombreCampeonato,
      equipos: numeroEquipos,
      fechaInicio,
      fechaFin,
    };

    const campeonatosRegistrados =
      JSON.parse(localStorage.getItem("campeonatos")) || [];
    campeonatosRegistrados.push(campeonato);

    localStorage.setItem("campeonatos", JSON.stringify(campeonatosRegistrados));

    window.location.href = "crear-equipos.html";
  });
