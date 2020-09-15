<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small color="#003b94" dark> Añadir Promoción </v-btn>
    </template>
    <v-card>
      <v-form id="form1" ref="form1"  v-on:submit.prevent="Update()" enctype="multipart/form-data" lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Nueva Promocion</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <h4> Identificador: </h4>
            <v-text-field
            outline
              v-model="promocion.id_promo"
              class="purple-input"
              label="Id de promoción"
              name="id_promo"
            />
            <h4> Nombre: </h4>
            <v-text-field
            outline
              v-model="promocion.nombre"
              class="purple-input"
              label="Nombre"
              name="nombre"
            />
            <h4> Descripción: </h4>
            <v-text-field
            outline
              v-model="promocion.descripcion"
              class="purple-input"
              label="Descripción"
              name="descripcion"
            />
            <h4> Descuento: </h4>
            <v-autocomplete
              v-model="descuento"
              :items="des"
              solo
              name="descuento"
              label="Buscar Descuento">
              
            </v-autocomplete>
            <h4> Fecha Fin: </h4>
            <v-flex xs12 sm12 md12 lg12 xl12 > 
              <v-dialog 
                    ref="dialog1"
                    v-model="modal"
                    :return-value.sync="fecha"
                    persistent
                    lazy
                    full-width
                    width="290px">
                      <v-text-field
                        :value = "date"
                        item-value ="date"
                        slot="activator"
                        outline
                        v-model="fecha"
                        label="Fecha Inicio"
                        name="fecha_in"
                        prepend-icon="mdi-calendar"
                        readonly>
                      </v-text-field>
                      <v-date-picker :value = "date" v-model="fecha" scrollable locale="es-MX">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false"> Cancel </v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog1.save(fecha)"> OK </v-btn>
                      </v-date-picker>
              </v-dialog>
            </v-flex>
            <h4> Fecha Fin: </h4>
            <v-flex xs12 sm12 md12 lg12 xl12 > 
              <v-dialog 
                ref="dialog2"
                v-model="modal2"
                :return-value.sync="fecha2"
                persistent
                lazy
                full-width
                width="290px">
                  <v-text-field
                    :value = "date2"
                    item-value ="date"
                    slot="activator"
                    outline
                    v-model="fecha2"
                    label="Fecha Final"
                    name="fecha_fin"
                    prepend-icon="mdi-calendar"
                    readonly>
                  </v-text-field>
                  <v-date-picker :value = "date2" v-model="fecha2" scrollable locale="es-MX">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal2 = false"> Cancel </v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog2.save(fecha2)"> OK </v-btn>
                  </v-date-picker>
              </v-dialog>
            </v-flex>
            <!--<v-text-field
              class="purple-input"
              label="Descuento"
              name="descuento"
              type="number"
              min="0"
              max="100"
            />-->
            <h4> Imágen Asociada: </h4>
            <input
              label="Imagen: "
              name="img1"
              ref="image"
              id="img1"
              accept="image/*"
              type="file"
              @change="onFilePicked"
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
    data () {
      return {
        modal:null,
        modal2:null,
        fecha:null,
        fecha2:null,
        dialog1:null,
        dialog2:null,
        date:null,
        date2:null,
        cant: 0,
        info:null,
        dialog: false,
        mess: null,
        des:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
          31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
          61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
          91,92,93,94,95,96,97,98,99,100],
        descuento:null,
        promocion:{
          id_promo:null,
          nombre:null,
          descripcion:null,
          descuento:null,

        },
        file:null,
        imageName: "",
        imageUrl: "",
        imageFile: "",
        modal:null,
        modal2:null,
        fecha:null,
        fecha2:null,
        dialog1:null,
        dialog2:null,
        date:null,
        date2:null
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
            var form = $('#form1')[0];
            const data = new FormData(form);
            //formData.append("myfile", this.file);
            //console.log('info',form)
            //var datos = {id_compra, user}
            /*data.append("id_promo",  this.promocion.id_promo);
            data.append("descripcion",  this.promocion.descripcion);
            data.append("desceunto",  this.promocion.descuento);
            data.append("nombre",  this.promocion.nombre);*/
            //formData.append("id_compra", id_compra );
            api.post('/promociones/new-promocion', data, {
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


            /*console.log('entro')
            var form = $('#form')[0];
            var data = new FormData(form);

            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "http://localhost:3001/promociones/new-promocion",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    console.log("SUCCESS : ", data);
                  alert(this.mess);
                  this.$router.go()
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            });*/
       }
    }
}
</script>
