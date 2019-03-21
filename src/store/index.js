import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        loadArticles:[],
        loading: false,
        error: null,

    },

    mutations: {
        setloadArticles (state, payload){
            state.loadArticles = payload;
        },
        setUser (state, payload){
            state.user = payload;
        },
        setLoading (state, payload){
            state.loading = payload;
        },
        setError (state, payload){
            state.error = payload;
        },
        clearError (state){
            state.error = null;
        }
    },

    actions: {
        loadArticles ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('articles').once('value')
            .then((data) => {
                const articles = []
                const obj = data.val()
                for(let key in obj){
                    articles.push({
                        id: key,
                        title: obj[key].title,
                        image: obj[key].image
                    })
                }
                commit('setLoading', false)
                commit('setloadArticles',articles)
            })
            .catch(
                error => {
                    commit('setLoading', false)
                }
            )
        },
        signUserup ({commit},payload) {
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading',false)
                    const newUser = {
                        id: user.uid,

                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading',false)
                    commit('setError',error)
                }
            )
        },
        logUserin ({commit},payload){
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading',false)
                    const newUser = {
                        id: user.uid,
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading',false)
                    commit('setError',error)
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
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        },
        
        
    },

})