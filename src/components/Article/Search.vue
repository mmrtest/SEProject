<template>

    <v-container>
        <v-layout row>
            <v-flex class="search-wrapper" xs9>
                <v-card class="px-3 pt-3" color="yellow darken-3">
                    <h1>Search</h1>
                <v-text-field v-model="word" type="input" label="input your key" prepend-icon="search"></v-text-field>
                </v-card>
                <v-card 
                class="px-3 py-3 scroll-y" 
                color="yellow darken-3"
                style="height: 730px"
                >
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
                                <v-list-tile-sub-title>Tag : 
                                    <v-chip
                                    v-for="(tag, index) in item.tag"
                                    :key='index'
                                    @click="getSearchTag(tag)"
                                    >{{tag}}</v-chip>
                                </v-list-tile-sub-title>
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
            <v-flex class="px-3" xs3>
                <v-card color="yellow darken-3" class="px-3">
                    <h1 class="py-3">Tag Filter</h1>
                    <v-divider color="white"></v-divider>
                    <v-spacer class="pt-3"></v-spacer>
                        <v-chip
                        v-for="(tag, index) in states"
                        :key='index'
                        @click="getSearchTag(tag)"
                        :color="getColorTag(tag)"
                        >{{tag}}</v-chip>
                    <v-flex class="pt-3">

                    </v-flex>
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
            clicktag: false,
            currentTag: [],
            states: [
            'Application','Web App','Game', 
            'Wireless', 'Sensor','Search','Bluetooth',
            'Block chain','Moblie App', 'Network','Hardware','Software','Platform',
            'Network Design', 'AI', 'Math', 'Iot', 'Image processing',
            'Machine lerning', 'Microcontroller', 'MIS','Data Scient', 'Big data',
            'Management System ', 'Quantum Coputing'
            ]
        }
    },
   computed: {
        items () {
            return this.$store.getters.loadArticles
        },
        loading(){
            return this.$store.getters.loading
        },
        onSearchTag() {
            if(this.currentTag.length == 0){
                return this.$store.getters.loadArticles
            }
            return this.items.filter(item => {
                var check = 0
                for(var j=0; j < this.currentTag.length; j++){    
                    for(var tag in item.tag){
                         if(item.tag[tag] == this.currentTag[j]){
                            check++
                         }
                     }
                }
                return (check == this.currentTag.length) ? true : false
            })
        },
        onSearch() {
            return this.onSearchTag.filter(item => {
                return item.title.toLowerCase().includes(this.word.toLowerCase())
            })
        },
        

    },
    methods: {
        onLoadArticle(id){
            if(this.clicktag == false){
                this.$router.push('/article/' + id)
            }
            this.clicktag = false  
        },
        deleteSearchTag(tag){
            var index = this.currentTag.indexOf(tag);
            if (index > -1) {
                this.currentTag.splice(index, 1);
            }    
        },
        getSearchTag(tag){
            var exist = false
            this.clicktag = true
            for(var i=0; i < this.currentTag.length; i++){
                if(this.currentTag[i] == tag){
                    exist = true
                }
            }
            if(exist == false){
                this.currentTag.push(tag)
            }else{
                this.deleteSearchTag(tag)
            }
        },
        getColorTag(tag){
            var exist = false
            this.clicktag = true
            for(var i=0; i < this.currentTag.length; i++){
                if(this.currentTag[i] == tag){
                    exist = true
                    return "yellow darken-1"
                }
            }
            if(exist == false){
                return "grey darken-3"
            }
        },
    }
  
}


</script>
>>>>>>> c3995e08991546af319408f9e370ba43055940af
