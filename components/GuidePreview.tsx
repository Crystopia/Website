import Link from 'next/link';
import { FC } from 'react';
import { GuideFrontMatter } from '../types/guides';
import Image from 'next/image';

export const GuidePreview: FC<GuideFrontMatter> = ({
  title,
  summary,
  slug,
  tag,
  image,
  ...post
}) => {
  let isimage = '';

  if (!image) {
    isimage = '';
  } else {
    isimage = <Image src={image} alt={title} width={500} height={500}></Image>;
  }


  return (
    <Link href={`/guides/${slug}`} className="block prevent-default group">
      {isimage}
      <div className="space-y-3 md:flex md:justify-between md:space-y-0 md:space-x-8 lg:space-x-10">
        <div>
          <h2 className="inline text-lg leading-normal text-gray-800 dark:text-gray-200 md:text-xl lg:text-2xl md:leading-normal lg:leading-normal">
            {title}
          </h2>
          {tag && (
            <div className="relative inline px-2 py-1 ml-3 text-xs font-semibold rounded-lg -top-px bg-emerald-500/10 dark:bg-emerald-400/10 lg:text-base whitespace-nowrap text-emerald-500 dark:text-emerald-400 lg:ml-5 lg:px-3">
              {tag}
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 md:mt-4 lg:mt-6">{summary} </p>
      <div className="mt-2 text-base transition-opacity opacity-75 lg:text-lg text-sky-600 dark:text-sky-400 group-hover:opacity-100 lg:mt-3">
        Read more...
      </div>
    </Link>
  );
};
