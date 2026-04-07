

## Hero Section Redesign — White Premium with Lady Justice

### What changes
Replace the current purple gradient hero with a clean white/premium background, updated text content, and a generated Lady Justice statue image on the right side (similar to the reference image style).

### Layout
- **Background**: Clean white with subtle light gray gradient for depth
- **Left side (60%)**: All text content stacked vertically
  - "Unicore Professional Alliance" — large bold black heading (Playfair Display)
  - "Integrated Expertise. Collaborative Solutions" — elegant subtitle in gold/accent
  - "One Platform. Multiple Experts. Complete Solutions." — bold black subheading
  - Two paragraphs of descriptive body text in dark gray
  - CTA button: "Book a Consultation"
- **Right side (40%)**: AI-generated Lady Justice statue image (woman holding scales, marble/classical style with blue-purple tint matching the reference)
- **Stat cards**: Kept but restyled with dark borders on white background to match premium feel

### Technical details
1. **Generate Lady Justice image** using AI image generation (Nano banana pro model) — marble statue, scales, blindfolded, blue-purple toned, transparent/clean background
2. **Save** to `src/assets/lady-justice.png`
3. **Update HeroSection** in `src/pages/Index.tsx` (lines 124-188):
   - White background instead of gradient
   - Black text typography
   - Import and display the Lady Justice image on the right
   - Restyle stat cards for light theme
4. **Update Navbar** colors to work against white hero (dark text or keep dark navbar)

### Files to modify
- `src/pages/Index.tsx` — HeroSection component (~lines 124-188)
- `src/assets/lady-justice.png` — new AI-generated asset

