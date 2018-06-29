# MMM-ComEdPrice
MagicMirror module to get the current ComEd Hourly Rate for customers

## API
Uses the open/free api that ComEd publishes: https://hourlypricing.comed.com/api?type=currenthouraverage

## Preview
![screenshot1](screenshot1.JPG)

## Using the module
run git clone https://github.com/vincep5/MMM-ComEdPrice from inside your MagicMirror/modules folder

Add `MMM-ComEdPrice` module to the `modules` array in the `config/config.js` file:
````javascript
modules: [
  {
    module: "MMM-ComEdPrice",
    position: "top_right",
    header: "ComEd Pricing",
    config: {
        updateInterval: 10 * 60 * 1000, // every 10 minutes
    }
  },
]
