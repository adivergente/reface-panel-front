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
          <h4> Clave Interna: </h4>
          <v-text-field
            class="purple-input"
            label="Clave"
            name="clave_interna"
            :value="info.clave_interna"
            :rules="rules1"
            readonly
          />
            <h4> Código: </h4>
            <v-text-field
              class="purple-input"
              label="Código"
              name="codigo"
              :value="info.codigo"
              :rules="rules0"
              :readonly="edit"
            />
            <h4> Nombre: </h4>
            <v-text-field
              class="purple-input"
              label="Nombre"
              name="nombre"
              :value="info.nombre"
              :rules="rules2"
            />
            <h4> Descripción: </h4>
            <v-text-field
              class="purple-input"
              label="Descripción"
              name="descripcion"
              :value="info.descripcion"
              :rules="rules2"
            />
            <h4> Categoría: </h4>
            <v-text-field
              class="purple-input"
              label="Categoría"
              name="categoria"
              :value="info.categoria"
              :rules="rules2"
            />
            <h4> Subcategoría: </h4>
            <v-text-field
              class="purple-input"
              label="Subcategoría"
              name="tipo"
              :value="info.tipo"
              :rules="rules2"
            />
            <h4> Marca: </h4>
            <v-text-field
              class="purple-input"
              label="Marca"
              name="marca"
              :value="info.marca"
              :rules="rules2"
            />
           
            <h4> Autos: </h4>
            <v-text-field
              class="purple-input"
              label="Autos"
              name="autos"
              readonly
              @click:append="entro(info.autos)"
              :value="info.autos"
              append-icon="mdi-plus"
            />
            <h4> Precio: </h4>
            <v-text-field
              class="purple-input"
              label="Precio"
              name="precio"
              :value="info.precio"
              type="number"
              step="0.01"
              min="0"
              :rules="rules0"
            />
            <h4> Stock: </h4>
            <v-text-field
              class="purple-input"
              label="Stock"
              name="stock"
              :value="info.stock"
              type="number"
              min="0"
              :rules="rules0"
            />

            <h4> Promoción: </h4>
            <v-select
              :items="items_promos"
              label="Promocion"
              v-model="info.id_promo"
              name="id_promo"
              outlined
              :rules="rules0"
            ></v-select>
            
<!--
            <v-text-field
              class="purple-input"
              label="Id_promo"
              name="id_promo"
              :value="id_promo"
            />
-->
            <h4> Servicio Pesado: </h4>
            <v-select
              v-model="info.pesado"
              :items="items"
              label="Pesado"
              
              name="pesado"
              outlined
              :rules="rules0"
            ></v-select>
<!--
            <v-text-field
              class="purple-input"
              label="Pesado"
              name="pesado"
              :value="pesado"
            />
