import { DeSprawlLayerManager } from 'src/layers/commons';

export class DeSprawl2023LayerManager extends DeSprawlLayerManager {
  override getId(): string {
    return 'desprawl2023';
  }

  override getPMTilesBasename(): string {
    return 'de-sprawl-2023';
  }

  /*
  {
    "fid": 1,
    "id": 48621114,
    "population": 5,
    "accessibility_dist_health_care": 5718.3253667485551,
    "accessibility_dist_school": 650.42908914039197,
    "accessibility_dist_kindergarden": 478.43181332348706,
    "accessibility_dist_elderly_care": 2863.8556178690292,
    "accessibility_dist_cultural_center": 2236.9660256695897,
    "accessibility_dist_nutrition": 859.15830904438099,
    "accessibility_dist_sports_and_rec": 971.73504619314826,
    "accessibility_dist_public_admin": 737.55338789812356,
    "accessibility_dist_repair": 8906.9384751439702,
    "accessibility_score_mobility": 5.0,
    "accessibility_score_health_care": 0.00022580545622383208,
    "accessibility_score_school": 2.9615018591156348,
    "accessibility_score_kindergarden": 4.0856728845623378,
    "accessibility_score_elderly_care": 0.047103600289939818,
    "accessibility_score_cultural_center": 0.15220037855063923,
    "accessibility_score_nutrition": 2.0040793432176081,
    "accessibility_score_sports_and_rec": 1.6234683563352186,
    "accessibility_score_public_admin": 2.5160634791750129,
    "accessibility_score_repair": 5.7931651050885088e-07,
    "accessibility_score_total": 18.390316286019125,
    "weighted_avg_klass": 2.0
  }
  */
  override getFeaturePropertiesKeysMap() {
    return {
      name: 'id',
      population: 'population',
      mobility: 'accessibility_score_mobility',
      health_care: 'accessibility_score_health_care',
      school: 'accessibility_score_school',
      childcare: 'accessibility_score_kindergarden',
      elderly_care: 'accessibility_score_elderly_care',
      cultural_center: 'accessibility_score_cultural_center',
      nutrition: 'accessibility_score_nutrition',
      sports_and_rec: 'accessibility_score_sports_and_rec',
      public_admin: 'accessibility_score_public_admin',
      repair: 'accessibility_score_repair',
      total: 'accessibility_score_total',
    };
  }
}
