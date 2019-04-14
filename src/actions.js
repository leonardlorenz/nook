// Fires when state is changed (play/pause)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.stateChange) {
    switch (request.stateChange) {
      case 'pause':
        // Pause if pause is fired
        pauseSound()
        break
      case 'play':
        // Set state to play
        chrome.storage.local.set({ 'state': 'play' })
        // If KK play random KK
        if (kkSliderCheck()) playRandomKK()
        // If not then just play normal music
        else playSong(globalHours)
        break
    }
  } else if (request.rainStateChange) {
    switch (request.rainStateChange) {
      // Rain enable
      case 'on':
        // Set state to on
        chrome.storage.local.set({ 'rainState': 'on' })
        // If nothing is playing, play the rain. This is to prevent rain playing by itself when toggled.
        if (!(nowPlaying === '' || nowPlaying === 'Nothing!')) playRain()
        // Set raining variable to true for further use
        raining = true
        break
      // Rain disable
      case 'off':
        // Set state to off
        chrome.storage.local.set({ 'rainState': 'off' })
        // Pause the rain
        pauseRain()
        // Set raining variable to false for further use
        raining = false
        break
    }
  }
})

chrome.storage.local.get(['state'], result => {
  // If no state set yet (first time user), set it to PAUSE
  if (!result['state']) chrome.storage.local.set({ 'state': 'pause' })
})

chrome.storage.local.get(['rainState'], result => {
  // If no rain state set yet (first time user), set it OfF.
  if (!result['rainState']) chrome.storage.local.set({ 'rainState': 'off' })
  // Otherwise, if it's on and music is playing, play the rain and set raining variable for further use.
  else if (result['rainState'] === 'on') {
    if (nowPlaying.length > 1 && nowPlaying !== 'Nothing!') playRain()
    raining = true
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Return nowPlaying for popup use
  if (request.getNowPlaying) chrome.runtime.sendMessage({ 'nowPlaying': nowPlaying })
})
