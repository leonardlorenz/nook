$(document).ready(() => {
    if (!~navigator.platform.toUpperCase().indexOf('MAC')) $('head').append('<style>html { border-left: 1.5px white solid; border-right: 1.5px white solid; } #header { left: 1.5px; width: 99%; }</style>')
    chrome.storage.local.get(['optionGame'], result => {
        if (result['optionGame']) {
            $('#gameSelect').find('option').filter((_, a) => {
                return $(a).attr('value') === result['optionGame']
            }).prop('selected', true).change()
        }
        $('#gameSelect').on('change', e => {
            chrome.runtime.sendMessage({ 'optionChange': ['game', $(e.target).val()] })
        })
    })
    chrome.storage.local.get(['optionKK'], result => {
        if (result['optionKK']) {
            $('#kkSlider').find('option').filter((_, a) => {
                return $(a).attr('value') === result['optionKK']
            }).prop('selected', true).change()
        }
        $('#kkSlider').on('change', e => {
            chrome.runtime.sendMessage({ 'optionChange': ['kkFrequency', $(e.target).val()] })
        })
    })
    chrome.storage.local.get(['optionVolume'], result => {
        if (result['optionVolume']) {
            $('#volume').val(+result['optionVolume'])
        } else $('#volume').val(1).change()
        $('#volume').on('change', e => {
            chrome.runtime.sendMessage({ 'optionChange': ['volume', $(e.target).val()] })
        })
    })
    chrome.storage.local.get(['optionRainVolume'], result => {
        if (result['optionRainVolume']) {
            $('#rain').val(+result['optionRainVolume'])
        } else $('#rain').val(0).change()
        $('#rain').on('change', e => {
            chrome.runtime.sendMessage({ 'optionChange': ['rainVolume', $(e.target).val()] })
        })
    })
    chrome.management.getSelf(res => {
        if (res.installType === 'development') {
            $('#ver').text(' (dev)')
        }
    })
})
