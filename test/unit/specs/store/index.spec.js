import { mutations, getters, actions } from '@/store';
import axios from 'axios';
import Vuex from 'vuex';

const makeRandomString = function () {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// mutations：使用假的 state 傳進 mutations 去操作
describe('mutations', () => {
  let state = {};

  test('increment', () => {
    state = { count: 20 };
    mutations.increment(state, 1);
    expect(state.count).toBe(210);

    mutations.increment(state, -10);
    expect(state.count).toBe(11);

    mutations.increment(state, '10');
    expect(state.count).toBe(21);

    mutations.increment(state, 'a');
    expect(state.count).toEqual(NaN);
  });

  test('decrement', () => {
    state = { count: 0 };
    mutations.decrement(state, 1);
    expect(state.count).toBe(-1);

    mutations.decrement(state, -10);
    expect(state.count).toBe(9);

    mutations.decrement(state, '10');
    expect(state.count).toBe(-1);

    mutations.decrement(state, 'a');
    expect(state.count).toEqual(NaN);
  });

  test('updateMessage', () => {
    state = { testMessage: '' };
    for (let i = 0; i < 5; i += 1) {
      const st = makeRandomString();
      mutations.updateMessage(state, st);
      expect(state.testMessage).toBe(st);
    }
  });

  test('fetchName', () => {
    state = { githubName: '' };
    for (let i = 0; i < 5; i += 1) {
      const st = makeRandomString();
      mutations.fetchName(state, st);
      expect(state.githubName).toBe(st);
    }
  });
});

// getters：使用假的 state 傳進 getters 去操作
describe('getters', () => {
  let state = {};
  test('getMore normal', () => {
    state = { count: 10 };
    const g = getters.getMore(state);
    expect(g(0)).toBe(0);
    expect(g(100)).toBe(1000);
  });
  test('getMore Nan', () => {
    state = { count: undefined };
    const g = getters.getMore(state);
    expect(g(100)).toEqual(NaN);
  });
});

// 使用到的 module 放在 rootdir 的 __mock__ 資料夾並且用成同名，在測試執行時會自己 mock 替換
describe('mock', () => {
  test('test mock', async () => {
    let id;
    id = 'vuejs';
    expect(await axios.get(`https://api.github.com/users/${id}`)).toEqual({ data: { login: id } });
    id = 'test';
    expect(await axios.get(`https://api.github.com/users/${id}`)).toEqual({ data: { login: id } });
    id = 'a';
    expect(await axios.get(`https://api.github.com/users/${id}`)).toEqual({ data: { login: '1' } });
  });
});

// action：自己另外創建新的 store，其中 state 用新的這樣才能在每次開始時都用特定的初始值
// 當執行完之後再判斷 state 是否為預期的數值，不過這種方式會跟 mutations 有所綁定
describe('action', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        count: 0,
        testMessage: 'testMessage',
        githubName: 'no fetch',
      },
      mutations,
      actions,
    });
  });

  test('increment', () => {
    let result = store.state.count;
    for (let i = 0; i < 5; i += 1) {
      const ran = Math.floor(Math.random() * 60) - 30;
      store.dispatch('increment', ran);
      result += ran;
    }
    expect(store.state.count).toBe(result);
  });

  test('decrement', () => {
    let result = store.state.count;
    for (let i = 0; i < 5; i += 1) {
      const ran = Math.floor(Math.random() * 60) - 30;
      store.dispatch('decrement', ran);
      result -= ran;
    }
    expect(store.state.count).toBe(result);
  });

  test('updateMessage', () => {
    for (let i = 0; i < 5; i += 1) {
      const ran = makeRandomString();
      store.dispatch('updateMessage', ran);
      expect(store.state.testMessage).toBe(ran);
    }
  });

  test('fetchName', async () => {
    await store.dispatch('fetchName', 'vuejs');
    expect(store.state.githubName).toBe('vuejs');

    await store.dispatch('fetchName', 'test');
    expect(store.state.githubName).toBe('test');

    await store.dispatch('fetchName', 'a');
    expect(store.state.githubName).toBe('1');

    await store.dispatch('fetchName', 'b');
    expect(store.state.githubName).toBe('2');
  });
});

// action：同上面的方式，也是重新創建 store 不同的差異點在於不需要 state 而且 mutations 用 jest 的 mock function 替換掉
// 利用判斷執行 action 傳進 mutations 的參數判斷是否為合乎預期
describe('action mock', () => {
  let store;
  let mockFn;
  beforeEach(() => {
    mockFn = jest.fn();
    store = new Vuex.Store({
      mutations: {
        increment: mockFn,
        decrement: mockFn,
        updateMessage: mockFn,
        fetchName: mockFn,
      },
      actions,
    });
  });

  test('increment', () => {
    const arr = [1, 2, 3, -10, 999];
    arr.forEach(it => store.dispatch('increment', it));
    const compareArr = arr.every((val, idx) => mockFn.mock.calls[idx][1] === val);
    expect(compareArr).toBeTruthy();
  });

  test('decrement', () => {
    const arr = [1, 2, 3, -190, 99];
    arr.forEach(it => store.dispatch('decrement', it));
    const compareArr = arr.every((val, idx) => mockFn.mock.calls[idx][1] === val);
    expect(compareArr).toBeTruthy();
  });

  test('updateMessage', () => {
    const arr = [makeRandomString(), makeRandomString(), makeRandomString()];
    arr.forEach(it => store.dispatch('updateMessage', it));
    const compareArr = arr.every((val, idx) => mockFn.mock.calls[idx][1] === val);
    expect(compareArr).toBeTruthy();
  });

  test('fetchName', async () => {
    const arr = ['vuejs', 'test', 'a', 'b'];
    const res = ['vuejs', 'test', '1', '2'];
    await Promise.all(arr.map(async (num) => {
      await store.dispatch('fetchName', num);
    }));
    const compareArr = res.every((val, idx) => mockFn.mock.calls[idx][1] === val);

    expect(compareArr).toBeTruthy();
  });
});
