// Utility function to join class names
export const joinClassNames = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(' ');
};
