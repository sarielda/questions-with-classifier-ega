/* Copyright IBM Corp. 2015 Licensed under the Apache License, Version 2.0 */

<welcome>
    <div class="screen-container">
        <div class="logo-container">
            <loading-indicator state="welcome"></loading-indicator>
        </div>
        <div class="text-container">
            <div class="text-inner-container">
                <img src="images/og-logo-white.png" style="PADDING-LEFT: 1em; width=50%; height=50%" alt="Ontario Government Logo"/>
                <div class="horizontal-line">.</div>
                <div id="screenText"></div>
                <div id="trainMeText"></div>
            </div>
            
            <footer class="footer">
                <a id="actionButton" href="#">{buttonLabel}</a>
            </footer>
        </div>
    </div>
    
    <script>
    
    var self             = this,
        action           = require("./action.js"),
        constants        = require("./constants.js");
        self.buttonLabel = polyglot.t("welcome-button");
    
    self.on("mount", function() {
        self.screenText.innerHTML = polyglot.t("welcome-text-0HTML");
        self.trainMeText.innerHTML = polyglot.t("welcome-text-1HTML");
        
        self.actionButton.onclick = function() {
            Dispatcher.trigger(action.SET_VISIT_LEVEL, constants.visitLevels.WELCOME);
            self.opts.onclose && self.opts.onclose.call();
        };
    });

    </script>
</welcome>
