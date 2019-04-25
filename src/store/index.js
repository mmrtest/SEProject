import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: {id: '',saveArticle: [],key: {}},
        loadArticles:[],
        loading: false,
        error: null,
    },

    mutations: {
        setloadArticles (state, payload){
            state.loadArticles = payload;
        },
        setsaveArticle(state,payload){
            if(state.user.saveArticle.findIndex(article => article.id === payload.id) >= 0){
                return
            }
            state.user.saveArticle.push(payload.id)
            state.user.key[payload.id] = payload.key
        },
        setunsaveArticle(state,payload){
            var article = state.user.saveArticle
            var index = 0
            for(let key in article){
                console.log(key)
                if(article[key] == payload){
                    break
                }
                index+=1
            }
            console.log(state.user.saveArticle)
            console.log(payload)
            state.user.saveArticle.splice(index,1)
            console.log(index)
            
            
            Reflect.deleteProperty(state.user.key,payload)
        },
        setLogout (state){
            state.user = {};
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
        setdeleteArticle (state, payload){
            const index = state.loadArticles.findIndex((articles) =>{
                return payload.Aid === articles.id
            })
            state.loadArticles.splice(index,1)
        },
        setupdateArticle (state, payload){
            const article = state.loadArticles.find(articles => {
                return articles.id === payload.id
            })
            article.title = payload.title
            article.image = payload.image
            article.description = payload.description
            article.teacher = payload.teacher
            article.tag = payload.tag
            article.nameStudent1 = payload.nameStudent1
            article.idStudent1 = payload.idStudent1
            article.nameStudent2 = payload.nameStudent2
            article.idStudent2 = payload.idStudent2
            article.link = payload.link
        },
    },

    actions: {
        createArticle ({commit},payload){
            const article = {
                title: payload.title,
                image: payload.image,
                description: payload.description,
                teacher: payload.teacher,
                tag: payload.tag,
                nameStudent1: payload.nameStudent1,
                idStudent1: payload.idStudent1,
                nameStudent2: payload.nameStudent2,
                idStudent2: payload.idStudent2,
                creator: payload.creator,
                link: payload.link,
                view: 0
            }
            firebase.database().ref('articles').push(article)
                .then((data) => {
                    const key = data.key
                    commit('setcreateArticle',{...article,id: key})
                })
                .catch((error) => {
                    console.log(error)
                })
            
        },
        deleteArticle ({commit},payload){
            firebase.database().ref('articles/' + payload.Aid).remove()
                .then(
                    commit('setdeleteArticle',{Aid: payload.Aid})
                )
                .catch((error) => {
                    console.log(error)
                })
            
        },
        updateArticle({commit},payload){
            commit('setLoading', true)
            const update = {
                title: payload.title,
                image: payload.image,
                description: payload.description,
                teacher: payload.teacher,
                tag: payload.tag,
                nameStudent1: payload.nameStudent1,
                idStudent1: payload.idStudent1,
                nameStudent2: payload.nameStudent2,
                idStudent2: payload.idStudent2,
                link: payload.link,
            }
            firebase.database().ref('articles').child(payload.id).update(update)
                .then(() => {
                    commit('setLoading', false)
                    commit('setupdateArticle',payload)
                })
                .catch(
                    error => {
                        commit('setLoading', false)
                    }
                )
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
                        tag: obj[key].tag,
                        nameStudent1: obj[key].nameStudent1,
                        idStudent1: obj[key].idStudent1,
                        nameStudent2: obj[key].nameStudent2,
                        idStudent2: obj[key].idStudent2,
                        creator: obj[key].creator,
                        view: obj[key].view,
                        link: obj[key].link,
                    })
                }
                commit('setloadArticles',articles)
                commit('setLoading', false)
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
                users => {
                    
                    const newUser = {
                        id: users.user.uid,
                        saveArticle: [],
                        key: {}
                    }
                    commit('setUser', newUser)
                    commit('setLoading',false)
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
                users => {
                    
                    const newUser = {
                        id: users.user.uid,
                        saveArticle: [],
                        key: {}
                    }
                    commit('setUser', newUser)
                    commit('setLoading',false)
                }
            )
            .catch(
                error => {
                    commit('setLoading',false)
                    commit('setError',error)
                    console.log(error)
                }
            )
        },
        onLogout ({commit}){
            firebase.auth().signOut()
            commit('setLogout')
        },
        loadsaveArticles ({commit,getters}) {
            
            commit('setLoading', true)
           
            firebase.database().ref('/users/' + getters.user.id + '/reg/').once('value')
            .then((data) => {
                const obj = data.val()
                let reg = []
                let swapkey = {}
                for(let key in obj){
                    reg.push(obj[key])
                    swapkey[obj[key]] = key
                }
                const updatedUser = {
                    id: getters.user.id,
                    saveArticle: reg,
                    key: swapkey
                }
                //console.log(obj)
                //console.log(reg)
                //console.log(swapkey)
                //console.log(updatedUser)
                commit('setUser',updatedUser)
                commit('setLoading', false)
            })
            .catch(
                error => {
                    commit('setLoading', false)
                }
            )
            
        },
        registerArticle({commit,getters},payload){
            commit('setLoading',true)
            firebase.database().ref('/users/' + getters.user.id).child('/reg/').push(payload)
                .then((data) => {
                    commit('setLoading',false)
                    commit('setsaveArticle',{key: data.key,id: payload})
                })
                .catch((error) => {
                    commit('setLoading',false)
                    console.log(error)
                })
            
        },
        unregisterArticle({commit,getters},payload){
            commit('setLoading',true)
            const user = getters.user
            if(!user.key){
                return
            }
            const keys = user.key[payload]
            firebase.database().ref('/users/' + getters.user.id + '/reg/').child(keys).remove()
                .then(() => {
                    commit('setLoading',false)
                    commit('setunsaveArticle',payload)
                })
                .catch((error) => {
                    commit('setLoading',false)
                    console.log(error)
                })
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