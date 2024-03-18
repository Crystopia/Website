import { FC } from 'react';
import { GuideFrontMatter } from '../types/guides';
import { GuidePreview } from './GuidePreview';
import { GuideSeparator } from './GuideSeparator';

interface GuidesListProps {
  className?: string;
  guides: GuideFrontMatter[];
}

export const GuideList: FC<GuidesListProps> = ({ className, guides }) => (
  <ul
    className={`prevent-default space-y-10 md:space-y-12 lg:space-y-14 ${className}`}
  >
    {guides.map((post, index) => (
      <li key={post.slug} className="space-y-10 md:space-y-12 lg:space-y-14">
        <GuideSeparator
          currentPost={post}
          previousPost={guides[index - 1]}
          posts={guides}
        />
        <GuidePreview {...post} />
      </li>
    ))}
  </ul>
);
