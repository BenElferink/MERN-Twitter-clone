import { useState, useEffect } from 'react';

export default function useMediaQuery(query) {
  const [matchQuery, setMatchQuery] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    // Example of "media" Object if the query was "(max-width: 768px)":
    // {
    //   listeners: {change: Array},
    //   matches: true/false,
    //   media: "(max-width: 768px)",
    //   onchange: null
    // }

    // update state when condition changes
    if (media.matches !== matchQuery) setMatchQuery(media.matches);

    // handle listener for MediaQueryList
    const listener = () => setMatchQuery(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matchQuery, query]);

  // either true or false
  return matchQuery;
}
