# json-server
A simple node and express server to handle HTTP request and serve stub JSON file in response.

## Project Objective
- [x] To help ui developers setup a server that can serve stub jsons.
- [x] This should help them get up to speed quickly and focus more on ui development.

## Info
- This is not a plug and play thing.
- You need to explicitly handle each incoming request.
- But don't worry. Everything will be explained gradually.
- So that you know exactly what is going on and what to do.
- Nothing will be hidden from your sight.

## Define Mappings
- You can see a file `mappings.js` in the root directory.
- Here you need to define the api details.

| Properties | Description |
|------------|-------------|
| name       | The name of api end point. In the mappings object, this will be property name. |
| jsonPath   | The file path of json stub for this api end point |
| errorJsonPath | The file path of json containing error msg (if you want to serve some error) for this api end point |

## Sample mappings

```js
const stubPath = "json_stubs/";

exports.mappings = {
    getUser: {
        jsonPath: stubPath + "getUser.json",
        errorJsonPath: stubPath + "notAuthorised.json"
    }
}
```
- A folder `json_stubs` is created.
- Keep all your stub json here. We already kept the `getUser.json`
- The `jsonPath` defined in the mappings is used in the router to serve the stub json for a req end point
- Here `/services/dashboard/getUser` is served with `json_stubs/getUser.json`
- Similarly keep adding your stub jsons in the `json_stubs` folder and map them properly in `mappings.js`
- Handle the request in routes.json and use mappings info to serve the json.

## Sample Route
```js
router.get("/services/dashboard/getUser", (req, res) => {
    logRequestDetailsToConsole(req);
    serveJSON(mappings.getUser.jsonPath, req, res);
})
```
- The `logRequestDetailsToConsole()` and `serveJSON()` are already defined in the `routes.js`
- They do what their names are.

## Start The Server
- One time activity : install the necessary packages. Here our project only requires `expressjs` though.
- `npm i`
- Start the server
```sh
npm start
```
- Or better install nodemon globally and run `nodemon start`
- The json server is will run on port 5000. 
- It allows cors from `http:localhost:4200`.
- If you want to change it then feel free to update the `server.js`
- To make sure things are working fine, open browser and hit: `http://localhost:5000/services/dashboard/getUser`
- You should get `{"username:":"someusername","firstName":"FirstName","lastName":"LastName"}`
