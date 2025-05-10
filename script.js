
let scanner;

function startScanner() {
  if (scanner) {
    scanner.clear().then(() => scanner = null);
    return;
  }
  scanner = new Html5Qrcode("reader");
  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText, decodedResult) => {
      document.getElementById("sku").value = decodedText;
      scanner.stop();
    },
    (errorMessage) => {
      // ignore error
    }
  );
}

function analyze() {
  const sku = document.getElementById('sku').value;
  const price = parseInt(document.getElementById('price').value);
  if (!sku || isNaN(price)) {
    document.getElementById('result').innerText = 'SKU와 국내가를 입력해주세요.';
    return;
  }

  const ebaySales = 38;
  const ebayAvg = 135000;
  const stockxSales = 14;
  const stockxAvg = 129000;

  const fee = ebayAvg * 0.12;
  const shipping = 18000;
  const netProfit = ebayAvg - fee - shipping - price;

  let status = '✔ 추천';
  if (netProfit < 10000) status = '⚠ 테스트';
  if (netProfit < 0) status = '❌ 제외';

  const ebayName = "New Balance MS327CI Grey";
  const stockxName = "MS327CI Grey White";

  document.getElementById('result').innerHTML =
    `<p><strong>제품명 확인:</strong></p>
     <p>[eBay] ${ebayName} (${ebaySales}건 판매)</p>
     <p>[StockX] ${stockxName} (${stockxSales}건 거래)</p>
     <hr>
     <p><strong>eBay 평균가: ₩${ebayAvg}</strong></p>
     <p>수수료(12%): ₩${Math.round(fee)}</p>
     <p>배송비: ₩${shipping}</p>
     <p>입력 국내가: ₩${price}</p>
     <hr>
     <p><strong>예상 순이익: ₩${netProfit}</strong></p>
     <p><strong>추천 결과: ${status}</strong></p>`;
}
