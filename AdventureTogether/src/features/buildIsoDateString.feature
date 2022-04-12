Feature: Build ISO Date String

Scenario: Enter US date format
Given I enter date elements in different input fields in a form
When I submit a form displayed US format of MM-DD-YYYY
Then I expect the string to be converted to ISO format YYYY-MM-DD