import Link from 'next/link';
import { FC } from 'react';
import { PostFrontMatter } from '../types';
import Image from 'next/image';

export const PostPreview: FC<PostFrontMatter> = ({
  title,
  publishedAt,
  tag,
  image,
  summary,
  slug,
}) => {
  let isimage

  if (image) {
    isimage = <Image src={image} alt={title} width={4000} height={20} />;
  }

  let tagColorClass = '';
  switch (tag) {
    case 'Update':
      tagColorClass = 'text-cyan-400';
      break;
    case 'Event':
      tagColorClass = 'text-green-400';
      break;
    default:
      tagColorClass = 'text-stone-600';
  }

  return (
    <Link
      href={`/blog/${slug}`}
      className="block prevent-default group relative overflow-hidden"
    >
      <div className="flex flex-col">
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="transform scale-100 group-hover:scale-95 transition-transform duration-300">
            {isimage}
          </div>
        </div>
        <div className="transform scale-100 group-hover:scale-95 transition-transform duration-300">
          <h1 className="text-white text-xl font-bold">{title}</h1>
          <p className="text-gray-600 text-sm mb-2 font-semibold">
            <b>
              {tag && (
                <span
                  className={`inline-block py-1 rounded-lg ${tagColorClass} mr-2`}
                >
                  {tag}
                </span>
              )}
              - {publishedAt}
            </b>
          </p>
          <p className="text-black">{summary}</p>
        </div>
      </div>
    </Link>
  );
};
