// Default game is New Leaf
let game = 'new-leaf'

// Check if game has been configured and set it accordingly
chrome.storage.sync.get(['optionGame'], result => {
  if (result['optionGame']) game = result['optionGame']
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
    }
  }
})