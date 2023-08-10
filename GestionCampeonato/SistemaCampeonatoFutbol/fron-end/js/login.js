const login = document.querySelector("#form-login");
login.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#id-email").value;
  const password = document.querySelector("#id-password").value;

  const cuenta = JSON.parse(localStorage.getItem("usuarios")) || [];
  const cuentasRegistrada = cuenta.find(
    (cuenta) => cuenta.username == username && cuenta.password == password
  );
  if (!cuentasRegistrada) {
    const mensajeError = document.querySelector("#login-mensaje-error");
    mensajeError.textContent = "Correo o Contraseña Incorrectos!";
  } else {
    localStorage.setItem("login_success", JSON.stringify(cuentasRegistrada));
    localStorage.setItem("nombreUsuario", cuentasRegistrada.username);
    window.location.href = "index.html";
  }
});
