const { test, expect } = require('@playwright/test');

const { login } = require('../utils/login');

test('Verify create KPI', async ({ page }) => {

  await login(page, 'admin', 'admin');

  // go to 'ตัวชี้วัด' page
  await page.locator('.nav-group-label').click();
  await page.locator("xpath=//li[@class='nav-group open']/ul[@class='nav-group-children']/li[3]").click();
  await page.getByRole('link', { name: 'ตัวชี้วัด' }).click();
  await page.getByRole('button', { name: 'สร้างชุดตัวชี้วัด' }).click();
  // add name of 'ตัวชี้วัด'
 
  
  const inputLocator = page.locator("(//div[contains(@class, 'v-input__control')]//input)[1]");

  // Wait for the input to be visible
  await inputLocator.waitFor({ state: 'visible' });


  await inputLocator.click();
  await inputLocator.fill('การประชุม');

  // add detail of 'ตัวชี้วัด'

  await page.getByPlaceholder('+ เพิ่มตัวชี้วัด').fill('ตรงต่อเวลา');
  await page.getByPlaceholder('+ เพิ่มตัวชี้วัด').press('Shift+Enter');
  await page.getByRole('combobox').click();
  await page.getByText('น้อยกว่า', { exact: true }).click();
  await page.getByPlaceholder('เกณฑ์').fill('5');
  await page.getByPlaceholder('หน่วย').click();
  await page.getByPlaceholder('หน่วย').fill('คะแนน');
  await page.getByRole('button', { name: 'บันทึกแบบร่าง' }).click();
  // logout
  await page.locator('img').click();
  await page.getByText('Logout').click();
  await page.close();
});
