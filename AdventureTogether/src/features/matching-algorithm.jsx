/* eslint-disable no-undef, import/no-extraneous-dependencies */
// Description: A BDD test for age verification as a feature

import { defineFeature, loadFeature } from 'jest-cucumber';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import machineLearningSort from '../methods/machineLearningSort';

const feature = loadFeature('src/features/matching-algorithm.feature');

const personSet = [{
  name: 'test',
  description: 'test',
  imageUrl: 'test',
  likes: ['test'],
  dislikes: ['test'],
  favorites: ['test'],
  matches: ['test'],
  birthdate: 'test',
  outdoorActivities: ['test'],
  alcoholUse: 'test',
  astrologySign: 'test',
  bodyType: 'test',
  childStatus: 'test',
  education: 'test',
  ethnicity: 'test',
  gender: 'test',
  hairColor: 'test',
  eyeColor: 'test',
  religion: 'test',
  smoking: 'test',
  height: 'test',
  completedRegistration: 'test',
  id: 'test',
}, {
  name: 'test',
  description: 'test',
  imageUrl: 'test',
  likes: ['test'],
  dislikes: ['test'],
  favorites: ['test'],
  matches: ['test'],
  birthdate: 'test',
  outdoorActivities: ['test'],
  alcoholUse: 'test',
  astrologySign: 'test',
  bodyType: 'test',
  childStatus: 'test',
  education: 'test',
  ethnicity: 'test',
  gender: 'test',
  hairColor: 'test',
  eyeColor: 'test',
  religion: 'test',
  smoking: 'test',
  height: 'test',
  completedRegistration: 'test',
  id: 'test',
}];

const user = {
  name: 'test',
  description: 'test',
  imageUrl: 'test',
  likes: ['test'],
  dislikes: ['test'],
  favorites: ['test'],
  matches: ['test'],
  birthdate: 'test',
  outdoorActivities: ['test'],
  alcoholUse: 'test',
  astrologySign: 'test',
  bodyType: 'test',
  childStatus: 'test',
  education: 'test',
  ethnicity: 'test',
  gender: 'test',
  hairColor: 'test',
  eyeColor: 'test',
  religion: 'test',
  smoking: 'test',
  height: 'test',
  completedRegistration: 'test',
  id: 'test',
};

defineFeature(feature, (test) => {
  test('A set of users is entered', ({ given, when, then }) => {
    let results;
    given('the sets are valid', () => {
      // defined in outer scope
    });

    when('the function is called', () => {
      results = machineLearningSort(personSet, user);
    });

    then('a set of users should be returned', () => {
      expect(results).toBeTruthy();
    });
  });
});
