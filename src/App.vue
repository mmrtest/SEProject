<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
              <v-list-tile-title>John Doe</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

         <v-list-group
          prepend-icon="account_circle"
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Users</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Admin</v-list-tile-title>
              </v-list-tile>
            </template>
  
            <v-list-tile
              v-for="(admin, i) in admins"
              :key="i"
            >
              <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="admin[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
  
          <v-list-group
            sub-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Actions</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(crud, i) in cruds"
              :key="i"
            >
              <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[1]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>


    </v-navigation-drawer>
    <v-toolbar>
      <v-btn flat fab dark small @click.stop="drawer = !drawer">
        <v-icon dark>list</v-icon>
      </v-btn>
      <v-toolbar-title>
        <router-link to='/' tag="span" style="cursor: pointer">
        TiTle
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-for="item in menu" :key="item.title" flat small router :to="item.link">
          <v-icon small dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
       <router-view></router-view>
    </main>
  </v-app>
</template>

<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.9.0/firebase-database.js"></script>


<script>
import HelloWorld from './components/HelloWorld'

export default {
  data () {
    return {
      drawer: null,
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ],
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      menu: [
        {icon: 'search', title: 'Search', link: '/search'},
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]
    }
  }
}
</script>
