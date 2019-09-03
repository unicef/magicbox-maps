module.exports = {
  countries_with_school_connectivity: process.env.REACT_APP_COUNTRIES_WITH_SCHOOL_CONNECTIVITY ||  '{"COL": 1, "BRA": 1, "KGZ": 1, "MRT": 1}',
  apiPrefix: process.env.REACT_APP_API_PREFIX || '/api/',
  // 'schools' or 'mobility'
  mode: process.env.REACT_APP_MODE || 'schools',

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
  login_required: (process.env.REACT_APP_LOGIN_REQUIRED === 'false'),
}
