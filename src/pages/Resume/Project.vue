<template>
  <div class="project">
    <div class="bt-wrap">
      <el-button type="success" @click="create">新建</el-button>
      <el-button type="warning" @click="rollback">撤销</el-button>
    </div>
    <el-table :data="projectList" border style="width:100%">
      <el-table-column prop="companyName" type="expand" >
        <template scope="props">
          <div class="title" style="font-weight:700">项目内容</div>
          <div class="content table-expand" v-html="props.row.proContent">
            
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="proName" label="项目名称" ></el-table-column>
      <el-table-column prop="proTime" label="项目时间" ></el-table-column>
      <el-table-column prop="proUrl" label="项目地址"></el-table-column>
      <el-table-column
      label="操作"
      width="150">
        <template scope="scope">
          <el-button @click="handleClick(scope.$index, scope.row)"  type="success" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.$index, scope.row)"  type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="edit" v-show="isEdit">
      <div class="row">
        <label for="proName" class="width-200">
          项目名称
          <el-input v-model="proName" placeholder="请输入内容" id="proName"></el-input>
        </label>
        <label for="proTime" class="width-200">
          项目时间
          <div>
            <el-date-picker
            v-model="proTime"
            type="daterange"
            placeholder="选择日期范围"
            :format="'yyyy/MM/dd'">
          </el-date-picker>
          </div>
        </label>
      </div>
      <div class="row">
        <label for="proUrl">
          项目地址
          <el-input v-model="proUrl" placeholder="请输入内容" id="jobName"></el-input>
        </label>
      </div>
      <div class="pro-content">
        工作内容
        <textarea  ref="md" cols="30"></textarea>
      </div>
      <div class="row center">
        <el-button type="success" size="large" width="200px" @click="save">保存</el-button>
        
      </div>
    </div>
  </div>
</template>

<script>
import  SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import marked from 'marked';
import { formatDate } from '@/common';
export default {
  name: 'project',
  data () {
    return {
      projectList: [
        {
          proUrl: '畅联九洲',
          proTime: '20170608',
          proName: '前端工程师'
        }
      ],
      // 状态控制
      isEdit: false,
      isInsert: false,

      // 编辑的属性
      id: 0,
      proName: '',
      proTime: '',
      proUrl: '',
      markdown: null
    }
  },
  computed: {
    fixDate () {
      if (this.jobTime.length > 0) {
        let start = formatDate(this.proTime[0], 'yyyy-MM-dd');
        let end = formatDate(this.proTime[1], 'yyyy-MM-dd');
        return `${start}~${end}`;
      } else {
        return '';
      }
    }
  },
  created () {
    this.projectList = this.$store.state.proInfo;
  },
  mounted () {
    this.markdown = new SimpleMDE(this.$refs.md);
  },
  methods: {
    handleClick (index, row) {
      this.isEdit = true;
      this.proUrl = row.proUrl;
      this.proName = row.proName;
      this.markdown.value(row.proContent);
      this.id = row.id;
    },
    save () {      
      let data = {
        id: this.id,
        proName: this.proName,
        proUrl: this.proUrl,
        proTime: this.fixDate,
        proContent: marked(this.markdown.value())
      };
      if (this.isInsert) {
        this.insertProject(data);
      } else {
        this.updateProject(data);
      }
      this.isEdit = false;
    },
    create () {
      this.isEdit = true;
      this.isInsert = true;
      this.proName = '';
      this.proUrl = '';
      this.markdown.value('');
      this.id = 0;
    },
    updateProject (data) {  
      console.log(data);
      this.$message({
        type: 'success',
        message: '修改成功'
      });
      this.isEdit = false;
    },
    insertProject (data) {
      console.log(data);
      this.$message({
        type: 'success',
        message: '增加成功'
      });
      this.isEdit = false;
      this.isInsert = false;
    },
    rollback () {
      this.isEdit = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.project{
  .bt-wrap{
    margin-bottom: 20px;
  }
  .edit{
    margin-top: 50px;
    label{
      margin-right: 10px;
      padding: 0 15px;
    }
    .job-content{
      margin-top: 25px;
    }
    .center{
      display: flex;
      padding-bottom: 20px;
      justify-content: center;
    }
  }
}
.table-expand{
  min-height: 100px;
}
</style>
