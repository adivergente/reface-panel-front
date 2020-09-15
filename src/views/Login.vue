<template>
  <v-app>
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm3 md6 offset-md3 lg6 offset-lg3 xl10 offset-xl1>
          <h1>Bienvenido</h1>
        </v-flex>
        <v-flex
          :style="displayLogin"
          xs12
          sm8
          offset-sm2
          md8
          offset-md2
          lg8
          offset-lg2
          xl10
          offset-xl1
        >
          <v-card color="#a8a8a8">
            <v-form ref="form" v-on:submit.prevent="m_login" lazy-validation>
              <v-container >
                <v-layout row wrap>
                  <!--<v-flex  xs12 sm12  md12  lg12  xl12 >-->
                  <v-flex  xs6 offset-xs3 >
                      <v-img :src="img.logo" width="100%">

                      </v-img>
                      <!--<h3>FT Contrucciones</h3>-->
                  </v-flex>
                  <v-flex xl6 offset-xl3 lgl6 offset-lg3  mdl6 offset-md3 xs-12>
                    <v-text-field
                      v-model="login.usuario"
                      color="white"
                      label="Usuario"
                      name="usuario"
                      append-icon="mdi-account"
                      hint="Ingresa tu nombre de usuario"
                    />
                  
                    <v-text-field
                      v-model="login.password"
                      color="white"
                      label="Contraseña"
                      name="password"
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      :rules="[passwordRules.required, passwordRules.min]"
                      :type="showPassword ? 'text' : 'password'"
                      hint="Ingresa al menos 6 caracteres"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-flex>
                  <v-flex xs12 sm12  md3  lg3  xl3>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-layout>
                <v-flex xs12>
                  <v-btn class="error white--text" small @click="$router.go(-1)">Atrás</v-btn>
                </v-flex>

                <v-flex xs12>
                  <v-btn class="success white--text" type="submit" small>Entrar</v-btn>
                </v-flex>
              </v-layout>
              <v-layout></v-layout>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex xs12 lg6 offset-lg3 :style="displayForget">
          <v-card>
            <v-form ref="form2" v-on:submit.prevent="forgetPass" lazy-validation>
              <v-container>
                <v-text-field
                  v-model="login.correo"
                  :rules="emailRules"
                  required
                  color="white"
                  label="Ingresa el correo electrónico de recuperación"
                  name="email"
                  append-icon="mail"
                />
              </v-container>

              <v-layout>
                <v-flex xs12>
                  <v-btn class="error white--text" small @click="clear">Cancelar</v-btn>
                </v-flex>
                <v-spacer />
                <v-flex xs12>
                  <v-btn class="success white--text" small type="submit">Enviar</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex xs12 lg6 offset-lg3>
          <v-progress-circular v-if="displayLoading" indeterminate />
          <v-snackbar v-model="displayMsg" :timeout="timeout">{{info}}</v-snackbar>
          <h1></h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
// import {api} from '@/api'
import axios from 'axios'
const PUBLIC_PATH = process.env.BASE_URL;
export default {
  // created () {
  //   console.log('env', process.env)
  // },
  data() {
    return {
      img: {
        logo: `${PUBLIC_PATH}img/logo2.png`
      },
      login: {
        usuario: "",
        password: "",
        correo: ""
      },
      showPassword: false,
      // switsh style
      displayLoading: false,
      displayLogin: "display:block",
      displayForget: "display:none",
      displayMsg: false,
      timeout: 4000,
      //Error messages
      info: null,
      // input rules
      passwordRules: {
        required: value => !!value || "Campo obligatorio",
        min: v => v.length >= 6 || "Longitud minima 6 carácteres"
      },
      emailRules: [
        v => !!v || "Correo electrónico requerido",
        v => /.+@.+/.test(v) || "Correo invalido"
      ]
    };
  },
  methods: {
    showForget() {
      this.displayLogin = "display:none";
      this.displayForget = "display:block";
    },
    showLogin() {
      this.displayLogin = "display:block";
      this.displayForget = "display:none";
    },
    clear() {
      this.login = {
        usuario: "",
        password: "",
        correo: ""
      };
      this.showPassword = false;
      this.info = "";
      (this.result = null), (this.displayForget = "display:none");
      this.displayLogin = "display:block";
      this.info = "";
    },
    showAlert(msg) {
      this.info = msg;
      this.displayLoading = false;
      this.displayMsg = true;
    },
    showLoading() {
      this.info = "";
      this.displayLoading = true;
      this.displayMsg = false;
    },
    m_login() {
      this.showLoading();
      if (this.login.usuario.length === 0) {
        this.showAlert("Type your user name");
      } else if (this.login.password.length === 0) {
        this.showAlert("Type your password");
      } else {
        const url = process.env.NODE_ENV === 'development' ? 'http://localhost:61' : 'http://tiendavirtual.dyndns.org:61'
        axios.post(`${url}/ad-usuarios/login`, this.login)
          .then(response => {
            console.log('login',response.data)
            if (response.data.success == false) {
              console.log('error')
              this.showAlert("Invalid data");
            } else {
              console.log('si')
              //this.$store.commit("setToken", response.data.token);
              localStorage.setItem('reface',response.data.token)
              console.log(localStorage.getItem('reface'))
              //var profile  = this.$decodeToken()
              //console.log('perfil:',profile)
              this.showAlert("Welcome " + response.data.data.datos_personales.nombres);
              sessionStorage.setItem("id",response.data.data.datos_personales.email)
              sessionStorage.setItem("rol",response.data.data.rol)
              sessionStorage.setItem("nick",response.data.data.datos_personales.username)
              sessionStorage.setItem("email",response.data.data.datos_personales.email)
              this.$router.go({ name: "panel" });
            }
          })
          .catch(error => {
            console.log('error:',error)
            if (error.response.status == 401) {
              this.showAlert(error.response.data.error);
            } else {
              this.showAlert("Failed to connect to server");
            }
          });
      }
    },
    forgetPass() {
      if(/.+@.+/.test(this.login.correo)){
        api.post("/forget", this.login)
        .then(response => {
          if (response.data.success) {
            this.showAlert("Se envió el correo de recuperación");
            this.showLogin()
          } else {
            this.showAlert("No se encontro una cuenta vinculada a este correo");
          }
        })
        .catch(error => {
          this.showAlert(error);
        });
      }else{
        this.showAlert("Ingresa el correo de recuperación");
      }
    }
  }
};
</script>