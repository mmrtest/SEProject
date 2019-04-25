<template>
    <v-container>
        <v-layout row warp v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                    indeterminate
                    color="white"
                    class="load1"
                    size="50"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12 sm9 md9>
                <v-card>
                <v-img
                    :src='item.image'
                    aspect-ratio="2.75"
                ></v-img>
        
                <v-card-title>
                    <h1 class='font-weight-regular'>{{item.title}}</h1>
                    <template>
                        <v-spacer></v-spacer>
                        <app-edit :article="item" v-if="userIsCreator">
                        </app-edit> 
                        <app-delete :article="item" v-if="userIsCreator"></app-delete>
                         <v-btn floating accent @click="onPin" v-if="userIsAuth">
                            <v-icon>
                                {{this.pin}}
                            </v-icon>
                        </v-btn>
                    </template> 
                   
                </v-card-title>
                
                <v-divider></v-divider>
                <v-card-text>
                    <div class="info--text">Project owner : {{item.nameStudent1}} : {{item.idStudent1}} / {{item.nameStudent2}} : {{item.idStudent2}}</div>
                    <div class="info--text">Advisor by {{item.teacher}}</div>
                    <div class='font-weight-light'>
                        Download Link : {{item.link}}
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <h2 class='font-weight-regular'>Info</h2> 
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <div class='font-weight-light'>
                       {{item.description}}
                    </div>
                </v-card-text>

                </v-card>
            </v-flex>
            
            <v-flex>
                <v-hover class="mb-2" v-for="(item,index) in topic" :key="index">
                    <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="mx-auto"
                    width="344"
                    >
                    <v-img
                        :aspect-ratio="16/9"
                        :src ="item.image"
                    ></v-img>
                    <v-card-title>
                        <div>
                        <span class="headline">{{item.title}}</span>
                        <div class="d-flex">
                            <span class="grey--text">Similar Tag : {{ item.tag[0] }}</span>
                        </div>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn
                        icon class="mr-0" 
                        @click="onLoadArticle(item.id)"
                        >
                        <v-icon dark>arrow_right_alt</v-icon>
                        </v-btn>
                    </v-card-title>
                    </v-card>
                </v-hover>
                
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
  data () {
    return {
      topic: [],
      toggle: true
    }
  },
  created (){
        var temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
        this.topic[0] = this.$store.getters.getrandArticle(temp)
        temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
        this.topic[1] = this.$store.getters.getrandArticle(temp)
        temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
        this.topic[2] = this.$store.getters.getrandArticle(temp)
 },
  props: ['id'],
  computed: {
        item () {
            return this.$store.getters.loadArticle(this.id)
        },
        userIsAuth(){
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined && this.$store.getters.user.id !== ''
        },
        userIsCreator(){
            if(!this.userIsAuth){
                return false
            }else{
                return this.$store.getters.user.id === this.item.creator
            }
        },
        loading(){
            if(!this.$store.getters.loading){
                var temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
                this.topic[0] = this.$store.getters.getrandArticle(temp)
                temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
                this.topic[1] = this.$store.getters.getrandArticle(temp)
                temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
                this.topic[2] = this.$store.getters.getrandArticle(temp)
        
            }
            return this.$store.getters.loading
        },
        regUser(){
            return this.$store.getters.user.saveArticle.findIndex(Aid =>{
                return Aid === this.id
            }) >= 0
        },
        pin(){
            if(this.regUser) {
                return 'save'
            }
            else {
                return 'add_circle'
            }
        }

    },
  methods: {
        onLoadArticle(id){
            var temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
            this.topic[0] = this.$store.getters.getrandArticle(temp)
            temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
            this.topic[1] = this.$store.getters.getrandArticle(temp)
            temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % this.$store.getters.loadArticlesLength
            this.topic[2] = this.$store.getters.getrandArticle(temp)                                
            this.$router.push('/article/' + id)
            
        },
        onPin(){

            if(this.regUser) {
                this.$store.dispatch('unregisterArticle',this.id)
            }
            else {
                this.$store.dispatch('registerArticle',this.id)
            }
        
            
        }
  }
}
</script>