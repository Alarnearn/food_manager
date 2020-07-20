import {get,post} from '../../http/axios'
export default{
    namespaced: true,
    state:{
        category:[],
    },
    getters:{},
    mutations: {
        setCategory(state, data) {
            state.category = data
            // console.log(state.category)
        },
    },
    actions:{
        // 加载页面信息
        async toLoadCategory(context,params){
            // console.log(params)
          let res = await get('/category/findAll');
          context.commit('setCategory',res.data.data)
        //   console.log(res.data.data)
        },
        async saveCategory(context,params){
            // console.log(params)
            await post('/category/saveOrUpdate',params);
        },
    
        async deleteCategory(context,params){
            // console.log(params)
            await get('/category/deleteById?id='+params);
        }
    }
}