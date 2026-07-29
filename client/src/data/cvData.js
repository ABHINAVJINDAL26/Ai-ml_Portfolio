export const cvData = {
  personal: {
    name: "Abhinav Jindal",
    title: "Data Science Engineer",
    location: "Jalandhar, Punjab, 144411",
    phone: "+91 9571441853",
    email: "jabhinav198@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhinav--jindal/",
    github: "https://github.com/AbhinavJindal",
    tagline: "Building intelligent systems using Time-Series Forecasting, Machine Learning, and Full-Stack Engineering.",
    summary: "Computer Science and Engineering student at Lovely Professional University with a strong academic record (CGPA: 8.00) and practical experience in AI, cloud systems, and data analytics. Proven track record of improving ML model accuracies, designing time-series forecasting pipelines, and building AI-powered resume and interview assistants. Highly proficient in Python, SQL, Java, Scikit-learn, and Web Technologies."
  },
  skills: {
    languages: ["Python", "Java", "SQL", "JavaScript", "HTML/CSS"],
    machineLearning: ["Scikit-learn", "XGBoost", "Feature Engineering", "Model Evaluation Metrics", "ARIMA/SARIMA"],
    dataAnalysis: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
    backendDatabases: ["FastAPI", "Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
    developerTools: ["Git", "Docker", "Jupyter Notebook", "Power BI", "IBM Watson Studio"],
    coreConcepts: ["OOP", "Statistics", "Data Structures & Algorithms"]
  },
  internships: [
    {
      role: "AI & Cloud Intern",
      company: "IBM Edunet Foundation (in collaboration with AICTE)",
      period: "August 2025",
      highlights: [
        "Improved ML model accuracy from 72% to 81% through meticulous data preprocessing, data cleaning, and feature engineering from a dataset of 3,000+ records in IBM Watson Studio.",
        "Deployed the trained machine learning model on IBM Cloud as a high-performance REST API.",
        "Integrated the model with a web backend, successfully serving 500+ real-time prediction requests."
      ]
    }
  ],
  projects: [
    {
      title: "AgriPrice AI",
      subtitle: "Commodity Price Prediction System",
      techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "ARIMA", "SARIMA", "Streamlit"],
      period: "Feb 2026",
      github: "https://github.com/ABHINAVJINDAL26/AgriPrice-AI-Commodity-Price-Prediction-System",
      metrics: {
        "Forecast Horizon": "7 to 30 Days",
        "Target Commodities": "Onion, Potato, Tomato"
      },
      description: "Engineered an end-to-end time-series forecasting pipeline addressing real-world price volatility faced by consumers and agricultural farmers.",
      details: [
        "Engineered lag and rolling-average features to capture seasonal demand patterns and price fluctuations.",
        "Trained and compared ARIMA, SARIMA, and XGBoost models to find the most accurate predictor.",
        "Developed an interactive Streamlit dashboard displaying forecasts with confidence intervals and automated alerts when prices cross risk thresholds."
      ]
    },
    {
      title: "Customer Segmentation & Personalization Engine",
      subtitle: "Behavioral Grouping & Recommendation System",
      techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "FastAPI", "PostgreSQL", "Docker"],
      period: "Nov 2025",
      github: "https://github.com/ABHINAVJINDAL26/Customer_Segmentation",
      metrics: {
        "Silhouette Score": "0.42",
        "Recommendation Precision@5": "0.61"
      },
      description: "Developed an end-to-end user behavioral analysis engine and product recommendation API.",
      details: [
        "Constructed a customer segmentation model using RFM (Recency, Frequency, Monetary) analysis and K-Means clustering.",
        "Built a recommendation system using collaborative filtering (Singular Value Decomposition - SVD) to suggest personalized products.",
        "Exposed the segmentation and recommendation models as REST APIs using FastAPI, PostgreSQL, and Docker containerization for real-time serving."
      ]
    },
    {
      title: "AI-Powered Resume Screening & Interview Assistant",
      subtitle: "Smart Recruiter & Candidate Q&A Generator",
      techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Python", "OpenAI API", "JWT"],
      period: "Mar 2025",
      github: "https://github.com/ABHINAVJINDAL26/Resume-Screning",
      metrics: {
        "Relevance Accuracy": "75%",
        "Test Cases Validated": "30+"
      },
      description: "Designed an AI recruiter assistant that screens resumes and prepares personalized interview questions.",
      details: [
        "Leveraged OpenAI API to parse and match resume skills with detailed job descriptions, achieving high screening alignment.",
        "Set up secure role-based access control (RBAC) using JWT authentication, handling policies directly at the database level.",
        "Implemented an automatic candidate Q&A generator based on specific skill gaps detected between their resume and the JD."
      ]
    }
  ],
  education: [
    {
      institution: "Lovely Professional University, Punjab",
      degree: "Computer Science and Engineering",
      score: "CGPA: 8.00",
      period: "August 2023 – Present",
      location: "Phagwara, Punjab"
    },
    {
      institution: "Bhagwati Senior Secondary School",
      degree: "Intermediate (Class XII)",
      score: "Percentage: 96.40%",
      period: "April 2021 – March 2022",
      location: "Dausa, Rajasthan"
    },
    {
      institution: "Adarsh Vidhya Mandir School",
      degree: "Matriculation (Class X)",
      score: "Percentage: 92.67%",
      period: "June 2019 – March 2020",
      location: "Bhusawer, Rajasthan"
    }
  ],
  certificates: [
    {
      title: "Oracle Java SE 21 – Certification Preparation (1Z0-830)",
      issuer: "Udemy",
      date: "Jan 2026"
    },
    {
      title: "Data Science & AI Masters (Python, ML, GenAI)",
      issuer: "Udemy",
      date: "June 2025"
    },
    {
      title: "Cloud Computing",
      issuer: "Nptel",
      date: "Apr 2025"
    }
  ]
};
