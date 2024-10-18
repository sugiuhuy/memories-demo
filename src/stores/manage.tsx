import { createEffect, createSignal, JSXElement, useContext } from "solid-js";
import StoreContextProvider, { StoreContext } from "~/stores/contexts/store-context";
import { stateInterface } from "~/stores/states";

export function Provider(props: { children: JSXElement }) {
  return <StoreContextProvider>{props.children}</StoreContextProvider>;
}

export function selectStore<T>(payload: (store: stateInterface) => T) {
  const [store, _] = useContext(StoreContext);
  const [value, setValue] = createSignal<T>(payload(store));

  createEffect(() => {
    const selectedValue = payload(store);
    setValue((prevValue: T) => {
      return typeof selectedValue === "function" ? (selectedValue as (prev: T) => T)(prevValue) : selectedValue;
    });
  });

  return value;
}

export function mutateStore() {
  const [_, setStore] = useContext(StoreContext);
  return setStore;
}
