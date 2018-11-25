(function () {
  const {
    MIN_LEN,
    STORAGE_KEY,
    STORAGE_KEY_CODE,
    D_SHORTCUT_KEYS,
    D_SHORTCUT_KEYS_CODE,
    E_GET_KEYS,
    E_GET_SHORTCUT_KEYS,

    setShortcut: _setShortcut,
    getShortcut: _getShortcut,
  } = window.$WHY_NOT_KEYS$;
  
  window.onload = function () {
    const inputEle = document.getElementById('shortcut-value');
    const errTipEle = document.getElementById('shortcut-err-tip');
    const btnDefaultEle = document.getElementById('shortcut-default-btn');
  
    let shorcutKeys = [];
    let shorcutKeyCodes = [];

    document.addEventListener(E_GET_KEYS, function(event) {
      shorcutKeys = event.detail.shorcutKeys;
      shorcutKeyCodes = event.detail.shorcutKeyCodes;
      if (shorcutKeyCodes.length < MIN_LEN) {
        showErr();
      } else {
        setShortcut();
      }

      hideErr();
      setInputVal();
    })
  
    document.addEventListener(E_GET_SHORTCUT_KEYS, function (event) {
      shorcutKeys = event.detail.shorcutKeys;
      shorcutKeyCodes = event.detail.shorcutKeyCodes;
    });
  
    btnDefaultEle.addEventListener('click', function () {
      shorcutKeys = D_SHORTCUT_KEYS;
      shorcutKeyCodes = D_SHORTCUT_KEYS_CODE;
      setInputVal();
      setShortcut();
    });

    function showErr () {
      errTipEle.style.opacity = 1;
    }
  
    function hideErr () {
      errTipEle.style.opacity = 0;
    }
   
    function setInputVal () {
      inputEle.innerText = shorcutKeys.join(' + ');
    }
  
    function setShortcut () {
      _setShortcut({
        [STORAGE_KEY]: shorcutKeys,
        [STORAGE_KEY_CODE]: shorcutKeyCodes
      });
    }
  
    function getShortcut () {
      _getShortcut({
        [STORAGE_KEY]: D_SHORTCUT_KEYS,
        [STORAGE_KEY_CODE]: D_SHORTCUT_KEYS_CODE
      }, function (obj) {
        shorcutKeys = obj[STORAGE_KEY] || D_SHORTCUT_KEYS;
        shorcutKeyCodes = obj[STORAGE_KEY_CODE] || D_SHORTCUT_KEYS_CODE;
        setInputVal();
      });
    }
  
    getShortcut();
  }
})();