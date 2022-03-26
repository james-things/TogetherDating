Feature: Age verification

Scenario: Entering an age below 18
Given My age is under 18
When I submit my birthdate to the form
Then I should be deemed too young to register