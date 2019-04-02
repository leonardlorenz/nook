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
  '12pm': '#adad05'
}

// Create audio tag to play music
let sound

// Variables to keep track of music
let lastEventSentHour = ""
let playing = false

// Pauses audio and then plays the next song based on the hour given
function playSong (hour) {
  if (sound) {
    sound.fade(1, 0, 500)
    sound.once('fade', () => {
      sound = new Howl({
        src: [`https://s3.us-east-2.amazonaws.com/chrome-nook/${game}/${hour}.ogg`],
        loop: true,
        volume: 0
      })
      sound.play()
      sound.fade(0, 1, 500)
      playing = true
    })
  } else {
    sound = new Howl({
      src: [`https://s3.us-east-2.amazonaws.com/chrome-nook/${game}/${hour}.ogg`],
      loop: true,
      volume: 0
    })
    sound.play()
    sound.fade(0, 1, 500)
    playing = true
  }
}

// Ticks every second and checks the hour
function tick () {
  let dateHours = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ').join('').toLowerCase()
  if (!playing || (new Date().getMinutes() == "00" && dateHours !== lastEventSentHour)) {
    lastEventSentHour = dateHours
    chrome.browserAction.setBadgeBackgroundColor({ 'color': badgeColors[dateHours] })
    chrome.browserAction.setBadgeText({ 'text': dateHours })
    playSong(dateHours)
  }
}
setInterval(tick, 1000)
