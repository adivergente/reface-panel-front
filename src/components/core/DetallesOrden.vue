<template>
  <div>
    <v-card
      outlined
      class="mb-5"
    >
      <v-card-text>
        <slot></slot>
        <div class="details pb-3">
          <div class="details__title">Cliente:</div>
          <div class="details__content">
            <span>{{ user.nombres + '  ' + user.apellidos }}</span><br>
            <small>{{ user.email }}</small>
          </div>
        </div>
        <div class="details py-3">
          <div class="details__title">Enviar a:</div>
          <div class="details__content">
            {{ domicilio }}
          </div>
        </div>
        <div v-if="order.forma_pago" class="details py-3">
          <div class="details__title">Pago via:</div>
          <div class="details__content">
            {{ order.forma_pago }}
            <small v-if="order.transaction_id" class="ml-1">(ref: {{ order.transaction_id }})</small>
          </div>
        </div>
        <div v-if="order.status" class="details py-3">
          <div class="details__title">Estatus:</div>
          <div class="details__content">
            {{ order.status | orderStatus }}
          </div>
        </div>
        <div v-if="order.created_at" class="details py-3">
          <div class="details__title">Fecha:</div>
          <div class="details__content">
            {{ order.created_at | date }}
          </div>
        </div>
        <div v-if="order.user_atiende && order.user_atiende.length" class="details py-3">
          <div class="details__title">Atiende:</div>
          <div class="details__content">
            <span>{{ atiende.nombres + '  ' + atiende.apellidos }}</span><br>
            <small>{{ atiende.email }}</small>
          </div>
        </div>
        <template v-if="order.paqueteria && order.paqueteria.tracking_id">
          <h6 class="font-weight-regular mt-3 mb-0 ls">PAQUETERÍA</h6>
          <div class="details py-3">
            <div class="details__title">Tracking:</div>
            <div class="details__content">
              <span>{{ order.paqueteria.tracking_id }}</span>
            </div>
          </div>
        </template>
        <h5 class="font-weight-regular mt-3 ls">PRODUCTOS</h5>
        <div
          v-for="({ product, qty }, index) in products" :key="index"
          class="details py-3"
        >
          <div class="details__title--small">
            {{ qty }}
          </div>
          <div class="details__content">
            {{ product.nombre }}
            <br>
            <small>{{ product.descripcion.toLowerCase() | prodDescription | truncate(40) }}</small>
          </div>
          <div class="details__options">
            <span
            v-if="product.id_promo !== '0' && product.promocion.length && product.promocion[0].descuento"
            >
              <small class="line-through grey--text">${{ product.precio }}</small>
              ${{ product.precio | discount(product.promocion && product.promocion[0].descuento) }}
            </span>
            <span v-else>
              ${{ product.precio }}
            </span>
          </div>
        </div>
        <div v-if="order.subtotal" class="details pt-3 border-bottom-none">
          <div class="details__content d-flex align-center">
            <h4 class="font-weight-regular my-0">Subtotal</h4>
          </div>
          <div class="details__options my-0">
            <h4 class="my-0">${{ order.subtotal }}</h4>
          </div>
        </div>
        <div v-if="order.paqueteria && order.paqueteria.precio" class="details border-bottom-none">
          <div class="details__content d-flex align-center">
            <h4 class="font-weight-regular my-0">Envio</h4>
          </div>
          <div class="details__options">
            <h4 class="my-0">${{ order.paqueteria.precio }}</h4>
          </div>
        </div>
        <div class="details pb-4" :class="order.subtotal || order.paqueteria ? 'pt-4' : 'pt-7'">
          <div class="details__content d-flex align-baseline">
            <h3 class="d-inline font-weight-regular" style="flex: 0!important">
              TOTAL
            </h3>
            <span class="ml-3">({{ totalProducts }} productos)</span>
          </div>
          <div class="details__options">
            <h3 class="font-weight-regular">${{ order.total }}</h3>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'DetallesOrden',
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    products () {
      return this.order.productos || {}
    },
    user () {
      if (this.order.usuario && this.order.usuario.length) {
        return this.order.usuario[0].datos_personales
      }
      return this.order.user || {}
    },
    atiende () {
      if (this.order.user_atiende && this.order.user_atiende.length) {
        return this.order.user_atiende[0].datos_personales
      }
      return {}
    },
    domicilio () {
      const dom = []
      if (this.order.envio && this.order.envio.direccion) {
        this.order.envio.direccion && dom.push(this.order.envio.direccion)
        this.order.envio.codigo_postal && dom.push(this.order.envio.codigo_postal)
        this.order.envio.localidad && dom.push(this.order.envio.localidad)
        this.order.envio.municipio && dom.push(this.order.envio.municipio)
        this.order.envio.estado && dom.push(this.order.envio.estado)
      }
      return dom.join(', ')
    },
    totalProducts () {
      return this.order.productos.length || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  display: flex;
  align-items: baseline;
  &:not(:last-child) {
    border-bottom: 1px solid #e4e4e4;
  }
  &__title {
    width: 80px;
  }
  &__content {
    flex: 1;
    color: #333e48;
    line-height: 1.1;
    small {
      color: #989898;
    }
  }
}
.ls {
  letter-spacing: 2px;
}
.details__title--small {
  width: 40px;
  // border-right: 1px solid $border-color;s
  // display: flex;
  // justify-content: space-between;
  padding-right: 15px;
  padding-left: 5px;
}
.border-bottom-none {
  border-bottom: none!important;
}
</style>
