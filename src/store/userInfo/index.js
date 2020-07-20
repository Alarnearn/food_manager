import {get,post} from "@/http/axios";
export default {
    namespaced:true,
    state:{
      usersDate:[],
    
    },
    getters:{

    },
    mutations:{
        setuser(state,data){
            state.usersDate = data;
        }
    },
    actions:{
        async saveUser(context,params){
            console.log(params)
            await post('/baseUser/saveOrUpdate',params)
        },
    }
}