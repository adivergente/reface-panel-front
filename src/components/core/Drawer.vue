<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            Reface Admin
          </v-list-tile-title>
        </v-list-tile>

        <v-divider style="margin: auto;"/>
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
        </v-list-tile>

        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
          style="height: 45px;"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
        <v-divider style="margin: auto;     margin-left: 7%;"/>
        <v-list-tile style="height: 45px;">
          <v-list-tile-action>
              <v-icon>mdi-clipboard-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="'salir'"
            @click="logout()"
          />
        </v-list-tile>
        
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {api} from '@/api'
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    logo: './img/reface_logo.jpeg',
    links: [
      'usuarios'
    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
    // console.log('roles', this.$jwt.decode(localStorage.getItem('reface')))
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    },
    logout(){
      localStorage.removeItem('reface');
      this.$router.go();
    },
    buscaRol(rol){
      console.log('entro')
      api.post('/roles/buscar', {name:rol})
      .then(response => {
          if(response.data.success==true){
            this.$router.go()
            console.log(response.data.data)
            console.log(JSON.parse(response.data.data[0].links))
            this.links = JSON.parse(response.data.data[0].links)
          }else{
            alert(response.data.message)
          }
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  created(){
    const roles = this.$jwt.decode(localStorage.getItem('reface')).rol || []
    if(roles.includes('Admin') || roles.includes('admin')) {
      this.links= [
      {
        to: '/dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Inicio'
      },
      {
        to: '/admin',
        icon: 'mdi-account',
        text: 'Mi cuenta'
      },
      {
        to: '/clientes',
        icon: 'mdi-account',
        text: 'Clientes'
      },
      {
        to: '/productos',
        icon: 'mdi-animation',
        text: 'Productos'
      },
      {
        to: '/compras',
        icon: 'mdi-clipboard-outline',
        text: 'Ordenes de Compra'
      },
      {
        to: '/promociones',
        icon: 'mdi-animation',
        text: 'Promociones'
      },
      {
        to: '/noticias',
        icon: 'mdi-clipboard-outline',
        text: 'Noticias'
      },
      {
        to: '/index',
        icon: 'mdi-clipboard-outline',
        text: 'Edición de index'
      },
      {
        to: '/usuarios',
        icon: 'mdi-account',
        text: 'Usuarios'
      },
      {
        to: '/garantias',
        icon: 'mdi-package-up',
        text: 'Garantías y Devoluciones'
      }
    ]
    }else{
      this.buscaRol(sessionStorage.getItem('rol'))
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
