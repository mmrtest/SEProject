<template>
    <v-dialog width="600px" persistent v-model="dialog">
        <v-btn floating accent slot="activator">
            <v-icon>
                edit
            </v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row warp>
                    <v-flex xs12>
                        <h2 class="pb-3">Edit Article</h2>
                    </v-flex>
                </v-layout>
                <v-divider ></v-divider>
                <v-card-text>
                <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                class="px-3 pt-3 "
                                name="title"
                                label="Title"
                                id="title"
                                v-model="Etitle"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                class="px-3 pt-3 "
                                name="image"
                                label="Image URL"
                                id="image"
                                v-model="Eimage"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                class="px-3 py-3 "
                                name="description"
                                label="Description"
                                id="description"
                                v-model="Edescription"
                                multi-line
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                        <h2 class="px-3">Teacher</h2>
                        <v-select
                        class="px-3 "
                        v-model="Eteacher"
                        :items="items"
                        label="Select"
                        persistent-hint
                        return-object
                        single-line
                        ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-select
                            class="px-3 pb-4 "
                            v-model="Etag"
                            :items="states"
                            :menu-props="{ maxHeight: '400' }"
                            label="Tag"
                            multiple
                            chips
                            hint="Pick your favorite states"
                            persistent-hint
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <h2 class="px-3">Students</h2>
                    <v-layout row>        
                        <v-flex xs8>
                            <v-text-field
                                class="px-3"
                                name="nameStudent1"
                                label="Name"
                                id="nameStudent1"
                                v-model="EnameStudent1"
                                required></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                class="px-3"
                                name="idStudent1"
                                label="ID"
                                id="idStudent1"
                                v-model="EidStudent1"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>        
                        <v-flex xs8>
                            <v-text-field
                                class="px-3"
                                name="nameStudent2"
                                label="Name"
                                id="nameStudent2"
                                v-model="EnameStudent2"
                                required></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                class="px-3 py-3"
                                name="idStudent2"
                                label="ID"
                                id="idStudent2"
                                v-model="EidStudent2"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                class="px-3 pt-3 "
                                name="link"
                                label="Link"
                                id="link"
                                v-model="Elink"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-card-text>
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-btn @click="dialog = false">Close</v-btn>
                                <v-btn @click="onSave">Save</v-btn>
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
            Eteacher: this.article.teacher,
            items: ['Florida','Georgia','Nebraska','California','New York'],
            Etitle: this.article.title,
            Eimage: this.article.image,
            Edescription: this.article.description,
            Etag: this.article.tag,
            EnameStudent1: this.article.nameStudent1,
            EidStudent1: this.article.idStudent1,
            EnameStudent2: this.article.nameStudent2,
            EidStudent2: this.article.idStudent2,
            Elink: this.article.link,
            states: [
            'Alabama', 'Alaska', 'American Samoa', 'Arizona',
            'Arkansas', 'California', 'Colorado', 'Connecticut',
            'Delaware', 'District of Columbia', 'Federated States of Micronesia',
            'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
            'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
            'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
            'Missouri', 'Montana', 'Nebraska', 'Nevada',
            'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
            'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
            'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
            'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
            'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
            'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
            ]

        }
    },
    computed: {
        formIsValid () {
            return this.title !== '' && this.description !== '' && this.image !== '' && this.teacher !== '' 
        },
        getuserId (){
            return this.$store.getters.user.id
        },
    },
    methods: {
        onSave(){
            const pdata = {
                title: this.Etitle,
                image: this.Eimage,
                description: this.Edescription,
                teacher: this.Eteacher,
                tag: this.Etag,
                nameStudent1: this.EnameStudent1,
                idStudent1: this.EidStudent1,
                nameStudent2: this.EnameStudent2,
                idStudent2: this.EidStudent2,
                creator: this.$store.getters.user.id,
                link: this.Elink,
            }
            this.$store.dispatch('updateArticle',{...pdata,id: this.article.id})
           

            this.dialog = false
            
        }
    }
}
</script>
