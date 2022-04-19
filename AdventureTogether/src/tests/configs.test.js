/* eslint-disable no-undef */
// Description: A unit test for the successful rendering of the Navbar component
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import 'firebase/compat/auth';
import { cometConfig, firebaseConfig } from '../environment';
import { uiConfigLogin, uiConfigRegister } from '../firebaseui.config';
import * as opts from '../outdoorInterests.options';

beforeEach(() => {
});

afterEach(() => {
});

describe('firebaseConfig', () => {
  it('Tests environment firebase configuration', () => {
    expect(firebaseConfig.apiKey).toBe('AIzaSyAmsxHiejgAOvmLXkvs1Vlpmfc__ZKdSbU');
    expect(firebaseConfig.authDomain).toBe('webappcometchatdating.firebaseapp.com');
    expect(firebaseConfig.databaseURL).toBe('https://webappcometchatdating-default-rtdb.firebaseio.com');
    expect(firebaseConfig.projectId).toBe('webappcometchatdating');
    expect(firebaseConfig.storageBucket).toBe('webappcometchatdating.appspot.com');
    expect(firebaseConfig.messagingSenderId).toBe('899780685402');
    expect(firebaseConfig.appId).toBe('1:899780685402:web:e81eceb178bf2484a37263');
    expect(firebaseConfig.measurementId).toBe('G-1JKVWR2XNZ');
  });
});

describe('cometConfig', () => {
  it('Tests environment cometchat configuration', () => {
    expect(cometConfig.appId).toBe('2039006cd8fea42f');
    expect(cometConfig.region).toBe('us');
    expect(cometConfig.authKey).toBe('5ba93b125c840b04a61a8b528f517eb418ed6cbc');
  });
});

describe('uiConfigLogin', () => {
  it('Tests firebaseui component login configuration', () => {
    expect(uiConfigLogin.signInSuccessUrl).toBe('/discover');
  });
});

describe('uiConfigRegister', () => {
  it('Tests firebaseui component login configuration', () => {
    expect(uiConfigRegister.signInSuccessUrl).toBe('/google-register');
  });
});

describe('optionAnimal', () => {
  it('Option list for outdoor interests type: Animal', () => {
    expect(opts.optionAnimal.name).toBe('Animals');
  });
});

describe('optionCycling', () => {
  it('Option list for outdoor interests type: Cycling', () => {
    expect(opts.optionBicycling.name).toBe('Cycling');
  });
});

describe('optionBoardingSkiing', () => {
  it('Option list for outdoor interests type: Boarding/Skiing', () => {
    expect(opts.optionBoardingSkiing.name).toBe('Boarding/Skiing');
  });
});

describe('optionLargeBoating', () => {
  it('Option list for outdoor interests type: Boating (Large)', () => {
    expect(opts.optionLargeBoat.name).toBe('Boating (Large)');
  });
});

describe('optionSmallBoating', () => {
  it('Option list for outdoor interests type: Boating (Small)', () => {
    expect(opts.optionSmallBoating.name).toBe('Boating (Small)');
  });
});

describe('optionCamping', () => {
  it('Option list for outdoor interests type: Camping', () => {
    expect(opts.optionCamping.name).toBe('Camping');
  });
});

describe('optionClimbing', () => {
  it('Option list for outdoor interests type: Climbing', () => {
    expect(opts.optionClimbing.name).toBe('Climbing');
  });
});

describe('optionFishing', () => {
  it('Option list for outdoor interests type: Animal', () => {
    expect(opts.optionFishing.name).toBe('Fishing');
  });
});

describe('optionFlying', () => {
  it('Option list for outdoor interests type: Flying', () => {
    expect(opts.optionFlying.name).toBe('Flying');
  });
});

describe('optionHunting', () => {
  it('Option list for outdoor interests type: Hunting', () => {
    expect(opts.optionHunting.name).toBe('Hunting');
  });
});

describe('optionMotorSports', () => {
  it('Option list for outdoor interests type: Motor Sports', () => {
    expect(opts.optionMotorSports.name).toBe('Motor Sports');
  });
});

describe('optionRestorationConservation', () => {
  it('Option list for outdoor interests type: Nature', () => {
    expect(opts.optionRestorationConservation.name).toBe('Nature');
  });
});

describe('optionShooting', () => {
  it('Option list for outdoor interests type: Shooting', () => {
    expect(opts.optionShooting.name).toBe('Shooting');
  });
});

describe('optionSwimming', () => {
  it('Option list for outdoor interests type: Swimming', () => {
    expect(opts.optionSwimming.name).toBe('Swimming');
  });
});

describe('optionTeam', () => {
  it('Option list for outdoor interests type: Team Sports', () => {
    expect(opts.optionTeam.name).toBe('Team Sports');
  });
});

describe('optionWalkRun', () => {
  it('Option list for outdoor interests type: Walking/Running', () => {
    expect(opts.optionWalkRun.name).toBe('Walking/Running');
  });
});

describe('optionLeisureOther', () => {
  it('Option list for outdoor interests type: Leisure', () => {
    expect(opts.optionLeisureOther.name).toBe('Leisure');
  });
});
