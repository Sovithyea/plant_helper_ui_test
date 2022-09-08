<template>
  <v-app>
   <div class="bg">
     
    
    <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="5" class="mx-auto">
            <v-card class="pa-4 my-5">
                
                <router-view></router-view>

            </v-card>
        </v-col>
    </v-main>


   </div>
  </v-app>
</template>

<script>
export default {

}
</script>

<style>
    .bg {
        background: url('../../assets/3116814.jpg')
        no-repeat center center fixed !important;
        background-size: cover;
        height: 100%;
        margin: 1rem;
    }
</style>