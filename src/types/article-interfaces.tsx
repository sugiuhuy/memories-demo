export interface findArticleGroupingsProps {
  _id: string | null;
  groupName: string | null;
  articles: { _id: string; title: string }[];
}
