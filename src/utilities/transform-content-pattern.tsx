import { pattern } from "~/configurations/pattern-config";

export default function transformContentPattern(payload: string) {
  let text = payload
    .replace(/\n\n/g, "\n")
    .replace(pattern.username, `<a href="/@$1" class="bg-blue-600 active:bg-blue-700 rounded-lg py-1 px-2 text-neutral-50">@$1</a>`)
    .replace(pattern.hastag, `<a href="/explore/hastags/${decodeURIComponent("$1")}" class="text-blue-600 active:text-blue-700 no-underline">#$1</a>`)
    .replace(pattern.url, `<a href="$&" target="_blank" class="text-blue-600 active:text-blue-700 no-underline">$&</a>`);

  return text;
}
