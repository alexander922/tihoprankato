// ================================
// VIBRAZIONE
// ================================

function vibraTelefono() {
    if ("vibrate" in navigator) {
        navigator.vibrate([
            200,
            50,
            200,
            50,
            300
        ]);
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
