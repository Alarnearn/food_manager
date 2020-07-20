<template>
    <div class="classification">
        <div class="classification_title">
          <el-button class="classification_button" size="small" @click="toAdd()">新增</el-button>           
        </div>
        <div class="classification_table"> 
            <el-table
            size="small"
            :data="classification"
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
                label="名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="introduce"
                align="center"
                label="介绍">
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="{row}">
                    <el-button type="text" class="classification_span" size="small" @click="toDelete(row.id)">删除</el-button>
                    <el-button type="text" class="classification_span" size="small" @click="toEdit(row)">修改</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 修改模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="100">
            <el-form :model="form">
            <el-form-item label="名称">
                <el-input v-model="form.name" autocomplete="off" :required="true" ></el-input>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input  type="textarea" :rows="2" v-model="form.introduce" autocomplete="off"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="toSave" class="classification_button">确 定</el-button>
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
            dialogFormVisible: false,
            title:'',
            form:{},
        }
    },
    computed:{
        ...mapState('foodClassification', ['classification'])
    },
    created(){
        this.load()
    },
    methods:{
        ...mapActions('foodClassification',['toLoadClassification','saveClassification','deleteClassification']),
        // 删除信息
        toDelete(id){
            this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteClassification(id).then(r=>{
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
            this.saveClassification(temp).then(r=>{
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
			this.toLoadClassification()
        },
    },
}
</script>
<style scoped>
.classification{
    width: 99%;
    min-height: calc(100vh - 70px);
    background-color: #fff;
    /* padding: 10px; */
    margin:10px;
}
.classification_title{
    width: 200px;
    float: left;
    margin-right: 10px;
}
.classification_table{
    max-height: 400px;
    overflow: auto;
    width: 102%;
    margin-bottom: 10px;
}
.el-dialog .el-input{
    width: 90%;
}
/* // el-button按钮样式 */
.classification_button{
    margin-top: 10px;
    margin-left: 10px;
    color: #fff; 
    background-color:#ff9aa4;
    border-color:#ff9aa4;
    border-radius: 10%;
}
.classification_span{
   color:#ff9aa4; 
}
</style>