import { ABOUT_LABELS, PAGE_LABELS } from "@/constants/labels";
import { Paper, Typography } from "@mui/material";

const TECH_STACK_STYLES = [
  { label: "React 18", chipClass: "bg-blue-50 dark:bg-blue-900/20", textClass: "text-blue-600 dark:text-blue-400" },
  {
    label: "Material-UI v6",
    chipClass: "bg-purple-50 dark:bg-purple-900/20",
    textClass: "text-purple-600 dark:text-purple-400",
  },
  { label: "Tailwind CSS", chipClass: "bg-cyan-50 dark:bg-cyan-900/20", textClass: "text-cyan-600 dark:text-cyan-400" },
  { label: "Vite", chipClass: "bg-green-50 dark:bg-green-900/20", textClass: "text-green-600 dark:text-green-400" },
  {
    label: "React Router v6",
    chipClass: "bg-orange-50 dark:bg-orange-900/20",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  { label: "Node.js", chipClass: "bg-red-50 dark:bg-red-900/20", textClass: "text-red-600 dark:text-red-400" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Paper elevation={0} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300">
          <div className="text-center mb-8">
            <Typography variant="h1" component="h2" className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {PAGE_LABELS.ABOUT_TITLE}
            </Typography>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <Typography variant="h5" className="text-gray-800 dark:text-white font-semibold">
              {PAGE_LABELS.ABOUT_WELCOME}
            </Typography>

            <Typography variant="body1" className="leading-relaxed">
              {ABOUT_LABELS.FULL_DESCRIPTION}
            </Typography>

            <Typography variant="h6" className="text-gray-800 dark:text-white font-semibold mt-6">
              {ABOUT_LABELS.FEATURES_TITLE}
            </Typography>

            <ul className="list-disc list-inside space-y-2 ml-4">
              {ABOUT_LABELS.FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <Typography variant="h6" className="text-gray-800 dark:text-white font-semibold mt-6">
              {ABOUT_LABELS.TECH_STACK_TITLE}
            </Typography>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {TECH_STACK_STYLES.map(({ label, chipClass, textClass }) => (
                <div key={label} className={`${chipClass} p-3 rounded-lg text-center`}>
                  <span className={`${textClass} font-medium`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default About;
