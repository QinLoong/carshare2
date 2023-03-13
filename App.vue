<script>
import { findDataList } from '@/common/api/data.js'
import { vStatus } from '@/common/utils/dict'
export default {
  data() {
    return {
      interval: null,
      initTime: new Date()
    }
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
    // this.interval = setInterval(() => {
    //   this.findDataList()
    // }, 1000)
  },
  onHide: function () {
    console.log('App Hide')
    // clearInterval(this.interval)
  },
  globalData:{
	  
  },
  methods: {
    async findDataList() {
      if (!Object.keys(this.$store.state.userInfo).length) return
      // console.log('1. 全局故障实时数据更新---')
      try {
        const res = await findDataList({ page: 1, size: 1 })
        if (res.code === 200) {
          const data = res.data.records.length && res.data.records[0]
          if (!data) return
          // 失败
          if (data.type == '1') {
            this.$toast.error(`【${data.field1}】${vStatus[data.status]}`, 1000 * 60 * 60 * 24, { position: 'top' })
          } else {
            // 成功
            this.$toast.hide()
          }
        } else {
          this.$toast.error('请求失败!')
        }
      } catch (err) {
        this.$toast.error(err)
      }
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uview-ui/index.scss';
</style>
