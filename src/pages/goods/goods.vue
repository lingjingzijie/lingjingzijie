<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加子组件 -->
    <v-add :info="info"></v-add>
    <!-- 列表子组件 -->
    <v-list></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        show: false,
        title: "",
        isAdd: true,
      },
    };
  },
  methods: {
    add() {
      this.info = {
        show: true,
        title: "添加商品",
        isAdd: true,
      };
    },
  },
  components: {
    vAdd,
    vList
  },
};
</script>

<style scoped>
.el-button{
    margin-top: 10px;
}
</style>