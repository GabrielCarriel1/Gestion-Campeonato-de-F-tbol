const loginForm = document.querySelector("#form-login");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.querySelector("#id-email").value;
  const password = document.querySelector("#id-password").value;

  const cuentasAlmacenadas = JSON.parse(localStorage.getItem("usuarios")) || [];

  const cuentaEncontrada = cuentasAlmacenadas.find(
    (cuenta) => cuenta.username === username && cuenta.password === password
  );

  if (!cuentaEncontrada) {
    const mensajeError = document.querySelector("#login-mensaje-error");
    mensajeError.textContent = "Correo o Contraseña Incorrectos!";
  } else {
    sessionStorage.setItem("login_success", JSON.stringify(cuentaEncontrada));
    localStorage.setItem("nombreUsuario", cuentaEncontrada.username);
    localStorage.setItem("contraseña", cuentaEncontrada.password);

    window.location.href = "index.html";
  }
});
