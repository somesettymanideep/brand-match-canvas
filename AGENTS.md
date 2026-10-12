<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep banner-image pixel transitions in the browser-safe PixelSwap component, controlled by the slideshow; this preserves one animation path for autoplay, arrows, and slide selectors.
- Keep the drafting cursor in Chrome's ArchitectureCursor with browser effects and CSS-controlled states; this preserves SSR safety and native input, touch, and reduced-motion behavior.
