<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >

    <v-layout wrap>
      <h1>Bienvenido al Administrador REFACE!</h1>
      <h2>Estadísticas de compra/venta por usuario y productos</h2>

      <v-flex
        md12
        sm12
        text-align="center"
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Compras por cliente"
          text="Cliente Menor Monto En Compras"
        >
        
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              <br>
              <charts-data chartId="main-chart-01" 
                class="chart-wrapper" 
                height="300" 
                :chart-data="chartData2"  
                :min="min">
              </charts-data>
            </v-card>
          </v-flex>
        </material-card>
      </v-flex>
      <v-flex
        md12
        sm12
        text-align="center"
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Compras por cliente"
          text="Cliente Mayor Monto En Compras"
        >
        
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              <br>
              <charts-data chartId="main-chart-01" 
                class="chart-wrapper" 
                height="300" 
                :chart-data="chartData3"  
                :min="min">
              </charts-data>
            </v-card>
          </v-flex>
        </material-card>
      </v-flex>
      <v-flex
        md12
        sm12
        text-align="center"
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Compras por cliente"
          text="Cliente Menos Compras"
        >
        
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              <br>
              <charts-data chartId="main-chart-01" 
                class="chart-wrapper" 
                height="300" 
                :chart-data="chartData5"  
                :min="min">
              </charts-data>
            </v-card>
          </v-flex>
        </material-card>
      </v-flex>
      <v-flex
        md12
        sm12
        text-align="center"
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Compras por cliente"
          text="Cliente Más Compras"
        >
        
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              <br>
              <charts-data chartId="main-chart-01" 
                class="chart-wrapper" 
                height="300" 
                :chart-data="chartData6"  
                :min="min">
              </charts-data>
            </v-card>
          </v-flex>
        </material-card>
      </v-flex>
      <v-flex
        md12
        sm12
        text-align="center"
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Ventas por producto"
          text="Productos menos vendidos"
        >
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              <br>
              <charts-data chartId="main-chart-01" 
                        class="chart-wrapper" 
                        height="300" 
                        :chart-data="chartData"  
                        :min="min">
              </charts-data>
            </v-card>
          </v-flex>
        
        </material-card>
      </v-flex>
      <v-flex
        md12
        sm12
        text-align="center"
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Ventas por producto"
          text="Productos más vendidos"
        >
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              <br>
              <charts-data chartId="main-chart-01" 
                        class="chart-wrapper" 
                        height="300" 
                        :chart-data="chartData4"  
                        :min="min">
              </charts-data>
            </v-card>
          </v-flex>
        
        </material-card>
      </v-flex>
      <v-flex
        md12
        sm12
        text-align="center"
      >
        <material-card
          color="rgb(21, 45, 91)"
          title="Categorías por Ventas"
          text="Categorias más vendidas"
        >
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              <br>
              <charts-data chartId="main-chart-01" 
                        class="chart-wrapper" 
                        height="300" 
                        :chart-data="chartDataCatego"  
                        :min="min">
              </charts-data>
            </v-card>
          </v-flex>
        
        </material-card>
        <material-card
          color="rgb(21, 45, 91)"
          title="Devoluciones"
          text="Devoluciones por fechas"
        >
          <v-layout  wrap row>
            <v-flex xs2 sm2 md2 lg2 xl12 > 
            </v-flex>
            <v-flex xs3 sm3 md3 lg3 xl12 > 
              <v-dialog 
                    ref="dialog1"
                    v-model="modal"
                    :return-value.sync="fecha"
                    persistent
                    lazy
                    full-width
                    width="290px">
                      <v-text-field
                        :value = "date"
                        item-value ="date"
                        slot="activator"
                        outline
                        v-model="fecha"
                        label="Fecha Inicio"
                        name="date_sale"
                        prepend-icon="mdi-calendar"
                        readonly>
                      </v-text-field>
                      <v-date-picker :value = "date" v-model="fecha" scrollable locale="es-MX">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false"> Cancel </v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog1.save(fecha)"> OK </v-btn>
                      </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs3 sm3 md3 lg3 xl12 > 
              <v-dialog 
                ref="dialog2"
                v-model="modal2"
                :return-value.sync="fecha2"
                persistent
                lazy
                full-width
                width="290px">
                  <v-text-field
                    :value = "date2"
                    item-value ="date"
                    slot="activator"
                    outline
                    v-model="fecha2"
                    label="Fecha Final"
                    name="date_sale"
                    prepend-icon="mdi-calendar"
                    readonly>
                  </v-text-field>
                  <v-date-picker :value = "date2" v-model="fecha2" scrollable locale="es-MX">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal2 = false"> Cancel </v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog2.save(fecha2)"> OK </v-btn>
                  </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs2 sm2 md2 lg2 xl12 > 
              <v-btn @click="search" icon color="lighten-3"> <v-icon>mdi-magnify</v-icon> </v-btn>
            </v-flex>
            <v-flex xs2 sm2 md2 lg2 xl12 > 
            </v-flex>
          </v-layout>
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              <v-card-title style="color:black;text-align:center;">Devoluciones</v-card-title>
              <br>
              <charts-data chartId="main-chart-01" 
                        class="chart-wrapper" 
                        height="300" 
                        :chart-data="chartDataDev"  
                        :min="min">
              </charts-data>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12 >            
            <v-card>
              
              <v-card-title style="color:black;text-align:center;">Garantías</v-card-title>
              <br>
              <charts-data chartId="main-chart-01" 
                        class="chart-wrapper" 
                        height="300" 
                        :chart-data="chartDataGar"  
                        :min="min">
              </charts-data>
            </v-card>
          </v-flex>
        </material-card>
      </v-flex>
      
    </v-layout>

  </v-container>
