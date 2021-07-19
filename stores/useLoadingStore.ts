import create from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  isLoading: boolean;
  setLoading: (item: boolean) => void;
};

const useLoadingStore = create<State>(
  devtools((set) => ({
    isLoading: false,
    setLoading: (item) => set(() => ({ isLoading: item })),
  }))
);

export default useLoadingStore;
