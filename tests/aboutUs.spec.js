import { test, expect } from '@playwright/test';
const { AboutUsPage } = require('../PageObjectModel/aboutus');
import { getTestData } from '../utils/dataRead.js';
const testData = getTestData('data.json');


test('VE-2322 Verify Title of Page', async ({ page }) => {
    let aboutusPage = new AboutUsPage(page);
    await aboutusPage.navigateToAboutUs(testData.aboutUsUrl);
    let title = await aboutusPage.getPageTitle();
    expect(title).toBe(testData.aboutUsTitle);


});
test('VE-2323 Verify About Us Page Content Title  ', async ({ page }) => {
    let aboutusPage = new AboutUsPage(page);
    await aboutusPage.navigateToAboutUs("/about.html");
    let title = await aboutusPage.getTitle();
    expect(title).toBe('VivTechGuru Vision');



});

test('VE-2323 Verify About Us Page text Content  ', async ({ page }) => {
    let aboutusPage = new AboutUsPage(page);
    await aboutusPage.navigateToAboutUs("/about.html");
    let textContent = await aboutusPage.getTextContent();
    const normalized = textContent.replace(/\s+/g, ' ').trim();
    expect(normalized).toBe('VivTechGuru is a best-in-class learning solutions organization headquartered in India’s IT capital, Bangalore. We offer a wide range of courses in the area of software testing and are official partners of the ISTQB®. A “finishing school” in many ways, the institute provides young job aspirants the perfect launch-pad to build a rewarding career in the growing IT sector. From its humble beginnings, VivTechGuru has exponentially grown to be the world’s largest software testing training organization spread across countries. At VivTechGuru, we ensure training is imparted by specialists with proven subject matter expertise and who have spent over a decade in their area of specialization. Our faculty are highly competent, skilled and dedicated to giving their best towards the professional development of our students. Besides training, we also provide placement assistance to our students and most of the big corporates in the corporate world hire our trained talent. It is indeed our pleasure to have placed over thousands of job-seekers in various IT firms across India over the years with an aim to place thousands more! Building competency into over 100+ students a month, VivTechGuru is where talent meets opportunity and we believe your search for the dream job or the dream professional ends here.');


}); 