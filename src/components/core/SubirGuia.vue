<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-form ref="form" v-on:submit.prevent="Cambiar(id)" lazy-validation>
        <v-toolbar dark color="indigo">
         <v-toolbar-title style="color:white;" >Asignar número de Guía</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <v-text-field v-model="info.numero_guia" label="Número de Guía">
            </v-text-field>
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
            @click="$emit('close')"
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
    props: ['dialog','info'],
    data () {
      return {
        items: ['Procesando', 'Pendiente', 'Pagado', 'Enviado', 'Entregado'],

        cant: 0
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

        console.log("datos de compra: ", info)
        api.post(`/ad-compras/guia`,info)
        .then(response => {
          console.log('atiende: ',response.data[0].atiende)
          // JSON responses are automatically parsed.
          
          
          console.log(this.items2);
        })
        .catch(e => {
          this.errors.push(e)
        //  console.log("Error");
        //  console.log(e);
        })
      }
    }
}
</script>
