import MarkdownTextBlock from "../components/TextBlock/MarkdownTextBlock";
import Link from "../components/Link/Link";
import MarkdownCodeBlock from "../components/CodeBlock/MarkdownCodeBlock";
import ThreejsView from "../components/ThreejsView/ThreejsView";
import Image from "../components/Image/Image";
import MarkdownGallery from "../components/Gallery/MarkdownGallery";
import MarkdownChart from "../components/Chart/MarkdownChart";
import Table from "../components/Table/Table";
import TikTok from "../components/TikTok/TikTok";
import Embed from "../components/Embed/Embed";
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
    currentyear: new Date().getFullYear().toString(),
    currentday: new Date().getDay().toString(),
    currentmonth: new Date().getMonth().toString(),
    currenthour: new Date().getHours().toString(),
    currentminute: new Date().getMinutes().toString(),
    currentsecond: new Date().getSeconds().toString(),
    currentdate: new Date().toString(),
  },
};

export default markdownOptions;
