import { FC } from 'react';
import { PostFrontMatter } from '../types';
import { PostPreview } from './PostPreviewDE';
import { PostSeparator } from './PostSeparator';

interface PostListProps {
  className?: string;
  posts: PostFrontMatter[];
}

export const PostList: FC<PostListProps> = ({ className, posts }) => (
  <div className={`flex flex-wrap justify-center ${className}`}>
    {posts.map((post, index) => (
      <div key={post.title.toLowerCase()} className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
        <PostSeparator
          currentPost={post}
          previousPost={posts[index - 1]}
          posts={posts}
        />
        <div className="max-w-screen-lg mx-auto">
          <PostPreview {...post} />
        </div>
      </div>
    ))}
  </div>
);
