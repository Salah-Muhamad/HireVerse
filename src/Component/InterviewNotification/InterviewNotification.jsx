import React, { useState } from "react";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default function InterviewNotification() {
    // Install: npm install laravel-echo pusher-js


// Configure Echo
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: 'y5x71bdjvcqgfewhmrrq',
    wsHost: 'hireverse.ddns.net',
    // wsPort: 4000,    
    wssPort: 443,
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
    // path: '/reverb_ws',
  

});

window.Echo.connector.pusher.connection.bind('connected', () => {
    console.log('✅ Pusher connected');
});

window.Echo.connector.pusher.connection.bind('error', (error) => {
    console.error('❌ Pusher connection error:', error);
});

// Listen for interview notifications
const applicantId = 1; // Current logged-in applicant ID

window.Echo.channel(`applicant.${applicantId}`)
    .listen('.interview.scheduled', (event) => {
        console.log('New interview scheduled:', event);
        // Show notification to user
        showNotification({
            message: event.message,
            deadline: event.deadline,
        });
    });

// window.Echo.connector.pusher.bind_global((eventName, data) => {
//     console.log('🌍 ALL PUSHER EVENTS:', eventName, data);
// });

// window.Echo.channel(`applicant.${applicantId}`).listenToAll((eventName, data) => {
//     console.log('📡 ANY EVENT on applicant channel:', eventName, data);
// });

// window.Echo.private(`applicant`).listen('.test.event', (event) => {
//     console.log('test.event', event);

//     showNotification({
//         message: event.message,
//     });
// }
// );

// Function to show notification (customize as needed)
function showNotification({ message, deadline }) {
    // Example using browser notification API
    if (Notification.permission === 'granted') {
        new Notification(title, {
            // body: `${message}\ndeadline: ${interview.deadline} at ${interview.time}`,
            body: message,
            deadline: deadline,
        });
    }
    
    // Or show in-app notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <p>Deadline: ${deadline}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
return (
    <>
    <div className="bg-secondary pt-44 pb-20 m-auto ">
        <h2 className="p-10">Interview Notification Component</h2>
    </div>
    </>
);
}