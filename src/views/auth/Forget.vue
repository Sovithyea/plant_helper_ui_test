<template>
  <div>
    
    <div class="text-center">
      <h2 class="indigo--text">Forgot Password</h2>
    </div>
    
    <v-divider class="ma-5"/>

    <v-form @submit.prevent="forget" lazy-validation ref="form">

      <v-card-text>

        <v-text-field
          type="email"
          label="Email"
          placeholder="Email"
          prepend-inner-icon="mdi-email"
          outlined
          v-model="form.email"
          :rules="[v => !!v || 'Please enter email']"
        />
      </v-card-text>
      
      <v-card-actions class="justify-center">
        <v-btn color="indigo" type="submit">
          <span class="white--text px-5">Reset Password</span>
        </v-btn>
      </v-card-actions>
    </v-form>

    <v-card-actions>

      <v-spacer/>

      <a href="/login" class="black--text d-flex">  Back to login</a>
      
    </v-card-actions>
    <br><br>
    <p class="ml-5">By continuing, you agree to Plant Helper's <a href="#" style="color:black;"> Policy </a> and <a style="color:black;" href="#"> Terms of Use</a></p>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        email: null,
      }
    }
  },
  methods: {
    forget() {
      if(this.$refs.form.validate()) {
        this.axios.post('http://localhost:8000/api/forget', this.form)
        .then(response => {
          this.$router.push({name: 'reset'});
        })
        .catch(({response}) => {
          console.log(response);
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