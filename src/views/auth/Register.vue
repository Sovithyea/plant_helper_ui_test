<template>
  <div>
    
    <div class="text-center">
      <h2 class="indigo--text">Register</h2>
    </div>
    
    <v-divider class="ma-5"/>

    <v-form @submit.prevent="register" lazy-validation ref="form">
    <v-alert color="red" v-if="errors?.message" class="white--text text-center mb-8" elevation="3">{{errors?.message}}</v-alert>
      <v-card-text>
        <v-row>
          <v-col lg="6" cols="6">    
            <v-text-field 
              type="text"
              label="First Name"
              placeholder="First Name"
              outlined
              v-model="form.first_name"
              :rules="[v => !!v || 'Please enter first name']"
            />
          </v-col>

          <v-col lg="6" cols="6">
            <v-text-field
              type="text"
              label="Last Name"
              placeholder="Last Name"
              outlined
              v-model="form.last_name"
              :rules="[v => !!v || 'Please enter last name']"
            />
          </v-col>
        </v-row>

        
        <v-text-field
          type="text"
          label="Username"
          placeholder="Username"
          prepend-inner-icon="mdi-account"
          outlined
          v-model="form.name"
          :rules="[v => !!v || 'Please enter username']"
        />

        <v-text-field
          type="email"
          label="Email"
          placeholder="Email"
          prepend-inner-icon="mdi-email"
          outlined
          v-model="form.email"
          :rules="[v => !!v || 'Please enter email']"
        />
        <v-text-field
          type="number"
          label="Phone Number"
          placeholder="Phone Number"
          prepend-inner-icon="mdi-phone"
          outlined
          v-model="form.phone_number"
          :rules="[v => !!v || 'Please enter phone number']"
        />

        <v-select
          v-model="form.gender"
          :items="genders"
          label="Gender"
          prepend-inner-icon="mdi-account"
          outlined
          :rules="[v => !!v || 'Please select gender']"
        ></v-select>

        <v-text-field
          v-model="form.password"
          :type="passwordShow ? 'text' : 'password'"
          label="Password"
          placeholder="Password"
          prepend-inner-icon="mdi-lock"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordShow = !passwordShow"
          outlined
          :rules="[v => !!v || 'Please enter password']"
        />

        
        <v-text-field
          v-model="form.password_confirmation"
          :type="passwordShow ? 'text' : 'password'"
          label="Re-type Password"
          placeholder="Re-type Password"
          prepend-inner-icon="mdi-lock"
          :append-icon="confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="confirmPasswordShow = !confirmPasswordShow"
          :rules="[v => !!v || 'Please enter password confirmation']"
          outlined
        />
        
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="indigo" type="submit">
          <span class="white--text px-8">Register</span>
        </v-btn>
      </v-card-actions>

    </v-form>
    <v-card-actions>
      <v-spacer/>
      <a href="/guest" class="black--text d-flex">Back to login</a>
    </v-card-actions>
    <br><br>
    <p class="ml-5">By continuing, you agree to Plant Helper's <a href="#" style="color:black;">Policy</a> and <a style="color:black;" href="#">Terms of Use</a></p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      passwordShow: 0,
      confirmPasswordShow: 0,
      form: {
        first_name: null,
        last_name: null,
        name: null,
        email: null,
        phone_number: null,
        gender: null,
        password: null,
        password_confirmation: null
      },
      genders: [
        'male',
        'female',
        'other'
      ],
       errors: [],
    }
  },
  methods: {
    register() {
      if(this.$refs.form.validate()) {
        console.log(this.form);
        this.axios.post('http://localhost:8000/api/register', this.form)
        .then(response => {
          this.$router.push({name: 'login'});
        })
        .catch(({response})=> {
          this.errors = response.data;
        })
        .finally(() => {
          console.log('xD');
        })
      }
    }
  }
}
</script>

<style>

</style>