<template>
    <el-form :model="ruleForm" ref="form" :rules="rules" label-width="100px">
        <el-form-item label="原密码" prop="password_old">
            <el-col :span="6">
                <el-input type="password" v-model.trim="ruleForm.password_old" placeholder="密码"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-col :span="6">
                <el-input type="password" v-model.trim="ruleForm.password" placeholder="密码"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
            <el-col :span="6">
                <el-input type="password" v-model.trim="ruleForm.password_confirm" placeholder="确认密码"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()" :disabled="disabled">修改密码</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "editPassword",
        data() {
            var validatePass_old = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    if (this.ruleForm.password_old !== '') {
                        this.$refs.ruleForm.validateField('password_old');
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else {
                    if (this.ruleForm.password !== '') {
                        this.$refs.ruleForm.validateField('password');
                    }
                    callback();
                }
            };
            var validatePass_confirm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                disabled: false,
                ruleForm: {
                    password_old: '',
                    password: '',
                    password_confirm: ''
                },
                rules: {
                    password_old:[
                        {validator: validatePass_old, trigger: 'blur'},
                    ],
                    password:[
                        {validator: validatePass, trigger: 'blur'},
                        {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                            message: '密码必须由8到16位数字与字母组合！' }
                    ],
                    password_confirm: [
                        {validator: validatePass_confirm, trigger: 'blur'},
                        {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                            message: '密码必须由8到16位数字与字母组合！' }
                    ]
                }
            }
        },
        methods:{
            submitForm() {
                if(this.password === this.password_confirm){
                    this.disabled = true
                };
            },
            resetForm() {

            }
        }
    }
</script>

<style scoped>

</style>
