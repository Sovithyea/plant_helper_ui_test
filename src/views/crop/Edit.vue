<template>
  <div>

    <v-card class="mb-3">
      <v-card-title>
        Crops
      </v-card-title>
      <v-card-subtitle>
        Fill the below form to create new crop.
      </v-card-subtitle>
    </v-card>

    <v-card>
        <v-toolbar>
            <a href="/crop" style="text-decoration: none;" class="ml-2">
                <v-btn outlined color="blue" style="text-transform: capitalize;"> 
                    <v-icon>
                        mdi-keyboard-backspace
                    </v-icon>
                    Back
                </v-btn>
            </a>
        </v-toolbar>

        <v-form @submit.prevent="updateCrop" lazy-validation ref="form" enctype="multipart/form-data" class="mt-5">
          <v-card>
            <v-card-subtitle>
              Thumbnail
              <v-divider class="my-5"/>
            </v-card-subtitle>
            <v-card-text class="text-center">
              <v-avatar style="width: 256px; height: 256px;">
                <v-img :src="`http://localhost:8000/storage/${form.avatar}`"/>
              </v-avatar>
            </v-card-text>
          </v-card>
            
            <v-row class="mx-3 mt-10">
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Crop name']"
                        v-model="form.name"
                        label="Crop Name"
                        outlined
                        clearable
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Sown period']"
                        v-model="form.sown"
                        label="Sown Period (days)"
                        outlined
                        clearable
                        type="number"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mx-3">
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Harvest period']"
                        v-model="form.harvest"
                        label="Harvest Period (days)"
                        outlined
                        clearable
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Expired Period']"
                        v-model="form.expired"
                        label="Expired Period (days)"
                        outlined
                        clearable
                        type="number"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-col  cols="12" md="12" class="ml-3 pr-10">

                <v-file-input
                    label="Enter new Image"
                    outlined
                    counter
                    v-model="form.image"
                    prepend-inner-icon="mdi-camera"
                    prepend-icon=""
                ></v-file-input>

            </v-col>

            <v-btn type="submit" style="text-transform: capitalize;" color="green" class="white--text ml-6 mb-10">
                Update crops
            </v-btn>

            
        </v-form>
    </v-card>








    <!-- Edit Crop!
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
      form: {

      },

    }
  },

  methods: {
    onChange(e) {
      this.form.image = e.target.files[0];
    },
    updateCrop(e) {
      // console.log(this.form);
      if(this.$refs.form.validate()) {

        e.preventDefault();
        let existingObj = this;
        const token =  window.localStorage.getItem('accessToken')
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          params: {
            '_method': 'PATCH'
          }
        }
                
    let data = new FormData();
    if(this.form.image)
    {
      data.append('image', this.form.image);
    }
    data.append('name', this.form.name);
    data.append('sown', this.form.sown);
    data.append('harvest', this.form.harvest);
    data.append('expired', this.form.expired);
    
    this.axios.post('http://localhost:8000/api/crop/'+ this.form.id + '/update', data, config)
    .then(function (res) {
      existingObj.success = res.data.success;                            
      existingObj.$router.push({name: 'crop'});                                                    
    })
    .catch(function (err) {
        existingObj.output = err;                            
      });
    }
  }
},

  mounted() {
    const token =  window.localStorage.getItem('accessToken');
    this.axios.get('http://localhost:8000/api/crop/'+ this.id + '/edit', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },    
    })
    .then(res => {
      this.form = res.data[0];
    })
    .catch(({res}) => {
    
    })
    .finally(() => {

    })
  }
}
</script>

<style>

</style>