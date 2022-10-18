<template>
  <div v-if="isLoad" class="preloader"></div>
  <div v-else class="box table-container">
    <table class="table table is-fullwidth has-text-warning">
      <thead class="has-background-warning">
        <tr>
          <td @click="setSortValue({nameKey: 'market_cap_rank', isReverse: !this.sortValue.isReverse})">#</td>
          <td></td>
          <td @click="setSortValue({nameKey: 'name', isReverse: !this.sortValue.isReverse})">Coin</td>
          <td></td>
          <td @click="setSortValue({nameKey: 'current_price', isReverse: !this.sortValue.isReverse})">Цена USD.</td>
          <td @click="setSortValue({nameKey: 'price_change_percentage_24h', isReverse: !this?.sortValue.isReverse})">24 часа</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coin in sortCoin" :key="coin.id">
          <td>{{ coin.market_cap_rank }}</td>
          <td><img :src="coin.image" :alt="coin.name" /></td>
          <td><router-link class="has-text-warning" :to="{name: 'Coin', params: {id: coin.id}}"> {{ coin.name }}</router-link></td>
          <td>{{ coin.symbol.toUpperCase() }}</td>
          <td class="has-text-info">{{ priceFormat(coin.current_price) }}</td>
          <td :class="coin.price_change_percentage_24h < 0 ? 'has-text-danger': 'has-text-success'">
            {{ percentageToFixedFormatter(coin.price_change_percentage_24h) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div @click="loadNextPageCoins" :class="btnIsLoad ? 'is-loading' : ''" class="button is-info is-medium is-fullwidth">
      Загрузить еще
    </div>
  </div>
</template>

<script>
import { priceFormatterString, changePercentageFormatter, changePercentageToFixedFormatter } from "../utils/formatter";
import sortData from "../utils/sortData";

export default {
  async mounted() {
    if(this.$store.getters.coins.length === 0) {
      this.isLoad = true;
      await this.loadCoins();
      this.isLoad = false;
      this.idInterval = setInterval(this.updateCouns, 20000);
    }
    else {
      this.coinsData = this.$store.getters.coins;
    }
  },
  beforeUnmount() {
    clearInterval(this.idInterval);
  },
  methods: {
    async updateCouns() {
      await this.$store.dispatch("updateCouns");
      this.coinsData = this.$store.getters.coins;
    },
    async loadCoins() {
      await this.$store.dispatch("loadCoins");
      this.coinsData = this.$store.getters.coins;
    },
    async loadNextPageCoins() {
      this.btnIsLoad = true;
      await this.$store.dispatch("loadNextPageCoins");

      this.coinsData = this.$store.getters.coins;
      this.btnIsLoad = false;
    },
    priceFormat(price) {
      return priceFormatterString(price);
    },
    percentageFormatter(percent) {
      return changePercentageFormatter(percent);
    },
    percentageToFixedFormatter(percent){
      return changePercentageToFixedFormatter(percent)
    },
    setSortValue(sortValue) {
      this.sortValue = sortValue;
    }
  },
  data() {
    return {
      sortValue: {
        nameKey: "",
        isReverse: true
      },
      coinsData: [],
      isLoad: false,
      btnIsLoad: false,
      idInterval: undefined,
    };
  },
  computed: {
    sortCoin() {
      if(this.sortValue.nameKey) {
        return sortData(this.$store.getters.coins, this.sortValue.nameKey, this.sortValue.isReverse);
      }
      else {
        return this.coinsData;
      }
    },
    coins() {
      return this.coinsData;
    },

  },
};
</script>

<style>
</style>