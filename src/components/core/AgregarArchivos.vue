<template>
  <v-dialog v-model="dialog" max-width="500">
    
    <v-card>
      <v-form ref="formuploadajax" id="formuploadajax" enctype="multipart/form-data"   lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Subir Productos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <input type="file"  name="uploadedfile"  id="uploadedfile" @change="onFileSelected" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            <!--<input type="file"  name="uploadedfile"  id="uploadedfile" @change="onFileSelected" accept="image/*"/>-->
            <!--<v-text-field
              class="purple-input"
              label="Subir Archivo"
              name="archivo"
              type="file"
            />-->
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
            type="button"
            v-on:click.prevent="Subir()"
          >
            Subir
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
        cant: 0,
        mess: null,
        
      }
    },
    methods: {
      mostrar(dato){
        alert(dato)
      },
      close(datos){
        //this.varautos = false
        //this.autos = []
        console.log('cerrar')
        this.$emit('close',datos)
      },
      onFileSelected(event) {
        this.file = event.target.files[0];
        console.log(this.file)
      },
      Subir(){
        var blobFile = $('#formuploadajax')[0];
        const formData = new FormData(blobFile);
        //formData.append("myfile", this.file);
        //console.log('info',formData)
        //var datos = {id_compra, user}
        formData.append("usuario",  localStorage.getItem("id"));
        //formData.append("id_compra", id_compra );
        api.post('/ad-productos/newFile', formData, {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
        })
			  .then(response => {
          console.log('respuesta: ',response.data)
          if(response.data.success == true){
            console.log('correcto: ',response.data.message)
            //this.close('true')
            this.close(response.data.success) 
            //this.mostrar(true)
          }else{
            console.log('fallo: ',response.data.message)
            //this.mostrar(false)
            this.close(response.data.success)
            //this.cerrar()
            
          }
        })
        .catch(error => {
          alert(error)
          /** Error de conexión */
          //this.info= error
          console.log('error: ',error)
        })
       
      }
    }
}
</script>
