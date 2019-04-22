<template>
    <v-container>
        <v-layout>
        <v-flex>
            <v-card class="px-3 py-3 ">
        <v-layout row>
            <v-flex xs12>
                <h1 class="font-weight-light ml-3 mt-2" >Create new Article</h1>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6>
                <v-form @submit.prevent="onCreateArticle">
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                class="px-3 py-3 "
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                            <v-text-field
                                class="px-3 py-3 "
                                name="image"
                                label="Image URL"
                                id="image"
                                v-model="image"
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
                                v-model="description"
                                multi-line
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12>
                        <h2 class="px-3">Teacher</h2>
                        <v-select
                        class="px-3 pb-3 "
                        v-model="teacher"
                        :hint="`${teacher.state}, ${teacher.abbr}`"
                        :items="items"
                        item-text="state"
                        item-value="abbr"
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
                            class="px-3 pb-3 "
                            v-model="tag"
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
                    <v-layout row>
                        <v-flex xs12>
                           <v-btn type="submit" :disabled='!formIsValid'>Create</v-btn>
                        </v-flex>
                    </v-layout>

                </v-form>
            </v-flex>
            <v-flex xs6>
                    <img class="px-3 py-3 " :src="image" style="max-height:500px; max-width:820px;border:5px solid white">              
            </v-flex>
        </v-layout>
        </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data (){
        return{
            teacher: { state: 'Florida', abbr: 'FL' },
            items: [
            { state: 'Florida', abbr: 'FL' },
            { state: 'Georgia', abbr: 'GA' },
            { state: 'Nebraska', abbr: 'NE' },
            { state: 'California', abbr: 'CA' },
            { state: 'New York', abbr: 'NY' }
            ],
            title: '',
            image: '',
            description: '',
            tag: '',
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
        }
    },
    methods: {
        onCreateArticle (){
            const pdata = {
                title: this.title,
                image: this.image,
                description: this.description,
                teacher: this.teacher.state,
                tag: this.tag
            }
            this.$store.dispatch('createArticle',pdata)
            this.$router.push('/')
        }
    }
}
</script>
