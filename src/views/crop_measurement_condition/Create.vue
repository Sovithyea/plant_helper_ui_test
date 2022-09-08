<template>
  <div>

    <v-card class="mb-3">
      <v-card-title>
        Diseases
      </v-card-title>
      <v-card-subtitle>
        Fill the below form to create new disease.
      </v-card-subtitle>
    </v-card>

    <v-card>
        <v-toolbar elevation="0">
            <a href="/crop-measurement-condition" style="text-decoration: none;" class="ml-1 mt-3">
                <v-btn outlined color="blue" style="text-transform: capitalize;"> 
                    <v-icon>
                        mdi-keyboard-backspace
                    </v-icon>
                    Back
                </v-btn>
            </a>
        </v-toolbar>

      <v-form @submit.prevent="createMeasurement" lazy-validation ref="form">
          <v-card-text>
             <v-col class="pr-13 ml-3">
              <v-select
                label="Crop"
                v-model="form.crop_id"
                :items="crops"
                item-value="id"
                item-text="name"
                outlined
                :rules="[v => !!v || 'Please Select Crop']"
              >
              </v-select>
            </v-col>
            
            <v-col lg="12" cols="12" class="pr-13 ml-3">    
              <v-text-field 
                type="number"
                label="Temperature"
                outlined
                v-model="form.temp"
                clearable

              />
            </v-col>

            <v-row class="pr-10 ml-3">
              <v-col lg="6" cols="12">    
                <v-text-field 
                  type="number"
                  label="Soil Moisture"
                  outlined
                  clearable
                  v-model="form.soil_moisture"

                />
              </v-col>

              <v-col lg="6" cols="12">
                <v-text-field
                  type="number"
                  label="Humidity"
                  outlined
                  clearable
                  v-model="form.humidity"
 
                />
              </v-col>
            </v-row>

            <v-row class="pr-10 ml-3">
              <v-col lg="6" cols="12">    
                <v-text-field 
                  type="number"
                  label="PH"
                  outlined
                  clearable
                  v-model="form.ph"

                />
              </v-col>

              <v-col lg="6" cols="12">
                <v-text-field
                  type="number"
                  label="EC"
                  outlined
                  clearable
                  v-model="form.ec"

                />
              </v-col>
            </v-row>
          </v-card-text>
          
         <v-btn type="submit" style="text-transform: capitalize;" color="green" class="white--text ml-10 mb-10">
                Create Crop Measurement
            </v-btn>  
        </v-form>

    </v-card>

  </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                ph: null,
                ec: null,
                temp: null,
                humidity: null,
                soil_moisture: null,
                crop_id: null
            },
            crops: [
              
            ]
        }
    },

    methods: {
            createMeasurement() {
              const token =  window.localStorage.getItem('accessToken')
                if(this.$refs.form.validate()) {
                  this.axios.post('http://localhost:8000/api/measurement-condition/create', this.form, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                  })
                  .then(res => {
                    console.log(res);
                    this.$router.push({name: 'cropMeasurementCondition'});
                  })
                  .catch(({res}) => {
                    console.log(res);
                  })
                }
              },
        getText: (item) => `${item.name}`,
    },
    
    mounted() {
        const token =  window.localStorage.getItem('accessToken');
            this.axios.get('http://localhost:8000/api/measurement-condition/create', {
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
</script>

<style>

  .ck-editor__editable_inline {
    min-height: 200px;
  }

</style>