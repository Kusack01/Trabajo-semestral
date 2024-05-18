  $(document).ready(function() {
    // Manejar envío de formulario de inicio de sesión
    $("#loginForm").submit(function(event) {
      event.preventDefault();
      var email = $("#loginEmail").val();
      var password = $("#loginPassword").val();
      // Aquí puedes agregar tu lógica para iniciar sesión
      console.log("Iniciar sesión con:", email, password);
    });

    // Manejar envío de formulario de registro
    $("#registerForm").submit(function(event) {
      event.preventDefault();
      var fullName = $("#fullName").val();
      var email = $("#registerEmail").val();
      var password = $("#registerPassword").val();
      var confirmPassword = $("#confirmPassword").val();
      // Aquí puedes agregar tu lógica para registrar al usuario
      console.log("Registro de usuario:", fullName, email, password, confirmPassword);
    });
  });
