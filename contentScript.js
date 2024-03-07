chrome.runtime.sendMessage({ query: 'toggleState' }, (isModificationEnabled) => {
  if (isModificationEnabled) {
      var button = document.querySelector('input[name="SecSysReleasebtn"]');
      if (button) {
          button.classList.remove('designDisableBtn1');
          button.classList.add('designBtn1');
          button.removeAttribute('disabled');
      }
  }
});
