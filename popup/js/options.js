$(document).ready(() => {
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
    chrome.storage.sync.get(['optionVolume'], result => {
        if (result['optionVolume']) {
            $('#volume').val(+result['optionVolume'])
        }
        $('#volume').on('input', e => {
            chrome.runtime.sendMessage({ 'optionChange': ['volume', $(e.target).val()] })
        })
    })
})
