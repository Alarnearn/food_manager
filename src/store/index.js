import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import classification from './recipeManager/classification'
import management from './recipeManager/management'
import userInfo from './userInfo/index'
import nutrients from '././nutrients/index'
import foodManagement from './foodManager/foodManagement'
import foodClassification from './foodManager/foodClassification'
import search from './search/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    management,
    userInfo,
    nutrients,
    foodManagement,
    foodClassification,
    classification,
    search,
  },
  getters
})

export default store
