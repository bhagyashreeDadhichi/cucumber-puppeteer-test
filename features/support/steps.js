const { Given, When, Then, After, Before,setDefaultTimeout } = require("cucumber");

setDefaultTimeout(async function(){
  setDefaultTimeout(60 *1000);
});
Before(async function(testCase) {
   await this.openTodoPage();
});

After(async function() {
  return await this.closeTodoPage();
});

Given("I access the application {string} page", async function(page) {
  await this.attachScreenshot(page);
});

When("I check the element exist", async function() {
  //check the single 
  await this.checkElementExist("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(1) > div > div:nth-child(2) > ul > li");
  //check the income element
  await this.checkElementExist("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(2) > div > div:nth-child(2) > div > input[type=text]")
 // check the other income element
 await this.checkElementExist("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(2) > div > div:nth-child(3) > div > input[type=text]");
 //check the living expense 
 await this.checkElementExist("#expenses");
 //check the current loan repayment element
 await this.checkElementExist("#homeloans");
 //check the other loan payment
 await this.checkElementExist("#otherloans");
 //check the total credit
 await this.checkElementExist("#credit");
});

When("I click enter", async function() {
  return await this.submit();
});

Then("I enter the provided value in the respective column", async function() {
  await this.clickElement("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(1) > div > div:nth-child(2) > ul > li");
  //enter income value $80000
  await this.enterTextBox("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(2) > div > div:nth-child(2) > div > input[type=text]","80000");
  //enter other income value $10000
  await this.enterTextBox("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(2) > div > div:nth-child(3) > div > input[type=text]","10000");
  //enter living expense $500
  await this.enterTextBox("#expenses","500");
  //enter the other loan payment $100
  await this.enterTextBox("#otherloans","100");
  //enter the total credit $10000
  await this.enterTextBox("#credit","10000");
  //click the total borrow estimate
  await this.clickElement("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__calculate.text--center.clearfix > button");
await this.attachScreenshot("form_full");
});

When("I check the total estimate value {string}",async function(value){
await this.checkElementValue("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__result.text--white.clearfix > div.box--left > span.borrow__result__text > span",value);
await this.attachScreenshot("total_estimates");
});

Then("reset the column",async function(){
  await this.clickElement("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__result.text--white.clearfix > div.box--right > button");

});

When("I enter only $1 for leaving expense",async function(){
  await this.clickElement("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(1) > div > div:nth-child(2) > ul > li");
  //enter income value $80000
  await this.enterTextBox("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(2) > div > div:nth-child(2) > div > input[type=text]","0");
  //enter other income value $10000
  await this.enterTextBox("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div.container__main.borrow--homeloan > div > div:nth-child(2) > div > div:nth-child(3) > div > input[type=text]","0");
  //enter living expense $500
  await this.enterTextBox("#expenses","1");
  //enter the other loan payment $100
  await this.enterTextBox("#otherloans","0");
  //enter the total credit $10000
  await this.enterTextBox("#credit","0");
  //click the total borrow estimate
  await this.clickElement("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__calculate.text--center.clearfix > button");
await this.attachScreenshot("oneDollor_livingExpense");
});

Then("I get the text displayed",async function(){
  await this.checkElementValue("body > main > div:nth-child(2) > div > div > div.clearfix > div > div > div > div > div.container.container--four.box--white > div > div:nth-child(3) > div > div > div > div.borrow__error.text--white.clearfix > div.box--left.text--center > span",
  `Based on the details you've entered, we're unable to give you an estimate of your borrowing power with this calculator. For questions, call us on 1800 100 641.`);
  await this.attachScreenshot("UnableToEstimate");
});