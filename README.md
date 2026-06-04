# ETHOS De-sprawl

Webmap of De-sprawl Switzerland project by ETHOS lab

## Development

Install the dependencies

```bash
npm install
```

Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev
```

Lint the files

```bash
npm run lint
```

Format the files

```bash
npm run format
```

Build the app for production:

- use `npm version` to update with major/minor/patch version increment
- commit and push changes to main branch
- create new Github release vx.x.x and the `deploy` action will take care of deployment

## Datasets

Source datasets are GeoJSON files (use Git LFS to retrieve them). These are to be tiled in PMTiles format following this process:

- Preliminary:
  - make sure GeoJSON files are in CRS84 format. If not, use QGis to convert.
  - have [tippecanoe](https://github.com/felt/tippecanoe) installed
  - if new dataset, update Makefile accordingly
- Use `make tiles`
- Then push to EPFL S3 with `make cdn`
