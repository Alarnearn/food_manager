import {get,post} from '../../http/axios'
export default {
  namespaced: true,
  state: {
    classification: [],
  },
  getters:{},
  mutations: {
    setClassification(state, data) {
      state.classification = data
    },
  },
  actions: {
    // 查询所有食物分类信息
    async toLoadClassification(context,params){
        // console.log(params)
      let res = await get('/foodType/findAll');
      context.commit('setClassification',res.data.data)
      // console.log(res.data.data)
    },
    // 保存所有食物分类信息
    async saveClassification(context,params){
      // console.log(params)
      await post('/foodType/saveOrUpdate',params);
    },
	// 删除食物分类信息
    async deleteClassification(context,params){
      // console.log(params)
      await get('/foodType/deleteById?id='+params);
    }
  }
}