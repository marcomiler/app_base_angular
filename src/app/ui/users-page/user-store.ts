import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

interface CounterState {
  count: number;
  title: string;
  increment: (value: number) => void;
  changeTitle: (value: string) => void;
}

//TODO: Falta personalizar el sessionStorage para que se almacenen los datos encriptados
//TODO: sessionStorage si se quiere eliminar los datos de l store cuando se cierre la pestaña
const useCountStore = createStore<CounterState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'counter-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const { getState, setState, subscribe } = useCountStore;

export default useCountStore;
