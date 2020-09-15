<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-form ref="form" v-on:submit.prevent="Update()" lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Editar Sinonimons</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            
           
            <v-text-field
              v-model="info.palabra" 
              class="purple-input"
              label="Palabra"
              name="palabra"
            />   
            <v-text-field
              v-model="info.sinonimos"
              class="purple-input"
              label="Sinonimos"
              name="sinonimos"
            />    
            
          </v-flex>
        </v-layout>
        <v-card-actions>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="close"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            type="submit"
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
    props: ['dialog','info'],
    data () {
      return {
      }
    },
    methods: {
      close(datos){
        //this.autos = []
        console.log('cerrar')
        this.$emit('close',datos)
      },
       Update(){
         console.log(info)
         api.post('/sinonimos/edit', this.info)
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
           //console.log(this.items);
           //alert(this.mess);
           //this.$router.go()
           this.close(response.data.success)           
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
