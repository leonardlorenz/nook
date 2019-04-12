$(document).ready(() => {
  function nowPlaying (state) {
    if (state === 'play') {
      chrome.runtime.sendMessage({ 'getNowPlaying': 'pls' }) 
    } else {
      $('#nowPlaying').text('Nothing!')
    }
  }

  chrome.runtime.onMessage.addListener(request => {
    if (request.nowPlaying) {
      $('#nowPlaying').text(request.nowPlaying)
    }
  })

  $('#rainCheckbox').on('change', (e) => {
    setTimeout(function () {
      let state = e.target.checked ? 'on' : 'off'
      chrome.runtime.sendMessage({ 'rainStateChange': state })
    }, 250)
  })

  $('#stateToggle').on('click', (e) => {
    let state = $(e.currentTarget).attr('state')
    let newState = state === 'pause' ? 'play': 'pause'
    chrome.runtime.sendMessage({ 'stateChange': newState })
    $(e.currentTarget).attr('state', newState)
  })

  function toggleGMList(state) {
    if (state === true) $('#grandfatherHoursDiv').removeClass('hidden')
    else $('#grandfatherHoursDiv').addClass('hidden')
  }
  
  $('#grandfather').on('change', (e) => {
    setTimeout(function () {
      let state = e.target.checked ? true : false
      toggleGMList(state)
      chrome.runtime.sendMessage({ 'optionChange': ['gm', state] })
    }, 50)
  })

  chrome.storage.local.get(['optionGM'], result => {
    if (result['optionGM']) {
      if (result['optionGM'] === true) $('#grandfather').prop('checked', true)
      toggleGMList(result['optionGM'])
    }
  })

  chrome.storage.local.get(['rainState'], result => {
    if (result['rainState']) {
      if (result['rainState'] === 'on') {
        $('#rainCheckbox').prop('checked', true)
      }
    }
  })

  chrome.storage.local.get(['state'], result => {
    if (result['state']) {
      $('#stateToggle').attr('state', result['state'])
      nowPlaying(result['state'])
    }
  })
})