
function startScanner() {
  const scanner = new Html5Qrcode("reader");

  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      const cameraId = devices[0].id;

      scanner.start(
        cameraId,
        {
          fps: 10,
          qrbox: 250
        },
        (decodedText) => {
          document.getElementById("sku").value = decodedText;
          scanner.stop();
        },
        (errorMessage) => {
          // Optional error handling
          console.warn(`QR scan error: ${errorMessage}`);
        }
      ).catch(err => {
        console.error("Error starting scanner:", err);
      });
    } else {
      alert("No cameras found on this device.");
    }
  }).catch(err => {
    console.error("Camera initialization error:", err);
  });
}
