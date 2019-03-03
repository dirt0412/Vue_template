<template>
<div>
    <h1>{{ msg }}</h1>
  <div class="container">
        <div class="row" style="margin-left:0px;margin-bottom:5px;">
            <!-- <button class="btn btn-info" style="margin-right:5px;float: right;" @click="showEditProductForm(selected)">
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button> -->
               <b-button class="btn btn-info" style="margin-right:5px;float: right;" v-b-modal.modalToEditAddProduct>
                  <font-awesome-icon :icon="['fas', 'edit']" />
               </b-button>
              <button class="btn btn-danger" style="float: right;" @click="removeProduct(selected)">
                 <font-awesome-icon :icon="['fas', 'minus-square']" />
              </button>
               <span v-if="selected[0].id != -1">ID:{{selected[0].id}}</span>
        </div>

      <b-table
            striped hover bordered responsive small footClone    
            selectable
            select-mode="single"
            selectedVariant="success"
            @row-selected="rowSelected" 

            :items="products" >      
      </b-table>
       <div class="mt-3">
         <div class="d-block text-right">
         <p> Total products: {{totalProducts}} </p>
         </div>
          <b-pagination size="sm" align="right" :total-rows="totalProducts" v-model="currentPage" :per-page="perPage"
          prev-text="Prev" next-text="Next" @input="changePage(currentPage)"  />
       </div>

  </div>

  <b-modal id="modalToEditAddProduct"  ref="modalToEditAddProduct" hide-footer title="Product Add / Edit">
    <div class="d-block text-center">
        <span v-if="selected[0].id != -1 ">Are you sure you want edit this product: <span style="font-weight: bold;">{{selected[0].name}}</span></span>
        <span v-if="selected[0].id === -1">Are you sure you want add product</span>
    </div>
    <div class="d-block text-left">
        <span v-if="selected[0].id != -1">ID:{{selected[0].id}}</span> </br>
        <input style="margin-bottom:5px;" type="text" v-model="selected[0].name" placeholder="Name product"> </input> </br>
        <input style="margin-bottom:5px;" type="text" v-model="selected[0].description" placeholder="Description"> </input> </br>
        <!-- <input type="text" v-model="selected[0].price" placeholder="Price"> </input> -->
         <money v-model="selected[0].price"></money> 
    </div>
    <div class="d-block text-right">
        <b-button style="margin-right:5px;" class="btn btn-danger"  @click="addEditProduct(selected)">OK</b-button>
        <b-button class="btn button"  @click="hideModal">Cancel</b-button>
    </div>
  </b-modal>

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
import { Money } from "v-money";

export default {
  name: "List",
  components: { Money },

  props: {
    msg: String
  },

  data() {
    return {
      products: [],
      productsLoaded: false,
      selected: [{ id: -1, name: "", description: "", price: "" }],
      showModal: false,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: " #",
        precision: 2,
        masked: false
      },
      currentPage: 1,
      perPage: 5,
      totalProducts: 0
    };
  },

  mounted() {
    this.getProductsPagination();
  },

  methods: {
    async getProductsTotal() {
      const data = await axios.get("http://localhost:3000/api/product");
      return data.data.length;
    },

    async getProductsPagination() {
      const data = await axios.post("http://localhost:3000/api/products", {
        perPage: this.perPage,
        currentPage: this.currentPage
      });
      this.totalProducts = await this.getProductsTotal();
      this.products = data.data;
      this.productsLoaded = true;
    },

    rowSelected(item) {
      this.selected = item;
    },

    async showEditProductForm(selected) {
      this.showModal = true;
    },

    async addEditProduct(selected) {
      let result = confirm("Want to add / edit product?");
      if (result) {
        if (selected[0].id !== -1) {
          //edit product
          const data = await axios.put(
            "http://localhost:3000/api/product/" + selected[0].id,
            { product: selected[0] }
          );
          this.getProductsPagination();
          this.resetSelectedProduct();
          this.hideModal();
        } else {
          //add product
          if (selected[0].name.length > 0) {
            const data = await axios.post("http://localhost:3000/api/product", {
              product: selected[0]
            });
            this.getProductsPagination();
            this.resetSelectedProduct();
            this.hideModal();
          } else alert("Give the name of the product.");
        }
      }
    },

    async removeProduct(selected) {
      let result = confirm("Want to delete?");
      if (result) {
        if (selected[0].id !== -1) {
          const data = await axios.delete(
            "http://localhost:3000/api/product/" + selected[0].id
          );
          this.getProductsPagination();
          this.resetSelectedProduct();
        } else alert("Please select item to delete.");
      }
    },

    hideModal() {
      this.resetSelectedProduct();
      this.$refs.modalToEditAddProduct.hide();
    },

    resetSelectedProduct() {
      this.selected = [{ id: -1, name: "", description: "", price: "" }];
    },
    changePage() {
      this.getProductsPagination();
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
