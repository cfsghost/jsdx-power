jsdx-power
---

Power Manager API for JSDX Framework.

Examples
-
    var Power = require('jsdx-power');
    
    var power = new Power;
    
    power.init(function() {
            console.log(power.devices['/org/freedesktop/UPower/devices/battery_BAT0'].percentage);
    });

License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2012 Fred Chien <<fred@mandice.com>>

Copyright
-
Copyright(c) 2012 Mandice Company.
(http://www.mandice.com/)
