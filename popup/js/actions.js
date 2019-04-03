$(document).ready(() => {
  var typcn = document.createElement('style')
  typcn.type = 'text/css'
  typcn.textContent = `@font-face { font-family: 'typicons'; src: url("`
      + chrome.extension.getURL('css/fonts/typicons.eot')
      + '"); }'
  document.head.appendChild(typcn)
  $('#stateToggle').on('click', (e) => {
    var state = $(e.currentTarget).attr('state')
    var newState = state === 'pause' ? 'play': 'pause'
    chrome.runtime.sendMessage({ 'stateChange': newState })
    $(e.currentTarget).attr('state', newState)
  })

  chrome.storage.sync.get(['state'], result => {
    if (result['state']) {
      $('#stateToggle').attr('state', result['state'])
    }
  })
})