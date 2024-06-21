import Link from 'next/link';
import { FC } from 'react';
import { GuideFrontMatter } from '../types/guides';
import Image from 'next/image';

export const GuidePreview: FC<GuideFrontMatter> = ({
  title,
  summary,
  slug,
  image,
}) => {
  let isimage;

  if (!image) {
    isimage = '';
  } else {
    isimage = <Image src={image} alt={title} width={130} height={130}></Image>;
  }

  return (
    <Link
      href={`/guides/${slug}`}
      className="prevent-default group inline-grid"
    >
      <div className="flex">
        <div>
          {isimage}
          <h2 className="leading-normal text-gray-800 dark:text-gray-200 md:text-xl lg:text-2xl text-center">
            {' '}
            {title}
          </h2>
          <div className="ml-10 mt-4">{summary} </div>{' '}
        </div>
      </div>
    </Link>
  );
};
