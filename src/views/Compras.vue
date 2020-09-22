<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Compras"
          text="Ordenes de compra realizadas"
        >
        <v-layout
          justify-center
          wrap
        >
          </v-layout>
          <v-card elevation="0" class="mt-4">
            <v-tabs>
              <v-tab  @click="cambio(2)"> Nuevas</v-tab>
              <v-tab @click="cambio(1)">Atendidas</v-tab>
              <v-tab @click="cambio(3)">Cajas</v-tab>
            </v-tabs>
            <v-card-title primary-title color="primary">
                <v-flex md2>
                  <div class="headline">
                    {{tipo}}
                  </div>
                </v-flex>
                <v-flex md8>
                  <v-text-field outline label="Buscar" v-model="escrito">
                  </v-text-field>
                </v-flex>
                <v-flex md2>
                  <v-select
                    v-model="est"
                    outline
                    label="Estados"
                    @change="buscaestado(est)"
                    :items="estados"
                    v-if="!tab_cajas"
                    >
                  </v-select>
                </v-flex>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="items"
              :search="escrito"
              v-if="noatendidas">
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
                  <v-chip :color="getColor(item.status)" dark small label>
                    {{ translateStatus(item.status) }}
                  </v-chip>
                </td>
                <td>
                  <v-chip :color="getColor2(item.forma_pago)" dark small label>
                    {{ item.forma_pago }}
                  </v-chip>
                </td>
                <td class="text-xs-right">
                  <v-btn flat icon color="#003b94!important" class="text-lowercase" @click="$refs.modalInfo.openModal(item)" :ripple="false">
                    ver
                  </v-btn>
                  <!-- <Modalcompras :id="item.id" :productos="item.total_productos" :precio="item.total_venta" :id_compras="item.id_compras" :email="item.datos_personales.email" />
                  <Modalstatus :id="item._id" :status="item.estado" :email="item.datos_personales.email" /> -->
                </td>
              </template>
            </v-data-table>
            <v-data-table
              :headers="headers"
              :items="items2"
              :search="escrito"
              v-if="atendidas"
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
                <td>{{ item.id }}</td>
                <td>{{ item.datos_personales.nombre_completo }}</td>
                <td>{{ item.total_productos }}</td>
                <td>$ {{ item.total_venta }} M.N.</td>
                <td >
                  <v-btn small @click="subirGuia(item)" :color="ColorGuia(item.numero_guia)">{{guia(item.numero_guia)}}</v-btn>
                </td>
                <td>
                  <v-chip :color="getColor(item.estado)" dark > {{item.estado}}</v-chip>
                </td>
                <td>
                  <v-chip :color="getColor2(item.tipo)" dark > {{item.tipo}}</v-chip>
                </td>
                <td class="text-xs-right">
                  <Modalinfo :clave="item.id" :nombres="item.datos_personales.nombres" :apellidos="item.datos_personales.apellidos" :email="item.datos_personales.email" :telefono="item.datos_personales.telefono" :cp="item.datos_entrega.codigo_postal" :estado="item.datos_entrega.estado" :municipio="item.datos_entrega.municipio" :calle="item.datos_entrega.calle" :num_interior="item.datos_entrega.num_interior" :num_exterior="item.datos_entrega.num_exterior" :colonia="item.datos_entrega.colonia" :referencias="item.datos_entrega.referencias" :productos="item.total_productos" :total="item.total_venta" :status="item.estado" />
                  <Modalcompras :id="item.id" :productos="item.total_productos" :precio="item.total_venta" :id_compras="item.id_compras" :email="item.datos_personales.email" />
                  <Modalstatus :id="item._id" :status="item.estado" :email="item.datos_personales.email" />
                </td>
              </template>
            </v-data-table>
            <v-data-table
              :headers="headers2"
              :items="items_cajas"
              :search="escrito"
              v-if="tab_cajas"
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
                <td>{{ item.codigo }}</td>
                <td>{{ item.ancho }} m</td>
                <td>{{ item.largo }} m</td>
                <td>{{ item.alto }} m</td>
                <td class="text-xs-right">
                  <v-btn color="success" small v-on:click="edit_caja(item)">Editar</v-btn>
                  <v-btn color="error" small v-on:click="delete_caja(item)">Borrar</v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card>
          <Modalinfo ref="modalInfo"/>
          <Modalalta v-if="tab_cajas" @close="closeagregar"/>
          <Modaloxxo v-else />
        </material-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <Modaleliminar :info="info2" :dialog="dialog3" @close="closeeliminar"/>
      <Modaleditar :info="info3" :dialog="dialog4" @close="closeeditar"/>
      <Guia :info="infoguia" :dialog="dialog2" @close="closeguia"/>
    </v-layout>
  </v-container>
</template>

<script>

