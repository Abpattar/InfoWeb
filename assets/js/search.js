(function () {
  var PAGES = [
    { title: "Designing for Clarity", url: "article.html", category: "Design", summary: "Practical principles for designing clear, readable digital interfaces." },
    { title: "Color and Contrast Basics", url: "article2.html", category: "Design", summary: "Choosing accessible color palettes and readable contrast ratios." },
    { title: "Layouts that Scale", url: "article3.html", category: "Design", summary: "Building flexible, responsive page layouts across screen sizes." },
    { title: "Why Accessible Content Matters", url: "iarticle.html", category: "Accessibility", summary: "Inclusive typography, structure, and semantic HTML for everyone." },
    { title: "Content Strategy 101", url: "iarticle2.html", category: "Writing", summary: "Planning, structuring, and maintaining helpful web content." },
    { title: "Writing for the Web", url: "writing.html", category: "Writing", summary: "Structuring scannable, reader-friendly web articles." },
    { title: "Research for Better Writing", url: "research.html", category: "Research", summary: "Gathering reliable sources and structuring research-backed articles." },
    { title: "The Surprising Science of Everyday Objects", url: "interesting-1.html", category: "Interesting", summary: "Hidden physics and engineering behind everyday objects." },
    { title: "Why Cities Sound the Way They Do", url: "interesting-2.html", category: "Interesting", summary: "Urban soundscapes, architecture, and acoustic design." },
    { title: "Microadventures: Exploring Near Home", url: "interesting-3.html", category: "Interesting", summary: "Short outdoor adventures close to where you live." },
    { title: "Book Store & Resources", url: "store.html", category: "Store", summary: "Curated web novels and books available in the InfoWeb Store." },
    { title: "FAQ", url: "faq.html", category: "Help", summary: "Frequently asked questions about InfoWeb." },
    { title: "About InfoWeb", url: "about.html", category: "Info", summary: "About the InfoWeb platform and team." }
  ];

  function bindHeaderSearch() {
    var boxes = document.querySelectorAll(".search-box");
    boxes.forEach(function (box) {
      var input = box.querySelector(".search-input");
      var btn = box.querySelector(".search-btn");
      if (!input || !btn) return;
      function go() {
        var q = input.value.trim();
        window.location.href = q ? "search.html?q=" + encodeURIComponent(q) : "search.html";
      }
      btn.addEventListener("click", go);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          go();
        }
      });
    });
  }

  function renderResults(query) {
    var list = document.getElementById("search-results");
    var countEl = document.getElementById("search-count");
    if (!list) return;
    var q = (query || "").trim().toLowerCase();
    var matches = PAGES.filter(function (p) {
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      );
    });
    list.innerHTML = "";
    if (countEl) {
      countEl.textContent = q
        ? "Showing " + matches.length + " result(s) for \"" + query.trim() + "\""
        : "Showing all " + matches.length + " indexed pages";
    }
    if (matches.length === 0) {
      var empty = document.createElement("li");
      empty.className = "muted";
      empty.textContent = "No matching articles or pages found. Try another keyword.";
      list.appendChild(empty);
      return;
    }
    matches.forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title;
      var meta = document.createElement("span");
      meta.className = "muted";
      meta.textContent = " — " + item.category + ": " + item.summary;
      li.appendChild(a);
      li.appendChild(meta);
      list.appendChild(li);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindHeaderSearch();
    var pageInput = document.getElementById("page-search-input");
    var pageBtn = document.getElementById("page-search-btn");
    if (pageInput) {
      var params = new URLSearchParams(window.location.search);
      var initial = params.get("q") || "";
      pageInput.value = initial;
      renderResults(initial);
      pageInput.addEventListener("input", function () {
        renderResults(pageInput.value);
      });
      if (pageBtn) {
        pageBtn.addEventListener("click", function (e) {
          e.preventDefault();
          renderResults(pageInput.value);
        });
      }
    }
  });
})();
