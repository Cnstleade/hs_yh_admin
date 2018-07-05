<template>
  <div >
    <ul :data="menuData">
      <li v-for="menu in menuData" :key="menu.mid">
        <input type="checkbox" :checked="chooseType" :data-id="menu.mid" @click="choose(menu.checked,menu.mid)">{{menu.mname}}
        <ul v-if="menu.list.length>0" style="padding-left: 1rem">
          <li v-for="item in menu.list">
            <input type="checkbox" :checked="item.checked" :data-id="item.mid" @click="chooseChild(item.checked,item.mid)">{{item.mname}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "treeView",
    props: {
      menuData: {
        type: Array,
        default: []
      }
    },
    data() {
      return{
        chooseMenu:[]
      }
    },
    watch: {
      'chooseType': function (newValue, oldValue) {
        console.log(newValue,oldValue);
      }
    },
    methods:{
      choose(checked,id){
        console.log(checked,id);
      },
      chooseChild(id){
        console.log(id);
      }
    }
  }
</script>

<style scoped>

</style>
