<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-form ref="form" id="form" v-on:submit.prevent="Update()"  lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Editar {{ info.nombre }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <v-text-field
              v-model="info.codigo"
              class="purple-input"
              label="Código"
              name="codigo"
              type="text"
            />
            <v-text-field
              v-model="info.ancho" 
              class="purple-input"
              label="Ancho"
              name="ancho"
              min="0"
              type="number"
              suffix="m"
            />   
            <v-text-field
              v-model="info.largo"
              class="purple-input"
              label="Largo"
              name="largo"
              min="0"
              type="number"
              suffix="m"
            />    
            <v-text-field
              v-model="info.alto"
              class="purple-input"
              label="Alto"
              name="alto"
              min="0"
              type="number"
              suffix="m"
            />
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
        cant: 0,
        num:1,
        items: ['Si','No'],
        items_promos: ["0"],
        rules0: [
          value => !!value || 'Required.',
        ],
        rules1: [
          value => !!value || 'Required.',
         
          value => {
            const pattern = /^([0-9]+[\s]*)+$/;
            return pattern.test(value) || 'Clave Interna invalida.'
          },
        ],
        rules2: [
          value => !!value || 'Required.',
      
          value => {
            const pattern = /^([A-ZÁÉÍÓÚ0-9]+[\s]*)+$/;
            return pattern.test(value) || 'Dato invalido.'
          },
        ],
        user:null,
        edit:false,
        autos:[{
          "armadora":"",
          "carro":"",
          "modelo":"",
          "cilindraje":"",
          "motor":""
        }],
        termina:null,
        inicia:null,
        varautos:false,
        imageName: "",
        imageUrl: "",
        imageFile: "",
        imageName2: "",
        imageUrl2: "",
        imageFile2: "",
        imageName3: "",
        imageUrl3: "",
        imageFile3: "",
        file:null,
        file2:null,
        file3:null
        //estructuraJson:{}
      }
    },
    methods: {
      close(datos){
        this.varautos = false
        //this.autos = []
        console.log('cerrar')
        this.$emit('close',datos)
      },
       Update(){
          api.post('/cajas/edit_cajas', this.info)
          .then(response => {
            console.log('respuesta: ',response.data)
            if(response.data.success == true){
              console.log('correcto: ',response.data.message)
              this.close(response.data.data)
              //this.close(response.data.success) 
              //this.mostrar(true)
            }else{
              console.log('fallo: ',response.data.message)
              //this.mostrar(false)
              //this.close(response.data.success)
              //this.cerrar()
              
            }
          })
          .catch(error => {
            alert(error)
            //this.info= error
            console.log('error: ',error)
          })
       }
    }
}
</script>
<style type="text/css">
div.image-square {
  left: 5%;
  width: 120px;
  height: 120px;
  border: 3px solid  #DADCE0;
  position: relative;
}
div.message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-weight: bold;
  color: #DADCE0;
  user-select: none;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1px;
}
label {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  opacity: 1;
}
a:link {
  text-decoration: none;
}
a:hover {
  background-color: "#2962FF";
}
a:active {
  background-color: "#FFFF";
}
.product-action {
  position: absolute;
  left: 0px;
  right: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  top: 50%;
  -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
          transform: translateY(-50%);
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.product-action a {
  font-size: 22px;
  color: #333;
  background-color: #fff;
  display: inline-block;
  width: 42px;
  height: 42px;
  text-align: center;
  margin: 0px 1px 0px 1px;
  opacity: 0;
  visibility: hidden;
  -webkit-transform: translateY(20px);
      -ms-transform: translateY(20px);
          transform: translateY(20px);
}
.product-action a i {
  line-height: 41px;
}
.product-action a:nth-child(1) {
  -webkit-transition-delay: 0.2s;
       -o-transition-delay: 0.2s;
          transition-delay: 0.2s;
}
.product-action a:nth-child(2) {
  -webkit-transition-delay: 0.1s;
       -o-transition-delay: 0.1s;
          transition-delay: 0.1s;
}
.product-action a:hover {
  background-color: #152d5b;
  color: #ffffff;
}
.product-action a:nth-child(1) {
  -webkit-transition-delay: 0s;
       -o-transition-delay: 0s;
          transition-delay: 0s;
}
.product-action a:nth-child(2) {
  -webkit-transition-delay: 0.2s;
       -o-transition-delay: 0.2s;
          transition-delay: 0.2s;
}
.product-action a:nth-child(3) {
  -webkit-transition-delay: 0.3s;
       -o-transition-delay: 0.3s;
          transition-delay: 0.3s;
}
</style>