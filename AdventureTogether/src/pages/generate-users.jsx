/* eslint-disable prefer-destructuring */
// Description: A page for automatically generating new users
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { LoremIpsum } from 'lorem-ipsum';
import { loginCometChatUser, registerCometChatUser } from '../cometchat';
import { withLayout } from '../wrappers/layout';

// This line is also an import.
const randomProfile = require('random-profile-generator');

// Various arrays from which to randomly select attributes
const outdoorActList = ['Animal Lover. Any', 'Dogs', 'Dog, Hunting', 'Dog Sledding', 'Farm Animals',
  'Herding', 'Horse', 'Biking, Any', 'Biking, BMX', 'Biking, Mountain', 'Cycling, Road', 'Cycling, Winter',
  'Boarding, Any', 'Board-sailing/Windsurfing', 'Skiing, Alpine', 'Skiing, Cross Country', 'Skateboarding',
  'Sledding', 'Snowboarding', 'Snowshoeing', 'Large Boat, Any', 'Sailing', 'Motor-boating', 'Yachting',
  'Small Boat, Any', 'Canoeing', 'Kayaking, Recreational', 'Kayaking, Sea/Tour', 'Kayaking, White Water',
  'Kayaking, Fishing', 'Rafting', 'Stand-up Paddling', 'Surfing', 'Wake-boarding', 'Camping, Any', 'Bonfire',
  'Camping, RV', 'Camping, local', 'Climbing, Any', 'Climbing, Boulder/Sport', 'Climbing, Indoor',
  'Climbing, Mountaineering/Ice', 'Climbing, Tree', 'Rappelling', 'Fishing, Any', 'Fishing, Deep Water',
  'Fishing, Freshwater', 'Fishing, Saltwater', 'Fishing, Ice', 'Flying, Drones/RC', 'Flying, Airplane',
  'Flying, Unpowered/Gliding', 'Kiting', 'Hunting, Any', 'Hunting, Bow', 'Hunting, Handgun', 'Hunting, Rifle',
  'Hunting, Shotgun', 'Trapping', 'Motor Sports, Any', 'ATV / 4-wheeling', 'Dirt-biking', 'Jet-skiing',
  'Off-road Trucking', 'Snowmobiling', 'Conservation, Any', 'Restoration, Any', 'Birdwatching', 'Picking/Foraging',
  'Gardening', 'Restoration, Historical', 'Volunteer', 'Wildlife Viewing', 'Shooting, Any', 'Archery', 'Shooting, Plinking/Target/Range',
  'Shooting, Trap', 'Paintball', 'Diving', 'Scuba', 'Snorkeling', 'Sunbathing', 'Swimming, Any', 'Swimming, Wild', 'Swimming, Pool',
  'Team, Any', 'Field Sports', 'Frisbee', 'Sport, Playing', 'Sport, Spectator', 'Team Building', 'Ultimate', 'Volleyball',
  'Walk / Run, Any', 'Run, Jog', 'Run, Trail', 'Hiking, Day', 'Beach Combing', 'Triathlon', 'Adventure Racing', 'Astronomy',
  'Golf', 'Photography/Painting', 'Travel'];
const eyeColors = ['Blue', 'Green', 'Light Brown', 'Dark Brown', 'Hazel'];
const bodyTypes = ['Slim', 'Average', 'Althetic', 'Muscular', 'Curvy'];
const educations = ['Some High-school', 'Graduated High-school', 'Some College', 'Undergraduate Degree',
  'Post-Graduate Degree'];
const religions = ['Christianity', 'Judiasm', 'Islam', 'Buddhism', 'Agnostic', 'Spiritual Non-Religious', 'Other'];
const ambitions = ['Somewhat Ambitious', 'Moderately Ambitious', 'Highly Ambitious'];
const alchoholUses = ['Rarely', 'Socially/On Occasion', 'Moderate Drinker', 'Heavy Drinker'];
const smokingStatuses = ['Smoker', 'Non-Smoker', 'Former Smoker', 'Quitting', 'Want to Quit'];
const childStatuses = ['Have Kids', 'Want Kids', 'Maybe Someday', 'Definitely Not'];
const astroSigns = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra',
  'Scorpio', 'Sagittarius'];
