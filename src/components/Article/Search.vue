<template>
    <v-form>
      <v-container>
        <v-layout>
        <v-flex xs6 sm5></v-flex>
        <v-flex xs6 sm3>
          <v-img :src="picture" height="200" width="200" >   </v-img>
        </v-flex>
        <v-flex xs6 sm4></v-flex>
      </v-layout>
    
        <v-layout row wrap>
        <v-flex xs6 sm2></v-flex>
          <v-flex xs6 sm8>
            <v-text-field
              v-model="message"
              outline
              clearable
              label="Search hear...."
              type="text"
            >
              <template v-slot:prepend>
                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                  </template>
                  I'm a tooltip
                </v-tooltip>
              </template>
              <template v-slot:append>
                <v-fade-transition leave-absolute>
                  <v-progress-circular
                    v-if="loading"
                    size="24"
                    color="info"
                    indeterminate
                  ></v-progress-circular>
                 
                </v-fade-transition>
              </template>
            </v-text-field>
          </v-flex>
        <v-flex xs6 sm2></v-flex>
        </v-layout>
     
      </v-container>
    
    <v-container grid-list-md > 
        <v-layout row wrap> 
        <v-flex md2> </v-flex>
            <v-flex md4>
                <v-card >
                <v-card-title>
                    <span class="headline">Top 10 Search</span>
                </v-card-title>  
                <v-card-text colour="white">Whitsunday Island, Whitsunday Islands<br>popo<br>aaaaaa<br>sdfsdfsdf</v-card-text>
                </v-card>
            </v-flex>

        <v-flex md4>
                <v-card >
                <v-card-title>
                    <span class="headline">Recent Tage</span>
                </v-card-title>  
                <v-card-text colour="white">Island,day Islands <br>i love mem <br>papa eat mom<br>safsdfsdfsd</v-card-text>
                </v-card>
            </v-flex>
            <v-flex md2> </v-flex>
        </v-layout>
        </v-container>
   </v-form>    
</template>

<script>
export default ({
  data: () => ({
    message: '',
    loading: false,
    picture:require('./../../assets/logo.png')
  }),

  methods: {
    clickMe () {
      this.loading = true
      this.message = 'Wait for it...'
      setTimeout(() => {
        this.loading = false
        this.message = 'You\'ve clicked me!'
      }, 2000)
    }
  }
})
</script>

<style>
.bottom-gradient {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}

.repeating-gradient {
  background-image: repeating-linear-gradient(-45deg,
                      rgba(255,0,0,.25),
                      rgba(255,0,0,.25) 5px,
                      rgba(0,0,255,.25) 5px,
                      rgba(0,0,255,.25) 10px
                    );
}
</style>
