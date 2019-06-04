Feature: Page
  In order to get things done
  As Person user
  Person want to manage todos

   Scenario: access the anz home page
    Given Person access the application "home" page
    When Person check the element exist
    And Person enter the provided value in the respective column
    When Person check the total estimate value "$459,000"
    Then reset the column
    When Person enter only $1 for leaving expense
    Then Person get the text displayed

  
