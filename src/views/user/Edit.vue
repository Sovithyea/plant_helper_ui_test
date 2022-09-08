<template>
  <div>

    <v-card class="mb-3">
      <v-card-title>
        Users
      </v-card-title>
      <v-card-subtitle>
        Fill the below form to create new user.
      </v-card-subtitle>
    </v-card>

    <v-card>
        <v-toolbar>
            <a href="/user" style="text-decoration: none;" class="ml-2">
                <v-btn outlined color="blue" style="text-transform: capitalize;"> 
                    <v-icon>
                        mdi-keyboard-backspace
                    </v-icon>
                    Back
                </v-btn>
            </a>
        </v-toolbar>

        <v-form @submit.prevent="updateUser" lazy-validation ref="form" enctype="multipart/form-data" class="mt-5">
          <v-card class="mb-10">
            <v-card-subtitle>
              Thumbnail
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
              cols="12"
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

            <v-row class="mx-3">
                <v-col
                    cols="12"
                    sm="6"
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
            </v-row>

            <v-row class="mx-3">
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
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-select
                    label="Role"
                    v-model="form.role"
                    :items="roles"
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
            roles: [
              {
                label: 'Admin',
                value: 'admin'
              },
              {
                label: 'User',
                value: 'user'
              }
            ]
    }
  },

  methods: {
    onChange(e) {
      this.form.image = e.target.files[0];
    },
    updateUser(e) {
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
      data.append('first_name', this.form.first_name);
      data.append('last_name', this.form.last_name);
      data.append('username', this.form.username);
      data.append('email', this.form.email);
      data.append('phone_number', this.form.phone_number);
      data.append('gender', this.form.gender);
      data.append('role', this.form.role);
      if(this.form.image)
      {
        data.append('image', this.form.image);
      }
    
    this.axios.post('http://localhost:8000/api/user/'+ this.form.id + '/update', data, config)
    .then(function (res) {
      existingObj.success = res.data.success;                            
      existingObj.$router.push({name: 'user'});                            
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
    this.axios.get('http://localhost:8000/api/user/'+ this.id + '/edit', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },    
    })
    .then(res => {
      console.log(res);
      this.form = res.data[0];
    })
    .catch(({res}) => {
      console.log(res);
    })
    .finally(() => {

    })
  }
}
</script>

<style>

</style>