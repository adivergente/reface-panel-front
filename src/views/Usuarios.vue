<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >

      <v-flex
        md12
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Usuarios"
          text="Datos de usuarios registrados en la plataforma Reface"
        >
          <v-text-field outline label="Buscar" v-model="buscar">

          </v-text-field>
          <v-data-table
            :headers="headers"
            :items="items"
            :loading="ver"
            :total-items="10"
            item-key="nombres"
            loading-text="Buscando... por favor, espere un momento."
            :search="buscar"
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
              <td>{{ item.datos_personales.nombres }}</td>
              <td>{{ item.datos_personales.apellidos }}</td>
              <td>{{ item.datos_personales.username }}</td>
              <td>{{ item.datos_personales.telefono }}</td>
              <td>{{ item.rol.join(', ') }}</td>
              <td>{{ item.status }}</td>
              <td class="text-xs-right">
                <Modaldetalles :item="item"/>
                <v-btn small color="#003b94" dark @click="$refs.modalCreateEdit.editUser(item)"> Editar </v-btn>
                <!-- <Modaleliminar :nombres="item.datos_personales.nombres" :apellidos="item.datos_personales.apellidos" :id="item.id" :status="item.status" /> -->
              </td>
            </template>
          </v-data-table>
          <modal-usuario :estados="estados" :roles="roles" @done="loadUsers" ref="modalCreateEdit"/>
          <v-btn small color="#003b94" dark @click="$refs.modalCreateEdit.newUser()"> Nuevo usuario </v-btn>
          <!-- <Modalalta/> -->
          <Roles/>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

//import toolbar from '@/components/Toolbar.vue'
import Modaldetalles from '@/components/core/Detalles.vue'
import ModalUsuario from '@/components/core/AddEditUser.vue'
import Modaleliminar from '@/components/core/Detalles2.vue'
import Modalalta from '@/components/core/Altas_usuarios.vue'
import Roles from '@/components/core/Roles.vue'
import {api} from '@/api'
//import $ from 'jquery'
//import axios from 'axios'
export default {
  name: 'Usuarios',
  components:{
//    toolbar,
    Modaldetalles,
    Modaleliminar,
    ModalUsuario,
    Modalalta,
    Roles
  },
  computed: {
    activeUserHasData() {
      return this.activeUser.hasOwnProperty('datos_personales')
    }
  },
  data () {
    return {
      escrito:'',
      info:null,
      rating: 3,
      id:null,
      show: false,
      rowsPerPageItems: [10, 20, 30],
      pagination: {
        rowsPerPage: 10
      },
      items: [],
      errors: [],
      empty: [],
      content1:null,
      content2:null,
      dialog: false,
      sub:null,
      sub2:null,
      ver:false,
      headers: [
        {
          text: 'Nombres'
        },
        {
          text: 'Apellidos'
        },
        {
          text: 'Username'
        },
        {
          text: 'Teléfono'
        },
        {
          text: 'Rol'
        },
        {
          text: 'Status'
        },
        {
          sortable: false,
          text: 'Acciones',
          value: 'acciones',
          align: 'right'
        }
      ],
      estados: [],
      activeUser: {},
      roles: [],
      buscar:null,
      loadingTable: true
    }
},
 methods: {
    datos(ide){

    },
    compras(ide){

    },
    eliminar(ide){

      api.get(`/ad-usuarios/delete-user/`+ide)
      .then(response => {
        // JSON responses are automatically parsed.
        this.items = response.data
        //console.log(this.items);
      })
      .catch(e => {
        this.errors.push(e)
      //  console.log("Error");
      //  console.log(e);
      })
    },
    loadUsers () {
      api.get(`/usuarios`)
      .then(response => {
        const { success, data } = response.data
        if (!success) return
        console.log(data)
        this.items = data
        this.ver = true;
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    editUser (user) {
      // console.log(user)
      this.$refs.modalCreateEdit.fillData(user)
      this.$refs.modalCreateEdit.edit = true
      this.$refs.modalCreateEdit.dialog = true
    },
    getEstados() {
      api.get('/utils/estados')
      .then(response => {
        console.log(response.data)
        const { data } = response.data
        this.estados = data.map(obj => obj.nombre)
      })
      .catch(e => {
        console.log(e);
      })
    },
    // newUser () {
    //   this.$refs.modalCreateEdit.edit = false
    //   this.$refs.modalCreateEdit.dialog = true
    // },
    getRoles() {
      api.get('/roles/todos')
      .then(response => {
          if(response.data.success==true){
            this.roles = response.data.data.map(item => item.nombre)
          }else{
            alert(response.data.message)
          }

      })
      .catch(e => {
        console.log(e);
      })
    }
 },
created() {
    //alert(sessionStorage.getItem("dato"))
    this.info = this.$route.params.info
    //alert("ejemplo "+this.info)
    //sessionStorage.setItem("content1","display:none")
    //sessionStorage.setItem("content2",null)
    //alert(this.content2)
    if(sessionStorage.getItem("dato")!=null){
      this.escrito=sessionStorage.getItem("dato")
    }else{
      this.escrito=''
    }
    this.loadUsers()
    this.getEstados()
    this.getRoles()
}


}

</script>
