<template>
  <v-dialog v-model="dialog" max-width="500" scrollable>
    <v-form ref="form" v-on:submit.prevent="Update()" lazy-validation class="w-100">
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar color="#003b94">
          <v-toolbar-title style="color:white;">
            Editar usuario
          </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex xs10 offset-xs1 >
            <v-text-field
              class="purple-input"
              label="Id"
              :disabled="true"
              name="id"
              :value="form._id"
            />
            <v-text-field
              v-model="form.nombres"
              class="purple-input"
              label="Nombres"
              name="nombres"
              :rules="reqAlpha"
            />
            <v-text-field
              v-model="form.apellidos"
              class="purple-input"
              label="Apellidos"
              name="apellidos"
              :rules="reqAlpha"
            />
            <v-text-field
              v-model="form.username"
              class="purple-input"
              label="Username"
              name="username"
            />
            <v-select
              v-model="form.rol"
              :items="roles"
              multiple
              class="purple-input"
              label="Roles"
              item-text="rol"
            />
            <v-text-field
              v-model="form.email"
              label="Email"
              class="purple-input"
              name="email"
              :rules="reqEmail"
            />
            <v-text-field
              v-model="form.telefono"
              label="Telefono"
              class="purple-input"
              name="telefono"
              :rules="reqTel"
            />
            <v-text-field
              v-model="form.direccion"
              label="Direccion"
              class="purple-input"
              name="direccion"
            />
            <v-autocomplete
              v-model="form.estado"
              :items="estados"
              label="Estado"
              autocomplete="none"
              clearable
              @click:clear="estadoCleared"
              @change="getMunicipios($event)"
            />
            <v-autocomplete
              v-model="form.municipio"
              :items="municipios"
              label="Municipio"
              autocomplete="none"
              clearable
              :disabled="!municipios.length"
            />
            <v-text-field
              v-model="form.localidad"
              label="Localidad"
              class="purple-input"
              name="localidad"
            />
            <v-text-field
              v-model="form.pais"
              label="País"
              class="purple-input"
              name="pais"
            />
            <v-text-field
              v-model="form.cp"
              class="purple-input"
              label="Código Postal"
              name="codigo_postal"
            />
            <v-textarea
              v-model="form.referencias"
              class="purple-input"
              label="Referencias"
              name="referencias"
              auto-grow
            />
                <!--
              <h4> Status: </h4>
              <v-text-field
                class="purple-input"
                label="Status"
                name="status"
                disabled="true"
                :value="status"
              />
              -->
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="dialog = false;$emit('close') "
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
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import {api} from '@/api'

export default {
    name: 'EditarUsuario',
    props: {
       roles: {
         type: Array,
         default: () => []
       },
       estados: {
         type: Array,
         default: () => []
       }
    },
    data () {
      return {
        cant: 0,
        info:null,
        dialog: false,
        form: {
          _id: '',
          nombres: '',
          apellidos: '',
          username: '',
          email: '',
          telefono: '',
          direccion: '',
          localidad: '',
          municipio: '',
          estado: '',
          pais: '',
          cp: '',
          referencias: '',
          status: '',
          rol: []
        },
        reqAlpha: [
          value => !!value || 'Required.',
          value => (value || '').length <= 50 || 'Max 50 characters',
          value => {
            const pattern = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
            return pattern.test(value) || 'Formato no válido.'
          },
        ],
        // reqUsername: [
        //   value => !!value || 'Required.',
        //   value => (value || '').length <= 50 || 'Max 50 characters',
        //   value => {
        //     const pattern = /^[a-z0-9_-]{3,16}$/;
        //     return pattern.test(value) || 'Username invalido.'
        //   },
        // ],
        reqEmail: [
          value => !!value || 'Required.',
          value => (value || '').length <= 50 || 'Max 50 characters',
          value => {
            const pattern = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            return pattern.test(value) || 'Email invalido.'
          },
        ],
        reqTel: [
          value => !!value || 'Required.',
          value => (value || '').length <= 10 || 'Max 10 characters',
          value => {
            const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
            return pattern.test(value) || 'Telefono invalido.'
          },
        ],
        reqCp: [
          value => !!value || 'Required.',
          value => (value || '').length <= 50 || 'Max 50 characters',
          value => {
            const pattern = /^[0-9]{5}$/;
            return pattern.test(value) || 'CP invalido.'
          },
        ],
        req:[
          value => !!value || 'Campo requerido.'
        ],
        municipios: []
      }
    },
    methods: {
       Update(){
        if (this.$refs.form.validate()) {
          // console.log('valido')
          api.patch('/usuarios/update', this.form)
          .then(response => {
              console.log('response update:', response.data)
              this.$emit('update')
              this.dialog = false
          })
          .catch(e => {
            console.log(e);
          })
        }

      },
      getMunicipios(estado) {
        // console.log(estado)
        api.get(`/utils/municipios/${estado}`)
          .then(response => {
            console.log(response.data)
            const { data } = response.data
            this.municipios = data.map(obj => obj.nombre)
          })
          .catch(e => {
            console.log(e);
          })
      },
      estadoCleared () {
        this.form.estado = ''
        this.form.municipio = ''
        this.form.municipios = []
      },
      fillData(user){
        this.form = {
          _id: user._id || '',
          nombres: user.datos_personales.nombres || '',
          apellidos: user.datos_personales.apellidos || '',
          username: user.datos_personales.uername || '',
          email: user.datos_personales.email || '',
          telefono: user.datos_personales.telefono || '',
          direccion: user.domicilio.direccion || '',
          localidad: user.domicilio.localidad || '',
          municipio: user.domicilio.municipio || '',
          estado: user.domicilio.estado || '',
          pais: user.domicilio.pais || '',
          cp: user.domicilio.codigo_postal || '',
          referencias: user.domicilio.referencias || '',
          status: user.status || '',
          rol: user.rol || ''
        }
        if (user.domicilio && user.domicilio.estado) this.getMunicipios(user.domicilio.estado)
      }
    }
}
</script>
