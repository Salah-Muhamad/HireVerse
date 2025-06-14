import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";

export default function InterviewNotification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);

  async function requestNotificationPermission() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://hireverse.ddns.net/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      requestNotificationPermission();
    }
  }, [localStorage.getItem("userToken")]);

  useEffect(() => {
    if (!localStorage.getItem("userToken")) return;

    // Setup Echo only once
    window.Pusher = Pusher;

    window.Echo = new Echo({
      broadcaster: "reverb",
      key: "y5x71bdjvcqgfewhmrrq",
      wsHost: "hireverse.ddns.net",
      wssPort: 443,
      forceTLS: true,
      authEndpoint: "https://hireverse.ddns.net/broadcasting/auth",
      enabledTransports: ["ws", "wss"],
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    });

    const applicantId = localStorage.getItem("id");

    // Listen for custom events
    window.Echo.channel(`applicant.${applicantId}`).listen(
      ".interview.scheduled",
      (event) => {
        addNotification(event.message, event.deadline);
      }
    );

    // Listen for notifications
    window.Echo.private(`App.Models.Applicant.${applicantId}`).notification(
      (notification) => {
        addNotification(notification.message, notification.deadline);
      }
    );

    window.Echo.connector.pusher.connection.bind("connected", () => {
      console.log("✅ Pusher connected");
    });

    window.Echo.connector.pusher.connection.bind("error", (error) => {
      console.error("❌ Pusher connection error:", error);
    });

    return () => {
      // Cleanup listeners
      window.Echo.leave(`applicant.${applicantId}`);
      window.Echo.leave(`private-App.Models.Applicant.${applicantId}`);
    };
  }, [localStorage.getItem("userToken")]);

  function addNotification(message, deadline) {
    const newNotification = {
      id: Date.now(),
      message,
      deadline,
    };
    setNotifications((prev) => [newNotification, ...prev]);

    // Show popup
    setPopup({
      message,
      deadline,
    });
    setTimeout(() => setPopup(null), 4000);

    // Optional: trigger browser notification
    if (Notification.permission === "granted") {
      new Notification("Interview Scheduled", {
        body: `${message}\nDeadline: ${deadline}`,
      });
    }
  }

  // Async function to update notification status on backend
  async function markAsRead(id) {
    try {
      // Example PATCH request to backend (adjust endpoint as needed)
      await axios.patch(
        `https://hireverse.ddns.net/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
    } catch (err) {
      // Optionally handle error
      console.error("Failed to mark notification as read", err);
    }
  }

  // Handle click on notification
  const handleNotificationClick = async (notif) => {
    if (!notif.is_read) {
      // Update backend
      await markAsRead(notif.id);
      // Update UI
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notif.id ? { ...n, is_read: true } : n
        )
      );
    }
  };

  return (
    <>
      {/* Popup Notification */}
      {popup && (
        <div className="fixed top-8 right-8 z-[9999] bg-blue-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-fadeInUp">
          <div className="font-bold text-lg mb-1">Interview Scheduled</div>
          <div>{popup.message}</div>
          <div className="text-sm mt-1 opacity-80">Deadline: {popup.deadline}</div>
        </div>
      )}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.4s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
      <div className="w-[420px] bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 shadow-2xl rounded-2xl p-8">
        <div className="mx-auto">
          <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-900 tracking-wide flex items-center justify-center gap-2">
            <span className="text-3xl animate-bounce">📢</span> 
              <span className="text-lg">Notifications</span>
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-400">No notifications yet.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`group flex items-start gap-4 p-5 rounded-xl shadow-lg border-2 cursor-pointer transition-all duration-200
                    ${
                      notif.is_read
                        ? "bg-white border-gray-200 opacity-70"
                        : "bg-gradient-to-r from-blue-100 to-blue-50 border-blue-400 shadow-blue-100 hover:shadow-blue-200"
                    }
                    hover:scale-[1.025] hover:shadow-2xl active:scale-100`}
                  style={{ boxShadow: notif.is_read ? "none" : "0 4px 24px 0 rgba(59,130,246,0.07)" }}
                >
                  <div className="flex-shrink-0 mt-1">
                    {notif.is_read ? (
                      <span className="inline-block w-3 h-3 rounded-full bg-gray-300" title="Read"></span>
                    ) : (
                      <span className="inline-block w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-lg" title="Unread"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-lg ${notif.is_read ? "text-gray-500" : "text-blue-900 group-hover:text-blue-800"}`}>
                        {notif.message}
                      </span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold shadow
                          ${
                            notif.is_read
                              ? "bg-gray-200 text-gray-500"
                              : "bg-blue-500 text-white group-hover:bg-blue-600"
                          }`}
                      >
                        {notif.is_read ? "Read" : "New"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                      <span className="flex items-center gap-1 text-blue-700 font-medium">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-7 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {notif.deadline}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {notif.created_at
                          ? new Date(notif.created_at).toLocaleString()
                          : <span className="italic text-gray-400">Just now</span>}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
