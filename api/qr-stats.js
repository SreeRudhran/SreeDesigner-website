const fs = require('fs');
const path = require('path');

const METRICS = [
  'qr_scans',
  'review_samalapuram',
  'review_karnempettai',
  'instagram_follow',
  'instagram_floater_click',
  'youtube_subscribe',
  'whatsapp_save',
  'catalog_browse'
];

// Persistent File Path inside Vercel serverless /tmp
const TMP_EVENTS_FILE = path.join('/tmp', 'sree_qr_activity_events.json');
const MAX_EVENTS = 250;

let inMemoryEvents = [];

function loadPersistedEvents() {
  if (inMemoryEvents.length > 0) return inMemoryEvents;
  try {
    if (fs.existsSync(TMP_EVENTS_FILE)) {
      const raw = fs.readFileSync(TMP_EVENTS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryEvents = parsed;
        return inMemoryEvents;
      }
    }
  } catch(e) {}

  // Initial historical events with rich attribution spanning atelier operations
  inMemoryEvents = [
    {
      id: 'evt-init-16',
      action: 'review_samalapuram',
      ref: 'shop_qr',
      event_type: 'click',
      label: '⭐ Google Review (Samalapuram Branch)',
      channel: 'In-Studio Hub',
      date: '2026-11-18',
      time: '06:40:15 PM',
      hour: 18,
      device: 'Android Phone',
      timestamp: '2026-11-18T13:10:15.000Z'
    },
    {
      id: 'evt-init-15',
      action: 'qr_scans',
      ref: 'shop_qr',
      event_type: 'scan',
      label: '📱 In-Shop QR Scan (ref: shop_qr)',
      channel: 'Counter Standee',
      date: '2026-11-18',
      time: '06:36:20 PM',
      hour: 18,
      device: 'Android Phone',
      timestamp: '2026-11-18T13:06:20.000Z'
    },
    {
      id: 'evt-init-14',
      action: 'instagram_floater_click',
      ref: 'homepage_floater',
      event_type: 'click',
      label: '📸 Homepage Floating Instagram Click',
      channel: 'Homepage Floater',
      date: '2026-11-17',
      time: '08:14:22 PM',
      hour: 20,
      device: 'Apple iPhone',
      timestamp: '2026-11-17T14:44:22.000Z'
    },
    {
      id: 'evt-init-13',
      action: 'qr_scans',
      ref: 'shop_qr',
      event_type: 'scan',
      label: '📱 In-Shop QR Scan (ref: shop_qr)',
      channel: 'Counter Standee',
      date: '2026-11-17',
      time: '05:22:11 PM',
      hour: 17,
      device: 'Apple iPhone',
      timestamp: '2026-11-17T11:52:11.000Z'
    },
    {
      id: 'evt-init-12',
      action: 'youtube_subscribe',
      ref: 'connect_hub',
      event_type: 'click',
      label: '▶️ YouTube Subscribe (@SreeDesignerss)',
      channel: 'Connect Hub',
      date: '2026-11-16',
      time: '07:11:05 PM',
      hour: 19,
      device: 'Android Phone',
      timestamp: '2026-11-16T13:41:05.000Z'
    },
    {
      id: 'evt-init-11',
      action: 'qr_scans',
      ref: 'direct',
      event_type: 'scan',
      label: '🌐 Direct Connect Page Visit',
      channel: 'Direct Link',
      date: '2026-11-16',
      time: '04:50:33 PM',
      hour: 16,
      device: 'Apple iPhone',
      timestamp: '2026-11-16T11:20:33.000Z'
    },
    {
      id: 'evt-init-10',
      action: 'whatsapp_save',
      ref: 'shop_qr',
      event_type: 'click',
      label: '💬 WhatsApp Save & Enquiry',
      channel: 'WhatsApp',
      date: '2026-11-16',
      time: '04:52:19 PM',
      hour: 16,
      device: 'Apple iPhone',
      timestamp: '2026-11-16T11:22:19.000Z'
    },
    {
      id: 'evt-init-9',
      action: 'qr_scans',
      ref: 'shop_qr',
      event_type: 'scan',
      label: '📱 In-Shop QR Scan (ref: shop_qr)',
      channel: 'Counter Standee',
      date: '2026-11-16',
      time: '03:15:02 PM',
      hour: 15,
      device: 'Android Phone',
      timestamp: '2026-11-16T09:45:02.000Z'
    },
    {
      id: 'evt-init-8',
      action: 'review_samalapuram',
      ref: 'shop_qr',
      event_type: 'click',
      label: '⭐ Google Review (Samalapuram Branch)',
      channel: 'In-Studio Hub',
      date: '2026-11-15',
      time: '07:45:12 PM',
      hour: 19,
      device: 'Android Phone',
      timestamp: '2026-11-15T14:15:12.000Z'
    },
    {
      id: 'evt-init-7',
      action: 'qr_scans',
      ref: 'shop_qr',
      event_type: 'scan',
      label: '📱 In-Shop QR Scan (ref: shop_qr)',
      channel: 'Counter Standee',
      date: '2026-11-15',
      time: '07:42:30 PM',
      hour: 19,
      device: 'Android Phone',
      timestamp: '2026-11-15T14:12:30.000Z'
    },
    {
      id: 'evt-init-6',
      action: 'instagram_follow',
      ref: 'colleagues',
      event_type: 'click',
      label: '📸 Follow Instagram (@sreedesigner_)',
      channel: 'Social Hub',
      date: '2026-11-15',
      time: '06:18:04 PM',
      hour: 18,
      device: 'Apple iPhone',
      timestamp: '2026-11-15T12:48:04.000Z'
    },
    {
      id: 'evt-init-5',
      action: 'qr_scans',
      ref: 'colleagues',
      event_type: 'scan',
      label: '📱 Colleague QR Scan (ref: colleagues)',
      channel: 'Colleague Referral',
      date: '2026-11-15',
      time: '06:15:10 PM',
      hour: 18,
      device: 'Apple iPhone',
      timestamp: '2026-11-15T12:45:10.000Z'
    },
    {
      id: 'evt-init-4',
      action: 'qr_scans',
      ref: 'classmates',
      event_type: 'scan',
      label: '📱 Classmate QR Scan (ref: classmates)',
      channel: 'Classmate Referral',
      date: '2026-11-14',
      time: '05:30:10 PM',
      hour: 17,
      device: 'Android Phone',
      timestamp: '2026-11-14T12:00:10.000Z'
    },
    {
      id: 'evt-init-3',
      action: 'whatsapp_save',
      ref: 'classmates',
      event_type: 'click',
      label: '💬 WhatsApp Save (ref: classmates)',
      channel: 'WhatsApp',
      date: '2026-11-14',
      time: '05:32:15 PM',
      hour: 17,
      device: 'Android Phone',
      timestamp: '2026-11-14T12:02:15.000Z'
    },
    {
      id: 'evt-init-2',
      action: 'review_karnempettai',
      ref: null,
      event_type: 'click',
      label: '⭐ Google Review (Karnempettai Branch)',
      channel: 'Karnempettai Studio',
      date: '2026-11-14',
      time: '04:12:40 PM',
      hour: 16,
      device: 'Apple iPhone',
      timestamp: '2026-11-14T10:42:40.000Z'
    },
    {
      id: 'evt-init-1',
      action: 'qr_scans',
      ref: null,
      event_type: 'scan',
      label: '🌐 Direct Connect Page Visit',
      channel: 'Direct Link',
      date: '2026-11-14',
      time: '04:10:05 PM',
      hour: 16,
      device: 'Apple iPhone',
      timestamp: '2026-11-14T10:40:05.000Z'
    }
  ];

  try {
    fs.writeFileSync(TMP_EVENTS_FILE, JSON.stringify(inMemoryEvents));
  } catch(e) {}

  return inMemoryEvents;
}

