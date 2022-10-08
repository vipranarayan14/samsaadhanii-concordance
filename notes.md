# To do

1. X fix divider
2. 0 make dhatu div separate in mobile view
3. 0 try using grid
4. 0 try using service worker for sorting / filtering 
5. X seperate sortby from search box
6. X fix overflow हु॒ (हु) अदने 
7. X improve search
    1. X remove svara marks in tags
    2. X remove halanta in keywords
8. X scroll to top
9. close modal on overlay click

===

# UI for Dhatupatha

\[POC\] An UI for Samsaadhanii Dhatupatha

## Features

- Filter
    - Instant: Filters as you type.
    - Compound: Each keyword (space-seperated) makes the results more specific.
    - Any encoding: Currently - WX/ITRANS/Deva
    - Stricks to top when scrolled.
- Sort
    - Sort by dhatu, artha or gana.
    - Sort happens on the client-side.
    - Super fast.
- UI
    - Mobile-first design.
    - Responsive: Adapts to screen size.
    - No hover, tooltip etc.
    - List
        - Interactive list of dhatu entries. 
        - Infinite scrolling: Loads more item as user scrolls.
        - Scroll to top.
    - Modal
        - Vrittis, graph and link to forms shown in a modal when an entry is clicked.
        - All vrittis on the same page (not a separate window).
        - Persistent header with Dhatu info (when scrolling).
- Data (later, backend)
    - all dhatu info in a single JSON file loaded asyncronously.
    - Vrittis are loaded asyncronously. (directly from samsaadhini GitHub repo)
- Development
    - Only pure HTML, CSS and JS. No frameworks.