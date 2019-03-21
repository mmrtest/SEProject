<template>
  <v-app dark style="background-color: #FFF59D;background-image: url(https://www.goodfreephotos.com/albums/other-landscapes/shoreline-of-sand-and-ocean.jpg);background-size: cover;">
    <v-navigation-drawer v-model="drawer" fixed temporary>
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
    <v-toolbar color="orange darken-3">
      <v-btn v-if="this.userAuth" flat fab dark small @click.stop="drawer = !drawer">
        <v-icon dark>list</v-icon>
      </v-btn>
      <v-toolbar-title>
        <router-link to='/' tag="span" style="cursor: pointer">
        <v-icon dark>pets</v-icon>
        Projectpidia
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if="!this.userAuth">  
        <!-- <v-btn v-for="item in menu" :key="item.title" flat small router :to="item.link">
          <v-icon small dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn> -->
        <v-btn flat small router to="/search">
            <v-icon small dark>search</v-icon>
            Search</v-btn>
        <v-dialog max-width="600px">
          <v-btn flat slot="activator" style="height: 64px;">
            <v-icon small dark>face</v-icon>
            Register</v-btn>
          <v-card>
            <v-card-title>
              <h1>Register</h1>
            </v-card-title>
            <v-card-text>
              <v-form class="px-3" @submit.prevent="onRegister">
                <v-text-field v-model="email" label="Email" prepend-icon="edit" required></v-text-field>
                <v-text-field v-model="password" type="password" label="Password" prepend-icon="security" required></v-text-field>
                <v-text-field v-model="conPassword" type="password" label="ConfirmPassword" prepend-icon="people" :rules="[comparePass]" required></v-text-field>
                <v-btn type="submit">Submit</v-btn>
              </v-form>
              <v-card v-if="error">
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
              </v-card>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog max-width="600px">
          <v-btn flat slot="activator" style="height: 64px;">
            <v-icon small dark>lock_open</v-icon>
            Log-in</v-btn>
          <v-card>
            <v-card-title>
              
              <h1>Log-in</h1>
            </v-card-title>
            <v-card-text>
              <v-form class="px-3" @submit.prevent="onLogin">
                <v-text-field v-model="loginEmail" label="Email" prepend-icon="edit" required></v-text-field>
                <v-text-field v-model="loginPassword" type="password" label="Password" prepend-icon="security" required></v-text-field>
                <v-btn type="submit">Submit</v-btn>
              </v-form>
              <v-card v-if="error">
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
              </v-card>
            </v-card-text>
          </v-card>
        </v-dialog> 
        
      </v-toolbar-items>

      <v-toolbar-items v-if="this.userAuth">
        <v-btn flat small router to="/search">
            <v-icon small dark>search</v-icon>
            Search</v-btn>
        <v-btn flat small router to="/search">
            <v-icon small dark>lock</v-icon>
            Log-out</v-btn>
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
      ],
      email: '',
      password: '',
      conPassword: '',
      loginEmail: '',
      loginPassword: '',
    }
  },
  computed: {
    menuItem() {
      
    },
    userAuth (){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    comparePass (){
      return this.password !== this.conPassword ? 'Password does not Match!!' : ''
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }


  },
  watch: {
    user(value){
      if(value !== null && value !== undefined){
        this.$router.push('/')
      }
    }
  },
  methods: {
    onRegister() {
      // console.log({email: this.email,password: this.password,conPassword: this.conPassword})
      // userRef.push({email:this.email,password:this.password,name:this.name})
      this.$store.dispatch('signUserup',{email: this.email,password: this.password})
    },
    onLogin() {
      // console.log({email: this.email,password: this.password,conPassword: this.conPassword})
      // userRef.push({email:this.email,password:this.password,name:this.name})
      this.$store.dispatch('logUserin',{email: this.loginEmail,password: this.loginPassword})
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    }
  },
}
</script>

<style scoped>
    
</style>
