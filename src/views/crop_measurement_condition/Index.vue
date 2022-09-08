<template>
  <div>
    
    <v-card class="mb-3">
      <v-card-title>
        Plant Measurement Condition
      </v-card-title>
      <v-card-subtitle>
        List of Measurement
      </v-card-subtitle>
    </v-card>
     
     <v-card>
        <v-toolbar elevation="0">
            <v-toolbar-title>
                <a href="/crop-measurement-condition/create">    
                    <v-btn class="dense text-capitalize" color="primary">
                        <v-icon class="mr-3">mdi-plus</v-icon>
                        New Measurement
                    </v-btn>
                </a>
                
                <v-btn :to="{name:'cropMeasurementConditionTrash'}" color="green darken-1" class="white--text mx-5 text-capitalize" depressed>
                    <v-icon class="mr-3">mdi-trash-can-outline</v-icon>
                    Measurement Trash
                </v-btn>
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
            :items="measurements"
            :items-per-page="15"
            class="elevation-1"
        >

        <template v-slot:item.count="{item, index}">
            {{index+1}}
        </template>

        <template v-slot:item.crop.avatar="{ item }">
            <v-img :src="`http://localhost:8000/storage/${item.crop?.avatar}`" style="width: 75px; height:75px; padding: 3px;"/>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn :to="{name:'cropMeasurementConditionShow', params:{id: item.id}}" plain >
                <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn :to="{name:'cropMeasurementConditionEdit', params:{id: item.id}}" large plain color="green" >
                <v-icon>mdi-pencil-box-outline</v-icon>
            </v-btn>
            <v-btn @click="onDelete(item.id)" large plain color="red">
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
            measurements: [
                
            ],
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'count',
                },
                { text: 'Crop avatar', value: 'crop.avatar' },
                { text: 'Crop', value: 'crop.name' },
                { text: 'Temperature', value: 'temp' },
                { text: 'Humidity', value: 'humidity' },
                { text: 'Soil Moisture', value: 'soil_moisture' },
                { text: 'PH', value: 'ph' },
                { text: 'EC', value: 'ec' },
                { text: 'Actions', value: 'actions', sortable: false },
                
            ]
        }
    },
    mounted() {
        this.fetchData();
    },

    methods: {
        onDelete(id) {
            const token =  window.localStorage.getItem('accessToken');
            this.axios.delete('http://localhost:8000/api/measurement-condition/'+ id + '/delete', {
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
            this.axios.get('http://localhost:8000/api/measurement-condition', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })   
            .then(response => {
                console.log(response);
                this.measurements = response.data[0];
            })
            .catch(({response}) => {
                console.log(response);
            })
        }
    },
}
</script>

<style>

</style>