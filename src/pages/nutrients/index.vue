<template>
    <div class="nutrition">
        <div class="nutrition_title">
          <el-button class="nutrition_button" size="small" @click="toAdd()">新增</el-button>           
        </div>
        <div class="nutrition_table"> 
            <el-table
            size="small"
            :data="nutrition.list"
            style="width: 100%">
            <el-table-column
                type=index
                prop="id"
                align="center"
                label="序号"
                width="80">
            </el-table-column>
            <el-table-column
                prop="name"
                align="center"
                label="中文名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="value"
                align="center"
                label="英文名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="unit"
                align="center"
                label="单位">
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="{row}">
                    <el-button type="text" class="nutrition_span" size="small" @click="toDelete(row.id)">删除</el-button>
                    <el-button type="text" class="nutrition_span" size="small" @click="toEdit(row)">修改</el-button>
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
        <!-- 修改模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="100">
            <el-form :model="form">
            <el-form-item label="中文名称">
                <el-input v-model="form.name" autocomplete="off" :required="true"></el-input>
            </el-form-item>
            <el-form-item label=" 英文名称">
                <el-input v-model="form.value" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位">
                <el-input v-model="form.unit" autocomplete="off"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="toSave" class="nutrition_button">确 定</el-button>
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
            page: 1,
            pageSize: 6,
            total: 100,
            dialogFormVisible: false,
            title:'',
            form:{},
        }
    },
    computed:{
        ...mapState('nutrients', ['nutrition'])
    },
    created(){
        this.load()
    },
    methods:{
        ...mapActions('nutrients',['toLoadNutrition','saveNutrition','deleteNutrition']),
        // 删除信息
        toDelete(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteNutrition(id).then(r=>{
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
            this.dialogFormVisible = true
            this.title = '修改营养成分信息'
            this.form = row
        },
        //  保存信息
        toSave(){
            let temp = this.form
            this.saveNutrition(temp).then(r=>{
                this.load()
                this.dialogFormVisible = false
            })
        },
        // 新增信息
        toAdd(){
            this.form = {}
            this.dialogFormVisible = true
            this.title = '新增营养成分信息'
        },
        // 加载信息
    	load(){
    		let obj1 = {
    			page:this.page,
    			pageSize:this.pageSize
    		}
			this.toLoadNutrition(obj1).then(r=>{
				this.total = this.nutrition.total
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
.nutrition{
    width: 99%;
    min-height: calc(100vh - 70px);
    background-color: #fff;
    /* padding: 10px; */
    margin:10px;
}
.nutrition_title{
    width: 200px;
    float: left;
    margin-right: 10px;
}
.nutrition_table{
    max-height: 400px;
    overflow: auto;
    width: 102%;
    margin-bottom: 10px;
}
.el-dialog .el-input{
    width: 90%;
}
/* // el-button按钮样式 */
.nutrition_button{
    margin-top: 10px;
    margin-left: 10px;
    color: #fff; 
    background-color:#ff9aa4;
    border-color:#ff9aa4;
    border-radius: 10%;
}
.nutrition_span{
   color:#ff9aa4; 
}
</style>