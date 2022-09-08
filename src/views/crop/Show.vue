<template>
  <div>
    
    <v-card class="mb-3">
      <v-card-title>
        Crops
      </v-card-title>
      <v-card-subtitle>
        View crops
      </v-card-subtitle>
    </v-card>

    <v-card>

      <v-card-subtitle>
        <a href="/crop" style="text-decoration: none;" class="ml-2">
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
                <v-img :src="`http://localhost:8000/storage/${crop?.avatar}`" alt=""/>
              </v-list-item-avatar>
              <p class="font-weight-bold">{{crop.name}}</p>
              <v-btn :to="{name:'cropEdit', params:{id: id}}" color="orange accent-3" class="white--text mx-5 text-capitalize" depressed >
                Edit crops
              </v-btn>
            </v-list>
        </v-col>
        <v-col lg="8" cols="12" class="px-5">

          <v-subheader>
            Crops Information
            <v-divider/>
          </v-subheader>
          <v-row class="mx-1 mt-5">
            <v-col sm="5" lg="4" xl="3" cols="5">
              Sown Period (days)
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{crop.sown}}
            </v-col>
          </v-row>

          <v-row class="mx-1">
            <v-col sm="5" lg="4" xl="3" cols="5">
              Harvest Period (days)
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{crop.harvest}}
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              Expired Period (days)
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{crop.expired}}
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              Temperature
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{crop.measurement?.temp}} °C
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              Humidity
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{crop.measurement?.humidity}} %
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              Soil moisture
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{crop.measurement?.soil_moisture}}
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              PH
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{crop.measurement?.ph}}
            </v-col>
          </v-row>

          <v-row class="mx-1"> 
            <v-col sm="5" lg="4" xl="3" cols="5">
              EC
            </v-col>
            <v-col sm="7" lg="8" xl="9" cols="7">
              {{crop.measurement?.ec}}
            </v-col>
          </v-row>



        </v-col>
      </v-row>
    </v-card>

    
    <v-card class="mb-3">
      <v-card-title>
        {{crop.name}} Disease List
        <v-spacer/>
        
        <v-btn :to="{name:'cropDiseaseCreate'}" color="red accent-3" class="white--text mx-5" depressed>
          <v-icon class="pr-3">mdi-virus</v-icon>
          New Disease
        </v-btn>
      </v-card-title>

    </v-card>


    <v-card>

      <v-data-table
            :headers="headers"
            :items="crop.disease"
            :items-per-page="15"
            class='height="20" elevation-1'
        >

        <template v-slot:item.count="{item, index}">
            {{index+1}}
        </template>

        <template v-slot:item.avatar="{ item }">
            <v-img :src="`http://localhost:8000/storage/${item?.avatar}`" style="width: 75px; height:75px; padding: 3px;"/>
        </template>

        <template v-slot:item.diagnosis="{ item }">
            <span v-html="item.diagnosis"></span>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn :to="{name:'cropDiseaseShow', params:{id: item.id}}" plain >
                <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn :to="{name:'cropDiseaseEdit', params:{id: item.id}}" large plain color="green" >
                <v-icon>mdi-pencil-box-outline</v-icon>
            </v-btn>
            <v-btn @click="onDelete(item.id)" large plain color="red">
                <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
        </template>
            

        </v-data-table>



    </v-card>

    <!-- {{crop.disease}} -->



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
      crop: {

      },
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'count',
        },
        { text: 'Avatar', value: 'avatar' },
        { text: 'Name', value: 'name' },
        { text: 'Diagnosis', value: 'diagnosis' },
        { text: 'Actions', value: 'actions', sortable: false },
                
      ]
    }
  },
  methods: {
    onDelete(id) {
            const token =  window.localStorage.getItem('accessToken');
            this.axios.delete('http://localhost:8000/api/crop-disease/'+ id + '/delete', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })   
            .then(response => {
                console.log(response);
                this.fetchData();
            })
            .catch(({response}) => {
                console.log(response);
            })
        },

        fetchData() {
          const token =  window.localStorage.getItem('accessToken');
          this.axios.get('http://localhost:8000/api/crop/'+ this.id + '/show', {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token
            },    
          })
          .then(res => {
            console.log(res);
            this.crop = res.data[0];
          })
          .catch(({res}) => {
            console.log(res);
          })
          .finally(() => {

          })
        }
  },  
  mounted() {
    this.fetchData();
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