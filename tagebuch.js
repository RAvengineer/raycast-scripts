#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title tagebuch
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon ./tagebuch-icon.svg
// @raycast.packageName Raycast Scripts

// Documentation:
// @raycast.description Create a new Notion Page in personal Dev Journal for the date the script is triggered on
// @raycast.author RAvengineer
// @raycast.authorURL rahulbera.com

import { Client } from "@notionhq/client";
import { toSvg } from "jdenticon";
import moment from "moment";
import axios from "axios";
import nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";

import dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const dateToday = moment();
const svgDateString = dateToday.format("DD.MM.YYYY");
const notionDateString = dateToday.format("YYYY-MM-DD");

const svg = toSvg(svgDateString, 280);
const emojiSvg = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
  "base64"
)}`;

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

const kTopics = {
  onTheLake: "jr1XdoXPnYc",
  wallpapers: "bo8jQKTaE0Y",
  t3dRenders: "CDwuwXJAbEw",
  nature: "6sMVjTLSkeQ",
  texturesPatterns: "iUIsnVtjB0Y",
  architectureInterior: "M8jVbLbTRws",
  film: "hmenvQhUmxM",
  streetPhotography: "xHxYTMHLgOc",
  experimental: "qPYsDzvJOYc",
  animals: "Jpg6Kidl-Hk",
  fashionBeauty: "S4MKLAsBB74",
  businessWork: "aeu6rL-j6ew",
  foodDrink: "xjPR4hlkBGA",
  travel: "Fzo3zuOHN6w",
  people: "towJZFskpGg",
  spirituality: "_8zFHuhRhyo",
  athletics: "Bn-DjrcBrwo",
  health: "_hb-dl4Q-4U",
  currentEvents: "BJJMtteDJA4",
  artsCulture: "bDo48cUhwnY",
};

const getCoverImage = async () => {
  const response = await unsplash.photos.getRandom({
    topicIds: [
      kTopics.onTheLake,
      kTopics.wallpapers,
      kTopics.nature,
      kTopics.animals,
      kTopics.travel,
    ],
    orientation: "landscape",
    contentFilter: "high",
  });
  if (response.errors) {
    // handle error here
    console.error("Unsplash API Error: ", response.errors[0]);
  } else {
    // handle success here
    const photo = response.response;
    // add quality parameters to the raw image url
    const photoUrl = `${photo.urls.raw}&q=100`;
    return {
      url: photoUrl,
      photographer: {
        name: photo.user.name,
        url: photo.user.links.html,
      },
    };
  }
};

/**
// read a page
// console.log(process.env.TEST_PAGE_ID);
(async () => {
  const response = await notion.pages.retrieve({
    page_id: process.env.TEST_PAGE_ID,
  });
  console.log(JSON.stringify(response, null, 2));
})();

(async () => {
  const blockId = process.env.TEST_PAGE_ID;
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  console.log(JSON.stringify(response, null, 2));
})();
*/

/**
 * Create a new page payload
 *
 * @param {{
 *  url: string,
 *  photographer: {
 *   name: string,
 *   url: string
 *  }
 * }} coverImg
 * @param {string} quoteOfTheDay
 * @param {string} quoteAuthor
 * @returns
 */
const createPagePayload = (coverImg, quoteOfTheDay, quoteAuthor) => ({
  parent: {
    database_id: process.env.NOTION_DB_ID,
  },
  cover: {
    external: {
      url: coverImg.url,
    },
  },
  icon: {
    emoji: "📕",
  },
  properties: {
    Date: {
      date: {
        start: notionDateString,
      },
    },
    Mission: {
      multi_select: [
        {
          name: "Daily",
        },
      ],
    },
    Name: {
      title: [
        {
          mention: {
            date: {
              start: notionDateString,
            },
            plain_text: "Today",
          },
        },
      ],
    },
  },
  children: [
    {
      object: "block",
      code: {
        language: "plain text",
        rich_text: [
          {
            text: {
              content: emojiSvg,
            },
          },
        ],
      },
    },
    {
      object: "block",
      heading_1: {
        rich_text: [
          {
            text: {
              content: "✅ To-do",
            },
          },
        ],
      },
    },
    {
      object: "block",
      to_do: { rich_text: [] },
    },
    {
      object: "block",
      to_do: { rich_text: [] },
    },
    {
      object: "block",
      divider: {},
    },
    {
      object: "block",
      heading_1: {
        rich_text: [
          {
            text: {
              content: "Happenings & Notes",
            },
          },
        ],
      },
    },
    {
      object: "block",
      bulleted_list_item: {
        rich_text: [],
      },
    },
    {
      object: "block",
      divider: {},
    },
    {
      object: "block",
      heading_2: {
        rich_text: [
          {
            text: {
              content: "💡 Quote of the Day",
            },
          },
        ],
      },
    },
    {
      object: "block",
      callout: {
        rich_text: [
          {
            text: {
              content: quoteOfTheDay,
            },
            annotations: {
              bold: true,
            },
          },
          {
            text: {
              content: "\n",
            },
          },
          {
            text: {
              content: `~${quoteAuthor}`,
            },
            annotations: {
              italic: true,
            },
          },
        ],
        icon: {
          type: "emoji",
          emoji: "📜",
        },
        color: "gray_background",
      },
    },
    // Collapsible header_3 block
    {
      object: "block",
      divider: {},
    },
    {
      object: "block",
      toggle: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "Attribution",
            },
          },
        ],
        children: [
          {
            paragraph: {
              rich_text: [
                // Attribution for quote
                {
                  text: {
                    content: "Quote generated using ",
                  },
                },
                {
                  text: {
                    content: "ZenQuotes.io",
                    link: {
                      url: "https://zenquotes.io/",
                    },
                  },
                },
              ],
            },
          },
          {
            paragraph: {
              rich_text: [
                // Attribution for cover image
                {
                  text: {
                    content: "Cover image by ",
                  },
                },
                {
                  text: {
                    content: coverImg.photographer.name,
                    link: {
                      url: coverImg.photographer.url,
                    },
                  },
                },
                {
                  text: {
                    content: " on ",
                  },
                },
                {
                  text: {
                    content: "Unsplash",
                    link: {
                      url: "https://unsplash.com/",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
});

// /**
// create a page
(async () => {
  // Get cover image
  const coverImage = await getCoverImage();

  // Get quote of the day
  const zenQuoteUrl = "https://zenquotes.io/api/today";
  const quoteResponse = await axios.get(zenQuoteUrl);
  const quoteOfTheDay = quoteResponse.data[0].q;
  const quoteAuthor = quoteResponse.data[0].a;

  const response = await notion.pages.create(
    createPagePayload(coverImage, quoteOfTheDay, quoteAuthor)
  );
  const pageId = response.id;
  console.log("Generated Page ID: ", pageId);
})();
// */
