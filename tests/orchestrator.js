import retry from 'async-retry'

async function waitForAllServices() {

  await waitForWebServer()

  async function waitForWebServer() {

    return retry(fetchStatusPage, {
      retries: 100
    })

    async function fetchStatusPage() {
      const res = await fetch(process.env.APP_URL + '/api/v1/status')
      await res.json()
    }

  }

}

export default {
  waitForAllServices
}