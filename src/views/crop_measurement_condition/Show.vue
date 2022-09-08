<template>
  <div>
    
    <v-card class="mb-3">
      <v-card-title>
        Crop Measurement
      </v-card-title>
      <v-card-subtitle>
        View Crop Measurement
      </v-card-subtitle>
    </v-card>

    <v-card>

      <v-card-subtitle>
        <a href="/crop-measurement-condition" style="text-decoration: none;" class="ml-2">
          <v-btn outlined color="blue" style="text-transform: capitalize;"> 
            <v-icon>
              mdi-keyboard-backspace
            </v-icon>
            Back
          </v-btn>
        </a>
      </v-card-subtitle>
      <v-row class="my-3">
        <v-col lg="4" cols="12" class="px-5 text-center">
            <v-list>
              <v-list-item-avatar style="width: 256px; height: 256px;">
                <v-img :src="`http://localhost:8000/storage/${measurement.crop.avatar}`" alt=""/>
              </v-list-item-avatar>
              <p class="font-weight-bold">{{measurement.crop.name}}</p>
              <v-btn :to="{name:'cropMeasurementConditionEdit', params:{id: id}}" color="orange accent-3" class="white--text mx-5 text-capitalize" depressed >
                Edit Crop Measurement
              </v-btn>
            </v-list>
        </v-col>
        <v-col lg="8" cols="12" class="px-5">

          <v-subheader>
            Crops Measurement Condition Information
            <v-divider/>
          </v-subheader>
  
          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              Temperature
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{measurement.temp}} °C
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              Humidity
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{measurement.humidity}} %
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              Soil moisture
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{measurement.soil_moisture}}
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              PH
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{measurement.ph}}
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              EC
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{measurement.ec}}
            </v-col>
          </v-row>



        </v-col>
      </v-row>
    </v-card>






    <!-- Crop Show ! {{id}}
    <p>{{crop.name}}</p>
    <img :src="`http://localhost:8000${crop.image_path}`" alt="">
    <p>{{crop.sown}}</p>
    <p>{{crop.harvest}}</p>
    <p>{{crop.expired}}</p> -->
  </div>
</template>

<script>
export default {
  props: [
    'id'
  ],
  data() {
    return {
      measurement: {

      },
    }
  },
  mounted() {
    const token =  window.localStorage.getItem('accessToken');
    this.axios.get('http://localhost:8000/api/measurement-condition/'+ this.id + '/show', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },    
    })
    .then(res => {
      console.log(res);
      this.measurement = res.data[0];
    })
    .catch(({res}) => {
      console.log(res);
    })
    .finally(() => {

    })
  }


  // watch: {
  //   'id': {
  //     handler(value)
  //     {
  //       this.axios.get('http:localhost:8000/api/crop/'+ this.id + '/show')
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(({res}) => {
  //         console.log(res);
  //       })
  //       .finally(() => {

  //       })
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // }
}
</script>

<style>

</style>