<template>
    <div class="container">
        <el-row>
            <el-col :span="18" :offset="6">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
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
                        <el-button type="primary" @click="submitForm('ruleForm')" >修改密码</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { httpUpdatePassWord } from "../../../service/http";
export default {
  name: "editPassword",
  data() {
    var validatePass_old = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        // if (this.ruleForm.password !== '') {
        //     this.$refs.ruleForm.validateField('password');
        // }
        callback();
      }
    };
    var validatePass_confirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
        console.log(value);
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password_old: "",
        password: "",
        password_confirm: ""
      },
      rules: {
        password_old: [{ validator: validatePass_old, trigger: "change" }],
        password: [
          { validator: validatePass, trigger: "change" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: "密码必须由8到16位数字与字母组合！"
          }
        ],
        password_confirm: [
          { validator: validatePass_confirm, trigger: "change" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: "密码必须由8到16位数字与字母组合！"
          }
        ]
      }
    };
  },
  methods: {
    resetForm() {},
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          httpUpdatePassWord(
            this.ruleForm.password_confirm,
            this.ruleForm.password_old
          )
            .then(res => {
              let data = res.data;
              console.log(data);
              if (data.statu == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
              } else {
                this.$message.error(data.message);
              }
            })
            .catch();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
