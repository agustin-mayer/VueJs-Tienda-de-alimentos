<template>
  <div>
    <b-navbar variant="dark" style="justify-content: space-between">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <b-button
            style="margin-left: 20px; border-color: darkseagreen"
            squared
            variant="light"
            :disabled="this.$route.name == 'mainView'"
            @click="goToMainView"
            >Inicio</b-button
          >
        </li>
        <li class="nav-item" v-if="esFilterView()">
          <b-button
            style="
              margin-left: 20px;
              border-color: darkseagreen;
              vertical-align: -baseline-middle;
            "
            variant="dark"
            pill
            v-b-toggle.sidebar-backdrop
            >Filtros</b-button
          >
        </li>
        <li class="nav-item" v-else>
          <b-button
            style="
              margin-left: 20px;
              border-color: darkseagreen;
              vertical-align: -baseline-middle;
            "
            squared
            variant="dark"
            @click="goToFilterView"
            >Filtrar productos</b-button
          >
        </li>
      <li class="nav-item">
      <b-button
        style="
          margin-left: 20px;
          border-color: darkseagreen;
          vertical-align: -baseline-middle;
        "
        squared
        variant="dark"
        @click="pushNotification"
        >Ofertas</b-button
      ></li>
      </ul> 
      <label
        style="
          font-size: x-large;
          font-variant-caps: petite-caps;
          color: darkseagreen;
          margin-right: 20px;
        "
        >Foodmay</label
      >
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    esFilterView() {
      return this.$route.name == "filterView";
    },
    goToFilterView() {
      this.$router.push("/filters");
    },
    goToMainView() {
      if (this.$route.name != "mainView") this.$router.push("/");
    },
    pushNotification() {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          const notification = new Notification(
            "¡Las bebidas esta semana tienen un 10% OFF!",
            {
              body: "El precio publicado ya tiene el descuento aplicado",
            }
          );
          notification.addEventListener("error", (e) => {
            alert(e);
          });
        }
      });
    },
  },
};
</script>