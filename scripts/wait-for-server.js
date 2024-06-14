const retry = require('async-retry')

const dotenv = require('dotenv')
// Configura o dotenv para pegar as variáveis de ambiente de desenvolvimento.
// Por padrão, o dotenv não encontrará as variaveis desejadas, pois elas estarão
// em outro processo, o do Next, que em dado momento, ainda não estará rodadando
// quando esse script for executado.
dotenv.config({
  path: '.env.development'
})


async function waitForServer() {

  async function fetchStatusPage() {

    const res = await fetch(process.env.APP_URL + '/api/v1/status')
    if (res.status !== 200) {
      throw new Error('Unknown error at fetch to get server status.')
    }
  }

  return retry(fetchStatusPage, {
    retries: 100,
    minTimeout: 400,
    maxTimeout: 500,
    onRetry: errorCatcher
  })

  function errorCatcher(er) {
    // fetch failed ocorrerá enquanto o Next não subir o servidor, o que é um erro esperado.
    // Qualquer erro diferente será lançado, pois será um erro inesperado.
    if (er.message !== 'fetch failed') throw er
  }

}

waitForServer()
