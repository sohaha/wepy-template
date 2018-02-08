import wepy from 'wepy'

export default class commonMixin extends wepy.mixin {
  data = {
  }
  methods = {}

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
