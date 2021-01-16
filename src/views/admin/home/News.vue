<template>
  <title-box-frame title="公告板设置">
    <template v-slot:content>
      <a-modal
          v-model="modalVisible"
          title="公告内容"
          ok-text="提交"
          cancel-text="取消"
          width="1000px"
          @ok="onModalOk"
          :confirm-loading="submitting"
          :maskClosable="false">

        <a-form-model :rules="rules" :model="newsData" ref="newsDataForm">
          <a-alert
              message="公告标题和内容为Markdown格式，请勿在内容中使用一级/二级标题"
              type="info"
              show-icon
          />
          <a-form-model-item prop="title" label="标题">
            <a-input placeholder="公告标题" v-model="newsData.title" />
          </a-form-model-item>
          <a-form-model-item prop="content" label="内容">
            <a-textarea placeholder="公告内容" :rows="9" v-model="newsData.content" />
          </a-form-model-item>
          <a-form-model-item prop="display" label="预览" v-if="newsData.title!=='' || newsData.content!==''">
            <markdown-display :content="markdownDisplay"></markdown-display>
          </a-form-model-item>
        </a-form-model>

      </a-modal>
      <div class="add-button">
        <a-button type="primary" icon="plus" size="large" @click="newNewsClick">新建公告</a-button>
      </div>
      <a-alert
          message="关于公告展示顺序"
          description="首页公告展示顺序由公告优先级决定，优先级数字越大展示越靠前"
          type="info"
          show-icon
      />
      <br>
      <a-table :columns="columns" :data-source="allData" size="middle" :pagination="false" :loading="loading">
        <span slot="priority" slot-scope="record">
          <a-select style="width: 60px" v-model="record.priority" @change="update({newsId: record.newsId, priority: record.priority})" title="展示的优先级，数字越大越靠前">
            <a-select-option :value="i" v-for="i in 20" :key="'select-'+i">{{i}}</a-select-option>
          </a-select>
        </span>

        <span slot="visible" slot-scope="record">
          <a-switch v-model="record.visible" @change="update({newsId: record.newsId, visible: record.visible})" title="是否在首页展示">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </span>


        <span slot="action" slot-scope="record">
          <a-button type="primary" size="small" icon="edit" title="编辑" style="margin-right: 20px;" @click="editNewsClick(record)"></a-button>
          <a-popconfirm
              title="确认要删除这条公告吗？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="deleteSubmit(record.newsId)"
          >
            <a-button type="danger" size="small" icon="delete" title="删除"></a-button>
          </a-popconfirm>
        </span>
      </a-table>
    </template>
  </title-box-frame>
</template>

<script>
const columns = [
  {
    title: '#',
    dataIndex: 'newsId',
    key: 'newsId',
    width: '40px',
    align: 'center'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center'
  },
  {
    title: '优先级',
    key: 'priority',
    align: 'center',
    scopedSlots: { customRender: 'priority' },
  },
  {
    title: '展示',
    key: 'visible',
    align: 'center',
    scopedSlots: { customRender: 'visible' },
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
];
import TitleBoxFrame from '@/components/frame/title-box-frame'
import MarkdownDisplay from '@/components/markdown/markdown-display'
export default {
  name: "News",
  components: {
    'title-box-frame': TitleBoxFrame,
    'markdown-display': MarkdownDisplay
  },
  data() {
    return {
      columns,
      loading: false,
      modalVisible: false,
      submitting: false,
      allData: [],
      newsData: {
        isAdd: true,
        id: null,
        title: '',
        content: '',
      },
      rules: {
        title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
      }
    }
  },
  computed: {
    markdownDisplay: function () {
      return '## ' + this.newsData.title + '\n\n' + this.newsData.content
    }
  },
  methods: {
    newNewsClick() {
      this.newsData = {
        isAdd: true,
        id: null,
        title: '',
        content: '',
      }
      this.modalVisible = true
    },
    editNewsClick(record) {
      this.newsData = {
        isAdd: false,
        id: record.newsId,
        title: record.title,
        content: record.content,
      }
      this.modalVisible = true
    },
    onModalOk() {
      let that = this
      that.$refs["newsDataForm"].validate(valid => {
        if (valid) {
          if (that.newsData.isAdd) {
            that.addSubmit()
          } else {
            that.updateSubmit()
          }
        }
      })
    },
    addSubmit() {
      let that = this
      that.submitting = true
      let sendData = new FormData()
      sendData.append('title', that.newsData.title)
      sendData.append('content', that.newsData.content)
      that.$http.post(that.$store.state.host + '/news/new', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.modalVisible = false
              that.getData()
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
    updateSubmit() {
      this.update({
        newsId: this.newsData.id,
        title: this.newsData.title,
        content: this.newsData.content
      })
    },
    getData() {
      let that = this
      that.loading = true
      that.$http.get(that.$store.state.host + '/news/all')
          .then(data => {
            if (data.data.code === 200) {
              that.allData = data.data.data
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
    },
    update(changeData) {
      let that = this
      let sendData = new FormData()
      for (let n in changeData) {
        sendData.append(n, changeData[n])
      }
      let key = 'updating-key'
      that.$message.loading({ content: '提交中...', key });
      that.$http.post(that.$store.state.host + '/news/update', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success({ content: data.data.msg, key });
              that.getData()
            } else {
              that.$message.error({ content: data.data.msg, key })
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error({ content: '系统错误', key })
          })
          .finally(() => {
            that.modalVisible = false
          })
    },
    deleteSubmit(newsId) {
      let that = this
      let key = 'deleting-key'
      let sendData = new FormData()
      sendData.append('newsId', newsId)
      this.$message.loading({ content: '提交...', key });
      that.$http.post(that.$store.state.host + '/news/delete', sendData)
          .then(data => {
            if (data.data.code === 200) {
              this.$message.success({ content: data.data.msg, key });
              this.getData()
            } else {
              that.$message.error({ content: data.data.msg, key })
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error({ content: '系统错误', key })
          })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
  .add-button{
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
