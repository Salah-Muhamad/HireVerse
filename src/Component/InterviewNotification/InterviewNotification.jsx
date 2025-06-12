import React, { useState, useEffect } from "react";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default function InterviewNotification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        window.Pusher = Pusher;

        window.Echo = new Echo({
            broadcaster: 'reverb',
            key: 'y5x71bdjvcqgfewhmrrq',
            wsHost: 'hireverse.ddns.net',
            wssPort: 443,
            forceTLS: true,
            enabledTransports: ['ws', 'wss'],
        });

        window.Echo.connector.pusher.connection.bind('connected', () => {
            console.log('✅ Pusher connected');
        });

        window.Echo.connector.pusher.connection.bind('error', (error) => {
            console.error('❌ Pusher connection error:', error);
        });

        const applicantId = 1;

        window.Echo.channel(`applicant.${applicantId}`)
            .listen('.interview.scheduled', (event) => {
                console.log('New interview scheduled:', event);
                setNotifications(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        message: event.message,
                        deadline: event.deadline
                    }
                ]);
            });

        return () => {
            window.Echo.leave(`applicant.${applicantId}`);
        };
    }, []);

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    return (
        <div className="bg-secondary pt-44 pb-20 m-auto h-[100vh]">
            {/* <h2 className="p-10">Interview Notification Component</h2> */}

            <div className="space-y-4 px-10">
                {notifications.map((notif) => (
                    <div key={notif.id} className="bg-white shadow-lg rounded-xl p-4 border relative">
                        <button 
                            onClick={() => removeNotification(notif.id)} 
                            className="absolute top-2 right-2 text-red-500 font-bold"
                        >
                            ×
                        </button>
                        <p className="text-lg font-semibold">{notif.message}</p>
                        <p className="text-sm text-gray-500">Deadline: {notif.deadline}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
