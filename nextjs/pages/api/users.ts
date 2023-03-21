import Airtable from "airtable";
import type { NextApiRequest, NextApiResponse } from "next";

Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN,
});

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

// Reference a table
const userTable = base(process.env.AIRTABLE_TABLE_NAME_USERS!);

export type UserItem = {
  Firstname: string;
  Lastname: string;
  Jobtitle: string;
  Company: string;
  Email: string;
  Homepage: string;
  ProfilePic?: string;
};

class Users {
  static getAll = async () => {
    return (await userTable.select().all())
      .map<UserItem>((e) => e.fields as UserItem)
      .filter((e) => e?.Email?.length > 0);
  };

  static insertOrUpdate = async (u: UserItem) => {
    const existingUsers = (await userTable.select().all()).filter(
      (eu) => eu.fields.Email == u.Email
    );

    if (existingUsers.length == 0) {
      return await userTable.create(u);
    } else {
      console.log(JSON.stringify(u));
      return await userTable.update(existingUsers[0].id, {
        ...existingUsers[0].fields,
        ...Object.fromEntries(
          Object.entries(u).filter(([_, v]) => v != null && v != "")
        ),
      });
    }
  };
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<UserItem[] | string>
) {
  if (_req.method === "POST") {
    const body = JSON.parse(_req.body);

    if (
      "Firstname" in body &&
      typeof body.Firstname === "string" &&
      "Lastname" in body &&
      typeof body.Email === "string" &&
      "Email" in body &&
      typeof body.Email === "string"
    ) {
      const result = await Users.insertOrUpdate(body);
      res.status(200).json("ok");
    } else {
      console.log("invalid request");
      return res.status(402);
    }
  } else {
    try {
      const result = await Users.getAll();
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json("Failed to load data");
    }
  }
}
