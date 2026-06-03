import { DeSprawlLayerManager } from 'src/layers/commons';

export class DeSprawl2100LayerManager extends DeSprawlLayerManager {
  override getId(): string {
    return 'desprawl2100';
  }

  override getPMTilesBasename(): string {
    return 'de-sprawl-2100';
  }

  /*
  {
    "fid": 1,
    "id": 27234001076900.0,
    "name": "Chiasso",
    "max_pop": 208,
    "max_reachable_pop": 5635.0,
    "selected": 1.0,
    "removable": 1.0,
    "x": 2723400.0,
    "y": 1076900.0,
    "grocery": 0.0,
    "school": 0.0,
    "healthcare": 0.0,
    "sports_and_rec": 0.0,
    "cultural_center": 0.0,
    "admin": 0.0,
    "childcare": 0.0,
    "repairs": 0.0,
    "elderly_care": 0.0,
    "mobility": 0.0,
    "dist_to_grocery": 467.27944530013303,
    "dist_to_school": 579.58881976794555,
    "dist_to_healthcare": 467.27944530013303,
    "dist_to_sports_and_rec": 289.79440988397278,
    "dist_to_cultural_center": 579.58881976794555,
    "dist_to_admin": 579.58881976794555,
    "dist_to_childcare": 409.83118475782203,
    "dist_to_repairs": 579.58881976794555,
    "dist_to_elderly_care": 579.58881976794555,
    "score_grocery": 5.9412709311572236,
    "score_school": 5.2424205940613522,
    "score_healthcare": 5.9412709311572236,
    "score_sports_and_rec": 7.240456196995706,
    "score_cultural_center": 5.2424205940613522,
    "score_admin": 5.2424205940613522,
    "score_childcare": 6.3340148468065873,
    "score_repairs": 5.2424205940613522,
    "score_elderly_care": 5.2424205940613522,
    "total_score": 61.669115876423497,
    "weighted_avg_klass": 4.0,
    "mobility_score": 10.0
  }
  */
  override getFeaturePropertiesKeysMap() {
    return {
      name: 'name',
      population: 'max_pop',
      mobility: 'mobility_score',
      health_care: 'score_healthcare',
      school: 'score_school',
      childcare: 'score_childcare',
      elderly_care: 'score_elderly_care',
      cultural_center: 'score_cultural_center',
      nutrition: 'score_grocery',
      sports_and_rec: 'score_sports_and_rec',
      public_admin: 'score_admin',
      repair: 'score_repairs',
      total: 'total_score',
    };
  }
}
