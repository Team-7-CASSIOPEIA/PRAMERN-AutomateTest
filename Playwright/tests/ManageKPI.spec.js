// Author: Wanissha Yeekaday
// Date modified: 11/03/2568
// Module: Manage KPI flow
import { test, expect } from '@playwright/test';
const { login } = require('../utils/login');

test('Verify row count before and after creating an indicator set', async ({ page }) => {
  // Login
  await login(page, 'admin', '!Tt123456789');

  // Navigate to indicators settings
  await page.getByText('ตั้งค่า').click();
  await page.getByRole('link', { name: 'ตัวชี้วัด' }).click();

  // Get the initial row count
  await page.waitForTimeout(2000);
  const textBefore = await page.locator('.v-data-table-footer__info div').textContent();
  const numbersBefore = textBefore.match(/\d+/g);
  const totalBefore = numbersBefore ? parseInt(numbersBefore[numbersBefore.length]) : 0;
  console.log(`Total rows before: ${totalBefore}`);


  

  // Click "Create Indicator Set"
  await page.getByRole('button', { name: 'สร้างชุดตัวชี้วัด' }).click();

  // Fill Indicator Set Name
  await page.locator('//div[@class="v-field__field"]/input').first().click();
  await page.locator('//div[@class="v-field__field"]/input').first().fill('โครงการ ก');

  // Add Indicators
  const indicatorInput = page.getByPlaceholder('+ เพิ่มตัวชี้วัด').first();
  await indicatorInput.fill('ระยะเวลา');

  // Set Indicator Levels
  await page.getByLabel('ระดับ').fill('มากกว่า');
  await page.getByLabel('คะแนน').first().fill('5');

  // Save and Publish
  await page.getByRole('button', { name: 'บันทึกแบบร่าง' }).click();
  await page.getByRole('button', { name: 'บันทึกพร้อมเผยแพร่' }).click();
  // await page.getByRole('button', { name: 'ยืนยัน' }).click();

  // Get the updated row count
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  // await page.waitForTimeout(2000); // Wait for UI to update
  const textAfter = await page.locator('.v-data-table-footer__info div').textContent();
  const numbersAfter = textAfter.match(/\d+/g);
  const totalAfter = numbersAfter ? parseInt(numbersAfter[numbersAfter.length]) : 0;
  console.log(`Total rows after: ${totalAfter}`);

  // Verify the count increased by 1
  expect(totalAfter).toBe(totalBefore + 1);

});
