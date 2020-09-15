<template>
  <v-dialog v-model="dialog" max-width="1200">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark> Añadir Noticia </v-btn>
    </template>
    <v-card>
      <v-form  id="form2" ref="form2"  v-on:submit.prevent="Update()" enctype="multipart/form-data" lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Nueva Noticia</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <h4> Título: </h4>
            <v-text-field
              class="purple-input"
              label="Título"
              name="titulo"
              id="titulo"
              :rules="rules"
            />
            <h4> Categoría: </h4>
            <v-text-field
              class="purple-input"
              label="Categoría"
              name="categoria"
              id="categoria"
              :rules="rules"
            />
            <h4> Contenido: </h4>
            <v-textarea
              outline
              class="purple-input"
              label="Contenido"
              name="contenido"
              id="contenido"
              spellcheck="true"
              rows="15"
              :rules="rules"
            />
            <h4> Imágen Asociada: </h4>
            <input
              label="Imagen: "
              name="img1"
              id="img1"
              accept="image/*"
              type="file"
              :rules="rules"
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
      ruta: String,
      titulo: String,
      categoria: String,
      contenido: String,
      descripcion: String,
      status: String
    },
    data () {
      return {
        cant: 0,
        info:null,
        dialog: false,
        mess: null,
        rules: [
          value => !!value || 'Required.'
        ]
      }
    },
    methods: {
        onFilePicked(e) {
          const files = e.target.files;
          this.file = event.target.files[0];
          if (files[0] !== undefined) {
            this.imageName = files[0].name;
            if (this.imageName.lastIndexOf(".") <= 0) {
              return;
            }
            const fr = new FileReader();
            fr.readAsDataURL(files[0]);
            fr.addEventListener("load", () => {
              this.imageUrl = fr.result;
              this.imageFile = files[0]; // this is an image file that can be sent to server...
            });
          } else {
            this.imageName = "";
            this.imageFile = "";
            this.imageUrl = "";
          }
        },
        pickFile1() {
          this.$refs.image.click();
        },
       Update(){

            var form = $('#form2')[0];
            const data = new FormData(form);            

            api.post('/noticias/new-noticia', data, {
              headers: {
              'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
              console.log('respuesta: ',response.data)
              if(response.data.success == true){
                console.log('correcto: ',response.data.message)
                //this.close('true')
                //this.close(response.data.success) 
                //this.mostrar(true)
                this.$router.go()
              }else{
                console.log('fallo: ',response.data.message)
                //this.mostrar(false)
                //this.close(response.data.success)
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
