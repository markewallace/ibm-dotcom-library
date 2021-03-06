import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import cards from '../../CardSection/__stories__/data/cards.json';
import CardSectionSimple from '../CardSectionSimple';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sections)|CardSectionSimple', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })

  .add('Default', () => {
    const themes = {
      white: '',
      g10: 'g10',
      g90: 'g90',
      g100: 'g100',
    };
    const toggleCTA = boolean('cta', true);
    const cta = {
      heading: 'Top level card link',
      cta: {
        href: 'https://www.example.com',
      },
    };

    return (
      <CardSectionSimple
        heading={text('Heading (required):', 'Aliquam condimentum interdum')}
        theme={select('theme', themes, themes.white)}
        cards={object('Data', cards.CardSectionSimple)}
        cta={toggleCTA && cta}
      />
    );
  });
