<template>
  <div class="note">

    <el-card class="box-card blue">
      <div slot="header" class="clearfix blue">
        <span style="line-height: 36px;color:white;">待办事项</span>
        <el-input v-model="level1" placeholder="请输入内容" style="width:80%;margin-left:20px"></el-input>
        <el-button style="float: right;" type="primary" :plain="true">添加</el-button>
      </div>
      <div v-for="(item, index) in level1List" :key="index" class="text item" style="margin-bottom: 20px;">
        <div class="content" style="width:90%;display:inline-block">{{'列表内容 ' + o }}</div>
        <el-button type="info" size="small">标记</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </div>
    </el-card>

    <el-card class="box-card orange">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;color:white;">重要事项</span>
        <el-input v-model="level2" placeholder="请输入内容" style="width:80%;margin-left:20px"></el-input>
        <el-button style="float: right;" type="primary" :plain="true">添加</el-button>
      </div>
      <div v-for="(item, index) in level2List" :key="index" class="text item" style="margin-bottom: 20px;">
        <div class="content" style="width:90%;display:inline-block">{{'列表内容 ' + o }}</div>
        <el-button type="info" size="small">标记</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </div>
    </el-card>

    <el-card class="box-card red">
      <div slot="header" class="clearfix blue">
        <span style="line-height: 36px;color:white;">紧急事项</span>
        <el-input v-model="level3" placeholder="请输入内容" style="width:80%;margin-left:20px"></el-input>
        <el-button style="float: right;" type="primary" :plain="true">添加</el-button>
      </div>
      <div v-for="(item, index) in level3List" :key="index" class="text item" style="margin-bottom: 20px;">
        <div class="content" style="width:90%;display:inline-block">{{'列表内容 ' + o }}</div>
        <el-button type="info" size="small">标记</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'note',
  data () {
    return {
      level1: '',
      level2: '',
      level3: '',
      
      level1List: [],
      level2List: [],
      level3List: []
    }
  }
  
}
</script>

<style lang="scss">
.note{
  .box-card{
    margin-bottom: 40px;
  }
  .blue{
    .el-card__header{
      background: #20A0FF;
    }
  }
  .orange{
    .el-card__header{
      background: #F7BA2A;
    }
  }
  .red{
    .el-card__header{
      background: #FF4949;
    }
  }
}
</style>
