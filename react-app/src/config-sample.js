// fill in appropriate variables and name config.js
module.exports = {
  mode: process.env.REACT_APP_MODE || 'schools', // or 'mobility'
  initial_url_key: {
    mobility: process.env.REACT_APP_MOBILITY_ENDPOINT || 'schools',
    schools: process.env.REACT_APP_SCHOOLS_ENDPOINT || 'schools'
  },
  login_required: (process.env.REACT_APP_LOGIN_REQUIRED === 'true') || false,
  magicbox_url: process.env.MAGICBOX_URL || 'MAGICBOX_API_URL',
  rfUrl: process.env.RF_URL || 'REFRESH_TOKEN_URL',
  refreshToken: process.env.REFRESH_TOKEN || 'REFRESH_TOKEN'
}
