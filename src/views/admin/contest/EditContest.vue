<template>
  <title-box-frame title="编辑比赛">
    <template v-slot:content>
      <loading-box-frame v-if="loading"></loading-box-frame>
      <a-form-model v-else :rules="contestRules" :model="contestData" ref="contestForm" :label-col="{span:2}" :wrapper-col="{span:22}">
        <a-form-model-item label="比赛编号 ">
          <b>{{contestData.contestId}}</b>
        </a-form-model-item>
        <a-form-model-item prop="contestName" label="比赛名称 ">
          <a-input v-model="contestData.contestName" placeholder="比赛名称"></a-input>
        </a-form-model-item>
        <a-form-model-item prop="beginTime" label="开始时间 ">
          <a-date-picker valueFormat="YYYY-MM-DD HH:mm:ss" v-model="contestData.beginTime" show-time placeholder="开始时间" :showToday="false" style="width: 100%"/>
        </a-form-model-item>
        <a-form-model-item prop="endTime" label="结束时间 ">
          <a-date-picker valueFormat="YYYY-MM-DD HH:mm:ss" v-model="contestData.endTime" show-time placeholder="结束时间" :showToday="false" style="width: 100%"/>
        </a-form-model-item>
        <a-form-model-item prop="freezeTime" label="封榜时间 ">
          <a-date-picker valueFormat="YYYY-MM-DD HH:mm:ss" v-model="contestData.freezeTime" show-time placeholder="封榜时间" :showToday="false" style="width: 100%"/>
        </a-form-model-item>
        <a-form-model-item prop="unfreezeTime" label="解榜时间 ">
          <a-date-picker valueFormat="YYYY-MM-DD HH:mm:ss" v-model="contestData.unfreezeTime" show-time placeholder="解榜时间" :showToday="false" style="width: 100%"/>
        </a-form-model-item>
        <a-form-model-item prop="isPublic" label="公开比赛 ">
          <a-switch v-model="contestData.isPublic"></a-switch>
        </a-form-model-item>
        <a-form-model-item prop="password" label="比赛密码 " v-if="!contestData.isPublic">
          <a-input v-model="contestData.password" placeholder="比赛密码"></a-input>
        </a-form-model-item>
        <a-form-model-item prop="contestType" label="比赛模式 ">
          <a-select v-model="contestData.contestType" style="width: 100%" placeholder="比赛模式">
            <template v-for="(type,index) in ContentTypeText">
              <a-select-option v-if="index !== 0" :value="index" :key="'type'+index" :disabled="index === 4">
                {{ type }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-model-item>
        <a-form-model-item prop="problems" label="比赛题目 ">
          <draggable v-model="contestData.problems" :disabled="!problemMovable">
            <transition-group>
              <template v-for="(problem, index) in contestData.problems">
                <div class="ant-list-bordered contest-problem-list-item" :key="'problem' + index">
                  <span class="contest-problem-list-item-label">
                    <b>{{ ContestProblemLabel[index] }}</b>
                  </span>
                  <span class="contest-problem-list-item-id">
                    <span>题目编号：</span>
                    <a-input v-model="problem.problemId" placeholder="题目编号" type="number" style="width: 200px" @change="getProblemTitle(index)"></a-input>
                  </span>
                  <span class="contest-problem-list-item-title">
                    <span>题目标题：</span>
                    <a-input v-model="problem.problemTitle" placeholder="题目标题" style="width: 500px" readOnly></a-input>
                  </span>
                  <span class="contest-problem-list-item-move" v-if="problemMovable">
                    <a-icon type="menu" />
                  </span>
                  <span title="删除" class="contest-problem-list-item-delete" v-else @click="contestData.problems.splice(index, 1)">
                    <a-icon type="delete" />
                  </span>
                </div>
              </template>
            </transition-group>
          </draggable>
          <a-space>
            <a-button title="增加" type="primary" icon="plus" @click="addProblem"/>
            <a-button title="排序" icon="drag" @click="problemMovable = true" v-if="!problemMovable"/>
            <a-button title="确认" icon="check" @click="problemMovable = false" v-else/>
          </a-space>
        </a-form-model-item>
        <a-button type="primary" block @click="submitCheck" :loading="submitting">
          更新
        </a-button>
      </a-form-model>
    </template>
  </title-box-frame>
</template>

<script>
import { mapState } from 'vuex'
import TitleBoxFrame from '@/components/frame/title-box-frame'
import draggable from 'vuedraggable'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
export default {
  name: "NewContest",
  components: {
    draggable,
    'title-box-frame': TitleBoxFrame,
    'loading-box-frame': LoadingBoxFrame
  },
  data() {
    return {
      loading: false,
      problemMovable: false,
      contestData: {
        contestId: null,
        contestName: '',
        beginTime: '',
        endTime: '',
        freezeTime: '',
        unfreezeTime: '',
        isPublic: false,
        password: '',
        contestType: 1,
        problems: []
      },
      contestRules: {
        contestName: [
          { required: true, message: '请输入比赛名称', trigger: 'blur' },
        ],
        beginTime: [
          { required: true, message: '请输入比赛开始时间', trigger: 'blur' },
          { validator: this.contestBeginTimeCheck, trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请输入比赛结束时间', trigger: 'blur' },
          { validator: this.contestEndTimeCheck, trigger: 'change' }
        ],
        isPublic: [
          { required: true, message: '请设置是否公开比赛', trigger: 'blur' },
        ],
        contestType: [
          { required: true, message: '请设置比赛模式', trigger: 'blur' },
        ],
        problems: [
          { validator: this.problemListCheck, trigger: 'change' }
        ]
      },
      submitting: false,
    }
  },
  computed: {
    ...mapState([
        'host',
        'ContentTypeText',
        'ContestProblemLabel',
        'buildGetQuery'
    ])
  },
  methods: {
    addProblem() {
      this.contestData.problems.push({
        problemId: null,
        problemTitle: ''
      })
    },
    getProblemTitle(index) {
      let that = this
      if (!that.contestData.problems[index].problemId) {
        that.contestData.problems[index].problemTitle = ''
        return
      }
      that.$http.get(that.$store.state.host + `/problem/title?problemId=${that.contestData.problems[index].problemId}`)
          .then(data => {
            if (data.data.code === 200) {
              that.contestData.problems[index].problemTitle = data.data.data
            } else {
              that.$message.error(data.data.msg)
              that.contestData.problems[index].problemTitle = ''
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
            that.contestData.problems[index].problemTitle = ''
          })
          .finally(() => {
          })
    },
    problemListCheck(rule, value, callback) {
      for (let item of value) {
        if (item.problemTitle === '') {
          callback(new Error('题目列表错误'))
        }
      }
      callback()
    },
    contestBeginTimeCheck(rule, value, callback) {
      if (this.contestData.endTime === '') {
        callback()
      }
      if (value > this.contestData.endTime) {
        callback(new Error('开始时间需要早于结束时间'))
      }
      callback()
    },
    contestEndTimeCheck(rule, value, callback) {
      if (this.contestData.beginTime === '') {
        callback()
      }
      if (value < this.contestData.beginTime) {
        callback(new Error('结束时间需要晚于开始时间'))
      }
      callback()
    },
    submitCheck() {
      let that = this
      that.$refs["contestForm"].validate(valid => {
        if (valid) {
          that.saveContestSubmit()
        }
      })
    },
    saveContestSubmit() {
      let that = this
      let sendData = new FormData()
      sendData.append('contestId', that.contestData.contestId)
      sendData.append('contestName', that.contestData.contestName)
      sendData.append('beginTime', that.contestData.beginTime)
      sendData.append('endTime', that.contestData.endTime)
      if (that.contestData.freezeTime) {
        sendData.append('freezeTime', that.contestData.freezeTime)
      }
      if (that.contestData.unfreezeTime) {
        sendData.append('unfreezeTime', that.contestData.unfreezeTime)
      }
      sendData.append('isPublic', that.contestData.isPublic)
      if (!that.contestData.isPublic) {
        sendData.append('password', that.contestData.password)
      }
      sendData.append('contestType', that.contestData.contestType)
      let problemList = []
      that.contestData.problems.forEach( o => problemList.push(o.problemId))
      sendData.append('problems', JSON.stringify(problemList))
      that.submitting = true
      that.$http.post(that.host + '/contest/update', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success('更新成功')
              that.$router.push({
                name: 'contest_problems',
                params: {
                  contestId: that.contestData.contestId
                }
              })
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.submitting = false
          })
    },
    getContest() {
      let that = this
      that.contestData.contestId = that.$route.query.contestId
      if (!that.contestData.contestId) {
        that.$store.commit('errorPage', 404)
        return
      }

      that.loading = true
      that.$http.get(that.host + '/contest/get' + that.buildGetQuery({contestId: that.contestData.contestId}))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.contestData = {
                contestId: Data.contest.contestId,
                contestName: Data.contest.contestName,
                beginTime: Data.contest.beginTime,
                endTime: Data.contest.endTime,
                freezeTime: Data.contest.freezeTime,
                unfreezeTime: Data.contest.unfreezeTime,
                isPublic: Data.contest.public,
                password: Data.contest.password,
                contestType: Data.contest.contestType,
                problems: Data.problems
              }
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.loading = false
          })
    }
  },
  created() {
    // TODO: check user permission
    this.getContest()
  }
}
</script>

<style scoped>
  .contest-problem-list-item{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
  }
  .contest-problem-list-item-delete{
    cursor: pointer;
    color: red;
  }
  .contest-problem-list-item-move{
    cursor: move;
    color: black;
  }
</style>