-->
            <h4> Outlet: </h4>
            <v-select
              :items="items"
              label="Outlet"
              v-model="info.outlet"
              name="outlet"
              outlined
              :rules="rules0"
            ></v-select>
            <h4> Peso: </h4>
            <v-text-field
              class="purple-input"
              label="Peso"
              name="peso"
              :value="info.peso"
              type="number"
              min="0"
              suffix="kg"
            />
            <h4> Ancho: </h4>
            <v-text-field
              class="purple-input"
              label="Ancho"
              name="ancho"
              :value="info.ancho"
              type="number"
              min="0"
              suffix="m"
            />
            <h4> Largo: </h4>
            <v-text-field
              class="purple-input"
              label="Largo"
              name="largo"
              :value="info.largo"
              type="number"
              min="0"
              suffix="m"
            />
            <h4> Alto: </h4>
            <v-text-field
              class="purple-input"
              label="Alto"
              name="alto"
              :value="info.alto"
              type="number"
              min="0"
              suffix="m"
            />
             <!--<v-btn color="primary">
              Autos
            </v-btn>-->
            <v-card v-if="varautos">
              <v-toolbar color="#003b94">
                <v-toolbar-title style="color:white;">Autos</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              
              <v-card-text v-for="(item,i) in num" :key="i"> 
                  <v-container>
                    <v-layout  wrap row>
                    <v-flex xs12>
                      <v-text-field label="Armadora" v-model="autos[i].armadora">
                        
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Carro" v-model="autos[i].carro">
                        
                      </v-text-field>
                    </v-flex>
                    <v-layout  wrap row>
                      <v-flex xs4>
                        <v-text-field label="Año Inicia" v-model="inicia">
                          
                        </v-text-field>
                      </v-flex>
                       <v-divider></v-divider>
                      <v-flex xs4>
                        <v-text-field label="Año Fin" v-model="termina">
                          
                        </v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-btn flat fab color="success" @click="años(i)" large ><v-icon>mdi-plus-circle</v-icon></v-btn>
                      </v-flex>
                    </v-layout>
                    <v-flex xs12>
                      <v-text-field label="Modelo" v-model="autos[i].modelo" style="display:none">
                        
                      </v-text-field>
                   </v-flex>
                     <v-flex xs12>
                      <v-text-field label="Cilindraje" v-model="autos[i].clilindraje">
                        
                      </v-text-field>
                    </v-flex>
                     <v-flex xs12>
                      <v-text-field label="Motor" v-model="autos[i].motor">
                        
                      </v-text-field>
                    </v-flex>
                    </v-layout>
                    
                  </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat fab color="success" @click="agregar()" large ><v-icon>mdi-plus-circle</v-icon></v-btn>
              </v-card-actions>

            </v-card>
            <h4> Imágenes Asociadas: </h4>
            <v-layout  wrap row>
                <v-flex xs4>
                  <div class="image-square">
                      <div class="message"> Ningún archivo</div>
                      <label :style="'background-image: url(' + imageUrl + ')'" @click='pickFile1'>
                      
                      </label>
                      
                  </div>
                </v-flex>
                <v-flex xs4>
                  <div class="image-square">
                      <div class="message"> Ningún archivo</div>
                      <label :style="'background-image: url(' + imageUrl2 + ')'" @click='pickFile2'>
                      </label>
                  </div>
                </v-flex>
                <v-flex xs4>
                  <div class="image-square">
                      <div class="message"> Ningún archivo</div>
                      <label :style="'background-image: url(' + imageUrl3 + ')'" @click='pickFile3'>
                      </label>
                  </div>
                </v-flex>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <v-text-field label="Selecciona una imagen" style="display: none"  @click='pickFile1' v-model='imageName' prepend-icon='attach_file'>
                  </v-text-field>
                  <input type="file" style="display: none" ref="image" name="image1" accept="image/*" @change="onFilePicked">
                </v-flex>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <v-text-field label="Selecciona una imagen" style="display: none"  @click='pickFile2' v-model='imageName2' prepend-icon='attach_file'>
                  </v-text-field>
                  <input type="file" style="display: none" ref="image2" name="image2" accept="image/*" @change="onFilePicked2">
                </v-flex>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <v-text-field label="Selecciona una imagen" style="display: none"  @click='pickFile3' v-model='imageName3' prepend-icon='attach_file'>
                  </v-text-field>
                  <input type="file" style="display: none" ref="image3" name="image3" accept="image/*" @change="onFilePicked3">
                </v-flex>
            </v-layout>
<!--
            <v-text-field
              class="purple-input"
              label="Outlet"
              name="outlet"
              :value="outlet"
            />

            <h4> Status: </h4>
            <v-text-field
              class="purple-input"
              label="Status"
              name="status"
              :value="status"
            />
