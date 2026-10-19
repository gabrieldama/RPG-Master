// Em desenvolvimento usa o json-server local; na hospedagem (Vercel) usa a rota /api
const API = import.meta.env.PROD ? '/api' : 'http://localhost:3000'

export default API
