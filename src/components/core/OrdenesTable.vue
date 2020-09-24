<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orders"
      :search="search"
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
        <td>{{ item.fecha }}</td>
        <td>{{ item.folio }}</td>
        <td>{{ item.cliente }}</td>
        <!-- <td>{{ item.productos.length }}</td> -->
        <td>$ {{ item.total }} M.N.</td>
        <td >
          <v-btn
            v-if="item.paqueteria && item.paqueteria.tracking_id"
            outline
            small
            color="grey darken-1"
            @click="$refs.modalTracking.openModal(item)"
          >{{ item.paqueteria.tracking_id }}</v-btn>
          <v-btn
            v-else
            color="success"
            small
            class="white--text"
            @click="$refs.modalTracking.openModal(item)"
          >subir</v-btn>
        </td>
        <td>
          <v-btn small outline :color="getStatusColor(item.status)" class="white--text" @click="$refs.modalChangeStatus.openModal(item)">
            {{ item.status }}
          </v-btn>
        </td>
        <td>
          <div v-html="item.pago" :class="`${getFPagoColor(item.forma_pago)} f-pago`"></div>
        </td>
        <td class="text-xs-right">
          <v-btn flat icon color="#003b94!important" class="text-lowercase" @click="$refs.modalInfo.openModal(item)" :ripple="false">
            detalles
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <Modalinfo ref="modalInfo"/>
    <modal-change-status @update="$emit('update')" ref="modalChangeStatus"/>
    <modal-tracking @update="$emit('update')" ref="modalTracking"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Modalinfo from '@/components/core/Detalles4.vue'
import ModalChangeStatus from '@/components/core/ChangeOrderStatus.vue'
import ModalTracking from '@/components/core/UpdateOrderTracking.vue'

export default {
  name: 'OrdenesTable',
  components: {
    Modalinfo,
    ModalChangeStatus,
    ModalTracking
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    search: {
      type: String,
      default: ''
    }
  },
  computed: {
    orders () {
      return this.items.map(o => {
        return {
          ...o,
          cliente: `${o.usuario[0].datos_personales.nombres} ${o.usuario[0].datos_personales.apellidos}`,
          fecha: dayjs(o.created_at).format('DD/MM/YYYY'),
          pago: `${o.forma_pago}<br><small>${o.transaction_id}</small>`
        }
      })
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Fecha',
          value: 'fecha'
        },
        {
          text: 'Folio',
          value: 'folio'
        },
        {
          text: 'Nombres',
          value: 'cliente'
        },
        {
          text: 'Total',
          value: 'total'
        },
        {
          text: 'Guía',
          value: 'paqueteria.tracking_id'
        },
        {
          text: 'Estatus',
          value: 'status'
        },
        {
          text: 'F. Pago',
          value: 'pago'
        },
        {
          sortable: false,
          text: 'Opciones',
          value: 'opciones',
          align: 'right'
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  methods: {
    getStatusColor (status) {
      switch (status.toLowerCase()){
        case 'pagado': return 'info'
        case 'pendiente': return 'amber accent-2'
        case 'procesando': return 'grey lighten-2'
        case 'enviado': return 'blue darken-2'
        case 'entregado': return 'success'
        default: return 'grey'
      }
    },
    getFPagoColor (fPago) {
      switch (fPago.toLowerCase()){
        case 'oxxo':
            return 'orange'
        case 'paypal':
            return 'blue'
        default:
            return 'orange'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.f-pago {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  color: #FFF;
}
</style>
