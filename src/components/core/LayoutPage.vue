<template >
  <v-app id="inspire">
    <core-toolbar />

    <core-drawer />

    <core-view />
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
  }
};
</script>