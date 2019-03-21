<template>
    <v-container>
        <v-layout>
            <v-flex class="search-wrapper">
                <v-card class="px-3 py-3" color="yellow darken-3">
                    <h1>Search</h1>
                <v-text-field v-model="word" type="input" label="input your key" prepend-icon="search"></v-text-field>
                </v-card>
                <v-card class="px-3 py-3" color="yellow darken-3">
                        <v-list two-line light>
                            <v-list-tile 
                            v-for="item in onSearch"
                            :key="item.id"
                            :src="item.image"
                             @click="onLoadArticle(item.id)"
                             >
                                <v-list-tile-avatar>
                                <img :src="item.image">
                                </v-list-tile-avatar>
                
                                <v-list-tile-content>
                                <v-list-tile-title >{{item.title}}</v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        <!-- <template v-for="(item, index) in items">
                        <v-subheader
                            v-if="item.header"
                            :key="item.header"
                        >
                            {{ item.header }}
                        </v-subheader>
            
                        <v-divider
                            v-else-if="item.divider"
                            :key="index"
                            :inset="item.inset"
                        ></v-divider>
            
                        <v-list-tile
                            v-else
                            :key="item.title"
                            avatar
                        >
                            <v-list-tile-avatar>
                            <img :src="item.avatar">
                            </v-list-tile-avatar>
            
                            <v-list-tile-content>
                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        </template> -->
                    </v-list>    
  
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  <!-- <div class="search-wrapper">
    <input type="text" v-model="search" placeholder="Search title.."/>
        <label>Search title:</label>
  </div>
  <div class="wrapper">
    <div class="card" v-for="post in filteredList">
      <a v-bind:href="post.link" target="_blank">
        <img v-bind:src="post.img"/>
        <small>posted by: {{ post.author }}</small>
        {{ post.title }}
      </a>
    </div>
  </div> -->
</template>

<script>
export default {
    data(){
        return{
            word: '',
        }
    },
   computed: {
        items () {
            return this.$store.getters.loadArticles
        },
        loading(){
            return this.$store.getters.loading
        },
        onSearch() {
            return this.items.filter(item => {
                return item.title.toLowerCase().includes(this.word.toLowerCase())
            })
        }
    },
    methods: {
        onLoadArticle(id){
            this.$router.push('/article/' + id)
        },
    }
  
}


</script>
