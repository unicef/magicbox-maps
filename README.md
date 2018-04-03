# Magic Box Maps 2.0

## Developing
To get started:
1. Clone this repo and check out the `2.0_dev` branch.
2. Copy `.env.local.sample` to `.env.local`.
  - The school data included in this file is a small, "fake" data set for development use. To use the full data set, change the `REACT_APP_SCHOOLS_URL` variable in .env.
3. Run `npm install; npm start`.

For more information on getting started, see the  [create-react-app guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Hosting
1. Set the `REACT_APP_SCHOOLS_URL` and `REACT_APP_SHAPES_URL` environment variables on the system that will be used to build the application.
  - To prevent data URLs from being made public, these should be "real" environment variables, not a `.env` file in the repo.
2. Execute `npm run build` from your automation tool of choice (Jenkins, [this source-to-image builder](https://github.com/bigdelivery/s2i-create-react-app/), etc.)
3. Host the `/build` directory as static files.

## Git Workflow

We are using the `2.0_dev` branch as the main development branch for work on Magic Box Maps 2.0. Our development environment is deployed from this branch. Feature branches can be branched from `2.0_dev` and merged back up when ready.

## Data

The `public/data/schools.json` file includes a small set of "fake" data. The [full data set](https://github.com/unicef/magicbox-data/blob/master/data/schools.json) is available in the private magicbox-data repo.
