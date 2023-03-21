import { useSession, signIn, signOut } from "next-auth/react";
import LoginView from "../../components/login";
import { NewsItem } from "../api/news";
import { SiteConfig } from "../api/site";
import ReactMarkdown from "react-markdown";
import HeaderView from "../../components/header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { backendService } from "../../service/backend-service";
import { EventsItem } from "../api/events";

export default function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([] as EventsItem[]);
  const [siteConfig, setSiteConfig] = useState({} as SiteConfig);

  useEffect(() => {
    backendService.fetchSite().then((result) => {
      setSiteConfig(result);
    });
    if (status === "authenticated") {
      backendService.fetchEvents().then((result) => {
        setEvents(result);
      });
    }
  }, [status]);

  const eventItem = events[parseInt(id as string)] ?? {
    Image: [{ url: "" }],
    Content: "",
    Title: "",
    Author: { name: "" },
    Date: "",
  };

  return (
    <div id="main">
      <HeaderView
        left={siteConfig.EventsintroLeft}
        right={siteConfig.EventsintroRight}
      />
      {status === "authenticated" ? (
        <section className="">
          <img
            className="flex justify-center align-middle h-80 w-full object-cover "
            src={eventItem.Image[0].url}
          ></img>
          <div className="grid grid-cols-12 mt-4">
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="text-5xl p-4">{eventItem.Title}</div>
              <div className="text-xl p-4">
                <ReactMarkdown>{eventItem.Content}</ReactMarkdown>
              </div>
              <div className="p-4">
                {eventItem.Author.name} {eventItem.Date}
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
