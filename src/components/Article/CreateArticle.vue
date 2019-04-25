
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
                                class="px-3 pt-3 "
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
                                class="px-3 pt-3 "
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
                        class="px-3 "
                        v-model="teacher"
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
                    <h2 class="px-3">Students</h2>
                    <v-layout row>        
                        <v-flex xs8>
                            <v-text-field
                                class="px-3"
                                name="nameStudent1"
                                label="Name"
                                id="nameStudent1"
                                v-model="nameStudent1"
                                required></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                class="px-3"
                                name="idStudent1"
                                label="ID"
                                id="idStudent1"
                                v-model="idStudent1"
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
                                v-model="nameStudent2"
                                required></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                class="px-3 py-3"
                                name="idStudent2"
                                label="ID"
                                id="idStudent2"
                                v-model="idStudent2"
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
                                v-model="link"
                                required></v-text-field>
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
                    <img class="px-3 py-3 " :src="image" style="max-width:840px;border:5px solid white">              
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
            teacher: 'Anya Apavatjrut',
            items: ['Anya Apavatjrut','Arnan Sipitakiat','Chinawat Isradisaikul','Dome Potikanond','Juggapong Natwichai','Karn Patanukhom','Kasemsit Teeyapan','Kenneth Cosh'
            ,'Lachana Ramingwong','Narathip Tiangtae','Narissara Eiamkanitchat','Navadon Khunlertgit','Paskorn Champrasert','Patiwet Wuttisarnwattana'
            ,'Pruet Boonma','Sakgasit Ramingwong','Sanpawat Kantabutra','Sansanee Auephanwiriyakul','Santi Phithakkitnukoon',
            'Trasapong Thaiupathump','Yuthapong Somchit'],
            title: '',
            image: '',
            description: '',
            tag: '',
            nameStudent1: '',
            idStudent1: '',
            nameStudent2: '',
            idStudent2: '',
            link: '',
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
        formIsValid () {
            return this.title !== '' && this.description !== '' && this.image !== '' && this.teacher !== '' 
        },
        getuserId (){
            return this.$store.getters.user.id
        },
    },
    methods: {
        onCreateArticle (){
            const pdata = {
                title: this.title,
                image: this.image,
                description: this.description,
                teacher: this.teacher,
                tag: this.tag,
                nameStudent1: this.nameStudent1,
                idStudent1: this.idStudent1,
                nameStudent2: this.nameStudent2,
                idStudent2: this.idStudent2,
                creator: this.$store.getters.user.id,
                link: this.link
            }

            this.$store.dispatch('createArticle',pdata)
            this.$router.push('/')
        }
    }
}
</script>
