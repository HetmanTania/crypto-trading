import { createStore } from 'vuex'

export default createStore({
    state: {
        coins: [],
        countPrintCoins: 10,
        countPrintUpdateCoins: 10,
        page: 1,
        message: undefined
    },
    getters: {
        coins(state) {
            return state.coins
        },
        message(state) {
            return state.message
        }
    },
    mutations: {
        setMessage(state, data) {
            state.message = data;
        },
        removeMessage(state) {
            state.message = undefined;
        },
        setCoin(state, data) {
            state.coin = data;
        },
        setCoins(state, data) {
            state.coins = data;
        },
        addCoins(state, data) {
            const tempCoins = [];
            if(!state.coins.length) {
                state.coins = data;
                return;
            }
            data.forEach((dateCoin) => {
                if(state.coins.find((el) => { return dateCoin.id !== el.id; })){
                    tempCoins.push(dateCoin);
                }
            })
            state.coins = state.coins.concat(tempCoins);
        },
        addPage(state) {
            state.page += 1;
        },
        addCountPrintUpdateCoins(state) {
            state.countPrintUpdateCoins += state.countPrintCoins;
        }
    },
    actions: {
        async loadHistoriCoin({commit}, {id, date}) {
            try {
                const {from, to} = date;
                const request = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`);
                if(request.ok) {
                    const coin = await request.json();
                    return coin;
                }
                else {
                    throw new Error();
                }
            }
            catch(e) {
                commit("setMessage", {text: "Ошибка соединения", title: "Ошибка", type: "danger"});
                setTimeout(() => {
                    commit("removeMessage");
                }, 6000)
            }
        },
        async loadCoin({commit}, id) {
            try {
                const request = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`)
                if(request.ok) {
                   const coin = await request.json();
                   return coin;
                }
                else {
                    throw new Error();
                }
            }
            catch(e) {
                commit("setMessage", {text: "Ошибка соединения", title: "Ошибка", type: "danger"});
                setTimeout(() => {
                    commit("removeMessage");
                }, 6000)
            }
        },
        async updateCouns({commit, state}) {
            try{
                const request = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${state.countPrintUpdateCoins}&page=1&sparkline=false`);
                if(request.ok) {
                    const coins = await request.json();
                    commit("setCoins", coins);
                }
                else {
                    throw new Error();
                }
            }
            catch(e) {
                commit("setMessage", {text: "Ошибка соединения", title: "Ошибка", type: "danger"});
                setTimeout(() => {
                    commit("removeMessage");
                }, 6000)
            }
        },
        async loadNextPageCoins({commit, state}){
            try{
                commit("addPage");
                const request = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${state.countPrintCoins}&page=${state.page}&sparkline=false`);
                if(request.ok) {
                    const coins = await request.json();
                    commit("addCoins", coins);
                    commit("addCountPrintUpdateCoins");
                }
                else {
                    throw new Error();
                }
            }
            catch(e) {
                commit("setMessage", {text: "Ошибка соединения", title: "Ошибка", type: "danger"});
                setTimeout(() => {
                    commit("removeMessage");
                }, 6000)
            }
        },
        async loadCoins({commit, state}) {
            try{
                const request = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${state.countPrintCoins}&page=${state.page}&sparkline=false`);
                if(request.ok) {
                    const coins = await request.json();
                    commit("addCoins", coins);
                }
                else {
                    throw new Error();
                }
            }
            catch(e) {
                commit("setMessage", {text: "Ошибка соединения", title: "Ошибка", type: "danger"});
                setTimeout(() => {
                    commit("removeMessage");
                }, 6000)
            }
        }
    },
   
});