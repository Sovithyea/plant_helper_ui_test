<template>
  <div>
    
    <v-card class="mb-3">
      <v-card-title>
        Crop
      </v-card-title>
      <v-card-subtitle>
        List of crops in Trash
      </v-card-subtitle>
    </v-card>
     
     <v-card>
        <v-toolbar elevation="0">
            <v-toolbar-title>
                <a href="/crop" style="text-decoration: none;" class="ml-2">
          <v-btn outlined color="blue" style="text-transform: capitalize;"> 
            <v-icon>
              mdi-keyboard-backspace
            </v-icon>
            Back
          </v-btn>
        </a>
            </v-toolbar-title>
            
                <v-spacer></v-spacer>
            <v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-text-field
                    dense
                    class="mt-5"
                    label="Search..."
                    placeholder="Search..."
                    outlined
                ></v-text-field>
            </v-col>
        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="crops"
            :items-per-page="15"
            class="elevation-1"
        >
        
        <template v-slot:item.count="{item, index}">
            {{index+1}}
        </template>

        <template v-slot:item.image_path="{ item }">
            <img :src="`http://localhost:8000/storage/${item.avatar}`" style="width: 75px; height:75px; padding: 3px;"/>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn @click="onRecovery(item.id)" large plain color="green">
                <v-icon>mdi-undo</v-icon>
            </v-btn>
    
            <v-btn @click="onForceDelete(item.id)"  plain color="red">
                <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
        </template>
            

        </v-data-table>

     </v-card>
  </div>
</template>

<script>


export default {
    data() {
        return {
            crops: [
                
            ],
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'count',
                },
                { text: 'Avatar', value: 'image_path' },
                { text: 'Name', value: 'name' },
                { text: 'Sown Period (days)', value: 'sown' },
                { text: 'Harvest Period (days)', value: 'harvest' },
                { text: 'Expired Period (days)', value: 'expired' },
                { text: 'EC', value: 'measurement.ec' },
                { text: 'Soil Moisture', value: 'measurement.soil_moisture' },
                { text: 'Temperature', value: 'measurement.temp' },
                { text: 'Humidity', value: 'measurement.humidity' },
                { text: 'PH', value: 'measurement.ph'},
                { text: 'Actions', value: 'actions', sortable: false },
                
            ]
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        onRecovery(id) {
            const token =  window.localStorage.getItem('accessToken');
            this.axios.get('http://localhost:8000/api/crop/'+ id + '/recovery', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })   
            .then(response => {
                console.log(response);
                this.fetchData();
                this.$router.push({name: 'crop'});
            })
            .catch(({response}) => {
                console.log(response);
            })
        },


        onForceDelete(id) {
            const token =  window.localStorage.getItem('accessToken');
            this.axios.delete('http://localhost:8000/api/crop/'+ id + '/forceDelete', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })   
            .then(response => {
                console.log(response);
                this.fetchData();
                this.$router.push({name: 'crop'});
            })
            .catch(({response}) => {
                console.log(response);
            })
        },

        fetchData() {
            const token =  window.localStorage.getItem('accessToken');
            this.axios.get('http://localhost:8000/api/crop/trash', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })   
            .then(response => {
                console.log(response);
                this.crops = response.data[0];
            })
            .catch(({response}) => {
                console.log(response);
            })
        }
    }
}
</script>

<style>

</style>