import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN,
});

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

// Reference a table
const newsTable = base(process.env.AIRTABLE_TABLE_NAME_NEWS ?? "News");

export type NewsItem = {
  Title: string;
  Content: string;
  Link: string;
  Author: { id: string; email: string; name: string };
  Image: {
    filename: string;
    height: number;
    width: number;
    size: number;
    type: string;
    url: string;
  }[];
  Status: string;
  Date: string;
};

class News {
  static getAll = async () => {
    return (await newsTable.select().all())
      .map<NewsItem>((e) => e.fields as unknown as NewsItem)
      .filter((e) => e?.Status == "Done");
  };
}

export default async function handler(req, res) {
  try {
    const result = await News.getAll();
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load data" });
  }
}
