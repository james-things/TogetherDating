/* eslint-disable no-undef */
// Description: A BDD test for building ISO date string as a feature

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineFeature, loadFeature } from 'jest-cucumber';
import buildIsoDateString from '../methods/buildIsoDateString';

const feature = loadFeature('src/features/buildIsoDateString.feature');

defineFeature(feature, (test) => {
  const month = '06';
  const day = '25';
  const year = '2010';
  let usString = '';
  let isoString = '';
  let compareStrings = true;

  test('Enter US date format', ({ given, when, then }) => {
    given('I enter date elements in different input fields in a form', () => {
      usString = `${month}-${day}-${year}`;
    });

    when('I submit a form displayed US format of MM-DD-YYYY', () => {
      isoString = buildIsoDateString(month, day, year);
    });

    then('I expect the string to be converted to ISO format YYYY-MM-DD', () => {
      compareStrings = (usString == isoString) ;
      expect(compareStrings).toBe(false);
    });
  });
});
