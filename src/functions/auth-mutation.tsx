import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { produce } from "solid-js/store";
import { generateUsers } from "~/data/user-data";
import { userNames } from "~/data/user-name-data";
import { mutateStore, selectStore } from "~/stores/manage";
import { authProps } from "~/types/user-interfaces";

export default function authMutation() {
  const location = useLocation();
  const navigate = useNavigate();

  const auth = selectStore((store) => store.auth!);
  const mutate = mutateStore();

  const [prevUrl, setPrevUrl] = createSignal<string | null>(null);
  const [registerId, setRegisterId] = createSignal<string | null>(null);

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

  const login = (payload: { email: string; password: string }) => {
    if (payload.email !== "user@email.com") return onAppendToast({ status: "danger", message: "Email must be 'user@email.com'" });
    if (payload.password !== "password") return onAppendToast({ status: "warning", message: "Password must be 'password'" });

    const randomUserIndex = Math.floor(Math.random() * userNames.length);
    const auth = generateUsers(randomUserIndex) as authProps;
    mutate("auth", auth);

    navigate((location.state as { prevUrl?: string })?.prevUrl || "/", { replace: true });
  };

  const logout = () => {
    if (!auth()) return;
    mutate(
      produce((state) => {
        state.auth = null;
        state.entries = [];
        state.findCollections = [];
        state.findComments = [];
        state.findConversations = [];
        state.findConversations = [];
        state.findFollowUsers = [];
        state.findManageUsers = [];
        state.findMessages = [];
        state.findNotifications = [];
        state.findPosts = [];
        state.userSuggestions = [];
        state.findUserTags = [];
        state.getProfile = null;
        state.searchUsers = [];
        state.toasts = [];
        state.verifyRequest = null;
      })
    );

    navigate("/account/login", { replace: true, state: { prevUrl: prevUrl() } });
  };

  const register = (number: number) => {
    setRegisterId(`${number}`);
    onAppendToast({ status: "danger", message: "Register has been success" });
  };

  createEffect(() => {
    if (location.pathname) {
      setPrevUrl(location.pathname);
    }
  });

  return { login, logout, register, registerId };
}
