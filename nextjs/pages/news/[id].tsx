import { useSession, signIn, signOut } from "next-auth/react";
import LoginView from "../../components/login";
import { NewsItem } from "../api/news";
import { SiteConfig } from "../api/site";
import ReactMarkdown from "react-markdown";
import HeaderView from "../../components/header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { backendService } from "../../service/backend-service";

export default function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [news, setNews] = useState([] as NewsItem[]);
  const [siteConfig, setSiteConfig] = useState({} as SiteConfig);

  useEffect(() => {
    backendService.fetchSite().then((result) => {
      setSiteConfig(result);
    });
    if (status === "authenticated") {
      backendService.fetchNews().then((result) => {
        setNews(result);
      });
    }
  }, [status]);

  const newsItem = news[parseInt(id as string)] ?? {
    Image: [{ url: "" }],
    Content: "",
    Title: "",
    Author: { name: "" },
    Date: "",
  };

  return (
    <div id="main">
      <HeaderView
        left={siteConfig.NewsintroLeft}
        right={siteConfig.NewsintroRight}
      />
      {status === "authenticated" ? (
        <section className="">
          <img
            className="flex justify-center align-middle h-80 w-full object-cover "
            src={newsItem.Image[0].url}
          ></img>
          <div className="grid grid-cols-12 mt-4">
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="text-5xl p-4">{newsItem.Title}</div>
              <div className="text-xl p-4">
                <ReactMarkdown>{newsItem.Content}</ReactMarkdown>
              </div>
              <div className="p-4">
                {newsItem.Author.name} {newsItem.Date}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <LoginView siteTitle={siteConfig.SiteTitle} />
      )}
    </div>
  );
}
