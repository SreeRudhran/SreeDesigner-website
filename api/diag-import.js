module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const shortcode = req.query.code || 'DWVmIxCE_lP';
  const diag = { shortcode, timestamp: new Date().toISOString() };

  // Test 1: VxInstagram fetch
  try {
    const t0 = Date.now();
    const vxRes = await fetch(`https://vxinstagram.com/p/${shortcode}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    diag.vx_time_ms = Date.now() - t0;
    diag.vx_status = vxRes.status;
    diag.vx_statusText = vxRes.statusText;
    const html = await vxRes.text();
    diag.vx_html_len = html.length;
    diag.vx_html_sample = html.slice(0, 300);
    const dlMatches = [...html.matchAll(/href="(https:\/\/[^"]*?(?:cdninstagram\.com|fbcdn\.net)[^"]*?)"\s+download/gi)].map(m => m[1]);
    diag.vx_download_matches = dlMatches.length;
  } catch (err) {
    diag.vx_error = err.message;
  }

  // Test 2: VxInstagram offload probe
  try {
    const t0 = Date.now();
    const offRes = await fetch(`https://vxinstagram.com/offload/${shortcode}/0`, {
      method: 'HEAD',
      redirect: 'manual',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    diag.offload_time_ms = Date.now() - t0;
    diag.offload_status = offRes.status;
    diag.offload_loc = offRes.headers.get('location');
  } catch (err) {
    diag.offload_error = err.message;
  }

  return res.status(200).json(diag);
};
