<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-card dark class="card1">
            <!-- <div class="display-2 font-weight-light">abc</div> -->
            <v-flex>
                <v-carousel style="cursor: pointer;">
                <v-carousel-item
                    v-for="items in item"
                    :key="items.id"
                    :src="items.image"
                    @click="onLoadArticle(items.id)"  
                >
                <div class="display-1 font-weight-light">{{ items.title }}</div>
                </v-carousel-item>
                </v-carousel>
            </v-flex>
            <v-flex xs12 class="text-xs-center mt-2">
                
                <p class='subheading font-weight-light' style="font">Explore some amazing article!!</p>
                
            </v-flex>
            </v-card>
        </v-layout>
    </v-container>
</template>



<script>
export default {
    computed: {
        item () {
            return this.$store.getters.loadArticles
        }
    },
    methods: {
        onLoadArticle(id){
            this.$router.push('/article/' + id)
        }
    }
}
</script>

<style scoped>
    .display-1 {
        position: absolute;
        top: 15px;
        left: 20px;
        background-color: rgba(0,0,0,0.5);
        padding: 20px;
        font-size: 2rem;

    }
    .card1 {
        height: 58ex;
        width: 1200px;
        
        font-size: 2rem;
        background-color: #039BE5;
        
    }
</style>

