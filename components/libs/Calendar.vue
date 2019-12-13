<template>
  <view class="z-calendar">
    <view class="z-calendar-header d-flex align-items-center justify-between">
      <text class="z-iconfont" @tap="minusMonth">&#xe693;</text>
      <view class="d-flex direction-column justify-center align-items-center">
        <picker :range="months" range-key="text" :value="selectedMonth" @change="selectMonth">
          <text class="font-large">{{ currentMonth }}月</text>
        </picker>
        <picker :range="years" range-key="text" :value="selectedYear" @change="selectYear">
          <text class="font-small color-gray">{{ currentYear }}年</text>
        </picker>
      </view>
      <text class="z-iconfont" @tap="addMonth">&#xe694;</text>
    </view>
    <view class="z-calendar-body">
      <view class="weeks d-flex align-items-center justify-around">
        <text v-for="item in weeks" :key="item.value">{{ item.text }}</text>
      </view>
      <view class="dates d-flex direction-column">
        <view class="d-flex align-items-center justify-around" v-for="(week, key) in weekData" :key="key">
          <view
            class="date d-flex direction-column align-items-center justify-center"
            :class="{
              disabled: getDisabled(item),
              active: getActive(item)
            }"
            @tap="select(item)"
            v-for="item in week"
            :key="item.format"
          >
            <text>{{ item.date }}</text>
            <text v-if="events[item.format]" class="event text-gray font-mini">{{ events[item.format] }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    disableds: {
      type: Array,
      default() {
        return [];
      }
    },
    events: {
      type: Object,
      default() {
        return {};
      }
    },
    maxDate: String,
    minDate: String,
    defaultFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    selectRange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    this.now = this.$dayjs();
    return {
      current: this.now,
      currentEnd: this.now,
      currentYear: this.now.year(),
      currentMonth: this.now.month() + 1,
      currentDate: this.now.date(),
      weeks: [
        {
          text: '日',
          value: 0
        },
        {
          text: '一',
          value: 1
        },
        {
          text: '二',
          value: 2
        },
        {
          text: '三',
          value: 3
        },
        {
          text: '四',
          value: 4
        },
        {
          text: '五',
          value: 5
        },
        {
          text: '六',
          value: 6
        }
      ],
      weekData: [],
      selectTime: 0,
      months: [],
      years: []
    };
  },
  computed: {
    selectedMonth() {
      return this.months.findIndex(item => item.value === this.currentMonth);
    },
    selectedYear() {
      return this.years.findIndex(item => item.value === this.currentYear);
    }
  },
  watch: {},
  methods: {
    selectYear(e) {
      this.currentYear = this.years[Number(e.detail.value)].value;
      this.getWeekData();
      this.$emit('changeYear', {
        year: this.currentYear,
      });
      this.$emit('change', {
        year: this.currentYear,
        month: this.currentMonth
      });
    },
    selectMonth(e) {
      this.currentMonth = this.months[Number(e.detail.value)].value;
      this.getWeekData();
      this.$emit('changeMonth', {
        year: this.currentYear,
        month: this.currentMonth
      });
      this.$emit('change', {
        year: this.currentYear,
        month: this.currentMonth
      });
    },
    getDisabled(item) {
      return (
        this.currentYear !== item.year ||
        this.currentMonth !== item.month ||
        this.disableds.includes(item.format) ||
        (this.maxDate && item.format > this.maxDate) ||
        (this.minDate && item.format < this.minDate)
      );
    },
    getActive(item) {
      if (this.selectRange) {
        return item.format >= this.current.format(this.defaultFormat) && item.format <= this.currentEnd.format(this.defaultFormat);
      }
      return item.format === this.current.format(this.defaultFormat);
    },
    getClass(item) {
      return {
        disabled: this.getDisabled(item),
        active: this.getActive(item)
      };
    },
    clearData() {
      this.current = this.now;
      this.currentEnd = this.now;
    },
    select(item) {
      if (this.getDisabled(item)) return false;
      if (this.selectRange) {
        ++this.selectTime;
        if (this.selectTime === 2) {
          this.currentEnd = this.$dayjs(item.format);
          this.selectTime = 0;
          if (this.current.isAfter(this.currentEnd)) {
            [this.current, this.currentEnd] = [this.currentEnd, this.current];
          }
          this.$emit('select', [this.current, this.currentEnd]);
        } else {
          this.current = this.$dayjs(item.format);
          this.currentEnd = this.$dayjs(item.format);
        }
      } else {
        this.current = this.$dayjs(item.format);
        this.$emit('select', this.current);
      }
    },
    addMonth() {
      this.changeMonth(this.$dayjs(`${this.currentYear}-${this.currentMonth}-${this.currentDate}`).add(1, 'month'));
    },
    minusMonth() {
      this.changeMonth(this.$dayjs(`${this.currentYear}-${this.currentMonth}-${this.currentDate}`).subtract(1, 'month'));
    },
    changeMonth(current) {
      this.currentYear = current.year();
      this.currentMonth = current.month() + 1;
      this.getWeekData();
      this.$emit('changeMonth', {
        year: this.currentYear,
        month: this.currentMonth
      });
      this.$emit('change', {
        year: this.currentYear,
        month: this.currentMonth
      });
    },
    getWeekData() {
      let startDate = this.$dayjs(`${this.currentYear}-${this.currentMonth}-1`).startOf('week');
      const weeks = [];
      for (let i = 0; i < 6; i++) {
        const days = [];
        for (let j = 0; j < 7; j++) {
          const data = {
            year: startDate.year(),
            month: startDate.month() + 1,
            date: startDate.date(),
            format: startDate.format(this.defaultFormat)
          };
          days.push(data);
          startDate = startDate.add(1, 'day');
        }
        weeks.push(days);
      }
      this.weekData = weeks;
    }
  },
  mounted() {
    this.getWeekData();
    for (let i = 1; i <= 12; i++) {
      this.months.push({
        text: `${i}月`,
        value: i
      });
    }
    let year = this.currentYear;
    for (let i = 1; i <= 12; i++) {
      year = this.currentYear + (i - 6);
      this.years.push({
        text: `${year}年`,
        value: year
      });
    }
  }
};
</script>
