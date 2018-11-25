const protocol = 'https';
const host = '98.207.137.133';
const port = '8000';
const baseURL = port
  ? `${protocol}://${host}:${port}`
  : `${protocol}://${host}`;

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