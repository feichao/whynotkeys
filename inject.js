(function () {
  const noop = () => {};
  const MIN_LEN = 2;
  const STORAGE_KEY = 'shortcut-keys';
  const STORAGE_KEY_CODE = 'shortcut-keys-code';
  const D_SHORTCUT_KEYS = ['Control', 'Control'];
  const D_SHORTCUT_KEYS_CODE = [17, 17];
  const E_GET_KEYS = 'get-keys';
  const E_GET_SHORTCUT_KEYS = 'get-shortcut-keys';

  window.$WHY_NOT_KEYS$ = window.$WHY_NOT_KEYS$ || {};

  window.$WHY_NOT_KEYS$ = Object.assign(window.$WHY_NOT_KEYS$, {
    MIN_LEN,
    STORAGE_KEY,
    STORAGE_KEY_CODE,
    D_SHORTCUT_KEYS,
    D_SHORTCUT_KEYS_CODE,
    E_GET_KEYS,
    E_GET_SHORTCUT_KEYS,

    setShortcut(obj, cb = noop) {
      chrome.storage.sync.set(obj, function () {
        console.log('Set Success => ', obj);
        cb();
      });
    },

    getShortcut(obj, cb = noop) {
      chrome.storage.sync.get(obj, function (obj) {
        console.log('Get Success => ', obj);
        cb(obj);
      });
    },
  });

  let shorcutKeys = [];
  let shorcutKeyCodes = [];
  let timer = null;
  let isOk = false;
  document.addEventListener('keydown', function (event) {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    if (isOk) {
      shorcutKeys.push(key);
      shorcutKeyCodes.push(keyCode);
    } else {
      shorcutKeys = [key];
      shorcutKeyCodes = [keyCode];
    }

    const detail = { shorcutKeys, shorcutKeyCodes };
    document.dispatchEvent(new CustomEvent(E_GET_KEYS, { detail }));

    isOk = true;
    clearTimeout(timer);
    timer = setTimeout(function () {
      isOk = false;
      document.dispatchEvent(new CustomEvent(E_GET_SHORTCUT_KEYS, { detail }));
    }, 300);
  });
})();