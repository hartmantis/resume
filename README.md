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

Feel free to fork this repo! But I wouldn't recommend it if you're trying to
impress someone visually! All the configuration for a person's résumé data
lives in the `config/config.yml` and `config/data.yml` files.

## Design

### Components

***Tooling***

I haven't gone full-on and made a full containerized service version of my
résumé with an API back-end and web front-end (yet). This version uses:

- [Eleventy](https://www.11ty.dev), after I poked around to see what people were
  fans of in static site generators these days
- [Tailwind CSS](https://tailwindcss.com) for styling, for a change of pace
  (Bootstrap is still around and popular, but I used that last time)
- [Font Awesome](https://fontawesome.com) for icons--it's the only package I
  could find with icons for Bluesky and Mastodon

***Config***

This project contains a `config` directory with two files in it:

- `config.yml` - Project-level information--currently just a URL and its base language
- `data.yml` - All résumé data in accordance with [this fork](https://github.com/AverageHelper/resume-schema)
  of the JSON Résumé schema (the maintainers of the base project have
  repeatedly refused requests for the addition of a pronouns field)

TODO: I also made these customizations that I need to resolve to get fully in
spec:

- Location information for work experience items
- Location information for education items
- Optionally allowing a location section to be a string instead of hash for
  cases where there is no locality/region/country (i.e. remote work)

## Credits

Like with any good dev project, lots of the code here is based on work done by
others before me. Shout-outs to some of the most notable sources:

- David Reed's [The Overengineered Resume](https://ktema.org/articles/the-overengineered-resume)
- Colin Hemphill's [nextjs-resume project](https://github.com/colinhemphill/nextjs-resume)
- Daniel Zenzes's [tutorial](https://zenzes.me/eleventy-integrate-postcss-and-tailwind-css/)
  on integrating TailwindCSS with an Eleventy project as an Eleventy filter
  instead of an additional build step in NPM
