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
        <h3 class="font-weight-regular my-6 font--color ls">PRODUCTOS</h3>
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
            <h4 class="font-weight-regular">Subtotal</h4>
          </div>
          <div class="details__options">
            <h4>${{ order.subtotal }}</h4>
          </div>
        </div>
        <div v-if="order.paqueteria && order.paqueteria.precio" class="details border-bottom-none">
          <div class="details__content d-flex align-center">
            <h4 class="font-weight-regular">Envio</h4>
          </div>
          <div class="details__options">
            <h4>${{ order.paqueteria.precio }}</h4>
          </div>
        </div>
        <div class="details pb-4" :class="order.subtotal || order.paqueteria ? 'pt-4' : 'pt-7'">
          <div class="details__content d-flex align-center">
            <h2 class="d-inline">TOTAL</h2>
            <span class="ml-3">({{ totalProducts }} productos)</span>
          </div>
          <div class="details__options">
            <h2>${{ order.total }}</h2>
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
