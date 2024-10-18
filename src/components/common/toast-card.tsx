import { Component, createEffect, createSignal, onCleanup } from "solid-js";
import { produce } from "solid-js/store";
import Icons from "~/assets/icons";
import { mutateStore } from "~/stores/manage";

interface Props {
  id: number;
  status: "success" | "info" | "danger" | "warning";
  message: string;
}

const ToastCard: Component<Props> = (props) => {
  let timeOut: number = 0;
  let containerRef: HTMLDivElement | undefined;

  const mutate = mutateStore();
  const [isHide, setIsHide] = createSignal<boolean>(false);

  onCleanup(() => {
    clearTimeout(timeOut);
  });

  createEffect(() => {
    if (isHide()) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        containerRef!.style.setProperty("display", "none");
        mutate(
          "toasts",
          produce((states) => {
            const index = states.findIndex((i) => i.id === props.id);
            if (index === -1) return;

            states.splice(index, 1);
          })
        );
      }, 300);
    }

    if (!isHide()) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        setIsHide(true);
      }, 5000);
    }
  });

  return (
    <div
      ref={containerRef}
      class={`flex w-full p-2 gap-2 rounded-lg select-none cursor-pointer group/toastify ${
        props.status === "danger"
          ? "bg-red-600 text-red-950 dark:bg-red-950 dark:text-red-50"
          : props.status === "info"
          ? "bg-sky-600 text-sky-950 dark:bg-sky-950 dark:text-sky-50"
          : props.status === "success"
          ? "bg-green-600 text-green-950 dark:bg-green-950 dark:text-green-50"
          : "bg-yellow-600 text-yellow-950 dark:bg-yellow-950 dark:text-yellow-50"
      } ${isHide() ? "animate-toast-hide" : "animate-toas-show"}`}
      onClick={() => setIsHide(true)}
    >
      <Icons name="alert" type_alert={props.status} class="size-4 aspect-square shrink-0 mt-1" />
      <span class="flex w-full h-full items-center select-none">{props.message}</span>
      <Icons name="cross" class="size-3 mt-1 aspect-square shrink-0 rotate-45 opacity-50 group-hover/toastify:opacity-100 transition-opacity" />
    </div>
  );
};

export default ToastCard;
