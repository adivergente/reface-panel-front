<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-toolbar dark color="indigo">
       <v-toolbar-title style="color:white;" >Eliminar Caja</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-layout row>
        <v-flex xs10 offset-xs1 >
          <v-card-text>
            ¿Estás seguro de que deseas eliminar caja {{info.codigo}}?
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-btn
          color="red darken-1"
          flat="flat"
          @click="close(null)"
        >
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="eliminar(info.clave_interna);"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {api} from '@/api'
export default {
    name: 'Frame',
    props: ['dialog','info'],
    data () {
      return {
        cant: 0
      }
    },
    methods: {
      close(datos){
        this.$emit('close',datos)
      },
       eliminar(clave_interna){
         api.post('/cajas/delete_caja',this.info)
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
           console.log('delete: ',response.data.data);
           this.close(response.data.success)
           //this.$router.go()
         })
         .catch(e => {
//           this.errors.push(e)
         //  console.log("Error");
           console.log(e);
         })
       },

    }
}
</script>
