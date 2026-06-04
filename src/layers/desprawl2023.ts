import { DeSprawlLayerManager } from 'src/layers/commons';

export class DeSprawl2023LayerManager extends DeSprawlLayerManager {
  override getId(): string {
    return 'desprawl2023';
  }

  override getPMTilesBasename(): string {
    return 'de-sprawl-2023';
  }

  override getFeaturePropertiesKeysMap() {
    return {
      name: 'name',
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
