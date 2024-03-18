export interface GuideFrontMatter {
    title: string;
    summary: string;
    publishedAt: string;
    slug: string;
    tag?: string;
    image?: string;
  }
  
  export interface Guides extends GuideFrontMatter {
    wordCount: number;
    readingTime: string;
    sourceCode: string;
  }
  