
function startScanner() {
  const scanner = new Html5Qrcode("reader");

  scanner.start(
    { facingMode: { exact: "environment" } }, // 후면 카메라 강제 지정
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      document.getElementById("sku").value = decodedText;
      scanner.stop();
    },
    (errorMessage) => {
      // 스캔 실패 무시
    }
  ).catch(err => {
    console.error("카메라 시작 오류:", err);
    alert("카메라를 열 수 없습니다. 브라우저 권한을 확인해주세요.");
  });
}
