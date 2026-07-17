Documenting my journey to build a **file-viewer library** that supports as many file types as possible. This is still a personal exploration—not open sourced yet, just my discoveries along the way.

---

## The Problem

Previewing files within React apps has always been a bit of a pain. The typical approach is to provide a download button and let users handle viewing with their own tools—Microsoft Office, Apple's Pages/Keynote/Numbers, or native PDF viewers. 

*In other words: just let users preview files themselves after downloading.*

However, with the rise of AI agents like **Claude** and **GPT** helping generate and edit files directly in apps, it's become far more convenient to preview files in-app. 

In-app preview allow users to interact by highlighting specific sections to indicate what the agent should edit. This makes robust file preview support essential for as many file types as possible.

## Image Types

Let's start with the most straightforward type: images. The basic HTML `<img>` tag works fine, but Next.js's `<Image>` component is even better—it automatically serves optimized image quality based on the device (mobile/desktop) and formats like **WebP** for better performance. 

**Key features implemented**:
- Zoom in/out
- Rotation
- Panning

All achieved through standard CSS transformations.

## PDF

PDFs are typically handled with **[PDF.js](https://mozilla.github.io/pdf.js/)**, Mozilla's library for parsing and rendering PDF files. In React, [react-pdf](https://www.npmjs.com/package/react-pdf) provides a nice wrapper. 

### Performance Enhancement: Virtualization

One enhancement I implemented was **virtualizing pages** using libraries like [react-virtual](https://www.npmjs.com/package/@tanstack/react-virtual) to only render pages currently in the viewport. Hence, large PDF files no longer cause screen lag.

### Zoom Implementation Detail

Zoom and rotation features are achieved through CSS transformations. One interesting implementation detail: when a user scrolls to the middle of a document and then zooms in or out, I anchor the zoom transformation to the top-left corner of the current page. This ensures the scroll position stays stable and users don't lose their place. 

## Excel and PowerPoint

> **What is OOXML?** Office Open XML (OOXML) is a zipped, XML-based file format developed by Microsoft for documents, spreadsheets, and presentations. The format compresses a package of individual XML files and media resources (such as images or embedded objects) into a standard ZIP archive.

File formats like `.xlsx`, `.pptx`, and `.docx` all fall under the OOXML umbrella. You can parse these to extract full file details—check out [Office Open XML Viewer](https://github.com/yukiyokotani/office-open-xml-viewer) for a well-documented reference implementation.

### The Challenge

Historically, there have been **very few good free viewers** for these file types that can accurately render:
- Fonts
- Images
- Tables
- Diagrams
- Charts

*The main reason?* Parsing the XML formats and writing code to render everything correctly is incredibly tedious work.

### Attempt 1: SheetJS + Virtualization

I initially dove into creating an Excel viewer by parsing files with **[SheetJS](https://www.npmjs.com/package/xlsx)**, then rendering individual cells with virtualized rows and columns to handle large datasets. 

**Result**: Worked well for regular text, but complex formatting like borders and charts went missing.

### Attempt 2: Canvas Rendering with AI

However, with **AI assistance**, parsing these complex OOXML formats became much more manageable. I was able to use **[fflate](https://www.npmjs.com/package/fflate)** to decompress and parse the formats, then render them to canvas elements.

**Result**: Very performant Excel and PowerPoint viewer with full formatting support.

### The Canvas Trade-off

⚠️ **One caveat with canvas rendering**: Text isn't natively selectable since canvas elements are rasterized pixels without individual DOM nodes. 

**Workarounds**:
- Track text positions and emit custom selection events
- Overlay transparent DOM elements on top of the canvas for text selection

## Word Documents

For Word document previews, I took a **different approach** from canvas rendering to preserve text selectability: rendering actual HTML elements for each paragraph, image, table, etc.

### Attempt 1: docxjs

The first library I tried was **[docxjs](https://github.com/VolodymyrBaydalka/docxjs)**, a popular library for document preview. 

**Problem**: Implicit page breaks aren't handled. Instead, all content gets lumped together as one continuous document, which doesn't accurately represent the original file's pagination.

### Attempt 2: docx-preview-sync

A fork called **[docx-preview-sync](https://github.com/millet0328/docx-preview-sync)** addresses this by rendering the document into HTML DOM and dynamically calculating where to insert page breaks. 

**Problem**: Works great for small files, but rendering large documents blocks the main thread significantly, causing the entire page to:
- Lag significantly
- Freeze completely
- Crash (worst case)

Given that some use cases require supporting files **up to 200MB or more**, this approach needed major improvements.

### My Solution: Progressive Loading + Virtualization

I modified the library to use **progressive loading**:

- **Initial render**: Load only the first few pages in a separate, hidden DOM tree (fixed height container) to calculate page breaks
- **Progressive calculation**: As users scroll, continue calculating page breaks in the background
- **Virtualized rendering**: Render visible pages on-demand based on emitted calculations, and virtualize the page list so only viewport pages are mounted in the DOM

### The Results

**Before**: Page crashes for large files    
**After**: 2-second LCP (Largest Contentful Paint)

Scroll performance visibly improved throughout the document.

---

## Summary

Building a comprehensive file viewer was more challenging than I initially expected. Here's what I learned:

| File Type | Approach | Key Challenge | Solution |
|-----------|----------|---------------|----------|
| **Images** | HTML/Next.js Image | None | CSS transformations for zoom/rotate |
| **PDF** | PDF.js + react-pdf | Performance for large files | Page virtualization |
| **Excel/PowerPoint** | fflate + Canvas | Text selection | Transparent DOM overlay |
| **Word** | docx-preview-sync | Main thread blocking | Progressive loading + virtualization |

There are still edge cases to handle and optimizations to make. But for now, the viewer handles most common file types with reasonable performance. 
