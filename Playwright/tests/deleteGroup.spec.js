const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');
const { log } = require('node:console');

test('Verify delete group', async ({ page }) => {

    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'กลุ่ม' }).click();

    await page.locator("tbody tr:nth-of-type(6) td:nth-of-type(3) button:nth-of-type(3) span:nth-of-type(3) i").click();

    await page.locator("button:has-text('ลบกลุ่ม')").click();

    await expect(page.locator('text=ลบกลุ่มสำเร็จ')).toBeVisible();


})

test('Error delete group', async ({page}) => {
    
    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'กลุ่ม' }).click();

    await page.locator("tbody tr:nth-of-type(1) td:nth-of-type(3) button:nth-of-type(3) span:nth-of-type(3) i").click();

    await page.locator("button:has-text('ลบกลุ่ม')").click();

    await expect(page.locator('text=ลบกลุ่มไม่สำเร็จ: กลุ่มนี้ยังมีสมาชิก')).toBeVisible();

})