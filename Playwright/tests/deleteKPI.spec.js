const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');
const { log } = require('node:console');
const { text } = require('node:stream/consumers');

test('Verify delete group', async ({ page }) => { 

    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'ตัวชี้วัด' }).click();

    await page.locator("tbody tr:nth-of-type(7) td:nth-of-type(3) button:nth-of-type(3) span:nth-of-type(3) i").click();

    await page.locator("button:has-text('ยืนยัน')").click();

    await expect(page.locator('text=ลบชุดตัวชี้วัด "ตัวชี้วัดที่ไม่มีชื่อ" สำเร็จแล้ว')).toBeVisible();

})