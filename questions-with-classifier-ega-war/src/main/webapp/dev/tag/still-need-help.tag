/* Copyright IBM Corp. 2015 Licensed under the Apache License, Version 2.0 */

<still-need-help>
    <div class="horizontal-line">.</div>
	<h2 class="still-need-help-title">{stillNeedHelpTitle}</h2>
	
	<div class="still-need-help-content" id="explanation"></div>
	
	<div class="still-need-help-content" id="tips-container">
		<div>{tipsTitle}</div>
		<ul class="tips">
			<li each={ tip, i in tips } class="tip-{i}">{tip}</li>
		</ul>
	</div>
	
	<div>
		<button class="visitForum" onclick={ launchForum }>{buttonLabel}</button>
	</div>
	
	<script>
    
    var self          = this,
        action        = require("./action.js"),
        routingAction = require("./routingAction.js");
        
    // String translations
    self.messageId             = null;
    self.stillNeedHelpTitle    = polyglot.t("stillNeedHelpTitle"),
    self.explanation.innerHTML = polyglot.t("stillNeedHelpTextHTML"),
    self.tipsTitle             = polyglot.t("stillNeedHelpTipsTitle"),
    self.buttonLabel           = polyglot.t("stillNEeedHelpButton");
	self.tips = [
	    polyglot.t("stillNeedHelpTips-1"),
	    polyglot.t("stillNeedHelpTips-2")
	];
    
	launchForum(e) {
        // Handle our own event with a server call to the Feedback API
        Dispatcher.trigger(routingAction.GET_CURRENT_MESSAGEID, function(messageId) {
            Dispatcher.trigger(action.FORUM_BUTTON_PRESSED, messageId);
    		window.open("https://developer.ibm.com/answers/topics/natural-language-classifier/");
        }.bind(self));
	}
	
	</script>
</still-need-help>
