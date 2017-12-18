# vue-unit-test

> 利用 jest 測試 vuex

## 測試方式

vuex 總共包含四個項目
* state
* mutations
* getters
* action

其中 state 只是單純資料儲存所以不需要測試，以下介紹其他三個項目的測試方式

### mutations
使用假的 state 傳進 mutations 去操作，結束之後判斷 state 是否符合預期

### getters
使用假的 state 傳進 getters 去操作，結束之後判斷 state 是否符合預期

### action
action 在測試上比較麻煩，因為會使用到 vuex 的 commit 以及可能的後端 api，其中可以分成兩部分處理
1. 後端 api，這部分可以使用 jest 的 [mock module](https://facebook.github.io/jest/docs/en/manual-mocks.html) 來處理，可參考[此專案資料夾](https://github.com/diabloevagto/vue-unit-test/tree/master/__mocks__)
2. action 實際測試有兩種方法，各有好壞
    1. 自己另外創建新的 store，其中 state 使用自訂的這樣才能在每次開始時都用特定的初始值，當執行完之後再判斷 state 是否為預期的數值，不過這種方式會跟 mutations 有所綁定
    2. 同上面的方式，也是重新創建 store 不同的差異點在於不需要 state 而且 mutations 用 jest 的 [mock function](https://facebook.github.io/jest/docs/en/mock-function-api.html) 替換掉，利用判斷執行 action 傳進 mutations 的參數判斷是否為合乎預期

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
