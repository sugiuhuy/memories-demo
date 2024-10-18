import { createContext, createEffect, JSXElement } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { stateInterface, states } from "~/stores/states";

type Props = { children: JSXElement };

export const StoreContext = createContext<[get: stateInterface, set: SetStoreFunction<stateInterface>]>([states, () => {}]);
export default function StoreContextProvider(props: Props) {
  const [store, setStore] = createStore<stateInterface>(states);

  createEffect(() => {
    localStorage.setItem("theme", JSON.stringify(store.theme));
  });

  return <StoreContext.Provider value={[store, setStore]}>{props.children}</StoreContext.Provider>;
}
