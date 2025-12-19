type UtilsParams = {
  scrollToSection: (href: string) => void;
  handleMobileMenuToggle: () => void;
};

const utilsStore = (): UtilsParams => ({
  scrollToSection: () => {},
  handleMobileMenuToggle: () => {},
});

export { utilsStore };
export type { UtilsParams };

