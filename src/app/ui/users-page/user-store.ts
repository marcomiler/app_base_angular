import { createStore } from 'zustand/vanilla';

interface Counterstate {
  count: number;
  title: string;
  increment: (value: number) => void;
  changeTitle: (value: string) => void;
}

const useCountStore = createStore<Counterstate>((set) => ({
  count: 20,
  title: 'titulo store',
  increment: (value: number) =>
    set((state) => ({
      count: state.count + value,
    })),
  changeTitle: (value: string) =>
    set(() => ({
      title: value,
    })),
}));

export const { getState, setState, subscribe } = useCountStore;

export default useCountStore;
