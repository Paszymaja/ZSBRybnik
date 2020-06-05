import { SetStateAction, Dispatch } from 'react';
import { TFunction } from 'i18next';

const makeSubpageContentRequest = (route: string, setTitle: Dispatch<SetStateAction<string>>, setDisplayTitle: Dispatch<SetStateAction<boolean>>, setMarkdown: Dispatch<SetStateAction<string>>, t: TFunction) => {
  const tryRequest = async (): Promise<void> => {
    const controller: AbortController = new AbortController();
    const signal: AbortSignal = controller.signal;
    try {
      const res: Response = await fetch(`http://${window.location.hostname}:5002/api/get-subpage?route=${route}`, {
        method: 'GET',
        signal: signal
      });
      const data = await res.json();
      const translatedTitle = t(`pages.${data.title}-page`);
      const displayTitleBoolean = data.displayTitle ? true : false;
      setDisplayTitle(displayTitleBoolean);
      setTitle(translatedTitle);
      setMarkdown(data.content);
    } catch (err) {
      controller.abort();
      setTimeout(tryRequest, 100);
    }
  }
  tryRequest();
}

export default makeSubpageContentRequest;