import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    nutrition: [],
  },
  getters:{},
  mutations: {
    setNutrition(state, data) {
      state.nutrition = data
    },
  },
  actions: {
    // 查询所有营养成分信息
    async toLoadNutrition(context,params){
        // console.log(params)
      let res = await get('/nutritionConfig/pageQuery',params);
      context.commit('setNutrition',res.data.data)
      // console.log(res.data.data)
    },
    
    async saveNutrition(context,params){
      // console.log(params)
      await post('/nutritionConfig/saveOrUpdate',params);
    },

    async deleteNutrition(context,params){
      // console.log(params)
      await get('/nutritionConfig/deleteById?id='+params);
    }
  }
}