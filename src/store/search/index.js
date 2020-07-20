import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    searchContent: [],
  },
  getters:{},
  mutations: {
    setSearchContent(state, data) {
      state.searchContent = data
    },
  },
  actions: {
    // 查询所有食物信息
    async toLoadSearchContent(context,params){
        // console.log(params)
        let res = await get('/food/pageQuery',params);
        context.commit('setSearchContent',res.data.data)
        // console.log(res.data.data)
    },
    // 查找食物营养成分信息
    async searchByFoodId(context,params){
      await get('nutrition/findByFoodId?foodId='+params);
    }
  }
}