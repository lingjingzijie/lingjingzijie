<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @opened='opened'>
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeCate">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="item in seconedCate" :key="item.id"  :value="item.id" :label=" item.catename"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <div class="img-box">
            <h3>+</h3>
            <!-- -->
            <img v-if="imageUrl"  :src="imageUrl"  alt="">
            <input type="file" @change="changeImg">
          </div>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="changeSpec">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="(item,index) in secondSpec" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <div id="div1"></div>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import E from 'wangeditor'
import { mapActions, mapGetters } from 'vuex';
import { successAlert, waringAlert } from '../../../utils/alert';
import {addGoods} from "../../../utils/requset";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        price: "",
        market_price: "",
        img: "",
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      formLabelWidth: "120px",
      seconedCate:[],//获取二级分类列表
      secondSpec:[],//获取规格属性列表
      imageUrl:'', //要显示在图片中的地址
      editor:''
    };
  },
  computed:{
    ...mapGetters({
      cateList:'cate/cateList',
      specList:'spec/specList'
    })
  },
  methods:{
    ...mapActions({
      requestCateList:'cate/cateListActions',
      requestSpecList:'spec/specListActions',
    }),
    // 对话框打开之后的回调
    opened(){
      this.editor = new E('#div1')
      this.editor.create()
      this.editor.txt.html(this.form.description)
    },
    // 改变一级分类二级分类
    changeCate(){
      // 每次选中先清空二级分类
      this.form.second_cateid = '';
      let index = this.cateList.findIndex(item=>item.id == this.form.first_cateid)
      this.seconedCate = this.cateList[index].children
    },
    changeSpec(){

      this.form.specsattr= []
      
      let index = this.specList.findIndex(item=>item.id == this.form.specsid)
      this.secondSpec = this.specList[index].attrs
    },
    // 改变图片时获取图片的地址和信息
    changeImg(e){
      var file = e.target.files[0];
      // 1.文件大小处理
      if(file.size > 2*1024*1024){
        waringAlert('上传图片大小不能超过2M')
        return;
      }
      // 2.文件的后缀处理
      var ext = ['.jpg','.png','.jpeg','.gif']
      var extName = file.name.slice(file.name.lastIndexOf('.')) ;
      if(!ext.some(item=>item==extName)){
        waringAlert('上传图片格式不正确')
      }
      // 3.将图片信息生成图片地址并显示
      this.imageUrl = URL.createObjectURL(file)
      // 4.见图片信息存入this.form.img
      this.form.img = file
    },
    cancel(){
      this.info.show = false
      this.form={
        first_cateid: "",
        second_cateid: "",
        price: "",
        market_price: "",
        img: "",
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1,
        ishot: 1,
        status: 1,
      }
      this.imageUrl = ''
    },
    confirm(){
      this.form.description = this.editor.txt.html();
      console.log(this.form);
      addGoods(this.form).then(res=>{
        successAlert(res.data.msg)
        this.cancel()
      })
    },
  },
  mounted(){
    // 一级分类列表
    this.requestCateList()
    // 商品规格列表
    this.requestSpecList(true)
  }
};
</script>

<style scoped>
.img-box{
  width: 150px;
  height: 150px;
  border: 1px dashed #000;
  position: relative;
}
.img-box h3{
  text-align: center;
  line-height: 150px;
  width: 100%;
  height: 100%;
}
.img-box img{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

}
.img-box input{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>