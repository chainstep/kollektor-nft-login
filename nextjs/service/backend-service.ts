import { UserItem } from "../pages/api/users";
import { SiteConfig } from "../pages/api/site";
import { NewsItem } from "../pages/api/news";
import { EventsItem } from "../pages/api/events";
import { User } from "next-auth";

// a simple memory cache = dictionary object
const memoryCache = {};

type Cacheable<T> = {
  data?: T;
  timestamp?: number;
};

const cache = async <T extends Cacheable<V>, V>(
  key: string,
  f: () => Promise<V>
): Promise<V> => {
  if (
    memoryCache[key]?.data &&
    (memoryCache[key] as T).timestamp > new Date().getTime() - 100000
  )
    return memoryCache[key]?.data;

  const result = await f();
  memoryCache[key] = {
    data: result,
    timestamp: new Date().getTime(),
  };
  return result;
};

// service for caching requests to the cms backend, and storing user entries for new users
class BackendService {
  fetchSite = async () =>
    await cache(
      "site",
      async () =>
        (
          await fetch("../api/site", { next: { revalidate: 120 } })
        ).json() as Promise<SiteConfig>
    );

  fetchNews = async () =>
    await cache(
      "news",
      async () =>
        (
          await fetch("../api/news", { next: { revalidate: 120 } })
        ).json() as Promise<NewsItem[]>
    );

  fetchEvents = async () =>
    await cache(
      "events",
      async () =>
        (
          await fetch("../api/events", { next: { revalidate: 120 } })
        ).json() as Promise<EventsItem[]>
    );

  fetchUsers = async () =>
    await cache(
      "users",
      async () =>
        (
          await fetch("../api/users", { next: { revalidate: 120 } })
        ).json() as Promise<UserItem[]>
    );

  storeUser = async (user) => {
    const { email, image, name } = user as User;
    const flname = name?.split(" ") ?? [name, ""];
    const data: UserItem = {
      Firstname: flname[0] ?? "",
      Lastname: flname[1] ?? "",
      Jobtitle: "",
      Company: "",
      Email: email,
      Homepage: "",
      ProfilePic: image,
    };

    fetch("../api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
}

export const backendService = new BackendService();
