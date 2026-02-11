import * as XLSX from "xlsx";

/**
 * Reads Excel file and returns drug list
 * Expected: first column = Drug Name
 */
export const parseDrugExcel = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: ""
        });

        // Skip header row, take only drug name column
        const drugs = rows
          .slice(1)
          .filter(row => row[0])
          .map((row, index) => ({
            sNo: index + 1,
            name: String(row[1]).trim()
          }));

        resolve(drugs);
      } catch (err) {
        reject("Invalid Excel file");
      }
    };

    reader.onerror = () => reject("File reading failed");
    reader.readAsArrayBuffer(file);
  });
};

export const parseOptionHtml = (html) => {
  if (!html) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<select>${html}</select>`, "text/html");

  return Array.from(doc.querySelectorAll("option")).map(opt => ({
    value: opt.getAttribute("value"),
    label: opt.textContent,
    selected: opt.hasAttribute("selected")
  }));
};
