<template>
  <v-dialog v-model="dialog" max-width="500" scrollable>
    <v-card>
      <v-card-title class="justify-center blue darken-2 white--text">
        <h5 class="my-0 font-weight-medium">CAMBIAR STATUS</h5>
      </v-card-title>
      <hr>
      <v-card-text>
        <v-radio-group v-model="status" column @change="update">
          <v-radio label="Pagado" value="pagado"></v-radio>
          <v-radio label="Pendiente" value="pendiente"></v-radio>
          <v-radio label="Procesando" value="procesando"></v-radio>
          <v-radio label="Enviado" value="enviado"></v-radio>
          <v-radio label="Entregado" value="entregado"></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {api} from '@/api'

export default {
  name: 'ChangeOrderStatus',
  data () {
    return {
      dialog: false,
      status: '',
      order: ''
    }
  },
  methods: {
    update() {
      console.log('update status')
      api.post(`/ordenes/change-status/${this.order._id}`, { status: this.status })
        .then(response => {
          if (!response.data.success) {
            console.log(response.data.message)
            this.$root.$emit('notify', { message: response.data.message, type: 'error' })
          } else {
            console.log('response:', response.data)
            this.$root.$emit('notify', { message: response.data.message, type: 'success' })
            this.$emit('update')
            this.dialog = false
          }
        })
        .catch(e => {
          console.log(e);
          alert('Error ' + e)
        })
    },
    openModal (order) {
      this.dialog = true
      this.order = order
      this.status = this.order.status
    }
  }
}
</script>
