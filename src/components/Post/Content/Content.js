import React from 'react';
import styles from './Content.module.scss';
import parseMD from '../../../utils/markdown-parser';

const Content = ({ body, title }) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']} dangerouslySetInnerHTML={{ __html: parseMD(title)}} />
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
