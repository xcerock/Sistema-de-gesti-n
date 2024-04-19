<template>
  <div>
    <!-- NAV BAR -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img :src="require('@/assets/logoM.png')" alt="logo" width="50">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <!--<router-link to="/" class="btn btn-inline-dark">Inicio</router-link>-->
              <router-link to="/register" class="btn btn-inline-dark">Registro</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- MAIN CONTAINER -->
    <div class="container text-center p-5">
      <img :src="require('@/assets/logoM.png')" alt="logo" width="280">
      <h1 class="p-3">Inicio de sesión</h1>
      <div class="vstack gap-2 col-md-5 mx-auto mt-3 mb-3">
        <form @submit.prevent="login">
          <div class="form-group mt-3 mb-3">
              <input type="text" placeholder="Usuario" class="form-control me-2" v-model="username" required @input="validateInput('username')">
              <p v-if="usernameError" class="error-message">Solo caracteres alfanuméricos permitidos.</p>
              
          </div>
          <div class="form-group mt-3 mb-3">
              <input type="password" placeholder="Contraseña" class="form-control me-2" v-model="password" required @input="validateInput('password')">
              <p v-if="passwordError" class="error-message">Solo caracteres alfanuméricos permitidos.</p>
          </div>
          <button type="submit" class="btn btn-dark btn-lg mt-3 mb-3">Iniciar sesión</button>
        </form>
        <p><router-link to="/send-confirmation" class="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">¿Olvidaste tu contraseña?</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false,
      backendUrl: ''
    };
  },
  mounted() {
    this.fetchBackendUrl();
  },
  methods: {
    fetchBackendUrl() {
      const configUrl = 'https://backends-15b02-default-rtdb.firebaseio.com/Urls/Libreria.json';
      axios.get(configUrl)
        .then(response => {
          this.backendUrl = response.data;
        })
        .catch(error => {
          console.error('Error fetching backend URL:', error);
          alert('No se pudo obtener la configuración del servidor. Por favor, intente más tarde.');
        });
    },
    validateInput(field) {
      // Reset error states
      this.usernameError = false;
      this.passwordError = false;

      if (field === 'username') {
        if (/[^a-zA-Z0-9]/.test(this.username)) {
          this.usernameError = true;
        }
        this.username = this.username.replace(/[^a-zA-Z0-9]/g, '');
      } else if (field === 'password') {
        if (/[^a-zA-Z0-9]/.test(this.password)) {
          this.passwordError = true;
        }
        this.password = this.password.replace(/[^a-zA-Z0-9]/g, '');
      }
    },
    login() {
      if (!this.backendUrl) {
        alert('La URL del backend no está disponible. Intente nuevamente.');
        return;
      }
      axios.post(this.backendUrl,
        {
          Username: this.username,
          Password: this.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Action': 'Login',
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.Status === "True") { // Asegúrate de que esta condición coincida con cómo tu backend envía la respuesta
          alert("Acceso concedido."); // Mensaje de éxito
          // Aquí puedes añadir la lógica de redirección según el tipo de usuario
          if (response.data.Tipo === "Root") {
            this.$router.push('/administrator-register'); // Redirigir al usuario a RootView
          } else if (response.data.Tipo === "Admin") {
            this.$router.push('/send-confirmation'); // Redirigir al usuario a AdminView
          } else {
            this.$router.push('/send-confirmation'); // Redirigir al usuario a AboutView o cualquier otra vista según sea adecuado
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo."); // Manejo del error
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #D9D9D9;
}
.login-container1 {
  top: 227px;
  left: 612px;
  width: 400px;
  height: 515px;
  display: flex;
  position: absolute;
  align-items: flex-end;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  justify-content: center;
  background-color: #ffffff;
}
.login-text {
  top: 20px;
  right: 140px;
  margin: auto;
  position: absolute;
  align-self: center;
}
.login-textinput {
  top: 240px;
  right: 72px;
  position: absolute;
}
.login-textinput1 {
  top: 310px;
  right: 72px;
  position: absolute;
}
.login-button {
  left: 158px;
  bottom: 100px;
  position: absolute;
}
.login-image {
  top: 226px;
  left: 74px;
  width: 512px;
  position: absolute;
  align-self: flex-start;
  object-fit: cover;
}
.error-message {
  color: red;
  font-size: 0.8em;
}
</style>
