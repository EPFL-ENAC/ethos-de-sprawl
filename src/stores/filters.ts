import { defineStore } from 'pinia';

export type FilterParams = {
  totalScore: [number, number];
  groceryScore: [number, number];
  healthCareScore: [number, number];
  schoolScore: [number, number];
  childcareScore: [number, number];
  elderlyCareScore: [number, number];
  culturalCenterScore: [number, number];
  publicAdminScore: [number, number];
  sportsAndRecScore: [number, number];
  repairScore: [number, number];
  mobilityScore: [number, number];
};

const DEFAULT_TOTAL_SCORE = { min: 0, max: 100 };
const DEFAULT_TOPIC_SCORE = { min: 0, max: 10 };

export const useFiltersStore = defineStore(
  'filters',
  () => {
    const totalScore = ref({ ...DEFAULT_TOTAL_SCORE });
    const healthCareScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const schoolScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const groceryScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const childcareScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const elderlyCareScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const culturalCenterScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const publicAdminScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const sportsAndRecScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const repairScore = ref({ ...DEFAULT_TOPIC_SCORE });
    const mobilityScore = ref({ ...DEFAULT_TOPIC_SCORE });
    function reset() {
      totalScore.value = { ...DEFAULT_TOTAL_SCORE };
      healthCareScore.value = { ...DEFAULT_TOPIC_SCORE };
      schoolScore.value = { ...DEFAULT_TOPIC_SCORE };
      groceryScore.value = { ...DEFAULT_TOPIC_SCORE };
      childcareScore.value = { ...DEFAULT_TOPIC_SCORE };
      elderlyCareScore.value = { ...DEFAULT_TOPIC_SCORE };
      culturalCenterScore.value = { ...DEFAULT_TOPIC_SCORE };
      publicAdminScore.value = { ...DEFAULT_TOPIC_SCORE };
      sportsAndRecScore.value = { ...DEFAULT_TOPIC_SCORE };
      repairScore.value = { ...DEFAULT_TOPIC_SCORE };
      mobilityScore.value = { ...DEFAULT_TOPIC_SCORE };
    }

    function asParams(): FilterParams {
      return {
        totalScore: [totalScore.value.min, totalScore.value.max],
        healthCareScore: [healthCareScore.value.min, healthCareScore.value.max],
        schoolScore: [schoolScore.value.min, schoolScore.value.max],
        groceryScore: [groceryScore.value.min, groceryScore.value.max],
        childcareScore: [childcareScore.value.min, childcareScore.value.max],
        elderlyCareScore: [elderlyCareScore.value.min, elderlyCareScore.value.max],
        culturalCenterScore: [culturalCenterScore.value.min, culturalCenterScore.value.max],
        publicAdminScore: [publicAdminScore.value.min, publicAdminScore.value.max],
        sportsAndRecScore: [sportsAndRecScore.value.min, sportsAndRecScore.value.max],
        repairScore: [repairScore.value.min, repairScore.value.max],
        mobilityScore: [mobilityScore.value.min, mobilityScore.value.max],
      };
    }

    return {
      totalScore,
      healthCareScore,
      schoolScore,
      groceryScore,
      childcareScore,
      elderlyCareScore,
      culturalCenterScore,
      publicAdminScore,
      sportsAndRecScore,
      repairScore,
      mobilityScore,
      reset,
      asParams,
    };
  },
  { persist: true },
);
