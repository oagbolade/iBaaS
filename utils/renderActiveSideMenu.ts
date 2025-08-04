export const renderAsActive = (isActive?: boolean) => {
  if (isActive) {
    return {
      display: 'flex',
      padding: '6px 10px',
      alignItems: 'center',
      gap: '8px',
      flex: '1 0 0',
      alignSelf: 'stretch',
      borderRadius: '8px',
      border: '1px solid #0275D8',
      background: 'var(--colour-primaryblue-primary-blue-100, #EBF8FE)',
      color: '#0275D8',
      width: '200px',
      height: '40px'
    };
  }
};
