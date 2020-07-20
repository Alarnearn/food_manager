<template>
  <div>
      <div class="details_back" @click="toBack()">
        <div>返回</div>
      </div>
      <div class="details_form">
        <el-form :model="form">
          <el-form-item label=" 父栏目">
            <el-select v-model="form.categoryId" placeholder="请选择栏目所属" required>
                <el-option
                
                v-for="item in management.list"
                :key="item.id"
                :label="item.category.name"
                :value="item.categoryId">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
              <el-input  v-model="form.title" autocomplete="off" required></el-input>
          </el-form-item>
          <el-form-item label="正文">
            <mavon-editor v-model="form.content" @save="saveContent" />
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="toSave()" class="details_button">保存</el-button>
        </div>
      </div>
  </div>    
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
      return{
        form:{},
        title:'',
        
      }
    },
    created(){
      this.load()
      // console.log(this.$route.query.row)
    },
    computed:{
      ...mapState('management', ['management'])
    },
    methods:{
      ...mapActions('management',['toLoadManagement','saveManagement']),
      //  保存信息
        toSave(){
            let temp = this.form
            this.saveManagement(temp).then(r=>{
                this.$router.push({path:'management'})
            })
        },
      saveContent(value,render){
        // console.log('value',render)
        // console.log('value',render)
        this.form.content = render
      },
      // 返回上一层
      toBack(){
         this.$router.push({path:'management'})
      },
      // 加载信息
    	load(){
        // let obj1 = {
        //     page:1,
        //     pageSize:100
        // }
        // this.toLoadManagement(obj1)
        if(this.$route.query.row.id){
          this.form = this.$route.query.row
        }
        else{
          this.form = {}
        }
      },
    }
}
</script>
<style>
.details_back{
  width: 100%;
  height: 30px;
}
.details_back>div:first-child{
  margin-top: 15px;
  margin-left: 15px;
  color:#ff9aa4;
  cursor: pointer;
}
.details_form{
  margin-left: 15px;
}
.details_form .el-select{
  float: left;
}
.details_form .el-input{
  width: 90%;
  float: left;
}
.details_button{
  background-color:#ff9aa4;
  color: #fff;
  float: right;
}
</style>