-->
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
          value => !!value || 'Required.'
        ],
        rules2: [
          value => !!value || 'Required.'
         
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
    watch: {
      dialog(nuevoValor, valorAnterior){
        console.log('info: ', this.info)
        this.imageUrl = `http://10.5.0.7:62/replace-sys/imagenes_productos/` + this.info.clave_interna + `/` + this.info.clave_interna + `-001.jpg`
        this.imageUrl2 = `http://10.5.0.7:62/replace-sys/imagenes_productos/` + this.info.clave_interna + `/` + this.info.clave_interna + `-002.jpg`
        this.imageUrl3 = `http://10.5.0.7:62/replace-sys/imagenes_productos/` + this.info.clave_interna + `/` + this.info.clave_interna + `-003.jpg`
        //console.log("El nombre pasó de ser %s a %s", valorAnterior, nuevoValor);
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
      onFilePicked2(e) {
        const files = e.target.files;
        this.file2 = event.target.files[0];
        if (files[0] !== undefined) {
          this.imageName2 = files[0].name;
          if (this.imageName2.lastIndexOf(".") <= 0) {
            return;
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener("load", () => {
            this.imageUrl2 = fr.result;
            this.imageFile2 = files[0]; // this is an image file that can be sent to server...
          });
        } else {
          this.imageName2 = "";
          this.imageFile2 = "";
          this.imageUrl2 = "";
        }
      },
      onFilePicked3(e) {
        const files = e.target.files;
        this.file3 = event.target.files[0];
        if (files[0] !== undefined) {
          this.imageName3 = files[0].name;
          if (this.imageName3.lastIndexOf(".") <= 0) {
            return;
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener("load", () => {
            this.imageUrl3 = fr.result;
            this.imageFile3 = files[0]; // this is an image file that can be sent to server...
          });
        } else {
          this.imageName3 = "";
          this.imageFile3 = "";
          this.imageUrl3 = "";
        }
      },
      pickFile1() {
        this.$refs.image.click();
      },
      pickFile2() {
        this.$refs.image2.click();
      },
      pickFile3() {
        this.$refs.image3.click();
      },
      insertarArmadoraCocheAnioMotor( armadora, coche, anio, motor, estructura )
      {
        var exists_armadora = 0;
        var exists_coche = 0;
        var exists_anio = 0;
        var exists_motor = 0;

        for(var a in estructura)
        {
            var armadora_actual = estructura[a].armadora;
            if( armadora_actual.nombre == armadora )
            {
            exists_armadora = 1;
            for(var b in armadora_actual.autos)
            {
                var auto_actual = armadora_actual.autos[b];
                if( auto_actual.nombre == coche )
                {

                exists_coche = 1;

                //Verifica si existe el anio del coche
                for(var c in auto_actual.anios)
                {
                    if( auto_actual.anios[c] == anio )
                    {
                    exists_anio = 1;
                    break;
                    }
                }

                if( exists_anio == 0 )
                {
                    estructura[a].armadora.autos[b].anios.push( anio );
                }
                exists_anio = 0;

                //Verifica si existe el motor del coche
                for(var d in auto_actual.motor)
                {
                    if( auto_actual.motor[d] == motor )
                    {
                    exists_motor = 1;
                    break;
                    }
                }

                if( exists_motor == 0 )
                {
                    estructura[a].armadora.autos[b].motor.push( motor );
                }
                exists_motor = 0;

                }
            }
            if ( exists_coche == 0 )
            {
                var pushed = {
        //            "autos" : {
                    "nombre" : coche,
                    "anios" : [anio],
                    "motor" : [motor]
        //            }
                }
                estructura[a].armadora.autos.push( pushed );
            }
            exists_coche = 0;
            }
        }

        if( exists_armadora == 0 )
        {
            var pushed = {
            "armadora" : {
                "nombre" : armadora,
                "autos" : [
                {
                    "nombre" : coche,
                    "anios" : [anio],
                    "motor" : [motor]
                }
                ]
            }
            }
            estructura.push( pushed );
        }
      },
      insertarArmadoraCocheAnioCilindrajeMotor( armadora, coche, anio, cilindraje, estructura )
      {
        ///acomodar el cilindraje correctamente!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var exists_armadora = 0;
        var exists_coche = 0;
        var exists_anio = 0;
        var exists_motor = 0;
        var exists_cilindraje = 0;
        var separa = cilindraje.split("%")
        console.log('estructura: ',estructura)
        console.log('separado: ',separa)
        var cilindro = separa[0]
        var mot = separa[1]
        for(var a in estructura)
        {
            var armadora_actual = estructura[a].armadora;
            if( armadora_actual.nombre == armadora )
            {
            exists_armadora = 1;
            for(var b in armadora_actual.autos)
            {
                var auto_actual = armadora_actual.autos[b];
                if( auto_actual.nombre == coche )
                {

                  exists_coche = 1;

                  //Verifica si existe el anio del coche
                  for(var c in auto_actual.anios)
                  {
                      if( auto_actual.anios[c] == anio )
                      {
                      exists_anio = 1;
                      break;
                      }
                  }

                  if( exists_anio == 0 )
                  {
                    console.log('año')
                      estructura[a].armadora.autos[b].anios.push( anio );
                  }
                  exists_anio = 0;

                  //Verifica si existe el motor del coche
                  for(var d in auto_actual.motor)
                  {
                      if( auto_actual.motor[d] == mot )
                      {
                      exists_motor = 1;
                      break;
                      }
                  }

                  if( exists_motor == 0 )
                  {
                    console.log('motor')
                      estructura[a].armadora.autos[b].motor.push( mot );
                  }
                  exists_motor = 0;

                  for(var d in auto_actual.cilindraje)
                  {
                      if( auto_actual.cilindraje[d] == cilindro )
                      {
                      exists_cilindraje = 1;
                      break;
                      }
                  }

                  if( exists_cilindraje == 0 )
                  {
                    console.log('cilindro')
                    console.log(estructura[a])
                    console.log(cilindro)
                      estructura[a].armadora.autos[b].cilindraje = []
                      estructura[a].armadora.autos[b].cilindraje.push(cilindro )
                  }
                  console.log('est: ',estructura)
                  exists_cilindraje = 0;

                }
            }
            if ( exists_coche == 0 )
            {
              console.log('coche')
                var pushed = {
        //            "autos" : {
                    "nombre" : coche,
                    "anios" : [anio],
                    "cilindro":[cilindro],
                    "motor" : [motor]
        //            }
                }
                estructura[a].armadora.autos.push( pushed );
            }
            exists_coche = 0;
            }
        }

        if( exists_armadora == 0 )
        {
          console.log('armadora')
            var pushed = {
            "armadora" : {
                "nombre" : armadora,
                "autos" : [
                {
                    "nombre" : coche,
                    "anios" : [anio],
                    "cilindro":[cilindro],
                    "motor" : [motor]
                }
                ]
            }
            }
            console.log('push: ',pushed)
            estructura.push( pushed );
        }
      },
      insertarArmadoraCocheAnioCilindraje( armadora, coche, anio, cilindraje, estructura )
      {
        var exists_armadora = 0;
        var exists_coche = 0;
        var exists_anio = 0;
        var exists_cilindraje = 0;

        for(var a in estructura)
        {
            var armadora_actual = estructura[a].armadora;
            if( armadora_actual.nombre == armadora )
            {
            exists_armadora = 1;
            for(var b in armadora_actual.autos)
            {
                var auto_actual = armadora_actual.autos[b];
                if( auto_actual.nombre == coche )
                {

                exists_coche = 1;

                //Verifica si existe el anio del coche
                for(var c in auto_actual.anios)
                {
                    if( auto_actual.anios[c] == anio )
                    {
                    exists_anio = 1;
                    break;
                    }
                }

                if( exists_anio == 0 )
                {
                    estructura[a].armadora.autos[b].anios.push( anio );
                }
                exists_anio = 0;

                //Verifica si existe el motor del coche
                for(var d in auto_actual.cilindraje)
                {
                    if( auto_actual.cilindraje[d] == cilindraje )
                    {
                    exists_cilindraje = 1;
                    break;
                    }
                }

                if( exists_cilindraje == 0 )
                {
                    estructura[a].armadora.autos[b].cilindraje.push( cilindraje );
                }
                exists_cilindraje = 0;

                }
            }
            if ( exists_coche == 0 )
            {
                var pushed = {
        //            "autos" : {
                    "nombre" : coche,
                    "anios" : [anio],
                    "cilindraje" : [cilindraje]
        //            }
                }
                estructura[a].armadora.autos.push( pushed );
            }
            exists_coche = 0;
            }
        }

        if( exists_armadora == 0 )
        {
            var pushed = {
            "armadora" : {
                "nombre" : armadora,
                "autos" : [
                {
                    "nombre" : coche,
                    "anios" : [anio],
                    "cilindraje" : [cilindraje]
                }
                ]
            }
            }
            estructura.push( pushed );
        }
      },
      insertarArmadoraCocheAnio( armadora, coche, anio, estructura )
      {
        var exists_armadora = 0;
        var exists_coche = 0;
        var exists_anio = 0;

        for(var a in estructura)
        {
            var armadora_actual = estructura[a].armadora;
            if( armadora_actual.nombre == armadora )
            {
            exists_armadora = 1;
            for(var b in armadora_actual.autos)
            {
                var auto_actual = armadora_actual.autos[b];
                if( auto_actual.nombre == coche )
                {
                exists_coche = 1;

                for(var c in auto_actual.anios)
                {
                    if( auto_actual.anios[c] == anio )
                    {
                    exists_anio = 1;
                    break;
                    }
                }

                if( exists_anio == 0 )
                {
                    estructura[a].armadora.autos[b].anios.push(anio);
                }
                exists_anio = 0;

                }
            }
            if ( exists_coche == 0 )
            {
                var pushed = {
        //            "autos" : {
                    "nombre" : coche,
                    "anios" : [anio],
                    "motor" : []
        //            }
                }
                estructura[a].armadora.autos.push( pushed );
            }
            exists_coche = 0;
            }
        }

        if( exists_armadora == 0 )
        {
            var pushed = {
            "armadora" : {
                "nombre" : armadora,
                "autos" : [
                {
                    "nombre" : coche,
                    "anios" : [anio],
                    "motor" : []
                }
                ]
            }
            }
            estructura.push( pushed );
        }
      },
      insertarArmadoraCoche( armadora, coche, estructura )
      {
        var exists_armadora = 0;
        var exists_coche = 0;
        for(var a in estructura)
        {
            var armadora_actual = estructura[a].armadora;
            if( armadora_actual.nombre == armadora )
            {
            exists_armadora = 1;
            for(var b in armadora_actual.autos)
            {
                var auto_actual = armadora_actual.autos[b];
                if( auto_actual.nombre == coche )
                {
                exists_coche = 1;
                break;
                }
            }
            if ( exists_coche == 0 )
            {
                var pushed = {
        //            "autos" : {
                    "nombre" : coche,
                    "anios" : [],
                    "motor" : []
        //            }
                }
                estructura[a].armadora.autos.push( pushed );
            }
            exists_coche = 0;
            }
        }

        if( exists_armadora == 0 )
        {
            var pushed = {
            "armadora" : {
                "nombre" : armadora,
                "autos" : [
                {
                    "nombre" : coche,
                    "anios" : [],
                    "motor" : []
                }
                ]
            }
            }
            estructura.push( pushed );
        }
      },
      insertarArmadora( armadora, estructura )
      {
          console.log("Inserta unicamente armadora");
          var exists = 0;

          for( var a in estructura )
          {
              var armadora_actual = estructura[a].armadora;
              if( armadora_actual.nombre == armadora )
              {
              exists = 1;
              break;
              }
          }

          if( exists == 0 )
          {
              var pushed = {
              "armadora" : {
                  "nombre" : armadora,
                  "autos" : [
                  {
                      "nombre" : "",
                      "anios" : [],
                      "motor" : []
                  }
                  ]
              }
              }
              estructura.push( pushed );
          }

          //console.log("Estructura actual: ");
          //console.log(estructura);
          //console.log("Hecho");
      },
      descomponer(autos){
          var estructura = [];
          console.log('autos: ',autos)
          var query = {
              "armadora" : {
                  "nombre" : " ",
                  "autos" : [
                  {
                      "nombre" : " ",
                      "anios" : [],
                      "cilindraje":[],
                      "motor" : []
                  }
                  ]
              }
          }
          console.log('query: ',query)
          estructura.push(query);
          //console.log('cuarto')
          var cadena_temp = autos
          if(cadena_temp){
            var cadena = cadena_temp.toUpperCase();
          //console.log(cadena)
            if(cadena){
              var vehiculo_completo = cadena.split('#');
            //console.log('vehiculo_completo')
            //console.log(vehiculo_completo)
              if(vehiculo_completo){
                var contador_total_vehiculos = vehiculo_completo.length;
              //console.log('contador_total_vehiculos')
              //console.log(contador_total_vehiculos)
                if(contador_total_vehiculos > 1){
                    for( var contador_while1 in vehiculo_completo)
                    {
                    var primer_paso_armadora = vehiculo_completo[contador_while1].split('&');
                    var armadora = primer_paso_armadora[0];
                    //console.log("armadora: ")
                    //console.log(armadora)

                    if( primer_paso_armadora.length > 1 )
                    {
                        var primer_paso_carro = primer_paso_armadora[1];
                        //console.log("primer paso armadora: ")
                        //console.log(primer_paso_carro)
                        var segundo_paso_carro = primer_paso_carro.split(",");
                        var ultimo_años = segundo_paso_carro.length
                        console.log('coma: ',segundo_paso_carro)
                        var carro = segundo_paso_carro[0];
                        //console.log("carro: ")
                        console.log(carro)

                        if( segundo_paso_carro.length > 1 )
                        {
                        console.log("Consulta con litros y anios")

                        for( var contador_while2 in segundo_paso_carro)
                        {
                            if ( contador_while2 == 0 )
                            continue;

                            var anio = segundo_paso_carro[contador_while2];
                            console.log(anio);


                            /*
                            if( anio.includes("%") == true )
                            {
                              console.log("Consulta con todo y todo")
                              var tercer_paso_carro = anio.split("%");
                              var anio_aux = tercer_paso_carro[0];
                              for( var contador_while3 in tercer_paso_carro)
                              {
                                  if ( contador_while3 == 0 )
                                  continue;

                                  var motor = tercer_paso_carro[contador_while3];
                                  console.log(motor);

                                  this.insertarArmadoraCocheAnioMotor( armadora, carro, anio_aux, motor, estructura )

                              }

                            }
                            else
                            {
                              this.insertarArmadoraCocheAnio( armadora, carro, anio, estructura );
                            }
                             */
                            //if(ultimo_años == contador_while2){
                              if( (anio.includes("%") == true )&&(anio.includes("$") == true))
                              {
                                //ambos
                                  console.log("Consulta con % y $")
                                  var tercer_paso_carro = anio.split("$");
                                  var anio_aux = tercer_paso_carro[0];
                                  for( var contador_while3 in tercer_paso_carro)
                                  {
                                      if ( contador_while3 == 0 )
                                      continue;

                                      var cilindraje = tercer_paso_carro[contador_while3];
                                      console.log(cilindraje);

                                      //this.insertarArmadoraCocheAnioMotor( armadora, carro, anio_aux, motor, estructura )
                                      this.insertarArmadoraCocheAnioCilindrajeMotor( armadora, carro, anio_aux, cilindraje, estructura )

                                  }
                              }
                              else
                              {
                                if(anio.includes("$") == true ){
                                  console.log("Consulta con $")
                                  var tercer_paso_carro = anio.split("$");
                                  var anio_aux = tercer_paso_carro[0];
                                  for( var contador_while3 in tercer_paso_carro)
                                  {
                                      if ( contador_while3 == 0 )
                                      continue;

                                      var cilindraje = tercer_paso_carro[contador_while3];
                                      console.log(cilindraje);

                                      //this.insertarArmadoraCocheAnioMotor( armadora, carro, anio_aux, motor, estructura )
                                      this.insertarArmadoraCocheAnioCilindraje( armadora, carro, anio_aux, cilindraje, estructura )

                                  }
                                }else{
                                  if(anio.includes("%") == true ){
                                    console.log("Consulta %")
                                    var tercer_paso_carro = anio.split("%");
                                    var anio_aux = tercer_paso_carro[0];
                                    for( var contador_while3 in tercer_paso_carro)
                                    {
                                        if ( contador_while3 == 0 )
                                        continue;

                                        var motor = tercer_paso_carro[contador_while3];
                                        console.log(motor);

                                        this.insertarArmadoraCocheAnioMotor( armadora, carro, anio_aux, motor, estructura )

                                    }
                                  }else{
                                    this.insertarArmadoraCocheAnio( armadora, carro, anio, estructura );
                                  }
                                }
                                  
                              }
                            
                        }
                        }
                        else
                        {
                        this.insertarArmadoraCoche( armadora, carro, estructura );
                        }
                    }
                    else
                    {
                        this.insertarArmadora( armadora, estructura );
                    }
                    }

                }else{
                    if(vehiculo_completo)
                      var primer_paso_armadora = vehiculo_completo[0].split('&');
                    if(primer_paso_armadora)
                    {
                      var armadora = primer_paso_armadora[0];
                      if( primer_paso_armadora.length > 1 )
                      {

                          var primer_paso_carro = primer_paso_armadora[1];
                          var segundo_paso_carro = primer_paso_carro.split(",");
                          var carro = segundo_paso_carro[0];
                          //console.log("carro: ")
                          //console.log(carro)

                          if( segundo_paso_carro.length > 1 )
                          {
                          //console.log("Consulta con litros y anios")

                          for( var contador_while2 in segundo_paso_carro)
                          {
                              if ( contador_while2 == 0 )
                              continue;

                              var anio = segundo_paso_carro[contador_while2];
                              //console.log(anio);

                              if( (anio.includes("%") == true )&&(anio.includes("$") == true))
                              {
                                //ambos
                                  console.log("Consulta con % y $")
                                  var tercer_paso_carro = anio.split("$");
                                  var anio_aux = tercer_paso_carro[0];
                                  for( var contador_while3 in tercer_paso_carro)
                                  {
                                      if ( contador_while3 == 0 )
                                      continue;

                                      var cilindraje = tercer_paso_carro[contador_while3];
                                      console.log(cilindraje);

                                      //this.insertarArmadoraCocheAnioMotor( armadora, carro, anio_aux, motor, estructura )
                                      this.insertarArmadoraCocheAnioCilindrajeMotor( armadora, carro, anio_aux, cilindraje, estructura )

                                  }
                              }
                              else
                              {
                                if(anio.includes("$") == true ){
                                  console.log("Consulta con $")
                                  var tercer_paso_carro = anio.split("$");
                                  var anio_aux = tercer_paso_carro[0];
                                  for( var contador_while3 in tercer_paso_carro)
                                  {
                                      if ( contador_while3 == 0 )
                                      continue;

                                      var cilindraje = tercer_paso_carro[contador_while3];
                                      console.log(cilindraje);

                                      //this.insertarArmadoraCocheAnioMotor( armadora, carro, anio_aux, motor, estructura )
                                      this.insertarArmadoraCocheAnioCilindraje( armadora, carro, anio_aux, cilindraje, estructura )

                                  }
                                }else{
                                  if(anio.includes("%") == true ){
                                    console.log("Consulta %")
                                    var tercer_paso_carro = anio.split("%");
                                    var anio_aux = tercer_paso_carro[0];
                                    for( var contador_while3 in tercer_paso_carro)
                                    {
                                        if ( contador_while3 == 0 )
                                        continue;

                                        var motor = tercer_paso_carro[contador_while3];
                                        console.log(motor);

                                        this.insertarArmadoraCocheAnioMotor( armadora, carro, anio_aux, motor, estructura )

                                    }
                                  }else{
                                    this.insertarArmadoraCocheAnio( armadora, carro, anio, estructura );
                                  }
                                }
                                  
                              }
                             

                          }
                          }
                          else
                          {
                          this.insertarArmadoraCoche( armadora, carro, estructura );
                          }
                      }
                      else
                      {
                          this.insertarArmadora( armadora, estructura );
                      }
                    }
                    //InsertarArmadora( vehiculo_completo, estructura );
                }
              }
            }
          }else{
            console.log('No hay nada')
          }
          //console.log('estructura')
          //alert(estructura[1])
          //estructura.splice(0, 1);
          return estructura;
      }
      ,
      escribirAutos(autos)
      {
        console.log('estructura: ',autos)
        var coches;
        var estructura = this.descomponer(autos);
        console.log('Estructura: ',estructura);
        for(var i=0;i < estructura.length; i++)
        {
          coches += estructura[i].armadora.nombre;
          for(var j=0;j < estructura[i].armadora.autos.length; j++)
          {
            coches += " " + estructura[i].armadora.autos[j].nombre;
            for(var k=0;k < estructura[i].armadora.autos[j].anios.length; k++)
            {
              coches += " " + estructura[i].armadora.autos[j].anios[k];
            }
            for(var k=0;k < estructura[i].armadora.autos[j].motor.length; k++)
            {
              coches += " " + estructura[i].armadora.autos[j].motor[k];
            }
          }
          coches += "\n";
        }
        return estructura;
      },
      años(i){
        this.autos[i].modelo = 0
        console.log(this.inicia)
        console.log(this.termina)
        if(this.inicia != null){
          console.log('entro inicia')
          if(this.termina != null){
            console.log('entro fin')
            if(parseInt(this.inicia) < parseInt(this.termina)){
              console.log('entro comparacion')
              for(var a = this.inicia; a < this.termina; a++){
                this.autos[i].modelo = this.autos[i].modelo +","+a

              }
              var letras = this.autos[i].modelo.length
              this.autos[i].modelo = this.autos[i].modelo.substring(1,letras)
              console.log( this.autos[i].modelo)
            }
          }else{
            this.autos[i].modelo = ','+this.inicia
          }
        }
      },
      entro(datos){
        var arrayautos = []
        var estructuraJson = {}
        console.log('autos: ',datos)
        estructuraJson = this.escribirAutos(datos)
        console.log('datos de autos:',estructuraJson.length)
        for(var i in estructuraJson){
          var armadora =''
          var carro = ''
          var modelo = ''
          var cilindraje = ''
          var motor = ''
          if(i>0){
            //console.log(estructuraJson[i].armadora.nombre)
            for(var a in estructuraJson[i].armadora.autos){ 
              armadora = estructuraJson[i].armadora.nombre
              console.log(armadora)
              carro = estructuraJson[i].armadora.autos[a].nombre
              console.log(carro)
              modelo = estructuraJson[i].armadora.autos[a].anios
              console.log(modelo)
              cilindraje = estructuraJson[i].armadora.autos[a].auto
              console.log(cilindraje)
              motor = estructuraJson[i].armadora.autos[a].motor
              console.log(motor)
              arrayautos.push({
                "armadora":armadora,
                "carro":carro,
                "modelo":modelo,
                "cilindraje":cilindraje,
                "motor":motor
              })
              
            }
            //
            //this.autos.carro = estructuraJson[i].armadora.nombre.au
          }
        }
        //this.autos.push({})
        //console.log(this.autos)
        console.log('total: ',arrayautos)
        this.autos = arrayautos
        this.num = this.autos.length
        this.varautos = true
        //return datos
      },
      agregar(){
        
        this.num = this.num + 1
        console.log('num',this.num)
        console.log('autos: ',this.autos)
      },
      close(datos){
        this.varautos = false
        //this.autos = []
        console.log('cerrar')
        this.$emit('close',datos)
      },
       Update(){
         console.log('información: ',this.info)
          var blobFile = $('#form')[0];
          console.log('blobFile: ',blobFile)
          const formData = new FormData(blobFile);
          //formData.append("myfile", this.file);
          console.log('entro al update')
          //var datos = {id_compra, user}
          //formData.append("info",  this.info); 
          formData.append("pesado",  this.info.pesado); 
          formData.append("outlet",  this.info.outlet);
          formData.append("id_promo",  this.info.id_promo);
          
          //formData.append("img2",  this.file2);
          //formData.append("img3",  this.file3);
          //console.log('info',formData.body)
          api.post('/ad-productos/update-product', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            console.log('respuesta: ',response.data)
            if(response.data.success == true){
              console.log('correcto: ',response.data.message)
              this.close('true')
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
    },
    created() {
        this.user = sessionStorage.getItem('rol')
        if(this.user == 'Admin'){
          this.edit = true
        }
        //this.info = this.$route.params.info
        if(sessionStorage.getItem("dato")!=null){
          this.escrito=sessionStorage.getItem("dato")
        }else{
          this.escrito=''
        }
        api.get(`/promociones/all`)
        .then(response => {
          // JSON responses are automatically parsed.
          for(var i=0; i<response.data.length; i++)
            this.items_promos.push(response.data[i].id_promo);


//          this.items_promos = response.data
          console.log(this.items_promos);
        })
        .catch(e => {
          this.errors.push(e)
        //  console.log("Error");
        //  console.log(e);
        })
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