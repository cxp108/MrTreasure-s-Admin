<template>
  <div class="user-info">
    <div class="row">
      <label for="name" class="width-200">
        姓名
        <el-input v-model="name" placeholder="请输入内容" id="name"></el-input>
      </label>
      <label for="diploma" class="width-200">
        学历
        <el-input v-model="diploma" placeholder="请输入内容" id="diploma"></el-input>
      </label>
      <label for="email" class="width-200">
        邮箱
        <el-input v-model="email" placeholder="请输入内容" id="email"></el-input>
      </label>
      <label for="jobForward" class="width-200">
        工作意向
        <el-input v-model="jobForward" placeholder="请输入内容" id="jobForward"></el-input>
      </label>
      <label for="phone" class="width-200">
        手机号码
        <el-input v-model="phone" placeholder="请输入内容" id="phone"></el-input>
      </label>
      <label for="careerYear" class="width-200">
        工作年限
        <el-input v-model="careerYear" placeholder="请输入内容" id="careerYear"></el-input>
      </label>
      <label for="major" class="width-200">
        专业
        <el-input v-model="major" placeholder="请输入内容" id="major"></el-input>
      </label>
      <label for="major" class="width-200">
        毕业院校
        <el-input v-model="university" placeholder="请输入内容" id="university"></el-input>
      </label>

    </div>
    <div class="row">
      <label for="motto" class="width-max">
        个性签名
        <el-input v-model="motto" placeholder="请输入内容" id="motto" class="width-max"></el-input>
      </label>
    </div>
    <div class="markdown">
      个人简介
      <textarea id="introduction" v-model="introduction" disabled>

      </textarea>
    </div>
    <div class="markdown">
      技能掌握
      <textarea id="skill">

      </textarea>
    </div>
    <div class="bt-wrap">
      <el-button type="success" @click="save">保存</el-button>
      <el-button type="warning" @click="rollback">撤销</el-button>
    </div>
  </div>
</template>


<script>
import  SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import marked from 'marked';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'user-info',
  data () {
    return {
      name: '',
      diploma: '',
      email: '',
      jobForward: '',
      motto: '',
      careerYear: '',
      phone: '',
      major: '',
      university: '',
      markDown1: null,
      markDown2: null,
      introduction: '',
    }
  },
  created () {
    this.initData();
  },
  mounted () {
    this.markDown1 = new SimpleMDE({ element: document.getElementById('introduction') });
    this.markDown1.value(this.$store.state.userInfo.introduction);
    this.markDown2 = new SimpleMDE({ element: document.getElementById('skill') });
    this.markDown2.value(this.$store.state.userInfo.skill);
  },
  computed: {
    ...mapState([
      'id'
    ])
  },
  methods: {
    ...mapActions([
      'UPDATA_USER_INFO',
      'GET_RESUME'
    ]),
    initData () {
      this.name = this.$store.state.userInfo.name;
      this.diploma = this.$store.state.userInfo.diploma;
      this.email = this.$store.state.userInfo.email;
      this.jobForward = this.$store.state.userInfo.jobForward;
      this.motto = this.$store.state.userInfo.motto;
      this.careerYear = this.$store.state.userInfo.careerYear;
      this.phone = this.$store.state.userInfo.phone;
      this.major = this.$store.state.userInfo.major;
      this.university = this.$store.state.userInfo.university;
    },
    async save () {
      let skill = marked(this.markDown1.value());
      let introduction = marked(this.markDown2.value());
      let data = {
        name: this.name,
        diploma: this.diploma,
        email: this.email,
        jobForward: this.jobForward,
        motto: this.motto,
        careerYear: this.careerYear,
        phone: this.phone,
        major: this.major,
        university: this.university,
        skill,
        introduction
      };
      let result = await this.UPDATA_USER_INFO({data});
      console.log(result);
      if (result.code == 1) {
        this.$message({
          duration: 1500,
          type: 'success',
          message: result.msg
        });
        this.GET_RESUME({ id: this.id });
      } else {
        this.$message({
          duration: 1500,
          type: 'error',
          message: result.msg
        });
      }

    },
    rollback () {
      this.initData();
      this.markDown1.value(this.$store.state.userInfo.introduction);
      this.markDown2.value(this.$store.state.userInfo.skill);
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info{
  label{
    margin-right: 10px;
    padding:  0 15px;
  }
  #introduction{
    width: 100%;
    height: 200px;
    border: 1px solid black;
  }
  .bt-wrap{
    text-align: center;
    padding-bottom: 50px;
  }
}
.width-max{
  width: 100%;
}
.width-200{
  width: 200px;
}
</style>