//import toolbar from '@/components/Toolbar.vue'
import Modalinfo from '@/components/core/Detalles4.vue'
import Modalcompras from '@/components/core/Detalles6.vue'
import Modalstatus from '@/components/core/Detalles5.vue'
import Guia from '@/components/core/SubirGuia.vue'
import Modaloxxo from '@/components/core/Detalles8.vue'
import Modaleditar from '@/components/core/EditarCaja.vue'
import Modaleliminar from '@/components/core/BorrarCaja.vue'
import Modalalta from '@/components/core/AltaCaja.vue'
import {api} from '@/api'
//import $ from 'jquery'
//import axios from 'axios'
export default {
    components:{
//    toolbar,
      Modalinfo,
      Modalcompras,
      Modalstatus,
      Modaloxxo,
      Guia,
      Modaleditar,
      Modaleliminar,
      Modalalta
      //      Modaldebito,
//      Modalcredito
  },
  data () {
    return {
      escrito:'',
      info:null,
      info2: {},
      info3: {},
      infoguia:{},
      rating: 3,
      id:null,
      show: false,
      rowsPerPageItems: [12, 24, 36],
      pagination: {
        rowsPerPage: 12
      },
      items: [],
      items2: [],
      errors: [],
      empty: [],
      content1:null,
      content2:null,
      dialog: false,
      dialog2: false,
      dialog3:false,
      dialog4:false,
      sub:null,
      sub2:null,
      headers: [
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
      headers2: [
        {
          text: 'Código',
          value: 'codigo'
        },
        {
          text: 'Ancho',
          value: 'ancho'
        },
        {
          text: 'Largo',
          value: 'largo'
        },
        {
          text: 'Alto',
          value: 'alto'
        },
        {
          text: 'Opciones',
          value: '',
           align: 'right'
        }
      ],
      estados:['Todos','Procesando','Pendiente','Pagado','Enviado','Entregado'],
      est:null,
      atendidas:false,
      noatendidas:true,
      singleSelect:false,
      tipo:"Nuevas",
      items_cajas:[],
      tab_cajas:false
    }
  },
  created() {
    console.log('usuario: ',sessionStorage.getItem('id'))
    //alert(sessionStorage.getItem("dato"))
    this.info = this.$route.params.info
    //alert("ejemplo "+this.info)
    //sessionStorage.setItem("content1","display:none")
    //sessionStorage.setItem("content2",null)
    //alert(this.content2)
    if(sessionStorage.getItem("dato")!=null){
      this.escrito=sessionStorage.getItem("dato")
    }else{
      this.escrito=''
    }
    this.compras()
    this.cajas()
  },
  methods: {
    closeagregar(res){
      if(res==true){
        console.log('true')
        this.cajas()
      }else{
        console.log('false')
      }
    },
    closeeditar(res){
      console.log('respuesta: ',res)
      if(res=='true'){
        console.log('true')
        this.dialog4 = false;
        this.cajas()
      }else{
        console.log('false')
        this.dialog4 = false;
      }

    },
    closeeliminar(res){
      if(res==true){
        console.log('true')
        this.dialog3 = false;
        this.cajas()
      }else{
        console.log('false')
        this.dialog3 = false;
      }
    },
    edit_caja(info){
      this.info3=info
      this.dialog4=true
    },
    delete_caja(info){
      this.info2=info
      this.dialog3=true
    },
    closeguia(res){
      console.log('respuesta: ',res)
      if(res=='true'){
        console.log('true')
        this.dialog2 = false;
        this.compras()
      }else{
        console.log('false')
        this.dialog2 = false;
      }

    },
    verguia(info){
      this.infoguia=info
      this.dialog2=true
    },
    // ColorGuia(info){
    //   if(info != null){
    //     if(info != ""){
    //       return "success"
    //     }else{
    //       return "grey"
    //     }
    //   }else{
    //     return "grey"
    //   }
    // },
    // guia(info){
    //   if(info != null){
    //     if(info != ""){
    //       return info
    //     }else{
    //       return "Subir"
    //     }
    //   }else{
    //     return "Subir"
    //   }
    // },
    cambio(num){
      switch(num){
        case 1:
          this.tipo = "Atendidas"
          this.atendidas = true
          this.noatendidas = false
          this.tab_cajas = false
          break
        case 2:
          this.tipo = "Nuevas"
          this.atendidas = false
          this.noatendidas = true
          this.tab_cajas = false
          break
        case 3:
          this.tipo = "Cajas"
          this.atendidas = false
          this.noatendidas = false
          this.tab_cajas = true
          break
      }
      if(num == 1){
        
      }else{
        
      }
    },
    buscaestado(estado){
      if(estado == 'Todos'){
        this.escrito = ''
      }else{
        this.escrito = estado
      }
    },
    getColor(status){
      switch (status.toLowerCase()){
        case 'paid':
          return 'green'
        case 'pending':
          return 'orange'
        case 'enviado':
          return 'blue'
        case 'entregado':
          return 'teal'
        case 'procesando':
        default: return 'grey'
      }
    },
    getColor2(fPago){
      switch (fPago.toLowerCase()){
        case 'oxxo':
            return 'orange'
        case 'paypal':
            return 'blue'
        default:
            return 'orange'
      }
    },
    translateStatus (status) {
      switch (status.toLowerCase()) {
        case 'paid': return 'Pagado'
        case 'pending': return 'Pendiente'
        default: return status
      }
    },
    compras(){
      // console.log('entro a method compras')
      api.get(`/ordenes`)
      .then(response => {
        const { success, message, data } = response.data
        const id = sessionStorage.getItem('id')
        console.log('ordenes', data)
        // console.log('atiende: ',response.data[0].atiende)
        // JSON responses are automatically parsed.
        for(var i in data){
          console.log()
          if(data[i].atiende === id){
            console.log(i)
            this.items2.push(data[i])
          }else{
            if(!data[i].atiende){
              console.log(i)
              this.items.push(data[i])
            }
          }
        }
        // console.log(this.items2);
      })
      .catch(e => {
        this.errors.push(e)
      //  console.log("Error");
      //  console.log(e);
      })
    },
    cajas(){
      api.get(`/cajas/list-cajas`)
      .then(response => {
        //console.log('atiende: ',response.data[0].atiende)
        // JSON responses are automatically parsed.
        //alert(response.data.success)
        if(response.data.success == true){
          this.items_cajas=response.data.data
        }else{
          console.log(response.data.message)
        }
      })
      .catch(e => {
        this.errors.push(e)
        console.log(e)
      //  console.log("Error");
      //  console.log(e);
      })
    }
  }
}

</script>
