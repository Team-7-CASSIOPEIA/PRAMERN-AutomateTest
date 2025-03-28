const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');
const { log } = require('node:console');

const successMessage = 'แก้ไขกลุ่มสำเร็จ';
const errorMessageEmpty = 'กรุณากรอกข้อมูลให้ครบถ้วน';
const errorMessageDuplicate = 'ชื่อกลุ่มนี้ถูกใช้งานแล้ว';

test('Verify edit group all data', async ({ page }) => {

    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'กลุ่ม' }).click();

    await page.locator("tbody tr:nth-of-type(1) td:nth-of-type(3) button:nth-of-type(2) span:nth-of-type(3) i").click();

    let des = await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม', { exact: true }).inputValue();

    await page.getByPlaceholder('ชื่อกลุ่ม').fill('สาระภาษาอังกฤษ');

    await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').fill('วิชาการเรียนการสอนนี้เกี่ยวกับภาษาต่างประเทศ');

    await page.getByPlaceholder('ค้นหาสมาชิก').fill('กษาปณ์ รัตนวิชาโรจน์');

    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');

    await page.getByRole('button', { name: 'บันทึก' }).click();

    let newGroup = await page.getByRole('row', {
        name: 'สาระภาษาอังกฤษ'
    });
    await expect(newGroup).toBeVisible();

    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
})

test('Verify edit group some data', async ({ page }) => {

    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'กลุ่ม' }).click();

    await page.locator("tbody tr:nth-of-type(2) td:nth-of-type(3) button:nth-of-type(2) span:nth-of-type(3) i").click();

    let des = await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม', { exact: true }).inputValue();

    await page.getByPlaceholder('ชื่อกลุ่ม').fill('สาระภาษาเกาหลี');

    await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').fill(des.toString());

    await page.getByPlaceholder('ค้นหาสมาชิก').fill('กษาปณ์ รัตนวิชาโรจน์');

    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');

    await page.getByRole('button', { name: 'บันทึก' }).click();

    let newGroup = await page.getByRole('row', {
        name: 'สาระภาษาเกาหลี'
    });
    await expect(newGroup).toBeVisible();

    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
})

test('Error edit group data is incomplete', async ({ page }) => {
    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'กลุ่ม' }).click();

    await page.locator("tbody tr:nth-of-type(1) td:nth-of-type(3) button:nth-of-type(2) span:nth-of-type(3) i").click();

    let des = await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม', { exact: true }).inputValue();

    await page.getByPlaceholder('ชื่อกลุ่ม').fill('');

    await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').fill(des.toString());

    await page.getByRole('button', { name: 'บันทึก' }).click();

    await expect(page.locator(`text=${errorMessageEmpty}`)).toBeVisible();
})

test('Error edit group duplicate data', async ({ page }) => {
    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'กลุ่ม' }).click();

    await page.locator("tbody tr:nth-of-type(3) td:nth-of-type(3) button:nth-of-type(2) span:nth-of-type(3) i").click();

    let des = await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม', { exact: true }).inputValue();

    await page.getByPlaceholder('ชื่อกลุ่ม').fill('สาระภาษาอังกฤษ');

    await page.getByPlaceholder('คำอธิบายเกี่ยวกับกลุ่ม').fill(des.toString());

    await page.getByRole('button', { name: 'บันทึก' }).click();

    await expect(page.locator(`text=${errorMessageDuplicate}`)).toBeVisible();
})