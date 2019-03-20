import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null
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
        }
        
    },

    getters: {
        user(state) {
            return state.user
        }
    },

})