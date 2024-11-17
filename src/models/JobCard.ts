export interface JobCardProps {
  title: string;
  company: string;
  location: string;
  posted: string;
  experience: string;
  jobType: string;
  workType: string;
  category: string;
  focused?: boolean;
}

export const jobList = Array.from({ length: 20 }, (_, i) => ({
  title: `Job Title ${i + 1}`,
  company: `Company ${i + 1}`,
  location: `City ${i + 1}`,
  posted: `${i + 1} days ago`,
  experience: `${i % 3} - ${i % 5}y of exp`,
  jobType: "Full time",
  workType: i % 2 === 0 ? "Remote" : "Hybrid",
  category: "Category",
}));
