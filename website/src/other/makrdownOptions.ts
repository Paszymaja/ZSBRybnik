import MarkdownTextBlock from "../components/MarkdownTextBlock";
import Link from "../components/Link";
import MarkdownCodeBlock from "../components/MarkdownCodeBlock";
import ThreejsView from "../components/ThreejsView";
import Image from "../components/Image";
import Table from "../components/Table";
import MarkdownGallery from "../components/MarkdownGallery";
import MarkdownChart from "../components/MarkdownChart";
import TikTok from "../components/TikTok";
import Embed from "../components/Embed";
import { MarkdownOptions } from "markdown-to-jsx";

const markdownOptions: MarkdownOptions = {
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
    TikTok: {
      component: TikTok,
    },
    Embed: {
      component: Embed,
    },
  },
  namedCodesToUnicode: {
    plus: "\u002b",
    minus: "\u2212",
    currentyear: new Date().getFullYear(),
    currentday: new Date().getDay(),
    currentmonth: new Date().getMonth(),
    currentdate: new Date().toString(),
  },
} as MarkdownOptions;

export default markdownOptions;
