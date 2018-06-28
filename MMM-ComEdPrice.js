'use strict';


Module.register("MMM-ComEdPrice", {

    result: [],
    // Default module config.
    defaults: {
        url: 'https://hourlypricing.comed.com/api?type=currenthouraverage',
        fadeSpeed: 2000,
        updateInterval: 30 * 60 * 1000, // every 30 minutes
    },

    getStyles: function() {
        return ["MMM-ComEdPrice.css"];
    },

    start: function() {
        this.loaded = false;
        this.getData();
        this.scheduleUpdate();
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("priceContent");

        if (!this.loaded) {
            wrapper.innerHTML = this.translate("LOADING");
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        wrapper.className = 'medium bright';

        var count = 0;
        var _this = this;

        if (this.result.length > 0){
            this.result.forEach(function(pwr) {
                var symbolElement =  document.createElement("span");
                var lastPrice = pwr.price;
                var lastDate = pwr.millisUTC;

                wrapper.appendChild(symbolElement);

                var priceElement = document.createElement("span");
                priceElement.innerHTML = lastPrice + ' &cent;';

                if (lastPrice > 7) {
                    priceElement.className = "up";
                }
                else {
                    priceElement.className = "down";
                }

                var d = new Date(parseInt(lastDate, 10));

                var dateElement = document.createElement("span");
                dateElement.innerHTML = d.toLocaleTimeString('en-US');

                var divider = document.createElement("span");                 
                divider.innerHTML = ' - ';

                wrapper.appendChild(priceElement);
                wrapper.appendChild(divider);
                wrapper.appendChild(dateElement);
                count++;
            });
        }

        return wrapper;
    },

    scheduleUpdate: function(delay) {
        var nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }

        var self = this;
        setInterval(function() {
            self.getData();
        }, nextLoad);
    },

    getData: function () {
        this.sendSocketNotification(this.config.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "POWER_DATA_RESULT") {
            this.result = payload;
            this.loaded = true;
            this.updateDom(self.config.fadeSpeed);
        }    
    },
});