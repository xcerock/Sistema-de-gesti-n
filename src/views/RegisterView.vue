<template>
  <div class="fluid-container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img :src="require('@/assets/logos.png')" alt="logo" width="50">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/login" class="btn btn-outline-light" style="border-color: #230007; color: #230007;">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-4 d-flex align-items-center justify-content-center text-center mb-3">
          <img alt="image" :src="require('@/assets/logoM.png')" class="img-fluid mb-2" />
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-md-6 mb-3">
              <label for="dni" class="form-label">DNI</label>
              <input
                v-model.number="userFormData.DNI"
                @input="filterDNI"
                type="number"
                id="dni"
                placeholder="DNI"
                class="form-control"
                min="0"
                step="1" />
              <div v-if="!userFormData.DNI.toString().trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-2 col-md-6 mb-2">
              <label for="birthplace" class="form-label">Lugar de nacimiento</label>
              <vue-countries-cities v-model="userFormData.LugarNacimiento" id="birthplace" />
              <div v-if="!userFormData.LugarNacimiento.trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 col-md-6 mb-3 ">
                <label for="birthdate" class="form-label">Fecha de nacimiento</label>
                <input v-model="userFormData.FechaNacimiento" type="date" id="birthdate" placeholder="DD/MM/YYYY" class="form-control" :min = "getminDate()" :max="getMaxDate()" />
                <div v-if="!userFormData.FechaNacimiento.trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="email" class="form-label">Correo electrónico</label>
              <input v-model="userFormData.CorreoElectronico" type="email" id="email" placeholder="Email" class="form-control" />
              <div v-if="!isEmailValid && userFormData.CorreoElectronico" class="text-danger">
                Ingrese un correo electrónico válido.
              </div>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="lastname" class="form-label">Apellidos</label>
              <input v-model="userFormData.Apellidos" type="text" id="lastname" placeholder="Apellidos" class="form-control" />
              <div v-if="!userFormData.Apellidos.trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="firstname" class="form-label">Nombres</label>
              <input v-model="userFormData.Nombres" type="text" id="firstname" placeholder="Nombres" class="form-control" />
              <div v-if="!userFormData.Nombres.trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="gender" class="form-label">Género</label>
              <select v-model="userFormData.Genero" id="gender" class="form-control">
                <option disabled value="">Seleccione una opción</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="No especifica">No especifica</option>
              </select>
              <div v-if="!userFormData.Genero" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="user" class="form-label"> Usuario </label>
              <input v-model="userFormData.Username" required @input="validateInput('Username')" type="text" id="user" placeholder="Usuario" class="form-control" />
              <div v-if="!userFormData.Username.trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <div class="input-group">
                <input :type="showPassword ? 'text' : 'password'" v-model="userFormData.Password" required @input="validateInput('Password')" id="password" placeholder="Contraseña" class="form-control" />
                <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                   <span v-if="showPassword" class="material-symbols-outlined">visibility</span>
                   <span v-else class="material-symbols-outlined">visibility_off</span>
                </button>
              </div>
              <div v-if="!userFormData.Password.trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label for="password" class="form-label">Confirmar contraseña</label>
              <div class="input-group">
                <input :type="showPassword ? 'text' : 'password'" v-model="userFormData.Password" required @input="validateInput('Password')" id="password" placeholder="Confrimar" class="form-control" />
                <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                   <span v-if="showPassword" class="material-symbols-outlined">visibility</span>
                   <span v-else class="material-symbols-outlined">visibility_off</span>
                </button>
              </div>
              <div v-if="!userFormData.Password.trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 text-center mb-3">
              <label for="address" class="form-label"> Dirección de correspondencia </label>
              <input v-model="userFormData.DireccionCorrespondencia" type="address" id="address" placeholder="Dirección de correspondencia" class="form-control" />
              <div v-if="!userFormData.DireccionCorrespondencia.trim()" class="text-danger">Este campo es obligatorio.</div>
            </div>
            <div class="col-12 text-center mb-3">
              <label for="themes" class="form-label">Temas literarios de preferencia</label>
              <select v-model="userFormData.TemasLiterariosPreferencia" id="themes" class="form-control" multiple>
                <option value="novela">Novela</option>
                <option value="poesia">Poesía</option>
                <option value="ensayo">Ensayo</option>
                <option value="teatro">Teatro</option>
                <option value="cuento">Cuento</option>
                <option value="ciencia">Ciencia</option>
                <option value="historia">Historia</option>
                <option value="biografia">Biografía</option>
                <option value="filosofia">Filosofía</option>
                <option value="politica">Política</option>
                <option value="religion">Religión</option>
                <option value="autoayuda">Autoayuda</option>
                <option value="infantil">Infantil</option>
                <option value="juvenil">Juvenil</option>
                <option value="comic">Cómic</option>
                <option value="manga">Manga</option>
              </select>
            </div>
          </div>
          <button type="button" @click="registerUser" class="btn btn-success mt-3" :disabled="!isFormValid">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import axios from 'axios';
  import VueCountriesCities from 'vue-countries-cities';

  export default {
    name: 'RegistroUsuarios',
    components: {
      'vue-countries-cities': VueCountriesCities
    },
    data() {
      return {
        userFormData: {
          Password: '',
          Username: '',
          DNI: '',
          Nombres: '',
          Apellidos: '',
          FechaNacimiento: '',
          LugarNacimiento: '',
          DireccionCorrespondencia: '',
          Genero: '',
          CorreoElectronico: '',
          TemasLiterariosPreferencia: [],
          backendUrl: '',
          Tipo: 'Cliente'
        },
        usernameError: false,
        passwordError: false,
        showPassword: false,
      };
    },
    mounted() {
      this.fectchBackendUrl();
    },
    computed: {
      isEmailValid() {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailPattern.test(this.userFormData.CorreoElectronico);
      },
      isFormValid() {
        const textFieldsFilled = this.userFormData.DNI > 0 &&
                                this.userFormData.LugarNacimiento.trim() &&
                                this.userFormData.FechaNacimiento &&
                                this.userFormData.Apellidos.trim() &&
                                this.userFormData.Nombres.trim() &&
                                this.userFormData.Genero &&
                                this.isEmailValid && // Usa la propiedad computada aquí
                                this.userFormData.Username.trim() &&
                                this.userFormData.Password.trim() &&
                                this.userFormData.DireccionCorrespondencia.trim();

        const themesAreSelected = this.userFormData.TemasLiterariosPreferencia.length > 0;

        return textFieldsFilled && themesAreSelected;
      }
    },
    methods: {
      fectchBackendUrl() {
        const configUrl = 'https://backends-15b02-default-rtdb.firebaseio.com/Urls/Libreria.json';
        axios.get(configUrl)
          .then(response => {
            this.userFormData.backendUrl = response.data;
          })
          .catch(error => {
            console.error(error);
            alert("Error al intentar obtener la URL del backend. Por favor, inténtalo de nuevo.");
          });
      },
      validateInput(field) {
        if (field === 'Username') {
          if (/[^a-zA-Z0-9]/.test(this.userFormData.Username)) {
            this.usernameError = true; // Establece el estado de error para Username
            this.userFormData.Username = this.userFormData.Username.replace(/[^a-zA-Z0-9]/g, '');
          } else {
            this.usernameError = false; // Limpia el estado de error si el input es válido
          }
        } else if (field === 'Password') {
          if (/[^a-zA-Z0-9]/.test(this.userFormData.Password)) {
            this.passwordError = true; // Establece el estado de error para Password
            this.userFormData.Password = this.userFormData.Password.replace(/[^a-zA-Z0-9]/g, '');
          } else {
            this.passwordError = false; // Limpia el estado de error si el input es válido
          }
        }
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },  
      filterDNI(event) {
        // Impide la entrada de caracteres que no sean dígitos
        const value = parseInt(event.target.value, 10);
        if (isNaN(value) || value < 0) {
          // Restablece el valor a un estado válido o lo deja en blanco si no es un número
          this.userFormData.DNI = '';
        } else {
          this.userFormData.DNI = value;
        }
      },
      getMaxDate() {
        const today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
        let year = today.getFullYear() - 18;

        // Ajuste para que el día y el mes tengan dos dígitos
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        // Uso correcto de comillas invertidas y ${} para interpolación
        return `${year}-${month}-${day}`;
      },
      getminDate(){
        const today = new Date();
        let year = today.getFullYear() - 90;
        return `${year}-01-01`;

      },
      async registerUser() {
        if (!this.backendUrl){
          alert("No se ha podido obtener la URL del backend. Por favor, inténtalo de nuevo.");
          return;
        }
        const headers = {
          'Action': 'SingIn',
          'Content-Type': 'application/json'
        };

        try {
          const response = await axios.post(this.backendUrl, this.userFormData, { headers });
          // Suponiendo que el backend responde con un objeto que incluye una propiedad de estado y un mensaje
          if (response.data && response.data.Status === "True") {
            // Suponiendo que `status` y `message` son parte de la respuesta del backend
            alert("Registro exitoso: " + response.data.message); // Muestra el mensaje de éxito
            this.$router.push('/login'); // Redirige al usuario a la página de inicio de sesión o a donde consideres apropiado
          } else {
            // Si el backend indica que no fue exitoso el registro
            alert("Error en el registro: " + response.data.message); // Muestra mensaje de error
          }
        } catch (error) {
          console.error(error);
          // Aquí podrías manejar errores específicos de la petición
          alert("Error al intentar registrar. Por favor, inténtalo de nuevo.");
        }
      }
    }
  }
</script>
  
<style scoped>
  /* Tus estilos aquí */
</style>