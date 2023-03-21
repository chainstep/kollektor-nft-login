import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { UserItem } from "./api/users";
import LoginView from "../components/login";
import { backendService } from "../service/backend-service";
import { SiteConfig } from "./api/site";
import Table, { LinkCell } from "../components/table";
import { AvatarCell, SelectColumnFilter } from "../components/table";
import HeaderView from "../components/header";

export default function Home() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([] as UserItem[]);
  const [siteConfig, setSiteConfig] = useState({} as SiteConfig);
  useEffect(() => {
    backendService.fetchSite().then((result) => {
      setSiteConfig(result);
    });
    if (status === "authenticated") {
      backendService.fetchUsers().then((result) => {
        console.info(result);
        setUsers(result);
      });
    }
  }, [status]);

  const getData = () => {
    const data: UserItem[] = [];
    users.map((user) => {
      data.push({
        ...{
          ProfilePic: `https://api.dicebear.com/5.x/croodles-neutral/svg?seed=${user.Email}`,
        },
        ...user,
      });
    });
    return data;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Firstname",
        lastAccessor: "Lastname",
        Cell: AvatarCell,
        imgAccessor: "ProfilePic",
        emailAccessor: "Email",
      },
      {
        Header: "Title",
        accessor: "Jobtitle",
      },
      {
        Header: "Company",
        accessor: "Company",
        filter: "includes",
      },
      {
        Header: "Homepage",
        Cell: LinkCell,
        accessor: "Homepage",
      },
    ],
    []
  );

  return (
    <div id="main">
      <HeaderView
        left={siteConfig.PeopleintroLeft}
        right={siteConfig.PeopleintroRight}
      />
      {status === "authenticated" ? (
        <section className="px-8 pt-8">
          <Table columns={columns} data={getData()} />
        </section>
      ) : (
        <LoginView siteTitle={siteConfig.SiteTitle} />
      )}
    </div>
  );
}
