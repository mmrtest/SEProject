import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/User/Register'
import Signin from '@/components/User/Signin'
import Article from '@/components/Article/Article'
import Search from '@/components/Article/Search'
import CreateArticle from '@/components/Article/CreateArticle'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [{
        path: '/',
        name: 'Hello',
        component: Home
    },
    {
        path: '/article/:id',
        name: 'Article',
        props: true,
        component: Article
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Register
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/create',
        name: 'create',
        component: CreateArticle
    }
    ]
})