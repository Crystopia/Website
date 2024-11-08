// import { GetStaticProps, NextPage } from 'next';
// import Link from 'next/link';
// import { useMemo, useState } from 'react';
// import { Head, Image } from '../../components';
// import { PostFrontMatter } from '../../types';

// interface HomePageProps {
//   posts: PostFrontMatter[];
// }

// // Build time Node.js code
// export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
//   // Create list with all blog post
//   const posts = await getFrontMatterOfPosts();

//   // Return page props
//   return { props: { posts } };
// };

// // Client side React.js code
// const HomePage: NextPage<HomePageProps> = ({ posts }) => {
//   // Create search state
//   const [search] = useState('');

//   // Create filtered posts list
//   const filteredPosts = useMemo(
//     () =>
//       posts.filter(({ title }) =>
//         title.toLowerCase().includes(search.toLowerCase())
//       ),
//     [posts, search]
//   );

//   return (
//     <>
//       <Head
//         title="Blog - Crystopia.net"
//         description="Unique Minecraft server with a focus on community and creativity. Join us today!"
//       />
//       <div className="flex items-center space-x-4 md:space-x-5 lg:space-x-6">
//         <Image
//           className="w-8 h-8 rounded-full prevent-default md:w-10 lg:w-12 md:h-10 lg:h-12"
//           src="/images/crystopia.png"
//           alt="Crystopia.net"
//           sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
//         />
//         <h1>Crystopia.net | Blog</h1>
//       </div>

//       <div><Link href={"/blog/de"}><b className='text-white hover:text-gray-400'>Go to German Blog</b></Link></div>

//       <ul className="flex mt-6 space-x-8 prevent-default md:space-x-9 lg:space-x-10 md:mt-8 lg:mt-10">
//         {[].map(({ href }) => (
//           <li key={href}>
//             <a
//               className="block h-8 text-black prevent-default lg:h-9 dark:text-white"
//               href={href}
//               target="_blank"
//               rel="noreferrer"
//             ></a>
//           </li>
//         ))}
//       </ul>

//       {filteredPosts.length ? (
//         <PostList className="mt-12 md:mt-16 lg:mt-20" posts={filteredPosts} />
//       ) : (
//         <p className="mt-12 md:mt-16 lg:mt-20">
//           The post you are looking for does not exist yet. 😬
//         </p>
//       )}
//     </>
//   );
// };

// export default HomePage;
