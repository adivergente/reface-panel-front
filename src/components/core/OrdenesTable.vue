<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
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
        <td>{{ item.created_at | date }}</td>
        <td>{{ item.folio }}</td>
        <td>{{ item.usuario[0].datos_personales.nombres + ' ' + item.usuario[0].datos_personales.apellidos }}</td>
        <!-- <td>{{ item.productos.length }}</td> -->
        <td>$ {{ item.total }} M.N.</td>
        <td >
          <span v-if="item.paqueteria.tracking_id">
            {{ item.paqueteria.tracking_id }}
          </span>
          <v-btn v-else color="success" small class="white--text">subir</v-btn>
        </td>
        <td>
          <v-btn small outline :color="getStatusColor(item.status)" class="white--text" @click="$refs.modalChangeStatus.openModal(item)">
            {{ item.status }}
          </v-btn>
        </td>
        <td>
          <v-chip :color="getFPagoColor(item.forma_pago)" dark small label>
            {{ item.forma_pago }}
          </v-chip>
        </td>
        <td class="text-xs-right">
          <v-btn flat icon color="#003b94!important" class="text-lowercase" @click="$refs.modalInfo.openModal(item)" :ripple="false">
            ver
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <Modalinfo ref="modalInfo"/>
    <modal-change-status @update="$emit('update')" ref="modalChangeStatus"/>
  </div>
</template>

<script>
import Modalinfo from '@/components/core/Detalles4.vue'
import ModalChangeStatus from '@/components/core/ChangeOrderStatus.vue'

export default {
  name: 'OrdenesTable',
  components: {
    Modalinfo,
    ModalChangeStatus
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
  data () {
    return {
      headers: [
        {
          text: 'Fecha'
        },
        {
          text: 'Folio'
        },
        {
          text: 'Nombres'
        },
        // {
        //   text: 'Productos'
        // },
        {
          text: 'Total'
        },
        {
          text: 'Guía'
        },
        {
          text: 'Estatus'
        },
        {
          text: 'F. Pago'
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
