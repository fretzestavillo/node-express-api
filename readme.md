sudo systemctl start mongod

<!-- to configure typescipt for convertiong ts to js -->

"build-backend": "tsc --project tsconfig.backend.json",

<!-- to configure typescipt for convertiong ts to js -->

"build-api": "tsc --project tsconfig.api.json",

<!-- ready to run the js file that converted from ts -->

"start-backend": "node dist/backend/main.js",

<!-- ready to run the js file that converted from ts -->

"start-api": "node dist/api/main.js",

<!-- instead of running the command above just run the below -->

"start": "npm run build-backend && npm run build-api && concurrently \"npm run start-backend\" \"npm run start-api\""

<!-- instead of running the command above just run the below the greatest shortcut-->

npm run start
