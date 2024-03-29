import React from "react";
import moment from "moment";
import { Link } from "gatsby";
import styles from "./Feed.module.scss";
import parseMD from "../../utils/markdown-parser";

const Feed = ({ edges }) => (
  <div className={styles["feed"]}>
    {edges.map((edge) => (
      <div className={styles["feed__item"]} key={edge.node.fields.slug}>
        <div className={styles["feed__itemMeta"]}>
          <time
            className={styles["feed__itemMetaTime"]}
            dateTime={moment(edge.node.frontmatter.date).format("MMMM D, YYYY")}
          >
            {moment(edge.node.frontmatter.date).format("MMMM YYYY")}
          </time>
          <span className={styles["feed__itemMetaDivider"]} />
          <span className={styles["feed__itemMetaCategory"]}>
            <Link
              to={edge.node.fields.categorySlug}
              className={styles["feed__itemMetaCategoryLink"]}
            >
              {edge.node.frontmatter.category}
            </Link>
          </span>
        </div>
        <h2 className={styles["feed__itemTitle"]}>
          <Link
            className={styles["feed__itemTitleLink"]}
            to={edge.node.fields.slug}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: parseMD(edge.node.frontmatter.title),
              }}
            />
          </Link>
        </h2>
        <div
          className={styles["feed__itemDescription"]}
          dangerouslySetInnerHTML={{
            __html: parseMD(edge.node.frontmatter.description),
          }}
        />
        <Link
          className={styles["feed__itemReadmore"]}
          to={edge.node.fields.slug}
        >
          Read
        </Link>
      </div>
    ))}
  </div>
);

export default Feed;
