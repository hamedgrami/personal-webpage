import fs from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "website-data.json")

// Ensure the data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Default data structure
const defaultData = {
  name: "Dr. Jane Smith",
  title: "Associate Professor of Biology",
  location: "University of Science, New York",
  email: "jane.smith@university.edu",
  bio: "Dedicated researcher with over 10 years of experience in molecular biology and genetics. My work focuses on understanding genetic mechanisms in disease progression.",
  about:
    "I am a passionate scientist with a focus on molecular biology and genetics. My research aims to uncover the fundamental mechanisms of genetic diseases and develop novel therapeutic approaches. I lead a diverse team of researchers and collaborate with institutions worldwide.",
  profileImage: "",
  personalPhoto: "",
  cvLink: "",
  researchInterests: [
    {
      title: "Molecular Biology",
      description: "Studying the molecular basis of genetic diseases and developing targeted therapies.",
    },
    {
      title: "Genomics",
      description:
        "Using advanced sequencing technologies to understand genetic variations and their impact on health.",
    },
    {
      title: "Bioinformatics",
      description: "Developing computational tools to analyze large-scale biological data and identify patterns.",
    },
  ],
  publications: [
    {
      title: "Novel Approaches to Gene Therapy in Rare Genetic Disorders",
      authors: "Smith, J., Johnson, A., Williams, B.",
      journal: "Nature Biotechnology",
      year: "2023",
      link: "",
    },
    {
      title: "Genomic Analysis of Mutation Patterns in Cancer Progression",
      authors: "Smith, J., Chen, L., Davis, R.",
      journal: "Cancer Research",
      year: "2022",
      link: "",
    },
    {
      title: "Computational Methods for Predicting Protein Interactions",
      authors: "Williams, B., Smith, J., Taylor, M.",
      journal: "Bioinformatics",
      year: "2021",
      link: "",
    },
  ],
  education: [
    {
      degree: "Ph.D. in Molecular Biology",
      institution: "Harvard University",
      year: "2015",
      description: "Thesis: Genetic Mechanisms of Disease Progression",
    },
    {
      degree: "M.S. in Genetics",
      institution: "Stanford University",
      year: "2011",
      description: "Focus on Human Genetics and Genomics",
    },
    {
      degree: "B.S. in Biology",
      institution: "MIT",
      year: "2009",
      description: "Graduated with honors, minor in Computer Science",
    },
  ],
}

// Get website data
export async function getWebsiteData() {
  ensureDataDirectory()

  try {
    if (!fs.existsSync(dataFilePath)) {
      // If the file doesn't exist, create it with default data
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2))
      return defaultData
    }

    // Read the existing data file
    const fileData = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(fileData)
  } catch (error) {
    console.error("Error reading website data:", error)
    return defaultData
  }
}

// Save website data
export async function saveWebsiteData(data: any) {
  ensureDataDirectory()

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error("Error saving website data:", error)
    return false
  }
}