const hairColors = ['Black', 'Brown', 'Auburn', 'Red', 'Blond', 'Gray', 'Other'];
const ethnicities = ['American Indian/Alaska Native', 'Asian', 'Black/African American', 'Hispanic/Latino',
  'Hawaiian Native/Pacific Islander', 'White', 'Other'];

// Vars to hold generated profile attributes
let attribArray;
let gDob;
let gName;
let gGender;
let gUrl;
let gEmail;
let gPw;
let gOutActivs;
let gEthnicity;
let gEyeColor;
let gHairColor;
let gBodyType;
let gHeight;
let gEducation;
let gReligion;
let gAmbition;
let gAlcohol;
let gSmoking;
let gChild;
let gAstro;
let gDescription;

// A function to select a string at random from an array
const randomString = (array) => array[Math.floor(Math.random() * array.length)];

// A function to get a random date between two dates (used by generateRandomDOB)
function getRandomDate(date1, date2) {
  const fromTime = date1.getTime();
  const toTime = date2.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}

// Generate a random height in inches; currently a range between 65" and 75"
// (or 74, not sure about decimal handling in js)
const generateHeightInches = () => (Math.round((Math.random() * 10) + 65));

// Generate a random birthday within a range. Manually edit the range as needed.
const generateRandomDOB = () => {
  const random = getRandomDate(new Date('1950-02-12T01:57:45.271Z'), new Date('2001-02-12T01:57:45.271Z'));
  return random.toISOString().split('T')[0];
};

// Create an array of 5 random selections from another array.
// Caution: This does not prevent duplicates!!
function genOutdoorActArray() {
  return [randomString(outdoorActList), randomString(outdoorActList),
    randomString(outdoorActList), randomString(outdoorActList), randomString(outdoorActList)];
}

// Use random-profile-generator to get some of the more difficult to generate attributes.
// For now they are held in the array 'profile'.
function genProfileArray() {
  const profile = randomProfile.profile();
  return [profile.fullName, profile.gender, profile.avatar,
    profile.email, profile.lastName + profile.age];
}

// Configure amount of generated lorem-ipsum text for profile description.
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

// Main function to generate a user
function generateUserDetails() {
  // First, the variables declared earlier are updated with generated attributes.
  // We store what returns from the function that calls generate-random-profile in
  // an array and immediately use it:
  attribArray = genProfileArray();
  gName = attribArray[0]; // name
  gGender = attribArray[1]; // gender
  gEmail = attribArray[3];
  gPw = attribArray[4];

  // Use the pravatar api to get a persistent profile image url based on generated email:
  gUrl = `https://i.pravatar.cc/300?u=${gEmail}`;

  // Update attributes from misc functions:
  gDob = generateRandomDOB();
  gDescription = lorem.generateSentences(3);
  gOutActivs = genOutdoorActArray();
  gEthnicity = randomString(ethnicities);
  gEyeColor = randomString(eyeColors);
  gHairColor = randomString(hairColors);
  gBodyType = randomString(bodyTypes);
  gHeight = generateHeightInches();
  gEducation = randomString(educations);
  gReligion = randomString(religions);
  gAmbition = randomString(ambitions);
  gAlcohol = randomString(alchoholUses);
  gSmoking = randomString(smokingStatuses);
  gChild = randomString(childStatuses);
  gAstro = randomString(astroSigns);
  // At the end of this func, a complete user is now generated and ready to be registered
}

