<template>



  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success">Register</v-btn>
    <v-card>
      <v-card-title>
        <h1>Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" @submit.prevent="onRegister">
          <v-text-field v-model="email" label="Email" prepend-icon="edit"></v-text-field>
          <v-text-field v-model="password" type="password" label="Password" prepend-icon="security"></v-text-field>
          <v-text-field v-model="conPassword" type="password" label="ConfirmPassword" prepend-icon="people" :rules="[comparePass]"></v-text-field>
          <v-btn type="submit">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// var database = firebase.database();
// var userRef = window.db.ref("users");

export default {
  data(){
    return{
      email: '',
      password: '',
      conPassword: ''
    }
  },
  computed: {
    comparePass (){
      return this.password !== this.conPassword ? 'Password does not Match!!' : ''
    },
    user () {
      return this.$store.getters.user
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
    }
  },
  
}
</script>