</template>

<script>
import chartsData from '@/components/core/chartsData';
import chartsDatas from '@/components/core/chartsData2';
import {api} from '@/api'
export default {
  components: {
        chartsData,
        chartsDatas
  },
  data () {
    return {
      dailySalesChart: {
        data: {
          labels: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'],
          series: [
            [5000, 8000, 10000, 9000, 7500, 1850, 3800]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 15000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['Bujía', 'Sensor', 'Balata', 'Suspension', 'Resorte'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {//diseño de la grafica
        data: {
          labels: [],
          series: []
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      headers: [
        {
          sortable: false,
          text: 'Cliente',
          value: 'nombre'
        },
        {
          sortable: false,
          text: 'Email',
          value: '_id'
        },
        {
          text: 'Total',
          value: 'total',
          align: 'right'
        }
      ],
      headers2: [
        {
          sortable: false,
          text: 'Clave de producto',
          value: '_id'
        },
        {
          sortable: false,
          text: 'Nombre',
          value: 'nombre'
        },
        {
          text: 'Cantidad de productos vendidos',
          value: 'cantidades',
          align: 'right'
        }
      ],
      items: [],
      items2: [],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      },
      srvResponse: null,
      srvResponse2: null,
      srvResponse3: null,
      srvResponse4: null,
      srvResponse5: null,
      srvResponse6: null,
      srvdevoluciones: null,
      valuesTempDev: null,
      labelsTempDev: null,
      chartDataDev: null,
      srvgarantias: null,
      valuesTempGar: null,
      labelsTempGar: null,
      chartDataGar: null,
      valuesTemp: null,
      labelsTemp: null,
      valuesTemp2: null,
      labelsTemp2: null,
      valuesTemp3: null,
      labelsTemp3: null,
      valuesTemp4: null,
      labelsTemp4: null,
      valuesTemp5: null,
      labelsTemp5: null,
      valuesTemp6: null,
      labelsTemp6: null,
      datossTabla: [],
      chartData: null,
      chartData2: null,
      chartData3: null,
      chartData4: null,
      chartData5: null,
      chartData6: null,
      min : 0,
      categorias:[],
      srvResponseCatego:null,
      chartDataCatego:null,
      colores:[
        '#8D0D30',//violeta
        '#1E995F',//verde chido
        '#CC2D29', //rojo medio opaco 
        '#8C8C90',//gris
        '#7727B3',//morado
        '#262626', //gris-negro
        '#CC7476',//rosita cute
        '#242d3c',//azul oscuro
        '#B38E29', //doradito
        '#C44536', //salmón
        '#3EACFF',//azulito cute
        '#3DFD9D',//verde laguna jajaj
        'orange', 
        'green',
        '#CC2D29', //rojo medio opaco 
        '#8C8C90',//gris
        '#7727B3',//morado
        '#262626', //gris-negro
        '#CC7476',//rosita cute
        '#242d3c',//azul oscuro
        '#B38E29', //doradito
        '#C44536', //salmón
        '#3EACFF',//azulito cute
        '#3DFD9D',//verde laguna jajaj
        'orange', 
        'green',
        'orange', 
        'green',
        '#CC2D29', //rojo medio opaco 
        '#8C8C90',//gris
        '#7727B3'//morado
      ],
      modal:null,
      modal2:null,
      fecha:null,
      fecha2:null,
      dialog1:null,
      dialog2:null,
      date:null,
      date2:null

    }
    
  },
  methods: {
    search(){
      var fechas = {
        fecha : this.fecha,
        fecha2 : this.fecha2
      }
      api.post(`/ad-devoluciones/por-fecha-d`,fechas)
      //api.get(`/ad-devoluciones/por-fecha-d`)
      .then(response => {
          if(response.data.success == true){
            this.srvdevoluciones = response.data.data
            this.createChartDev()
            console.log('correcto: ',this.srvdevoluciones)
          }else{
            console.log('incorrecto')
          }
      })
      .catch(e => {

        console.log("Error");

      });
      api.post(`/ad-devoluciones/por-fecha-g`,fechas)
      //api.get(`/ad-devoluciones/por-fecha-g`)
      .then(response => {
          if(response.data.success == true){
            this.srvgarantias = response.data.data
            this.createChartGar()
            console.log('correcto: ',this.srvgarantias)
          }else{
            console.log('incorrecto')
          }
      })
      .catch(e => {

        console.log("Error");

      });
    },
    createChartDev(){
      this.valuesTempDev = []
      this.labelsTempDev = []
      console.log('resultado: ',this.srvdevoluciones)
      
      for (var i = 0; i < this.srvdevoluciones.length; i++){
          this.labelsTempDev[i] = this.srvdevoluciones[i]._id[0]
          if (this.srvdevoluciones[i].cant != null && this.srvdevoluciones[i].cant >= 0){
              this.valuesTempDev[i] = this.srvdevoluciones[i].cant
          }
      }

      this.chartDataDev = {
          labels : this.labelsTempDev,
          datasets: [
              {
                  label: ["Fecha "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTempDev,
              }
          ],
      }
      console.log('grafica: ', this.chartDataDev)
    },
    createChartGar(){
      this.valuesTempGar = []
      this.labelsTempGar = []
      console.log('resultado: ',this.srvgarantias)
      
      for (var i = 0; i < this.srvgarantias.length; i++){
          this.labelsTempGar[i] = this.srvgarantias[i]._id[0]
          if (this.srvgarantias[i].cant != null && this.srvgarantias[i].cant >= 0){
              this.valuesTempGar[i] = this.srvgarantias[i].cant
          }
      }

      this.chartDataGar = {
          labels : this.labelsTempGar,
          datasets: [
              {
                  label: ["Fecha "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTempGar,
              }
          ],
      }
      console.log('grafica: ', this.chartDataGar)
    },
    createChart(){
      this.valuesTemp = []
      this.labelsTemp = []
      console.log('resultado: ',this.srvResponse)
      
      for (var i = 0; i < this.srvResponse.length; i++){
          this.labelsTemp[i] = this.srvResponse[i].nombre[0].split("=")[0].substring(0,15)
          if (this.srvResponse[i].cantidades != null && this.srvResponse[i].cantidades >= 0){
              this.valuesTemp[i] = this.srvResponse[i].cantidades
          }
      }

      this.chartData = {
          labels : this.labelsTemp,
          datasets: [
              {
                  label: ["Cantidad "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTemp,
              }
          ],
      }
    },
    createChart4(){
      this.valuesTemp4 = []
      this.labelsTemp4 = []
      console.log('resultado: ',this.srvResponse4)
      
      for (var i = 0; i < this.srvResponse4.length; i++){
          this.labelsTemp4[i] = this.srvResponse4[i].nombre[0].split("=")[0].substring(0,15)
          if (this.srvResponse4[i].cantidades != null && this.srvResponse4[i].cantidades >= 0){
              this.valuesTemp4[i] = this.srvResponse4[i].cantidades
          }
      }

      this.chartData4 = {
          labels : this.labelsTemp4,
          datasets: [
              {
                  label: ["Cantidad "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTemp4,
              }
          ],
      }
    },
    createChart5(){
      this.valuesTemp5 = []
      this.labelsTemp5 = []
      console.log('resultado5: ',this.srvResponse5)
      
      for (var i = 0; i < this.srvResponse5.length; i++){
          this.labelsTemp5[i] = this.srvResponse5[i].nombre[0]
          if (this.srvResponse5[i].count != null && this.srvResponse5[i].count >= 0){
              this.valuesTemp5[i] = this.srvResponse5[i].count
          }
      }

      this.chartData5 = {
          labels : this.labelsTemp5,
          datasets: [
              {
                  label: ["Cantidad "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTemp5,
              }
          ],
      }
    },
    createChart6(){
      this.valuesTemp6 = []
      this.labelsTemp6 = []
      console.log('resultado6: ',this.srvResponse6)
      
      for (var i = 0; i < this.srvResponse6.length; i++){
          this.labelsTemp6[i] = this.srvResponse6[i].nombre[0]
          if (this.srvResponse6[i].count != null && this.srvResponse6[i].count >= 0){
              this.valuesTemp6[i] = this.srvResponse6[i].count
          }
      }

      this.chartData6 = {
          labels : this.labelsTemp6,
          datasets: [
              {
                  label: ["Cantidad "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTemp6,
              }
          ],
      }
    },
    createChart2(){
      this.valuesTemp2 = []
      this.labelsTemp2 = []
      console.log('resultado2: ',this.srvResponse2)
      
      for (var i = 0; i < this.srvResponse2.length; i++){
          this.labelsTemp2[i] = this.srvResponse2[i].nombre[0]
          if (this.srvResponse2[i].total_compra != null && this.srvResponse2[i].total_compra >= 0){
              this.valuesTemp2[i] = this.srvResponse2[i].total_compra
          }
      }

      this.chartData2 = {
          labels : this.labelsTemp2,
          datasets: [
              {
                  label: ["Total Compra "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTemp2,
              }
          ],
      }
    },
    createChart3(){
      this.valuesTemp3 = []
      this.labelsTemp3 = []
      console.log('resultado2: ',this.srvResponse2)
      
      for (var i = 0; i < this.srvResponse3.length; i++){
          this.labelsTemp3[i] = this.srvResponse3[i].nombre[0]
          if (this.srvResponse3[i].total_compra != null && this.srvResponse3[i].total_compra >= 0){
              this.valuesTemp3[i] = this.srvResponse3[i].total_compra
          }
      }

      this.chartData3 = {
          labels : this.labelsTemp3,
          datasets: [
              {
                  label: ["Total Compra "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTemp3,
              }
          ],
      }
    },
    createChartCategorias(){
      this.valuesTempCatego = []
      this.labelsTempCatego = []
      console.log('resultado2: ',this.srvResponse2)
      
      for (var i = 0; i < this.categorias.length; i++){
          this.labelsTempCatego[i] = this.categorias[i]._id[0]
          if (this.categorias[i].cant != null && this.categorias[i].cant >= 0){
              this.valuesTempCatego[i] = this.categorias[i].cant
          }
      }

      this.chartDataCatego = {
          labels : this.labelsTempCatego,
          datasets: [
              {
                  label: ["Total Compra "],//this.selectChart,
                  backgroundColor: this.colores,
                  data: this.valuesTempCatego,
              }
          ],
      }
    },
    complete (index) {
      this.list[index] = !this.list[index]
    }
  },
  created() {    
      this.info = this.$route.params.info
      if(sessionStorage.getItem("dato")!=null){
        this.escrito=sessionStorage.getItem("dato")
      }else{
        this.escrito=''
      }

      api.get(`/ad-compras/mejores-compradores`)
      .then(response => {
          console.log(response.data)
          //this.items = response.data;
          
          this.srvResponse2 = response.data;
          this.createChart2()
          this.srvResponse5 = response.data;
          this.createChart5()
      })
      .catch(e => {

        console.log("Error");

      });
      
      api.get(`/ad-compras/mejores-compradores2`)
      .then(response => {
          console.log(response.data)
          //this.items = response.data;
          
          this.srvResponse3 = response.data;
          this.createChart3()
          this.srvResponse6 = response.data;
          this.createChart6()
      })
      .catch(e => {

        console.log("Error");

      });

      
      api.get('/ad-compras/productos-mas-vendidos')
      .then(response=>{
          this.srvResponse = response.data
          
          this.createChart()
      }).catch(error=>{
          console.log(error)
      })
      api.get('/ad-compras/productos-mas-vendidos2')
      .then(response=>{
          this.srvResponse4 = response.data
          
          this.createChart4()
      }).catch(error=>{
          console.log(error)
      })
      api.get('/ad-compras/categorias-mas-vendidas')
      .then(response=>{
          this.categorias = response.data
          console.log('categorias: ',this.categorias)
          this.createChartCategorias()
      }).catch(error=>{
          console.log(error)
      })
  }
}
</script>
