---
title: "Building StudyBuddy at HackED 2022"
date: 2022-01-24
draft: false
---

This past weekend I participated in [HackED 2022](https://hacked-2022.devpost.com/), the annual hackathon put on by the U of A Computer Engineering club. My teammates Armi, Cyrus, Ryan, and I built a web app called StudyBuddy and we finished in first place winning a $1000 grand prize. I wanted to reflect on the experience like I did [last year]({{< ref "/blog/building_grokjs_at_hacked_2021.md" >}}).

## Demo

Before I go over the story in a chronological order I want to share a demo of what we built.

StudyBuddy is a web app designed to help create quizzes (with answers) based on course content. Students can use the quizzes to study and teachers can use the quizzes to create new material. Using AI we made the process of creating a quiz as easy as uploading a PDF.

To get started you can make an account on StudyBuddy and login.

[![Login screen of StudyBuddy](/studybuddy/login.png)](/studybuddy/login.png)

This will bring you to the dashboard.

[![Dashboard screen of StudyBuddy](/studybuddy/dashboard_empty.png)](/studybuddy/dashboard_empty.png)

From here you can get started by uploading a PDF as some new content. We found that StudyBuddy worked well with lots of different content types — lecture slides, class notes, textbook pages, etc. Give the content a title and some tags, then go ahead and click **Create Content**.

[![New content screen of StudyBuddy](/studybuddy/new_content.png)](/studybuddy/new_content.png)

The detail page for a piece of content does a few things. At the top of the page it provides a preview of the PDF you uploaded.

[![Detail screen one of StudyBuddy](/studybuddy/detail_1.png)](/studybuddy/detail_1.png)

Below the preview is a list of questions that were automatically generated for the content when you uploaded it. By default one question is generated for each page, up to a maximum of 20. Each question block shows the question and its associated answer. If you don't like a question you can delete it. You can also use the **Add Question** button to add more questions.

[![Detail screen two of StudyBuddy](/studybuddy/detail_2.png)](/studybuddy/detail_2.png)

Back at the top of the detail page, if you click **Quiz Me** you will be taken to a new screen that shows all of the content's questions in random order with the answers hidden. To reveal the questions you can click on the cards.

[![Quiz screen of StudyBuddy](/studybuddy/quiz.png)](/studybuddy/quiz.png)

If you click the **Quiz Me** button that is found on the dashboard you'll be brought to a special quiz creation screen.

[![Dashboard of StudyBuddy](/studybuddy/dashboard_with_content.png)](/studybuddy/dashboard_with_content.png)

Here you can select multiple pieces of content that you would like to generate a quiz about. You can even select content based on the tags you gave them. When you click **Create Quiz** it will bring you to a quiz just like before with questions in a random order that have their answers hidden.

[![New quiz screen of StudyBuddy](/studybuddy/new_quiz.png)](/studybuddy/new_quiz.png)

## Story

The story of StudyBuddy actually began weeks before the hackathon. I was catching up with my old boss Zohaib Ahmed of Resemble AI and we were chatting about possible hackathon ideas. He was sharing with me all the cool things he imagined you could do with [GPT-3](https://openai.com/blog/openai-api/) (a super powerful language prediction model). One of his ideas was using GPT-3 to help students study by automatically generating questions from a piece of content. Thus began StudyBuddy.

In preparation for the hackathon I did three things. First, I rallied the troops and formed our team. Second, the team and I settled on the StudyBuddy idea and spent a little bit of time brainstorming how it might work. Third, I talked with OpenAI to make sure that it was fine to use GPT-3 in a Hackathon demo — this was fine but I learned that we would need to go through an approval process to actually publish a production version of the application.

On the day of the hackathon we got right to building. We were using Ruby on Rails which made scaffolding out a basic web app incredibly simple. I'm falling in love with Ruby on Rails and will be writing about it more in the future.

Ryan primarily focused on the GPT-3 prompt engineering and the code that interfaced between our web app and the GPT-3 API. The rest of us focused on building out the CRUD operations for different resources, background jobs to generate questions, and styling. Kudos to Armi for crafting the lovely logo.

Thanks to the insane speed of Rails we had something respectable looking by 7pm (6 hours in). By roughly 1am (12 hours in) we had integrated the Rails app with the GPT-3 API and it was working from start to finish. We ended up staying up until about 7am (18 hours in) polishing the UI and working out bugs in the question generation. Pleased with how far we got, we hit the sack and managed about 3 hours of sleep before waking up and adding a few polishing touches.

After the hacking ended at 1pm the next day we spent the afternoon prepping and delivering our demo. The day finished off with closing ceremonies at 7pm where it was announced that we finished in first place!

It's still to be determined but our group is in talks about taking the application through the OpenAI reviewal process and publicly releasing it.

## Reflections

I always learn lots at hackathons and this year was no exception. The following are some of my biggest takeaways.

Picking and planning an idea in advance of a hackathon is incredibly helpful. Having a plan in advance meant that we didn't need to waste the first few hours of the hackathon trying to think of or refine an idea. Looking at the commit history I can see that our first commit was checked in a mere 13 minutes after the start of the hackathon.

Two things can really make a demo pop: aesthetic and wow-factor. We had a bit of both. Because building the CRUD logic was so easy with Rails we had a lot of time to nicely style the project with TailwindCSS. By using GPT-3 we were able to borrow some of it's wow-factor and inject it into our project. If you're looking to win a hackathon you want to find an idea that is both really cool and really easy to execute on.

In hindsight we should have gone to bed earlier. From about 4am to 7am before we went to bed, we were effectively zombies. Bugs that probably would have been 20 minute fixes in the right state of mind, ended up being multi-hour slogs with our level of exhaustion. If we had gone to bed by 4am we could have woken up at 8am well rested and done a lot more high quality work in the remaining 5 hours.

I don't think I'll ever build a web app without Rails again. I simply just cannot believe how productive it makes me. Do I miss static types and being able to fiddle with configuration? Sure. But, I'm happy to give up all of that for the insane productivity of Rails.

Overall I'm super pleased with how everything went and that I got to win a hackathon during my university career. Who knows, maybe we'll even publicly release StudyBuddy.
