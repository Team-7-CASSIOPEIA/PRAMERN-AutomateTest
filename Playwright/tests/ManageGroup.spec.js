//  Date: 12/02/2568
//  Author: Wanissha Yeekaday
//  Module : Manage Group Flow (Create Edit Delete)
import { test, expect } from '@playwright/test';
const { login } = require('../utils/login');

test('test', async ({ page }) => {
  page.on('console', msg => console.log(`BROWSER LOG: ${msg.text()}`));

  // เข้าสู่ระบบ
  await login(page ,'admin', 'Adm!n123');

  // ไปที่เมนูกุล่ม
  await page.locator('div').filter({ hasText: /^ตั้งค่า$/ }).click();
  await page.getByRole('link', { name: 'กลุ่ม' }).click();
  
  // สร้างกลุ่ม
  await page.getByRole('button', { name: 'สร้างกลุ่ม' }).click();
  await page.getByPlaceholder('ชื่อกลุ่ม').click();
  await page.getByPlaceholder('ชื่อกลุ่ม').fill('สาระกลุ่มต่างประเทศ');
 
  await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').click();
  await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').fill('เกี่ยวกับ การฟัง การอ่าน และการเขียน ตั้งแต่ระดับพื้นฐานไปจนถึงระดับสูง');

  await page.locator('//div[contains(@class, "v-autocomplete")]//input').click();

  await page.waitForSelector('div:has-text("Wanissha Yeekaday")'); 
  await page.locator('div').filter({ hasText: /^Wanissha Yeekaday$/ }).first().click();
  // await page.getByLabel('Clear').click();


  const rowCount = await page.locator('//div[@class, "pa-5"]//div[@class, "v-table__wrapper"]//tbody//tr').length;
  console.log(rowCount);

  // บันทึกข้อมูล
  await page.getByRole('button', { name: 'บันทึก' }).click();
  await page.locator('div').filter({ hasText: 'สร้างกลุ่มสำเร็จ' }).getByRole('button').click(); 
  await page.waitForSelector('.v-data-table__tr .v-data-table__td', { state: 'visible' });
  
  await page.reload();
  // ตรวจสอบว่าข้อมูลถูกเพิ่มเข้ามาในกลุ่มแล้ว
  const memberCount = await page.locator('//tbody//tr[.//text()[contains(., "ต่างประเทศ")]]//td[2]').textContent();
  expect(parseInt(memberCount)).toBeGreaterThan(0);


  // Edit
  // await page.locator('tbody//tr[1]//td[1]//i[contains(@class, "tabler-edit")]').click();
  // await page.getByPlaceholder('ชื่อกลุ่ม').click();
  // await page.getByPlaceholder('ชื่อกลุ่ม').fill('สาระกลุ่มภาษาไทย');
 
  // await page.getByPlaceholder('คำอธิบายกลุ่ม').click();
  // await page.getByPlaceholder('คำอธิบายกลุ่ม').fill('เกี่ยวกับ การฟัง การอ่าน และการเขียน ตั้งแต่ระดับพื้นฐานไปจนถึงระดับสูง');

  // await page.locator('//div[contains(@class, "v-autocomplete")]//input').click();

  // await page.waitForSelector('div:has-text("กุลธิดา พานิช")'); 
  // await page.locator('div').filter({ hasText: /^กุลธิดา พานิช$/ }).first().click();
  // await page.getByLabel('Clear').click();

  // await page.getByRole('button', { name: 'บันทึก' }).click();
  // // await page.locator('div').filter({ hasText: 'สร้างกลุ่มสำเร็จ' }).getByRole('button').click();
  // await page.waitForSelector('.v-data-table__tr .v-data-table__td', { state: 'attached' });
  
  // memberCount = await page.locator('//tbody//tr[3]//td[2]').textContent();
  // expect(parseInt(memberCount)).toEqual(rowCount);

  // Delete
  // xpath of delete icon -> tbody//tr[.//text()[contains(., "ต่างประเทศ")]]//td[3]//i[contains(@class, "tabler-trash")]


});

