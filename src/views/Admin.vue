<template>
  <title-box-frame title="管理后台">
    <template v-slot:content>
        <a-card v-for="(item, index) in adminGroup" :key="item.title+index" style="margin-bottom: 16px">
  <!--        <div v-if="index" style="margin-top: 90px"/>-->
          <a-card-grid v-for="(entrance, _index) in item.entrances" :key="entrance.name+_index" class="grid-button">
              <a-space align="center">
                <a-icon :type="entrance.icon" style="font-size: 32px"/>
                <span style="font-size: 18px">{{entrance.name }}</span>
              </a-space>
          </a-card-grid>
        </a-card>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
export default {
  name: "Admin",
  components: {
    'title-box-frame': TitleBoxFrame
  },
  data() {
    return {
      adminGroup: [
        {
          title: '首页设置',
          entrances: [{
            icon: 'picture',
            path: '',
            name: '首页图片'
          },{
            icon: 'sound',
            path: '',
            name: '公告板设置'
          },]
        },
        {
          title: '用户设置',
          entrances: [{
            icon: 'user',
            path: '',
            name: '用户列表'
          },{
            icon: 'key',
            path: '',
            name: '用户密码'
          },{
            icon: 'coffee',
            path: '',
            name: '用户权限'
          },]
        },
      ]
    }
  }
}
</script>

<style scoped>
  .grid-button{
    width: 25%;
    text-align: center;
    height: 80px;
    cursor: pointer;
  }
</style>
