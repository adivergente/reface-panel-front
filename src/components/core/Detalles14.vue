<template>
  <v-dialog v-if="validarBoton(status)" v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="error" dark> Eliminar </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="indigo">
       <v-toolbar-title style="color:white;" >Eliminar Promocion</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout row>
        <v-flex xs10 offset-xs1 >
          <v-card-text style="text-align:center">
            ¿Estás seguro de que deseas eliminar la promocion {{nombre}} del sistema?
          </v-card-text>
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
          @click="eliminar(id_promo);dialog = false;"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-else v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="green" dark> Activar </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="indigo">
       <v-toolbar-title style="color:white;" >Activar Promocion</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout row>
        <v-flex xs10 offset-xs1 >
          <v-card-text style="text-align:center">
            ¿Estás seguro de que deseas activar la promocion {{nombre}} del sistema?
          </v-card-text>
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
          @click="reactivar(id_promo);dialog = false;"
        >
          Activar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {api} from '@/api'
export default {
    name: 'Frame',
    props: {
      id_promo: String,
      nombre: String,
      status: String
    },
    data () {
      return {
        cant: 0,
        info:null,
        dialog: false,
      }
    },
    methods: {
       eliminar(id_promo){
         api.post('/promociones/delete-promocion/'+id_promo)
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
           if(response.data.success == true){
            this.$router.go()
           }else{
             alert(response.data.message);
           }
           
           //
         })
         .catch(e => {
//           this.errors.push(e)
         //  console.log("Error");
           console.log(e);
         })
       },
       reactivar(id_promo){
         api.post('/promociones/active-promocion/'+id_promo)
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
           //console.log(this.items);
           console.log(response.data.success);
           //alert('Eliminación realizada con éxito');
           //this.$router.go()
         })
         .catch(e => {
//           this.errors.push(e)
         //  console.log("Error");
           console.log(e);
         })
       },
       validarBoton(status){
          if(status=="Activo")
            return true;
          else
            return false;
       }
    }
}
</script>
