<template>
  <div class="content-box">
    <div :class="project + '-line'" class="new-text">新增代理商</div>
    <div class="new-name-msg">
      <div class="new-input-box" :class="{'new-error': !regObj.nameReg}">
        <span class="new-input-title">* 商家名称</span>
        <input :disabled="check" type="text" class="new-input" placeholder="请输入商家姓名或名称" v-model="content.name" @blur="_checkNull('nameReg', content.name)">
        <span class="new-tip">负责人姓名或公司名</span>
        <p class="error-tip" v-if="!regObj.nameReg">请输入商家名称</p>
      </div>
      <div class="new-input-box" :class="{'new-error': !regObj.phoneReg}">
        <span class="new-input-title">* 商家账号</span>
        <input :disabled="check" type="number" class="new-input" placeholder="请输入商家手机号" v-model="content.mobile" maxlength="11" @input="checkPhone(1, content.mobile)" @blur="checkPhone(0,content.mobile)">
        <span class="new-tip">负责人手机号，用于登录商家后台</span>
        <p class="error-tip" v-if="!regObj.phoneReg">手机号码格式有误</p>
      </div>
      <div class="new-input-box">
        <span class="new-input-title">* 角色名称</span>
        <admin-select :isUse="!check" :select="role" ref="role" @setValue="setValue"></admin-select>
      </div>
      <div class="new-input-box">
        <span class="new-input-title">* 所在地区</span>
        <admin-select :select="city" :isUse="!check" ref="city" @setValue="setValue"></admin-select>
      </div>
    </div>
    <div class="new-name-msg new-name-msg-center">
      <div class="new-input-box">
        <span class="new-input-title">所属上级</span>
        <input type="text" class="new-input" placeholder="平台直属，无需填写上级" disabled>
        <span class="new-tip">商品（雷达）由上级供货即形成上下级关系</span>
      </div>
      <div class="new-input-box" :class="{'new-error': !regObj.phoneBigReg}">
        <span class="new-input-title">推荐人</span>
        <input type="number" class="new-input" placeholder="输入推荐人手机号" :disabled="id" v-model="content.invite_mobile" maxlength="11" @input="checkBigPhone(1, content.invite_mobile)" @blur="checkBigPhone(0, content.invite_mobile)">
        <span class="new-tip">被其他商家推荐即形成推荐关系</span>
        <p class="error-tip" v-if="!regObj.phoneBigReg">手机号码格式有误</p>
      </div>
      <!--<div class="new-input-box">-->
      <!--<span class="new-input-title">* 代理期限</span>-->
      <!-- 修改-->
      <!--<div class="time-agent">-->
      <!--<el-date-picker-->
      <!--v-model="moreTime"-->
      <!--type="daterange"-->
      <!--range-separator="至"-->
      <!--:start-placeholder="content.agent_end_time"-->
      <!--end-placeholder="结束日期">-->
      <!--</el-date-picker>-->
      <!--</div>-->
      <!--<input type="text" class="new-input" placeholder="输入推荐人手机号" v-model="content.invite_mobile">-->
      <!--</div>-->
    </div>
    <div class="new-name-msg new-name-msg-center">
      <div class="new-input-box" :class="{'new-error': !regObj.moneyReg}">
        <span class="new-input-title">* 收款金额</span>
        <input :disabled="check" type="text" class="new-input" placeholder="输入收款金额，单位元" v-model="content.money" @blur="_checkNull('moneyReg', content.money)">
        <p class="error-tip" v-if="!regObj.moneyReg">请输入收款金额</p>
      </div>
      <div class="new-input-box new-input-box-img">
        <span class="new-input-title">* 收款凭证</span>
        <img src="./upload@2x.png" class="new-add-img hand" @click="_getImg" v-if="!content.image_url">
        <div class="new-add-img hand" v-if="content.image_url" @click="_showBigImage">
          <span class="new-add-img-small" :style="{'background-image': 'url('+content.image_url+ ')'}"></span>
          <img src="./icon-del@2x.png" class="del hand" @click.stop="_delImage" v-if="!check">
        </div>
        <input type="file" class="file-input" accept="image/*" @change="_getImg($event)">
        <span class="new-tip">点击查看全图</span>
      </div>
    </div>
    <div class="new-btn">
      <div class="new-btn-item new-btn-item-border hand" @click="_back">返回</div>
      <div class="new-btn-item hand" :class="project + '-btn-blue'" v-if="!check" @click="_submit">保存</div>
      <!--<div class="new-btn-item hand new-btn-del" v-if="id && !check" @click="_submit">删除</div>-->
      <div class="new-btn-item hand" :class="project + '-btn-blue'" v-if="check" @click="_isExamine(1)">审核通过</div>
      <div class="new-btn-item hand" :class="project + '-btn-blue'" v-if="check" @click="_isExamine(2)">审核不通过</div>
    </div>
  </div>
