// Map out badge colors (based on time)
const badgeColors = {
  '12am': '#000000',
  '1am': '#21211d',
  '2am': '#28281f',
  '3am': '#353526',
  '4am': '#42422a',
  '5am': '#474727',
  '6am': '#4f4f25',
  '7am': '#565620',
  '8am': '#68681f',
  '9am': '#7a7a1d',
  '10am': '#919114',
  '11am': '#a3a310',
  '12pm': '#adad05',
  '1pm': '#a3a310',
  '2pm': '#919114',
  '3pm': '#7a7a1d',
  '4pm': '#68681f',
  '5pm': '#565620',
  '6pm': '#4f4f25',
  '7pm': '#474727',
  '8pm': '#42422a',
  '9pm': '#353526',
  '10pm': '#28281f',
  '11pm': '#21211d'
}

// Create audio tag to play music
let sound

// Global hours variable
let globalHours

// Variables to keep track of music
let lastEventSentHour = ""
let playing = false

// Pauses audio and then plays the next song based on the hour given
function playSong (hour) {
  if (sound) {
    sound.fade(volume, 0, 500)
    sound.once('fade', () => {
      playSound(hour)
    })
  } else {
    chrome.storage.sync.get(['state'], result => {
      if (result['state'] && result['state'] !== 'pause') playSound(hour)
    })
  }
}

function pauseSound () {
  sound.fade(volume, 0, 500)
  sound.once('fade', () => {
    sound.pause()
    chrome.browserAction.setBadgeText({ 'text': '' })
  })
}

// Fades out and back in with new source
function playSound (hour) {
  sound = new Howl({
    src: [`https://s3.us-east-2.amazonaws.com/chrome-nook/${game}/${hour}.ogg`],
    loop: true,
    volume: 0
  })
  sound.play()
  sound.fade(0, volume, 500)
  playing = true
  chrome.browserAction.setBadgeBackgroundColor({ 'color': badgeColors[hour] })
  chrome.browserAction.setBadgeText({ 'text': '♫' })
}

// Ticks every second and checks the hour
function tick () {
  let dateHours = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ').join('').toLowerCase()
  globalHours = dateHours
  if (!playing || (new Date().getMinutes() == "00" && dateHours !== lastEventSentHour)) {
    lastEventSentHour = dateHours
    chrome.storage.sync.get(['state'], result => {
      if (result['state'] && result['state'] === 'pause') return
      playSong(dateHours)
    })
  }
}
setInterval(tick, 1000)