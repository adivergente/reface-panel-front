<template >
  <v-app id="inspire">
    <core-toolbar />

    <core-drawer />

    <core-view />
    <v-snackbar v-model="showSnack" :timeout="3000" :color="snackType">
      {{ snackMessage }}
    </v-snackbar>
  </v-app>
</template>
<script>
//import Toolbar from "@/components/Layout/ToolbarApplication";
export default {
  components: {
    //Toolbar
  },
  created () {
    if(!this.$jwt.decode(localStorage.getItem('reface'))) {
      console.log('token fail')
      localStorage.removeItem('reface')
      this.$router.go()
    }
    this.$root.$on('notify', (e) => {
      this.notify(e)
    })
  },
  data () {
    return {
      showSnack: false,
      snackMessage: '',
      snackType: '',
    }
  },
  methods: {
    notify ({ message, type }) {
      this.showSnack = true
      this.snackMessage = message
      this.snackType = type
    }
  }
};
</script>