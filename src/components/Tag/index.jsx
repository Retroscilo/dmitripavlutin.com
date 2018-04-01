import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import slugify from 'voca/slugify';

import styles from './index.module.scss';
import { TO_TAG } from 'path';

export default function Tag({ name }) {
  const tag = slugify(name);
  return <Link to={TO_TAG({ tag })} className={styles.tag}>{name}</Link>;
}

Tag.propTypes = {
  name: PropTypes.string
};