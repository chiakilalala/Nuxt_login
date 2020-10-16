# ASSETS

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your un-compiled assets such as LESS, SASS, or JavaScript.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/assets#webpacked).


nuxt  生命週期探討

了解什麼是node 和 vue 之前的環境以及關係

nuxt 


vuex 基本觀念

vue 資料傳遞方式

1.

vuex 輕量用法 - state . getter mutations

vuex 大型專案用法



process 

porcess node 管理


1、vuex 基本觀念
2、vuex 輕量用法 - state、getters、mutations
3、vuex 大型專案用法

vuex 輕量用法

1、store 建立一個 index.js

2、state 資料無法直接更改
3、使用 mutations 更改 state 的資料
4、使用 getters 提取資料並做加工
5、vuex 內部存取 vuex 的方式是透過函式參數傳入。 → vuex 沒有 this
6、外部呼叫 vuex 的方式、留意不同的情境 → 函式上下文、vue 實例


vuex 速計圖表

1.state  代表動詞 state

2.Getters 取資料 加工 getters

3.Ｍutations 變動資料 commit
4. Actino 非同步資料  dispatch
