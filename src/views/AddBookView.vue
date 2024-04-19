<template>
    <div>
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
                <router-link to="/login" class="btn btn-outline-dark">Login</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container py-5">
        <div class="row">
          <div class="col-12 col-md-4 text-center mb-3">
            <img alt="image" :src="require('@/assets/user.png')" class="img-fluid mb-2" />
          </div>
          <div class="col-12 col-md-8">
            <div class="row">
              <div class="col-12 col-md-6 mb-3">
                <label for="issn" class="form-label">ISSN</label>
                <input
                  v-model.number="userFormBook.ISSN"
                  @input="filterISSN"
                  type="number"
                  id="issn"
                  placeholder="ISSN"
                  class="form-control"
                  min="0"
                  step="1" />
                <div v-if="!userFormBook.ISSN.toString().trim()" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="editorial" class="form-label">Editorial</label>
                <input v-model="userFormBook.Editorial" type="text" id="editorial" placeholder="Editorial" class="form-control" />
                <div v-if="!userFormBook.Editorial.trim()" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 col-md-6 mb-3 ">
                  <label for="publicationdate" class="form-label">Fecha de publicación</label>
                  <input v-model="userFormBook.FechaPublicacion" type="date" id="publicationdate" placeholder="DD/MM/YYYY" class="form-control" :min = "getminDate()"  :max="getmaxDate()" />
                  <div v-if="!userFormBook.FechaPublicacion.trim()" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="publicationyear" class="form-label">Año de publicación</label>
                <input v-model="userFormBook.AñoPublicacion" type="publicationyear" id="publicationyear" placeholder="Año de publicación" class="form-control" />
                <div v-if="!userFormBook.AñoPublicacion.trim()" class="text-danger">
                  Este campo es obligatorio
                </div>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="numberpages" class="form-label">Número de paginas</label>
                <input v-model="userFormBook.Npages" type="text" id="numberpages" placeholder="numero de paginas" class="form-control" />
                <div v-if="!userFormBook.Npages.trim()" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="title" class="form-label">Titulo</label>
                <input v-model="userFormBook.Titulo" type="text" id="title" placeholder="Titulo" class="form-control" />
                <div v-if="!userFormBook.Titulo.trim()" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="gender" class="form-label">Género</label>
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
                <div v-if="!userFormBook.Genero" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="author" class="form-label"> Autor </label>
                <input v-model="userFormBook.Autor"   type="text" id="author" placeholder="Autor" class="form-control" />
                <div v-if="!userFormBook.Autor.trim()" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="Idioma" class="form-label">Idioma</label>

                <input v-model="userFormBook.Idioma"  type="text" id="Idioma" placeholder="Idioma" class="form-control" />
          
                <div v-if="!userFormBook.Idioma.trim()" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 col-md-6 mb-3">
                <label for="Estado" class="form-label"> Estado </label>
                <input v-model="userFormBook.Estado" type="text" id="Estado" placeholder="Estado" class="form-control" />
                <div v-if="!userFormBook.Estado.trim()" class="text-danger">Este campo es obligatorio.</div>
              </div>
              <div class="col-12 text-center mb-3">
                <label for="Precio" class="form-label">Precio</label>
                <input v-model="userFormBook.Precio" type="text" id="Precio" placeholder="Precio" class="form-control" />
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
          usernameError: false,
          passwordError: false,
          showPassword: false
        };
      },
      computed: {
        isFormValid() {
          const textFieldsFilled = this.userFormBook.ISSN > 0 &&
                                  this.userFormBook.Editorial.trim() &&
                                  this.userFormBook.FechaPublicacion &&
                                  this.userFormBook.Npages.trim() &&
                                  this.userFormBook.Titulo.trim() &&
                                  this.userFormBook.Genero &&
                                  this.isEmailValid && // Usa la propiedad computada aquí
                                  this.userFormBook.Username.trim() &&
                                  this.userFormBook.Idioma.trim() &&
                                  this.userFormBook.Estado.trim();
  
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
  
        
          year = year + 2
          // Uso correcto de comillas invertidas y ${} para interpolación
          return `${year}-${12}-${31}`;
        },
        getminDate(){
          const today = new Date();
          let year = today.getFullYear();
  
        
          year = year -100;
          // Uso correcto de comillas invertidas y ${} para interpolación
          return `${year}-01-01`;

        },

        async registerUser() {
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
    /* Tus estilos aquí */
    </style>