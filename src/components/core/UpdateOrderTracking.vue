<template>
  <v-dialog v-model="dialog" max-width="500" scrollable>
    <v-form ref="form" v-on:submit.prevent="save" lazy-validation class="w-100">
      <v-card>
        <v-card-title class="justify-space-between blue darken-2 white--text">
          <h5 class="my-0 font-weight-medium">
            ACTUALIZAR TRACKING DE ORDEN
          </h5>
          <p class="mb-0 blue darken-3 pa-2">{{ order.folio }}</p>
        </v-card-title>
        <hr>
        <v-card-text>
          <v-text-field
            v-model="tracking"
            label="Tracking ID"
            class="purple-input"
            :rules="req"
          />
        </v-card-text>
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
            color="primary"
            flat
            type="submit"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import {api} from '@/api'

export default {
  name: 'UpdateOrderTracking',
  data () {
    return {
      dialog: false,
      tracking: '',
      order: '',
      req:[
          value => !!value.length || 'Campo requerido.'
        ]
    }
  },
  methods: {
    save () {
      console.log('update tracking')
      if (this.$refs.form.validate()) {
        api.post(`/ordenes/guia/${this.order._id}`, { tracking: this.tracking })
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
      }
    },
    openModal (order) {
      this.dialog = true
      this.order = order
      this.$refs.form.resetValidation()
      this.tracking = this.order.paqueteria.tracking_id || ''
    }
  }
}
</script>
