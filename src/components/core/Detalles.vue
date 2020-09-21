<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark> Detalles </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="indigo">
       <v-toolbar-title style="color:white;">Ver detalles de {{item.datos_personales.nombres}} {{item.datos_personales.apellidos}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout row>
        <v-flex xs10 offset-xs1 >
          <h4 v-if="item.datos_personales.username"> Username: {{item.datos_personales.username}} </h4>
          <h4> Email: {{item.datos_personales.email}} </h4>
          <h4> Telefono: {{item.datos_personales.telefono}} </h4>
          <h4> Dirección: {{item.domicilio.direccion}} </h4>
          <h4> CP: {{item.domicilio.codigo_postal}} </h4>
          <h4> Estado: {{item.domicilio.estado}} </h4>
          <h4> Municipio: {{item.domicilio.municipio}} </h4>
          <h4> Localidad: {{item.domicilio.localidad}} </h4>
          <h4> País: {{item.domicilio.pais}} </h4>
          <h4> Referencias: {{item.domicilio.referencias}} </h4>
          <h4> Rol: {{item.rol.join(', ')}} </h4>
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
    name: 'UserDetalles',
    props: {
      item: {
        type: Object,
        default: () => {}
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
<style>
  .toolbar__content {
    margin-left: 0px!important;
}
</style>
