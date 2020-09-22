<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-form ref="form" v-on:submit.prevent="save" lazy-validation class="w-100">
      <v-card>
        <v-toolbar dark color="indigo">
         <v-toolbar-title class="white--text">
           Cambiar contraseña <br>
           <small class="font-weight-regular">{{ userData }}</small>
        </v-toolbar-title>
         <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs10 offset-xs1 >
              <v-text-field
                v-model.trim="password"
                label="Nueva Contraseña"
                name="password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="showPassword ? 'text' : 'password'"
                hint="Ingresa al menos 6 caracteres"
                @click:append="showPassword = !showPassword"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red darken-1"
            flat="flat"
            @click="closeModal"
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
  name: 'ChangePass',
  computed: {
    userData () {
      return this.user.datos_personales
        ? this.user.datos_personales.nombres + ' ' + this.user.datos_personales.apellidos + ' | ' + this.user.datos_personales.email
        : ''
    }
  },
  data () {
    return {
      dialog: false,
      password: '',
      user: '',
      showPassword: false,
      passwordRules: {
        required: value => !!value || "Campo requerido",
        min: v => v.length >= 6 || "Minimo 6 caracteres"
      }
    }
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        api.post(`/usuarios/change-password/${this.user._id}`, { password: this.password })
          .then(response => {
            if (!response.data.success) {
              console.log(response.data.message)
              this.$root.$emit('notify', { message: response.data.message, type: 'error' })
            } else {
              console.log('response:', response.data)
              this.$root.$emit('notify', { message: response.data.message, type: 'success' })
              this.dialog = false
            }
          })
          .catch(e => {
            console.log(e);
            alert('Error ' + e)
          })
      }
    },
    closeModal () {
      this.dialog = false
      this.password = ''
      this.$refs.form.resetValidation()
    },
    openModal (user) {
      this.dialog = true
      this.user = user
    }
  }
}
</script>
