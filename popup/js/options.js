$(document).ready(() => {
    // KK Default Songlist
    const kkSongs = ["K.K. Casbah","K.K. Chorale Aircheck","K.K. Chorale","K.K. Condor Aircheck","K.K. Condor","K.K. Country Aircheck","K.K. Country","K.K. Cruisin' Aircheck","K.K. Cruisin'","K.K. D & B Aircheck","K.K. D & B","K.K. Dirge Aircheck","K.K. Dirge","K.K. Dixie Aircheck","K.K. Dixie","K.K. Etude Aircheck","K.K. Etude","K.K. Faire Aircheck","K.K. Faire","K.K. Folk Aircheck","K.K. Folk","K.K. Fusion Aircheck","K.K. Fusion","K.K. Gumbo Aircheck","K.K. Gumbo","K.K. Jazz Aircheck","K.K. Jazz","K.K. Lament Aircheck","K.K. Lament","K.K. Love Song Aircheck","K.K. Love Song","K.K. Lullaby Aircheck","K.K. Lullaby","K.K. Mambo Aircheck","K.K. Mambo","K.K. Marathon ~ Aircheck","K.K. Marathon","K.K. March Aircheck","K.K. March","K.K. Metal Aircheck","K.K. Metal","K.K. Parade Aircheck","K.K. Parade","K.K. Ragtime Aircheck","K.K. Ragtime","K.K. Rally Aircheck","K.K. Rally","K.K. Reggae Aircheck","K.K. Reggae","K.K. Rock Aircheck","K.K. Rock","K.K. Rockabilly Aircheck","K.K. Rockabilly","K.K. Safari Aircheck","K.K. Safari","K.K. Salsa Aircheck","K.K. Salsa","K.K. Samba Aircheck","K.K. Samba","K.K. Ska Aircheck","K.K. Ska","K.K. Song Aircheck","K.K. Song","K.K. Soul Aircheck","K.K. Soul","K.K. Steppe Aircheck","K.K. Steppe","K.K. Swing Aircheck","K.K. Swing","K.K. Tango Aircheck","K.K. Tango","K.K. Technopop Aircheck","K.K. Technopop","K.K. Waltz Aircheck","K.K. Waltz","K.K. Western Aircheck","K.K. Western","King K.K. Aircheck","King K.K.","Lucky K.K. Aircheck","Lucky K.K.","Marine Song 2001 Aircheck","Marine Song 2001","Mountain Song ~ Aircheck","Mountain Song","Mr. K.K. Aircheck","Mr. K.K.","My Place Aircheck","My Place","Neapolitan Aircheck","Neapolitan","Only Me Aircheck","Only Me","Pondering Aircheck","Pondering","Rockin' K.K. Aircheck","Rockin' K.K.","Senor K.K. Aircheck","Senor K.K.","Sorry, That Just Isn't My Bag 1","Sorry, That Just Isn't My Bag 2","Sorry, That Just Isn't My Bag 3","Soulful K.K. Aircheck","Soulful K.K.","Steep Hill Aircheck","Steep Hill","Surfin' K.K. Aircheck","Surfin' K.K.","The K. Funk Aircheck","The K. Funk","To the Edge Aircheck","To the Edge","Two Days Ago Aircheck","Two Days Ago","Agent K.K. Aircheck","Agent K.K.","Aloha K.K. Aircheck","Aloha K.K.","Cafe K.K. Aircheck","Cafe K.K.","Comrade K.K. Aircheck","Comrade K.K.","DJ K.K. Aircheck","DJ K.K.","Forest Life Aircheck","Forest Life","Go K.K. Rider! Aircheck","Go K.K. Rider!","I Love You Aircheck","I Love You","Imperial K.K. Aircheck","Imperial K.K.","Just Pulling Your Leg 1","Just Pulling Your Leg 2","Just Pulling Your Leg 3","K.K. Aria Aircheck","K.K. Aria","K.K. Ballad Aircheck","K.K. Ballad","K.K. Blues Aircheck","K.K. Blues","K.K. Bossa Aircheck","K.K. Bossa","K.K. Calypso Aircheck","K.K. Calypso","K.K. Casbah Aircheck"]

    // Get game, change the game select box (or dont), and add a change event listener
    function doOptionSetup (type, settingName, element, optionToSet, defaultVal) {
        switch (type) {
            case 'select':
              chrome.storage.local.get([settingName], result => {
                if (result[settingName]) $(element).find('option').filter((_, a) => { return $(a).attr('value') === result[settingName] }).prop('selected', true).change()
                $(element).on('change', e => { chrome.runtime.sendMessage({ 'optionChange': [optionToSet, $(e.target).val()] }) })
              })
              break
            case 'range':
              chrome.storage.local.get([settingName], result => {
                if (result[settingName]) $(element).val(+result[settingName])
                else $(element).val(defaultVal).change()
                $(element).on('change', e => { chrome.runtime.sendMessage({ 'optionChange': [optionToSet, $(e.target).val()] }) })
              })
              break
        }
    }
    
    doOptionSetup('select', 'optionGame', '#gameSelect', 'game')
    doOptionSetup('select', 'optionKK', '#kkSlider', 'kkFrequency')
    doOptionSetup('range', 'optionVolume', '#volume', 'volume', 1)
    doOptionSetup('range', 'optionRainVolume', '#rain', 'rainVolume', 0)

    $('#kkSliderSonglistToggle').on('click', e => {
        $('.kkSliderSonglistPage').addClass('active')
        $('.main').addClass('hidden')
    }).on('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault()
            this.click()
        }
    })

    $('#backFromKK').on('click', e => {
        $('.kkSliderSonglistPage').removeClass('active')
        $('.main').removeClass('hidden')
    }).on('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault()
            this.click()
        }
    })

    $('#checkAllKK').on('click', e => {
        $('label.kkCheckbox input').prop('checked', true).change()
    })
    $('#uncheckAllKK').on('click', e => {
        $('label.kkCheckbox input').prop('checked', false).change()
    })
    $('#saveAllKK').on('click', e => {
        var newArray = []
        $('label.kkCheckbox input').filter(function () {
            return $(this).prop('checked')
        }).each(function (e, a) {
            newArray.push($(a).parent().find('span').text())
        })
        chrome.runtime.sendMessage({ 'optionChange': ['kkSonglist', newArray] })
        $(e.target).text('Saved!')
        setTimeout(function () {
            $(e.target).text('Save')
        }, 1250)
    })

    let kkPage = $('.kkSliderSonglistPage .content')
    kkSongs.forEach(i => {
      let num = kkSongs.indexOf(i)
      let even = num %2 == 0
      let html = `${num !== 0 && even ? '<br>' : ''}<label class="kkCheckbox${!even ? ' right' : ''}${num + 1 === kkSongs.length ? ' last' : ''}" for="kkCheckbox${num}" title="${i}"><input type="checkbox" id="kkCheckbox${num}"><span>${i}</span></label>`
      kkPage.append(html)
    })

    chrome.storage.local.get(['optionKKSonglist'], result => {
      result['optionKKSonglist'].forEach(function (i) {
        $('label.kkCheckbox').filter(function () {
            return $(this).text() === i
        }).find('input').prop('checked', true).change()
      })
    })

    chrome.management.getSelf(res => {
        if (res.installType === 'development') {
            $('#ver').text(' (dev)')
        }
    })
})
