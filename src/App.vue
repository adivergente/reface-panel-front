<template>
  <v-app>
    <router-view />
  </v-app>
</template>
<script>
export default {
  metaInfo () {
    return {
      title: 'REFACE - Sistema de Administración'
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
.v-btn{
  color:white !important;
}
</style>
