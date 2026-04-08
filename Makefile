version=$(shell date +%FT%H:%M)
bucket=10208-fcd9acb029f419e6493edf97f4592b96
folder=ehtos-de-sprawl

help:
	@echo s3://${bucket}/${folder}/

cdn:
	s3cmd put --recursive --acl-public --guess-mime-type data s3://${bucket}/${folder}/${version}/

sync:
	s3cmd sync s3://${bucket}/${folder}/${version}/ ${version}-local/

ls:
	s3cmd ls s3://${bucket}/${folder}/${path}

tiles: tiles-2022 tiles-2100

tiles-2022:
	cd data && \
	tippecanoe -zg -o de-sprawl-2022.pmtiles --drop-densest-as-needed --extend-zooms-if-still-dropping de-sprawl-2022.geojson

tiles-2100:
	cd data && \
	tippecanoe -zg -o de-sprawl-2100.pmtiles --drop-densest-as-needed --extend-zooms-if-still-dropping de-sprawl-2100.geojson
