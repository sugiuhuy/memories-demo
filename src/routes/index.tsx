import { Route } from "@solidjs/router";
import { Component } from "solid-js";
import AccountGuestContainer from "~/containers/account-guest-container";
import AccountSettingContainer from "~/containers/account-setting-container";
import MainContainer from "~/containers/main-container";
import ProfileContainer from "~/containers/profile-container";
import PageChangePassword from "~/pages/page-change-password";
import PageChat from "~/pages/page-chat";
import PageCollections from "~/pages/page-collections";
import PageEditProfile from "~/pages/page-edit-profile";
import PageError from "~/pages/page-error";
import PageExplore from "~/pages/page-explore";
import PageForgotPassword from "~/pages/page-forgot-password";
import PageHome from "~/pages/page-home";
import PageLogin from "~/pages/page-login";
import PageManage from "~/pages/page-manage";
import PageNotifications from "~/pages/page-notifications";
import PagePost from "~/pages/page-post";
import { PageProfileAllPosts, PageProfileSavedPosts, PageProfileTaggedPosts } from "~/pages/page-profile-post";
import PageRegister from "~/pages/page-register";
import PageSetting from "~/pages/page-setting";
import PageSwitchAccountPrivate from "~/pages/page-switch-account-private";
import PageSwitchAppearance from "~/pages/page-switch-appearance";
import PageVerifyingAccount from "~/pages/page-verifying-account";

const Routes: Component = () => {
  const matchRoutes = {
    profile: {
      username: /@(\w+)/,
      explore: ["saved", "tagged"],
    },
    setting: {
      manage: ["tags_mentions", "push_notifications", "block", "mute", "personalize"],
    },
  };

  return (
    <>
      <Route path="/" component={MainContainer}>
        <Route path="/" component={PageHome} />
        <Route path="explore" component={PageExplore} />
        <Route path="notifications" component={PageNotifications} />
        <Route path="chat/:conversation?" component={PageChat} />
        <Route path="post/:post/:comment?" component={PagePost} />
        <Route path=":username" component={ProfileContainer}>
          <Route path="/" component={PageProfileAllPosts} />
          <Route path="/tagged" component={PageProfileTaggedPosts} />
          <Route path="/saved" component={PageProfileSavedPosts} />
        </Route>
        <Route path="account" component={AccountSettingContainer}>
          <Route path="/" component={PageSetting} />
          <Route path="edit" component={PageEditProfile} />
          <Route path="password" component={PageChangePassword} />
          <Route path="privacy" component={PageSwitchAccountPrivate} />
          <Route path="manage/:manage" component={PageManage} matchFilters={matchRoutes.setting} />
          <Route path="collections" component={PageCollections} />
          <Route path="switch_appearance" component={PageSwitchAppearance} />
          <Route path="verifying" component={PageVerifyingAccount} />
        </Route>
      </Route>
      <Route path="/account" component={AccountGuestContainer}>
        <Route path="login" component={PageLogin} />
        <Route path="register" component={PageRegister} />
        <Route path="password/reset/:request?" component={PageForgotPassword} />
      </Route>
      <Route path="*404" component={() => <PageError statusCode={404} statusMessage="Page not found" class="flex flex-col w-full p-2 gap-2" />} />
    </>
  );
};

export default Routes;
