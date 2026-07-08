let tabSwipeLocked = false;

export const setTabSwipeLocked = (locked: boolean) => {
  tabSwipeLocked = locked;
};

export const isTabSwipeLocked = () => tabSwipeLocked;
