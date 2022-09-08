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
        <v-toolbar elevation="0">
            <a href="/user" style="text-decoration: none;" class="ml-2">
                <v-btn outlined color="blue" style="text-transform: capitalize;"> 
                    <v-icon>
                        mdi-keyboard-backspace
                    </v-icon>
                    Back
                </v-btn>
            </a>
        </v-toolbar>

        <v-form @submit.prevent="createUser" lazy-validation ref="form" enctype="multipart/form-data" class="mt-5">
            
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

            <v-row class="mx-3">
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Password']"
                        v-model="form.password"
                        label="Password"
                        :type="passwordShow ? 'text' : 'password'"
                        outlined
                        clearable
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordShow = !passwordShow"
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-text-field
                        :rules="[v => !!v || 'Please enter Confirm Password']"
                        v-model="form.password_confirmation"
                        label="Confirm Password"
                        outlined
                        clearable
                        :type="passwordShow ? 'text' : 'password'"
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordShow = !passwordShow"
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
                Create users
            </v-btn>

            
        </v-form>
    </v-card>

  </div>
</template>

<script>
export default {
    data() {
        return {
            passwordShow: 0,
            form: {
                first_name: null,
                last_name: null,
                username: null,
                email: null,
                phone_number: null,
                image: null,
                role: null,
                gender: null,
                password: null,
                password_confirmation: null
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
            createUser(e) {
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
                    data.append('first_name', this.form.first_name);
                    data.append('last_name', this.form.last_name);
                    data.append('username', this.form.username);
                    data.append('email', this.form.email);
                    data.append('phone_number', this.form.phone_number);
                    data.append('gender', this.form.gender);
                    data.append('role', this.form.role);
                    data.append('password', this.form.password);
                    data.append('password_confirmation', this.form.password_confirmation);
                    if(this.form.image)
                    {
                        data.append('image', this.form.image);
                    }
            
                    this.axios.post('http://localhost:8000/api/user/create', data, config)
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
        }
}
</script>

<style>

</style>