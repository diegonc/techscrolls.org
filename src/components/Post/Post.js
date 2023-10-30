import React, { useRef, useEffect } from "react";
import Author from "./Author";
import Comments from "./Comments";
import Content from "./Content";
import Meta from "./Meta";
import Tags from "./Tags";
import styles  from "./Post.module.scss";

const Post = ({ post }) => {
  const { tags, title, date } = post.frontmatter;

  const { html } = post;
  const { tagSlugs } = post.fields;

  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  return (
    <div ref={pageRef} className={styles["post"]}>
      <div className={styles["post__inner"]}>
        {/*<Link className={styles['post__home-button']} to="/">All Articles</Link>*/}
        <div className={styles["post__content"]}>
          <Content body={html} title={title} />
        </div>

        <div className={styles["post__footer"]}>
          <Meta date={date} />
          <Tags tags={tags} tagSlugs={tagSlugs} />
          <Author />
        </div>

        <div className={styles["post__comments"]}>
          <Comments
            postSlug={post.fields.slug}
            postTitle={post.frontmatter.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
