// Fires when state is changed (play/pause)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.stateChange) {
    switch (request.stateChange) {
      case 'pause':
        chrome.storage.local.set({ 'state': 'pause' })
        pauseSound()
        break
      case 'play':
        chrome.storage.local.set({ 'state': 'play' })
        if (kkSliderCheck()) playRandomKK()
        else {
          if (raining) playRain()
          playSong(globalHours)
        }
        break
    }
  } else if (request.rainStateChange) {
    switch (request.rainStateChange) {
      case 'on':
        chrome.storage.local.set({ 'rainState': 'on' })
        if (!(nowPlaying === '' || nowPlaying === 'Nothing!')) playRain()
        raining = true
        break
      case 'off':
        chrome.storage.local.set({ 'rainState': 'off' })
        pauseRain()
        raining = false
        break
    }
  }
})

chrome.storage.local.get(['state'], result => {
  if (!result['state']) chrome.storage.local.set({ 'state': 'play' })
})

chrome.storage.local.get(['rainState'], result => {
  if (!result['rainState']) chrome.storage.local.set({ 'rainState': 'off' })
  else if (result['rainState'] === 'on') {
    if (playing) {
      playRain()
    }
    raining = true
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.getNowPlaying) {
    chrome.runtime.sendMessage({ 'nowPlaying': nowPlaying }) 
  }
})
