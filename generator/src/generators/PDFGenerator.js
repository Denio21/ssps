const fs = require("fs");
const puppeteer = require('puppeteer');

class PDFGenerator {

    async generate(fileName, targetDir) {
        console.log("| Generating PDF for " + fileName.replace(".json", ""));

        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();
        
        await this.generateTest(page, fileName, targetDir);
        await this.generateSolution(page, fileName, targetDir);
        
        await browser.close();

        console.log("\\- | Done");
    }

    async generateTest(page, fileName, targetDir) {
        await page.goto(targetDir + fileName.replace(".json", ".html"), {
            waitUntil: 'networkidle2'
        });

        const pdfFile = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: "30px",
                left: "30px",
                right: "30px",
                bottom: "30px",
            }
        });

        const pdfFilePath = targetDir + fileName.replace(".json", ".pdf");
        
        fs.writeFileSync(pdfFilePath, pdfFile);
    }

    async generateSolution(page, fileName, targetDir) {
        await page.goto(targetDir + fileName.replace(".json", "-solution.html"), {
            waitUntil: 'networkidle2'
        });

        const pdfFile = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: "30px",
                left: "30px",
                right: "30px",
                bottom: "30px",
            }
        });

        const pdfFilePath = targetDir + fileName.replace(".json", "-solution.pdf");

        fs.writeFileSync(pdfFilePath, pdfFile);
    }
}

module.exports = PDFGenerator;