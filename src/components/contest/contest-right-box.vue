<template>
  <base-box-frame>
    <template v-slot:content>
      <div style="margin-top: 10px">
        <template>
          <template v-if="$route.params.problemId !== undefined">
            <route-button icon="upload" active-color="rgb(82, 196, 26)"
                          :route="`/contest/${$route.params.contestId}/submit/${$route.params.problemId}`"
            >提交代码
            </route-button>
            <route-button icon="profile" active-color="rgb(82, 196, 26)"
                          :route="{name: 'contest_problem_display', params:{contestId: contestInfo.contestId, problemId: $route.params.problemId}}"
            >题目描述
            </route-button>
            <a-divider/>
          </template>
          <route-button icon="unordered-list"
                        :route="{name: 'contest_problems', params: {contestId: contestInfo.contestId}}"
          >题目列表
          </route-button>
          <route-button icon="area-chart"
                        :route="{name: 'contest_standings', params: {contestId: contestInfo.contestId}}"
          >比赛榜单
          </route-button>
          <route-button v-if="user" icon="upload"
                        :route="{name: 'contest_my', params: {contestId: contestInfo.contestId, username: user.username}}"
          >我的提交
          </route-button>
          <route-button v-if="user && (user.status >= PermissionLevel.ADMIN || $moment() >= contestInfo.endTime)"
                        icon="code" :route="{name: 'contest_status', params: {contestId: contestInfo.contestId}}"
          >评测记录
          </route-button>
        </template>
      </div>
      <a-divider/>
      <div style="padding: 0 30px">
        <a-progress :percent="progressing" :status="(contestStatus>0)?('success'):('active')" :strokeWidth="30"
                    :showInfo="false"/>
        <template v-if="contestStatus < 0">
          <a-statistic-countdown class="contest-countdown" :value="contestInfo.beginTime"
                                 @finish="remind('比赛已经开始啦！页面即将刷新', true)" title="距离比赛开始还有"></a-statistic-countdown>
        </template>
        <template v-else-if="contestStatus > 0">
          <div style="width: 100%; text-align: center; height: 40px;line-height: 40px;font-size: 16px;color: black">
            比赛已结束
          </div>
        </template>
        <template v-else>
          <a-statistic-countdown class="contest-countdown" :value="contestInfo.endTime"
                                 @finish="remind('比赛已经结束啦！页面即将刷新', true)" title="距离比赛结束还有"></a-statistic-countdown>
        </template>
      </div>
      <a-divider/>
      <div style="margin-bottom: 24px">
        <div class="description-item-box">
          <span class="description-item-title">比赛编号</span>
          <span class="description-item-content">{{ contestInfo.contestId }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">比赛状态</span>
          <span class="description-item-content">
            <span v-if="contestInfo.beginTime > $moment()"><a-badge status="success"/>未开始</span>
            <span v-else-if="contestInfo.endTime < $moment()"><a-badge status="default"/>已结束</span>
            <span v-else><a-badge status="processing"/>进行中</span>
          </span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">比赛规则</span>
          <span class="description-item-content">{{ ContentTypeText[contestInfo.contestType] }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">题目数量</span>
          <span class="description-item-content">{{ contestInfo.problemCount }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">开始时间</span>
          <span class="description-item-content">{{ contestInfo.beginTime.format("YYYY-MM-DD HH:mm") }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">结束时间</span>
          <span class="description-item-content">{{ contestInfo.endTime.format("YYYY-MM-DD HH:mm") }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">参与人数</span>
          <span class="description-item-content">{{ contestInfo.memberCount }}</span>
        </div>
      </div>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import {mapState} from "vuex";
import RouteButton from "@/components/lib/route-button";

export default {
  name: "contest-right-box",
  components: {
    RouteButton,
    'base-box-frame': BaseBoxFrame
  },
  props: {
    contestInfo: Object
  },
  data() {
    return {
      progressing: 0,
      contestStatus: 0, // -1: before; 0: running; 1: end
      nowTime: this.$moment()
    }
  },
  computed: {
    ...mapState(['ContentTypeText', 'user', 'PermissionLevel'])
  },
  methods: {
    progressClock() {
      let that = this
      that.nowTime = this.$moment()
      if (that.nowTime > that.contestInfo.endTime) {
        that.contestStatus = 1
        that.progressing = 100
        return
      } else if (that.nowTime < that.contestInfo.beginTime) {
        that.contestStatus = -1
        that.progressing = 0
      } else {
        that.contestStatus = 0
        let now = that.nowTime.unix()
        let begin = that.contestInfo.beginTime.unix()
        let end = that.contestInfo.endTime.unix()
        that.progressing = (now - begin) / (end - begin) * 100;
      }
      setTimeout(() => {
        that.progressClock()
      }, 1000)
    },
    remind(msg, re) {
      this.$notification.open({
        message: '提醒',
        description: msg,
        icon: <a-icon type="smile" style="color: #108ee9"/>,
      })
      if (re) {
        this.$router.push({name: 'refresh'})
      }
    }
  },
  created() {
    this.progressClock()
  }
}
</script>

<style scoped>
.description-item-box {
  width: 100%;
  display: flex;
  height: 32px;
  line-height: 32px;
}

.description-item-title {
  color: rgb(100, 100, 100);
  width: 100px;
  margin-right: 20px;
  text-align: right;
}

.description-item-content {
  color: black;
}

.contest-countdown {
  margin-top: 10px;
  text-align: center;
}
</style>
