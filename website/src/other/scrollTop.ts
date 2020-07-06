type ScrollTop = () => void;
type MainTag = HTMLElement | null;

const scrollTop: ScrollTop = (): void => {
  try {
    const mainTag: MainTag = document.querySelector("main");
    mainTag!.scrollTo(0, 0);
  } catch (err) {
    window.scrollTo(0, 0);
  }
};

export default scrollTop;
