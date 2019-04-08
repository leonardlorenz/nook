$(document).ready(() => {
    // If not Mac, add borders for styling purposes
    if (!~navigator.platform.toUpperCase().indexOf('MAC')) $('head').append('<style>html { border-left: 1.5px white solid; border-right: 1.5px white solid; } #header { left: 1.5px; width: 99%; }</style>')
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
    chrome.management.getSelf(res => {
        if (res.installType === 'development') {
            $('#ver').text(' (dev)')
        }
    })
})
