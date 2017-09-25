<template>
  <div class="career">
    <div class="bt-wrap">
      <el-button type="success" @click="create">新建</el-button>
      <el-button type="warning" @click="rollback">撤销</el-button>
    </div>
    <el-table :data="careerList" border style="width:100%">
      <el-table-column prop="companyName" type="expand" >
        <template scope="props">
          <div class="title" style="font-weight:700">工作内容</div>
          <div class="content table-expand" v-html="props.row.jobContent">
            
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="公司名称" ></el-table-column>
      <el-table-column prop="jobTime" label="工作时间" ></el-table-column>
      <el-table-column prop="jobName" label="工作职位"></el-table-column>
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
        <label for="companyName" class="width-200">
          公司名称
          <el-input v-model="companyName" placeholder="请输入内容" id="companyName"></el-input>
        </label>
        <label for="jobTime" class="width-200">
          工作时间
          <div>
            <el-date-picker
            v-model="jobTime"
            type="daterange"
            placeholder="选择日期范围"
            :format="'yyyy/MM/dd'">
          </el-date-picker>
          </div>
        </label>
        <label for="jobName" class="width-200">
          工作职位
          <el-input v-model="jobName" placeholder="请输入内容" id="jobName"></el-input>
        </label>
      </div>
      <div class="job-content">
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
import { mapActions } from 'vuex';
export default {
  name: 'career',
  data () {
    return {
      careerList: [
        {
          companyName: '畅联九洲',
          jobTime: '20170608',
          jobName: '前端工程师'
        },
        {
          companyName: '畅联九洲',
          jobTime: '20170608',
          jobName: '前端工程师'
        },
        {
          companyName: '畅联九洲',
          jobTime: '20170608',
          jobName: '前端工程师'
        }
      ],
      // 状态控制
      isEdit: false,
      isInsert: false,

      // 编辑的属性
      id: null,
      companyName: '',
      jobTime: '',
      jobName: '',
      markdown: null
    }
  },
  computed: {
    fixDate () {
      if (this.jobTime.length > 0) {
        let start = formatDate(this.jobTime[0], 'yyyy-MM-dd');
        let end = formatDate(this.jobTime[1], 'yyyy-MM-dd');
        return `${start}~${end}`;
      } else {
        return null;
      }
    }
  },
  created () {
    this.careerList = this.$store.state.careerInfo;
  },
  mounted () {
    this.markdown = new SimpleMDE(this.$refs.md);
  },
  methods: {
    ...mapActions([
      'UPDATE_CAREER_INFO'
    ]),
    handleClick (index, row) {
      this.isEdit = true;
      this.companyName = row.companyName;
      this.jobName = row.jobName;
      this.markdown.value(row.jobContent);
      this.id = row.id;
    },
    async save () {      
      let data = {
        id: this.id,
        companyName: this.companyName,
        jobName: this.jobName,
        jobTime: this.fixDate,
        jobContent: marked(this.markdown.value())
      };
      if (this.isInsert) {
        await this.insertCareer(data);
      } else {
        this.updateCareer(data);
      }
      this.isEdit = false;
    },
    create () {
      this.isEdit = true;
      this.isInsert = true;
      this.companyName = '';
      this.jobName = '';
      this.markdown.value('');
      this.id = null;
    },
    async updateCareer (data) {
      let result = await this.UPDATE_CAREER_INFO({data});
      if (result.code == 1) {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '修改失败'
        });
      }
      this.isEdit = false;
    },
    insertCareer (data) {
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
.career{
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
