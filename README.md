SWE-6733, Winter 2022
Development Project: Adventure Together
Team Members: Jerry Coweell Jr, James Harris, Hugh Sheridan, Frank Wear, Easton Wong

Scrum Roles:
    Product Owner - Hugh Sheridan
    Scrum Master - Frank Wear
    Lead Developer - East Wong
    Developers - Jerry Cowell Jr, James Harris

Project Metrics:

Prioritization method to be used to prioritize the entire backlog: https://www.scaledagileframework.com/wsjf/

Priorities:

  If the assigned priority confliect with the WSJF calcuation or is not deliverable in a single sprint, the product owner and team will negotiate the work and potentially break the item into smaller work items.

  Priority 1 - Critical - Items marked as Critical should ideally be addressed first. 

  Priority 2 - High - correlates to high business priority in order to deliver on the product vision and objectives.

  Priority 3 - Medium - correlates to medium business priority relative to other items.

  Priority 4 - Low - correlates to a low business priority relative to other items.


Story Points:

The Story Points will utilize the Fibonacci series. Story points are a relative measure of effort required to deliver the requested work. Story points and hours are not related. The team will select a story to be their baseline story from the backlog, discuss it, story point it, and then go implement it. Once delivered and accepted per the acceptance criteria, that story will be used to compare all over stories as a benchmark when estimating future work. Hopefully the team chooses a story that they think will be of medium effort so that future estimated stories will fall on either side of the baseline story accurately. The baselining exercise can and should be repeated when the team feels that the baseline story is no longer valid.

https://www.visual-paradigm.com/scrum/what-is-story-point-in-agile/
https://agilevelocity.com/blogget-started-story-points-via-affinity-estimation-cheat-sheet/ 

Story splitting:

From time to time, it will be necessary to split a story into smaller chunks in order to deliver the desired business value. Here are a few references to consider when splitting stories:

https://www.linkedin.com/pulse/10-useful-strategies-breaking-down-large-user-stories-verwijs/
https://techbeacon.com/app-dev-testing/practical-guide-user-story-splitting-agile-teams 
https://www.productplan.com/learn/break-product-features-into-user-stories/

Item Listing Order:

Items in the backlog will be ranked according to the WSJF calculation used to maitain the backlog priority.

Acceptance Criteria: The acceptance criteria are written in a spirit of a use case/Gherkin format <Given, When, Then>.

- Interface specifications and models, whether programmic or user, will be linked to the item and pointed out in the acceptance criteria.
- Specific parameters or descriptions of user interfaces will be included in acceptance criteria.
- Testability specification, where definable, should be included with acceptance criteria.
- Performance specification, where applicable, should be included in acceptance criteria.
- Acceptance criteria should be clear and concise, giving consideration to how it can be misinterpreted and clarifying

Definition of Ready (DoR):

The term PBI is used to identify any backlog item requiring elaboration; user story or bug.

The team's definition of ready will align with the INVEST model:

I	Independent 	
The PBI (Product Backlog Itmem; story or bug) should be self-contained, in a way that there is no inherent dependency on another PBI. You also try to avoid dependencies with others outside the Scrum Team Dependencies are identified and no external dependencies block the User Story from being completed.

N	Negotiable	
PBIs are not explicit contracts and should leave space for discussion. This leads to a discussion between the Development Team and the Product Owner about the exact delivery. So no set of requirements is carved in stone.

V	Valuable	
A PBI must deliver value to the stakeholders. This looks like stating the obvious, however, it is possible that a user story that has been written down at an earlier stage is outdated and no longer represents any value when it is discussed. Business value is clearly articulated in the description; As a <type of user>, I want <some goal or objective >, so that <benefit, value> PO recognizes and approves the business need of the story

E	Estimable
You must always be able to estimate the size of a PBI. The Development Team needs sufficient information about the stakeholder's wishes to estimate how much effort it will take to realize this. Often the estimate is made by means of relative estimates, for example with Planning Poker. High-level Technical Approach Document (TAD)  is attached/linked. Process models (context diagram, functional flow diagram, cross-functional diagram and/or flowchart diagram) are attached/linked. Metrics and Analytics requirements are articulated (i.e data layer story is identified and linked or performance parameters are defined). 
Global Requirements have been reviewed and checked for relevance

S	Small	
PBIs should not be so big as to become impossible to plan/task/prioritize with a certain level of accuracy. The User Story must be small enough to be delivered within a Sprint. After all, an incremental part of the project must be delivered at the end of every Sprint. User Stories for which the Development Team estimates that the delivery will take longer than a Sprint must therefore be clipped by the Product Owner.

T	Testable	
The PBI or its related description must provide the necessary information to make test development possible. The completed work must be finished and can in principle be delivered to the customers. This means that it must be tested whether everything has been delivered properly. In order to test, it is important that clear acceptance criteria are written that the delivered work must meet in order to be valuable to the Stakeholders

DoR Checklist:
- Target release has been set
- Story is linked to a higher level epic
- Initial business priority has been set
- Title is clear and understandable
- User story is written in the "As a <type of user>, I want <some goal or objective >, so that <benefit, value>" format
- Acceptance criteria are clear and written in the "<Given, When, Then>" format
- Story points estimated by the team

Definition of Done (DoD) Checklist:

- Development is completed and validated against the acceptance criteria
- Development looks like, and is validated against the approved designs. Development looks like and is validated against the approved designs (end user POV) in the design tool (Figma??)
- Development is compliant with performance KPIs
- Template/Component is fully responsive on both desktop and mobile based on designs.
-	Realistic data/content has been used for development
- Unit and UI tests have been performed and have passed
- If applicable, user documentation has been created/updated for this story
- Verify solution against solution specification, architecture guidelines, coding standards, and principles.
- Realistic data/content has been used in testing
- User story has been tested and validated against acceptance criteria and test cases created for the story at the beginning of the sprint
- User story has been tested and validated against page designs
