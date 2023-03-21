import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN,
});

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

// Reference a table
const siteTable = base(process.env.AIRTABLE_TABLE_NAME_SITE ?? "Site");

export type SiteConfig = {
  NewsintroLeft: string;
  NewsintroRight: string;
  EventsintroLeft: string;
  EventsintroRight: string;
  PeopleintroLeft: string;
  PeopleintroRight: string;
  SiteTitle: string;
};

class Site {
  static get = async () => {
    return (await siteTable.select().all()).map<SiteConfig>(
      (e) => e.fields as SiteConfig
    )[0];
  };
}

export default async function handler(req, res) {
  try {
    const result = await Site.get();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load data" });
  }
}
