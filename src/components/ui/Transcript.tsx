import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

export const downloadTranscript = (report: any) => {
  const pdf = new jsPDF("portrait", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();

  // Optional logo
  if (report.schoolLogo) {
    pdf.addImage(report.schoolLogo, "PNG", 40, 30, 50, 50);
  }

  // School name & title
  pdf.setFontSize(18).setFont("helvetica", "bold");
  pdf.text("Lycée Sainte-Marie de Conakry", pageWidth / 2, 50, { align: "center" });
  pdf.setFontSize(12).setFont("helvetica", "normal");
  pdf.text(`Bulletin du ${report.title}`, pageWidth / 2, 70, { align: "center" });

  // Optional student photo
  if (report.studentPhoto) {
    pdf.addImage(report.studentPhoto, "PNG", pageWidth - 100, 30, 60, 60);
  }

  // Student Info
  pdf.setFontSize(10).setFont("helvetica", "normal");
  pdf.text(`Nom: ${report.studentName}`, 40, 110);
  pdf.text(`Classe: ${report.className}`, 40, 125);
  pdf.text(`Année scolaire: ${report.schoolYear}`, 40, 140);

  // Grades Table
  const startY = 170;
  pdf.setFontSize(12).setFont("helvetica", "bold");
  pdf.text("Notes du trimestre", 40, startY);

  const headers = ["Matière", "Mois 1", "Mois 2", "Mois 3", "Moyenne"];

  const body: RowInput[] = report.grades.map(g => [
    g.subject,
    g.months[0] || "-",
    g.months[1] || "-",
    g.months[2] || "-",
    g.average
  ]);

  autoTable(pdf, {
    head: [headers],
    body,
    startY: startY + 10,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4, halign: "center" },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
    columnStyles: { 0: { halign: "left" } }, // First column left aligned
  });

  // Footer
  const finalY = (pdf as any).lastAutoTable.finalY + 20;
  pdf.setFont("helvetica", "bold");
  pdf.text(`Moyenne générale: ${report.average}`, 40, finalY);
  pdf.text(`Classement: ${report.ranking}`, 40, finalY + 15);

  // Save PDF
  pdf.save(`bulletin_${report.title.replace(/\s+/g, "_")}.pdf`);
};
