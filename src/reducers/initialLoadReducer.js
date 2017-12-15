var initialstate = {
  initialCountries: [],
}

export default function(state = initialstate, action) {
  switch (action.type) {
    case "INITIAL_LOAD":
      return action.payload;
  }
  return state;

}