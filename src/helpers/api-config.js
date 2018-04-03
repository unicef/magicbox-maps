// The school data is on a temporary Azure store and should be replaced
// with a longer-term storage solution in the future.

const apiConfig = {
  schools: process.env.REACT_APP_SCHOOLS_URL,
  shapes: process.env.REACT_APP_SHAPES_URL
}

export default apiConfig;
