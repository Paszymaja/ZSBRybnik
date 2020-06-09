import MarkdownTextBlock from "../components/MarkdownTextBlock";
import Link from "../components/Link";
import MarkdownCodeBlock from "../components/MarkdownCodeBlock";
import ThreejsView from "../components/ThreejsView";

export const markdownOptions = {
  overrides: {
    ThreejsView: {
      component: ThreejsView
    },
    p: {
      component: MarkdownTextBlock
    },
    Link: {
      component: Link
    },
    code: {
      component: MarkdownCodeBlock
    },/*
    Table: {
      component: Table
    },
    Image: {
      component: MarkdownImage
    }.
    Iframe: {
      component: MarkdownIframe
    } */
  },
  namedCodesToUnicode: {
    plus: '\u002b',
    minus: '\u2212'
  }
}