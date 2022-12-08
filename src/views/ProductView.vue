<template>
  <div class="container">
    <b-row>
      <b-col class="mt-4 mb-4" v-if="product != null">
        <Product :producto="product" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
export default {
  name: "ProductView",
  props: ["producto"],
  components: {
    Product,
  },
  data: function () {
    return {
      product: null,
      error: null,
      text: "",
    };
  },
  mounted() {
    fetch(
      "https://agustinmayer99-servicio-web.herokuapp.com/producto/" +
        this.$route.params.id
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.product = result[0];
        },
        (error) => {
          this.error = error;
        }
      );
  },
};
</script>