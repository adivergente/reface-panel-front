<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark> Status </v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-on:submit.prevent="Cambiar(id)" lazy-validation>
        <v-toolbar dark color="indigo">
         <v-toolbar-title style="color:white;" >Actualizar status de compra</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <v-select
              class = "purple-input"
              label = "Status de la compra"
              name = "status"
              v-model = "status"
              :items = "items"
              id = "estado"
              outlined
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
            Actualizar
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
      id: String,
      status: String,
      email:String,
    },
    data () {
      return {
        items: ['Procesando', 'Pendiente', 'Pagado', 'Enviado', 'Entregado'],

        cant: 0,
        info:null,
        dialog: false,
      }
    },
    methods: {
       Cambiar(id){

        //var estado = document.getElementById("estado").value;
        var id_usuario = sessionStorage.getItem('id')
        //console.log(id);
        //console.log(estado);
        //console.log(status)

        var query = [{ name: "id", value: id },
          { name: "estado", value: this.status },
          {name:"id_usuario",value:id_usuario},        
          {name:"id_cliente",value:this.email}
        ];

        //console.log(query);

        api.post('/ad-compras/compra-status/', query)
        .then(response => {
          //console.log('resultado: ',response)
          // JSON responses are automatically parsed.
//           this.models = response.data;
          //console.log(this.item s);
          if(response.data.success==true){
            this.$router.go()
          }
          //alert('Actualización realizada con éxito');
          //this.$router.go();
        })
        .catch(e => {
//           this.errors.push(e)
        //  console.log("Error");
          console.log(e);
        })
       }
    }
}
</script>
