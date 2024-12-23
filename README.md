# CosmoCommute
  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

  Planning your daily commute to Mars just got easier with CosmoCommute! Our app is your ultimate space-travel assistant, helping you calculate the distance between planets and map the most efficient routes — no wormholes required. Plus, we’ve got your safety covered by keeping you updated on recent space weather events. Whether you're an interstellar explorer or just curious if Jupiter’s still too far for the weekend, CosmoCommute turns navigating the cosmos into a breeze. Warning: cosmic traffic jams not included—yet!

  Visit the deployed website here: [CosmoCommute](https://cosmocommute.onrender.com)

  ## Description
  CosmoCommute is an app designed for space travelers, offering updates on interstellar traffic and space weather events. This enables users to plan safe and efficient routes for their space journeys, ensuring a seamless and informed trave; experience among the stars.

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [How to Contribute](#how-to-contribute)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Installation
  No installation needed. Visit the deployed website here: [CosmoCommute](https://cosmocommute.onrender.com)

  ## Usage
  Create an account by clicking the "Signup" option in the center-top of the page. If you do not fill in all information correctly, the site will advise you on what to fix. Once you're logged in, the site automatically loads the dashboard, which shows you the first of the two APIs we used: The NASA Astronomy Picture of the Day. Clicking from here on either "Traffic" or "Weather Events" will take you to their respective pages.
  
  "Traffic" shows a view of our Solar System. There is a button to disable/re-enable the orbit of the planets around our sun. Click on the dropdowns to pick your starting planet and destination. If you pick the same planet for both, it will advise you that there is no travel needed, because you're already there. If you pick two different planets, it will tell you how many days are needed to travel that distance.

  "Weather Events" will take you to the recent weather events, where where the second API is used to pull space weather information. (Currently, only solar flares - but our future development plans include adding more varied weather events.)

  "User Settings" will take you back to the Profile/Password screen, where you can change your profile information if you need to.

  ## Credits
  ### Technologies used:
  - React
  - JWT/Bcrypt
  - Sequelize
  - Node-fetch
  - Express
  - Ant Design
  - Three.js
  - Render

  ### APIs Used:
  - NASA's [Astronomy Picture of the Day](https://api.nasa.gov/)
  - NASA's [Space Weather Database of Notifications, Knowledge, & Information](https://api.nasa.gov/)
  
  ### Traffic Page Textures
  - Mercury: [NASA.gov](https://science.nasa.gov/resource/enhanced-color-mercury-map/)
  - Venus: I used two textures from Solar System Scope in GIMP, combining the atmosphere layer and surface layer into one texture. Both images are still credited to [Solar System Scope](https://www.solarsystemscope.com/textures/)
  - Saturn: [Planet Pixel Emporium](https://planetpixelemporium.com/saturn.html)
  - Saturn's rings: Used with permission from [colourness](https://www.deviantart.com/colourness/art/Saturn-s-Rings-From-JHT-s-Planet-Pixel-Emporium-977223531)
  - Pluto: (currently unemplemented) [planetboiearth](https://www.deviantart.com/planetboiearth/art/Pluto-Texture-1006312599)
  - All other planets: [Solar System Scope](https://www.solarsystemscope.com/textures/)

  ## License
  This project is licensed under the ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) [MIT](https://opensource.org/licenses/MIT) license.

  ## How to Contribute
  Project is complete, but feel free to download or fork the project and make it your own! 

  ## Tests
  N/A

  ## Questions? 
  Contact us at:
  - [jsparrowio](https://github.com/jsparrowio)
  - [kavue](https://github.com/kavue)
  - [Sierra217](https://github.com/Sierra217)
  - [K3strl](https://github.com/k3strl),
  - ...or email us at: <cosmocommute@geemail.com>