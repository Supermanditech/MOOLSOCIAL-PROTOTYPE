(function () {
  'use strict';

  var supplementalContracts = {
    '5': {
      'MS Mahadev Fresh Mart Verified local shop · Jodhpur': { type: 'route', route: '09-buy.html?shop=mahadev-fresh-mart&source=shorts', note: 'Open Mahadev Fresh Mart products, delivery choices and shop information.', ticket: 'MICRO-005-01' }
    },
    '22': {
      'Call': { type: 'handoff', note: 'Start a protected support call for this order.', primaryLabel: 'Start call', ticket: 'MICRO-022-01' },
      'Video': { type: 'handoff', note: 'Choose a video call or attach a short order video.', primaryLabel: 'Continue', ticket: 'MICRO-022-02' },
      'Photo proof': { type: 'handoff', note: 'Choose a photo that shows the affected item or delivery proof.', primaryLabel: 'Choose photo', ticket: 'MICRO-022-03' },
      'File': { type: 'handoff', note: 'Choose a receipt, invoice or supporting document for this order.', primaryLabel: 'Choose file', ticket: 'MICRO-022-04' },
      'Photo': { type: 'handoff', note: 'Choose a photo and review it before sending it in this order chat.', primaryLabel: 'Choose photo', ticket: 'MICRO-022-05' },
      'Bill': { type: 'detail', note: 'The paid bill and item-level amount are ready to review in this order chat.', ticket: 'MICRO-022-06' },
      'Proof': { type: 'detail', note: 'Order, delivery and refund proof are ready to review.', ticket: 'MICRO-022-07' }
    },
    '23': {
      'Photo image/video': { type: 'handoff', note: 'Choose a photo or video, preview it and then send it to the selected person.', primaryLabel: 'Choose media', ticket: 'MICRO-023-01' },
      'File PDF/doc': { type: 'handoff', note: 'Choose a PDF or document and review its name before sending.', primaryLabel: 'Choose file', ticket: 'MICRO-023-02' },
      'Call audio': { type: 'handoff', note: 'Select a person to start a protected audio call.', primaryLabel: 'Choose person', ticket: 'MICRO-023-03' },
      'Video face call': { type: 'handoff', note: 'Select a person to start a protected video call.', primaryLabel: 'Choose person', ticket: 'MICRO-023-04' }
    },
    '24': {
      'Call business': { type: 'handoff', note: 'Start an order-linked business call with the verified shop.', primaryLabel: 'Start call', ticket: 'MICRO-024-01' },
      'Video call business': { type: 'handoff', note: 'Start an order-linked video call with the verified shop.', primaryLabel: 'Start video', ticket: 'MICRO-024-02' },
      'More business chat options': { type: 'detail', note: 'Search this conversation, review shared files, manage notifications or report an issue.', ticket: 'MICRO-024-03' },
      'Change items': { type: 'detail', note: 'Review the linked basket and request an item or quantity change before payment.', primaryLabel: 'Review items', ticket: 'MICRO-024-04' },
      'Need GST bill': { type: 'terminal', note: 'GST invoice requested for this business order.', ticket: 'MICRO-024-05' },
      'Share location': { type: 'handoff', note: 'Choose and confirm the delivery location before sharing it with the shop.', primaryLabel: 'Choose location', ticket: 'MICRO-024-06' },
      'Home delivery': { type: 'select', note: 'Home delivery selected for the confirmed business address.', ticket: 'MICRO-024-07' },
      'At-shop collection': { type: 'select', note: 'At-shop collection selected for a confirmed shop visit.', ticket: 'MICRO-024-08' },
      'Send photo': { type: 'handoff', note: 'Choose and preview a product or bill photo before sending it.', primaryLabel: 'Choose photo', ticket: 'MICRO-024-09' },
      'Send PDF': { type: 'handoff', note: 'Choose and review a PDF before sending it in this business chat.', primaryLabel: 'Choose PDF', ticket: 'MICRO-024-10' },
      'Send final bill': { type: 'terminal', note: 'Final bill shared in this order-linked conversation.', ticket: 'MICRO-024-11' },
      'Photo': { type: 'handoff', note: 'Choose and preview a photo before sending it.', primaryLabel: 'Choose photo', ticket: 'MICRO-024-12' },
      'File': { type: 'handoff', note: 'Choose and review a business document before sending it.', primaryLabel: 'Choose file', ticket: 'MICRO-024-13' },
      'Send message': { type: 'terminal', note: 'Message sent in this business conversation.', ticket: 'MICRO-024-14' }
    },
    '26': {
      'Scan': { type: 'handoff', note: 'Restaurant QR scanner is ready. Scan at the restaurant to open its current menu or table service.', primaryLabel: 'Open scanner', ticket: 'MICRO-026-01' },
      'Order now': { type: 'route', route: '27-eat-order-food.html', note: 'Open the restaurant menu and choose delivery or pickup.', ticket: 'MICRO-026-02' },
      'Menu': { type: 'route', route: '27-eat-order-food.html', note: 'Open the selected restaurant menu.', ticket: 'MICRO-026-03' },
      'Add pack': { type: 'terminal', note: 'Selected meal pack added to the food basket.', ticket: 'MICRO-026-04' }
    },
    '27': {
      'Customize': { type: 'detail', note: 'Choose spice, ingredients and preparation notes before adding this item.', primaryLabel: 'Apply choices', ticket: 'MICRO-027-01' },
      'Open food basket': { type: 'detail', note: 'Review selected food items, quantities, delivery choice and payable total.', primaryLabel: 'Review basket', ticket: 'MICRO-027-02' },
      'Tiffin': { type: 'route', route: '29-eat-tiffin.html', note: 'Open verified tiffin trials and monthly meal plans.', ticket: 'MICRO-027-03' }
    },
    '28': {
      'Tiffin': { type: 'route', route: '29-eat-tiffin.html', note: 'Open verified tiffin trials and monthly meal plans.', ticket: 'MICRO-028-01' }
    },
    '29': {
      'Start monthly tiffin': { type: 'terminal', note: 'Monthly tiffin plan prepared. Review the address, meal calendar and payment before activation.', primaryLabel: 'Review plan', ticket: 'MICRO-029-01' }
    },
    '30': {
      'Book bike saver': { type: 'route', route: '31-ride-accepted-captain-arriving.html?vehicle=bike', note: 'Search for a nearby bike captain at the shown fare.', ticket: 'MICRO-030-01' },
      'Book auto': { type: 'route', route: '31-ride-accepted-captain-arriving.html?vehicle=auto', note: 'Search for a nearby auto captain at the shown fare.', ticket: 'MICRO-030-02' }
    },
    '36': {
      'Book repair': { type: 'route', route: '48-book-get-it-done.html?task=Repair', note: 'Describe the repair, add a photo and review the visit fee before booking.', ticket: 'MICRO-036-01' }
    },
    '38': { 'Need': { type: 'select', note: 'Appointment need section selected. Choose the reason and add a short description.', ticket: 'MICRO-038-01' } },
    '39': { 'Follow': { type: 'select', note: 'Follow-up options selected for this doctor invitation.', ticket: 'MICRO-039-01' } },
    '40': { 'Follow': { type: 'select', note: 'Follow-up path selected. Review benefits and consent before joining.', ticket: 'MICRO-040-01' } },
    '41': { 'Care': { type: 'select', note: 'Care route selected. Choose the follow-up action and records to share.', ticket: 'MICRO-041-01' } },
    '43': { 'Pay': { type: 'route', route: '44-salon-booking-confirmed.html', note: 'Review the final salon booking amount and payment choice.', ticket: 'MICRO-043-01' } },
    '44': {
      'Open directions': { type: 'handoff', note: 'Directions are ready for the confirmed salon location.', primaryLabel: 'Open map', ticket: 'MICRO-044-01' },
      'Pay via MoolSocial': { type: 'route', route: '45-salon-visit-check-in.html?pay=moolsocial', note: 'Continue to check-in and protected in-app payment.', ticket: 'MICRO-044-02' },
      'Pay': { type: 'route', route: '45-salon-visit-check-in.html?pay=moolsocial', note: 'Continue to check-in and protected in-app payment.', ticket: 'MICRO-044-03' }
    },
    '45': {
      'Service status': { type: 'select', note: 'Service status selected. Current check-in, stylist and payment state are shown.', ticket: 'MICRO-045-01' },
      'Pay via MoolSocial': { type: 'route', route: '46-salon-service-payment-rating.html?pay=moolsocial', note: 'Open protected payment, bill and rating.', ticket: 'MICRO-045-02' },
      'Pay': { type: 'route', route: '46-salon-service-payment-rating.html?pay=moolsocial', note: 'Open protected payment, bill and rating.', ticket: 'MICRO-045-03' }
    },
    '46': {
      'Bill status': { type: 'select', note: 'Bill status selected. The payable amount and receipt state are shown.', ticket: 'MICRO-046-01' },
      'Pay & save bill': { type: 'terminal', note: 'Payment completed and the salon bill was saved to this booking.', ticket: 'MICRO-046-02' },
      'Bill': { type: 'detail', note: 'Salon bill is ready with service, amount, payment and support references.', ticket: 'MICRO-046-03' },
      'Pay': { type: 'terminal', note: 'Salon payment completed and receipt saved.', ticket: 'MICRO-046-04' }
    },
    '47': {
      'Issue status': { type: 'select', note: 'Issue status selected. Open and resolved requests are shown.', ticket: 'MICRO-047-01' },
      'Choose issue': { type: 'detail', note: 'Choose the service, billing or quality issue and describe the requested resolution.', primaryLabel: 'Continue', ticket: 'MICRO-047-02' },
      'Proof': { type: 'handoff', note: 'Choose a photo, bill or chat record to support this salon request.', primaryLabel: 'Choose proof', ticket: 'MICRO-047-03' }
    },
    '50': {
      'Call': { type: 'handoff', note: 'Start a protected call with the accepted helper.', primaryLabel: 'Start call', ticket: 'MICRO-050-01' },
      'Share': { type: 'handoff', note: 'Share the task status and meeting point through the device share sheet.', primaryLabel: 'Share', ticket: 'MICRO-050-02' }
    },
    '52': {
      'Save helper prefer next time': { type: 'select', note: 'Helper saved as a preference for similar future tasks.', ticket: 'MICRO-052-01' },
      'Share receipt/proof': { type: 'handoff', note: 'Task receipt and completion proof are ready to share.', primaryLabel: 'Share', ticket: 'MICRO-052-02' },
      'Receipt': { type: 'detail', note: 'Task receipt is ready with amount, helper, proof and completion reference.', ticket: 'MICRO-052-03' }
    },
    '90': {
      'PDF Sales Statement Invoice, payment and return summary ›': { type: 'terminal', note: 'PDF sales statement prepared for the selected period with invoices, payments and returns.', primaryLabel: 'View file', ticket: 'MICRO-090-01' },
      'GST GST-ready Export Taxable value and invoice register ›': { type: 'terminal', note: 'GST-ready invoice register prepared for the selected period.', primaryLabel: 'View export', ticket: 'MICRO-090-02' },
      'CA Share with Accountant Role-controlled access with audit trail ›': { type: 'handoff', note: 'Choose an accountant, confirm access and review the audit record before sharing.', primaryLabel: 'Choose accountant', ticket: 'MICRO-090-03' },
      'WA WhatsApp Approved template or secure receipt link ›': { type: 'handoff', note: 'Secure receipt link prepared for sharing through an approved WhatsApp template.', primaryLabel: 'Open WhatsApp', ticket: 'MICRO-090-04' },
      'QR QR or Print Counter receipt without app installation ›': { type: 'terminal', note: 'Receipt QR and print-ready receipt prepared for the customer.', primaryLabel: 'View receipt', ticket: 'MICRO-090-05' }
    }
  };

  var registry = window.MoolPrototypeInteractionContracts || { screens: {} };
  if (!registry.screens) registry.screens = {};

  var match = window.location.pathname.match(/\/(\d{2,3})-[^/]+[.]html$/);
  if (!match) return;
  var screen = String(parseInt(match[1], 10));
  var contracts = Object.assign({}, registry.screens[screen] || {}, supplementalContracts[screen] || {});
  if (!Object.keys(contracts).length) return;

  var controlSelector = 'button, a, input, select, textarea, [role="button"], [role="tab"], [role="switch"]';

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function userMessage(contract, label) {
    var note = normalize(contract && contract.note);
    var generic = /(is selected|selected\.|details? (?:are|is) open|opened\. close|review the shown state|current screen state is preserved)/i.test(note);
    if (note && !generic) return note;
    if (contract.type === 'select' || contract.type === 'state' || contract.type === 'toggle') return label + ' applied.';
    if (contract.type === 'progress') return label + ' is ready for the next step. Review the information and continue when ready.';
    if (contract.type === 'handoff') return label + ' is ready to continue.';
    if (contract.type === 'terminal') return label + ' completed.';
    if (contract.type === 'detail') return label + ' information is available now.';
    return label + ' is ready.';
  }

  function panelMeta(contract) {
    if (contract.type === 'terminal') return ['Status', 'Complete'];
    if (contract.type === 'handoff') return ['Next step', 'Ready'];
    if (contract.type === 'progress') return ['Task', 'Ready to continue'];
    return ['Information', 'Available now'];
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
      '.mool-contract-sheet__actions button:last-child{background:#080b7d;color:#fff}',
      '.command-text.mool-command-input{width:100%;min-width:0;border:0!important;outline:0!important;padding:0!important;background:transparent!important;color:inherit!important;font:inherit!important;font-weight:inherit!important}',
      '.command-text.mool-command-input::placeholder{color:inherit;opacity:.82}'
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
    var meta = panelMeta(contract);
    backdrop.innerHTML = '<section class="mool-contract-sheet" role="dialog" aria-modal="true" aria-labelledby="mool-contract-title">' +
      '<div class="mool-contract-sheet__head"><h2 class="mool-contract-sheet__title" id="mool-contract-title"></h2><button class="mool-contract-sheet__close" type="button" aria-label="Close">×</button></div>' +
      '<div class="mool-contract-sheet__body"><p class="mool-contract-sheet__note"></p>' +
      '<div class="mool-contract-sheet__meta"><span></span><span></span></div>' +
      '<div class="mool-contract-sheet__actions"><button type="button" data-contract-retry></button><button type="button" data-contract-return></button></div></div></section>';
    backdrop.querySelector('#mool-contract-title').textContent = label;
    backdrop.querySelector('.mool-contract-sheet__note').textContent = userMessage(contract, label);
    var retryButton = backdrop.querySelector('[data-contract-retry]');
    var returnButton = backdrop.querySelector('[data-contract-return]');
    var metaCells = backdrop.querySelectorAll('.mool-contract-sheet__meta span');
    metaCells[0].textContent = meta[0];
    metaCells[1].textContent = meta[1];
    retryButton.textContent = 'Back';
    retryButton.hidden = !contract.route;
    returnButton.textContent = contract.primaryLabel || (contract.route ? 'Continue' : 'Done');
    function close() { backdrop.remove(); }
    backdrop.querySelector('.mool-contract-sheet__close').addEventListener('click', close);
    returnButton.addEventListener('click', function () {
      if (contract.route) window.location.href = preserveQuery(contract.route);
      else close();
    });
    retryButton.addEventListener('click', function () {
      close();
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

  function enhanceSearchInputs() {
    Array.prototype.forEach.call(document.querySelectorAll('.command-bar .command-text:not([data-command-text])'), function (prompt) {
      var label = normalize(prompt.textContent);
      var searchButton = prompt.parentElement && prompt.parentElement.querySelector('button[aria-label^="Search" i]');
      if (!searchButton || !/^Search\b/i.test(label)) return;
      var input = document.createElement('input');
      input.type = 'search';
      input.className = prompt.className + ' mool-command-input';
      input.placeholder = label;
      input.setAttribute('aria-label', label.replace(/[.]+$/, ''));
      input.setAttribute('autocomplete', 'off');
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          searchButton.click();
        }
      });
      prompt.replaceWith(input);
    });
  }

  ensureStyles();
  enhanceSearchInputs();
  markBound(document);
  document.addEventListener('click', function (event) {
    var element = event.target.closest && event.target.closest(controlSelector);
    if (!element) return;
    if (element.closest('.mool-contract-backdrop')) return;
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
