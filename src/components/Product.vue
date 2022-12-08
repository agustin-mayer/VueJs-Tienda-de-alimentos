<template>
  <div class="container">
    <b-card no-body class="overflow-hidden">
      <b-row style="align-items: center">
        <b-col md="6">
          <b-card-body>
            <b-card-img
              style="width: 100%; height: auto"
              :src="getImagen(producto.imagen)"
              alt="Image"
            ></b-card-img>
          </b-card-body>
        </b-col>
        <b-col md="6">
          <div>
            <b-row>
              <div>
                <h1 style="margin-top: 20px">{{ producto.Nombre }}</h1>
                <h6 style="margin-top: 20px">Precio: ${{ producto.Precio }}</h6>
                <h6 style="margin-top: 50px">{{ producto.Descripcion }}</h6>
                <h6 style="margin-top: 50px">
                  Categoria: {{ getCategoria(producto.categoria_id) }}
                </h6>
                <h6>Codigo: {{ producto.Codigo }}</h6>
              </div>
            </b-row>
            <b-row>
              <div style="margin-top: 50px; margin-bottom: 20px">
                <b-button
                  squared
                  variant="outline-secondary"
                  style="border-color: darkseagreen"
                  @click="goToMainView"
                  >Regresar</b-button
                >
              </div>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import default_imagen from "@/assets/logo.png";
export default {
  name: "Product",
  props: ["producto"],
  methods: {
    getImagen(imagen) {
      if (imagen != null) {
        return imagen;
      } else {
        return default_imagen;
      }
    },
    getCategoria(id) {
      if (id == 1) return "Almacén";
      else if (id == 2) return "Frescos";
      else return "Bebidas";
    },
    goToMainView() {
      this.$router.push("/");
    },
  },
};
</script>