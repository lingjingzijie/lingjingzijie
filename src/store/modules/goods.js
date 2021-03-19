import { getGoods } from "../../utils/requset";
const state = {
    goodsList:[],
    size:'',
    page:''
}
const mutations = {
    changeGoodsList(state,arr){
        state.goodsList = arr
    }
}

const actions = {
    goodsListActions(context){
        getGoods(null).then(res=>{
            context.commit('changeGoodsList',res.data.list)
        })
    }
}

const getters = {
    goodsList(state){
        return state.goodsList
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}