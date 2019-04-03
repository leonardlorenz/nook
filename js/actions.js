// Fires when state is changed (play/pause)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.stateChange) {
    switch (request.stateChange) {
      case 'pause':
        chrome.storage.sync.set({ 'state': 'pause' })
        pauseSound()
        break
      case 'play':
        chrome.storage.sync.set({ 'state': 'play' })
        playSound(globalHours)
        break
    }
  }
})