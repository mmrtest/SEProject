<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm9 md9>
                <v-card>
                <v-img
                    :src='item.image'
                    aspect-ratio="2.75"
                ></v-img>
        
                <v-card-title>
                    <h1 class='font-weight-regular'>{{item.title}}</h1> 
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="info--text">17-02-1997 / Dr.Johnson</div>
                    <div class='font-weight-light'>
                        Takoyaki (literally 'octopus fry') - commonly called "octopus balls" in English - is a quintessential food of summer festivals in Japan. Essentially they're round balls of fluffy dough that are smothered with a special savory takoyaki sauce and have a tasty piece of octopus meat at the center. Follow along as we share how these delights are made - and discover why they're such an addictive treat!
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <h2 class='font-weight-regular'>Info</h2> 
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <div class='font-weight-light'>
                        Articles in the English language are the definite article the and the indefinite articles a and an. Use of the definite article implies that the speaker assumes the listener knows the identity of the noun's referent (because it is obvious, because it is common knowledge, or because it was mentioned in the same sentence or an earlier sentence). Use of an indefinite article implies that the speaker assumes the listener does not have to be told the identity of the referent. In some noun phrases, no article is used.
                    </div>
                </v-card-text>

                </v-card>
            </v-flex>
            
            <v-flex>
                <v-hover class="mb-2" v-for="item in topic" :key="item.title">
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
                            <span class="grey--text">Total View : {{ item.views }}</span>
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
      topic: []
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
            
        }
  }
}
</script>