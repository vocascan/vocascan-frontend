# Changelog

This changelog goes through all the changes that have been made in each release on the
[vocascan-frontend](https://github.com/vocascan/vocascan-frontend).

## [v1.3.0](https://github.com/vocascan/vocascan-frontend/releases/tag/v1.3.0) - 2022.06.13

In this version, some new features have been added that make it easier to use. Now you can switch between the two predefined light and dark mode themes or load your own themes into your self-hosted frontend instance. Additionally, the frontend has been made responsive to make Vocascan more comfortable to use on mobile devices. Last but not least, a custom blocking of unverified users has been built into the frontend and backend to make it easier to find spam accounts.

[skip ci] updated translations via Localazy

- Features
  - email verification popup (#116)
  - Theme system (#111)
  - Add vocabsearch to "All Vocabs" screen (#110)
- Refactors
  - Responsive design SCSS (#115)
  - About page update (#117)

## [v1.2.1](https://github.com/vocascan/vocascan-frontend/releases/tag/v1.2.1) - 2022.01.29

This release of vocascan-frontend fixes the country flags in firefox and the linebreaks in the vocab card description. The new password complexity indicator will force secure passwords to the users.

- Features
  - Password complexity (#97)
- Bugfixes
  - fixed flags in firefox (#95)
  - Fix/translations (#96)
  - fix linebreaks on vocab card and vocab table (#98)

## [v1.2.0](https://github.com/vocascan/vocascan-frontend/releases/tag/v1.2.0) - 2022.01.22

This is one of the biggest updates for Vocascan so far. We moved the React app out of the desktop app to split up the desktop app into two different repositories. As a result, the frontend is also accessible from within the browser to make learning on foreign or not supported devices a lot easier. Additionally, there are lots of new features (in conjunction with a Vocascan server) to legally secure your site if you want to make it available to the public.

- Features
  - Frontend restructure (#81)
  - Precompile react on releases (#86)
  - Feat: Legal updates (#85)
  - Feat: cookie consent (#87)
  - style: added icon for frontend (#88)
  - version table in settings page (#89)
- Bugfixes
  - removed "fancy" menu option due to new links in nav (#91)
  - temporarily removed Polish and Russian because they were no longer translated (#92)

## [v1.1.0](https://github.com/vocascan/vocascan-frontend/releases/tag/v1.1.0) - 2021.11.20

After some time, a new version of Vocascan is coming, with import/export features to share your vocabulary packages and
groups. The invitation codes will help you to keep your server all to yourself and your friends. In addition, we have
tweaked the handling a bit and improved the workflow when creating vocabularies. Feel the magic of the arrow keys
yourself while creating vocabularies.

- Features
  - Import/Export function (#75)
  - Invite codes (#77)
  - Show current language on card side while query (#76)
  - Shortcuts for "add vocab" page. (#76)
- Bugfixes
  - mac copy/paste shortcuts (#76)
  - Language selector options visibility (#73)
  - Min and max lengths for input fields (#76)
  - Fixed form submit bug for add-vocab screen (#76)
  - Fixed different animation for logout button (#76)
  - Improved delay on vocab card flip (#76)
  - The description is now only on the translated side of the card (#76)
  - Added translations for "Add"-Button to the select component (#76)

## [v1.0.0](https://github.com/vocascan/vocascan-frontend/releases/tag/v1.0.0) - 2021.06.13

Finally the time has come. The first release of Vocascan is ready. Vocascan is a server-client vocabulary trainer that
is intended to give the user many setting options so that he can adapt it to his personal learning strategies and
habits. All the basic functions of a vocabulary trainer are currently built in, making it fully functional. However,
there are still many more features to come. Due to the data protection guidelines, we cannot yet provide a public
server, which means that you currently have to host it yourself. But we are working as quickly as possible to use the
trainer offline.

- Basic functions
  - Register/Login
  - Add/modify/delete packages
  - Add/modify/delete groups
  - Add/modify/delete vocabs
  - Start vocab query
  - Decide in which direction the vocabs get queried
  - End-Screen (summary) after query
  - Dashboard
  - Library
  - Languages English, German
  - Guide after register
  - About-page
