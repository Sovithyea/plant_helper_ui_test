<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.mdAndUp" 
    dark 
    app 
  >
      
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in links"
          :key="item.title"
          :to="item.path"
          link
        >
          <v-list-item-icon>
            <v-icon color="green accent-3">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
export default {
    props: [
        'drawer'
    ],
    data() {
        return {
            links: [
              
      { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/' },
      { title: 'Crop', icon: 'mdi-grass' , path: '/crop'},
      { title: 'Crop Disease', icon: 'mdi-memory', path: '/crop-disease'},
      { title: 'Measurement Condition', icon: 'mdi-folder-wrench-outline', path: '/crop-measurement-condition'},
      { title: 'User', icon: 'mdi-account-group', path: '/user'},
      { title: 'Setting', icon: 'mdi-cog-outline', path: '/setting' }
        ],
        }
    }
}
</script>

<style>

</style>