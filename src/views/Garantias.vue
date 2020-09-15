<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout  style="width:100%" >
      <v-flex xs12>
        <material-card color="rgb(21, 45, 91)" title="Garantías y Devoluciones">
            <v-layout >
                <v-card style="width:100%">
                    <v-tabs>
                        <v-tab  @click="cambio(1)">Garantías</v-tab>
                        <v-tab @click="cambio(2)">Devolyuciones</v-tab>
                    </v-tabs>
                    <v-layout  wrap row style="padding: 10px;">
                        
                        <v-flex xs9>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-6 offset-md-3">
                                        <div class="container-chat">
                                            <h3 class="title-page">{{titulo}}</h3>
                                            <ul id="chat">
                                                <!--Recorremos el array de mensajes y mostramos uno por uno en la lista-->
                                                <li v-for="m in messages">
                                                    {{m}}
                                                </li>
                                            </ul>
                                            <!-- con el atributo submit, le indicamos que al usar el input submit llamaremos a la funcíon sendMessage-->
                                            <!--<form @submit.prevent="sendMessage">
                                                <input type="text" placeHolder="Mensaje..." v-model="message" class="form-control">
                                                <input type="submit" value="Enviar" class="btn btn-chat">
                                            </form>-->
                                            <form @submit.prevent="sendMessage">
                                                <v-textarea type="text" background-color="grey lighten-2" placeHolder="Mensaje..."  color="blck" outline v-model="message" class="form-control"></v-textarea>
                                                <input type="submit" value="Enviar" class="btn btn-chat">
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-flex>
                        <v-flex xs3>
                            <v-layout column >
                                <v-list-tile avatar>
                                    <v-list-tile-avatar color="white" >
                                        <v-icon> mdi-clipboard-account </v-icon>
                                    </v-list-tile-avatar>
                                    <v-list-tile-title class="title">
                                        Clientes    
                                    </v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile v-for="(link, i) in links" :key="i" avatar class="v-list-item" style="height: 45px;">
                                    <v-list-tile-action>
                                        <v-btn @click="verchat(link)">Cliente {{link.id}}</v-btn>
                                    </v-list-tile-action>
                                    <v-list-tile-title v-text="link.text"/>
                                </v-list-tile>
                            </v-layout>
                        </v-flex>
                        <!--<v-flex xs12>
                            <v-card-actions>
                                <v-btn flat dark>Listen now</v-btn>
                            </v-card-actions>
                        </v-flex>-->
                    </v-layout>
                    
                </v-card>
            </v-layout>
            
            
        </material-card>
      </v-flex>
    </v-layout>
    <v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import {api} from '@/api'
export default {
    components:{
    
  },
    data () {
        return {
        ver_g:true,
        ver_d:false,
        links: [],
        text1:"Hola",
        text2:"Hola",
        messages:[],
        titulo:"Garantías"
        }
    },
    methods: {
        cambio(num){
            if(num == 1){
                this.titulo = "Garantías"
                this.ver_g = true
                this.ver_d = false
            }else{
                this.titulo = "Devoluciones"
                this.ver_g = false
                this.ver_d = true
            }
        },
        piden_dev(){
            api.get(`/ad-newmensaje/list-newmensaje`)
            .then(response => {
                console.log(response.data)
                if(response.data.success == true){
                    this.links = response.data.data
                    console.log(this.links)
                }else{
                    console.log(response.data.message)
                }
            })
            .catch(e => {
                this.errors.push(e)
            //  console.log("Error");
            //  console.log(e);
            })
        },
        verchat(datos){
            api.get(`/ad-mensaje/list-mensaje`)
            .then(response => {
                console.log(response.data)
                if(response.data.success == true){
                    this.links = response.data.data
                    console.log(this.links)
                }else{
                    console.log(response.data.message)
                }
            })
            .catch(e => {
                this.errors.push(e)
            //  console.log("Error");
            //  console.log(e);
            })
        }
    },
    created() {
        this.piden_dev()
    }
}

</script>
<style >
#chat{
    height: 300px;
    width: 100%;
    overflow-y:scroll;
    list-style: none;
    padding:0;
}
#chat li{
    padding:0.3rem 0rem 0.3rem 0.5rem;
    border-bottom: 1px solid #dedede;
}
.title-page{
    text-align: center;
    color:black;
    padding-top:0.6rem;
    padding-bottom:0.6rem;
}
.container-chat{
    background-color:white;
    border-radius: 5px;
    
}
.btn.btn-chat{
    color:white;
    background-color:#41B883;
    width: 100%;
    border-radius: 0px;
    font-size: 1.5rem;
}
</style>