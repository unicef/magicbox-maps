module.exports = {
  countries_with_school_connectivity: process.env.countries_with_school_connectivity || '{"COL": 1, "BRA": 1, "MRT": 1}',

  // 'schools' or 'mobility'
  mode: process.env.REACT_APP_MODE || 'mobility',

  // Email contact info for map types
  email_contact_mobility: process.env.email_contact_mobility || '',
  email_contact_schools: process.env.email_contact_schools || '',

  auth_client_id: process.env.REACT_APP_AUTH_CLIENT_ID || 'client_id',
  auth_callback_url: process.env.REACT_APP_AUTH_CALLBACK_URL || 'auth callback url',

  // Endpoints configured for magicbox-open-api by default
  initial_url_key: {
    mobility: process.env.REACT_APP_MOBILITY_ENDPOINT || 'mobility',
    schools: process.env.REACT_APP_SCHOOLS_ENDPOINT || 'schools'
  },

  // Require login?
  login_required: (process.env.REACT_APP_LOGIN_REQUIRED==='false'),

  // Address of magicbox-open-api back-end
  // MAKE SURE DOES NOT HAVE TRAILING FORWARD SLASH
  magicbox_url: process.env.MAGICBOX_URL || 'http://localhost:8000/api/v1',

  // Tokens needed to access private data (e.g. school mappings)
  rfUrl: process.env.RF_URL || 'REFRESH_TOKEN_URL',
  refreshToken: process.env.REFRESH_TOKEN || 'REFRESH_TOKEN'
}
