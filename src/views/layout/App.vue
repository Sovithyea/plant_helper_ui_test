<template>
  <v-app id="inspire">

    <HeaderComponent @handleDrawer="drawer = !drawer" :user="user" @logout="logout"/>

    <side-bar-component :drawer="drawer"/>
    
    <v-main class="pa-0">
      <v-container
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-main>

    <FooterComponent/>
  </v-app>
</template>

<script>
import HeaderComponent from '../../components/HeaderComponent.vue';
import SideBarComponent from '../../components/SideBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';

  export default {
    data: () => ({
        cards: [
          "Today", 
          "Yesterday"
        ],
        drawer: true,
        user: {

        }
    }),
    components: {
      HeaderComponent, 
      SideBarComponent, 
      FooterComponent 
    },

    methods: {
      logout() {
        const token =  window.localStorage.getItem('accessToken');
        console.log(token);
        this.axios.get('http://localhost:8000/api/logout', token, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        })
        .then(response => {
          console.log(response.data);
        }) 
        .catch(({ response }) => {
          console.log(response);
        })
      }
    },  

    mounted() {
      const token =  window.localStorage.getItem('accessToken');
      const refresh_token = window.localStorage.getItem('refreshToken')
      this.axios.get('http://localhost:8000/api/get/user', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      })
      .then(response => {
         console.log(response.data);
         this.user = response.data[0];
      }) 
      .catch(({ response }) => {
        window.localStorage.setItem("authenticated", 1);
        window.localStorage.setItem('isTokenRefreshing', 1);
        window.localStorage.setItem("accessToken", null);       
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
      const data = {
        refresh_token: refresh_token   
      }
      console.log(data);
      if(window.localStorage.getItem('isTokenRefreshing') == 1)
      {
        this.axios.get('http://localhost:8000/api/refresh', data, config)
        .then(response => {
          console.log(response);
          window.localStorage.setItem("accessToken", response.data.access_token);
          window.localStorage.setItem("refreshToken", response.data.refresh_token);
          window.localStorage.setItem("authenticated", 1);
          window.localStorage.setItem('isTokenRefreshing', 0);
          this.$router.push({name: 'home'});
        })
        .catch(({res}) => {
          console.log(res);
          window.localStorage.setItem("accessToken", null);
          window.localStorage.setItem("refreshToken", null);
          window.localStorage.setItem("authenticated", 0);
          window.localStorage.setItem('isTokenRefreshing', 0);
        })
      }

    }
}
</script>

