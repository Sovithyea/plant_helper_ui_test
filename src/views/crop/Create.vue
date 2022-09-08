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

        <v-form @submit.prevent="createCrop" lazy-validation ref="form" enctype="multipart/form-data" class="mt-5">

            
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
                    label="File input"
                    outlined
                    counter
                    v-model="form.image"
                    prepend-inner-icon="mdi-camera"
                    prepend-icon=""
                ></v-file-input>

            </v-col>

            <v-btn type="submit" style="text-transform: capitalize;" color="green" class="white--text ml-6 mb-10">
                Create crops
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
                image: null,
                name: null,
                sown: null,
                harvest: null,
                expired: null,

            }
        }
    },

    methods: {
            onChange(e) {
                this.form.image = e.target.files[0];
            },
            createCrop(e) {
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
            
                    this.axios.post('http://localhost:8000/api/crop/create', data, config)
                        .then(function (res) {
                            existingObj.success = res.data.success;
                            existingObj.$router.push({name: 'crop'});
                        })
                        .catch(function (err) {
                            existingObj.output = err;
                        });
                }
            }
        }
}
</script>

<style>

</style>