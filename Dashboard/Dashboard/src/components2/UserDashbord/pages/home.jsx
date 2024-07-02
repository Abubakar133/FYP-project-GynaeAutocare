import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

function HomePage() {
  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
    <div style={styles.container}>
      {/* Welcome Message */}
      <header style={styles.header}>
        <h1 style={styles.mainHeading}>Welcome to Our Pregnancy Care Website!</h1>
        <p style={styles.subHeading}>Providing comprehensive guidance and support for expectant mothers and new parents.</p>
      </header>

      
      {/* Featured Content */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Featured Articles</h2>
        <div style={styles.article}>
          <h3 style={styles.articleHeading}>10 Tips for a Healthy Pregnancy</h3>
          <p style={styles.articleText}>During pregnancy, maintaining a healthy lifestyle is crucial for both the mother and the baby...</p>
          <p style={styles.articleText}>1. **Regular Prenatal Checkups**  
Schedule regular visits with your healthcare provider. These appointments allow for monitoring the baby's development and addressing any concerns early on.</p>
<p style={styles.articleText}>2. **Balanced Diet**  
Eat a variety of nutritious foods, including fruits, vegetables, whole grains, lean proteins, and dairy. Ensure you're getting essential nutrients like folic acid, iron, calcium, and omega-3 fatty acids.</p>
<p style={styles.articleText}>3. **Stay Hydrated**  
Drink plenty of water throughout the day. Proper hydration supports increased blood volume and amniotic fluid levels, essential for the baby's growth.</p>
<p style={styles.articleText}>4. **Prenatal Vitamins**  
Take prenatal vitamins as prescribed by your doctor. They help fill nutritional gaps and ensure you're getting vital nutrients like folic acid and iron.</p>
<p style={styles.articleText}>5. **Regular Exercise**  
Engage in moderate exercise, such as walking, swimming, or prenatal yoga. Physical activity can improve mood, energy levels, and help manage pregnancy discomforts.</p>
<p style={styles.articleText}>6. **Avoid Harmful Substances**  
Stay away from alcohol, tobacco, and recreational drugs. Limit caffeine intake to less than 200 mg per day, as high levels can affect the baby's development.</p>
<p style={styles.articleText}>7. **Adequate Rest**  
Prioritize sleep and rest. Aim for at least 7-9 hours of sleep per night and take naps if needed. Use pillows for support and practice good sleep hygiene.</p>
<p style={styles.articleText}>8. **Manage Stress**  
Practice stress-reducing techniques such as deep breathing, meditation, or prenatal massage. Keeping stress levels low is beneficial for both you and your baby.</p>
<p style={styles.articleText}>9. **Educate Yourself**  
Attend childbirth and parenting classes to prepare for labor, delivery, and newborn care. Being informed can reduce anxiety and boost confidence.</p>
<p style={styles.articleText}>10. **Listen to Your Body**  
Pay attention to your body’s signals. If you experience unusual symptoms like severe pain, bleeding, or reduced fetal movement, contact your healthcare provider immediately.</p>
        </div>
        {/* Add more featured articles */}
      </section>

      {/* Advice Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Advice for Expectant Mothers</h2>
        <p style={styles.sectionText}>As you embark on this beautiful journey of motherhood, here are some essential pieces of advice to keep in mind:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Stay hydrated by drinking plenty of water throughout the day.</li>
          <li style={styles.listItem}>Eat a balanced diet rich in fruits, vegetables, lean proteins, and whole grains.</li>
          <li style={styles.listItem}>Avoid alcohol, smoking, and certain medications that may harm your baby's development.</li>
          {/* Add more advice */}
        </ul>
      </section>

      {/* Precautions Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Precautions for Pregnancy</h2>
        <p style={styles.sectionText}>During pregnancy, it's important to take certain precautions to ensure the well-being of both you and your baby:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Avoid consuming raw or undercooked meats and seafood to prevent foodborne illnesses.</li>
          <li style={styles.listItem}>Avoid strenuous physical activities that may put excessive strain on your body.</li>
          {/* Add more precautions */}
        </ul>
      </section>

      {/* Quranic Verses Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Quranic Verses for Pregnancy</h2>
        <p style={styles.sectionText}>Find solace and inspiration in these Quranic verses that offer guidance and blessings for expectant mothers:</p>
        <div style={styles.quranicVerse}>
          <p style={styles.quranicText}>"And We have enjoined upon man, to his parents, good treatment..." - Quran 46:15</p>
        </div>
        {/* Add more Quranic verses */}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2024 Pregnancy Care Website</p>
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

export default HomePage;
