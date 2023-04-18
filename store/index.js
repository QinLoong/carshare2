import Vue from "vue";
import Vuex from "vuex";
import { login, register, findUserById } from "@/common/api/user.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: uni.getStorageSync("userInfo") || {},
    dataList: [],
  },
  getters: {
    userInfo: ({ state }) => state.userInfo,
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      uni.setStorageSync("userInfo", userInfo);
    },
    ADD_DATA({ dataList }, data) {
      const index = dataList.findIndex((i) => i.number === data.number);
      if (index !== -1) dataList.splice(index, 1, data);
      else dataList.push(data);
      console.log(dataList);
    },
    DEL_DATA({ dataList }, number) {
      const index = dataList.findIndex((i) => i.number === number);
      if (index !== -1) dataList.splice(index, 1);
    },
  },
  actions: {
    login({ commit }, LoginInfo) {
      const { userPhone, password, isLogin } = LoginInfo;
      return new Promise((resolve, reject) => {
        const fn = isLogin ? login : register;
        fn({ userPhone, password })
          .then((response) => {
            if (response.code != 200) {
              return reject(response.message);
            }
            const { data } = response;
            commit("SET_USERINFO", data);
            resolve(data);
          })
          .catch((errors) => {
            console.log(errors);
            reject("未知错误！");
          });
      });
    },
    async getUserInfo({ commit }) {
      try {
        const res = await findUserById({ id: this.state.userInfo.id });
        if (res.code === 200) {
          commit("SET_USERINFO", res.data);
        } else {
          console.log("请求失败");
        }
      } catch (err) {
        console.log("请求失败");
      }
    },
    logout({ dispatch }) {
      dispatch("clearStorage");
    },
    clearStorage({ commit }) {
      commit("SET_USERINFO", {});
    },
    addData({ commit }, data) {
      commit("ADD_DATA", data);
    },
    delData({ commit }, { number }) {
      commit("DEL_DATA", number);
    },
  },
});

export default store;
