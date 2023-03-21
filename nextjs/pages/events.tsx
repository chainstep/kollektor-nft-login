import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import LoginView from "../components/login";
import { backendService } from "../service/backend-service";
import { EventsItem } from "./api/events";
import { SiteConfig } from "./api/site";
import ReactMarkdown from "react-markdown";
import HeaderView from "../components/header";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([] as EventsItem[]);
  const [siteConfig, setSiteConfig] = useState({} as SiteConfig);

  useEffect(() => {
    backendService.fetchSite().then((result) => {
      setSiteConfig(result);
    });
    if (status === "authenticated") {
      backendService.fetchEvents().then((result) => {
        console.info("events");
        console.info(result);
        setEvents(result);
      });
    }
  }, [status]);

  return (
    <div id="main">
      <HeaderView
        left={siteConfig.EventsintroLeft}
        right={siteConfig.EventsintroRight}
      />
      {status === "authenticated" ? (
        <section className="px-8">
          {events.map((eventsitem, idx) => (
            <div
              className="grid grid-cols-12 h-80 mt-4"
              onClick={() => router.push(`/events/${idx}`)}
            >
              <div className="col-span-4 h-80">
                <img
                  className="object-cover hover:object-scale-down h-80 w-120"
                  src={eventsitem.Image[0].url}
                ></img>
              </div>
              <div className="col-span-8 flex flex-col justify-between h-80">
                <div className="text-4xl p-4">{eventsitem.Title}</div>
                <div className="text-xl p-4">
                  <ReactMarkdown>
                    {eventsitem.Content.length > 300
                      ? eventsitem.Content.substring(0, 300) + "…"
                      : eventsitem.Content}
                  </ReactMarkdown>
                </div>
                <div className="p-4">
                  {eventsitem.Author.name} {eventsitem.Date}
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
