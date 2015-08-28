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

import static org.hamcrest.Matchers.containsString;
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
public class HistoryIT {
    @InjectDriver
    public WebDriver driver;
    
    @Test
    public void homeToQuestionToHome() {
        CommonFunctions.askQuestionViaTextInput(driver, SampleQuestions.HIGH_CONFIDENCE);
        driver.navigate().back();
        
        if (CommonFunctions.isMobileUI(driver) || CommonFunctions.isTabletUI(driver)) {
            assertTrue("Loading the home page, asking a question, and pressing back returns back to home page",
            		driver.findElement(By.className("getting-started-mobile")).isDisplayed());
        }
        else {
            assertTrue("Loading the home page, asking a question, and pressing back returns back to home page",
            		driver.findElement(By.className("getting-started-desktop")).isDisplayed());
        }
    }
    
    @Test
    public void homeToLowQuestionToHighQuestionThenBack() {
        CommonFunctions.askQuestionViaTextInput(driver, SampleQuestions.HIGH_CONFIDENCE);
        CommonFunctions.askQuestionViaTextInput(driver, SampleQuestions.LOW_CONFIDENCE);

        driver.navigate().back();

        assertThat("After asking two questions, pressing back shows the proper text for the first question",
                CommonFunctions.getDisplayedQuestionText(driver), containsString(SampleQuestions.HIGH_CONFIDENCE));
        
        assertTrue("After asking two questions, pressing back shows an answer",
        		CommonFunctions.getDisplayedAnswerText(driver).length() > 0);
    }
    
    @Test
    public void homeToLowQuestionToHighQuestionThenBackThenForward() {
        CommonFunctions.askQuestionViaTextInput(driver, SampleQuestions.HIGH_CONFIDENCE);
        CommonFunctions.askQuestionViaTextInput(driver, SampleQuestions.LOW_CONFIDENCE);

        driver.navigate().back();

        assertThat("After asking two questions, pressing back shows the proper text for the first question",
                CommonFunctions.getDisplayedQuestionText(driver), containsString(SampleQuestions.HIGH_CONFIDENCE));
        
        assertTrue("After asking two questions, pressing back shows an answer",
        		CommonFunctions.getDisplayedAnswerText(driver).length() > 0);
        
        driver.navigate().forward();
        
        assertThat("After pressing back, pressing forward shows the proper text for the second question",
                CommonFunctions.getDisplayedQuestionText(driver), containsString(SampleQuestions.LOW_CONFIDENCE));
        
        assertTrue("After pressing back, pressing forward shows the 'none of the above' option",
        		CommonFunctions.findNoneOfTheAboveButton(driver).isDisplayed());
    }
}
