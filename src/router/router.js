import routesConfig from "~/config/routes";

import Home from "~/pages/Home";
import AboutUsPage from "~/pages/AboutUsPage";
import HelpCenterPage from "~/pages/HelpCenterPage";
import PolicyPage from "~/pages/PolicyPage";
import UserPage from "~/pages/UserPage";
import TrackPage from "~/pages/TrackPage";
import MusicMakerPage from "~/pages/MusicMakerPage";
import AlbumPage from "~/pages/AlbumPage";
import PodcastPage from "~/pages/PodcastPage";
import PodcastAudioPage from "~/pages/PodcastAudioPage";
import NewReleasesViewAll from "~/pages/NewReleasesViewAll";
import MusicMakerViewAll from "~/pages/MusicMakerViewAll";
import AlbumViewAll from "~/pages/AlbumViewAll";
import PodcastViewAll from "~/pages/PodcastViewAll";
import MomentViewAll from "~/pages/MomentViewAll";
import YourPlaylistPage from "~/pages/YourPlaylistPage";
import { MainLayout } from "~/layouts";

const publicRouter = [
  { path: routesConfig.home, component: Home, layout: MainLayout },
  { path: routesConfig.aboutUs, component: AboutUsPage, layout: MainLayout },
  {
    path: routesConfig.helpCenter,
    component: HelpCenterPage,
    layout: MainLayout,
  },
  { path: routesConfig.policy, component: PolicyPage, layout: MainLayout },
  { path: routesConfig.info, component: UserPage, layout: MainLayout },
  { path: routesConfig.track, component: TrackPage, layout: MainLayout },
  {
    path: routesConfig.musicMakerPage,
    component: MusicMakerPage,
    layout: MainLayout,
  },
  { path: routesConfig.albumPage, component: AlbumPage, layout: MainLayout },
  {
    path: routesConfig.podcastPage,
    component: PodcastPage,
    layout: MainLayout,
  },
  {
    path: routesConfig.podcastAudioPage,
    component: PodcastAudioPage,
    layout: MainLayout,
  },
  {
    path: routesConfig.newReleasesViewAll,
    component: NewReleasesViewAll,
    layout: MainLayout,
  },
  {
    path: routesConfig.musicMakersViewAll,
    component: MusicMakerViewAll,
    layout: MainLayout,
  },
  {
    path: routesConfig.albumViewAll,
    component: AlbumViewAll,
    layout: MainLayout,
  },
  {
    path: routesConfig.podcastViewAll,
    component: PodcastViewAll,
    layout: MainLayout,
  },
  {
    path: routesConfig.momentViewAll,
    component: MomentViewAll,
    layout: MainLayout,
  },
  {
    path: routesConfig.yourPlaylistPage,
    component: YourPlaylistPage,
    layout: MainLayout,
  },
];

const privateRouter = [];

export { publicRouter, privateRouter };
