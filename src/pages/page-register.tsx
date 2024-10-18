import { Component, createEffect, createSignal, For, Index, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import Input from "~/components/form/input";
import { pattern } from "~/configurations/pattern-config";
import authMutation from "~/functions/auth-mutation";
import { mutateStore, selectStore } from "~/stores/manage";

const PageRegister: Component = () => {
  const appearUrls = selectStore((store) => store.appear_urls);
  const mutate = mutateStore();

  const auth = authMutation();
  const [value, setValue] = createStore<{ name: string; email: string; password: string }>({ name: "", email: "", password: "" });
  const [agreements, setAggrements] = createStore<{ title: string; url: string }[]>([]);
  const [counter, setCounter] = createSignal<number>(0);

  const onAppendToast = (payload: { status: "success" | "info" | "danger" | "warning"; message: string }) => {
    mutate(
      "toasts",
      produce((states) => {
        const id = states.length + 1;

        states.push({ id, ...payload });
        states.sort((a, b) => b.id - a.id);
      })
    );
  };

  const onSubmitRegister = (e: Event) => {
    e.preventDefault();
    const messages = [
      "Please enter your name",
      "Please enter your name at least 4 characters",
      "Your name must be max 30 characters",
      "Please enter your email address",
      "Please enter a valid email address",
      "Please enter your password",
      "Please enter your password at least 6 characters",
    ];

    if (
      !value.name.trim().length ||
      value.name.trim().length < 4 ||
      value.name.trim().length > 30 ||
      !value.email.trim().length ||
      !value.email.match(pattern.email) ||
      !value.password.trim().length ||
      value.password.trim().length < 6
    ) {
      return onAppendToast({
        status: "warning",
        message:
          messages[
            value.name.trim().length < 4
              ? 1
              : value.name.trim().length > 30
              ? 2
              : !value.email.trim().length
              ? 3
              : !value.email.match(pattern.email)
              ? 4
              : !value.password.trim().length
              ? 5
              : value.password.trim().length < 6
              ? 6
              : 0
          ],
      });
    }

    setCounter(30);
    return auth.register(Date.now());
  };

  const onSubmitResendLinkActivationAccount = (e: Event) => {
    e.preventDefault();
  };

  const inputs: { type: "text" | "password"; name: "name" | "email" | "password"; placeholder: string; maxlength?: number }[] = [
    { type: "text", name: "name", placeholder: "Name", maxlength: 30 },
    { type: "text", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
  ];

  onMount(() => {
    document.title = "Register";
    setAggrements(
      produce((states) => {
        appearUrls().map((item) => {
          if (item.appear_on.register_form) return states.push(item);
        });
      })
    );
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
    setCounter(0);
  });

  createEffect(() => {
    counter() > 0 && setTimeout(() => setCounter(counter() - 1), 1000);
  });

  return (
    <>
      <div class="flex flex-col w-full p-3 gap-3 outline max-md:outline-0 outline-1 outline-[var(--border-primary)] rounded-lg items-center">
        <div class="flex flex-col w-full items-center gap-2">
          <Icons name="logo" class="size-full max-w-20 max-h-20 aspect-square" />
          <span class="text-center text-sm text-[var(--text-secondary)]">Meet your friends and see their memories</span>
        </div>
        <form onsubmit={onSubmitRegister} class="flex flex-col w-full gap-2 mt-3">
          <For each={inputs}>{(input) => <Input {...input} value={value} setValue={setValue} />}</For>
          <Show when={agreements.length > 0}>
            <div class="inline w-full my-2 text-sm text-center text-[var(--text-secondary)]">
              Before you click register, please follow our{" "}
              <Index each={agreements}>
                {(item, index) => (
                  <Switch>
                    <Match when={index !== agreements.length - 1}>
                      <a href={item().url} target="_blank" class="text-blue-600 active:text-blue-700 no-underline">
                        {item().title}
                      </a>
                      ,{" "}
                    </Match>
                    <Match when={index === agreements.length - 1}>
                      and{" "}
                      <a href={item().url} target="_blank" class="text-blue-600 active:text-blue-700 no-underline">
                        {item().title}
                      </a>
                    </Match>
                  </Switch>
                )}
              </Index>
            </div>
          </Show>
          <button
            class="flex w-full py-2.5 px-2 justify-center text-center bg-blue-600 active:bg-blue-700 disabled:bg-blue-950 text-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed rounded-lg"
            disabled={!value.name.trim().length || !value.email.trim().length || !value.password.trim().length}
          >
            Register
          </button>
        </form>
        <Show when={auth.registerId()}>
          <form onsubmit={onSubmitResendLinkActivationAccount} class="flex w-full justify-center mt-2">
            <button
              class="w-fit text-center text-blue-600 active:text-blue-700 disabled:text-blue-950 disabled:cursor-not-allowed"
              disabled={counter() > 0}
            >
              <Switch>
                <Match when={counter() !== 0}>wait {counter()}s</Match>
                <Match when={counter() === 0}>Resend link activation</Match>
              </Switch>
            </button>
          </form>
        </Show>
      </div>
      <div class="inline-block text-center w-full p-3 outline max-md:outline-0 outline-1 outline-[var(--border-primary)] rounded-lg">
        <span class="text-[var(--text-secondary)]">Already have an account?</span>{" "}
        <a href="/account/login" class="text-blue-600 active:text-blue-700">
          Login
        </a>
      </div>
    </>
  );
};

export default PageRegister;
