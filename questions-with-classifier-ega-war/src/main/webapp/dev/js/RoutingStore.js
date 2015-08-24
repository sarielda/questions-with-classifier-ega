/* Copyright IBM Corp. 2015 Licensed under the Apache License, Version 2.0 */

var riot          = require("riot"),
    action        = require("./action.js"),
    constants     = require("./constants.js"),
    routingAction = require("./routingAction.js");
    
function RoutingStore() {
    riot.observable(this);
    
    var self = this;

    self.currentConversationId     = null;
    self._internalQuestionWasAsked = false;
    
    /*
     * Guarantees the question payload is valid, and not-malicious
     * @param {String} (optional)requestedConversationId : The ConversationId of the requested message.
     * @param {String} (required)requestedMessageText    : The message, or question, which will be sent to the server
     * @param {String} (optional)requestedMessageId      : The messageId which will try to be matched with a cached response
     * @param {String} (optional)requestedFeedback       : Feedback, whether we're passing a referral or not
     * @returns {Object} URL in this format:  {message :  messagePayload, messageId :messageId, referrer : referrer}
     */
    self._verifyQuestionPayload = function(requestedConversationId, requestedMessageText, requestedMessageId, requestedFeedback) {
        
        var messagePayload     = {};
        messagePayload.message = decodeURIComponent(requestedMessageText);
    
        if (requestedFeedback && requestedFeedback === constants.needHelpFeedbackType) {
            messagePayload.referrer = requestedFeedback;
        }
        
        if (requestedMessageId) {
            messagePayload.messageId = requestedMessageId;
        }
    
        return messagePayload;
    };
    
    /*
     * Guarantees the url is properly formatted
     * @param {Object} An object with: (required)message, (optional)messageId, (optional)referrer
     * @returns {String} URL in this format:  /conversationId[/messageId/messagePayload/referrer]
     */
    self._urlify = function(questionPayload) {
        var conversationIdComponent = self.currentConversationId + "/",
            messagePayloadComponent = encodeURIComponent(questionPayload.message) + "/",
            messageIdComponent      = (questionPayload.messageId ? (questionPayload.messageId) : ""),
            referrerComponent       = (questionPayload.referrer ? questionPayload.referrer + "/" : "");
        
        var routeTo = conversationIdComponent + messagePayloadComponent + messageIdComponent + referrerComponent;
        
        riot.route(routeTo);
    };
    
    /*
     * Sets the base URL to the current conversation and broadcasts a show home page event
     */
    self._urlifyConversation = function(requestedConversationId, requestedMessageText, requestedMessageId, requestedFeedback) {

        // Show the home page if 
        if (requestedConversationId && !requestedMessageText && !requestedMessageId && !requestedFeedback) {
            self.trigger(routingAction.SHOW_HOME_PAGE_BROADCAST);
        }
        
        var routeTo = self.currentConversationId;
        
        riot.route(routeTo);
    };

    // Establish our main routing callback to handle the url resolution
    riot.route(function(requestedConversationId, requestedMessageText, requestedMessageId, requestedFeedback) {
        
        // Update the converationId, in case it's old
        if (requestedConversationId !== self.currentConversationId) {
            self._urlifyConversation(requestedConversationId, requestedMessageText, requestedMessageId, requestedFeedback);
        }
        else if (requestedConversationId && requestedMessageText) {
            
            // Verify all the payload properties before we potentially send them to a server
            var currentMessagePayload = self._verifyQuestionPayload(requestedConversationId, 
                                            requestedMessageText, 
                                            requestedMessageId, 
                                            requestedFeedback);

            // Only ask a question to the server if the user navigated here via the address bar
            if (requestedFeedback !== constants.needHelpFeedbackType && !self._internalQuestionWasAsked) {
                self.trigger(routingAction.ASK_QUESTION_BROADCAST, currentMessagePayload);
            }
            else if (requestedFeedback === constants.needHelpFeedbackType && !self._internalQuestionWasAsked) {
                self.trigger(routingAction.STILL_NEED_HELP_BROADCAST, currentMessagePayload);
            }
        }
    }.bind(self));
    
    /*
     *  Responds to an action notifying this store that a conversation has been started
     * @param {String} The ID of the current conversation we need to route to 
     */ 
    self.on(routingAction.CONVERSATION_STARTED, function(conversationId) {
        self.currentConversationId = conversationId;
        self._urlifyConversation(self.currentConversationId);
    });
    
    /*
     *  Updates the url with full question data
     * @param {Object} An object with: (required)conversationId, (required)message, (optional)messageId, (optional)referrer
     */ 
    self.on(routingAction.ANSWER_RECEIVED, function(questionPayload) {
        // Update our conversationId
        self.currentConversationId = questionPayload.conversationId;
        
        // Build the routing string and update the browser URL
        self._internalQuestionWasAsked = true;
        self._urlify(questionPayload);
        self._internalQuestionWasAsked = false;
    });
    
    /*
     *  Responds to an action notifying this store that a conversation has been started
     * @param {String} The ID of the current conversation we need to route to 
     */ 
    self.on(routingAction.REFINEMENT_REQUESTED, function() {
        
        self._internalQuestionWasAsked = true;
        riot.route.exec(function(requestedConversationId, requestedMessageText, requestedMessageId) {
            riot.route(requestedConversationId + "/" + 
                requestedMessageText           + "/" + 
                requestedMessageId             + "/" + 
                constants.needHelpFeedbackType);
        }.bind(self));
        self._internalQuestionWasAsked = false;
    });
    
    /*
     *  A request to show the home page with the current Conversation ID
     */ 
    self.on(routingAction.SHOW_HOME_PAGE, function() {
        // Note:  This will replace an older conversationId with the newest, current one
        self._urlifyConversation();
    });
}

if (typeof(module) !== 'undefined') module.exports = RoutingStore;