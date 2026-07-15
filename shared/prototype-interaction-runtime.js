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
    if (/proof/i.test(label)) return 'Review the submitted proof, linked task or order, amount, current status and available support action.';
    if (/receipt|bill|invoice/i.test(label)) return 'Review the itemised amount, payment status, reference and support options.';
    if (/voice/i.test(label)) return 'Choose a language, start voice guidance and review the captured request before continuing.';
    if (/call/i.test(label)) return 'Review the verified contact, then start or end the protected in-app call.';
    if (/share/i.test(label)) return 'Choose a destination, review the shared information and confirm the share action.';
    if (/file|photo|camera|gallery|upload/i.test(label)) return 'Choose a source, review the selected item and confirm before attaching it.';
    if (/status|history/i.test(label)) return 'Review the current status, recent timeline and the next available action.';
    if (contract.type === 'select' || contract.type === 'state' || contract.type === 'toggle') return label + ' is now the active choice.';
    if (contract.type === 'progress') return 'Review the requirements, timing and next action for ' + label + '.';
    if (contract.type === 'terminal') return 'Review the final details before confirming ' + label + '.';
    if (contract.type === 'detail') return 'Review ' + label + ' and choose the relevant next action.';
    return 'Review the available choices for ' + label + ' and continue.';
  }

  function panelMeta(contract) {
    if (contract.type === 'terminal') return ['Status', 'Complete'];
    if (contract.type === 'handoff') return ['Next step', 'Ready'];
    if (contract.type === 'progress') return ['Task', 'Ready to continue'];
    return ['Information', 'Available now'];
  }

  function referenceFor(label) {
    var value = String(screen) + ':' + label;
    var hash = 0;
    for (var i = 0; i < value.length; i += 1) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    return 'MS-' + String(screen).padStart(3, '0') + '-' + String(Math.abs(hash) % 100000).padStart(5, '0');
  }

  function workflowFor(contract, label) {
    var lower = label.toLowerCase();
    var workflow = {
      kind: contract.type,
      note: userMessage(contract, label),
      options: [],
      fields: [],
      primary: contract.primaryLabel || (contract.route ? 'Continue' : 'Review'),
      initial: 'Choose an option to continue.',
      complete: label + ' is complete.',
      reference: referenceFor(label)
    };

    if (/\bsearch\b/.test(lower) && !/\bvoice\b/.test(lower)) {
      workflow.kind = 'search';
      workflow.fields = [{ label: 'Search query', type: 'search', placeholder: 'Type what you want to find' }];
      workflow.options = ['All results', 'Nearby', 'Recent'];
      workflow.primary = 'Show results';
      workflow.initial = 'Type a query. No search has run yet.';
      workflow.complete = 'Verified matching results are shown for your query.';
    } else if (/^schedule(?:\b|$)/.test(lower)) {
      workflow.kind = 'schedule';
      workflow.fields = [
        { label: 'Date', type: 'date', placeholder: '' },
        { label: 'Time', type: 'time', placeholder: '' }
      ];
      workflow.options = ['Use local time', 'Add reminder'];
      workflow.primary = 'Confirm schedule';
      workflow.initial = 'Choose a date and time. Nothing is scheduled yet.';
      workflow.complete = label + ' is scheduled for the selected date and time.';
    } else if (/accountant/.test(lower)) {
      workflow.kind = 'access';
      workflow.fields = [{ label: 'Accountant email', type: 'email', placeholder: 'accountant@example.com' }];
      workflow.options = ['Read-only books', '7-day access', 'Include stock statement', 'Require sign-in'];
      workflow.primary = 'Grant secure access';
      workflow.initial = 'No accountant has access. Choose the records and expiry before granting access.';
      workflow.complete = 'Read-only accountant access is active for 7 days with audit history enabled.';
    } else if (/share/.test(lower)) {
      workflow.kind = 'share';
      workflow.options = ['Chat', 'Copy secure link', 'QR code', 'More apps'];
      workflow.primary = 'Share now';
      workflow.initial = 'No destination selected.';
      workflow.complete = 'Share prepared with the current item and verified source context.';
    } else if (/video call|call/.test(lower)) {
      workflow.kind = 'call';
      workflow.options = ['In-app audio', 'Speaker', 'Mute'];
      workflow.primary = /video/.test(lower) ? 'Start video call' : 'Start call';
      workflow.initial = 'Protected calling is ready. No call has started.';
      workflow.complete = 'Protected call connected to the verified contact.';
    } else if (/voice/.test(lower)) {
      workflow.kind = 'voice';
      workflow.options = ['Hindi', 'English', 'Marwari'];
      workflow.primary = 'Start listening';
      workflow.initial = 'Microphone is off. Choose a language before speaking.';
      workflow.complete = 'Voice request captured: “Help me continue this task.”';
    } else if (/scan|qr/.test(lower)) {
      workflow.kind = 'scan';
      workflow.options = ['Scan with camera', 'Enter code'];
      workflow.primary = 'Start scanner';
      workflow.initial = 'Camera is off. You can also enter the code manually.';
      workflow.complete = 'Sample verified code detected and ready to use.';
    } else if (/file|photo|camera|gallery|upload|document/.test(lower)) {
      workflow.kind = 'attachment';
      workflow.options = ['Camera', 'Gallery', 'Files'];
      workflow.primary = 'Choose sample item';
      workflow.initial = 'Nothing is attached. The selected item will be reviewed before sending.';
      workflow.complete = 'sample-proof.jpg · 1.2 MB is attached and ready to send.';
    } else if (/location|map|direction/.test(lower)) {
      workflow.kind = 'location';
      workflow.options = ['Current location', 'Choose on map'];
      workflow.primary = 'Confirm location';
      workflow.initial = 'No location is shared until you confirm.';
      workflow.complete = 'Sardarpura, Jodhpur is confirmed for this action.';
    } else if (/download|export|pdf|csv|print|statement/.test(lower)) {
      workflow.kind = 'file';
      workflow.options = [/csv/.test(lower) ? 'CSV' : 'PDF', 'Date range', 'Share securely'];
      workflow.primary = 'Prepare file';
      workflow.initial = 'Choose the format and reporting period.';
      workflow.complete = label + ' is prepared with the selected period and access controls.';
    } else if (/proof|receipt|bill|invoice|amount|payment/.test(lower) && contract.type === 'detail') {
      workflow.kind = 'detail';
      workflow.options = ['Summary', 'Amounts', 'Status', 'Support'];
      workflow.primary = 'Done';
      workflow.initial = 'Choose a section to review.';
    } else if (/comment|reply/.test(lower)) {
      workflow.kind = 'discussion';
      workflow.options = ['Top comments', 'Newest', 'Write reply'];
      workflow.fields = [{ label: 'Reply', type: 'text', placeholder: 'Write a reply' }];
      workflow.primary = 'Post reply';
      workflow.initial = 'Read the discussion or write a reply.';
      workflow.complete = 'Your reply is added to this discussion.';
    } else if (/more|manage|setting|control/.test(lower)) {
      workflow.kind = 'detail';
      workflow.options = ['View details', 'Save', 'Report issue', 'Cancel'];
      workflow.primary = 'Done';
      workflow.initial = 'Choose the action you want to complete.';
    } else if (/status|history|track|timeline/.test(lower)) {
      workflow.kind = 'detail';
      workflow.options = ['Current status', 'Timeline', 'Get help'];
      workflow.primary = 'Done';
      workflow.initial = 'Choose what you want to review.';
    } else if (/plan|pricing|term|rule|eligib|details?|review|open|view/.test(lower) || contract.type === 'detail') {
      workflow.kind = 'detail';
      workflow.options = ['Overview', 'Included', 'Rules', 'Next action'];
      workflow.primary = 'Done';
      workflow.initial = 'Choose a section to review.';
    } else if (contract.type === 'progress') {
      workflow.kind = 'progress';
      workflow.options = ['Requirements', 'Timing', 'Support'];
      workflow.primary = contract.primaryLabel || 'Continue';
      workflow.initial = 'Review the requirements before continuing.';
      workflow.complete = label + ' is ready for the next required step.';
    } else if (contract.type === 'terminal') {
      workflow.kind = 'terminal';
      workflow.options = ['Summary', 'Terms', 'Support'];
      workflow.primary = contract.primaryLabel || 'Confirm';
      workflow.initial = 'Nothing has been submitted yet. Review before confirming.';
      workflow.complete = label + ' completed successfully.';
    } else if (contract.type === 'handoff') {
      workflow.kind = 'handoff';
      workflow.options = ['Review details', 'Continue securely'];
      workflow.primary = contract.primaryLabel || 'Continue';
      workflow.initial = 'Review the handoff details before continuing.';
      workflow.complete = label + ' is ready in the protected next step.';
    }
    return workflow;
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
      '.mool-intent-selected{outline:2px solid #ff9933!important;outline-offset:2px!important;box-shadow:0 0 0 4px rgba(255,153,51,.18)!important}',
      '.mool-intent-inline-status{display:block;width:100%;margin-top:8px;padding:9px 10px;border-left:3px solid #138808;border-radius:5px;background:#eef9f0;color:#063e20;font:700 12px/1.35 system-ui,sans-serif}',
      '.mool-contract-toast{position:fixed;left:50%;bottom:max(92px,calc(env(safe-area-inset-bottom) + 76px));transform:translateX(-50%);z-index:2147483646;max-width:min(340px,calc(100vw - 32px));padding:10px 14px;border-radius:8px;background:#07134f;color:#fff;font:700 13px/1.35 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.28);text-align:center}',
      '.mool-intent-flow-backdrop{position:fixed;inset:0;z-index:2147483645;background:rgba(2,8,50,.54);display:flex;align-items:flex-end;justify-content:center;padding:14px}',
      '.mool-intent-flow{width:min(430px,100%);max-height:min(78vh,640px);overflow:auto;border:1px solid #cbd2f2;border-radius:10px;background:#fff;color:#080b7d;box-shadow:0 24px 70px rgba(0,0,0,.3);font-family:system-ui,sans-serif}',
      '.mool-intent-flow__head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:17px 18px 10px}',
      '.mool-intent-flow__title{margin:0;font-size:19px;line-height:1.2;letter-spacing:0}',
      '.mool-intent-flow__close{width:40px;height:40px;flex:0 0 40px;border:1px solid #d6daf0;border-radius:50%;background:#f7f8ff;color:#080b7d;font-size:24px;line-height:1;cursor:pointer}',
      '.mool-intent-flow__body{padding:0 18px 18px;font-size:14px;line-height:1.45}',
      '.mool-intent-flow__note{margin:0 0 12px;color:#20245f}',
      '.mool-intent-flow__fields{display:grid;gap:8px;margin:12px 0}',
      '.mool-intent-flow__field{display:grid;gap:5px;color:#20245f;font-size:12px;font-weight:800}',
      '.mool-intent-flow__field input,.mool-intent-flow__field textarea{width:100%;min-height:44px;box-sizing:border-box;border:1px solid #cbd2f2;border-radius:7px;padding:9px 10px;background:#fff;color:#11144f;font:600 14px/1.3 system-ui,sans-serif}',
      '.mool-intent-flow__options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}',
      '.mool-intent-flow__option{min-height:46px;padding:9px;border:1px solid #cbd2f2;border-radius:7px;background:#f7f8ff;color:#080b7d;font-weight:800;cursor:pointer}',
      '.mool-intent-flow__option[aria-pressed="true"]{border-color:#ff9933;background:#fff3e2;box-shadow:inset 0 -3px 0 #ff9933}',
      '.mool-intent-flow__result{min-height:44px;padding:10px;border-left:4px solid #138808;border-radius:5px;background:#eef9f0;color:#063e20;font-weight:750}',
      '.mool-intent-flow__reference{display:block;margin-top:4px;color:#4d527e;font-size:11px}',
      '.mool-intent-flow__actions{display:flex;gap:10px;margin-top:16px}',
      '.mool-intent-flow__actions button{min-height:46px;flex:1;border-radius:7px;border:1px solid #080b7d;background:#fff;color:#080b7d;font-weight:800;cursor:pointer}',
      '.mool-intent-flow__actions button:last-child{background:#080b7d;color:#fff}',
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
      Array.prototype.forEach.call(parent.querySelectorAll('.mool-intent-selected'), function (sibling) {
        if (sibling !== element) {
          sibling.classList.remove('mool-intent-selected');
          sibling.setAttribute('aria-pressed', 'false');
        }
      });
    }
    element.classList.add('mool-intent-selected');
    element.setAttribute('aria-pressed', 'true');
    var statusHost = parent || element;
    var status = statusHost.querySelector && statusHost.querySelector(':scope > .mool-intent-inline-status');
    if (!status) {
      status = document.createElement('span');
      status.className = 'mool-intent-inline-status';
      status.setAttribute('role', 'status');
      statusHost.appendChild(status);
    }
    status.textContent = /^(all|recent|today|this week|nearby|live)$/i.test(label) ? 'Showing ' + label.toLowerCase() + ' results.' : userMessage(contract, label);
  }

  function toggleControl(element, label) {
    var active = element.classList.toggle('mool-intent-selected');
    element.setAttribute('aria-pressed', String(active));
    var parent = element.parentElement || element;
    var status = parent.querySelector && parent.querySelector(':scope > .mool-intent-inline-status');
    if (!status) {
      status = document.createElement('span');
      status.className = 'mool-intent-inline-status';
      status.setAttribute('role', 'status');
      parent.appendChild(status);
    }
    status.textContent = label + (active ? ' is active for this item.' : ' was removed from this item.');
  }

  function openSheet(contract, label) {
    var existing = document.querySelector('.mool-intent-flow-backdrop,.mool-contract-backdrop');
    if (existing) existing.remove();
    var workflow = workflowFor(contract, label);
    var backdrop = document.createElement('div');
    backdrop.className = 'mool-intent-flow-backdrop';
    backdrop.dataset.functionalIntent = workflow.kind;
    backdrop.setAttribute('role', 'presentation');
    backdrop.innerHTML = '<section class="mool-intent-flow" role="dialog" aria-modal="true" aria-labelledby="mool-intent-flow-title">' +
      '<div class="mool-intent-flow__head"><h2 class="mool-intent-flow__title" id="mool-intent-flow-title"></h2><button class="mool-intent-flow__close" type="button" aria-label="Close action">×</button></div>' +
      '<div class="mool-intent-flow__body"><p class="mool-intent-flow__note"></p>' +
      '<div class="mool-intent-flow__fields"></div>' +
      '<div class="mool-intent-flow__options" aria-label="Available choices"></div>' +
      '<div class="mool-intent-flow__result" role="status"></div>' +
      '<span class="mool-intent-flow__reference"></span>' +
      '<div class="mool-intent-flow__actions"><button type="button" data-intent-back>Cancel</button><button type="button" data-intent-primary></button></div></div></section>';
    backdrop.querySelector('#mool-intent-flow-title').textContent = label;
    backdrop.querySelector('.mool-intent-flow__note').textContent = workflow.note;
    var fieldsHost = backdrop.querySelector('.mool-intent-flow__fields');
    var optionsHost = backdrop.querySelector('.mool-intent-flow__options');
    var result = backdrop.querySelector('.mool-intent-flow__result');
    var reference = backdrop.querySelector('.mool-intent-flow__reference');
    var backButton = backdrop.querySelector('[data-intent-back]');
    var primaryButton = backdrop.querySelector('[data-intent-primary]');
    var selectedOption = '';
    var stage = 0;
    workflow.fields.forEach(function (field, index) {
      var wrapper = document.createElement('label');
      wrapper.className = 'mool-intent-flow__field';
      wrapper.textContent = field.label;
      var input = document.createElement('input');
      input.type = field.type;
      input.placeholder = field.placeholder || '';
      input.setAttribute('aria-label', field.label + ' for ' + label);
      input.dataset.intentField = String(index);
      wrapper.appendChild(input);
      fieldsHost.appendChild(wrapper);
    });
    if (!workflow.fields.length) fieldsHost.hidden = true;
    workflow.options.forEach(function (option) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'mool-intent-flow__option';
      button.textContent = option;
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', function () {
        Array.prototype.forEach.call(optionsHost.querySelectorAll('button'), function (item) { item.setAttribute('aria-pressed', String(item === button)); });
        selectedOption = option;
        result.textContent = option + ' selected for ' + label + '. Review and continue.';
      });
      optionsHost.appendChild(button);
    });
    if (!workflow.options.length) optionsHost.hidden = true;
    result.textContent = workflow.initial;
    reference.textContent = 'Reference will be created after confirmation.';
    primaryButton.textContent = workflow.primary;
    function close() { backdrop.remove(); }
    backdrop.querySelector('.mool-intent-flow__close').addEventListener('click', close);
    primaryButton.addEventListener('click', function () {
      if (contract.route) {
        window.location.href = preserveQuery(contract.route);
        return;
      }
      if (stage >= 2 || (workflow.kind === 'detail' && stage >= 1)) {
        close();
        return;
      }
      if (workflow.options.length && !selectedOption) {
        selectedOption = workflow.options[0];
        var first = optionsHost.querySelector('button');
        if (first) first.setAttribute('aria-pressed', 'true');
      }
      var fieldValues = Array.prototype.map.call(fieldsHost.querySelectorAll('input,textarea'), function (field) { return field.value.trim(); });
      if (workflow.kind === 'search' && !fieldValues[0]) {
        result.textContent = 'Type a search query before showing results.';
        fieldsHost.querySelector('input')?.focus();
        return;
      }
      if (workflow.kind === 'schedule' && fieldValues.some(function (value) { return !value; })) {
        result.textContent = 'Choose both a date and time before confirming the schedule.';
        return;
      }
      if (workflow.kind === 'discussion' && !fieldValues[0]) {
        result.textContent = 'Write a reply before posting.';
        fieldsHost.querySelector('input,textarea')?.focus();
        return;
      }
      stage += 1;
      if (workflow.kind === 'call' && stage === 1) {
        result.textContent = workflow.complete;
        reference.textContent = 'Protected session · ' + workflow.reference;
        primaryButton.textContent = 'End call';
        return;
      }
      if (workflow.kind === 'call' && stage === 2) {
        result.textContent = 'Call ended. No recording was saved.';
        primaryButton.textContent = 'Done';
        return;
      }
      result.textContent = workflow.complete + (fieldValues.length ? ' ' + fieldValues.join(' · ') + '.' : '') + (selectedOption ? ' Choice: ' + selectedOption + '.' : '');
      reference.textContent = 'Reference ' + workflow.reference + ' · Saved in this activity';
      primaryButton.textContent = workflow.kind === 'detail' ? 'Done' : (stage === 1 ? 'View result' : 'Done');
      if (stage === 1 && workflow.kind === 'detail') stage = 1;
    });
    backButton.addEventListener('click', close);
    backdrop.addEventListener('click', function (event) { if (event.target === backdrop) close(); });
    document.body.appendChild(backdrop);
    backdrop.querySelector('.mool-intent-flow__close').focus();
  }

  function runContract(event, element, label, contract) {
    if (element.hasAttribute('data-native-interaction')) return;
    if (contract.type === 'native') return;
    if (/^(like|save|saved|follow|following|bookmark|subscribe|mute|favourite|favorite)$/i.test(label)) {
      event.preventDefault();
      event.stopPropagation();
      toggleControl(element, label.replace(/ing$|d$/i, ''));
      return;
    }
    if (/^remix$/i.test(label)) {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = preserveQuery('08-social-create.html?mode=short&source=remix');
      return;
    }
    if (/^schedule(?:\b|$)/i.test(label)) {
      event.preventDefault();
      event.stopPropagation();
      openSheet(Object.assign({}, contract, { type: 'progress' }), label);
      return;
    }
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
    if (element.closest('.mool-contract-backdrop,.mool-intent-flow-backdrop')) return;
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
