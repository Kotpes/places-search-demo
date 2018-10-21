import Loadable from "react-loadable";

//TODO: Replace with loading animation
const Loading = () => null;

export const AsyncHome = Loadable({
  loader: () => import("./components/home/Home"),
  loading: Loading
});

export const AsyncPlaceOverview = Loadable({
  loader: () => import("./components/placeOverview/PlaceOverview"),
  loading: Loading
});
