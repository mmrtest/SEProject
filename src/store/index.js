import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        loadArticles:[
            { image: 'https://c.pxhere.com/photos/4c/88/photo-282321.jpg!d', id: 'asdada', title: 'Tesla Takoyaki'},
            { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/680px-Banana-Single.jpg', id: 'fdgffasdfas', title: 'Electric Banana'},
        ]

    },

    mutations: {
        setUser (state, payload){
            state.user = payload;
        }
    },

    actions: {
        signUserup ({commit},payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    const newUser = {
                        id: user.uid,

                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
        },
        logUserin ({commit},payload){
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    const newUser = {
                        id: user.uid,
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
        }
        
    },

    getters: {
        user(state) {
            return state.user
        },
        loadArticles(state){
            return state.loadArticles
        },
        getArticle (state,getters){
            return getters.loadArticles.slice(0,5)
        } ,
        loadArticle(state){
            return (articleId) => {
                return state.loadArticles.find((article) =>{
                    return article.id === articleId
                })
            }
        },
        
        
    },

})