import { useNavigate } from "@solidjs/router";
import { Component, onCleanup, onMount } from "solid-js";
import Icons from "~/assets/icons";
import SettingContainer from "~/containers/setting-container";

const PageSetting: Component = () => {
  const navigate = useNavigate();

  onMount(() => {
    if (!/Android|iPhone/i.test(navigator.userAgent) && navigator.maxTouchPoints === 0) {
      navigate("/account/edit");
    }

    document.title = "Settings";
  });

  onCleanup(() => {
    document.title = import.meta.env.VITE_TITLE;
  });

  return (
    <SettingContainer title="Settings" class="flex flex-col w-full h-full items-center justify-center">
      <Icons name="setting" class="size-full max-w-32 max-h-3max-w-32 aspect-square text-[var(--text-secondary-hover)]" />
    </SettingContainer>
  );
};

export default PageSetting;
