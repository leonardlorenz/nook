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

// KK Song Array
const kkSongs = ["K.K. Casbah","K.K. Chorale Aircheck","K.K. Chorale","K.K. Condor Aircheck","K.K. Condor","K.K. Country Aircheck","K.K. Country","K.K. Cruisin' Aircheck","K.K. Cruisin'","K.K. D & B Aircheck","K.K. D & B","K.K. Dirge Aircheck","K.K. Dirge","K.K. Dixie Aircheck","K.K. Dixie","K.K. Etude Aircheck","K.K. Etude","K.K. Faire Aircheck","K.K. Faire","K.K. Folk Aircheck","K.K. Folk","K.K. Fusion Aircheck","K.K. Fusion","K.K. Gumbo Aircheck","K.K. Gumbo","K.K. Jazz Aircheck","K.K. Jazz","K.K. Lament Aircheck","K.K. Lament","K.K. Love Song Aircheck","K.K. Love Song","K.K. Lullaby Aircheck","K.K. Lullaby","K.K. Mambo Aircheck","K.K. Mambo","K.K. Marathon ~ Aircheck","K.K. Marathon","K.K. March Aircheck","K.K. March","K.K. Metal Aircheck","K.K. Metal","K.K. Parade Aircheck","K.K. Parade","K.K. Ragtime Aircheck","K.K. Ragtime","K.K. Rally Aircheck","K.K. Rally","K.K. Reggae Aircheck","K.K. Reggae","K.K. Rock Aircheck","K.K. Rock","K.K. Rockabilly Aircheck","K.K. Rockabilly","K.K. Safari Aircheck","K.K. Safari","K.K. Salsa Aircheck","K.K. Salsa","K.K. Samba Aircheck","K.K. Samba","K.K. Ska Aircheck","K.K. Ska","K.K. Song Aircheck","K.K. Song","K.K. Soul Aircheck","K.K. Soul","K.K. Steppe Aircheck","K.K. Steppe","K.K. Swing Aircheck","K.K. Swing","K.K. Tango Aircheck","K.K. Tango","K.K. Technopop Aircheck","K.K. Technopop","K.K. Waltz Aircheck","K.K. Waltz","K.K. Western Aircheck","K.K. Western","King K.K. Aircheck","King K.K.","Lucky K.K. Aircheck","Lucky K.K.","Marine Song 2001 Aircheck","Marine Song 2001","Mountain Song ~ Aircheck","Mountain Song","Mr. K.K. Aircheck","Mr. K.K.","My Place Aircheck","My Place","Neapolitan Aircheck","Neapolitan","Only Me Aircheck","Only Me","Pondering Aircheck","Pondering","Rockin' K.K. Aircheck","Rockin' K.K.","Señor K.K. Aircheck","Señor K.K.","Sorry, That Just Isn't My Bag 1","Sorry, That Just Isn't My Bag 2","Sorry, That Just Isn't My Bag 3","Soulful K.K. Aircheck","Soulful K.K.","Steep Hill Aircheck","Steep Hill","Surfin' K.K. Aircheck","Surfin' K.K.","The K. Funk Aircheck","The K. Funk","To the Edge Aircheck","To the Edge","Two Days Ago Aircheck","Two Days Ago","Agent K.K. Aircheck","Agent K.K.","Aloha K.K. Aircheck","Aloha K.K.","Café K.K. Aircheck","Cafè K.K.","Comrade K.K. Aircheck","Comrade K.K.","DJ K.K. Aircheck","DJ K.K.","Forest Life Aircheck","Forest Life","Go K.K. Rider! Aircheck","Go K.K. Rider!","I Love You Aircheck","I Love You","Imperial K.K. Aircheck","Imperial K.K.","Just Pulling Your Leg 1","Just Pulling Your Leg 2","Just Pulling Your Leg 3","K.K. Aria Aircheck","K.K. Aria","K.K. Ballad Aircheck","K.K. Ballad","K.K. Blues Aircheck","K.K. Blues","K.K. Bossa Aircheck","K.K. Bossa","K.K. Calypso Aircheck","K.K. Calypso","K.K. Casbah Aircheck"]

// Create audio tag to play music
let sound
let rainSound

// Global hours variable
let globalHours
let globalDateDay

// Global Now Playing
let nowPlaying = ''
let raining = false

// Variables to keep track of music
let lastEventSentHour = ''
let playing = false
let KKSetting = ''
let kkPlaying = null

function kkSliderCheck () {
  if (KKSetting.length < 1 || KKSetting === 'never') return false
  else if (KKSetting === 'afterEight') {
    if (~['8pm', '9pm', '10pm', '11pm'].indexOf(globalHours) && globalDateDay == 6) {
      return true
    } else return false
  } else {
    return true
  }
}

function playRandomKK (check = false) {
  playSong(`${kkSongs[~~(Math.random() * 146) + 1]}.mp3`, globalHours, true)
}

function playRain () {
  if (rainSound) rainSound.unload()
  rainSound = new Howl({
    src: [`https://s3.us-east-2.amazonaws.com/chrome-nook/rain/rain.ogg`],
    loop: true,
    volume: 0
  })
  rainSound.play()
  rainSound.fade(0, rainVolume, 500)
}

function pauseRain () {
  if (rainSound) {
    rainSound.fade(rainVolume, 0, 500)
    rainSound.once('fade', () => {
      rainSound.pause()
    })
  }
}

// Pauses audio and then plays the next song based on the hour given
function playSong (name, hour = null, kk = null) {
  if (sound) {
    sound.fade(volume, 0, 500)
    sound.once('fade', () => {
      playSound(name, hour, kk)
    })
  } else {
    chrome.storage.local.get(['state'], result => {
      if (result['state'] && result['state'] !== 'pause') {
        playSound(name, hour, kk)
      }
    })
  }
}

function pauseSound () {
  pauseRain()
  sound.fade(volume, 0, 500)
  sound.once('fade', () => {
    sound.pause()
    chrome.browserAction.setBadgeText({ 'text': '' })
    chrome.runtime.sendMessage({ 'nowPlaying': 'Nothing!' })
    nowPlaying = 'Nothing!'
  })
}

// Fades out and back in with new source
function playSound (name, hour, kk) {
  if (sound) sound.unload()
  if (raining) playRain()
  let thisGame = game
  if (kk) thisGame = 'kk-slider'
  sound = new Howl({
    src: [`https://s3.us-east-2.amazonaws.com/chrome-nook/${thisGame}/${name}.ogg`],
    loop: true,
    volume: 0,
    onend: () => {
      if (kk) playRandomKK()
    }
  })
  name = name.replace('.mp3', '')
  sound.play()
  sound.fade(0, volume, 500)
  playing = true
  chrome.runtime.sendMessage({ 'nowPlaying': name })
  nowPlaying = name
  chrome.browserAction.setBadgeBackgroundColor({ 'color': badgeColors[hour || name] })
  chrome.browserAction.setBadgeText({ 'text': '♫' })
}

// Ticks every second and checks the hour
function tick () {
  let dateHours = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ').join('').toLowerCase()
  let dateDay = new Date().getDay()
  globalDateDay = dateDay
  globalHours = dateHours
  if (!playing || (new Date().getMinutes() == "00" && dateHours !== lastEventSentHour)) {
    lastEventSentHour = dateHours
    chrome.storage.local.get(['state'], result => {
      if (result['state'] && result['state'] === 'pause') return
      if (kkSliderCheck()) playRandomKK()
      else {
        playSong(globalHours)
      }
    })
  }
}
setInterval(tick, 1000)