export const hideScrollbar = {
  overflow: 'scroll',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const modalScrollbar = {
  overflow: 'scroll',
  overflowX: 'hidden',
  
  /* width */
  '::-webkit-scrollbar': {
    width: '8px',
  },

  /* Track */
  '::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '20px',
  },

  /* Handle */
  '::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '20px',
  },

  /* Handle on hover */
  '::-webkit-scrollbar-thumb:hover': {
    background: '#b30000',
  },
};
