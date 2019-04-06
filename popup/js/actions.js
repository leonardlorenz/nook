$(document).ready(() => {
  function nowPlaying (state) {
    if (state === 'play') {
      $('#nowPlaying').text(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ').join('').toLowerCase())
    } else {
      $('#nowPlaying').text('Nothing!')
    }
  }

  chrome.runtime.onMessage.addListener(request => {
    if (request.nowPlaying) {
      $('#nowPlaying').text(request.nowPlaying)
    }
  })

  $('#stateToggle').on('click', (e) => {
    var state = $(e.currentTarget).attr('state')
    var newState = state === 'pause' ? 'play': 'pause'
    chrome.runtime.sendMessage({ 'stateChange': newState })
    $(e.currentTarget).attr('state', newState)
  })

  chrome.storage.sync.get(['state'], result => {
    if (result['state']) {
      $('#stateToggle').attr('state', result['state'])
      nowPlaying(result['state'])
    }
  })
})