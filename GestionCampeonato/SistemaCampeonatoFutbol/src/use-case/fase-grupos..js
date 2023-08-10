function irAFaseDeGrupos() {
  // Obtener la lista de equipos del localStorage
  const equiposRegistrados = JSON.parse(localStorage.getItem("equipos")) || [];

  // Convertir la lista de equipos a una cadena JSON
  const equiposRegistradosJSON = JSON.stringify(equiposRegistrados);

  // Codificar la cadena JSON para pasarla en la URL
  const equiposRegistradosURL = encodeURIComponent(equiposRegistradosJSON);

  // Redirigir a la página de Fase de Grupos con la lista de equipos en la URL
  window.location.href = `fase-grupos.html?equipos=${equiposRegistradosURL}`;
}
