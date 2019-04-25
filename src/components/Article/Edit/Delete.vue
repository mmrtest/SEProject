<template>
    <v-dialog width="600px" persistent v-model="dialog">
        <v-btn floating accent slot="activator">
            <v-icon>
                delete
            </v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row warp>
                    <v-flex xs12>
                        <h2 class="pb-3">Delete Article</h2>
                    </v-flex>
                </v-layout>
                <v-divider ></v-divider>
                <v-layout row warp>
                    <v-flex xs12>
                        <v-content class="py-3">
                            Are you sure to delete this article?

                        </v-content>
                    </v-flex>
                </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-btn @click="dialog = false">Close</v-btn>
                                <v-btn @click="onDelete">Delete</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>

            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['article'],
    data (){
        return{
            dialog: false,
            Aid: this.article.id,
            
            

        }
    },
    computed: {
        getuserId (){
            return this.$store.getters.user.id
        },
    },
    methods: {
        onDelete(){
            this.$store.dispatch('deleteArticle',{Aid: this.Aid ,id: this.article.id})
            this.dialog = false
            this.$router.push('/')
            
        }
    }
}
</script>
