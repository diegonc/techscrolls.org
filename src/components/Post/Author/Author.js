import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';

const capitalize = s => s && s[0].toUpperCase() + s.substring(1);

export const PureAuthor = ({ data }) => {
  const { author } = data.site.siteMetadata;
  const contact = Object.entries(author.contacts)
    .filter(e => e[1] && e[1] !== '#')
    .find(e => e[0] === 'twitter' || e[0] === 'github');
  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        {author.bio}
        <a
          className={styles[`author__bio${capitalize(contact[0])}`]}
          href={getContactHref(contact[0], contact[1])}
          rel="noopener noreferrer"
          target="_blank"
        >
          <strong>{author.name}</strong> on {capitalize(contact[0])}
        </a>
      </p>
    </div>
  );
};

export const Author = (props) => (
  <StaticQuery
    query={graphql`
      query AuthorQuery {
        site {
          siteMetadata {
            author {
              name
              bio
              contacts {       
                twitter
                github
              }
            }
          }
        }
      }
    `}
    render={(data) => <PureAuthor {...props} data={data} />}
  />
);

export default Author;
