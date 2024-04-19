<template>
  <div>
    <!-- NAV BAR -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img :src="require('@/assets/logoM.png')" alt="logo" width="50">
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
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
      <h1 class="p-3">Ingrese su correo</h1>
      <div class="vstack gap-2 col-md-5 mx-auto mt-3 mb-3 ">
        <div class="form-group mt-3 mb-3">
          <input v-model="Email" type="email" id="Email" placeholder="Correo electrónico" class="form-control" />
            <div v-if="!isEmailValid && Email.length > 0" class="text-danger">
              Ingrese un correo electrónico válido.
            </div>
          </div>

          <div class="text-center">
            <!-- Usamos isEmailValid para controlar el estado del botón -->
            <button type="submit" @click="SendEmail" class="btn btn-dark btn-lg w-100" :disabled="!isEmailValid" style="max-width: 200px;">Enviar correo</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Asegúrate de instalar axios con `npm install axios` o `yarn add axios`

export default {
  name: 'SendConfirmation',
  data() {
    return {
      Email: "",
      backendUrl: ''
    };
  },
  mounted() {
    this.fetchBackendUrl();
  },
  computed: {
    // Cambiamos isEmailValid a una propiedad computada
    isEmailValid() {
      const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailPattern.test(this.Email);
    },
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
    async SendEmail() {
      if (!this.backendUrl) {
        alert('La URL del backend no está disponible. Intente nuevamente.');
        return;
      }
      const headers = {
        'Action': 'VericarChangePassword', // Asegúrate de que esta cabecera sea aceptada y manejada en tu backend
        'Content-Type': 'application/json',
        'Email' : this.Email
      };
      try {
        const response = await axios.post(this.backendUrl,{}, { headers });
        console.log(response.data); // Maneja la respuesta como necesites
        // Aquí puedes agregar lógica para, por ejemplo, redireccionar al usuario o mostrar un mensaje de éxito
        if (response.data.Status === "True") { // Asume que la respuesta tiene una propiedad `status` que indica éxito
          this.$router.push("/change-password"); // Redirecciona al usuario
        } else {
        // Aquí puedes manejar la lógica para cuando el backend devuelve un estado diferente
      }
      } catch (error) {
        console.error(error); // Manejo básico de errores
        // Considera mostrar un mensaje de error más amigable al usuario
        alert("Ocurrió un error al enviar el correo. Por favor, intenta de nuevo más tarde.");
      }
    }
  }
}
</script>

<style scoped>
/* Tus estilos aquí */
</style>
