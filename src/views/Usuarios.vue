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
            item-key="nombres"
            loading-text="Buscando... por favor, espere un momento."
            :search="buscar"
            :pagination.sync="pagination"
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
              <td>
                <v-switch
                  true-value="Activo"
                  false-value="Inactivo"
                  :input-value="item.status"
                  color="green" :label="item.status"
                  hide-details
                  @change="changeStatus(item)"
                />
              </td>
              <td class="d-flex align-center justify-end">
                <v-btn flat icon color="#003b94!important" class="text-lowercase" @click="$refs.modalDetalles.setInfo(item)" :ripple="false">
                  ver
                </v-btn>
                <v-menu left offset-y class="br-custom">
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-dots-vertical</v-icon>
                  </template>
                  <v-list dense class="py-1">
                    <v-list-tile
                      @click="$refs.modalCreateEdit.editUser(item)"
                    >
                      <v-list-tile-title>Editar información</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      @click="$refs.modalChangePass.openModal(item)"
                    >
                      <v-list-tile-title>Cambiar contraseña</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </td>
            </template>
          </v-data-table>
          <Modaldetalles ref="modalDetalles"/>
          <change-pass ref="modalChangePass"/>
          <modal-usuario :estados="estados" :roles="roles" @done="loadUsers" ref="modalCreateEdit"/>
          <v-btn class="white--text" small color="#003b94" dark @click="$refs.modalCreateEdit.newUser()"> Nuevo usuario </v-btn>
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
import ChangePass from '@/components/core/ChangePass.vue'
import Roles from '@/components/core/Roles.vue'
import {api} from '@/api'
//import $ from 'jquery'
//import axios from 'axios'
export default {
  name: 'Usuarios',
  components:{
//    toolbar,
    ChangePass,
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
    },
    changeStatus (user) {
      console.log('change',user)
      const status = user.status == 'Activo' ? 'Inactivo' : 'Activo'
      api.post(`/usuarios/change-status/${user._id}`, { status })
      .then(response => {
          if(response.data.success==true){
            this.loadUsers()
            this.$root.$emit('notify', { message: response.data.message, type: 'success' })
            return
          }
          this.$root.$emit('notify', { message: response.data.message, type: 'error' })
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
<style lang="scss" scoped>
.v-list__tile__title {
  text-align: right;
}
</style>
