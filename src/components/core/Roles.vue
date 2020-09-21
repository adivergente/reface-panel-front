<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn class="white--text" v-on="on" small color="#003b94" dark> Añadir Rol </v-btn>
    </template>
    <v-card>
      <v-form ref="form" v-on:submit.prevent="Update()" lazy-validation>
        <v-toolbar color="#003b94">
         <v-toolbar-title style="color:white;">Nuevo Rol</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row>
          <v-flex xs10 offset-xs1 >
            <h4> Nombre: </h4>
            <v-text-field
              v-model="rol.nombre"
              class="purple-input"
              label="Nombre"
              name="codigo"
              :rules="rules1"
            />
            <v-data-table
              :headers="headers"
              :items="links"
              loading-text="Buscando... por favor, espere un momento."
               item-key="name"
                hide-actions
                v-model="selected"
            >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>
                <v-checkbox
                  :input-value="item.selected"
                  primary
                  hide-details
                  @click.native="seleccionado(item)"
                ></v-checkbox>
              </td>
              <td>{{ item.text }}</td>
            </template>
          </v-data-table>
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
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import {api} from '@/api'
import $ from 'jquery'
import routerLinks from '@/utils/routerLinks'

export default {
    name: 'Frame',
    data () {
      return {
        cant: 0,
        info:null,
        dialog: false,
        mess: null,
        rol:{
          nombre:null,
          links:null
        },
        passwordRules: {
          required: value => !!value || "Campo obligatorio",
          min: v => v.length >= 8 || "Type at least 8 characters"
        },
        showPassword: false,
        rules1: [
          value => !!value || 'Required.',
          value => (value || '').length <= 50 || 'Max 50 characters',
          value => {
            const pattern = /^(?!\s)+([A-Za-zÑñáéíóúÁÉÍÓÚ]{3,})+([\s{1}]+([A-Za-zÑñáéíóúÁÉÍÓÚ]{3,}))*$/;
            return pattern.test(value) || 'Nombre(s) invalido(s).'
          },
        ],
        rules4: [
          value => !!value || 'Required.',
          value => (value || '').length <= 50 || 'Max 50 characters',
          value => {
            const pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            return pattern.test(value) || 'Email invalido.'
          },
        ],
        headers: [
          {
            text: 'Seleccionar',
            value: null
          },
          {
            text: 'Nombre',
            value: 'nombre'
          }
        ],
        links: routerLinks,
        selected:[],
        selected2:[],
        check:false
      }
    },
    methods: {
      seleccionado(dato){
        var num = 0
        console.log('estado: ',dato.estado)
        for(var i in this.selected){
          if(this.selected[i].name == dato.name){
            num = 1
          }else{
            this.selected2.push(this.selected[i])
          }
        }
        if(num==0){
          this.selected2.push(dato)
        }
        this.selected = this.selected2
        this.selected2 = []
        console.log('arreglo: ',this.selected)
        console.log('arreglo2: ',this.selected2)
      },
       Update(){

         console.log('selected: ',this.selected)
         this.rol.links = this.selected
         api.post('/roles/nuevo', this.rol)
         .then(response => {
           // JSON responses are automatically parsed.
//           this.models = response.data;
              if(response.data.success==true){
                //this.$router.go()
                this.selected = []
                this.selected2 = []
                this.dialog = false
              }else{
                alert(response.data.message)
              }
             //this.mess  = response.data.message;
           //console.log(this.items);
           //alert(this.mess);

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
