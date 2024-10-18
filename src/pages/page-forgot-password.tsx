import { Component, createEffect, createSignal, Match, onCleanup, onMount, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import Input from "~/components/form/input";
import { pattern } from "~/configurations/pattern-config";
import { mutateStore } from "~/stores/manage";

const PageForgotPassword: Component = () => {
  const mutate = mutateStore();

  const [counter, setCounter] = createSignal<number>(0);
  const [value, setValue] = createStore<{ email: string }>({ email: "" });

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

  const onSubmitForgotPassword = (e: Event) => {
    e.preventDefault();
    const messages = ["Please enter an email address", "Please enter a valid email address"];
    if (!value.email.trim().length || !value.email.match(pattern.email)) {
      return onAppendToast({
        status: "warning",
        message: messages[!value.email.match(pattern.email) ? 1 : 0],
      });
    }

    setValue("email", "");
    setCounter(30);
    onAppendToast({
      status: "success",
      message: "Success to resend link reset password",
    });
  };

  onMount(() => {
    document.title = "Forgot password";
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  createEffect(() => {
    counter() > 0 && setTimeout(() => setCounter(counter() - 1), 1000);
  });

  return (
    <>
      <div class="flex flex-col w-full p-3 gap-3 outline max-md:outline-0 outline-1 outline-[var(--border-primary)] rounded-lg items-center">
        <div class="flex flex-col w-full items-center gap-2">
          <Icons name="private" class="size-full max-w-20 max-h-20 aspect-square" />
          <span class="text-center text-sm text-[var(--text-secondary)]">
            Enter your email and we'll send you a link to get back into your account
          </span>
        </div>
        <form onsubmit={onSubmitForgotPassword} class="flex flex-col w-full gap-2 mt-3">
          <Input type="text" name="email" placeholder="Email" value={value} setValue={setValue} />
          <button
            class="flex w-full py-2.5 px-2 justify-center text-center bg-blue-600 active:bg-blue-700 disabled:bg-blue-950 text-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed rounded-lg"
            disabled={!value.email.trim().length}
          >
            <Switch>
              <Match when={counter() > 0}>wait {counter()}s</Match>
              <Match when={counter() === 0}>Submit</Match>
            </Switch>
          </button>
        </form>
      </div>
      <div class="inline-block text-center w-full p-3 outline max-md:outline-0 outline-1 outline-[var(--border-primary)] rounded-lg">
        <a href="/account/login" class="text-[var(--text-primary)] active:text-[var(--text-secondary)]">
          Back to login
        </a>
      </div>
    </>
  );
};

export default PageForgotPassword;
