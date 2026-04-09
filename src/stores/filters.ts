import { defineStore } from 'pinia';

export type FilterParams = {
  totalScore: [number, number];
};

const DEFAULT_TOTAL_SCORE = { min: 0, max: 100 };

export const useFiltersStore = defineStore(
  'filters',
  () => {
    const totalScore = ref({ ...DEFAULT_TOTAL_SCORE });

    function reset() {
      totalScore.value = { ...DEFAULT_TOTAL_SCORE };
    }

    function asParams(): FilterParams {
      return {
        totalScore: [totalScore.value.min, totalScore.value.max],
      };
    }

    return {
      totalScore,
      reset,
      asParams,
    };
  },
  { persist: true },
);
