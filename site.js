/* Opens links to other websites in a new tab.
   Links inside this site, and mailto: links, are left alone. */
(function () {
  function mark(root) {
    var links = (root.querySelectorAll ? root.querySelectorAll("a[href]") : []);
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.target) continue;
      if (a.protocol !== "http:" && a.protocol !== "https:") continue;
      if (a.host === window.location.host) continue;
      a.target = "_blank";
      a.rel = a.rel ? a.rel + " noopener" : "noopener";
    }
  }

  function start() {
    mark(document);
    // The publications list is built after the page loads, so watch for it.
    if (window.MutationObserver) {
      new MutationObserver(function (records) {
        for (var i = 0; i < records.length; i++) {
          var added = records[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            if (added[j].nodeType === 1) mark(added[j]);
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
