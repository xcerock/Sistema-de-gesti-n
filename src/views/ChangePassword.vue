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
        <h1 class="p-3">Cambiar contraseña</h1>
        <div class="vstack gap-2 col-md-5 mx-auto mt-3 mb-3 ">
          <div class="form-group mt-3 mb-3">

            <label for="confirmationcode" class="form-label">Codigo de confirmación</label>
            <input v-model="PasswordFormData.Codigo" type="text" id="confirmationcode" placeholder="Codigo de confirmación" class="form-control" />
            
            <label for="newpassword" class="form-label">Contraseña nueva</label>
            <input v-model="PasswordFormData.Password" type="text" id="newpassword" placeholder="Contraseña nueva" class="form-control" required @input="ValidatePassword('password')"/>

            <label for="confirmationpassword" class="form-label"> Confirmar contraseña</label>
            <input v-model="PasswordFormData.Confirmation" type="text" id="confirmationpassword" placeholder="Confirmar contraseña" class="form-control" required @input="ValidatePassword('confirmation')"/>
          </div>
          <div>
            <p v-if="PasswordError" class="error-message">Solo caracteres alfanuméricos permitidos.</p>
            <p v-if="ConfirmationError" class="error-message">Las contraseñas no coinciden.</p>
          </div>
  
          <div class="text-center ">
            <button @click="ChangePassword" :disabled="botonDeshabilitado"   type="button"  class="btn btn-dark btn-lg w-100" style="max-width: 300px;">Cambiar contraseña</button>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  name: 'RegistroUsuarios',
  data() {
    return {
      PasswordError: false,
      ConfirmationError: false,
      botonDeshabilitado: true,
      backendUrl: '',
      PasswordFormData: {
        Password: '',
        Codigo: '',
        Confirmation: ''
      }
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
          console.error(error);
        });
    },
    ValidatePassword(field) {
      this.PasswordError = false;
      this.ConfirmationError = false;

      if (field === 'password') {
        if (/[^a-zA-Z0-9]/.test(this.PasswordFormData.Password)) {
          this.PasswordError = true;
        }
        // Limpieza de la contraseña nueva no es necesaria aquí, puede confundir al usuario
      } else if (field === 'confirmation') {
        if (this.PasswordFormData.Password !== this.PasswordFormData.Confirmation) {
          this.ConfirmationError = true;
        }
      }

      this.botonDeshabilitado = !(this.PasswordFormData.Password && this.PasswordFormData.Codigo && this.PasswordFormData.Password === this.PasswordFormData.Confirmation && !this.PasswordError && !this.ConfirmationError);
    },

    async ChangePassword() {
      if (!this.backendUrl) {
        alert('La URL del backend no está disponible. Intente nuevamente.');
        return;
      }
      const headers = {
        'Action': 'ChangePassword',
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.post(this.backendUrl , this.PasswordFormData, { headers });
        console.log(response.data);
        // Manejar la respuesta exitosamente aquí
      } catch (error) {
        console.error(error);
        // Manejar el error aquí
      }
    }
  }
}
</script>

<style scoped>
  /* Tus estilos aquí */
</style>