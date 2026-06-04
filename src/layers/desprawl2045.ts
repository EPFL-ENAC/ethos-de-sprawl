import { DeSprawlLayerManager } from 'src/layers/commons';

export class DeSprawl2045LayerManager extends DeSprawlLayerManager {
  override getId(): string {
    return 'desprawl2045';
  }

  override getPMTilesBasename(): string {
    return 'de-sprawl-2045';
  }

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
