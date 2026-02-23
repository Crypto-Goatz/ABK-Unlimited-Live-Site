/**
 * Wire up final CRM integrations:
 * 1. Push NEXT_PUBLIC_CRM_CHAT_WIDGET_ID to Vercel
 * 2. Register CRM webhook URL
 */
import https from 'https';

const VERCEL_TOKEN = 'cQHHaQsoyRBOchZmcSLqf4YK';
const PROJECT_ID = 'prj_KCBoQ8ZTgzMH3M8mHbPHQImxAyA8';
const TEAM_ID = 'team_VtbfSzhDgB6OwglLfuPDFcd2';

const CRM_API_KEY = process.env.CRM_API_KEY;
const CRM_LOCATION_ID = '497AdD39erWgmOu8JTCw';
const WEBHOOK_URL = 'https://abkunlimited.com/api/webhooks/crm';

function vercelApi(method, path, body) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.vercel.com',
      path: path + (path.includes('?') ? '&' : '?') + `teamId=${TEAM_ID}`,
      method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, r => {
      let b = '';
      r.on('data', d => b += d);
      r.on('end', () => {
        try { resolve({ status: r.statusCode, data: JSON.parse(b) }); }
        catch(e) { resolve({ status: r.statusCode, data: b }); }
      });
    });
    if (data) req.write(data);
    req.end();
  });
}

function crmApi(method, path, body) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'services.leadconnectorhq.com',
      path: path,
      method,
      headers: {
        'Authorization': `Bearer ${CRM_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, r => {
      let b = '';
      r.on('data', d => b += d);
      r.on('end', () => {
        try { resolve({ status: r.statusCode, data: JSON.parse(b) }); }
        catch(e) { resolve({ status: r.statusCode, data: b }); }
      });
    });
    if (data) req.write(data);
    req.end();
  });
}

async function run() {
  console.log('=== WIRING FINAL CRM INTEGRATIONS ===\n');

  // 1. Push chat widget ID to Vercel
  console.log('1. Pushing NEXT_PUBLIC_CRM_CHAT_WIDGET_ID to Vercel...');
  const r = await vercelApi('POST', `/v10/projects/${PROJECT_ID}/env`, {
    key: 'NEXT_PUBLIC_CRM_CHAT_WIDGET_ID',
    value: CRM_LOCATION_ID,
    target: ['production', 'preview', 'development'],
    type: 'plain'
  });
  console.log(`   ${r.status === 200 || r.status === 201 ? 'OK' : r.status + ': ' + JSON.stringify(r.data).slice(0, 200)}`);

  // 2. Register CRM webhook (if API key available)
  if (CRM_API_KEY) {
    console.log('\n2. Registering CRM webhook...');
    console.log(`   URL: ${WEBHOOK_URL}`);

    // Try to create webhook
    const wh = await crmApi('POST', `/webhooks/`, {
      locationId: CRM_LOCATION_ID,
      url: WEBHOOK_URL,
      events: ['ContactCreate', 'ContactUpdate', 'ContactTagUpdate']
    });

    if (wh.status >= 200 && wh.status < 300) {
      console.log('   Webhook registered!');
      console.log('   Response:', JSON.stringify(wh.data).slice(0, 200));
    } else {
      console.log(`   Webhook registration: ${wh.status}`);
      console.log('   Response:', JSON.stringify(wh.data).slice(0, 300));
      console.log('\n   Note: Webhook may need to be registered manually in CRM Settings > Webhooks');
      console.log(`   URL: ${WEBHOOK_URL}`);
      console.log('   Events: ContactCreate, ContactUpdate, ContactTagUpdate');
    }
  } else {
    console.log('\n2. CRM_API_KEY not in environment — skipping webhook registration');
    console.log('   Register manually in CRM Settings > Webhooks:');
    console.log(`   URL: ${WEBHOOK_URL}`);
    console.log('   Events: ContactCreate, ContactUpdate, ContactTagUpdate');
  }

  // 3. Final env var count
  console.log('\n3. Final env var audit...');
  const envData = await vercelApi('GET', `/v9/projects/${PROJECT_ID}/env`);
  const keys = [...new Set(envData.data.envs.map(e => e.key))].sort();
  console.log(`   Total env vars: ${keys.length}`);
  console.log('   Includes CRM Chat Widget:', keys.includes('NEXT_PUBLIC_CRM_CHAT_WIDGET_ID') ? 'YES' : 'NO');

  // 4. Trigger redeploy
  console.log('\n4. Triggering redeploy...');
  const deploys = await vercelApi('GET', `/v6/deployments?projectId=${PROJECT_ID}&limit=1&target=production`);
  const latest = deploys.data.deployments[0];
  const redeploy = await vercelApi('POST', `/v13/deployments`, {
    name: 'abk-unlimited-v2',
    target: 'production',
    deploymentId: latest.uid,
    meta: { redeployReason: 'CRM chat widget + APEX-QA SEO engine + webhook' }
  });
  console.log(`   Redeploy: ${redeploy.data.url || 'triggered'}`);
}

run().catch(e => console.error('FATAL:', e));