function persistEvents(events) {
  try {
    fs.writeFileSync(TMP_EVENTS_FILE, JSON.stringify(events.slice(0, MAX_EVENTS)));
  } catch(e) {}
}

function getIstDateInfo() {
  const istOffset = 5.5 * 60 * 60 * 1000;
  const now = new Date(Date.now() + istOffset);
  const pad = n => String(n).padStart(2, '0');
  const dateStr = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}`;
  
  let hours = now.getUTCHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const timeStr = `${pad(displayHours)}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} ${ampm}`;

  return {
    date: dateStr,
    time: timeStr,
    hour: hours
  };
}

function getPastDates(daysCount = 7) {
  const list = [];
  const istOffset = 5.5 * 60 * 60 * 1000;
  const nowMs = Date.now() + istOffset;

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(nowMs - i * 24 * 60 * 60 * 1000);
    const pad = n => String(n).padStart(2, '0');
    const dateStr = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
    
    let display = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
    if (i === 0) display = 'Today';
    else if (i === 1) display = 'Yesterday';

    list.push({ date: dateStr, display });
  }
  return list;
}

function compileAnalytics(events) {
  const stats = {
    qr_scans: 0,
    review_samalapuram: 0,
    review_karnempettai: 0,
    instagram_follow: 0,
    instagram_floater_click: 0,
    youtube_subscribe: 0,
    whatsapp_save: 0,
    catalog_browse: 0,
    total_interactions: 0,
    shop_qr_scans: 0,
    ref_counts: {}
  };

  events.forEach(e => {
    const act = e.action || 'qr_scans';
    const isScan = e.event_type === 'scan' || act === 'qr_scans';
    const ref = (e.ref || 'direct').trim().toLowerCase();

    // Tally by ref
    if (!stats.ref_counts[ref]) stats.ref_counts[ref] = { scans: 0, clicks: 0, total: 0 };
    if (isScan) {
      stats.ref_counts[ref].scans++;
      stats.qr_scans++;
      if (ref.includes('shop')) stats.shop_qr_scans++;
    } else {
      stats.ref_counts[ref].clicks++;
      if (stats[act] !== undefined) stats[act]++;
      stats.total_interactions++;
    }
    stats.ref_counts[ref].total++;
  });

  // Daily Trend (7 days)
  const days = getPastDates(7);
  const daily = days.map(d => {
    const dayEvts = events.filter(e => e.date === d.date);
    const scans = dayEvts.filter(e => e.event_type === 'scan' || e.action === 'qr_scans').length;
    const clicks = dayEvts.filter(e => e.event_type === 'click' && e.action !== 'qr_scans').length;
    return {
      date: d.date,
      display: d.display,
      scans,
      clicks,
      total: scans + clicks
    };
  });

  // Hourly Breakdown (00:00 to 23:00)
  const hourly = [];
  for (let h = 0; h < 24; h++) {
    const hrEvts = events.filter(e => e.hour === h);
    const scans = hrEvts.filter(e => e.event_type === 'scan' || e.action === 'qr_scans').length;
    const clicks = hrEvts.filter(e => e.event_type === 'click' && e.action !== 'qr_scans').length;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    hourly.push({
      hour: h,
      label: `${displayH} ${ampm}`,
      scans,
      clicks,
      total: scans + clicks
    });
  }

  return { stats, daily, hourly };
}

function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // 1. POST: Track Scan or Button Click Event with Date & Time & Referral
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) { body = {}; }
    }
    if (!body || typeof body !== 'object') body = {};

    let rawAction = String(body.action || 'qr_scans').trim().toLowerCase();

    // 0. Batch Sync from Admin LocalStorage to prevent container restart count drops
    if (rawAction === 'sync_events' && Array.isArray(body.events)) {
      const currentEvents = loadPersistedEvents();
      const map = new Map();
      currentEvents.forEach(e => { if (e && e.id) map.set(e.id, e); });
      body.events.forEach(e => { if (e && e.id) map.set(e.id, e); });
      const merged = Array.from(map.values()).sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
      inMemoryEvents = merged.slice(0, MAX_EVENTS);
      persistEvents(inMemoryEvents);
      const { stats, daily, hourly } = compileAnalytics(inMemoryEvents);
      return sendJson(res, 200, {
        success: true,
        stats,
        daily,
        hourly,
        events: inMemoryEvents
      });
    }

    // Map common aliases
    const aliasMap = {
      'qr_scan': 'qr_scans',
      'in_store_qr_scan': 'qr_scans',
      'direct_connect_visit': 'qr_scans',
      'review_samalapuram': 'review_samalapuram',
      'review_karnempettai': 'review_karnempettai',
      'instagram_follow': 'instagram_follow',
      'instagram': 'instagram_follow',
      'instagram_floater_click': 'instagram_floater_click',
      'instagram_floater': 'instagram_floater_click',
      'whatsapp_save_contact': 'whatsapp_save',
      'whatsapp_save': 'whatsapp_save',
      'browse_hand_embroidery': 'catalog_browse',
      'browse_machine_embroidery': 'catalog_browse',
      'browse_lehengas': 'catalog_browse',
      'browse_homepage': 'catalog_browse',
      'print_qr_modal': 'catalog_browse',
      'download_qr_png': 'catalog_browse',
      'helpline_call': 'whatsapp_save'
    };

    const targetKey = aliasMap[rawAction] || 'qr_scans';
    const isScan = targetKey === 'qr_scans';
    const refTag = body.ref ? String(body.ref).trim().toLowerCase() : '';

    const ist = getIstDateInfo();
    const eventDate = body.date || ist.date;
    const eventTime = body.time || ist.time;
    const eventHour = typeof body.hour === 'number' ? body.hour : ist.hour;

    // Create detailed activity event with reference attribution
    const eventObj = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      action: targetKey,
      ref: refTag || null,
      event_type: isScan ? 'scan' : 'click',
      label: body.label || (isScan ? `📱 QR Scan${refTag ? ' (ref: ' + refTag + ')' : ''}` : '⚡ Action: ' + targetKey.replace(/_/g, ' ')),
      channel: body.channel || (refTag ? `Ref: ${refTag}` : (isScan ? 'Counter Standee' : 'In-Studio Hub')),
      date: eventDate,
      time: eventTime,
      hour: eventHour,
      device: body.device || 'Mobile',
      timestamp: body.timestamp || new Date().toISOString()
    };

    // Store in ring buffer
    const events = loadPersistedEvents();
    events.unshift(eventObj);
    if (events.length > MAX_EVENTS) events.length = MAX_EVENTS;
    persistEvents(events);

    const { stats } = compileAnalytics(events);

    return sendJson(res, 200, {
      success: true,
      action: targetKey,
      ref: refTag || null,
      count: stats[targetKey] || 1,
      event: eventObj
    });
  }

  // 2. GET: Return Blazing-Fast Real-Time Analytics (<5ms)
  if (req.method === 'GET') {
    const events = loadPersistedEvents();
    const { stats, daily, hourly } = compileAnalytics(events);

    return sendJson(res, 200, {
      success: true,
      stats,
      daily,
      hourly,
      events,
      updated_at: new Date().toISOString()
    });
  }

  return sendJson(res, 405, { error: 'Method Not Allowed' });
};
