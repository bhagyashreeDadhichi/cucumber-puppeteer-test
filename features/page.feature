Feature: Page
  In order to get things done
  As I user
  I want to manage my todos

   Scenario: access the anz home page
    Given I access the application "home" page
    When I check the element exist
    And I enter the provided value in the respective column
    When I check the total estimate value "$459,000"
    Then reset the column
    When I enter only $1 for leaving expense
    Then I get the text displayed

  
