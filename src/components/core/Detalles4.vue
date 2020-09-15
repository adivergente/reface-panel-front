<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark> Info </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="indigo">
       <v-toolbar-title style="color:white;" >Información de compra {{ item.folio }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout row>
        <v-flex xs10 offset-xs1 >
          <h4> Clave de compra: {{item.folio}} </h4>
          <h4> Cliente: {{item.usuario[0].datos_personales.nombres}} {{item.usuario[0].datos_personales.apellidos}} </h4>
          <h4> Email: {{item.usuario[0].datos_personales.email}} </h4>
          <h4> Telefono: {{item.usuario[0].datos_personales.telefono}} </h4>
          <h4> Dirección: {{item.usuario[0].domicilio.direccion}} </h4>
          <h4> Municipio: {{item.usuario[0].domicilio.municipio}} </h4>
          <h4> Estado: {{item.usuario[0].domicilio.estado}} </h4>
          <h4> Código Postal: {{item.usuario[0].domicilio.codigo_postal}} </h4>
          <h4> Referencias: {{item.usuario[0].domicilio.referencias}} </h4>
          <h4> Número de productos: {{totalProductos}} </h4>
          <h4> Total: $ {{item.total}} m.n.</h4>
          <h4> Status: {{item.status}} </h4>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="dialog = false"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    name: 'Frame',
    props: {
      // clave: String,
      // nombres: String,
      // apellidos: String,
      // email: String,
      // telefono: String,
      // num_interior: String,
      // num_exterior: String,
      // calle: String,
      // colonia: String,
      // municipio: String,
      // estado: String,
      // cp: String,
      // referencias: String,
      // productos: Number,
      // total: Number,
      // status: String
      item: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      totalProductos () {
        let total = 0
        this.item.productos.forEach(prod => {
          total += prod.qty
        })
        return total
      }
    },
    data () {
      return {
        cant: 0,
        info:null,
        dialog: false,
      }
    }
}
</script>
