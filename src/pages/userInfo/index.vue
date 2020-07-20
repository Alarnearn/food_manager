<template>
    <div class="user">
       <div class="user_content">
            <el-card class="user_left">
            <div class="userInfo">
                <div>用户名：&nbsp;&nbsp;<span>{{userInfo.username}}</span> </div><br> 
                <div>姓 名：&nbsp;&nbsp;<span>{{userInfo.realname}}</span></div><br> 
                <div>手机号：&nbsp;&nbsp;<span>{{userInfo.telephone}}</span></div><br> 
                <div>性 别：&nbsp;&nbsp;<span>{{userInfo.gender}}</span></div><br> 
                <div>注册时间：&nbsp;&nbsp;
                    <span><template>{{userInfo.registerTime | dateParse}}</template></span>
                </div><br> 
                <div>状态：&nbsp;&nbsp;<span>{{userInfo.status}}</span></div><br> 
                <!-- <div>身份证号：&nbsp;&nbsp;<span>{{userInfo.idCard}}</span></div><br> 
                <div>地 址：&nbsp;&nbsp;<span>{{userInfo.address}}</span></div><br> 
                <div>民 族：&nbsp;&nbsp;<span>{{userInfo.nation}}</span></div><br> 
                <div>政治身份：&nbsp;&nbsp;<span>{{userInfo.politicsStatus}}</span></div><br>  -->
            </div>
            <div class="user_right">
                
               <img :src="userInfo.userFace" alt="">
            </div>
            </el-card>
       </div>
       <div class="user_button">
           <el-button size="small" @click="toEdit">修改</el-button>
       </div>
        

        <!-- 修改模态框 -->
        <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
            <el-form-item label="用户名">
                <el-input v-model="form.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.realname" autocomplete="off" required></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.telephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="form.gender" label="男">男</el-radio>
                <el-radio v-model="form.gender" label="女">女</el-radio>
            </el-form-item>
            <!-- <el-form-item label="身份证号">
                <el-input v-model="form.idCard" autocomplete="off" required></el-input>
            </el-form-item>
            <el-form-item label="民族">
                <el-input v-model="form.nation" autocomplete="off" required></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address" autocomplete="off" required></el-input>
            </el-form-item>
            <el-form-item label="政治身份">
                <el-input v-model="form.politicsStatus" autocomplete="off" required></el-input>
            </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button style=" color: #fff; background-color:#ff9aa4;border-color:#ff9aa4;" @click="toSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    
    
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return {
        value: true,
        form:{

        },
        
        dialogFormVisible:false, 
        }
    },
     created(){
        // this.load()
    },
     computed:{
        ...mapState('user',['userInfo'])
    },
    methods:{
        ...mapActions('userInfo',['saveUser']),
        ...mapActions('user',['getInfo']),
        toEdit(){
            this.form = {
                realname:this.userInfo.realname,
                telephone:this.userInfo.telephone,
                username:this.userInfo.username,
                password:this.userInfo.password,
                gender:this.userInfo.gender,
                registerTime:this.userInfo.registerTime,
                status:this.userInfo.status,
                idCard:this.userInfo.idCard,
                address:this.userInfo.address,
                nation:this.userInfo.nation,
                politicsStatus:this.userInfo.politicsStatus,
                id:this.userInfo.id
            }
            this.dialogFormVisible=true;
            console.log(this.form )
        },
        toSave(){
            let temp = this.form;
            this.saveUser(temp).then(()=>{
                // this.load();
                this.getInfo();
                this.dialogFormVisible=false;
            })
        },
        // load(){
        //     this.toLoadUser();
        // }

    }
}
</script>
<style scoped>
.user{
    width: 100%;
    overflow: hidden;
}
.user_content{

    margin: 10px 0 10px 10px;
}
.user_left{
    float: left;
    width: 500px;
}
.userInfo{
    display: inline-block;
    width: 300px;
}
.userInfo span{
    color: #999;
}
.user_right{
    display: inline-block;
    position: absolute;
}
.user_right img{
    margin-top: 20px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
.user_button{
    width: 500px;
}
/* // el-button按钮样式 */
.user_button .el-button{
    margin-top: 10px;
    margin-left: 10px;
    color: #fff; 
    background-color:#ff9aa4;
    border-color:#ff9aa4;
    border-radius: 10%;
}
.el-dialog .el-input{
    width: 90%;
}
</style>