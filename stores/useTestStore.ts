import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

type States = {
  isLoading: boolean;

  stepper: {
    currentStep: number;
    stepBarCurrentTask: number;
    stepBarTotalTask: number;
  };
  checkBoxes: {
    isCheckedCoreDescription: boolean;
    isCheckedMemberCautionNote: boolean;

    confirmationExpectedDate: boolean;
  };

  inputs: {
    annualPaymentLimit: string;
    subscriptionPeriod: string;
  };

  transfer: {
    selectedAccountId: string;
  };
};

type Actions = {
  setLoading: (item: boolean) => void;
  // initialize는 store의 모든값이 초기화 되어버린다. 그게 싫으면 replace를 false로 줄것.
  initialize: (fn: (item: States) => void, actionType?: ActionTypes) => void;
  setState: (fn: (item: States) => void, actionType?: ActionTypes) => void;
};

type ActionTypes = `changed_${keyof States}_Pension`;

const useTestStore = create<States & Actions>(
  devtools((set) => ({
    setState: (fn, actionType?) =>
      set(produce<States>(fn), false, actionType || 'setStateInPensionStore'),

    initialize: (fn, actionType?) => set(produce<States>(fn), true, actionType || 'Initialize'),

    isLoading: false,
    setLoading: (item) => set(() => ({ isLoading: item })),

    stepper: {
      currentStep: 0,
      stepBarCurrentTask: 0,
      stepBarTotalTask: 0,
    },
    checkBoxes: {
      isCheckedCoreDescription: false,
      isCheckedMemberCautionNote: false,
      confirmationExpectedDate: false,
    },

    inputs: {
      annualPaymentLimit: '',
      subscriptionPeriod: '',
    },
    transfer: {
      selectedAccountId: '1',
    },
  }))
);

export default useTestStore;
