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
              <router-link to="/administrator-register" class="btn btn-outline-light" style="border-color: #230007; color: #230007;">Administrador</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="fluid-container">
      <h1 class="text-center p-3" style="color: #230007;">Root</h1>
    </div>

    </div>
  </template>