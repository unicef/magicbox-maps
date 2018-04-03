# Magic Box Maps 2.0

## Developing

To get started, run `npm install; npm start`.

For more information on getting started, see the  [create-react-app guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Git Workflow

We are using the `2.0_dev` branch as the main development branch for work on Magic Box Maps 2.0. Our development environment is deployed from this branch. Feature branches can be branched from `2.0_dev` and merged back up when ready.

## Data

The `public/data/schools.json` file includes a small set of "fake" data. The [full data set](https://github.com/unicef/magicbox-data/blob/master/data/schools.json) is available in the private magicbox-data repo.

## Docker

In the root of this project directory is a Dockerfile which can be built to deploy to a container platform (or testing locally). To build the image run the following command:

`docker build -t unicef/magicbox-map .`

With this image you can run it locally by running:
`docker run -p 80:8080 unicef/magicbox-map`
