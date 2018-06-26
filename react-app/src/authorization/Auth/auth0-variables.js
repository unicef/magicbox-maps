const config = require('../../config.js')
export const AUTH_CONFIG = {
  domain: 'mikefab.auth0.com',
  clientId: config.auth_client_id,
  callbackUrl: config.auth_callback_url
}
