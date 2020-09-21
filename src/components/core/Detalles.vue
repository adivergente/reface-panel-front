<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-toolbar dark color="indigo">
       <v-toolbar-title style="color:white;">Ver detalles de {{user.nombres}} {{user.apellidos}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout row>
        <v-flex xs10 offset-xs1 >
          <h4 v-if="user.username"> Username: {{user.username}} </h4>
          <h4> Email: {{user.email}} </h4>
          <h4> Telefono: {{user.telefono}} </h4>
          <h4> Dirección: {{user.direccion}} </h4>
          <h4> CP: {{user.codigo_postal}} </h4>
          <h4> Estado: {{user.estado}} </h4>
          <h4> Municipio: {{user.municipio}} </h4>
          <h4> Localidad: {{user.localidad}} </h4>
          <h4> País: {{user.pais}} </h4>
          <h4> Referencias: {{user.referencias}} </h4>
          <h4> Rol: {{user.rol}} </h4>
          <h4> Status: {{user.status}} </h4>
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
    data () {
      return {
        cant: 0,
        user: {},
        dialog: false,
      }
    },
    methods: {
      setInfo(user) {
        this.user = {
          nombres: user.datos_personales.nombres || '',
          apellidos: user.datos_personales.apellidos || '',
          username: user.datos_personales.username || '',
          email: user.datos_personales.email || '',
          telefono: user.datos_personales.telefono || '',
          direccion: user.domicilio.direccion || '',
          codigo_postal: user.domicilio.codigo_postal || '',
          estado: user.domicilio.estado || '',
          municipio: user.domicilio.municipio || '',
          localidad: user.domicilio.localidad || '',
          pais: user.domicilio.pais || '',
          referencias: user.domicilio.referencias || '',
          rol: user.rol.join(', ') || '',
          status: user.status || ''
        }
        this.dialog = true
      }
    }
}
</script>
<style>
  .toolbar__content {
    margin-left: 0px!important;
}
</style>
