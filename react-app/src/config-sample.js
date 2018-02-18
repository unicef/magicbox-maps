module.exports = {
  countries_with_school_connectivity: process.env.countries_with_school_connectivity || '{"COL": 1, "BRA": 1, "MRT": 1}',
  mode: process.env.REACT_APP_MODE || 'schools',   // or'mobility'
  email_contact_mobility: process.env.email_contact_mobility || '',
  email_contact_schools: process.env.email_contact_schools || '',
  initial_url_key: {
    mobility: process.env.REACT_APP_MOBILITY_ENDPOINT||'mobility',
    schools: process.env.REACT_APP_SCHOOLS_ENDPOINT||'schools'
  },
  login_required: (process.env.REACT_APP_LOGIN_REQUIRED==='true') || false,
  magicbox_url: process.env.MAGICBOX_URL||'MAGICBOX_API_URL',
  rfUrl: process.env.RF_URL||'REFRESH_TOKEN_URL',
  refreshToken: process.env.REFRESH_TOKEN||'REFRESH_TOKEN'
}
