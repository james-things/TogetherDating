/* eslint-disable no-undef */
// Description: A BDD test for age verification as a feature

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineFeature, loadFeature } from 'jest-cucumber';
import buildIsoDateString from '../methods/buildIsoDateString';
import getAge from '../methods/getAge';
import isOfAge from '../methods/isOfAge';

const feature = loadFeature('src/features/age-verification.feature');

defineFeature(feature, (test) => {
  const birthMonth = '06';
  const birthDay = '25';
  const birthYear = '2010';
  let dobString = '';
  let age = '';
  let eighteenOrOver = true;

  test('Entering an age below 18', ({ given, when, then }) => {
    given('My age is under 18', () => {
      dobString = buildIsoDateString(birthMonth, birthDay, birthYear);
    });

    when('I submit my birthdate to the form', () => {
      age = getAge(dobString);
      eighteenOrOver = isOfAge(dobString);
    });

    then('I should be deemed too young to register', () => {
      expect(age).toBe(11);
      expect(eighteenOrOver).toBe(false);
    });
  });
});
