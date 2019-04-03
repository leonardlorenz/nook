// Default game is New Leaf
let game = 'new-leaf'
let volume = 1.0

// Check if game has been configured and set it accordingly
chrome.storage.sync.get(['optionGame'], result => {
  if (result['optionGame']) game = result['optionGame']
})

// Check if volume has been configured and set it accordingly
chrome.storage.sync.get(['optionVolume'], result => {
  if (result['optionVolume']) volume = +result['optionVolume']
})

// Fires when game is chosen from options page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.optionChange) {
    switch (request.optionChange[0]) {
      case 'game':
        game = request.optionChange[1]
        chrome.storage.sync.set({ 'optionGame': request.optionChange[1] })
        playing = false
        break
      case 'volume':
        if (sound) sound.fade(volume, request.optionChange[1], 100)
        volume = request.optionChange[1]
        chrome.storage.sync.set({ 'optionVolume': volume })
        break
    }
  }
})
