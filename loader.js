(function () {
  function initAudioIframe() {
    // 1. Taşköprü Gazetesi / Newspaper teması başlık ve içerik alanlarını yakala
    var titleElement = document.querySelector("h1.tdb-title-text, .td-post-title h1, h1.entry-title, .news-title, h1");
    var contentElement = document.querySelector(".td-post-content, .tdb-block-inner.td-fix-index, .entry-content, .news-content, article");

    // Yalnızca haber detay sayfasındaysak ve iframe henüz eklenmediyse çalış
    if (titleElement && contentElement && !document.getElementById("news-audio-iframe")) {
      
      // Başlık ve metni URL parametresine uygun hale getir (Karakter bozulmalarını önlemek için)
      var titleText = encodeURIComponent(titleElement.innerText.trim());
      var bodyText = encodeURIComponent(contentElement.innerText.trim());

      // GitHub Pages üzerindeki reader.html adresiniz
      var iframeUrl = "https://yusufkocak01.github.io/seslioku/reader.html?title=" + titleText + "&text=" + bodyText;

      // Kapsayıcı kutu ve iframe oluşturma
      var container = document.createElement("div");
      container.id = "news-audio-iframe-container";
      container.style.cssText = "width: 100%; margin: 15px 0 20px 0; clear: both;";

      var iframe = document.createElement("iframe");
      iframe.id = "news-audio-iframe";
      iframe.src = iframeUrl;
      iframe.style.cssText = "width: 100%; height: 75px; border: none; overflow: hidden;";
      iframe.setAttribute("scrolling", "no");

      container.appendChild(iframe);

      // Iframe'i haber başlığının hemen altına yerleştir
      if (titleElement.parentNode) {
        titleElement.parentNode.insertBefore(container, titleElement.nextSibling);
      }
    }
  }

  // Sayfa yüklendiğinde ve dinamik içerik kontrolü için zamanlayıcı
  var checkCount = 0;
  var timer = setInterval(function () {
    checkCount++;
    initAudioIframe();
    if (document.getElementById("news-audio-iframe") || checkCount >= 25) {
      clearInterval(timer);
    }
  }, 200);
})();
