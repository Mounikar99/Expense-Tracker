import React from 'react';
import '../styles/dialog.css';

function Dialog() {
    const alerts = [
        { id: 1, text: 'Notification feature will be added soon' },
        { id: 2, text: 'Notification feature will be added soon' },
    ]
    return (
        <div className='dialog'>
            <div className='dialog-title'>Notifications</div>
            <div></div>
            {alerts.map((alert) => (
                <div className='alert' key={alert.id}>
                    {alert.text}
                </div>
            ))}
        </div>
    )
}

export default Dialog
