<template>
  <view class="content">
    <view class="">button</view>
    <z-button color="primary">按钮</z-button>
    <z-button color="primary" plain>按钮</z-button>
    <z-button color="primary" radius>按钮</z-button>
    <z-button color="primary" round>按钮</z-button>
    <z-button color="primary" size="small">按钮</z-button>
    <z-button color="success">按钮</z-button>
    <z-button color="primary" disabled>按钮</z-button>
    <z-button color="primary" loading block>按钮</z-button>
    <view class="">tag</view>
    <z-tag>标签</z-tag>
    <z-tag color="primary">标签</z-tag>
    <z-tag color="primary" plain>标签</z-tag>
    <z-tag color="warning" size="small">标签</z-tag>
    <view>Cell</view>
    <z-cell title="单元格" value="哈哈哈"></z-cell>
    <z-cell title="打开日历" :value="date" @tap.native="$refs.popup.open()"></z-cell>
    <uni-popup ref="popup" type="bottom"><z-calendar :disableds="disableds" :events="events" @change="change" @select="select"></z-calendar></uni-popup>
  </view>
</template>

<script>
import Calendar from '../../components/libs/Calendar.vue';
import UniPopup from '../../components/uni-popup/uni-popup.vue';

export default {
  data() {
    return {
      disableds: [],
      events: {},
      date:''
    };
  },
  components: {
    ZCalendar: Calendar,
    UniPopup
  },
  onShow() {},
  onLoad() {
    // this.$actionSheet(['你好', '再见'])
    // 	.then(data => {
    // 		console.log(data);
    // 	})
    // 	.catch(e => {
    // 		console.log(e);
    // 	});
    setTimeout(() => {
      this.disableds.push('2019-12-12');
      this.events['2019-12-15'] = '余5';
    }, 1000);
  },
  methods: {
    select(item) {
      console.log(item);
      this.date = item.format('YYYY-MM-DD')
      this.$refs.popup.close()
    },
    change(e) {
      console.log(e);
    },
    handleTap(e) {
      console.log(e);
    }
  }
};
</script>

<style></style>
