const express = require("express")
const puppeteer = require("puppeteer");
const app = express();
const port = process.env.PORT || 9000;
app.use(express.json())
app.get("/", (req, res) => res.status(200).send("Software Started"));
app.post("/v1", (req, res) => {
  const data = req.body;
  var { fname, lname, email, nin, gender, DOB, address, town, post, userID } = data;
  var g;
  var dob = DOB.split("/");
  if (gender === "M") { g = 0; }
  else if (gender === "F") { g = 1; }
  (async () => {

      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      await page.goto("https://wsr.pearsonvue.com/testtaker/signin/SignInPage/CITB");

      await Promise.all([
        page.waitForNavigation(),
        page.click("#createWebAccountLinkCapva")

      ]);

      await Promise.all([
        page.waitForNavigation(),
        page.evaluate(() => {
          document.querySelector('input[id="privacyOptInAcceptanceCheckBox"]').click()
        }),
        page.evaluate(() => {
          document.querySelector("body > div:nth-child(20) > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button:nth-child(1)").click()
        }),
        page.evaluate(() => {
          document.querySelector('input[id="candidateIdOptions:2"]').click()
        }),
        page.evaluate((fname) => {
          document.querySelector('input[id="fname"]').value = fname
        }, fname),
        page.evaluate((lname) => {
          document.querySelector('input[id="lname"]').value = lname;
        }, lname),
        page.evaluate((dob) => {
          document.querySelector('select[id="editPersonalInformationGridDATE_OF_BIRTH.day"]').value = dob[0];
        }, dob),
        page.evaluate((dob) => {
          document.querySelector('select[id="editPersonalInformationGridDATE_OF_BIRTH.month"]').value = dob[1];
        }, dob),
        page.evaluate((dob) => {
          document.querySelector('select[id="editPersonalInformationGridDATE_OF_BIRTH.year"]').value = dob[2];
        }, dob),
        page.evaluate((g) => {
          const evl = 'input[id="editPersonalInformationGridGENDER:' + g + '"]';
          document.querySelector(evl).click();
        }, g),
        page.evaluate((nin) => {

          document.querySelector('input[id="personalConfigNinonino1"]').value = nin[0] + nin[1];
        }, nin),
        page.evaluate((nin) => {

          document.querySelector('input[id="personalConfigNinonino2"]').value = nin[2] + nin[3];
        }, nin),
        page.evaluate((nin) => {

          document.querySelector('input[id="personalConfigNinonino3"]').value = nin[4] + nin[5];
        }, nin),
        page.evaluate((nin) => {

          document.querySelector('input[id="personalConfigNinonino4"]').value = nin[6] + nin[7];
        }, nin),
        page.evaluate((nin) => {

          document.querySelector('input[id="personalConfigNinonino5"]').value = nin[8];
        }, nin),


        page.evaluate((nin) => {

          document.querySelector('input[id="inputNinonino1"]').value = nin[0] + nin[1];
        }, nin),
        page.evaluate((nin) => {

          document.querySelector('input[id="inputNinonino2"]').value = nin[2] + nin[3];
        }, nin),
        page.evaluate((nin) => {

          document.querySelector('input[id="inputNinonino3"]').value = nin[4] + nin[5];
        }, nin),
        page.evaluate((nin) => {

          document.querySelector('input[id="inputNinonino4"]').value = nin[6] + nin[7];
        }, nin),
        page.evaluate((nin) => {

          document.querySelector('input[id="inputNinonino5"]').value = nin[8];
        }, nin),
        page.evaluate((email) => {

          document.querySelector('input[id="editEmailPanelGroupEMAIL"]').value = email;
        }, email),
        page.evaluate((email) => {

          document.querySelector('input[id="confirmEmail"]').value = email;
        }, email),

        page.evaluate(() => {
          document.querySelector('input[id="nextButton"]').click()
        }),

      ]);
      await Promise.all([
        page.waitForNavigation(),
        page.evaluate((address) => {
          document.querySelector("#editPrimary_editAddressGridADDRESS1").value = address
        }, address),
        page.evaluate((town) => {
          document.querySelector("#editPrimary_editAddressGridCITY").value = town
        }, town),
        page.evaluate((post) => {
          document.querySelector("#editPrimary_editAddressGridPOSTAL_CODE").value = post
        }, post),
        page.evaluate(() => {
          document.querySelector("#editPrimary_editAddressGridTELEPHONE").value = "8989898989"
        }),
        page.evaluate(() => {
          document.querySelector("#CORRESPONDENCE_CONFIRMATION_737\\:0").click()
        }),
        page.evaluate(() => {
          document.querySelector("#CORRESPONDENCE_REMINDER_737\\:2").click()
        }),
        page.evaluate(() => {
          document.querySelector("#nextButton").click()
        }),


      ]);
      await Promise.all([
        page.waitForNavigation(),
        page.evaluate(() => {
          document.querySelector('input[id="component1_SELECT_ONE_RADIOBUTTON_3657:1"]').click()
        }),
        page.evaluate(() => {
          document.querySelector('input[id="nextButton"]').click()
        })

      ]);
      await Promise.all([
        page.waitForNavigation(),
        page.evaluate((userID) => {
          document.querySelector('input[id="inputUsername"]').value = userID;
        }, userID),
        page.evaluate(() => {
          document.querySelector('input[id="inputPassword"]').value = "#1Acsscitb";
        }),
        page.evaluate(() => {
          document.querySelector('input[id="inputConfirmPassword"]').value = "#1Acsscitb";
        }),
        page.evaluate(() => {
          document.querySelector('select[id="inputSecurityQuestionOne"]').value = 202;
        }),
        page.evaluate(() => {
          document.querySelector('input[id="inputAnswerOne"]').value = "none";
        }),
        page.evaluate(() => {
          document.querySelector('select[id="inputSecurityQuestionTwo"]').value = 211;
        }),
        page.evaluate(() => {
          document.querySelector('input[id="inputAnswerTwo"]').value = "none";
        }),
        page.evaluate(() => {
          document.querySelector('select[id="inputSecurityQuestionThree"]').value = 219;
        }),
        page.evaluate(() => {
          document.querySelector('input[id="inputAnswerThree"]').value = "none";
        }),
        page.evaluate(() => {
          document.querySelector('input[id="nextButton"]').click();
        }),

      ]);
      res.send("Done");
      
  })();

})

app.listen(port);
