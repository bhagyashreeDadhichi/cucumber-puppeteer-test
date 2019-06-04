const { setWorldConstructor } = require("cucumber");
const { expect } = require("chai");
const puppeteer = require("puppeteer");
const assert = require("assert");

const PAGE = "https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/";

class TodoWorld {
  constructor() {
    this.todo = "";
  }

  async attachScreenshot(string){
    await this.page.screenshot({path:'./features/support/img/${string}.png'});
  }
  async openTodoPage() {
    this.browser = await puppeteer.launch({headless :false});
    this.page = await this.browser.newPage();
    await this.page.waitFor(4000);
    await this.page.goto(PAGE);
      }
async clickElement(selector){
  await this.page.click(selector);
}

async enterTextBox(selector,value){
await this.page.focus(selector);
await this.page.click(selector);
await this.page.keyboard.type(value);
}

async checkElementValue(selector,value){
  await this.page.waitForSelector(selector);
  await this.page.waitFor(10000);
  const inputvalue = await this.page.$eval(selector,el => el.innerText);
  // inputvalue = inputvalue.split("$");
  // inputvalue = inputvalue.replace(",","");
  assert.equal(inputvalue.trim(),value);
}

async checkElementExist(selector){
await this.page.waitForSelector(selector);
}
  setTodo(todo) {
    this.todo = todo;
  }

  async writeTodo() {
    const inputSelector = "section input";
    await this.page.waitForSelector(inputSelector);
    this.inputElement = await this.page.$(inputSelector);
    await this.inputElement.type(this.todo);
  }

  async submit() {
    await this.inputElement.press("Enter");
  }

  async checkTodoIsInList() {
    const todoSelector = "ul.todo-list li label";
    await this.page.waitForSelector(todoSelector);
    const todo = await this.page.evaluate(
      todoSelector => document.querySelector(todoSelector).innerText,
      todoSelector
    );
    expect(this.todo).to.eql(todo);
  }

  async closeTodoPage() {
    await this.browser.close();
  }
}

setWorldConstructor(TodoWorld);
