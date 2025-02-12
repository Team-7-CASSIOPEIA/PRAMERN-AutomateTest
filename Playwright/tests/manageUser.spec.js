import { test, expect } from '@playwright/test';
const { login } = require('../utils/login');

test('Verify manage user', async ({ page }) => {
  //  เข้าสู่ระบบด้วยบัญชี admin
  await login(page, 'admin', 'admin');

  //  เปิดเมนู "ตั้งค่า" แล้วไปที่หน้าผู้ใช้งาน
  await page.locator('div').filter({ hasText: /^ตั้งค่า$/ }).click();
  await page.getByRole('link', { name: 'ผู้ใช้งาน' }).click();

  //  คลิกปุ่ม "สร้างผู้ใช้งาน"
  await page.getByRole('button', { name: 'สร้างผู้ใช้งาน' }).click();

  //  กรอกข้อมูลผู้ใช้ใหม่
  await page.getByPlaceholder('ชื่อ', { exact: true }).click();
  await page.getByPlaceholder('ชื่อ', { exact: true }).fill('กุลธิดา');

  await page.getByPlaceholder('นามสกุล').click();
  await page.getByPlaceholder('นามสกุล').fill('พานิช');

  await page.getByPlaceholder('ชื่อผู้ใช้').fill('Koolthida');
  await page.getByPlaceholder('อีเมล').fill('koolthida@gmail.com');

  //  เลือกประเภทผู้ใช้งาน "ผู้ใช้งานระบบทั่วไป"
  await page.locator('.v-col-md-6 > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input').first().click();
  await page.getByRole('option', { name: 'ผู้ใช้งานระบบทั่วไป' }).click();

  //  อัปโหลดไฟล์รูปภาพ (lukai.jpg)
  await page.locator('input[type="file"]').setInputFiles('lukai.jpg');

  //  เลือก "กลุ่มสาระภาษาต่างประเทศ"
  await page.locator('div:nth-child(2) > .v-col-md-6 > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input').click();
  await page.locator('div').filter({ hasText: /^กลุ่มสาระภาษาต่างประเทศ$/ }).first().click();

  //  คลิกปุ่ม "บันทึก" เพื่อสร้างผู้ใช้งาน
  await page.getByRole('button', { name: 'บันทึก' }).click();

  // ✅ ตรวจสอบว่าผู้ใช้ "กุลธิดา พานิช" ถูกสร้างสำเร็จและแสดงในตาราง
  const newUser = await page.getByRole('row', {
    name: 'กุลธิดา พานิช กุลธิดา พานิช ผู้ใช้งานทั่วไป วัน 6 กุมภาพันธ์ 2568 เปิดการใช้งาน'
  });
  await expect(newUser).toBeVisible();

  // ✅ ตรวจสอบว่ามีปุ่มอยู่ในแถวของผู้ใช้ที่เพิ่มใหม่
  const newUserButton = newUser.getByRole('button').first();
  await expect(newUserButton).toBeVisible();

  //  แก้ไขข้อมูลผู้ใช้จาก "กุลธิดา พานิช" เป็น "ขวัญษา เรียบเรียง"
  await page.getByRole('row', { name: 'กุลธิดา พานิช กุลธิดา พานิช ผู้ใช้งานทั่วไป วัน 6 กุมภาพันธ์ 2568' }).getByRole('button').nth(1).click();
  await page.getByPlaceholder('ชื่อ', { exact: true }).click();
  await page.getByPlaceholder('ชื่อ', { exact: true }).fill('ขวัญษา');

  await page.getByPlaceholder('นามสกุล').click();
  await page.getByPlaceholder('นามสกุล').fill('เรียบเรียง');

  await page.getByPlaceholder('ชื่อผู้ใช้').click();
  await page.getByPlaceholder('ชื่อผู้ใช้').fill('Kwansa');

  await page.getByPlaceholder('อีเมล').fill('kwansa@gmail.com');

  //  คลิกปุ่ม "บันทึก" เพื่ออัปเดตข้อมูล
  await page.getByRole('button', { name: 'บันทึก' }).click();

  //  รอให้ข้อมูลโหลดก่อนตรวจสอบ
  await page.waitForTimeout(2000);

  // ✅ ตรวจสอบว่าผู้ใช้ "ขวัญษา เรียบเรียง" ถูกอัปเดตและแสดงผลในตาราง
  const userRow = await page.locator('tr').filter({ hasText: 'ขวัญษา เรียบเรียง' });
  await expect(userRow).toBeVisible();

  // ✅ ตรวจสอบว่ามีปุ่มอยู่ในแถวของผู้ใช้ที่แก้ไข
  const userButton = userRow.getByRole('button').first();
  await expect(userButton).toBeVisible();
});

