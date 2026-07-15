(function () {
  'use strict';

  var registry = window.MoolPrototypeInteractionContracts;
  if (!registry || !registry.screens) return;

  var match = window.location.pathname.match(/\/(\d{2,3})-[^/]+[.]html$/);
  if (!match) return;
  var screen = String(parseInt(match[1], 10));
  var contracts = registry.screens[screen];
  if (!contracts) return;

  var controlSelector = 'button, a, input, select, textarea, [role="button"], [role="tab"], [role="switch"]';

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function userMessage(contract, label) {
    var note = normalize(contract && contract.note);
    var generic = /\b(selected|details? open|is ready|recorded|updated|submitted|started|saved)\.?$/i.test(note);
    if (note && !generic) return note;
    if (contract.type === 'select' || contract.type === 'state' || contract.type === 'toggle') return label + ' applied.';
    if (contract.type === 'progress') return label + ' started. Follow the next action shown to finish.';
    if (contract.type === 'handoff') return label + ' is ready. Continue to complete this task.';
    if (contract.type === 'terminal') return label + ' completed.';
    if (contract.type === 'detail') return label + ' details are ready.';
    return label + ' is ready.';
  }

  function getCandidates(element) {
    if (!element) return [];
    return [
      element.getAttribute('aria-label'),
      element.getAttribute('title'),
      element.getAttribute('placeholder'),
      element.innerText,
      element.textContent,
      element.value,
      element.name
    ].map(normalize).filter(function (value, index, list) { return value && list.indexOf(value) === index; });
  }

  function resolveContract(element) {
    var candidates = getCandidates(element);
    for (var i = 0; i < candidates.length; i += 1) {
      if (contracts[candidates[i]]) return { label: candidates[i], contract: contracts[candidates[i]] };
    }
    var keys = Object.keys(contracts).filter(function (key) { return key.length >= 110; });
    for (var c = 0; c < candidates.length; c += 1) {
      for (var k = 0; k < keys.length; k += 1) {
        if (candidates[c].indexOf(keys[k].trim()) === 0) return { label: candidates[c], contract: contracts[keys[k]] };
      }
    }
    return null;
  }

  function markBound(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll(controlSelector), function (element) {
      var resolved = resolveContract(element);
      if (resolved) {
        element.dataset.moolContract = resolved.contract.ticket || 'registered';
      }
    });
  }

  function preserveQuery(route) {
    var target = new URL(route, window.location.href);
    var current = new URL(window.location.href);
    ['workspace', 'profile', 'area', 'mobile', 'email', 'login', 'shop', 'order', 'request', 'payment', 'engine'].forEach(function (key) {
      if (!target.searchParams.has(key) && current.searchParams.has(key)) {
        target.searchParams.set(key, current.searchParams.get(key));
      }
    });
    target.searchParams.set('fromScreen', screen);
    return target.href;
  }

  function ensureStyles() {
    if (document.getElementById('mool-contract-styles')) return;
    var style = document.createElement('style');
    style.id = 'mool-contract-styles';
    style.textContent = [
      '.mool-contract-selected{outline:2px solid #ff9933!important;outline-offset:2px!important;box-shadow:0 0 0 4px rgba(255,153,51,.18)!important}',
      '.mool-contract-toast{position:fixed;left:50%;bottom:max(92px,calc(env(safe-area-inset-bottom) + 76px));transform:translateX(-50%);z-index:2147483646;max-width:min(340px,calc(100vw - 32px));padding:10px 14px;border-radius:8px;background:#07134f;color:#fff;font:700 13px/1.35 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.28);text-align:center}',
      '.mool-contract-backdrop{position:fixed;inset:0;z-index:2147483645;background:rgba(2,8,50,.46);display:flex;align-items:flex-end;justify-content:center;padding:14px}',
      '.mool-contract-sheet{width:min(430px,100%);max-height:min(70vh,580px);overflow:auto;border:1px solid #cbd2f2;border-radius:8px;background:#fff;color:#080b7d;box-shadow:0 24px 70px rgba(0,0,0,.3);font-family:system-ui,sans-serif}',
      '.mool-contract-sheet__head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:17px 18px 10px}',
      '.mool-contract-sheet__title{margin:0;font-size:19px;line-height:1.2;letter-spacing:0}',
      '.mool-contract-sheet__close{width:40px;height:40px;flex:0 0 40px;border:1px solid #d6daf0;border-radius:50%;background:#f7f8ff;color:#080b7d;font-size:24px;line-height:1;cursor:pointer}',
      '.mool-contract-sheet__body{padding:0 18px 18px;font-size:14px;line-height:1.45}',
      '.mool-contract-sheet__meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}',
      '.mool-contract-sheet__meta span{padding:9px;border-radius:6px;background:#f2f4ff;font-weight:700;font-size:12px}',
      '.mool-contract-sheet__actions{display:flex;gap:10px;margin-top:16px}',
      '.mool-contract-sheet__actions button{min-height:44px;flex:1;border-radius:7px;border:1px solid #080b7d;background:#fff;color:#080b7d;font-weight:800}',
      '.mool-contract-sheet__actions button:last-child{background:#080b7d;color:#fff}'
    ].join('');
    document.head.appendChild(style);
  }

  function announce(message, intentType) {
    var existing = document.querySelector('.mool-contract-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'mool-contract-toast';
    if (intentType) toast.dataset.intentResolved = intentType;
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(function () { if (toast.isConnected) toast.remove(); }, 2200);
  }

  function selectControl(element, contract, label) {
    var parent = element.parentElement;
    if (parent) {
      Array.prototype.forEach.call(parent.querySelectorAll('.mool-contract-selected'), function (sibling) {
        if (sibling !== element) {
          sibling.classList.remove('mool-contract-selected');
          sibling.setAttribute('aria-pressed', 'false');
        }
      });
    }
    element.classList.add('mool-contract-selected');
    element.setAttribute('aria-pressed', 'true');
    announce(userMessage(contract, label), contract.intentOutcome ? contract.type : '');
  }

  function openSheet(contract, label) {
    var existing = document.querySelector('.mool-contract-backdrop');
    if (existing) existing.remove();
    var backdrop = document.createElement('div');
    backdrop.className = 'mool-contract-backdrop';
    if (contract.intentOutcome) {
      backdrop.classList.add('mool-intent-outcome');
      backdrop.dataset.intentResolved = contract.type;
    }
    backdrop.setAttribute('role', 'presentation');
    backdrop.innerHTML = '<section class="mool-contract-sheet" role="dialog" aria-modal="true" aria-labelledby="mool-contract-title">' +
      '<div class="mool-contract-sheet__head"><h2 class="mool-contract-sheet__title" id="mool-contract-title"></h2><button class="mool-contract-sheet__close" type="button" aria-label="Close">×</button></div>' +
      '<div class="mool-contract-sheet__body"><p class="mool-contract-sheet__note"></p>' +
      '<div class="mool-contract-sheet__meta"><span>Action protected</span><span>Progress saved</span></div>' +
      '<div class="mool-contract-sheet__actions"><button type="button" data-contract-retry></button><button type="button" data-contract-return></button></div></div></section>';
    backdrop.querySelector('#mool-contract-title').textContent = label;
    backdrop.querySelector('.mool-contract-sheet__note').textContent = userMessage(contract, label);
    var retryButton = backdrop.querySelector('[data-contract-retry]');
    var returnButton = backdrop.querySelector('[data-contract-return]');
    retryButton.textContent = contract.intentOutcome ? 'Back' : 'Try again';
    returnButton.textContent = contract.primaryLabel || (contract.intentOutcome ? 'Finish' : 'Return');
    function close() { backdrop.remove(); }
    backdrop.querySelector('.mool-contract-sheet__close').addEventListener('click', close);
    returnButton.addEventListener('click', function () {
      if (contract.route) window.location.href = preserveQuery(contract.route);
      else close();
    });
    retryButton.addEventListener('click', function () {
      if (contract.intentOutcome) close();
      else backdrop.querySelector('.mool-contract-sheet__note').textContent = 'Ready to try again. Your current screen and entered information are unchanged.';
    });
    backdrop.addEventListener('click', function (event) { if (event.target === backdrop) close(); });
    document.body.appendChild(backdrop);
    backdrop.querySelector('.mool-contract-sheet__close').focus();
  }

  function runContract(event, element, label, contract) {
    if (element.hasAttribute('data-native-interaction')) return;
    if (contract.type === 'native') return;
    if (contract.type === 'route') {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = preserveQuery(contract.route);
      return;
    }
    if (contract.type === 'back') {
      event.preventDefault();
      event.stopPropagation();
      var referrer = document.referrer ? new URL(document.referrer, window.location.href) : null;
      var hasScreenReferrer = referrer && referrer.origin === window.location.origin && /\/screens\/\d{2,3}-/.test(referrer.pathname);
      if (window.history.length > 1 && hasScreenReferrer) window.history.back();
      else window.location.href = preserveQuery(contract.fallback || '04-universal-focus-shell.html');
      return;
    }
    if (contract.type === 'select') {
      selectControl(element, contract, label);
      return;
    }
    if (contract.type === 'state' || contract.type === 'toggle') {
      event.preventDefault();
      event.stopPropagation();
      selectControl(element, contract, label);
      return;
    }
    if (contract.type === 'terminal' || contract.type === 'detail' || contract.type === 'handoff') {
      event.preventDefault();
      event.stopPropagation();
      openSheet(contract, label);
      return;
    }
    if (contract.type === 'progress') {
      event.preventDefault();
      event.stopPropagation();
      selectControl(element, contract, label);
      openSheet(contract, label);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    openSheet(contract, label);
  }

  ensureStyles();
  markBound(document);
  document.addEventListener('click', function (event) {
    var element = event.target.closest && event.target.closest(controlSelector);
    if (!element) return;
    var resolved = resolveContract(element);
    if (!resolved) return;
    runContract(event, element, resolved.label, resolved.contract);
  }, true);

  new MutationObserver(function (records) {
    records.forEach(function (record) {
      Array.prototype.forEach.call(record.addedNodes, function (node) {
        if (node.nodeType === 1) markBound(node);
      });
    });
  }).observe(document.body, { childList: true, subtree: true });

  window.__MOOL_INTERACTION_BOUND__ = {
    screen: parseInt(screen, 10),
    contractCount: Object.keys(contracts).length,
    version: registry.version
  };
}());
