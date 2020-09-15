<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark> Añadir Nuevo </v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-on:submit.prevent="Update()" lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Nuevo Producto</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <h4> Código: </h4>
            <v-text-field
              class="purple-input"
              label="Código"
              name="codigo"
            />
            <v-text-field
              :value="usuario"
              class="purple-input"
              label="usuario"
              name="usuario"
              style="display:none"
            />
            <h4> Clave Interna: </h4>
            <v-text-field
              class="purple-input"
              label="Clave Interna"
              name="clave_interna"
            />
            <h4> Nombre: </h4>
            <v-text-field
              class="purple-input"
              label="Nombre"
              name="nombre"
            />
            <h4> Descripción: </h4>
            <v-text-field
              class="purple-input"
              label="Descripción"
              name="descripcion"
            />
            <h4> Categoría: </h4>
            <v-text-field
              class="purple-input"
              label="Categoría"
              name="categoria"
            />
            <h4> Subcategoría: </h4>
            <v-text-field
              class="purple-input"
              label="Subcategoría"
              name="tipo"
            />
            <h4> Marca: </h4>
            <v-text-field
              class="purple-input"
              label="Marca"
              name="marca"
            />
            <h4> Autos: </h4>
            <v-text-field
              class="purple-input"
              label="Autos"
            />
            <h4> Precio: </h4>
            <v-text-field
              class="purple-input"
              label="Precio"
              name="precio"
              type="number"
            />
            <h4> Stock: </h4>
            <v-text-field
              class="purple-input"
              label="Stock"
              name="stock"
              type="number"
            />
            <h4> Peso: </h4>
            <v-text-field
              class="purple-input"
              label="Peso"
              name="peso"
              type="number"
              min="0"
              suffix="kg"
            />
            <h4> Ancho: </h4>
            <v-text-field
              class="purple-input"
              label="Ancho"
              name="ancho"
              type="number"
              min="0"
              suffix="m"
            />
            <h4> Largo: </h4>
            <v-text-field
              class="purple-input"
              label="Largo"
              name="largo"
              type="number"
              min="0"
              suffix="m"
            />
            <h4> Alto: </h4>
            <v-text-field
              class="purple-input"
              label="Alto"
              name="alto"
              type="number"
              min="0"
              suffix="m"
            />
            <h4> Imágenes Asociadas: </h4>
            <v-text-field
              class="purple-input"
              label="Imagen 1"
              name="img1"
              type="file"
            />
            <v-text-field
              class="purple-input"
              label="Imagen 2"
              name="img2"
              type="file"
            />
            <v-text-field
              class="Imagen 3"
              label="Imagen 3"
              name="img3"
              type="file"
            />
          </v-flex>
        </v-layout>
        <v-card-actions>
          
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            type="submit"
            @click="dialog = false"
          >
            Guardar Cambios
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {api} from '@/api'
import $ from 'jquery'

export default {
    name: 'Frame',
    props: {
      nombre: String,
      codigo: String,
      clave_interna: String,
      descripcion: String,
      categoria: String,
      tipo: String,
      marca: String,
      precio: Number,
      stock: Number,
      status: String,
      autos: String
    },
    data () {
      return {
        cant: 0,
        info:null,
        dialog: false,
        mess: null,
        usuario:null
      }
    },
    methods: {
       Update(){
         api.post('/ad-productos/new-product', $(event.currentTarget).serializeArray())
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
             this.mess  = response.data.message;
           //console.log(this.items);
           ///alert(this.mess);
           this.$router.go()
         })
         .catch(e => {
//           this.errors.push(e)
         //  console.log("Error");
           console.log(e);
         })
       }
    },
    created(){
      this.usuario = localStorage.getItem("id")
    }
}
</script>
