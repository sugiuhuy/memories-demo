import { Component, For, onCleanup, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Input from "~/components/form/input";
import SettingContainer from "~/containers/setting-container";
import { mutateStore } from "~/stores/manage";

const PageChangePassword: Component = () => {
  const mutate = mutateStore();
  const [value, setValue] = createStore<{ current_password: string; new_password: string; confirm_new_password: string }>({
    current_password: "",
    confirm_new_password: "",
    new_password: "",
  });

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

  const onSubmitChangePassword = (e: Event) => {
    e.preventDefault();
    const messages = [
      "Please enter your current password",
      "Please enter your new password",
      "Please enter your new password at least 6 characters",
      "Please confirm your new password",
      "Please confirm your new password correctly",
    ];

    if (
      !value.current_password.trim().length ||
      !value.new_password.trim().length ||
      value.new_password.trim().length < 6 ||
      !value.confirm_new_password.trim().length ||
      value.new_password !== value.confirm_new_password
    ) {
      return onAppendToast({
        status: "warning",
        message:
          messages[
            !value.new_password.trim().length
              ? 1
              : value.new_password.trim().length < 6
              ? 2
              : !value.confirm_new_password.trim().length
              ? 3
              : value.new_password !== value.confirm_new_password
              ? 4
              : 0
          ],
      });
    }

    setValue({ current_password: "", confirm_new_password: "", new_password: "" });
    onAppendToast({ status: "success", message: "Password has been changed" });
  };

  const inputs: { type: "password"; name: "current_password" | "new_password" | "confirm_new_password"; placeholder: string }[] = [
    { type: "password", name: "current_password", placeholder: "Current password" },
    { type: "password", name: "new_password", placeholder: "New password" },
    { type: "password", name: "confirm_new_password", placeholder: "Confirm new password" },
  ];

  onMount(() => {
    document.title = "Change password";
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <SettingContainer title="Change password" class="flex flex-col w-full h-full">
      <form onsubmit={onSubmitChangePassword} class="flex flex-col w-full gap-2">
        <span class="text-xs text-[text-(--text-secondary)]">*Never tell or share your password with anyone.</span>
        <For each={inputs}>{(input) => <Input {...input} value={value} setValue={setValue} />}</For>
        <div class="flex w-full justify-end">
          <button
            class="flex w-1/2 py-2.5 justify-center bg-blue-600 active:bg-blue-700 disabled:bg-blue-950 text-neutral-50 disabled:text-neutral-600 disabled:cursor-not-allowed rounded-lg"
            disabled={
              !value.current_password.trim().length ||
              !value.new_password.trim().length ||
              !value.confirm_new_password.trim().length ||
              value.confirm_new_password !== value.new_password
            }
          >
            Submit
          </button>
        </div>
      </form>
    </SettingContainer>
  );
};

export default PageChangePassword;
