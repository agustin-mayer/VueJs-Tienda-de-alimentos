<template>
  <div class="container">
    <b-row>
      <b-col
        lg="3"
        sm="6"
        cols="12"
        v-for="producto in productos"
        :key="producto.Codigo"
        class="mt-4 mb-3"
      >
        <Card :producto="producto" />
      </b-col>
    </b-row>
    <b-row>
      <b-button-toolbar
        key-nav
        aria-label="Toolbar with button groups"
        style="justify-content: center"
      >
        <b-button-group style="margin-bottom: 20px">
          <b-button
            style="margin-left: 20px; border-color: darkseagreen"
            squared
            variant="light"
            :disabled="this.page == 1"
            @click="previousPage"
            >&lsaquo;</b-button
          >
          <b-button
            style="margin-left: 20px; border-color: darkseagreen"
            squared
            variant="light"
            :disabled="this.page >= Math.ceil(this.total / this.cant)"
            @click="nextPage"
            >&rsaquo;</b-button
          >
        </b-button-group>
      </b-button-toolbar>
    </b-row>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  name: "mainView",
  components: {
    Card,
  },
  data: function () {
    return {
      productos: null,
      error: null,
      page: 1,
      cant: 4,
      total: null,
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      await fetch(
        `https://promo-iaw-web-service.vercel.app/pagination?page=${this.page}&cant=${this.cant}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.productos = result.items;
            this.total = result.cant;
          },
          (error) => {
            this.error = error;
          }
        );
    },
    nextPage() {
      if (this.page < Math.ceil(this.total / this.cant)) {
        this.page += 1;
        this.fetchProducts();
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page -= 1;
        this.fetchProducts();
      }
    },
    isFirst() {
      return this.page == 1;
    },
  },
};
</script>