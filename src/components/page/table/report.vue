<template>
    <div class="container">
        <div style="width:800px;margin:0 auto;border:1px solid red;padding:10px">
            <h2 class="tc">提前付咨询及管理服务协议</h2>   
            <h5 class="tr">(编号{{bh}})</h5>  
            <h5 class="mt20">甲方：{{jf}}</h5>  
            <h5>身份证号：{{sfz}}</h5> 
            <h5>地址：{{dz}}</h5> 
            <h5 class="mt20">乙方：{{yf}}</h5>  
            <h5>地址：{{yfdz}}</h5>  
            <h5 class="mt20">丙方：{{bf}}</h5>  
            <h5>地址：{{bfdz}}</h5>   
            <h5>联系电话：{{bfdh}}</h5>   
            <h4 class="mt20 tu">特别提示：</h4>   
            <h4 class="mt20 tu ">1. 您需要特别关注和充分理解带下划线的内容</h4>                               
            <h4 class="mt20 tu">2. 您点击确认或实际使用服务即代表您接受协议的全部内容</h4>
            <h4 class="mt20 ">鉴于：</h4> 
            <h4 class="mt20 ">1.甲方具有借款需求；</h4> 
            <h4 class="mt20 ">2.甲方通过丙方运营的金融信息服务平台www.haozhangfu.cn或提钱付APP（简称“提钱付”）
              向乙方提出借款需求以下或简称：“提钱付借款”，丙方在此过程中为甲方办理借款申请、还款管理等系列服务；</h4> 
            <h4 class="mt20 ">3.如经甲方申请，前述借款匹配成功，甲方、乙方、丙方将共同签署《借款协议》。</h4> 
            <h4 class="mt20 ">现各方经平等、自愿、友好协商一致，订立本《借款协议》，以资共同遵照履行：</h4> 
            <h4 class="mt20 ">第一条 借款基本信息</h4>             
            <h4 class="mt20 ">1.循环贷借款费用说明</h4>      
            <table style="width:100%" cellspacing="0px">
              <tr>
                <th>借款用途</th>
                <th>消费借款</th>
              </tr>
              <tr>
                <td>月利率</td>
                <td></td>
              </tr>  
              <tr>
                <td>借款期限</td>
                <td></td>
              </tr>  
              <tr>
                <td>服务费 </td>
                <td></td>
              </tr> 
              <tr>
                <td>违约金  </td>
                <td></td>
              </tr>                                                        
            </table>       
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      bh: "QB-495927",
      jf: "陈平",
      sfz: "450924199005084165",
      dz: "江苏南京江宁双龙大道",
      yf: "张敬轩",
      yfdz: "南京市建邺区江东北路110号1206室",
      bf: "恒普商业咨询（深圳）有限公司",
      bfdz:
        "深圳市前海深港合作区前湾一路1号A栋201室（入住深圳市前海商务秘书有限公司）",
      bfdh: "400-60-96898"
    };
  }
};
</script>

<style scoped>
.tc {
  text-align: center;
}
.tr {
  text-align: right;
}
.mt20 {
  margin-top: 20px;
}
.tu {
  text-decoration: underline;
}
.table {
  width: 100%;
}
tr.td {
  border: solid black 1px;
}
</style>
