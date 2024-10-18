import { Component, For, onCleanup, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import Input from "~/components/form/input";
import { pattern } from "~/configurations/pattern-config";
import authMutation from "~/functions/auth-mutation";
import { mutateStore } from "~/stores/manage";

const PageLogin: Component = () => {
  const auth = authMutation();
  const mutate = mutateStore();
  const [value, setValue] = createStore<{ email: string; password: string }>({ email: "", password: "" });

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

  const onSubmitLogin = (e: Event) => {
    e.preventDefault();
    const messages = ["Please enter an email address", "Please enter a valid email address", "Please enter a password"];

    if (!value.email.trim().length || !value.email.match(pattern.email) || !value.password.trim().length) {
      return onAppendToast({
        status: "warning",
        message: messages[!value.email.match(pattern.email) ? 1 : !value.password.trim().length ? 2 : 0],
      });
    }

    auth.login(value);
  };

  const inputs: { type: "text" | "password"; name: "email" | "password"; placeholder: string }[] = [
    { type: "text", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
  ];

  onMount(() => {
    document.title = "Login";
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <>
      <div class="flex flex-col w-full p-3 gap-3 outline max-md:outline-0 outline-1 outline-[var(--border-primary)] rounded-lg items-center">
        <Icons name="logo" class="size-full max-w-20 max-h-max-w-20 aspect-square" />
        <form onsubmit={onSubmitLogin} class="flex flex-col w-full gap-2 mt-2">
          <For each={inputs}>{(input) => <Input {...input} value={value} setValue={setValue} />}</For>
          <button
            class="flex w-full py-2.5 px-2 justify-center text-center bg-blue-600 active:bg-blue-700 disabled:bg-blue-950 text-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed rounded-lg"
            disabled={!value.email.trim().length || !value.password.trim().length}
          >
            Login
          </button>
        </form>
        <div class="flex flex-col w-full gap-2">
          <div class="relative flex justify-center items-center">
            <span class="z-[1] px-4 bg-[var(--bg-primary)] text-[var(--text-secondary)] select-none">OR</span>
            <div class="absolute w-full border-b border-solid border-[var(--border-primary)]"></div>
          </div>
          <div class="inline-block text-center">
            <a href="/account/password/reset" class="text-[var(--text-primary)] active:text-[var(--text-primary-hover)]">
              Forgot password
            </a>
          </div>
        </div>
      </div>
      <div class="inline-block text-center w-full p-3 outline max-md:outline-0 outline-1 outline-[var(--border-primary)] rounded-lg">
        Doesn't have an account?{" "}
        <a href="/account/register" class="text-blue-600 active:text-blue-700">
          Register
        </a>
      </div>
    </>
  );
};

export default PageLogin;
