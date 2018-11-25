(function () {
  const {
    STORAGE_KEY_CODE,
    D_SHORTCUT_KEYS_CODE,
    E_GET_SHORTCUT_KEYS,

    SHORTCUT_KEYS,

    getShortcut,
  } = window.$WHY_NOT_KEYS$;

  let shorcutKeyCodes = '';
  let isShowWrapper = false;
  let wrapperEle;
  let inputEle;
  let textBtnEles;
  let valBtnEles;

  const eleKeys = {};

  document.addEventListener(E_GET_SHORTCUT_KEYS, function (event) {
    if (shorcutKeyCodes === event.detail.shorcutKeyCodes.join('+')) {
      if (isShowWrapper) {
        hideWrapper();
      } else {
        showWrapper();
      }
    }
  });

  document.addEventListener('keypress', function (event) {
    if (!isShowWrapper) {
      return;
    }

    if (event.keyCode === 13) { // enter key
      const val = inputEle.value;
      const ele = eleKeys[val];

      if (ele instanceof HTMLElement) {
        ele.click();
      }
      hideWrapper();
    }
  });

  document.addEventListener('DOMContentLoaded', function (event) {
    const html = `
    <div id="--shortcut-keys-content--">
      <input id="--shortcut-keys-input--" placeholder="Tap Shortcut Keys Above an Element and Press the ENTER Key">
    </div>`;
    const wrapper = document.createElement('div');
    wrapper.id = '--shortcut-keys-wrapper--'
    wrapper.innerHTML = html;
    document.body.append(wrapper);

    wrapperEle = document.getElementById('--shortcut-keys-wrapper--');
    inputEle = document.getElementById('--shortcut-keys-input--');

    wrapperEle.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  });

  document.addEventListener('click', function() {
    if (isShowWrapper) {
      hideWrapper();
    }
  });

  getShortcut({
    [STORAGE_KEY_CODE]: D_SHORTCUT_KEYS_CODE
  }, function (obj) {
    shorcutKeyCodes = (obj[STORAGE_KEY_CODE] || D_SHORTCUT_KEYS_CODE).join('+');
  });

  function showWrapper() {
    wrapperEle.style.display = 'block';
    isShowWrapper = true;

    inputEle.value = '';
    inputEle.focus();

    textBtnEles = document.querySelectorAll('button, a') || [];
    valBtnEles = document.querySelectorAll('input[type=button], input[type=submit]') || [];

    setEleShortcuts();
  }

  function hideWrapper() {
    wrapperEle.style.display = 'none';
    isShowWrapper = false;

    rmEleShortcut();
  }

  function setEleShortcuts () {
    const eles = [...textBtnEles, ...valBtnEles];

    eles.forEach(function(ele, index) {
      const parent = ele.parentElement;
      const rectParent = parent.getBoundingClientRect();
      const rect = ele.getBoundingClientRect();

      const span = document.createElement('span');
      span.innerText = SHORTCUT_KEYS[index];
      span.className = '--shortcuts-keys--'
      span.style.top = (rect.top - rectParent.top) + 'px';
      span.style.right = (rectParent.right - rect.right) + 'px';

      if (['absolute', 'relative', 'fixed'].indexOf(parent.style.position) === -1) {
        parent.style.position = 'relative';
      }

      if(ele.nextSibling){
        parent.insertBefore(span, ele.nextSibling);
      }else{
        parent.appendChild(span);
      }

      eleKeys[SHORTCUT_KEYS[index]] = ele;
    });
  }

  function rmEleShortcut () {
    const spans = document.querySelectorAll('.--shortcuts-keys--');
    spans.forEach(function(ele) {
      ele.remove();
    });
  }
})();