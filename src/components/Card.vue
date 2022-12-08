<template>
  <b-card>
    <b-card-body>
      <b-card-img
        :src="getImagen(producto.imagen)"
        alt="Image"
        width="100%"
        height="100%"
        bottom
      ></b-card-img>
    </b-card-body>
    <b-card-body>
      <b-card-title style="max-width: 20rem; max-height: 5rem">{{
        producto.Nombre
      }}</b-card-title>
      <b-card-sub-title class="mb-2">${{ producto.Precio }}</b-card-sub-title>
      <router-link
        :to="{ name: 'ProductView', params: { id: producto.Codigo } }"
      >
        <b-button
          squared
          variant="outline-dark"
          style="border-color: darkseagreen"
          >Ver más</b-button
        >
      </router-link>
    </b-card-body>
  </b-card>
</template>

<script>
import default_imagen from "@/assets/logo.png";
export default {
  name: "Card",
  props: ["producto"],
  methods: {
    getImagen(imagen) {
      if (imagen != null) {
        return imagen;
      } else {
        return default_imagen;
      }
    },
  },
};
</script>