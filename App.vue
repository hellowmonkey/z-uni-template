<script>
export default {
  onLaunch: function() {
    console.log('App Launch');
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
// 基础
@import './static/style/mixin';
@import './static/style/normalize';
@import './static/style/flex';
@import './static/style/common';
// 组件
@import './static/style/libs/button';
@import './static/style/libs/tag';
@import './static/style/libs/cell';
@import './static/style/libs/calendar';
</style>
