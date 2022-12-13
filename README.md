# Delete Users List from DBF file

## Using

1. Open the console in the root of the project
2. Install all dependencies

  ```bash
  npm i
  ```

3. Specify the path to the .txt file as follows:

  ```bash
  node src/app.js filePath txt "<absolute path to the .txt file with its name and extension>"
  ```

4. Specify the path to the .dbf file as follows:

  ```bash
  node src/app.js filePath dbf "<absolute path to the .dbf file with its name and extension>"
  ```

5. Start deleting users:

  ```bash
  node src/app.js deleteUsersFromDbf
  ```
