# Résumé for Jonathan Hartman

## Introduction

I'm not a front-end dev. Want someone to automate your infrastructure? Hi! Want
someone with a good eye for visual design and deep knowledge of modern web
frameworks? Nope! This will quickly become obvious from the first glance
at this project. But I do enjoy the occasional venture outside my
wheelhouse--partly for the fun of it and partly as a check-in on what's changed
in the intervening years and what's still the same.

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
data in a schema based on [JSON Resume](https://jsonresume.org/schema/), with
some additions:

- A top-level `project_info` section to store the project URL and language
- A `pronouns` field in the basics section
- Location information for items in the education section

## Credits

Like with any good dev project, lots of the code here is based on work done by
others before me. Shout-outs to some of the most notable sources:

- David Reed's [The Overengineered Resume](https://ktema.org/articles/the-overengineered-resume)
- Colin Hemphill's [nextjs-resume project](https://github.com/colinhemphill/nextjs-resume)
