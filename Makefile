tiles: tiles-2022 tiles-2100

tiles-2022:
	cd data && \
	tippecanoe -zg -o de-sprawl-2022.pmtiles --drop-densest-as-needed --extend-zooms-if-still-dropping de-sprawl-2022.geojson

tiles-2100:
	cd data && \
	tippecanoe -zg -o de-sprawl-2100.pmtiles --drop-densest-as-needed --extend-zooms-if-still-dropping de-sprawl-2100.geojson
