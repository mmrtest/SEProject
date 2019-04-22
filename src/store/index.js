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
        },
        setcreateArticle (state, payload){
            state.loadArticles.push(payload);
        },
    },

    actions: {
        createArticle ({commit},payload){
            const article = {
                title: payload.title,
                image: payload.image,
                description: payload.description,
                teacher: payload.teacher,
                tag: payload.tag
            }
            firebase.database().ref('articles').push(article)
                .then((data) => {
                    console.log(data)
                    commit('setcreateArticle',article)
                })
                .catch((error) => {
                    console.log(error)
                })
            
        },
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
                        image: obj[key].image,
                        description: obj[key].description,
                        teacher: obj[key].teacher,
                        tag: obj[key].tag
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
        loadArticlesLength(state){
            return state.loadArticles.length
        },
        getArticle (state,getters){
            var temp = (Math.floor(Math.random() * (10 - 1 + 1)) + 1) % (state.loadArticles.length - 5)
            return getters.loadArticles.slice(temp,temp+5)
        } ,
        getrandArticle(state){
            return (articleId) => {
                return state.loadArticles[articleId]
            }
        },
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