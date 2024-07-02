import React, { useState } from 'react';

const EducationalContent = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoList = [
    { id: 1, title: 'First 3 Months', source: 'first-trimester.mp4' },
    { id: 2, title: 'Second 3 Months', source: 'second-trimester.mp4' },
    { id: 3, title: 'Last 3 Months', source: 'third-trimester.mp4' },
    { id: 4, title: 'Pre-Natal Care', source: 'prenatal-care.mp4' },
    { id: 5, title: 'Baby Development', source: 'Baby-Development-Week-by-Week.mp4' },
    { id: 6, title: 'Diet Plan', source: 'diet-plan.mp4' },
    { id: 7, title: 'Top Super Foods', source: 'top-super-foods.mp4' },
    { id: 8, title: 'Correct Sleep Positions', source: 'sleep-position.mp4' },
    { id: 9, title: 'Travelling Procedure', source: 'travelling.mp4' },
    { id: 10, title: 'Normal Delivery Tips', source: 'normal-delivery-tips.mp4' },
    { id: 11, title: '5 Reasons for Miscarriage', source: 'miscarriage-reason.mp4' },
    { id: 12, title: 'Low Blood Pressure', source: 'low-bp.mp4' },
    { id: 13, title: 'Likoria Vaginal Discharge', source: 'vaginal-discharge.mp4' },
    { id: 14, title: 'Baby Movements', source: 'baby-movements.mp4' },
    { id: 15, title: 'Post-Natal Care', source: 'postnatal-care.mp4' },
    { id: 16, title: 'New-born Baby Care', source: 'new-born.mp4' },
    // Add more videos as needed
  ];

  const playVideo = (video) => {
    setSelectedVideo((prevSelectedVideo) =>
      prevSelectedVideo && prevSelectedVideo.id === video.id ? null : video
    );
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const renderVideoButtons = () => {
    return videoList.map((video) => {
      return (
        <div
          key={video.id}
          onClick={() => playVideo(video)}
          style={{
            cursor: 'pointer',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '250px',
            marginBottom: '15px',
            transition: 'transform 0.2s ease-in-out',
            transform: selectedVideo && selectedVideo.id === video.id ? 'scale(1.05)' : 'scale(1)',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
          }}
        >
          <video
            width="100%"
            height="150px"
            poster={video.thumbnail} // Use the thumbnail as the poster
            style={{ borderRadius: '10px 10px 0 0' }}
          >
            <source src={`videos/${video.source}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            style={{
              padding: '10px',
              backgroundColor: '#fff',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
            }}
          >
            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '16px' }}>{video.title}</p>
          </div>
        </div>
      );
    });
  };
  



  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2a61cc', fontSize: '32px', marginBottom: '20px', fontWeight: 'bold' }}>
        Educational Content
      </h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '15px',
          marginBottom: '30px',
          width: '80%',
          margin: '0 auto',
        }}
      >
        {renderVideoButtons()}
      </div>
      {selectedVideo && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative' }}>
            <span
              onClick={closeVideo}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '24px',
                backgroundColor: '#2a61cc',
                borderRadius: '50%',
                padding: '10px',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              &times;
            </span>
            <video
              key={selectedVideo.id}
              width="80%"
              height="auto"
              controls
              style={{
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <source src={`videos/${selectedVideo.source}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalContent;