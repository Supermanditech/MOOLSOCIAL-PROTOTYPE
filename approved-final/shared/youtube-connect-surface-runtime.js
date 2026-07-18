(function () {
  "use strict";

  var fileMatch = location.pathname.match(/\/(\d{2,3})-[^/]+\.html$/);
  if (!fileMatch) return;
  var screen = Number(fileMatch[1]);
  var affected = [4, 5, 6, 7, 8, 113, 124, 125, 126, 127, 129, 131];
  if (affected.indexOf(screen) === -1) return;

  var acceptanceRoute = "166-youtube-connect-shoppable-promotion.html";
  var cards = {
    4: {
      eyebrow: "LAUNCH VIDEO MODEL",
      title: "YouTube video. MoolSocial action.",
      copy: "Discover connected YouTube videos and time-bound Campaign Reels. Text and photo posts stay native.",
      tags: ["YouTube hosted", "Mool actions", "No paid views"],
      mode: "discover",
      primary: "Open connected video"
    },
    5: {
      eyebrow: "CAMPAIGN REEL",
      title: "YouTube Short · approved placement",
      copy: "This funded placement expires from MoolSocial after its exact purchased duration. The YouTube Short remains with its creator.",
      tags: ["47h 18m left", "Paid partnership", "Outcome funded"],
      mode: "campaign",
      primary: "Review campaign terms"
    },
    6: {
      eyebrow: "CONNECTED VIDEO",
      title: "Watch on a YouTube-powered player",
      copy: "YouTube owns playback and video metrics. Buy, Order, Apply and Chat are separate MoolSocial actions outside the player.",
      tags: ["YouTube attribution", "Click to play", "Independent actions"],
      mode: "video",
      primary: "Preview connected post"
    },
    7: {
      eyebrow: "MIXED SOCIAL FEED",
      title: "Native posts + connected YouTube video",
      copy: "Text, photos, polls and replies stay native. Connected video keeps visible YouTube attribution and separate Mool outcomes.",
      tags: ["Native text/image", "YouTube video", "Separate metrics"],
      mode: "feed",
      primary: "Add YouTube post"
    },
    8: {
      eyebrow: "CREATE",
      title: "Post natively or add a YouTube video",
      copy: "Create text, photo, poll and thread posts here. Video stays on YouTube; attach one useful MoolSocial action.",
      tags: ["Paste link", "Connect channel", "Action attached"],
      mode: "create",
      primary: "Add YouTube video"
    },
    113: {
      eyebrow: "BUSINESS CAMPAIGN REEL",
      title: "Fund an exact 1–7 day placement",
      copy: "Choose 24–168 hours, reserve the maximum campaign cost and start the clock only after approval and activation.",
      tags: ["Exact expiry", "Funding reserved", "No reach guarantee"],
      mode: "business-campaign",
      primary: "Build Campaign Reel"
    },
    124: {
      eyebrow: "YOUTUBE CONNECT",
      title: "Channel connected · 12 eligible videos",
      copy: "Manage connected content, Mool actions, qualified outcomes and active Campaign Reel placements without re-uploading video.",
      tags: ["@JodhpurDaily", "12 embeddable", "2 active placements"],
      mode: "studio",
      primary: "Manage connection"
    },
    125: {
      eyebrow: "CREATE & PUBLISH",
      title: "Choose YouTube content, then add the outcome",
      copy: "Paste a public video link or connect your channel. MoolSocial validates embedding before you attach Buy, Book, Order, Apply, Visit or Chat.",
      tags: ["No native video upload", "Rights checked", "One decisive action"],
      mode: "publish",
      primary: "Choose YouTube content"
    },
    126: {
      eyebrow: "CONTENT LIBRARY",
      title: "Native posts and YouTube connections stay separate",
      copy: "See native text/images, connected public videos, unavailable content and reconnect-required states in one controlled library.",
      tags: ["Native", "YouTube connected", "Unavailable state"],
      mode: "library",
      primary: "Connect more content"
    },
    127: {
      eyebrow: "PERFORMANCE",
      title: "YouTube metrics are not Mool outcomes",
      copy: "YouTube-provided views remain labelled separately. Mool opens, actions, qualified leads, retained orders and bookings use Mool attribution.",
      tags: ["YouTube metrics", "Mool actions", "Qualified outcomes"],
      mode: "performance",
      primary: "Review attribution"
    },
    129: {
      eyebrow: "FUNDED CREATOR WORK",
      title: "Attach eligible YouTube content to a funded brief",
      copy: "Creator pay funds the approved deliverable. Outcome pay uses independently verified Mool orders, bookings, leads or activations—not YouTube engagement.",
      tags: ["Brief funded", "Disclosure required", "No paid engagement"],
      mode: "campaign-deliverable",
      primary: "Attach YouTube deliverable"
    },
    131: {
      eyebrow: "CONNECTION, RIGHTS & SAFETY",
      title: "Control YouTube access and unavailable content",
      copy: "Review Google authorization, revoke access, reconnect an expired channel and handle private, removed or embedding-disabled videos.",
      tags: ["Revocable OAuth", "Embedding checks", "Appeal route"],
      mode: "rights",
      primary: "Open connection controls"
    }
  };

  function addStyles() {
    if (document.getElementById("ycxSurfaceStyles")) return;
    var style = document.createElement("style");
    style.id = "ycxSurfaceStyles";
    style.textContent = [
      ".ycx-card{position:relative;z-index:3;display:grid;gap:9px;border:1px solid #c9cdec;border-radius:14px;background:linear-gradient(145deg,#fff,#f2f3ff);padding:14px;margin:10px 0;color:#15182e;box-shadow:0 10px 24px rgba(0,0,128,.10)}",
      ".ycx-card:before{content:'';position:absolute;inset:0 auto 0 0;width:4px;border-radius:14px 0 0 14px;background:#ff9933}",
      ".ycx-eyebrow{color:#138808;font-size:8px;font-weight:950;letter-spacing:.08em}",
      ".ycx-card h3{margin:0;color:#000080;font-size:15px;line-height:1.2}.ycx-card p{margin:0;color:#68708a;font-size:9px;line-height:1.5}",
      ".ycx-tags{display:flex;gap:5px;flex-wrap:wrap}.ycx-tags span{border-radius:999px;background:#e9ebff;padding:5px 7px;color:#000080;font-size:7px;font-weight:900}",
      ".ycx-actions{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px}.ycx-primary,.ycx-secondary{min-height:38px;display:grid;place-items:center;border-radius:8px;padding:8px 10px;font-size:9px;font-weight:950;text-decoration:none;cursor:pointer}",
      ".ycx-primary{border:0;background:#000080;color:#fff}.ycx-secondary{border:1px solid #000080;background:#fff;color:#000080}",
      ".ycx-reel-ribbon{position:absolute;z-index:8;left:12px;right:72px;top:86px;display:grid;gap:3px;border:1px solid rgba(255,255,255,.45);border-radius:10px;background:rgba(0,0,55,.78);padding:9px;color:#fff;backdrop-filter:blur(8px)}",
      ".ycx-reel-ribbon small{color:#ffbd73;font-size:7px;font-weight:950}.ycx-reel-ribbon b{font-size:10px}.ycx-reel-ribbon span{font-size:7px;color:#e1e3ff}",
      ".ycx-modal{position:fixed;z-index:500;inset:0;display:grid;place-items:center;background:rgba(5,7,30,.72);padding:16px}.ycx-modal[hidden]{display:none}.ycx-sheet{width:min(440px,100%);display:grid;gap:12px;border-radius:18px;background:#fff;padding:18px;box-shadow:0 25px 60px rgba(0,0,40,.35)}",
      ".ycx-sheet-head{display:flex;justify-content:space-between;gap:12px}.ycx-sheet h2{margin:0;color:#000080;font-size:18px}.ycx-sheet p{margin:4px 0 0;color:#68708a;font-size:10px;line-height:1.5}.ycx-close{width:34px;height:34px;border:0;border-radius:50%;background:#000080;color:#fff;font-size:18px}",
      ".ycx-rule-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.ycx-rule{display:grid;gap:3px;border:1px solid #d8ddec;border-radius:8px;padding:9px}.ycx-rule small{color:#68708a;font-size:7px}.ycx-rule b{color:#15182e;font-size:9px}",
      ".ycx-duration{display:grid;gap:8px}.ycx-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}.ycx-days button{min-height:38px;border:1px solid #d8ddec;border-radius:7px;background:#fff;color:#000080;font-size:8px;font-weight:950}.ycx-days button.active{border-color:#000080;background:#000080;color:#fff;box-shadow:inset 0 -3px 0 #ff9933}",
      ".ycx-time{display:grid;grid-template-columns:1fr 1fr;gap:6px}.ycx-time span{display:grid;gap:3px;border-left:3px solid #ff9933;background:#f4f6fb;padding:8px}.ycx-time small{color:#68708a;font-size:7px}.ycx-time b{color:#15182e;font-size:8px}.ycx-status{border-left:3px solid #138808;background:#edf8ec;padding:8px;color:#285427;font-size:8px;line-height:1.4}",
      ".ycx-native-video-control{display:none!important}.ycx-replaced{display:none!important}",
      "@media(max-width:600px){.ycx-card{margin:8px 0;padding:12px}.ycx-actions{grid-template-columns:1fr}.ycx-rule-grid{grid-template-columns:1fr}.ycx-modal{align-items:end;padding:0}.ycx-sheet{border-radius:18px 18px 0 0}.ycx-days{grid-template-columns:repeat(4,minmax(0,1fr))}}"
    ].join("");
    document.head.appendChild(style);
  }

  function detailRoute(mode) {
    return acceptanceRoute + "?from=" + screen + "&mode=" + encodeURIComponent(mode || "connect");
  }

  function cardHtml(config, includeDuration) {
    var duration = includeDuration ? [
      '<div class="ycx-duration" data-ycx-duration>',
      '<div class="ycx-days" aria-label="Campaign Reel duration">',
      [1,2,3,4,5,6,7].map(function (day) {
        return '<button type="button" data-ycx-day="' + day + '" class="' + (day === 2 ? "active" : "") + '">' + day + '<br>day' + (day > 1 ? "s" : "") + '</button>';
      }).join(""),
      '</div><div class="ycx-time"><span><small>START</small><b data-ycx-start>After approval · 18 Jul, 6:00 PM</b></span><span><small>EXACT END</small><b data-ycx-end>20 Jul, 6:00 PM · 48 hours</b></span></div>',
      '<div class="ycx-status" data-ycx-status>Duration begins only after approval and successful activation.</div></div>'
    ].join("") : "";
    return [
      '<section class="ycx-card" data-ycx-card="' + screen + '">',
      '<small class="ycx-eyebrow">' + config.eyebrow + '</small>',
      '<h3>' + config.title + '</h3>',
      '<p>' + config.copy + '</p>',
      '<div class="ycx-tags">' + config.tags.map(function (tag) { return "<span>" + tag + "</span>"; }).join("") + '</div>',
      duration,
      '<div class="ycx-actions"><a class="ycx-primary" data-testid="youtube-connect-primary-' + screen + '" href="' + detailRoute(config.mode) + '">' + config.primary + '</a><button class="ycx-secondary" type="button" data-ycx-explain>How it works</button></div>',
      '</section>'
    ].join("");
  }

  function findHost() {
    var selectors = {
      4: ".focus-body",
      6: ".feed-state",
      7: ".feed-state,.feed-body,.feed-scroll,.feed-app main",
      8: ".composer-area",
      113: ".view",
      124: ".content",
      125: ".content",
      126: ".content",
      127: ".content",
      129: ".content",
      131: ".content"
    };
    return document.querySelector(selectors[screen] || ".content,main");
  }

  function insertCard() {
    var config = cards[screen];
    if (!config || document.querySelector("[data-ycx-card]")) return;
    if (screen === 5) {
      var activeShort = document.querySelector(".short-card.active");
      if (activeShort) {
        var ribbon = document.createElement("div");
        ribbon.className = "ycx-reel-ribbon";
        ribbon.innerHTML = "<small>CAMPAIGN REEL · YOUTUBE</small><b>Paid partnership · 47h 18m left</b><span>Mool outcome: completed, non-refunded basket order</span>";
        activeShort.prepend(ribbon);
      }
      return;
    }
    var host = findHost();
    if (!host) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = cardHtml(config, screen === 113);
    var card = wrap.firstElementChild;
    host.insertBefore(card, host.firstChild);
    bindCard(card);
  }

  function bindCard(card) {
    if (!card) return;
    var dayButtons = card.querySelectorAll("[data-ycx-day]");
    dayButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        dayButtons.forEach(function (item) { item.classList.toggle("active", item === button); });
        var days = Number(button.dataset.ycxDay);
        var hours = days * 24;
        var end = new Date(Date.UTC(2026, 6, 18, 12, 30) + hours * 60 * 60 * 1000);
        var formatter = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
        card.querySelector("[data-ycx-end]").textContent = formatter.format(end) + " · " + hours + " hours";
        card.querySelector("[data-ycx-status]").textContent = days + "-day placement selected. Exact expiry is locked before funding; approval delay consumes no time. Renewal is never automatic.";
      });
    });
  }

  function patchExistingSurface() {
    if (screen === 4) {
      var command = document.querySelector("[data-command-text]");
      if (command) command.textContent = "Search YouTube videos, people or native posts";
      document.querySelectorAll(".live-tag").forEach(function (tag) {
        if (/Shorts?|Video/i.test(tag.textContent)) tag.textContent = "YouTube";
      });
    }
    if (screen === 5) {
      document.title = "05 Campaign Reels - MoolSocial Screenbook";
      var title = document.querySelector(".ms-title");
      if (title) title.textContent = "Screen 05: Social > Campaign Reels";
      document.querySelectorAll(".video-badge").forEach(function (badge) { badge.textContent = "YouTube · Campaign"; });
      document.querySelectorAll(".social-tab").forEach(function (tab) {
        if (tab.textContent.trim() === "Shorts") {
          var textNode = Array.prototype.slice.call(tab.childNodes).find(function (node) { return node.nodeType === 3; });
          if (textNode) textNode.textContent = " Campaign Reels";
          else tab.appendChild(document.createTextNode(" Campaign Reels"));
        }
      });
      var creatorEntry = document.querySelector(".creator-entry");
      if (creatorEntry) creatorEntry.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        location.href = detailRoute("campaign");
      }, true);
    }
    if (screen === 6) {
      var brand = document.querySelector(".brand-lockup b");
      if (brand) brand.textContent = "YouTube-connected Videos";
      document.querySelectorAll(".shorts-head span:first-child").forEach(function (node) { node.textContent = "Campaign Reels"; });
      document.querySelectorAll(".feed-video-card .feed-copy").forEach(function (copy) {
        var source = document.createElement("small");
        source.className = "ycx-eyebrow";
        source.textContent = "YOUTUBE VIDEO · MOOL ACTIONS BELOW";
        copy.prepend(source);
      });
    }
    if (screen === 8) {
      ["Short", "Video", "Story", "Live"].forEach(function (mode) {
        var control = document.querySelector('[data-mode="' + mode + '"]');
        if (control) control.classList.add("ycx-native-video-control");
      });
      ["video", "music", "camera"].forEach(function (sheet) {
        document.querySelectorAll('[data-open-sheet="' + sheet + '"]').forEach(function (control) { control.classList.add("ycx-native-video-control"); });
      });
      var subtitle = document.querySelector("[data-mode-subtitle]");
      if (subtitle) subtitle.textContent = "Text, photo, poll, thread or YouTube video";
      var uploadNote = document.querySelector("[data-upload-note]");
      if (uploadNote) uploadNote.textContent = "Native text and images stay here. Add public YouTube video through YouTube Connect.";
    }
    if (screen === 124) {
      document.querySelectorAll(".metric small").forEach(function (label) {
        if (label.textContent === "REACH") label.textContent = "MOOL OPENS";
        if (label.textContent === "ENGAGED") label.textContent = "MOOL ACTIONS";
      });
      document.querySelectorAll(".media-copy span").forEach(function (copy) {
        copy.textContent = copy.textContent.replace("48K views", "YouTube metrics available separately");
      });
    }
    if (screen === 125) {
      [".format", ".publish-grid", ".action-pair"].forEach(function (selector) {
        var element = document.querySelector(selector);
        if (element) element.classList.add("ycx-replaced");
      });
      var appTitle = document.querySelector(".app-title span");
      if (appTitle) appTitle.textContent = "YouTube Connect · native text/image posts";
    }
    if (screen === 126) {
      var appSubtitle = document.querySelector(".app-title span");
      if (appSubtitle) appSubtitle.textContent = "Native posts · YouTube connected · unavailable";
      setTimeout(function () {
        document.querySelectorAll(".row-copy span,.row-copy em").forEach(function (node) {
          node.textContent = node.textContent
            .replace(/Short/g, "YouTube Short")
            .replace(/Video/g, "YouTube Video")
            .replace(/views/g, "YouTube views")
            .replace(/attributed/g, "Mool outcome");
        });
      }, 0);
    }
    if (screen === 127) {
      document.querySelectorAll(".metric small").forEach(function (label) {
        if (label.textContent === "REACH") label.textContent = "MOOL OPENS";
        if (label.textContent === "WATCH TIME") label.textContent = "YOUTUBE METRICS";
        if (label.textContent === "ENGAGED") label.textContent = "MOOL ACTIONS";
      });
      document.querySelectorAll(".row-copy span").forEach(function (node) {
        node.textContent = node.textContent.replace("48.2K views", "YouTube metrics separate");
      });
      var topContent = document.querySelector(".studio-row");
      if (topContent) {
        topContent.addEventListener("click", function () {
          location.href = "126-creator-content-library.html?item=connected-basket&from=performance";
        });
      }
    }
    if (screen === 129) {
      document.querySelectorAll(".campaign-facts b").forEach(function (node) {
        node.textContent = node.textContent.replace("60 sec Short", "YouTube Short").replace("Video 4–6 min", "YouTube Video");
      });
      var accept = document.getElementById("accept");
      if (accept) accept.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        location.href = detailRoute("campaign-deliverable");
      }, true);
    }
    if (screen === 131) {
      var channelControl = document.querySelector('[data-control="channel"] b');
      if (channelControl) channelControl.textContent = "YouTube Connection";
      var channelCopy = document.querySelector('[data-control="channel"] span');
      if (channelCopy) channelCopy.textContent = "Authorization, revoke, reconnect and embed availability";
    }
  }

  function openExplanation() {
    var existing = document.getElementById("ycxExplainModal");
    if (existing) existing.remove();
    var modal = document.createElement("div");
    modal.id = "ycxExplainModal";
    modal.className = "ycx-modal";
    modal.innerHTML = '<section class="ycx-sheet" role="dialog" aria-modal="true" aria-labelledby="ycxExplainTitle"><div class="ycx-sheet-head"><span><h2 id="ycxExplainTitle">How this launch model works</h2><p>Video stays on YouTube. MoolSocial validates the public embed, shows attribution and adds one independent user action.</p></span><button class="ycx-close" type="button" aria-label="Close YouTube Connect explanation">×</button></div><div class="ycx-rule-grid"><span class="ycx-rule"><small>VIDEO</small><b>Hosted and controlled by YouTube</b></span><span class="ycx-rule"><small>MOOL VALUE</small><b>Buy, Book, Order, Apply, Visit or Chat</b></span><span class="ycx-rule"><small>CREATOR PAY</small><b>Approved deliverable or verified Mool outcome</b></span><span class="ycx-rule"><small>NEVER PAID</small><b>YouTube view, like, share, comment or subscribe</b></span></div><a class="ycx-primary" href="' + detailRoute(cards[screen].mode) + '">Open full YouTube Connect journey</a></section>';
    document.body.appendChild(modal);
    modal.querySelector(".ycx-close").addEventListener("click", function () { modal.remove(); });
    modal.addEventListener("click", function (event) { if (event.target === modal) modal.remove(); });
  }

  function start() {
    addStyles();
    patchExistingSurface();
    insertCard();
    document.addEventListener("click", function (event) {
      var explain = event.target.closest && event.target.closest("[data-ycx-explain]");
      if (explain) {
        event.preventDefault();
        event.stopImmediatePropagation();
        openExplanation();
      }
    }, true);
    window.__MOOL_YOUTUBE_CONNECT_SURFACE__ = {
      screen: screen,
      contract: "youtube-connect-campaign-reels-2026-07-18",
      durationHours: [24, 48, 72, 96, 120, 144, 168]
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
}());
