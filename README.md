# Résumé for Jonathan Hartman

## Introduction

I'm not a front-end dev. Want someone to automate your infrastructure? Hi! Want
someone with a good eye for visual design and deep knowledge of modern web
frameworks? Nope! This will quickly become obvious from the first glance
at this project. But I do enjoy the occasional venture outside my
wheelhouse--partly for the fun of it and partly as a check-in on what's changed
in the intervening years and what's still the same.

The goal/hope is to maintain two designs: a pure HTML+CSS version built with
Eleventy and a ridiculously overengineered one that'll give me a chance to
experiment with Next.js.

The older versions of my web résumé have been mostly lost to time, but roughly:

- v1.0 - Some HTML handwritten in Microsoft Notepad (lol)
- v2.0 - A project made in then-Macromedia Dreamweaver and hosted on a server in
  my basement
- v3.0 - A static site generated with the Middleman site generator, Haml
  templates, Bootstrap styling, and FontAwesome icons
- v4.0 - This repo!

## Design

### Components

***Config***

The project root directory contains a `config.yml` file defining our résumé
data in a schema based on [this fork](https://github.com/AverageHelper/resume-schema)
of JSON Résumé, with some additions:

- A top-level `project_info` section to store the project URL and language
- A `pronouns` field in the basics section
- Location information for work experience items
- Location information for education items
- Optionally allowing a location section to be a string instead of hash for
  cases where there is no locality/region/country (i.e. remote work)

***Content***

The Eleventy version of this project uses Nunjucks as its templating language.

***Styling***

We use TailwindCSS for styling. This is a simple site that could use either
that or Bootstrap, but I've used Bootstrap before so am trying something new.

## Credits

Like with any good dev project, lots of the code here is based on work done by
others before me. Shout-outs to some of the most notable sources:

- David Reed's [The Overengineered Resume](https://ktema.org/articles/the-overengineered-resume)
- Colin Hemphill's [nextjs-resume project](https://github.com/colinhemphill/nextjs-resume)
- Daniel Zenzes's [tutorial](https://zenzes.me/eleventy-integrate-postcss-and-tailwind-css/)
  on integrating TailwindCSS with an Eleventy project as an Eleventy filter
  instead of an additional build step in NPM
