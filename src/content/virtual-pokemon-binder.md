## Motivation

Physical binders are limiting. You can only carry so many cards, reorganising them is a pain whenever there's a new idea for a layout, and sharing your collection means either lugging the binder around or taking 200 photos. Bringing them to trade shows is its own ordeal, and keeping track of what I actually own is a whole other problem (pardon my early onset of poor memory). I wanted a digital binder that felt just as tactile and personal as the real thing.

![Binder Screenshot](image-1.png)

## Building It

I chose **Next.js** as the foundation — its file-based routing made structuring the card registry and binder views straightforward. For state, **Zustand** was a perfect fit: lightweight, no boilerplate, and it made syncing the binder state to localStorage almost trivial.

**Drag-and-drop** was handled by `@hello-pangea/dnd` (a maintained fork of react-beautiful-dnd). Rearranging cards virtually is so much easier than doing it by hand — no sleeves to fidget with, no cards falling out.

Conveniently, Vercel provides a really easy way to auto-deploy and host the website, always thankful for such wonderful tech resources.

## What's Next

Linking up a real database like Supabase would be a great next step — cards stored permanently, users can log in, and share their own binder profiles for others to browse. Think Pinterest, but for Pokémon collectors.
