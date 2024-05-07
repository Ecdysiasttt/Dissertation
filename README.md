# COM3610 Dissertation Project - Software Products Online (SPO)
SPO was developed by Harry Scutt as part of the requirements to complete the COM3610 Dissertation Project module at the University of Sheffield in partial fulfilment of the requirements for the degree of BEng in Software Engineering.

Dissertation Title: Development of an Online Tool for the Creation and Analysis of Feature Models for Software Product Lines

Author: Harry Scutt

Supervisor: Dr José Miguel Rojas

## Abstract
Software Product Lines (SPLs) are a growing concept in Software Engineering that define families of similar yet distinct systems that can be configured through various combinations of modular software components. With emphasis on reusability and robustness, they have the potential to greatly increase developer productivity, reduce the prevalence of bugs, and reduce costs over a system's lifespan.

SPLs are commonly described using feature models, providing a visual representation of the various relationships and constraints between components, and allowing for analysis to be executed for a product line. This gives insights into the number of valid configurations and highlight unselectable features, for example. They also lower the technical barrier required to understand the workings of potentially very large and complex systems, making them suitable to present to a client or customer.

This project aims to provide an accessible, intuitive web application that enables users to develop feature models for a product line, seeking to replace the deprecated or cumbersome tools currently available.

## Setup Guide
To ensure SPO can run on your system, follow these steps:

1. Download the latest version of Ruby from: https://www.ruby-lang.org/en/downloads/.
2. Download the latest version of Ruby on Rails from: https://rubyonrails.org/.
3. Clone this repository using `git clone https://github.com/Ecdysiasttt/Dissertation`.
4. From the root directory, run `bundle install` to install the necessary gems for SPO.
5. To ensure the database is ready, run these commands in order:
    1. `rails db:create`
    2. `rails db:migrate`
    3. (Optional) `rails db:seed`
6. Finally, run `ruby bin/rails server` on windows to start SPO locally.
7. Visit http://localhost:3000/ to access SPO.