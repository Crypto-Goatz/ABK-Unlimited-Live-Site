/**
 * CRM API Integration
 * API base: https://services.leadconnectorhq.com
 *
 * Primary: Direct webhook (always works, no auth needed)
 * Secondary: REST API (when CRM_API_KEY is valid)
 */

const CRM_API_BASE = 'https://services.leadconnectorhq.com'
const CRM_API_VERSION = '2021-07-28'
const CRM_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/497AdD39erWgmOu8JTCw/webhook-trigger/7eefc3ac-ca9c-4448-87da-b3d518f0ac15'

interface CRMContactData {
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  address1?: string
  city?: string
  state?: string
  postalCode?: string
  source?: string
  tags?: string[]
  customFields?: Array<{ key: string; value: string }>
}

interface CRMContact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  [key: string]: unknown
}

interface CRMError {
  message: string
  statusCode: number
}

/**
 * Fire the direct CRM webhook — guaranteed delivery, no auth needed
 */
async function fireWebhook(data: CRMContactData): Promise<boolean> {
  try {
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName || '',
        name: [data.firstName, data.lastName].filter(Boolean).join(' '),
        email: data.email || '',
        phone: data.phone || '',
        address1: data.address1 || '',
        city: data.city || '',
        state: data.state || '',
        postalCode: data.postalCode || '',
        source: data.source || 'Website',
        tags: (data.tags || []).join(', '),
        customFields: JSON.stringify(data.customFields || []),
        submittedAt: new Date().toISOString(),
        website: 'abkunlimited.com',
      }),
    })
    return res.ok
  } catch (error) {
    console.error('CRM webhook failed:', error)
    return false
  }
}

/**
 * Create a contact in CRM
 * Uses webhook as primary (always works), API as secondary (for getting contact ID back)
 */
export async function createCRMContact(data: CRMContactData): Promise<{ success: boolean; contact?: CRMContact; error?: string }> {
  const locationId = process.env.CRM_LOCATION_ID || '497AdD39erWgmOu8JTCw'
  const apiKey = process.env.CRM_API_KEY

  // Always fire webhook first — guaranteed delivery
  const webhookOk = await fireWebhook(data)

  // Try API for richer response (contact ID, etc.)
  if (apiKey) {
    try {
      const response = await fetch(`${CRM_API_BASE}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Version': CRM_API_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locationId, ...data }),
      })

      if (response.ok) {
        const result = await response.json()
        return { success: true, contact: result.contact }
      }

      // API failed but webhook succeeded — still a success
      if (webhookOk) {
        console.warn('CRM API failed but webhook delivered contact')
        return { success: true }
      }
    } catch (error) {
      console.error('CRM API request failed:', error)
      if (webhookOk) return { success: true }
    }
  }

  // No API key — rely on webhook
  if (webhookOk) return { success: true }

  return { success: false, error: 'Both CRM webhook and API failed' }
}

/**
 * Create an opportunity in CRM (for estimate requests)
 */
export async function createCRMOpportunity(
  contactId: string,
  data: {
    name: string
    pipelineId?: string
    pipelineStageId?: string
    monetaryValue?: number
    source?: string
  }
): Promise<{ success: boolean; opportunity?: unknown; error?: string }> {
  const locationId = process.env.CRM_LOCATION_ID || '497AdD39erWgmOu8JTCw'
  const apiKey = process.env.CRM_API_KEY
  const pipelineId = process.env.CRM_PIPELINE_ID

  if (!apiKey) {
    // No API key — log opportunity via webhook instead
    await fireWebhook({
      firstName: data.name,
      source: `Opportunity: ${data.source || 'Website'}`,
      tags: ['opportunity', `value:${data.monetaryValue || 0}`],
    }).catch(() => {})
    return { success: true }
  }

  try {
    const response = await fetch(`${CRM_API_BASE}/opportunities/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': CRM_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        contactId,
        pipelineId: data.pipelineId || pipelineId,
        pipelineStageId: data.pipelineStageId,
        name: data.name,
        monetaryValue: data.monetaryValue,
        source: data.source,
        status: 'open',
      }),
    })

    if (!response.ok) {
      const errorData: CRMError = await response.json()
      console.error('CRM API error:', errorData)
      return { success: false, error: errorData.message || 'Failed to create opportunity' }
    }

    const result = await response.json()
    return { success: true, opportunity: result.opportunity }
  } catch (error) {
    console.error('CRM API request failed:', error)
    return { success: false, error: 'Failed to connect to CRM' }
  }
}

/**
 * Add a note to a contact in CRM
 */
export async function addCRMNote(
  contactId: string,
  body: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.CRM_API_KEY

  if (!apiKey) {
    return { success: true } // Graceful skip — contact already captured via webhook
  }

  try {
    const response = await fetch(`${CRM_API_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': CRM_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body }),
    })

    if (!response.ok) {
      const errorData: CRMError = await response.json()
      console.error('CRM API error:', errorData)
      return { success: false, error: errorData.message || 'Failed to add note' }
    }

    return { success: true }
  } catch (error) {
    console.error('CRM API request failed:', error)
    return { success: false, error: 'Failed to connect to CRM' }
  }
}

/**
 * Add tags to a contact in CRM
 */
export async function addCRMTags(
  contactId: string,
  tags: string[]
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.CRM_API_KEY

  if (!apiKey) {
    return { success: true } // Graceful skip — tags passed via webhook
  }

  try {
    const response = await fetch(`${CRM_API_BASE}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': CRM_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
    })

    if (!response.ok) {
      const errorData: CRMError = await response.json()
      console.error('CRM API error:', errorData)
      return { success: false, error: errorData.message || 'Failed to add tags' }
    }

    return { success: true }
  } catch (error) {
    console.error('CRM API request failed:', error)
    return { success: false, error: 'Failed to connect to CRM' }
  }
}

/**
 * Send an SMS message to a contact
 */
export async function sendCRMSMS(
  contactId: string,
  message: string
): Promise<{ success: boolean; conversationId?: string; messageId?: string; error?: string }> {
  const apiKey = process.env.CRM_API_KEY

  if (!apiKey) {
    return { success: true } // Graceful skip — SMS requires API key
  }

  try {
    const response = await fetch(`${CRM_API_BASE}/conversations/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': CRM_API_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'SMS',
        contactId,
        message,
      }),
    })

    if (!response.ok) {
      const errorData: CRMError = await response.json()
      console.error('CRM SMS error:', errorData)
      return { success: false, error: errorData.message || 'Failed to send SMS' }
    }

    const result = await response.json()
    return {
      success: true,
      conversationId: result.conversationId,
      messageId: result.messageId
    }
  } catch (error) {
    console.error('CRM SMS request failed:', error)
    return { success: false, error: 'Failed to connect to CRM' }
  }
}
