const scrollTop = (): void => {
  try {
    const mainTag: HTMLElement | null = document.querySelector("main");
    mainTag!.scrollTo(0, 0);
  } catch (err) {
    window.scrollTo(0, 0);
  }
}

export default scrollTop;