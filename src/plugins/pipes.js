import Vue from 'vue'
// import numeral from 'numeral'
import dayjs from 'dayjs'
import _ from 'lodash'

Vue.filter('truncate', (value, limit = 20) => {
  if (!value) return '---'
  return value.length > limit ? value.substring(0, limit) + '...' : value
})

// Vue.filter('currency', (value) => {
//   if (!value) return '---'
//   return numeral(value).format('$0,0.00')
// })

Vue.filter('discount', (value, discount) => {
  if (!value) return '---'
  if (!discount) return value
  return value - (value * (discount / 100))
})

Vue.filter('prodDescription', (value) => {
  if (!value) return '---'
  return _.upperFirst(value.split('=')[0])
})

Vue.filter('date', (value) => {
  if (!value) return '---'
  return dayjs(value).format('DD/MM/YYYY')
})

Vue.filter('dateString', (value) => {
  if (!value) return '---'
  return dayjs(value).locale('es').format('DD [de] MMMM YYYY')
})

Vue.filter('orderStatus', (status) => {
  if (!status) return '---'
  if (status === 'paid') return 'PAGADO'
  else if (status === 'pending') return 'PENDIENTE'
  else if (status === 'send') return 'ENVIADO'
  else return status
})
