<template>
    <div class="divFlex">
        <template>
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="全部" name="first">
                    <el-form class="formBox" :inline="true" size="mini">
                        <el-form-item label="用户名">
                            <el-input v-model="userName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" icon="search" @click="handSearch">搜索</el-button>
                            <el-button type="primary" icon="search" @click="handAdd">新增</el-button>
                        </el-form-item>
                    </el-form>

                    <template>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="uid" label="序号" align="center"></el-table-column>
                            <el-table-column prop="username" label="姓名" align="center"></el-table-column>
                            <el-table-column label="角色" aligninput="center">
                                <template slot-scope="scope">
                                    <span v-for="(item,i) in scope.row.list" :key="i" type="primary" size="mini">
                                        {{item.rname}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="phoneNumber" label="手机号" align="center"></el-table-column>
                            <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
                            <el-table-column prop="createuserName" label="创建人" align="center"></el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">
                                        编辑
                                    </el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                                        停用
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>

                </el-tab-pane>

                <el-tab-pane label="停用" name="second">

                    <el-form class="formBox" :inline="true" size="mini">
                        <el-form-item label="用户名">
                            <el-input v-model="userName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" icon="search" @click="handQuery">查询</el-button>
                        </el-form-item>
                    </el-form>

                    <template>
                        <el-table :data="stopTableData" style="width: 100%">
                            <el-table-column prop="uid" label="序号" align="center"></el-table-column>
                            <el-table-column prop="username" label="姓名" align="center"></el-table-column>
                            <el-table-column label="角色" align="center">
                                <template slot-scope="scope">
                                    <span v-for="(item,i) in scope.row.list" :key="i" type="primary" size="mini">
                                        {{item.rname}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="phoneNumber" label="手机号" align="center"></el-table-column>
                            <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
                            <el-table-column prop="createuserName" label="创建人" align="center"></el-table-column>
                        </el-table>
                    </template>

                </el-tab-pane>
            </el-tabs>
        </template>

        <el-dialog title="用户新增" :visible.sync="modalUserAdd">
            <el-form :model="form" id="addUser">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" auto-complete="off" :label-width="formLabelWidth"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select :roleList="roleList" v-model="form.region" placeholder="请选择角色">
                        <el-option
                            v-for="(item,index) in roleList"
                            :key="index"
                            :label="item.rname"
                            :value="item.rid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalUserAdd = false">取 消</el-button>
                <el-button type="primary" @click="userAdd">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="用户编辑" :visible.sync="modalUserEdit">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select :roleList="roleList" v-model="form.region" placeholder="请选择角色">
                        <el-option
                            v-for="(item,index) in roleList"
                            :key="index"
                            :label="item.rname"
                            :value="item.rid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalUserEdit = false">取 消</el-button>
                <el-button type="primary" @click="userEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "userList",
        data() {
            return {
                idx: -1,
                activeName: 'first',
                modalUserAdd: false,
                tableData: [],
                modalUserEdit: false,
                stopTableData: [],
                formLabelWidth: '100px',
                userName: '',
                rid: '',
                IdList: [],
                roleList: [],
                form: {
                    username: '',
                    password: '',
                    phoneNumber: '',
                    region: ''
                }
            }
        },
        methods: {
            // 获取角色列表
            getRoleList() {
                this.$get('/sys/getRole').then(res => {
                    this.roleList = res;
                })
            },
            // 搜索
            handSearch() {
                this.queryUserList();
            },
            // 新增
            handAdd() {
                this.modalUserAdd = true;
                this.form = {};
            },
            // 提交用户新增
            userAdd() {
                this.IdList.push(this.rid);
                let postData = this.$qs.stringify({
                    username: this.form.username,
                    password: this.form.password,
                    phoneNumber: this.form.phoneNumber,
                    list: JSON.stringify(this.IdList)
                });
                this.$post("/sys/adduser", postData).then(response => {
                    console.log(response);
                });

                this.modalUserAdd = false;
            },
            // 编辑
            handleEdit(index, row) {
                console.log(index, row);
                this.id = row.uid;
                this.form.username = row.username;
                this.form.password = row.password;
                this.form.phoneNumber = row.phoneNumber;
                this.form.region = row.list[0].rname;
                this.IdList.push(row.list[0].rid);
                this.modalUserEdit = true;
            },
            // 提交用户编辑
            userEdit() {
                console.log(index, row);
                let postData = this.$qs.stringify({
                    uid: row.uid,
                    username: this.form.username,
                    password: this.form.password,
                    phoneNumber: this.form.phoneNumber,
                    list: this.IdList
                });
                this.$post("/sys/updateuser", postData).then(response => {
                    console.log(response);
                });
                this.modalUserEdit = false;
            },
            // 停用
            handleDelete(index, row) {
                let _this = this;
                let postData = this.$qs.stringify({
                    uid: row.uid,
                    status: 0
                });
                this.$post("/sys/updateuser", postData).then(response => {
                    console.log(response);
                    _this.getRoleList();
                });
            },
            // 查询
            handQuery() {
                this.stopUserList();
            },
            // 查询全部列表
            queryUserList() {
                let data = this.$qs.stringify({
                    username: this.userName,
                    status: 1
                });
                this.$post('/sys/getuserlistbyusername', data).then((res) => {
                    this.tableData = res;
                });
            },
            // 查询停用列表
            stopUserList() {
                let data = this.$qs.stringify({
                    username: this.form.name,
                    status: 0
                });
                this.$post('/sys/getuserlistbyusername', data).then((res) => {
                    this.stopTableData = res;
                });
            },
        },
        mounted() {
            this.queryUserList();
            this.getRoleList();
            this.stopUserList();
        }
    }
</script>

<style scoped>
    .inputSize {
        width: 200px;
    }

    #addUser .el-form-item__label {
        width: 100px;
    }
</style>
