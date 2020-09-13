$(document).ready(function() {

    chrome.storage.local.get(['gain'], function(result) {
        if (result.gain !== 'undefined') {
            $('#gain').val(result.gain);
            $('label[for='+ $('#gain').attr('id') +']').text('Gain: ' + result.gain);
        }
    });

    $('#gain').change(function() {
        var gain = $(this).val();

        chrome.storage.local.set({gain: gain}, function() {});

        $('label[for='+ $(this).attr('id') +']').text('Gain: ' + gain);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {gain: gain}, function(response) { });
        });
    });

});
