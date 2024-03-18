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
    isimage = <Image src={image} alt={title} width={100} height={100}></Image>;
  }

  return (
    <Link
      href={`/guides/${slug}`}
      className="prevent-default group inline-grid"
    >
      <div className="flex">
        {isimage}
        <div>
          <h2 className="ml-5 text-lg leading-normal text-gray-800 dark:text-gray-200 md:text-xl lg:text-2xl md:leading-normal lg:leading-normal text-center">
            {' '}
            {title}
          </h2>
          <div className="ml-10 mt-4">{summary} </div>{' '}
        </div>
      </div>

      <div className="mt-2 text-base transition-opacity opacity-75 lg:text-lg text-sky-600 dark:text-sky-400 group-hover:opacity-100 lg:mt-3">
        Read more...
      </div>
    </Link>
  );
};
