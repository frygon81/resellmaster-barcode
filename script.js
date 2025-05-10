
const skuPrices = {
    "MS327CI": 135000,
    "FD1234": 158000,
    "DV7890": 146000
};

function predict() {
    const sku = document.getElementById("sku").value.trim().toUpperCase();
    const krPrice = parseInt(document.getElementById("krPrice").value);
    const intlPrice = skuPrices[sku] || 0;

    if (!sku || !krPrice || intlPrice === 0) {
        document.getElementById("result").innerHTML = "SKU나 가격을 확인해주세요.";
        return;
    }

    const fee = Math.round(intlPrice * 0.12);
    const shipping = 18000;
    const netProfit = intlPrice - fee - shipping - krPrice;

    let verdict = "⚠ 테스트";
    if (netProfit > 10000) verdict = "✔ 추천";
    else if (netProfit < 5000) verdict = "❌ 제외";

    document.getElementById("result").innerHTML =
        `<b>예상 해외가:</b> ₩${intlPrice}<br>
         <b>수수료:</b> ₩${fee}<br>
         <b>배송비:</b> ₩${shipping}<br>
         <b>예상 순이익:</b> ₩${netProfit}<br>
         <b>판단:</b> ${verdict}`;
}

function startScan() {
    const scanner = new Html5Qrcode("reader");
    scanner.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        (decodedText) => {
            document.getElementById("sku").value = decodedText;
            scanner.stop();
            document.getElementById("reader").innerHTML = "";
        },
        (errorMessage) => {
            console.warn(errorMessage);
        }
    ).catch(err => {
        console.error(err);
    });
}
