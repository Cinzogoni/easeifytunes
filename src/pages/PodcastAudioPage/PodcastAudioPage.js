import classNames from "classnames/bind";
import styles from "./PodcastAudioPage.module.scss";

import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";
import { useTranslation } from "react-i18next";

import Track from "~/components/Track";
import PodcastAudioInfo from "~/components/PodcastAudioInfo";

const cx = classNames.bind(styles);

function PodcastAudioPage() {
  const { t } = useTranslation();
  const { podcast } = useTrackInfo();
  const { publisher } = useParams();

  const allAudio = podcast.flatMap((a) => a.audios || []);
  const audio = allAudio.find((t) => t.publisher === publisher);

  const audioId = audio && audio.id ? audio.id : "";
  const link = audio && audio.link ? audio.link : "";
  const podcastTopic = audio && audio.audioTopic ? audio.audioTopic : "";
  const avatar = audio && audio.audioAvatar ? audio.audioAvatar : "";
  const podcastTitle = audio && audio.title ? audio.title : "";
  const podcastPublisher = audio && audio.publisher ? audio.publisher : "";
  const podcastAuthor = audio && audio.author ? audio.author : "";
  const type = audio && audio.type ? audio.type : "";
  const releaseDay = audio && audio.releaseDay ? audio.releaseDay : "";
  const streamed = audio && audio.streamed ? audio.streamed : "";
  const desc = audio && audio.description ? audio.description : "";

  return (
    <Track
      info={
        <PodcastAudioInfo
          id={audioId}
          link={link}
          topic={podcastTopic}
          avatar={avatar}
          title={podcastTitle}
          publisher={podcastPublisher}
          author={podcastAuthor}
          type={type}
          releaseDay={releaseDay}
          streamed={streamed}
        />
      }
      list={
        <div className={cx("desc-box")}>
          {desc.length > 0 ? (
            desc.map((index) => <h4 key={index} className={cx("desc")}></h4>)
          ) : (
            <h4 className={cx("desc")}>{t("podcastAudioDes")}</h4>
          )}
        </div>
      }
    />
  );
}

export default PodcastAudioPage;
