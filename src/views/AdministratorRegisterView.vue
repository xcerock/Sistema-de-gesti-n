<template>
  <div>
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
              <router-link to="/login" class="btn btn-outline-light" style="border-color: #230007; color: #230007;">Iniciar sesión</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="fluid-container">
      <h1 class="text-center p-3" style="color: #230007;">Registro de Administradores</h1>

      <div class="container py-5">
        <div class="row">
          <div class="col-12 col-md-4 d-flex align-items-center justify-content-center text-center mb-3">
            <img alt="image" :src="require('@/assets/logoM.png')" class="img-fluid mb-2" />
          </div>
          <div class="col-12 col-md-8">
            <div class="row">

              <!-- NOMBRES -->
              <div class="col-12 col-md-6 mb-4">
                <label for="firstname" class="form-label txt-lg" style="color: #230007;">Nombres</label>
                <input v-model="userFormData.Nombres" @input="touchField('Nombres')" type="text" id="firstname" placeholder="Nombres" class="form-control" />
                <div v-if="!userFormData.Nombres.trim() && isFieldTouched.Nombres" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- APELLIDOS -->
              <div class="col-12 col-md-6 mb-3">
                <label for="lastname" class="form-label txt-lg" style="color: #230007;">Apellidos</label>
                <input v-model="userFormData.Apellidos" @input="touchField('Apellidos')" type="text" id="lastname" placeholder="Apellidos" class="form-control" />
                <div v-if="!userFormData.Apellidos.trim() && isFieldTouched.Apellidos" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- DNI -->
              <div class="col-12 col-md-6 mb-3">
                <label for="dni" class="form-label txt-lg" style="color: #230007;">DNI</label>
                <input v-model.number="userFormData.DNI" @input="touchField('DNI')" type="number" id="dni" placeholder="DNI" class="form-control" min="0" step="1" />
                <div v-if="!userFormData.DNI.toString().trim() && isFieldTouched.DNI" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- CORREO ELECTRÓNICO -->
              <div class="col-12 col-md-6 mb-3">
                <label for="email" class="form-label txt-lg" style="color: #230007;">Correo electrónico</label>
                <input v-model="userFormData.CorreoElectronico" @input="touchField('CorreoElectronico')" type="email" id="email" placeholder="Email" class="form-control" />
                <div v-if="!isEmailValid && userFormData.CorreoElectronico && isFieldTouched.CorreoElectronico" class="text-danger">Ingrese un correo electrónico válido.</div>
                <div v-if="!userFormData.CorreoElectronico.trim() && isFieldTouched.CorreoElectronico" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- FECHA DE NACIMIENTO -->
              <div class="col-12 col-md-6 mb-3">
                <label for="birthdate" class="form-label txt-lg" style="color: #230007;">Fecha de nacimiento</label>
                <input v-model="userFormData.FechaNacimiento" @input="touchField('FechaNacimiento')" type="date" id="birthdate" placeholder="DD/MM/YYYY" class="form-control" :max="getCurrentDate()" />
                <div v-if="!userFormData.FechaNacimiento.trim() && isFieldTouched.FechaNacimiento" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- LUGAR DE NACIMIENTO -->
              <div class="col-12 col-md-6 mb-3">
                <label for="birthplace" class="form-label txt-lg" style="color: #230007;">Lugar de nacimiento</label>
                <input v-model="userFormData.LugarNacimiento" @input="touchField('LugarNacimiento')" type="text" id="birthplace" placeholder="Lugar de nacimiento" class="form-control" />
                <div v-if="!userFormData.LugarNacimiento.trim() && isFieldTouched.LugarNacimiento" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- GÉNERO -->
              <div class="col-12 col-md-6 mb-3">
                <label for="gender" class="form-label txt-lg" style="color: #230007;">Género</label>
                <select v-model="userFormData.Genero" @change="touchField('Genero')" id="gender" class="form-control">
                  <option disabled value="">Seleccione una opción</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="No especifica">No especifíca</option>
                </select>
                <div v-if="!userFormData.Genero && isFieldTouched.Genero" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- DIRECCIÓN -->
              <div class="col-12 col-md-6 mb-3">
                <label for="address" class="form-label txt-lg" style="color: #230007;">Dirección de correspondencia </label>
                <input v-model="userFormData.DireccionCorrespondencia" @input="touchField('DireccionCorrespondencia')" type="address" id="address" placeholder="Dirección de correspondencia" class="form-control" />
                <div v-if="!userFormData.DireccionCorrespondencia.trim() && isFieldTouched.DireccionCorrespondencia" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- USUARIO -->
              <div class="col-12 col-md-6 mb-3">
                <label for="user" class="form-label txt-lg" style="color: #230007;">Usuario </label>
                <input v-model="userFormData.Username" @input="touchField('Username')" required type="user" id="user" placeholder="Usuario" class="form-control" />
                <div v-if="!userFormData.Username.trim() && isFieldTouched.Username" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- CONTRASEÑA -->
              <div class="col-12 col-md-6 mb-3">
                <label for="password" class="form-label txt-lg" style="color: #230007;">Contraseña </label>
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" v-model="userFormData.Password" @input="touchField('Password')" required id="password" placeholder="Contraseña" class="form-control" />
                </div>
                <div v-if="!userFormData.Password.trim() && isFieldTouched.Password" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- CONFIRMAR CONTRASEÑA -->
              <div class="col-12 col-md-6 mb-4">
                <label for="confirmPassword" class="form-label txt-lg" style="color: #230007;">Confirmar contraseña</label>
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" v-model="userFormData.ConfirmPassword" @input="touchField('ConfirmPassword')" required id="confirmPassword" placeholder="Confirmar contraseña" class="form-control"/>
                </div>
                <div v-if="!userFormData.ConfirmPassword.trim() && isFieldTouched.ConfirmPassword" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- BOTÓN DE REGISTRO -->
              <div class="col-12 col-md-6 d-flex align-items-center justify-content-center mx-auto">
                <button type="button" @click="validateAndRegister" class="btn btn-success btn-lg txt-lg" :disabled="!isFormValid">Registrar administrador</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Asegúrate de instalar axios con `npm install axios` o `yarn add axios`

