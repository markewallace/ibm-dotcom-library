/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CTA } from '../../../components/CTA';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LinkList Component, for use with items array
 *
 * @param {object} props props object
 * @param {string} props.heading  Heading string
 * @param {Array} props.items array of item
 * @returns {*} JSX LinkList component
 */
const LinkList = ({ heading, items }) => {
  return (
    <div
      className={`${prefix}--link-list`}
      data-autoid={`${stablePrefix}--link-list`}>
      <h4 className={`${prefix}--link-list__heading`}>{heading}</h4>
      <ul className={`${prefix}--link-list__list`}>
        {items.map((cta, index) => {
          return (
            <li className={`${prefix}--link-list__list__CTA`} key={index}>
              <CTA style="card" {...cta} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

LinkList.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.instanceOf(CTA).isRequired),
};

export default LinkList;
