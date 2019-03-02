<template>
<div>
    <h1>{{ msg }}</h1>
     <b-table 
     striped hover bordered responsive small footClone     
      :items="products" />
                  <!-- <table >
              <thead>
              <tr >
                  <td >
                     ID                     
                  </td>
                  <td >
                      Name                     
                  </td>
                  <td >
                      Description                     
                  </td>
                  <td >
                      Price                     
                  </td>                 
              </tr>
              </thead>

              <tbody>

              <tr v-if="!products.length && productsLoaded">                
                  <td v-bind:colspan="4" class="acenter">
                      You don't have any products yet.
                  </td>
              </tr>

              <tr v-else
                  v-for="(element, index) in products"
                  :to="{ name: 'product-id', params: { id: element._id }}"
                  v-bind:key="index"
                  v-on:click="goToElement(element._id, 'product')"
                  class=""
              >
                  <td data-header="ID">{{ element.id }}</td>
                  <td data-header="Name" class="td-border">{{ element.name }}</td>
                  <td data-header="Description" class="aright nowrap">{{ element.description }}</td>
                  <td data-header="Price" class="aright nowrap">{{ element.price }}</td>
              </tr>
              </tbody>
          </table> -->
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "List",

  props: {
    msg: String
  },

  data() {
    return {
      products: [],
      productsLoaded: false
    };
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      const data = await axios.get("http://localhost:3000/api/product");
      this.products = data.data;
      this.productsLoaded = true;
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
