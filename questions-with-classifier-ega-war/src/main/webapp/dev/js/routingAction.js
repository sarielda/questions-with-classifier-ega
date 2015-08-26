/* Copyright IBM Corp. 2015 Licensed under the Apache License, Version 2.0 */

// For my sanity, please keep this alphabetical
var routingAction = {
    "ANSWER_RECEIVED"                 : "an_answer_was_returned_from_the_server",
    "ASK_QUESTION_BROADCAST"          : "ask_a_question_from_router",
    "CONVERSATION_STARTED"            : "new_conversation_has_been_started",
    "GET_CURRENT_MESSAGEID"           : "request_the_current_displayed_messageId",
    "GET_CURRENT_MESSAGEID_BROADCAST" : "return_the_current_displayed_messageId",
    "REFINEMENT_REQUESTED"            : "direct_to_refinement_questions",
    "SHOW_HOME_PAGE"                  : "show_the_home_page",
    "SHOW_HOME_PAGE_BROADCAST"        : "show_the_home_page_broadcast_action",
    "STILL_NEED_HELP_BROADCAST"       : "show_the_unhappy_page"
};

// Make these guys unique from the other actions
Object.keys(routingAction).forEach(function(value, index) {
    routingAction[value] += "_routingAction";
});

if (typeof(module) !== 'undefined') module.exports = routingAction;