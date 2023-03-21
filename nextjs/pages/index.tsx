import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserItem } from "./api/users";
import LoginView from "../components/login";
import { backendService } from "../service/backend-service";
import { NewsItem } from "./api/news";
import { SiteConfig } from "./api/site";
import ReactMarkdown from "react-markdown";
import HeaderView from "../components/header";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [news, setNews] = useState([] as NewsItem[]);
  const [siteConfig, setSiteConfig] = useState({} as SiteConfig);

  useEffect(() => {
    backendService.fetchSite().then((result) => {
      setSiteConfig(result);
    });
    if (status === "authenticated") {
      backendService.fetchNews().then((result) => {
        console.info("news");
        console.info(result);
        setNews(result);
      });
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("storing user info data");
      backendService.storeUser(session.user);
    }
  }, [status]);

  return (
    <div id="main">
      <HeaderView
        left={siteConfig.NewsintroLeft}
        right={siteConfig.NewsintroRight}
      />
      {status === "authenticated" ? (
        <section className="">
          {news.map((newsitem, idx) => (
            <div
              className="grid grid-cols-12 mt-4"
              onClick={() => router.push(`/news/${idx}`)}
            >
              <img
                className="flex justify-center align-middle col-span-3 h-80 w-full object-cover hover:scale-95 p-3"
                src={newsitem.Image[0].url}
              ></img>
              <div className="col-span-8 flex flex-col justify-between h-80">
                <div className="text-4xl p-4">{newsitem.Title}</div>
                <div className="text-xl p-4">
                  <ReactMarkdown>
                    {newsitem.Content.length > 300
                      ? newsitem.Content.substring(0, 300) + "…"
                      : newsitem.Content}
                  </ReactMarkdown>
                </div>
                <div className="p-4">
                  {newsitem.Author.name} {newsitem.Date}
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <LoginView siteTitle={siteConfig.SiteTitle} />
      )}
    </div>
  );
}
