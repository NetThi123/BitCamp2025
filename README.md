# BitCamp2025 Hackathon
# Project Name
AidenAI: Your AI Advisor for Financial Aid
The financial aid process is complex and difficult — but AidenAI harnesses the power of Google Gemini to help students from all backgrounds make informed decisions and negotiate for better aid.

## Inspiration:
As college students, we have all had to navigate the extensive and cumbersome financial aid process. We know how difficult it can be to read through large legal and financial documents, understand the complex terms, and decide which offer is better. We were inspired by the power of generative AI to provide people with new insights, and so AidenAI aims to make this process easier and more affordable to those who can’t afford a financial analyst through a personalized AI chatbot. 

## What it does
The AidenAI website allows users to inform Aiden of their background, finances, and educational goals, and differentiates itself further by allowing users to submit official aid offers, FAFSA documentation, and communications from school financial aid offices. With a generative AI targeted specifically at parsing these complex financial documents, AidenAI helps students to:

- Unpack the financespeak by talking with Aiden
- Learn the process of negotiating for more financial aid
- Ask the what-ifs and hypotheticals that will inform their eventual decision


## How we built it
We started by drawing mockups of the various pages and UI elements that would make up the outward-facing website, as well as connecting buttons to the database actions that would need to be taken. We settled on using the FReMP stack to build this application: Flask, React, MongoDB, and Python. We then began carving out discrete chunks of work that each individual person could complete on their own branch, merging branches back into main as soon as a task was completed. The project was essentially split into four sections: frontend (React UI elements and styling), front-back connection (stateful Javascript REST requests), backend (Flask webserver) and database (MongoDB Atlas). We used Vite for rapid prototyping of UI as well as bundling the app for Flask hosting.

## What's next for AidenAI
As we continue to develop the project, we hope to support more file formats for document upload, and also to work on fine-tuning Aiden’s responses so he can better aid students. Focusing on more minute fixes by improving the graphics and general UI/UX will also be an area of improvement. 