// Page main function
const GenerateUsersPage = () => {
  const [error, setError] = useState('');
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);
  const [lastUser, setLastUser] = useState('Not Started');
  const [randomTime, setRandomTime] = useState(3000);

  // Function to generate and register a user
  const registerGeneratedUser = () => {
    // Generate a new user to register
    generateUserDetails();

    // Create the user in firebase auth
    firebase
      .auth()
      .createUserWithEmailAndPassword(gEmail, gPw)
      .then(async (doc) => {
        const { uid } = doc.user;

        // Create document with generated attributes
        await firebase.firestore().collection('new-users').doc(uid).set({
          name: gName,
          description: gDescription,
          imageUrl: gUrl,
          likes: [],
          dislikes: [],
          favorites: [],
          matches: [],
          birthdate: gDob,
          height: gHeight,
          gender: gGender,
          ethnicity: gEthnicity,
          outdoorActivities: gOutActivs,
          eyeColor: gEyeColor,
          hairColor: gHairColor,
          bodyType: gBodyType,
          education: gEducation,
          religion: gReligion,
          ambition: gAmbition,
          alcoholUse: gAlcohol,
          smoking: gSmoking,
          childStatus: gChild,
          astrologySign: gAstro,
          id: uid,
          completedRegistration: true,
        });

        // Register user with CometChat
        await registerCometChatUser(gName, uid);
        await loginCometChatUser(uid);

        setLastUser(gName);

        // Print successful result
        console.log(`-------\nNew user created successfully!\n-------\nUser Details:\n${gDob}\n${gName}\n${gGender}\n${gUrl}\n${gEmail}\n${gPw}\n${gOutActivs}\n${gEthnicity}\n${gEyeColor}\n${gHairColor}\n${gBodyType}\n${gHeight}\n${gEducation}\n${gReligion}\n${gAmbition}${gAlcohol}\n${gSmoking}\n${gChild}\n${gAstro}\n${gDescription}\n-------`);
      })
      // In event of failure, try to catch and display the error message thrown
      .catch((err) => {
        setError(err.message);
        console.log(`Unable to register user: ${err.message}`);
      });
  };

  const startGeneration = () => {
    setStart(true);
  };

  const stopGeneration = () => {
    setStart(false);
  };

  const incrementCounter = () => {
    let count = counter;
    setCounter(count += 1);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => {
        // set a random waiting time between 2-5 seconds to try to delay google rate limiting
        setRandomTime((3000 * Math.random()) + 2000);
        console.log(`Random time set to: ${randomTime}`);
        registerGeneratedUser();
        incrementCounter();
      }, randomTime);
      return () => clearTimeout(timer);
    }
  }, [counter, start]);

  // Page Content
  return (
    <div className="my-10 bg-white rounded-2xl border-2 border-gray-200 flex flex-col justify-center items-center mx-auto p-10 w-full md:w-8/12">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-center text-xl font-extrabold my-4">
          Automated User Generation/Registration
        </h3>
        <br />
        Once start is clicked, a new user will be created every few seconds.
      </div>
      <div className="text-left w-full py-3 divide-y-2 divide-gray-100 divide-solid">
        <form className="w-full">
          Users generated so far:
          {' '}
          {counter}
          <br />
          Last user generated:
          {' '}
          {lastUser}
          <br />
          <br />
          <button
            type="button"
            onClick={(start) ? stopGeneration : startGeneration}
            className={(start)
              ? 'w-full bg-gradient-to-r from-red-900 to-red-800 rounded-full hover:bg-gray-200 py-4 px-16 block whitespace-no-wrap text-white font-bold'
              : 'w-full bg-gradient-to-r from-gray-800 to-gray-800 rounded-full hover:bg-gray-200 py-4 px-16 block whitespace-no-wrap text-white font-bold'}
          >
            {(start) && 'Stop Generation'}
            {(!start) && 'Start Generation'}
          </button>
          <div className="h-6 text-center py-0">
            <sub>Open console for user details! (Press F12)</sub>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withLayout(GenerateUsersPage, { bgImage: true });
