
function startScanner() {
  const scanner = new Html5Qrcode("reader");
  scanner.start(
    { facingMode: { exact: "environment" } },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      document.getElementById("sku").value = decodedText;
      scanner.stop();
      document.getElementById("reader").innerHTML = "";
    },
    (errorMessage) => {
      console.warn("인식 실패:", errorMessage);
    }
  ).catch(err => {
    console.error("카메라 실행 오류:", err);
    alert("카메라 접근에 실패했습니다. 브라우저 권한을 확인해주세요.");
  });
}

function analyze() {
  const sku = document.getElementById("sku").value.trim();
  const krPrice = parseInt(document.getElementById("krPrice").value);
  if (!sku || isNaN(krPrice)) {
    document.getElementById("result").innerText = "SKU와 국내가를 입력해주세요.";
    return;
  }

  const intlPrice = 135000;
  const fee = Math.round(intlPrice * 0.12);
  const shipping = 18000;
  const netProfit = intlPrice - fee - shipping - krPrice;

  let recommendation = "✔ 추천";
  if (netProfit < 10000) recommendation = "⚠ 테스트";
  if (netProfit < 0) recommendation = "❌ 제외";

  document.getElementById("result").innerHTML =
    `<b>eBay 시세:</b> ₩${intlPrice}<br>
     <b>수수료:</b> ₩${fee}<br>
     <b>배송비:</b> ₩${shipping}<br>
     <b>국내가:</b> ₩${krPrice}<br>
     <b>예상 순이익:</b> ₩${netProfit}<br>
     <b>판단:</b> ${recommendation}`;
}
