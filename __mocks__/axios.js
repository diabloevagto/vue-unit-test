module.exports = {
  get: jest.fn((link) => {
    let ret = '';
    if (link === 'https://api.github.com/users/a') {
      ret = '1';
    } else if (link === 'https://api.github.com/users/b') {
      ret = '2';
    } else {
      ret = link.split('/').reverse()[0];
    }

    return Promise.resolve({ data: { login: ret } });
  }),
};
