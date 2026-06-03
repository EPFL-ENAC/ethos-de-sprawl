import type { FillLayerSpecification } from 'maplibre-gl';

export function getColorScalePaint(
  totalScoreKey: string,
): NonNullable<FillLayerSpecification['paint']> {
  return {
    'fill-color': [
      'interpolate',
      ['linear'],
      ['get', totalScoreKey],
      0,
      '#8E0000',
      10,
      '#C51B1D',
      20,
      '#E34A33',
      30,
      '#FC8D59',
      40,
      '#FDBB84',
      50,
      '#F6BE2C',
      60,
      '#8EC6E8',
      70,
      '#5FA8D3',
      80,
      '#3182BD',
      90,
      '#08519C',
      100,
      '#08519C',
    ],
    'fill-opacity': 0.8,
  };
}

export const COLOR_SCALE = {
  '0-10': '#8E0000',
  '10-20': '#C51B1D',
  '20-30': '#E34A33',
  '30-40': '#FC8D59',
  '40-50': '#FDBB84',
  '50-60': '#F6BE2C',
  '60-70': '#8EC6E8',
  '70-80': '#5FA8D3',
  '80-90': '#3182BD',
  '90-100': '#08519C',
};
