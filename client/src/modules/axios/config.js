const protocol = 'https';
const host = '13.52.101.136';
const port = '8080';
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
