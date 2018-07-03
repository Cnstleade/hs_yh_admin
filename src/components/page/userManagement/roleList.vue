<template>
  <div style="display: inline-block">
    <template v-if="roleData">
      <el-select :data="roleList" v-model="roleData.jobTitle" @change="changeValue" placeholder="请选择角色" style="display: inline-block">
        <el-option
          v-for="item in roleList"
          :key="item.rid"
          :label="item.jobTitle"
          :value="item.rid">
        </el-option>
      </el-select>
    </template>
    <template v-else>
      <el-select :data="roleList" v-model="roleUser.rid" @change="changeValue" placeholder="请选择角色" style="display: inline-block">
        <el-option
          v-for="item in roleList"
          :key="item.rid"
          :label="item.jobTitle"
          :value="item.rid">
        </el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      roleData: {}
    },
    // props:['roleData'],
    data() {
      return {
        roleList: [],
        roleUser: {
          rid: '',
          rname: '',
          jobTitle: ''
        }
      }
    },
    watch: {
      'roleUser.rid': function (newValue, oldValue) {
        console.log(newValue,oldValue);
      }
    },
    methods: {
      // 获取角色列表
      getRoleList() {
        this.$get('/sys/getRole').then(res => {
          this.roleList = res;
        })
      },

      changeValue(value) {
        let obj = {};
        obj = this.roleList.find((item) => {
          return item.rid === value;
        });
        this.roleUser.rid = obj.rid;
        this.roleUser.rname = obj.rname;
        this.roleUser.jobTitle = obj.jobTitle;

        this.$emit('childByRoleUser', this.roleUser);
      },
    },
    created() {
      // this.roleUser = this.roleData;
    },
    mounted() {
      // 获取角色列表
      this.getRoleList();
    }

  }
</script>

<style scoped>

</style>
