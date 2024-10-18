import SvgAddNew from "~/assets/icons/svg/svg-add-new";
import SvgAdvertisement from "~/assets/icons/svg/svg-advertisement";
import SvgAlert from "~/assets/icons/svg/svg-alert";
import SvgArrow from "~/assets/icons/svg/svg-arrow";
import SvgArticle from "~/assets/icons/svg/svg-article";
import SvgBookmark from "~/assets/icons/svg/svg-bookmark";
import SvgCalendar from "~/assets/icons/svg/svg-calendar";
import SvgComment from "~/assets/icons/svg/svg-comment";
import SvgCompass from "~/assets/icons/svg/svg-compass";
import SvgCopy from "~/assets/icons/svg/svg-copy";
import SvgCross from "~/assets/icons/svg/svg-cross";
import SvgDashboard from "~/assets/icons/svg/svg-dashboard";
import SvgDeliveried from "~/assets/icons/svg/svg-deliveried";
import SvgDevices from "~/assets/icons/svg/svg-devices";
import SvgEmoji from "~/assets/icons/svg/svg-emoji";
import SvgEye from "~/assets/icons/svg/svg-eye";
import SvgFile from "~/assets/icons/svg/svg-file";
import SvgGallery from "~/assets/icons/svg/svg-gallery";
import SvgGlobe from "~/assets/icons/svg/svg-globe";
import SvgHeart from "~/assets/icons/svg/svg-heart";
import SvgHome from "~/assets/icons/svg/svg-home";
import SvgLink from "~/assets/icons/svg/svg-link";
import SvgLogo from "~/assets/icons/svg/svg-logo";
import SvgLogout from "~/assets/icons/svg/svg-logout";
import SvgMention from "~/assets/icons/svg/svg-mention";
import SvgMute from "~/assets/icons/svg/svg-mute";
import SvgNotification from "~/assets/icons/svg/svg-notification";
import SvgOptions from "~/assets/icons/svg/svg-options";
import SvgPaperPlane from "~/assets/icons/svg/svg-paper-plane";
import SvgPen from "~/assets/icons/svg/svg-pen";
import SvgPersonalize from "~/assets/icons/svg/svg-personalize";
import SvgPrivate from "~/assets/icons/svg/svg-private";
import SvgReplying from "~/assets/icons/svg/svg-replying";
import SvgReport from "~/assets/icons/svg/svg-report";
import SvgSearch from "~/assets/icons/svg/svg-search";
import SvgSetting from "~/assets/icons/svg/svg-setting";
import SvgShield from "~/assets/icons/svg/svg-shield";
import SvgTextEditor from "~/assets/icons/svg/svg-text-editor";
import SvgTheme from "~/assets/icons/svg/svg-theme";
import SvgTrash from "~/assets/icons/svg/svg-trash";
import SvgUpload from "~/assets/icons/svg/svg-upload";
import SvgUser from "~/assets/icons/svg/svg-user";
import SvgVerified from "~/assets/icons/svg/svg-verified";
import SvgVideoActions from "~/assets/icons/svg/svg-video-actions";
import SvgVote from "~/assets/icons/svg/svg-vote";
import { Component, JSXElement, Show, splitProps } from "solid-js";

export type SvgProps = {
  class?: string;
  is_active?: boolean;
  is_checked?: boolean;
  is_dark_mode?: boolean;
  is_deliveried?: boolean;
  is_fullscreen?: boolean;
  is_muted?: boolean;
  is_visited?: boolean;
  type_alert?: "danger" | "help" | "info" | "success" | "warning" | "helper";
  type_devices?: "mobile" | "web";
  type_options?: "3 line" | "3 dot horizontal" | "3 dot vertical" | "short";
  type_gallery?: "all" | "picture" | "video" | "reaction" | "addReaction" | "collections";
  type_link?: "blank" | "url";
  type_pen?: "box" | "normal";
  type_shield?: "blank" | "password";
  type_text_editor?: "bold" | "italic" | "strike" | "underline" | "order" | "heading" | "blockquote";
  type_user?: "block" | "circle" | "normal" | "tagged" | "mute" | "admin" | "add" | "following";
  type_video_actions?: "pause" | "play" | "stop";
  type_vote?: "up" | "down";
};

interface Props extends SvgProps {
  name:
    | "addNew"
    | "advertisement"
    | "alert"
    | "arrow"
    | "article"
    | "bookmark"
    | "calendar"
    | "comment"
    | "compass"
    | "copy"
    | "cross"
    | "dashboard"
    | "deliveried"
    | "devices"
    | "addEmoji"
    | "eye"
    | "file"
    | "gallery"
    | "globe"
    | "heart"
    | "home"
    | "link"
    | "logo"
    | "logout"
    | "mention"
    | "mute"
    | "notification"
    | "options"
    | "paperPlane"
    | "pen"
    | "personalize"
    | "private"
    | "replying"
    | "report"
    | "search"
    | "setting"
    | "shield"
    | "textEditor"
    | "theme"
    | "trash"
    | "upload"
    | "user"
    | "verified"
    | "videoActions"
    | "vote";
}

const Svgs: Record<string, (props: SvgProps) => JSXElement> = {
  addNew: SvgAddNew,
  advertisement: SvgAdvertisement,
  alert: SvgAlert,
  arrow: SvgArrow,
  article: SvgArticle,
  bookmark: SvgBookmark,
  calendar: SvgCalendar,
  comment: SvgComment,
  compass: SvgCompass,
  copy: SvgCopy,
  cross: SvgCross,
  dashboard: SvgDashboard,
  deliveried: SvgDeliveried,
  devices: SvgDevices,
  addEmoji: SvgEmoji,
  eye: SvgEye,
  file: SvgFile,
  gallery: SvgGallery,
  globe: SvgGlobe,
  heart: SvgHeart,
  home: SvgHome,
  link: SvgLink,
  logo: SvgLogo,
  logout: SvgLogout,
  mention: SvgMention,
  mute: SvgMute,
  notification: SvgNotification,
  options: SvgOptions,
  paperPlane: SvgPaperPlane,
  pen: SvgPen,
  personalize: SvgPersonalize,
  private: SvgPrivate,
  replying: SvgReplying,
  report: SvgReport,
  search: SvgSearch,
  setting: SvgSetting,
  shield: SvgShield,
  textEditor: SvgTextEditor,
  theme: SvgTheme,
  trash: SvgTrash,
  upload: SvgUpload,
  user: SvgUser,
  verified: SvgVerified,
  videoActions: SvgVideoActions,
  vote: SvgVote,
};

const Icons: Component<Props> = (props) => {
  const [local, others] = splitProps(props, ["name"]);
  const Component = Svgs[local.name];

  return <Show when={local.name in Svgs} fallback={<SvgLogo {...others} />} children={<Component {...others} />} />;
};

export default Icons;
