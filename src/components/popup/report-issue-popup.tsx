import { Component, For, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";
import Icons from "~/assets/icons";
import ModalContainer from "~/containers/modal-container";

interface Props {
  reporting: { report_user?: string; report_post?: string; report_ads?: string };
  onClose: () => void;
}

const ReportIssuePopup: Component<Props> = (props) => {
  const [value, setValue] = createStore<{ reporting: object; issue: string; reason: string }>({
    reporting: props.reporting,
    issue: "",
    reason: "",
  });

  const onSubmit = () => {
    props.onClose();
  };

  const onSelectIssue = (payload: { issue: string; reason: string }) => {
    setValue(
      produce((state) => {
        state.issue = payload.issue;
        state.reason = payload.reason;
      })
    );
  };

  const onCloseModal = () => {
    props.onClose();
  };

  const options = [
    {
      value: "Hate",
      description:
        "Slurs, Racist or sexist stereotypes, Dehumanization, Incitement of fear or discrimination, Hateful references, Hateful symbols & logos",
    },
    {
      value: "Abuse & Harassment",
      description:
        "Insults, Unwanted Sexual Content & Graphic Objectification, Unwanted NSFW & Graphic Content, Violent Event Denial, Targeted Harassment and Inciting Harassment",
    },
    {
      value: "Violent Speech",
      description: "Violent Threats, Wish of Harm, Glorification of Violence, Incitement of Violence, Coded Incitement of Violence",
    },
    {
      value: "Child Safety",
      description: "Child sexual exploitation, grooming, physical child abuse, underage user",
    },
    {
      value: "Privacy",
      description:
        "Sharing private information, threatening to share/expose private information, sharing non-consensual intimate images, sharing images of me that I don’t want on the platform",
    },
    {
      value: "Spam",
      description:
        "Fake accounts, financial scams, posting malicious links, misusing hashtags, fake engagement, repetitive replies, Reposts, or Direct Messages",
    },
    {
      value: "Suicide or self-harm",
      description: "Encouraging, promoting, providing instructions or sharing strategies for self-harm",
    },
    {
      value: "Sensitive or disturbing media",
      description:
        "Graphic Content, Gratutitous Gore, Adult Nudity & Sexual Behavior, Violent Sexual Conduct, Bestiality & Necrophilia, Media depicting a deceased individual",
    },
    {
      value: "Deceptive identities",
      description: "Impersonation, non-compliant parody/fan accounts",
    },
    {
      value: "Violent & hateful entities",
      description: "Violent extremism and terrorism, hate groups & networks",
    },
  ];

  return (
    <ModalContainer class="flex flex-col w-full h-full max-w-[420px] max-h-[520px] md:max-h-[620px] animate-zoom-out" onClose={onCloseModal}>
      <div class="flex w-full p-3 items-center">
        <div class="flex w-full">
          <button class="flex group/icon justify-end" onclick={props.onClose}>
            <Icons
              name="cross"
              class="size-4 aspect-square rotate-45 group-active/icon:scale-95 group-active/icon:text-[var(--text-secondary-hover)] shrink-0"
            />
          </button>
        </div>
        <div class="flex justify-center shrink-0">Report the issue</div>
        <div class="flex w-full justify-end">
          <button
            class="flex group/submit text-blue-600 active:text-blue-700 disabled:text-[var(--text-secondary-hover)] disabled:cursor-not-allowed justify-end"
            onclick={onSubmit}
            disabled={!value.issue.trim().length || !value.reason.trim().length}
          >
            Report
          </button>
        </div>
      </div>
      <div class="flex w-full h-full overflow-hidden p-3">
        <div class="flex flex-col w-full h-full overflow-auto gap-4">
          <For each={options}>
            {(option) => (
              <button class="flex w-full items-center gap-5" onclick={() => onSelectIssue({ issue: option.value, reason: option.description })}>
                <div class="flex flex-col w-full">
                  <span class="text-start text-md text-[var(--text-primary)]">{option.value}</span>
                  <span class="text-start text-xs text-[var(--text-secondary-hover)]">{option.description}</span>
                </div>
                <div class="flex size-5 items-center justify-center shrink-0 border border-solid border-[var(--text-primary)] rounded-full mr-3">
                  <Show when={value.issue === option.value}>
                    <span class="flex size-3 bg-[var(--text-primary)] rounded-full"></span>
                  </Show>
                </div>
              </button>
            )}
          </For>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ReportIssuePopup;
