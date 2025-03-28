const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');
const { log } = require('node:console');
const { text } = require('node:stream/consumers');

const successMessage = 'แก้ไขสำเร็จ';
const errorMessageEmpty = 'กรุณากรอกข้อมูลให้ครบถ้วน';
const errorMessageUsername = 'กรุณากรอกตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น';
const errorMessageEmail = 'กรุณากรอกอีเมลให้ถูกต้อง';   

test('Verify edit user all data', async ({ page }) => {

    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'ผู้ใช้งาน' }).click();

    await page.locator("tbody tr:nth-of-type(1) td:last-child button").nth(1).click();

    // แก้ไขข้อมูลทั้งหมด
    await page.getByPlaceholder('ชื่อ', { exact: true }).fill('ชีวัน');
    await page.getByPlaceholder('นามสกุล', { exact: true }).fill('มีทรัพย์');
    await page.getByPlaceholder('ชื่อผู้ใช้', { exact: true }).fill('chiwan');
    await page.getByPlaceholder('อีเมล', { exact: true }).fill('chiwan@gmail.com');

    await page.getByPlaceholder('ค้นหากลุ่มที่ต้องการเพิ่ม').fill('ประวิติศาสตร์');

    // กดบันทึก
    await page.getByRole('button', { name: 'บันทึก' }).click();

    let newUser = await page.getByRole('row', {
        name: 'ชีวัน มีทรัพย์'
    });
    await expect(newUser).toBeVisible();
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
})

test('Verify edit user some data', async ({ page }) => {
    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'ผู้ใช้งาน' }).click();

    await page.locator("tbody tr:nth-of-type(2) td:last-child button").nth(1).click();

    // อ่านค่าปัจจุบันของช่องที่ไม่ต้องการแก้ไข
    let username = await page.getByPlaceholder('ชื่อผู้ใช้', { exact: true }).inputValue();
    let email = await page.getByPlaceholder('อีเมล', { exact: true }).inputValue();

    // แก้ไขแค่ชื่อ
    await page.getByPlaceholder('ชื่อ', { exact: true }).fill('มีนา');

    await page.getByPlaceholder('นามสกุล', { exact: true }).fill('ดีใจ');

    // กรอกค่าที่เหลือกลับเข้าไป (เพื่อป้องกัน validation error)
    await page.getByPlaceholder('ชื่อผู้ใช้', { exact: true }).fill(username.toString());
    await page.getByPlaceholder('อีเมล', { exact: true }).fill(email.toString());

    // กดบันทึก
    await page.getByRole('button', { name: 'บันทึก' }).click();

    let newUser = await page.getByRole('row', {
        name: 'มีนา ดีใจ'
    });
    await expect(newUser).toBeVisible();
    await expect(page.locator(`text=${successMessage}`)).toBeVisible();
})


test('Error edit user data is incomplete', async ({ page }) => {

    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'ผู้ใช้งาน' }).click();

    await page.locator("tbody tr:nth-of-type(1) td:last-child button").nth(1).click();

    // อ่านค่าปัจจุบันของช่องที่ไม่ต้องการแก้ไข
    let lastName = await page.getByPlaceholder('นามสกุล', { exact: true }).inputValue();
    let username = await page.getByPlaceholder('ชื่อผู้ใช้', { exact: true }).inputValue();
    let email = await page.getByPlaceholder('อีเมล', { exact: true }).inputValue();

    await page.getByPlaceholder('ชื่อ', { exact: true }).fill('');

    // กรอกค่าที่เหลือกลับเข้าไป (เพื่อป้องกัน validation error)
    await page.getByPlaceholder('นามสกุล', { exact: true }).fill(lastName.toString());
    await page.getByPlaceholder('ชื่อผู้ใช้', { exact: true }).fill(username.toString());
    await page.getByPlaceholder('อีเมล', { exact: true }).fill(email.toString());

    await page.getByRole('button', { name: 'บันทึก' }).click();

    await expect(page.locator(`text=${errorMessageEmpty}`)).toBeVisible();
})

test('Error edit user because Username data is invalid', async ({ page }) => {

    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'ผู้ใช้งาน' }).click();

    await page.locator("tbody tr:nth-of-type(1) td:last-child button").nth(1).click();

    // อ่านค่าปัจจุบันของช่องที่ไม่ต้องการแก้ไข
    let firstName = await page.getByPlaceholder('ชื่อ', { exact: true }).inputValue();
    let lastName = await page.getByPlaceholder('นามสกุล', { exact: true }).inputValue();
    let email = await page.getByPlaceholder('อีเมล', { exact: true }).inputValue();

    await page.getByPlaceholder('ชื่อผู้ใช้', { exact: true }).fill('ชีวา');

    // กรอกค่าที่เหลือกลับเข้าไป (เพื่อป้องกัน validation error)
    await page.getByPlaceholder('ชื่อ', { exact: true }).fill(firstName.toString());
    await page.getByPlaceholder('นามสกุล', { exact: true }).fill(lastName.toString());
    await page.getByPlaceholder('อีเมล', { exact: true }).fill(email.toString());

    await page.getByRole('button', { name: 'บันทึก' }).click();

    await expect(page.locator(`text=${errorMessageUsername}`)).toBeVisible();
})

test('Error edit user because Email data is invalid', async ({ page }) => {

    await login(page, 'admin', 'Adm!n123');

    await page.locator('.nav-group-label', { text: 'ตั้งค่า' }).click();

    await page.getByRole('link', { name: 'ผู้ใช้งาน' }).click();

    await page.locator("tbody tr:nth-of-type(1) td:last-child button").nth(1).click();

    // อ่านค่าปัจจุบันของช่องที่ไม่ต้องการแก้ไข
    let firstName = await page.getByPlaceholder('ชื่อ', { exact: true }).inputValue();
    let lastName = await page.getByPlaceholder('นามสกุล', { exact: true }).inputValue();
    let username = await page.getByPlaceholder('ชื่อผู้ใช้', { exact: true }).inputValue();

    await page.getByPlaceholder('อีเมล', { exact: true }).fill('chiwan@gmail');

    // กรอกค่าที่เหลือกลับเข้าไป (เพื่อป้องกัน validation error)
    await page.getByPlaceholder('ชื่อ', { exact: true }).fill(firstName.toString());
    await page.getByPlaceholder('นามสกุล', { exact: true }).fill(lastName.toString());
    await page.getByPlaceholder('ชื่อผู้ใช้', { exact: true }).fill(username.toString());

    await page.getByRole('button', { name: 'บันทึก' }).click();

    await expect(page.locator(`text=${errorMessageEmail}`)).toBeVisible();
})