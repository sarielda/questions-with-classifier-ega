/* Copyright IBM Corp. 2015 Licensed under the Apache License, Version 2.0 */

// For my sanity, please keep this alphabetical
var action = {
    "ALTERNATIVE_QUESTION_BROADCAST"        : "a_list_of_alternative_answers_was_broadcasted",
    "ANSWER_RECEIVED_BROADCAST"             : "an_answer_was_received",
    "ASK_QUESTION"                          : "ask_a_question",
    "ASKING_QUESTION_BROADCAST"             : "asking_a_question",
    "CONVERSATION_START"                    : "start_a_new_conversation",
    "CONVERSATION_STARTED_BROADCAST"        : "a_new_conversation_has_been_started",
    "FORUM_BUTTON_PRESSED"                  : "the_button_to_open_forum_was_pressed",
    "GET_ALTERNATIVE_QUESTIONS"             : "ask_for_a_set_of_alternative_answers",
    "GET_TOP_QUESTIONS"                     : "ask_for_the_top_questions",
    "GET_VISIT_LEVEL"                       : "get_visit_level",
    "NEGATIVE_FEEDBACK_GIVEN"               : "user_provided_negative_feedback",
    "NEGATIVE_FEEDBACK_RECEIVED_BROADCAST"  : "negative_feedback_was_processed_by_the_server",
    "NONE_OF_THE_ABOVE_CLICKED"             : "none_of_the_above_was_selected",
    "NONE_OF_THE_ABOVE_CLICKED_BROADCAST"   : "none_of_the_above_was_selected_broadcast",
    "POSITIVE_FEEDBACK_GIVEN"               : "user_provided_positive_feedback",
    "POSITIVE_FEEDBACK_RECEIVED_BROADCAST"  : "positive_feedback_was_processed_by_the_server",
    "QUESTION_RECEIVED"                     : "question_response_has_been_received_from_server",
    "SERVER_ERROR_BROADCAST"                : "a_server_error_has_occurred",
    "SET_CURRENT_QUESTION"                  : "set_the_current_question_being_shown",
    "SET_VISIT_LEVEL"                       : "set_visit_level",
    "SHOW_MENU_OVERLAY"                     : "show_menu_overlay",
    "SHOW_MENU_OVERLAY_BROADCAST"           : "show_menu_overlay_broadcast",
    "TOP_QUESTIONS_BROADCAST"               : "broadcast_the_list_of_top_questions",
    "UPDATE_REFINEMENT_QUESTIONS"           : "get_updated_list_of_responses_for_questionId",
    "UPDATE_REFINEMENT_QUESTIONS_BROADCAST" : "return_updated_list_of_responses_for_questionId",
    "VISIT_LEVEL_BROADCAST"                 : "broadcast_the_visit_level",
    "VISIT_LEVEL_CHANGED_BROADCAST"         : "visit_level_has_been_changed",
    "VISIT_LEVEL_NONE_BROADCAST"            : "visit_level_is_at_first_visit",
    "VISIT_LEVEL_WELCOME_BROADCAST"         : "visit_level_is_at_welcome",
    "VISIT_LEVEL_POPUP_BROADCAST"           : "visit_level_is_at_popup"
};

// Make these guys unique from the other actions
Object.keys(action).forEach(function(value, index) {
    action[value] += "_action";
});

if (typeof(module) !== 'undefined') module.exports = action;