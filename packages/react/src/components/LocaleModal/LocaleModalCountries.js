/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import { Search } from 'carbon-components-react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LocaleModalCountries component
 *
 * @param {object} props props object
 * @param {object} props.regionList object of country and language codes
 * @param {Function} props.setClearResults set flag to determine whether to reset the filtered results
 * @returns {*} LocaleModal component
 */
const LocaleModalCountries = ({
  regionList,
  setClearResults,
  ...modalLabels
}) => {
  useEffect(() => {
    const localeFilter = document.getElementById(
      `${prefix}--locale-modal__filter`
    );
    // const localeItems = document.querySelectorAll(
    //   `.${prefix}--locale-modal__locales`
    // );
    const localeText = document.querySelector(
      `.${prefix}--locale-modal__search-text`
    );
    const closeBtn = document.querySelector(
      `.${prefix}--search .${prefix}--search-close`
    );
    const localeHidden = `${prefix}--locale-modal__locales-hidden`;

    localeFilter.addEventListener('keyup', filterLocale);

    /**
     * Filter locale links based on search input
     *
     */
    function filterLocale() {
      const localeItems = document.querySelectorAll(
        `.${prefix}--locale-modal__list a:not(.${prefix}--locale-modal__locales-filtered)`
      );
      setClearResults(false);
      const filterVal = localeFilter.value.toUpperCase();

      [...localeItems].map(item => {
        const locale = item.getElementsByTagName('div');

        const country = locale[0].textContent || locale[0].innerText;
        const language = locale[1].textContent || locale[1].innerText;

        if (
          country.toUpperCase().indexOf(filterVal) > -1 ||
          language.toUpperCase().indexOf(filterVal) > -1
        ) {
          item.classList.remove(localeHidden);
        } else {
          item.classList.add(localeHidden);
        }
      });

      /**
       * Update locale copy when no results
       *
       */
      const localeItemsHidden = document.querySelectorAll(`.${localeHidden}`);

      localeText.innerHTML =
        localeItems.length == localeItemsHidden.length
          ? modalLabels.unavailabilityText
          : modalLabels.availabilityText;
    }

    /**
     * Show all links when close button clicked
     *
     */
    closeBtn.addEventListener('click', () => {
      setClearResults(true);
    });
  });

  return (
    <div className={`${prefix}--locale-modal__filter`}>
      <div className={`${prefix}--locale-modal__search`}>
        <Search
          data-autoid={`${stablePrefix}--locale-modal__filter`}
          placeHolderText={modalLabels.searchPlaceholder}
          labelText={modalLabels.searchLabel}
          closeButtonLabelText={modalLabels.searchClearText}
          id={`${prefix}--locale-modal__filter`}
        />
        <p className={`${prefix}--locale-modal__search-text`}>
          {modalLabels.availabilityText}
        </p>
      </div>
      <div className={`${prefix}--locale-modal__list`}>
        {regionList &&
          regionList.map(region =>
            region.countries.map((country, index) => (
              <a
                key={index}
                className={`${prefix}--locale-modal__locales`}
                href={country.href}
                data-region={country.region}>
                <div className={`${prefix}--locale-modal__locales__name`}>
                  {country.name}
                </div>
                <div className={`${prefix}--locale-modal__locales__name`}>
                  {country.language}
                </div>
              </a>
            ))
          )}
      </div>
    </div>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{regionList: Array, availabilityText: string, unavailabilityText: string, placeHolderText: string, labelText: string}}
 */
LocaleModalCountries.propTypes = {
  regionList: PropTypes.array,
  setClearResults: PropTypes.func,
};

export default LocaleModalCountries;
