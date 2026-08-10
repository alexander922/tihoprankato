// ================================
// VIBRAZIONE MULTI-DISPOSITIVO
// ================================

function vibraTelefono() {
    // Pattern di vibrazione standard
    const pattern = [200, 50, 200, 50, 300];
    
    // 1. Vibration API (Android, Windows Phone, Samsung, Honor)
    if ("vibrate" in navigator) {
        navigator.vibrate(pattern);
    }
    // 2. Webkit (iOS 13+, fallback)
    else if ("webkitVibrate" in navigator) {
        navigator.webkitVibrate(pattern);
    }
    // 3. Motorola/Specials (legacy)
    else if ("mozVibrate" in navigator) {
        navigator.mozVibrate(pattern);
    }
    // 4. Audio-based vibration per iOS (come fallback)
    else if (isIOS()) {
        vibrationFallbackiOS();
    }
}

function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function vibrationFallbackiOS() {
    // Genera un feedback audio minimale (non è vibrazione vera, ma un'alternativa)
    if ("AudioContext" in window || "webkitAudioContext" in window) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        oscillator.frequency.value = 100;
        gain.gain.setValueAtTime(0, audioContext.currentTime);
        
        // Pattern di feedback
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.setValueAtTime(0, audioContext.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, audioContext.currentTime + 0.25);
        gain.gain.setValueAtTime(0, audioContext.currentTime + 0.45);
        gain.gain.setValueAtTime(0.3, audioContext.currentTime + 0.5);
        gain.gain.setValueAtTime(0, audioContext.currentTime + 0.8);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.8);
    }
}

// ================================
// AVVIO AUTOMATICO
// ================================

function avviaPrank() {
    vibraTelefono();

    // Continua a vibrare
    setInterval(() => {
        vibraTelefono();
    }, 800);
}

// ================================
// AVVIO
// ================================

avviaPrank();
