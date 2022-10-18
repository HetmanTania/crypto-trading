<template>
<div class="container is-widescreen">
  <div v-if="coin" class="box">
    <article class="media is-flex-wrap-wrap is-flex is-justify-content-end is-align-items-center">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="coin.image?.large" :alt="coin.name" />
        </p>
      </figure>
      <div class="media-content is-flex is-justify-content-start is-align-items-center">
        <h2 class="title is-3 has-text-info ">{{ coin.name }}</h2>
        <h3 class="title is-4 has-text-danger "> ({{coin.symbol}})</h3>
      </div>
      <h2 class="title is-3 has-text-info ">{{priceFormatString(coin.market_data?.current_price?.usd)}}</h2>
    </article>
    <div class="level">
      <div class="level-item has-text-centered is-flex-wrap-wrap has-text-warning is-flex is-justify-content-space-around is-align-items-center">
         <div>
          <p class="heading">1 час</p>
          <p class="title">{{priceFormatString(coin.market_data?.high_24h?.usd)}}</p>
        </div>
         <div>
          <p class="heading">Макс.24 часа</p>
          <p class="title">{{priceFormatString(coin.market_data?.high_24h.usd)}}</p>
        </div>
         <div>
          <p class="heading">Мин. 24 часа</p>
          <p class="title">{{priceFormatString(coin.market_data?.low_24h.usd)}}</p>
        </div>
        <div>
          <p class="heading">7 дней</p>
          <p class="title">{{percentageFormatter(coin.market_data?.price_change_percentage_7d)}}</p>
        </div>
       
      </div>
    </div>
    <div class="block">
        <div class="double-list is-flex is-flex-wrap-wrap is-justify-content-center">
            <div class="double-list-item  is-flex is-justify-content-start is-align-items-center">
                <div class="title has-text-warning is-6">
                    Рыночная капитализация:
                </div>
                <div class="text  title is-6">
                    {{priceFormatString(coin.market_data?.market_cap?.usd)}}
                </div>
            </div>
            <div class="double-list-item is-flex is-justify-content-start is-align-items-center">
                <div class="title has-text-warning is-6">
                    24-часовой торговый объем:
                </div>
                <div class="text  title is-6">
                    {{priceFormatString(coin.market_data?.total_volume?.usd)}}
                </div>
            </div>
            <div class="double-list-item is-flex is-justify-content-start is-align-items-center">
                <div class="title has-text-warning is-6">
                    Разводненная оценка:
                </div>
                <div class="text  title is-6">
                    {{priceFormatString(coin.market_data?.fully_diluted_valuation?.usd)}}
                </div>
            </div>
            <div class="double-list-item is-flex is-justify-content-start is-align-items-center">
                <div class="title has-text-warning is-6">
                    Оборотная поставка:
                </div>
                <div class="text title is-6">
                    {{priceFormatString(coin.market_data?.circulating_supply)}}
                </div>
            </div>
            <div class="double-list-item is-flex is-justify-content-start is-align-items-center">
                <div class="title has-text-warning is-6">
                    Общее предложение:
                </div>
                <div class="text title is-6">
                    {{priceFormatString(coin.market_data?.total_supply)}}
                </div>
            </div>
             <div class="double-list-item is-flex is-justify-content-start is-align-items-center">
                <div class="title has-text-warning is-6">
                    Мах. предложение:
                </div>
                <div class="text title is-6">
                    {{priceFormatString(coin.market_data?.max_supply)}}
                </div>
            </div>
        </div>
    </div>
     <div class="block">
       <div class="buttons has-addons is-flex is-justify-content-end is-align-items-center">
        <button class="button is-info" @click="click24h" :class="btnHistory === '24h' ?  ['is-warning', 'is-selected'] : ''">24 Часа</button>
        <button class="button is-info" @click="click7d" :class="btnHistory === '7d' ?  ['is-warning', 'is-selected'] : ''">7 Дней</button>
        <button class="button is-info" @click="click30d" :class="btnHistory === '30d' ?  ['is-warning', 'is-selected'] : ''">30 Дней</button>
      </div>
        <div class="conteinerLineChart">
           <LineChart :chartData="chartData" :options="options"/>
        </div>
     </div>
    <div class="block">
      <div class="title is-4">Ссылки</div>
        <div v-if="coin.links?.homepage[0].length" class="block-site is-flex-wrap-wrap is-flex is-justify-content-start is-align-items-center">
          <p>Официальный сайт:</p>
            <div v-for="site in coin.links?.homepage" :key="site" >
              <small v-if="site" class="tag is-warning"><a target="_blank" :href="site">{{site}}</a></small>
          </div>
        </div>
         <div v-if="coin.links?.blockchain_site[0].length" class="block-site is-flex-wrap-wrap is-flex is-justify-content-start is-align-items-center">
          <p>Сайты блокчейн: </p>
            <div v-for="site in coin.links?.blockchain_site" :key="site" >
              <small v-if="site" class="tag is-warning"><a target="_blank" :href="site">{{site}}</a></small>
          </div>
        </div>
       
         <div v-if="coin.links?.official_forum_url[0].length" class="block-site is-flex-wrap-wrap is-flex is-justify-content-start is-align-items-center">
          <p>Форум:</p>
             <div v-for="site in coin.links?.official_forum_url" :key="site" >
              <small v-if="site" class="tag is-warning"><a target="_blank" :href="site">{{site}}</a></small>
          </div> 
        </div> 
        <div v-if="coin.links?.repos_url?.github.length" class="block-site is-flex-wrap-wrap is-flex is-justify-content-start is-align-items-center">
          <p>Исходный код:</p>
            <div v-for="site in coin.links?.repos_url?.github" :key="site" >
              <small v-if="site" class="tag is-warning"><a target="_blank" :href="site"><i class="fa fa-github fa-lg" aria-hidden="true"></i> {{site}}</a></small>
          </div>
        </div>
        <div  class="block-site is-flex is-justify-content-start is-flex-wrap-wrap is-align-items-center">
            <small v-if="coin.links?.subreddit_url" class="tag is-warning"><a target="_blank" :href="coin.links?.subreddit_url"><i class="fa fa-reddit fa-lg" aria-hidden="true"></i> Reddit </a></small>
            <small v-if="coin.links?.telegram_channel_identifier" class="tag is-warning"><a target="_blank" :href="'https://telegram.me/' + coin.links?.subreddit_url"><i class="fa fa-telegram fa-lg" aria-hidden="true"></i> Telegram </a></small>
            <small v-if="coin.links?.twitter_screen_name"  class="tag is-warning"><a target="_blank" :href="'https://twitter.com/' + coin.links?.twitter_screen_name"><i class="fa fa-twitter fa-lg" aria-hidden="true"></i> Twitter </a></small>
            <small v-if="coin.links?.facebook_username"  class="tag is-warning"><a target="_blank" :href="'https://facebook.com/' + coin.links?.twitter_screen_name"><i class="fa fa-facebook fa-lg" aria-hidden="true"></i> Facebook </a></small>
        </div>

      </div>
  </div>
