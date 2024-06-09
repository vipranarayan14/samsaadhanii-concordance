# Samsaadhanii Concordance UI

A new UI for [Samsaadhanii Concordance](http://scl.samsaadhanii.in/scl/dhaatupaatha/compare_with_svara.html).

## Features

- Search
    - Instant: Filters as you type.
    - Compound: Each keyword (space-seperated) makes the results more specific.
    - Any encoding: Currently - WX/ITRANS/Deva
    - (New) Results highlighted.
    - (New) Searches all fields - dhatu/meaning/gana/padi/it and vritti numbers.
    - Sticks to top when scrolled.
    - Locate.
- Sort
    - Sort by dhatu, artha or gana.
    - Sort happens on the client-side.
    - Super fast.
- Filter
    - Filter by vritti/gana/padi/it.
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
    - All dhatu info in a single JSON file loaded asyncronously.
    - Vrittis & graphs are loaded asyncronously. (directly from samsaadhini GitHub repo)
- Development
    - Web fonts: Same font is used whether the system has it or not.


