import { FC } from 'react';
import { GuideFrontMatter } from '../types/guides';
import { GuidePreview } from './GuidePreview';
import { GuideSeparator } from './GuideSeparator';

interface GuidesListProps {
  className?: string;
  guides: GuideFrontMatter[];
}

export const GuideList: FC<GuidesListProps> = ({ className, guides }) => (
  <div className={`flex flex-wrap justify-between ${className}`}>
    {guides.map((post, index) => (
      <div key={post.slug} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
        <GuideSeparator
          currentPost={post}
          previousPost={guides[index - 1]}
          posts={guides}
        />
        <GuidePreview {...post} />
      </div>
    ))}
  </div>
);