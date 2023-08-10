const registro = document.querySelector("#form-registro");
registro.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#id-username");
  const email = document.querySelector("#id-email");
  const password = document.querySelector("#id-password");

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuariosRegistrados = usuarios.find(
    (usuario) => usuario.email === email.value
  );

  const mensajeError = document.querySelector("#mensaje-error");

  if (usuariosRegistrados !== undefined) {
    mensajeError.textContent = "Este correo electrónico ya está registrado.";
  } else {
    usuarios.push({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    window.location.href = "login.html";
  }
  localStorage.setItem("nombreUsuario", username.value);
});
