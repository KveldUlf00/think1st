# Welcome to my project!

Hi! My name is Błażej Raducki. I hope that everything work fine, below I described interesting information about the project

# How to run project

### `npm start`

maybe it will be also usefull:

### `npm install`

## My Node and Npm version

### `Node: 18.17.1`

### `Npm: 6.14.4`

## Api connection

For proper operation of the application, it is necessary to create an **.env** file and there create a variable **REACT_APP_API_KEY** with the value of the key to the API https://api-ninjas.com/api/holidays (the value of the key was given in the figma in the content of the recruitment task)

## Possible implementation incompatibilities with figma

I tried very hard to faithfully (every pixel) reproduce the design. However, always if only one person is working on something then there is a possible oversight, for which I am very sorry, but it was not done on purpose.

What you can catch is sometimes the line-height is slightly different from that of the figma, this happens by using the parameter text-.... from tailwind (e.g., text-lg), which provides the correct font size and a very similar line-height value as the original.

In general, I mostly used tailwind's defaults, but for some values I implemented my own variables for styles (these are available in **tailwind.config.js**).

**Sometimes** url calls require enabled CORS

**Hour problem** - an observant tester will notice that in the request flies an hour reduced by 2 with respect to the selected one. This happens by converting the target date by .toISOString(), which converts the time to this universal UTC. I don't consider this a bug, just a field for future determination of what time we are referring to.

**What's more**, fields of Input type have only validation for the number of characters, there can be numbers in them, for example. This was done because of the lack of clear information in the task content.

**One last very important thing!**
01.11.2024r. has a data type of National Holiday, not Observance, so it cannot be clicked according to the command (this is an example from figma)

{
"country": "Poland",
"iso": "PL",
"year": 2024,
"date": "2024-11-01",
"day": "Friday",
"name": "All Saints' Day",
"type": "NATIONAL_HOLIDAY"
}
According to the command: Sundays and days that have type = “NATIONAL_HOLIDAY” there is no training, so these days should be blocked. After selecting a date that has type = “OBSERVANCE”, display information about the holiday.

For this reason, it is impossible to click 01.11.2024

# Project online

https://euphonious-gumption-6daa7c.netlify.app/
