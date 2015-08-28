/* Copyright IBM Corp. 2015
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.ibm.watson.app.qaclassifier.selenium;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import com.ibm.watson.app.qaclassifier.SampleQuestions;
import com.ibm.watson.app.qaclassifier.selenium.drivers.Multiplatform;
import com.ibm.watson.app.qaclassifier.selenium.drivers.Multiplatform.InjectDriver;

@RunWith(Multiplatform.class)
public class HighLowConfidenceAnswersIT {
    @InjectDriver
    public WebDriver driver;
    
    @Test
    public void askHighConfidenceQuestionViaTextInput() {
        String questionText = SampleQuestions.HIGH_CONFIDENCE;
        CommonFunctions.askQuestionViaTextInput(driver, questionText);

        assertTrue("After asking question via text input, found answer text on answer page",
        		CommonFunctions.getDisplayedAnswerText(driver).length() > 0);
        
        assertTrue("After a high confidence answer has been received, the positive feedback button is shown",
        		driver.findElement(By.id("positiveFeedbackInput")).isDisplayed());
        
        assertTrue("After a high confidence answer has been received, the negative feedback button is shown",
        		driver.findElement(By.id("negativeFeedbackInput")).isDisplayed());
    }
    
    @Test
    public void askLowConfidenceQuestionViaTextInput() {
        CommonFunctions.askQuestionViaTextInput(driver, SampleQuestions.LOW_CONFIDENCE);

        assertTrue("After asking question via text input, find low confidence prompt on page",
        		CommonFunctions.findNoneOfTheAboveButton(driver).isDisplayed());
    }
    
    @Test
    public void askNoAnswerQuestion() {
        CommonFunctions.askQuestionViaTextInput(driver, SampleQuestions.NO_ANSWERS);

        assertTrue("After asking question via text input, find the forum button in Still Need Help section",
                CommonFunctions.findVisitTheForumButton(driver).isDisplayed());
        
        CommonFunctions.findVisitTheForumButton(driver).click();
        CommonFunctions.switchTabs(driver);
        assertThat("After clicking on the forum button, page is redirected",
        		driver.getTitle(), is("natural-language-classifier - dWAnswers"));
    }
}
