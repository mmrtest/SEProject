<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-card dark class="card1">
            <!-- <div class="display-2 font-weight-light">abc</div> -->
            <v-flex>
                
                <v-carousel style="cursor: pointer;">
                <v-progress-circular
                    indeterminate
                    color="white"
                    v-if="loading"
                    class="load1"
                    size="50"
                ></v-progress-circular>
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
            <div class="px-4">
            <v-card dark class="card2">
                <center><img src="../assets/logooo.png" height="300px"></center>
            </v-card>
            </div>
            </v-card>
            
        </v-layout>
    </v-container>
</template>



<script>
export default {
    computed: {
        item () {
            return this.$store.getters.getArticle
        },
        loading(){
            return this.$store.getters.loading
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
    .card2 {
        font-size: 2rem;
        height: 300px;
        background-color: white;
        
    }
    .load1 {
        left: 580px;
        top: 210px;
        
        background-color: #039BE5;
        
    }
</style>

