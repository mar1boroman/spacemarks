// ---------- Canvas / favicon helpers ----------

function makeEmojiPngDataUrl(emoji) {
  var size = 64;
  var canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);

  ctx.font = "48px system-ui, emoji";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, size / 2, size / 2 + 2);

  return canvas.toDataURL("image/png");
}

function setFaviconFromEmoji(emoji) {
  var dataUrl = makeEmojiPngDataUrl(emoji);
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = dataUrl;
}


// ---------- Utility ----------

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (ch) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[ch];
  });
}

var spacerTable = null;

// ---------- Theme toggle ----------

function applyTheme(mode) {
  document.body.setAttribute("data-theme", mode);
  var btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = mode === "light" ? "🌙" : "☀️";

  if (typeof window.applyTableTheme === "function") {
    window.applyTableTheme(); // currently no-op, but hook is here
  }
}

function initThemeToggle() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", function () {
    var current = document.body.getAttribute("data-theme") || "light";
    var next = current === "light" ? "dark" : "light";
    applyTheme(next);
  });
}

// ---------- Generator view - What it looks like on the page ----------

function runGeneratorView() {
  document.title = "";

  var baseHref = window.location.origin
    ? window.location.origin + window.location.pathname
    : window.location.pathname;

  var tableData = (Array.isArray(SPACERS) ? SPACERS : []).map(function (s) {
    return {
      id: s.id,
      emoji: s.emoji,
      title: s.title,
      description: s.description,
      url: baseHref + "?spacer=" + encodeURIComponent(s.id),
    };
  });

  if (tableData.length > 0) {
    setFaviconFromEmoji(tableData[0].emoji);
  }

  // start with body theme applied
  applyTheme(document.body.getAttribute("data-theme") || "light");

  spacerTable = new Tabulator("#spacers-table", {
    data: tableData,
    layout: "fitColumns",
    pagination: true,
    paginationMode: "local",
    paginationSize: 10,
    paginationSizeSelector: [10, 25, 50],
    movableColumns: false,
    resizableColumns: false,
    reactiveData: false,
    columns: [
      {
        title: "Drag & Drop",
        field: "emoji",
        headerHozAlign: "right",
        hozAlign: "right",
        minWidth: 170,
        formatter: function (cell) {
          var data = cell.getData();
          var emoji = data.emoji || "";
          var url = data.url || "#";
          return (
            '<a class="bookmark-link spacer-link" draggable="true"' +
            ' data-emoji="' +
            escapeHtml(emoji) +
            '"' +
            ' href="' +
            escapeHtml(url) +
            '"></a>'
          );
        },
      },
      {
        title: "Description",
        field: "title",
        headerHozAlign: "left",
        hozAlign: "left",
        widthGrow: 3,
        formatter: function (cell) {
          var data = cell.getData();
          var title = escapeHtml(data.title || "");
          var desc = escapeHtml(data.description || "");
          return (
            '<div class="spacer-title">' +
            title +
            "</div>" +
            '<div class="spacer-description">' +
            desc +
            "</div>"
          );
        },
      },
    ],
  });

  initThemeToggle();

  // searching
  var searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      var term = e.target.value.trim().toLowerCase();
      if (!term) {
        spacerTable.clearFilter();
        return;
      }
      spacerTable.setFilter(function (data) {
        return (
          (data.title && data.title.toLowerCase().includes(term)) ||
          (data.description &&
            data.description.toLowerCase().includes(term)) ||
          (data.emoji && String(data.emoji).toLowerCase().includes(term))
        );
      });
    });
  }
}


// ---------- What it looks like on the bookmark bar----------

// ---------- Spacer lookup ----------

function getSpacerById(id) {
  id = Number(id);
  if (!Array.isArray(SPACERS)) return null;
  for (var i = 0; i < SPACERS.length; i++) {
    if (SPACERS[i].id === id) return SPACERS[i];
  }
  return null;
}

function runSpacerView(spacerId) {
  var spacer = getSpacerById(spacerId);
  if (!spacer) {
    runGeneratorView();
    return;
  }

  document.title = "";
  setFaviconFromEmoji(spacer.emoji);
  document.body.innerHTML = "";
  document.body.style.background = "#ffffff";
}

// ---------- Entry point ----------

document.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  var spacerId = params.get("spacer");

  if (spacerId) {
    runSpacerView(spacerId);
  } else {
    runGeneratorView();
  }
});