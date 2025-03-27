// Author: Wanissha Yeekaday
// Date modified: 11/03/2568
// Module: Manage group flow
import { test, expect } from '@playwright/test';
const { login } = require('../utils/login');

test('test', async ({ page }) => {
  // page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));

  // เข้าสู่ระบบ
  await login(page, 'admin', '!Tt123456789');

  // ไปที่เมนูกุล่ม
  await page.locator('.nav-group-label').click();
  await page.locator("xpath=//li[@class='nav-group open']/ul[@class='nav-group-children']/li[3]").click();
  await page.getByRole('link', { name: 'กลุ่ม' }).click();

  // สร้างกลุ่ม
  await page.getByRole('button', { name: 'สร้างกลุ่ม' }).click();
  await page.getByPlaceholder('ชื่อกลุ่ม').click();
  await page.getByPlaceholder('ชื่อกลุ่ม').fill('สาระกลุ่มต่างประเทศ');

  await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').click();
  await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').fill('เกี่ยวกับ การฟัง การอ่าน และการเขียน ตั้งแต่ระดับพื้นฐานไปจนถึงระดับสูง');

  await page.locator('//div[contains(@class, "v-autocomplete")]//input').click();

  // await page.waitForSelector('div:has-text("Wanissha Yeekaday")'); 
  // await page.locator('div').filter({ hasText: /^Wanissha Yeekaday$/ }).first().click();
  // await page.getByLabel('Clear').click();


  // const rowCount = await page.locator('//div[@class, "pa-5"]//div[@class, "v-table__wrapper"]//tbody//tr').length;
  // console.log(rowCount);

  // บันทึกข้อมูล
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.locator('div').filter({ hasText: 'สร้างกลุ่มสำเร็จ' }).getByRole('button'); 
  await page.waitForSelector('.v-data-table__tr .v-data-table__td', { state: 'visible' });

  // await page.reload();
  // ตรวจสอบว่าข้อมูลถูกเพิ่มเข้ามาในกลุ่มแล้ว
  // const memberCount = await page.locator('//tbody//tr[7]//td[2]').textContent();
  // expect(parseInt(memberCount)).toBeGreaterThan(0);


  // Edit
  await page.locator('//tbody//tr[2]//td[3]//button[2]').click();
  await page.getByPlaceholder('ชื่อกลุ่ม').click();
  await page.getByPlaceholder('ชื่อกลุ่ม').fill('สาระกลุ่มภาษาไทย');

  await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').click();
  await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').clear();
  await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').fill('เกี่ยวกับ การฟัง การอ่าน และการเขียน ตั้งแต่ระดับพื้นฐานไปจนถึงระดับสูง');

  await page.locator('//div[contains(@class, "v-autocomplete")]//input').click();

  // await page.waitForSelector('div:has-text("วณิชชา ยีขะเด")');
  // await page.locator('div').filter({ hasText: /^วณิชชา ยีขะเด$/ }).first().click();
  // await page.getByLabel('Clear').click();

  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.locator('div').filter({ hasText: 'แก้ไขกลุ่มสำเร็จ' }).getByRole('button');
  await page.waitForSelector('.v-data-table__tr .v-data-table__td', { state: 'attached' });

  // memberCount = await page.locator('//tbody//tr[3]//td[2]').textContent();
  // expect(parseInt(memberCount)).toEqual(rowCount);

  // Delete
  await page.locator('//tbody//tr[1]//td[3]//button[2]').click();
  const memberCount = await page.locator('//tbody//tr[2]//td[2]').textContent();
  console.log(memberCount)

  await page.waitForSelector('//tbody//tr[1]//td[3]', { state: 'visible' });

  // ลบผู้ใช้แต่ละรายในกลุ่ม
  // await page.locator('.v-overlay__scrim').waitFor({ state: 'hidden' });

  // Select all rows
  // const rows = page.locator('//tbody//tr[@class="v-data-table__tr"]');

  // for (let i = 0; i < memberCount; i++) {
  //   const cell = rows.nth(i).locator('td:nth-child(3)');

  //   await cell.scrollIntoViewIfNeeded();
  //   await cell.waitFor({ state: 'visible' });
  //   await cell.click({ force: true });
  // }

  // await page.getByRole('row', { name: 'August Amin Alan@gmail.com' }).getByRole('button').click();
  // await page.getByRole('row', { name: 'วณิชชา ยีขะเด Aaron@gmail.com' }).getByRole('button').click();


  // await page.locator('//div[@class, "pa-5"]//div[@class, "v-table__wrapper"]//tbody//tr//td[3]').click();
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.locator('//tbody//tr[2]//td[3]//button[3]').click();
  await page.locator('//div[@class = "v-card-text"]').filter({ hasText: /คุณต้องการลบกลุ่ม .* หรือไม่\?/ }).getByRole('button');
  await page.locator('//div[contains(@class, "v-card-actions")]//button[2]').click();
  await page.locator('div').filter({ hasText: 'ลบกลุ่มสำเร็จ' }).getByRole('button');

});

