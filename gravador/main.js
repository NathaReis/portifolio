let stream = null,
    audio = null,
    mixedStream = null,
    chunks = [],
    recorder = null,
    startButton = null,
    stopButton = null,
    downloadButton = null,
    recordedVideo = null;

async function setupStream() {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: true
        });

        audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44100
            }
        });

        setupVideoFeedback();
    } catch (err) {
        console.log(err);
    }
}

function setupVideoFeedback() {
    if(stream) {
        const video = document.querySelector(".video-feedback");
        video.srcObject = stream;
        video.play();
        video.controls = true;
    }
    else {
        console.warn('No stream available');
    }
}

async function startRecording() {
    await setupStream();

    if(stream && audio) {
    // if(stream) { // Se só imagem
        mixedStream = new MediaStream([...stream.getTracks(),...audio.getTracks()]);
        recorder = new MediaRecorder(mixedStream);
        // recorder = new MediaRecorder(stream); // Se só imagem
		recorder.ondataavailable = handleDataAvailable;
        recorder.onstop = handleStop;
        recorder.start(200);

        startButton.disabled = true;
        stopButton.disabled = false;
        const rc = document.querySelector('.recorded-video-wrap');
        rc.classList.add('hidden');

        console.log('Recording has started...');
    }
    else {
        console.warn('No stream available');
    }
}

function handleDataAvailable(e) {
    chunks.push(e.data);
}

function stopRecording() {
    recorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
    console.log('Recording has stopped...');
}

function handleStop() {
    // SE QUISER BAIXAR
    const blob = new Blob(chunks, {
        type: 'video/mp4'
    }) 
    chunks = [];

    // location.reload();// Se não precisar gravar áudio nem baixar o vídeo

    // SE QUISER BAIXAR
    downloadButton.href = URL.createObjectURL(blob);
    downloadButton.download = 'video.mp4';
    downloadButton.disabled = false;

    recordedVideo.src = URL.createObjectURL(blob);
    recordedVideo.load();
    recordedVideo.onloadeddata = () => {
        recordedVideo.play();

        const rc = document.querySelector('.recorded-video-wrap');
        rc.classList.remove('hidden');
        rc.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    stream.getTracks().forEach(track => track.stop());
    audio.getTracks().forEach(track => track.stop());

    console.log('Recording has been prepared...');
}

window.addEventListener("load", () => {
    startButton = document.querySelector(".start-recording");
    stopButton = document.querySelector(".stop-recording");
    downloadButton = document.querySelector(".download-video");
    recordedVideo = document.querySelector(".recorded-video");

    startButton.addEventListener("click", startRecording);
    stopButton.addEventListener("click", stopRecording);
})