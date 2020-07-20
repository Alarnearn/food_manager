import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    management:[],
  },
  getters:{},
  mutations: {
    setManagement(state, data) {
      state.management = data
    },
  },
  actions: {
    // 查询所有食谱管理
    async toLoadManagement(context,params){
      // console.log(params)
      let res = await get('/article/pageQuery',params);
      context.commit('setManagement',res.data.data)
      // console.log(res.data.data)
    },
    // 保存更新食谱管理信息
    async saveManagement(context,params){
      let res = await post('/article/saveOrUpdate',params);
    },
    // 删除食谱管理相关信息
    async deleteManagement(context,params){
      await get('/article/deleteById?id='+params)
    },
  }
}