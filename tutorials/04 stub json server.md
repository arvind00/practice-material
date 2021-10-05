## Learning Objective
- [x] create a node and express server to serve stub json

## Step 1 - clone json-server
- create a folder `server` in root. Later we will remove it.
- cd into it and run `git clone https://github.com/arvind00/json-server.git`
- you should see a folder json-server
- move it to the root folder and delete the `server` folder
- cd into json-server and run `npm i`

## Step 2 - update it to serve mat table data
- Let's make the json-server to serve the data required to construct our dynamic material table
- update json-server>mappings.js as
```js
const stubPath = "json_stubs/";

exports.mappings = {
    getTableData: {
        jsonPath: stubPath + "getTableData.json",
        errorJsonPath: stubPath + "notAuthorised.json"
    }
}
```
- put the below json `getTableData.json` in json-server>json_stubs>getTableData.json
```json
{
    "cols": [
        {
            "label": "Fruit",
            "field": "fruit",
            "width": 150
        },
        {
            "label": "Price",
            "field": "price",
            "width": 100
        },
        {
            "label": "Last Updated",
            "field": "lastUpdated",
            "width": 150
        }
    ],
    "data": [
        {
            "fruit": "Apple",
            "price": 150,
            "lastUpdated": "2021-09-27",
            "rowStyle": {
                "background": "#f4f4f4"
            },
            "cellStyle": {
                "fruit": {
                    "fontWeight": "bolder"
                },
                "price": {
                    "color": "red"
                }
            }
        },
        {
            "fruit": "Banana",
            "price": 50,
            "lastUpdated": "2021-09-26",
            "rowStyle": {
                "color": "green"
            },
            "cellStyle": {
                "lastUpdated": {
                    "color": "green",
                    "fontWeight": "500"
                }
            }
        },
        {
            "fruit": "Orange",
            "price": 60,
            "lastUpdated": "2021-09-29",
            "rowStyle": {
                "background": "#f4f4f4"
            },
            "cellStyle": null
        },
        {
            "fruit": "Grapes",
            "price": 80,
            "lastUpdated": "2021-09-25",
            "rowStyle": {
                "background": "rgb(248, 113, 113)"
            },
            "cellStyle": {
                "fruit": {
                    "color": "white"
                },
                "price": {
                    "color": "white"
                },
                "lastUpdated": {
                    "color": "white"
                }
            }
        }
    ]
}
```
- update routes.js to serve it
```js
router.get("/services/getTableData", (req, res) => {
    logRequestDetailsToConsole(req);
    serveJSON(mappings.getTableData.jsonPath, req, res);
})
```
- cd into json-server and run `nodemon start`
- once server is started open browser and hit  `http://localhost:5000/services/getTableData`
- you should see the response as you have defined.
