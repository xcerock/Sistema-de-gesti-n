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
    <div class="container-fluid">
      <h1 class="text-center p-3" style="color: #230007;">Añadir libro</h1>
      <div class="container-fluid p-5">
        <div class="row">
          <div class="col-12 col-md-4 d-flex align-items-center justify-content-center text-center mb-3">
            <img alt="image" :src="require('@/assets/book.png')" class="img-fluid mb-2" />
          </div>
          <div class="col-12 col-md-8">
            <div class="row">

              <!-- TÍTULO -->
              <div class="col-12 col-md-6 mb-3">
                <label for="title" class="form-label txt-lg" style="color: #230007;">Título</label>
                <input v-model="userFormBook.Titulo" type="text" id="title" placeholder="Título" class="form-control" />
                <div v-if="!userFormBook.Titulo.trim() && isFieldTouched.Titulo" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- AUTOR -->
              <div class="col-12 col-md-6 mb-3">
                <label for="author" class="form-label txt-lg" style="color: #230007;"> Autor </label>
                <input v-model="userFormBook.Autor" type="text" id="author" placeholder="Autor" class="form-control" />
                <div v-if="!userFormBook.Autor.trim() && isFieldTouched.Autor" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- GÉNERO -->
              <div class="col-12 col-md-6 mb-3">
                <label for="gender" class="form-label txt-lg" style="color: #230007;">Género</label>
                <select v-model="userFormBook.Genero" id="gender" class="form-control">
                  <option disabled value="">Seleccione una opción</option>
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
                <div v-if="!userFormBook.Genero && isFieldTouched.Genero" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- IDIOMA -->
              <div class="col-12 col-md-6 mb-3">
                <label for="Idioma" class="form-label txt-lg" style="color: #230007;">Idioma</label>
                <input v-model="userFormBook.Idioma" type="text" id="Idioma" placeholder="Idioma" class="form-control" />
                <div v-if="!userFormBook.Idioma.trim() && isFieldTouched.Idioma" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- EDITORIAL -->
              <div class="col-12 col-md-6 mb-3">
                <label for="editorial" class="form-label txt-lg" style="color: #230007;">Editorial</label>
                <input v-model="userFormBook.Editorial" type="text" id="editorial" placeholder="Editorial" class="form-control" />
                <div v-if="!userFormBook.Editorial.trim() && isFieldTouched.Editorial" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- NÚMERO DE PÁGINAS -->
              <div class="col-12 col-md-6 mb-3">
                <label for="numberpages" class="form-label txt-lg" style="color: #230007;">Número de páginas</label>
                <input v-model="userFormBook.Npages" type="text" id="numberpages" placeholder="Número de páginas" class="form-control" />
                <div v-if="!userFormBook.Npages.trim() && isFieldTouched.Npages" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- FECHA DE PUBLICACIÓN -->
              <div class="col-12 col-md-6 mb-3">
                  <label for="publicationdate" class="form-label txt-lg" style="color: #230007;">Fecha de publicación</label>
                  <input v-model="userFormBook.FechaPublicacion" type="date" id="publicationdate" placeholder="DD/MM/YYYY" class="form-control" :min="getminDate()" :max="getmaxDate()" />
                  <div v-if="!userFormBook.FechaPublicacion && isFieldTouched.FechaPublicacion" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- AÑO DE PUBLICACIÓN -->
              <div class="col-12 col-md-6 mb-3">
                <label for="publicationyear" class="form-label txt-lg" style="color: #230007;">Año de publicación</label>
                <input v-model="userFormBook.AñoPublicacion" type="publicationyear" id="publicationyear" placeholder="Año de publicación" class="form-control" />
                <div v-if="!userFormBook.AñoPublicacion.trim() && isFieldTouched.AñoPublicacion" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- ISSN -->
              <div class="col-12 col-md-6 mb-3">
                <label for="issn" class="form-label txt-lg" style="color: #230007;">ISSN</label>
                <input v-model.number="userFormBook.ISSN" @input="filterISSN" type="number" id="issn" placeholder="ISSN" class="form-control" min="0" step="1" />
                <div v-if="!userFormBook.ISSN.toString().trim() && isFieldTouched.ISSN" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- ESTADO -->
              <div class="col-12 col-md-6 mb-3">
                <label for="Estado" class="form-label txt-lg" style="color: #230007;"> Estado </label>
                <input v-model="userFormBook.Estado" type="text" id="Estado" placeholder="Estado" class="form-control" />
                <div v-if="!userFormBook.Estado.trim() && isFieldTouched.Estado" class="text-danger">Este campo es obligatorio.</div>
              </div>

              <!-- PRECIO -->
              <div class="col-12 text-center mb-3">
                <label for="Precio" class="form-label txt-lg" style="color: #230007;">Precio</label>
                <input v-model="userFormBook.Precio" type="text" id="Precio" placeholder="Precio" class="form-control" />
              </div>

            </div>
            <button type="button" @click="registerUser" class="btn btn-lg btn-success txt-lg mt-3" :disabled="!isFormValid">Añadir libro</button>
          </div>
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
      userFormBook: {
        Idioma: '',
        Autor: '',
        ISSN: '',
        Titulo: '',
        Npages: '',
        FechaPublicacion: '',
        Editorial: '',
        Estado: '',
        Genero: '',
        AñoPublicacion: '',
        Precio: [],
        Tipo: 'Cliente'
      },
      isFieldTouched: {
        Titulo: false,
        Autor: false,
        Genero: false,
        Idioma: false,
        Editorial: false,
        Npages: false,
        FechaPublicacion: false,
        AñoPublicacion: false,
        ISSN: false,
        Estado: false
      }
    };
  },
  computed: {
    isFormValid() {
      const textFieldsFilled =
        this.userFormBook.ISSN > 0 &&
        this.userFormBook.Editorial.trim() &&
        this.userFormBook.FechaPublicacion &&
        this.userFormBook.Npages.trim() &&
        this.userFormBook.Titulo.trim() &&
        this.userFormBook.Genero &&
        this.userFormBook.Autor.trim() &&
        this.userFormBook.Idioma.trim() &&
        this.userFormBook.Estado.trim() &&
        this.userFormBook.AñoPublicacion.trim();

      const themesAreSelected = this.userFormBook.Precio.length > 0;

      return textFieldsFilled && themesAreSelected;
    }
  },
  methods: {
    filterISSN(event) {
      // Impide la entrada de caracteres que no sean dígitos
      const value = parseInt(event.target.value, 10);
      if (isNaN(value) || value < 0) {
        // Restablece el valor a un estado válido o lo deja en blanco si no es un número
        this.userFormBook.ISSN = '';
      } else {
        this.userFormBook.ISSN = value;
      }
    },
    getmaxDate() {
      const today = new Date();
      let year = today.getFullYear();
      year = year + 2;
      return `${year}-${12}-${31}`;
    },
    getminDate() {
      const today = new Date();
      let year = today.getFullYear();
      year = year - 100;
      return `${year}-01-01`;
    },
    async registerUser() {
      // Check if all fields are touched before showing the alerts
      const allFieldsTouched = Object.values(this.isFieldTouched).every(touched => touched);

      if (!allFieldsTouched) {
        alert('Por favor, complete todos los campos antes de registrar.');
        return;
      }

      const url = "https://backendlbreria.azurewebsites.net/";
      const headers = {
        'Action': 'SingIn',
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.post(url, this.userFormBook, { headers });
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
.txt-lg {
  font-size: 1.3rem; /* You can adjust the value as needed */
}  
</style>
