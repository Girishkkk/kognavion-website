import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert Excel file to JSON
function convertExcelToJson() {
  try {
    console.log('Converting courses.xlsx to JSON...');
    
    // Read the Excel file
    const excelPath = path.join(__dirname, '../public/courses.xlsx');
    const workbook = XLSX.readFile(excelPath);
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // Transform the data to match our component structure
    const transformedCourses = jsonData.map(row => ({
      id: row['Course ID'],
      title: row['Title'],
      description: row['Description'],
      duration: row['Duration'],
      level: row['Level'],
      price: row['Price'],
      originalPrice: row['Original Price'],
      instructor: row['Instructor'],
      rating: row['Rating'],
      students: row['Students'],
      startDate: row['Start Date'],
      endDate: row['End Date'],
      format: row['Format'],
      highlights: row['Highlights'] ? row['Highlights'].split('|') : [],
      curriculum: row['Curriculum'] ? row['Curriculum'].split('|') : []
    }));
    
    // Create the final JSON structure
    const coursesData = {
      courses: transformedCourses,
      lastUpdated: new Date().toISOString(),
      totalCourses: transformedCourses.length
    };
    
    // Write to JSON file
    const jsonPath = path.join(__dirname, '../public/courses.json');
    fs.writeFileSync(jsonPath, JSON.stringify(coursesData, null, 2));
    
    console.log(`✅ Successfully converted ${transformedCourses.length} courses to JSON`);
    console.log(`📁 Output: ${jsonPath}`);
    
  } catch (error) {
    console.error('❌ Error converting Excel to JSON:', error);
    process.exit(1);
  }
}

// Run the conversion
convertExcelToJson();

