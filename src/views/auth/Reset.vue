<template>
  <div>
    
    <div class="text-center">
      <h2 class="indigo--text">Reset Password</h2>
    </div>
    
    <v-divider class="ma-5"/>

    <v-form>

      <v-card-text>

        <v-text-field
          type="email"
          label="Email"
          placeholder="Email"
          prepend-inner-icon="mdi-email"
          outlined
          v-model="form.email"
        />

        <v-text-field
          v-model="form.password"
          :type="passwordShow ? 'text' : 'password'"
          label="Password"
          placeholder="Password"
          prepend-inner-icon="mdi-lock"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordShow = !passwordShow"
          outlined
        />

        
        <v-text-field
          v-model="form.password_confirmation"
          :type="passwordShow ? 'text' : 'password'"
          label="Confirm Password"
          placeholder="Confirm Password"
          prepend-inner-icon="mdi-lock"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="passwordShow = !passwordShow"
          outlined
        />
    
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="indigo" @click="submit">
          <span class="white--text px-5">Change Password</span>
        </v-btn>
      </v-card-actions>

    </v-form>

    <v-card-actions>

      <v-spacer/>

      <a href="/login" class="black--text d-flex">  Back to login</a>
      
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
      form: {
        email: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    submit() {
      console.log(this.form);
      this.form = {}
    }
  }
}
</script>

<style>

</style>