</template>

<script>
  import { ERR_OK } from 'common/js/config'
  import BaseModel from 'components/base-model/base-model'
  import AdminSelect from 'components/admin-select/admin-select'
  import { mapGetters, mapActions } from 'vuex'
  import regionArr from './city'
  import { Agent, Images } from 'api'

  const TELREG = /^(13[0-9]|14[0-9]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  export default {
    name: 'new-agent',
    data() {
      return {
        city: [{
          select: false,
          show: false,
          children: [{content: '选择省', data: []}]
        }, {
          select: false,
          show: false,
          children: [{content: '选择市', data: []}]
        }, {
          select: false,
          show: false,
          children: [{content: '选择区', data: []}]
        }],
        cityIndex: 0,
        // pro: '',
        // city: '',
        // area: '',
        content: {
          name: '',
          mobile: '',
          province: '',
          city: '',
          area: '',
          invite_mobile: '',
          recomm_invite_name: '',
          money: '',
          image_url: '',
          role: '',
          role_id: '',
          collection_evidence_image_id: ''
        },
        role: [{
          select: false,
          show: false,
          children: [{content: '角色名称', data: []}]
        }],
        regObj: {
          nameReg: true,
          phoneReg: true,
          phoneBigReg: true,
          moneyReg: true
        },
        moreTime: '',
        id: null,
        check: null
      }
    },
    computed: {
      ...mapGetters(['project'])
    },
    watch: {
      moreTime(newVal) {
        let time = []
        if (Array.isArray(newVal)) {
          newVal.forEach((item) => {
            time.push(item.toLocaleDateString().replace(/\//g, '-'))
          })
          this.content.agent_start_time = time[0]
          this.content.agent_end_time = time[1]
        }
      }
    },
    async created() {
      let id = this.$route.query.id
      this.check = this.$route.query.check
      this.id = id
      this._infoPro()
      await this._roleList()
      if (!id) {
        let arr = '商家管理,代理商管理,新增代理商'
        this.setTitleArr(arr.split(','))
      } else if (id && !this.check) {
        let arr = '商家管理,代理商管理,编辑'
        this.setTitleArr(arr.split(','))
        await this._getDetail(id)
      } else if (id && this.check) {
        let arr = '商家管理,代理商管理,审核'
        this.setTitleArr(arr.split(','))
        await this._examineDetail(id)
      }
    },
    methods: {
      ...mapActions(['setTitleArr']),
      _isExamine(status) {
        let data = {status, note: ''}
        Agent.applyAgentExamine(data, this.id).then((res) => {
          if (res.error === ERR_OK) {
            this.$emit('showToast', res.message)
            setTimeout(() => {
              this._back()
            }, 1000)
          }
        })
      },
      async _examineDetail(id) {
        let res = await Agent.examineDetail(id)
        if (res.error !== ERR_OK) {
          return
        }
        this.content = res.data
        this.city[0].children[0].content = this.content.province || '请选择'
        this.city[1].children[0].content = this.content.city || '请选择'
        this.city[2].children[0].content = this.content.area || '请选择'
        this.role[0].children[0].content = this.content.role || '角色名称'
      },
      _checkNull(type, text) {
        this.regObj[type] = text.length
      },
      checkPhone(type, text) {
        switch (type) {
          case 1:
            let status = text.length < 11 || TELREG.test(text)
            this.regObj.phoneReg = status
            break
          case 0:
            this.regObj.phoneReg = text.length
            break
        }
      },
      checkBigPhone(type, text) {
        switch (type) {
          case 1:
            let status = text.length < 11 || TELREG.test(text)
            this.regObj.phoneBigReg = status
            break
          // case 0:
          //   this.regObj.phoneBigReg = text.length
          //   break
        }
      },
      _delImage() {
        this.content.image_url = ''
        this.content.collection_evidence_image_id = ''
      },
      _showBigImage() {
        this.$emit('showImage', this.content.image_url)
      },
      async _getDetail(id) {
        let res = await Agent.agentDetail(id)
        if (res.error !== ERR_OK) {
          return
        }
        this.content = res.data
        this.city[0].children[0].content = this.content.province || '请选择'
        this.city[1].children[0].content = this.content.city || '请选择'
        this.city[2].children[0].content = this.content.area || '请选择'
        this.role[0].children[0].content = this.content.role || '角色名称'
        // 初始化城市
        let index = this.city[0].children[0].data.findIndex(item => item.title === this.city[0].children[0].content)
        this._infoCity(index)
        this.cityIndex = index
        // 初始化市区
        let idx = this.city[1].children[0].data.findIndex(item => item.title === this.city[1].children[0].content)
        this._infoArea(idx)
      },
      async _roleList() {
        let res = await Agent.roleList()
        if (res.error !== ERR_OK) {
          return
        }
        let arr = []
        res.data.forEach((item) => {
          arr.push({title: item.level_name, type: 'role', level: item.level})
        })
        this.role[0].children[0].data = arr
      },
      // 上传图片
      async _getImg(e) {
        document.querySelector('.file-input').click()
        if (e.target.files) {
          let param = this._infoImage(e.target.files[0])
          let res = await Images.upload(param)
          this.content.image_url = res.data.url
          this.content.collection_evidence_image_id = res.data.id
        }
      },
      // 格式化图片流
      _infoImage(file) {
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name)// 通过append向form对象添加数据
        return param
      },
      _infoPro() {
        let arr = []
        for (let value in regionArr) {
          arr.push({title: regionArr[value].name, type: 'pro'})
        }
        this.city[0].children[0].data = arr
      },
      _infoCity(index) {
        let cityArr = regionArr[index].sub
        let arr = []
        for (let value in cityArr) {
          arr.push({title: cityArr[value].name, type: 'city'})
        }
        this.city[1].children[0].data = arr
      },
      _infoArea(index) {
        let areaArr = regionArr[this.cityIndex].sub[index].sub
        let arr = []
        for (let value in areaArr) {
          arr.push({title: areaArr[value].name, type: 'area'})
        }
        this.city[2].children[0].data = arr
      },
      setValue(item) {
        switch (item.type) {
          case 'pro':
            let index = regionArr.findIndex(child => child.name === item.title)
            this.cityIndex = index
            this.city[1].children[0].content = '请选择'
            this.city[2].children[0].content = '请选择'
            this._infoCity(index)
            this.content.province = item.title
            this.content.city = '选择市'
            this.content.area = '选择区'
            break
          case 'city' :
            let idx = regionArr[this.cityIndex].sub.findIndex(child => child.name === item.title)
            this._infoArea(idx)
            this.city[2].children[0].content = '请选择'
            this.content.city = item.title
            this.content.area = '请选择'
            break
          case 'area' :
            this.content.area = item.title
            break
          case 'role':
            this.content.role_id = item.level
            break
        }
      },
      _back() {
        this.$router.back()
      },
      async _submit() {
        if (this.id) {
          if (!this.content.name || !this.content.mobile || !this.content.money) {
            return
          } else if (!this.content.province || this.content.province.includes('选择')) {
            this.$emit('showToast', '请选择省份')
            return
          } else if (!this.content.city || this.content.city.includes('选择')) {
            this.$emit('showToast', '请选择城市')
            return
          } else if (!this.content.area || this.content.area.includes('选择')) {
            this.$emit('showToast', '请选择地区')
            return
          }
          let res = await Agent.editAgent(this.content, this.id)
          this.$emit('showToast', res.message)
          if (res.error === ERR_OK) {
            setTimeout(() => {
              this._back()
            }, 1000)
          }
          // 编辑
          return
        }
        if (!this.content.name || !this.content.mobile || !this.content.money) {
          this.regObj.nameReg = this.content.name
          this.regObj.phoneReg = this.content.mobile
          this.regObj.moneyReg = this.content.money
          return
        } else if (this.content.role_id === '') {
          this.$emit('showToast', '请选择角色')
          return
        } else if (!this.content.province || this.content.province.includes('选择')) {
          this.$emit('showToast', '请选择省份')
          return
        } else if (!this.content.city || this.content.city.includes('选择')) {
          this.$emit('showToast', '请选择城市')
          return
        } else if (!this.content.area || this.content.area.includes('选择')) {
          this.$emit('showToast', '请选择地区')
          return
        } else if (!this.content.collection_evidence_image_id) {
          this.$emit('showToast', '请上传收款凭证')
          return
        }
        let json = await Agent.newAgent(this.content)
        this.$emit('showToast', json.message)
        if (json.error === ERR_OK) {
          setTimeout(() => {
            this._back()
          }, 1000)
        }
        // 新建
      }
    },
    components: {
      BaseModel,
      AdminSelect
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/time'
  .content-box
    display: flex
    flex-direction: column
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    background: $color-white
    border-radius: 6px
    font-size: $font-size-medium14
    font-family: $fontFamilyLight

  .new-text
    margin: 3.4vh 0 2.7vh

  .new-name-msg
    border-top-1px(#EFEFEF)
    margin-left: 30px
    .new-input-box
      display: flex
      align-items: center
      margin-top: 2.4vh
    .new-input-title
      width: 68px
      color: $color-text33
      text-align: right
      margin-right: 6px
      white-space: nowrap
    .new-input
      border: 0.5px solid $color-lineCC
      border-radius: 4px
      width: 338px
      height: 28px
      text-indent: 8px
      box-sizing: border-box
      margin-right: 10px
      margin-left: 10px
      &::placeholder
        color: $color-lineCC
        font-size: $font-size-medium14
      &:disabled
        background: #F8F8F8
    .new-tip
      color: $color-lineCC
    .new-input-box-img
      align-items: flex-start
      .file-input
        height: 1px
        width: 0
        opacity: 0
        transform: translateY(-300vw)
      .new-add-img
        margin-left: 10px
        width: 120px
        height: 96px
        position: relative
        .new-add-img-small
          display: block
          width: 100%
          height: 100%
          background-position: center
          background-repeat: no-repeat
          background-size: cover
        .del
          top: -10px
          right: -10px
          width: 26px
          position: absolute
      .new-tip
        margin-left: 10px
        line-height: 96px

  .new-name-msg-center
    margin-top: 2.4vh

  .new-btn
    display: flex
    color: $color-text33
    margin-top: 2.7vh
    margin-left: 112px
    .new-btn-item-border
      border-1px($color-lineCC, 6px)
    .new-btn-item
      font-size: $font-size-medium16
      margin-right: 20px
      border-radius: 3px
      width: 96px
      height: 40px
      text-align: center
      line-height: 40px
    .new-btn-del
      color: $color-white
      background: $color-EF705D

  .new-error
    position: relative
    .new-input
      border: 0.5px solid $color-EF705D
    .error-tip
      font-size: $font-size-medium14
      left: 84px
      bottom: -16px
      color: $color-EF705D
      position: absolute

</style>
