import create from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  open: boolean;
  closeMenu: () => void;
  openMenu: () => void;
};
// interface Test {
//   open: boolean;
// closeMenu: () => void;
// openMenu: () => void;
// }
const useMenuStore = create<State>(
  devtools((set) => ({
    open: false,
    closeMenu: () => set(() => ({ open: false })),
    openMenu: () => set(() => ({ open: true })),
  }))
);

export default useMenuStore;
