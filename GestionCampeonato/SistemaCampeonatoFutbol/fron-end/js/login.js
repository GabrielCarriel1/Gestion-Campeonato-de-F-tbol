class LoginForm {
  constructor() {
    this.loginForm = document.querySelector("#form-login");
    this.usernameInput = document.querySelector("#id-logemail");
    this.passwordInput = document.querySelector("#id-logpass");
    this.errorMessage = document.querySelector("#login-mensaje-error");
    this.cuentasAlmacenadas =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    this.loginForm.addEventListener("submit", this.handleLogin.bind(this));
  }

  handleLogin(event) {
    event.preventDefault();

    const email = this.usernameInput.value;
    const password = this.passwordInput.value;

    const cuentaEncontrada = this.cuentasAlmacenadas.find(
      (cuenta) => cuenta.email === email && cuenta.password === password
    );
    console.log(cuentaEncontrada);
    if (!cuentaEncontrada) {
      this.displayErrorMessage("Correo o Contraseña Incorrectos!");
    } else {
      this.storeLoginInfo(cuentaEncontrada);
      this.redirectToMainPage();
    }
  }

  displayErrorMessage(message) {
    this.errorMessage.textContent = message;
  }

  storeLoginInfo(cuenta) {
    sessionStorage.setItem("login_success", JSON.stringify(cuenta));
    localStorage.setItem("email", cuenta.email);
    localStorage.setItem("contraseña", cuenta.password);
  }

  redirectToMainPage() {
    window.location.href = "index.html";
  }
}

const loginFormInstance = new LoginForm();
