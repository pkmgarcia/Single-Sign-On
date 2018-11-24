const protocol = 'https';
const host = '98.207.137.133';
const port = '629';
const api = 'mysql'
const baseURL = port
  ? `${protocol}://${host}:${port}/${api}`
  : `${protocol}://${host}/${api}`;

const config = {
  baseURL
};

export {
  protocol,
  host,
  port,
  baseURL
};

export default config;