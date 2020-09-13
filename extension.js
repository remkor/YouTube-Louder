$(document).ready(function() {

    var gainNode;

    chrome.storage.local.get(['gain'], function(result) {
        if (result.gain !== 'undefined') {
            gainNode = initiateAudioGain(result.gain);
        }
        else {
            gainNode = initiateAudioGain(50);
        }
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            gainNode.gain.value = request.gain;
            return true;
        }
    );

    function initiateAudioGain(gain) {
        let videoElement = document.querySelector('video');

        let audioCtx = new AudioContext();
        let gainNode = audioCtx.createGain();
        let source = audioCtx.createMediaElementSource(videoElement);

        gainNode.gain.value = gain;

        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        return gainNode;
    }

});
