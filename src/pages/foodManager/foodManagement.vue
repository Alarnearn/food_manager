<template>
    <div class="management">
        <div class="management_title">
          <el-button class="management_button" size="small" @click="toAdd()">新增</el-button>           
        </div>
        <div class="management_table"> 
            <el-table
            size="small"
            :data="management.list"
            style="width: 100%">
            <el-table-column
                prop="id"
                align="center"
                label="序号"
                width="80"
                type=index>
            </el-table-column>
            <el-table-column
                prop="name"
                align="center"
                label="名称"
                width="120">
            </el-table-column>
            <el-table-column
                align="center"
                label="食物图片"
                width="180">
                <template slot-scope="scope">
                    <img width="50px" height="50px" :src="'http://134.175.154.93:8888/group1/'+ scope.row.photo" alt="Photo is Null">
                </template>
            </el-table-column>
            <el-table-column
                prop="introduce"
                align="center"
                label="介绍">
            </el-table-column>
            <!-- :show-overflow-tooltip="true" -->
            <el-table-column
                align="center"
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="{row}">
                    <el-button type="text" class="management_span" size="small" @click="toDelete(row.id)">删除</el-button>
                    <el-button type="text" class="management_span" size="small" @click="toEdit(row)">修改</el-button>
                    <el-button type="text" class="management_span" size="small" @click="toLook(row)">查看营养成分</el-button>
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
        <!-- 新增食物模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="100">
            <el-form :model="form">
            <el-form-item label="名称">
                <el-input v-model="form.name" autocomplete="off" :required="true"></el-input>
            </el-form-item>
            <el-form-item label=" 介绍">
                <el-input v-model="form.introduce" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="食物类型">
               <el-select size="small" v-model="form.typeId" placeholder="请选择资料类型">
                    <el-option
                    v-for="item in management.list"
                    :key="item.typeId"
                    :label="item.name"
                    :value="item.typeId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资料上传" >
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" style="color: #fff; background-color:#ff9aa4;border-color:#ff9aa4;margin:0;">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">文件大小不允许超过3M</div>
                </el-upload>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="toSave" class="management_button">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 新增食物信息模态框 -->

         <!-- 查看营养成分模态框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible2" width="100">
            <el-form :model="form2">
                <div v-html="form2.content"></div>           
            </el-form>
            <div>
            <el-button @click="toSave" class="management_button">提交</el-button>
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
            dialogFormVisible2: false,
            title:'',
            form:{},
            form2:{},
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
    },
    computed:{
        ...mapState('foodManagement', ['management'])
    },
    created(){
        this.load()
    },
    methods:{
        ...mapActions('foodManagement',['toLoadManagement','saveManagement','deleteManagement','findByFoodId']),
        // 文件上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
            this.dialogFormVisible = true
            this.title = '修改营养成分信息'
            this.form = row
        },
        toLook(row){
            this.dialogFormVisible2 = true
            this.title =  '营养元素'
            this.findByFoodId(row.id).then(r=>{
                this.form2.content = row.content
            }) 
        },
        //  保存信息
        toSave(){
            let temp = this.form
            this.saveManagement(temp).then(r=>{
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
    width: 200px;
    float: left;
    margin-right: 10px;
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
.el-dialog .el-select{
    width: 85%;
}
/* // el-button按钮样式 */
.management_button{
    margin-top: 10px;
    margin-left: 10px;
    color: #fff; 
    background-color:#ff9aa4;
    border-color:#ff9aa4;
}
.management_span{
   color:#ff9aa4; 
}
</style>