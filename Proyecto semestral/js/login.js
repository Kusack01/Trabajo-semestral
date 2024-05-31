$(document).ready(function() {
  //envío de formulario de inicio de sesión
  $("#loginForm").submit(function(event) {
      event.preventDefault();
      var email = $("#loginEmail").val();
      var password = $("#loginPassword").val();

      // Validaciones básicas
      if (!email || !password) {
          alert("Por favor, complete todos los campos.");
          return;
      }

      // Enviar solicitud al servidor
      fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              // Redirigir al usuario a la página principal
              window.location.href = 'index.html';
          } else {
              alert(data.message || "Error al iniciar sesión.");
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert("Hubo un problema con la solicitud.");
      });
  });

  // Manejar envío de formulario de registro
  $("#registerForm").submit(function(event) {
      event.preventDefault();
      var fullName = $("#fullName").val();
      var email = $("#registerEmail").val();
      var password = $("#registerPassword").val();
      var confirmPassword = $("#confirmPassword").val();

      // Validaciones básicas
      if (!fullName || !email || !password || !confirmPassword) {
          alert("Por favor, complete todos los campos.");
          return;
      }

      if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden.");
          return;
      }

      // Enviar solicitud al servidor
      fetch('/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fullName: fullName, email: email, password: password })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert("Registro exitoso. Por favor, revise su correo para validar su cuenta.");
          } else {
              alert(data.message || "Error al registrar usuario.");
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert("Hubo un problema con la solicitud.");
      });
  });
});

