<template>
  <v-dialog v-model="dialog" max-width="500" scrollable>
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar dark color="indigo">
         <v-toolbar-title style="color:white;" >Información de compra {{ orden.folio }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
        <v-layout row>
          <v-flex xs12 >
            <detalles-orden :order="orden" />
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="dialog = false"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import DetallesOrden from '@/components/core/DetallesOrden'
export default {
    name: 'OrderInfo',
    components: {
      DetallesOrden
    },
    computed: {

    },
    data () {
      return {
        cant: 0,
        orden: {
          folio: '',
          status: '',
          userId: '',
          envio: {
            direccion: '',
            codigo_postal: '',
            estado: '',
            municipio: '',
            localidad: '',
            pais: '',
            referencias: ''
          },
          paqueteria: {
            nombre: '',
            precio: '',
            servicio: '',
            tracking_id: ''
          },
          forma_pago: '',
          transaction_id: '',
          fecha_pago: '',
          productos: [],
          subtotal: '',
          total: '',
          created_at: '',
          updated_at: ''
        },
        dialog: false,
      }
    },
    methods: {
      openModal (orden) {
        this.orden = orden
        this.dialog = true
      }
    }
}
</script>
