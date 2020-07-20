<template>
    <div class="management">
        <div class="management_title">
          <el-button class="management_button" size="small" @click="toAdd()"> 录入食谱</el-button>         
        </div>
        <div style="display:inline-block;float:left;margin:5px 5px 5px 0;">所属栏目</div>
        <div class="management_title">
            <el-select @change="change1" size="small" v-model="value1" placeholder="请选择所属栏目" clearable>
                <el-option
                v-for="item in management.list"
                :key="item.id"
                :label="item.category.name"
                :value="item.categoryId">
                </el-option>
            </el-select>   
        </div>
        <div class="management_title">
            <el-input @change="change2" v-model="value2" size="small" placeholder="请输入标题内容" clearable></el-input>
        </div>
        <div class="management_table"> 
            <el-table
            size="small"
            :data="management.list"
            style="width: 100%">
            <el-table-column
                type=index
                prop="id"
                align="center"
                label="序号"
                width="80">
            </el-table-column>
            <el-table-column
                prop="title"
                align="center"
                label="标题">
            </el-table-column>
            <el-table-column
                align="center"
                label="发布日期"
                width="180">
                <template slot-scope="{row}">
                {{row.publishTime | dateParse}}
                </template>
            </el-table-column>
            <el-table-column
                prop="category.name"
                align="center"
                label="所属栏目">
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="{row}">
                    <el-button type="text" class="management_span" size="small" @click="toLook(row)">查看</el-button>
					          <el-button type="text" class="management_span" size="small" @click="toEdit(row)">编辑</el-button>
                    <el-button type="text" class="management_span" size="small" @click="toDelete(row.id)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
         <!-- 分页 -->
        <div>
            <el-pagination
            layout="total,prev, pager, next"
            :page-size="this.pageSize"
            :total="total"
            @current-change="handPage"
            />
        </div>
        <!-- 分页 -->
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
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
      return{
            page: 1,
            pageSize: 6,
            total: 100,
            input:'',
            dialogFormVisible: false,
            title:'',
            form:{},
            value1:'',
            value2:'',
        }
	},
    created(){
        this.load()
    },
    computed:{
        ...mapState('management', ['management'])
    },
    methods:{
        ...mapActions('management',['toLoadManagement','saveManagement','deleteManagement']),
        // 查看
        toLook(row){
            // console.log(row)
            this.dialogFormVisible = true
            this.title = row.title
            // this.loadContent()
            this.form.content = row.content
        },
        // 选中下拉框搜索
        change1(){
            if(this.value1){
                let obj = {
                    page:1,
                    pageSize:100,
                    categoryId:this.value1
                }
                this.toLoadManagement(obj)
            }else{
               this.load()
            }
        },
        // 输入框搜索
        change2(){
            if(this.value2){
                let obj = {
                    page:1,
                    pageSize:100,
                    title:this.value2
                }
                this.toLoadManagement(obj)
            }else{
               this.load()
            }
        },
        // 删除信息
        toDelete(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteManagement(id).then(r=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.load()
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                })
            }) 
        },
        // 修改信息
        toEdit(row){
            this.$router.push({path:'details',query:{row:row}})
        }, 
        // 新增信息
        toAdd(){
            this.$router.push({path:'details'})
        },
        // 加载信息
    	load(){
            let obj1 = {
                page:this.page,
                pageSize:this.pageSize
            }
            this.toLoadManagement(obj1).then(r=>{
            this.total = this.management.total
            })
        },
        // 分页触发事件
    	handPage(val){
    		this.page = val
    		this.load()
		},
    },
}
</script>
<style scoped>
.management{
    width: 99%;
    min-height: calc(100vh - 70px);
    background-color: #fff;
    /* padding: 10px; */
    margin:10px;
}
.management_title{
    /* width: 150px; */
    float: left;
    margin-right: 10px;
}
.management_title span{
    float:left;
}
.management_table{
    max-height: 400px;
    overflow: auto;
    width: 102%;
    margin-bottom: 10px;
}
.el-dialog .el-input{
    width: 90%;
}
/* // el-button按钮样式 */
.management_button{
    color: #fff; 
    background-color:#ff9aa4;
    border-color:#ff9aa4;
    border-radius: 10%;
}
.management_span{
   color:#ff9aa4; 
}
</style>