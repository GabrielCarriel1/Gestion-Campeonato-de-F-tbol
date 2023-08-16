document.addEventListener("DOMContentLoaded", () => {
  // Verificar si el usuario está logueado
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("login_success"));

  if (!usuarioLogueado) {
    window.location = "pag-principal.html";
  }

  // Elementos del DOM
  const formRegistrarEquipos = document.querySelector(
    "#form-registrar-equipos"
  );
  const listaEquiposRegistrados = document.getElementById(
    "equipos-registrados"
  );
  const btnRegistrarResultados = document.getElementById(
    "btnRegistrarResultados"
  );
  const btnEnfrentamiento = document.getElementById("btnEnfrentamiento");
  const modal = new bootstrap.Modal(
    document.getElementById("enfrentamientoModal")
  );
  const tablaEnfrentamientos = document.getElementById("tablaEnfrentamientos");

  // Agregar evento al formulario de registro de equipos
  formRegistrarEquipos.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreEquipo = document.querySelector("#nombre-equipo").value;
    const sedeEquipo = document.querySelector("#id-sede").value;
    const ciudadEquipo = document.querySelector("#id-ciudad").value;
    const categoriaEquipo = document.querySelector("#id-categoria").value;
    const imagenEquipoInput = document.querySelector("#id-escudo-equipo");
    const imagenEquipoFile = imagenEquipoInput.files[0];
    const colorEquipo = document.querySelector("#color-equipo").value;

    const nuevoEquipo = {
      nombre: nombreEquipo,
      sede: sedeEquipo,
      ciudad: ciudadEquipo,
      categoria: categoriaEquipo,
      color: colorEquipo,
      imagen: URL.createObjectURL(imagenEquipoFile),
    };

    const equiposRegistrados =
      JSON.parse(localStorage.getItem("equipos")) || [];
    equiposRegistrados.push(nuevoEquipo);
    localStorage.setItem("equipos", JSON.stringify(equiposRegistrados));

    actualizarListaEquipos();
    imagenEquipoInput.value = "";

    alert(`Equipo "${nombreEquipo}" registrado con éxito.`);
    formRegistrarEquipos.reset();
  });

  // Función para eliminar equipo
  function eliminarEquipo(index) {
    const equiposRegistrados =
      JSON.parse(localStorage.getItem("equipos")) || [];
    const equipoNombre = equiposRegistrados[index].nombre;

    const equipoNombreModal = document.getElementById("equipoNombreModal");
    equipoNombreModal.textContent = equipoNombre;

    const btnConfirmarEliminacion = document.getElementById(
      "btnConfirmarEliminacion"
    );

    const confirmarEliminacionModal = new bootstrap.Modal(
      document.getElementById("confirmarEliminacionModal")
    );
    confirmarEliminacionModal.show();
    btnConfirmarEliminacion.addEventListener("click", function () {
      equiposRegistrados.splice(index, 1);
      localStorage.setItem("equipos", JSON.stringify(equiposRegistrados));
      actualizarListaEquipos();
      confirmarEliminacionModal.hide();
    });
  }
  // Función para abrir el modal de registro de jugadores
  function abrirModalRegistroJugador(nombreEquipo) {
    const modal = new bootstrap.Modal(
      document.getElementById("registroJugadorModal")
    );
    modal.show();

    const formRegistroJugador = document.querySelector(
      "#form-registro-jugador"
    );
    formRegistroJugador.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombreJugador = document.querySelector("#nombreJugador").value;
      const apellidoJugador = document.querySelector("#apellidoJugador").value;
      const fechaNacimiento = document.querySelector("#fechaNacimiento");
      const posicion = document.querySelector("#id-posicion").value;
      const numeroCamiseta = document.querySelector("#numeroCamiseta").value;

      const jugador = {
        nombre: nombreJugador,
        apellido: apellidoJugador,
        fechaNacimiento: fechaNacimiento,
        posicion: posicion,
        numeroCamiseta: numeroCamiseta,
      };

      // Guardar el jugador en el localStorage
      const jugadoresRegistrados =
        JSON.parse(localStorage.getItem("jugadores")) || [];
      jugadoresRegistrados.push(jugador);
      localStorage.setItem("jugadores", JSON.stringify(jugadoresRegistrados));

      alert(`Jugador "${nombreJugador}" registrado con éxito.`);
      formRegistroJugador.reset();
      modal.hide();
    });
  }

  // Función para actualizar lista de equipos
  function actualizarListaEquipos() {
    listaEquiposRegistrados.innerHTML = "";

    const equiposRegistrados =
      JSON.parse(localStorage.getItem("equipos")) || [];
    equiposRegistrados.forEach(function (equipo, index) {
      const nuevoEquipo = document.createElement("li");
      nuevoEquipo.className =
        "list-group-item d-flex justify-content-between align-items-center";

      // Crear elementos para mostrar información del equipo
      const equipoInfo = document.createElement("span");
      equipoInfo.textContent = equipo.nombre;

      const imagenEquipo = document.createElement("img");
      imagenEquipo.src = equipo.imagen;
      imagenEquipo.alt = "Escudo del Equipo";
      imagenEquipo.style.maxHeight = "50px";
      imagenEquipo.style.borderRadius = "50%";

      const botonesContainer = document.createElement("div");
      botonesContainer.classList.add("d-flex");

      const botonJugadores = document.createElement("button");
      botonJugadores.textContent = "Jugadores";
      botonJugadores.classList.add("btn", "btn-info", "me-2");
      botonJugadores.addEventListener("click", function () {
        abrirModalRegistroJugador(equipo.nombre);
      });

      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.classList.add("btn", "btn-danger");
      botonEliminar.addEventListener("click", function () {
        eliminarEquipo(index);
      });

      botonesContainer.appendChild(botonJugadores);
      botonesContainer.appendChild(botonEliminar);

      nuevoEquipo.appendChild(equipoInfo);
      nuevoEquipo.appendChild(imagenEquipo);
      nuevoEquipo.appendChild(botonesContainer);

      listaEquiposRegistrados.appendChild(nuevoEquipo);
    });
  }

  // Agregar evento al botón de generar enfrentamientos
  btnEnfrentamiento.addEventListener("click", () => {
    const equipos = JSON.parse(localStorage.getItem("equipos")) || [];
    const campeonatos = JSON.parse(localStorage.getItem("campeonatos")) || [];

    if (campeonatos.length === 0) {
      alert("Error: No se ha configurado ningún campeonato.");
      return;
    }

    const campeonatoActual = campeonatos[campeonatos.length - 1];
    const fechaInicioCampeonato = new Date(campeonatoActual.fechaInicio);
    const fechaFinCampeonato = new Date(campeonatoActual.fechaFin);

    if (isNaN(fechaInicioCampeonato) || isNaN(fechaFinCampeonato)) {
      alert("Error: Las fechas del campeonato no son válidas.");
      return;
    }

    const cantidadEnfrentamientos = equipos.length / 2;
    const intervaloEnfrentamientos =
      (fechaFinCampeonato - fechaInicioCampeonato) / cantidadEnfrentamientos;

    // Limpiar el contenido anterior de la tabla
    tablaEnfrentamientos.innerHTML = "";

    // Generar los enfrentamientos y agregarlos a la tabla
    let fechaEnfrentamientoActual = new Date(fechaInicioCampeonato);
    for (let i = 0; i < cantidadEnfrentamientos; i++) {
      const enfrentamientoRow = document.createElement("tr");
      enfrentamientoRow.innerHTML = `
      <td>${fechaEnfrentamientoActual.toISOString().substr(0, 10)}</td>
      <td>${equipos[i].nombre || "Equipo"}</td>
      <td class="vs">VS</td>
      <td>${equipos[i + 1].nombre || "Equipo"}</td>
      <td><input type="number" class="goles-equipo-a" placeholder="Goles" min="0"></td>
      <td class="vs">-</td>
      <td><input type="number" class="goles-equipo-b" placeholder="Goles" min="0"></td>
      <td><input type="number" class="tarjetas-amarillas-input" placeholder="Tar. Amar"></td>
      <td><input type="number" class="tarjetas-rojas-input" placeholder="Tar. Roj"></td>
      <td><input type="text" class="jugadores-expulsados-input" placeholder="Explsds"></td>
      `;
      tablaEnfrentamientos.appendChild(enfrentamientoRow);

      // Incrementar la fecha del enfrentamiento actual según el intervalo
      fechaEnfrentamientoActual = new Date(
        fechaEnfrentamientoActual.getTime() + intervaloEnfrentamientos
      );
    }

    // Mostrar el modal
    modal.show();
  });

  // Agregar evento al botón de registrar resultados
  btnRegistrarResultados.addEventListener("click", () => {
    // Obtener valores de los inputs
    const golesEquipoAInputs = document.querySelectorAll(".goles-equipo-a");
    const golesEquipoBInputs = document.querySelectorAll(".goles-equipo-b");
    const tarjetasAmarillasInputs = document.querySelectorAll(
      ".tarjetas-amarillas-input"
    );
    const tarjetasRojasInputs = document.querySelectorAll(
      ".tarjetas-rojas-input"
    );
    const jugadoresExpulsadosInputs = document.querySelectorAll(
      ".jugadores-expulsados-input"
    );

    // Obtener la lista actual de partidos jugados del Local Storage
    const partidosJugados =
      JSON.parse(localStorage.getItem("partidosJugados")) || [];

    // Recorrer los inputs y construir objetos de partido
    golesEquipoAInputs.forEach((input, index) => {
      const equipoA = tablaEnfrentamientos.rows[index].cells[1].textContent;
      const equipoB = tablaEnfrentamientos.rows[index].cells[3].textContent;
      const golesEquipoA = parseInt(input.value);
      const golesEquipoB = parseInt(golesEquipoBInputs[index].value);
      const partido = {
        fecha: tablaEnfrentamientos.rows[index].cells[0].textContent,
        equipoA: tablaEnfrentamientos.rows[index].cells[1].textContent,
        equipoB: tablaEnfrentamientos.rows[index].cells[3].textContent,
        golesEquipoA: golesEquipoA,
        golesEquipoB: golesEquipoB,
        tarjetasAmarillas: tarjetasAmarillasInputs[index].value,
        tarjetasRojas: tarjetasRojasInputs[index].value,
        jugadoresExpulsados: jugadoresExpulsadosInputs[index].value,
      };

      if (golesEquipoA > golesEquipoB) {
        partido.puntosEquipoA = 3;
        partido.puntosEquipoB = 0;
      } else if (golesEquipoA < golesEquipoB) {
        partido.puntosEquipoA = 0;
        partido.puntosEquipoB = 3;
      } else {
        partido.puntosEquipoA = 1;
        partido.puntosEquipoB = 1;
      }

      partidosJugados.push(partido);
    });

    // Guardar en el Local Storage
    localStorage.setItem("partidosJugados", JSON.stringify(partidosJugados));

    // Calcular y mostrar la tabla de posiciones
    calcularYMostrarTablaPosiciones();

    // Cerrar el modal después de registrar resultados
    modal.hide();
  });

  // Función para calcular y mostrar la tabla de posiciones
  function calcularYMostrarTablaPosiciones() {
    const tablaPosiciones = document.getElementById("tablaPosiciones");
    tablaPosiciones.innerHTML = "";

    const equipos = JSON.parse(localStorage.getItem("equipos")) || [];
    const partidosJugados =
      JSON.parse(localStorage.getItem("partidosJugados")) || [];

    const equiposPosiciones = equipos.map((equipo) => {
      const partidosEquipo = partidosJugados.filter(
        (partido) =>
          partido.equipoA === equipo.nombre || partido.equipoB === equipo.nombre
      );

      const puntos = partidosEquipo.reduce((totalPuntos, partido) => {
        return (
          totalPuntos +
          (equipo.nombre === partido.equipoA
            ? partido.puntosEquipoA
            : partido.puntosEquipoB)
        );
      }, 0);

      const goles = partidosEquipo.reduce((totalGoles, partido) => {
        return (
          totalGoles +
          (equipo.nombre === partido.equipoA
            ? partido.golesEquipoA
            : partido.golesEquipoB)
        );
      }, 0);

      return {
        nombre: equipo.nombre,
        escudo: equipo.imagen,
        partidosJugados: partidosEquipo.length,
        puntos: puntos,
        goles: goles,
      };
    });

    equiposPosiciones.sort((a, b) => b.puntos - a.puntos || b.goles - a.goles);

    equiposPosiciones.forEach((equipo, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td><img src="${
          equipo.escudo
        }" alt="Escudo del Equipo" width="30" height="30"></td>
        <td>${equipo.nombre}</td>
        <td>${equipo.partidosJugados}</td>
        <td>${equipo.goles}</td>
        <td>${equipo.puntos}</td>
      `;
      tablaPosiciones.appendChild(fila);
    });
    const modal = new bootstrap.Modal(
      document.getElementById("posicionesModal")
    );
    modal.show();
  }

  // Cargar la lista de equipos al cargar la página
  window.onload = () => {
    actualizarListaEquipos();
  };
});
