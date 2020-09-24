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
              height="40"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="title">
              {{ userName }}
            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{ userEmail }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider/>
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
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
        <v-divider class="mt-5 mb-1"/>
        <v-list-tile class="v-list-item">
          <v-list-tile-action>
              <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="'Salir'"
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
import routerLinks from '@/utils/routerLinks'

export default {
  data: () => ({
    logo: './img/logo2.png',
    links: [
      'usuarios'
    ],
    responsive: false,
    token: ''
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
    },
    userEmail () {
      return this.token.id && this.token.id
    },
    userName () {
      return (this.token && this.token.username) || (this.token && this.token.usuario)
    }
  },
  created(){
    this.token = this.$jwt.decode(localStorage.getItem('reface'))
    if (this.token && this.token.rol) {
      if(this.token.rol.includes('Admin') || this.token.rol.includes('admin')) {
        this.links= routerLinks
      }else{
        this.buscaRol(sessionStorage.getItem('rol'))
      }
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
