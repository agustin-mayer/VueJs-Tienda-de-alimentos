<template>
  <div>
    <b-navbar variant="dark" style="justify-content: space-between">
      <div style="display: -inline-box">
        <div>
          <b-button
            style="margin-left: 20px; border-color: darkseagreen"
            squared
            variant="light"
            :disabled="this.$route.name == 'mainView'"
            @click="goToMainView"
            >Inicio</b-button
          >
        </div>
        <div v-if="esFilterView()">
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
        </div>
        <div v-else>
          <b-button
            size="sm"
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
        </div>
      </div>
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
  },
};
</script>