export default {
  name: 'RegistroUsuarios',
  data() {
    return {
      userFormData: {
        Password: '',
        ConfirmPassword: '',
        Username: '',
        DNI: '',
        Nombres: '',
        Apellidos: '',
        FechaNacimiento: '',
        LugarNacimiento: '',
        DireccionCorrespondencia: '',
        Genero: '',
        CorreoElectronico: '',
        backendUrl: '',
        Tipo: 'Administrador' // Asumiendo que todos los nuevos registros son de tipo 'Administrador'
      },
      usernameError: false,
      passwordError: false,
      showPassword: false,
      isFieldTouched: {
        Nombres: false,
        Apellidos: false,
        DNI: false,
        CorreoElectronico: false,
        FechaNacimiento: false,
        LugarNacimiento: false,
        Genero: false,
        DireccionCorrespondencia: false,
        Username: false,
        Password: false,
        ConfirmPassword: false
      }
    };
  },
  computed: {
    isEmailValid() {
      const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailPattern.test(this.userFormData.CorreoElectronico);
    },
    isFormValid() {
      const textFieldsFilled = this.userFormData.Nombres.trim() &&
                               this.userFormData.Apellidos.trim() &&
                               this.userFormData.DNI.toString().trim() &&
                               this.userFormData.CorreoElectronico.trim() &&
                               this.isEmailValid &&
                               this.userFormData.FechaNacimiento.trim() &&
                               this.userFormData.LugarNacimiento.trim() &&
                               this.userFormData.Genero.trim() &&
                               this.userFormData.DireccionCorrespondencia.trim() &&
                               this.userFormData.Username.trim() &&
                               this.userFormData.Password.trim() &&
                               this.userFormData.ConfirmPassword.trim();
      return textFieldsFilled;
    }
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
    touchField(field) {
      // Set the flag to true when the field is touched
      this.isFieldTouched[field] = true;
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
    getCurrentDate() {
      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1; // Los meses en JavaScript comienzan desde 0
      const year = today.getFullYear();

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

    async validateAndRegister() {
      // Check if all fields are touched before showing the alerts
      const allFieldsTouched = Object.values(this.isFieldTouched).every(touched => touched);

      if (!allFieldsTouched) {
        alert('Por favor, complete todos los campos antes de registrar.');
        return;
      }

      if (!this.backendUrl) {
        alert('La URL del backend no está disponible. Intente nuevamente.');
        return;
      }

      const headers = {
        'Action': 'SingInAdmin', // Asegúrate de que esta cabecera sea aceptada y manejada en tu backend
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.post(this.backendUrl , this.userFormData, { headers });
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
        console.error(error); // Aquí podrías manejar errores específicos de la petición
        alert("Error al intentar registrar. Por favor, inténtalo de nuevo.");
      }
    }
  }
}
</script>

<style scoped>
.txt-lg {
  font-size: 1.3rem; /* You can adjust the value as needed */
}  
</style>
