import { test, expect, request } from '@playwright/test'

const loginpayload = { username: "buyerdev", password: "Treeboa@123" }

let token;
let orderid;


test.beforeAll('apilogin', async () => {

    const apicontext = await request.newContext();

    const loginResponse = await apicontext.post('https://bookcart.azurewebsites.net/api/login',

        {
             data: loginpayload
        })

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token)

    const orderresponse = await apicontext.get('https://bookcart.azurewebsites.net/api/Order/9961',

        {
           
            headers: {

                    'Authorization' :token,
                    'Content-Type': 'application/json'
                },

            }
    )

    expect(orderresponse.ok()).toBeTruthy
    const orderresponsejson = await orderresponse.json();
    console.log(orderresponsejson)

    orderid =  orderresponsejson.orders[0];
   console.log(orderid)

})
test('api test', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)


    await page.goto('https://bookcart.azurewebsites.net/')

    console.log(await page.url());

    await page.goto('https://bookcart.azurewebsites.net/myorders')
    const orderID = await page.getByRole('row').locator('tr/td').nth(3).textContent();

    console.log(orderID)

    expect(orderID).toContain(orderid);
})