</div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { LineChart } from 'vue-chart-3';
import { priceFormatterString, piceFormatter, changePercentageFormatter, timespanFormat, timeFormat } from "../utils/formatter";
Chart.register(...registerables);
export default {
   mounted() {
    this.loadCoin();
    this.idInterval = setInterval(this.loadCoin, 60000);
  },
  beforeUnmount() {
    clearInterval(this.idInterval);
  },
  methods: {
    async loadCoin() {
      const id = this.$route.params.id;
      this.coin = await this.$store.dispatch("loadCoin", id);
      if(this.btnHistory === "24h") {
        this.click24h();
      }
      if(this.btnHistory === "7d") {
        this.click7d();
      }
      if(this.btnHistory === "30d") {
        this.click30d();
      }
    },
    click24h() {
      this.btnHistory = "24h";
      this.sendHistoryQuery(1, "time");
    },
    click7d() {
      this.btnHistory = "7d";
      this.sendHistoryQuery(7, "day");
    },
    click30d() {
      this.btnHistory = "30d";
      this.sendHistoryQuery(30, "day");
    },
    async sendHistoryQuery(date, lable) {
      const id = this.coin.id;
      const currentDate = new Date(this.coin.last_updated);
      const timespanTo = timespanFormat(currentDate);
      const prevDate = new Date(new Date().setDate(currentDate.getDate() - Number(date)));
      const timespanFrom =  timespanFormat(prevDate);
      const history = await this.$store.dispatch("loadHistoriCoin", {id, date: {from: timespanFrom, to: timespanTo}} );
      this.generateHistoryDate(history);
      this.generateChartdata(lable);
    },
    priceFormat(price) {
      return piceFormatter(price);
    },
    priceFormatString(price) {
      return priceFormatterString(price);
    },
    percentageFormatter(percent) {
      return changePercentageFormatter(percent);
    },
    generateHistoryDate(history) {
      if(history) {
        const tempHistory = [];
        for (let index = 0; index < history.market_caps.length; index++) {
           const date = new Date(history.market_caps[index][0]);
            tempHistory.push({
             date: date,
             dateStr: undefined,
             marketCaps: history.market_caps[index][1],
             price:  history.prices[index][1],
             totalVolume: history.total_volumes[index][1],
           })
        }
        this.history = this.sortHistoryByDate(tempHistory);
      }
    },
    generateChartdata(lable) {
      this.chartData.labels = this.history.map((el) => {
         if(lable === "time") {
          el.dateStr = timeFormat(el.date);
          return el.dateStr;
         }
         else if(lable === "day") {
          el.dateStr = `${el.date.getDate()}.${el.date.getMonth() + 1}.${el.date.getFullYear()}`
          return el.dateStr;
         }
       });

       this.chartData.datasets[0].data = this.history.map((el) => {
         return el;
       });
    },
    sortHistoryByDate(history) {
      return history.sort((firstEl, secondEl) => {
        const timespanFirstEl = firstEl.date.getTime();
        const timespanSecondEl = secondEl.date.getTime();
        if(timespanFirstEl < timespanSecondEl) {
          return -1;
        }
        else if(timespanFirstEl < timespanSecondEl) {
          return 1
        }
        return 0 
      })
    }
  },
  data() {
    return {
      coin: undefined,
      history: [],
      btnHistory: "24h",
      idInterval: undefined,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'USD',
            backgroundColor: '#ff8906',
            data: [],
          }
        ]
      },
      options: {
        parsing: {
          xAxisKey: "dateStr",
          yAxisKey: "price",
        },
        pointStyle: "circle",
        borderWidth:2,
        borderColor: "#ff8906",
        radius:1,
        scales: {
          y: {
            ticks: {
              callback: function(value) {
              return priceFormatterString(value);
              }
            }
          }
        },
        plugins: {
          tooltip: {
            displayColors: false,
            callbacks: {
              title(context) {
                 const indexEl = context[0].dataIndex;
                 const el = context[0].dataset.data[indexEl];
                 return el.date.toLocaleString();
              },
              label: (context) => {
                const indexEl = context.dataIndex;
                const el = context.dataset.data[indexEl];
                return [`Цена: ${priceFormatterString(el.price)}`, `Oбщий объем: ${priceFormatterString(el.totalVolume)}`]
              }
            }
          }
        }
      }
    };
  },
  components: { LineChart }
};
</script>
