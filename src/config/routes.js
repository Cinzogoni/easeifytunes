const routesConfig = {
  home: `/`,
  aboutUs: `/aboutUsPage`,
  helpCenter: `/helpCenter`,
  policy: `/policyPage`,
  info: `/info/:name`,
  track: `/track/:stageName/:trackTitle`,
  musicMakerPage: `/musicMakerPage/:stageName`,
  albumPage: `/albumPage/:albumPerformer/:albumName`,
  podcastAudioPage: `/podcastAudioPage/:publisher/:title`,
  podcastPage: `/podcastPage/:topic`,
  newReleasesViewAll: `/NewReleasesViewAll`,
  musicMakersViewAll: `/musicMakersViewAll`,
  albumViewAll: `/albumViewAll`,
  podcastViewAll: `/podcastViewAll`,
  momentViewAll: `/momentViewAll`,
  yourPlaylistPage: `/yourPlaylistPage/:userName/:yourPlaylistName`,
};

export { routesConfig as default };
