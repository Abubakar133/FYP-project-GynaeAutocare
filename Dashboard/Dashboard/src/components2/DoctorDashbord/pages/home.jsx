import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

function DoctorPage() {
  return ( <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
    <div style={styles.container}>
      {/* Welcome Message */}
      <header style={styles.header}>
        <h1 style={styles.mainHeading}>Welcome, Esteemed Doctors!</h1>
        <p style={styles.subHeading}>Your dedication and expertise provide vital care and support for our patients.</p>
      </header>

      {/* Featured Content */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Important Updates and Guidelines</h2>
        <div style={styles.article}>
          <h3 style={styles.articleHeading}>Guidelines for Patient Care</h3>
          <p style={styles.articleText}>To ensure the best outcomes for your patients, please adhere to the following guidelines:</p>
          <p style={styles.articleText}>1. **Regular Monitoring**  
Conduct regular check-ups to monitor patient progress and address any issues promptly.</p>
          <p style={styles.articleText}>2. **Patient Education**  
Educate patients on their conditions and treatment plans to empower them in their health journey.</p>
          <p style={styles.articleText}>3. **Holistic Approach**  
Consider both physical and mental health aspects in patient care.</p>
          <p style={styles.articleText}>4. **Updated Practices**  
Stay informed about the latest medical practices and technologies to provide the best care.</p>
        </div>
        {/* Add more articles */}
      </section>

      {/* Advice Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Advice for Healthcare Providers</h2>
        <p style={styles.sectionText}>Here are some essential pieces of advice for maintaining a high standard of patient care:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Maintain clear and compassionate communication with patients and their families.</li>
          <li style={styles.listItem}>Prioritize patient safety and adhere to all healthcare protocols and guidelines.</li>
          <li style={styles.listItem}>Engage in continuous professional development to enhance your skills and knowledge.</li>
          {/* Add more advice */}
        </ul>
      </section>

      {/* Precautions Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Precautions in Medical Practice</h2>
        <p style={styles.sectionText}>Ensure the safety and well-being of your patients by observing the following precautions:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Avoid prescribing medications without thorough evaluation of patient history.</li>
          <li style={styles.listItem}>Follow strict hygiene protocols to prevent infections and ensure a sterile environment.</li>
          {/* Add more precautions */}
        </ul>
      </section>

      {/* Quranic Verses Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Quranic Verses for Compassionate Care</h2>
        <p style={styles.sectionText}>Find inspiration and guidance in these Quranic verses that emphasize compassion and care:</p>
        <div style={styles.quranicVerse}>
          <p style={styles.quranicText}>"And We have certainly honored the children of Adam..." - Quran 17:70</p>
        </div>
        <div style={styles.quranicVerse}>
          <p style={styles.quranicText}>"Whoever saves one - it is as if he had saved mankind entirely..." - Quran 5:32</p>
        </div>
        {/* Add more Quranic verses */}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2024 Healthcare Professionals Network</p>
        {/* Add additional footer content */}
      </footer>
    </div>
    </div>
</div>
  );
}

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  mainHeading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  subHeading: {
    fontSize: '1.2rem',
    color: '#666',
  },
  nav: {
    marginBottom: '20px',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navItem: {
    marginBottom: '10px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.2rem',
  },
  section: {
    marginBottom: '30px',
  },
  sectionHeading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
  },
  article: {
    marginBottom: '20px',
  },
  articleHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  articleText: {
    fontSize: '1.2rem',
    color: '#666',
  },
  sectionText: {
    fontSize: '1.2rem',
    color: '#666',
  },
  list: {
    fontSize: '1.2rem',
    color: '#666',
    paddingLeft: '20px',
  },
  listItem: {
    marginBottom: '10px',
  },
  quranicVerse: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  quranicText: {
    fontSize: '1.2rem',
    color: '#333',
  },
  footer: {
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderTop: '1px solid #ddd',
  },
  footerText: {
    fontSize: '1.2rem',
    color: '#333',
  },
};

export default DoctorPage;
