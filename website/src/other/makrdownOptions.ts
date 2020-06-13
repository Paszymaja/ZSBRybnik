import MarkdownTextBlock from "../components/MarkdownTextBlock";
import Link from "../components/Link";
import MarkdownCodeBlock from "../components/MarkdownCodeBlock";
import ThreejsView from "../components/ThreejsView";
import Image from "../components/Image";
import Table from "../components/Table";
import MarkdownGallery from "../components/MarkdownGallery";
import MarkdownChart from "../components/MarkdownChart";

export const markdownOptions = {
  overrides: {
    ThreejsView: {
      component: ThreejsView,
    },
    p: {
      component: MarkdownTextBlock,
    },
    Link: {
      component: Link,
    },
    Image: {
      component: Image,
    },
    code: {
      component: MarkdownCodeBlock,
    },
    Table: {
      component: Table,
    },
    Gallery: {
      component: MarkdownGallery,
    },
    Chart: {
      component: MarkdownChart,
    },
  },
  namedCodesToUnicode: {
    plus: "\u002b",
    minus: "\u2212",
  },
};