// import { test, expect } from '@playwright/test';
// const { login } = require('../utils/login');

// test('Verify manage user', async ({ page }) => {
//   await login(page, 'admin', 'admin');

//   await page.locator('div').filter({ hasText: /^ตั้งค่า$/ }).click();
//   await page.getByRole('link', { name: 'ผู้ใช้งาน' }).click();
//   await page.getByRole('button', { name: 'สร้างผู้ใช้งาน' }).click();

//   await page.getByPlaceholder('ชื่อ', { exact: true }).click();
//   await page.getByPlaceholder('ชื่อ', { exact: true }).fill('กุลธิดา');

//   await page.getByPlaceholder('นามสกุล').click();
//   await page.getByPlaceholder('นามสกุล').fill('พานิช');

//   await page.getByPlaceholder('ชื่อผู้ใช้').fill('Koolthida');


//   await page.getByPlaceholder('อีเมล').fill('koolthida@gmail.com');

//   await page.locator('.v-col-md-6 > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input').first().click();
//   await page.getByRole('option', { name: 'ผู้ใช้งานระบบทั่วไป' }).click();


//   await page.locator('input[type="file"]').setInputFiles('lukai.jpg');

//   await page.locator('div:nth-child(2) > .v-col-md-6 > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input').click();
//   await page.locator('div').filter({ hasText: /^กลุ่มสาระภาษาต่างประเทศ$/ }).first().click();

//   await page.getByRole('button', { name: 'บันทึก' }).click();
//    const newUser = await page.getByRole('row', {
//     name: 'กุลธิดา พานิช กุลธิดา พานิช ผู้ใช้งานทั่วไป วัน 6 กุมภาพันธ์ 2568 เปิดการใช้งาน'
//   });
//   await expect(newUser).toBeVisible();

//   // ตรวจสอบว่าปุ่มในแถวของผู้ใช้มีอยู่จริง
//   const newUserButton = newUser.getByRole('button').first();
//   await expect(newUserButton).toBeVisible();

//   await page.getByRole('row', { name: 'กุลธิดา พานิช กุลธิดา พานิช ผู้ใช้งานทั่วไป วัน 6 กุมภาพันธ์ 2568' }).getByRole('button').nth(1).click();
//   await page.getByPlaceholder('ชื่อ', { exact: true }).click();
//   await page.getByPlaceholder('ชื่อ', { exact: true }).fill('ขวัญษา');

//   await page.getByPlaceholder('นามสกุล').click();
//   await page.getByPlaceholder('นามสกุล').fill('เรียบเรียง');



//   await page.getByPlaceholder('ชื่อผู้ใช้').click();
//   await page.getByPlaceholder('ชื่อผู้ใช้').fill('Kwansa');

//   await page.getByPlaceholder('อีเมล').fill('kwansa@gmail.com');



//   await page.getByRole('button', { name: 'บันทึก' }).click();
//   await page.waitForTimeout(2000); // รอโหลดข้อมูล

//   const userRow = await page.locator('tr').filter({ hasText: 'ขวัญษา เรียบเรียง' });
//   await expect(userRow).toBeVisible();


//   // ตรวจสอบว่าปุ่มในแถวของผู้ใช้มีอยู่จริง
//   const userButton = userRow.getByRole('button').first();
//   await expect(userButton).toBeVisible();

// });