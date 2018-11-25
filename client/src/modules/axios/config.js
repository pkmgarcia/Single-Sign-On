const protocol = 'https';
const host = '10.0.0.100';
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