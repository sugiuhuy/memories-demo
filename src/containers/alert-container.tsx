import { ParentComponent } from "solid-js";
import Icons from "~/assets/icons";

interface Props {
  type_alert: "info" | "danger" | "help" | "success" | "warning";
  description: string;
}

const AlertContainer: ParentComponent<Props> = (props) => {
  return (
    <div class="flex flex-col w-full max-w-96 rounded-lg bg-[var(--bg-secondary)] animate-zoom-in divide-y divide-solid divide-[var(--border-secondary)]">
      <div class="flex w-full flex-col p-3 gap-2 items-center">
        <Icons
          name="alert"
          type_alert={props.type_alert}
          class={`size-16 aspect-square ${
            props.type_alert === "info"
              ? "text-sky-500"
              : props.type_alert === "danger"
              ? "text-red-500"
              : props.type_alert === "help"
              ? "text-blue-500"
              : props.type_alert === "success"
              ? "text-green-500"
              : "text-yellow-500"
          }`}
        />
        <div class="flex w-full items-center justify-center">
          <span class="text-[var(--text-primary)] text-center">{props.description}</span>
        </div>
      </div>
      <div class="flex w-full divide-x divide-solid divide-[var(--border-secondary)]">{props.children}</div>
    </div>
  );
};

export default AlertContainer;
