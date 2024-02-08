import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import playimg from "../../../../assets/images/timeline/play.svg";
import pauseimg from "../../../../assets/images/timeline/pause.svg";
import Info from "../../../../assets/images/common/info.svg";
import "./AITrackCard.css";
import formatTime from "../../../../utils/formatTime";
import CustomButton from "../../../common/components/customButton/CustomButton";
import CustomLoaderSpinner from "../../../common/components/customLoaderSpinner/CustomLoaderSpinner";
import { useConfig } from "../../../../customHooks/useConfig";
import { SET_AI_MUSIC_META } from "../../redux/AIMusicSlice";
import CustomToolTip from "../../../common/components/customToolTip/CustomToolTip";
import updateAIMusicMeta from "../../services/AIMusicDB/updateAIMusicMeta";
import updateProjectMeta from "../../services/projectDB/updateProjectMeta";
import { SET_PROJECT_META } from "../../redux/projectMetaSlice";

const AITrackCard = ({
  data,
  type,
  hideTrackTags = false,
  index = 0,
  onTrackSelect,
  showSelectedHighlighted = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { config } = useConfig();
  const [playing, setplaying] = useState(false);
  const [curtime, setcurtime] = useState("00:00");
  const [duration, setduration] = useState("00:00");
  const { playedCueID, recentAIGeneratedData, selectedAIMusicDetails } =
    useSelector((state) => state.AIMusic);
  const { projectID } = useSelector((state) => state.projectMeta);
  const { uploadedVideoURL } = useSelector((state) => state.video);
  const [isTrackLoading, setIsTrackLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const wavesurferRef = useRef();

  let selectedAITrack = recentAIGeneratedData?.find(
    (trackMeta) => trackMeta?.value === data?.cue_id
  );

  let trackDescription =
    type !== "DASHBOARD_BLOCK" ? data?.desc : selectedAITrack?.desc;

  let trackTitle =
    data?.label || selectedAITrack?.label || `Variant ${index || ""}`;

  const handleWSMount = useCallback(
    (waveSurfer) => {
      wavesurferRef.current = waveSurfer;
      if (!data?.cue_audio_file_url) return;
      if (wavesurferRef.current) {
        wavesurferRef.current?.load(data?.cue_audio_file_url);

        wavesurferRef.current?.on("ready", (e) => {
          setduration(formatTime(wavesurferRef.current?.getDuration()));
          setIsTrackLoading(false);
        });
        wavesurferRef.current?.on("audioprocess", () => {
          setcurtime(formatTime(wavesurferRef.current?.getCurrentTime()));
        });
        wavesurferRef.current?.on("loading", (e) => {
          setLoadingPercent(e);
        });

        if (window) {
          window.surferidze = wavesurferRef.current;
        }
      }
    },
    [data?.cue_audio_file_url]
  );

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      handleWSMount(wavesurferRef.current);
    } else {
      didMount.current = true;
    }
  }, [uploadedVideoURL]);

  useEffect(() => {
    if (playedCueID !== data?.cue_id) {
      wavesurferRef.current?.pause();
      setplaying(false);
    }
  }, [playedCueID]);

  const play = useCallback(() => {
    if (playedCueID !== data?.cue_id) {
      dispatch(
        SET_AI_MUSIC_META({
          playedCueID: data?.cue_id,
          playedInstrument: null,
        })
      );
    }
    setplaying(!wavesurferRef.current?.isPlaying());
    wavesurferRef.current?.playPause();
  }, [playedCueID, data?.cue_id]);

  const onposchange = useCallback(() => {
    wavesurferRef.current?.on("finish", () => {
      setplaying(false);
      setcurtime(formatTime(0));
    });
    setcurtime(formatTime(wavesurferRef.current?.getCurrentTime()));
  }, []);

  const onTrackSelection = () => {
    if (!data?.cue_id) return;
    onTrackSelect?.();
    updateAIMusicMeta({
      projectID,
      AIMusicMeta: {
        cueId: data?.cue_id,
      },
      recentAIGeneratedData,
      onSuccess: () => {
        let projectMeta = {
          projectName: trackTitle,
        };

        dispatch(
          SET_PROJECT_META({
            projectName: trackTitle,
            projectDescription: trackDescription,
          })
        );
        updateProjectMeta({ projectID, projectMeta });
        navigate(`/dashboard/${data?.cue_id}`);
      },
    });
  };

  const renderToolTip = (description) => {
    return (
      <div className="track_info_tooltip_container">
        <b>Description:</b>
        <p style={{ margin: "4px 0px 10px 0px" }}>{description || "-"}</p>
      </div>
    );
  };

  return (
    <div className="cue_variant_block">
      <div
        onClick={onposchange}
        className="wavesurfer"
        style={{
          border:
            showSelectedHighlighted &&
            selectedAIMusicDetails?.cue_id &&
            data?.cue_id == selectedAIMusicDetails?.cue_id
              ? "1px solid var(--color-primary)"
              : "none",
        }}
      >
        <div
          className="header_container"
          style={{
            width:
              type !== "DASHBOARD_BLOCK"
                ? "calc(100% - 210px)"
                : "calc(100% - 25px)",
          }}
        >
          <p className="track_name">{isTrackLoading ? "" : trackTitle}</p>
          <div
            className="track_tags"
            style={{
              paddingRight: type !== "DASHBOARD_BLOCK" ? "0px" : "15px",
            }}
          >
            {hideTrackTags ? (
              <p className="track_tag">{data?.settings?.tempo}</p>
            ) : (
              <>
                <p className="track_tag">{data?.settings?.genre}</p>
                <p className="track_tag">{data?.settings?.mood}</p>
                <p className="track_tag">{data?.settings?.tempo}</p>
              </>
            )}
          </div>
        </div>
        <div className="main_container">
          <div
            className="play_pause_btn"
            style={{
              cursor: isTrackLoading ? "progress" : "pointer",
            }}
          >
            {!playing ? (
              <img
                className="ctrlbtn play_cue_icon"
                id={`play_cue_icon_${data?.cue_id}`}
                src={playimg}
                alt="playimg"
                onClick={play}
                style={{
                  pointerEvents: isTrackLoading ? "none" : "auto",
                }}
              />
            ) : (
              <img
                className="ctrlbtn pause_cue_icon"
                id={`pause_cue_icon_${data?.cue_id}`}
                src={pauseimg}
                alt="pauseimg"
                onClick={play}
              />
            )}
          </div>
          <div
            className="wave"
            style={{
              width: type !== "DASHBOARD_BLOCK" ? "calc(100% - 210px)" : "98%",
              position: "relative",
            }}
          >
            <div
              className="cue_variant_spinner_container"
              style={{ display: isTrackLoading ? "flex" : "none" }}
            >
              <CustomLoaderSpinner
                style={{
                  scale: "0.8",
                  position: "relative",
                  top: "-6px",
                }}
                processPercent={loadingPercent}
              />
            </div>
            <div style={{ height: "60px", overflow: "hidden" }}>
              <WaveSurfer
                id={`waveSurfer${data?.cue_id}`}
                onMount={handleWSMount}
              >
                <WaveForm
                  container={`#waveSurfer${data?.cue_id}`}
                  barWidth={1}
                  barRadius={1}
                  barGap={5}
                  barMinHeight={2}
                  cursorWidth={1}
                  progressColor={config.theme?.["--color-wave-progress"]}
                  waveColor={config.theme?.["--color-wave-bg"]}
                  width={"100%"}
                  height={60}
                  hideScrollbar
                  responsive
                  id={`waveform_${data?.cue_id}`}
                />
              </WaveSurfer>
            </div>
            <div className="timestamp">
              <p className="curr-time">{curtime}</p>
              <p className="duration">{duration}</p>
            </div>
          </div>
          {type !== "DASHBOARD_BLOCK" && (
            <div
              className="selection"
              style={{
                visibility:
                  showSelectedHighlighted &&
                  selectedAIMusicDetails?.cue_id &&
                  data?.cue_id == selectedAIMusicDetails?.cue_id
                    ? "hidden"
                    : "visible",
              }}
            >
              <CustomButton
                btnText={"Use this track"}
                type="outlined"
                onClick={onTrackSelection}
                className="primary_border"
              />
            </div>
          )}
        </div>
        {trackDescription?.length > 25 && (
          <CustomToolTip
            title={renderToolTip(trackDescription)}
            arrow
            placement="top"
          >
            <img
              src={Info}
              alt="Info"
              className="track_info_tooltip voice_card_icon_large"
            />
          </CustomToolTip>
        )}
      </div>
    </div>
  );
};

export default AITrackCard;
