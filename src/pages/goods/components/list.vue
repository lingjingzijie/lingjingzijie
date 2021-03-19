<template>
  <div>
    <el-table
      :data="goodsData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="first_cateid" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template v-slot="prop">
          <img v-if="prop.row.img" :src="$proImg + prop.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column prop="isnew" label="是否新品">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否新品">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  computed:{
    ...mapGetters({
        goodsData:'goods/goodsList',
    })
    
  },

  methods:{
    ...mapActions({
      requestGoodsList:'goods/goodsListActions'
    })
  },

  mounted(){
    this.requestGoodsList()
  }

}
</script>

<style>
img{
  width: 100px;
  height: 100px;
}
</style>