<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div class="container">
    <div>
      <b-sidebar
        id="sidebar-backdrop"
        title="Sidebar with backdrop"
        backdrop-variant="secondary"
        backdrop
        no-header
        shadow
      >
        <div>
          <h3>
            <b-icon
              v-b-toggle.sidebar-backdrop
              icon="x"
              scale="1"
              style="overflow-anchor: none; float: right; margin-end: 10px"
            >
            </b-icon>
          </h3>
        </div>
        <div style="display: inline-table">
          <div class="form-group" style="display: inline-table">
            <label
              style="margin-top: 20px; margin-bottom: 10px"
              for="categorias"
              >Filtrar por nombre</label
            >
            <input
              class="form-control"
              type="text"
              v-model="nameFilterField"
              placeholder="Buscar por nombre"
            />
          </div>
          <div class="form-group" style="display: inline-table">
            <label style="margin-top: 20px; margin-bottom: 10px"
              >Filtrar por categoría</label
            >
            <select
              v-model="categoryFilterSelect"
              class="form-control"
              id="categoria"
              style="inline-size: auto"
            >
              <option :value="''">Todas las categorías</option>
              <option
                v-for="variante in categorias"
                :key="variante.id"
                :value="variante.id"
              >
                {{ variante.Nombre }}
              </option>
            </select>
          </div>
          <div class="form-group" style="display: inline-table">
            <label style="margin-top: 20px; margin-bottom: 10px"
              >Filtrar por código</label
            >
            <input
              type="text"
              v-model="codeFilterField"
              placeholder="Buscar por código"
              class="form-control"
              style="inline-size: auto"
            />
          </div>
          <div class="form-group" style="display: inline-table">
            <label style="margin-top: 20px; margin-bottom: 10px"
              >Filtrar por descripción</label
            >
            <input
              type="text"
              v-model="descripFilterField"
              placeholder="Buscar por descripción"
              class="form-control"
            />
          </div>
          <div class="form-group" style="display: inline-table">
            <label style="margin-top: 20px">Filtrar por precio</label>
            <b-row style="inline-size: auto">
              <b-col>
                <label>Mínimo</label>
                <b-form-input
                  id="number1"
                  :min="minFilterField"
                  :max="maxFilterField"
                  v-model="minFilterField"
                  type="number"
                ></b-form-input>
              </b-col>
              <b-col
                ><label>Máximo</label>
                <b-form-input
                  id="number2"
                  :min="minFilterField"
                  :max="maxFilterField"
                  v-model="maxFilterField"
                  type="number"
                ></b-form-input>
              </b-col>
            </b-row>
          </div>
          <div
            style="display: inline-table; margin-top: 40px; margin-bottom: 10px"
          >
            <b-button
              squared
              variant="outline-secondary"
              style="border-color: darkseagreen"
              @click="resetFilters"
              >Borrar filtros</b-button
            >
          </div>
        </div>
      </b-sidebar>
    </div>
    <b-row>
      <b-col
        lg="3"
        sm="6"
        cols="12"
        v-if="filter(producto)"
        v-for="producto in productos"
        :key="producto.Codigo"
        class="mt-4 mb-3"
      >
        <Card :producto="producto" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  name: "filterView",
  components: {
    Card,
  },
  data: function () {
    return {
      productos: null,
      categorias: null,
      error: null,
      nameFilterField: "",
      descripFilterField: "",
      codeFilterField: "",
      categoryFilterSelect: "",
      minFilterField: "0",
      maxFilterField: "1000000",
    };
  },
  async mounted() {
    await fetch("https://promo-iaw-web-service.vercel.app/productos")
      .then((res) => res.json())
      .then(
        (result) => {
          this.productos = result;
        },
        (error) => {
          this.error = error;
        }
      );
    await fetch("https://promo-iaw-web-service.vercel.app/categorias")
      .then((res) => res.json())
      .then(
        (result) => {
          this.categorias = result;
        },
        (error) => {
          this.error = error;
        }
      );
  },
  methods: {
    filter(producto) {
      var nameFilter =
        producto.Nombre.toLocaleLowerCase().indexOf(
          this.nameFilterField.toLocaleLowerCase()
        ) >= 0;
      var descripFilter =
        producto.Descripcion.toLocaleLowerCase().indexOf(
          this.descripFilterField.toLocaleLowerCase()
        ) >= 0;
      var codeFilter =
        producto.Codigo.toString().indexOf(this.codeFilterField.toString()) >=
        0;
      var categoryFilter =
        producto.categoria_id
          .toString()
          .indexOf(this.categoryFilterSelect.toString()) >= 0;
      var minFilter = producto.Precio >= this.minFilterField;
      var maxFilter = producto.Precio <= this.maxFilterField;
      return (
        nameFilter &&
        descripFilter &&
        codeFilter &&
        categoryFilter &&
        minFilter &&
        maxFilter
      );
    },
    resetFilters() {
      (this.nameFilterField = ""),
        (this.descripFilterField = ""),
        (this.codeFilterField = ""),
        (this.categoryFilterSelect = ""),
        (this.minFilterField = "0"),
        (this.maxFilterField = "1000000");
    },
  },
};
</script>