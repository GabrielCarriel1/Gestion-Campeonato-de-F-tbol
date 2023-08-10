document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("login_success"));

  if (!usuarioLogueado) {
    window.location = "pag-principal.html";
  }
});

const formRegistrarEquipos = document.querySelector("#form-registrar-equipos");

const listaEquiposRegistrados = document.getElementById("equipos-registrados");

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

  const equiposRegistrados = JSON.parse(localStorage.getItem("equipos")) || [];
  equiposRegistrados.push(nuevoEquipo);
  localStorage.setItem("equipos", JSON.stringify(equiposRegistrados));

  actualizarListaEquipos();
  imagenEquipoInput.value = "";

  alert(`Equipo "${nombreEquipo}" registrado con éxito.`);
  formRegistrarEquipos.reset();
});

function eliminarEquipo(index) {
  const equiposRegistrados = JSON.parse(localStorage.getItem("equipos")) || [];
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

function actualizarListaEquipos() {
  listaEquiposRegistrados.innerHTML = "";

  const equiposRegistrados = JSON.parse(localStorage.getItem("equipos")) || [];
  equiposRegistrados.forEach(function (equipo, index) {
    const nuevoEquipo = document.createElement("li");
    nuevoEquipo.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const equipoInfo = document.createElement("span");
    equipoInfo.textContent = equipo.nombre;

    const imagenEquipo = document.createElement("img");
    imagenEquipo.src = equipo.imagen;
    imagenEquipo.alt = "Escudo del Equipo";
    imagenEquipo.style.maxHeight = "50px";
    imagenEquipo.style.borderRadius = "50%";

    const botonesContainer = document.createElement("div");
    botonesContainer.classList.add("d-flex");

    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("btn", "btn-warning", "me-2");
    botonEditar.addEventListener("click", function () {
      // Lógica para editar el equipo (puedes implementarla)
    });

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn", "btn-danger");
    botonEliminar.addEventListener("click", function () {
      eliminarEquipo(index);
    });

    botonesContainer.appendChild(botonEditar);
    botonesContainer.appendChild(botonEliminar);

    nuevoEquipo.appendChild(equipoInfo);
    nuevoEquipo.appendChild(imagenEquipo);
    nuevoEquipo.appendChild(botonesContainer);

    listaEquiposRegistrados.appendChild(nuevoEquipo);
  });
}
window.onload = actualizarListaEquipos;
