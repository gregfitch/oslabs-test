import axios from 'axios'
import { sleep } from './utilities'

type EmailHeader = {
  'content-transfer-encoding': string
  'content-type': string
  date: string
  'dkim-signature': unknown[]
  'feedback-id': string
  from: string
  'message-id': string
  'mime-version': string
  subject: string
  to: string
  'x-ses-outgoing': string
}

class EmailMessageData {
  date?: string
  from?: unknown[]
  headers?: EmailHeader
  html?: string
  messageId?: string
  priority?: string
  receivedAt?: string
  subject?: string
  text?: string
  to?: unknown[]

  constructor(data: {
    date?: string
    from?: unknown[]
    headers?: EmailHeader
    html?: string
    messageId?: string
    priority?: string
    receivedAt?: string
    subject?: string
    text?: string
    to?: unknown[]
  }) {
    this.date = 'date' in data ? data.date : ''
    this.from = 'from' in data ? data.from : []
    this.headers = 'headers' in data ? data.headers : null
    this.html = 'html' in data ? data.html : ''
    this.messageId = 'messageId' in data ? data.messageId : ''
    this.priority = 'priority' in data ? data.priority : ''
    this.receivedAt = 'receivedAt' in data ? data.receivedAt : ''
    this.subject = 'subject' in data ? data.subject : ''
    this.text = 'text' in data ? data.text : ''
    this.to = 'to' in data ? data.to : []
  }
}

const RESTMAIL_URL = 'https://restmail.net/mail/'

async function getMail(user: string, wait, delay) {
  if (wait) {
    await sleep(delay)
  }
  return axios.get(RESTMAIL_URL + user)
}

async function checkMailbox(user: string, wait, delay) {
  const messages = await getMail(user, wait, delay)
  if (!messages.data.length) {
    throw new Error(`No messages for user ${user}`)
  }
  return new Array<EmailMessageData>(
    messages.data.map(
      (x: {
        date: string
        from: unknown[]
        headers: EmailHeader
        html: string
        messageId: string
        priority: string
        receivedAt: string
        subject: string
        text: string
        to: unknown[]
      }) => new EmailMessageData(x),
    ),
  )
}

function checkRestmail(user: string, retries = 0, maxRetries = 60, delay = 0.5): Promise<unknown> | EmailMessageData[] {
  if (retries > maxRetries) {
    throw new Error(`Message not received in time (${maxRetries * delay} seconds)`)
  }
  return checkMailbox(user, maxRetries - retries > 0, delay)
    .then((box) => {
      return box
    })
    .catch(() => {
      return checkRestmail(user, retries + 1, maxRetries, delay)
    })
}

function getPin(data: EmailMessageData): string {
  try {
    return data.subject.match(/[0-9]{6}/g)[0]
  } catch (error) {
    throw new Error('PIN not found')
  }
}

export { EmailMessageData, checkRestmail, getPin }
