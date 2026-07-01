## Motivation

Physical binders are limiting. You can only carry so many cards, and reorganising them is a pain whenever there's a new idea for a layout.

Sharing your collection means either lugging the binder around or taking many photos. Bringing them to card shows is its own ordeal, and keeping track of what I actually own is a whole other problem (pardon my early onset of poor memory). 

Hence, I wanted a digital binder that felt convenient to onboard and reflects my actual binder.

![Binder Screenshot](image-1.png "Drag-and-drop binder with selected cards")

## Building It

I chose **Next.js** as the foundation — its file-based routing made structuring the card registry and binder views straightforward. For state, **Zustand** was a perfect fit: lightweight, no boilerplate, and it made syncing the binder state to localStorage almost trivial.

**Drag-and-drop** was handled by `@hello-pangea/dnd` (a maintained fork of react-beautiful-dnd). Rearranging cards virtually is so much easier than doing it by hand, no sleeves to fidget with and no cards falling out.

Conveniently, Vercel provides a really easy way to auto-deploy and host the website. Check out the current live version here: [Virtual Pokémon Binder](https://poke-binder-theta.vercel.app/)

## What's Next

Linking up a real database like Supabase would be a great next step, to have cards stored permanently rather than in local storage, users can log in, and share their own binder profiles for others to browse. Think Pinterest, but for Pokémon collectors.

Next is also finding reliable sources for other languages support, such as Japanese and Chinese sets. Stay tuned!
