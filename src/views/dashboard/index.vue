<template>
  <div>
    <div class="search_top">
      <div class="search_bar">
        <div class="search_button">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
          <input placeholder="小麦" v-model="input" >          
          <button @click="toSearch">搜索</button>
        </div>
      
        <div class="search_name">
          <div class="search_nameItems">
            <div v-for="item1 in searchContent.list" 
            :key="item1.id"
            :value="item1.foodId"> 
                <div @click="toLook1(item1)" class="item1_name">{{item1.name}}</div> 
            </div>
          </div>
          <div>请先选择食物</div>          
        </div> 
      </div>  
    </div>
    <!-- 下面区域的内容 -->
    <div class="content">
      <div class="content_title">
        <img src="../../assets/index.png" alt="">
        <div>食谱推荐</div>
      </div>
      <div class="management_table" > 
          <div v-for="item in management.list" :key="item.id" @click="toLook(item)">
            <div class="management_item">
              <img src="../../assets/leftlogo.jpg" alt="">
              {{item.title}}
            </div>
          </div>
      </div>
    </div>
    <!-- 查看营养成分模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="100">
        <el-form :model="form">
            <div v-html="form.content">{{form.content}}</div>           
        </el-form>
        <div>
        <el-button @click="dialogFormVisible = false" class="management_button">关闭</el-button>
        </div>
    </el-dialog>
    <!-- 模态框 -->
    <!-- 查看营养成分模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible2" width="100">
        <el-form :model="form2">
            <div v-html="form2.content">{{form2.content}}</div>           
        </el-form>
        <div>
        <el-button @click="dialogFormVisible = false" class="management_button">关闭</el-button>
        </div>
    </el-dialog>
    <!-- 模态框 -->
  </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
  data(){
    return{
      input:'',
      form:{},
      form2:{},
      dialogFormVisible:false,
      dialogFormVisible2:false,
      title:''
    }
  },
  created(){
      this.load()
  },
  computed:{
      ...mapState('management', ['management']),
      ...mapState('search', ['searchContent'])
  },
  methods:{
    ...mapActions('management',['toLoadManagement']),
    ...mapActions('search', ['searchByFoodId','toLoadSearchContent']),
    // 加载信息
    load(){
      let obj1 = {
          page:1,
          pageSize:100
      }
      this.toLoadManagement(obj1);
      let obj2 = {
          page:1,
          pageSize:100
      }
      this.toLoadSearchContent(obj2)
    },
    // 内容区域点击标题搜索
     toLook(item){
        // console.log(id)
        this.dialogFormVisible = true
        this.title = item.title
        this.form.content = item.content
    },
    // 输入框输入内容后点击搜索
    toSearch(){
      if(this.input){
        let obj3 = {
          page:1,
          pageSize:100,
          name: this.input
        }
        this.toLoadSearchContent(obj3)
      }
      console.log(obj3)
    },
    // 搜索框查看营养成分
    toLook1(item1){
      this.dialogFormVisible2 = true
        this.title =  '营养元素'
        this.searchByFoodId(item1.id).then(r=>{
            this.form2.content = item1.content
        })
    },
  }
}
</script>
<style scoped>
.search_top{
  padding: 28px 0;
}
.search_bar{
  position: relative;
  width: 500px;
  margin: 0 auto;
}
.search_button{
  border: 1px solid pink;
  height: 38px;
  line-height: 38px;
  border-radius: 19px;
  padding-left: 10px;
  overflow: hidden;
}

.search_button i{
  height: 18px;
  width: 18px;
}
.search_button input{
  font-size: 14px;
  width: 330px;
  border: none;
}
.search_button button{
  float: right;
  background-color:pink;
  border:pink;
  color: #fff;
  cursor: pointer;
  width: 90px;
  height: 38px;
}
.search_name{
  margin-top: 20px;
  text-align: center;
}
.search_name>div:last-child{
  font-size: 14px;
  color: red;
}
.search_nameItems>div{
  display: inline-block;
}
.search_nameItems .item1_name{
  width: 50px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #fda0a9;
}
.content{
  margin-left: 10px;
}
.content_title{
  width: 95%;
  height: 50px;
  margin-bottom: 30px;
}
.content_title img{
  border: none;
  width:50px;
  height:50px;
  position: relative;
  top: 20px;
}
.content_title > div{
  font-size:20px;
  display: inline-block;
}
.management_table .management_item{
  font-size: 14px;
  margin: 5px;
  cursor: pointer;
}
.management_item img{
  border: none;
  width: 15px;
  height: 15px;
}
</style>