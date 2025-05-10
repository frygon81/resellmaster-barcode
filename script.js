
function handleBarcode(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    // Barcode image recognition not implemented here (simulate for demo)
    const simulatedBarcode = "MS327CI";
    document.getElementById("sku").value = simulatedBarcode;
  };
  reader.readAsDataURL(file);
}

function analyze() {
  const sku = document.getElementById('sku').value;
  const price = parseInt(document.getElementById('price').value);
  if (!sku || isNaN(price)) {
    document.getElementById('result').innerText = 'SKU와 국내가를 입력해주세요.';
    return;
  }

  const ebayAvg = 135000;
  const stockxAvg = 129000;
  const fee = ebayAvg * 0.12;
  const shipping = 18000;
  const netProfit = ebayAvg - fee - shipping - price;

  let status = '✔ 추천';
  if (netProfit < 10000) status = '⚠ 테스트';
  if (netProfit < 0) status = '❌ 제외';

  document.getElementById('result').innerHTML =
    `<p><strong>[eBay 기준]</strong></p>
     <p>30일 판매가 평균: ₩${ebayAvg}</p>
     <p>예상 수수료(12%): ₩${Math.round(fee)}</p>
     <p>예상 배송비: ₩${shipping}</p>
     <hr>
     <p><strong>[StockX 참고]</strong></p>
     <p>평균가: ₩${stockxAvg}</p>
     <hr>
     <p><strong>입력 국내가: ₩${price}</strong></p>
     <p><strong>예상 순이익: ₩${netProfit}</strong></p>
     <p><strong>리셀 추천 결과: ${status}</strong></p>`;
}
