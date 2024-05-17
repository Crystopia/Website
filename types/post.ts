export interface PostFrontMatter {
  title: string;
  publishedAt: string;
  tag: string;
  image?: string;
  summary: string;
  slug: string;
}

export interface Post extends PostFrontMatter {
  wordCount: number;
  readingTime: string;
  sourceCode: string;
}
