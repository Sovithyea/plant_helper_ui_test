<template>
  <div>
    <v-card class="mb-3">
      <v-card-title>
        Setting
      </v-card-title>
    </v-card>
    <v-card class="mb-3">
      <v-card-title class="ml-2">
        {{form.username}}
      </v-card-title>
    </v-card>
    <v-card elevation="1">
      <v-form @submit.prevent="updateAuthUser" lazy-validation ref="form" enctype="multipart/form-data" class="mt-5">
          <v-card class="mb-10 elevation-0">
            <v-card-subtitle>
              Avatar
              <v-divider class="my-5"/>
            </v-card-subtitle>
            <v-card-text class="text-center pb-13">              
                <v-img style="width: 256px; height: 256px; margin: auto;" :src="`http://localhost:8000/storage/${form.avatar}`"/>
            </v-card-text>
          </v-card>
            
            <v-row class="mx-3">
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter First Name']"
                        v-model="form.first_name"
                        label="First Name"
                        outlined
                        clearable
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Last Name']"
                        v-model="form.last_name"
                        label="Last Name"
                        outlined
                        clearable
                    ></v-text-field>
                </v-col>
            </v-row>            

     

              <v-col
                  cols="6"
                  sm="12"
                  class="mx-3 pr-9"
                >
                  <v-text-field
                    :rules="[v => !!v || 'Please enter Username']"
                    v-model="form.username"
                    label="Username"
                    outlined
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="12"
                    class="mx-3 pr-9"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Email']"
                        v-model="form.email"
                        label="Email"
                        outlined
                        clearable
                        type="email"
                    ></v-text-field>
                </v-col>


            <v-row class="mx-3">
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Phone Number']"
                        v-model="form.phone_number"
                        label="Phone Number"
                        outlined
                        clearable
                        type="number"
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-select
                    label="Gender"
                    v-model="form.gender"
                    :items="genders"
                    item-value="value"
                    item-text="label"
                    outlined
                  >
              </v-select>
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
                Update users
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

      },
      genders: [
        {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Female',
          value: 'female'
        }
      ],
    }
  },
  methods: {
    onChange(e) {
      this.form.image = e.target.files[0];
    },
    updateAuthUser(e) {
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
    data.append('first_name', this.form.first_name);
    data.append('last_name', this.form.last_name);
    data.append('username', this.form.username);
    data.append('email', this.form.email);
    data.append('phone_number', this.form.phone_number);
    data.append('gender', this.form.gender);
    if(this.form.image)
    {
      data.append('image', this.form.image);
    }
    
    this.axios.post('http://localhost:8000/api/change', data, config)
    .then(function (res) {
      existingObj.success = res.data.success;                            
      existingObj.$router.push({name: 'home'})                          
      console.log(res);                            
    })
    .catch(function (err) {
        console.log(err);
        existingObj.output = err;                            
      });
    }
  }
},

  mounted() {
    const token =  window.localStorage.getItem('accessToken');
      this.axios.get('http://localhost:8000/api/get/user', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      })
      .then(response => {
         this.form = response.data[0];
      }) 
      .catch(({ response }) => {
        console.log(response);
      })
  }
}
</script>

<style>

</style>