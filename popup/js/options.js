$(document).ready(() => {
    if (!~navigator.platform.toUpperCase().indexOf('MAC')) $('head').append('<style>html { border-left: 1.5px white solid; border-right: 1.5px white solid; } #header { left: 1.5px; width: 99%; }</style>')
    chrome.storage.sync.get(['optionGame'], result => {
        if (result['optionGame']) {
            $('#gameSelect').find('option').filter((_, a) => {
                return $(a).attr('value') === result['optionGame']
            }).prop('selected', true).change()
        }
        $('#gameSelect').on('change', e => {
            chrome.runtime.sendMessage({ 'optionChange': ['game', $(e.target).val()] })
        })
    })
    chrome.storage.sync.get(['optionKK'], result => {
        if (result['optionKK']) {
            $('#kkSlider').find('option').filter((_, a) => {
                return $(a).attr('value') === result['optionKK']
            }).prop('selected', true).change()
        }
        $('#kkSlider').on('change', e => {
            chrome.runtime.sendMessage({ 'optionChange': ['kkFrequency', $(e.target).val()] })
        })
    })
    chrome.storage.sync.get(['optionVolume'], result => {
        if (result['optionVolume']) {
            $('#volume').val(+result['optionVolume'])
        } else $('#volume').val(1).change()
        $('#volume').on('input', e => {
            chrome.runtime.sendMessage({ 'optionChange': ['volume', $(e.target).val()] })
        })
    })
})
