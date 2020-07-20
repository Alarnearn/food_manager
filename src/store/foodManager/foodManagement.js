import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    management: [],
  },
  getters:{},
  mutations: {
    setManagement(state, data) {
      state.management = data
    },
  },
  actions: {
    // 查询所有食物信息
    async toLoadManagement(context,params){
        // console.log(params)
      let res = await get('/food/pageQuery',params);
      context.commit('setManagement',res.data.data)
      // console.log(res.data.data)
    },
    // 保存所有食物信息
    async saveManagement(context,params){
      // console.log(params)
      await post('/food/saveOrUpdate',params);
    },
	// 删除食物信息
    async deleteManagement(context,params){
      // console.log(params)
      await get('/food/deleteById?id='+params);
    },
    // 查找食物营养成分信息
    async findByFoodId(context,params){
      await get('nutrition/findByFoodId?foodId='+params);
    }
  }
}