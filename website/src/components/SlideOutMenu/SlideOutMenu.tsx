import React, {
  useContext,
  useState,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import SlideOutMenuWrapper from "./SlideOutMenuWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
  IsSlideOutMenuOpenDispatcher,
  LanguageDispatcher,
  PrivilegeLevelDispatcher,
} from "../../contextes/globalContext";
import OuterLink from "./SlideOutMenuOuterLink";
import SlideOutMenuHeightFixer from "./SlideOutMenuHeightFixer";
import InnerLink from "./SlideOutMenuInnerLink";
import SlideOutMenuCategory from "./SlideOutMenuCategory";
import { toast } from "react-toastify";

interface SlideOutMenuProps {}

type TryRequest = () => Promise<void>;
type Subpage = {
  route: string;
  title: string;
  onlyForMobile: boolean;
  isInnerLink: boolean;
  category: string | null;
};
type Routes = {
  [key: string]: Subpage | ExtendedCategory;
};
type Category = {
  title: string;
  name: string;
  onlyForMobile: boolean;
};
type ExtendedCategory = {
  category?: Category;
  children: Subpage[];
};
type RoutesDispatcher = [Routes, Dispatch<SetStateAction<Routes>>];

const SlideOutMenu: FC<SlideOutMenuProps> = (): JSX.Element => {
  const {
    isDarkThemeDispatcher,
    isSlideOutMenuOpenDispatcher,
    languageDispatcher,
    privilegeLevelDispatcher,
    isMobileDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const [
    privilegeLevel,
    setPrivilegeLevel,
  ]: PrivilegeLevelDispatcher = privilegeLevelDispatcher;
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isMobile] = isMobileDispatcher;
  const [
    isSlideOutMenuOpen,
  ]: IsSlideOutMenuOpenDispatcher = isSlideOutMenuOpenDispatcher;
  const [language]: LanguageDispatcher = languageDispatcher;
  const [routes, setRoutes]: RoutesDispatcher = useState({
    "ZSB Account": {
      children: [],
      category: {
        title: "Konto ZSB",
        name: "ZSB Account",
        onlyForMobile: false,
      },
    },
    "Social Media": {
      children: [
        {
          title: "Facebook",
          route: "https://www.facebook.com/rybnikzsb/",
          onlyForMobile: true,
          isInnerLink: false,
          category: "Social Media",
        },
        {
          title: "Youtube",
          route: "https://www.youtube.com/channel/UCMzNuGK3NB6CmNn-JlRvWww",
          onlyForMobile: true,
          isInnerLink: false,
          category: "Social Media",
        },
      ],
      category: {
        title: "Media Społecznościowe",
        name: "Social Media",
        onlyForMobile: true,
      },
    },
  } as Routes);
  useEffect((): void => {
    const tryRequest: TryRequest = async (): Promise<void> => {
      try {
        const categoryRes: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-subpages-categories?language=${language}`
        );
        const subpagesRes: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-subpages-routes?language=${language}`
        );
        const categoryData: Category[] = await categoryRes.json();
        const supagesData: Subpage[] = await subpagesRes.json();
        const routesTemp: Routes = { ...routes };
        categoryData &&
          categoryData.forEach((el: Category): void => {
            routesTemp[el.name] = {
              children: [],
              category: el,
            };
          });
        supagesData &&
          supagesData.forEach((el: Subpage): void => {
            if (el.category === null) {
              routesTemp[el.title] = el;
            } else {
              (routesTemp[el.category] as ExtendedCategory).children.push(el);
            }
          });
        setRoutes(routesTemp);
      } catch (err) {
        console.log(err);
      }
    };
    tryRequest();
  }, [language, setRoutes]);
  return (
    <SlideOutMenuWrapper
      isDarkTheme={isDarkTheme}
      isSlideOutMenuOpen={isSlideOutMenuOpen}
    >
      <SlideOutMenuHeightFixer isDarkTheme={isDarkTheme}>
        {routes &&
          Object.keys(routes).map(
            (key: string, index: number): JSX.Element => {
              if (
                Array.isArray(
                  ((routes as any)[key as string] as ExtendedCategory).children
                )
              ) {
                let categoryKey: number = 0;
                const categoryChildren: JSX.Element[] = ((routes as any)[
                  key
                ] as ExtendedCategory).children.map(
                  (
                    { isInnerLink, title, route, onlyForMobile }: Subpage,
                    key: number
                  ): JSX.Element => {
                    categoryKey += 1;
                    return isInnerLink ? (
                      <InnerLink
                        title={title}
                        route={`/subpage/${route}`}
                        onlyForMobile={onlyForMobile}
                        key={key}
                      />
                    ) : (
                      <OuterLink title={title} route={route} key={key} />
                    );
                  }
                );
                if (key === "ZSB Account") {
                  const SingInOrSingOffButton: JSX.Element =
                    privilegeLevel === "unlogged" ? (
                      <InnerLink
                        route="/login"
                        title="Zaloguj się"
                        key={categoryKey}
                      />
                    ) : (
                      <InnerLink
                        route="/"
                        title="Wyloguj się"
                        key={categoryKey}
                        onClick={(): void => {
                          window.localStorage.removeItem("token");
                          window.localStorage.removeItem("stayLoggedIn");
                          setPrivilegeLevel("unlogged");
                          !isMobile && toast.success("Wylogowałeś się");
                        }}
                      />
                    );
                  categoryChildren.unshift(SingInOrSingOffButton);
                  categoryKey += 1;
                  const ManagePostsButton: JSX.Element =
                    privilegeLevel === "admin" ? (
                      <InnerLink
                        route="/manage-posts"
                        title="Zarządzaj postami"
                        key={categoryKey}
                      />
                    ) : (
                      <></>
                    );
                  categoryChildren.push(ManagePostsButton);
                  categoryKey += 1;
                  const AddPostButton: JSX.Element =
                    privilegeLevel === "admin" ? (
                      <InnerLink
                        route="/add-post"
                        title="Dodaj post"
                        key={categoryKey}
                      />
                    ) : (
                      <></>
                    );
                  categoryChildren.push(AddPostButton);
                  categoryKey += 1;
                  const ManageSubpagesButton: JSX.Element =
                    privilegeLevel === "admin" ? (
                      <InnerLink
                        route="/manage-subpages"
                        title="Zarządzaj podstronami"
                        key={categoryKey}
                      />
                    ) : (
                      <></>
                    );
                  categoryChildren.push(ManageSubpagesButton);
                  categoryKey += 1;
                  const ManageUsersButton: JSX.Element =
                    privilegeLevel === "admin" ? (
                      <InnerLink
                        route="/manage-users"
                        title="Zarządzaj użytkownikami"
                        key={categoryKey}
                      />
                    ) : (
                      <></>
                    );
                  categoryChildren.push(ManageUsersButton);
                  categoryKey += 1;
                  const AddUsersPage: JSX.Element =
                    privilegeLevel === "admin" ? (
                      <InnerLink
                        route="/add-users"
                        title="Dodaj użytkowników"
                        key={categoryKey}
                      />
                    ) : (
                      <></>
                    );
                  categoryChildren.push(AddUsersPage);
                  categoryKey += 1;
                  const ManageLessonPlanButton: JSX.Element =
                    privilegeLevel === "admin" ? (
                      <InnerLink
                        route="/manage-lesson-plan"
                        title="Zarządzaj planem lekcji"
                        key={categoryKey}
                      />
                    ) : (
                      <></>
                    );
                  categoryChildren.push(ManageLessonPlanButton);
                }
                const { title, onlyForMobile }: Category = (routes as any)[key]
                  .category as Category;
                const category: JSX.Element = (
                  <SlideOutMenuCategory
                    title={title}
                    onlyForMobile={onlyForMobile}
                    key={index}
                  >
                    {categoryChildren}
                  </SlideOutMenuCategory>
                );
                return category;
              } else {
                const {
                  isInnerLink,
                  title,
                  route,
                  onlyForMobile,
                }: Subpage = (routes as any)[key] as Subpage;
                if (isInnerLink) {
                  return (
                    <InnerLink
                      title={title}
                      route={route}
                      onlyForMobile={onlyForMobile}
                      key={index}
                    />
                  );
                }
                return <OuterLink title={title} route={route} key={index} />;
              }
            }
          )}
      </SlideOutMenuHeightFixer>
    </SlideOutMenuWrapper>
  );
};

export default SlideOutMenu;
