// Default game is New Leaf
let game = 'new-leaf'
let volume = 1.0
let rainVolume = 0

// Check if game has been configured and set it accordingly
chrome.storage.local.get(['optionGame'], result => {
  if (result['optionGame']) game = result['optionGame']
})

// Check if volume has been configured and set it accordingly
chrome.storage.local.get(['optionVolume'], result => {
  if (result['optionVolume']) volume = +result['optionVolume']
})

// Check if rain volume has been configured and set it accordingly
chrome.storage.local.get(['optionRainVolume'], result => {
  if (result['optionRainVolume']) rainVolume = +result['optionRainVolume']
})

// Check if KK has been configured and set it accordingly
chrome.storage.local.get(['optionKK'], result => {
  if (result['optionKK']) {
    KKSetting = result['optionKK']
  }
})

// Fires when game is chosen from options page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.optionChange) {
    switch (request.optionChange[0]) {
      case 'game':
        game = request.optionChange[1]
        chrome.storage.local.set({ 'optionGame': request.optionChange[1] })
        playing = kkSliderCheck()
        break
      case 'volume':
        if (sound) sound.fade(volume, request.optionChange[1], 100)
        volume = request.optionChange[1]
        chrome.storage.local.set({ 'optionVolume': volume })
        break
      case 'rainVolume':
        if (rainSound) rainSound.fade(rainVolume, request.optionChange[1], 100)
        rainVolume = request.optionChange[1]
        chrome.storage.local.set({ 'optionRainVolume': rainVolume })
        break
      case 'kkFrequency':
        KKSetting = request.optionChange[1]
        chrome.storage.local.set({ 'optionKK': request.optionChange[1] })
        playing = false
        break
    }
  }
})
