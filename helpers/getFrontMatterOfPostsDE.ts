import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { PostFrontMatter } from '../types';
import { fetchDatabase } from './fetchDatabase';

export async function getFrontMatterOfPosts(): Promise<PostFrontMatter[]> {
  // Get blog post file names
  const fileNames = readdirSync(join(process.cwd(), 'deposts'));

  // Create list with front matter of all blog post
  const allPosts: PostFrontMatter[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = join(process.cwd(), 'deposts', fileName);
      const fileData = readFileSync(filePath, 'utf8');
      const frontMatter = matter(fileData).data as Pick<
        PostFrontMatter,
        keyof PostFrontMatter
      >;
      const slug = fileName.replace('.mdx', '');
      const views = (await fetchDatabase<number>(`/views/${slug}`)) || 0;
      return { ...frontMatter, slug, views };
    })
  );

  // Sort posts by publication date
  const sortedPosts = allPosts.sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );

  // Return sorted posts
  return sortedPosts;
}
