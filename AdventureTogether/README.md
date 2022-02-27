# How to Build Your Local Dev Environment

Before you start this process, be sure to create your own branch of the repo once you have it locally so you can work in that and create pull requests from it to Master when you are ready to merge your work.

Before you try to build or run anything locally, you must first install NodeJS, NPM, and Yarn.

NodeJS + NPM: https://nodejs.org/en/
Yarn: https://classic.yarnpkg.com/lang/en/ 

Once the installs complete, check your versions:

>node -v
>npm -v
>yarn -v

Make sure they match the verion you installed.

# Build a Running Instance of the Base App

In order to get an instance of the base app running locallly, change directories to the working directory for the app. The working directory of the app is the AdventureTogether directory under TogetherDating (e.g. ~/TogetherDating/AdventureTogether). The AdventureTogether directory is the working directory for the base app. You can do all of your work here. Don't worry about Node modules and other junk getting committed. There are gitignore rules which will prevent that stuff from being committed or being included in pull requests.

Now that you are in the working directory run the following command from your terminal:

> yarn install

This will install of the Node modules and other dependencies on your machine in your working directory. This process takes some times so go grab a coffee, tea, beer, or other beverage of choice. If the build fails, it _might_ be okay. The only way to know for sure is to run the app. In the build on my local, I got a ton of Python errors when installing dependent Node modules. But, since this app doesn't use Python it was safe to ignore the errors.

Okay. Now that you are through the install, it's time to start this bad boy up by running the following command in your terminal:

> yarn run start

You'll see a few things run by on the screen. All good. The proof that the app is running is when a browser window or tab opens and loads the splash page. If you get to the splash page, the app is likely good to go. However, to be sure, click on the Login or Register buttons to make sure the forms pop up and you can enter data.

A few things to remember:

* We are all using the same Firebase account. We will have to coordinate change unless you want to go through the Firebase account creation and configuration process yourself. I'm happy to help if you do since I've been through it but there are some security settings that are not obvious that you have to set correctly to get it to work.

* We are all using the same CometChat account. There are quotas on the account, so don't go nuts with messaging between test accounts just yet. If we find we need to do more testing, we will have to each create our own CometChat account and change the app variables where the keys are held. They are all in the .env file in the root of the working directory.

The original ReadMe is below for reference.

=======================================================================================================

# How to Build a Dating Website With React (Tinder Clone)

Read the full tutorial here:

[**>> How to Build a Dating Website With React (Tinder Clone)**](https://www.cometchat.com/tutorials/cometchat-tutorial-how-to-build-a-dating-website-with-react-tinder-clone)

This example shows how to build an Dating site like Tinder where you can rate other users and chat when you are matched with each other!



## Technology
This demo uses:

* NodeJS `version >=12`
* [Firebase](https://firebase.google.com/) 🔥
* JavaScript 💛
* [Create-react-app](https://create-react-app.dev/) ⚛
* [TailwindCSS](https://tailwindcss.com/) 🍃
* [CometChat](https://www.cometchat.com/) 🚀

## Running the demo

To run the demo follow these steps:

1. [Head to CometChat Pro and create an account](https://www.cometchat.com/pro?utm_source=github&utm_medium=link&utm_campaign=igorasilveira-tinder-cometchat)
2. From the [dashboard](https://app.cometchat.com/signup?utm_source=github&utm_medium=link&utm_campaign=igorasilveira-tinder-cometchat), create a new app called "Tinder Chat"
3. Once created, you will have your credentials right on top of the page. If not, head over to the **API & AUTH KEYS** section on the menu on the left.
4. Clone the repository by running `git clone git@github.com:igorasilveira/tinder-cometchat.git` and open it in your editor of choice.
5. Copy the [`.env.example`](https://github.com/igorasilveira/marketplace-cometchat/blob/main/.env.example) and rename it to `.env` and update the COMETCHAT related variables with your `appId`, `authKey` and `region`.
6. Run `npm install` on the root of the project to install dependencies.
7. Run `npm start` to run you application locally.
8. Start registering users and creating products!

Questions about running the demo? [Open an issue](https://github.com/igorasilveira/tinder-cometchat/issues). We're here to help ✌️


## Useful links

- 🏠 [CometChat Homepage](https://www.cometchat.com/pro/?utm_source=github&utm_medium=link&utm_campaign=igorasilveira-marketplace-cometchat)
- 🚀 [Create your free account](https://app.cometchat.com/signup/?utm_source=github&utm_medium=link&utm_campaign=igorasilveira-marketplace-cometchat)
- 📚 [Documentation](https://prodocs.cometchat.com/?utm_source=github&utm_medium=link&utm_campaign=igorasilveira-marketplace-cometchat)
- 👾 [GitHub](https://github.com/igorasilveira/tinder-cometchat)
