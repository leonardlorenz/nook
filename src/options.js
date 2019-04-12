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
  if (result['optionKK'])  KKSetting = result['optionKK']
})

// Check if Grandfather Mode has been configured and set it accordingly
chrome.storage.local.get(['optionGM'], result => {
  if (result['optionGM']) {
    grandfatherMode = result['optionGM']
    if (grandfatherMode) playing = true
  } else chrome.storage.local.set({ 'optionGM': false })
})

// Check if KK songlist has been configured and set
chrome.storage.local.get(['optionKKSonglist'], result => {
  if (result['optionKKSonglist']) kkSongs = result['optionKKSonglist']
  else chrome.storage.local.set({ 'optionKKSonglist': kkDefaultSongs })
})

// Check if GM active hour list has been configured and set
chrome.storage.local.get(['optionGMHourlist'], result => {
  if (result['optionGMHourlist']) gmHours = result['optionGMHourlist']
  else chrome.storage.local.set({ 'optionGMHourlist': gmDefaultHours })
})

// Fires when option is changed
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.optionChange) {
    switch (request.optionChange[0]) {
      // Game dropdown
      case 'game':
        game = request.optionChange[1]
        chrome.storage.local.set({ 'optionGame': request.optionChange[1] })
        playing = kkSliderCheck()
        break
      // Normal volume slider
      case 'volume':
        if (sound) sound.fade(volume, request.optionChange[1], 100)
        volume = request.optionChange[1]
        chrome.storage.local.set({ 'optionVolume': volume })
        break
      // Rain volume slider
      case 'rainVolume':
        if (rainSound) rainSound.fade(rainVolume, request.optionChange[1], 100)
        rainVolume = request.optionChange[1]
        chrome.storage.local.set({ 'optionRainVolume': rainVolume })
        break
      // KK Frequency dropdown
      case 'kkFrequency':
        KKSetting = request.optionChange[1]
        chrome.storage.local.set({ 'optionKK': request.optionChange[1] })
        playing = false
        break
      // KK Songlist checkboxes
      case 'kkSonglist':
        kkSongs = request.optionChange[1]
        chrome.storage.local.set({ 'optionKKSonglist': request.optionChange[1] })
        playing = false
        break
      // Grandfather Mode hour list checkboxes
      case 'gmHourlist':
        gmHours = request.optionChange[1]
        chrome.storage.local.set({ 'optionGMHourlist': request.optionChange[1] })
        break
      case 'gm':
      // Grandfather Mode toggle checkbox
        grandfatherMode = request.optionChange[1]
        chrome.storage.local.set({ 'optionGM': request.optionChange[1] })
        playing = false
        break
    }
  }
})
