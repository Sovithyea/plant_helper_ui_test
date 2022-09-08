<template>
  <div>
    <v-card class="mb-3" elevation="0.5">
      <v-card-title>
        Crops problem
      </v-card-title>
      <v-card-subtitle>
        View crops problem
      </v-card-subtitle>
    </v-card>
  
    <v-card elevation="1" class="my-5"> 
      <v-card-subtitle>
        <a href="/crop-disease" style="text-decoration: none;" class="ml-2">
          <v-btn outlined color="blue" style="text-transform: capitalize;"> 
            <v-icon>
              mdi-keyboard-backspace
            </v-icon>
            Back
          </v-btn>
        </a>

        <v-btn :to="{name:'cropDiseaseEdit', params:{id: id}}" color="orange accent-3" class="white--text mx-5 text-capitalize" depressed >
          <v-icon>mdi-pencil-box-outline</v-icon>
          Edit crop problems
        </v-btn>
      </v-card-subtitle>

      <v-card-subtitle>
          Thumbnail 
          <v-divider class="my-5"/>
          <v-card-title>
            Disease name: {{disease.name}}
          </v-card-title>
        </v-card-subtitle>
        <v-card-text class="text-center">
          <v-avatar style="width: 256px; height: 256px;" rounded="0">
            <v-img :src="`http://localhost:8000/storage/${disease.avatar}`"/>
          </v-avatar>
          <v-divider class="mt-10"/>
        </v-card-text>
        <v-card-subtitle>
          Thumbnail
          <v-divider class="my-5"/>
          <v-card-title>
            Active on crop: {{disease.crop.name}}
          </v-card-title>
        </v-card-subtitle>
        <v-card-text class="text-center">
          <v-avatar style="width: 256px; height: 256px;" rounded="0">
            <v-img :src="`http://localhost:8000/storage/${disease.crop.avatar}`"/>
          </v-avatar>
        </v-card-text>
      </v-card>
      <v-card elevation="1">
      <v-card-text class="blue-grey lighten-5">
        
        <v-list-item-content>
          <v-list-item-subtitle class="font-weight-bold primary--text my-2">
              Diagnosis
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <span v-html="disease.diagnosis"></span>
            </v-list-item-subtitle>

            <v-divider class="my-5"/>

          <v-list-item-subtitle class="font-weight-bold primary--text my-3">
              Cause
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <span v-html="disease.cause"></span>
            </v-list-item-subtitle>

            <v-divider class="my-5"/>

            <v-list-item-subtitle class="font-weight-bold primary--text my-3">
              Recomment Solution
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <span v-html="disease.solution"></span>
            </v-list-item-subtitle>
        </v-list-item-content>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disease: null,
    }
  },
  props: [
    'id'
  ],
  mounted() {
    const token =  window.localStorage.getItem('accessToken');
    this.axios.get('http://localhost:8000/api/crop-disease/'+ this.id + '/show', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },    
    })
    .then(res => {
      console.log(res);
      this.disease = res.data[0];
    })
    .catch(({res}) => {
      console.log(res);
    })
    .finally(() => {

    })
  },
}
</script>

<style>

</style>