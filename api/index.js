// API do site no Vercel: roda o json-server como função, usando o db.json
// carregado na memória (o Vercel não permite gravar arquivos).
import { readFileSync, mkdirSync } from 'node:fs'
import { Readable } from 'node:stream'
import { Low } from 'lowdb'
import { createApp } from 'json-server/lib/app.js'
import { NormalizedAdapter } from 'json-server/lib/adapters/normalized-adapter.js'

let dados = JSON.parse(readFileSync(new URL('../db.json', import.meta.url), 'utf-8'))

const memoria = {
  read: async () => structuredClone(dados),
  write: async (novosDados) => {
    dados = structuredClone(novosDados)
  },
}

let appPronto = null

function criarApp() {
  if (!appPronto) {
    appPronto = (async () => {
      // o json-server procura a pasta "public"; garante que ela exista
      try { mkdirSync('public', { recursive: true }) } catch { /* pasta somente leitura */ }
      const db = new Low(new NormalizedAdapter(memoria), {})
      await db.read()
      return createApp(db, { logger: false })
    })()
  }
  return appPronto
}

async function lerCorpo(req) {
  if (['GET', 'HEAD', 'DELETE', 'OPTIONS'].includes(req.method)) return null
  try {
    // o Vercel pode já ter lido o corpo da requisição
    if (req.body !== undefined && req.body !== null) {
      if (Buffer.isBuffer(req.body)) return req.body
      return Buffer.from(typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
    }
  } catch { /* corpo inválido: segue para a leitura normal */ }
  const partes = []
  for await (const parte of req) partes.push(parte)
  return Buffer.concat(partes)
}

export default async function handler(req, res) {
  const app = await criarApp()
  const corpo = await lerCorpo(req)

  // cópia da requisição com o corpo pronto e sem o prefixo /api
  const requisicao = Readable.from(corpo ? [corpo] : [])
  requisicao.method = req.method
  requisicao.headers = req.headers
  requisicao.url = (req.url || '/').replace(/^\/api(?=\/|\?|$)/, '') || '/'

  return app.handler(requisicao, res)
}
