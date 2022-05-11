import React, { useEffect, useRef, useState } from "react";
import jwt_docode from "jwt-decode";
import parse from "html-react-parser";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "shared/Layout";
import {
  getEventChat,
  getSingleEvent,
  getUser,
} from "../../services/events.services";
import StreamingAntennas from "assets/Streaming-antennas.png";
import authHeader from "globals/auth-header";
import configs from "globals/config";
import "./index.css";

const SingleEvent = (props) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [event, setEvent] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [socket, setSocket] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [startStream, setStartStream] = useState(false);

  const streamingComments = useRef();

  function startStreaming() {
    setStartStream(true);
    socket.emit("start-streaming");
  }

  function stopStreaming() {
    setStartStream(false);
    socket.emit("stop-streaming");
  }

  useEffect(() => {
    const token = authHeader();
    if (token === {}) return;

    setUserId(jwt_docode(token["x-auth-token"])._id);

    const s = io(configs.HOST, {
      extraHeaders: token,
      transport: ["websocket"],
    });

    setSocket(s);

    getUser().then((res) => {
      setUsername(`${res.data.firstname} ${res.data.lastname}`);
      setIsAdmin(res.data.isAdmin);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    Promise.all([
      getSingleEvent(props.match.params.id),
      getEventChat(props.match.params.id),
    ])
      .then(([{ data: event }, { data: comments }]) => {
        setEvent(event);
        setComments(comments);
        setTimeout(() => {
          streamingComments.current.scrollTop =
            streamingComments.current.scrollHeight;
        }, 100);
      })
      .catch((err) => {
        console.error(err.message);
        return <Redirect to="/events" />;
      });
  }, [props.match.params.id]);

  useEffect(() => {
    if (socket == null || event == null) return;

    const messageHandler = (message) => {
      setComments([...comments, message]);
      setTimeout(() => {
        streamingComments.current.scrollTop =
          streamingComments.current.scrollHeight;
      }, 100);
    };

    const startStreamingHandler = () => {
      setStartStream(true);
    };

    const stopStreamingHandler = () => {
      setStartStream(false);
    };

    socket.on("message", messageHandler);
    socket.on("start-streaming", startStreamingHandler);
    socket.on("stop-streaming", stopStreamingHandler);

    return () => {
      socket.off("message", messageHandler);
      socket.off("start-streaming", startStreamingHandler);
      socket.off("stop-streaming", stopStreamingHandler);
    };
  }, [socket, event, comments, startStream]);

  useEffect(() => {
    if (socket == null || event == null) return;

    socket.emit("joinRoom", event._id);
  }, [socket, event]);

  if (Object.keys(authHeader()).length === 0) {
    alert("You must log in to open this event");
    return <Redirect to="/login" />;
  }

  if (event == null) return null;

  const CommentsSection = () =>
    comments.map((comment, index) => (
      <div key={index}>
        <div
          className={`comment-icon ${userId === comment.userId ? "me" : null}`}
        >
          {comment.firstname.charAt(0).toUpperCase()}
          {comment.lastname.charAt(0).toUpperCase()}
        </div>
        <div
          className={`comment-info ${userId === comment.userId ? "me" : null}`}
        >
          <h6>
            {userId === comment.userId
              ? "Me"
              : `${comment.firstname} ${comment.lastname}`}
          </h6>
          <p>{comment.comment}</p>
        </div>
      </div>
    ));

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      socket.emit("chatMessage", comment);
      setComment("");
      setTimeout(() => {
        streamingComments.current.scrollTop =
          streamingComments.current.scrollHeight;
      }, 100);
    }
  };

  return (
    <div className="page-component">
      <Helmet>
        <title>Events | {event.name}</title>
      </Helmet>
      <Layout>
        <div className="streaming-container">
          <div className="streaming-antennas">
            <div className="streaming-title">
              <h1 id="dropE">{event.name}</h1>
            </div>
            <img src={StreamingAntennas} alt="Streaming Antennas" />
          </div>
          <div className="streaming-sections">
            <div className="streaming-section1">
              <div className="streaming-video">
                {event && startStream && (
                  <JitsiMeeting
                    roomName={`${event.name} - ${event._id}`}
                    configOverwrite={{
                      subject: event.name,
                      disableTitleView: true,
                      startWithAudioMuted: true,
                      startWithVideoMuted: true,
                      disableModeratorIndicator: true,
                      disableRemoteMute: true,
                      startScreenSharing: isAdmin ? true : false,
                      enableEmailInStats: false,
                      disableScreensharingVirtualBackground: false,
                      hiddenPremeetingButtons: isAdmin
                        ? ["invite"]
                        : ["camera", "invite", "select-background"],

                      toolbarButtons: [
                        "microphone",
                        "fullscreen",
                        "hangup",
                        "tileview",
                        "shortcuts",
                        !isAdmin ? "raisehand" : null,
                        isAdmin ? "camera" : null,
                        isAdmin ? "settings" : null,
                        isAdmin ? "desktop" : null,
                        isAdmin ? "mute-everyone" : null,
                        isAdmin ? "mute-video-everyone" : null,
                      ],
                    }}
                    userInfo={{
                      displayName: username,
                    }}
                    interfaceConfigOverwrite={{
                      DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    }}
                    getIFrameRef={(node) => {
                      node.style.height = "100%";
                    }}
                  />
                )}
              </div>
              <div className="streaming-description">
                {isAdmin && (
                  <div className="admin">
                    {startStream ? (
                      <button
                        className="streaming-button"
                        style={{ color: "#a60000" }}
                        onClick={stopStreaming}
                      >
                        Stop Streaming
                      </button>
                    ) : (
                      <button
                        className="streaming-button"
                        onClick={startStreaming}
                      >
                        Start Streaming
                      </button>
                    )}
                  </div>
                )}
                <h3>About</h3>
                <div>{parse(event.eventDescription)}</div>
              </div>
            </div>
            <div className="streaming-section2">
              <div ref={streamingComments} className="streaming-comments">
                {comments.length ? (
                  <div className="comments">
                    <CommentsSection />
                  </div>
                ) : (
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    <h5>There are no comments yet.</h5>
                  </div>
                )}
              </div>
              <div className="streaming-send-comment">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Write a comment"
                    onChange={handleChange}
                    value={comment}
                  />
                  <button>
                    <FontAwesomeIcon icon="location-arrow" className="icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SingleEvent;
