<template>
  <div>
    
    <v-card class="mb-3">
      <v-card-title>
        Users
      </v-card-title>
      <v-card-subtitle>
        List of users
      </v-card-subtitle>
    </v-card>
     
     <v-card>
        <v-toolbar elevation="0">
            <v-toolbar-title>
                <a href="/user/create">    
                    <v-btn class="dense text-capitalize" color="primary">
                        <v-icon class="mr-3">mdi-plus</v-icon>
                        New user
                    </v-btn>
                </a>

            </v-toolbar-title>
            
                <v-spacer></v-spacer>
            <v-col
                cols="12"
                sm="6"
                md="3"
                >
                <v-text-field
                    dense
                    class="mt-5"
                    label="Search..."
                    placeholder="Search..."
                    outlined
                ></v-text-field>
            </v-col>
        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="15"
            class="elevation-1"
        >

        <template v-slot:item.count="{item, index}">
            {{index+1}}
        </template>

        <template v-slot:item.avatar="{ item }">
            <v-img :src="`http://localhost:8000/storage/${item.avatar}`" style="width: 75px; height:75px; padding: 3px;"/>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn :to="{name:'userShow', params:{id: item.id}}" plain >
                <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn :to="{name:'userEdit', params:{id: item.id}}" large plain color="green" >
                <v-icon>mdi-pencil-box-outline</v-icon>
            </v-btn>
            <v-btn @click="onDelete(item.id)" large plain color="red">
                <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
        </template>
            

        </v-data-table>

     </v-card>
  </div>
</template>

<script>


export default {
    data() {
        return {
            users: [
                
            ],
            headers: [
                {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'count',
                },
                { text: 'Avatar', value: 'avatar'},
                { text: 'Username', value: 'username' },
                { text: 'Email', value: 'email' },
                { text: 'Phone Number', value: 'phone_number' },
                { text: 'Actions', value: 'actions'}
            ]
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        onDelete(id) {
            const token =  window.localStorage.getItem('accessToken');
            this.axios.delete('http://localhost:8000/api/user/'+ id + '/delete', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })   
            .then(response => {
                console.log(response);
                this.fetchData();
            })
            .catch(({response}) => {
                console.log(response);
            })
        },

        fetchData() {
            const token =  window.localStorage.getItem('accessToken');
            this.axios.get('http://localhost:8000/api/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })   
            .then(response => {
                console.log(response);
                this.users = response.data[0];
            })
            .catch(({response}) => {
                console.log(response);
            })
        }
    }
}
</script>

<style>

</style>