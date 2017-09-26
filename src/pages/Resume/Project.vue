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
          <el-button @click="editPro(scope.$index, scope.row)"  type="success" size="small">编辑</el-button>
          <el-button @click="deletePro(scope.$index, scope.row)"  type="danger" size="small">删除</el-button>
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
import { mapState, mapActions } from 'vuex';
export default {
  name: 'project',
  data () {
    return {
      // projectList: [
      //   {
      //     proUrl: '畅联九洲',
      //     proTime: '20170608',
      //     proName: '前端工程师'
      //   }
      // ],
      // 状态控制
      isEdit: false,
      isInsert: false,

      // 编辑的属性
      id: null,
      proName: '',
      proTime: '',
      proUrl: '',
      markdown: null
    }
  },
  computed: {
    ...mapState({
      projectList: state => state.proInfo
    }),
    fixDate () {
      if (this.proTime.length > 0) {
        let start = formatDate(this.proTime[0], 'yyyy-MM-dd');
        let end = formatDate(this.proTime[1], 'yyyy-MM-dd');
        return `${start}~${end}`;
      } else {
        return null;
      }
    }
  },
  created () {
    //this.projectList = this.$store.state.proInfo;
    this.GET_PRO_INFO();
  },
  mounted () {
    this.markdown = new SimpleMDE(this.$refs.md);
  },
  methods: {
    ...mapActions([
      'UPDATE_PRO_INFO',
      'ADD_PRO_INFO',
      'GET_PRO_INFO',
      'DELETE_PRO_INFO'
    ]),
    editPro (index, row) {
      this.isEdit = true;
      this.proUrl = row.proUrl;
      this.proName = row.proName;
      this.markdown.value(row.proContent);
      this.id = row.id;
    },
    async deletePro (index, row) {
      console.log('delete');
      await this.DELETE_PRO_INFO({id: row.id});
      this.GET_PRO_INFO();
    },
    async save () {      
      let data = {
        id: this.id,
        proName: this.proName,
        proUrl: this.proUrl,
        proTime: this.fixDate,
        proContent: this.markdown.value()
      };
      if (this.isInsert) {
        await this.insertProject(data);
      } else {
        await this.updateProject(data);
      }
      this.GET_PRO_INFO();
      this.isEdit = false;
    },
    create () {
      this.isEdit = true;
      this.isInsert = true;
      this.proName = '';
      this.proUrl = '';
      this.markdown.value('');
      this.id = null;
    },
    async updateProject (data) {  
      let result = await this.UPDATE_PRO_INFO({data});
      this.showMsg(result);
      this.isEdit = false;
    },
    async insertProject (data) {
      let result = await this.ADD_PRO_INFO({data});      
      this.showMsg(result);
      this.isEdit = false;
      this.isInsert = false;
    },
    rollback () {
      this.isEdit = false;
    },
    showMsg (result) {
      let type = result.code == 1?'success':'error';
      this.$message({
        type,
        message: result.msg 
      })
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
