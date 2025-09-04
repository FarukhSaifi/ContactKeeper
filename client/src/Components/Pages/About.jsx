import { Paper, Typography } from "@mui/material";
import React from "react";

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Paper
          elevation={0}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300"
        >
          <div className="text-center mb-8">
            <Typography
              variant="h1"
              component="h2"
              className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              About Contact Keeper
            </Typography>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <Typography variant="h5" className="text-gray-800 dark:text-white font-semibold">
              Welcome to Contact Keeper
            </Typography>

            <Typography variant="body1" className="leading-relaxed">
              Contact Keeper is a modern, intuitive contact management application built with React,
              Material-UI, and Tailwind CSS. It provides a seamless experience for managing your
              personal and professional contacts with a beautiful, responsive interface.
            </Typography>

            <Typography variant="h6" className="text-gray-800 dark:text-white font-semibold mt-6">
              Features
            </Typography>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Add, edit, and delete contacts</li>
              <li>Search and filter contacts</li>
              <li>Dark and light theme support</li>
              <li>Responsive design for all devices</li>
              <li>Modern Material-UI components</li>
              <li>Tailwind CSS for enhanced styling</li>
            </ul>

            <Typography variant="h6" className="text-gray-800 dark:text-white font-semibold mt-6">
              Technology Stack
            </Typography>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                <span className="text-blue-600 dark:text-blue-400 font-medium">React 18</span>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                <span className="text-purple-600 dark:text-purple-400 font-medium">
                  Material-UI v5
                </span>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg text-center">
                <span className="text-cyan-600 dark:text-cyan-400 font-medium">Tailwind CSS</span>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                <span className="text-green-600 dark:text-green-400 font-medium">Vite</span>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
                <span className="text-orange-600 dark:text-orange-400 font-medium">
                  React Router v6
                </span>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
                <span className="text-red-600 dark:text-red-400 font-medium">Node.js</span>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};
export default About;
