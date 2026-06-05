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

rm:
	s3cmd del --recursive s3://${bucket}/${folder}/${path}

tiles: tiles-2023 tiles-2100

tiles-2023:
	cd data && \
	rm -f de-sprawl-2023.pmtiles && \
	tippecanoe -zg -o de-sprawl-2023.pmtiles --no-feature-limit --no-tile-size-limit \
		-y name \
		-y population \
		-y accessibility_score_mobility \
		-y accessibility_score_health_care \
		-y accessibility_score_school \
		-y accessibility_score_kindergarden \
		-y accessibility_score_elderly_care \
		-y accessibility_score_cultural_center \
		-y accessibility_score_nutrition \
		-y accessibility_score_sports_and_rec \
		-y accessibility_score_public_admin \
		-y accessibility_score_repair \
		-y accessibility_score_total \
	de-sprawl-2023.geojson


tiles-2045:
	cd data && \
	rm -f de-sprawl-2045.pmtiles && \
	tippecanoe -zg -o de-sprawl-2045.pmtiles --no-feature-limit --no-tile-size-limit \
		-y name \
		-y max_pop \
		-y mobility_score \
		-y score_healthcare \
		-y score_school \
		-y score_childcare \
		-y score_elderly_care \
		-y score_cultural_center \
		-y score_grocery \
		-y score_sports_and_rec \
		-y score_admin \
		-y score_repairs \
		-y total_score \
	de-sprawl-2045.geojson

tiles-2100:
	cd data && \
	rm -f de-sprawl-2100.pmtiles && \
	tippecanoe -zg -o de-sprawl-2100.pmtiles --no-feature-limit --no-tile-size-limit \
		-y name \
		-y max_pop \
		-y mobility_score \
		-y score_healthcare \
		-y score_school \
		-y score_childcare \
		-y score_elderly_care \
		-y score_cultural_center \
		-y score_grocery \
		-y score_sports_and_rec \
		-y score_admin \
		-y score_repairs \
		-y total_score \
	de-sprawl-2100.geojson
