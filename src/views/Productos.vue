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
          title="Productos"
          text="Listado de Productos y características"
        >
          
           
          <v-card>
            <v-tabs>
              <v-tab  @click="cambio(2)">Publicados</v-tab>
              <v-tab @click="cambio(1)">Sin publicar</v-tab>
              <v-tab @click="cambio(3)">Promociones</v-tab>
              <v-tab @click="cambio(4)">Sinónimos</v-tab>
              <v-tab @click="cambio(5)">Medidas Por Subcategoría</v-tab>
              <v-tab @click="agregar()"><v-icon>mdi-library-books</v-icon></v-tab>
            </v-tabs>
            <v-card-title primary-title color="primary">
                <v-flex md8 v-if="promos"> 
                  <v-text-field outline label="Buscar" v-model="escrito"></v-text-field>
                </v-flex> 
                <v-flex md4 v-if="promos"> 
                    <v-btn success v-if="sinpublicar"  @click="publicar()">Publicar</v-btn>
                     <v-select
                      outline
                      :disabled="disabled"
                      :items="items_promos"
                      label="Activar Promoción"
                      v-model="promocion"
                      name="id_promo"
                      outlined
                      v-else
                      @change="activar(promocion)"
                     ></v-select>
                </v-flex>      
                <v-flex md12 v-else >
                  <v-text-field outline label="Buscar" v-model="escrito"></v-text-field>
                </v-flex>  
                   
            </v-card-title>
            <template
            >
              <!--<div>
                <v-autocomplete
                  label="Busca producto por codigo o palabras clave."
                  :items="items"
                ></v-autocomplete>
              </div>-->
            </template>
            <v-data-table
              :headers="headers"
              :items="items"
              :pagination.sync="pagination"
              :search="escrito"
              v-if="publicados"
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
                <td>{{ item.clave_interna }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.marca }}</td>
                <td>{{ item.precio }}</td>
                <td>{{ item.id_promo }}</td>
                <td>{{ item.status }}</td>
                <td class="text-xs-right">
                  <v-btn color="error" small v-on:click="eliminar(item)">Estatus</v-btn>
                  <v-btn color="#003b94" small v-on:click="editar(item)">Editar</v-btn>
                  <v-btn color="blue" small v-on:click="detalle(item)">Detalles</v-btn>
                </td>
              </template>
            </v-data-table>
            <v-data-table
              :headers="headers"
              :items="items2"
              :pagination.sync="pagination"
              :search="escrito"
              v-if="sinpublicar"
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
                <td>{{ item.clave_interna }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.marca }}</td>
                <td>{{ item.precio }}</td>
                <td>{{ item.id_promo }}</td>
                <td>{{ item.status }}</td>
                <td class="text-xs-right">
                  <v-btn color="error" small v-on:click="eliminar(item)">Estatus</v-btn>
                  <v-btn color="#003b94" small v-on:click="editar(item)">Editar</v-btn>
                  <v-btn color="blue" small v-on:click="detalle(item)">Detalles</v-btn>
                </td>
              </template>
            </v-data-table>
            <v-data-table
              v-model="selected"
              :headers="headers2"
              :items="items"
              :pagination.sync="pagination2"
              :search="escrito"
              item-key="codigo"
              v-if="promos"
              select-all
            >
             
              <!--<template v-slot:top>
                <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                mdi-arrow-down  
              </template>-->
              <template
                slot="headers" slot-scope="props"
              >
                  <tr>
                    <th>
                      <v-checkbox
                        :input-value="props.all"
                        :indeterminate="props.indeterminate"
                        primary
                        hide-details
                        @click.native="toggleAll"
                      ></v-checkbox>
                    </th>
                    <th
                      v-for="header in props.headers"
                      :key="header.text"
                      :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                      @click="changeSort(header.value)"
                    >
                      <v-icon small>mdi-arrow-up</v-icon>
                      {{ header.text }}
                    </th>
                  </tr>
              </template>
              <template
                slot="items" slot-scope="props"
              >
                <tr :active="props.selected" @click="props.selected = !props.selected">
                  <td>
                    <v-checkbox
                      :input-value="props.selected"
                      primary
                      hide-details
                      @change="asignar()"
                    ></v-checkbox>
                  </td>
                  <td>{{ props.item.codigo }}</td>
                  <td>{{ props.item.clave_interna }}</td>
                  <td>{{ props.item.nombre }}</td>
                  <td>{{ props.item.tipo }}</td>
                  <td>{{ props.item.marca }}</td>
                  <td> ${{ props.item.precio }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-data-table
              v-model="selected"
              :headers="headers3"
              :items="list_sinonimos"
              :pagination.sync="pagination3"
              :search="escrito"
              item-key="palabra"
              v-if="sinonimos"
            >
             
              <!--<template v-slot:top>
                <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                mdi-arrow-down  
              </template>-->
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
                  <td>{{ item.palabra }}</td>
                  <td>{{ item.sinonimos }}</td>
                  <v-btn color="success" small v-on:click="editarsinonimos(item)">Editar</v-btn>
              </template>
            </v-data-table>
            <v-data-table          
              :headers="headers4"
              :items="list_medidas"
              :pagination.sync="pagination4"
              :search="escrito"
              item-key="_id"
              v-if="medidas"
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
                  <td>{{ item._id }}</td>
                  <td>{{vacio(item.ancho)}} cm</td>
                  <td>{{vacio(item.largo)}} cm</td>
                  <td>{{vacio(item.alto)}} cm</td>
                  <v-btn color="success" small v-on:click="editarmedida(item)">Editar</v-btn>
              </template>
            </v-data-table>
            <Modalalta v-if="publicados" />
            <AltaSinonimos v-if="sinonimos" />
         
           </v-card>
        </material-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <EditSinonimos :info="info6" :dialog="dialog6" @close="closesinonimo" />
      <Medidas :info="info4" :dialog="dialog5" @close="closemedidas"/>
      <Modalarchivo :info="info2" :dialog="dialog4" @close="closearchivo"/>
      <Modaleliminar :info="info2" :dialog="dialog3" @close="closeeliminar"/>
      <Modaleditar :info="info3" :dialog="dialog2" @close="closeeditar"/>
      <Modaldetalle  :info="info2" :dialog="dialog" @close="closedatos"/>
    </v-layout>
  </v-container>
</template>

<script>

//import toolbar from '@/components/Toolbar.vue'
import Modaldetalle from '@/components/core/DetallesProductos.vue'
import Modaleditar from '@/components/core/Detalles1.vue'
import Modaleliminar from '@/components/core/Detalles3.vue'
import Modalalta from '@/components/core/Detalles7.vue'
import Modalarchivo from '@/components/core/AgregarArchivos.vue'
import Modalautos from '@/components/core/Detalles70.vue'
import Medidas from '@/components/core/Medidas.vue'
import EditSinonimos from '@/components/core/EditSinonimos.vue'
import AltaSinonimos from '@/components/core/AltaSinonimos.vue'
import {api} from '@/api'
//import $ from 'jquery'
//import axios from 'axios'
export default {
    components:{
//    toolbar,
      Modaleditar,
      Modaleliminar,
      Modalalta,
      Modaldetalle,
      Modalarchivo,
      Medidas,
      EditSinonimos,
      AltaSinonimos
  },
  data () {
    return {
      escrito:'',
      escrito3:'',
      info:null,
      rating: 3,
      id:null,
      show: false,
      rowsPerPageItems: [12, 24, 36],
      pagination: {
        rowsPerPage: 12
      },
      rowsPerPageItems2: [12, 24, 36],
      pagination2: {
        sortBy: 'codigo',
        rowsPerPage: 15
      },
      pagination3: {
        rowsPerPage: 15
      },
      pagination4: {
        rowsPerPage: 15
      },
      items: [],
      items2: [],
      errors: [],
      empty: [],
      content1:null,
      content2:null,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5:false,
      dialog6:false,
      sub:null,
      sub2:null,
      headers: [
        {
          text: 'Código',
          value: 'codigo'
        },
        {
          text: 'Clave',
          value: 'clave_interna'
        },
        {
          text: 'Nombre',
          value: 'nombre'
        },
        {
          text: 'Tipo',
          value: 'tipo'
        },
        {
          text: 'Proveedor',
          value: 'marca'
        },
        {
          text: 'Precio',
          value: 'precio'
        },
        {
          text: 'Promoción',
          value: 'id_promo'
        },
        {
          text: 'Status',
          value: 'Status'
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
          value: 'codigo',
          align: 'left',
        },
        {
          text: 'Clave',
          align: 'left',
          value: 'clave_interna'
        },
        {
          text: 'Nombre',
          align: 'left',
          value: 'nombre'
        },
        {
          text: 'Tipo',
          align: 'left',
          value: 'tipo'
        },
        {
          text: 'Proveedor',
          align: 'left',
          value: 'marca'
        },
        {
          text: 'Precio',
          align: 'left',
          value: 'precio'
        }
      ],
      headers3: [
        {
          text: 'Palabra',
          value: 'palabra',
          align: 'left',
        },
        {
          text: 'Sinónimos',
          align: 'left',
          value: 'sinonimos'
        },
        {
          text: 'Editar',
          align: 'left',
          value: null
        }
      ],
      headers4: [
        {
          text: 'Sub Categoría',
          value: '_id',
          align: 'left',
        },
        {
          text: 'Ancho',
          align: 'left',
          value: 'ancho'
        },
        {
        
          text: 'Largo',
          align: 'left',
          value: 'largo'
        },
        {
          text: 'Alto',
          align: 'left',
          value: 'alto'
        },
        {
          text: 'Editar',
          align: 'left',
          value: 'sinonimos'
        }
      ],
      buscar:null,
      info2:{nombre:'',clave_interna:'5130890'},
      info3:{nombre:'',clave_interna:''},
      info4:{_id:''},
      info6:{palabra:''},
      user:null,
      publicados:true,
      sinpublicar:false,
      promos:false,
      promocion:null,
      items_promos:[],
      singleSelect:[],
      precio:null,
      lista2:[],
      selected: [],
      disabled:true,
      sinonimos:false,
      list_sinonimos:[],
      medidas:false,
      list_medidas:[]
    }
  },
  methods: { 
    closesinonimo(res){
      
      if(res==true){
        console.log(res)
        this.dialog6 = false;
        this.lista_sinonimos()
      }else{
        console.log(res)
        this.dialog6 = false;
      }
    },
    editarsinonimos(info){
      console.log('entro sinonimo')
      this.info6=info
      this.dialog6=true
    },
    vacio(dato){
      if(dato != null){
        return dato
      }else{
        return 0
      }
    },
    closemedidas(res){
      
      if(res==true){
        console.log(res)
        this.dialog5 = false;
        this.listamedidas()
      }else{
        console.log(res)
        this.dialog5 = false;
      }
    },
    editarmedida(info){
      this.info4=info
      this.dialog5=true
    },
    listamedidas(){
      api.get(`/products/listmedidas`)
      .then(response => {
        console.log(response.data)
        console.log('correcto')
        this.list_medidas=response.data
        
        //console.log(this.items);
      })
      .catch(e => {
        console.log('error de productos')
        this.errors.push(e)
      //  console.log("Error");
      //  console.log(e);
      })
    },
    lista_sinonimos(){
      console.log('entro a productos')
      api.get(`/sinonimos/list-sinonimos`)
      .then(response => {
        console.log(response.data)
        console.log('correcto')
        this.list_sinonimos=response.data
        
        //console.log(this.items);
      })
      .catch(e => {
        console.log('error de productos')
        this.errors.push(e)
      //  console.log("Error");
      //  console.log(e);
      })
    },
    asignar(){
        if (this.selected.length) this.disabled = false
        else this.disabled = true
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    toggleAll() {
        if (this.selected.length) this.selected = [] 
        else this.selected = this.items.slice()
        if (this.selected.length) this.disabled = false
        else this.disabled = true
        console.log(this.selected)
      },
    filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
    activar(id_promo){
      var data = {id_promo}
      if(this.selected.length == this.items.length){
        api.post('/ad-productos/activar_prom', data)
        .then(response => {
          console.log('respuesta: ',response.data)
          if(response.data.success == true){
            console.log('correcto: ',response.data.message)
            //this.close('true')
            //this.close(response.data.success) 
            //this.mostrar(true)
            this.$router.go()
          }else{
            console.log('fallo: ',response.data.message)
            //this.mostrar(false)
            //this.close(response.data.success)
            //this.cerrar()
            
          }
        })
        .catch(error => {
          alert(error)
          /** Error de conexión */
          //this.info= error
          console.log('error: ',error)
        })
      }else{
        var productos = this.selected
        var datos = {id_promo, productos}
        api.post('/ad-productos/activar_prom2', datos)
        .then(response => {
          console.log('respuesta: ',response.data)
          if(response.data.success == true){
            console.log('correcto: ',response.data.message)
            //this.close('true')
            //this.close(response.data.success) 
            //this.mostrar(true)
            this.$router.go()
          }else{
            console.log('fallo: ',response.data.message)
            //this.mostrar(false)
            //this.close(response.data.success)
            //this.cerrar()
            
          }
        })
        .catch(error => {
          alert(error)
          /** Error de conexión */
          //this.info= error
          console.log('error: ',error)
        })
      }
      
    },
    publicar(){
      api.get(`/ad-productos/activar`)
      .then(response => {
        console.log('correcto')
        // JSON responses are automatically parsed.        
          this.productos()
        //console.log(this.items);
      })
      .catch(e => {
        console.log('error de productos')
        this.errors.push(e)
      //  console.log("Error");
      //  console.log(e);
      })
    },
    cambio(num){
      switch(num){
      case 2:
        this.publicados = true
        this.sinpublicar = false
        this.promos = false
        this.sinonimos = false
        this.medidas=false
        break
      case 1:
        this.publicados = false
        this.sinpublicar = true
        this.promos = false
        this.sinonimos = false
        this.medidas=false
        break
      case 3:
        this.publicados = false
        this.sinpublicar = false
        this.promos = true
        this.sinonimos = false
        this.medidas=false
        break
      case 4:
        this.publicados = false
        this.sinpublicar = false
        this.promos = false
        this.sinonimos = true
        this.medidas=false
        break
      case 5:
        this.publicados = false
        this.sinpublicar = false
        this.promos = false
        this.sinonimos = false
        this.medidas=true
        break
      }
    },
    agregar(){
      this.dialog4 = true;
    },
    closearchivo(dato){ 
      if(dato == false){
        this.displayMsg = true;
        this.info = 'Se subio correctamente'
        this.color = 'success'
        this.y = 'top'   
        this.dialog4 = false;
        
      }else{
        this.displayMsg = true;
        this.info = 'Fallo al subir'
        this.color = 'success'
        this.y = 'top'   
        this.dialog4 = false;
        this.productos()
        this.cambio(2)
      }
      
      
    },
    closedatos(){
      this.dialog = false;
    },
    closeeditar(res){
      console.log('respuesta: ',res)
      if(res=='true'){
        console.log('true')
        this.dialog2 = false;
        this.productos()
      }else{
        console.log('false')
        this.dialog2 = false;
      }

    },
    closeeliminar(){
      this.dialog3 = false;
    },
    detalle(datos){
      this.info2=datos
      this.dialog=true
    },
    editar(datos){
      console.log('editar: ',datos)
      //this.info3.nombre=datos.nombre
      //this.info3.categoria=datos.categoria
      //this.info3.clave_interna=datos.clave_interna
      //this.info3.codigo=datos.codigo
      this.info3=datos
      this.dialog2=true
    },
    eliminar(datos){
      this.info2=datos
      this.dialog3=true
    },
    productos(){
      console.log('entro a productos')
      api.get(`/ad-productos/list`)
      .then(response => {
        console.log('correcto')
        // JSON responses are automatically parsed.
        this.items2 = []
        for(var i in response.data){
          if(response.data[i].status == 'PENDIENTE'){
            this.items2.push(response.data[i])
          }else{
            this.items.push(response.data[i])
            //this.lista2 = this.items
          }
        }
        
        //console.log(this.items);
      })
      .catch(e => {
        console.log('error de productos')
        this.errors.push(e)
      //  console.log("Error");
      //  console.log(e);
      })
    }
  },
created() {
    
    //alert(sessionStorage.getItem("dato"))
    //this.info = this.$route.params.info
    //alert("ejemplo "+this.info)
    //sessionStorage.setItem("content1","display:none")
    //sessionStorage.setItem("content2",null)
    //alert(this.content2)
    if(sessionStorage.getItem("dato")!=null){
      this.escrito=sessionStorage.getItem("dato")
    }else{
      this.escrito=''
    }
    this.productos()
    console.log('antes de sinonimos')
    this.lista_sinonimos()
    api.get(`/promociones/all`)
    .then(response => {
      // JSON responses are automatically parsed.
      for(var i=0; i<response.data.length; i++)
        this.items_promos.push(response.data[i].id_promo);

        
//          this.items_promos = response.data
      console.log(this.items_promos);
    })
    .catch(e => {
      this.errors.push(e)
    //  console.log("Error");
    //  console.log(e);
    })
    this.listamedidas();
}


}

</script>
