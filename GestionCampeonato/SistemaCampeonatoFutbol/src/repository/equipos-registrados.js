document
  .querySelector("#form-registrar-equipos")
  .addEventListener("submit", function (event) {
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
    document.getElementById("form-registrar-equipos").reset();
  });

function actualizarListaEquipos() {
  const listaEquiposRegistrados = document.getElementById(
    "equipos-registrados"
  );
  listaEquiposRegistrados.innerHTML = "";

  const equiposRegistrados = JSON.parse(localStorage.getItem("equipos")) || [];
  equiposRegistrados.forEach(function (equipo) {
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

    nuevoEquipo.appendChild(equipoInfo);
    nuevoEquipo.appendChild(imagenEquipo);

    listaEquiposRegistrados.appendChild(nuevoEquipo);
  });
}

window.onload = actualizarListaEquipos;

document
  .querySelector("#form-registrar-equipos")
  .addEventListener("submit", function (event) {
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
    document.getElementById("form-registrar-equipos").reset();
  });

function eliminarEquipo(index) {
  const equiposRegistrados = JSON.parse(localStorage.getItem("equipos")) || [];
  equiposRegistrados.splice(index, 1);
  localStorage.setItem("equipos", JSON.stringify(equiposRegistrados));
  actualizarListaEquipos();
}

function editarEquipo(index) {
  // Implementa la lógica para editar el equipo en la posición "index"
  // Puedes mostrar un modal o formulario de edición y luego actualizar los datos
  // en el array y en el LocalStorage. Finalmente, llama a actualizarListaEquipos().
}

function crearEquipoElement(equipo, index) {
  // ... (tu código existente para crear elementos de equipo)

  // Agregar botones de eliminar y editar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.className = "btn btn-danger btn-sm me-2";
  btnEliminar.addEventListener("click", () => {
    eliminarEquipo(index);
  });

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.className = "btn btn-primary btn-sm";
  btnEditar.addEventListener("click", () => {
    editarEquipo(index);
  });

  const botonesContainer = document.createElement("div");
  botonesContainer.appendChild(btnEliminar);
  botonesContainer.appendChild(btnEditar);

  nuevoEquipo.appendChild(botonesContainer);

  // ... (continúa con el resto de tu código para crear elementos de equipo)
}

function actualizarListaEquipos() {
  const listaEquiposRegistrados = document.getElementById(
    "equipos-registrados"
  );
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

    nuevoEquipo.appendChild(equipoInfo);
    nuevoEquipo.appendChild(imagenEquipo);

    // Agregar botones de eliminar y editar
    const botonesContainer = document.createElement("div");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn btn-danger btn-sm me-2";
    btnEliminar.addEventListener("click", () => {
      eliminarEquipo(index);
    });

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn btn-primary btn-sm";
    btnEditar.addEventListener("click", () => {
      editarEquipo(index);
    });

    botonesContainer.appendChild(btnEliminar);
    botonesContainer.appendChild(btnEditar);

    nuevoEquipo.appendChild(botonesContainer);

    listaEquiposRegistrados.appendChild(nuevoEquipo);
  });
}

window.onload = function () {
  actualizarListaEquipos();
};
