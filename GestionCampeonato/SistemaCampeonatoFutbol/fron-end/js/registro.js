class RegistroForm {
  constructor() {
    this.registroForm = document.querySelector("#form-registro");
    this.usernameInput = document.querySelector("#id-username");
    this.emailInput = document.querySelector("#id-email");
    this.passwordInput = document.querySelector("#id-password");
    this.mensajeError = document.querySelector("#mensaje-error");
    this.usuariosRegistrados =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    this.registroForm.addEventListener(
      "submit",
      this.handleRegistro.bind(this)
    );
  }

  handleRegistro(event) {
    event.preventDefault();

    const email = this.emailInput.value;
    const usuarioExistente = this.usuariosRegistrados.find(
      (usuario) => usuario.email === email
    );

    if (usuarioExistente) {
      this.displayErrorMessage("Este correo electrónico ya está registrado.");
    } else {
      this.registerNewUser();
    }
  }

  displayErrorMessage(message) {
    this.mensajeError.textContent = message;
  }

  registerNewUser() {
    const nuevoUsuario = {
      username: this.usernameInput.value,
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };

    this.usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(this.usuariosRegistrados));
    localStorage.setItem("nombreUsuario", nuevoUsuario.username);

    this.redirectToLoginPage();
  }

  redirectToLoginPage() {
    window.location.href = "login.html";
  }
}

const registroFormInstance = new RegistroForm();
