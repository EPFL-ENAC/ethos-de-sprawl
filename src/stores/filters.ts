import { defineStore } from 'pinia';

export type FilterParams = {
  totalScore: [number, number];
  population: [number, number];
};

const DEFAULT_TOTAL_SCORE = { min: 0, max: 100 };
const DEFAULT_POPULATION = { min: 0, max: 1000 };

export const useFiltersStore = defineStore(
  'filters',
  () => {
    const totalScore = ref({ ...DEFAULT_TOTAL_SCORE });
    const population = ref({ ...DEFAULT_POPULATION });
    function reset() {
      totalScore.value = { ...DEFAULT_TOTAL_SCORE };
      population.value = { ...DEFAULT_POPULATION };
    }

    function asParams(): FilterParams {
      return {
        totalScore: [totalScore.value.min, totalScore.value.max],
        population: [population.value.min, population.value.max],
      };
    }

    return {
      totalScore,
      population,
      reset,
      asParams,
    };
  },
  { persist: true },
);
