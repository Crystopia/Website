import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { GuideFrontMatter } from '../types/guides';

export async function getFrontMatterOfGuides(): Promise<GuideFrontMatter[]> {
  // Get blog post file names
  const fileNames = readdirSync(join(process.cwd(), 'enguides'));

  // Create list with front matter of all blog post
  const allPosts: GuideFrontMatter[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = join(process.cwd(), 'enguides', fileName);
      const fileData = readFileSync(filePath, 'utf8');
      const frontMatter = matter(fileData).data as Pick<
        GuideFrontMatter,
        'title' | 'summary' | 'publishedAt'
      >;
      const slug = fileName.replace('.mdx', '');

      return { ...frontMatter, slug };
    })
  );

  // Sort posts by publication date
  const sortedGuides = allPosts.sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1
  );

 return sortedGuides;
}
